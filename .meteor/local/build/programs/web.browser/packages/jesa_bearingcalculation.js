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
var JESABearingCalculation, __, registerI18nTemplate, registerTemplate, non_package_templates, JESABearings, menuHTML, newId, translations;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/package-i18n.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
TAPi18n.packages["jesa:bearingcalculation"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                                      // 2
// define package's translation function (proxy to the i18next)                                                       // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                      // 4
// define the package's templates registrar                                                                           // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("jesa:bearingcalculation");                                   // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                      // 8
// Record the list of templates prior to package load                                                                 // 9
var _ = Package.underscore._;                                                                                         // 10
non_package_templates = _.keys(Template);                                                                             // 11
                                                                                                                      // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/methods.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
JESABearingCalculation = {};                                                                                          // 1
JESABearingCalculation.Collections = {};                                                                              // 2
                                                                                                                      // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/collections.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
JESABearings = new Mongo.Collection('jesabearings');                                                                  // 1
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/routes.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Router.route("/bearingcalculation", {                                                                                 // 1
  name: "bearingcalculation",                                                                                         // 2
  waitOn: function () {                                                                                               // 3
    return [                                                                                                          // 4
      Meteor.subscribe("bearings"),                                                                                   // 5
    ];                                                                                                                // 6
  },                                                                                                                  // 7
});                                                                                                                   // 8
                                                                                                                      // 9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/client/menu.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var urlTasks = Router.routes.tasks.path(                                                                              // 1
  {                                                                                                                   // 2
    filterBy: 'authorUserId',                                                                                         // 3
  });                                                                                                                 // 4
var urlMinutes = Router.routes.minutes.path();                                                                        // 5
var urlProjects = Router.routes.viewProjects.path();                                                                  // 6
menuHTML = new Spacebars.SafeString(                                                                                  // 7
   '<li role="separator" class="divider"></li>'                                                                       // 8
    + '<li class="dropdown-header">' + TAPi18n.__("Bearing Calculation") + '</li>'                                    // 9
    + '<li><a href="' + urlProjects + '" title="' + TAPi18n.__("Projects") + '">' + TAPi18n.__("Projects") + '</a></li>'
    + '<li><a href="' + urlTasks + '" title="' + TAPi18n.__("Tasks") + '">' + TAPi18n.__("Tasks") + '</a></li>'       // 11
    + '<li><a href="' + urlMinutes + '" title="' + TAPi18n.__("Minutes") + '">' + TAPi18n.__("Minutes") + '</a></li>' // 12
    + '<li role="separator" class="divider"></li>'                                                                    // 13
);                                                                                                                    // 14
                                                                                                                      // 15
