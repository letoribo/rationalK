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
var RKTasks, __, registerI18nTemplate, registerTemplate, non_package_templates, Tasks, Minutes, Projects, SettingsRKTasks, FollowUp, menuHTML, val2, htmlTag, actionee, actioneeId, progressBar, member, tag, projectId, newId, taskId, minutesId, getTasks, getTruncatedTaskAdditionalText, updateGantt, i, minutes, project, valSplitted, printLink, myTask, newTaskId, tasksGantt, nActioneesInThisTask, j, n, nProjects, count, markedAsDoneBy, filePath, additionalTextLink, tasks, val, tags, htmlTags, translations;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/package-i18n.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
TAPi18n.packages["rationalk:tasks"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};     // 1
                                                                                                                      // 2
// define package's translation function (proxy to the i18next)                                                       // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                      // 4
// define the package's templates registrar                                                                           // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:tasks");                                           // 6
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
// packages/rationalk:tasks/lib/methods.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RKTasks = {};                                                                                                         // 1
RKTasks.Collections = {};                                                                                             // 2
RKCore.searchResultsPackage.push(                                                                                     // 3
  {                                                                                                                   // 4
    name: "RKTasks", // RKExperts.findAllFullTextSearch should exists                                                 // 5
  }                                                                                                                   // 6
);                                                                                                                    // 7
                                                                                                                      // 8
RKTasks.findAllFullTextSearch = function () {                                                                         // 9
  return Tasks.find({}, {sort: {score: -1}}).fetch();                                                                 // 10
};                                                                                                                    // 11
                                                                                                                      // 12
RKTasks.findFullText = function (searchQuery) {                                                                       // 13
  var sr;                                                                                                             // 14
  check(searchQuery, String);                                                                                         // 15
  sr = Tasks.find(                                                                                                    // 16
    {                                                                                                                 // 17
      $text: {                                                                                                        // 18
        $search: searchQuery,                                                                                         // 19
      },                                                                                                              // 20
    },                                                                                                                // 21
    {                                                                                                                 // 22
      fields: { score: { $meta: 'textScore' } },                                                                      // 23
      sort: { score: { $meta: 'textScore' } },                                                                        // 24
      limit: 30,                                                                                                      // 25
    });                                                                                                               // 26
    return sr;                                                                                                        // 27
};                                                                                                                    // 28
                                                                                                                      // 29
RKTasks.findDummy = function () {                                                                                     // 30
  return Tasks.find({$text: { $search: "somethingthatyouwillneverfind" }});                                           // 31
};                                                                                                                    // 32
                                                                                                                      // 33
Meteor.methods({                                                                                                      // 34
	deleteTask: function (taskId) {                                                                                      // 35
		check(taskId, String);                                                                                              // 36
		Tasks.remove(                                                                                                       // 37
			{                                                                                                                  // 38
			  _id: taskId,                                                                                                     // 39
			}                                                                                                                  // 40
		);                                                                                                                  // 41
		if (typeof(toastr) !== 'undefined') {                                                                               // 42
			toastr.success(TAPi18n.__('Task deleted succesfully'));                                                            // 43
		}                                                                                                                   // 44
	},                                                                                                                   // 45
  deleteMinutes: function (minutesId) {                                                                               // 46
		check(minutesId, String);                                                                                           // 47
		Minutes.remove(                                                                                                     // 48
			{                                                                                                                  // 49
			  _id: minutesId,                                                                                                  // 50
			}                                                                                                                  // 51
		);                                                                                                                  // 52
		if (typeof(toastr) !== 'undefined') {                                                                               // 53
			toastr.success(TAPi18n.__('Minutes deleted succesfully'));                                                         // 54
		}                                                                                                                   // 55
	},                                                                                                                   // 56
  deleteProject: function (projectId) {                                                                               // 57
		check(projectId, String);                                                                                           // 58
		Projects.remove(                                                                                                    // 59
			{                                                                                                                  // 60
			  _id: projectId,                                                                                                  // 61
			}                                                                                                                  // 62
		);                                                                                                                  // 63
		if (typeof(toastr) !== 'undefined') {                                                                               // 64
			toastr.success(TAPi18n.__('Project deleted succesfully'));                                                         // 65
		}                                                                                                                   // 66
	},                                                                                                                   // 67
});                                                                                                                   // 68
                                                                                                                      // 69
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/collections.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Tasks = new Mongo.Collection('tasks');                                                                                // 1
Minutes = new Mongo.Collection('minutes');                                                                            // 2
Projects = new Mongo.Collection('projects');                                                                          // 3
SettingsRKTasks = new Mongo.Collection('settingsrktasks');                                                            // 4
                                                                                                                      // 5
Tasks.allow( {                                                                                                        // 6
		insert: function (userId) {return !! userId; },                                                                     // 7
		update: function (userId) {return !!userId; },                                                                      // 8
    remove: function (userId) {return !!userId; },                                                                    // 9
});                                                                                                                   // 10
                                                                                                                      // 11
Minutes.allow( {                                                                                                      // 12
		insert: function (userId) {return !! userId; },                                                                     // 13
		update: function (userId) {return !!userId; },                                                                      // 14
    remove: function (userId) {return !!userId; },                                                                    // 15
});                                                                                                                   // 16
                                                                                                                      // 17
Projects.allow( {                                                                                                     // 18
		insert: function (userId) {return !! userId; },                                                                     // 19
		update: function (userId) {return !!userId; },                                                                      // 20
    remove: function (userId) {return !!userId; },                                                                    // 21
});                                                                                                                   // 22
                                                                                                                      // 23
SettingsRKTasks.allow( {                                                                                              // 24
		insert: function (userId) {return !! userId; },                                                                     // 25
		update: function (userId) {return !!userId; },                                                                      // 26
    remove: function (userId) {return !!userId; },                                                                    // 27
});                                                                                                                   // 28
                                                                                                                      // 29
if (Meteor.isServer) {                                                                                                // 30
	if (typeof Tasks.createIndex === 'function') {                                                                       // 31
		Tasks.createIndex({ full: "text" }, { name: "TextIndex" });                                                         // 32
	}                                                                                                                    // 33
	else {                                                                                                               // 34
		if (typeof Tasks._ensureIndex === 'function') {                                                                     // 35
			Tasks._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                        // 36
		}                                                                                                                   // 37
	}                                                                                                                    // 38
                                                                                                                      // 39
	if (typeof Minutes.createIndex === 'function') {                                                                     // 40
		Minutes.createIndex({ full: "text" }, { name: "TextIndex" });                                                       // 41
	}                                                                                                                    // 42
	else {                                                                                                               // 43
		if (typeof Minutes._ensureIndex === 'function') {                                                                   // 44
			Minutes._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                      // 45
		}                                                                                                                   // 46
	}                                                                                                                    // 47
                                                                                                                      // 48
	if (typeof Projects.createIndex === 'function') {                                                                    // 49
		Projects.createIndex({ full: "text" }, { name: "TextIndex" });                                                      // 50
	}                                                                                                                    // 51
	else {                                                                                                               // 52
		if (typeof Projects._ensureIndex === 'function') {                                                                  // 53
			Projects._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                     // 54
		}                                                                                                                   // 55
	}                                                                                                                    // 56
} //end if Server                                                                                                     // 57
                                                                                                                      // 58
FollowUp = new Mongo.Collection('FollowUp');                                                                          // 59
                                                                                                                      // 60
FollowUp.allow( {                                                                                                     // 61
		insert: function (userId) {return !! userId; },                                                                     // 62
		update: function (userId) {return !!userId; },                                                                      // 63
    remove: function (userId) {return !!userId; },                                                                    // 64
});                                                                                                                   // 65
                                                                                                                      // 66
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/routes.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
if (Meteor.settings.public.show.tasks) {                                                                              // 1
  Router.route("/tasks/:filterBy?/:filterVal?", {                                                                     // 2
    name: "tasks",                                                                                                    // 3
    waitOn: function () {                                                                                             // 4
      RKCore.log("this.params.filterBy : " + this.params.filterBy);                                                   // 5
      RKCore.log("this.params.filterVal : " + this.params.filterVal);                                                 // 6
      if (this.params.filterBy === "project") {                                                                       // 7
        Meteor.subscribe("tasksByProjectId", this.params.filterVal);                                                  // 8
      }                                                                                                               // 9
      else if (this.params.filterBy === "author") {                                                                   // 10
        Meteor.subscribe("tasksByAuthorId", this.params.filterVal);                                                   // 11
      }                                                                                                               // 12
      else if (this.params.filterBy === "authorUserId") {                                                             // 13
        //les taches ou je suis autheur                                                                               // 14
        Meteor.subscribe("authorTasksByUserId");                                                                      // 15
      }                                                                                                               // 16
      else if (this.params.filterBy === "actionee") {                                                                 // 17
        Meteor.subscribe("tasksByActioneeId", this.params.filterVal);                                                 // 18
      }                                                                                                               // 19
      else if (this.params.filterBy === "minutes") {                                                                  // 20
        Meteor.subscribe("tasksByMinutesId", this.params.filterVal);                                                  // 21
      }                                                                                                               // 22
      else {                                                                                                          // 23
        Meteor.subscribe("tasks");                                                                                    // 24
      }                                                                                                               // 25
      return [                                                                                                        // 26
        Meteor.subscribe("projects"),                                                                                 // 27
        Meteor.subscribe("members"),                                                                                  // 28
        Meteor.subscribe("allMinutes"),                                                                               // 29
      ];                                                                                                              // 30
    },                                                                                                                // 31
  });                                                                                                                 // 32
                                                                                                                      // 33
  Router.route("/projects", {                                                                                         // 34
    name: "viewProjects",                                                                                             // 35
    waitOn: function () {                                                                                             // 36
      Meteor.subscribe("projects");                                                                                   // 37
      Meteor.subscribe("tasks");                                                                                      // 38
      return [Meteor.subscribe("members")];                                                                           // 39
    },                                                                                                                // 40
  });                                                                                                                 // 41
                                                                                                                      // 42
  Router.route("/project/edit/:_id", {                                                                                // 43
    name: "editProject",                                                                                              // 44
    data: function () {                                                                                               // 45
      var usernames = [];                                                                                             // 46
      var members = Members.collection.find().fetch();                                                                // 47
      var data = {};                                                                                                  // 48
      var nMembers = members.length;                                                                                  // 49
      var i;                                                                                                          // 50
      data.currentProject = Projects.findOne(this.params._id);                                                        // 51
                                                                                                                      // 52
      for (i = 0; i < nMembers; i++) {                                                                                // 53
          usernames.push(members[i].profile.nickname);                                                                // 54
      }                                                                                                               // 55
      data.usernames = usernames;                                                                                     // 56
      return data;                                                                                                    // 57
    },                                                                                                                // 58
    waitOn: function () {                                                                                             // 59
      return [                                                                                                        // 60
        Meteor.subscribe("project", this.params._id),                                                                 // 61
        Meteor.subscribe("minutesByProjectId", this.params._id),                                                      // 62
        Meteor.subscribe("tasksByProjectId", this.params._id),                                                        // 63
        Meteor.subscribe("members"),                                                                                  // 64
        Meteor.subscribe("tags"),                                                                                     // 65
       ];                                                                                                             // 66
    },                                                                                                                // 67
  });                                                                                                                 // 68
                                                                                                                      // 69
                                                                                                                      // 70
  Router.route("/task/edit/:_id/:filterBy?/:filterVal?", {                                                            // 71
    name: "editTask",                                                                                                 // 72
    data: function () {                                                                                               // 73
      var usernames = [];                                                                                             // 74
      var members = Members.collection.find().fetch();                                                                // 75
      var data = {};                                                                                                  // 76
      var nMembers = members.length;                                                                                  // 77
      var i;                                                                                                          // 78
      data.currentTask = Tasks.findOne(this.params._id);                                                              // 79
                                                                                                                      // 80
      for (i = 0; i < nMembers; i++) {                                                                                // 81
          usernames.push(members[i].profile.nickname);                                                                // 82
      }                                                                                                               // 83
      data.usernames = usernames;                                                                                     // 84
      data.filterBy = this.params.filterBy;                                                                           // 85
      data.filterVal = this.params.filterVal;                                                                         // 86
      RKCore.log(data);                                                                                               // 87
      return data;                                                                                                    // 88
    },                                                                                                                // 89
    waitOn: function () {                                                                                             // 90
      return [                                                                                                        // 91
        Meteor.subscribe("task", this.params._id),                                                                    // 92
        Meteor.subscribe("members"),                                                                                  // 93
        Meteor.subscribe("projects"),                                                                                 // 94
        Meteor.subscribe("allMinutes"),                                                                               // 95
        Meteor.subscribe("tags"),                                                                                     // 96
       ];                                                                                                             // 97
    },                                                                                                                // 98
  });                                                                                                                 // 99
                                                                                                                      // 100
  Router.route("/task/table/edit", {                                                                                  // 101
    name: "editTasksTable",                                                                                           // 102
    data: function () {                                                                                               // 103
      return true;                                                                                                    // 104
    },                                                                                                                // 105
    waitOn: function () {                                                                                             // 106
      return [                                                                                                        // 107
        Meteor.subscribe("members"),                                                                                  // 108
       ];                                                                                                             // 109
    },                                                                                                                // 110
  });                                                                                                                 // 111
                                                                                                                      // 112
  Router.route("/minutes/:filterBy?/:filterVal?", {                                                                   // 113
    name: "minutes",                                                                                                  // 114
    waitOn: function () {                                                                                             // 115
      RKCore.log("this.params.filterBy : " + this.params.filterBy);                                                   // 116
      RKCore.log("this.params.filterVal : " + this.params.filterVal);                                                 // 117
      if (this.params.filterBy === "project") {                                                                       // 118
        // filterVal = projectName                                                                                    // 119
        Meteor.subscribe("minutesByProjectId", this.params.filterVal);                                                // 120
      }                                                                                                               // 121
      else if (this.params.filterBy === "author") {                                                                   // 122
        // filterVal = authorId                                                                                       // 123
        Meteor.subscribe("minutesByAuthorId", this.params.filterVal);                                                 // 124
      }                                                                                                               // 125
      else {                                                                                                          // 126
        Meteor.subscribe("allMinutes");                                                                               // 127
      }                                                                                                               // 128
      return [                                                                                                        // 129
        Meteor.subscribe("members"),                                                                                  // 130
        Meteor.subscribe("projects"),                                                                                 // 131
      ];                                                                                                              // 132
    },                                                                                                                // 133
  });                                                                                                                 // 134
                                                                                                                      // 135
  Router.route("/editMinutes/:_id/:filterBy?/:filterVal?", {                                                          // 136
    name: "editMinutes",                                                                                              // 137
    data: function () {                                                                                               // 138
      var usernames = [];                                                                                             // 139
      var members = Members.collection.find().fetch();                                                                // 140
      var data = {};                                                                                                  // 141
      var nMembers = members.length;                                                                                  // 142
      var i;                                                                                                          // 143
      data.currentMinutes = Minutes.findOne(this.params._id);                                                         // 144
                                                                                                                      // 145
      for (i = 0; i < nMembers; i++) {                                                                                // 146
          usernames.push(members[i].profile.nickname);                                                                // 147
      }                                                                                                               // 148
      data.usernames = usernames;                                                                                     // 149
      data.filterBy = this.params.filterBy;                                                                           // 150
      data.filterVal = this.params.filterVal;                                                                         // 151
      return data;                                                                                                    // 152
    },                                                                                                                // 153
    waitOn: function () {                                                                                             // 154
      return [                                                                                                        // 155
        Meteor.subscribe("minutes", this.params._id),                                                                 // 156
        Meteor.subscribe("members"),                                                                                  // 157
        Meteor.subscribe("projects"),                                                                                 // 158
        Meteor.subscribe("tags"),                                                                                     // 159
        Meteor.subscribe("SettingsRKTasks"),                                                                          // 160
        Meteor.subscribe("tasksByMinutesId", this.params._id),                                                        // 161
       ];                                                                                                             // 162
    },                                                                                                                // 163
  });                                                                                                                 // 164
                                                                                                                      // 165
                                                                                                                      // 166
  Router.route("/print/task/:_id/:serverToken?/:serverTokenVal?", {                                                   // 167
    name: "printTask",                                                                                                // 168
    layoutTemplate: 'printLayout',                                                                                    // 169
    data: function () {                                                                                               // 170
      var usernames = [];                                                                                             // 171
      var members = Members.collection.find().fetch();                                                                // 172
      var data = {};                                                                                                  // 173
      var nMembers = members.length;                                                                                  // 174
      var i;                                                                                                          // 175
      data.currentTask = Tasks.findOne(this.params._id);                                                              // 176
                                                                                                                      // 177
      for (i = 0; i < nMembers; i++) {                                                                                // 178
          usernames.push(members[i].profile.nickname);                                                                // 179
      }                                                                                                               // 180
      data.usernames = usernames;                                                                                     // 181
      return data;                                                                                                    // 182
    },                                                                                                                // 183
    waitOn: function () {                                                                                             // 184
      return [                                                                                                        // 185
        Meteor.subscribe("members"),                                                                                  // 186
        Meteor.subscribe("tags"),                                                                                     // 187
        Meteor.subscribe("allMinutes"),                                                                               // 188
        Meteor.subscribe("task", this.params._id),                                                                    // 189
        Meteor.subscribe("projects"),                                                                                 // 190
       ];                                                                                                             // 191
    },                                                                                                                // 192
  });                                                                                                                 // 193
                                                                                                                      // 194
  Router.route("/print/minutes/:_id/:serverToken?/:serverTokenVal?", {                                                // 195
    name: "printMinutes",                                                                                             // 196
    layoutTemplate: 'printLayout',                                                                                    // 197
    data: function () {                                                                                               // 198
      var usernames = [];                                                                                             // 199
      var members = Members.collection.find().fetch();                                                                // 200
      var data = {};                                                                                                  // 201
      var nMembers = members.length;                                                                                  // 202
      var i;                                                                                                          // 203
      data.currentMinutes = Minutes.findOne(this.params._id);                                                         // 204
                                                                                                                      // 205
      for (i = 0; i < nMembers; i++) {                                                                                // 206
          usernames.push(members[i].profile.nickname);                                                                // 207
      }                                                                                                               // 208
      data.usernames = usernames;                                                                                     // 209
      return data;                                                                                                    // 210
    },                                                                                                                // 211
    waitOn: function () {                                                                                             // 212
      return [                                                                                                        // 213
        Meteor.subscribe("minutes", this.params._id),                                                                 // 214
        Meteor.subscribe("members"),                                                                                  // 215
        Meteor.subscribe("tags"),                                                                                     // 216
        Meteor.subscribe("tasksByMinutesId", this.params._id),                                                        // 217
       ];                                                                                                             // 218
    },                                                                                                                // 219
  });                                                                                                                 // 220
                                                                                                                      // 221
  Router.route("/followup", {                                                                                         // 222
    name: "followup",                                                                                                 // 223
    waitOn: function () {                                                                                             // 224
      return [                                                                                                        // 225
        Meteor.subscribe("followup"),                                                                                 // 226
        Meteor.subscribe("members"),                                                                                  // 227
      ];                                                                                                              // 228
    },                                                                                                                // 229
  });                                                                                                                 // 230
}                                                                                                                     // 231
                                                                                                                      // 232
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/menu.js                                                                        //
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
    + '<li class="dropdown-header">' + TAPi18n.__("Tasks") + '</li>'                                                  // 9
    + '<li><a href="' + urlProjects + '" title="' + TAPi18n.__("Projects") + '">' + TAPi18n.__("Projects") + '</a></li>'
    + '<li><a href="' + urlTasks + '" title="' + TAPi18n.__("Tasks") + '">' + TAPi18n.__("Tasks") + '</a></li>'       // 11
    + '<li><a href="' + urlMinutes + '" title="' + TAPi18n.__("Minutes") + '">' + TAPi18n.__("Minutes") + '</a></li>' // 12
    + '<li role="separator" class="divider"></li>'                                                                    // 13
);                                                                                                                    // 14
/*                                                                                                                    // 15
var packageMenu;                                                                                                      // 16
packageMenu = Session.get("packageMenu")                                                                              // 17
packageMenu.push(                                                                                                     // 18
  {                                                                                                                   // 19
    "menuHTML": menuHTML,                                                                                             // 20
    "fromPackage": "rationalk:tasks",                                                                                 // 21
  }                                                                                                                   // 22
);                                                                                                                    // 23
Session.set(packageMenu);                                                                                             // 24
*/                                                                                                                    // 25
                                                                                                                      // 26
RKCore.packageMenu.push(                                                                                              // 27
  {                                                                                                                   // 28
    "menuHTML": menuHTML,                                                                                             // 29
    "fromPackage": "rationalk:tasks",                                                                                 // 30
  }                                                                                                                   // 31
);                                                                                                                    // 32
                                                                                                                      // 33
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/dashboard.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RKCore.packageDashboard.push(                                                                                         // 1
  {                                                                                                                   // 2
    "templateName": "dashboardRKTasks",                                                                               // 3
    "fromPackage": "rationalk:tasks",                                                                                 // 4
  }                                                                                                                   // 5
);                                                                                                                    // 6
                                                                                                                      // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/settings.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RKCore.packageSettings.push(                                                                                          // 1
  {                                                                                                                   // 2
    "templateName": "settingsRKTasks",                                                                                // 3
    "fromPackage": "rationalk:tasks",                                                                                 // 4
  }                                                                                                                   // 5
);                                                                                                                    // 6
                                                                                                                      // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.dashboardRKTasks.js                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("dashboardRKTasks");                                                                             // 2
Template["dashboardRKTasks"] = new Template("Template.dashboardRKTasks", (function() {                                // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "row"                                                                                                    // 6
  }, "\n    ", HTML.DIV({                                                                                             // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n       ", HTML.DIV({                                                                                          // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n          ", HTML.DIV({                                                                                       // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n            ", HTML.H3({                                                                                      // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "My tasks");                                                          // 17
  })), "\n          "), "\n          ", HTML.DIV({                                                                    // 18
    "class": "panel-body"                                                                                             // 19
  }, "\n            ", Blaze.If(function() {                                                                          // 20
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 21
  }, function() {                                                                                                     // 22
    return [ "\n              ", Blaze._TemplateWith(function() {                                                     // 23
      return {                                                                                                        // 24
        collection: Spacebars.call(view.lookup("Tasks")),                                                             // 25
        settings: Spacebars.call(view.lookup("settingsTasks"))                                                        // 26
      };                                                                                                              // 27
    }, function() {                                                                                                   // 28
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 29
    }), "\n            " ];                                                                                           // 30
  }, function() {                                                                                                     // 31
    return [ "\n              ", Blaze.View("lookup:_", function() {                                                  // 32
      return Spacebars.mustache(view.lookup("_"), "It looks that you have no open tasks !");                          // 33
    }), "\n            " ];                                                                                           // 34
  }), "\n          "), "\n       "), "\n    "), "\n  ");                                                              // 35
}));                                                                                                                  // 36
                                                                                                                      // 37
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/dashboardRKTasks.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.dashboardRKTasks.rendered = function () {                                                                    // 1
	Meteor.call('getMyTasksToDo', function (error, result) {                                                             // 2
		if (!error) {                                                                                                       // 3
			Session.set("dashboardRKTasks", result);                                                                           // 4
			return false;                                                                                                      // 5
		}                                                                                                                   // 6
	});                                                                                                                  // 7
};                                                                                                                    // 8
                                                                                                                      // 9
Template.dashboardRKTasks.helpers({                                                                                   // 10
	Tasks: function () {                                                                                                 // 11
		var tasks = Session.get("dashboardRKTasks");                                                                        // 12
		return tasks;                                                                                                       // 13
	},                                                                                                                   // 14
	settingsTasks: function () {                                                                                         // 15
    return {                                                                                                          // 16
			rowsPerPage: 100,                                                                                                  // 17
			showFilter: true,                                                                                                  // 18
			showColumnToggles: true,                                                                                           // 19
			showNavigation: 'auto',                                                                                            // 20
      class: 'table table-condensed col-sm-12',                                                                       // 21
			rowClass: function (item) {                                                                                        // 22
				var today = moment();                                                                                             // 23
				var scheduledEndDate = moment(item.scheduledEndDate, "DD.MM.YYYY");                                               // 24
				//RKCore.log(today.diff(scheduledEndDate, 'days'));                                                               // 25
				if ( today.diff(scheduledEndDate, 'days') === 0) {                                                                // 26
					return 'warning';                                                                                                // 27
				}                                                                                                                 // 28
				if (today.diff(scheduledEndDate, 'days') > 0) {                                                                   // 29
					return 'danger';                                                                                                 // 30
				}                                                                                                                 // 31
				return '';                                                                                                        // 32
			},                                                                                                                 // 33
			fields: [                                                                                                          // 34
				{                                                                                                                 // 35
					key: 'addedDate',                                                                                                // 36
					label: TAPi18n.__("Added date"),                                                                                 // 37
          hidden: true,                                                                                               // 38
				},                                                                                                                // 39
				{                                                                                                                 // 40
					key: 'addedBy',                                                                                                  // 41
					label: TAPi18n.__("Author"),                                                                                     // 42
					fn: function (value) {                                                                                           // 43
						var nickname = Members.collection.findOne({accountId: value}).profile.nickname;                                 // 44
						var nicknameHTML = "<span class='label label-info'>" + nickname + "</span>";                                    // 45
						return new Spacebars.SafeString(nicknameHTML);                                                                  // 46
					},                                                                                                               // 47
				},                                                                                                                // 48
				{                                                                                                                 // 49
					key: 'formattedMinutesNames',                                                                                    // 50
					label: TAPi18n.__("Minutes"),                                                                                    // 51
					fn: function (value) {                                                                                           // 52
						var i;                                                                                                          // 53
						var val = '';                                                                                                   // 54
						var n;                                                                                                          // 55
						if (value) {                                                                                                    // 56
							n = value.length;                                                                                              // 57
							for (i = 0; i < n; i++) {                                                                                      // 58
								val = val + "<span class='label label-info'>" + value[i] + "</span> ";                                        // 59
							}                                                                                                              // 60
							return new Spacebars.SafeString(val.trim());                                                                   // 61
						}                                                                                                               // 62
						return '';                                                                                                      // 63
					},                                                                                                               // 64
				},                                                                                                                // 65
				{                                                                                                                 // 66
					key: 'scheduledStartDate',                                                                                       // 67
					label: TAPi18n.__("Scheduled start date"),                                                                       // 68
				},                                                                                                                // 69
				{                                                                                                                 // 70
					key: 'effectiveStartDate',                                                                                       // 71
					label: TAPi18n.__("Effective start date"),                                                                       // 72
          hidden: true,                                                                                               // 73
				},                                                                                                                // 74
				{                                                                                                                 // 75
					key: 'taskContent',                                                                                              // 76
					label: TAPi18n.__("Content"),                                                                                    // 77
					fn: function (value) {                                                                                           // 78
						return new Spacebars.SafeString(value);                                                                         // 79
					},                                                                                                               // 80
				},                                                                                                                // 81
				{                                                                                                                 // 82
					key: 'formattedProjectNames',                                                                                    // 83
					label: TAPi18n.__("Projects"),                                                                                   // 84
					fn: function (value, object) {                                                                                   // 85
						var val = '';                                                                                                   // 86
						var i;                                                                                                          // 87
						var nProjects = value.length;                                                                                   // 88
						for (i = 0; i < nProjects; i++) {                                                                               // 89
							val = val + "<span class='label label-info'>" + value[i] + "</span> ";                                         // 90
						}                                                                                                               // 91
                                                                                                                      // 92
						if (object.otherProjects) {                                                                                     // 93
							val2 = object.otherProjects.replace(/;/g, ',').split(',');                                                     // 94
			        htmlTag = val2.map(function (tag) {                                                                        // 95
			          return "<span class='label label-info'>" + tag + "</span>";                                              // 96
			        });                                                                                                        // 97
			        val = val + htmlTag.join(' ');                                                                             // 98
						}                                                                                                               // 99
                                                                                                                      // 100
						return new Spacebars.SafeString(val.trim());                                                                    // 101
					},                                                                                                               // 102
				},                                                                                                                // 103
				{                                                                                                                 // 104
					key: 'tags',                                                                                                     // 105
					label: TAPi18n.__("Tags"),                                                                                       // 106
					hidden: true,                                                                                                    // 107
					fn: function (value) {                                                                                           // 108
						var val;                                                                                                        // 109
						if (value) {                                                                                                    // 110
							val = value.replace(/;/g, ',').split(',');                                                                     // 111
			        htmlTag = val.map(function (tag) {                                                                         // 112
			          return "<span class='label label-info'>" + tag + "</span>";                                              // 113
			        });                                                                                                        // 114
			        return new Spacebars.SafeString(htmlTag.join(' '));                                                        // 115
						}                                                                                                               // 116
						return "";                                                                                                      // 117
					},                                                                                                               // 118
				},                                                                                                                // 119
				{                                                                                                                 // 120
					key: 'formattedActioneeNames',                                                                                   // 121
					label: TAPi18n.__("Actionee"),                                                                                   // 122
					fn: function (value, object) {                                                                                   // 123
            var i;                                                                                                    // 124
            var val = '';                                                                                             // 125
            var n;                                                                                                    // 126
            if (value) {                                                                                              // 127
							var nActionee = value.length;                                                                                  // 128
							for (i = 0; i < nActionee; i++) {                                                                              // 129
								val = val + "<span class='label label-info'>" + value[i] + "</span> ";                                        // 130
							}                                                                                                              // 131
            }                                                                                                         // 132
                                                                                                                      // 133
						if (object.actionee) {                                                                                          // 134
							val2 = object.actionee.replace(/;/g, ',');                                                                     // 135
			        actionee = val2.split(',');                                                                                // 136
              n = actionee.length;                                                                                    // 137
              for (i = 0; i < n; i++) {                                                                               // 138
                actioneeId = actionee[i];                                                                             // 139
                val = val + "<span class='label label-info'>" + actionee[i] + "</span> ";                             // 140
                }                                                                                                     // 141
              val = val.trim();                                                                                       // 142
              }                                                                                                       // 143
						return new Spacebars.SafeString(val);                                                                           // 144
					},                                                                                                               // 145
				},                                                                                                                // 146
				{                                                                                                                 // 147
					key: 'scheduledEndDate',                                                                                         // 148
					label: TAPi18n.__("Scheduled end date"),                                                                         // 149
				},                                                                                                                // 150
				{                                                                                                                 // 151
					key: 'effectiveEndDate',                                                                                         // 152
					label: TAPi18n.__("Effective end date"),                                                                         // 153
          hidden: true,                                                                                               // 154
				},                                                                                                                // 155
				{                                                                                                                 // 156
					key: 'realized',                                                                                                 // 157
					label: TAPi18n.__("Realized"),                                                                                   // 158
					hidden: true,                                                                                                    // 159
					fn: function (value) {                                                                                           // 160
						var val;                                                                                                        // 161
						if (value === "Yes") {                                                                                          // 162
							val = TAPi18n.__("Yes");                                                                                       // 163
						}                                                                                                               // 164
						else if (value === "No") {                                                                                      // 165
							val = TAPi18n.__("No");                                                                                        // 166
						}                                                                                                               // 167
						else {                                                                                                          // 168
							val = TAPi18n.__("On condition");                                                                              // 169
						}                                                                                                               // 170
						return val;                                                                                                     // 171
					},                                                                                                               // 172
				},                                                                                                                // 173
				{                                                                                                                 // 174
					key: 'percentageDone',                                                                                           // 175
					label: TAPi18n.__("Percentage Done"),                                                                            // 176
          hidden: true,                                                                                               // 177
					fn: function (value, object) {                                                                                   // 178
						var val = value;                                                                                                // 179
						if (object.realized === "Yes") {                                                                                // 180
							val = 100;                                                                                                     // 181
						}                                                                                                               // 182
						progressBar = val + "%";                                                                                        // 183
						return new Spacebars.SafeString(progressBar);                                                                   // 184
					},                                                                                                               // 185
				},                                                                                                                // 186
				{                                                                                                                 // 187
					key: 'actions',                                                                                                  // 188
					label: 'Actions',                                                                                                // 189
					fn: function (value, object) {                                                                                   // 190
						var additionalTextLink = '';                                                                                    // 191
						var editLink;                                                                                                   // 192
						var markAsDoneLink = ' <a href="#" title="' + TAPi18n.__('Mark as done') + '" class="markAsDone" '              // 193
							+ 'data-taskid="' +	object._id + '"'                                                                           // 194
							+ '>' +                                                                                                        // 195
							'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +                                            // 196
							'</a> ';                                                                                                       // 197
						if (object.additionalText) {                                                                                    // 198
              additionalTextLink = '<a href="#"'                                                                      // 199
  							+ ' class="showTaskAdditionalText" title="' + TAPi18n.__('Show follow-up') + '"'                             // 200
  							+ ' data-taskid="' +	object._id + '"'                                                                        // 201
								+ ' data-taskcontent="' +	object.taskContent + '"'                                                            // 202
								+ ' data-taskadditionaltext="' +	object.additionalText + '"'                                                  // 203
  							+ '>[...]</a> ';                                                                                             // 204
						}                                                                                                               // 205
						editLink = '<a href="' +                                                                                        // 206
							Router.routes.editTask.path({_id: object._id, filterBy: Router.current().params.filterBy, filterVal: Router.current().params.filterVal})
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 208
							//+ ' data-wheretocomeback="' +	Router.current().params + '"'                                                  // 209
							+ '>'                                                                                                          // 210
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 211
							'</a> ';                                                                                                       // 212
						return new Spacebars.SafeString(markAsDoneLink + additionalTextLink + editLink);                                // 213
					},                                                                                                               // 214
				},                                                                                                                // 215
			],                                                                                                                 // 216
		};                                                                                                                  // 217
	},                                                                                                                   // 218
});                                                                                                                   // 219
                                                                                                                      // 220
