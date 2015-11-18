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
var RKCSE, WebSearchResults;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/methods.js                                                                   //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
RKCSE = {};                                                                                                // 1
                                                                                                           // 2
RKCSE.findAll = function () {                                                                              // 3
  return WebSearchResults.find();                                                                          // 4
};                                                                                                         // 5
                                                                                                           // 6
RKCSE.findFullText = function (searchQuery) {                                                              // 7
  return WebSearchResults.find( {                                                                          // 8
        $text: {                                                                                           // 9
          $search: searchQuery,                                                                            // 10
        },                                                                                                 // 11
    }, {                                                                                                   // 12
        fields: { score: { $meta: 'textScore' } },                                                         // 13
        sort: { score: { $meta: 'textScore' } },                                                           // 14
        limit: 30,                                                                                         // 15
    });                                                                                                    // 16
};                                                                                                         // 17
                                                                                                           // 18
RKCSE.findDummy = function () {                                                                            // 19
  return WebSearchResults.find({$text: { $search: "somethingthatyouwillneverfind" }});                     // 20
};                                                                                                         // 21
                                                                                                           // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/collections.js                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
WebSearchResults = new Mongo.Collection('websearchresults');                                               // 1
                                                                                                           // 2
WebSearchResults.allow( {                                                                                  // 3
		insert: function (userId) {return !! userId; },                                                          // 4
		update: function (userId) {return !!userId; },                                                           // 5
    remove: function (userId) {return !!userId; },                                                         // 6
});                                                                                                        // 7
                                                                                                           // 8
                                                                                                           // 9
//expose it to the other packages :                                                                        // 10
RKCSE.WebSearchResults = WebSearchResults;                                                                 // 11
                                                                                                           // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/client/template.webInSearchResults.js                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("webInSearchResults");                                                                // 2
Template["webInSearchResults"] = new Template("Template.webInSearchResults", (function() {                 // 3
  var view = this;                                                                                         // 4
  return HTML.DIV({                                                                                        // 5
    "class": "row"                                                                                         // 6
  }, "\n    ", HTML.DIV({                                                                                  // 7
    "class": "col-md-2"                                                                                    // 8
  }, "\n      ", HTML.IMG({                                                                                // 9
    width: "100",                                                                                          // 10
    src: function() {                                                                                      // 11
      return Spacebars.mustache(view.lookup("thumb"));                                                     // 12
    }                                                                                                      // 13
  }), "\n    "), "\n		", HTML.DIV({                                                                        // 14
    "class": "col-md-8"                                                                                    // 15
  }, "\n      ", HTML.A({                                                                                  // 16
    href: function() {                                                                                     // 17
      return Spacebars.mustache(view.lookup("link"));                                                      // 18
    },                                                                                                     // 19
    target: "_blank"                                                                                       // 20
  }, Blaze.View("lookup:title", function() {                                                               // 21
    return Spacebars.mustache(view.lookup("title"));                                                       // 22
  })), "\n			", HTML.P(Blaze.View("lookup:snippet", function() {                                           // 23
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("snippet")));                                  // 24
  })), "\n		"), HTML.Raw('\n		<div class="col-md-2">\n			<span class="label label-success"> Web</span><br>\n		</div>\n	'));
}));                                                                                                       // 26
                                                                                                           // 27
Template.__checkName("webInSearchResultsCheckbox");                                                        // 28
Template["webInSearchResultsCheckbox"] = new Template("Template.webInSearchResultsCheckbox", (function() { // 29
  var view = this;                                                                                         // 30
  return HTML.DIV({                                                                                        // 31
    id: "includeWebInResultsDiv",                                                                          // 32
    "class": "checkbox includeWebInResultsCheckbox"                                                        // 33
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT({                                                         // 34
    type: "checkbox",                                                                                      // 35
    checked: function() {                                                                                  // 36
      return Spacebars.mustache(view.lookup("includeWebInResults"));                                       // 37
    },                                                                                                     // 38
    id: "includeWebInResultsCheckbox"                                                                      // 39
  }), " ", Blaze.View("lookup:_", function() {                                                             // 40
    return Spacebars.mustache(view.lookup("_"), "Include Web");                                            // 41
  }), "\n    "), "\n  ");                                                                                  // 42
}));                                                                                                       // 43
                                                                                                           // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:cse'] = {
  RKCSE: RKCSE
};

})();
