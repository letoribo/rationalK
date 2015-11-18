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
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
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
var RKSheetConnector, __, registerI18nTemplate, registerTemplate, non_package_templates, External, translations;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/package-i18n.js                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
TAPi18n.packages["rationalk:sheetconnector"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                            // 2
// define package's translation function (proxy to the i18next)                                             // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                            // 4
// define the package's templates registrar                                                                 // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:sheetconnector");                        // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                            // 8
// Record the list of templates prior to package load                                                       // 9
var _ = Package.underscore._;                                                                               // 10
non_package_templates = _.keys(Template);                                                                   // 11
                                                                                                            // 12
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/methods.js                                                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
RKSheetConnector = {};                                                                                      // 1
RKSheetConnector.Collections =  {};                                                                         // 2
RKCore.searchResultsPackage.push(                                                                           // 3
  {                                                                                                         // 4
    name: "RKSheetConnector", // a publication with the name : RKSheetConnector-searchResults should exists // 5
  }                                                                                                         // 6
);                                                                                                          // 7
                                                                                                            // 8
RKSheetConnector.findAllFullTextSearch = function () {                                                      // 9
  return External.find({}, {sort: {score: -1}}).fetch();                                                    // 10
};                                                                                                          // 11
                                                                                                            // 12
RKSheetConnector.findFullText = function (searchQuery) {                                                    // 13
  var sr;                                                                                                   // 14
  sr = External.find(                                                                                       // 15
    {                                                                                                       // 16
      $text: {                                                                                              // 17
        $search: searchQuery,                                                                               // 18
      },                                                                                                    // 19
    },                                                                                                      // 20
    {                                                                                                       // 21
        fields: { score: { $meta: 'textScore' } },                                                          // 22
        sort: { score: { $meta: 'textScore' } },                                                            // 23
        limit: 30,                                                                                          // 24
    });                                                                                                     // 25
  return sr;                                                                                                // 26
};                                                                                                          // 27
                                                                                                            // 28
RKSheetConnector.findDummy = function () {                                                                  // 29
  return External.find({$text: { $search: "somethingthatyouwillneverfind" }});                              // 30
};                                                                                                          // 31
                                                                                                            // 32
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/collections.js                                                     //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
External = new Mongo.Collection('external');                                                                // 1
                                                                                                            // 2
External.allow( {                                                                                           // 3
		insert: function (userId) {return !! userId; },                                                           // 4
		update: function (userId) {return !!userId; },                                                            // 5
    remove: function (userId) {return !!userId; },                                                          // 6
});                                                                                                         // 7
                                                                                                            // 8
if (Meteor.isServer) {                                                                                      // 9
	if (typeof External.createIndex === 'function') {                                                          // 10
		External.createIndex({ "$**": "text" }, { name: "TextIndex" });                                           // 11
	}                                                                                                          // 12
	else {                                                                                                     // 13
		if (typeof External._ensureIndex === 'function') {                                                        // 14
			External._ensureIndex({ "$**": "text" }, { name: "TextIndex" });                                         // 15
		}                                                                                                         // 16
	}                                                                                                          // 17
}                                                                                                           // 18
                                                                                                            // 19
// Expose collections if needed :                                                                           // 20
//RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                                 // 21
                                                                                                            // 22
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/routes.js                                                          //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
if (Meteor.settings.public.show.sheetconnector) {                                                           // 1
  Router.route("/external/:externalDocId?", {                                                               // 2
    name: "external",                                                                                       // 3
    layoutTemplate: 'externalLayout',                                                                       // 4
    waitOn: function () {                                                                                   // 5
      if (typeof Session.get("externalDocId") === 'undefined') {                                            // 6
        Session.set("externalDocId", "");                                                                   // 7
      }                                                                                                     // 8
      return [                                                                                              // 9
        Meteor.subscribe("external", Session.get('externalDocId')),                                         // 10
      ];                                                                                                    // 11
    },                                                                                                      // 12
  });                                                                                                       // 13
}                                                                                                           // 14
                                                                                                            // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/client/template.external.js                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.__checkName("external");                                                                           // 2
Template["external"] = new Template("Template.external", (function() {                                      // 3
  var view = this;                                                                                          // 4
  return HTML.DIV({                                                                                         // 5
    "class": "row"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                     // 7
    "class": "col-md-12"                                                                                    // 8
  }, "\n			 ", HTML.DIV({                                                                                   // 9
    "class": "panel panel-default"                                                                          // 10
  }, "\n				 	", HTML.DIV({                                                                                 // 11
    "class": "panel-heading",                                                                               // 12
    style: "position:relative"                                                                              // 13
  }, "\n				 		", HTML.H3({                                                                                 // 14
    "class": "panel-title"                                                                                  // 15
  }, Blaze.View("lookup:_", function() {                                                                    // 16
    return Spacebars.mustache(view.lookup("_"), "External");                                                // 17
  }), " ", Blaze.View("lookup:externalDocId", function() {                                                  // 18
    return Spacebars.mustache(view.lookup("externalDocId"));                                                // 19
  }), " ", HTML.Raw('<!-- <a href="#" class="pull-right updateExcel" id="updateExcel" title="Update"><span class="glyphicon glyphicon-refresh"></span></a>-->')), "\n	        "), "\n					", HTML.DIV({
    "class": "panel-body"                                                                                   // 21
  }, "\n						", Blaze._TemplateWith(function() {                                                           // 22
    return {                                                                                                // 23
      collection: Spacebars.call(view.lookup("external"))                                                   // 24
    };                                                                                                      // 25
  }, function() {                                                                                           // 26
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                         // 27
  }), "\n	        "), "\n	    	"), "\n		"), "\n	");                                                         // 28
}));                                                                                                        // 29
                                                                                                            // 30
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/client/external.js                                                 //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Template.external.rendered = function () {                                                                  // 1
	var externalDocId = Router.current().params.externalDocId;                                                 // 2
	if (typeof(externalDocId) !== 'undefined') {                                                               // 3
		RKCore.log(externalDocId);                                                                                // 4
		Session.set('externalDocId', externalDocId);                                                              // 5
	}                                                                                                          // 6
	Meteor.call('updateExcel', externalDocId, function () {} );                                                // 7
};                                                                                                          // 8
                                                                                                            // 9