Template.dashboardRKTasks.events({                                                                                    // 221
	"click a.markAsDone": function (e) {                                                                                 // 222
	    e.preventDefault();                                                                                              // 223
	    Meteor.call('markAsDone', e.currentTarget.dataset.taskid, function () {                                          // 224
				Meteor.call('getMyTasksToDo', function (error, result) {                                                          // 225
					if (!error) {                                                                                                    // 226
						Session.set("dashboardRKTasks", result);                                                                        // 227
						return false;                                                                                                   // 228
					}                                                                                                                // 229
				});                                                                                                               // 230
			});                                                                                                                // 231
			return false;                                                                                                      // 232
	},                                                                                                                   // 233
	"click a.showTaskAdditionalText": function (e) {                                                                     // 234
		var taskContent = e.currentTarget.dataset.taskcontent;                                                              // 235
		var taskAdditionalText = e.currentTarget.dataset.taskadditionaltext;                                                // 236
	  e.preventDefault();                                                                                                // 237
    bootbox.dialog({                                                                                                  // 238
      title: taskContent,                                                                                             // 239
      message: taskAdditionalText,                                                                                    // 240
    });                                                                                                               // 241
		return false;                                                                                                       // 242
	},                                                                                                                   // 243
});                                                                                                                   // 244
                                                                                                                      // 245
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.settingsRKTasks.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("settingsRKTasks");                                                                              // 2
Template["settingsRKTasks"] = new Template("Template.settingsRKTasks", (function() {                                  // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			 ", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n				", HTML.DIV({                                                                                             // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n					", HTML.H3({                                                                                             // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "Tasks");                                                             // 17
  })), "\n				"), "\n				", HTML.DIV({                                                                                // 18
    "class": "panel-body"                                                                                             // 19
  }, "\n          ", HTML.FORM({                                                                                      // 20
    id: "settingsRKTasks"                                                                                             // 21
  }, "\n            ", HTML.DIV({                                                                                     // 22
    "class": "form-group"                                                                                             // 23
  }, "\n              ", HTML.LABEL({                                                                                 // 24
    "for": "prefixMinutes"                                                                                            // 25
  }, Blaze.View("lookup:_", function() {                                                                              // 26
    return Spacebars.mustache(view.lookup("_"), "Prefix for minutes name");                                           // 27
  })), "\n              ", HTML.INPUT({                                                                               // 28
    type: "text",                                                                                                     // 29
    "class": "form-control",                                                                                          // 30
    id: "prefixMinutes",                                                                                              // 31
    placeholder: function() {                                                                                         // 32
      return Spacebars.mustache(view.lookup("_"), "Minutes");                                                         // 33
    },                                                                                                                // 34
    value: function() {                                                                                               // 35
      return Spacebars.mustache(view.lookup("prefixMinutes"));                                                        // 36
    }                                                                                                                 // 37
  }), "\n            "), "\n						", HTML.DIV({                                                                       // 38
    "class": "form-group"                                                                                             // 39
  }, "\n              ", HTML.LABEL({                                                                                 // 40
    "for": "folderPathForMinutesPrint"                                                                                // 41
  }, Blaze.View("lookup:_", function() {                                                                              // 42
    return Spacebars.mustache(view.lookup("_"), "Path to save minutes as pdf");                                       // 43
  })), "\n              ", HTML.INPUT({                                                                               // 44
    type: "text",                                                                                                     // 45
    "class": "form-control",                                                                                          // 46
    id: "folderPathForMinutesPrint",                                                                                  // 47
    placeholder: function() {                                                                                         // 48
      return Spacebars.mustache(view.lookup("_"), "/Downloads");                                                      // 49
    },                                                                                                                // 50
    value: function() {                                                                                               // 51
      return Spacebars.mustache(view.lookup("folderPathForMinutesPrint"));                                            // 52
    }                                                                                                                 // 53
  }), "\n							", HTML.P({                                                                                           // 54
    "class": "help-block"                                                                                             // 55
  }, Blaze.View("lookup:_", function() {                                                                              // 56
    return Spacebars.mustache(view.lookup("_"), "No trailing slash /");                                               // 57
  })), "\n            "), "\n          ", HTML.BUTTON({                                                               // 58
    type: "submit",                                                                                                   // 59
    "class": "btn btn-default"                                                                                        // 60
  }, Blaze.View("lookup:_", function() {                                                                              // 61
    return Spacebars.mustache(view.lookup("_"), "Save");                                                              // 62
  })), "\n          "), "\n				"), "\n				"), "\n		"), "\n	");                                                        // 63
}));                                                                                                                  // 64
                                                                                                                      // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/settingsRKTasks.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.settingsRKTasks.rendered = function () {                                                                     // 1
  var settingsRKTasks = {};                                                                                           // 2
  Meteor.call('getSettingsRKTasks', "prefixMinutes", function (error, result) {                                       // 3
		if (!error) {                                                                                                       // 4
      if (typeof(Session.get("settingsRKTasks")) !== 'undefined') {                                                   // 5
        settingsRKTasks = Session.get("settingsRKTasks");                                                             // 6
      }                                                                                                               // 7
			settingsRKTasks.prefixMinutes = result;                                                                            // 8
      Session.set("settingsRKTasks", settingsRKTasks);                                                                // 9
			return false;                                                                                                      // 10
		}                                                                                                                   // 11
	});                                                                                                                  // 12
  Meteor.call('getSettingsRKTasks', "folderPathForMinutesPrint", function (error, result) {                           // 13
		if (!error) {                                                                                                       // 14
      if (typeof(Session.get("settingsRKTasks")) !== 'undefined') {                                                   // 15
        settingsRKTasks = Session.get("settingsRKTasks");                                                             // 16
      }                                                                                                               // 17
			settingsRKTasks.folderPathForMinutesPrint = result;                                                                // 18
      Session.set("settingsRKTasks", settingsRKTasks);                                                                // 19
			return false;                                                                                                      // 20
		}                                                                                                                   // 21
	});                                                                                                                  // 22
};                                                                                                                    // 23
                                                                                                                      // 24
Template.settingsRKTasks.helpers({                                                                                    // 25
  prefixMinutes: function () {                                                                                        // 26
		var settings = Session.get("settingsRKTasks");                                                                      // 27
    if (typeof(settings) !== 'undefined') {                                                                           // 28
		    return settings.prefixMinutes;                                                                                  // 29
    }                                                                                                                 // 30
	},                                                                                                                   // 31
  folderPathForMinutesPrint: function () {                                                                            // 32
   var settings = Session.get("settingsRKTasks");                                                                     // 33
   if (typeof(settings) !== 'undefined') {                                                                            // 34
       return settings.folderPathForMinutesPrint;                                                                     // 35
   }                                                                                                                  // 36
 },                                                                                                                   // 37
});                                                                                                                   // 38
                                                                                                                      // 39
Template.settingsRKTasks.events({                                                                                     // 40
  'submit form': function (e) {                                                                                       // 41
    var data = {};                                                                                                    // 42
    e.preventDefault();                                                                                               // 43
    data.prefixMinutes = e.target.prefixMinutes.value;                                                                // 44
    data.folderPathForMinutesPrint = e.target.folderPathForMinutesPrint.value;                                        // 45
    Meteor.call('updateSettingsRKTasks', data, function (err) {                                                       // 46
      if (!err) {                                                                                                     // 47
        if (typeof(toastr) !== 'undefined') {                                                                         // 48
          toastr.success(TAPi18n.__('Saved'));                                                                        // 49
        }                                                                                                             // 50
      }                                                                                                               // 51
    });                                                                                                               // 52
  },                                                                                                                  // 53
});                                                                                                                   // 54
                                                                                                                      // 55
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.viewProjects.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("viewProjects");                                                                                 // 2
Template["viewProjects"] = new Template("Template.viewProjects", (function() {                                        // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.DIV({                                                                                            // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n			 		", HTML.H3({                                                                                            // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "Project(s)");                                                        // 17
  }), " ", HTML.SPAN({                                                                                                // 18
    "class": "pull-right"                                                                                             // 19
  }, HTML.A({                                                                                                         // 20
    href: "#",                                                                                                        // 21
    "class": "createProject",                                                                                         // 22
    title: function() {                                                                                               // 23
      return Spacebars.mustache(view.lookup("_"), "Create a new project");                                            // 24
    }                                                                                                                 // 25
  }, Blaze.View("lookup:_", function() {                                                                              // 26
    return Spacebars.mustache(view.lookup("_"), "Create a new project");                                              // 27
  })))), "\n        "), "\n				", HTML.DIV({                                                                          // 28
    "class": "panel-body"                                                                                             // 29
  }, "\n					", HTML.Raw('<!--\n					<div class="row">\n						<div class="col-md-12">\n							<div class="post">\n								{{_ "Filter by"}} {{_ "project manager"}} : <a href="{{pathFor \'project\' _id=\'author\'}}/{{currentUsername}}">{{pathFor \'tasks\' filterBy=\'author\'}}/{{currentUsername}}</a>\n							</div>\n						</div>\n					</div>\n					<hr/>\n					-->'), "\n					", HTML.DIV({
    "class": "row"                                                                                                    // 31
  }, "\n						", HTML.DIV({                                                                                           // 32
    "class": "col-md-12"                                                                                              // 33
  }, "\n							", Blaze.If(function() {                                                                               // 34
    return Spacebars.call(view.lookup("Projects"));                                                                   // 35
  }, function() {                                                                                                     // 36
    return [ "\n								", HTML.DIV({                                                                                 // 37
      "class": "tableScroll"                                                                                          // 38
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 39
      return {                                                                                                        // 40
        collection: Spacebars.call(view.lookup("Projects")),                                                          // 41
        settings: Spacebars.call(view.lookup("settingsProjects"))                                                     // 42
      };                                                                                                              // 43
    }, function() {                                                                                                   // 44
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 45
    }), "\n								"), "\n							" ];                                                                                 // 46
  }, function() {                                                                                                     // 47
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 48
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 49
    })), "\n							" ];                                                                                               // 50
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	");                                            // 51
}));                                                                                                                  // 52
                                                                                                                      // 53
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/viewProjects.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.viewProjects.rendered = function () {                                                                        // 1
                                                                                                                      // 2
};                                                                                                                    // 3
                                                                                                                      // 4
Template.viewProjects.helpers({                                                                                       // 5
	currentUsername: function () {                                                                                       // 6
		var currentUserId = Meteor.userId();                                                                                // 7
		var currentUser = Members.collection.findOne({accountId: currentUserId});                                           // 8
		var currentUsername = currentUser.profile.nickname;                                                                 // 9
		return currentUsername;                                                                                             // 10
	},                                                                                                                   // 11
	projectManagerUsername: function (projectManagerAccountId) {                                                         // 12
		var currentUser = Members.collection.findOne({accountId: projectManagerAccountId});                                 // 13
		var projectManagerUsername = currentUser.profile.nickname;                                                          // 14
		return projectManagerUsername;                                                                                      // 15
	},                                                                                                                   // 16
	Projects: function () {                                                                                              // 17
    return Projects.find().fetch();                                                                                   // 18
	},                                                                                                                   // 19
	settingsProjects: function () {                                                                                      // 20
    return {                                                                                                          // 21
			rowsPerPage: 10,                                                                                                   // 22
			showFilter: true,                                                                                                  // 23
			showColumnToggles: true,                                                                                           // 24
			showNavigation: 'auto',                                                                                            // 25
      class: 'table table-condensed col-sm-12',                                                                       // 26
			fields: [                                                                                                          // 27
				{                                                                                                                 // 28
					key: 'projectNumber',                                                                                            // 29
					label: TAPi18n.__("ID"),                                                                                         // 30
				},                                                                                                                // 31
				{                                                                                                                 // 32
					key: 'projectName',                                                                                              // 33
					label: TAPi18n.__("Project name"),                                                                               // 34
				},                                                                                                                // 35
				{                                                                                                                 // 36
					key: 'projectDescription',                                                                                       // 37
					label: TAPi18n.__("Project description"),                                                                        // 38
				},                                                                                                                // 39
				{                                                                                                                 // 40
					key: 'projectManagerIds',                                                                                        // 41
					label: TAPi18n.__("Project manager"),                                                                            // 42
					fn: function (value) {                                                                                           // 43
						var i;                                                                                                          // 44
            var val = '';                                                                                             // 45
            var n;                                                                                                    // 46
            if (value) {                                                                                              // 47
              n = value.length;                                                                                       // 48
              for (i = 0; i < n; i++) {                                                                               // 49
                member = Members.collection.findOne(value[i]);                                                        // 50
                if (typeof(member) !== 'undefined') {                                                                 // 51
                  val = val + "<span class='label label-info'>" + member.profile.nickname + "</span> ";               // 52
                }                                                                                                     // 53
              }                                                                                                       // 54
            }                                                                                                         // 55
						return new Spacebars.SafeString(val);                                                                           // 56
					},                                                                                                               // 57
				},                                                                                                                // 58
				{                                                                                                                 // 59
					key: 'tags',                                                                                                     // 60
					label: TAPi18n.__("Tags"),                                                                                       // 61
					fn: function (value) {                                                                                           // 62
						var val = value.replace(/;/g, ',');                                                                             // 63
		        tag = val.split(',');                                                                                       // 64
		        htmlTag = tag.map(function (tag) {                                                                          // 65
		          return "<span class='label label-info'>" + tag + "</span>";                                               // 66
		        });                                                                                                         // 67
		        return new Spacebars.SafeString(htmlTag.join(' '));                                                         // 68
					},                                                                                                               // 69
				},                                                                                                                // 70
				{                                                                                                                 // 71
					key: 'actions',                                                                                                  // 72
					label: 'Actions',                                                                                                // 73
					fn: function (value, object) {                                                                                   // 74
						var createTaskLink = '<a href="#"'                                                                              // 75
							+ ' class="createTask" title="' + TAPi18n.__('Add a task to this project') + '"'                               // 76
							+ ' data-projectid="' +	object._id + '"'                                                                       // 77
							+ '>'                                                                                                          // 78
							+ '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>' +                                        // 79
							'</a> ';                                                                                                       // 80
						var createMinutesLink = '<a href="#"'                                                                           // 81
							+ ' class="createMinutes" title="' + TAPi18n.__('Add minutes to this project') + '"'                           // 82
							+ ' data-projectid="' +	object._id + '"'                                                                       // 83
							+ '>'                                                                                                          // 84
							+ '<span class="glyphicon glyphicon-file" aria-hidden="true"></span>' +                                        // 85
							'</a> ';                                                                                                       // 86
						var editLink = '<a href="' +                                                                                    // 87
							Router.routes.editProject.path({_id: object._id})                                                              // 88
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 89
							+ '>'                                                                                                          // 90
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 91
							'</a> ';                                                                                                       // 92
						var seeAllPVLink = '<a href="' +                                                                                // 93
							Router.routes.minutes.path({filterBy: "project", filterVal: object._id})                                       // 94
							+ '" title="' + TAPi18n.__('See all minutes for this project') + '"'                                           // 95
							+ '>'                                                                                                          // 96
							+ '<span class="glyphicon glyphicon-book" aria-hidden="true"></span>' +                                        // 97
							'</a> ';                                                                                                       // 98
						var duplicateLink = '<a href="#"'                                                                               // 99
							+ ' class="duplicateProject title="' + TAPi18n.__('Duplicate') + '"'                                           // 100
							+ ' data-projectid="' +	object._id + '"'                                                                       // 101
							+ '>'                                                                                                          // 102
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 103
							'</a> ';                                                                                                       // 104
						var deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteProject" '                     // 105
							+ 'data-projectid="' +	object._id + '"'                                                                        // 106
							+ '>' +                                                                                                        // 107
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 108
							'</a> ';                                                                                                       // 109
						return new Spacebars.SafeString(createTaskLink + createMinutesLink + editLink + seeAllPVLink + duplicateLink + deleteLink);
					},                                                                                                               // 111
				},                                                                                                                // 112
			],                                                                                                                 // 113
		};                                                                                                                  // 114
	},                                                                                                                   // 115
});                                                                                                                   // 116
                                                                                                                      // 117
