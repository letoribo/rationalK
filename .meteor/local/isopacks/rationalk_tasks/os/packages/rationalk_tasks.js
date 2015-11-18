(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/package-i18n.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
TAPi18n.packages["rationalk:tasks"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};    // 1
                                                                                                                     // 2
// define package's translation function (proxy to the i18next)                                                      // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                     // 4
                                                                                                                     // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/methods.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RKTasks = {};                                                                                                        // 1
RKTasks.Collections = {};                                                                                            // 2
RKCore.searchResultsPackage.push(                                                                                    // 3
  {                                                                                                                  // 4
    name: "RKTasks", // RKExperts.findAllFullTextSearch should exists                                                // 5
  }                                                                                                                  // 6
);                                                                                                                   // 7
                                                                                                                     // 8
RKTasks.findAllFullTextSearch = function () {                                                                        // 9
  return Tasks.find({}, {sort: {score: -1}}).fetch();                                                                // 10
};                                                                                                                   // 11
                                                                                                                     // 12
RKTasks.findFullText = function (searchQuery) {                                                                      // 13
  var sr;                                                                                                            // 14
  check(searchQuery, String);                                                                                        // 15
  sr = Tasks.find(                                                                                                   // 16
    {                                                                                                                // 17
      $text: {                                                                                                       // 18
        $search: searchQuery,                                                                                        // 19
      },                                                                                                             // 20
    },                                                                                                               // 21
    {                                                                                                                // 22
      fields: { score: { $meta: 'textScore' } },                                                                     // 23
      sort: { score: { $meta: 'textScore' } },                                                                       // 24
      limit: 30,                                                                                                     // 25
    });                                                                                                              // 26
    return sr;                                                                                                       // 27
};                                                                                                                   // 28
                                                                                                                     // 29
RKTasks.findDummy = function () {                                                                                    // 30
  return Tasks.find({$text: { $search: "somethingthatyouwillneverfind" }});                                          // 31
};                                                                                                                   // 32
                                                                                                                     // 33
Meteor.methods({                                                                                                     // 34
	deleteTask: function (taskId) {                                                                                     // 35
		check(taskId, String);                                                                                             // 36
		Tasks.remove(                                                                                                      // 37
			{                                                                                                                 // 38
			  _id: taskId,                                                                                                    // 39
			}                                                                                                                 // 40
		);                                                                                                                 // 41
		if (typeof(toastr) !== 'undefined') {                                                                              // 42
			toastr.success(TAPi18n.__('Task deleted succesfully'));                                                           // 43
		}                                                                                                                  // 44
	},                                                                                                                  // 45
  deleteMinutes: function (minutesId) {                                                                              // 46
		check(minutesId, String);                                                                                          // 47
		Minutes.remove(                                                                                                    // 48
			{                                                                                                                 // 49
			  _id: minutesId,                                                                                                 // 50
			}                                                                                                                 // 51
		);                                                                                                                 // 52
		if (typeof(toastr) !== 'undefined') {                                                                              // 53
			toastr.success(TAPi18n.__('Minutes deleted succesfully'));                                                        // 54
		}                                                                                                                  // 55
	},                                                                                                                  // 56
  deleteProject: function (projectId) {                                                                              // 57
		check(projectId, String);                                                                                          // 58
		Projects.remove(                                                                                                   // 59
			{                                                                                                                 // 60
			  _id: projectId,                                                                                                 // 61
			}                                                                                                                 // 62
		);                                                                                                                 // 63
		if (typeof(toastr) !== 'undefined') {                                                                              // 64
			toastr.success(TAPi18n.__('Project deleted succesfully'));                                                        // 65
		}                                                                                                                  // 66
	},                                                                                                                  // 67
});                                                                                                                  // 68
                                                                                                                     // 69
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/collections.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Tasks = new Mongo.Collection('tasks');                                                                               // 1
Minutes = new Mongo.Collection('minutes');                                                                           // 2
Projects = new Mongo.Collection('projects');                                                                         // 3
SettingsRKTasks = new Mongo.Collection('settingsrktasks');                                                           // 4
                                                                                                                     // 5
Tasks.allow( {                                                                                                       // 6
		insert: function (userId) {return !! userId; },                                                                    // 7
		update: function (userId) {return !!userId; },                                                                     // 8
    remove: function (userId) {return !!userId; },                                                                   // 9
});                                                                                                                  // 10
                                                                                                                     // 11
Minutes.allow( {                                                                                                     // 12
		insert: function (userId) {return !! userId; },                                                                    // 13
		update: function (userId) {return !!userId; },                                                                     // 14
    remove: function (userId) {return !!userId; },                                                                   // 15
});                                                                                                                  // 16
                                                                                                                     // 17
Projects.allow( {                                                                                                    // 18
		insert: function (userId) {return !! userId; },                                                                    // 19
		update: function (userId) {return !!userId; },                                                                     // 20
    remove: function (userId) {return !!userId; },                                                                   // 21
});                                                                                                                  // 22
                                                                                                                     // 23
SettingsRKTasks.allow( {                                                                                             // 24
		insert: function (userId) {return !! userId; },                                                                    // 25
		update: function (userId) {return !!userId; },                                                                     // 26
    remove: function (userId) {return !!userId; },                                                                   // 27
});                                                                                                                  // 28
                                                                                                                     // 29
if (Meteor.isServer) {                                                                                               // 30
	if (typeof Tasks.createIndex === 'function') {                                                                      // 31
		Tasks.createIndex({ full: "text" }, { name: "TextIndex" });                                                        // 32
	}                                                                                                                   // 33
	else {                                                                                                              // 34
		if (typeof Tasks._ensureIndex === 'function') {                                                                    // 35
			Tasks._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                       // 36
		}                                                                                                                  // 37
	}                                                                                                                   // 38
                                                                                                                     // 39
	if (typeof Minutes.createIndex === 'function') {                                                                    // 40
		Minutes.createIndex({ full: "text" }, { name: "TextIndex" });                                                      // 41
	}                                                                                                                   // 42
	else {                                                                                                              // 43
		if (typeof Minutes._ensureIndex === 'function') {                                                                  // 44
			Minutes._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                     // 45
		}                                                                                                                  // 46
	}                                                                                                                   // 47
                                                                                                                     // 48
	if (typeof Projects.createIndex === 'function') {                                                                   // 49
		Projects.createIndex({ full: "text" }, { name: "TextIndex" });                                                     // 50
	}                                                                                                                   // 51
	else {                                                                                                              // 52
		if (typeof Projects._ensureIndex === 'function') {                                                                 // 53
			Projects._ensureIndex( { full: "text" }, {name: "TextIndex"});                                                    // 54
		}                                                                                                                  // 55
	}                                                                                                                   // 56
} //end if Server                                                                                                    // 57
                                                                                                                     // 58
FollowUp = new Mongo.Collection('FollowUp');                                                                         // 59
                                                                                                                     // 60
FollowUp.allow( {                                                                                                    // 61
		insert: function (userId) {return !! userId; },                                                                    // 62
		update: function (userId) {return !!userId; },                                                                     // 63
    remove: function (userId) {return !!userId; },                                                                   // 64
});                                                                                                                  // 65
                                                                                                                     // 66
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/routes.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.settings.public.show.tasks) {                                                                             // 1
  Router.route("/tasks/:filterBy?/:filterVal?", {                                                                    // 2
    name: "tasks",                                                                                                   // 3
    waitOn: function () {                                                                                            // 4
      RKCore.log("this.params.filterBy : " + this.params.filterBy);                                                  // 5
      RKCore.log("this.params.filterVal : " + this.params.filterVal);                                                // 6
      if (this.params.filterBy === "project") {                                                                      // 7
        Meteor.subscribe("tasksByProjectId", this.params.filterVal);                                                 // 8
      }                                                                                                              // 9
      else if (this.params.filterBy === "author") {                                                                  // 10
        Meteor.subscribe("tasksByAuthorId", this.params.filterVal);                                                  // 11
      }                                                                                                              // 12
      else if (this.params.filterBy === "authorUserId") {                                                            // 13
        //les taches ou je suis autheur                                                                              // 14
        Meteor.subscribe("authorTasksByUserId");                                                                     // 15
      }                                                                                                              // 16
      else if (this.params.filterBy === "actionee") {                                                                // 17
        Meteor.subscribe("tasksByActioneeId", this.params.filterVal);                                                // 18
      }                                                                                                              // 19
      else if (this.params.filterBy === "minutes") {                                                                 // 20
        Meteor.subscribe("tasksByMinutesId", this.params.filterVal);                                                 // 21
      }                                                                                                              // 22
      else {                                                                                                         // 23
        Meteor.subscribe("tasks");                                                                                   // 24
      }                                                                                                              // 25
      return [                                                                                                       // 26
        Meteor.subscribe("projects"),                                                                                // 27
        Meteor.subscribe("members"),                                                                                 // 28
        Meteor.subscribe("allMinutes"),                                                                              // 29
      ];                                                                                                             // 30
    },                                                                                                               // 31
  });                                                                                                                // 32
                                                                                                                     // 33
  Router.route("/projects", {                                                                                        // 34
    name: "viewProjects",                                                                                            // 35
    waitOn: function () {                                                                                            // 36
      Meteor.subscribe("projects");                                                                                  // 37
      Meteor.subscribe("tasks");                                                                                     // 38
      return [Meteor.subscribe("members")];                                                                          // 39
    },                                                                                                               // 40
  });                                                                                                                // 41
                                                                                                                     // 42
  Router.route("/project/edit/:_id", {                                                                               // 43
    name: "editProject",                                                                                             // 44
    data: function () {                                                                                              // 45
      var usernames = [];                                                                                            // 46
      var members = Members.collection.find().fetch();                                                               // 47
      var data = {};                                                                                                 // 48
      var nMembers = members.length;                                                                                 // 49
      var i;                                                                                                         // 50
      data.currentProject = Projects.findOne(this.params._id);                                                       // 51
                                                                                                                     // 52
      for (i = 0; i < nMembers; i++) {                                                                               // 53
          usernames.push(members[i].profile.nickname);                                                               // 54
      }                                                                                                              // 55
      data.usernames = usernames;                                                                                    // 56
      return data;                                                                                                   // 57
    },                                                                                                               // 58
    waitOn: function () {                                                                                            // 59
      return [                                                                                                       // 60
        Meteor.subscribe("project", this.params._id),                                                                // 61
        Meteor.subscribe("minutesByProjectId", this.params._id),                                                     // 62
        Meteor.subscribe("tasksByProjectId", this.params._id),                                                       // 63
        Meteor.subscribe("members"),                                                                                 // 64
        Meteor.subscribe("tags"),                                                                                    // 65
       ];                                                                                                            // 66
    },                                                                                                               // 67
  });                                                                                                                // 68
                                                                                                                     // 69
                                                                                                                     // 70
  Router.route("/task/edit/:_id/:filterBy?/:filterVal?", {                                                           // 71
    name: "editTask",                                                                                                // 72
    data: function () {                                                                                              // 73
      var usernames = [];                                                                                            // 74
      var members = Members.collection.find().fetch();                                                               // 75
      var data = {};                                                                                                 // 76
      var nMembers = members.length;                                                                                 // 77
      var i;                                                                                                         // 78
      data.currentTask = Tasks.findOne(this.params._id);                                                             // 79
                                                                                                                     // 80
      for (i = 0; i < nMembers; i++) {                                                                               // 81
          usernames.push(members[i].profile.nickname);                                                               // 82
      }                                                                                                              // 83
      data.usernames = usernames;                                                                                    // 84
      data.filterBy = this.params.filterBy;                                                                          // 85
      data.filterVal = this.params.filterVal;                                                                        // 86
      RKCore.log(data);                                                                                              // 87
      return data;                                                                                                   // 88
    },                                                                                                               // 89
    waitOn: function () {                                                                                            // 90
      return [                                                                                                       // 91
        Meteor.subscribe("task", this.params._id),                                                                   // 92
        Meteor.subscribe("members"),                                                                                 // 93
        Meteor.subscribe("projects"),                                                                                // 94
        Meteor.subscribe("allMinutes"),                                                                              // 95
        Meteor.subscribe("tags"),                                                                                    // 96
       ];                                                                                                            // 97
    },                                                                                                               // 98
  });                                                                                                                // 99
                                                                                                                     // 100
  Router.route("/task/table/edit", {                                                                                 // 101
    name: "editTasksTable",                                                                                          // 102
    data: function () {                                                                                              // 103
      return true;                                                                                                   // 104
    },                                                                                                               // 105
    waitOn: function () {                                                                                            // 106
      return [                                                                                                       // 107
        Meteor.subscribe("members"),                                                                                 // 108
       ];                                                                                                            // 109
    },                                                                                                               // 110
  });                                                                                                                // 111
                                                                                                                     // 112
  Router.route("/minutes/:filterBy?/:filterVal?", {                                                                  // 113
    name: "minutes",                                                                                                 // 114
    waitOn: function () {                                                                                            // 115
      RKCore.log("this.params.filterBy : " + this.params.filterBy);                                                  // 116
      RKCore.log("this.params.filterVal : " + this.params.filterVal);                                                // 117
      if (this.params.filterBy === "project") {                                                                      // 118
        // filterVal = projectName                                                                                   // 119
        Meteor.subscribe("minutesByProjectId", this.params.filterVal);                                               // 120
      }                                                                                                              // 121
      else if (this.params.filterBy === "author") {                                                                  // 122
        // filterVal = authorId                                                                                      // 123
        Meteor.subscribe("minutesByAuthorId", this.params.filterVal);                                                // 124
      }                                                                                                              // 125
      else {                                                                                                         // 126
        Meteor.subscribe("allMinutes");                                                                              // 127
      }                                                                                                              // 128
      return [                                                                                                       // 129
        Meteor.subscribe("members"),                                                                                 // 130
        Meteor.subscribe("projects"),                                                                                // 131
      ];                                                                                                             // 132
    },                                                                                                               // 133
  });                                                                                                                // 134
                                                                                                                     // 135
  Router.route("/editMinutes/:_id/:filterBy?/:filterVal?", {                                                         // 136
    name: "editMinutes",                                                                                             // 137
    data: function () {                                                                                              // 138
      var usernames = [];                                                                                            // 139
      var members = Members.collection.find().fetch();                                                               // 140
      var data = {};                                                                                                 // 141
      var nMembers = members.length;                                                                                 // 142
      var i;                                                                                                         // 143
      data.currentMinutes = Minutes.findOne(this.params._id);                                                        // 144
                                                                                                                     // 145
      for (i = 0; i < nMembers; i++) {                                                                               // 146
          usernames.push(members[i].profile.nickname);                                                               // 147
      }                                                                                                              // 148
      data.usernames = usernames;                                                                                    // 149
      data.filterBy = this.params.filterBy;                                                                          // 150
      data.filterVal = this.params.filterVal;                                                                        // 151
      return data;                                                                                                   // 152
    },                                                                                                               // 153
    waitOn: function () {                                                                                            // 154
      return [                                                                                                       // 155
        Meteor.subscribe("minutes", this.params._id),                                                                // 156
        Meteor.subscribe("members"),                                                                                 // 157
        Meteor.subscribe("projects"),                                                                                // 158
        Meteor.subscribe("tags"),                                                                                    // 159
        Meteor.subscribe("SettingsRKTasks"),                                                                         // 160
        Meteor.subscribe("tasksByMinutesId", this.params._id),                                                       // 161
       ];                                                                                                            // 162
    },                                                                                                               // 163
  });                                                                                                                // 164
                                                                                                                     // 165
                                                                                                                     // 166
  Router.route("/print/task/:_id/:serverToken?/:serverTokenVal?", {                                                  // 167
    name: "printTask",                                                                                               // 168
    layoutTemplate: 'printLayout',                                                                                   // 169
    data: function () {                                                                                              // 170
      var usernames = [];                                                                                            // 171
      var members = Members.collection.find().fetch();                                                               // 172
      var data = {};                                                                                                 // 173
      var nMembers = members.length;                                                                                 // 174
      var i;                                                                                                         // 175
      data.currentTask = Tasks.findOne(this.params._id);                                                             // 176
                                                                                                                     // 177
      for (i = 0; i < nMembers; i++) {                                                                               // 178
          usernames.push(members[i].profile.nickname);                                                               // 179
      }                                                                                                              // 180
      data.usernames = usernames;                                                                                    // 181
      return data;                                                                                                   // 182
    },                                                                                                               // 183
    waitOn: function () {                                                                                            // 184
      return [                                                                                                       // 185
        Meteor.subscribe("members"),                                                                                 // 186
        Meteor.subscribe("tags"),                                                                                    // 187
        Meteor.subscribe("allMinutes"),                                                                              // 188
        Meteor.subscribe("task", this.params._id),                                                                   // 189
        Meteor.subscribe("projects"),                                                                                // 190
       ];                                                                                                            // 191
    },                                                                                                               // 192
  });                                                                                                                // 193
                                                                                                                     // 194
  Router.route("/print/minutes/:_id/:serverToken?/:serverTokenVal?", {                                               // 195
    name: "printMinutes",                                                                                            // 196
    layoutTemplate: 'printLayout',                                                                                   // 197
    data: function () {                                                                                              // 198
      var usernames = [];                                                                                            // 199
      var members = Members.collection.find().fetch();                                                               // 200
      var data = {};                                                                                                 // 201
      var nMembers = members.length;                                                                                 // 202
      var i;                                                                                                         // 203
      data.currentMinutes = Minutes.findOne(this.params._id);                                                        // 204
                                                                                                                     // 205
      for (i = 0; i < nMembers; i++) {                                                                               // 206
          usernames.push(members[i].profile.nickname);                                                               // 207
      }                                                                                                              // 208
      data.usernames = usernames;                                                                                    // 209
      return data;                                                                                                   // 210
    },                                                                                                               // 211
    waitOn: function () {                                                                                            // 212
      return [                                                                                                       // 213
        Meteor.subscribe("minutes", this.params._id),                                                                // 214
        Meteor.subscribe("members"),                                                                                 // 215
        Meteor.subscribe("tags"),                                                                                    // 216
        Meteor.subscribe("tasksByMinutesId", this.params._id),                                                       // 217
       ];                                                                                                            // 218
    },                                                                                                               // 219
  });                                                                                                                // 220
                                                                                                                     // 221
  Router.route("/followup", {                                                                                        // 222
    name: "followup",                                                                                                // 223
    waitOn: function () {                                                                                            // 224
      return [                                                                                                       // 225
        Meteor.subscribe("followup"),                                                                                // 226
        Meteor.subscribe("members"),                                                                                 // 227
      ];                                                                                                             // 228
    },                                                                                                               // 229
  });                                                                                                                // 230
}                                                                                                                    // 231
                                                                                                                     // 232
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/publications.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("projectTasks", function (projectName) {                                                              // 1
  var regExp = new RegExp("(" + projectName + ")", "ig");                                                            // 2
  check(projectName, String);                                                                                        // 3
  RKCore.log(projectName);                                                                                           // 4
  return Tasks.find({ projects: regExp });                                                                           // 5
});                                                                                                                  // 6
                                                                                                                     // 7
