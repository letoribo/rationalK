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
var RKFilesContent, __, registerI18nTemplate, registerTemplate, non_package_templates, FilesContent, fileLink, fileLinkUrl, translations;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/package-i18n.js                                                            //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
TAPi18n.packages["rationalk:filecontent"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                             // 2
// define package's translation function (proxy to the i18next)                                              // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                             // 4
// define the package's templates registrar                                                                  // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:filecontent");                            // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                             // 8
// Record the list of templates prior to package load                                                        // 9
var _ = Package.underscore._;                                                                                // 10
non_package_templates = _.keys(Template);                                                                    // 11
                                                                                                             // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/methods.js                                                             //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
RKFilesContent = {};                                                                                         // 1
RKFilesContent.Collections =  {};                                                                            // 2
RKCore.searchResultsPackage.push(                                                                            // 3
  {                                                                                                          // 4
    name: "RKFilesContent", // a publication with the name : RKSheetConnector-searchResults should exists    // 5
  }                                                                                                          // 6
);                                                                                                           // 7
                                                                                                             // 8
RKFilesContent.findAllFullTextSearch = function () {                                                         // 9
  return FilesContent.find({}, {sort: {score: -1}}).fetch();                                                 // 10
};                                                                                                           // 11
                                                                                                             // 12
RKFilesContent.findFullText = function (searchQuery) {                                                       // 13
  var sr;                                                                                                    // 14
  sr = FilesContent.find(                                                                                    // 15
    {                                                                                                        // 16
      $text: {                                                                                               // 17
        $search: searchQuery,                                                                                // 18
      },                                                                                                     // 19
    },                                                                                                       // 20
    {                                                                                                        // 21
      fields: { score: { $meta: 'textScore' } },                                                             // 22
      sort: { score: { $meta: 'textScore' } },                                                               // 23
      limit: 30,                                                                                             // 24
    });                                                                                                      // 25
    RKCore.log("I am here FilesContent");                                                                    // 26
    RKCore.log(sr.fetch());                                                                                  // 27
  return sr;                                                                                                 // 28
};                                                                                                           // 29
                                                                                                             // 30
RKFilesContent.findDummy = function () {                                                                     // 31
  return FilesContent.find({$text: { $search: "somethingthatyouwillneverfind" }});                           // 32
};                                                                                                           // 33
                                                                                                             // 34
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/collections.js                                                         //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
FilesContent = new Mongo.Collection('FilesContent');                                                         // 1
                                                                                                             // 2
FilesContent.allow( {                                                                                        // 3
		insert: function (userId) {return !! userId; },                                                            // 4
		update: function (userId) {return !!userId; },                                                             // 5
    remove: function (userId) {return !!userId; },                                                           // 6
});                                                                                                          // 7
                                                                                                             // 8
if (Meteor.isServer) {                                                                                       // 9
	if (typeof FilesContent.createIndex === 'function') {                                                       // 10
		FilesContent.createIndex({ text: "text" }, { name: "TextIndex" });                                         // 11
	}                                                                                                           // 12
	else {                                                                                                      // 13
		if (typeof FilesContent._ensureIndex === 'function') {                                                     // 14
			FilesContent._ensureIndex( { text: "text" }, {name: "TextIndex"});                                        // 15
		}                                                                                                          // 16
	}                                                                                                           // 17
}                                                                                                            // 18
                                                                                                             // 19
// Expose collections if needed :                                                                            // 20
//RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                                  // 21
                                                                                                             // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/routes.js                                                              //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
if (Meteor.settings.public.show.filecontent) {                                                               // 1
                                                                                                             // 2
}                                                                                                            // 3
                                                                                                             // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/client/template.settings.js                                            //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
                                                                                                             // 1
Template.__checkName("settingsFilesContent");                                                                // 2
Template["settingsFilesContent"] = new Template("Template.settingsFilesContent", (function() {               // 3
  var view = this;                                                                                           // 4
  return HTML.DIV({                                                                                          // 5
    "class": "row"                                                                                           // 6
  }, "\n		", HTML.DIV({                                                                                      // 7
    "class": "col-md-12"                                                                                     // 8
  }, "\n			 ", HTML.DIV({                                                                                    // 9
    "class": "panel panel-default"                                                                           // 10
  }, "\n			 		", HTML.DIV({                                                                                  // 11
    "class": "panel-heading",                                                                                // 12
    style: "position:relative"                                                                               // 13
  }, "\n						", HTML.H3({                                                                                   // 14
    "class": "panel-title"                                                                                   // 15
  }, Blaze.View("lookup:_", function() {                                                                     // 16
    return Spacebars.mustache(view.lookup("_"), "Files content");                                            // 17
  })), "\n					"), "\n					", HTML.DIV({                                                                     // 18
    "class": "panel-body"                                                                                    // 19
  }, "\n            ", HTML.DIV({                                                                            // 20
    "class": "post"                                                                                          // 21
  }, "\n              ", HTML.P(HTML.A({                                                                     // 22
    href: "#",                                                                                               // 23
    "class": "scanFilesContent",                                                                             // 24
    title: function() {                                                                                      // 25
      return Spacebars.mustache(view.lookup("_"), "Scan all files for their content");                       // 26
    }                                                                                                        // 27
  }, Blaze.View("lookup:_", function() {                                                                     // 28
    return Spacebars.mustache(view.lookup("_"), "Scan all files for their content");                         // 29
  }))), "\n              ", HTML.P(HTML.A({                                                                  // 30
    href: "#",                                                                                               // 31
    "class": "removeFilesContent",                                                                           // 32
    title: function() {                                                                                      // 33
      return Spacebars.mustache(view.lookup("_"), "Reset files content database");                           // 34
    }                                                                                                        // 35
  }, Blaze.View("lookup:_", function() {                                                                     // 36
    return Spacebars.mustache(view.lookup("_"), "Reset files content database");                             // 37
  }))), "\n						"), "\n        	"), "\n    		"), "\n		"), "\n	");                                           // 38
}));                                                                                                         // 39
                                                                                                             // 40
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/client/settings.js                                                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
Template.settingsFilesContent.events({                                                                       // 1
  "click a.scanFilesContent": function (e) {                                                                 // 2
    e.preventDefault();                                                                                      // 3
    Meteor.call("indexFilesContent", function (error, results) {                                             // 4
  		if (error) {                                                                                             // 5
  		  RKCore.log("error from the meteor call indexFilesContent :");                                          // 6
  		  RKCore.log(error);                                                                                     // 7
      }                                                                                                      // 8
      if (results){                                                                                          // 9
  		  RKCore.log("results from the meteor call indexFilesContent :");                                        // 10
  		  RKCore.log(results);                                                                                   // 11
  		}                                                                                                        // 12
    });                                                                                                      // 13
    return false;                                                                                            // 14
  },                                                                                                         // 15
  "click a.removeFilesContent": function (e) {                                                               // 16
    e.preventDefault();                                                                                      // 17
    Meteor.call("removeFilesContent", function (error, results) {                                            // 18
      if (error) {                                                                                           // 19
  		  RKCore.log("error from the meteor call removeFilesContent :");                                         // 20
  		  RKCore.log(error);                                                                                     // 21
      }                                                                                                      // 22
      if (results){                                                                                          // 23
  		  RKCore.log("results from the meteor call removeFilesContent :");                                       // 24
  		  RKCore.log(results);                                                                                   // 25
  		}                                                                                                        // 26
    });                                                                                                      // 27
    return false;                                                                                            // 28
  },                                                                                                         // 29
});                                                                                                          // 30
                                                                                                             // 31
                                                                                                             // 32
Template.settingsFilesContent.helpers({                                                                      // 33
                                                                                                             // 34
});                                                                                                          // 35
                                                                                                             // 36
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/client/template.filesContentInSearchResults.js                         //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
                                                                                                             // 1
Template.__checkName("filesContentInSearchResults");                                                         // 2
Template["filesContentInSearchResults"] = new Template("Template.filesContentInSearchResults", (function() { // 3
  var view = this;                                                                                           // 4
  return HTML.DIV({                                                                                          // 5
    "class": "post"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                      // 7
    "class": "row"                                                                                           // 8
  }, "\n			", HTML.DIV({                                                                                     // 9
    "class": "col-md-10"                                                                                     // 10
  }, "\n				", HTML.P(Blaze.View("lookup:shortText", function() {                                            // 11
    return Spacebars.mustache(view.lookup("shortText"));                                                     // 12
  })), "\n			"), "\n			", HTML.DIV({                                                                         // 13
    "class": "col-md-2"                                                                                      // 14
  }, "\n				", HTML.SPAN({                                                                                   // 15
    "class": "label label-default"                                                                           // 16
  }, Blaze.View("lookup:_", function() {                                                                     // 17
    return Spacebars.mustache(view.lookup("_"), "File content");                                             // 18
  })), "\n				", HTML.Raw("<br>"), "\n				", Blaze.If(function() {                                           // 19
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                        // 20
  }, function() {                                                                                            // 21
    return [ "\n					", HTML.P(Blaze.View("lookup:_", function() {                                           // 22
      return Spacebars.mustache(view.lookup("_"), "Search score");                                           // 23
    }), " : ", Blaze.View("lookup:textScore", function() {                                                   // 24
      return Spacebars.mustache(view.lookup("textScore"));                                                   // 25
    })), "\n				" ];                                                                                         // 26
  }), "\n			"), "\n		"), "\n	");                                                                             // 27
}));                                                                                                         // 28
                                                                                                             // 29
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/lib/client/filesContentInSearchResults.js                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
Template.filesContentInSearchResults.events({                                                                // 1
	"click .searchThisTag": function (e, t) {                                                                   // 2
			e.preventDefault();                                                                                       // 3
			if (Meteor.settings.public.debug){                                                                        // 4
				console.log(e.target.dataset.tag)                                                                        // 5
			}                                                                                                         // 6
			Session.set("searchQuery",e.target.dataset.tag);                                                          // 7
			document.getElementById("keywords").value = e.target.dataset.tag ;                                        // 8
			Session.set("searchType","regexpSearch");                                                                 // 9
			document.getElementById("searchType").value = "regexpSearch";                                             // 10
      return false;                                                                                          // 11
  }                                                                                                          // 12
});                                                                                                          // 13
                                                                                                             // 14
                                                                                                             // 15