Template.external.events({                                                                                  // 10
	"click a.updateExcel": function (e) {                                                                      // 11
		var externalDocId = Session.get('externalDocId');                                                         // 12
		e.preventDefault();                                                                                       // 13
		Meteor.call('updateExcel', externalDocId, function () {});                                                // 14
	},                                                                                                         // 15
});                                                                                                         // 16
                                                                                                            // 17
Template.external.helpers({                                                                                 // 18
  external: function () {                                                                                   // 19
    return External.find({}, //find all because other are not published                                     // 20
			{ externalDocId: 0 }                                                                                     // 21
		).fetch();                                                                                                // 22
  },                                                                                                        // 23
	externalDocId: function () {                                                                               // 24
    return Session.get('externalDocId');                                                                    // 25
  },                                                                                                        // 26
});                                                                                                         // 27
                                                                                                            // 28
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/client/template.sheetInSearchResults.js                            //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.__checkName("sheetInSearchResults");                                                               // 2
Template["sheetInSearchResults"] = new Template("Template.sheetInSearchResults", (function() {              // 3
  var view = this;                                                                                          // 4
  return HTML.DIV({                                                                                         // 5
    "class": "post"                                                                                         // 6
  }, "\n		", HTML.DIV({                                                                                     // 7
    "class": "row"                                                                                          // 8
  }, "\n			", HTML.DIV({                                                                                    // 9
    "class": "col-md-10"                                                                                    // 10
  }, "\n				", Blaze.Each(function() {                                                                      // 11
    return Spacebars.call(view.lookup("content"));                                                          // 12
  }, function() {                                                                                           // 13
    return [ "\n					", HTML.P(HTML.STRONG(Blaze.View("lookup:headerName", function() {                     // 14
      return Spacebars.mustache(view.lookup("headerName"));                                                 // 15
    }), " : "), Blaze.View("lookup:value", function() {                                                     // 16
      return Spacebars.mustache(view.lookup("value"));                                                      // 17
    })), "\n				" ];                                                                                        // 18
  }), "\n			"), "\n			", HTML.DIV({                                                                         // 19
    "class": "col-md-2"                                                                                     // 20
  }, "\n				", HTML.SPAN({                                                                                  // 21
    "class": "label label-default"                                                                          // 22
  }, Blaze.View("lookup:_", function() {                                                                    // 23
    return Spacebars.mustache(view.lookup("_"), "External sheet");                                          // 24
  }), " : ", Blaze.View("lookup:externalDocId", function() {                                                // 25
    return Spacebars.mustache(view.lookup("externalDocId"));                                                // 26
  })), "\n				", HTML.Raw("<br>"), "\n				", HTML.A({                                                       // 27
    href: function() {                                                                                      // 28
      return Spacebars.mustache(view.lookup("pathFor"), "external", Spacebars.kw({                          // 29
        externalDocId: Spacebars.dot(view.lookup("."), "externalDocId")                                     // 30
      }));                                                                                                  // 31
    },                                                                                                      // 32
    title: function() {                                                                                     // 33
      return Spacebars.mustache(view.lookup("_"), "View the published document");                           // 34
    }                                                                                                       // 35
  }, HTML.Raw('<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>')), "\n				", HTML.Raw("<br>"), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                       // 37
  }, function() {                                                                                           // 38
    return [ "\n					", HTML.P(Blaze.View("lookup:_", function() {                                          // 39
      return Spacebars.mustache(view.lookup("_"), "Search score");                                          // 40
    }), " : ", Blaze.View("lookup:textScore", function() {                                                  // 41
      return Spacebars.mustache(view.lookup("textScore"));                                                  // 42
    })), "\n				" ];                                                                                        // 43
  }), "\n			"), "\n		"), "\n	");                                                                            // 44
}));                                                                                                        // 45
                                                                                                            // 46
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/lib/client/sheetInSearchResults.js                                     //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Template.sheetInSearchResults.events({                                                                      // 1
                                                                                                            // 2
});                                                                                                         // 3
                                                                                                            // 4