Meteor.publish("SettingsRKTasks", function () {                                                                      // 8
  return SettingsRKTasks.find({});                                                                                   // 9
});                                                                                                                  // 10
                                                                                                                     // 11
Meteor.publish("actioneeTasks", function (actionee) {                                                                // 12
  var regExp = new RegExp("(" + actionee + ")", "ig");                                                               // 13
  check(actionee, String);                                                                                           // 14
  RKCore.log(actionee);                                                                                              // 15
  return Tasks.find({ actionee: regExp });                                                                           // 16
});                                                                                                                  // 17
                                                                                                                     // 18
Meteor.publish("minutesTasks", function (minutesName) {                                                              // 19
  var regExp = new RegExp("(" + minutesName + ")", "ig");                                                            // 20
  check(minutesName, String);                                                                                        // 21
  RKCore.log("Filter by minutesName :" + minutesName);                                                               // 22
  return Tasks.find({ includedInMinutes: regExp });                                                                  // 23
});                                                                                                                  // 24
                                                                                                                     // 25
Meteor.publish("minutesTasksByMinutesId", function (minutesId) {                                                     // 26
  var myMinutes = Minutes.findOne(minutesId);                                                                        // 27
  var minutesName = myMinutes.minutesName;                                                                           // 28
  var regExp = new RegExp("(" + minutesName + ")", "ig");                                                            // 29
  check(minutesId, String);                                                                                          // 30
  RKCore.log("Filter by minutesName :" + minutesName);                                                               // 31
  return Tasks.find({ includedInMinutes: regExp });                                                                  // 32
});                                                                                                                  // 33
                                                                                                                     // 34
