(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RKCore = Package['rationalk:core'].RKCore;
var rationalK = Package['rationalk:lib'].rationalK;
var Roles = Package['alanning:roles'].Roles;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Email = Package.email.Email;
var Nodemailer = Package['mrt:meteor-nodemailer'].Nodemailer;
var moment = Package['momentjs:moment'].moment;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveTable = Package['aslagle:reactive-table'].ReactiveTable;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var SyncedCron = Package['percolate:synced-cron'].SyncedCron;
var Zones = Package['meteorhacks:zones'].Zones;
var Async = Package['meteorhacks:async'].Async;
var mfPkg = Package['gadicohen:messageformat'].mfPkg;
var mf = Package['gadicohen:messageformat'].mf;
var MongoDBURI = Package['chhib:mongodb-uri'].MongoDBURI;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var i18n = Package['anti:i18n'].i18n;
var AccountsEntry = Package['joshowens:accounts-entry'].AccountsEntry;
var PDFJS = Package['pascoual:pdfjs'].PDFJS;
var Excel = Package['netanelgilad:excel'].Excel;
var xml2js = Package['peerlibrary:xml2js'].xml2js;
var getSlug = Package['ongoworks:speakingurl'].getSlug;
var Mousetrap = Package['mousetrap:mousetrap'].Mousetrap;
var webshot = Package['bryanmorgan:webshot'].webshot;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package.livedata.DDP;
var DDPServer = Package.livedata.DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var Accounts = Package['accounts-base'].Accounts;
var Iron = Package['iron:core'].Iron;
var FS = Package['cfs:base-package'].FS;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var RKCheckLists, CheckLists;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/methods.js                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
RKCheckLists = {};                                                   // 1
                                                                     // 2
// RKTrello.Trello = Trello; -> done in collections.js               // 3
                                                                     // 4
RKCheckLists.findAll = function () {                                 // 5
  return RKCheckLists.find({}, {sort: {score: -1}}).fetch();         // 6
};                                                                   // 7
                                                                     // 8
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/collections.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
CheckLists = new Mongo.Collection('Checklists');                     // 1
                                                                     // 2
CheckLists.allow( {                                                  // 3
		insert: function (userId) {return !! userId; },                    // 4
		update: function (userId) {return !!userId; },                     // 5
    remove: function (userId) {return !!userId; },                   // 6
});                                                                  // 7
                                                                     // 8
if (Meteor.isServer) {                                               // 9
	if (typeof CheckLists.createIndex === 'function') {                 // 10
		CheckLists.createIndex({ full: "text" }, { name: "TextIndex" });   // 11
	}                                                                   // 12
	else {                                                              // 13
		if (typeof CheckLists._ensureIndex === 'function') {               // 14
			CheckLists._ensureIndex( { full: "text" }, {name: "TextIndex"});  // 15
	}                                                                   // 16
}                                                                    // 17
} //end if Server                                                    // 18
                                                                     // 19
//expose it to the other packages :                                  // 20
RKCheckLists.CheckLists = CheckLists;                                // 21
                                                                     // 22
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/routes.js                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
if (Meteor.settings.public.show.checklists) {                        // 1
  Router.route("/checklists", {                                      // 2
    name: "checklists",                                              // 3
    waitOn: function () {                                            // 4
      return [                                                       // 5
        Meteor.subscribe("checklists"),                              // 6
        Meteor.subscribe("members"),                                 // 7
        Meteor.subscribe("rkSettings"),                              // 8
      ];                                                             // 9
    },                                                               // 10
  });                                                                // 11
}                                                                    // 12
                                                                     // 13
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/server/publications.js          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.publish("checklists", function () {                           // 1
  return CheckLists.find();                                          // 2
});                                                                  // 3
                                                                     // 4
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/server/checklists.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.methods({                                                     // 1
                                                                     // 2
});                                                                  // 3
                                                                     // 4
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:checklists'] = {
  RKCheckLists: RKCheckLists
};

})();

//# sourceMappingURL=rationalk_checklists.js.map