Template.sheetInSearchResults.helpers({                                                                     // 5
	searchTypeIsFullTextSearch: function () {                                                                  // 6
		return (Session.get('searchType') === 'fullTextSearch');                                                  // 7
	},                                                                                                         // 8
	textScore: function () {                                                                                   // 9
		return Math.round(this.score * 100) / 100;                                                                // 10
	},                                                                                                         // 11
});                                                                                                         // 12
                                                                                                            // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/packages/rationalk:sheetconnectori18n/en.i18n.js                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _ = Package.underscore._,                                                                               // 1
    package_name = "rationalk:sheetconnector",                                                              // 2
    namespace = "rationalk:sheetconnector";                                                                 // 3
                                                                                                            // 4
if (package_name != "project") {                                                                            // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                   // 6
}                                                                                                           // 7
// integrate the fallback language translations                                                             // 8
translations = {};                                                                                          // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};    // 10
TAPi18n._loadLangFileObject("en", translations);                                                            // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                              // 12
                                                                                                            // 13
for (var i = 0; i < package_templates.length; i++) {                                                        // 14
  var package_template = package_templates[i];                                                              // 15
                                                                                                            // 16
  registerI18nTemplate(package_template);                                                                   // 17
}                                                                                                           // 18
                                                                                                            // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/rationalk:sheetconnector/packages/rationalk:sheetconnectori18n/fr.i18n.js                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _ = Package.underscore._,                                                                               // 1
    package_name = "rationalk:sheetconnector",                                                              // 2
    namespace = "rationalk:sheetconnector";                                                                 // 3
                                                                                                            // 4
if (package_name != "project") {                                                                            // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                   // 6
}                                                                                                           // 7
                                                                                                            // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:sheetconnector'] = {
  RKSheetConnector: RKSheetConnector
};

})();
