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
var RKExperts, Expert, url, menuHTML;

(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:experts/lib/methods.js                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
RKExperts = {};                                                              // 1
RKCore.searchResultsPackage.push(                                            // 2
  {                                                                          // 3
    name: "RKExperts", // RKExperts.findAllFullTextSearch should exists      // 4
  }                                                                          // 5
);                                                                           // 6
                                                                             // 7
RKExperts.findAll = function () {                                            // 8
  return Expert.find({}).fetch();                                            // 9
};                                                                           // 10
                                                                             // 11
RKExperts.findAllFullTextSearch = function () {                              // 12
  return Expert.find({}, {sort: {score: -1}}).fetch();                       // 13
};                                                                           // 14
                                                                             // 15
RKExperts.findAnd = function (arrayOfAndForExperts) {                        // 16
  return Expert.find({$and: arrayOfAndForExperts }, {limit: 30});            // 17
};                                                                           // 18
                                                                             // 19
RKExperts.findOr = function (arrayOfOrForExperts) {                          // 20
  return Expert.find(                                                        // 21
    {                                                                        // 22
      $or: arrayOfOrForExperts,                                              // 23
    },                                                                       // 24
    {                                                                        // 25
      limit: 30,                                                             // 26
    }                                                                        // 27
  );                                                                         // 28
};                                                                           // 29
                                                                             // 30
RKExperts.findFullText = function (searchQuery) {                            // 31
  var sr;                                                                    // 32
  check(searchQuery, String);                                                // 33
  sr = Expert.find(                                                          // 34
    {                                                                        // 35
      $text: {                                                               // 36
        $search: searchQuery,                                                // 37
      },                                                                     // 38
    },                                                                       // 39
    {                                                                        // 40
      fields: { score: { $meta: 'textScore' } },                             // 41
      sort: { score: { $meta: 'textScore' } },                               // 42
      limit: 30,                                                             // 43
    });                                                                      // 44
    return sr;                                                               // 45
};                                                                           // 46
                                                                             // 47
RKExperts.findDummy = function () {                                          // 48
  return Expert.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 49
};                                                                           // 50
                                                                             // 51
                                                                             // 52
Meteor.methods({                                                             // 53
	updateFieldOfExpertise: function (content, userId) {                        // 54
    check(content, String);                                                  // 55
    check(userId, String);                                                   // 56
		Expert.update(                                                             // 57
			{                                                                         // 58
			  userId: Meteor.userId(),                                                // 59
			},                                                                        // 60
			{                                                                         // 61
		    fieldOfExpertise: content,                                             // 62
        searchResultFromExperts: true,                                       // 63
		    updatedAt: new Date(),                                                 // 64
        userId: userId,                                                      // 65
			},                                                                        // 66
			{                                                                         // 67
		    upsert: true,                                                          // 68
			}                                                                         // 69
		);                                                                         // 70
		if (typeof(toastr) !== 'undefined') {                                      // 71
			toastr.success('Updated succesfully');                                    // 72
		}                                                                          // 73
	},                                                                          // 74
});                                                                          // 75
                                                                             // 76
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:experts/lib/collections.js                             //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Expert = new Mongo.Collection('expert');                                     // 1
                                                                             // 2
Expert.allow( {                                                              // 3
		insert: function (userId) {return !! userId; },                            // 4
		update: function (userId) {return !!userId; },                             // 5
    remove: function (userId) {return !!userId; },                           // 6
});                                                                          // 7
                                                                             // 8
if (Meteor.isServer) {                                                       // 9
	if (typeof Expert.createIndex === 'function') {                             // 10
		Expert.createIndex({ fieldOfExpertise: "text" }, { name: "TextIndex" });   // 11
	}                                                                           // 12
	else {                                                                      // 13
		if (typeof Expert._ensureIndex === 'function') {                           // 14
			Expert._ensureIndex( { fieldOfExpertise: "text" }, {name: "TextIndex"});  // 15
		}                                                                          // 16
	}                                                                           // 17
}                                                                            // 18
                                                                             // 19
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:experts/lib/routes.js                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
if (Meteor.settings.public.show.expert) {                                    // 1
  Router.route("/expert", {                                                  // 2
    name: "expert",                                                          // 3
    waitOn: function () {                                                    // 4
      return [                                                               // 5
        Meteor.subscribe("expert"),                                          // 6
        Meteor.subscribe("members"),                                         // 7
      ];                                                                     // 8
    },                                                                       // 9
  });                                                                        // 10
                                                                             // 11
  url = Router.routes.expert.path();                                         // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Experts"><strong><span class="glyphicon glyphicon-user"></span></strong> Experts</a></li>');
                                                                             // 14
  RKCore.packageMenu.push(                                                   // 15
    {                                                                        // 16
      "menuHTML": menuHTML,                                                  // 17
      "fromPackage": "rationalk:experts",                                    // 18
    }                                                                        // 19
  );                                                                         // 20
}                                                                            // 21
                                                                             // 22
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:experts/lib/server/publications.js                     //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Meteor.publish("expert", function () {                                       // 1
  return Expert.find();                                                      // 2
});                                                                          // 3
                                                                             // 4
///////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:experts'] = {
  RKExperts: RKExperts
};

})();

//# sourceMappingURL=rationalk_experts.js.map