Template.viewProjects.events({                                                                                        // 118
	"click a.createProject": function (e) {                                                                              // 119
	    e.preventDefault();                                                                                              // 120
	    Meteor.call('createProject', function (error, result) {                                                          // 121
				if (!error) {                                                                                                     // 122
					projectId = result;                                                                                              // 123
					Router.go("editProject", {_id: projectId});                                                                      // 124
				}                                                                                                                 // 125
			});                                                                                                                // 126
			return false;                                                                                                      // 127
	},                                                                                                                   // 128
	"click a.deleteProject": function (e) {                                                                              // 129
	    e.preventDefault();                                                                                              // 130
			bootbox.confirm(TAPi18n.__("Are you sure you want to delete this project ?"), function (result) {                  // 131
 			 if (result) {                                                                                                    // 132
 				 Meteor.call('deleteProject', e.currentTarget.dataset.projectid);                                                // 133
 			 }                                                                                                                // 134
 		 	});                                                                                                              // 135
			return false;                                                                                                      // 136
	},                                                                                                                   // 137
	"click a.duplicateProject": function (e) {                                                                           // 138
	    e.preventDefault();                                                                                              // 139
	    Meteor.call('duplicateProject', e.currentTarget.dataset.projectid, function (error, result) {                    // 140
				if (!error) {                                                                                                     // 141
					newId = result;                                                                                                  // 142
					Router.go("editProject", {_id: newId});                                                                          // 143
				}                                                                                                                 // 144
			});                                                                                                                // 145
			return false;                                                                                                      // 146
	},                                                                                                                   // 147
	"click a.createTask": function (e) {                                                                                 // 148
			var data = {};                                                                                                     // 149
			e.preventDefault();                                                                                                // 150
			data.projectsIds = e.currentTarget.dataset.projectid;                                                              // 151
	    Meteor.call('createTask', data, function (error, result) {                                                       // 152
				if (!error) {                                                                                                     // 153
					taskId = result;                                                                                                 // 154
					Router.go("editTask", {_id: taskId});                                                                            // 155
				}                                                                                                                 // 156
			});                                                                                                                // 157
			return false;                                                                                                      // 158
	},                                                                                                                   // 159
	"click a.createMinutes": function (e) {                                                                              // 160
			var data = {};                                                                                                     // 161
			e.preventDefault();                                                                                                // 162
			data.projectsIds = e.currentTarget.dataset.projectid;                                                              // 163
			Meteor.call('createMinutes', data, function (error, result) {                                                      // 164
				if (!error) {                                                                                                     // 165
					minutesId = result;                                                                                              // 166
					Router.go("editMinutes", {_id: minutesId});                                                                      // 167
				}                                                                                                                 // 168
			});                                                                                                                // 169
			return false;                                                                                                      // 170
	},                                                                                                                   // 171
});                                                                                                                   // 172
                                                                                                                      // 173
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.editProject.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("editProject");                                                                                  // 2
Template["editProject"] = new Template("Template.editProject", (function() {                                          // 3
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
// packages/rationalk:tasks/lib/client/editProject.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.editProject.rendered = function () {                                                                         // 1
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
Template.editProject.helpers({                                                                                        // 12
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
Template.editProject.events({                                                                                         // 175
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
// packages/rationalk:tasks/lib/client/template.viewTasks.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("tasks");                                                                                        // 2
Template["tasks"] = new Template("Template.tasks", (function() {                                                      // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.DIV({                                                                                            // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n			 		", HTML.H3({                                                                                            // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "Tasks");                                                             // 17
  }), " ", HTML.SPAN({                                                                                                // 18
    "class": "pull-right"                                                                                             // 19
  }, HTML.Raw("<!-- <a href=\"{{pathFor 'editTasksTable'}}\" title=\"{{_ 'Quick table import'}}\">{{_ 'Quick table import'}}</a> / -->"), HTML.A({
    href: "#",                                                                                                        // 21
    "class": "createTask",                                                                                            // 22
    title: function() {                                                                                               // 23
      return Spacebars.mustache(view.lookup("_"), "Create a new task");                                               // 24
    }                                                                                                                 // 25
  }, Blaze.View("lookup:_", function() {                                                                              // 26
    return Spacebars.mustache(view.lookup("_"), "Create a new task");                                                 // 27
  })))), "\n        "), "\n				", HTML.DIV({                                                                          // 28
    "class": "panel-body"                                                                                             // 29
  }, "\n					", HTML.DIV({                                                                                            // 30
    "class": "row"                                                                                                    // 31
  }, "\n						", HTML.DIV({                                                                                           // 32
    "class": "col-md-3"                                                                                               // 33
  }, "\n							", HTML.DIV({                                                                                          // 34
    "class": "post"                                                                                                   // 35
  }, "\n								", HTML.P(HTML.A({                                                                                    // 36
    href: function() {                                                                                                // 37
      return Spacebars.mustache(view.lookup("pathFor"), "tasks");                                                     // 38
    },                                                                                                                // 39
    title: function() {                                                                                               // 40
      return Spacebars.mustache(view.lookup("_"), "View all tasks");                                                  // 41
    }                                                                                                                 // 42
  }, Blaze.View("lookup:_", function() {                                                                              // 43
    return Spacebars.mustache(view.lookup("_"), "View all tasks");                                                    // 44
  }))), "\n								", HTML.P(HTML.A({                                                                                 // 45
    href: function() {                                                                                                // 46
      return [ Spacebars.mustache(view.lookup("pathFor"), "tasks", Spacebars.kw({                                     // 47
        filterBy: "author"                                                                                            // 48
      })), "/", Spacebars.mustache(view.lookup("currentUserId")) ];                                                   // 49
    }                                                                                                                 // 50
  }, Blaze.View("lookup:_", function() {                                                                              // 51
    return Spacebars.mustache(view.lookup("_"), "View tasks that I wrote");                                           // 52
  }))), "\n								", HTML.DIV({                                                                                      // 53
    id: "showRealizedTasksDiv",                                                                                       // 54
    "class": "checkbox showRealizedTasksCheckbox"                                                                     // 55
  }, "\n									", HTML.LABEL("\n										", HTML.INPUT({                                                           // 56
    type: "checkbox",                                                                                                 // 57
    checked: function() {                                                                                             // 58
      return Spacebars.mustache(view.lookup("showRealizedTasks"));                                                    // 59
    },                                                                                                                // 60
    id: "showRealizedTasksCheckbox"                                                                                   // 61
  }), " ", Blaze.View("lookup:_", function() {                                                                        // 62
    return Spacebars.mustache(view.lookup("_"), "Show realized tasks");                                               // 63
  }), "\n									"), "\n		  					"), "\n							"), "\n						"), "\n						", HTML.DIV({                               // 64
    "class": "col-md-4"                                                                                               // 65
  }, "\n							", HTML.DIV({                                                                                          // 66
    "class": "post"                                                                                                   // 67
  }, "\n								", Blaze.If(function() {                                                                              // 68
    return Spacebars.call(view.lookup("Projects"));                                                                   // 69
  }, function() {                                                                                                     // 70
    return [ "\n									", Blaze.View("lookup:_", function() {                                                       // 71
      return Spacebars.mustache(view.lookup("_"), "Filter by");                                                       // 72
    }), " ", Blaze.View("lookup:_", function() {                                                                      // 73
      return Spacebars.mustache(view.lookup("_"), "project");                                                         // 74
    }), " :\n									", HTML.SELECT({                                                                                // 75
      "class": "form-control",                                                                                        // 76
      id: "filterByProjectSelect"                                                                                     // 77
    }, "\n										", HTML.OPTION({                                                                                  // 78
      value: "all"                                                                                                    // 79
    }, Blaze.View("lookup:_", function() {                                                                            // 80
      return Spacebars.mustache(view.lookup("_"), "All projects");                                                    // 81
    })), "\n									", Blaze.Each(function() {                                                                       // 82
      return Spacebars.call(view.lookup("Projects"));                                                                 // 83
    }, function() {                                                                                                   // 84
      return [ "\n				  					", HTML.OPTION({                                                                         // 85
        value: function() {                                                                                           // 86
          return Spacebars.mustache(view.lookup("_id"));                                                              // 87
        }                                                                                                             // 88
      }, Blaze.View("lookup:projectNumber", function() {                                                              // 89
        return Spacebars.mustache(view.lookup("projectNumber"));                                                      // 90
      }), " - ", Blaze.View("lookup:projectName", function() {                                                        // 91
        return Spacebars.mustache(view.lookup("projectName"));                                                        // 92
      })), "\n									" ];                                                                                           // 93
    }), "\n									"), "\n								" ];                                                                               // 94
  }, function() {                                                                                                     // 95
    return [ "\n									", HTML.P("If you add project, you will be able to filter by project."), "\n								" ];     // 96
  }), "\n							"), "\n							", HTML.DIV({                                                                           // 97
    "class": "post"                                                                                                   // 98
  }, "\n								", Blaze.If(function() {                                                                              // 99
    return Spacebars.call(view.lookup("Minutes"));                                                                    // 100
  }, function() {                                                                                                     // 101
    return [ "\n									", Blaze.View("lookup:_", function() {                                                       // 102
      return Spacebars.mustache(view.lookup("_"), "Filter by");                                                       // 103
    }), " ", Blaze.View("lookup:_", function() {                                                                      // 104
      return Spacebars.mustache(view.lookup("_"), "minutes");                                                         // 105
    }), " :\n									", HTML.SELECT({                                                                                // 106
      "class": "form-control",                                                                                        // 107
      id: "filterByMinutesSelect"                                                                                     // 108
    }, "\n										", HTML.OPTION({                                                                                  // 109
      value: "all"                                                                                                    // 110
    }, Blaze.View("lookup:_", function() {                                                                            // 111
      return Spacebars.mustache(view.lookup("_"), "All minutes");                                                     // 112
    })), "\n									", Blaze.Each(function() {                                                                       // 113
      return Spacebars.call(view.lookup("Minutes"));                                                                  // 114
    }, function() {                                                                                                   // 115
      return [ "\n				  					", HTML.OPTION({                                                                         // 116
        value: function() {                                                                                           // 117
          return Spacebars.mustache(view.lookup("_id"));                                                              // 118
        }                                                                                                             // 119
      }, Blaze.View("lookup:minutesName", function() {                                                                // 120
        return Spacebars.mustache(view.lookup("minutesName"));                                                        // 121
      })), "\n									" ];                                                                                           // 122
    }), "\n									"), "\n								" ];                                                                               // 123
  }, function() {                                                                                                     // 124
    return [ "\n									", HTML.P("If you add minutes, you will be able to filter by minutes."), "\n								" ];     // 125
  }), "\n							"), "\n						"), "\n						", HTML.DIV({                                                               // 126
    "class": "col-md-4"                                                                                               // 127
  }, "\n							", HTML.DIV({                                                                                          // 128
    "class": "post"                                                                                                   // 129
  }, "\n								", Blaze.If(function() {                                                                              // 130
    return Spacebars.call(view.lookup("Members"));                                                                    // 131
  }, function() {                                                                                                     // 132
    return [ "\n									", Blaze.View("lookup:_", function() {                                                       // 133
      return Spacebars.mustache(view.lookup("_"), "Filter by");                                                       // 134
    }), " ", Blaze.View("lookup:_", function() {                                                                      // 135
      return Spacebars.mustache(view.lookup("_"), "actionee");                                                        // 136
    }), " :\n									", HTML.SELECT({                                                                                // 137
      "class": "form-control",                                                                                        // 138
      id: "filterByActioneeSelect"                                                                                    // 139
    }, "\n										", HTML.OPTION({                                                                                  // 140
      value: "all"                                                                                                    // 141
    }, Blaze.View("lookup:_", function() {                                                                            // 142
      return Spacebars.mustache(view.lookup("_"), "All actionees");                                                   // 143
    })), "\n									", Blaze.Each(function() {                                                                       // 144
      return Spacebars.call(view.lookup("Members"));                                                                  // 145
    }, function() {                                                                                                   // 146
      return [ "\n				  					", HTML.OPTION({                                                                         // 147
        value: function() {                                                                                           // 148
          return Spacebars.mustache(view.lookup("_id"));                                                              // 149
        }                                                                                                             // 150
      }, Blaze.View("lookup:profile.nickname", function() {                                                           // 151
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));                                 // 152
      })), "\n									" ];                                                                                           // 153
    }), "\n									"), "\n								" ];                                                                               // 154
  }, function() {                                                                                                     // 155
    return [ "\n									", HTML.P(Blaze.View("lookup:_", function() {                                                // 156
      return Spacebars.mustache(view.lookup("_"), "If you add actionees, you will be able to filter by actionee");    // 157
    })), "\n								" ];                                                                                              // 158
  }), "\n							"), "\n						"), "\n					"), "\n					", HTML.Raw("<hr>"), "\n					", HTML.DIV({                       // 159
    "class": "row"                                                                                                    // 160
  }, "\n						", HTML.DIV({                                                                                           // 161
    "class": "col-md-12"                                                                                              // 162
  }, "\n							", Blaze.If(function() {                                                                               // 163
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 164
  }, function() {                                                                                                     // 165
    return [ "\n								", HTML.DIV({                                                                                 // 166
      "class": "tableScroll"                                                                                          // 167
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 168
      return {                                                                                                        // 169
        collection: Spacebars.call(view.lookup("Tasks")),                                                             // 170
        settings: Spacebars.call(view.lookup("settingsTasks"))                                                        // 171
      };                                                                                                              // 172
    }, function() {                                                                                                   // 173
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 174
    }), "\n								"), "\n							" ];                                                                                 // 175
  }, function() {                                                                                                     // 176
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 177
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 178
    })), "\n							" ];                                                                                               // 179
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	"), "\n\n	", HTML.DIV({                        // 180
    "class": "row"                                                                                                    // 181
  }, "\n		", HTML.DIV({                                                                                               // 182
    "class": "col-md-12"                                                                                              // 183
  }, "\n			", HTML.DIV({                                                                                              // 184
    "class": "panel panel-default"                                                                                    // 185
  }, "\n				", HTML.DIV({                                                                                             // 186
    "class": "panel-heading",                                                                                         // 187
    style: "position:relative"                                                                                        // 188
  }, "\n					", HTML.H3({                                                                                             // 189
    "class": "panel-title"                                                                                            // 190
  }, Blaze.View("lookup:_", function() {                                                                              // 191
    return Spacebars.mustache(view.lookup("_"), "Export");                                                            // 192
  })), "\n				"), "\n				", HTML.DIV({                                                                                // 193
    "class": "panel-body"                                                                                             // 194
  }, "\n					", HTML.DIV({                                                                                            // 195
    "class": "row"                                                                                                    // 196
  }, "\n						", HTML.DIV({                                                                                           // 197
    "class": "col-md-12"                                                                                              // 198
  }, "\n							", HTML.FORM({                                                                                         // 199
    role: "form",                                                                                                     // 200
    "class": "main"                                                                                                   // 201
  }, "\n								", HTML.DIV({                                                                                         // 202
    "class": "form-inline"                                                                                            // 203
  }, "\n									", HTML.DIV({                                                                                        // 204
    "class": "form-group"                                                                                             // 205
  }, "\n										", HTML.DIV({                                                                                       // 206
    "class": "radio"                                                                                                  // 207
  }, "\n											", HTML.LABEL("\n												", HTML.Raw('<input type="radio" name="delimiter" value=",">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "comma");                                                             // 209
  }), "\n											"), "\n										"), "\n										", HTML.DIV({                                                   // 210
    "class": "radio"                                                                                                  // 211
  }, "\n											", HTML.LABEL("\n												", HTML.Raw('<input type="radio" name="delimiter" value=".">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "dot");                                                               // 213
  }), "\n											"), "\n										"), "\n										", HTML.DIV({                                                   // 214
    "class": "radio"                                                                                                  // 215
  }, "\n											", HTML.LABEL("\n												", HTML.Raw('<input type="radio" name="delimiter" value=";">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "semicoma");                                                          // 217
  }), "\n											"), "\n										"), "\n										", HTML.DIV({                                                   // 218
    "class": "radio"                                                                                                  // 219
  }, "\n											", HTML.LABEL("\n												", HTML.Raw('<input type="radio" name="delimiter" value="	" checked="checked">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "tab");                                                               // 221
  }), "\n											"), "\n										"), "\n									"), "\n									", HTML.DIV({                                    // 222
    "class": "form-group pull-right"                                                                                  // 223
  }, "\n										", HTML.DIV({                                                                                       // 224
    "class": "checkbox"                                                                                               // 225
  }, "\n											", HTML.LABEL("\n												", HTML.Raw('<input type="checkbox" name="quotes">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "With quotes");                                                       // 227
  }), "\n											"), "\n										"), "\n									"), "\n								"), "\n								", HTML.DIV({                      // 228
    "class": "form-group"                                                                                             // 229
  }, "\n									", HTML.getTag("btn")({                                                                              // 230
    id: "customExport",                                                                                               // 231
    "class": "btn-success btn"                                                                                        // 232
  }, Blaze.View("lookup:_", function() {                                                                              // 233
    return Spacebars.mustache(view.lookup("_"), "Export");                                                            // 234
  })), "\n								"), "\n								", HTML.DIV({                                                                        // 235
    "class": "form-group"                                                                                             // 236
  }, "\n									", HTML.TEXTAREA({                                                                                   // 237
    id: "csv",                                                                                                        // 238
    placeholder: function() {                                                                                         // 239
      return Spacebars.mustache(view.lookup("_"), "Exported csv");                                                    // 240
    },                                                                                                                // 241
    "class": "form-control",                                                                                          // 242
    rows: "25"                                                                                                        // 243
  }), "\n								"), HTML.Raw("<br>"), "\n								", HTML.H2(Blaze.View("lookup:progress", function() {               // 244
    return Spacebars.mustache(view.lookup("progress"));                                                               // 245
  })), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({               // 246
    "class": "row"                                                                                                    // 247
  }, "\n		", HTML.DIV({                                                                                               // 248
    "class": "col-md-12"                                                                                              // 249
  }, "\n			", HTML.DIV({                                                                                              // 250
    "class": "panel panel-default"                                                                                    // 251
  }, "\n				", HTML.DIV({                                                                                             // 252
    "class": "panel-heading",                                                                                         // 253
    style: "position:relative"                                                                                        // 254
  }, "\n					", HTML.H3({                                                                                             // 255
    "class": "panel-title"                                                                                            // 256
  }, Blaze.View("lookup:_", function() {                                                                              // 257
    return Spacebars.mustache(view.lookup("_"), "Gantt");                                                             // 258
  }), " ", HTML.SPAN({                                                                                                // 259
    "class": "pull-right"                                                                                             // 260
  }, HTML.A({                                                                                                         // 261
    href: "#",                                                                                                        // 262
    "class": "updateGantt",                                                                                           // 263
    title: function() {                                                                                               // 264
      return Spacebars.mustache(view.lookup("_"), "Update gantt");                                                    // 265
    }                                                                                                                 // 266
  }, Blaze.View("lookup:_", function() {                                                                              // 267
    return Spacebars.mustache(view.lookup("_"), "Update gantt");                                                      // 268
  })))), "\n				"), "\n				", HTML.DIV({                                                                              // 269
    "class": "panel-body"                                                                                             // 270
  }, "\n					", HTML.DIV({                                                                                            // 271
    "class": "row"                                                                                                    // 272
  }, "\n						", HTML.DIV({                                                                                           // 273
    "class": "col-md-12"                                                                                              // 274
  }, "\n							", Blaze.If(function() {                                                                               // 275
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 276
  }, function() {                                                                                                     // 277
    return [ "\n								", HTML.DIV({                                                                                 // 278
      id: "tasksGantt",                                                                                               // 279
      style: "width: 100%; height: 500px;"                                                                            // 280
    }), "\n							" ];                                                                                                // 281
  }, function() {                                                                                                     // 282
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 283
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 284
    })), "\n							" ];                                                                                               // 285
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	"), HTML.Raw('\n\n	<!--\n	<div class="row">\n		<div class="col-md-12">\n			<div class="panel panel-default">\n				<div class="panel-heading" style="position:relative">\n					<h3 class="panel-title">{{_ "Export"}}</h3>\n				</div>\n				<div class="panel-body">\n					<div class="row">\n						<div class="col-md-12">\n							<form role="form" class="main">\n						    <div class="form-inline">\n						      <div class="form-group">\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value=","/> {{_ "comma"}}\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value="."/> {{_ "dot"}}\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value=";"/> {{_ "semicoma"}}\n						          </label>\n						        </div>\n						        <div class="radio">\n						          <label>\n						            <input type="radio" name="delimiter" value="	" checked="checked"/> {{_ "tab"}}\n						          </label>\n						        </div>\n						      </div>\n						      <div class="form-group pull-right">\n						        <div class="checkbox">\n						          <label>\n						            <input type="checkbox" name="quotes"/> {{_ "With quotes"}}\n						          </label>\n						        </div>\n						      </div>\n						    </div>\n								<div class="form-group">\n									<btn id="export" class="btn-success btn">{{_ "Export"}}</btn>\n								</div>\n						    <div class="form-group">\n						      <textarea id="csv" placeholder="{{_ \'Exported csv\'}}" class="form-control" rows="25"></textarea>\n						    </div><br/>\n						    <h2>{{progress}}</h2>\n						  </form>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	-->') ];
}));                                                                                                                  // 287
                                                                                                                      // 288
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/viewTasks.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var progress = new ReactiveVar('');                                                                                   // 1
                                                                                                                      // 2
getTasks = function () {                                                                                              // 3
  var showRealizedTasks = Session.get("RKTasks-showRealizedTasks");                                                   // 4
  var realizedArray;                                                                                                  // 5
  if (showRealizedTasks) {                                                                                            // 6
    realizedArray = ["Yes", "No", "onCondition"];                                                                     // 7
  }                                                                                                                   // 8
  else {                                                                                                              // 9
    realizedArray = ["No", "onCondition"];                                                                            // 10
  }                                                                                                                   // 11
  return Tasks.find(                                                                                                  // 12
    {                                                                                                                 // 13
      realized: { $in: realizedArray },                                                                               // 14
    }                                                                                                                 // 15
    ).fetch();                                                                                                        // 16
};                                                                                                                    // 17
                                                                                                                      // 18
getTruncatedTaskAdditionalText = function (url, txt) {                                                                // 19
  var nWords = 0;                                                                                                     // 20
  var truncatedArray = txt.split(" ");                                                                                // 21
  var visiblePart;                                                                                                    // 22
  var tooltipPart;                                                                                                    // 23
  check(url, Match.OneOf(null, String));                                                                              // 24
  check(txt, String);                                                                                                 // 25
  if (url) {                                                                                                          // 26
    if (url.length > 0) {                                                                                             // 27
      RKCore.log("url : " + url);                                                                                     // 28
    }                                                                                                                 // 29
  }                                                                                                                   // 30
                                                                                                                      // 31
	if ((txt === "") || (typeof txt === 'undefined')) {                                                                  // 32
		return "-";                                                                                                         // 33
	}                                                                                                                    // 34
                                                                                                                      // 35
	if (truncatedArray.length > nWords) {                                                                                // 36
		visiblePart = truncatedArray.splice(0, nWords).join(" ");                                                           // 37
		tooltipPart = truncatedArray.join(' ');                                                                             // 38
		return new Spacebars.SafeString(visiblePart + " <a href='" + url + "' rel='tooltip' data-html='true' title='" + tooltipPart + "'>[...]</a>");
	}                                                                                                                    // 40
};                                                                                                                    // 41
                                                                                                                      // 42
updateGantt = function () {                                                                                           // 43
	var allTasks = [];                                                                                                   // 44
	var nTasks;                                                                                                          // 45
	var duration;                                                                                                        // 46
	var i;                                                                                                               // 47
	var data = [];                                                                                                       // 48
	var tasksGantt = {};                                                                                                 // 49
	var showRealizedTasks = Session.get("RKTasks-showRealizedTasks");                                                    // 50
	var realizedArray;                                                                                                   // 51
	if (showRealizedTasks) {                                                                                             // 52
		realizedArray = ["Yes", "No", "onCondition"];                                                                       // 53
	}                                                                                                                    // 54
	else {                                                                                                               // 55
		realizedArray = ["No", "onCondition"];                                                                              // 56
	}                                                                                                                    // 57
	allTasks = Tasks.find(                                                                                               // 58
		{                                                                                                                   // 59
			$and: [                                                                                                            // 60
				{                                                                                                                 // 61
					realized: { $in: realizedArray },                                                                                // 62
				},                                                                                                                // 63
				{                                                                                                                 // 64
					showInGantt: true,                                                                                               // 65
				},                                                                                                                // 66
			],                                                                                                                 // 67
		}                                                                                                                   // 68
	).fetch();                                                                                                           // 69
                                                                                                                      // 70
	nTasks = allTasks.length;                                                                                            // 71
                                                                                                                      // 72
	gantt.config.work_time = true; //removes non-working time from calculations                                          // 73
	gantt.skip_off_time = true;    //hides non-working time in the chart                                                 // 74
	gantt.config.readonly = true;                                                                                        // 75
                                                                                                                      // 76
	for (i = 0; i < nTasks; i++) {                                                                                       // 77
		RKCore.log("TaskContent : " + allTasks[i].taskContent);                                                             // 78
		duration = gantt.calculateDuration(moment(allTasks[i].scheduledStartDate, "DD.MM.YYYY"), moment(allTasks[i].scheduledEndDate, "DD.MM.YYYY"));
		RKCore.log("Duration in working day : " + duration);                                                                // 80
		data.push({                                                                                                         // 81
			id: allTasks[i]._id,                                                                                               // 82
			text: allTasks[i].taskContent,                                                                                     // 83
			start_date: moment(allTasks[i].scheduledStartDate, "DD.MM.YYYY").format("DD-MM-YYYY"),                             // 84
			duration: duration,                                                                                                // 85
			order: "10",                                                                                                       // 86
			progress: allTasks[i].percentageDone,                                                                              // 87
			open: false,                                                                                                       // 88
		});                                                                                                                 // 89
	}                                                                                                                    // 90
	tasksGantt.data = data;                                                                                              // 91
                                                                                                                      // 92
	gantt.templates.scale_cell_class = function (date) {                                                                 // 93
	    if (!gantt.isWorkTime(date)) {                                                                                   // 94
	        return "weekend";                                                                                            // 95
	    }                                                                                                                // 96
	};                                                                                                                   // 97
	gantt.templates.task_cell_class = function (item, date) {                                                            // 98
	    if (!gantt.isWorkTime(date)) {                                                                                   // 99
	        return "weekend";                                                                                            // 100
	    }                                                                                                                // 101
	};                                                                                                                   // 102
	gantt.templates.rightside_text = function (start, end, task) {                                                       // 103
		if (task.type === gantt.config.types.milestone) {                                                                   // 104
			return task.text;                                                                                                  // 105
		}                                                                                                                   // 106
		return "";                                                                                                          // 107
	};                                                                                                                   // 108
	gantt.config.columns = [                                                                                             // 109
	    {                                                                                                                // 110
				name: "text",                                                                                                     // 111
				label: "Task name",                                                                                               // 112
				width: "*",                                                                                                       // 113
				tree: true,                                                                                                       // 114
			},                                                                                                                 // 115
	    {                                                                                                                // 116
				name: "start_time",                                                                                               // 117
				label: "Start time",                                                                                              // 118
				template: function (obj) {                                                                                        // 119
					return gantt.templates.date_grid(obj.start_date);                                                                // 120
				},                                                                                                                // 121
				align: "center",                                                                                                  // 122
				width: 60,                                                                                                        // 123
			},                                                                                                                 // 124
	    {                                                                                                                // 125
				name: "duration",                                                                                                 // 126
				label: "Duration",                                                                                                // 127
				align: "center",                                                                                                  // 128
				width: 60,                                                                                                        // 129
			},                                                                                                                 // 130
	];                                                                                                                   // 131
                                                                                                                      // 132
	gantt.config.grid_width = 390;                                                                                       // 133
	gantt.config.date_grid = "%F %d";                                                                                    // 134
                                                                                                                      // 135
	gantt.config.scale_unit = "day";                                                                                     // 136
	gantt.config.date_scale = "%d.%m";                                                                                   // 137
                                                                                                                      // 138
	gantt.config.scale_height  = 60;                                                                                     // 139
	gantt.config.subscales = [                                                                                           // 140
		{ unit: "week",                                                                                                     // 141
			step: 1,                                                                                                           // 142
			date: "Week #%W",                                                                                                  // 143
		},                                                                                                                  // 144
	];                                                                                                                   // 145
	gantt.config.order_branch = true;                                                                                    // 146
	//gantt.config.sort = true;                                                                                          // 147
	//gantt.refreshData();                                                                                               // 148
	gantt.init("tasksGantt");                                                                                            // 149
	gantt.parse(tasksGantt);                                                                                             // 150
	return tasksGantt;                                                                                                   // 151
};                                                                                                                    // 152
                                                                                                                      // 153
Template.tasks.rendered = function () {                                                                               // 154
	Session.setDefault("RKTasks-showRealizedTasks", false);                                                              // 155
};                                                                                                                    // 156
                                                                                                                      // 157
Template.tasks.helpers({                                                                                              // 158
	currentUsername: function () {                                                                                       // 159
		var currentUserId = Meteor.userId();                                                                                // 160
		var currentUser = Members.collection.findOne({accountId: currentUserId});                                           // 161
		var currentUsername = currentUser.profile.nickname;                                                                 // 162
		RKCore.log("currentUserId : " + currentUserId);                                                                     // 163
		RKCore.log("currentUsername : " + currentUsername);                                                                 // 164
		return currentUsername;                                                                                             // 165
	},                                                                                                                   // 166
	currentUserId: function () {                                                                                         // 167
		return Meteor.userId();                                                                                             // 168
	},                                                                                                                   // 169
	Projects: function () {                                                                                              // 170
    return Projects.find({}).fetch();                                                                                 // 171
	},                                                                                                                   // 172
  Members: function () {                                                                                              // 173
		return Members.collection.find({}).fetch();                                                                         // 174
	},                                                                                                                   // 175
	Actionees: function () {                                                                                             // 176
		var allTasks;                                                                                                       // 177
		var j;                                                                                                              // 178
		var k;                                                                                                              // 179
    var actioneeListTemp = [];                                                                                        // 180
		var actioneeList = [];                                                                                              // 181
		var nTasks;                                                                                                         // 182
		var nActioneesInThisTask;                                                                                           // 183
		var actioneesArray;                                                                                                 // 184
		var actioneeName;                                                                                                   // 185
		allTasks = Tasks.find({}).fetch(); //to do get only ProcessStep                                                     // 186
    nTasks = allTasks.length;                                                                                         // 187
    j = 0;                                                                                                            // 188
		for (i = 0; i < nTasks; i++) {                                                                                      // 189
			if ( (typeof(allTasks[i].actionee) !== 'undefined') && (allTasks[i].actionee)) {                                   // 190
				actioneesArray = allTasks[i].actionee.split(",");                                                                 // 191
				nActioneesInThisTask = actioneesArray.length;                                                                     // 192
				for (k = 0; k < nActioneesInThisTask; k++) {                                                                      // 193
					actioneeName = actioneesArray[k].trim();                                                                         // 194
					if (actioneeName.length > 0) {                                                                                   // 195
						if (actioneeListTemp.indexOf(actioneeName) < 0) {                                                               // 196
			        actioneeListTemp[j] = actioneeName;                                                                        // 197
							actioneeList.push({"actioneeName": actioneeName});                                                             // 198
			        j++;                                                                                                       // 199
			      }                                                                                                            // 200
					}                                                                                                                // 201
				}                                                                                                                 // 202
			}                                                                                                                  // 203
		}                                                                                                                   // 204
    return actioneeList;                                                                                              // 205
	},                                                                                                                   // 206
	Minutes: function () {                                                                                               // 207
		return Minutes.find({}).fetch();                                                                                    // 208
	},                                                                                                                   // 209
	Tasks: function () {                                                                                                 // 210
    var tasks = getTasks();                                                                                           // 211
    return tasks;                                                                                                     // 212
	},                                                                                                                   // 213
	settingsTasks: function () {                                                                                         // 214
    return {                                                                                                          // 215
			rowsPerPage: 50,                                                                                                   // 216
			showFilter: true,                                                                                                  // 217
			showColumnToggles: true,                                                                                           // 218
			showNavigation: 'auto',                                                                                            // 219
      class: 'table table-condensed col-sm-12',                                                                       // 220
			rowClass: function (item) {                                                                                        // 221
				var today = moment();                                                                                             // 222
				var scheduledEndDate = moment(item.scheduledEndDate, "DD.MM.YYYY");                                               // 223
				//RKCore.log(today.diff(scheduledEndDate, 'days'));                                                               // 224
				if ( today.diff(scheduledEndDate, 'days') === 0) {                                                                // 225
					return 'warning';                                                                                                // 226
				}                                                                                                                 // 227
				if (today.diff(scheduledEndDate, 'days') > 0) {                                                                   // 228
					return 'danger';                                                                                                 // 229
				}                                                                                                                 // 230
				return '';                                                                                                        // 231
			},                                                                                                                 // 232
			fields: [                                                                                                          // 233
        {                                                                                                             // 234
					key: 'taskContent',                                                                                              // 235
					label: TAPi18n.__("Content"),                                                                                    // 236
					fn: function (value) {                                                                                           // 237
						return new Spacebars.SafeString(value);                                                                         // 238
					},                                                                                                               // 239
				},                                                                                                                // 240
				{                                                                                                                 // 241
					key: 'addedDate',                                                                                                // 242
					label: TAPi18n.__("Added date"),                                                                                 // 243
          hidden: true,                                                                                               // 244
				},                                                                                                                // 245
				{                                                                                                                 // 246
					key: 'addedBy',                                                                                                  // 247
					label: TAPi18n.__("Author"),                                                                                     // 248
					fn: function (value) {                                                                                           // 249
						var nickname = Members.collection.findOne({accountId: value}).profile.nickname;                                 // 250
						var nicknameHTML = "<span data-filterby='author' data-filterval='" + value + "' class='filterOnThis label label-info'>" + nickname + "</span>";
						return new Spacebars.SafeString(nicknameHTML);                                                                  // 252
					},                                                                                                               // 253
				},                                                                                                                // 254
				{                                                                                                                 // 255
					key: 'minutesIds',                                                                                               // 256
					label: TAPi18n.__("Minutes"),                                                                                    // 257
					fn: function (value) {                                                                                           // 258
						var i;                                                                                                          // 259
						var val = '';                                                                                                   // 260
						var n;                                                                                                          // 261
						var minutesId;                                                                                                  // 262
						if (value) {                                                                                                    // 263
							n = value.length;                                                                                              // 264
							for (i = 0; i < n; i++) {                                                                                      // 265
								minutesId = value[i];                                                                                         // 266
								minutes = Minutes.findOne(minutesId);                                                                         // 267
								RKCore.log(minutes);                                                                                          // 268
								if (typeof(minutes) !== 'undefined') {                                                                        // 269
									val = val + "<span data-filterby='minutes' data-filterval='" + minutesId + "' class='filterOnThis label label-info'>" + minutes.minutesName + "</span> ";
								}                                                                                                             // 271
							}                                                                                                              // 272
							return new Spacebars.SafeString(val.trim());                                                                   // 273
						}                                                                                                               // 274
						return '';                                                                                                      // 275
					},                                                                                                               // 276
				},                                                                                                                // 277
				{                                                                                                                 // 278
					key: 'scheduledStartDate',                                                                                       // 279
					label: TAPi18n.__("Scheduled start date"),                                                                       // 280
				},                                                                                                                // 281
				{                                                                                                                 // 282
					key: 'effectiveStartDate',                                                                                       // 283
					label: TAPi18n.__("Effective start date"),                                                                       // 284
          hidden: true,                                                                                               // 285
				},                                                                                                                // 286
				{                                                                                                                 // 287
					key: 'projectsIds',                                                                                              // 288
					label: TAPi18n.__("Projects"),                                                                                   // 289
					fn: function (value) {                                                                                           // 290
						var i;                                                                                                          // 291
						var val = '';                                                                                                   // 292
						var nProjects = value.length;                                                                                   // 293
						var projectId;                                                                                                  // 294
						for (i = 0; i < nProjects; i++) {                                                                               // 295
							projectId = value[i];                                                                                          // 296
							project = Projects.findOne(projectId);                                                                         // 297
							if (typeof(project) !== 'undefined') {                                                                         // 298
								val = val + "<span data-filterby='project' data-filterval='" + projectId + "' class='filterOnThis label label-info'>" + project.projectNumber + "</span> ";
							}                                                                                                              // 300
						}                                                                                                               // 301
						return new Spacebars.SafeString(val.trim());                                                                    // 302
					},                                                                                                               // 303
				},                                                                                                                // 304
				{                                                                                                                 // 305
					key: 'tags',                                                                                                     // 306
					label: TAPi18n.__("Tags"),                                                                                       // 307
					fn: function (value) {                                                                                           // 308
						var val;                                                                                                        // 309
						if (value) {                                                                                                    // 310
							val = value.replace(/;/g, ',');                                                                                // 311
			        valSplitted = val.split(',');                                                                              // 312
			        htmlTag = valSplitted.map(function (tag) {                                                                 // 313
			          return "<span class='label label-info'>" + tag + "</span>";                                              // 314
			        });                                                                                                        // 315
			        return new Spacebars.SafeString(htmlTag.join(' '));                                                        // 316
						}                                                                                                               // 317
						return "";                                                                                                      // 318
					},                                                                                                               // 319
				},                                                                                                                // 320
        {                                                                                                             // 321
					key: 'otherProjects',                                                                                            // 322
					label: TAPi18n.__("Other projects"),                                                                             // 323
          hidden: true,                                                                                               // 324
					fn: function (value) {                                                                                           // 325
						var val;                                                                                                        // 326
						if (value) {                                                                                                    // 327
							val = value.replace(/;/g, ',');                                                                                // 328
			        valSplitted = val.split(',');                                                                              // 329
			        htmlTag = valSplitted.map(function (tag) {                                                                 // 330
			          return "<span class='label label-info'>" + tag + "</span>";                                              // 331
			        });                                                                                                        // 332
			        return new Spacebars.SafeString(htmlTag.join(' '));                                                        // 333
						}                                                                                                               // 334
						return "";                                                                                                      // 335
					},                                                                                                               // 336
				},                                                                                                                // 337
				{                                                                                                                 // 338
					key: 'actioneeIds',                                                                                              // 339
					label: TAPi18n.__("Actionee"),                                                                                   // 340
					fn: function (value, object) {                                                                                   // 341
            var i;                                                                                                    // 342
            var val = '';                                                                                             // 343
            var n;                                                                                                    // 344
            var actioneeId;                                                                                           // 345
            if (value) {                                                                                              // 346
              n = value.length;                                                                                       // 347
              for (i = 0; i < n; i++) {                                                                               // 348
                actioneeId = value[i];                                                                                // 349
                member = Members.collection.findOne(actioneeId);                                                      // 350
                if (typeof(member) !== 'undefined') {                                                                 // 351
                  val = val + "<span data-filterby='actionee' data-filterval='" + actioneeId + "' class='filterOnThis label label-info'>" + member.profile.nickname + "</span> ";
                }                                                                                                     // 353
              }                                                                                                       // 354
            }                                                                                                         // 355
                                                                                                                      // 356
						if (object.actionee) {                                                                                          // 357
							val2 = object.actionee.replace(/;/g, ',');                                                                     // 358
			        actionee = val2.split(',');                                                                                // 359
              n = actionee.length;                                                                                    // 360
              for (i = 0; i < n; i++) {                                                                               // 361
                actioneeId = actionee[i];                                                                             // 362
                val = val + "<span class='label label-info'>" + actionee[i] + "</span> ";                             // 363
                }                                                                                                     // 364
              val = val.trim();                                                                                       // 365
              }                                                                                                       // 366
						return new Spacebars.SafeString(val);                                                                           // 367
					},                                                                                                               // 368
				},                                                                                                                // 369
				{                                                                                                                 // 370
					key: 'scheduledEndDate',                                                                                         // 371
					label: TAPi18n.__("Scheduled end date"),                                                                         // 372
				},                                                                                                                // 373
				{                                                                                                                 // 374
					key: 'effectiveEndDate',                                                                                         // 375
					label: TAPi18n.__("Effective end date"),                                                                         // 376
          hidden: true,                                                                                               // 377
				},                                                                                                                // 378
				{                                                                                                                 // 379
					key: 'realized',                                                                                                 // 380
					label: TAPi18n.__("Realized"),                                                                                   // 381
          hidden: true,                                                                                               // 382
					fn: function (value) {                                                                                           // 383
						var val;                                                                                                        // 384
						if (value === "Yes") {                                                                                          // 385
							val = TAPi18n.__("Yes");                                                                                       // 386
						}                                                                                                               // 387
						else if (value === "No") {                                                                                      // 388
							val = TAPi18n.__("No");                                                                                        // 389
						}                                                                                                               // 390
						else {                                                                                                          // 391
							val = TAPi18n.__("On condition");                                                                              // 392
						}                                                                                                               // 393
						return val;                                                                                                     // 394
					},                                                                                                               // 395
				},                                                                                                                // 396
				{                                                                                                                 // 397
					key: 'percentageDone',                                                                                           // 398
					label: TAPi18n.__("Percentage Done"),                                                                            // 399
          hidden: true,                                                                                               // 400
					fn: function (value, object) {                                                                                   // 401
						var val = value;                                                                                                // 402
						if (object.realized === "Yes") {                                                                                // 403
							val = 100;                                                                                                     // 404
						}                                                                                                               // 405
						progressBar = val + "%";                                                                                        // 406
						return new Spacebars.SafeString(progressBar);                                                                   // 407
					},                                                                                                               // 408
				},                                                                                                                // 409
				{                                                                                                                 // 410
					key: 'actions',                                                                                                  // 411
					label: 'Actions',                                                                                                // 412
					fn: function (value, object) {                                                                                   // 413
						var additionalTextLink = '';                                                                                    // 414
						var editLink;                                                                                                   // 415
						var duplicateLink;                                                                                              // 416
						var deleteLink;                                                                                                 // 417
            var markAsDoneLink = '';                                                                                  // 418
            if (object.realized !== "Yes") {                                                                          // 419
  						markAsDoneLink = ' <a href="#" title="' + TAPi18n.__('Mark as done') + '" class="markAsDone" '                // 420
  							+ 'data-taskid="' +	object._id + '"'                                                                         // 421
  							+ '>' +                                                                                                      // 422
  							'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +                                          // 423
  							'</a> ';                                                                                                     // 424
            }                                                                                                         // 425
						if (object.additionalText) {                                                                                    // 426
							//additionalText = getTruncatedTaskAdditionalText("#", object.additionalText) + ' '; //todo : remove html      // 427
              additionalTextLink = '<a href="#"'                                                                      // 428
  							+ ' class="showTaskAdditionalText" title="' + TAPi18n.__('Show follow-up') + '"'                             // 429
  							+ ' data-taskid="' +	object._id + '"'                                                                        // 430
  							+ '>[...]</a> ';                                                                                             // 431
						}                                                                                                               // 432
						editLink = '<a href="' +                                                                                        // 433
							Router.routes.editTask.path({_id: object._id, filterBy: Router.current().params.filterBy, filterVal: Router.current().params.filterVal})
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 435
							//+ ' data-wheretocomeback="' +	Router.current().params + '"'                                                  // 436
							+ '>'                                                                                                          // 437
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 438
							'</a> ';                                                                                                       // 439
            printLink = '<a href="' +                                                                                 // 440
							Router.routes.printTask.path({_id: object._id})                                                                // 441
							+ '" title="' + TAPi18n.__('Print') + '"'                                                                      // 442
							+ '>'                                                                                                          // 443
							+ '<span class="glyphicon glyphicon-print" aria-hidden="true"></span>' +                                       // 444
							'</a> ';                                                                                                       // 445
						duplicateLink = '<a href="#"'                                                                                   // 446
							+ ' class="duplicateTask" title="' + TAPi18n.__('Duplicate') + '"'                                             // 447
							+ ' data-taskid="' +	object._id + '"'                                                                          // 448
							+ '>'                                                                                                          // 449
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 450
							'</a> ';                                                                                                       // 451
						deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteTask" '                            // 452
							+ 'data-taskid="' +	object._id + '"'                                                                           // 453
							+ '>' +                                                                                                        // 454
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 455
							'</a> ';                                                                                                       // 456
						return new Spacebars.SafeString(markAsDoneLink + additionalTextLink + editLink + printLink + duplicateLink + deleteLink);
					},                                                                                                               // 458
				},                                                                                                                // 459
			],                                                                                                                 // 460
		};                                                                                                                  // 461
	},                                                                                                                   // 462
});                                                                                                                   // 463
                                                                                                                      // 464
Template.tasks.events({                                                                                               // 465
	"click a.createTask": function (e) {                                                                                 // 466
		var data = {};                                                                                                      // 467
		e.preventDefault();                                                                                                 // 468
    Meteor.call('createTask', data, function (error, result) {                                                        // 469
			if (!error) {                                                                                                      // 470
				taskId = result;                                                                                                  // 471
				Router.go("editTask", {_id: taskId});                                                                             // 472
			}                                                                                                                  // 473
		});                                                                                                                 // 474
		return false;                                                                                                       // 475
	},                                                                                                                   // 476
	"click a.deleteTask": function (e) {                                                                                 // 477
	    e.preventDefault();                                                                                              // 478
			bootbox.confirm(TAPi18n.__("Are you sure you want to delete this task ?"), function (result) {                     // 479
			 if (result) {                                                                                                     // 480
				 Meteor.call('deleteTask', e.currentTarget.dataset.taskid);                                                       // 481
			 }                                                                                                                 // 482
			});                                                                                                                // 483
			return false;                                                                                                      // 484
	},                                                                                                                   // 485
	"click a.markAsDone": function (e) {                                                                                 // 486
	    e.preventDefault();                                                                                              // 487
	    Meteor.call('markAsDone', e.currentTarget.dataset.taskid);                                                       // 488
			return false;                                                                                                      // 489
	},                                                                                                                   // 490
  "click a.showTaskAdditionalText": function (e) {                                                                    // 491
    var taskId = e.currentTarget.dataset.taskid;                                                                      // 492
	  e.preventDefault();                                                                                                // 493
    myTask = Tasks.findOne(taskId);                                                                                   // 494
    bootbox.dialog({                                                                                                  // 495
      title: myTask.taskContent,                                                                                      // 496
      message: myTask.additionalText,                                                                                 // 497
    });                                                                                                               // 498
		return false;                                                                                                       // 499
	},                                                                                                                   // 500
	"click a.duplicateTask": function (e) {                                                                              // 501
	    e.preventDefault();                                                                                              // 502
	    Meteor.call('duplicateTask', e.currentTarget.dataset.taskid, function (error, result) {                          // 503
				if (!error) {                                                                                                     // 504
					newTaskId = result;                                                                                              // 505
					Router.go("editTask", {_id: newTaskId});                                                                         // 506
				}                                                                                                                 // 507
			});                                                                                                                // 508
			return false;                                                                                                      // 509
	},                                                                                                                   // 510
	"click a.updateGantt": function (e) {                                                                                // 511
	    e.preventDefault();                                                                                              // 512
			tasksGantt = updateGantt();                                                                                        // 513
			//gantt.refreshData();                                                                                             // 514
			//gantt.init("tasksGantt");                                                                                        // 515
			gantt.parse(tasksGantt);                                                                                           // 516
			return false;                                                                                                      // 517
	},                                                                                                                   // 518
  "click span.filterOnThis": function (e) {                                                                           // 519
      var filterBy = e.currentTarget.dataset.filterby;                                                                // 520
      var filterVal = e.currentTarget.dataset.filterval;                                                              // 521
	    e.preventDefault();                                                                                              // 522
	    Router.go("tasks", {filterBy: filterBy, filterVal: filterVal});                                                  // 523
			return false;                                                                                                      // 524
	},                                                                                                                   // 525
	"change #filterByProjectSelect": function (e) {                                                                      // 526
		e.preventDefault();                                                                                                 // 527
		RKCore.log(e.target.value);                                                                                         // 528
		if (e.target.value === "all") {                                                                                     // 529
			Router.go("tasks");                                                                                                // 530
		}                                                                                                                   // 531
		else {                                                                                                              // 532
			Router.go("tasks", {filterBy: 'project', filterVal: e.target.value});                                              // 533
		}                                                                                                                   // 534
		return false;                                                                                                       // 535
	},                                                                                                                   // 536
	"change #filterByMinutesSelect": function (e) {                                                                      // 537
		e.preventDefault();                                                                                                 // 538
		RKCore.log(e.target.value);                                                                                         // 539
		if (e.target.value === "all") {                                                                                     // 540
			Router.go("tasks");                                                                                                // 541
		}                                                                                                                   // 542
		else {                                                                                                              // 543
			Router.go("tasks", {filterBy: 'minutes', filterVal: e.target.value});                                              // 544
		}                                                                                                                   // 545
		return false;                                                                                                       // 546
	},                                                                                                                   // 547
	"change #filterByActioneeSelect": function (e) {                                                                     // 548
		e.preventDefault();                                                                                                 // 549
		RKCore.log(e.target.value);                                                                                         // 550
		if (e.target.value === "all") {                                                                                     // 551
			Router.go("tasks");                                                                                                // 552
		}                                                                                                                   // 553
		else {                                                                                                              // 554
			Router.go("tasks", {filterBy: 'actionee', filterVal: e.target.value});                                             // 555
		}                                                                                                                   // 556
		return false;                                                                                                       // 557
	},                                                                                                                   // 558
	"change .showRealizedTasksCheckbox input": function (e) {                                                            // 559
		e.preventDefault();                                                                                                 // 560
		RKCore.log(e.target.checked);                                                                                       // 561
  	Session.set("RKTasks-showRealizedTasks", e.target.checked);                                                        // 562
		return false;                                                                                                       // 563
	},                                                                                                                   // 564
  "click #customExport": function (el) {                                                                              // 565
    var config;                                                                                                       // 566
		var csv;                                                                                                            // 567
		var data = [];                                                                                                      // 568
    var obj = {};                                                                                                     // 569
		var delimiter;                                                                                                      // 570
		var hasQuotes;                                                                                                      // 571
		var rd;                                                                                                             // 572
    var i;                                                                                                            // 573
		var shareDialogInfo;                                                                                                // 574
    var tasks = getTasks();                                                                                           // 575
    var nTasks = tasks.length;                                                                                        // 576
    var val = '';                                                                                                     // 577
    el.preventDefault();                                                                                              // 578
    $("#csv").val('');                                                                                                // 579
    delimiter = $("input[name=delimiter]:checked").val();                                                             // 580
    hasQuotes = $('input[name=quotes]').prop('checked');                                                              // 581
    shareDialogInfo = {                                                                                               // 582
      template: Template.spinner,                                                                                     // 583
      title: "Wait",                                                                                                  // 584
      modalDialogClass: "wait-dialog",                                                                                // 585
      modalBodyClass: "share-modal-body",                                                                             // 586
      modalFooterClass: "share-modal-footer",                                                                         // 587
      removeOnHide: true,                                                                                             // 588
      buttons: {},                                                                                                    // 589
    };                                                                                                                // 590
    rd = ReactiveModal.initDialog(shareDialogInfo);                                                                   // 591
    rd.show();                                                                                                        // 592
    progress.set('Please wait...');                                                                                   // 593
                                                                                                                      // 594
    for (i = 0; i < nTasks; i++) {                                                                                    // 595
        obj = {};                                                                                                     // 596
        obj[TAPi18n.__("Content")] = $("<div/>").html(tasks[i].taskContent).text();                                   // 597
        obj[TAPi18n.__("Additional text")] = $("<div/>").html(tasks[i].additionalText).text();                        // 598
        obj[TAPi18n.__("Effective end date")] = tasks[i].effectiveEndDate;                                            // 599
        obj[TAPi18n.__("Scheduled end date")] = tasks[i].scheduledEndDate;                                            // 600
                                                                                                                      // 601
        if (tasks[i].actioneeIds) {                                                                                   // 602
          nActioneesInThisTask = tasks[i].actioneeIds.length;                                                         // 603
          RKCore.log(nActioneesInThisTask);                                                                           // 604
          for (j = 0; j < nActioneesInThisTask; j++) {                                                                // 605
            actioneeId = tasks[i].actioneeIds[j];                                                                     // 606
            member = Members.collection.findOne(actioneeId);                                                          // 607
            if (typeof(member) !== 'undefined') {                                                                     // 608
              val = val + member.profile.nickname + " ";                                                              // 609
            }                                                                                                         // 610
          }                                                                                                           // 611
        }                                                                                                             // 612
                                                                                                                      // 613
        if (tasks[i].actionee) {                                                                                      // 614
          if (typeof(tasks[i].actionee) !== 'undefined') {                                                            // 615
            val2 = tasks[i].actionee.replace(/;/g, ',');                                                              // 616
            actionee = val2.split(',');                                                                               // 617
            n = actionee.length;                                                                                      // 618
            for (j = 0; j < n; j++) {                                                                                 // 619
              val = val + actionee[j] + " ";                                                                          // 620
              }                                                                                                       // 621
            val = val.trim();                                                                                         // 622
          }                                                                                                           // 623
        }                                                                                                             // 624
        obj[TAPi18n.__("Actionee")] = val;                                                                            // 625
        val = '';                                                                                                     // 626
                                                                                                                      // 627
                                                                                                                      // 628
    		nProjects = tasks[i].projectsIds.length;                                                                        // 629
    		for (j = 0; j < nProjects; j++) {                                                                               // 630
    			projectId = tasks[i].projectsIds[j];                                                                           // 631
    			project = Projects.findOne(projectId);                                                                         // 632
    			if (typeof(project) !== 'undefined') {                                                                         // 633
    				val = val + project.projectNumber + " ";                                                                      // 634
    			}                                                                                                              // 635
    		}                                                                                                               // 636
    		if (tasks[i].otherProjects) {                                                                                   // 637
    			val2 = tasks[i].otherProjects.replace(/;/g, ',');                                                              // 638
    			valSplitted = val2.split(',');                                                                                 // 639
    			htmlTag = valSplitted.map(function (tag) {                                                                     // 640
    				return  tag + " ";                                                                                            // 641
    			});                                                                                                            // 642
    			val = val + htmlTag.join(' ');                                                                                 // 643
    		}                                                                                                               // 644
        obj[TAPi18n.__("Projects")] = val.trim();                                                                     // 645
        val = '';                                                                                                     // 646
                                                                                                                      // 647
        if (tasks[i].realized === "Yes") {                                                                            // 648
    			val = TAPi18n.__("Yes");                                                                                       // 649
    		}                                                                                                               // 650
    		else if (tasks[i].realized === "No") {                                                                          // 651
    			val = TAPi18n.__("No");                                                                                        // 652
    		}                                                                                                               // 653
    		else {                                                                                                          // 654
    			val = TAPi18n.__("On condition");                                                                              // 655
    		}                                                                                                               // 656
    		obj[TAPi18n.__("Realized")] = val;                                                                              // 657
        val = '';                                                                                                     // 658
                                                                                                                      // 659
        data[i] = obj;                                                                                                // 660
    }                                                                                                                 // 661
                                                                                                                      // 662
		config = {                                                                                                          // 663
      delimiter: delimiter,                                                                                           // 664
      quotes: hasQuotes,                                                                                              // 665
    };                                                                                                                // 666
    csv = Papa.unparse(data, config);                                                                                 // 667
    $('#csv').val(csv);                                                                                               // 668
    count = 0;                                                                                                        // 669
    rd.hide();                                                                                                        // 670
    progress.set('');                                                                                                 // 671
    return false;                                                                                                     // 672
  },                                                                                                                  // 673
	"click #export": function (el) {                                                                                     // 674
    var config;                                                                                                       // 675
		var csv;                                                                                                            // 676
		var data;                                                                                                           // 677
		var delimiter;                                                                                                      // 678
		var hasQuotes;                                                                                                      // 679
		var rd;                                                                                                             // 680
		var shareDialogInfo;                                                                                                // 681
		var showRealizedTasks = Session.get("RKTasks-showRealizedTasks");                                                   // 682
		var realizedArray;                                                                                                  // 683
		el.preventDefault();                                                                                                // 684
    $("#csv").val('');                                                                                                // 685
    delimiter = $("input[name=delimiter]:checked").val();                                                             // 686
    hasQuotes = $('input[name=quotes]').prop('checked');                                                              // 687
    shareDialogInfo = {                                                                                               // 688
      template: Template.spinner,                                                                                     // 689
      title: "Wait",                                                                                                  // 690
      modalDialogClass: "wait-dialog",                                                                                // 691
      modalBodyClass: "share-modal-body",                                                                             // 692
      modalFooterClass: "share-modal-footer",                                                                         // 693
      removeOnHide: true,                                                                                             // 694
      buttons: {},                                                                                                    // 695
    };                                                                                                                // 696
    rd = ReactiveModal.initDialog(shareDialogInfo);                                                                   // 697
    rd.show();                                                                                                        // 698
    progress.set('Please wait...');                                                                                   // 699
                                                                                                                      // 700
		if (showRealizedTasks) {                                                                                            // 701
			realizedArray = ["Yes", "No", "onCondition"];                                                                      // 702
		}                                                                                                                   // 703
		else {                                                                                                              // 704
			realizedArray = ["No", "onCondition"];                                                                             // 705
		}                                                                                                                   // 706
		data = Tasks.find(                                                                                                  // 707
			{                                                                                                                  // 708
				realized: { $in: realizedArray },                                                                                 // 709
			},                                                                                                                 // 710
			{                                                                                                                  // 711
		    fields: {                                                                                                       // 712
		        importDate: 0,                                                                                              // 713
		        _id: 0,                                                                                                     // 714
						importedBy: 0,                                                                                                  // 715
						full: 0,                                                                                                        // 716
						searchResultFromCorePFMEA: 0,                                                                                   // 717
		     },                                                                                                             // 718
			}                                                                                                                  // 719
			).fetch();                                                                                                         // 720
                                                                                                                      // 721
		config = {                                                                                                          // 722
      delimiter: delimiter,                                                                                           // 723
      quotes: hasQuotes,                                                                                              // 724
    };                                                                                                                // 725
    csv = Papa.unparse(data, config);                                                                                 // 726
    $('#csv').val(csv);                                                                                               // 727
    count = 0;                                                                                                        // 728
    rd.hide();                                                                                                        // 729
    progress.set('');                                                                                                 // 730
    return false;                                                                                                     // 731
  },                                                                                                                  // 732
});                                                                                                                   // 733
                                                                                                                      // 734
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.editTask.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("editTask");                                                                                     // 2
Template["editTask"] = new Template("Template.editTask", (function() {                                                // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
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
    return Spacebars.mustache(view.lookup("_"), "Edit Task");                                                         // 17
  }), " ", HTML.SPAN({                                                                                                // 18
    "class": "pull-right"                                                                                             // 19
  }, HTML.A({                                                                                                         // 20
    href: function() {                                                                                                // 21
      return Spacebars.mustache(view.lookup("pathFor"), "tasks");                                                     // 22
    },                                                                                                                // 23
    title: function() {                                                                                               // 24
      return Spacebars.mustache(view.lookup("_"), "Back to tasks list");                                              // 25
    }                                                                                                                 // 26
  }, Blaze.View("lookup:_", function() {                                                                              // 27
    return Spacebars.mustache(view.lookup("_"), "Back to tasks list");                                                // 28
  })))), "\n        "), "\n				", HTML.DIV({                                                                          // 29
    "class": "panel-body"                                                                                             // 30
  }, "\n					", HTML.FORM({                                                                                           // 31
    id: "editTaskForm"                                                                                                // 32
  }, "\n						", HTML.DIV({                                                                                           // 33
    "class": "row"                                                                                                    // 34
  }, "\n							", HTML.DIV({                                                                                          // 35
    "class": "col-md-4"                                                                                               // 36
  }, "\n								", HTML.DIV({                                                                                         // 37
    "class": "form-group"                                                                                             // 38
  }, "\n									", HTML.LABEL({                                                                                      // 39
    "for": "taskContent"                                                                                              // 40
  }, Blaze.View("lookup:_", function() {                                                                              // 41
    return Spacebars.mustache(view.lookup("_"), "Content");                                                           // 42
  })), "\n									", HTML.TEXTAREA({                                                                                 // 43
    "class": "form-control",                                                                                          // 44
    id: "taskContent",                                                                                                // 45
    placeholder: function() {                                                                                         // 46
      return Spacebars.mustache(view.lookup("_"), "Content");                                                         // 47
    },                                                                                                                // 48
    rows: "3",                                                                                                        // 49
    value: function() {                                                                                               // 50
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "taskContent"));                            // 51
    }                                                                                                                 // 52
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 53
    "class": "form-group"                                                                                             // 54
  }, "\n									", HTML.LABEL({                                                                                      // 55
    "for": "additionalText"                                                                                           // 56
  }, Blaze.View("lookup:_", function() {                                                                              // 57
    return Spacebars.mustache(view.lookup("_"), "Additional text");                                                   // 58
  })), "\n									", HTML.TEXTAREA({                                                                                 // 59
    "class": "form-control",                                                                                          // 60
    id: "additionalText",                                                                                             // 61
    placeholder: function() {                                                                                         // 62
      return Spacebars.mustache(view.lookup("_"), "Additional text");                                                 // 63
    },                                                                                                                // 64
    rows: "3",                                                                                                        // 65
    value: function() {                                                                                               // 66
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "additionalText"));                         // 67
    }                                                                                                                 // 68
  }), "\n					    	"), "\n							"), " ", HTML.Raw("<!-- End of first col -->"), "\n							", HTML.DIV({              // 69
    "class": "col-md-4"                                                                                               // 70
  }, "\n								", HTML.DIV({                                                                                         // 71
    "class": "form-group"                                                                                             // 72
  }, "\n									", HTML.LABEL({                                                                                      // 73
    "for": "scheduledStartDate"                                                                                       // 74
  }, Blaze.View("lookup:_", function() {                                                                              // 75
    return Spacebars.mustache(view.lookup("_"), "Scheduled start date");                                              // 76
  })), "\n									", HTML.INPUT({                                                                                    // 77
    type: "text",                                                                                                     // 78
    "class": "form-control",                                                                                          // 79
    id: "scheduledStartDate",                                                                                         // 80
    placeholder: function() {                                                                                         // 81
      return Spacebars.mustache(view.lookup("today"));                                                                // 82
    },                                                                                                                // 83
    value: function() {                                                                                               // 84
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "scheduledStartDate"));                     // 85
    }                                                                                                                 // 86
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 87
    "class": "form-group"                                                                                             // 88
  }, "\n									", HTML.LABEL({                                                                                      // 89
    "for": "effectiveStartDate"                                                                                       // 90
  }, Blaze.View("lookup:_", function() {                                                                              // 91
    return Spacebars.mustache(view.lookup("_"), "Effective start date");                                              // 92
  })), "\n									", HTML.INPUT({                                                                                    // 93
    type: "text",                                                                                                     // 94
    "class": "form-control",                                                                                          // 95
    id: "effectiveStartDate",                                                                                         // 96
    placeholder: function() {                                                                                         // 97
      return Spacebars.mustache(view.lookup("today"));                                                                // 98
    },                                                                                                                // 99
    value: function() {                                                                                               // 100
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "effectiveStartDate"));                     // 101
    }                                                                                                                 // 102
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 103
    "class": "form-group"                                                                                             // 104
  }, "\n									", HTML.LABEL({                                                                                      // 105
    "for": "scheduledEndDate"                                                                                         // 106
  }, Blaze.View("lookup:_", function() {                                                                              // 107
    return Spacebars.mustache(view.lookup("_"), "Scheduled end date");                                                // 108
  })), "\n									", HTML.INPUT({                                                                                    // 109
    type: "text",                                                                                                     // 110
    "class": "form-control",                                                                                          // 111
    id: "scheduledEndDate",                                                                                           // 112
    placeholder: function() {                                                                                         // 113
      return Spacebars.mustache(view.lookup("tomorrow"));                                                             // 114
    },                                                                                                                // 115
    value: function() {                                                                                               // 116
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "scheduledEndDate"));                       // 117
    }                                                                                                                 // 118
  }), "\n					    	"), "\n				        ", HTML.DIV({                                                                   // 119
    "class": "form-group"                                                                                             // 120
  }, "\n									", HTML.LABEL({                                                                                      // 121
    "for": "effectiveEndDate"                                                                                         // 122
  }, Blaze.View("lookup:_", function() {                                                                              // 123
    return Spacebars.mustache(view.lookup("_"), "Effective end date");                                                // 124
  })), "\n									", HTML.INPUT({                                                                                    // 125
    type: "text",                                                                                                     // 126
    "class": "form-control",                                                                                          // 127
    id: "effectiveEndDate",                                                                                           // 128
    placeholder: function() {                                                                                         // 129
      return Spacebars.mustache(view.lookup("tomorrow"));                                                             // 130
    },                                                                                                                // 131
    value: function() {                                                                                               // 132
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "effectiveEndDate"));                       // 133
    }                                                                                                                 // 134
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 135
    "class": "form-group"                                                                                             // 136
  }, "\n									", HTML.LABEL({                                                                                      // 137
    "for": "realized"                                                                                                 // 138
  }, Blaze.View("lookup:_", function() {                                                                              // 139
    return Spacebars.mustache(view.lookup("_"), "Realized");                                                          // 140
  }), " : "), "\n									", HTML.LABEL({                                                                             // 141
    "class": "radio-inline"                                                                                           // 142
  }, "\n		  							", HTML.Raw('<input type="radio" name="inlineRadioOptions" id="inlineRadioYes" value="Yes">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Yes");                                                               // 144
  }), "\n									"), "\n									", HTML.LABEL({                                                                     // 145
    "class": "radio-inline"                                                                                           // 146
  }, "\n		  							", HTML.Raw('<input type="radio" name="inlineRadioOptions" id="inlineRadioNo" value="No">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "No");                                                                // 148
  }), "\n									"), "\n									", HTML.LABEL({                                                                     // 149
    "class": "radio-inline"                                                                                           // 150
  }, "\n		  							", HTML.Raw('<input type="radio" name="inlineRadioOptions" id="inlineRadioOnCondition" value="onCondition" checked="checked">'), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "On condition");                                                      // 152
  }), "\n									"), "\n					    	"), "\n								", HTML.DIV({                                                       // 153
    "class": "form-group"                                                                                             // 154
  }, "\n									", HTML.LABEL({                                                                                      // 155
    "for": "percentageDone"                                                                                           // 156
  }, Blaze.View("lookup:_", function() {                                                                              // 157
    return Spacebars.mustache(view.lookup("_"), "Percentage done");                                                   // 158
  })), "\n									", HTML.DIV({                                                                                      // 159
    "class": "input-group"                                                                                            // 160
  }, "\n							      ", HTML.INPUT({                                                                                  // 161
    type: "text",                                                                                                     // 162
    "class": "form-control",                                                                                          // 163
    id: "percentageDone",                                                                                             // 164
    placeholder: "50",                                                                                                // 165
    value: function() {                                                                                               // 166
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "percentageDone"));                         // 167
    }                                                                                                                 // 168
  }), "\n							      ", HTML.Raw('<div class="input-group-addon">%</div>'), "\n							    "), "\n					    	"), "\n								", HTML.DIV({
    "class": "form-group"                                                                                             // 170
  }, "\n									", HTML.LABEL("\n										", HTML.INPUT(HTML.Attrs({                                                // 171
    type: "checkbox",                                                                                                 // 172
    id: "showInGantt"                                                                                                 // 173
  }, function() {                                                                                                     // 174
    return Spacebars.attrMustache(view.lookup("showInGantt"));                                                        // 175
  })), " ", Blaze.View("lookup:_", function() {                                                                       // 176
    return Spacebars.mustache(view.lookup("_"), "Show task in gantt");                                                // 177
  }), "\n									"), "\n								"), "\n							"), " ", HTML.Raw("<!-- End of second col -->"), "\n							", HTML.DIV({
    "class": "col-md-4"                                                                                               // 179
  }, "\n								", HTML.DIV({                                                                                         // 180
    "class": "form-group"                                                                                             // 181
  }, "\n									", HTML.LABEL({                                                                                      // 182
    "for": "actionee"                                                                                                 // 183
  }, Blaze.View("lookup:_", function() {                                                                              // 184
    return Spacebars.mustache(view.lookup("_"), "Actionee");                                                          // 185
  })), "\n										", HTML.INPUT({                                                                                   // 186
    type: "text",                                                                                                     // 187
    "class": "form-control",                                                                                          // 188
    id: "actionee",                                                                                                   // 189
    placeholder: function() {                                                                                         // 190
      return Spacebars.mustache(view.lookup("_"), "John, Katia, Supplier A");                                         // 191
    },                                                                                                                // 192
    value: function() {                                                                                               // 193
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "actionee"));                               // 194
    }                                                                                                                 // 195
  }), "\n										", Blaze.Each(function() {                                                                         // 196
    return Spacebars.call(view.lookup("Members"));                                                                    // 197
  }, function() {                                                                                                     // 198
    return [ "\n										", HTML.DIV({                                                                               // 199
      "class": "checkbox"                                                                                             // 200
    }, "\n											", HTML.LABEL("\n												", HTML.INPUT({                                                     // 201
      type: "checkbox",                                                                                               // 202
      "class": "actionee",                                                                                            // 203
      value: function() {                                                                                             // 204
        return Spacebars.mustache(view.lookup("_id"));                                                                // 205
      },                                                                                                              // 206
      checked: function() {                                                                                           // 207
        return Spacebars.mustache(view.lookup("isActioneeChecked"), Spacebars.dot(view.lookup(".."), "currentTask", "actioneeIds"), view.lookup("_id"));
      }                                                                                                               // 209
    }), "\n												", Blaze.View("lookup:profile.nickname", function() {                                          // 210
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));                                   // 211
    }), "\n											"), "\n										"), "\n										" ];                                                          // 212
  }, function() {                                                                                                     // 213
    return [ "\n											", HTML.P(Blaze.View("lookup:_", function() {                                              // 214
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 215
    })), "\n										" ];                                                                                            // 216
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 217
    "class": "form-group"                                                                                             // 218
  }, "\n									", HTML.LABEL({                                                                                      // 219
    "for": "projects"                                                                                                 // 220
  }, Blaze.View("lookup:_", function() {                                                                              // 221
    return Spacebars.mustache(view.lookup("_"), "Projects");                                                          // 222
  })), "\n									", Blaze.Each(function() {                                                                         // 223
    return Spacebars.call(view.lookup("Projects"));                                                                   // 224
  }, function() {                                                                                                     // 225
    return [ "\n									", HTML.DIV({                                                                                // 226
      "class": "checkbox"                                                                                             // 227
    }, "\n										", HTML.LABEL("\n											", HTML.INPUT({                                                       // 228
      type: "checkbox",                                                                                               // 229
      "class": "projectName",                                                                                         // 230
      value: function() {                                                                                             // 231
        return Spacebars.mustache(view.lookup("_id"));                                                                // 232
      },                                                                                                              // 233
      checked: function() {                                                                                           // 234
        return Spacebars.mustache(view.lookup("isProjectChecked"), Spacebars.dot(view.lookup(".."), "currentTask", "projectsIds"), view.lookup("_id"));
      }                                                                                                               // 236
    }), "\n											", Blaze.View("lookup:projectName", function() {                                                // 237
      return Spacebars.mustache(view.lookup("projectName"));                                                          // 238
    }), "\n										"), "\n									"), "\n									" ];                                                             // 239
  }, function() {                                                                                                     // 240
    return [ "\n										", HTML.P("Nothing to show for the moment"), "\n									" ];                               // 241
  }), "\n								"), "\n								", HTML.DIV({                                                                         // 242
    "class": "form-group"                                                                                             // 243
  }, "\n									", HTML.LABEL({                                                                                      // 244
    "for": "otherProjects"                                                                                            // 245
  }, Blaze.View("lookup:_", function() {                                                                              // 246
    return Spacebars.mustache(view.lookup("_"), "Other projects");                                                    // 247
  })), "\n									", HTML.INPUT({                                                                                    // 248
    type: "text",                                                                                                     // 249
    "class": "form-control",                                                                                          // 250
    id: "otherProjects",                                                                                              // 251
    placeholder: function() {                                                                                         // 252
      return Spacebars.mustache(view.lookup("_"), "Other projects");                                                  // 253
    },                                                                                                                // 254
    value: function() {                                                                                               // 255
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "otherProjects"));                          // 256
    }                                                                                                                 // 257
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 258
    "class": "form-group"                                                                                             // 259
  }, "\n									", HTML.LABEL({                                                                                      // 260
    "for": "tags"                                                                                                     // 261
  }, Blaze.View("lookup:_", function() {                                                                              // 262
    return Spacebars.mustache(view.lookup("_"), "Tags");                                                              // 263
  })), "\n									", HTML.INPUT({                                                                                    // 264
    type: "text",                                                                                                     // 265
    "class": "form-control",                                                                                          // 266
    id: "tags",                                                                                                       // 267
    placeholder: function() {                                                                                         // 268
      return Spacebars.mustache(view.lookup("_"), "Tags");                                                            // 269
    },                                                                                                                // 270
    value: function() {                                                                                               // 271
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "tags"));                                   // 272
    }                                                                                                                 // 273
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 274
    "class": "form-group"                                                                                             // 275
  }, "\n									", HTML.LABEL({                                                                                      // 276
    "for": "includedInMinutes"                                                                                        // 277
  }, Blaze.View("lookup:_", function() {                                                                              // 278
    return Spacebars.mustache(view.lookup("_"), "Include in minutes");                                                // 279
  })), "\n									", Blaze.Each(function() {                                                                         // 280
    return Spacebars.call(view.lookup("Minutes"));                                                                    // 281
  }, function() {                                                                                                     // 282
    return [ "\n									", HTML.DIV({                                                                                // 283
      "class": "checkbox"                                                                                             // 284
    }, "\n										", HTML.LABEL("\n											", HTML.INPUT({                                                       // 285
      type: "checkbox",                                                                                               // 286
      "class": "minutesName",                                                                                         // 287
      value: function() {                                                                                             // 288
        return Spacebars.mustache(view.lookup("_id"));                                                                // 289
      },                                                                                                              // 290
      checked: function() {                                                                                           // 291
        return Spacebars.mustache(view.lookup("isMinutesChecked"), Spacebars.dot(view.lookup(".."), "currentTask", "minutesIds"), view.lookup("_id"));
      }                                                                                                               // 293
    }), "\n											", Blaze.View("lookup:minutesName", function() {                                                // 294
      return Spacebars.mustache(view.lookup("minutesName"));                                                          // 295
    }), "\n										"), "\n									"), "\n									" ];                                                             // 296
  }, function() {                                                                                                     // 297
    return [ "\n										", HTML.P(Blaze.View("lookup:_", function() {                                               // 298
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 299
    })), "\n									" ];                                                                                             // 300
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 301
    "class": "form-group"                                                                                             // 302
  }, "\n									", HTML.LABEL({                                                                                      // 303
    "for": "addedDate"                                                                                                // 304
  }, Blaze.View("lookup:_", function() {                                                                              // 305
    return Spacebars.mustache(view.lookup("_"), "Added date");                                                        // 306
  })), "\n									", HTML.INPUT({                                                                                    // 307
    type: "text",                                                                                                     // 308
    "class": "form-control",                                                                                          // 309
    id: "addedDate",                                                                                                  // 310
    value: function() {                                                                                               // 311
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "addedDate"));                              // 312
    },                                                                                                                // 313
    disabled: ""                                                                                                      // 314
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 315
    "class": "form-group"                                                                                             // 316
  }, "\n									", HTML.LABEL({                                                                                      // 317
    "for": "addedBy"                                                                                                  // 318
  }, Blaze.View("lookup:_", function() {                                                                              // 319
    return Spacebars.mustache(view.lookup("_"), "Author");                                                            // 320
  })), "\n									", HTML.INPUT({                                                                                    // 321
    type: "text",                                                                                                     // 322
    "class": "form-control",                                                                                          // 323
    id: "addedBy",                                                                                                    // 324
    value: function() {                                                                                               // 325
      return Spacebars.mustache(view.lookup("author"));                                                               // 326
    },                                                                                                                // 327
    disabled: ""                                                                                                      // 328
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 329
    "class": "form-group"                                                                                             // 330
  }, "\n									", HTML.LABEL({                                                                                      // 331
    "for": "markedAsDoneBy"                                                                                           // 332
  }, Blaze.View("lookup:_", function() {                                                                              // 333
    return Spacebars.mustache(view.lookup("_"), "Closed by");                                                         // 334
  })), "\n									", HTML.INPUT({                                                                                    // 335
    type: "text",                                                                                                     // 336
    "class": "form-control",                                                                                          // 337
    id: "markedAsDoneBy",                                                                                             // 338
    value: function() {                                                                                               // 339
      return Spacebars.mustache(view.lookup("markedAsDoneBy"));                                                       // 340
    },                                                                                                                // 341
    disabled: ""                                                                                                      // 342
  }), "\n					    	"), "\n							"), " ", HTML.Raw("<!-- End of last col -->"), "\n						"), "\n						", HTML.DIV({   // 343
    "class": "row"                                                                                                    // 344
  }, "\n							", HTML.DIV({                                                                                          // 345
    "class": "col-md-12"                                                                                              // 346
  }, "\n								", HTML.DIV({                                                                                         // 347
    "class": "form-group"                                                                                             // 348
  }, "\n									", HTML.LABEL("\n										", HTML.INPUT(HTML.Attrs({                                                // 349
    type: "checkbox",                                                                                                 // 350
    id: "sendReminder"                                                                                                // 351
  }, function() {                                                                                                     // 352
    return Spacebars.attrMustache(view.lookup("sendReminder"));                                                       // 353
  })), " ", Blaze.View("lookup:_", function() {                                                                       // 354
    return Spacebars.mustache(view.lookup("_"), "Send a reminder to the author at 8am on the scheduled end date");    // 355
  }), "\n									"), "\n								"), "\n								", HTML.DIV({                                                         // 356
    "class": "form-group"                                                                                             // 357
  }, "\n									", HTML.LABEL("\n										", HTML.INPUT(HTML.Attrs({                                                // 358
    type: "checkbox",                                                                                                 // 359
    id: "sendReminderActionee"                                                                                        // 360
  }, function() {                                                                                                     // 361
    return Spacebars.attrMustache(view.lookup("sendReminderActionee"));                                               // 362
  })), " ", Blaze.View("lookup:_", function() {                                                                       // 363
    return Spacebars.mustache(view.lookup("_"), "Send a reminder to the actionee at 8am on the scheduled end date");  // 364
  }), "\n									"), "\n								"), "\n							"), "\n						"), "\n						", HTML.DIV({                                // 365
    "class": "row"                                                                                                    // 366
  }, "\n							", HTML.DIV({                                                                                          // 367
    "class": "col-md-12"                                                                                              // 368
  }, "\n					  		", HTML.Raw('<!-- <button type="submit" class="btn btn-primary" name="submitButton" value="saveAndStayButton">{{_ "Save"}}</button>-->'), "\n								", HTML.BUTTON({
    type: "submit",                                                                                                   // 370
    "class": "btn btn-primary"                                                                                        // 371
  }, Blaze.View("lookup:_", function() {                                                                              // 372
    return Spacebars.mustache(view.lookup("_"), "Save and go back to tasks list");                                    // 373
  })), "\n							"), "\n						"), "\n				  "), "\n    		"), "\n			"), "\n		"), "\n	");                                // 374
}));                                                                                                                  // 375
                                                                                                                      // 376
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/editTask.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.editTask.rendered = function () {                                                                            // 1
	if (this.data.currentTask.realized === "Yes") {                                                                      // 2
		document.getElementById('inlineRadioYes').checked = "checked";                                                      // 3
	}                                                                                                                    // 4
	else if (this.data.currentTask.realized === "onCondition") {                                                         // 5
		document.getElementById('inlineRadioOnCondition').checked = "checked";                                              // 6
	}                                                                                                                    // 7
	else {                                                                                                               // 8
		document.getElementById('inlineRadioNo').checked = "checked";                                                       // 9
		//$("#inlineRadioNo").prop("checked", true);                                                                        // 10
	}                                                                                                                    // 11
                                                                                                                      // 12
	if (typeof($('#tags').val()) !== 'undefined') {                                                                      // 13
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 14
	}                                                                                                                    // 15
	$('#tags').tagsinput({                                                                                               // 16
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 17
	});                                                                                                                  // 18
                                                                                                                      // 19
	if (typeof($('#otherProjects').val()) !== 'undefined') {                                                             // 20
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 21
	}                                                                                                                    // 22
	$('#otherProjects').tagsinput({                                                                                      // 23
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 24
	});                                                                                                                  // 25
                                                                                                                      // 26
	if (typeof($('#actionee').val()) !== 'undefined') {                                                                  // 27
		$('#actionee').val($('#actionee').val().replace(/;/g, ','));                                                        // 28
	}                                                                                                                    // 29
	$('#actionee').tagsinput({                                                                                           // 30
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 31
	});                                                                                                                  // 32
                                                                                                                      // 33
	$('#effectiveStartDate').datepicker({format: 'dd.mm.yyyy'});                                                         // 34
	$('#effectiveEndDate').datepicker({format: 'dd.mm.yyyy'});                                                           // 35
	$('#scheduledEndDate').datepicker({format: 'dd.mm.yyyy'});                                                           // 36
	$('#scheduledStartDate').datepicker({format: 'dd.mm.yyyy'});                                                         // 37
                                                                                                                      // 38
	Meteor.typeahead.inject();                                                                                           // 39
                                                                                                                      // 40
	CKEDITOR.replace('additionalText');                                                                                  // 41
	CKEDITOR.replace('taskContent');                                                                                     // 42
};                                                                                                                    // 43
                                                                                                                      // 44