RKCore.packageMenu.push(                                                                                              // 16
  {                                                                                                                   // 17
    "menuHTML": menuHTML,                                                                                             // 18
    "fromPackage": "jesa:bearingcalculation",                                                                         // 19
  }                                                                                                                   // 20
);                                                                                                                    // 21
                                                                                                                      // 22
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/client/template.bearingcalculation.js                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("bearingcalculation");                                                                           // 2
Template["bearingcalculation"] = new Template("Template.bearingcalculation", (function() {                            // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			 ", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.DIV({                                                                                            // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n			 		", HTML.H3({                                                                                            // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "Edit project");                                                      // 17
  }), " ", HTML.SPAN({                                                                                                // 18
    "class": "pull-right"                                                                                             // 19
  }, HTML.A({                                                                                                         // 20
    href: function() {                                                                                                // 21
      return Spacebars.mustache(view.lookup("pathFor"), "viewProjects");                                              // 22
    },                                                                                                                // 23
    title: function() {                                                                                               // 24
      return Spacebars.mustache(view.lookup("_"), "Back to projects list");                                           // 25
    }                                                                                                                 // 26
  }, Blaze.View("lookup:_", function() {                                                                              // 27
    return Spacebars.mustache(view.lookup("_"), "Back to projects list");                                             // 28
  })))), "\n        "), "\n				", HTML.DIV({                                                                          // 29
    "class": "panel-body"                                                                                             // 30
  }, "\n					", HTML.FORM({                                                                                           // 31
    id: "editTaskForm"                                                                                                // 32
  }, "\n						", HTML.DIV({                                                                                           // 33
    "class": "row"                                                                                                    // 34
  }, "\n							", HTML.DIV({                                                                                          // 35
    "class": "col-md-12"                                                                                              // 36
  }, "\n								", HTML.DIV({                                                                                         // 37
    "class": "form-group"                                                                                             // 38
  }, "\n									", HTML.LABEL({                                                                                      // 39
    "for": "projectNumber"                                                                                            // 40
  }, Blaze.View("lookup:_", function() {                                                                              // 41
    return Spacebars.mustache(view.lookup("_"), "Project number");                                                    // 42
  })), "\n									", HTML.INPUT({                                                                                    // 43
    type: "text",                                                                                                     // 44
    "class": "form-control",                                                                                          // 45
    id: "projectNumber",                                                                                              // 46
    placeholder: function() {                                                                                         // 47
      return Spacebars.mustache(view.lookup("_"), "Project number");                                                  // 48
    },                                                                                                                // 49
    value: function() {                                                                                               // 50
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProject"), "projectNumber"));                       // 51
    }                                                                                                                 // 52
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 53
    "class": "form-group"                                                                                             // 54
  }, "\n									", HTML.LABEL({                                                                                      // 55
    "for": "projectName"                                                                                              // 56
  }, Blaze.View("lookup:_", function() {                                                                              // 57
    return Spacebars.mustache(view.lookup("_"), "Project name");                                                      // 58
  })), "\n									", HTML.INPUT({                                                                                    // 59
    type: "text",                                                                                                     // 60
    "class": "form-control",                                                                                          // 61
    id: "projectName",                                                                                                // 62
    placeholder: function() {                                                                                         // 63
      return Spacebars.mustache(view.lookup("_"), "Project name");                                                    // 64
    },                                                                                                                // 65
    value: function() {                                                                                               // 66
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProject"), "projectName"));                         // 67
    }                                                                                                                 // 68
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 69
    "class": "form-group"                                                                                             // 70
  }, "\n									", HTML.LABEL({                                                                                      // 71
    "for": "projectDescription"                                                                                       // 72
  }, Blaze.View("lookup:_", function() {                                                                              // 73
    return Spacebars.mustache(view.lookup("_"), "Project description");                                               // 74
  })), "\n									", HTML.INPUT({                                                                                    // 75
    type: "text",                                                                                                     // 76
    "class": "form-control",                                                                                          // 77
    id: "projectDescription",                                                                                         // 78
    placeholder: function() {                                                                                         // 79
      return Spacebars.mustache(view.lookup("_"), "Project description");                                             // 80
    },                                                                                                                // 81
    value: function() {                                                                                               // 82
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProject"), "projectDescription"));                  // 83
    }                                                                                                                 // 84
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 85
    "class": "form-group"                                                                                             // 86
  }, "\n									", HTML.LABEL({                                                                                      // 87
    "for": "projectManagerIds"                                                                                        // 88
  }, Blaze.View("lookup:_", function() {                                                                              // 89
    return Spacebars.mustache(view.lookup("_"), "Project manager");                                                   // 90
  })), "\n										", Blaze.Each(function() {                                                                        // 91
    return Spacebars.call(view.lookup("Members"));                                                                    // 92
  }, function() {                                                                                                     // 93
    return [ "\n										", HTML.DIV({                                                                               // 94
      "class": "checkbox"                                                                                             // 95
    }, "\n											", HTML.LABEL("\n												", HTML.INPUT({                                                     // 96
      type: "checkbox",                                                                                               // 97
      "class": "projectManagerIds",                                                                                   // 98
      value: function() {                                                                                             // 99
        return Spacebars.mustache(view.lookup("_id"));                                                                // 100
      },                                                                                                              // 101
      checked: function() {                                                                                           // 102
        return Spacebars.mustache(view.lookup("isProjectManagerChecked"), Spacebars.dot(view.lookup(".."), "currentProject", "projectManagerIds"), view.lookup("_id"));
      }                                                                                                               // 104
    }), "\n												", Blaze.View("lookup:profile.nickname", function() {                                          // 105
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));                                   // 106
    }), "\n											"), "\n										"), "\n										" ];                                                          // 107
  }, function() {                                                                                                     // 108
    return [ "\n											", HTML.P(Blaze.View("lookup:_", function() {                                              // 109
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 110
    })), "\n										" ];                                                                                            // 111
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 112
    "class": "form-group"                                                                                             // 113
  }, "\n									", HTML.LABEL({                                                                                      // 114
    "for": "tags"                                                                                                     // 115
  }, Blaze.View("lookup:_", function() {                                                                              // 116
    return Spacebars.mustache(view.lookup("_"), "Tags");                                                              // 117
  })), "\n									", HTML.INPUT({                                                                                    // 118
    type: "text",                                                                                                     // 119
    "class": "form-control",                                                                                          // 120
    id: "tags",                                                                                                       // 121
    placeholder: function() {                                                                                         // 122
      return Spacebars.mustache(view.lookup("_"), "Tags");                                                            // 123
    },                                                                                                                // 124
    value: function() {                                                                                               // 125
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProject"), "tags"));                                // 126
    }                                                                                                                 // 127
  }), "\n					    	"), "\n							"), " ", HTML.Raw("<!-- End of col -->"), "\n						"), "\n						", HTML.DIV({        // 128
    "class": "row"                                                                                                    // 129
  }, "\n							", HTML.DIV({                                                                                          // 130
    "class": "col-md-12"                                                                                              // 131
  }, "\n					  		", HTML.Raw('<!-- <button type="submit" class="btn btn-primary" name="submitButton" value="saveAndStayButton">{{_ "Save"}}</button>-->'), "\n								", HTML.BUTTON({
    type: "submit",                                                                                                   // 133
    "class": "btn btn-primary"                                                                                        // 134
  }, Blaze.View("lookup:_", function() {                                                                              // 135
    return Spacebars.mustache(view.lookup("_"), "Save and go back to projects list");                                 // 136
  })), "\n							"), "\n						"), "\n				  "), "\n    		"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({            // 137
    "class": "row"                                                                                                    // 138
  }, "\n		", HTML.DIV({                                                                                               // 139
    "class": "col-md-12"                                                                                              // 140
  }, "\n			 ", HTML.DIV({                                                                                             // 141
    "class": "panel panel-default"                                                                                    // 142
  }, "\n			 	", HTML.DIV({                                                                                            // 143
    "class": "panel-heading",                                                                                         // 144
    style: "position:relative"                                                                                        // 145
  }, "\n			 		", HTML.H3({                                                                                            // 146
    "class": "panel-title"                                                                                            // 147
  }, Blaze.View("lookup:_", function() {                                                                              // 148
    return Spacebars.mustache(view.lookup("_"), "Linked minutes");                                                    // 149
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 150
    "class": "panel-body"                                                                                             // 151
  }, "\n					", HTML.DIV({                                                                                            // 152
    "class": "row"                                                                                                    // 153
  }, "\n						", HTML.DIV({                                                                                           // 154
    "class": "col-md-12"                                                                                              // 155
  }, "\n							", Blaze.If(function() {                                                                               // 156
    return Spacebars.call(view.lookup("Minutes"));                                                                    // 157
  }, function() {                                                                                                     // 158
    return [ "\n								", HTML.DIV({                                                                                 // 159
      "class": "tableScroll"                                                                                          // 160
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 161
      return {                                                                                                        // 162
        collection: Spacebars.call(view.lookup("Minutes")),                                                           // 163
        settings: Spacebars.call(view.lookup("settingsMinutes"))                                                      // 164
      };                                                                                                              // 165
    }, function() {                                                                                                   // 166
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 167
    }), "\n								"), "\n							" ];                                                                                 // 168
  }, function() {                                                                                                     // 169
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 170
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 171
    })), "\n							" ];                                                                                               // 172
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	"), "\n	", HTML.DIV({                                // 173
    "class": "row"                                                                                                    // 174
  }, "\n		", HTML.DIV({                                                                                               // 175
    "class": "col-md-12"                                                                                              // 176
  }, "\n			 ", HTML.DIV({                                                                                             // 177
    "class": "panel panel-default"                                                                                    // 178
  }, "\n			 	", HTML.DIV({                                                                                            // 179
    "class": "panel-heading",                                                                                         // 180
    style: "position:relative"                                                                                        // 181
  }, "\n			 		", HTML.H3({                                                                                            // 182
    "class": "panel-title"                                                                                            // 183
  }, Blaze.View("lookup:_", function() {                                                                              // 184
    return Spacebars.mustache(view.lookup("_"), "Linked task(s)");                                                    // 185
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 186
    "class": "panel-body"                                                                                             // 187
  }, "\n					", HTML.DIV({                                                                                            // 188
    "class": "row"                                                                                                    // 189
  }, "\n						", HTML.DIV({                                                                                           // 190
    "class": "col-md-12"                                                                                              // 191
  }, "\n							", Blaze.If(function() {                                                                               // 192
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 193
  }, function() {                                                                                                     // 194
    return [ "\n								", HTML.DIV({                                                                                 // 195
      "class": "tableScroll"                                                                                          // 196
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 197
      return {                                                                                                        // 198
        collection: Spacebars.call(view.lookup("Tasks")),                                                             // 199
        settings: Spacebars.call(view.lookup("settingsTasks"))                                                        // 200
      };                                                                                                              // 201
    }, function() {                                                                                                   // 202
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 203
    }), "\n								"), "\n							" ];                                                                                 // 204
  }, function() {                                                                                                     // 205
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 206
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 207
    })), "\n							" ];                                                                                               // 208
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({                              // 209
    "class": "row"                                                                                                    // 210
  }, "\n		", HTML.DIV({                                                                                               // 211
    "class": "col-md-12"                                                                                              // 212
  }, "\n			 ", HTML.DIV({                                                                                             // 213
    "class": "panel panel-default"                                                                                    // 214
  }, "\n			 	", HTML.DIV({                                                                                            // 215
    "class": "panel-heading",                                                                                         // 216
    style: "position:relative"                                                                                        // 217
  }, "\n			 		", HTML.H3({                                                                                            // 218
    "class": "panel-title"                                                                                            // 219
  }, Blaze.View("lookup:_", function() {                                                                              // 220
    return Spacebars.mustache(view.lookup("_"), "Other informations");                                                // 221
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 222
    "class": "panel-body"                                                                                             // 223
  }, "\n					", HTML.DIV({                                                                                            // 224
    "class": "row"                                                                                                    // 225
  }, "\n						", HTML.DIV({                                                                                           // 226
    "class": "col-md-12"                                                                                              // 227
  }, "\n							", HTML.DIV({                                                                                          // 228
    "class": "form-group"                                                                                             // 229
  }, "\n								", HTML.LABEL({                                                                                       // 230
    "for": "addedDate"                                                                                                // 231
  }, Blaze.View("lookup:_", function() {                                                                              // 232
    return Spacebars.mustache(view.lookup("_"), "Added date");                                                        // 233
  })), "\n								", HTML.INPUT({                                                                                     // 234
    type: "text",                                                                                                     // 235
    "class": "form-control",                                                                                          // 236
    id: "addedDate",                                                                                                  // 237
    value: function() {                                                                                               // 238
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProject"), "addedDate"));                           // 239
    },                                                                                                                // 240
    disabled: ""                                                                                                      // 241
  }), "\n							"), "\n							", HTML.DIV({                                                                           // 242
    "class": "form-group"                                                                                             // 243
  }, "\n								", HTML.LABEL({                                                                                       // 244
    "for": "addedBy"                                                                                                  // 245
  }, Blaze.View("lookup:_", function() {                                                                              // 246
    return Spacebars.mustache(view.lookup("_"), "Added by");                                                          // 247
  })), "\n								", HTML.INPUT({                                                                                     // 248
    type: "text",                                                                                                     // 249
    "class": "form-control",                                                                                          // 250
    id: "addedBy",                                                                                                    // 251
    value: function() {                                                                                               // 252
      return Spacebars.mustache(view.lookup("author"));                                                               // 253
    },                                                                                                                // 254
    disabled: ""                                                                                                      // 255
  }), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	") ];                                  // 256
}));                                                                                                                  // 257
                                                                                                                      // 258
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/lib/client/bearingcalculation.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.bearingcalculation.rendered = function () {                                                                  // 1
	if (typeof($('#tags').val()) !== 'undefined') {                                                                      // 2
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 3
	}                                                                                                                    // 4
	$('#tags').tagsinput({                                                                                               // 5
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 6
	});                                                                                                                  // 7
                                                                                                                      // 8
	Meteor.typeahead.inject();                                                                                           // 9
};                                                                                                                    // 10
                                                                                                                      // 11
Template.bearingcalculation.helpers({                                                                                 // 12
	listActionee: function () {                                                                                          // 13
		//var usernames = ["aa", "bb"];                                                                                     // 14
		return this.data.usernames;                                                                                         // 15
	},                                                                                                                   // 16
	author: function () {                                                                                                // 17
		return Members.collection.findOne({accountId: this.currentProject.addedBy}).profile.nickname;                       // 18
	},                                                                                                                   // 19
	Members: function () {                                                                                               // 20
		return Members.collection.find({}).fetch();                                                                         // 21
	},                                                                                                                   // 22
	isProjectManagerChecked: function (projectManagerIds, projectManagerId) {                                            // 23
		if (typeof(projectManagerIds) !== 'undefined') {                                                                    // 24
			if (projectManagerIds.indexOf(projectManagerId) < 0) {                                                             // 25
				return false;                                                                                                     // 26
			}                                                                                                                  // 27
			return "checked";                                                                                                  // 28
		}                                                                                                                   // 29
		return false;                                                                                                       // 30
	},                                                                                                                   // 31
	Minutes: function () {                                                                                               // 32
		//filtered in the publication                                                                                       // 33
	  return Minutes.find().fetch();                                                                                     // 34
	},                                                                                                                   // 35
	settingsMinutes: function () {                                                                                       // 36
    return {                                                                                                          // 37
			rowsPerPage: 10,                                                                                                   // 38
			showFilter: true,                                                                                                  // 39
			showColumnToggles: true,                                                                                           // 40
			showNavigation: 'auto',                                                                                            // 41
      class: 'table table-condensed col-sm-12',                                                                       // 42
			fields: [                                                                                                          // 43
				{                                                                                                                 // 44
					key: 'minutesName',                                                                                              // 45
					label: TAPi18n.__("Minutes name"),                                                                               // 46
					fn: function (value) {                                                                                           // 47
						//var val = '<p class="editable" data-type="textarea" data-placeholder="Enter text" data-emptytext="Click to enter text" data-rows="4">' + value + '</p>';
						return new Spacebars.SafeString(value);                                                                         // 49
					},                                                                                                               // 50
				},                                                                                                                // 51
				{                                                                                                                 // 52
					key: 'minutesTitle',                                                                                             // 53
					label: TAPi18n.__("Minutes title"),                                                                              // 54
					fn: function (value) {                                                                                           // 55
						//var val = '<p class="editable" data-type="textarea" data-placeholder="Enter text" data-emptytext="Click to enter text" data-rows="4">' + value + '</p>';
						return new Spacebars.SafeString(value);                                                                         // 57
					},                                                                                                               // 58
				},                                                                                                                // 59
				{                                                                                                                 // 60
					key: 'actions',                                                                                                  // 61
					label: 'Actions',                                                                                                // 62
					fn: function (value, object) {                                                                                   // 63
						var editLink = '<a href="' +                                                                                    // 64
							Router.routes.editMinutes.path({_id: object._id})                                                              // 65
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 66
							+ '>'                                                                                                          // 67
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 68
							'</a> ';                                                                                                       // 69
						var duplicateLink = '<a href="#"'                                                                               // 70
							+ ' class="duplicateMinutes" title="' + TAPi18n.__('Duplicate') + '"'                                          // 71
							+ ' data-minutesid="' +	object._id + '"'                                                                       // 72
							+ '>'                                                                                                          // 73
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 74
							'</a> ';                                                                                                       // 75
						var deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteMinutes" '                     // 76
							+ 'data-minutesid="' +	object._id + '"'                                                                        // 77
							+ '>' +                                                                                                        // 78
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 79
							'</a> ';                                                                                                       // 80
						var printLink = '<a href="' +                                                                                   // 81
							Router.routes.printMinutes.path({_id: object._id})                                                             // 82
							+ '" title="' + TAPi18n.__('Print') + '"'                                                                      // 83
							+ '>'                                                                                                          // 84
							+ '<span class="glyphicon glyphicon-print" aria-hidden="true"></span>' +                                       // 85
							'</a> ';                                                                                                       // 86
						return new Spacebars.SafeString(editLink + duplicateLink + printLink + deleteLink);                             // 87
					},                                                                                                               // 88
				},                                                                                                                // 89
			],                                                                                                                 // 90
		};                                                                                                                  // 91
	},                                                                                                                   // 92
	Tasks: function () {                                                                                                 // 93
		//filtered in the publication                                                                                       // 94
	  return Tasks.find().fetch();                                                                                       // 95
	},                                                                                                                   // 96
	settingsTasks: function () {                                                                                         // 97
    return {                                                                                                          // 98
			rowsPerPage: 10,                                                                                                   // 99
			showFilter: true,                                                                                                  // 100
			showColumnToggles: true,                                                                                           // 101
			showNavigation: 'auto',                                                                                            // 102
      class: 'table table-condensed col-sm-12',                                                                       // 103
			rowClass: function (item) {                                                                                        // 104
				var today = moment();                                                                                             // 105
				var scheduledEndDate = moment(item.scheduledEndDate, "DD.MM.YYYY");                                               // 106
				//RKCore.log(today.diff(scheduledEndDate, 'days'));                                                               // 107
				if (item.realized === "Yes") {                                                                                    // 108
					return 'success';                                                                                                // 109
				}                                                                                                                 // 110
				if ( today.diff(scheduledEndDate, 'days') === 0) {                                                                // 111
					return 'warning';                                                                                                // 112
				}                                                                                                                 // 113
				if (today.diff(scheduledEndDate, 'days') > 0) {                                                                   // 114
					return 'danger';                                                                                                 // 115
				}                                                                                                                 // 116
				return '';                                                                                                        // 117
			},                                                                                                                 // 118
			fields: [                                                                                                          // 119
				{                                                                                                                 // 120
					key: 'taskContent',                                                                                              // 121
					label: TAPi18n.__("Task content"),                                                                               // 122
					fn: function (value) {                                                                                           // 123
						return new Spacebars.SafeString(value);                                                                         // 124
					},                                                                                                               // 125
				},                                                                                                                // 126
				{                                                                                                                 // 127
					key: 'realized',                                                                                                 // 128
					label: TAPi18n.__("Realized"),                                                                                   // 129
					fn: function (value) {                                                                                           // 130
						return new Spacebars.SafeString(value);                                                                         // 131
					},                                                                                                               // 132
				},                                                                                                                // 133
				{                                                                                                                 // 134
					key: 'actions',                                                                                                  // 135
					label: 'Actions',                                                                                                // 136
					fn: function (value, object) {                                                                                   // 137
						var markAsDoneLink = '';                                                                                        // 138
						var editLink;                                                                                                   // 139
						var duplicateLink;                                                                                              // 140
						var deleteLink;                                                                                                 // 141
						RKCore.log(object);                                                                                             // 142
						if (object.realized === "No") {                                                                                 // 143
							markAsDoneLink = ' <a href="#" title="' + TAPi18n.__('Mark as done') + '" class="markAsDone" '                 // 144
								+ 'data-taskid="' +	object._id + '"'                                                                          // 145
								+ '>' +                                                                                                       // 146
								'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +                                           // 147
								'</a> ';                                                                                                      // 148
						}                                                                                                               // 149
						editLink = '<a href="' +                                                                                        // 150
							Router.routes.editTask.path({_id: object._id})                                                                 // 151
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 152
							+ '>'                                                                                                          // 153
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 154
							'</a> ';                                                                                                       // 155
						duplicateLink = '<a href="#"'                                                                                   // 156
							+ ' class="duplicateTask" title="' + TAPi18n.__('Duplicate') + '"'                                             // 157
							+ ' data-taskid="' +	object._id + '"'                                                                          // 158
							+ '>'                                                                                                          // 159
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 160
							'</a> ';                                                                                                       // 161
						deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteTask" '                            // 162
							+ 'data-taskid="' +	object._id + '"'                                                                           // 163
							+ '>' +                                                                                                        // 164
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 165
							'</a> ';                                                                                                       // 166
						return new Spacebars.SafeString(markAsDoneLink + editLink + duplicateLink + deleteLink);                        // 167
					},                                                                                                               // 168
				},                                                                                                                // 169
			],                                                                                                                 // 170
		};                                                                                                                  // 171
	},                                                                                                                   // 172
});                                                                                                                   // 173
                                                                                                                      // 174
Template.bearingcalculation.events({                                                                                  // 175
	'submit form': function (e) {                                                                                        // 176
		var data = {};                                                                                                      // 177
		var projectManagerIds = [];                                                                                         // 178
	  e.preventDefault();                                                                                                // 179
		data.projectId = this.currentProject._id;                                                                           // 180
		data.projectNumber = e.target.projectNumber.value;                                                                  // 181
		data.projectName = e.target.projectName.value;                                                                      // 182
		data.projectDescription = e.target.projectDescription.value;                                                        // 183
		data.tags = e.target.tags.value;                                                                                    // 184
		data.tagsNoHTML = $("<div/>").html(e.target.tags.value).text();                                                     // 185
                                                                                                                      // 186
		$("input:checkbox.projectManagerIds[type=checkbox]:checked").each(function () {                                     // 187
			projectManagerIds.push($(this).val());                                                                             // 188
		});                                                                                                                 // 189
		data.projectManagerIds = projectManagerIds;                                                                         // 190
                                                                                                                      // 191
	  Meteor.call('updateProject', data, function (error) {                                                              // 192
			if (!error) {                                                                                                      // 193
				if (typeof(toastr) !== 'undefined') {                                                                             // 194
					toastr.success(TAPi18n.__('The project has been updated successfully'));                                         // 195
				}                                                                                                                 // 196
				Router.go("viewProjects");                                                                                        // 197
			}                                                                                                                  // 198
		});                                                                                                                 // 199
		return false;                                                                                                       // 200
	},                                                                                                                   // 201
	"click a.duplicateMinutes": function (e) {                                                                           // 202
    e.preventDefault();                                                                                               // 203
    Meteor.call('duplicateMinutes', e.currentTarget.dataset.minutesid, function (error, result) {                     // 204
			if (!error) {                                                                                                      // 205
				if (typeof(toastr) !== 'undefined') {                                                                             // 206
					toastr.success(TAPi18n.__('The minutes has been duplicated successfully. Please edit and save.'));               // 207
				}                                                                                                                 // 208
				newId = result;                                                                                                   // 209
				Router.go("editMinutes", {_id: newId});                                                                           // 210
			}                                                                                                                  // 211
		});                                                                                                                 // 212
		return false;                                                                                                       // 213
	},                                                                                                                   // 214
	"click a.deleteMinutes": function (e) {                                                                              // 215
    e.preventDefault();                                                                                               // 216
		bootbox.confirm(TAPi18n.__("Are you sure you want to delete this minutes ?"), function (result) {                   // 217
		 if (result) {                                                                                                      // 218
			 Meteor.call('deleteMinutes', e.currentTarget.dataset.minutesid);                                                  // 219
		 }                                                                                                                  // 220
		});                                                                                                                 // 221
		return false;                                                                                                       // 222
	},                                                                                                                   // 223
	"click a.duplicateTask": function (e) {                                                                              // 224
    e.preventDefault();                                                                                               // 225
    Meteor.call('duplicateTask', e.currentTarget.dataset.taskid, function (error, result) {                           // 226
			if (!error) {                                                                                                      // 227
				if (typeof(toastr) !== 'undefined') {                                                                             // 228
					toastr.success(TAPi18n.__('The task has been duplicated successfully. Please edit and save.'));                  // 229
				}                                                                                                                 // 230
				newId = result;                                                                                                   // 231
				Router.go("editTask", {_id: newId});                                                                              // 232
			}                                                                                                                  // 233
		});                                                                                                                 // 234
		return false;                                                                                                       // 235
	},                                                                                                                   // 236
	"click a.deleteTask": function (e) {                                                                                 // 237
    e.preventDefault();                                                                                               // 238
		bootbox.confirm(TAPi18n.__("Are you sure you want to delete this task ?"), function (result) {                      // 239
		 if (result) {                                                                                                      // 240
			 Meteor.call('deleteTask', e.currentTarget.dataset.taskid);                                                        // 241
		 }                                                                                                                  // 242
		});                                                                                                                 // 243
		return false;                                                                                                       // 244
	},                                                                                                                   // 245
	"click a.markAsDone": function (e) {                                                                                 // 246
	    e.preventDefault();                                                                                              // 247
	    Meteor.call('markAsDone', e.currentTarget.dataset.taskid);                                                       // 248
			return false;                                                                                                      // 249
	},                                                                                                                   // 250
});                                                                                                                   // 251
                                                                                                                      // 252
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/packages/jesa:bearingcalculationi18n/en.i18n.js                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "jesa:bearingcalculation",                                                                         // 2
    namespace = "jesa:bearingcalculation";                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
// integrate the fallback language translations                                                                       // 8
translations = {};                                                                                                    // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};              // 10
TAPi18n._loadLangFileObject("en", translations);                                                                      // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                                        // 12
                                                                                                                      // 13
for (var i = 0; i < package_templates.length; i++) {                                                                  // 14
  var package_template = package_templates[i];                                                                        // 15
                                                                                                                      // 16
  registerI18nTemplate(package_template);                                                                             // 17
}                                                                                                                     // 18
                                                                                                                      // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jesa:bearingcalculation/packages/jesa:bearingcalculationi18n/fr.i18n.js                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "jesa:bearingcalculation",                                                                         // 2
    namespace = "jesa:bearingcalculation";                                                                            // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
                                                                                                                      // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['jesa:bearingcalculation'] = {
  JESABearingCalculation: JESABearingCalculation
};

})();
