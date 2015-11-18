(function(){Template.updateprocessdocuments.rendered = function () {

};

Template.updateprocessdocuments.helpers({
	ProcessDocuments: function () {
		return ProcessDocuments.find({}).fetch();
	},
	processId: function () {
		return Router.current().params.processId;
	},
	elementId: function () {
		return Router.current().params.elementId;
	}
});

Template.updateprocessdocuments.events({
	'submit form': function (event){
	    event.preventDefault();
	    var myhtml = event.target.myhtml.value;

	    Meteor.call('updateProcessDocument', Router.current().params.processId, Router.current().params.elementId,myhtml, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	},
	"click a.delete": function (e){
	    e.preventDefault();
	    Meteor.call('deleteProcessDocument', this._id, function (error, result) {});
			return false;
	}

});

})();
