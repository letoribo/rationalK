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
var RKNotes, Notes, url, menuHTML;

(function () {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/rationalk:notes/lib/methods.js                                  //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
RKNotes = {};                                                               // 1
RKCore.searchResultsPackage.push(                                           // 2
  {                                                                         // 3
    name: "RKNotes",                                                        // 4
  }                                                                         // 5
);                                                                          // 6
                                                                            // 7
RKNotes.findAllFullTextSearch = function () {                               // 8
  var sr = [];                                                              // 9
  sr = sr.concat(Notes.find({}, {sort: {score: -1}}).fetch());              // 10
  return sr;                                                                // 11
};                                                                          // 12
                                                                            // 13
RKNotes.findFullText = function (searchQuery) {                             // 14
  var sr;                                                                   // 15
  check(searchQuery, String);                                               // 16
  sr = Notes.find(                                                          // 17
    {                                                                       // 18
      $text: {                                                              // 19
        $search: searchQuery,                                               // 20
      },                                                                    // 21
    },                                                                      // 22
    {                                                                       // 23
      fields: { score: { $meta: 'textScore' } },                            // 24
      sort: { score: { $meta: 'textScore' } },                              // 25
      limit: 30,                                                            // 26
    });                                                                     // 27
    return sr;                                                              // 28
};                                                                          // 29
                                                                            // 30
RKNotes.findDummy = function () {                                           // 31
  return Notes.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 32
};                                                                          // 33
                                                                            // 34
Meteor.methods({                                                            // 35
	updateNote: function (content, userId) {                                   // 36
		Notes.update(                                                             // 37
			{                                                                        // 38
			  userId: Meteor.userId(),                                               // 39
			},                                                                       // 40
			{                                                                        // 41
			    content: content,                                                    // 42
			    updatedAt: new Date(),                                               // 43
				  userId: userId,                                                       // 44
          searchResultFromNotes: true,                                      // 45
			},                                                                       // 46
			{                                                                        // 47
			    upsert: true,                                                        // 48
			}                                                                        // 49
		);                                                                        // 50
		if (typeof(toastr) !== 'undefined') {                                     // 51
			toastr.success('Note updated succesfully');                              // 52
		}                                                                         // 53
	},                                                                         // 54
});                                                                         // 55
                                                                            // 56
//////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/rationalk:notes/lib/collections.js                              //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Notes = new Mongo.Collection('notes');                                      // 1
                                                                            // 2
Notes.allow( {                                                              // 3
		insert: function (userId) {return !! userId; },                           // 4
		update: function (userId) {return !!userId; },                            // 5
    remove: function (userId) {return !!userId; },                          // 6
});                                                                         // 7
                                                                            // 8
if (Meteor.isServer) {                                                      // 9
	if (typeof Notes.createIndex === 'function') {                             // 10
		Notes.createIndex({ content: "text" }, { name: "TextIndex" });            // 11
	}                                                                          // 12
	else {                                                                     // 13
		if (typeof Notes._ensureIndex === 'function') {                           // 14
			Notes._ensureIndex( { content: "text" }, {name: "TextIndex"});           // 15
		}                                                                         // 16
	}                                                                          // 17
}                                                                           // 18
                                                                            // 19
//////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/rationalk:notes/lib/routes.js                                   //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
if (Meteor.settings.public.show.notes) {                                    // 1
  Router.route("/notes", {                                                  // 2
    name: "notes",                                                          // 3
    waitOn: function () {                                                   // 4
      return [                                                              // 5
        Meteor.subscribe("myNotes"),                                        // 6
        Meteor.subscribe("members"),                                        // 7
      ];                                                                    // 8
    },                                                                      // 9
  });                                                                       // 10
                                                                            // 11
  url = Router.routes.notes.path();                                         // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="My notes"><strong><span class="glyphicon glyphicon-pencil"></span></strong> Notes</a></li>');
  RKCore.packageMenu.push(                                                  // 14
    {                                                                       // 15
      "menuHTML": menuHTML,                                                 // 16
      "fromPackage": "rationalk:notes",                                     // 17
    }                                                                       // 18
  );                                                                        // 19
}                                                                           // 20
                                                                            // 21
//////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/rationalk:notes/lib/server/publications.js                      //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Meteor.publish("myNotes", function () {                                     // 1
  return Notes.find({userId: this.userId});                                 // 2
});                                                                         // 3
                                                                            // 4
//////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:notes'] = {
  RKNotes: RKNotes
};

})();

//# sourceMappingURL=rationalk_notes.js.map