Meteor.publish("tasksByMinutesId", function (minutesId) {                                                            // 35
  check(minutesId, String);                                                                                          // 36
  return Tasks.find({ minutesIds: {$in: [minutesId]} });                                                             // 37
});                                                                                                                  // 38
                                                                                                                     // 39
Meteor.publish("minutesByProjectId", function (projectId) {                                                          // 40
  check(projectId, String);                                                                                          // 41
  return Minutes.find({ projectsIds: {$in: [projectId]} });                                                          // 42
});                                                                                                                  // 43
                                                                                                                     // 44
Meteor.publish("minutesByAuthorId", function (authorId) {                                                            // 45
  check(authorId, String);                                                                                           // 46
  return Minutes.find({ addedBy: authorId });                                                                        // 47
});                                                                                                                  // 48
                                                                                                                     // 49
Meteor.publish("tasksByActioneeId", function (id) {                                                                  // 50
  check(id, String);                                                                                                 // 51
  return Tasks.find({ actioneeIds: {$in: [id]} });                                                                   // 52
});                                                                                                                  // 53
                                                                                                                     // 54
Meteor.publish("tasksByProjectId", function (projectId) {                                                            // 55
  check(projectId, String);                                                                                          // 56
  return Tasks.find({ projectsIds: {$in: [projectId]} });                                                            // 57
});                                                                                                                  // 58
                                                                                                                     // 59
Meteor.publish("authorTasks", function (author) {                                                                    // 60
  var member = Members.collection.findOne({"profile.nickname": author});                                             // 61
  var accountId;                                                                                                     // 62
  check(author, String);                                                                                             // 63
  RKCore.log("Filtre par author :" + author);                                                                        // 64
  if (typeof member !== 'undefined') {                                                                               // 65
    accountId = member.accountId;                                                                                    // 66
    RKCore.log("accountId :" + accountId);                                                                           // 67
    return Tasks.find({ addedBy: accountId });                                                                       // 68
  }                                                                                                                  // 69
  return [];                                                                                                         // 70
});                                                                                                                  // 71
                                                                                                                     // 72
Meteor.publish("authorTasksByUserId", function () {                                                                  // 73
  var connectedUser = this.userId;                                                                                   // 74
  var member = Members.collection.findOne({accountId: connectedUser});                                               // 75
  var accountId;                                                                                                     // 76
  RKCore.log("connectedUser : ");                                                                                    // 77
  RKCore.log(connectedUser);                                                                                         // 78
  RKCore.log("Filtre par author account Id :" + connectedUser);                                                      // 79
  if (typeof member !== 'undefined') {                                                                               // 80
    accountId = member.accountId;                                                                                    // 81
    RKCore.log("accountId :" + accountId);                                                                           // 82
    return Tasks.find({ addedBy: accountId });                                                                       // 83
  }                                                                                                                  // 84
  return [];                                                                                                         // 85
});                                                                                                                  // 86
                                                                                                                     // 87
Meteor.publish("tasksByAuthorId", function (userId) {                                                                // 88
  check(userId, String);                                                                                             // 89
  return Tasks.find({ addedBy: userId });                                                                            // 90
});                                                                                                                  // 91
                                                                                                                     // 92
Meteor.publish("tasks", function () {                                                                                // 93
  return Tasks.find();                                                                                               // 94
});                                                                                                                  // 95
                                                                                                                     // 96
Meteor.publish("projects", function () {                                                                             // 97
  return Projects.find();                                                                                            // 98
});                                                                                                                  // 99
                                                                                                                     // 100
Meteor.publish("project", function (id) {                                                                            // 101
  check(id, String);                                                                                                 // 102
  return Projects.find({                                                                                             // 103
    _id: id,                                                                                                         // 104
  });                                                                                                                // 105
});                                                                                                                  // 106
                                                                                                                     // 107
Meteor.publish("task", function (id) {                                                                               // 108
  check(id, String);                                                                                                 // 109
  return Tasks.find({                                                                                                // 110
    _id: id,                                                                                                         // 111
  });                                                                                                                // 112
});                                                                                                                  // 113
                                                                                                                     // 114
Meteor.publish("allMinutes", function () {                                                                           // 115
  return Minutes.find({});                                                                                           // 116
});                                                                                                                  // 117
                                                                                                                     // 118
Meteor.publish("minutes", function (minutesId) {                                                                     // 119
  check(minutesId, String);                                                                                          // 120
  return Minutes.find({                                                                                              // 121
    _id: minutesId,                                                                                                  // 122
  });                                                                                                                // 123
});                                                                                                                  // 124
                                                                                                                     // 125
