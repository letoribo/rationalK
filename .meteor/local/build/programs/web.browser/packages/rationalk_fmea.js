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
var RKFMEA, __, registerI18nTemplate, registerTemplate, non_package_templates, PFMEA, corePFMEA, SettingsFMEA, urlCorePFMEA, menuHTML, i, deleteLink, nRows, translations;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/package-i18n.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
TAPi18n.packages["rationalk:fmea"] = {"translation_function_name":"__","helper_name":"_","namespace":"rationalk:fmea"};
                                                                                                                     // 2
// define package's translation function (proxy to the i18next)                                                      // 3
__ = TAPi18n._getPackageI18nextProxy("rationalk:fmea");                                                              // 4
// define the package's templates registrar                                                                          // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:fmea");                                           // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                     // 8
// Record the list of templates prior to package load                                                                // 9
var _ = Package.underscore._;                                                                                        // 10
non_package_templates = _.keys(Template);                                                                            // 11
                                                                                                                     // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/methods.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RKFMEA = {};                                                                                                         // 1
RKFMEA.Collections = {};                                                                                             // 2
RKFMEA.Collections.corePFMEA = corePFMEA;                                                                            // 3
RKFMEA.corePFMEA = {};                                                                                               // 4
RKFMEA.coreDFMEA = {}; //no used                                                                                     // 5
                                                                                                                     // 6
Meteor.methods({                                                                                                     // 7
	createCorePFMEALine: function () {                                                                                  // 8
		corePFMEA.insert(                                                                                                  // 9
			{                                                                                                                 // 10
				processStepDesignation: "Turning",                                                                               // 11
				partType: "Inner Ring",                                                                                          // 12
				machineType: "CNC",                                                                                              // 13
			  potentialFailureMode: "The inner diameter is too small",                                                        // 14
				effectOfFailure: "Trash",                                                                                        // 15
				potentialCauseOfFailure: "Tool broken",                                                                          // 16
				currentDesignPrevention: "Maintenance programm",                                                                 // 17
				currentDesignDetection: "SPC",                                                                                   // 18
				S:6,                                                                                                             // 19
				D:2,                                                                                                             // 20
				O:3,                                                                                                             // 21
				full: "Turning Inner Ring CNC The inner diameter is too small Trash Tool broken Maintenance programm SPC",       // 22
				searchResultFromCorePFMEA: true,                                                                                 // 23
			}                                                                                                                 // 24
		);                                                                                                                 // 25
		if (typeof(toastr) !== 'undefined') {                                                                              // 26
			toastr.success('A new line has been added successfully');                                                         // 27
		}                                                                                                                  // 28
	},                                                                                                                  // 29
	deleteCorePFMEALine: function (lineId) {                                                                            // 30
		check(lineId, String);                                                                                             // 31
		corePFMEA.remove(                                                                                                  // 32
			{                                                                                                                 // 33
			  _id: lineId,                                                                                                    // 34
			}                                                                                                                 // 35
		);                                                                                                                 // 36
		if (typeof(toastr) !== 'undefined') {                                                                              // 37
			toastr.success('Line deleted succesfully');                                                                       // 38
		}                                                                                                                  // 39
	},                                                                                                                  // 40
	updateCorePFMEALine: function (data) {                                                                              // 41
		var full = '';                                                                                                     // 42
		check(data, Match.Any);                                                                                            // 43
		full = full.concat(data.processStepDesignation).concat(" ");                                                       // 44
		full = full.concat(data.partType).concat(" ");                                                                     // 45
		full = full.concat(data.machineType).concat(" ");                                                                  // 46
		full = full.concat(data.potentialFailureMode).concat(" ");                                                         // 47
		full = full.concat(data.effectOfFailure).concat(" ");                                                              // 48
		full = full.concat(data.potentialCauseOfFailure).concat(" ");                                                      // 49
		full = full.concat(data.currentDesignPrevention).concat(" ");                                                      // 50
		full = full.concat(data.currentDesignDetection).concat(" ");                                                       // 51
                                                                                                                     // 52
		if (Meteor.settings.public.debug) {                                                                                // 53
			console.log("full : " + full);                                                                                    // 54
		}                                                                                                                  // 55
		corePFMEA.update(                                                                                                  // 56
			{                                                                                                                 // 57
			  $and: [                                                                                                         // 58
			  	{                                                                                                              // 59
						_id: data.lineId,                                                                                              // 60
					},                                                                                                              // 61
			  ],                                                                                                              // 62
			},                                                                                                                // 63
			{                                                                                                                 // 64
					// stepNumber: data.stepNumber,                                                                                 // 65
		      processStepDesignation: data.processStepDesignation,                                                         // 66
		      partType: data.partType,                                                                                     // 67
		      machineType: data.machineType,                                                                               // 68
		      potentialFailureMode: data.potentialFailureMode,                                                             // 69
		      effectOfFailure: data.effectOfFailure,                                                                       // 70
		      S: data.S,                                                                                                   // 71
		      specialCharacteristic: data.specialCharacteristic,                                                           // 72
		      potentialCauseOfFailure: data.potentialCauseOfFailure,                                                       // 73
		      currentDesignPrevention: data.currentDesignPrevention,                                                       // 74
		      O: data.O,                                                                                                   // 75
		      currentDesignDetection: data.currentDesignDetection,                                                         // 76
		      D: data.D,                                                                                                   // 77
					full: full,                                                                                                     // 78
					searchResultFromCorePFMEA: true,                                                                                // 79
			},                                                                                                                // 80
			{                                                                                                                 // 81
			    upsert: true,                                                                                                 // 82
			}                                                                                                                 // 83
		);                                                                                                                 // 84
		if (typeof(toastr) !== 'undefined') {                                                                              // 85
			toastr.success('The line has been updated successfully');                                                         // 86
		}                                                                                                                  // 87
	},                                                                                                                  // 88
});                                                                                                                  // 89
                                                                                                                     // 90
RKFMEA.corePFMEA.findAll = function () {                                                                             // 91
  return corePFMEA.find({}, {sort: {score: -1}}).fetch();                                                            // 92
};                                                                                                                   // 93
                                                                                                                     // 94
RKFMEA.corePFMEA.findFullText = function (searchQuery) {                                                             // 95
  return corePFMEA.find( {                                                                                           // 96
        $text: {                                                                                                     // 97
          $search: searchQuery,                                                                                      // 98
        },                                                                                                           // 99
    }, {                                                                                                             // 100
        fields: { score: { $meta: 'textScore' } },                                                                   // 101
        sort: { score: { $meta: 'textScore' } },                                                                     // 102
        limit: 30,                                                                                                   // 103
    });                                                                                                              // 104
};                                                                                                                   // 105
                                                                                                                     // 106
RKFMEA.corePFMEA.findDummy = function () {                                                                           // 107
  return corePFMEA.find({$text: { $search: "somethingthatyouwillneverfind" }});                                      // 108
};                                                                                                                   // 109
                                                                                                                     // 110
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/collections.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
PFMEA = new Mongo.Collection('pfmea');                                                                               // 1
corePFMEA = new Mongo.Collection('corepfmea');                                                                       // 2
SettingsFMEA = new Mongo.Collection('settingsfmea');                                                                 // 3
                                                                                                                     // 4
PFMEA.allow( {                                                                                                       // 5
		insert: function (userId) {return !! userId; },                                                                    // 6
		update: function (userId) {return !!userId; },                                                                     // 7
    remove: function (userId) {return !!userId; },                                                                   // 8
});                                                                                                                  // 9
                                                                                                                     // 10
corePFMEA.allow( {                                                                                                   // 11
		insert: function (userId) {return !! userId; },                                                                    // 12
		update: function (userId) {return !!userId; },                                                                     // 13
    remove: function (userId) {return !!userId; },                                                                   // 14
});                                                                                                                  // 15
                                                                                                                     // 16
SettingsFMEA.allow( {                                                                                                // 17
		insert: function (userId) {return !! userId; },                                                                    // 18
		update: function (userId) {return !!userId; },                                                                     // 19
    remove: function (userId) {return !!userId; },                                                                   // 20
});                                                                                                                  // 21
                                                                                                                     // 22
