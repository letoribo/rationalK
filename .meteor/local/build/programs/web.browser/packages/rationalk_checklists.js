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
var RKCheckLists, CheckLists;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/methods.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
RKCheckLists = {};                                                                                               // 1
                                                                                                                 // 2
// RKTrello.Trello = Trello; -> done in collections.js                                                           // 3
                                                                                                                 // 4
RKCheckLists.findAll = function () {                                                                             // 5
  return RKCheckLists.find({}, {sort: {score: -1}}).fetch();                                                     // 6
};                                                                                                               // 7
                                                                                                                 // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/collections.js                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
CheckLists = new Mongo.Collection('Checklists');                                                                 // 1
                                                                                                                 // 2
CheckLists.allow( {                                                                                              // 3
		insert: function (userId) {return !! userId; },                                                                // 4
		update: function (userId) {return !!userId; },                                                                 // 5
    remove: function (userId) {return !!userId; },                                                               // 6
});                                                                                                              // 7
                                                                                                                 // 8
if (Meteor.isServer) {                                                                                           // 9
	if (typeof CheckLists.createIndex === 'function') {                                                             // 10
		CheckLists.createIndex({ full: "text" }, { name: "TextIndex" });                                               // 11
	}                                                                                                               // 12
	else {                                                                                                          // 13
		if (typeof CheckLists._ensureIndex === 'function') {                                                           // 14
			CheckLists._ensureIndex( { full: "text" }, {name: "TextIndex"});                                              // 15
	}                                                                                                               // 16
}                                                                                                                // 17
} //end if Server                                                                                                // 18
                                                                                                                 // 19
//expose it to the other packages :                                                                              // 20
RKCheckLists.CheckLists = CheckLists;                                                                            // 21
                                                                                                                 // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/routes.js                                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
if (Meteor.settings.public.show.checklists) {                                                                    // 1
  Router.route("/checklists", {                                                                                  // 2
    name: "checklists",                                                                                          // 3
    waitOn: function () {                                                                                        // 4
      return [                                                                                                   // 5
        Meteor.subscribe("checklists"),                                                                          // 6
        Meteor.subscribe("members"),                                                                             // 7
        Meteor.subscribe("rkSettings"),                                                                          // 8
      ];                                                                                                         // 9
    },                                                                                                           // 10
  });                                                                                                            // 11
}                                                                                                                // 12
                                                                                                                 // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/template.checklists.js                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("checklists");                                                                              // 2
Template["checklists"] = new Template("Template.checklists", (function() {                                       // 3
  var view = this;                                                                                               // 4
  return [ HTML.DIV({                                                                                            // 5
    "class": "row"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                          // 7
    "class": "col-md-12"                                                                                         // 8
  }, "\n			 ", HTML.DIV({                                                                                        // 9
    "class": "panel panel-default"                                                                               // 10
  }, "\n				", HTML.DIV({                                                                                        // 11
    "class": "panel-heading",                                                                                    // 12
    style: "position:relative"                                                                                   // 13
  }, "\n					", HTML.H3({                                                                                        // 14
    "class": "panel-title"                                                                                       // 15
  }, Blaze.View("lookup:_", function() {                                                                         // 16
    return Spacebars.mustache(view.lookup("_"), "Trello Upload");                                                // 17
  })), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					<input type="file" id="files" name="files[]">\n				</div>'), "\n				"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"                                                                                               // 19
  }, "\n		", HTML.DIV({                                                                                          // 20
    "class": "col-md-12"                                                                                         // 21
  }, "\n			 ", HTML.DIV({                                                                                        // 22
    "class": "panel panel-default"                                                                               // 23
  }, "\n			 	", HTML.DIV({                                                                                       // 24
    "class": "panel-heading",                                                                                    // 25
    style: "position:relative"                                                                                   // 26
  }, "\n			 		", HTML.H3({                                                                                       // 27
    "class": "panel-title"                                                                                       // 28
  }, Blaze.View("lookup:_", function() {                                                                         // 29
    return Spacebars.mustache(view.lookup("_"), "Trello Content");                                               // 30
  })), "\n        "), "\n				", HTML.DIV({                                                                       // 31
    "class": "panel-body"                                                                                        // 32
  }, "\n						", Blaze._TemplateWith(function() {                                                                // 33
    return {                                                                                                     // 34
      collection: Spacebars.call(view.lookup("Trello")),                                                         // 35
      settings: Spacebars.call(view.lookup("settingsTrello"))                                                    // 36
    };                                                                                                           // 37
  }, function() {                                                                                                // 38
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                              // 39
  }), "\n        "), "\n    		"), "\n		"), "\n	") ];                                                             // 40
}));                                                                                                             // 41
                                                                                                                 // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/checklists.js                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Template.checklists.rendered = function () {                                                                     // 1
                                                                                                                 // 2
};                                                                                                               // 3
                                                                                                                 // 4
Template.checklists.helpers({                                                                                    // 5
	CheckLists: function () {                                                                                       // 6
		return CheckLists.find().fetch();                                                                              // 7
	},                                                                                                              // 8
	settingsCheckLists: function () {                                                                               // 9
    return {                                                                                                     // 10
        rowsPerPage: 100,                                                                                        // 11
        showFilter: true,                                                                                        // 12
        class: 'table table-condensed col-sm-12',                                                                // 13
			}                                                                                                             // 14
	},                                                                                                              // 15
});                                                                                                              // 16
                                                                                                                 // 17
Template.checklists.events({                                                                                     // 18
                                                                                                                 // 19
});                                                                                                              // 20
                                                                                                                 // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/template.checklistsSettings.js                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("checklistsSettings");                                                                      // 2
Template["checklistsSettings"] = new Template("Template.checklistsSettings", (function() {                       // 3
  var view = this;                                                                                               // 4
  return HTML.DIV({                                                                                              // 5
    "class": "row"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                          // 7
    "class": "col-md-12"                                                                                         // 8
  }, "\n			 ", HTML.DIV({                                                                                        // 9
    "class": "panel panel-default"                                                                               // 10
  }, "\n				", HTML.DIV({                                                                                        // 11
    "class": "panel-heading",                                                                                    // 12
    style: "position:relative"                                                                                   // 13
  }, "\n					", HTML.H3({                                                                                        // 14
    "class": "panel-title"                                                                                       // 15
  }, Blaze.View("lookup:_", function() {                                                                         // 16
    return Spacebars.mustache(view.lookup("_"), "Checklists");                                                   // 17
  })), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					\n				</div>'), "\n				"), "\n		"), "\n	"); // 18
}));                                                                                                             // 19
                                                                                                                 // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:checklists'] = {
  RKCheckLists: RKCheckLists
};

})();