Template.editTask.helpers({                                                                                           // 45
	today: function () {                                                                                                 // 46
		return moment().format("DD.MM.YYYY");                                                                               // 47
	},                                                                                                                   // 48
	tomorrow: function () {                                                                                              // 49
		var tomorrow = moment().businessAdd(1, 'days');                                                                     // 50
		return moment(tomorrow).format("DD.MM.YYYY");                                                                       // 51
	},                                                                                                                   // 52
	isProjectChecked: function (projectsIds, projectId) {                                                                // 53
		if (projectsIds.indexOf(projectId) < 0) {                                                                           // 54
			return false;                                                                                                      // 55
		}                                                                                                                   // 56
		return "checked";                                                                                                   // 57
	},                                                                                                                   // 58
	Projects: function () {                                                                                              // 59
		var myProjects = [];                                                                                                // 60
		myProjects = Projects.find({}).fetch(); //to do get only ProcessStep                                                // 61
    return myProjects;                                                                                                // 62
  },                                                                                                                  // 63
	isMinutesChecked: function (minutesIds, minutesId) {                                                                 // 64
		if (typeof(minutesIds) !== 'undefined') {                                                                           // 65
			if (minutesIds.indexOf(minutesId) < 0) {                                                                           // 66
				return false;                                                                                                     // 67
			}                                                                                                                  // 68
			return "checked";                                                                                                  // 69
		}                                                                                                                   // 70
		return false;                                                                                                       // 71
	},                                                                                                                   // 72
	Minutes: function () {                                                                                               // 73
		var myMinutes = [];                                                                                                 // 74
		//myMinutes = Minutes.find({ projectsIds: {$in: this.currentTask.projectsIds} }).fetch();                           // 75
		myMinutes = Minutes.find({}).fetch(); //to do get only minutes in this projetc                                      // 76
    return myMinutes;                                                                                                 // 77
  },                                                                                                                  // 78
	listActionee: function () {                                                                                          // 79
		//var usernames = ["aa", "bb"];                                                                                     // 80
		return this.data.usernames;                                                                                         // 81
	},                                                                                                                   // 82
	Members: function () {                                                                                               // 83
		return Members.collection.find({}).fetch();                                                                         // 84
	},                                                                                                                   // 85
	isActioneeChecked: function (actioneeIds, actioneeId) {                                                              // 86
		if (typeof(actioneeIds) !== 'undefined') {                                                                          // 87
			if (actioneeIds.indexOf(actioneeId) < 0) {                                                                         // 88
				return false;                                                                                                     // 89
			}                                                                                                                  // 90
			return "checked";                                                                                                  // 91
		}                                                                                                                   // 92
		return false;                                                                                                       // 93
	},                                                                                                                   // 94
	showInGantt: function () {                                                                                           // 95
		if (this.currentTask.showInGantt) {                                                                                 // 96
			return "checked";                                                                                                  // 97
		}                                                                                                                   // 98
		return "";                                                                                                          // 99
	},                                                                                                                   // 100
	sendReminder: function () {                                                                                          // 101
		if (this.currentTask.sendReminder) {                                                                                // 102
			return "checked";                                                                                                  // 103
		}                                                                                                                   // 104
		return "";                                                                                                          // 105
	},                                                                                                                   // 106
	sendReminderActionee: function () {                                                                                  // 107
		if (this.currentTask.sendReminderActionee) {                                                                        // 108
			return "checked";                                                                                                  // 109
		}                                                                                                                   // 110
		return "";                                                                                                          // 111
	},                                                                                                                   // 112
	author: function () {                                                                                                // 113
		return Members.collection.findOne({accountId: this.currentTask.addedBy}).profile.nickname;                          // 114
	},                                                                                                                   // 115
	markedAsDoneBy: function () {                                                                                        // 116
		var member = Members.collection.findOne({accountId: this.currentTask.markedAsDoneBy});                              // 117
		if (typeof(member) !== 'undefined') {                                                                               // 118
			markedAsDoneBy = member.profile.nickname;                                                                          // 119
		}                                                                                                                   // 120
		else {                                                                                                              // 121
			markedAsDoneBy = TAPi18n.__('The task is still open');                                                             // 122
		}                                                                                                                   // 123
		return markedAsDoneBy;                                                                                              // 124
	},                                                                                                                   // 125
});                                                                                                                   // 126
                                                                                                                      // 127