if (Meteor.isServer) {                                                                                               // 23
	if (typeof corePFMEA.createIndex === 'function') {                                                                  // 24
		corePFMEA.createIndex({ full: "text" }, { name: "TextIndex" });                                                    // 25
	}                                                                                                                   // 26
	else {                                                                                                              // 27
		if (typeof corePFMEA._ensureIndex === 'function') {                                                                // 28
			corePFMEA._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                   // 29
	}                                                                                                                   // 30
}                                                                                                                    // 31
} //end if Server                                                                                                    // 32
                                                                                                                     // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/routes.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.settings.public.show.projects) {                                                                          // 1
  Router.route("/fmea/p/core", {                                                                                     // 2
    name: "corePFMEA",                                                                                               // 3
    waitOn: function () {                                                                                            // 4
      return [                                                                                                       // 5
        Meteor.subscribe("corePFMEA"),                                                                               // 6
      ];                                                                                                             // 7
    },                                                                                                               // 8
  });                                                                                                                // 9
                                                                                                                     // 10
  Router.route("/fmea/p/core/import", {                                                                              // 11
    name: "importCorePFMEA",                                                                                         // 12
  });                                                                                                                // 13
                                                                                                                     // 14
  Router.route("/fmea/p/core/editLine/:_id", {                                                                       // 15
    name: "editPFMEALine",                                                                                           // 16
    data: function () {                                                                                              // 17
      return corePFMEA.findOne(this.params._id);                                                                     // 18
    },                                                                                                               // 19
    waitOn: function () {                                                                                            // 20
      return [                                                                                                       // 21
        Meteor.subscribe("corePFMEALine", this.params._id),                                                          // 22
       ];                                                                                                            // 23
    },                                                                                                               // 24
  });                                                                                                                // 25
                                                                                                                     // 26
                                                                                                                     // 27
  Router.route("/fmea/settings", {                                                                                   // 28
    name: "settingsFMEA",                                                                                            // 29
    waitOn: function () {                                                                                            // 30
      return [                                                                                                       // 31
        Meteor.subscribe("settingsfmea"),                                                                            // 32
       ];                                                                                                            // 33
    },                                                                                                               // 34
  });                                                                                                                // 35
                                                                                                                     // 36
                                                                                                                     // 37
  urlCorePFMEA = Router.routes.corePFMEA.path();                                                                     // 38
  menuHTML = new Spacebars.SafeString(                                                                               // 39
     '<li role="separator" class="divider"></li>'                                                                    // 40
      + '<li class="dropdown-header">FMEA</li>'                                                                      // 41
      + '<li><a href="' + urlCorePFMEA + '" title="PFMEA">P-FMEA</a></li>'                                           // 42
      + '<li><a href="#" title="coming soon - DFMEA">D-FMEA</a></li>'                                                // 43
      + '<li role="separator" class="divider"></li>'                                                                 // 44
  );                                                                                                                 // 45
                                                                                                                     // 46
  RKCore.packageMenu.push(                                                                                           // 47
    {                                                                                                                // 48
      "menuHTML": menuHTML,                                                                                          // 49
      "fromPackage": "rationalk:fmea",                                                                               // 50
    }                                                                                                                // 51
  );                                                                                                                 // 52
}                                                                                                                    // 53
                                                                                                                     // 54
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/template.viewCorePFMEA.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("corePFMEA");                                                                                   // 2
Template["corePFMEA"] = new Template("Template.corePFMEA", (function() {                                             // 3
  var view = this;                                                                                                   // 4
  return [ HTML.DIV({                                                                                                // 5
    "class": "row"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                              // 7
    "class": "col-md-12"                                                                                             // 8
  }, "\n			", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                   // 10
  }, "\n			 	", HTML.DIV({                                                                                           // 11
    "class": "panel-heading",                                                                                        // 12
    style: "position:relative"                                                                                       // 13
  }, "\n			 		", HTML.H3({                                                                                           // 14
    "class": "panel-title"                                                                                           // 15
  }, Blaze.View("lookup:_", function() {                                                                             // 16
    return Spacebars.mustache(view.lookup("_"), "Core PFMEA");                                                       // 17
  })), "\n        "), "\n				", HTML.DIV({                                                                           // 18
    "class": "panel-body"                                                                                            // 19
  }, "\n					", HTML.A({                                                                                             // 20
    href: "#",                                                                                                       // 21
    "class": "createCorePFMEALine",                                                                                  // 22
    title: function() {                                                                                              // 23
      return Spacebars.mustache(view.lookup("_"), "Create a new entry");                                             // 24
    }                                                                                                                // 25
  }, Blaze.View("lookup:_", function() {                                                                             // 26
    return Spacebars.mustache(view.lookup("_"), "Create a new entry");                                               // 27
  })), "\n					| ", HTML.A({                                                                                         // 28
    href: function() {                                                                                               // 29
      return Spacebars.mustache(view.lookup("pathFor"), "importCorePFMEA");                                          // 30
    },                                                                                                               // 31
    title: function() {                                                                                              // 32
      return Spacebars.mustache(view.lookup("_"), "Import entries");                                                 // 33
    }                                                                                                                // 34
  }, Blaze.View("lookup:_", function() {                                                                             // 35
    return Spacebars.mustache(view.lookup("_"), "Import entries");                                                   // 36
  })), "\n					| ", HTML.A({                                                                                         // 37
    href: "#",                                                                                                       // 38
    "class": "clearCorePFMEA",                                                                                       // 39
    title: function() {                                                                                              // 40
      return Spacebars.mustache(view.lookup("_"), "Delete all entries");                                             // 41
    }                                                                                                                // 42
  }, Blaze.View("lookup:_", function() {                                                                             // 43
    return Spacebars.mustache(view.lookup("_"), "Delete All entries");                                               // 44
  })), "\n					", HTML.DIV({                                                                                         // 45
    "class": "row"                                                                                                   // 46
  }, "\n						", HTML.DIV({                                                                                          // 47
    "class": "col-md-12"                                                                                             // 48
  }, "\n							", Blaze.If(function() {                                                                              // 49
    return Spacebars.call(view.lookup("corePFMEA"));                                                                 // 50
  }, function() {                                                                                                    // 51
    return [ "\n								", Blaze._TemplateWith(function() {                                                          // 52
      return {                                                                                                       // 53
        collection: Spacebars.call(view.lookup("corePFMEA")),                                                        // 54
        settings: Spacebars.call(view.lookup("settingscorePFMEA"))                                                   // 55
      };                                                                                                             // 56
    }, function() {                                                                                                  // 57
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                // 58
    }), "\n							" ];                                                                                               // 59
  }, function() {                                                                                                    // 60
    return [ "\n								", HTML.P("Nothing to show for the moment"), "\n							" ];                                  // 61
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	"), "\n	", HTML.DIV({                         // 62
    "class": "row"                                                                                                   // 63
  }, "\n		", HTML.DIV({                                                                                              // 64
    "class": "col-md-12"                                                                                             // 65
  }, "\n			", HTML.DIV({                                                                                             // 66
    "class": "panel panel-default"                                                                                   // 67
  }, "\n			 	", HTML.DIV({                                                                                           // 68
    "class": "panel-heading",                                                                                        // 69
    style: "position:relative"                                                                                       // 70
  }, "\n			 		", HTML.H3({                                                                                           // 71
    "class": "panel-title"                                                                                           // 72
  }, Blaze.View("lookup:_", function() {                                                                             // 73
    return Spacebars.mustache(view.lookup("_"), "Filter PFMEA");                                                     // 74
  })), "\n        "), "\n				", HTML.DIV({                                                                           // 75
    "class": "panel-body"                                                                                            // 76
  }, "\n					", HTML.DIV({                                                                                           // 77
    "class": "row"                                                                                                   // 78
  }, "\n						", HTML.DIV({                                                                                          // 79
    "class": "col-md-12"                                                                                             // 80
  }, "\n							", HTML.FORM({                                                                                        // 81
    id: "filterPFMEA"                                                                                                // 82
  }, "\n								", HTML.BUTTON({                                                                                     // 83
    type: "submit",                                                                                                  // 84
    "class": "btn btn-default"                                                                                       // 85
  }, Blaze.View("lookup:_", function() {                                                                             // 86
    return Spacebars.mustache(view.lookup("_"), "Filter");                                                           // 87
  })), "\n								", HTML.DIV({                                                                                      // 88
    "class": "row"                                                                                                   // 89
  }, "\n									", HTML.DIV({                                                                                       // 90
    "class": "col-md-4"                                                                                              // 91
  }, "\n										", HTML.DIV({                                                                                      // 92
    "class": "form-group"                                                                                            // 93
  }, "\n									    ", HTML.LABEL({                                                                                 // 94
    "for": "action"                                                                                                  // 95
  }, "Choose applicable process steps from core ", Blaze.View("lookup:fmeaType", function() {                        // 96
    return Spacebars.mustache(view.lookup("fmeaType"));                                                              // 97
  })), "\n											", HTML.DIV({                                                                                   // 98
    "class": "checkbox"                                                                                              // 99
  }, "\n											  ", HTML.LABEL("\n											    ", HTML.Raw('<input type="checkbox" class="processStepDesignation-all" value="All">'), "\n											    ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All");                                                              // 101
  }), "\n											  "), "\n											"), "\n											", HTML.Raw("<hr>"), "\n											", Blaze.Each(function() {
    return Spacebars.call(view.lookup("corePFMEAProcessSteps"));                                                     // 103
  }, function() {                                                                                                    // 104
    return [ "\n											", HTML.DIV({                                                                             // 105
      "class": "checkbox"                                                                                            // 106
    }, "\n											  ", HTML.LABEL("\n											    ", HTML.INPUT({                                               // 107
      type: "checkbox",                                                                                              // 108
      "class": "processStepDesignation",                                                                             // 109
      value: function() {                                                                                            // 110
        return Spacebars.mustache(view.lookup("processStepDesignation"));                                            // 111
      }                                                                                                              // 112
    }), "\n											    ", Blaze.View("lookup:prettyPrint", function() {                                           // 113
      return Spacebars.mustache(view.lookup("prettyPrint"), view.lookup("processStepDesignation"));                  // 114
    }), "\n											  "), "\n											"), "\n											" ];                                                     // 115
  }, function() {                                                                                                    // 116
    return [ "\n												", HTML.P("Nothing to show for the moment"), "\n											" ];                          // 117
  }), "\n									  "), "\n									"), "\n									", HTML.DIV({                                                    // 118
    "class": "col-md-4"                                                                                              // 119
  }, "\n										", HTML.DIV({                                                                                      // 120
    "class": "form-group"                                                                                            // 121
  }, "\n									    ", HTML.LABEL({                                                                                 // 122
    "for": "action"                                                                                                  // 123
  }, "Choose applicable part type from core ", Blaze.View("lookup:fmeaType", function() {                            // 124
    return Spacebars.mustache(view.lookup("fmeaType"));                                                              // 125
  })), "\n											", HTML.DIV({                                                                                   // 126
    "class": "checkbox"                                                                                              // 127
  }, "\n											  ", HTML.LABEL("\n											    ", HTML.Raw('<input type="checkbox" class="partType-all" value="All">'), "\n											    ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All");                                                              // 129
  }), "\n											  "), "\n											"), "\n											", HTML.Raw("<hr>"), "\n											", Blaze.Each(function() {
    return Spacebars.call(view.lookup("corePFMEAPartTypes"));                                                        // 131
  }, function() {                                                                                                    // 132
    return [ "\n											", HTML.DIV({                                                                             // 133
      "class": "checkbox"                                                                                            // 134
    }, "\n											  ", HTML.LABEL("\n											    ", HTML.INPUT({                                               // 135
      type: "checkbox",                                                                                              // 136
      "class": "partType",                                                                                           // 137
      value: function() {                                                                                            // 138
        return Spacebars.mustache(view.lookup("partType"));                                                          // 139
      }                                                                                                              // 140
    }), "\n											    ", Blaze.View("lookup:prettyPrint", function() {                                           // 141
      return Spacebars.mustache(view.lookup("prettyPrint"), view.lookup("partType"));                                // 142
    }), "\n											  "), "\n											"), "\n											" ];                                                     // 143
  }, function() {                                                                                                    // 144
    return [ "\n												", HTML.P("Nothing to show for the moment"), "\n											" ];                          // 145
  }), "\n									  "), "\n									"), "\n									", HTML.DIV({                                                    // 146
    "class": "col-md-4"                                                                                              // 147
  }, "\n										", HTML.DIV({                                                                                      // 148
    "class": "form-group"                                                                                            // 149
  }, "\n									    ", HTML.LABEL({                                                                                 // 150
    "for": "action"                                                                                                  // 151
  }, "Choose applicable machine type from core ", Blaze.View("lookup:fmeaType", function() {                         // 152
    return Spacebars.mustache(view.lookup("fmeaType"));                                                              // 153
  })), "\n											", HTML.DIV({                                                                                   // 154
    "class": "checkbox"                                                                                              // 155
  }, "\n											  ", HTML.LABEL("\n											    ", HTML.Raw('<input type="checkbox" class="machineType-all" value="All">'), "\n											    ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All");                                                              // 157
  }), "\n											  "), "\n											"), "\n											", HTML.Raw("<hr>"), "\n											", Blaze.Each(function() {
    return Spacebars.call(view.lookup("corePFMEAMachineTypes"));                                                     // 159
  }, function() {                                                                                                    // 160
    return [ "\n											", HTML.DIV({                                                                             // 161
      "class": "checkbox"                                                                                            // 162
    }, "\n											  ", HTML.LABEL("\n											    ", HTML.INPUT({                                               // 163
      type: "checkbox",                                                                                              // 164
      "class": "machineType",                                                                                        // 165
      value: function() {                                                                                            // 166
        return Spacebars.mustache(view.lookup("machineType"));                                                       // 167
      }                                                                                                              // 168
    }), "\n											    ", Blaze.View("lookup:prettyPrint", function() {                                           // 169
      return Spacebars.mustache(view.lookup("prettyPrint"), view.lookup("machineType"));                             // 170
    }), "\n											  "), "\n											"), "\n											" ];                                                     // 171
  }, function() {                                                                                                    // 172
    return [ "\n												", HTML.P("Nothing to show for the moment"), "\n											" ];                          // 173
  }), "\n									  "), "\n									"), "\n								"), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n    "), "\n  "), "\n	", HTML.DIV({
    "class": "row"                                                                                                   // 175
  }, "\n		", HTML.DIV({                                                                                              // 176
    "class": "col-md-12"                                                                                             // 177
  }, "\n			", HTML.DIV({                                                                                             // 178
    "class": "panel panel-default"                                                                                   // 179
  }, "\n			 	", HTML.DIV({                                                                                           // 180
    "class": "panel-heading",                                                                                        // 181
    style: "position:relative"                                                                                       // 182
  }, "\n			 		", HTML.H3({                                                                                           // 183
    "class": "panel-title"                                                                                           // 184
  }, Blaze.View("lookup:_", function() {                                                                             // 185
    return Spacebars.mustache(view.lookup("_"), "Specific PFMEA");                                                   // 186
  })), "\n        "), "\n				", HTML.DIV({                                                                           // 187
    "class": "panel-body"                                                                                            // 188
  }, "\n					", HTML.DIV({                                                                                           // 189
    "class": "row"                                                                                                   // 190
  }, "\n						", HTML.DIV({                                                                                          // 191
    "class": "col-md-12"                                                                                             // 192
  }, "\n							", Blaze.If(function() {                                                                              // 193
    return Spacebars.call(view.lookup("filteredPFMEA"));                                                             // 194
  }, function() {                                                                                                    // 195
    return [ "\n								", Blaze._TemplateWith(function() {                                                          // 196
      return {                                                                                                       // 197
        collection: Spacebars.call(view.lookup("filteredPFMEA")),                                                    // 198
        settings: Spacebars.call(view.lookup("settingsFilteredPFMEA"))                                               // 199
      };                                                                                                             // 200
    }, function() {                                                                                                  // 201
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                // 202
    }), "\n							" ];                                                                                               // 203
  }, function() {                                                                                                    // 204
    return [ "\n								", HTML.P("Nothing to show for the moment"), "\n							" ];                                  // 205
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	"), "\n	", HTML.DIV({                         // 206
    "class": "row"                                                                                                   // 207
  }, "\n		", HTML.DIV({                                                                                              // 208
    "class": "col-md-12"                                                                                             // 209
  }, "\n			", HTML.DIV({                                                                                             // 210
    "class": "panel panel-default"                                                                                   // 211
  }, "\n			 	", HTML.DIV({                                                                                           // 212
    "class": "panel-heading",                                                                                        // 213
    style: "position:relative"                                                                                       // 214
  }, "\n			 		", HTML.H3({                                                                                           // 215
    "class": "panel-title"                                                                                           // 216
  }, Blaze.View("lookup:_", function() {                                                                             // 217
    return Spacebars.mustache(view.lookup("_"), "Copy paste PFMEA into excel");                                      // 218
  })), "\n        "), "\n				", HTML.DIV({                                                                           // 219
    "class": "panel-body"                                                                                            // 220
  }, "\n					", HTML.DIV({                                                                                           // 221
    "class": "row"                                                                                                   // 222
  }, "\n						", HTML.DIV({                                                                                          // 223
    "class": "col-md-12"                                                                                             // 224
  }, "\n							", HTML.FORM({                                                                                        // 225
    role: "form",                                                                                                    // 226
    "class": "main"                                                                                                  // 227
  }, "\n						    ", HTML.Raw('<div class="form-inline">\n						      <div class="form-group">\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value=","> comma\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value="."> dot\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value=";"> semicoma\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value="	" checked="checked"> tab\n						          </label>\n						        </div>\n						      </div>\n						      <div class="form-group pull-right">\n						        <div class="checkbox">\n						          <label>\n						            <input type="checkbox" name="quotes"> With quotes\n						          </label>\n						        </div>\n						      </div>\n						    </div>'), "\n								", HTML.DIV({
    "class": "form-group"                                                                                            // 229
  }, "\n									", HTML.getTag("btn")({                                                                             // 230
    id: "export",                                                                                                    // 231
    "class": "btn-success btn"                                                                                       // 232
  }, Blaze.View("lookup:_", function() {                                                                             // 233
    return Spacebars.mustache(view.lookup("_"), "Export");                                                           // 234
  })), "\n								"), "\n						    ", HTML.DIV({                                                                     // 235
    "class": "form-group"                                                                                            // 236
  }, "\n						      ", HTML.TEXTAREA({                                                                               // 237
    id: "csv",                                                                                                       // 238
    placeholder: "Exported csv",                                                                                     // 239
    "class": "form-control",                                                                                         // 240
    rows: "25"                                                                                                       // 241
  }), "\n						    "), HTML.Raw("<br>"), "\n						    ", HTML.H2(Blaze.View("lookup:progress", function() {          // 242
    return Spacebars.mustache(view.lookup("progress"));                                                              // 243
  })), "\n						  "), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	") ];                               // 244
}));                                                                                                                 // 245
                                                                                                                     // 246
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/viewCorePFMEA.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var results = new ReactiveVar();                                                                                     // 1
var progress = new ReactiveVar('');                                                                                  // 2
                                                                                                                     // 3
Template.corePFMEA.rendered = function () {                                                                          // 4
                                                                                                                     // 5
};                                                                                                                   // 6
                                                                                                                     // 7
                                                                                                                     // 8
Template.corePFMEA.helpers({                                                                                         // 9
	prettyPrint: function (str) {                                                                                       // 10
		if (typeof str !== 'undefined') {                                                                                  // 11
			if (str.length === 0) {                                                                                           // 12
				return new Spacebars.SafeString("<em>Empty</em>");                                                               // 13
			}                                                                                                                 // 14
			return str;                                                                                                       // 15
		}                                                                                                                  // 16
		return false;                                                                                                      // 17
	},                                                                                                                  // 18
	corePFMEA: function () {                                                                                            // 19
		return corePFMEA.find({}).fetch();                                                                                 // 20
	},                                                                                                                  // 21
	filteredPFMEA: function () {                                                                                        // 22
		var rationalkPFMEA = Session.get("rationalkPFMEA");                                                                // 23
		if (typeof rationalkPFMEA !== 'undefined') {                                                                       // 24
			if (typeof rationalkPFMEA.selectedProcessSteps !== 'undefined') {                                                 // 25
				return corePFMEA.find(                                                                                           // 26
					{                                                                                                               // 27
						$and: [                                                                                                        // 28
							{                                                                                                             // 29
								processStepDesignation: {                                                                                    // 30
									$in: rationalkPFMEA.selectedProcessSteps,                                                                   // 31
								},                                                                                                           // 32
							},                                                                                                            // 33
							{                                                                                                             // 34
								partType: {                                                                                                  // 35
									$in: rationalkPFMEA.selectedPartTypes,                                                                      // 36
								},                                                                                                           // 37
							},                                                                                                            // 38
							{                                                                                                             // 39
								machineType: {                                                                                               // 40
									$in: rationalkPFMEA.selectedMachineTypes,                                                                   // 41
								},                                                                                                           // 42
							},                                                                                                            // 43
						],                                                                                                             // 44
					}                                                                                                               // 45
				).fetch();                                                                                                       // 46
			}                                                                                                                 // 47
		}                                                                                                                  // 48
		return false;                                                                                                      // 49
	},                                                                                                                  // 50
	corePFMEAProcessSteps: function () {                                                                                // 51
    var corePFMEALines;                                                                                              // 52
		var j;                                                                                                             // 53
    var coreFMEAProcessStepList = [];                                                                                // 54
		var corePFMEAProcessSteps = [];                                                                                    // 55
		var arrayLength;                                                                                                   // 56
		corePFMEALines = corePFMEA.find({}).fetch(); //to do get only ProcessStep                                          // 57
    arrayLength = corePFMEALines.length;                                                                             // 58
    j = 0;                                                                                                           // 59
		for (i = 0; i < arrayLength; i++) {                                                                                // 60
      console.log(i);                                                                                                // 61
      console.log(corePFMEALines[i].processStepDesignation);                                                         // 62
      if (coreFMEAProcessStepList.indexOf(corePFMEALines[i].processStepDesignation) < 0) {                           // 63
        coreFMEAProcessStepList[j] = corePFMEALines[i].processStepDesignation;                                       // 64
				corePFMEAProcessSteps.push({"processStepDesignation": corePFMEALines[i].processStepDesignation});                // 65
        j++;                                                                                                         // 66
      }                                                                                                              // 67
		}                                                                                                                  // 68
		console.log(coreFMEAProcessStepList);                                                                              // 69
		console.log(corePFMEAProcessSteps);                                                                                // 70
    return corePFMEAProcessSteps;                                                                                    // 71
  },                                                                                                                 // 72
	corePFMEAPartTypes: function () {                                                                                   // 73
    var corePFMEALines;                                                                                              // 74
		var j;                                                                                                             // 75
    var coreFMEAPartTypeList = [];                                                                                   // 76
		var corePFMEAPartTypes = [];                                                                                       // 77
		var arrayLength;                                                                                                   // 78
		corePFMEALines = corePFMEA.find({}).fetch(); //to do get only ProcessStep                                          // 79
    arrayLength = corePFMEALines.length;                                                                             // 80
    j = 0;                                                                                                           // 81
		for (i = 0; i < arrayLength; i++) {                                                                                // 82
      console.log(i);                                                                                                // 83
      console.log(corePFMEALines[i].partType);                                                                       // 84
      if (coreFMEAPartTypeList.indexOf(corePFMEALines[i].partType) < 0) {                                            // 85
        coreFMEAPartTypeList[j] = corePFMEALines[i].partType;                                                        // 86
				corePFMEAPartTypes.push({"partType": corePFMEALines[i].partType});                                               // 87
        j++;                                                                                                         // 88
      }                                                                                                              // 89
		}                                                                                                                  // 90
		console.log(coreFMEAPartTypeList);                                                                                 // 91
		console.log(corePFMEAPartTypes);                                                                                   // 92
    return corePFMEAPartTypes;                                                                                       // 93
  },                                                                                                                 // 94
	corePFMEAMachineTypes: function () {                                                                                // 95
    var corePFMEALines;                                                                                              // 96
		var j;                                                                                                             // 97
    var coreFMEAMachineTypeList = [];                                                                                // 98
		var corePFMEAMachineTypes = [];                                                                                    // 99
		var arrayLength;                                                                                                   // 100
		corePFMEALines = corePFMEA.find({}).fetch(); //to do get only ProcessStep                                          // 101
    arrayLength = corePFMEALines.length;                                                                             // 102
    j = 0;                                                                                                           // 103
		for (i = 0; i < arrayLength; i++) {                                                                                // 104
      console.log(i);                                                                                                // 105
      console.log(corePFMEALines[i].machineType);                                                                    // 106
      if (coreFMEAMachineTypeList.indexOf(corePFMEALines[i].machineType) < 0) {                                      // 107
        coreFMEAMachineTypeList[j] = corePFMEALines[i].machineType;                                                  // 108
				corePFMEAMachineTypes.push({"machineType": corePFMEALines[i].machineType});                                      // 109
        j++;                                                                                                         // 110
      }                                                                                                              // 111
		}                                                                                                                  // 112
		console.log(coreFMEAMachineTypeList);                                                                              // 113
		console.log(corePFMEAMachineTypes);                                                                                // 114
    return corePFMEAMachineTypes;                                                                                    // 115
  },                                                                                                                 // 116
	settingscorePFMEA: function () {                                                                                    // 117
    return {                                                                                                         // 118
			rowsPerPage: 10,                                                                                                  // 119
			showFilter: true,                                                                                                 // 120
      class: 'table table-condensed col-sm-12',                                                                      // 121
			rowClass: function (item) {                                                                                       // 122
			  var RPN = item.S * item.O * item.D;                                                                             // 123
				if (RPN >= 100 && RPN < 100) {                                                                                   // 124
					return 'warning';                                                                                               // 125
				}                                                                                                                // 126
				if (RPN >= 100) {                                                                                                // 127
					return 'danger';                                                                                                // 128
				}                                                                                                                // 129
				return '';                                                                                                       // 130
			},                                                                                                                // 131
			fields: [                                                                                                         // 132
				/*                                                                                                               // 133
				{                                                                                                                // 134
					key: 'stepNumber',                                                                                              // 135
					label: TAPi18n.__("Step Number"),                                                                               // 136
				},                                                                                                               // 137
				*/                                                                                                               // 138
				{                                                                                                                // 139
					key: 'processStepDesignation',                                                                                  // 140
					label: TAPi18n.__("Process Step Designation"),                                                                  // 141
				},                                                                                                               // 142
				{                                                                                                                // 143
					key: 'partType',                                                                                                // 144
					label: TAPi18n.__("Part Type"),                                                                                 // 145
				},                                                                                                               // 146
				{                                                                                                                // 147
					key: 'machineType',                                                                                             // 148
					label: TAPi18n.__("Machine Type"),                                                                              // 149
				},                                                                                                               // 150
				{                                                                                                                // 151
					key: 'potentialFailureMode',                                                                                    // 152
					label: TAPi18n.__("Potential Failure Mode"),                                                                    // 153
				},                                                                                                               // 154
				{                                                                                                                // 155
					key: 'effectOfFailure',                                                                                         // 156
					label: TAPi18n.__("Effect of Failure"),                                                                         // 157
				},                                                                                                               // 158
				{                                                                                                                // 159
					key: 'S',                                                                                                       // 160
					label: TAPi18n.__("S"),                                                                                         // 161
				},                                                                                                               // 162
				{                                                                                                                // 163
					key: 'specialCharacteristic',                                                                                   // 164
					label: TAPi18n.__("Special Characteristic"),                                                                    // 165
				},                                                                                                               // 166
				{                                                                                                                // 167
					key: 'potentialCauseOfFailure',                                                                                 // 168
					label: TAPi18n.__("Potential Cause Of Failure"),                                                                // 169
				},                                                                                                               // 170
				{                                                                                                                // 171
					key: 'currentDesignPrevention',                                                                                 // 172
					label: TAPi18n.__("Current Design Prevention"),                                                                 // 173
				},                                                                                                               // 174
				{                                                                                                                // 175
					key: 'O',                                                                                                       // 176
					label: TAPi18n.__("O"),                                                                                         // 177
				},                                                                                                               // 178
				{                                                                                                                // 179
					key: 'currentDesignDetection',                                                                                  // 180
					label: TAPi18n.__("Current Design Detection"),                                                                  // 181
				},                                                                                                               // 182
				{                                                                                                                // 183
					key: 'D',                                                                                                       // 184
					label: TAPi18n.__("D"),                                                                                         // 185
				},                                                                                                               // 186
				{                                                                                                                // 187
	        key: 'RPN',                                                                                                 // 188
	        label: 'RPN',                                                                                               // 189
	        fn: function (value, object) {                                                                              // 190
						var RPN = object.S * object.O * object.D;                                                                      // 191
						return RPN;                                                                                                    // 192
					},                                                                                                              // 193
    		},                                                                                                             // 194
				{                                                                                                                // 195
					key: 'actions',                                                                                                 // 196
					label: 'Actions',                                                                                               // 197
					fn: function (value, object) {                                                                                  // 198
						var editLink;                                                                                                  // 199
						editLink = '<a href="' +                                                                                       // 200
							Router.routes.editPFMEALine.path({_id: object._id}) +                                                         // 201
							'" title="Edit">' +                                                                                           // 202
							'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                       // 203
							'</a> ';                                                                                                      // 204
						deleteLink = ' <a href="#" title="Delete" class="deleteLink" '                                                 // 205
							+ 'data-lineid="' +	object._id + '"'                                                                          // 206
							+ '>' +                                                                                                       // 207
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                        // 208
							'</a> ';                                                                                                      // 209
						return new Spacebars.SafeString(editLink + deleteLink);                                                        // 210
					},                                                                                                              // 211
				}                                                                                                                // 212
			],                                                                                                                // 213
		};                                                                                                                 // 214
	},                                                                                                                  // 215
	settingsFilteredPFMEA: function () {                                                                                // 216
    return {                                                                                                         // 217
			rowsPerPage: 10,                                                                                                  // 218
			showFilter: true,                                                                                                 // 219
      class: 'table table-condensed col-sm-12',                                                                      // 220
			rowClass: function (item) {                                                                                       // 221
			  var RPN = item.S * item.O * item.D;                                                                             // 222
				if (RPN >= 100 && RPN < 100) {                                                                                   // 223
					return 'warning';                                                                                               // 224
				}                                                                                                                // 225
				if (RPN >= 100) {                                                                                                // 226
					return 'danger';                                                                                                // 227
				}                                                                                                                // 228
				return '';                                                                                                       // 229
			},                                                                                                                // 230
			fields: [                                                                                                         // 231
				/*                                                                                                               // 232
				{                                                                                                                // 233
					key: 'stepNumber',                                                                                              // 234
					label: TAPi18n.__("Step Number"),                                                                               // 235
				},                                                                                                               // 236
				*/                                                                                                               // 237
				{                                                                                                                // 238
					key: 'processStepDesignation',                                                                                  // 239
					label: TAPi18n.__("Process Step Designation"),                                                                  // 240
				},                                                                                                               // 241
				{                                                                                                                // 242
					key: 'partType',                                                                                                // 243
					label: TAPi18n.__("Part Type"),                                                                                 // 244
				},                                                                                                               // 245
				{                                                                                                                // 246
					key: 'machineType',                                                                                             // 247
					label: TAPi18n.__("Machine Type"),                                                                              // 248
				},                                                                                                               // 249
				{                                                                                                                // 250
					key: 'potentialFailureMode',                                                                                    // 251
					label: TAPi18n.__("Potential Failure Mode"),                                                                    // 252
				},                                                                                                               // 253
				{                                                                                                                // 254
					key: 'effectOfFailure',                                                                                         // 255
					label: TAPi18n.__("Effect of Failure"),                                                                         // 256
				},                                                                                                               // 257
				{                                                                                                                // 258
					key: 'S',                                                                                                       // 259
					label: TAPi18n.__("S"),                                                                                         // 260
				},                                                                                                               // 261
				{                                                                                                                // 262
					key: 'specialCharacteristic',                                                                                   // 263
					label: TAPi18n.__("Special Characteristic"),                                                                    // 264
				},                                                                                                               // 265
				{                                                                                                                // 266
					key: 'potentialCauseOfFailure',                                                                                 // 267
					label: TAPi18n.__("Potential Cause Of Failure"),                                                                // 268
				},                                                                                                               // 269
				{                                                                                                                // 270
					key: 'currentDesignPrevention',                                                                                 // 271
					label: TAPi18n.__("Current Design Prevention"),                                                                 // 272
				},                                                                                                               // 273
				{                                                                                                                // 274
					key: 'O',                                                                                                       // 275
					label: TAPi18n.__("O"),                                                                                         // 276
				},                                                                                                               // 277
				{                                                                                                                // 278
					key: 'currentDesignDetection',                                                                                  // 279
					label: TAPi18n.__("Current Design Detection"),                                                                  // 280
				},                                                                                                               // 281
				{                                                                                                                // 282
					key: 'D',                                                                                                       // 283
					label: TAPi18n.__("D"),                                                                                         // 284
				},                                                                                                               // 285
				{                                                                                                                // 286
	        key: 'RPN',                                                                                                 // 287
	        label: 'RPN',                                                                                               // 288
	        fn: function (value, object) {                                                                              // 289
						var RPN = object.S * object.O * object.D;                                                                      // 290
						return RPN;                                                                                                    // 291
					},                                                                                                              // 292
    		},                                                                                                             // 293
				{                                                                                                                // 294
					key: 'actions',                                                                                                 // 295
					label: 'Actions',                                                                                               // 296
					fn: function (value, object) {                                                                                  // 297
						var editLink;                                                                                                  // 298
						editLink = ' <a href="' +                                                                                      // 299
							Router.routes.editPFMEALine.path({_id: object._id}) +                                                         // 300
							'" title="Edit">' +                                                                                           // 301
							'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                       // 302
							'</a> ';                                                                                                      // 303
						return new Spacebars.SafeString(editLink);                                                                     // 304
					},                                                                                                              // 305
				},                                                                                                               // 306
			],                                                                                                                // 307
		};                                                                                                                 // 308
	},                                                                                                                  // 309
});                                                                                                                  // 310
                                                                                                                     // 311
Template.corePFMEA.events({                                                                                          // 312
	"click a.createCorePFMEALine": function (e) {                                                                       // 313
	    e.preventDefault();                                                                                             // 314
	    Meteor.call('createCorePFMEALine');                                                                             // 315
			return false;                                                                                                     // 316
	},                                                                                                                  // 317
	"click a.clearCorePFMEA": function (e) {                                                                            // 318
			e.preventDefault();                                                                                               // 319
			Meteor.call('clearCorePFMEA');                                                                                    // 320
			return false;                                                                                                     // 321
	},                                                                                                                  // 322
	"click a.deleteLink": function (e) {                                                                                // 323
	    e.preventDefault();                                                                                             // 324
	    Meteor.call('deleteCorePFMEALine', e.currentTarget.dataset.lineid);                                             // 325
			return false;                                                                                                     // 326
	},                                                                                                                  // 327
	"change .processStepDesignation-all": function (e) {                                                                // 328
		$(".processStepDesignation").prop('checked', e.target.checked);                                                    // 329
	},                                                                                                                  // 330
	"change .partType-all": function (e) {                                                                              // 331
		$(".partType").prop('checked', e.target.checked);                                                                  // 332
	},                                                                                                                  // 333
	"change .machineType-all": function (e) {                                                                           // 334
		$(".machineType").prop('checked', e.target.checked);                                                               // 335
	},                                                                                                                  // 336
	"submit form#filterPFMEA": function (e) {                                                                           // 337
		var selectedProcessSteps = [];                                                                                     // 338
		var selectedPartTypes = [];                                                                                        // 339
		var selectedMachineTypes = [];                                                                                     // 340
		var rationalkPFMEA = {};                                                                                           // 341
		rationalkPFMEA.selectedProcessSteps = [];                                                                          // 342
		rationalkPFMEA.selectedPartTypes = [];                                                                             // 343
		rationalkPFMEA.selectedMachineTypes = [];                                                                          // 344
		e.preventDefault();                                                                                                // 345
		$("input:checkbox.processStepDesignation[type=checkbox]:checked").each(function () {                               // 346
			selectedProcessSteps.push($(this).val());                                                                         // 347
		});                                                                                                                // 348
		$("input:checkbox.partType[type=checkbox]:checked").each(function () {                                             // 349
			selectedPartTypes.push($(this).val());                                                                            // 350
		});                                                                                                                // 351
		$("input:checkbox.machineType[type=checkbox]:checked").each(function () {                                          // 352
			selectedMachineTypes.push($(this).val());                                                                         // 353
		});                                                                                                                // 354
		rationalkPFMEA.selectedProcessSteps = selectedProcessSteps;                                                        // 355
		rationalkPFMEA.selectedPartTypes = selectedPartTypes;                                                              // 356
		rationalkPFMEA.selectedMachineTypes = selectedMachineTypes;                                                        // 357
		if (Meteor.settings.public.debug) {                                                                                // 358
			console.log(rationalkPFMEA);                                                                                      // 359
		}                                                                                                                  // 360
		Session.set('rationalkPFMEA', rationalkPFMEA);                                                                     // 361
	},                                                                                                                  // 362
	"click #export": function (el) {                                                                                    // 363
    var config;                                                                                                      // 364
		var count;                                                                                                         // 365
		var csv;                                                                                                           // 366
		var data;                                                                                                          // 367
		var delimiter;                                                                                                     // 368
		var hasQuotes;                                                                                                     // 369
		var rd;                                                                                                            // 370
		var shareDialogInfo;                                                                                               // 371
		var rationalkPFMEA = Session.get("rationalkPFMEA");                                                                // 372
		el.preventDefault();                                                                                               // 373
    $("#csv").val('');                                                                                               // 374
    delimiter = $("input[name=delimiter]:checked").val();                                                            // 375
    hasQuotes = $('input[name=quotes]').prop('checked');                                                             // 376
    shareDialogInfo = {                                                                                              // 377
      template: Template.spinner,                                                                                    // 378
      title: "Wait",                                                                                                 // 379
      modalDialogClass: "wait-dialog",                                                                               // 380
      modalBodyClass: "share-modal-body",                                                                            // 381
      modalFooterClass: "share-modal-footer",                                                                        // 382
      removeOnHide: true,                                                                                            // 383
      buttons: {},                                                                                                   // 384
    };                                                                                                               // 385
    rd = ReactiveModal.initDialog(shareDialogInfo);                                                                  // 386
    rd.show();                                                                                                       // 387
    progress.set('Please wait...');                                                                                  // 388
                                                                                                                     // 389
		if (typeof rationalkPFMEA.selectedProcessSteps !== 'undefined') {                                                  // 390
			data = corePFMEA.find(                                                                                            // 391
				{                                                                                                                // 392
					$and: [                                                                                                         // 393
						{                                                                                                              // 394
							processStepDesignation: {                                                                                     // 395
								$in: rationalkPFMEA.selectedProcessSteps,                                                                    // 396
							},                                                                                                            // 397
						},                                                                                                             // 398
						{                                                                                                              // 399
							partType: {                                                                                                   // 400
								$in: rationalkPFMEA.selectedPartTypes,                                                                       // 401
							},                                                                                                            // 402
						},                                                                                                             // 403
						{                                                                                                              // 404
							machineType: {                                                                                                // 405
								$in: rationalkPFMEA.selectedMachineTypes,                                                                    // 406
							},                                                                                                            // 407
						},                                                                                                             // 408
					],                                                                                                              // 409
				},                                                                                                               // 410
				{                                                                                                                // 411
			    fields: {                                                                                                     // 412
			        importDate: 0,                                                                                            // 413
			        _id: 0,                                                                                                   // 414
							importedBy: 0,                                                                                                // 415
							full: 0,                                                                                                      // 416
							searchResultFromCorePFMEA: 0,                                                                                 // 417
			     }                                                                                                            // 418
				}                                                                                                                // 419
			).fetch();                                                                                                        // 420
                                                                                                                     // 421
			config = {                                                                                                        // 422
	      delimiter: delimiter,                                                                                         // 423
	      quotes: hasQuotes,                                                                                            // 424
	    };                                                                                                              // 425
	    csv = Papa.unparse(data, config);                                                                               // 426
	    $('#csv').val(csv);                                                                                             // 427
	    count = 0;                                                                                                      // 428
	    rd.hide();                                                                                                      // 429
	    progress.set('');                                                                                               // 430
		}                                                                                                                  // 431
    return false;                                                                                                    // 432
  },                                                                                                                 // 433
});                                                                                                                  // 434
                                                                                                                     // 435
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/template.editPFMEALine.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("editPFMEALine");                                                                               // 2
Template["editPFMEALine"] = new Template("Template.editPFMEALine", (function() {                                     // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "row"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                              // 7
    "class": "col-md-12"                                                                                             // 8
  }, "\n			 ", HTML.DIV({                                                                                            // 9
    "class": "panel panel-default"                                                                                   // 10
  }, "\n			 	", HTML.DIV({                                                                                           // 11
    "class": "panel-heading",                                                                                        // 12
    style: "position:relative"                                                                                       // 13
  }, "\n			 		", HTML.H3({                                                                                           // 14
    "class": "panel-title"                                                                                           // 15
  }, Blaze.View("lookup:_", function() {                                                                             // 16
    return Spacebars.mustache(view.lookup("_"), "Edit PFMEA line");                                                  // 17
  })), "\n        "), "\n				", HTML.DIV({                                                                           // 18
    "class": "panel-body"                                                                                            // 19
  }, "\n					", HTML.A({                                                                                             // 20
    href: function() {                                                                                               // 21
      return Spacebars.mustache(view.lookup("pathFor"), "corePFMEA");                                                // 22
    },                                                                                                               // 23
    title: function() {                                                                                              // 24
      return Spacebars.mustache(view.lookup("_"), "Back to core PFMEA");                                             // 25
    }                                                                                                                // 26
  }, Blaze.View("lookup:_", function() {                                                                             // 27
    return Spacebars.mustache(view.lookup("_"), "Back to core PFMEA");                                               // 28
  })), "\n					", HTML.FORM("\n						", HTML.Raw('<!--\n						<div class="form-group">\n							<label for="stepNumber">{{ _"Step Number"}}</label>\n							<input type="text" class="form-control" id="stepNumber" placeholder="{{ _\'Step Number\'}}" value="{{stepNumber}}">\n			    	</div>\n						-->'), "\n						", HTML.DIV({
    "class": "form-group"                                                                                            // 30
  }, "\n							", HTML.LABEL({                                                                                       // 31
    "for": "processStepDesignation"                                                                                  // 32
  }, Blaze.View("lookup:_", function() {                                                                             // 33
    return Spacebars.mustache(view.lookup("_"), "Process Step Designation");                                         // 34
  })), "\n							", HTML.INPUT({                                                                                     // 35
    type: "text",                                                                                                    // 36
    "class": "form-control",                                                                                         // 37
    id: "processStepDesignation",                                                                                    // 38
    placeholder: function() {                                                                                        // 39
      return Spacebars.mustache(view.lookup("_"), "processStepDesignation");                                         // 40
    },                                                                                                               // 41
    value: function() {                                                                                              // 42
      return Spacebars.mustache(view.lookup("processStepDesignation"));                                              // 43
    }                                                                                                                // 44
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 45
    "class": "form-group"                                                                                            // 46
  }, "\n							", HTML.LABEL({                                                                                       // 47
    "for": "partType"                                                                                                // 48
  }, Blaze.View("lookup:_", function() {                                                                             // 49
    return Spacebars.mustache(view.lookup("_"), "Part Type");                                                        // 50
  })), "\n							", HTML.INPUT({                                                                                     // 51
    type: "text",                                                                                                    // 52
    "class": "form-control",                                                                                         // 53
    id: "partType",                                                                                                  // 54
    placeholder: function() {                                                                                        // 55
      return Spacebars.mustache(view.lookup("_"), "partType");                                                       // 56
    },                                                                                                               // 57
    value: function() {                                                                                              // 58
      return Spacebars.mustache(view.lookup("partType"));                                                            // 59
    }                                                                                                                // 60
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 61
    "class": "form-group"                                                                                            // 62
  }, "\n							", HTML.LABEL({                                                                                       // 63
    "for": "machineType"                                                                                             // 64
  }, Blaze.View("lookup:_", function() {                                                                             // 65
    return Spacebars.mustache(view.lookup("_"), "Machine Type");                                                     // 66
  })), "\n							", HTML.INPUT({                                                                                     // 67
    type: "text",                                                                                                    // 68
    "class": "form-control",                                                                                         // 69
    id: "machineType",                                                                                               // 70
    placeholder: function() {                                                                                        // 71
      return Spacebars.mustache(view.lookup("_"), "machineType");                                                    // 72
    },                                                                                                               // 73
    value: function() {                                                                                              // 74
      return Spacebars.mustache(view.lookup("machineType"));                                                         // 75
    }                                                                                                                // 76
  }), "\n			    	"), "\n		        ", HTML.DIV({                                                                      // 77
    "class": "form-group"                                                                                            // 78
  }, "\n							", HTML.LABEL({                                                                                       // 79
    "for": "potentialFailureMode"                                                                                    // 80
  }, Blaze.View("lookup:_", function() {                                                                             // 81
    return Spacebars.mustache(view.lookup("_"), "Potential Failure Mode");                                           // 82
  })), "\n							", HTML.INPUT({                                                                                     // 83
    type: "text",                                                                                                    // 84
    "class": "form-control",                                                                                         // 85
    id: "potentialFailureMode",                                                                                      // 86
    placeholder: function() {                                                                                        // 87
      return Spacebars.mustache(view.lookup("_"), "Potential Failure Mode");                                         // 88
    },                                                                                                               // 89
    value: function() {                                                                                              // 90
      return Spacebars.mustache(view.lookup("potentialFailureMode"));                                                // 91
    }                                                                                                                // 92
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 93
    "class": "form-group"                                                                                            // 94
  }, "\n							", HTML.LABEL({                                                                                       // 95
    "for": "effectOfFailure"                                                                                         // 96
  }, Blaze.View("lookup:_", function() {                                                                             // 97
    return Spacebars.mustache(view.lookup("_"), "Effect Of Failure");                                                // 98
  })), "\n							", HTML.INPUT({                                                                                     // 99
    type: "text",                                                                                                    // 100
    "class": "form-control",                                                                                         // 101
    id: "effectOfFailure",                                                                                           // 102
    placeholder: function() {                                                                                        // 103
      return Spacebars.mustache(view.lookup("_"), "effectOfFailure");                                                // 104
    },                                                                                                               // 105
    value: function() {                                                                                              // 106
      return Spacebars.mustache(view.lookup("effectOfFailure"));                                                     // 107
    }                                                                                                                // 108
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 109
    "class": "form-group"                                                                                            // 110
  }, "\n							", HTML.LABEL({                                                                                       // 111
    "for": "S"                                                                                                       // 112
  }, Blaze.View("lookup:_", function() {                                                                             // 113
    return Spacebars.mustache(view.lookup("_"), "S (Severity)");                                                     // 114
  })), "\n							", HTML.INPUT({                                                                                     // 115
    type: "text",                                                                                                    // 116
    "class": "form-control",                                                                                         // 117
    id: "S",                                                                                                         // 118
    placeholder: function() {                                                                                        // 119
      return Spacebars.mustache(view.lookup("_"), "S");                                                              // 120
    },                                                                                                               // 121
    value: function() {                                                                                              // 122
      return Spacebars.mustache(view.lookup("S"));                                                                   // 123
    }                                                                                                                // 124
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 125
    "class": "form-group"                                                                                            // 126
  }, "\n							", HTML.LABEL({                                                                                       // 127
    "for": "specialCharacteristic"                                                                                   // 128
  }, Blaze.View("lookup:_", function() {                                                                             // 129
    return Spacebars.mustache(view.lookup("_"), "Special Characteristic");                                           // 130
  })), "\n							", HTML.INPUT({                                                                                     // 131
    type: "text",                                                                                                    // 132
    "class": "form-control",                                                                                         // 133
    id: "specialCharacteristic",                                                                                     // 134
    placeholder: function() {                                                                                        // 135
      return Spacebars.mustache(view.lookup("_"), "specialCharacteristic");                                          // 136
    },                                                                                                               // 137
    value: function() {                                                                                              // 138
      return Spacebars.mustache(view.lookup("specialCharacteristic"));                                               // 139
    }                                                                                                                // 140
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 141
    "class": "form-group"                                                                                            // 142
  }, "\n							", HTML.LABEL({                                                                                       // 143
    "for": "potentialCauseOfFailure"                                                                                 // 144
  }, Blaze.View("lookup:_", function() {                                                                             // 145
    return Spacebars.mustache(view.lookup("_"), "Potential Cause Of Failure");                                       // 146
  })), "\n							", HTML.INPUT({                                                                                     // 147
    type: "text",                                                                                                    // 148
    "class": "form-control",                                                                                         // 149
    id: "potentialCauseOfFailure",                                                                                   // 150
    placeholder: function() {                                                                                        // 151
      return Spacebars.mustache(view.lookup("_"), "potentialCauseOfFailure");                                        // 152
    },                                                                                                               // 153
    value: function() {                                                                                              // 154
      return Spacebars.mustache(view.lookup("potentialCauseOfFailure"));                                             // 155
    }                                                                                                                // 156
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 157
    "class": "form-group"                                                                                            // 158
  }, "\n							", HTML.LABEL({                                                                                       // 159
    "for": "currentDesignPrevention"                                                                                 // 160
  }, Blaze.View("lookup:_", function() {                                                                             // 161
    return Spacebars.mustache(view.lookup("_"), "Current Design Prevention");                                        // 162
  })), "\n							", HTML.INPUT({                                                                                     // 163
    type: "text",                                                                                                    // 164
    "class": "form-control",                                                                                         // 165
    id: "currentDesignPrevention",                                                                                   // 166
    placeholder: function() {                                                                                        // 167
      return Spacebars.mustache(view.lookup("_"), "currentDesignPrevention");                                        // 168
    },                                                                                                               // 169
    value: function() {                                                                                              // 170
      return Spacebars.mustache(view.lookup("currentDesignPrevention"));                                             // 171
    }                                                                                                                // 172
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 173
    "class": "form-group"                                                                                            // 174
  }, "\n							", HTML.LABEL({                                                                                       // 175
    "for": "O"                                                                                                       // 176
  }, Blaze.View("lookup:_", function() {                                                                             // 177
    return Spacebars.mustache(view.lookup("_"), "O (Occurence)");                                                    // 178
  })), "\n							", HTML.INPUT({                                                                                     // 179
    type: "text",                                                                                                    // 180
    "class": "form-control",                                                                                         // 181
    id: "O",                                                                                                         // 182
    placeholder: function() {                                                                                        // 183
      return Spacebars.mustache(view.lookup("_"), "O");                                                              // 184
    },                                                                                                               // 185
    value: function() {                                                                                              // 186
      return Spacebars.mustache(view.lookup("O"));                                                                   // 187
    }                                                                                                                // 188
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 189
    "class": "form-group"                                                                                            // 190
  }, "\n							", HTML.LABEL({                                                                                       // 191
    "for": "currentDesignDetection"                                                                                  // 192
  }, Blaze.View("lookup:_", function() {                                                                             // 193
    return Spacebars.mustache(view.lookup("_"), "Current Design Detection");                                         // 194
  })), "\n							", HTML.INPUT({                                                                                     // 195
    type: "text",                                                                                                    // 196
    "class": "form-control",                                                                                         // 197
    id: "currentDesignDetection",                                                                                    // 198
    placeholder: function() {                                                                                        // 199
      return Spacebars.mustache(view.lookup("_"), "currentDesignDetection");                                         // 200
    },                                                                                                               // 201
    value: function() {                                                                                              // 202
      return Spacebars.mustache(view.lookup("currentDesignDetection"));                                              // 203
    }                                                                                                                // 204
  }), "\n			    	"), "\n						", HTML.DIV({                                                                          // 205
    "class": "form-group"                                                                                            // 206
  }, "\n							", HTML.LABEL({                                                                                       // 207
    "for": "D"                                                                                                       // 208
  }, Blaze.View("lookup:_", function() {                                                                             // 209
    return Spacebars.mustache(view.lookup("_"), "D (Detection)");                                                    // 210
  })), "\n							", HTML.INPUT({                                                                                     // 211
    type: "text",                                                                                                    // 212
    "class": "form-control",                                                                                         // 213
    id: "D",                                                                                                         // 214
    placeholder: function() {                                                                                        // 215
      return Spacebars.mustache(view.lookup("_"), "D");                                                              // 216
    },                                                                                                               // 217
    value: function() {                                                                                              // 218
      return Spacebars.mustache(view.lookup("D"));                                                                   // 219
    }                                                                                                                // 220
  }), "\n			    	"), "\n					  ", HTML.BUTTON({                                                                      // 221
    type: "submit",                                                                                                  // 222
    "class": "btn btn-primary"                                                                                       // 223
  }, Blaze.View("lookup:_", function() {                                                                             // 224
    return Spacebars.mustache(view.lookup("_"), "Save");                                                             // 225
  })), "\n				  "), "\n    		"), "\n			"), "\n		"), "\n	");                                                          // 226
}));                                                                                                                 // 227
                                                                                                                     // 228
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/editPFMEALine.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.editPFMEALine.rendered = function () {                                                                      // 1
};                                                                                                                   // 2
                                                                                                                     // 3
Template.editPFMEALine.helpers({                                                                                     // 4
});                                                                                                                  // 5
                                                                                                                     // 6
Template.editPFMEALine.events({                                                                                      // 7
	'submit form': function (e) {                                                                                       // 8
		var data = {};                                                                                                     // 9
	  e.preventDefault();                                                                                               // 10
		data.lineId = this._id;                                                                                            // 11
		//data.stepNumber = e.target.stepNumber.value;                                                                     // 12
		data.processStepDesignation = e.target.processStepDesignation.value;                                               // 13
		data.partType = e.target.partType.value;                                                                           // 14
	  data.machineType = e.target.machineType.value;                                                                    // 15
		data.potentialFailureMode = e.target.potentialFailureMode.value;                                                   // 16
		data.effectOfFailure = e.target.effectOfFailure.value;                                                             // 17
		data.S = e.target.S.value;                                                                                         // 18
		data.specialCharacteristic = e.target.specialCharacteristic.value;                                                 // 19
		data.potentialCauseOfFailure = e.target.potentialCauseOfFailure.value;                                             // 20
		data.currentDesignPrevention = e.target.currentDesignPrevention.value;                                             // 21
		data.O = e.target.O.value;                                                                                         // 22
		data.currentDesignDetection = e.target.currentDesignDetection.value;                                               // 23
		data.D = e.target.D.value;                                                                                         // 24
	  Meteor.call('updateCorePFMEALine', data, function () {});                                                         // 25
	},                                                                                                                  // 26
	"click a.delete": function (event) {                                                                                // 27
	    event.preventDefault();                                                                                         // 28
	    console.log(this);                                                                                              // 29
	    Meteor.call('deleteProject', this._id, function () {});                                                         // 30
			return false;                                                                                                     // 31
	},                                                                                                                  // 32
});                                                                                                                  // 33
                                                                                                                     // 34
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/template.importCorePFMEA.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("importCorePFMEA");                                                                             // 2
Template["importCorePFMEA"] = new Template("Template.importCorePFMEA", (function() {                                 // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "panel panel-default"                                                                                   // 6
  }, "\n      ", HTML.DIV({                                                                                          // 7
    "class": "panel-heading",                                                                                        // 8
    style: "position:relative"                                                                                       // 9
  }, "\n          ", HTML.H3({                                                                                       // 10
    "class": "panel-title"                                                                                           // 11
  }, Blaze.View("lookup:_", function() {                                                                             // 12
    return Spacebars.mustache(view.lookup("_"), "Import");                                                           // 13
  })), "\n      "), "\n      ", HTML.DIV({                                                                           // 14
    "class": "panel-body"                                                                                            // 15
  }, "\n        ", HTML.FORM({                                                                                       // 16
    role: "form",                                                                                                    // 17
    "class": "main"                                                                                                  // 18
  }, "\n          ", HTML.Raw('<div class="form-group">\n            <p>Here you can copy-paste your existing Excel document index to import them directly.</p>\n            <p>Do not include the header row</p>\n            <p>Please make sure the column order is as follow :</p>\n            <p>processStepDesignation | partType | machineType | potentialFailureMode | effectOfFailure | Severity | specialCharacteristic | potentialCauseOfFailure | currentDesignPrevention | Occurence | currentDesignDetection | Detection</p>\n          </div>'), "\n          ", HTML.Raw('<div class="form-inline">\n            <div class="form-group">\n              Deimiter :\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="" checked="checked"> autodetect\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value=","> comma\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="."> dot\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value=";"> semicoma\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="	"> tab\n                </label>\n              </div>\n            </div>\n            <div class="form-group pull-right">\n              <div class="checkbox">\n                <label>\n                  <input type="checkbox" name="limitPreview" checked="checked"> Limit preview\n                </label>\n              </div>\n            </div>\n          </div>'), "\n          ", HTML.DIV({
    "class": "form-group"                                                                                            // 20
  }, "\n            ", HTML.TEXTAREA({                                                                               // 21
    id: "csv",                                                                                                       // 22
    placeholder: "Rows to import. Copy paste Excel",                                                                 // 23
    rows: "25",                                                                                                      // 24
    "class": "form-control"                                                                                          // 25
  }), "\n          "), HTML.Raw("<br>"), "\n          ", HTML.getTag("btn")({                                        // 26
    id: "preview",                                                                                                   // 27
    "class": "btn-success btn"                                                                                       // 28
  }, "Preview"), HTML.Raw("<br>"), "\n\n          ", HTML.H2(Blaze.View("lookup:progress", function() {              // 29
    return Spacebars.mustache(view.lookup("progress"));                                                              // 30
  })), "\n          ", HTML.DIV({                                                                                    // 31
    "class": "tableScroll"                                                                                           // 32
  }, "\n            ", HTML.TABLE({                                                                                  // 33
    "class": "table"                                                                                                 // 34
  }, "\n              ", HTML.TR("\n              ", Blaze.Each(function() {                                         // 35
    return Spacebars.call(view.lookup("headers"));                                                                   // 36
  }, function() {                                                                                                    // 37
    return [ "\n                ", HTML.TH(Blaze.View("lookup:.", function() {                                       // 38
      return Spacebars.mustache(view.lookup("."));                                                                   // 39
    })), "\n              " ];                                                                                       // 40
  }), "\n              "), "\n              ", Blaze.Each(function() {                                               // 41
    return Spacebars.call(view.lookup("data"));                                                                      // 42
  }, function() {                                                                                                    // 43
    return [ "\n              ", HTML.TR("\n                ", Blaze.Each(function() {                               // 44
      return Spacebars.call(view.lookup("keys"));                                                                    // 45
    }, function() {                                                                                                  // 46
      return [ "\n                    ", Blaze._InOuterTemplateScope(view, function() {                              // 47
        return Blaze._TemplateWith(function() {                                                                      // 48
          return Spacebars.call(view.lookup("."));                                                                   // 49
        }, function() {                                                                                              // 50
          return Spacebars.include(function() {                                                                      // 51
            return Spacebars.call(view.templateContentBlock);                                                        // 52
          });                                                                                                        // 53
        });                                                                                                          // 54
      }), "\n                    ", HTML.TD(Blaze.View("lookup:value", function() {                                  // 55
        return Spacebars.mustache(view.lookup("value"));                                                             // 56
      })), "\n                " ];                                                                                   // 57
    }), "\n              "), "\n              " ];                                                                   // 58
  }), "\n            "), "\n          "), "\n\n          ", Blaze.If(function() {                                    // 59
    return Spacebars.call(view.lookup("hasPreview"));                                                                // 60
  }, function() {                                                                                                    // 61
    return [ "\n          ", HTML.getTag("btn")({                                                                    // 62
      id: "cancel",                                                                                                  // 63
      "class": "btn-danger btn"                                                                                      // 64
    }, "Cancel"), "\n          ", HTML.getTag("btn")({                                                               // 65
      id: "import",                                                                                                  // 66
      "class": "btn-success btn"                                                                                     // 67
    }, "Import"), "\n          " ];                                                                                  // 68
  }), "\n\n        "), "\n      "), "\n    ");                                                                       // 69
}));                                                                                                                 // 70
                                                                                                                     // 71
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/importCorePFMEA.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var results = new ReactiveVar();                                                                                     // 1
var progress = new ReactiveVar('');                                                                                  // 2
                                                                                                                     // 3
Template.importCorePFMEA.events({                                                                                    // 4
  "click #preview": function (e) {                                                                                   // 5
    var delimiter;                                                                                                   // 6
    var limitPreview;                                                                                                // 7
    var temp;                                                                                                        // 8
    var nRows;                                                                                                       // 9
    e.preventDefault();                                                                                              // 10
    delimiter = $("input[name=delimiter]:checked").val();                                                            // 11
    limitPreview = 0;                                                                                                // 12
    if ($('input[name=limitPreview]').prop('checked')) {                                                             // 13
      limitPreview = 10;                                                                                             // 14
    }                                                                                                                // 15
    temp = Papa.parse($("#csv").val(), {                                                                             // 16
      header: false,                                                                                                 // 17
      preview: limitPreview,                                                                                         // 18
      delimiter: delimiter,                                                                                          // 19
    });                                                                                                              // 20
    results.set(temp.data);                                                                                          // 21
    nRows = temp.data.length;                                                                                        // 22
    progress.set("Showing preview for " + nRows + " rows");                                                          // 23
    return false;                                                                                                    // 24
  },                                                                                                                 // 25
  "click #import": function (e) {                                                                                    // 26
    var count;                                                                                                       // 27
    var delimiter;                                                                                                   // 28
    var i;                                                                                                           // 29
    var len;                                                                                                         // 30
    var rd;                                                                                                          // 31
    var row;                                                                                                         // 32
    var shareDialogInfo;                                                                                             // 33
    var temp;                                                                                                        // 34
    var headersOrder = {                                                                                             // 35
      //"stepNumber": 0,                                                                                             // 36
      "processStepDesignation": 0,                                                                                   // 37
      "partType": 1,                                                                                                 // 38
      "machineType": 2,                                                                                              // 39
      "potentialFailureMode": 3,                                                                                     // 40
      "effectOfFailure": 4,                                                                                          // 41
      "S": 5,                                                                                                        // 42
      "specialCharacteristic": 6,                                                                                    // 43
      "potentialCauseOfFailure": 7,                                                                                  // 44
      "currentDesignPrevention": 8,                                                                                  // 45
      "O": 9,                                                                                                        // 46
      "currentDesignDetection": 10,                                                                                  // 47
      "D": 11,                                                                                                       // 48
    }; //first col is 0 !                                                                                            // 49
    e.preventDefault();                                                                                              // 50
    $('#import').prop('disabled', true);                                                                             // 51
    delimiter = $("input[name=delimiter]:checked").val();                                                            // 52
    shareDialogInfo = {                                                                                              // 53
      template: Template.spinner,                                                                                    // 54
      title: "Wait",                                                                                                 // 55
      modalDialogClass: "wait-dialog",                                                                               // 56
      modalBodyClass: "share-modal-body",                                                                            // 57
      modalFooterClass: "share-modal-footer",                                                                        // 58
      removeOnHide: true,                                                                                            // 59
      buttons: {},                                                                                                   // 60
    };                                                                                                               // 61
    rd = ReactiveModal.initDialog(shareDialogInfo);                                                                  // 62
    rd.show();                                                                                                       // 63
    progress.set('Please wait...');                                                                                  // 64
    temp = Papa.parse($("#csv").val(), {                                                                             // 65
      header: false,                                                                                                 // 66
      delimiter: delimiter,                                                                                          // 67
    }).data;                                                                                                         // 68
    count = 0;                                                                                                       // 69
    if ((temp !== null ? temp.length : void 0) > 0) {                                                                // 70
      for (i = 0, len = temp.length; i < len; i++) {                                                                 // 71
        row = temp[i];                                                                                               // 72
        if (Meteor.settings.public.debug) {                                                                          // 73
          console.log(row);                                                                                          // 74
        }                                                                                                            // 75
        Meteor.call("importCorePFMEALine", row, headersOrder, function (error, id) {                                 // 76
          count++;                                                                                                   // 77
          nRows = temp.length;                                                                                       // 78
          console.log("Importation " + count + "/" + nRows);                                                         // 79
          progress.set("Importation " + count + "/" + nRows);                                                        // 80
          if (error) {                                                                                               // 81
            if (typeof(toastr) !== 'undefined') {                                                                    // 82
              toastr.error(error.reason);                                                                            // 83
            }                                                                                                        // 84
          }                                                                                                          // 85
          if (count >= nRows) {                                                                                      // 86
            rd.hide();                                                                                               // 87
            return Router.go("corePFMEA");                                                                           // 88
          }                                                                                                          // 89
        });                                                                                                          // 90
      }                                                                                                              // 91
    }                                                                                                                // 92
    else {                                                                                                           // 93
      rd.hide();                                                                                                     // 94
      progress.set('');                                                                                              // 95
    }                                                                                                                // 96
    return false;                                                                                                    // 97
  },                                                                                                                 // 98
  "click #cancel": function (el) {                                                                                   // 99
    el.preventDefault();                                                                                             // 100
    return results.set({});                                                                                          // 101
  },                                                                                                                 // 102
});                                                                                                                  // 103
                                                                                                                     // 104
Template.importCorePFMEA.helpers({                                                                                   // 105
  data: function () {                                                                                                // 106
    return results.get();                                                                                            // 107
  },                                                                                                                 // 108
  selectedCategory: function () {                                                                                    // 109
    return Session.get("selectedCategory");                                                                          // 110
  },                                                                                                                 // 111
  progress: function () {                                                                                            // 112
    return progress.get();                                                                                           // 113
  },                                                                                                                 // 114
  hasPreview: function () {                                                                                          // 115
    return results.get();                                                                                            // 116
  },                                                                                                                 // 117
  headers: function () {                                                                                             // 118
    var res;                                                                                                         // 119
    res = results.get();                                                                                             // 120
    if (res && res[0]) {                                                                                             // 121
      return Object.keys(res[0]);                                                                                    // 122
    }                                                                                                                // 123
  },                                                                                                                 // 124
  categories: function () {                                                                                          // 125
    return Categories.find();                                                                                        // 126
  },                                                                                                                 // 127
  keys: function () {                                                                                                // 128
    var key;                                                                                                         // 129
    var res;                                                                                                         // 130
    var value;                                                                                                       // 131
    res = [];                                                                                                        // 132
    for (key in this) {                                                                                              // 133
      if ({}.hasOwnProperty.call(this, key)) {                                                                       // 134
        value = this[key];                                                                                           // 135
        res.push({                                                                                                   // 136
          key: key,                                                                                                  // 137
          value: value,                                                                                              // 138
        });                                                                                                          // 139
      }                                                                                                              // 140
    }                                                                                                                // 141
    return res;                                                                                                      // 142
  },                                                                                                                 // 143
});                                                                                                                  // 144
                                                                                                                     // 145
Template.importCorePFMEA.rendered = function () {                                                                    // 146
  return $("#selectedCategory").val(Session.get("selectedCategory"));                                                // 147
};                                                                                                                   // 148
                                                                                                                     // 149
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/template.settings.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("settingsLinkFMEA");                                                                            // 2
Template["settingsLinkFMEA"] = new Template("Template.settingsLinkFMEA", (function() {                               // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "row"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                              // 7
    "class": "col-md-12"                                                                                             // 8
  }, "\n			 ", HTML.DIV({                                                                                            // 9
    "class": "panel panel-default"                                                                                   // 10
  }, "\n			 		", HTML.DIV({                                                                                          // 11
    "class": "panel-heading",                                                                                        // 12
    style: "position:relative"                                                                                       // 13
  }, "\n						", HTML.H3({                                                                                           // 14
    "class": "panel-title"                                                                                           // 15
  }, Blaze.View("lookup:_", function() {                                                                             // 16
    return Spacebars.mustache(view.lookup("_"), "Project Portfolio Management");                                     // 17
  })), "\n					"), "\n					", HTML.DIV({                                                                             // 18
    "class": "panel-body"                                                                                            // 19
  }, "\n						", HTML.DIV({                                                                                          // 20
    "class": "post"                                                                                                  // 21
  }, "\n							", HTML.DIV({                                                                                         // 22
    "class": "row"                                                                                                   // 23
  }, "\n								", HTML.DIV({                                                                                        // 24
    "class": "col-md-12"                                                                                             // 25
  }, "\n									", HTML.A({                                                                                         // 26
    href: function() {                                                                                               // 27
      return Spacebars.mustache(view.lookup("pathFor"), "settingsFMEA");                                             // 28
    },                                                                                                               // 29
    title: "Settings"                                                                                                // 30
  }, "Settings"), "\n								"), "\n							"), "\n						"), "\n        	"), "\n    		"), "\n		"), "\n	");            // 31
}));                                                                                                                 // 32
                                                                                                                     // 33
Template.__checkName("settingsFMEA");                                                                                // 34
Template["settingsFMEA"] = new Template("Template.settingsFMEA", (function() {                                       // 35
  var view = this;                                                                                                   // 36
  return HTML.DIV({                                                                                                  // 37
    "class": "row"                                                                                                   // 38
  }, "\n		", HTML.DIV({                                                                                              // 39
    "class": "col-md-12"                                                                                             // 40
  }, "\n			 ", HTML.DIV({                                                                                            // 41
    "class": "panel panel-default"                                                                                   // 42
  }, "\n			 		", HTML.DIV({                                                                                          // 43
    "class": "panel-heading",                                                                                        // 44
    style: "position:relative"                                                                                       // 45
  }, "\n						", HTML.H3({                                                                                           // 46
    "class": "panel-title"                                                                                           // 47
  }, Blaze.View("lookup:_", function() {                                                                             // 48
    return Spacebars.mustache(view.lookup("_"), "Project Portfolio Management");                                     // 49
  })), "\n					"), "\n					", HTML.DIV({                                                                             // 50
    "class": "panel-body"                                                                                            // 51
  }, "\n						", HTML.DIV({                                                                                          // 52
    "class": "post"                                                                                                  // 53
  }, "\n							", HTML.H4(Blaze.View("lookup:_", function() {                                                        // 54
    return Spacebars.mustache(view.lookup("_"), "Project files types");                                              // 55
  })), "\n							", HTML.DIV({                                                                                       // 56
    "class": "row"                                                                                                   // 57
  }, "\n								", HTML.DIV({                                                                                        // 58
    "class": "col-md-12"                                                                                             // 59
  }, "\n									", HTML.FORM({                                                                                      // 60
    id: "projectFileTypesForm"                                                                                       // 61
  }, "\n										", HTML.DIV({                                                                                      // 62
    "class": "form-group"                                                                                            // 63
  }, "\n											", HTML.LABEL({                                                                                   // 64
    "for": "projectFileTypes"                                                                                        // 65
  }, Blaze.View("lookup:_", function() {                                                                             // 66
    return Spacebars.mustache(view.lookup("_"), "Types of files in your project");                                   // 67
  })), "\n											", HTML.INPUT({                                                                                 // 68
    type: "text",                                                                                                    // 69
    "class": "form-control",                                                                                         // 70
    id: "projectFileTypes",                                                                                          // 71
    value: function() {                                                                                              // 72
      return Spacebars.mustache(view.lookup("projectFileTypes"));                                                    // 73
    }                                                                                                                // 74
  }), "\n											", HTML.P({                                                                                      // 75
    "class": "help-block"                                                                                            // 76
  }, Blaze.View("lookup:_", function() {                                                                             // 77
    return Spacebars.mustache(view.lookup("_"), "Separate them with a vertical bar");                                // 78
  }), " : | "), "\n										"), "\n									", HTML.BUTTON({                                                        // 79
    type: "submit",                                                                                                  // 80
    "class": "btn btn-default"                                                                                       // 81
  }, Blaze.View("lookup:_", function() {                                                                             // 82
    return Spacebars.mustache(view.lookup("_"), "Save");                                                             // 83
  })), "\n									"), "\n								"), "\n							"), "\n						"), "\n        	"), "\n    		"), "\n		"), "\n	");       // 84
}));                                                                                                                 // 85
                                                                                                                     // 86
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/settings.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
                                                                                                                     // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/template.corePFMEAInSearchResults.js                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("corePFMEAInSearchResults");                                                                    // 2
Template["corePFMEAInSearchResults"] = new Template("Template.corePFMEAInSearchResults", (function() {               // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "post"                                                                                                  // 6
  }, "\n		", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                   // 8
  }, "\n			", HTML.DIV({                                                                                             // 9
    "class": "col-md-10"                                                                                             // 10
  }, "\n	      ", Blaze.If(function() {                                                                              // 11
    return Spacebars.call(view.lookup("processStepDesignation"));                                                    // 12
  }, function() {                                                                                                    // 13
    return [ "\n	        ", HTML.P(HTML.STRONG("Process Step Designation :"), " ", Blaze.View("lookup:processStepDesignation", function() {
      return Spacebars.mustache(view.lookup("processStepDesignation"));                                              // 15
    })), "\n	      " ];                                                                                              // 16
  }), "\n	      ", Blaze.If(function() {                                                                             // 17
    return Spacebars.call(view.lookup("partType"));                                                                  // 18
  }, function() {                                                                                                    // 19
    return [ "\n	        ", HTML.P(HTML.STRONG("Part Type :"), " ", Blaze.View("lookup:partType", function() {       // 20
      return Spacebars.mustache(view.lookup("partType"));                                                            // 21
    })), "\n	      " ];                                                                                              // 22
  }), "\n	      ", Blaze.If(function() {                                                                             // 23
    return Spacebars.call(view.lookup("machineType"));                                                               // 24
  }, function() {                                                                                                    // 25
    return [ "\n	        ", HTML.P(HTML.STRONG("Machine Type :"), " ", Blaze.View("lookup:machineType", function() { // 26
      return Spacebars.mustache(view.lookup("machineType"));                                                         // 27
    })), "\n	      " ];                                                                                              // 28
  }), "\n	      ", Blaze.If(function() {                                                                             // 29
    return Spacebars.call(view.lookup("potentialFailureMode"));                                                      // 30
  }, function() {                                                                                                    // 31
    return [ "\n	        ", HTML.P(HTML.STRONG("Potential Failure Mode:"), " ", Blaze.View("lookup:potentialFailureMode", function() {
      return Spacebars.mustache(view.lookup("potentialFailureMode"));                                                // 33
    })), "\n	      " ];                                                                                              // 34
  }), "\n	      ", Blaze.If(function() {                                                                             // 35
    return Spacebars.call(view.lookup("effectOfFailure"));                                                           // 36
  }, function() {                                                                                                    // 37
    return [ "\n	        ", HTML.P(HTML.STRONG("Effect Of Failure :"), " ", Blaze.View("lookup:effectOfFailure", function() {
      return Spacebars.mustache(view.lookup("effectOfFailure"));                                                     // 39
    })), "\n	      " ];                                                                                              // 40
  }), "\n	      ", Blaze.If(function() {                                                                             // 41
    return Spacebars.call(view.lookup("potentialCauseOfFailure"));                                                   // 42
  }, function() {                                                                                                    // 43
    return [ "\n	        ", HTML.P(HTML.STRONG("Potential Cause Of Failure :"), " ", Blaze.View("lookup:potentialCauseOfFailure", function() {
      return Spacebars.mustache(view.lookup("potentialCauseOfFailure"));                                             // 45
    })), "\n	      " ];                                                                                              // 46
  }), "\n	      ", Blaze.If(function() {                                                                             // 47
    return Spacebars.call(view.lookup("currentDesignDetection"));                                                    // 48
  }, function() {                                                                                                    // 49
    return [ "\n				   ", HTML.P(HTML.STRONG("Current Design Detection :"), " ", Blaze.View("lookup:currentDesignDetection", function() {
      return Spacebars.mustache(view.lookup("currentDesignDetection"));                                              // 51
    })), "\n	      " ];                                                                                              // 52
  }), "\n	      ", Blaze.If(function() {                                                                             // 53
    return Spacebars.call(view.lookup("currentDesignPrevention"));                                                   // 54
  }, function() {                                                                                                    // 55
    return [ "\n	        ", HTML.P(HTML.STRONG("Current Design Prevention :"), " ", Blaze.View("lookup:currentDesignPrevention", function() {
      return Spacebars.mustache(view.lookup("currentDesignPrevention"));                                             // 57
    })), "\n	      " ];                                                                                              // 58
  }), "\n			"), "\n			", HTML.DIV({                                                                                  // 59
    "class": "col-md-2"                                                                                              // 60
  }, "\n				", HTML.Raw('<span class="label label-default">core PFMEA</span>'), "\n				", HTML.Raw("<br>"), "\n				", HTML.A({
    href: function() {                                                                                               // 62
      return Spacebars.mustache(view.lookup("pathFor"), "editPFMEALine", Spacebars.kw({                              // 63
        _id: Spacebars.dot(view.lookup("."), "_id")                                                                  // 64
      }));                                                                                                           // 65
    },                                                                                                               // 66
    title: function() {                                                                                              // 67
      return Spacebars.mustache(view.lookup("_"), "Edit core PFMEA Line");                                           // 68
    }                                                                                                                // 69
  }, HTML.Raw('<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>')), "\n				", HTML.Raw("<br>"), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                                // 71
  }, function() {                                                                                                    // 72
    return [ "\n					", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {                        // 73
      return Spacebars.mustache(view.lookup("textScore"));                                                           // 74
    })), "\n				" ];                                                                                                 // 75
  }), "\n			"), "\n		"), "\n	");                                                                                     // 76
}));                                                                                                                 // 77
                                                                                                                     // 78
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/lib/client/corePFMEAInSearchResults.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.corePFMEAInSearchResults.helpers({                                                                          // 1
	searchTypeIsFullTextSearch: function () {                                                                           // 2
		return (Session.get('searchType') === 'fullTextSearch');                                                           // 3
	},                                                                                                                  // 4
	textScore: function () {                                                                                            // 5
		//limit to 2 digits after comma :                                                                                  // 6
		return Math.round(this.score * 100) / 100;                                                                         // 7
	},                                                                                                                  // 8
});                                                                                                                  // 9
                                                                                                                     // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/packages/rationalk:fmeai18n/en.i18n.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "rationalk:fmea",                                                                                 // 2
    namespace = "rationalk:fmea";                                                                                    // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
// integrate the fallback language translations                                                                      // 8
translations = {};                                                                                                   // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};             // 10
TAPi18n._loadLangFileObject("en", translations);                                                                     // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                                       // 12
                                                                                                                     // 13
for (var i = 0; i < package_templates.length; i++) {                                                                 // 14
  var package_template = package_templates[i];                                                                       // 15
                                                                                                                     // 16
  registerI18nTemplate(package_template);                                                                            // 17
}                                                                                                                    // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:fmea/packages/rationalk:fmeai18n/fr.i18n.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "rationalk:fmea",                                                                                 // 2
    namespace = "rationalk:fmea";                                                                                    // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
                                                                                                                     // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:fmea'] = {
  RKFMEA: RKFMEA
};

})();
