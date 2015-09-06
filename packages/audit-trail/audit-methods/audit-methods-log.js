AuditMethods = new Mongo.Collection("AuditMethods")

// wrap existing method handlers for capturing errors
if (Meteor && Meteor.default_server && Meteor.default_server.method_handlers) {
    _.each(Meteor.default_server.method_handlers, function (handler, name) {
        wrapMethodHanderForErrors(name, handler, Meteor.default_server.method_handlers);
    });
}

// wrap future method handlers for capturing errors
var originalMeteorMethods = Meteor.methods;
Meteor.methods = function(methodMap) {
    _.each(methodMap, function(handler, name) {
        wrapMethodHanderForErrors(name, handler, methodMap);
    });
    originalMeteorMethods(methodMap);
};


function wrapMethodHanderForErrors(name, originalHandler, methodMap) {
    methodMap[name] = function() {
        try{
            var start = moment();
            console.log('HIJACK START '+name);
            console.log(arguments);
            var results = originalHandler.apply(this,arguments);
            var end = moment();
            var time = end.diff(start) / 1000;
            console.log('HIJACK END '+name +" took "+time+" seconds");

            var user = Meteor.user();
            var username = user? user.emails[0].address : "anonymous";

            var methodArguments = JSON.stringify(arguments);

            if ("login" != name && !arguments[0].resume) {
                AuditMethods.insert({
                    methodName: name,
                    methodArguments: methodArguments,
                    time: time,
                    by: username,
                    byId: Meteor.userId(),
                    startAt: start.toDate(),
                    endAt: end.toDate()
                });
            }
            return results;
        } catch(ex) {
            if(ex) {
                // sometimes error may be just an string or a primitive
                // in that case, we need to make it a psuedo error
                if(typeof ex !== 'object') {
                    ex = {message: ex, stack: ex};
                }
                // Now we are marking this error to get tracked via methods
                // But, this also triggers a Meteor.debug call and
                // it only gets the stack
                // We also track Meteor.debug errors and want to stop
                // tracking this error. That's why we do this
                // See Meteor.debug error tracking code for more
                ex.stack = {stack: ex.stack, source: 'method'};
                console.log(ex);
            }
            throw ex;
        }
    }
}

ReactiveTable.publish("audit-methods", AuditMethods);