Template.filesContentInSearchResults.helpers({                                                               // 16
	shortText: function() {                                                                                     // 17
		return this.text.substring(0, 500);                                                                        // 18
	},                                                                                                          // 19
	searchTypeIsFullTextSearch: function () {                                                                   // 20
		return (Session.get('searchType')==='fullTextSearch')                                                      // 21
	},                                                                                                          // 22
	categoryName: function (){                                                                                  // 23
		var Category = Categories.findOne(this.categoryId);                                                        // 24
		return Category.name;                                                                                      // 25
	},                                                                                                          // 26
	textScore: function (){                                                                                     // 27
		//limit to 2 digits after comma :                                                                          // 28
		return Math.round(this.score*100)/100;                                                                     // 29
	},                                                                                                          // 30
	fileLinkUrl: function () {                                                                                  // 31
			fileLink = clientFilename(this.filePath);                                                                 // 32
	  	return fileLinkUrl = 'rk:'+fileLink;                                                                     // 33
  },                                                                                                         // 34
	userSpaceIcon: function () {                                                                                // 35
		if (userSpaceHasDoc(Meteor.userId(), this._id))                                                            // 36
			return 'glyphicon-star';                                                                                  // 37
		else                                                                                                       // 38
			return 'glyphicon-star-empty';                                                                            // 39
	},                                                                                                          // 40
	userSpaceLinkTitle: function () {                                                                           // 41
		if (userSpaceHasDoc(Meteor.userId(), this._id))                                                            // 42
			return TAPi18n.__('Remove from my space');                                                                // 43
		else                                                                                                       // 44
			return TAPi18n.__('Add to my space');                                                                     // 45
	}                                                                                                           // 46
});                                                                                                          // 47
                                                                                                             // 48