Template.editTask.events({                                                                                            // 128
	'submit form': function (e) {                                                                                        // 129
		var data = {};                                                                                                      // 130
		var projectsIds = [];                                                                                               // 131
		var minutesIds = [];                                                                                                // 132
		var actioneeIds = [];                                                                                               // 133
	  e.preventDefault();                                                                                                // 134
		data.taskId = this.currentTask._id;                                                                                 // 135
		data.effectiveStartDate = e.target.effectiveStartDate.value;                                                        // 136
		data.effectiveEndDate = e.target.effectiveEndDate.value;                                                            // 137
	  data.scheduledStartDate = e.target.scheduledStartDate.value;                                                       // 138
		data.scheduledEndDate  = e.target.scheduledEndDate.value;                                                           // 139
		data.showInGantt  = e.target.showInGantt.checked;                                                                   // 140
		data.sendReminder  = e.target.sendReminder.checked;                                                                 // 141
		data.sendReminderActionee  = e.target.sendReminderActionee.checked;                                                 // 142
		data.taskContent = e.target.taskContent.value;                                                                      // 143
		data.otherProjects = e.target.otherProjects.value;                                                                  // 144
		data.tags = e.target.tags.value;                                                                                    // 145
                                                                                                                      // 146
		if (e.target.inlineRadioYes.checked) {                                                                              // 147
			data.realized = e.target.inlineRadioYes.value;                                                                     // 148
		}                                                                                                                   // 149
		else if (e.target.inlineRadioNo.checked) {                                                                          // 150
			data.realized = e.target.inlineRadioNo.value;                                                                      // 151
		}                                                                                                                   // 152
		else if (e.target.inlineRadioOnCondition.checked) {                                                                 // 153
			data.realized = e.target.inlineRadioOnCondition.value;                                                             // 154
		}                                                                                                                   // 155
		else {                                                                                                              // 156
			data.realized = "No";                                                                                              // 157
		}                                                                                                                   // 158
                                                                                                                      // 159
		$("input:checkbox.projectName[type=checkbox]:checked").each(function () {                                           // 160
			projectsIds.push($(this).val());                                                                                   // 161
		});                                                                                                                 // 162
		data.projectsIds = projectsIds;                                                                                     // 163
                                                                                                                      // 164
		$("input:checkbox.minutesName[type=checkbox]:checked").each(function () {                                           // 165
			minutesIds.push($(this).val());                                                                                    // 166
		});                                                                                                                 // 167
		data.minutesIds = minutesIds;                                                                                       // 168
                                                                                                                      // 169
		$("input:checkbox.actionee[type=checkbox]:checked").each(function () {                                              // 170
			actioneeIds.push($(this).val());                                                                                   // 171
		});                                                                                                                 // 172
		data.actioneeIds = actioneeIds;                                                                                     // 173
                                                                                                                      // 174
		data.additionalText = e.target.additionalText.value;                                                                // 175
		data.actionee = e.target.actionee.value;                                                                            // 176
		data.percentageDone = e.target.percentageDone.value;                                                                // 177
                                                                                                                      // 178
		data.taskContentNoHTML = $("<div/>").html(e.target.taskContent.value).text();                                       // 179
		data.additionalTextNoHTML = $("<div/>").html(e.target.additionalText.value).text();                                 // 180
		data.tagsNoHTML = $("<div/>").html(e.target.tags.value).text();                                                     // 181
		data.otherProjectsNoHTML = $("<div/>").html(e.target.otherProjects.value).text();                                   // 182
                                                                                                                      // 183
                                                                                                                      // 184
	  Meteor.call('updateTask', data, function (error) {                                                                 // 185
			if (!error) {                                                                                                      // 186
				if (typeof(toastr) !== 'undefined') {                                                                             // 187
					toastr.success(TAPi18n.__('The task has been updated successfully'));                                            // 188
				}                                                                                                                 // 189
				if (typeof Router.current().params.filterBy !== 'undefined') {                                                    // 190
					Router.go("tasks", {                                                                                             // 191
						filterBy: Router.current().params.filterBy,                                                                     // 192
						filterVal: Router.current().params.filterVal,                                                                   // 193
					});                                                                                                              // 194
				}                                                                                                                 // 195
				else {                                                                                                            // 196
					Router.go("tasks");                                                                                              // 197
				}                                                                                                                 // 198
			}                                                                                                                  // 199
		});                                                                                                                 // 200
		return false;                                                                                                       // 201
	},                                                                                                                   // 202
	"click a.delete": function (e) {                                                                                     // 203
    e.preventDefault();                                                                                               // 204
    RKCore.log(this);                                                                                                 // 205
    Meteor.call('deleteTask', this._id, function () {});                                                              // 206
		return false;                                                                                                       // 207
	},                                                                                                                   // 208
});                                                                                                                   // 209
                                                                                                                      // 210
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.viewMinutes.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("minutes");                                                                                      // 2
Template["minutes"] = new Template("Template.minutes", (function() {                                                  // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.DIV({                                                                                            // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n			 		", HTML.H3({                                                                                            // 14
    "class": "panel-title"                                                                                            // 15
  }, Blaze.View("lookup:_", function() {                                                                              // 16
    return Spacebars.mustache(view.lookup("_"), "Minutes");                                                           // 17
  }), " ", HTML.SPAN({                                                                                                // 18
    "class": "pull-right"                                                                                             // 19
  }, HTML.A({                                                                                                         // 20
    href: "#",                                                                                                        // 21
    "class": "createMinutes",                                                                                         // 22
    title: function() {                                                                                               // 23
      return Spacebars.mustache(view.lookup("_"), "Create a new minutes");                                            // 24
    }                                                                                                                 // 25
  }, Blaze.View("lookup:_", function() {                                                                              // 26
    return Spacebars.mustache(view.lookup("_"), "Create a new minutes");                                              // 27
  })))), "\n        "), "\n				", HTML.DIV({                                                                          // 28
    "class": "panel-body"                                                                                             // 29
  }, "\n					", HTML.DIV({                                                                                            // 30
    "class": "row"                                                                                                    // 31
  }, "\n						", HTML.DIV({                                                                                           // 32
    "class": "col-md-5"                                                                                               // 33
  }, "\n							", HTML.DIV({                                                                                          // 34
    "class": "post"                                                                                                   // 35
  }, "\n								", HTML.P(HTML.A({                                                                                    // 36
    href: function() {                                                                                                // 37
      return Spacebars.mustache(view.lookup("pathFor"), "minutes");                                                   // 38
    },                                                                                                                // 39
    title: function() {                                                                                               // 40
      return Spacebars.mustache(view.lookup("_"), "View all minutes");                                                // 41
    }                                                                                                                 // 42
  }, Blaze.View("lookup:_", function() {                                                                              // 43
    return Spacebars.mustache(view.lookup("_"), "View all minutes");                                                  // 44
  }))), "\n								", HTML.P(HTML.A({                                                                                 // 45
    href: function() {                                                                                                // 46
      return [ Spacebars.mustache(view.lookup("pathFor"), "minutes", Spacebars.kw({                                   // 47
        filterBy: "author"                                                                                            // 48
      })), "/", Spacebars.mustache(view.lookup("currentUserId")) ];                                                   // 49
    }                                                                                                                 // 50
  }, Blaze.View("lookup:_", function() {                                                                              // 51
    return Spacebars.mustache(view.lookup("_"), "View minutes that I wrote");                                         // 52
  }))), "\n							"), "\n						"), "\n						", HTML.DIV({                                                             // 53
    "class": "col-md-6"                                                                                               // 54
  }, "\n							", HTML.DIV({                                                                                          // 55
    "class": "post"                                                                                                   // 56
  }, "\n								", Blaze.If(function() {                                                                              // 57
    return Spacebars.call(view.lookup("Projects"));                                                                   // 58
  }, function() {                                                                                                     // 59
    return [ "\n									", Blaze.View("lookup:_", function() {                                                       // 60
      return Spacebars.mustache(view.lookup("_"), "Filter by");                                                       // 61
    }), " ", Blaze.View("lookup:_", function() {                                                                      // 62
      return Spacebars.mustache(view.lookup("_"), "project");                                                         // 63
    }), " :\n									", HTML.SELECT({                                                                                // 64
      "class": "form-control",                                                                                        // 65
      id: "filterByProjectSelect"                                                                                     // 66
    }, "\n										", HTML.OPTION({                                                                                  // 67
      value: "all"                                                                                                    // 68
    }, Blaze.View("lookup:_", function() {                                                                            // 69
      return Spacebars.mustache(view.lookup("_"), "All projects");                                                    // 70
    })), "\n									", Blaze.Each(function() {                                                                       // 71
      return Spacebars.call(view.lookup("Projects"));                                                                 // 72
    }, function() {                                                                                                   // 73
      return [ "\n				  					", HTML.OPTION({                                                                         // 74
        value: function() {                                                                                           // 75
          return Spacebars.mustache(view.lookup("_id"));                                                              // 76
        }                                                                                                             // 77
      }, Blaze.View("lookup:projectNumber", function() {                                                              // 78
        return Spacebars.mustache(view.lookup("projectNumber"));                                                      // 79
      }), " - ", Blaze.View("lookup:projectName", function() {                                                        // 80
        return Spacebars.mustache(view.lookup("projectName"));                                                        // 81
      })), "\n									" ];                                                                                           // 82
    }), "\n									"), "\n								" ];                                                                               // 83
  }, function() {                                                                                                     // 84
    return [ "\n									", HTML.P("If you add project, you will be able to filter by project."), "\n								" ];     // 85
  }), "\n							"), "\n						"), "\n					"), "\n					", HTML.Raw("<hr>"), "\n					", HTML.DIV({                       // 86
    "class": "row"                                                                                                    // 87
  }, "\n						", HTML.DIV({                                                                                           // 88
    "class": "col-md-12"                                                                                              // 89
  }, "\n							", Blaze.If(function() {                                                                               // 90
    return Spacebars.call(view.lookup("Minutes"));                                                                    // 91
  }, function() {                                                                                                     // 92
    return [ "\n								", HTML.DIV({                                                                                 // 93
      "class": "tableScroll"                                                                                          // 94
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 95
      return {                                                                                                        // 96
        collection: Spacebars.call(view.lookup("Minutes")),                                                           // 97
        settings: Spacebars.call(view.lookup("settingsMinutes"))                                                      // 98
      };                                                                                                              // 99
    }, function() {                                                                                                   // 100
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 101
    }), "\n								"), "\n							" ];                                                                                 // 102
  }, function() {                                                                                                     // 103
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 104
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 105
    })), "\n							" ];                                                                                               // 106
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	");                                            // 107
}));                                                                                                                  // 108
                                                                                                                      // 109
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/viewMinutes.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.minutes.rendered = function () {                                                                             // 1
                                                                                                                      // 2
};                                                                                                                    // 3
                                                                                                                      // 4
