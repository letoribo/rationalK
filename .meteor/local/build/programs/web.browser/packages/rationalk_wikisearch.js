//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RKCore = Package['rationalk:core'].RKCore;
var rationalK = Package['rationalk:lib'].rationalK;
var Roles = Package['alanning:roles'].Roles;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var ReactiveModal = Package['pahans:reactive-modal'].ReactiveModal;
var Nodemailer = Package['mrt:meteor-nodemailer'].Nodemailer;
var moment = Package['momentjs:moment'].moment;
var accountsUIBootstrap3 = Package['ian:accounts-ui-bootstrap-3'].accountsUIBootstrap3;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveTable = Package['aslagle:reactive-table'].ReactiveTable;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var Async = Package['meteorhacks:async'].Async;
var mfPkg = Package['gadicohen:messageformat'].mfPkg;
var mf = Package['gadicohen:messageformat'].mf;
var Handsontable = Package['olragon:handsontable'].Handsontable;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var i18n = Package['anti:i18n'].i18n;
var AccountsEntry = Package['joshowens:accounts-entry'].AccountsEntry;
var PDFJS = Package['pascoual:pdfjs'].PDFJS;
var Excel = Package['netanelgilad:excel'].Excel;
var xml2js = Package['peerlibrary:xml2js'].xml2js;
var gantt = Package['dhtmlx:gantt'].gantt;
var getSlug = Package['ongoworks:speakingurl'].getSlug;
var Mousetrap = Package['mousetrap:mousetrap'].Mousetrap;
var BootstrapModalPrompt = Package['theduke:bootstrap-modal-prompt'].BootstrapModalPrompt;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package.livedata.DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var Accounts = Package['accounts-base'].Accounts;
var Iron = Package['iron:core'].Iron;
var FS = Package['cfs:base-package'].FS;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var RKWiki, endpoints, nEndpoints, endpoint, queryWiki, articleTitles, articleContent, articleUrl, full, WikiSearchResults;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/methods.js                                                                    //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
RKWiki = {};                                                                                                       // 1
RKWiki.Collections =  {};                                                                                          // 2
RKCore.searchResultsPackage.push(                                                                                  // 3
  {                                                                                                                // 4
    name: "RKWiki", // a publication with the name : RKWiki-searchResults should exists                            // 5
  }                                                                                                                // 6
);                                                                                                                 // 7
                                                                                                                   // 8
RKWiki.findAllFullTextSearch = function () {                                                                       // 9
  return WikiSearchResults.find({}, {sort: {score: -1}}).fetch();                                                  // 10
};                                                                                                                 // 11
                                                                                                                   // 12
RKWiki.findFullText = function (searchQuery) {                                                                     // 13
  var sr;                                                                                                          // 14
  var response;                                                                                                    // 15
  var i;                                                                                                           // 16
  var j;                                                                                                           // 17
  var obj;                                                                                                         // 18
  var nResults;                                                                                                    // 19
  var query = searchQuery;                                                                                         // 20
  check(searchQuery, String);                                                                                      // 21
  WikiSearchResults.remove({});                                                                                    // 22
  RKCore.log("Searching wiki...");                                                                                 // 23
  if (typeof Meteor.settings.wiki !== 'undefined') {                                                               // 24
    //action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json                                    // 25
    //action=opensearch&format=json&search=test&limit=2&format=json                                                // 26
    //http://www.imfdb.org/api.php?action=opensearch&format=json&search=test&limit=2&format=json                   // 27
    endpoints = Meteor.settings.wiki.endpoints;                                                                    // 28
    nEndpoints = endpoints.length;                                                                                 // 29
    for (j = 0; j < nEndpoints; j++) {                                                                             // 30
      endpoint = endpoints[j] + "/api.php";                                                                        // 31
      try {                                                                                                        // 32
        response = Meteor.http.get(endpoint, {                                                                     // 33
          params: {                                                                                                // 34
            action: "opensearch",                                                                                  // 35
            search: query,                                                                                         // 36
            limit: 5,                                                                                              // 37
            //titles: "Main%20Page",                                                                               // 38
            //prop: "revisions",                                                                                   // 39
            //rvprop: "content",                                                                                   // 40
            "format": "json",                                                                                      // 41
          },                                                                                                       // 42
        });                                                                                                        // 43
        //RKCore.log(response);                                                                                    // 44
        RKCore.log(response.data);                                                                                 // 45
        queryWiki = response.data[0];                                                                              // 46
        articleTitles = response.data[1]; // this is an array of size : limit                                      // 47
        articleContent = response.data[2]; // this is an array of size : limit                                     // 48
        articleUrl = response.data[3]; // this is an array of size : limit                                         // 49
                                                                                                                   // 50
        nResults = articleTitles.length;                                                                           // 51
        for (i = 0; i < nResults; i++) {                                                                           // 52
          obj = {};                                                                                                // 53
          full = '';                                                                                               // 54
          RKCore.log("articleTitle : ");                                                                           // 55
          RKCore.log(articleTitles[i]);                                                                            // 56
          obj.title = articleTitles[i];                                                                            // 57
          full = full.concat(' ' + articleTitles[i]);                                                              // 58
          if (typeof articleContent !== 'undefined') {                                                             // 59
            RKCore.log("articleContent : ");                                                                       // 60
            RKCore.log(articleContent[i]);                                                                         // 61
            obj.content = articleContent[i];                                                                       // 62
            full = full.concat(' ' + articleContent[i]);                                                           // 63
          }                                                                                                        // 64
          else {                                                                                                   // 65
            obj.content = "";                                                                                      // 66
          }                                                                                                        // 67
          if (typeof articleUrl !== 'undefined') {                                                                 // 68
            RKCore.log("articleUrl : ");                                                                           // 69
            RKCore.log(articleUrl[i]);                                                                             // 70
            obj.url = articleUrl[i];                                                                               // 71
          }                                                                                                        // 72
          else {                                                                                                   // 73
            obj.url = "";                                                                                          // 74
          }                                                                                                        // 75
          obj.full = full;                                                                                         // 76
          obj.endpoint = endpoints[j];                                                                             // 77
          obj.searchResultFromWiki = true;                                                                         // 78
          WikiSearchResults.insert(obj);                                                                           // 79
        }                                                                                                          // 80
      }                                                                                                            // 81
      catch(error) {                                                                                               // 82
        RKCore.log("Error :");                                                                                     // 83
        RKCore.log(error);                                                                                         // 84
      }                                                                                                            // 85
    }                                                                                                              // 86
  }                                                                                                                // 87
  else {                                                                                                           // 88
    RKCore.log("You need to defined wiki in your settings file : settings.json");                                  // 89
  }                                                                                                                // 90
                                                                                                                   // 91
  sr = WikiSearchResults.find(                                                                                     // 92
    {                                                                                                              // 93
      $text: {                                                                                                     // 94
        $search: searchQuery,                                                                                      // 95
      },                                                                                                           // 96
    },                                                                                                             // 97
    {                                                                                                              // 98
      fields: { score: { $meta: 'textScore' } },                                                                   // 99
      sort: { score: { $meta: 'textScore' } },                                                                     // 100
      limit: 30,                                                                                                   // 101
    });                                                                                                            // 102
  return sr;                                                                                                       // 103
};                                                                                                                 // 104
                                                                                                                   // 105