Meteor.publish("followup", function () {                                                                             // 126
  return FollowUp.find();                                                                                            // 127
});                                                                                                                  // 128
                                                                                                                     // 129
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/methods.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	markAsDone: function (taskId) {                                                                                     // 2
		var userId = Meteor.userId();                                                                                      // 3
		check(taskId, String);                                                                                             // 4
		Tasks.update(                                                                                                      // 5
			 {                                                                                                                // 6
				 _id: taskId,                                                                                                    // 7
			 },                                                                                                               // 8
			 {                                                                                                                // 9
				 $set:                                                                                                           // 10
					{                                                                                                               // 11
						effectiveEndDate: moment().format("DD.MM.YYYY HH:mm"),                                                         // 12
						percentageDone: 100,                                                                                           // 13
						realized: "Yes",                                                                                               // 14
						markedAsDoneBy: userId,                                                                                        // 15
						modifiedBy: userId,                                                                                            // 16
						modifiedDate: moment().format("DD.MM.YYYY HH:mm"),                                                             // 17
					},                                                                                                              // 18
			 }                                                                                                                // 19
		);                                                                                                                 // 20
                                                                                                                     // 21
                                                                                                                     // 22
		if (typeof(toastr) !== 'undefined') {                                                                              // 23
			toastr.success(TAPi18n.__('Task marked as done'));                                                                // 24
		}                                                                                                                  // 25
	},                                                                                                                  // 26
	updateTask: function (data) {                                                                                       // 27
		var full = '';                                                                                                     // 28
		check(data, Match.Any);                                                                                            // 29
                                                                                                                     // 30
		full = full.concat(data.taskContentNoHTML).concat(" ");                                                            // 31
		full = full.concat(data.additionalTextNoHTML).concat(" ");                                                         // 32
    full = full.concat(data.tagsNoHTML).concat(" ");                                                                 // 33
		full = full.concat(data.otherProjectsNoHTML).concat(" ");                                                          // 34
		previousTask = Tasks.findOne(data.taskId);                                                                         // 35
		Tasks.update(                                                                                                      // 36
			{                                                                                                                 // 37
			  $and: [                                                                                                         // 38
			  	{                                                                                                              // 39
						_id: data.taskId,                                                                                              // 40
					},                                                                                                              // 41
			  ],                                                                                                              // 42
			},                                                                                                                // 43
			{                                                                                                                 // 44
		      scheduledStartDate: data.scheduledStartDate,                                                                 // 45
		      effectiveStartDate: data.effectiveStartDate,                                                                 // 46
		      scheduledEndDate: data.scheduledEndDate,                                                                     // 47
		      effectiveEndDate: data.effectiveEndDate,                                                                     // 48
		      taskContent: data.taskContent,                                                                               // 49
					realized: data.realized,                                                                                        // 50
					projectsIds: data.projectsIds,                                                                                  // 51
					minutesIds: data.minutesIds,                                                                                    // 52
					actioneeIds: data.actioneeIds,                                                                                  // 53
					tags: data.tags,                                                                                                // 54
					otherProjects: data.otherProjects,                                                                              // 55
					additionalText: data.additionalText,                                                                            // 56
					actionee: data.actionee,                                                                                        // 57
					percentageDone: data.percentageDone,                                                                            // 58
					addedBy: previousTask.addedBy,                                                                                  // 59
					addedDate: previousTask.addedDate,                                                                              // 60
					modifiedBy: Meteor.userId(),                                                                                    // 61
					modifiedDate: moment().format("DD.MM.YYYY HH:mm"),                                                              // 62
					full: full,                                                                                                     // 63
					searchResultFromTasks: true,                                                                                    // 64
					showInGantt: data.showInGantt,                                                                                  // 65
					sendReminder: data.sendReminder,                                                                                // 66
					sendReminderActionee: data.sendReminderActionee,                                                                // 67
			},                                                                                                                // 68
			{                                                                                                                 // 69
			    upsert: true,                                                                                                 // 70
			}                                                                                                                 // 71
		);                                                                                                                 // 72
	},                                                                                                                  // 73
	duplicateTask: function (taskId) {                                                                                  // 74
		var previousTask = Tasks.findOne(taskId);                                                                          // 75
		check(taskId, String);                                                                                             // 76
		newTaskId = Tasks.insert(                                                                                          // 77
			{                                                                                                                 // 78
				scheduledStartDate: previousTask.scheduledStartDate,                                                             // 79
				effectiveStartDate: previousTask.effectiveStartDate,                                                             // 80
				scheduledEndDate: previousTask.scheduledEndDate,                                                                 // 81
			  effectiveEndDate: previousTask.effectiveEndDate,                                                                // 82
				taskContent: previousTask.taskContent,                                                                           // 83
				realized: previousTask.realized,                                                                                 // 84
				projectsIds: previousTask.projectsIds,                                                                           // 85
				minutesIds: previousTask.minutesIds,                                                                             // 86
				actioneeIds: previousTask.actioneeIds,                                                                           // 87
				tags: previousTask.tags,                                                                                         // 88
				otherProjects: previousTask.otherProjects,                                                                       // 89
				additionalText: previousTask.additionalText,                                                                     // 90
				actionee: previousTask.actionee,                                                                                 // 91
				percentageDone: previousTask.percentageDone,                                                                     // 92
				addedBy: Meteor.userId(),                                                                                        // 93
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 94
				full: previousTask.full,                                                                                         // 95
				searchResultFromTasks: true,                                                                                     // 96
				sendReminder: previousTask.sendReminder,                                                                         // 97
				sendReminderActionee: previousTask.sendReminderActionee,                                                         // 98
			}                                                                                                                 // 99
		);                                                                                                                 // 100
		return newTaskId;                                                                                                  // 101
	},                                                                                                                  // 102
  createTask: function (data) {                                                                                      // 103
		var today = moment();                                                                                              // 104
		var scheduledEndDate = moment().businessAdd(2, 'days');                                                            // 105
		var userId = Meteor.userId();                                                                                      // 106
    var user = Members.collection.findOne({accountId: userId});                                                      // 107
    var username = user.profile.nickname;                                                                            // 108
		var taskId;                                                                                                        // 109
		var projectsIds = [];                                                                                              // 110
		var minutesIds = [];                                                                                               // 111
		var actioneeIds = [];                                                                                              // 112
		check(data, Match.Any);                                                                                            // 113
    RKCore.log(userId);                                                                                              // 114
		RKCore.log(user);                                                                                                  // 115
		RKCore.log(username);                                                                                              // 116
		if (typeof(data.projectsIds) !== 'undefined') {                                                                    // 117
			projectsIds = data.projectsIds;                                                                                   // 118
		}                                                                                                                  // 119
		if (typeof(data.minutesIds) !== 'undefined') {                                                                     // 120
			minutesIds = data.minutesIds;                                                                                     // 121
		}                                                                                                                  // 122
		taskId = Tasks.insert(                                                                                             // 123
			{                                                                                                                 // 124
				scheduledStartDate: moment(today).format("DD.MM.YYYY"),                                                          // 125
				effectiveStartDate: "",                                                                                          // 126
				scheduledEndDate: moment(scheduledEndDate).format("DD.MM.YYYY"),                                                 // 127
			  effectiveEndDate: "",                                                                                           // 128
				taskContent: "",                                                                                                 // 129
				realized: "No",                                                                                                  // 130
				projectsIds: projectsIds,                                                                                        // 131
				minutesIds: minutesIds,                                                                                          // 132
				actioneeIds: actioneeIds,                                                                                        // 133
				tags: "",                                                                                                        // 134
				otherProjects: "",                                                                                               // 135
				additionalText: "",                                                                                              // 136
				actionee: username,                                                                                              // 137
				percentageDone: 0,                                                                                               // 138
				addedBy: Meteor.userId(),                                                                                        // 139
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 140
				full: "",                                                                                                        // 141
				searchResultFromTasks: true,                                                                                     // 142
				sendReminder: false,                                                                                             // 143
				sendReminderActionee: false,                                                                                     // 144
			}                                                                                                                 // 145
		);                                                                                                                 // 146
		return taskId;                                                                                                     // 147
	},                                                                                                                  // 148
	updateMinutes: function (data) {                                                                                    // 149
		var full = '';                                                                                                     // 150
		check(data, Match.Any);                                                                                            // 151
                                                                                                                     // 152
		full = full.concat(data.objective).concat(" ");                                                                    // 153
		full = full.concat(data.minutesName).concat(" ");                                                                  // 154
		full = full.concat(data.minutesTitle).concat(" ");                                                                 // 155
		full = full.concat(data.minutesContentNoHTML).concat(" ");                                                         // 156
    full = full.concat(data.tagsNoHTML).concat(" ");                                                                 // 157
		previousMinutes = Minutes.findOne(data.minutesId);                                                                 // 158
		Minutes.update(                                                                                                    // 159
			{                                                                                                                 // 160
			  $and: [                                                                                                         // 161
			  	{                                                                                                              // 162
						_id: data.minutesId,                                                                                           // 163
					},                                                                                                              // 164
			  ],                                                                                                              // 165
			},                                                                                                                // 166
			{                                                                                                                 // 167
		      location: data.location,                                                                                     // 168
					minutesDate: data.minutesDate,                                                                                  // 169
					author: data.author,                                                                                            // 170
					recipients: data.recipients,                                                                                    // 171
					objective: data.objective,                                                                                      // 172
					attendeesPresent: data.attendeesPresent,                                                                        // 173
					minutesContent: data.minutesContent,                                                                            // 174
					minutesTitle: data.minutesTitle,                                                                                // 175
					minutesName: data.minutesName,                                                                                  // 176
					projectsIds: data.projectsIds,                                                                                  // 177
					tags: data.tags,                                                                                                // 178
					addedBy: previousMinutes.addedBy,                                                                               // 179
					addedDate: previousMinutes.addedDate,                                                                           // 180
					modifiedBy: Meteor.userId(),                                                                                    // 181
					modifiedDate: moment().format("DD.MM.YYYY HH:mm"),                                                              // 182
					full: full,                                                                                                     // 183
					searchResultFromTasks: true,                                                                                    // 184
			},                                                                                                                // 185
			{                                                                                                                 // 186
			    upsert: true,                                                                                                 // 187
			}                                                                                                                 // 188
		);                                                                                                                 // 189
                                                                                                                     // 190
		Meteor.call('updateTasksTable', data.dataTaskTable, data.minutesId, data.projectsIds);                             // 191
	},                                                                                                                  // 192
	duplicateMinutes: function (minutesId) {                                                                            // 193
		var previousMinutes = Minutes.findOne(minutesId);                                                                  // 194
		check(minutesId, String);                                                                                          // 195
		newMinutesId = Minutes.insert(                                                                                     // 196
			{                                                                                                                 // 197
				minutesContent: previousMinutes.minutesContent,                                                                  // 198
				location: previousMinutes.location,                                                                              // 199
				minutesDate: previousMinutes.minutesDate,                                                                        // 200
				attendeesPresent: previousMinutes.attendeesPresent,                                                              // 201
				author: previousMinutes.author,                                                                                  // 202
				recipients: previousMinutes.recipients,                                                                          // 203
				objective: previousMinutes.objective,                                                                            // 204
				projectsIds: previousMinutes.projectsIds,                                                                        // 205
				minutesTitle: previousMinutes.minutesTitle,                                                                      // 206
				minutesName: previousMinutes.minutesName,                                                                        // 207
				tags: previousMinutes.tags,                                                                                      // 208
				addedBy: Meteor.userId(),                                                                                        // 209
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 210
				full: previousMinutes.full,                                                                                      // 211
				searchResultFromMinutes: true,                                                                                   // 212
			}                                                                                                                 // 213
		);                                                                                                                 // 214
		return newMinutesId;                                                                                               // 215
	},                                                                                                                  // 216
	duplicateProject: function (id) {                                                                                   // 217
		var previous = Projects.findOne(id);                                                                               // 218
		check(id, String);                                                                                                 // 219
		newId = Projects.insert(                                                                                           // 220
			{                                                                                                                 // 221
				projectNumber: previous.projectNumber,                                                                           // 222
				projectName: previous.projectName,                                                                               // 223
				projectDescription: previous.projectDescription,                                                                 // 224
				projectManagerIds: previous.projectManagerIds,                                                                   // 225
				tags: previous.tags,                                                                                             // 226
				addedBy: Meteor.userId(),                                                                                        // 227
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 228
				full: previous.full,                                                                                             // 229
				searchResultFromProject: true,                                                                                   // 230
			}                                                                                                                 // 231
		);                                                                                                                 // 232
		return newId;                                                                                                      // 233
	},                                                                                                                  // 234
	updateProject: function (data) {                                                                                    // 235
		var full = '';                                                                                                     // 236
		check(data, Match.Any);                                                                                            // 237
		full = full.concat(data.projectNumber).concat(" ");                                                                // 238
		full = full.concat(data.projectName).concat(" ");                                                                  // 239
		full = full.concat(data.projectDescription).concat(" ");                                                           // 240
    full = full.concat(data.tagsNoHTML).concat(" ");                                                                 // 241
		previousProject = Projects.findOne(data.projectId);                                                                // 242
		Projects.update(                                                                                                   // 243
			{                                                                                                                 // 244
			  $and: [                                                                                                         // 245
			  	{                                                                                                              // 246
						_id: data.projectId,                                                                                           // 247
					},                                                                                                              // 248
			  ],                                                                                                              // 249
			},                                                                                                                // 250
			{                                                                                                                 // 251
		      projectNumber: data.projectNumber,                                                                           // 252
					projectName: data.projectName,                                                                                  // 253
					projectDescription: data.projectDescription,                                                                    // 254
					projectManagerIds: data.projectManagerIds,                                                                      // 255
					tags: data.tags,                                                                                                // 256
					addedBy: previousProject.addedBy,                                                                               // 257
					addedDate: previousProject.addedDate,                                                                           // 258
					modifiedBy: Meteor.userId(),                                                                                    // 259
					modifiedDate: moment().format("DD.MM.YYYY HH:mm"),                                                              // 260
					full: full,                                                                                                     // 261
					searchResultFromProject: true,                                                                                  // 262
			},                                                                                                                // 263
			{                                                                                                                 // 264
			    upsert: true,                                                                                                 // 265
			}                                                                                                                 // 266
		);                                                                                                                 // 267
	},                                                                                                                  // 268
	createProject: function () {                                                                                        // 269
		var projectId;                                                                                                     // 270
		var userId = Meteor.userId();                                                                                      // 271
		projectId = Projects.insert(                                                                                       // 272
			{                                                                                                                 // 273
				projectNumber: "",                                                                                               // 274
				projectName: "",                                                                                                 // 275
				projectDescription: "",                                                                                          // 276
				projectManagerIds: [userId],                                                                                     // 277
				addedBy: userId,                                                                                                 // 278
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 279
				tags: "",                                                                                                        // 280
				full: "",                                                                                                        // 281
				searchResultFromProjects: true,                                                                                  // 282
			}                                                                                                                 // 283
		);                                                                                                                 // 284
		return projectId;                                                                                                  // 285
	},                                                                                                                  // 286
	createMinutes: function (data) {                                                                                    // 287
		var minutesId;                                                                                                     // 288
		var userId = Meteor.userId();                                                                                      // 289
    var user = Members.collection.findOne({accountId: userId});                                                      // 290
    var username = user.profile.nickname;                                                                            // 291
		var projectsIds = [];                                                                                              // 292
		check(data, Match.Any);                                                                                            // 293
		if (typeof(data.projectsIds) !== 'undefined') {                                                                    // 294
			projectsIds = data.projectsIds;                                                                                   // 295
		}                                                                                                                  // 296
		minutesId = Minutes.insert(                                                                                        // 297
			{                                                                                                                 // 298
				minutesName: "",                                                                                                 // 299
				minutesTitle: "",                                                                                                // 300
				location: "",                                                                                                    // 301
				minutesDate: moment().format("DD.MM.YYYY"),                                                                      // 302
				author: username,                                                                                                // 303
				recipients: username,                                                                                            // 304
				attendeesPresent: username,                                                                                      // 305
				objective: "",                                                                                                   // 306
				minutesContent: "",                                                                                              // 307
				projectsIds: projectsIds,                                                                                        // 308
				addedBy: Meteor.userId(),                                                                                        // 309
				addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                  // 310
				tags: "",                                                                                                        // 311
				full: "",                                                                                                        // 312
				searchResultFromMinutes: true,                                                                                   // 313
			}                                                                                                                 // 314
		);                                                                                                                 // 315
		return minutesId;                                                                                                  // 316
	},                                                                                                                  // 317
	updateTasksTable: function (data, minutesId, projectsIds) {                                                         // 318
		var i;                                                                                                             // 319
    var arrayLength = data.length;                                                                                   // 320
		var today = moment();                                                                                              // 321
		var full = "";                                                                                                     // 322
		var scheduledEndDate;                                                                                              // 323
		var actionee;                                                                                                      // 324
		check(data, Match.Any);                                                                                            // 325
		check(minutesId, String);                                                                                          // 326
		check(projectsIds, [String]);                                                                                      // 327
    for (i = 0; i < arrayLength; i++) {                                                                              // 328
      RKCore.log(data[i]);                                                                                           // 329
			full = "";                                                                                                        // 330
			if (!data[i].scheduledEndDate) {                                                                                  // 331
				scheduledEndDate = "";                                                                                           // 332
			}                                                                                                                 // 333
			else {                                                                                                            // 334
				scheduledEndDate = data[i].scheduledEndDate;                                                                     // 335
			}                                                                                                                 // 336
			if (!data[i].actionee) {                                                                                          // 337
				actionee = "";                                                                                                   // 338
			}                                                                                                                 // 339
			else {                                                                                                            // 340
				actionee = data[i].actionee;                                                                                     // 341
			}                                                                                                                 // 342
			if (data[i].taskContent) {                                                                                        // 343
				full = full.concat(data[i].taskContent).concat(" ");                                                             // 344
				Tasks.insert(                                                                                                    // 345
					{                                                                                                               // 346
						scheduledStartDate: moment(today).format("DD.MM.YYYY"),                                                        // 347
						effectiveStartDate: "",                                                                                        // 348
						scheduledEndDate: scheduledEndDate,                                                                            // 349
					  effectiveEndDate: "",                                                                                         // 350
						taskContent: data[i].taskContent,                                                                              // 351
						realized: "No",                                                                                                // 352
						projectsIds: projectsIds,                                                                                      // 353
						minutesIds: [minutesId],                                                                                       // 354
						tags: "",                                                                                                      // 355
						additionalText: "",                                                                                            // 356
						actionee: actionee,                                                                                            // 357
						percentageDone: 0,                                                                                             // 358
						addedBy: Meteor.userId(),                                                                                      // 359
						addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                // 360
						full: full,                                                                                                    // 361
						searchResultFromTasks: true,                                                                                   // 362
					}                                                                                                               // 363
				);                                                                                                               // 364
			}                                                                                                                 // 365
    }                                                                                                                // 366
	},                                                                                                                  // 367
	saveTasksTable: function (data) {                                                                                   // 368
		var i;                                                                                                             // 369
    var arrayLength = data.length;                                                                                   // 370
		var today = moment();                                                                                              // 371
		var full = "";                                                                                                     // 372
		var scheduledEndDate;                                                                                              // 373
		var actionee;                                                                                                      // 374
		check(data, Match.Any);                                                                                            // 375
    for (i = 0; i < arrayLength; i++) {                                                                              // 376
      RKCore.log(data[i]);                                                                                           // 377
			full = "";                                                                                                        // 378
			if (!data[i].scheduledEndDate) {                                                                                  // 379
				scheduledEndDate = "";                                                                                           // 380
			}                                                                                                                 // 381
			else {                                                                                                            // 382
				scheduledEndDate = data[i].scheduledEndDate;                                                                     // 383
			}                                                                                                                 // 384
			if (!data[i].actionee) {                                                                                          // 385
				actionee = "";                                                                                                   // 386
			}                                                                                                                 // 387
			else {                                                                                                            // 388
				actionee = data[i].actionee;                                                                                     // 389
			}                                                                                                                 // 390
			if (data[i].taskContent) {                                                                                        // 391
				full = full.concat(data[i].taskContent).concat(" ");                                                             // 392
				full = full.concat(data[i].includedInMinutes).concat(" ");                                                       // 393
				Tasks.insert(                                                                                                    // 394
					{                                                                                                               // 395
						scheduledStartDate: moment(today).format("DD.MM.YYYY"),                                                        // 396
						effectiveStartDate: "",                                                                                        // 397
						scheduledEndDate: scheduledEndDate,                                                                            // 398
					  effectiveEndDate: "",                                                                                         // 399
						taskContent: data[i].taskContent,                                                                              // 400
						realized: "No",                                                                                                // 401
						tags: "",                                                                                                      // 402
						additionalText: "",                                                                                            // 403
						actionee: actionee,                                                                                            // 404
						percentageDone: 0,                                                                                             // 405
						addedBy: Meteor.userId(),                                                                                      // 406
						addedDate: moment().format("DD.MM.YYYY HH:mm"),                                                                // 407
						full: full,                                                                                                    // 408
						searchResultFromTasks: true,                                                                                   // 409
					}                                                                                                               // 410
				);                                                                                                               // 411
			}                                                                                                                 // 412
    }                                                                                                                // 413
	},                                                                                                                  // 414
});                                                                                                                  // 415
                                                                                                                     // 416
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/methodsWebshot.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
  generatePDF: function (data) {                                                                                     // 2
    var fileName = "print.pdf";                                                                                      // 3
    var url = "http://rationalk.ch";                                                                                 // 4
    var set = SettingsRKTasks.findOne({name: "folderPathForMinutesPrint"});                                          // 5
    var options = {                                                                                                  // 6
      renderDelay: 5000,                                                                                             // 7
      "paperSize": {                                                                                                 // 8
        "format": "Letter",                                                                                          // 9
        "orientation": "portrait",                                                                                   // 10
        "margin": "1cm",                                                                                             // 11
      },                                                                                                             // 12
    };                                                                                                               // 13
		if (typeof(set) !== 'undefined') {                                                                                 // 14
			folderPathForMinutesPrint = set.value;                                                                            // 15
      // Remove last trailing slash if any :                                                                         // 16
      folderPathForMinutesPrint = folderPathForMinutesPrint.replace(/\/$/, "");                                      // 17
		}                                                                                                                  // 18
    else {                                                                                                           // 19
      folderPathForMinutesPrint = "~/Downloads";                                                                     // 20
    }                                                                                                                // 21
    if (typeof(data.fileName) !== 'undefined') {                                                                     // 22
      fileName = data.fileName;                                                                                      // 23
    }                                                                                                                // 24
    filePath = folderPathForMinutesPrint + "/" + fileName;                                                           // 25
    if (typeof(data.url) !== 'undefined') {                                                                          // 26
      url = data.url + '/serverToken/1234';                                                                          // 27
      //var url = "http://localhost:3000/print/minutes/6ZiBTbyC5ddmhi9nX/serverToken/1234";                          // 28
    }                                                                                                                // 29
    check(data, Match.Any);                                                                                          // 30
    webshot(url, filePath, options, function (err) {                                                                 // 31
        RKCore.log("Screenshot (" + url + ") saved : " + filePath);                                                  // 32
        if (err) {                                                                                                   // 33
          RKCore.log("err : ");                                                                                      // 34
          RKCore.log(err);                                                                                           // 35
        }                                                                                                            // 36
      });                                                                                                            // 37
    return filePath;                                                                                                 // 38
  },                                                                                                                 // 39
});                                                                                                                  // 40
                                                                                                                     // 41
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/methodsDashboard.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
  getMyTasksToDo: function () {                                                                                      // 2
    var tasks = '';                                                                                                  // 3
    var userId = Meteor.userId();                                                                                    // 4
    var memberId;                                                                                                    // 5
    var nTasks;                                                                                                      // 6
    var i;                                                                                                           // 7
    var formattedProjectNames = [];                                                                                  // 8
    var formattedActioneeNames = [];                                                                                 // 9
    var formattedMinutesNames = [];                                                                                  // 10
    memberId = Members.collection.findOne({accountId: userId})._id;                                                  // 11
    tasks = Tasks.find(                                                                                              // 12
      {                                                                                                              // 13
        $and: [                                                                                                      // 14
          {                                                                                                          // 15
            actioneeIds: {                                                                                           // 16
              $in: [memberId],                                                                                       // 17
            },                                                                                                       // 18
          },                                                                                                         // 19
          {                                                                                                          // 20
            realized: "No",                                                                                          // 21
          },                                                                                                         // 22
        ],                                                                                                           // 23
      }).fetch();                                                                                                    // 24
                                                                                                                     // 25
    nTasks = tasks.length;                                                                                           // 26
                                                                                                                     // 27
    for (i = 0; i < nTasks; i++) {                                                                                   // 28
      nMinutesIds = tasks[i].minutesIds.length;                                                                      // 29
      formattedMinutesNames = [];                                                                                    // 30
      for (j = 0; j < nMinutesIds; j++) {                                                                            // 31
        minutes = Minutes.findOne(tasks[i].minutesIds[j]);                                                           // 32
        formattedMinutesNames.push(minutes.minutesName);                                                             // 33
      }                                                                                                              // 34
      tasks[i].formattedMinutesNames =  formattedMinutesNames;                                                       // 35
                                                                                                                     // 36
      nProjectIds = tasks[i].projectsIds.length;                                                                     // 37
      formattedProjectNames = [];                                                                                    // 38
      for (j = 0; j < nProjectIds; j++) {                                                                            // 39
        project = Projects.findOne(tasks[i].projectsIds[j]);                                                         // 40
        formattedProjectNames.push(project.projectNumber);                                                           // 41
      }                                                                                                              // 42
      tasks[i].formattedProjectNames =  formattedProjectNames;                                                       // 43
                                                                                                                     // 44
      nActioneeIds = tasks[i].actioneeIds.length;                                                                    // 45
      formattedActioneeNames = [];                                                                                   // 46
      for (j = 0; j < nActioneeIds; j++) {                                                                           // 47
        member = Members.collection.findOne(tasks[i].actioneeIds[j]);                                                // 48
        formattedActioneeNames.push(member.profile.nickname);                                                        // 49
      }                                                                                                              // 50
      tasks[i].formattedActioneeNames =  formattedActioneeNames;                                                     // 51
    }                                                                                                                // 52
                                                                                                                     // 53
                                                                                                                     // 54
    RKCore.log("tasks object sent to dashboard : ");                                                                 // 55
    RKCore.log(tasks);                                                                                               // 56
                                                                                                                     // 57
    return tasks;                                                                                                    // 58
  },                                                                                                                 // 59
});                                                                                                                  // 60
                                                                                                                     // 61
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/methodsSettings.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
  getSettingsRKTasks: function (name) {                                                                              // 2
    var value = '';                                                                                                  // 3
    var settings;                                                                                                    // 4
    check(name, String);                                                                                             // 5
    RKCore.log("getSettingsRKTasks server method");                                                                  // 6
    RKCore.log(SettingsRKTasks.find({}).fetch());                                                                    // 7
    settings = SettingsRKTasks.findOne({name: name});                                                                // 8
    if (typeof(settings) !== 'undefined') {                                                                          // 9
      value = settings.value;                                                                                        // 10
    }                                                                                                                // 11
    RKCore.log("value :");                                                                                           // 12
    RKCore.log(value);                                                                                               // 13
    return value;                                                                                                    // 14
  },                                                                                                                 // 15
  updateSettingsRKTasks: function (data) {                                                                           // 16
    RKCore.log(data);                                                                                                // 17
    check(data, Match.Any);                                                                                          // 18
    if (typeof(data.prefixMinutes) !== 'undefined') {                                                                // 19
      SettingsRKTasks.update(                                                                                        // 20
  			{                                                                                                               // 21
  			  name: "prefixMinutes",                                                                                        // 22
  			},                                                                                                              // 23
        {                                                                                                            // 24
          $set: {value: data.prefixMinutes},                                                                         // 25
        },                                                                                                           // 26
        {                                                                                                            // 27
  			  upsert: true,                                                                                                 // 28
  			}                                                                                                               // 29
      );                                                                                                             // 30
    }                                                                                                                // 31
    if (typeof(data.folderPathForMinutesPrint) !== 'undefined') {                                                    // 32
      SettingsRKTasks.update(                                                                                        // 33
  			{                                                                                                               // 34
  			  name: "folderPathForMinutesPrint",                                                                            // 35
  			},                                                                                                              // 36
        {                                                                                                            // 37
          $set: {value: data.folderPathForMinutesPrint},                                                             // 38
        },                                                                                                           // 39
        {                                                                                                            // 40
  			  upsert: true,                                                                                                 // 41
  			}                                                                                                               // 42
      );                                                                                                             // 43
    }                                                                                                                // 44
    RKCore.log(SettingsRKTasks.find({}).fetch());                                                                    // 45
    return true;                                                                                                     // 46
  },                                                                                                                 // 47
});                                                                                                                  // 48
                                                                                                                     // 49
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/sendReminders.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 1
		sendReminders = function () {                                                                                      // 2
	      	Meteor.call('sendReminders');                                                                                // 3
		};                                                                                                                 // 4
		sendRemindersActionee = function () {                                                                              // 5
	      	Meteor.call('sendRemindersActionee');                                                                        // 6
		};                                                                                                                 // 7
                                                                                                                     // 8
		SyncedCron.add({                                                                                                   // 9
			  name: 'Send task event reminders',                                                                              // 10
			  schedule: function (parser) {                                                                                   // 11
			    return parser.text("at 08:00 am");                                                                            // 12
					//return parser.text("every 1 minute");                                                                         // 13
			  },                                                                                                              // 14
			  job: sendReminders,                                                                                             // 15
		});                                                                                                                // 16
                                                                                                                     // 17
		SyncedCron.add({                                                                                                   // 18
			  name: 'Send task event reminders to actionee',                                                                  // 19
			  schedule: function (parser) {                                                                                   // 20
			    return parser.text("at 08:01 am");                                                                            // 21
					//return parser.text("every 1 minute");                                                                         // 22
			  },                                                                                                              // 23
			  job: sendRemindersActionee,                                                                                     // 24
		});                                                                                                                // 25
                                                                                                                     // 26
		Meteor.methods({                                                                                                   // 27
			sendReminders: function () {                                                                                      // 28
				var html;                                                                                                        // 29
				var editLink;                                                                                                    // 30
				allTasks = Tasks.find(                                                                                           // 31
					{                                                                                                               // 32
						$and: [                                                                                                        // 33
							{                                                                                                             // 34
								sendReminder: true,                                                                                          // 35
							},                                                                                                            // 36
							{                                                                                                             // 37
								scheduledEndDate: moment().format('DD.MM.YYYY'),                                                             // 38
							},                                                                                                            // 39
						],                                                                                                             // 40
					}                                                                                                               // 41
				).fetch();                                                                                                       // 42
                                                                                                                     // 43
				nTasks = allTasks.length;                                                                                        // 44
				RKCore.log("I will send " + nTasks + " email(s)");                                                               // 45
                                                                                                                     // 46
				for (i = 0; i < nTasks; i++) {                                                                                   // 47
					html = '<p><strong>' + TAPi18n.__("Task content") + ' :</strong>' + allTasks[i].taskContent + '</p>';           // 48
                                                                                                                     // 49
					editLink = '<p><a href="' +                                                                                     // 50
						Router.routes.editTask.url({_id: allTasks[i]._id})                                                             // 51
						+ '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 52
						+ '>'                                                                                                          // 53
						+ Router.routes.editTask.url({_id: allTasks[i]._id})                                                           // 54
						+ '</a></p>';                                                                                                  // 55
					html = html + editLink;                                                                                         // 56
                                                                                                                     // 57
					html = html + '<p>' + TAPi18n.__('Scheduled end date') + ' :' + allTasks[i].scheduledEndDate + '</p>';          // 58
                                                                                                                     // 59
					html = html + '<p>' + TAPi18n.__('You are receiving this email because you are author of this task') + '.</p>'; // 60
                                                                                                                     // 61
					Email.send({                                                                                                    // 62
		        from: Meteor.settings.rationalK_mail.from,                                                                 // 63
		        to: Members.collection.findOne({accountId: allTasks[i].addedBy}).email,                                    // 64
		        subject: "[" + Meteor.settings.public.header_text + "] " + TAPi18n.__("Task reminder"),                    // 65
		        html: html,                                                                                                // 66
		      });                                                                                                          // 67
				}                                                                                                                // 68
		    return true;                                                                                                   // 69
		},                                                                                                                 // 70
		sendRemindersActionee: function () {                                                                               // 71
			var html;                                                                                                         // 72
			var editLink;                                                                                                     // 73
			allTasks = Tasks.find(                                                                                            // 74
				{                                                                                                                // 75
					$and: [                                                                                                         // 76
						{                                                                                                              // 77
							sendReminderActionee: true,                                                                                   // 78
						},                                                                                                             // 79
						{                                                                                                              // 80
							scheduledEndDate: moment().format('DD.MM.YYYY'),                                                              // 81
						},                                                                                                             // 82
					],                                                                                                              // 83
				}                                                                                                                // 84
			).fetch();                                                                                                        // 85
                                                                                                                     // 86
			nTasks = allTasks.length;                                                                                         // 87
			RKCore.log("I will send " + nTasks + " email(s) to the actionee");                                                // 88
                                                                                                                     // 89
			for (i = 0; i < nTasks; i++) {                                                                                    // 90
				senderMember = Members.collection.findOne({accountId: allTasks[i].addedBy});                                     // 91
				sender = {                                                                                                       // 92
					name: senderMember.profile.name,                                                                                // 93
					address: senderMember.email,                                                                                    // 94
				};                                                                                                               // 95
				if (typeof(senderMember.profile.locale) !== 'undefined') {                                                       // 96
					senderLang = senderMember.profile.locale;                                                                       // 97
				}                                                                                                                // 98
				else {                                                                                                           // 99
					senderLang = 'en';                                                                                              // 100
				}                                                                                                                // 101
				RKCore.log("senderLang : ");                                                                                     // 102
				RKCore.log(senderLang);                                                                                          // 103
				//RKCore.log(TAPi18n.getLanguages());                                                                            // 104
				RKCore.log(TAPi18n.__("Task content", {}, senderLang));                                                          // 105
				senderText = '"' + senderMember.profile.name + '" <' + senderMember.email + '>';                                 // 106
				RKCore.log("sender :");                                                                                          // 107
				RKCore.log(sender);                                                                                              // 108
                                                                                                                     // 109
				html = '<p><strong>' + TAPi18n.__("Task content", {}, senderLang) + ' :</strong>' + allTasks[i].taskContent + '</p>';
                                                                                                                     // 111
				editLink = '<p><a href="' +                                                                                      // 112
					Router.routes.editTask.url({_id: allTasks[i]._id})                                                              // 113
					+ '" title="' + TAPi18n.__('Edit', {}, senderLang) + '"'                                                        // 114
					+ '>'                                                                                                           // 115
					+ Router.routes.editTask.url({_id: allTasks[i]._id})                                                            // 116
					+ '</a></p>';                                                                                                   // 117
				html = html + editLink;                                                                                          // 118
                                                                                                                     // 119
				html = html + '<p>' + TAPi18n.__('Scheduled end date', {}, senderLang) + ' :' + allTasks[i].scheduledEndDate + '</p>';
                                                                                                                     // 121
				html = html + '<p>' + TAPi18n.__('You are receiving this email because you have been listed as an actionee for this task by', {}, senderLang) + " " + senderMember.profile.name + '.</p>';
                                                                                                                     // 123
				RKCore.log("html : ");                                                                                           // 124
				RKCore.log(html);                                                                                                // 125
                                                                                                                     // 126
				actioneeIds = allTasks[i].actioneeIds;                                                                           // 127
				RKCore.log("actioneeIds : ");                                                                                    // 128
				RKCore.log(actioneeIds);                                                                                         // 129
				nActionee = actioneeIds.length;                                                                                  // 130
				to = [];                                                                                                         // 131
				recipients = '';                                                                                                 // 132
				for (j = 0; j < nActionee; j++) {                                                                                // 133
					actionee = Members.collection.findOne({_id: actioneeIds[j]});                                                   // 134
					to.push({                                                                                                       // 135
						name: actionee.profile.name,                                                                                   // 136
						address: actionee.email,                                                                                       // 137
					});                                                                                                             // 138
					recipients = recipients + '"' + actionee.profile.name + '" <' + actionee.email + '>,';                          // 139
				}                                                                                                                // 140
				recipients = recipients.slice(0, - 1);                                                                           // 141
				RKCore.log("to : ");                                                                                             // 142
				RKCore.log(to);                                                                                                  // 143
				RKCore.log("recipients : ");                                                                                     // 144
				RKCore.log(recipients);                                                                                          // 145
				Email.send({                                                                                                     // 146
					from: senderText,                                                                                               // 147
					to: recipients,                                                                                                 // 148
					cc: senderText,                                                                                                 // 149
					replyTo: senderText,                                                                                            // 150
					subject: "[" + Meteor.settings.public.header_text + "] " + TAPi18n.__("Task reminder", {}, senderLang),         // 151
					html: html,                                                                                                     // 152
				});                                                                                                              // 153
			}                                                                                                                 // 154
			return true;                                                                                                      // 155
	},                                                                                                                  // 156
	});                                                                                                                 // 157
} // end of is Server check                                                                                          // 158
                                                                                                                     // 159
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/followup.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 1
  Meteor.methods({                                                                                                   // 2
    createFollowUp: function (data) {                                                                                // 3
      check(data, {                                                                                                  // 4
          text: String,                                                                                              // 5
          tags: String,                                                                                              // 6
        }                                                                                                            // 7
      );                                                                                                             // 8
      FollowUp.insert({                                                                                              // 9
        createdAt: new Date(),                                                                                       // 10
  			who: Meteor.userId(),                                                                                           // 11
  			tags: data.tags,                                                                                                // 12
  			text: data.text,                                                                                                // 13
  		});                                                                                                              // 14
      return true;                                                                                                   // 15
    },                                                                                                               // 16
  }); //end of server methods                                                                                        // 17
}// end of if Server                                                                                                 // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/backup.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RKCore.packageBackup.push(                                                                                           // 1
  {                                                                                                                  // 2
    "collections": ["tasks", "minutes", "projects", "settingsrktasks"],                                              // 3
    "fromPackage": "rationalk:tasks",                                                                                // 4
  }                                                                                                                  // 5
);                                                                                                                   // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/logs.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Tasks.after.insert(function (userId, doc) {                                                                          // 1
  var data = {};                                                                                                     // 2
  var historyType = "taskCreation";                                                                                  // 3
  data.doc = doc;                                                                                                    // 4
  data.previous = this.previous;                                                                                     // 5
  data.package = "rationalk:tasks";                                                                                  // 6
  text = TAPi18n.__("A task has been created");                                                                      // 7
  Meteor.history(text, data, historyType, doc._id);                                                                  // 8
});                                                                                                                  // 9
                                                                                                                     // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/lib/server/notifications.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Tasks.after.update(function (userId, doc) {                                                                          // 1
  var data = {};                                                                                                     // 2
  var historyType = "taskUpdated";                                                                                   // 3
  var user = Members.collection.findOne({accountId: userId});                                                        // 4
  var username = user.profile.nickname;                                                                              // 5
  data.doc = doc;                                                                                                    // 6
  data.previous = this.previous;                                                                                     // 7
  data.package = "rationalk:tasks";                                                                                  // 8
  text = TAPi18n.__("A task has been modified");                                                                     // 9
  Meteor.history(text, data, historyType, doc._id);                                                                  // 10
                                                                                                                     // 11
  if ((this.previous.realized === "No" ) && (doc.realized === "Yes")) {                                              // 12
    html = '<p><strong>' + TAPi18n.__("Task content") + ' :</strong>' + doc.taskContent + '</p>';                    // 13
    html = html + '<p><strong>' + TAPi18n.__("Marked as done by") + ' :</strong>' + username + '</p>';               // 14
                                                                                                                     // 15
    editLink = '<p><a href="' +                                                                                      // 16
      Router.routes.editTask.url({_id: doc._id})                                                                     // 17
      + '" title="' + TAPi18n.__('Edit') + '"'                                                                       // 18
      + '>'                                                                                                          // 19
      + Router.routes.editTask.url({_id: doc._id})                                                                   // 20
      + '</a></p>';                                                                                                  // 21
    html = html + editLink;                                                                                          // 22
                                                                                                                     // 23
    html = html + '<p>' + TAPi18n.__('Scheduled end date') + ' :' + doc.scheduledEndDate + '</p>';                   // 24
                                                                                                                     // 25
    html = html + '<p>' + TAPi18n.__('You are receiving this email because you are author of this task') + '.</p>';  // 26
                                                                                                                     // 27
    Email.send({                                                                                                     // 28
      from: Meteor.settings.rationalK_mail.from,                                                                     // 29
      to: Members.collection.findOne({accountId: doc.addedBy}).email,                                                // 30
      subject: "[" + Meteor.settings.public.header_text + "] " + TAPi18n.__("Task marked as done"),                  // 31
      html: html,                                                                                                    // 32
    });                                                                                                              // 33
  }                                                                                                                  // 34
});                                                                                                                  // 35
                                                                                                                     // 36
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/packages/rationalk:tasksi18n/en.i18n.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "rationalk:tasks",                                                                                // 2
    namespace = "rationalk:tasks";                                                                                   // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