Template.minutes.helpers({                                                                                            // 5
	currentUsername: function () {                                                                                       // 6
		var currentUserId = Meteor.userId();                                                                                // 7
		var currentUser = Members.collection.findOne({accountId: currentUserId});                                           // 8
		var currentUsername = currentUser.profile.nickname;                                                                 // 9
		return currentUsername;                                                                                             // 10
	},                                                                                                                   // 11
	currentUserId: function () {                                                                                         // 12
		return Meteor.userId();                                                                                             // 13
	},                                                                                                                   // 14
	Projects: function () {                                                                                              // 15
		return Projects.find({}).fetch();                                                                                   // 16
	},                                                                                                                   // 17
	Actionees: function () {                                                                                             // 18
		var allTasks;                                                                                                       // 19
		var j;                                                                                                              // 20
		var k;                                                                                                              // 21
    var actioneeListTemp = [];                                                                                        // 22
		var actioneeList = [];                                                                                              // 23
		var nTasks;                                                                                                         // 24
		var nActioneesInThisTask;                                                                                           // 25
		var actioneesArray;                                                                                                 // 26
		var actioneeName;                                                                                                   // 27
		allTasks = Tasks.find({}).fetch(); //to do get only ProcessStep                                                     // 28
    nTasks = allTasks.length;                                                                                         // 29
    j = 0;                                                                                                            // 30
		for (i = 0; i < nTasks; i++) {                                                                                      // 31
			actioneesArray = allTasks[i].actionee.split(",");                                                                  // 32
			nActioneesInThisTask = actioneesArray.length;                                                                      // 33
			for (k = 0; k < nActioneesInThisTask; k++) {                                                                       // 34
				actioneeName = actioneesArray[k].trim();                                                                          // 35
				if (actioneeName.length > 0) {                                                                                    // 36
					if (actioneeListTemp.indexOf(actioneeName) < 0) {                                                                // 37
		        actioneeListTemp[j] = actioneeName;                                                                         // 38
						actioneeList.push({"actioneeName": actioneeName});                                                              // 39
		        j++;                                                                                                        // 40
		      }                                                                                                             // 41
				}                                                                                                                 // 42
			}                                                                                                                  // 43
		}                                                                                                                   // 44
    return actioneeList;                                                                                              // 45
	},                                                                                                                   // 46
	Minutes: function () {                                                                                               // 47
		return Minutes.find().fetch();                                                                                      // 48
	},                                                                                                                   // 49
	settingsMinutes: function () {                                                                                       // 50
    return {                                                                                                          // 51
			rowsPerPage: 10,                                                                                                   // 52
			showFilter: true,                                                                                                  // 53
			showColumnToggles: true,                                                                                           // 54
			showNavigation: 'auto',                                                                                            // 55
      class: 'table table-condensed col-sm-12',                                                                       // 56
			fields: [                                                                                                          // 57
				{                                                                                                                 // 58
					key: 'addedDate',                                                                                                // 59
					label: TAPi18n.__("Added date"),                                                                                 // 60
				},                                                                                                                // 61
				{                                                                                                                 // 62
					key: 'addedBy',                                                                                                  // 63
					label: TAPi18n.__("Author"),                                                                                     // 64
					fn: function (value) {                                                                                           // 65
						var nickname = Members.collection.findOne({accountId: value}).profile.nickname;                                 // 66
						var nicknameHTML = "<span class='label label-info'>" + nickname + "</span>";                                    // 67
						return new Spacebars.SafeString(nicknameHTML);                                                                  // 68
					},                                                                                                               // 69
				},                                                                                                                // 70
				{                                                                                                                 // 71
					key: 'minutesName',                                                                                              // 72
					label: TAPi18n.__("Minutes"),                                                                                    // 73
				},                                                                                                                // 74
				{                                                                                                                 // 75
					key: 'projectsIds',                                                                                              // 76
					label: TAPi18n.__("Projects"),                                                                                   // 77
					fn: function (value) {                                                                                           // 78
						var i;                                                                                                          // 79
						var val = '';                                                                                                   // 80
						var nProjects = value.length;                                                                                   // 81
						var projectId;                                                                                                  // 82
						for (i = 0; i < nProjects; i++) {                                                                               // 83
							projectId = value[i];                                                                                          // 84
							project = Projects.findOne(projectId);                                                                         // 85
							if (typeof(project) !== 'undefined') {                                                                         // 86
								val = val + "<span class='label label-info'>" + project.projectNumber + "</span> ";                           // 87
							}                                                                                                              // 88
						}                                                                                                               // 89
						return new Spacebars.SafeString(val.trim());                                                                    // 90
					},                                                                                                               // 91
				},                                                                                                                // 92
				{                                                                                                                 // 93
					key: 'tags',                                                                                                     // 94
					label: TAPi18n.__("Tags"),                                                                                       // 95
					fn: function (value) {                                                                                           // 96
						var val = value.replace(/;/g, ',');                                                                             // 97
		        tag = val.split(',');                                                                                       // 98
		        htmlTag = tag.map(function (tag) {                                                                          // 99
		          return "<span class='label label-info'>" + tag + "</span>";                                               // 100
		        });                                                                                                         // 101
		        return new Spacebars.SafeString(htmlTag.join(' '));                                                         // 102
					},                                                                                                               // 103
				},                                                                                                                // 104
				{                                                                                                                 // 105
					key: 'actions',                                                                                                  // 106
					label: 'Actions',                                                                                                // 107
					fn: function (value, object) {                                                                                   // 108
						var editLink = '<a href="' +                                                                                    // 109
							Router.routes.editMinutes.path({_id: object._id, filterBy: Router.current().params.filterBy, filterVal: Router.current().params.filterVal})
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 111
							+ '>'                                                                                                          // 112
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 113
							'</a> ';                                                                                                       // 114
						var printLink = '<a href="' +                                                                                   // 115
							Router.routes.printMinutes.path({_id: object._id})                                                             // 116
							+ '" title="' + TAPi18n.__('Print') + '"'                                                                      // 117
							+ '>'                                                                                                          // 118
							+ '<span class="glyphicon glyphicon-print" aria-hidden="true"></span>' +                                       // 119
							'</a> ';                                                                                                       // 120
						var generatePDFLink = '<a href="#"'                                                                             // 121
							+ ' class="generatePDF" title="' + TAPi18n.__('Save as a pdf file to predefined server location') + '"'        // 122
							+ ' data-minutesid="' +	object._id + '"'                                                                       // 123
							+ ' data-minutesname="' +	object.minutesName + '"'                                                             // 124
							+ '>'                                                                                                          // 125
							+ '<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>' +                                 // 126
							'</a> ';                                                                                                       // 127
						var duplicateLink = '<a href="#"'                                                                               // 128
							+ ' class="duplicateMinutes" title="' + TAPi18n.__('Duplicate') + '"'                                          // 129
							+ ' data-minutesid="' +	object._id + '"'                                                                       // 130
							+ '>'                                                                                                          // 131
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 132
							'</a> ';                                                                                                       // 133
						var deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteMinutes" '                     // 134
							+ 'data-minutesid="' +	object._id + '"'                                                                        // 135
							+ '>' +                                                                                                        // 136
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 137
							'</a> ';                                                                                                       // 138
						return new Spacebars.SafeString(editLink + printLink + generatePDFLink + duplicateLink + deleteLink);           // 139
					},                                                                                                               // 140
				},                                                                                                                // 141
			],                                                                                                                 // 142
		};                                                                                                                  // 143
	},                                                                                                                   // 144
});                                                                                                                   // 145
                                                                                                                      // 146