var userSpaceHasDoc = function (userId, docId) {                                                             // 49
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);                                       // 50
};                                                                                                           // 51
                                                                                                             // 52
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/packages/rationalk:filecontenti18n/en.i18n.js                              //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var _ = Package.underscore._,                                                                                // 1
    package_name = "rationalk:filecontent",                                                                  // 2
    namespace = "rationalk:filecontent";                                                                     // 3
                                                                                                             // 4
if (package_name != "project") {                                                                             // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                    // 6
}                                                                                                            // 7
// integrate the fallback language translations                                                              // 8
translations = {};                                                                                           // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};     // 10
TAPi18n._loadLangFileObject("en", translations);                                                             // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                               // 12
                                                                                                             // 13
for (var i = 0; i < package_templates.length; i++) {                                                         // 14
  var package_template = package_templates[i];                                                               // 15
                                                                                                             // 16
  registerI18nTemplate(package_template);                                                                    // 17
}                                                                                                            // 18
                                                                                                             // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/rationalk:filecontent/packages/rationalk:filecontenti18n/fr.i18n.js                              //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var _ = Package.underscore._,                                                                                // 1
    package_name = "rationalk:filecontent",                                                                  // 2
    namespace = "rationalk:filecontent";                                                                     // 3
                                                                                                             // 4
if (package_name != "project") {                                                                             // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                    // 6
}                                                                                                            // 7
                                                                                                             // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:filecontent'] = {
  RKFilesContent: RKFilesContent
};

})();
