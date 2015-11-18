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
var RKWiki, endpoints, nEndpoints, endpoint, queryWiki, articleTitles, articleContent, articleUrl, full, WikiSearchResults;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/rationalk:wikisearch/lib/methods.js                                                  //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
RKWiki = {};                                                                                     // 1
RKWiki.Collections =  {};                                                                        // 2
RKCore.searchResultsPackage.push(                                                                // 3
  {                                                                                              // 4
    name: "RKWiki", // a publication with the name : RKWiki-searchResults should exists          // 5
  }                                                                                              // 6
);                                                                                               // 7
                                                                                                 // 8
RKWiki.findAllFullTextSearch = function () {                                                     // 9
  return WikiSearchResults.find({}, {sort: {score: -1}}).fetch();                                // 10
};                                                                                               // 11
                                                                                                 // 12
RKWiki.findFullText = function (searchQuery) {                                                   // 13
  var sr;                                                                                        // 14
  var response;                                                                                  // 15
  var i;                                                                                         // 16
  var j;                                                                                         // 17
  var obj;                                                                                       // 18
  var nResults;                                                                                  // 19
  var query = searchQuery;                                                                       // 20
  check(searchQuery, String);                                                                    // 21
  WikiSearchResults.remove({});                                                                  // 22
  RKCore.log("Searching wiki...");                                                               // 23
  if (typeof Meteor.settings.wiki !== 'undefined') {                                             // 24
    //action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json                  // 25
    //action=opensearch&format=json&search=test&limit=2&format=json                              // 26
    //http://www.imfdb.org/api.php?action=opensearch&format=json&search=test&limit=2&format=json // 27
    endpoints = Meteor.settings.wiki.endpoints;                                                  // 28
    nEndpoints = endpoints.length;                                                               // 29
    for (j = 0; j < nEndpoints; j++) {                                                           // 30
      endpoint = endpoints[j] + "/api.php";                                                      // 31
      try {                                                                                      // 32
        response = Meteor.http.get(endpoint, {                                                   // 33
          params: {                                                                              // 34
            action: "opensearch",                                                                // 35
            search: query,                                                                       // 36
            limit: 5,                                                                            // 37
            //titles: "Main%20Page",                                                             // 38
            //prop: "revisions",                                                                 // 39
            //rvprop: "content",                                                                 // 40
            "format": "json",                                                                    // 41
          },                                                                                     // 42
        });                                                                                      // 43
        //RKCore.log(response);                                                                  // 44
        RKCore.log(response.data);                                                               // 45
        queryWiki = response.data[0];                                                            // 46
        articleTitles = response.data[1]; // this is an array of size : limit                    // 47
        articleContent = response.data[2]; // this is an array of size : limit                   // 48
        articleUrl = response.data[3]; // this is an array of size : limit                       // 49
                                                                                                 // 50
        nResults = articleTitles.length;                                                         // 51
        for (i = 0; i < nResults; i++) {                                                         // 52
          obj = {};                                                                              // 53
          full = '';                                                                             // 54
          RKCore.log("articleTitle : ");                                                         // 55
          RKCore.log(articleTitles[i]);                                                          // 56
          obj.title = articleTitles[i];                                                          // 57
          full = full.concat(' ' + articleTitles[i]);                                            // 58
          if (typeof articleContent !== 'undefined') {                                           // 59
            RKCore.log("articleContent : ");                                                     // 60
            RKCore.log(articleContent[i]);                                                       // 61
            obj.content = articleContent[i];                                                     // 62
            full = full.concat(' ' + articleContent[i]);                                         // 63
          }                                                                                      // 64
          else {                                                                                 // 65
            obj.content = "";                                                                    // 66
          }                                                                                      // 67
          if (typeof articleUrl !== 'undefined') {                                               // 68
            RKCore.log("articleUrl : ");                                                         // 69
            RKCore.log(articleUrl[i]);                                                           // 70
            obj.url = articleUrl[i];                                                             // 71
          }                                                                                      // 72
          else {                                                                                 // 73
            obj.url = "";                                                                        // 74
          }                                                                                      // 75
          obj.full = full;                                                                       // 76
          obj.endpoint = endpoints[j];                                                           // 77
          obj.searchResultFromWiki = true;                                                       // 78
          WikiSearchResults.insert(obj);                                                         // 79
        }                                                                                        // 80
      }                                                                                          // 81
      catch(error) {                                                                             // 82
        RKCore.log("Error :");                                                                   // 83
        RKCore.log(error);                                                                       // 84
      }                                                                                          // 85
    }                                                                                            // 86
  }                                                                                              // 87
  else {                                                                                         // 88
    RKCore.log("You need to defined wiki in your settings file : settings.json");                // 89
  }                                                                                              // 90
                                                                                                 // 91
  sr = WikiSearchResults.find(                                                                   // 92
    {                                                                                            // 93
      $text: {                                                                                   // 94
        $search: searchQuery,                                                                    // 95
      },                                                                                         // 96
    },                                                                                           // 97
    {                                                                                            // 98
      fields: { score: { $meta: 'textScore' } },                                                 // 99
      sort: { score: { $meta: 'textScore' } },                                                   // 100
      limit: 30,                                                                                 // 101
    });                                                                                          // 102
  return sr;                                                                                     // 103
};                                                                                               // 104
                                                                                                 // 105