// integrate the fallback language translations                                                                      // 8
translations = {};                                                                                                   // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};             // 10
TAPi18n._loadLangFileObject("en", translations);                                                                     // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                  // 12
                                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rationalk:tasks/packages/rationalk:tasksi18n/fr.i18n.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _ = Package.underscore._,                                                                                        // 1
    package_name = "rationalk:tasks",                                                                                // 2
    namespace = "rationalk:tasks";                                                                                   // 3
                                                                                                                     // 4
if (package_name != "project") {                                                                                     // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                            // 6
}                                                                                                                    // 7
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                      // 8
  TAPi18n.translations["fr"] = {};                                                                                   // 9
}                                                                                                                    // 10
                                                                                                                     // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                           // 12
  TAPi18n.translations["fr"][namespace] = {};                                                                        // 13
}                                                                                                                    // 14
                                                                                                                     // 15
_.extend(TAPi18n.translations["fr"][namespace], {"The task has been updated successfully":"Tâche mise à jour avec succés","Scheduled start date":"Date de début prévisionelle","Effective start date":"Date de départ réelle","Scheduled end date":"Date de fin prévisionelle","Effective end date":"Date de fin réelle","Realized":"Realisé","Percentage Done":"% realisé","Percentage done":"% realisé","The task is still open":"La tâche est encore ouverte","Tasks":"Tâches","See all minutes for this project":"Voir tous les PV pour ce projet","Task reminder":"Rappel d'une tâche","Task content":"Contenu de la tâche","Send a reminder to the author at 8am on the scheduled end date":"Envoyer un rappel à l'auteur à 8 heures à la date de fin prévue","Send a reminder to the actionee at 8am on the scheduled end date":"Envoyer un rappel aux réalisateurs à 8 heures à la date de fin prévue","Show task in gantt":"Montrer cette tâche dans le gantt","Closed by":"Clôturée par","Update gantt":"Mettre à jour le gantt","Create a new task":"Créer une nouvelle tâche","View all tasks":"Voir toutes les tâches","Nothing to show for the moment":"Rien à afficher pour le moment","Filter by":"Filtrer par","Show realized tasks":"Montrer également les tâches déjà réalisées","project":"projet","projects":"projet(s)","Projects":"Projets","All projects":"Tous les projets","All actionees":"Tous les réalisateurs enregistrés","Author":"Auteur","author":"auteur","actionee":"réalisateur enregistré","Actionee":"Réalisateur(s)","Content":"Contenu","Added Date":"Date de création","Tags":"Mots clés","Added date":"Date de création","Yes":"Oui","No":"Non","On condition":"Sous réserve","Edit Task":"Modifier une tâche","Back to tasks list":"Retour à la liste des tâches","Additional text":"Informations complémentaires","Mark as done":"Marquer comme terminée","A new task has been added successfully":"Tâche ajoutée avec succés","Task deleted succesfully":"Tâche supprimée avec succès","Task marked as done":"Tâche terminée","comma":"virgule","dot":"point","semicoma":"point virgule","tab":"tabulation","With quotes":"Avec guillemets","Exported csv":"Données exportées au format csv à copier coller dans excel","Include in minutes":"Inclure dans le procés verbal","Minutes-20151028":"PV-28102015","Minutes":"PV","Back to minutes list":"Retour à la liste des PV","minutes":"PV","All minutes":"Tous les PV","Quick table import":"Import rapide de tâches","The tasks have been imported successfully":"Les tâches ont été importées avec succès","Location":"Lieu","Date":"Date","Recipients":"Distribution","Attendees":"Présent(s)","Objective":"Objectif(s)","Name":"Nom","Text":"Texte","Save and go back to minutes list":"Sauver et retourner à la liste des PV","Task":"Tâche","New tasks":"Nouvelles tâches","Linked tasks":"Tâche(s) liée(s)","Other informations":"Autres informations","The task has been duplicated successfully. Please edit the task and save.":"La tâche a été dupliquée, vous pouvez maintenant l'éditer et la sauver","Tasks details":"Détails des tâches","Create a new project":"Créer un projet","ID":"Nr","Project name":"Nom du projet","Project(s)":"Projet(s)","Project description":"Description du projet","Project deleted succesfully":"Projet supprimé avec succés","Edit project":"Modifier un projet","project manager":"chef de projet","Project manager":"Chef de projet","Back to projects list":"Retour à la liste des projets","Save and go back to projects list":"Sauver et retourner à la liste des projets","Project number":"Numéro de projet","Linked minutes":"PV lié(s) à ce projet","Linked task(s)":"Tâche(s) liée(s) à ce projet","The project has been updated successfully":"Le projet à été mis à jour avec succés","The project has been duplicated successfully. Please edit and save.":"Le projet a été dupliqué avec succés. Vous pouvez maintenant le modifier.","Are you sure you want to delete this project ?":"Etes-vous sûr de vouloir supprimer ce projet ?","Minutes name":"Nom du PV","Minutes title":"Titre du PV","Are you sure you want to delete this task ?":"Etes-vous sûr de vouloir supprimer cette tâche ?","Are you sure you want to delete this minutes ?":"Etes-vous sûr de vouloir supprimer ce PV ?","Add a task to this project":"Ajouter une tâche à ce projet","Add minutes to this project":"Ecrire un PV pour ce projet","Others projects":"Autre(s) projet(s)","Others minutes":"Autre(s) PV","View all minutes":"Tous les PV","View minutes that I wrote":"Les PV que j'ai écris","Create a new minutes":"Ecrire un PV","Print":"Imprimer","View tasks that I wrote":"Les tâches que j'ai écrites","Save and go back to tasks list":"Sauver et retourner à la liste des tâches","If you add actionees, you will be able to filter by actionee":"Ajouter des réalisateurs aux tâches pour pouvoir filtrer par réalisateur","Show follow-up":"Voir le follow-up","My tasks":"Mes tâches","It looks that you have no open tasks !":"Vous n'avez aucune tâche ouverte !","You are receiving this email because you have been listed as an actionee for this task by":"Vous recevez cet email car vous avez été listé comme réalisateur de cette tâche par","You are receiving this email because you are author of this task":"Vous recevez cet email car vous êtes auteur de cette tâche","Prefix for minutes name":"Prefixe pour les noms des PV","Path to save minutes as pdf":"Dossier (server) où enregistrer les minutes en pdf","No trailing slash /":"Pas de slash / de fin","Save as a pdf file to predefined server location":"Enregistrer en pdf sur le server (endroit prédéfini)","The minutes has been saved to":"Le PV a été sauvegardé sous","Other projects":"Autres projets"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                  // 17
                                                                                                                     // 18
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