RKWiki.findDummy = function () {                                                                                   // 106
  return WikiSearchResults.find({$text: { $search: "somethingthatyouwillneverfind" }});                            // 107
};                                                                                                                 // 108
                                                                                                                   // 109
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/collections.js                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
WikiSearchResults = new Mongo.Collection('wikisearchresults');                                                     // 1
                                                                                                                   // 2
WikiSearchResults.allow( {                                                                                         // 3
		insert: function (userId) {return !! userId; },                                                                  // 4
		update: function (userId) {return !!userId; },                                                                   // 5
    remove: function (userId) {return !!userId; },                                                                 // 6
});                                                                                                                // 7
                                                                                                                   // 8
if (Meteor.isServer) {                                                                                             // 9
	if (typeof WikiSearchResults.createIndex === 'function') {                                                        // 10
		WikiSearchResults.createIndex({ full: "text" }, { name: "TextIndex" });                                          // 11
	}                                                                                                                 // 12
	else {                                                                                                            // 13
		if (typeof WikiSearchResults._ensureIndex === 'function') {                                                      // 14
			WikiSearchResults._ensureIndex( { full: "text" }, {name: "TextIndex"});                                         // 15
		}                                                                                                                // 16
	}                                                                                                                 // 17
}                                                                                                                  // 18
                                                                                                                   // 19
RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                                          // 20
                                                                                                                   // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/routes.js                                                                     //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
if (Meteor.settings.public.show.wiki) {                                                                            // 1
  /*                                                                                                               // 2
  Router.route("/wiki/search/:searchQuery", {                                                                      // 3
    name: "wikisearch",                                                                                            // 4
    waitOn: function () {                                                                                          // 5
      return [                                                                                                     // 6
        Meteor.subscribe("wikisearchresults", this.params.searchQuery), //this.params.query                        // 7
      ];                                                                                                           // 8
    },                                                                                                             // 9
  });                                                                                                              // 10
                                                                                                                   // 11
  url = Router.routes.wikisearch.path({searchQuery: "test"});                                                      // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Wiki Search"><strong><span class="glyphicon glyphicon-user"></span></strong> Wiki</a></li>');
                                                                                                                   // 14
  RKCore.packageMenu.push(                                                                                         // 15
    {                                                                                                              // 16
      "menuHTML": menuHTML,                                                                                        // 17
      "fromPackage": "rationalk:wikisearch",                                                                       // 18
    }                                                                                                              // 19
  );                                                                                                               // 20
  */                                                                                                               // 21
}                                                                                                                  // 22
                                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/client/template.wiki.js                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("wikisearch");                                                                                // 2