Template.minutes.events({                                                                                             // 147
	"click a.createMinutes": function (e) {                                                                              // 148
			var data = {};                                                                                                     // 149
			e.preventDefault();                                                                                                // 150
	    Meteor.call('createMinutes', data, function (error, result) {                                                    // 151
				if (!error) {                                                                                                     // 152
					minutesId = result;                                                                                              // 153
					Router.go("editMinutes", {_id: minutesId});                                                                      // 154
				}                                                                                                                 // 155
			});                                                                                                                // 156
			return false;                                                                                                      // 157
	},                                                                                                                   // 158
	"click a.generatePDF": function (e) {                                                                                // 159
		var data = {};                                                                                                      // 160
    e.preventDefault();                                                                                               // 161
		data.url = Router.routes.printMinutes.url({_id: e.currentTarget.dataset.minutesid});                                // 162
		data.fileName = e.currentTarget.dataset.minutesname + '.pdf';                                                       // 163
    Meteor.call('generatePDF', data, function (err, res) {                                                            // 164
			if (!err) {                                                                                                        // 165
				if (typeof(toastr) !== 'undefined') {                                                                             // 166
					filePath = res;                                                                                                  // 167
					toastr.success(TAPi18n.__('The minutes has been saved to') + ' : ' + filePath);                                  // 168
				}                                                                                                                 // 169
				return false;                                                                                                     // 170
			}                                                                                                                  // 171
		});                                                                                                                 // 172
		return false;                                                                                                       // 173
	},                                                                                                                   // 174
	"click a.deleteMinutes": function (e) {                                                                              // 175
	    e.preventDefault();                                                                                              // 176
			bootbox.confirm(TAPi18n.__("Are you sure you want to delete this minutes ?"), function (result) {                  // 177
 			 if (result) {                                                                                                    // 178
 				 Meteor.call('deleteMinutes', e.currentTarget.dataset.minutesid);                                                // 179
 			 }                                                                                                                // 180
 		 	});                                                                                                              // 181
			return false;                                                                                                      // 182
	},                                                                                                                   // 183
	"click a.duplicateMinutes": function (e) {                                                                           // 184
	    e.preventDefault();                                                                                              // 185
	    Meteor.call('duplicateMinutes', e.currentTarget.dataset.minutesid, function (error, result) {                    // 186
				if (!error) {                                                                                                     // 187
					newId = result;                                                                                                  // 188
					Router.go("editMinutes", {_id: newId});                                                                          // 189
				}                                                                                                                 // 190
			});                                                                                                                // 191
			return false;                                                                                                      // 192
	},                                                                                                                   // 193
	"change #filterByProjectSelect": function (e) {                                                                      // 194
		e.preventDefault();                                                                                                 // 195
		if (e.target.value === "all") {                                                                                     // 196
			Router.go("minutes");                                                                                              // 197
		}                                                                                                                   // 198
		else {                                                                                                              // 199
			Router.go("minutes", {filterBy: 'project', filterVal: e.target.value});                                            // 200
		}                                                                                                                   // 201
		return false;                                                                                                       // 202
	},                                                                                                                   // 203
});                                                                                                                   // 204
                                                                                                                      // 205
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.editMinutes.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("editMinutes");                                                                                  // 2
Template["editMinutes"] = new Template("Template.editMinutes", (function() {                                          // 3
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
    return Spacebars.mustache(view.lookup("_"), "Edit Minutes");                                                      // 17
  }), "\n						", HTML.SPAN({                                                                                         // 18
    "class": "pull-right"                                                                                             // 19
  }, "\n							", HTML.A({                                                                                            // 20
    href: function() {                                                                                                // 21
      return Spacebars.mustache(view.lookup("pathFor"), "minutes");                                                   // 22
    },                                                                                                                // 23
    title: function() {                                                                                               // 24
      return Spacebars.mustache(view.lookup("_"), "Back to minutes list");                                            // 25
    }                                                                                                                 // 26
  }, Blaze.View("lookup:_", function() {                                                                              // 27
    return Spacebars.mustache(view.lookup("_"), "Back to minutes list");                                              // 28
  })), "\n							", HTML.A({                                                                                          // 29
    href: function() {                                                                                                // 30
      return Spacebars.mustache(view.lookup("pathFor"), "printMinutes", Spacebars.kw({                                // 31
        _id: Spacebars.dot(view.lookup("currentMinutes"), "_id")                                                      // 32
      }));                                                                                                            // 33
    },                                                                                                                // 34
    title: function() {                                                                                               // 35
      return Spacebars.mustache(view.lookup("_"), "Print");                                                           // 36
    }                                                                                                                 // 37
  }, HTML.Raw('<span class="glyphicon glyphicon-print" aria-hidden="true"></span>')), "\n							", HTML.A({           // 38
    href: "#",                                                                                                        // 39
    "class": "generatePDF",                                                                                           // 40
    "data-minutesid": function() {                                                                                    // 41
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "_id"));                                 // 42
    },                                                                                                                // 43
    title: function() {                                                                                               // 44
      return Spacebars.mustache(view.lookup("_"), "Save as a pdf file to predefined server location");                // 45
    }                                                                                                                 // 46
  }, HTML.Raw('<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>')), "\n						"), "\n					"), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                             // 48
  }, "\n					", HTML.FORM({                                                                                           // 49
    id: "editTaskForm"                                                                                                // 50
  }, "\n						", HTML.DIV({                                                                                           // 51
    "class": "row"                                                                                                    // 52
  }, "\n							", HTML.DIV({                                                                                          // 53
    "class": "col-md-12"                                                                                              // 54
  }, "\n								", HTML.DIV({                                                                                         // 55
    "class": "form-group"                                                                                             // 56
  }, "\n									", HTML.LABEL({                                                                                      // 57
    "for": "location"                                                                                                 // 58
  }, Blaze.View("lookup:_", function() {                                                                              // 59
    return Spacebars.mustache(view.lookup("_"), "Location");                                                          // 60
  })), "\n									", HTML.INPUT({                                                                                    // 61
    type: "text",                                                                                                     // 62
    "class": "form-control",                                                                                          // 63
    id: "location",                                                                                                   // 64
    placeholder: function() {                                                                                         // 65
      return Spacebars.mustache(view.lookup("_"), "Location");                                                        // 66
    },                                                                                                                // 67
    value: function() {                                                                                               // 68
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "location"));                            // 69
    }                                                                                                                 // 70
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 71
    "class": "form-group"                                                                                             // 72
  }, "\n									", HTML.LABEL({                                                                                      // 73
    "for": "minutesDate"                                                                                              // 74
  }, Blaze.View("lookup:_", function() {                                                                              // 75
    return Spacebars.mustache(view.lookup("_"), "Date");                                                              // 76
  })), "\n									", HTML.INPUT({                                                                                    // 77
    type: "text",                                                                                                     // 78
    "class": "form-control",                                                                                          // 79
    id: "minutesDate",                                                                                                // 80
    placeholder: function() {                                                                                         // 81
      return Spacebars.mustache(view.lookup("_"), "Date");                                                            // 82
    },                                                                                                                // 83
    value: function() {                                                                                               // 84
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesDate"));                         // 85
    }                                                                                                                 // 86
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 87
    "class": "form-group"                                                                                             // 88
  }, "\n									", HTML.LABEL({                                                                                      // 89
    "for": "author"                                                                                                   // 90
  }, Blaze.View("lookup:_", function() {                                                                              // 91
    return Spacebars.mustache(view.lookup("_"), "Author");                                                            // 92
  })), "\n									", HTML.INPUT({                                                                                    // 93
    type: "text",                                                                                                     // 94
    "class": "form-control",                                                                                          // 95
    id: "author",                                                                                                     // 96
    placeholder: function() {                                                                                         // 97
      return Spacebars.mustache(view.lookup("_"), "Author");                                                          // 98
    },                                                                                                                // 99
    value: function() {                                                                                               // 100
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "author"));                              // 101
    }                                                                                                                 // 102
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 103
    "class": "form-group"                                                                                             // 104
  }, "\n									", HTML.LABEL({                                                                                      // 105
    "for": "attendeesPresent"                                                                                         // 106
  }, Blaze.View("lookup:_", function() {                                                                              // 107
    return Spacebars.mustache(view.lookup("_"), "Attendees");                                                         // 108
  })), "\n									", HTML.INPUT({                                                                                    // 109
    type: "text",                                                                                                     // 110
    "class": "form-control",                                                                                          // 111
    id: "attendeesPresent",                                                                                           // 112
    placeholder: function() {                                                                                         // 113
      return Spacebars.mustache(view.lookup("_"), "Attendees");                                                       // 114
    },                                                                                                                // 115
    value: function() {                                                                                               // 116
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "attendeesPresent"));                    // 117
    }                                                                                                                 // 118
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 119
    "class": "form-group"                                                                                             // 120
  }, "\n									", HTML.LABEL({                                                                                      // 121
    "for": "recipients"                                                                                               // 122
  }, Blaze.View("lookup:_", function() {                                                                              // 123
    return Spacebars.mustache(view.lookup("_"), "Recipients");                                                        // 124
  })), "\n									", HTML.INPUT({                                                                                    // 125
    type: "text",                                                                                                     // 126
    "class": "form-control",                                                                                          // 127
    id: "recipients",                                                                                                 // 128
    placeholder: function() {                                                                                         // 129
      return Spacebars.mustache(view.lookup("_"), "Recipients");                                                      // 130
    },                                                                                                                // 131
    value: function() {                                                                                               // 132
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "recipients"));                          // 133
    }                                                                                                                 // 134
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 135
    "class": "form-group"                                                                                             // 136
  }, "\n									", HTML.LABEL({                                                                                      // 137
    "for": "objective"                                                                                                // 138
  }, Blaze.View("lookup:_", function() {                                                                              // 139
    return Spacebars.mustache(view.lookup("_"), "Objective");                                                         // 140
  })), "\n									", HTML.INPUT({                                                                                    // 141
    type: "text",                                                                                                     // 142
    "class": "form-control",                                                                                          // 143
    id: "objective",                                                                                                  // 144
    placeholder: function() {                                                                                         // 145
      return Spacebars.mustache(view.lookup("_"), "Objective");                                                       // 146
    },                                                                                                                // 147
    value: function() {                                                                                               // 148
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "objective"));                           // 149
    }                                                                                                                 // 150
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 151
    "class": "form-group"                                                                                             // 152
  }, "\n									", HTML.LABEL({                                                                                      // 153
    "for": "minutesTitle"                                                                                             // 154
  }, Blaze.View("lookup:_", function() {                                                                              // 155
    return Spacebars.mustache(view.lookup("_"), "Title");                                                             // 156
  })), "\n									", HTML.INPUT({                                                                                    // 157
    type: "text",                                                                                                     // 158
    "class": "form-control",                                                                                          // 159
    id: "minutesTitle",                                                                                               // 160
    placeholder: function() {                                                                                         // 161
      return Spacebars.mustache(view.lookup("_"), "Title");                                                           // 162
    },                                                                                                                // 163
    value: function() {                                                                                               // 164
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesTitle"));                        // 165
    }                                                                                                                 // 166
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 167
    "class": "form-group"                                                                                             // 168
  }, "\n									", HTML.LABEL({                                                                                      // 169
    "for": "minutesName"                                                                                              // 170
  }, Blaze.View("lookup:_", function() {                                                                              // 171
    return Spacebars.mustache(view.lookup("_"), "Name");                                                              // 172
  })), "\n									", HTML.INPUT({                                                                                    // 173
    type: "text",                                                                                                     // 174
    "class": "form-control",                                                                                          // 175
    id: "minutesName",                                                                                                // 176
    placeholder: function() {                                                                                         // 177
      return [ Spacebars.mustache(view.lookup("prefixMinutes")), "-" ];                                               // 178
    },                                                                                                                // 179
    value: function() {                                                                                               // 180
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesName"));                         // 181
    }                                                                                                                 // 182
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 183
    "class": "form-group"                                                                                             // 184
  }, "\n									", HTML.LABEL({                                                                                      // 185
    "for": "minutesContent"                                                                                           // 186
  }, Blaze.View("lookup:_", function() {                                                                              // 187
    return Spacebars.mustache(view.lookup("_"), "Text");                                                              // 188
  })), "\n									", HTML.TEXTAREA({                                                                                 // 189
    "class": "form-control",                                                                                          // 190
    id: "minutesContent",                                                                                             // 191
    placeholder: function() {                                                                                         // 192
      return Spacebars.mustache(view.lookup("_"), "Text");                                                            // 193
    },                                                                                                                // 194
    rows: "3",                                                                                                        // 195
    value: function() {                                                                                               // 196
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesContent"));                      // 197
    }                                                                                                                 // 198
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 199
    "class": "form-group"                                                                                             // 200
  }, "\n									", HTML.LABEL({                                                                                      // 201
    "for": "projects"                                                                                                 // 202
  }, Blaze.View("lookup:_", function() {                                                                              // 203
    return Spacebars.mustache(view.lookup("_"), "Projects");                                                          // 204
  })), "\n									", HTML.INPUT({                                                                                    // 205
    type: "text",                                                                                                     // 206
    "class": "form-control",                                                                                          // 207
    id: "projects",                                                                                                   // 208
    placeholder: function() {                                                                                         // 209
      return Spacebars.mustache(view.lookup("_"), "projects");                                                        // 210
    },                                                                                                                // 211
    value: function() {                                                                                               // 212
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "projects"));                            // 213
    }                                                                                                                 // 214
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 215
    "class": "form-group"                                                                                             // 216
  }, "\n									", HTML.LABEL({                                                                                      // 217
    "for": "action"                                                                                                   // 218
  }, Blaze.View("lookup:_", function() {                                                                              // 219
    return Spacebars.mustache(view.lookup("_"), "Projects");                                                          // 220
  })), "\n									", Blaze.Each(function() {                                                                         // 221
    return Spacebars.call(view.lookup("Projects"));                                                                   // 222
  }, function() {                                                                                                     // 223
    return [ "\n									", HTML.DIV({                                                                                // 224
      "class": "checkbox"                                                                                             // 225
    }, "\n										", HTML.LABEL("\n											", HTML.INPUT({                                                       // 226
      type: "checkbox",                                                                                               // 227
      "class": "projectName",                                                                                         // 228
      value: function() {                                                                                             // 229
        return Spacebars.mustache(view.lookup("_id"));                                                                // 230
      },                                                                                                              // 231
      checked: function() {                                                                                           // 232
        return Spacebars.mustache(view.lookup("isProjectChecked"), Spacebars.dot(view.lookup(".."), "currentMinutes", "projectsIds"), view.lookup("_id"));
      }                                                                                                               // 234
    }), "\n											", Blaze.View("lookup:projectName", function() {                                                // 235
      return Spacebars.mustache(view.lookup("projectName"));                                                          // 236
    }), "\n										"), "\n									"), "\n									" ];                                                             // 237
  }, function() {                                                                                                     // 238
    return [ "\n										", HTML.P("Nothing to show for the moment"), "\n									" ];                               // 239
  }), "\n								"), "\n								", HTML.DIV({                                                                         // 240
    "class": "form-group"                                                                                             // 241
  }, "\n									", HTML.LABEL({                                                                                      // 242
    "for": "tags"                                                                                                     // 243
  }, Blaze.View("lookup:_", function() {                                                                              // 244
    return Spacebars.mustache(view.lookup("_"), "Tags");                                                              // 245
  })), "\n									", HTML.INPUT({                                                                                    // 246
    type: "text",                                                                                                     // 247
    "class": "form-control",                                                                                          // 248
    id: "tags",                                                                                                       // 249
    placeholder: function() {                                                                                         // 250
      return Spacebars.mustache(view.lookup("_"), "Tags");                                                            // 251
    },                                                                                                                // 252
    value: function() {                                                                                               // 253
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "tags"));                                // 254
    }                                                                                                                 // 255
  }), "\n					    	"), "\n								", HTML.DIV({                                                                       // 256
    "class": "form-group"                                                                                             // 257
  }, "\n									", HTML.LABEL({                                                                                      // 258
    "for": "tasksTable"                                                                                               // 259
  }, Blaze.View("lookup:_", function() {                                                                              // 260
    return Spacebars.mustache(view.lookup("_"), "New tasks");                                                         // 261
  })), "\n									", HTML.Raw('<div id="myHandsonTableDiv"></div>'), "\n									", HTML.Raw('<p class="help-block">Les tâches déjà liées à ce PV sont rapellées ci-dessous</p>'), "\n								"), "\n							"), " ", HTML.Raw("<!-- End of col -->"), "\n						"), "\n						", HTML.DIV({
    "class": "row"                                                                                                    // 263
  }, "\n							", HTML.DIV({                                                                                          // 264
    "class": "col-md-12"                                                                                              // 265
  }, "\n					  		", HTML.Raw('<!-- <button type="submit" class="btn btn-primary" name="submitButton" value="saveAndStayButton">{{_ "Save"}}</button>-->'), "\n								", HTML.BUTTON({
    type: "submit",                                                                                                   // 267
    "class": "btn btn-primary"                                                                                        // 268
  }, Blaze.View("lookup:_", function() {                                                                              // 269
    return Spacebars.mustache(view.lookup("_"), "Save and go back to minutes list");                                  // 270
  })), "\n							"), "\n						"), "\n				  "), "\n					", HTML.Raw('<div class="row">\n						<div class="col-md-12">\n\n						</div>\n					</div>'), "\n\n    		"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({
    "class": "row"                                                                                                    // 272
  }, "\n		", HTML.DIV({                                                                                               // 273
    "class": "col-md-12"                                                                                              // 274
  }, "\n			 ", HTML.DIV({                                                                                             // 275
    "class": "panel panel-default"                                                                                    // 276
  }, "\n			 	", HTML.DIV({                                                                                            // 277
    "class": "panel-heading",                                                                                         // 278
    style: "position:relative"                                                                                        // 279
  }, "\n			 		", HTML.H3({                                                                                            // 280
    "class": "panel-title"                                                                                            // 281
  }, Blaze.View("lookup:_", function() {                                                                              // 282
    return Spacebars.mustache(view.lookup("_"), "Linked tasks");                                                      // 283
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 284
    "class": "panel-body"                                                                                             // 285
  }, "\n					", HTML.DIV({                                                                                            // 286
    "class": "row"                                                                                                    // 287
  }, "\n						", HTML.DIV({                                                                                           // 288
    "class": "col-md-12"                                                                                              // 289
  }, "\n							", Blaze.If(function() {                                                                               // 290
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 291
  }, function() {                                                                                                     // 292
    return [ "\n								", HTML.DIV({                                                                                 // 293
      "class": "tableScroll"                                                                                          // 294
    }, "\n									", Blaze._TemplateWith(function() {                                                                // 295
      return {                                                                                                        // 296
        collection: Spacebars.call(view.lookup("Tasks")),                                                             // 297
        settings: Spacebars.call(view.lookup("settingsTasks"))                                                        // 298
      };                                                                                                              // 299
    }, function() {                                                                                                   // 300
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 301
    }), "\n								"), "\n							" ];                                                                                 // 302
  }, function() {                                                                                                     // 303
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                                 // 304
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 305
    })), "\n							" ];                                                                                               // 306
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	"), "\n\n	", HTML.DIV({                              // 307
    "class": "row"                                                                                                    // 308
  }, "\n		", HTML.DIV({                                                                                               // 309
    "class": "col-md-12"                                                                                              // 310
  }, "\n			 ", HTML.DIV({                                                                                             // 311
    "class": "panel panel-default"                                                                                    // 312
  }, "\n			 	", HTML.DIV({                                                                                            // 313
    "class": "panel-heading",                                                                                         // 314
    style: "position:relative"                                                                                        // 315
  }, "\n			 		", HTML.H3({                                                                                            // 316
    "class": "panel-title"                                                                                            // 317
  }, Blaze.View("lookup:_", function() {                                                                              // 318
    return Spacebars.mustache(view.lookup("_"), "Other informations");                                                // 319
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 320
    "class": "panel-body"                                                                                             // 321
  }, "\n					", HTML.DIV({                                                                                            // 322
    "class": "row"                                                                                                    // 323
  }, "\n						", HTML.DIV({                                                                                           // 324
    "class": "col-md-12"                                                                                              // 325
  }, "\n							", HTML.DIV({                                                                                          // 326
    "class": "form-group"                                                                                             // 327
  }, "\n								", HTML.LABEL({                                                                                       // 328
    "for": "addedDate"                                                                                                // 329
  }, Blaze.View("lookup:_", function() {                                                                              // 330
    return Spacebars.mustache(view.lookup("_"), "Added date");                                                        // 331
  })), "\n								", HTML.INPUT({                                                                                     // 332
    type: "text",                                                                                                     // 333
    "class": "form-control",                                                                                          // 334
    id: "addedDate",                                                                                                  // 335
    value: function() {                                                                                               // 336
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "addedDate"));                           // 337
    },                                                                                                                // 338
    disabled: ""                                                                                                      // 339
  }), "\n							"), "\n							", HTML.DIV({                                                                           // 340
    "class": "form-group"                                                                                             // 341
  }, "\n								", HTML.LABEL({                                                                                       // 342
    "for": "addedBy"                                                                                                  // 343
  }, Blaze.View("lookup:_", function() {                                                                              // 344
    return Spacebars.mustache(view.lookup("_"), "Added by");                                                          // 345
  })), "\n								", HTML.INPUT({                                                                                     // 346
    type: "text",                                                                                                     // 347
    "class": "form-control",                                                                                          // 348
    id: "addedBy",                                                                                                    // 349
    value: function() {                                                                                               // 350
      return Spacebars.mustache(view.lookup("author"));                                                               // 351
    },                                                                                                                // 352
    disabled: ""                                                                                                      // 353
  }), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n		"), "\n	") ];                                  // 354
}));                                                                                                                  // 355
                                                                                                                      // 356
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/editMinutes.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.editMinutes.rendered = function () {                                                                         // 1
	var columns = [                                                                                                      // 2
		{                                                                                                                   // 3
			data: 'actionee',                                                                                                  // 4
		},                                                                                                                  // 5
  	{data: 'scheduledEndDate'},                                                                                        // 6
  	{data: 'taskContent'},                                                                                             // 7
  ];                                                                                                                  // 8
                                                                                                                      // 9
  var colHeadersText = [];                                                                                            // 10
                                                                                                                      // 11
  var colHeaders = [];                                                                                                // 12
  var arrayLength = columns.length;                                                                                   // 13
  var i;                                                                                                              // 14
                                                                                                                      // 15
  var demoData = [                                                                                                    // 16
      {scheduledEndDate: "", taskContent: "", actionee: ""},                                                          // 17
  		{scheduledEndDate: "", taskContent: "", actionee: ""},                                                            // 18
  ];                                                                                                                  // 19
                                                                                                                      // 20
  var $container = $("#myHandsonTableDiv");                                                                           // 21
                                                                                                                      // 22
  colHeadersText.scheduledEndDate = TAPi18n.__("Scheduled end date");                                                 // 23
  colHeadersText.taskContent = TAPi18n.__("Task");                                                                    // 24
  colHeadersText.actionee = TAPi18n.__("Actionee");                                                                   // 25
                                                                                                                      // 26
  for (i = 0; i < arrayLength; i++) {                                                                                 // 27
    colHeaders.push(colHeadersText[columns[i].data]);                                                                 // 28
  }                                                                                                                   // 29
                                                                                                                      // 30
  $container.handsontable({                                                                                           // 31
    data: demoData,                                                                                                   // 32
    colHeaders: colHeaders,                                                                                           // 33
    columns: columns,                                                                                                 // 34
    rowHeaders: false,                                                                                                // 35
    minSpareRows: 1,                                                                                                  // 36
		stretchH: "all",                                                                                                    // 37
		colWidths: [20, 20, 100],                                                                                           // 38
    contextMenu: true,                                                                                                // 39
  });                                                                                                                 // 40
                                                                                                                      // 41
	RKCore.log(this.data);                                                                                               // 42
                                                                                                                      // 43
	if (typeof($('#tags').val()) !== 'undefined') {                                                                      // 44
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 45
	}                                                                                                                    // 46
	$('#tags').tagsinput({                                                                                               // 47
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 48
	});                                                                                                                  // 49
                                                                                                                      // 50
	if (typeof($('#projects').val()) !== 'undefined') {                                                                  // 51
		$('#projects').val($('#projects').val().replace(/;/g, ','));                                                        // 52
	}                                                                                                                    // 53
	$('#projects').tagsinput({                                                                                           // 54
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 55
	});                                                                                                                  // 56
                                                                                                                      // 57
	Meteor.typeahead.inject();                                                                                           // 58
                                                                                                                      // 59
	CKEDITOR.replace('minutesContent');                                                                                  // 60
};                                                                                                                    // 61
                                                                                                                      // 62
Template.editMinutes.helpers({                                                                                        // 63
	isProjectChecked: function (projectsIds, projectId) {                                                                // 64
		if (projectsIds.indexOf(projectId) < 0) {                                                                           // 65
			return false;                                                                                                      // 66
		}                                                                                                                   // 67
		return "checked";                                                                                                   // 68
	},                                                                                                                   // 69
	prefixMinutes: function () {                                                                                         // 70
		var prefixMinutes = SettingsRKTasks.findOne({name: "prefixMinutes"});                                               // 71
		if (typeof(prefixMinutes) !== 'undefined') {                                                                        // 72
			return prefixMinutes.value;                                                                                        // 73
		}                                                                                                                   // 74
		return "DOC";                                                                                                       // 75
	},                                                                                                                   // 76
	listActionee: function () {                                                                                          // 77
		//var usernames = ["aa", "bb"];                                                                                     // 78
		return this.data.usernames;                                                                                         // 79
	},                                                                                                                   // 80
	author: function () {                                                                                                // 81
		return Members.collection.findOne({accountId: this.currentMinutes.addedBy}).profile.nickname;                       // 82
	},                                                                                                                   // 83
	Projects: function () {                                                                                              // 84
		var myProjects = [];                                                                                                // 85
		myProjects = Projects.find({}).fetch(); //to do get only ProcessStep                                                // 86
    return myProjects;                                                                                                // 87
  },                                                                                                                  // 88
	Tasks: function () {                                                                                                 // 89
	  return Tasks.find({}).fetch(); // filtered in publication                                                          // 90
	},                                                                                                                   // 91
	settingsTasks: function () {                                                                                         // 92
    return {                                                                                                          // 93
			rowsPerPage: 10,                                                                                                   // 94
			showFilter: true,                                                                                                  // 95
			showColumnToggles: true,                                                                                           // 96
			showNavigation: 'auto',                                                                                            // 97
      class: 'table table-condensed col-sm-12',                                                                       // 98
			fields: [                                                                                                          // 99
				{                                                                                                                 // 100
					key: 'actioneeIds',                                                                                              // 101
					label: TAPi18n.__("Actionee"),                                                                                   // 102
					fn: function (value, object) {                                                                                   // 103
            var i;                                                                                                    // 104
            var val = '';                                                                                             // 105
            var n;                                                                                                    // 106
            var actioneeId;                                                                                           // 107
            if (value) {                                                                                              // 108
              n = value.length;                                                                                       // 109
              for (i = 0; i < n; i++) {                                                                               // 110
                actioneeId = value[i];                                                                                // 111
                member = Members.collection.findOne(actioneeId);                                                      // 112
                if (typeof(member) !== 'undefined') {                                                                 // 113
                  val = val + "<span class='label label-info'>" + member.profile.nickname + "</span> ";               // 114
                }                                                                                                     // 115
              }                                                                                                       // 116
            }                                                                                                         // 117
						if (object.actionee) {                                                                                          // 118
							val2 = object.actionee.replace(/;/g, ',');                                                                     // 119
			        actionee = val2.split(',');                                                                                // 120
              n = actionee.length;                                                                                    // 121
              for (i = 0; i < n; i++) {                                                                               // 122
                actioneeId = actionee[i];                                                                             // 123
                val = val + "<span class='label label-info'>" + actionee[i] + "</span> ";                             // 124
                }                                                                                                     // 125
              val = val.trim();                                                                                       // 126
              }                                                                                                       // 127
						return new Spacebars.SafeString(val);                                                                           // 128
					},                                                                                                               // 129
				},                                                                                                                // 130
				{                                                                                                                 // 131
					key: 'scheduledEndDate',                                                                                         // 132
					label: TAPi18n.__("Scheduled end date"),                                                                         // 133
				},                                                                                                                // 134
				{                                                                                                                 // 135
					key: 'taskContent',                                                                                              // 136
					label: TAPi18n.__("Task"),                                                                                       // 137
					fn: function (value) {                                                                                           // 138
						//var val = '<p class="editable" data-type="textarea" data-placeholder="Enter text" data-emptytext="Click to enter text" data-rows="4">' + value + '</p>';
						return new Spacebars.SafeString(value);                                                                         // 140
					},                                                                                                               // 141
				},                                                                                                                // 142
				{                                                                                                                 // 143
					key: 'actions',                                                                                                  // 144
					label: 'Actions',                                                                                                // 145
					fn: function (value, object) {                                                                                   // 146
						var markAsDoneLink = ' <a href="#" title="' + TAPi18n.__('Mark as done') + '" class="markAsDone" '              // 147
							+ 'data-taskid="' +	object._id + '"'                                                                           // 148
							+ '>' +                                                                                                        // 149
							'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +                                            // 150
							'</a> ';                                                                                                       // 151
						if (object.additionalText) {                                                                                    // 152
							//additionalText = getTruncatedTaskAdditionalText("#", object.additionalText) + ' '; //todo : remove html      // 153
              additionalTextLink = '<a href="#"'                                                                      // 154
  							+ ' class="showTaskAdditionalText" title="' + TAPi18n.__('Show follow-up') + '"'                             // 155
  							+ ' data-taskid="' +	object._id + '"'                                                                        // 156
  							+ '>[...]</a> ';                                                                                             // 157
						}                                                                                                               // 158
						var editLink = '<a href="' +                                                                                    // 159
							Router.routes.editTask.path({_id: object._id, filterBy: Router.current().params.filterBy, filterVal: Router.current().params.filterVal})
							+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 161
							//+ ' data-wheretocomeback="' +	Router.current().params + '"'                                                  // 162
							+ '>'                                                                                                          // 163
							+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                      // 164
							'</a> ';                                                                                                       // 165
						var duplicateLink = '<a href="#"'                                                                               // 166
							+ ' class="duplicateTask" title="' + TAPi18n.__('Duplicate') + '"'                                             // 167
							+ ' data-taskid="' +	object._id + '"'                                                                          // 168
							+ '>'                                                                                                          // 169
							+ '<span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>' +                                   // 170
							'</a> ';                                                                                                       // 171
						var deleteLink = ' <a href="#" title="' + TAPi18n.__('Delete') + '" class="deleteTask" '                        // 172
							+ 'data-taskid="' +	object._id + '"'                                                                           // 173
							+ '>' +                                                                                                        // 174
							'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +                                         // 175
							'</a> ';                                                                                                       // 176
						return new Spacebars.SafeString(markAsDoneLink + additionalTextLink + editLink + duplicateLink + deleteLink);   // 177
					},                                                                                                               // 178
				},                                                                                                                // 179
			],                                                                                                                 // 180
		};                                                                                                                  // 181
	},                                                                                                                   // 182
});                                                                                                                   // 183
                                                                                                                      // 184
Template.editMinutes.events({                                                                                         // 185
	'submit form': function (e) {                                                                                        // 186
		var data = {};                                                                                                      // 187
		var projectsIds = [];                                                                                               // 188
		var hotInstance = $("#myHandsonTableDiv").handsontable('getInstance');                                              // 189
	  e.preventDefault();                                                                                                // 190
		data.minutesId = this.currentMinutes._id;                                                                           // 191
		//data.stepNumber = e.target.stepNumber.value;                                                                      // 192
		data.location = e.target.location.value;                                                                            // 193
		data.minutesDate = e.target.minutesDate.value;                                                                      // 194
		data.author = e.target.author.value;                                                                                // 195
		data.recipients = e.target.recipients.value;                                                                        // 196
		data.attendeesPresent = e.target.attendeesPresent.value;                                                            // 197
		data.objective = e.target.objective.value;                                                                          // 198
		data.minutesName = e.target.minutesName.value;                                                                      // 199
		data.minutesTitle = e.target.minutesTitle.value;                                                                    // 200
		data.minutesContent = e.target.minutesContent.value;                                                                // 201
		data.tags = e.target.tags.value;                                                                                    // 202
		data.projects = e.target.projects.value;                                                                            // 203
		$("input:checkbox.projectName[type=checkbox]:checked").each(function () {                                           // 204
			projectsIds.push($(this).val());                                                                                   // 205
		});                                                                                                                 // 206
		data.projectsIds = projectsIds;                                                                                     // 207
                                                                                                                      // 208
		data.minutesContentNoHTML = $("<div/>").html(e.target.minutesContent.value).text();                                 // 209
		data.projectsNoHTML = $("<div/>").html(e.target.projects.value).text();                                             // 210
		data.tagsNoHTML = $("<div/>").html(e.target.tags.value).text();                                                     // 211
		data.dataTaskTable = hotInstance.getData();                                                                         // 212
                                                                                                                      // 213
		RKCore.log(data);                                                                                                   // 214
	  Meteor.call('updateMinutes', data, function (error) {                                                              // 215
			if (!error) {                                                                                                      // 216
				if (typeof(toastr) !== 'undefined') {                                                                             // 217
					toastr.success('The minutes has been updated successfully');                                                     // 218
				}                                                                                                                 // 219
				if (typeof Router.current().params.filterBy !== 'undefined') {                                                    // 220
					Router.go("minutes", {                                                                                           // 221
						filterBy: Router.current().params.filterBy,                                                                     // 222
						filterVal: Router.current().params.filterVal,                                                                   // 223
					});                                                                                                              // 224
				}                                                                                                                 // 225
				else {                                                                                                            // 226
					Router.go("minutes");                                                                                            // 227
				}                                                                                                                 // 228
			}                                                                                                                  // 229
		});                                                                                                                 // 230
		return false;                                                                                                       // 231
	},                                                                                                                   // 232
	"click a.generatePDF": function (e) {                                                                                // 233
		var data = {};                                                                                                      // 234
    e.preventDefault();                                                                                               // 235
		data.url = Router.routes.printMinutes.url({_id: e.currentTarget.dataset.minutesid});                                // 236
		data.fileName = this.currentMinutes.minutesName + '.pdf';                                                           // 237
    Meteor.call('generatePDF', data, function (err, res) {                                                            // 238
			if (!err) {                                                                                                        // 239
				if (typeof(toastr) !== 'undefined') {                                                                             // 240
					filePath = res;                                                                                                  // 241
					toastr.success(TAPi18n.__('The minutes has been saved to') + ' : ' + filePath);                                  // 242
				}                                                                                                                 // 243
				return false;                                                                                                     // 244
			}                                                                                                                  // 245
		});                                                                                                                 // 246
		return false;                                                                                                       // 247
	},                                                                                                                   // 248
	"click a.delete": function (e) {                                                                                     // 249
    e.preventDefault();                                                                                               // 250
		bootbox.confirm(TAPi18n.__("Are you sure you want to delete this minutes ?"), function (result) {                   // 251
		 if (result) {                                                                                                      // 252
			 Meteor.call('deleteMinutes', this._id, function () {});                                                           // 253
		 }                                                                                                                  // 254
		});                                                                                                                 // 255
		return false;                                                                                                       // 256
	},                                                                                                                   // 257
	"click a.markAsDone": function (e) {                                                                                 // 258
    e.preventDefault();                                                                                               // 259
    Meteor.call('markAsDone', e.currentTarget.dataset.taskid);                                                        // 260
		return false;                                                                                                       // 261
	},                                                                                                                   // 262
	"click a.showTaskAdditionalText": function (e) {                                                                     // 263
    var taskId = e.currentTarget.dataset.taskid;                                                                      // 264
	  e.preventDefault();                                                                                                // 265
    myTask = Tasks.findOne(taskId);                                                                                   // 266
    bootbox.dialog({                                                                                                  // 267
      title: myTask.taskContent,                                                                                      // 268
      message: myTask.additionalText,                                                                                 // 269
    });                                                                                                               // 270
		return false;                                                                                                       // 271
	},                                                                                                                   // 272
	"click a.duplicateTask": function (e) {                                                                              // 273
    e.preventDefault();                                                                                               // 274
    Meteor.call('duplicateTask', e.currentTarget.dataset.taskid, function (error, result) {                           // 275
			if (!error) {                                                                                                      // 276
				if (typeof(toastr) !== 'undefined') {                                                                             // 277
					toastr.success(TAPi18n.__('The task has been duplicated successfully. Please edit the task and save.'));         // 278
				}                                                                                                                 // 279
				newTaskId = result;                                                                                               // 280
				Router.go("editTask", {_id: newTaskId});                                                                          // 281
			}                                                                                                                  // 282
		});                                                                                                                 // 283
		return false;                                                                                                       // 284
	},                                                                                                                   // 285
	"click a.deleteTask": function (e) {                                                                                 // 286
    e.preventDefault();                                                                                               // 287
		bootbox.confirm(TAPi18n.__("Are you sure you want to delete this task ?"), function (result) {                      // 288
		 if (result) {                                                                                                      // 289
			 Meteor.call('deleteTask', e.currentTarget.dataset.taskid);                                                        // 290
		 }                                                                                                                  // 291
		});                                                                                                                 // 292
		return false;                                                                                                       // 293
	},                                                                                                                   // 294
});                                                                                                                   // 295
                                                                                                                      // 296
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.printMinutes.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("printMinutes");                                                                                 // 2
Template["printMinutes"] = new Template("Template.printMinutes", (function() {                                        // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "page"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "row"                                                                                                    // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "col-md-12"                                                                                              // 10
  }, "\n				 	", HTML.H3(Blaze.View("lookup:_", function() {                                                          // 11
    return Spacebars.mustache(view.lookup("_"), "Minutes");                                                           // 12
  }), " ", Blaze.If(function() {                                                                                      // 13
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "minutesName"));                               // 14
  }, function() {                                                                                                     // 15
    return [ " : ", Blaze.View("lookup:currentMinutes.minutesName", function() {                                      // 16
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesName"));                         // 17
    }) ];                                                                                                             // 18
  }), HTML.SPAN({                                                                                                     // 19
    "class": "pull-right"                                                                                             // 20
  }, HTML.IMG({                                                                                                       // 21
    src: function() {                                                                                                 // 22
      return Spacebars.mustache(view.lookup("companyLogo"));                                                          // 23
    }                                                                                                                 // 24
  }))), "\n						", HTML.DIV({                                                                                        // 25
    "class": "row"                                                                                                    // 26
  }, "\n							", HTML.DIV({                                                                                          // 27
    "class": "col-md-12"                                                                                              // 28
  }, "\n								", HTML.TABLE({                                                                                       // 29
    "class": "table table-striped"                                                                                    // 30
  }, "\n								", Blaze.If(function() {                                                                              // 31
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "location"));                                  // 32
  }, function() {                                                                                                     // 33
    return [ "\n	  						", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                        // 34
      return Spacebars.mustache(view.lookup("_"), "Location");                                                        // 35
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.location", function() {                             // 36
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "location"));                            // 37
    })), "\n								"), "\n								" ];                                                                               // 38
  }), "\n								", Blaze.If(function() {                                                                             // 39
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "minutesDate"));                               // 40
  }, function() {                                                                                                     // 41
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 42
      return Spacebars.mustache(view.lookup("_"), "Date");                                                            // 43
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.minutesDate", function() {                          // 44
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesDate"));                         // 45
    })), "\n								"), "\n								" ];                                                                               // 46
  }), "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                                // 47
    return Spacebars.mustache(view.lookup("_"), "Author");                                                            // 48
  })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.author", function() {                                 // 49
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "author"));                                // 50
  })), "\n								"), "\n								", Blaze.If(function() {                                                             // 51
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "attendeesPresent"));                          // 52
  }, function() {                                                                                                     // 53
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 54
      return Spacebars.mustache(view.lookup("_"), "Attendees");                                                       // 55
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.attendeesPresent", function() {                     // 56
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "attendeesPresent"));                    // 57
    })), "\n								"), "\n								" ];                                                                               // 58
  }), "\n								", Blaze.If(function() {                                                                             // 59
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "attendeesPresent"));                          // 60
  }, function() {                                                                                                     // 61
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 62
      return Spacebars.mustache(view.lookup("_"), "Recipients");                                                      // 63
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.recipients", function() {                           // 64
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "recipients"));                          // 65
    })), "\n								"), "\n								" ];                                                                               // 66
  }), "\n								", Blaze.If(function() {                                                                             // 67
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "objective"));                                 // 68
  }, function() {                                                                                                     // 69
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 70
      return Spacebars.mustache(view.lookup("_"), "Objective");                                                       // 71
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.objective", function() {                            // 72
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "objective"));                           // 73
    })), "\n								"), "\n								" ];                                                                               // 74
  }), "\n								", Blaze.If(function() {                                                                             // 75
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "projects"));                                  // 76
  }, function() {                                                                                                     // 77
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 78
      return Spacebars.mustache(view.lookup("_"), "Projects");                                                        // 79
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.projects", function() {                             // 80
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "projects"));                            // 81
    })), "\n								"), "\n								" ];                                                                               // 82
  }), "\n								", Blaze.If(function() {                                                                             // 83
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "tags"));                                      // 84
  }, function() {                                                                                                     // 85
    return [ "\n								", HTML.TR("\n									", HTML.TD(Blaze.View("lookup:_", function() {                         // 86
      return Spacebars.mustache(view.lookup("_"), "Tags");                                                            // 87
    })), "\n									", HTML.TD(Blaze.View("lookup:currentMinutes.tags", function() {                                 // 88
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "tags"));                                // 89
    })), "\n								"), "\n								" ];                                                                               // 90
  }), "\n								"), "\n							"), "\n						"), "\n						", Blaze.If(function() {                                     // 91
    return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "minutesTitle"));                              // 92
  }, function() {                                                                                                     // 93
    return [ "\n						", HTML.DIV({                                                                                   // 94
      "class": "row"                                                                                                  // 95
    }, "\n							", HTML.DIV({                                                                                        // 96
      "class": "col-md-12"                                                                                            // 97
    }, "\n								", HTML.TABLE({                                                                                     // 98
      "class": "table table-bordered"                                                                                 // 99
    }, "\n	  						", HTML.TR(HTML.TH(Blaze.View("lookup:currentMinutes.minutesTitle", function() {                   // 100
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesTitle"));                        // 101
    }))), "\n								"), "\n							"), "\n						"), "\n						" ];                                                     // 102
  }), "\n						", HTML.DIV({                                                                                          // 103
    "class": "row"                                                                                                    // 104
  }, "\n							", HTML.DIV({                                                                                          // 105
    "class": "col-md-12"                                                                                              // 106
  }, "\n								", Blaze.View("lookup:minutesContent", function() {                                                   // 107
    return Spacebars.mustache(view.lookup("minutesContent"));                                                         // 108
  }), "\n							"), " ", HTML.Raw("<!-- End of col -->"), "\n						"), "\n						", HTML.DIV({                         // 109
    "class": "row"                                                                                                    // 110
  }, "\n							", HTML.DIV({                                                                                          // 111
    "class": "col-md-12"                                                                                              // 112
  }, "\n								", Blaze.If(function() {                                                                              // 113
    return Spacebars.call(view.lookup("Tasks"));                                                                      // 114
  }, function() {                                                                                                     // 115
    return [ "\n									", HTML.DIV({                                                                                // 116
      "class": "tablePrint"                                                                                           // 117
    }, "\n										", Blaze._TemplateWith(function() {                                                               // 118
      return {                                                                                                        // 119
        collection: Spacebars.call(view.lookup("Tasks")),                                                             // 120
        settings: Spacebars.call(view.lookup("settingsTasks"))                                                        // 121
      };                                                                                                              // 122
    }, function() {                                                                                                   // 123
      return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                 // 124
    }), "\n									"), "\n								" ];                                                                               // 125
  }, function() {                                                                                                     // 126
    return [ "\n									", HTML.P(Blaze.View("lookup:_", function() {                                                // 127
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                                  // 128
    })), "\n								" ];                                                                                              // 129
  }), "\n							"), "\n						"), "\n						", Blaze.If(function() {                                                    // 130
    return Spacebars.call(view.lookup("tasksDetails"));                                                               // 131
  }, function() {                                                                                                     // 132
    return [ "\n							", HTML.SPAN({                                                                                 // 133
      "class": "pull-right"                                                                                           // 134
    }, HTML.SPAN({                                                                                                    // 135
      "class": "glyphicon glyphicon-chevron-right",                                                                   // 136
      "aria-hidden": "true"                                                                                           // 137
    })), "\n						" ];                                                                                                // 138
  }), "\n			"), "\n		"), "\n	", Blaze.If(function() {                                                                 // 139
    return Spacebars.call(view.lookup("tasksDetails"));                                                               // 140
  }, function() {                                                                                                     // 141
    return [ "\n			", HTML.DIV({                                                                                      // 142
      "class": "pageBreakAfter"                                                                                       // 143
    }), "\n			", HTML.DIV({                                                                                           // 144
      "class": "marginTop"                                                                                            // 145
    }, "\n				", HTML.H3(Blaze.View("lookup:_", function() {                                                          // 146
      return Spacebars.mustache(view.lookup("_"), "Minutes");                                                         // 147
    }), " ", Blaze.If(function() {                                                                                    // 148
      return Spacebars.call(Spacebars.dot(view.lookup("currentMinutes"), "minutesName"));                             // 149
    }, function() {                                                                                                   // 150
      return [ " : ", Blaze.View("lookup:currentMinutes.minutesName", function() {                                    // 151
        return Spacebars.mustache(Spacebars.dot(view.lookup("currentMinutes"), "minutesName"));                       // 152
      }) ];                                                                                                           // 153
    })), "\n				", HTML.H4(Blaze.View("lookup:_", function() {                                                        // 154
      return Spacebars.mustache(view.lookup("_"), "Tasks details");                                                   // 155
    })), "\n				", Blaze.Each(function() {                                                                            // 156
      return Spacebars.call(view.lookup("tasksDetails"));                                                             // 157
    }, function() {                                                                                                   // 158
      return [ "\n					", HTML.H5(Blaze.View("lookup:taskContent", function() {                                       // 159
        return Spacebars.mustache(view.lookup("taskContent"));                                                        // 160
      })), "\n					", HTML.P(Blaze.View("lookup:additionalText", function() {                                         // 161
        return Spacebars.mustache(view.lookup("additionalText"));                                                     // 162
      })), "\n					", HTML.HR(), "\n				" ];                                                                          // 163
    }), "\n			"), "\n	" ];                                                                                            // 164
  }), "\n"), HTML.Raw(" <!--end of div page -->") ];                                                                  // 165
}));                                                                                                                  // 166
                                                                                                                      // 167
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/printMinutes.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.printMinutes.rendered = function () {                                                                        // 1
	RKCore.log(this.data);                                                                                               // 2
	document.title = this.data.currentMinutes.minutesName;                                                               // 3
                                                                                                                      // 4
	if (typeof($('#tags').val()) !== 'undefined') {                                                                      // 5
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 6
	}                                                                                                                    // 7
	$('#tags').tagsinput({                                                                                               // 8
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 9
	});                                                                                                                  // 10
                                                                                                                      // 11
	$('#projects').tagsinput({                                                                                           // 12
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 13
	});                                                                                                                  // 14
                                                                                                                      // 15
};                                                                                                                    // 16
                                                                                                                      // 17
Template.printMinutes.helpers({                                                                                       // 18
	listActionee: function () {                                                                                          // 19
		return this.data.usernames;                                                                                         // 20
	},                                                                                                                   // 21
	companyLogo: function () {                                                                                           // 22
		if (Meteor.settings.public.companyLogo) {                                                                           // 23
			return Meteor.settings.public.companyLogo;                                                                         // 24
	  }                                                                                                                  // 25
		return "/company/img/companylogo.png";                                                                              // 26
	},                                                                                                                   // 27
	minutesContent: function () {                                                                                        // 28
		return new Spacebars.SafeString(this.currentMinutes.minutesContent);                                                // 29
	},                                                                                                                   // 30
	author: function () {                                                                                                // 31
		return Members.collection.findOne({accountId: this.currentMinutes.addedBy}).profile.nickname;                       // 32
	},                                                                                                                   // 33
	tasksDetails: function () {                                                                                          // 34
		var i;                                                                                                              // 35
		var nTasks;                                                                                                         // 36
		var tasksDetails = [];                                                                                              // 37
	  tasks = Tasks.find({ minutesIds: this.currentMinutes._id }).fetch();                                               // 38
		nTasks = tasks.length;                                                                                              // 39
		for (i = 0; i < nTasks; i++) {                                                                                      // 40
	    RKCore.log(tasks[i]);                                                                                            // 41
			if (tasks[i].additionalText) {                                                                                     // 42
				tasksDetails.push(                                                                                                // 43
					{                                                                                                                // 44
						taskContent: new Spacebars.SafeString(tasks[i].taskContent),                                                    // 45
						additionalText: new Spacebars.SafeString(tasks[i].additionalText),                                              // 46
					}                                                                                                                // 47
				);                                                                                                                // 48
			}                                                                                                                  // 49
		}                                                                                                                   // 50
		return tasksDetails;                                                                                                // 51
	},                                                                                                                   // 52
	Tasks: function () {                                                                                                 // 53
	  return Tasks.find({}).fetch();                                                                                     // 54
	},                                                                                                                   // 55
	settingsTasks: function () {                                                                                         // 56
    return {                                                                                                          // 57
			rowsPerPage: 100,                                                                                                  // 58
			showFilter: false,                                                                                                 // 59
			showColumnToggles: false,                                                                                          // 60
			showNavigation: 'never',                                                                                           // 61
      class: 'table table-condensed col-sm-12 tablePrint',                                                            // 62
			rowClass: 'blockRowClass',                                                                                         // 63
			fields: [                                                                                                          // 64
				{                                                                                                                 // 65
					key: 'actioneeIds',                                                                                              // 66
					label: TAPi18n.__("Actionee"),                                                                                   // 67
					sortable: false,                                                                                                 // 68
					fn: function (value, object) {                                                                                   // 69
            var i;                                                                                                    // 70
            var val = '';                                                                                             // 71
            var n;                                                                                                    // 72
            var actioneeId;                                                                                           // 73
            if (value) {                                                                                              // 74
              n = value.length;                                                                                       // 75
              for (i = 0; i < n; i++) {                                                                               // 76
                actioneeId = value[i];                                                                                // 77
                member = Members.collection.findOne(actioneeId);                                                      // 78
                if (typeof(member) !== 'undefined') {                                                                 // 79
                  val = val + member.profile.nickname + ", ";                                                         // 80
                }                                                                                                     // 81
              }                                                                                                       // 82
            }                                                                                                         // 83
                                                                                                                      // 84
						if (object.actionee) {                                                                                          // 85
							val2 = object.actionee.replace(/;/g, ',');                                                                     // 86
			        actionee = val2.split(',');                                                                                // 87
              n = actionee.length;                                                                                    // 88
              for (i = 0; i < n; i++) {                                                                               // 89
                actioneeId = actionee[i];                                                                             // 90
                val = val + actionee[i] + ", ";                                                                       // 91
                }                                                                                                     // 92
              val = val.trim();                                                                                       // 93
            }                                                                                                         // 94
						val = val.slice(0, - 1);                                                                                        // 95
						return new Spacebars.SafeString(val);                                                                           // 96
					},                                                                                                               // 97
				},                                                                                                                // 98
				{                                                                                                                 // 99
					key: 'scheduledEndDate',                                                                                         // 100
					label: TAPi18n.__("Scheduled end date"),                                                                         // 101
					sortable: false,                                                                                                 // 102
				},                                                                                                                // 103
				{                                                                                                                 // 104
					key: 'taskContent',                                                                                              // 105
					label: TAPi18n.__("Content"),                                                                                    // 106
					sortable: false,                                                                                                 // 107
					fn: function (value) {                                                                                           // 108
						return new Spacebars.SafeString(value);                                                                         // 109
					},                                                                                                               // 110
				},                                                                                                                // 111
				{                                                                                                                 // 112
					key: 'realized',                                                                                                 // 113
					label: TAPi18n.__("Realized"),                                                                                   // 114
					sortable: false,                                                                                                 // 115
					fn: function (value) {                                                                                           // 116
						if (value === "Yes") {                                                                                          // 117
								return new Spacebars.SafeString('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>');        // 118
						}                                                                                                               // 119
						if (value === "No") {                                                                                           // 120
								return "-";                                                                                                   // 121
						}                                                                                                               // 122
						return new Spacebars.SafeString(value);                                                                         // 123
					},                                                                                                               // 124
				},                                                                                                                // 125
			],                                                                                                                 // 126
		};                                                                                                                  // 127
	},                                                                                                                   // 128
});                                                                                                                   // 129
                                                                                                                      // 130