RKWiki.findDummy = function () {                                                                 // 106
  return WikiSearchResults.find({$text: { $search: "somethingthatyouwillneverfind" }});          // 107
};                                                                                               // 108
                                                                                                 // 109
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/rationalk:wikisearch/lib/collections.js                                              //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
WikiSearchResults = new Mongo.Collection('wikisearchresults');                                   // 1
                                                                                                 // 2
WikiSearchResults.allow( {                                                                       // 3
		insert: function (userId) {return !! userId; },                                                // 4
		update: function (userId) {return !!userId; },                                                 // 5
    remove: function (userId) {return !!userId; },                                               // 6
});                                                                                              // 7
                                                                                                 // 8
if (Meteor.isServer) {                                                                           // 9
	if (typeof WikiSearchResults.createIndex === 'function') {                                      // 10
		WikiSearchResults.createIndex({ full: "text" }, { name: "TextIndex" });                        // 11
	}                                                                                               // 12
	else {                                                                                          // 13
		if (typeof WikiSearchResults._ensureIndex === 'function') {                                    // 14
			WikiSearchResults._ensureIndex( { full: "text" }, {name: "TextIndex"});                       // 15
		}                                                                                              // 16
	}                                                                                               // 17
}                                                                                                // 18
                                                                                                 // 19
RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                        // 20
                                                                                                 // 21
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/rationalk:wikisearch/lib/routes.js                                                   //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
if (Meteor.settings.public.show.wiki) {                                                          // 1
  /*                                                                                             // 2
  Router.route("/wiki/search/:searchQuery", {                                                    // 3
    name: "wikisearch",                                                                          // 4
    waitOn: function () {                                                                        // 5
      return [                                                                                   // 6
        Meteor.subscribe("wikisearchresults", this.params.searchQuery), //this.params.query      // 7
      ];                                                                                         // 8
    },                                                                                           // 9
  });                                                                                            // 10
                                                                                                 // 11
  url = Router.routes.wikisearch.path({searchQuery: "test"});                                    // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Wiki Search"><strong><span class="glyphicon glyphicon-user"></span></strong> Wiki</a></li>');
                                                                                                 // 14
  RKCore.packageMenu.push(                                                                       // 15
    {                                                                                            // 16
      "menuHTML": menuHTML,                                                                      // 17
      "fromPackage": "rationalk:wikisearch",                                                     // 18
    }                                                                                            // 19
  );                                                                                             // 20
  */                                                                                             // 21
}                                                                                                // 22
                                                                                                 // 23
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/rationalk:wikisearch/lib/server/publications.js                                      //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
                                                                                                 // 1
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:wikisearch'] = {
  RKWiki: RKWiki
};

})();

//# sourceMappingURL=rationalk_wikisearch.js.map