Template["wikisearch"] = new Template("Template.wikisearch", (function() {                                         // 3
  var view = this;                                                                                                 // 4
  return HTML.DIV({                                                                                                // 5
    "class": "row"                                                                                                 // 6
  }, "\n		", HTML.DIV({                                                                                            // 7
    "class": "col-md-12"                                                                                           // 8
  }, "\n			", HTML.DIV({                                                                                           // 9
    "class": "panel panel-default"                                                                                 // 10
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Wiki search</h3>\n        </div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                          // 12
  }, "\n					", Blaze._TemplateWith(function() {                                                                   // 13
    return {                                                                                                       // 14
      collection: Spacebars.call(view.lookup("WikiSearchResults"))                                                 // 15
    };                                                                                                             // 16
  }, function() {                                                                                                  // 17
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                // 18
  }), "\n        "), "\n    	"), "\n		"), "\n	");                                                                  // 19
}));                                                                                                               // 20
                                                                                                                   // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/client/wiki.js                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.wikisearch.helpers({                                                                                      // 1
	WikiSearchResults: function () {                                                                                  // 2
		return WikiSearchResults.find({}).fetch();                                                                       // 3
	},                                                                                                                // 4
});                                                                                                                // 5
                                                                                                                   // 6
Template.wikisearch.events({                                                                                       // 7
});                                                                                                                // 8
                                                                                                                   // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/client/template.wikiInSearchResults.js                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("wikiInSearchResults");                                                                       // 2
Template["wikiInSearchResults"] = new Template("Template.wikiInSearchResults", (function() {                       // 3
  var view = this;                                                                                                 // 4
  return HTML.DIV({                                                                                                // 5
    "class": "post"                                                                                                // 6
  }, "\n		", HTML.DIV({                                                                                            // 7
    "class": "row"                                                                                                 // 8
  }, "\n			", HTML.DIV({                                                                                           // 9
    "class": "col-md-10"                                                                                           // 10
  }, "\n				", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {                                              // 11
    return Spacebars.mustache(view.lookup("_"), "Title");                                                          // 12
  }), " :"), " ", Blaze.View("lookup:title", function() {                                                          // 13
    return Spacebars.mustache(view.lookup("title"));                                                               // 14
  })), "\n				", Blaze.If(function() {                                                                             // 15
    return Spacebars.call(view.lookup("content"));                                                                 // 16
  }, function() {                                                                                                  // 17
    return [ "\n					", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {                                     // 18
      return Spacebars.mustache(view.lookup("_"), "Content");                                                      // 19
    }), " :"), " ", Blaze.View("lookup:content", function() {                                                      // 20
      return Spacebars.mustache(view.lookup("content"));                                                           // 21
    })), "\n				" ];                                                                                               // 22
  }), "\n				", Blaze.If(function() {                                                                              // 23
    return Spacebars.call(view.lookup("url"));                                                                     // 24
  }, function() {                                                                                                  // 25
    return [ "\n					", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {                                     // 26
      return Spacebars.mustache(view.lookup("_"), "Url");                                                          // 27
    }), " :"), " ", Blaze.View("lookup:url", function() {                                                          // 28
      return Spacebars.mustache(view.lookup("url"));                                                               // 29
    })), "\n				" ];                                                                                               // 30
  }), "\n			"), "\n			", HTML.DIV({                                                                                // 31
    "class": "col-md-2"                                                                                            // 32
  }, "\n				", HTML.Raw('<span class="label label-success"> Wiki</span>'), HTML.Raw("<br>"), "\n				", HTML.SPAN({ // 33
    "class": "label label-success"                                                                                 // 34
  }, " ", Blaze.View("lookup:endpoint", function() {                                                               // 35
    return Spacebars.mustache(view.lookup("endpoint"));                                                            // 36
  })), HTML.Raw("<br>"), "\n				 ", HTML.Raw("<br>"), "\n	 			", Blaze.If(function() {                             // 37
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                              // 38
  }, function() {                                                                                                  // 39
    return [ "\n	 				", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {                     // 40
      return Spacebars.mustache(view.lookup("textScore"));                                                         // 41
    })), "\n	 			" ];                                                                                              // 42
  }), "\n			"), "\n		"), "\n	");                                                                                   // 43
}));                                                                                                               // 44
                                                                                                                   // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:wikisearch/lib/client/wikiInSearchResults.js                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Template.wikiInSearchResults.helpers({                                                                             // 1
	memberUsername: function (who) {                                                                                  // 2
			return Members.collection.findOne({accountId: who}).profile.nickname;                                           // 3
	},                                                                                                                // 4
	searchTypeIsFullTextSearch: function () {                                                                         // 5
		return (Session.get('searchType') === 'fullTextSearch');                                                         // 6
	},                                                                                                                // 7
	textScore: function () {                                                                                          // 8
		//limit to 2 digits after comma :                                                                                // 9
		return Math.round(this.score * 100) / 100;                                                                       // 10
	},                                                                                                                // 11
});                                                                                                                // 12
                                                                                                                   // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:wikisearch'] = {
  RKWiki: RKWiki
};

})();