Template.printMinutes.events({                                                                                        // 131
                                                                                                                      // 132
});                                                                                                                   // 133
                                                                                                                      // 134
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.printTask.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("printTask");                                                                                    // 2
Template["printTask"] = new Template("Template.printTask", (function() {                                              // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "page"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "row"                                                                                                    // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "col-md-12"                                                                                              // 10
  }, "\n				 	", HTML.H3(Blaze.View("lookup:_", function() {                                                          // 11
    return Spacebars.mustache(view.lookup("_"), "Task");                                                              // 12
  }), " ", HTML.SPAN({                                                                                                // 13
    "class": "pull-right"                                                                                             // 14
  }, HTML.IMG({                                                                                                       // 15
    src: function() {                                                                                                 // 16
      return Spacebars.mustache(view.lookup("companyLogo"));                                                          // 17
    }                                                                                                                 // 18
  }))), "\n						", HTML.DIV({                                                                                        // 19
    "class": "row"                                                                                                    // 20
  }, "\n							", HTML.DIV({                                                                                          // 21
    "class": "col-md-12"                                                                                              // 22
  }, "\n								", Blaze.If(function() {                                                                              // 23
    return Spacebars.call(Spacebars.dot(view.lookup("currentTask"), "taskContent"));                                  // 24
  }, function() {                                                                                                     // 25
    return [ "\n									", HTML.H4(Blaze.View("lookup:_", function() {                                               // 26
      return Spacebars.mustache(view.lookup("_"), "Content");                                                         // 27
    })), "\n									", HTML.P(Blaze.View("lookup:taskContent", function() {                                          // 28
      return Spacebars.mustache(view.lookup("taskContent"));                                                          // 29
    })), "\n								" ];                                                                                              // 30
  }), "\n								", Blaze.If(function() {                                                                             // 31
    return Spacebars.call(Spacebars.dot(view.lookup("currentTask"), "additionalText"));                               // 32
  }, function() {                                                                                                     // 33
    return [ "\n									", HTML.H4(Blaze.View("lookup:_", function() {                                               // 34
      return Spacebars.mustache(view.lookup("_"), "Follow-up");                                                       // 35
    })), "\n									", HTML.P(Blaze.View("lookup:additionalText", function() {                                       // 36
      return Spacebars.mustache(view.lookup("additionalText"));                                                       // 37
    })), "\n								" ];                                                                                              // 38
  }), "\n								", Blaze.If(function() {                                                                             // 39
    return Spacebars.call(Spacebars.dot(view.lookup("currentTask"), "scheduledEndDate"));                             // 40
  }, function() {                                                                                                     // 41
    return [ "\n									", HTML.H4(Blaze.View("lookup:_", function() {                                               // 42
      return Spacebars.mustache(view.lookup("_"), "Scheduled end date");                                              // 43
    })), "\n									", HTML.P(Blaze.View("lookup:currentTask.scheduledEndDate", function() {                         // 44
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "scheduledEndDate"));                       // 45
    })), "\n								" ];                                                                                              // 46
  }), "\n								", Blaze.If(function() {                                                                             // 47
    return Spacebars.call(Spacebars.dot(view.lookup("currentTask"), "effectiveEndDate"));                             // 48
  }, function() {                                                                                                     // 49
    return [ "\n									", HTML.H4(Blaze.View("lookup:_", function() {                                               // 50
      return Spacebars.mustache(view.lookup("_"), "Effective end date");                                              // 51
    })), "\n									", HTML.P(Blaze.View("lookup:currentTask.effectiveEndDate", function() {                         // 52
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "effectiveEndDate"));                       // 53
    })), "\n								" ];                                                                                              // 54
  }), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                       // 55
    return Spacebars.mustache(view.lookup("_"), "Realized");                                                          // 56
  })), "\n								", HTML.P(Blaze.View("lookup:realized", function() {                                                // 57
    return Spacebars.mustache(view.lookup("realized"));                                                               // 58
  })), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                      // 59
    return Spacebars.mustache(view.lookup("_"), "Actionee");                                                          // 60
  })), "\n								", HTML.P(Blaze.View("lookup:actionee", function() {                                                // 61
    return Spacebars.mustache(view.lookup("actionee"));                                                               // 62
  })), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                      // 63
    return Spacebars.mustache(view.lookup("_"), "Projects");                                                          // 64
  })), "\n								", HTML.P(Blaze.View("lookup:projects", function() {                                                // 65
    return Spacebars.mustache(view.lookup("projects"));                                                               // 66
  })), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                      // 67
    return Spacebars.mustache(view.lookup("_"), "Tags");                                                              // 68
  })), "\n								", HTML.P(Blaze.View("lookup:tags", function() {                                                    // 69
    return Spacebars.mustache(view.lookup("tags"));                                                                   // 70
  })), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                      // 71
    return Spacebars.mustache(view.lookup("_"), "Author");                                                            // 72
  })), "\n								", HTML.P(Blaze.View("lookup:author", function() {                                                  // 73
    return Spacebars.mustache(view.lookup("author"));                                                                 // 74
  })), "\n								", HTML.H4(Blaze.View("lookup:_", function() {                                                      // 75
    return Spacebars.mustache(view.lookup("_"), "Added date");                                                        // 76
  })), "\n								", HTML.P(Blaze.View("lookup:currentTask.addedDate", function() {                                   // 77
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentTask"), "addedDate"));                                // 78
  })), "\n							"), "\n						"), "\n			"), "\n		"), "\n"), HTML.Raw(" <!--end of div page -->") ];                   // 79
}));                                                                                                                  // 80
                                                                                                                      // 81
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/printTask.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.printTask.rendered = function () {                                                                           // 1
	RKCore.log(this.data);                                                                                               // 2
	document.title = "Task-" + this.data.currentTask._id;                                                                // 3
                                                                                                                      // 4
	if (typeof($('#tags').val()) !== 'undefined') {                                                                      // 5
		$('#tags').val($('#tags').val().replace(/;/g, ','));                                                                // 6
	}                                                                                                                    // 7
	$('#tags').tagsinput({                                                                                               // 8
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 9
	});                                                                                                                  // 10
                                                                                                                      // 11
	$('#projects').tagsinput({                                                                                           // 12
		confirmKeys: [13, 44, 59], //ENTER, comma and semi-colon                                                            // 13
	});                                                                                                                  // 14
};                                                                                                                    // 15
                                                                                                                      // 16
Template.printTask.helpers({                                                                                          // 17
	listActionee: function () {                                                                                          // 18
		return this.data.usernames;                                                                                         // 19
	},                                                                                                                   // 20
	companyLogo: function () {                                                                                           // 21
		if (Meteor.settings.public.companyLogo) {                                                                           // 22
			return Meteor.settings.public.companyLogo;                                                                         // 23
	  }                                                                                                                  // 24
		return "/company/img/companylogo.png";                                                                              // 25
	},                                                                                                                   // 26
	taskContent: function () {                                                                                           // 27
		return new Spacebars.SafeString(this.currentTask.taskContent);                                                      // 28
	},                                                                                                                   // 29
	additionalText: function () {                                                                                        // 30
		return new Spacebars.SafeString(this.currentTask.additionalText);                                                   // 31
	},                                                                                                                   // 32
	realized: function () {                                                                                              // 33
		var value = this.currentTask.realized;                                                                              // 34
		if (value === "Yes") {                                                                                              // 35
			val = TAPi18n.__("Yes");                                                                                           // 36
		}                                                                                                                   // 37
		else if (value === "No") {                                                                                          // 38
			val = TAPi18n.__("No");                                                                                            // 39
		}                                                                                                                   // 40
		else {                                                                                                              // 41
			val = TAPi18n.__("On condition");                                                                                  // 42
		}                                                                                                                   // 43
		return val;                                                                                                         // 44
	},                                                                                                                   // 45
	actionee: function () {                                                                                              // 46
		var i;                                                                                                              // 47
		var val = '';                                                                                                       // 48
		var n;                                                                                                              // 49
		var actioneeId;                                                                                                     // 50
		var value = this.currentTask.actioneeIds;                                                                           // 51
		if (value) {                                                                                                        // 52
			n = value.length;                                                                                                  // 53
			for (i = 0; i < n; i++) {                                                                                          // 54
				actioneeId = value[i];                                                                                            // 55
				member = Members.collection.findOne(actioneeId);                                                                  // 56
				if (typeof(member) !== 'undefined') {                                                                             // 57
					val = val + "<span data-filterby='actionee' data-filterval='" + actioneeId + "' class='filterOnThis label label-info'>" + member.profile.nickname + "</span> ";
				}                                                                                                                 // 59
			}                                                                                                                  // 60
		}                                                                                                                   // 61
                                                                                                                      // 62
		if (this.currentTask.actionee) {                                                                                    // 63
			val2 = this.currentTask.actionee.replace(/;/g, ',');                                                               // 64
			actionee = val2.split(',');                                                                                        // 65
			n = actionee.length;                                                                                               // 66
			for (i = 0; i < n; i++) {                                                                                          // 67
				actioneeId = actionee[i];                                                                                         // 68
				val = val + "<span class='label label-info'>" + actionee[i] + "</span> ";                                         // 69
				}                                                                                                                 // 70
			val = val.trim();                                                                                                  // 71
			}                                                                                                                  // 72
		return new Spacebars.SafeString(val);                                                                               // 73
	},                                                                                                                   // 74
	projects: function () {                                                                                              // 75
		var i;                                                                                                              // 76
		var val = '';                                                                                                       // 77
		var val2 = '';                                                                                                      // 78
		var value = this.currentTask.projectsIds;                                                                           // 79
		var nProjects = value.length;                                                                                       // 80
		var projectId;                                                                                                      // 81
		RKCore.log("this.currentTask.projectsIds : ");                                                                      // 82
		RKCore.log(value);                                                                                                  // 83
		for (i = 0; i < nProjects; i++) {                                                                                   // 84
			projectId = value[i];                                                                                              // 85
			project = Projects.findOne(projectId);                                                                             // 86
			if (typeof(project) !== 'undefined') {                                                                             // 87
				val = val + "<span data-filterby='project' data-filterval='" + projectId + "' class='filterOnThis label label-info'>" + project.projectNumber + "</span> ";
			}                                                                                                                  // 89
		}                                                                                                                   // 90
		value = this.currentTask.otherProjects;                                                                             // 91
		if (value) {                                                                                                        // 92
			val2 = this.currentTask.otherProjects.replace(/;/g, ',');                                                          // 93
			valSplitted = val2.split(',');                                                                                     // 94
			htmlTag = valSplitted.map(function (tag) {                                                                         // 95
				return "<span class='label label-info'>" + tag + "</span>";                                                       // 96
			});                                                                                                                // 97
			val = val + htmlTag.join(' ');                                                                                     // 98
		}                                                                                                                   // 99
		return new Spacebars.SafeString(val.trim());                                                                        // 100
	},                                                                                                                   // 101
	tags: function () {                                                                                                  // 102
		var val;                                                                                                            // 103
		var value = this.currentTask.tags;                                                                                  // 104
		if (value) {                                                                                                        // 105
			val = value.replace(/;/g, ',');                                                                                    // 106
			valSplitted = val.split(',');                                                                                      // 107
			htmlTag = valSplitted.map(function (tag) {                                                                         // 108
				return "<span class='label label-info'>" + tag + "</span>";                                                       // 109
			});                                                                                                                // 110
			return new Spacebars.SafeString(htmlTag.join(' '));                                                                // 111
		}                                                                                                                   // 112
		return "";                                                                                                          // 113
	},                                                                                                                   // 114
	author: function () {                                                                                                // 115
		return Members.collection.findOne({accountId: this.currentTask.addedBy}).profile.nickname;                          // 116
	},                                                                                                                   // 117
	tasksDetails: function () {                                                                                          // 118
		var i;                                                                                                              // 119
		var nTasks;                                                                                                         // 120
		var tasksDetails = [];                                                                                              // 121
	  tasks = Tasks.find({ minutesIds: this.currentMinutes._id }).fetch();                                               // 122
		nTasks = tasks.length;                                                                                              // 123
		for (i = 0; i < nTasks; i++) {                                                                                      // 124
	    RKCore.log(tasks[i]);                                                                                            // 125
			if (tasks[i].additionalText) {                                                                                     // 126
				tasksDetails.push(                                                                                                // 127
					{                                                                                                                // 128
						taskContent: new Spacebars.SafeString(tasks[i].taskContent),                                                    // 129
						additionalText: new Spacebars.SafeString(tasks[i].additionalText),                                              // 130
					}                                                                                                                // 131
				);                                                                                                                // 132
			}                                                                                                                  // 133
		}                                                                                                                   // 134
		return tasksDetails;                                                                                                // 135
	},                                                                                                                   // 136
	Tasks: function () {                                                                                                 // 137
	  return Tasks.find({}).fetch();                                                                                     // 138
	},                                                                                                                   // 139
	settingsTasks: function () {                                                                                         // 140
    return {                                                                                                          // 141
			rowsPerPage: 100,                                                                                                  // 142
			showFilter: false,                                                                                                 // 143
			showColumnToggles: false,                                                                                          // 144
			showNavigation: 'never',                                                                                           // 145
      class: 'table table-condensed col-sm-12 tablePrint',                                                            // 146
			rowClass: 'blockRowClass',                                                                                         // 147
			fields: [                                                                                                          // 148
				{                                                                                                                 // 149
					key: 'actioneeIds',                                                                                              // 150
					label: TAPi18n.__("Actionee"),                                                                                   // 151
					sortable: false,                                                                                                 // 152
					fn: function (value, object) {                                                                                   // 153
            var i;                                                                                                    // 154
            var val = '';                                                                                             // 155
            var n;                                                                                                    // 156
            var actioneeId;                                                                                           // 157
            if (value) {                                                                                              // 158
              n = value.length;                                                                                       // 159
              for (i = 0; i < n; i++) {                                                                               // 160
                actioneeId = value[i];                                                                                // 161
                member = Members.collection.findOne(actioneeId);                                                      // 162
                if (typeof(member) !== 'undefined') {                                                                 // 163
                  val = val + member.profile.nickname + ", ";                                                         // 164
                }                                                                                                     // 165
              }                                                                                                       // 166
            }                                                                                                         // 167
                                                                                                                      // 168
						if (object.actionee) {                                                                                          // 169
							val2 = object.actionee.replace(/;/g, ',');                                                                     // 170
			        actionee = val2.split(',');                                                                                // 171
              n = actionee.length;                                                                                    // 172
              for (i = 0; i < n; i++) {                                                                               // 173
                actioneeId = actionee[i];                                                                             // 174
                val = val + actionee[i] + ", ";                                                                       // 175
                }                                                                                                     // 176
              val = val.trim();                                                                                       // 177
            }                                                                                                         // 178
						val = val.slice(0, - 1);                                                                                        // 179
						return new Spacebars.SafeString(val);                                                                           // 180
					},                                                                                                               // 181
				},                                                                                                                // 182
				{                                                                                                                 // 183
					key: 'scheduledEndDate',                                                                                         // 184
					label: TAPi18n.__("Scheduled end date"),                                                                         // 185
					sortable: false,                                                                                                 // 186
				},                                                                                                                // 187
				{                                                                                                                 // 188
					key: 'taskContent',                                                                                              // 189
					label: TAPi18n.__("Content"),                                                                                    // 190
					sortable: false,                                                                                                 // 191
					fn: function (value) {                                                                                           // 192
						return new Spacebars.SafeString(value);                                                                         // 193
					},                                                                                                               // 194
				},                                                                                                                // 195
				{                                                                                                                 // 196
					key: 'realized',                                                                                                 // 197
					label: TAPi18n.__("Realized"),                                                                                   // 198
					sortable: false,                                                                                                 // 199
					fn: function (value) {                                                                                           // 200
						if (value === "Yes") {                                                                                          // 201
								return new Spacebars.SafeString('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>');        // 202
						}                                                                                                               // 203
						if (value === "No") {                                                                                           // 204
								return "-";                                                                                                   // 205
						}                                                                                                               // 206
						return new Spacebars.SafeString(value);                                                                         // 207
					},                                                                                                               // 208
				},                                                                                                                // 209
			],                                                                                                                 // 210
		};                                                                                                                  // 211
	},                                                                                                                   // 212
});                                                                                                                   // 213
                                                                                                                      // 214
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.editTasksTable.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("editTasksTable");                                                                               // 2
Template["editTasksTable"] = new Template("Template.editTasksTable", (function() {                                    // 3
  var view = this;                                                                                                    // 4
  return HTML.Raw('<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Quick edit for tasks</h3>\n        </div>\n				<div class="panel-body">\n					<div id="myHandsonTableDiv"></div>\n					<br>\n					<a href="#" class="save">Save</a>\n					<br>\n        </div>\n    	</div>\n		</div>\n	</div>');
}));                                                                                                                  // 6
                                                                                                                      // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/editTasksTable.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.editTasksTable.rendered = function () {                                                                      // 1
  var columns = [                                                                                                     // 2
  	{data: 'scheduledEndDate'},                                                                                        // 3
  	{data: 'taskContent'},                                                                                             // 4
  	{data: 'actionee'},                                                                                                // 5
  	{data: 'includedInMinutes'},                                                                                       // 6
  ];                                                                                                                  // 7
                                                                                                                      // 8
  var colHeadersText = [];                                                                                            // 9
                                                                                                                      // 10
  var colHeaders = [];                                                                                                // 11
  var arrayLength = columns.length;                                                                                   // 12
  var i;                                                                                                              // 13
                                                                                                                      // 14
  var demoData = [                                                                                                    // 15
      {scheduledEndDate: "24.12.2015", taskContent: "Do this", actionee: "DOT, PIN", includedInMinutes: "PV12"},      // 16
  		{scheduledEndDate: "22.12.2015", taskContent: "Do also this", actionee: "DOT", includedInMinutes: "PV12"},        // 17
  ];                                                                                                                  // 18
                                                                                                                      // 19
  var $container = $("#myHandsonTableDiv");                                                                           // 20
                                                                                                                      // 21
  colHeadersText.scheduledEndDate = 'scheduledEndDate';                                                               // 22
  colHeadersText.taskContent = 'taskContent';                                                                         // 23
  colHeadersText.actionee = 'actionee';                                                                               // 24
  colHeadersText.includedInMinutes = 'includedInMinutes';                                                             // 25
                                                                                                                      // 26
  for (i = 0; i < arrayLength; i++) {                                                                                 // 27
    colHeaders.push(colHeadersText[columns[i].data]);                                                                 // 28
  }                                                                                                                   // 29
                                                                                                                      // 30
  $container.handsontable({                                                                                           // 31
    data: demoData,                                                                                                   // 32
    colHeaders: colHeaders,                                                                                           // 33
    columns: columns,                                                                                                 // 34
    rowHeaders: false,                                                                                                // 35
    minSpareRows: 1,                                                                                                  // 36
    contextMenu: true,                                                                                                // 37
  });                                                                                                                 // 38
};                                                                                                                    // 39
                                                                                                                      // 40
Template.editTasksTable.helpers({                                                                                     // 41
                                                                                                                      // 42
});                                                                                                                   // 43
                                                                                                                      // 44
Template.editTasksTable.events({                                                                                      // 45
	'click a.save': function (e){                                                                                        // 46
			var hotInstance = $("#myHandsonTableDiv").handsontable('getInstance');                                             // 47
			var data = hotInstance.getData();                                                                                  // 48
      e.preventDefault();                                                                                             // 49
			RKCore.log(data)                                                                                                   // 50
	    Meteor.call('saveTasksTable', data, function (error, result) {                                                   // 51
  		  if (error) {                                                                                                    // 52
  		    // handle error                                                                                               // 53
  		  }                                                                                                               // 54
        if (result) {                                                                                                 // 55
          if (typeof(toastr) !== 'undefined') {                                                                       // 56
        		toastr.success('The tasks have been imported successfully');                                                // 57
          }                                                                                                           // 58
  		  }                                                                                                               // 59
		  });                                                                                                               // 60
	},                                                                                                                   // 61
});                                                                                                                   // 62
                                                                                                                      // 63
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.taskInSearchResults.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("taskInSearchResults");                                                                          // 2
Template["taskInSearchResults"] = new Template("Template.taskInSearchResults", (function() {                          // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "post"                                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "row"                                                                                                    // 8
  }, "\n			", HTML.DIV({                                                                                              // 9
    "class": "col-md-10"                                                                                              // 10
  }, "\n				", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {                                                 // 11
    return Spacebars.mustache(view.lookup("_"), "Content");                                                           // 12
  }), " :"), " ", Blaze.View("lookup:taskContent", function() {                                                       // 13
    return Spacebars.mustache(view.lookup("taskContent"));                                                            // 14
  })), "\n				", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {                                               // 15
    return Spacebars.mustache(view.lookup("_"), "Author");                                                            // 16
  }), " :"), " ", Blaze.View("lookup:taskAuthor", function() {                                                        // 17
    return Spacebars.mustache(view.lookup("taskAuthor"));                                                             // 18
  })), "\n			"), "\n			", HTML.DIV({                                                                                  // 19
    "class": "col-md-2"                                                                                               // 20
  }, "\n				", HTML.Raw('<span class="label label-success"> Task</span>'), " ", Blaze.View("lookup:editLink", function() {
    return Spacebars.mustache(view.lookup("editLink"));                                                               // 22
  }), HTML.Raw("<br>"), "\n				 ", HTML.Raw("<br>"), "\n	 			", Blaze.If(function() {                                 // 23
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                                 // 24
  }, function() {                                                                                                     // 25
    return [ "\n	 				", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {                        // 26
      return Spacebars.mustache(view.lookup("textScore"));                                                            // 27
    })), "\n	 			" ];                                                                                                 // 28
  }), "\n			"), "\n		"), "\n	");                                                                                      // 29
}));                                                                                                                  // 30
                                                                                                                      // 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/taskInSearchResults.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.taskInSearchResults.helpers({                                                                                // 1
	memberUsername: function (who) {                                                                                     // 2
			return Members.collection.findOne({accountId: who}).profile.nickname;                                              // 3
	},                                                                                                                   // 4
	taskContent: function () {                                                                                           // 5
		return new Spacebars.SafeString(this.taskContent);                                                                  // 6
	},                                                                                                                   // 7
	taskAuthor: function () {                                                                                            // 8
		var nickname = Members.collection.findOne({accountId: this.addedBy}).profile.nickname;                              // 9
		var nicknameHTML = "<span class='label label-info'>" + nickname + "</span>";                                        // 10
		return new Spacebars.SafeString(nicknameHTML);                                                                      // 11
	},                                                                                                                   // 12
	editLink: function () {                                                                                              // 13
		var editLink = '<a href="' +                                                                                        // 14
			Router.routes.editTask.path({_id: this._id})                                                                       // 15
			+ '" title="' + TAPi18n.__('Edit') + '"'                                                                           // 16
			+ '>'                                                                                                              // 17
			+ '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +                                          // 18
			'</a> ';                                                                                                           // 19
		return new Spacebars.SafeString(editLink);                                                                          // 20
	},                                                                                                                   // 21
	searchTypeIsFullTextSearch: function () {                                                                            // 22
		return (Session.get('searchType') === 'fullTextSearch');                                                            // 23
	},                                                                                                                   // 24
	textScore: function () {                                                                                             // 25
		//limit to 2 digits after comma :                                                                                   // 26
		return Math.round(this.score * 100) / 100;                                                                          // 27
	},                                                                                                                   // 28
});                                                                                                                   // 29
                                                                                                                      // 30
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/template.followup.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("followup");                                                                                     // 2
Template["followup"] = new Template("Template.followup", (function() {                                                // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
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
    return Spacebars.mustache(view.lookup("_"), "Follow Up");                                                         // 17
  })), "\n        "), "\n				", HTML.DIV({                                                                            // 18
    "class": "panel-body"                                                                                             // 19
  }, "\n					", HTML.Raw('<p>To add a follow up type the two keys : "f" "u" on your keyboard</p>'), "\n						", Blaze._TemplateWith(function() {
    return {                                                                                                          // 21
      collection: Spacebars.call(view.lookup("FollowUp")),                                                            // 22
      settings: Spacebars.call(view.lookup("settingsFollowUp"))                                                       // 23
    };                                                                                                                // 24
  }, function() {                                                                                                     // 25
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                   // 26
  }), "\n        "), "\n    		"), "\n		"), "\n	");                                                                    // 27
}));                                                                                                                  // 28
                                                                                                                      // 29
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/lib/client/followup.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.followup.helpers({                                                                                           // 1
	FollowUp: function () {                                                                                              // 2
		return FollowUp.find().fetch();                                                                                     // 3
	},                                                                                                                   // 4
	settingsFollowUp: function () {                                                                                      // 5
        return {                                                                                                      // 6
            rowsPerPage: 100,                                                                                         // 7
            showFilter: true,                                                                                         // 8
            class: 'table table-condensed col-sm-12',                                                                 // 9
						rowClass: function (item) {                                                                                     // 10
					  var exists = item.exists;                                                                                      // 11
					  switch (exists) {                                                                                              // 12
					    case '':                                                                                                     // 13
							case false:                                                                                                    // 14
					      return 'danger';                                                                                           // 15
					    default:                                                                                                     // 16
					      return '';                                                                                                 // 17
					  }                                                                                                              // 18
					},                                                                                                               // 19
					fields: [                                                                                                        // 20
				    {                                                                                                             // 21
				        key: 'createdAt',                                                                                         // 22
				        label: 'Date',                                                                                            // 23
								sortDirection: 'descending',                                                                                  // 24
								sortByValue: true,                                                                                            // 25
								fn: function (value) {                                                                                        // 26
										return moment(value).format('DD.MM.YY HH:mm');                                                              // 27
								},                                                                                                            // 28
				    },                                                                                                            // 29
						{                                                                                                               // 30
				        key: 'who',                                                                                               // 31
				        label: 'Who',                                                                                             // 32
								label: 'Username',                                                                                            // 33
								fn: function (value, object) {                                                                                // 34
										return Members.collection.findOne({accountId: object.who}).profile.nickname;                                // 35
								},                                                                                                            // 36
				    },                                                                                                            // 37
				    {                                                                                                             // 38
			        key: 'tags',                                                                                               // 39
			        label: 'Tags',                                                                                             // 40
							fn: function (value) {                                                                                         // 41
								tags = value.replace(/;/g, ',').split(',');                                                                   // 42
				        htmlTags = tags.map(function (tag) {                                                                      // 43
				          return "<span class='label label-info searchThisWord'>" + tag + "</span>";                              // 44
				        });                                                                                                       // 45
				        return new Spacebars.SafeString(htmlTags.join(' '));                                                      // 46
							},                                                                                                             // 47
				    },                                                                                                            // 48
						{                                                                                                               // 49
				        key: 'text',                                                                                              // 50
				        label: 'Text',                                                                                            // 51
				    },                                                                                                            // 52
					],                                                                                                               // 53
		};                                                                                                                  // 54
    },                                                                                                                // 55
	isAdmin: function () {                                                                                               // 56
    var loggedInUser;                                                                                                 // 57
    loggedInUser = Meteor.user();                                                                                     // 58
    return Roles.userIsInRole(loggedInUser, ['admin']);                                                               // 59
	},                                                                                                                   // 60
});                                                                                                                   // 61
                                                                                                                      // 62
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:tasks/packages/rationalk:tasksi18n/en.i18n.js                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "rationalk:tasks",                                                                                 // 2
    namespace = "rationalk:tasks";                                                                                    // 3
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
// packages/rationalk:tasks/packages/rationalk:tasksi18n/fr.i18n.js                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,                                                                                         // 1
    package_name = "rationalk:tasks",                                                                                 // 2
    namespace = "rationalk:tasks";                                                                                    // 3
                                                                                                                      // 4
if (package_name != "project") {                                                                                      // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                             // 6
}                                                                                                                     // 7
                                                                                                                      // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:tasks'] = {
  RKTasks: RKTasks
};

})();
