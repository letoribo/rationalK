(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/package-i18n.js                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
TAPi18n.packages["rationalk:touchscreen"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                                  // 2
// define package's translation function (proxy to the i18next)                                                   // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                  // 4
// define the package's templates registrar                                                                       // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:touchscreen");                                 // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                  // 8
// Record the list of templates prior to package load                                                             // 9
var _ = Package.underscore._;                                                                                     // 10
non_package_templates = _.keys(Template);                                                                         // 11
                                                                                                                  // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/methods.js                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
RKTouchScreen = {};                                                                                               // 1
RKTouchScreen.Collections = {};                                                                                   // 2
                                                                                                                  // 3
Meteor.methods({                                                                                                  // 4
                                                                                                                  // 5
});                                                                                                               // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/collections.js                                                              //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
ProjectsTouchScreen = new Mongo.Collection('projectstouchscreen');                                                // 1
SettingsRKTouchScreen = new Mongo.Collection('settingsrktouchscreen');                                            // 2
                                                                                                                  // 3
ProjectsTouchScreen.allow( {                                                                                      // 4
		insert: function (userId) {return !! userId; },                                                                 // 5
		update: function (userId) {return !!userId; },                                                                  // 6
    remove: function (userId) {return !!userId; },                                                                // 7
});                                                                                                               // 8
                                                                                                                  // 9
SettingsRKTouchScreen.allow( {                                                                                    // 10
		insert: function (userId) {return !! userId; },                                                                 // 11
		update: function (userId) {return !!userId; },                                                                  // 12
    remove: function (userId) {return !!userId; },                                                                // 13
});                                                                                                               // 14
                                                                                                                  // 15
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/routes.js                                                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
if (Meteor.settings.public.show.touchscreen) {                                                                    // 1
  Router.route("/projectsTouchScreen", {                                                                          // 2
    name: "viewProjectsTouchScreen",                                                                              // 3
    waitOn: function () {                                                                                         // 4
      Meteor.subscribe("projectstouchscreen");                                                                    // 5
      return [Meteor.subscribe("members")];                                                                       // 6
    },                                                                                                            // 7
  });                                                                                                             // 8
}                                                                                                                 // 9
                                                                                                                  // 10
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/menu.js                                                              //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var urlTasks = Router.routes.tasks.path(                                                                          // 1
  {                                                                                                               // 2
    filterBy: 'authorUserId',                                                                                     // 3
  });                                                                                                             // 4
var urlMinutes = Router.routes.minutes.path();                                                                    // 5
var urlProjects = Router.routes.viewProjects.path();                                                              // 6
menuHTML = new Spacebars.SafeString(                                                                              // 7
   '<li role="separator" class="divider"></li>'                                                                   // 8
    + '<li class="dropdown-header">' + TAPi18n.__("Touchscreen") + '</li>'                                        // 9
    //+ '<li><a href="' + urlProjects + '" title="' + TAPi18n.__("Projects") + '">' + TAPi18n.__("Prhojects") + '</a></li>'
    //+ '<li><a href="' + urlTasks + '" title="' + TAPi18n.__("Tasks") + '">' + TAPi18n.__("Tasks") + '</a></li>' // 11
    //+ '<li><a href="' + urlMinutes + '" title="' + TAPi18n.__("Minutes") + '">' + TAPi18n.__("Minutes") + '</a></li>'
    + '<li role="separator" class="divider"></li>'                                                                // 13
);                                                                                                                // 14
/*                                                                                                                // 15
var packageMenu;                                                                                                  // 16
packageMenu = Session.get("packageMenu")                                                                          // 17
packageMenu.push(                                                                                                 // 18
  {                                                                                                               // 19
    "menuHTML": menuHTML,                                                                                         // 20
    "fromPackage": "rationalk:tasks",                                                                             // 21
  }                                                                                                               // 22
);                                                                                                                // 23
Session.set(packageMenu);                                                                                         // 24
*/                                                                                                                // 25
if (Meteor.settings.public.show.touchscreen) {                                                                    // 26
  RKCore.packageMenu.push(                                                                                        // 27
    {                                                                                                             // 28
      "menuHTML": menuHTML,                                                                                       // 29
      "fromPackage": "rationalk:tasks",                                                                           // 30
    }                                                                                                             // 31
  );                                                                                                              // 32
}                                                                                                                 // 33
                                                                                                                  // 34
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/dashboard.js                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
if (Meteor.settings.public.show.touchscreen) {                                                                    // 1
  RKCore.packageDashboard.push(                                                                                   // 2
    {                                                                                                             // 3
      "templateName": "dashboardRKTouchscreen",                                                                   // 4
      "fromPackage": "rationalk:touchscreen",                                                                     // 5
    }                                                                                                             // 6
  );                                                                                                              // 7
}                                                                                                                 // 8
                                                                                                                  // 9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/settings.js                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
RKCore.packageSettings.push(                                                                                      // 1
  {                                                                                                               // 2
    "templateName": "settingsRKTasks",                                                                            // 3
    "fromPackage": "rationalk:tasks",                                                                             // 4
  }                                                                                                               // 5
);                                                                                                                // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/template.settingsRKTouchScreen.js                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("settingsRKTouchScreen");                                                                    // 2
Template["settingsRKTouchScreen"] = new Template("Template.settingsRKTouchScreen", (function() {                  // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "row"                                                                                                // 6
  }, "\n		", HTML.DIV({                                                                                           // 7
    "class": "col-md-12"                                                                                          // 8
  }, "\n			 ", HTML.DIV({                                                                                         // 9
    "class": "panel panel-default"                                                                                // 10
  }, "\n				", HTML.DIV({                                                                                         // 11
    "class": "panel-heading",                                                                                     // 12
    style: "position:relative"                                                                                    // 13
  }, "\n					", HTML.H3({                                                                                         // 14
    "class": "panel-title"                                                                                        // 15
  }, Blaze.View("lookup:_", function() {                                                                          // 16
    return Spacebars.mustache(view.lookup("_"), "Tasks");                                                         // 17
  })), "\n				"), "\n				", HTML.DIV({                                                                            // 18
    "class": "panel-body"                                                                                         // 19
  }, "\n          ", HTML.FORM({                                                                                  // 20
    id: "settingsRKTasks"                                                                                         // 21
  }, "\n            ", HTML.DIV({                                                                                 // 22
    "class": "form-group"                                                                                         // 23
  }, "\n              ", HTML.LABEL({                                                                             // 24
    "for": "prefixMinutes"                                                                                        // 25
  }, Blaze.View("lookup:_", function() {                                                                          // 26
    return Spacebars.mustache(view.lookup("_"), "Prefix for minutes name");                                       // 27
  })), "\n              ", HTML.INPUT({                                                                           // 28
    type: "text",                                                                                                 // 29
    "class": "form-control",                                                                                      // 30
    id: "prefixMinutes",                                                                                          // 31
    placeholder: function() {                                                                                     // 32
      return Spacebars.mustache(view.lookup("_"), "Minutes");                                                     // 33
    },                                                                                                            // 34
    value: function() {                                                                                           // 35
      return Spacebars.mustache(view.lookup("prefixMinutes"));                                                    // 36
    }                                                                                                             // 37
  }), "\n            "), "\n						", HTML.DIV({                                                                   // 38
    "class": "form-group"                                                                                         // 39
  }, "\n              ", HTML.LABEL({                                                                             // 40
    "for": "folderPathForMinutesPrint"                                                                            // 41
  }, Blaze.View("lookup:_", function() {                                                                          // 42
    return Spacebars.mustache(view.lookup("_"), "Path to save minutes as pdf");                                   // 43
  })), "\n              ", HTML.INPUT({                                                                           // 44
    type: "text",                                                                                                 // 45
    "class": "form-control",                                                                                      // 46
    id: "folderPathForMinutesPrint",                                                                              // 47
    placeholder: function() {                                                                                     // 48
      return Spacebars.mustache(view.lookup("_"), "/Downloads");                                                  // 49
    },                                                                                                            // 50
    value: function() {                                                                                           // 51
      return Spacebars.mustache(view.lookup("folderPathForMinutesPrint"));                                        // 52
    }                                                                                                             // 53
  }), "\n							", HTML.P({                                                                                       // 54
    "class": "help-block"                                                                                         // 55
  }, Blaze.View("lookup:_", function() {                                                                          // 56
    return Spacebars.mustache(view.lookup("_"), "No trailing slash /");                                           // 57
  })), "\n            "), "\n          ", HTML.BUTTON({                                                           // 58
    type: "submit",                                                                                               // 59
    "class": "btn btn-default"                                                                                    // 60
  }, Blaze.View("lookup:_", function() {                                                                          // 61
    return Spacebars.mustache(view.lookup("_"), "Save");                                                          // 62
  })), "\n          "), "\n				"), "\n				"), "\n		"), "\n	");                                                    // 63
}));                                                                                                              // 64
                                                                                                                  // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/settingsRKTouchScreen.js                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.settingsRKTouchScreen.rendered = function () {                                                           // 1
  var settingsRKTasks = {};                                                                                       // 2
  Meteor.call('getSettingsRKTasks', "prefixMinutes", function (error, result) {                                   // 3
		if (!error) {                                                                                                   // 4
      if (typeof(Session.get("settingsRKTasks")) !== 'undefined') {                                               // 5
        settingsRKTasks = Session.get("settingsRKTasks");                                                         // 6
      }                                                                                                           // 7
			settingsRKTasks.prefixMinutes = result;                                                                        // 8
      Session.set("settingsRKTasks", settingsRKTasks);                                                            // 9
			return false;                                                                                                  // 10
		}                                                                                                               // 11
	});                                                                                                              // 12
  Meteor.call('getSettingsRKTasks', "folderPathForMinutesPrint", function (error, result) {                       // 13
		if (!error) {                                                                                                   // 14
      if (typeof(Session.get("settingsRKTasks")) !== 'undefined') {                                               // 15
        settingsRKTasks = Session.get("settingsRKTasks");                                                         // 16
      }                                                                                                           // 17
			settingsRKTasks.folderPathForMinutesPrint = result;                                                            // 18
      Session.set("settingsRKTasks", settingsRKTasks);                                                            // 19
			return false;                                                                                                  // 20
		}                                                                                                               // 21
	});                                                                                                              // 22
};                                                                                                                // 23
                                                                                                                  // 24
Template.settingsRKTouchScreen.helpers({                                                                          // 25
  prefixMinutes: function () {                                                                                    // 26
		var settings = Session.get("settingsRKTasks");                                                                  // 27
    if (typeof(settings) !== 'undefined') {                                                                       // 28
		    return settings.prefixMinutes;                                                                              // 29
    }                                                                                                             // 30
	},                                                                                                               // 31
  folderPathForMinutesPrint: function () {                                                                        // 32
   var settings = Session.get("settingsRKTasks");                                                                 // 33
   if (typeof(settings) !== 'undefined') {                                                                        // 34
       return settings.folderPathForMinutesPrint;                                                                 // 35
   }                                                                                                              // 36
 },                                                                                                               // 37
});                                                                                                               // 38
                                                                                                                  // 39
Template.settingsRKTouchScreen.events({                                                                           // 40
  'submit form': function (e) {                                                                                   // 41
    var data = {};                                                                                                // 42
    e.preventDefault();                                                                                           // 43
    data.prefixMinutes = e.target.prefixMinutes.value;                                                            // 44
    data.folderPathForMinutesPrint = e.target.folderPathForMinutesPrint.value;                                    // 45
    Meteor.call('updateSettingsRKTasks', data, function (err) {                                                   // 46
      if (!err) {                                                                                                 // 47
        if (typeof(toastr) !== 'undefined') {                                                                     // 48
          toastr.success(TAPi18n.__('Saved'));                                                                    // 49
        }                                                                                                         // 50
      }                                                                                                           // 51
    });                                                                                                           // 52
  },                                                                                                              // 53
});                                                                                                               // 54
                                                                                                                  // 55
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/template.viewProjectsTouchScreen.js                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("viewProjectsTouchScreen");                                                                  // 2
Template["viewProjectsTouchScreen"] = new Template("Template.viewProjectsTouchScreen", (function() {              // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "row"                                                                                                // 6
  }, "\n		", HTML.DIV({                                                                                           // 7
    "class": "col-md-12"                                                                                          // 8
  }, "\n			", HTML.DIV({                                                                                          // 9
    "class": "panel panel-default"                                                                                // 10
  }, "\n			 	", HTML.DIV({                                                                                        // 11
    "class": "panel-heading",                                                                                     // 12
    style: "position:relative"                                                                                    // 13
  }, "\n			 		", HTML.H3({                                                                                        // 14
    "class": "panel-title"                                                                                        // 15
  }, Blaze.View("lookup:_", function() {                                                                          // 16
    return Spacebars.mustache(view.lookup("_"), "Project(s) Touch Screen");                                       // 17
  }), " ", HTML.SPAN({                                                                                            // 18
    "class": "pull-right"                                                                                         // 19
  }, HTML.A({                                                                                                     // 20
    href: "#",                                                                                                    // 21
    "class": "resetDemoData",                                                                                     // 22
    title: function() {                                                                                           // 23
      return Spacebars.mustache(view.lookup("_"), "Reset demo data");                                             // 24
    }                                                                                                             // 25
  }, Blaze.View("lookup:_", function() {                                                                          // 26
    return Spacebars.mustache(view.lookup("_"), "Reset demo data");                                               // 27
  })))), "\n        "), "\n				", HTML.DIV({                                                                      // 28
    "class": "panel-body"                                                                                         // 29
  }, "\n					", HTML.DIV({                                                                                        // 30
    "class": "row"                                                                                                // 31
  }, "\n						", HTML.DIV({                                                                                       // 32
    "class": "col-md-12"                                                                                          // 33
  }, "\n							", Blaze.If(function() {                                                                           // 34
    return Spacebars.call(view.lookup("demoData"));                                                               // 35
  }, function() {                                                                                                 // 36
    return [ "\n								", HTML.DIV({                                                                             // 37
      "class": "tableScroll"                                                                                      // 38
    }, "\n									", HTML.TABLE({                                                                                // 39
      "class": "table table-striped"                                                                              // 40
    }, "\n										", HTML.TR(HTML.TH("Id"), HTML.TH("Project Id"), HTML.TH("Project Name"), "\n											", Blaze.Each(function() {
      return Spacebars.call(view.lookup("phases"));                                                               // 42
    }, function() {                                                                                               // 43
      return [ "\n											", HTML.TH(Blaze.View("lookup:phaseName", function() {                               // 44
        return Spacebars.mustache(view.lookup("phaseName"));                                                      // 45
      })), "\n											" ];                                                                                     // 46
    }), "\n										"), "\n										", Blaze.Each(function() {                                                  // 47
      return Spacebars.call(view.lookup("demoData"));                                                             // 48
    }, function() {                                                                                               // 49
      return [ "\n											", HTML.TR(HTML.TD(Blaze.View("lookup:_id", function() {                             // 50
        return Spacebars.mustache(view.lookup("_id"));                                                            // 51
      })), HTML.TD(Blaze.View("lookup:projectId", function() {                                                    // 52
        return Spacebars.mustache(view.lookup("projectId"));                                                      // 53
      })), HTML.TD(Blaze.View("lookup:projectName", function() {                                                  // 54
        return Spacebars.mustache(view.lookup("projectName"));                                                    // 55
      })), Blaze.View("lookup:phasesForThisProject", function() {                                                 // 56
        return Spacebars.mustache(view.lookup("phasesForThisProject"));                                           // 57
      })), "\n										" ];                                                                                      // 58
    }), "\n									"), "\n								"), "\n							" ];                                                             // 59
  }, function() {                                                                                                 // 60
    return [ "\n								", HTML.P(Blaze.View("lookup:_", function() {                                             // 61
      return Spacebars.mustache(view.lookup("_"), "Nothing to show for the moment");                              // 62
    })), "\n							" ];                                                                                           // 63
  }), "\n						"), "\n					"), "\n        "), "\n    	"), "\n		"), "\n	");                                        // 64
}));                                                                                                              // 65
                                                                                                                  // 66
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/lib/client/viewProjectsTouchScreen.js                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.viewProjectsTouchScreen.rendered = function () {                                                         // 1
                                                                                                                  // 2
                                                                                                                  // 3
};                                                                                                                // 4
                                                                                                                  // 5
Template.viewProjectsTouchScreen.helpers({                                                                        // 6
	demoData: function () {                                                                                          // 7
		RKCore.log(ProjectsTouchScreen.find().fetch());                                                                 // 8
		return ProjectsTouchScreen.find().fetch();                                                                      // 9
	},                                                                                                               // 10
	phases: function () {                                                                                            // 11
		oneProject = ProjectsTouchScreen.findOne({});                                                                   // 12
		phases = oneProject.phases;                                                                                     // 13
		return phases;                                                                                                  // 14
	},                                                                                                               // 15
	phasesForThisProject: function () {                                                                              // 16
		var str = '';                                                                                                   // 17
		RKCore.log("this._id : ");                                                                                      // 18
		RKCore.log(this._id);                                                                                           // 19
		currentProject = ProjectsTouchScreen.findOne({_id: this._id});                                                  // 20
		phases = currentProject.phases;                                                                                 // 21
		nPhases = phases.length;                                                                                        // 22
		for (i = 0; i < nPhases; i++) {                                                                                 // 23
			str = str + '<td>' + phases[i].phaseScheduledFinishedDate + '<a class="markAsDone" data-phasename="phase1" data-projectid="proo">OK</a>' + '</td>';
		}                                                                                                               // 25
		return new Spacebars.SafeString(str);                                                                           // 26
	},                                                                                                               // 27
});                                                                                                               // 28
                                                                                                                  // 29
Template.viewProjectsTouchScreen.events({                                                                         // 30
	"click a.resetDemoData": function (e) {                                                                          // 31
			var data = {};                                                                                                 // 32
			e.preventDefault();                                                                                            // 33
			data.projectsIds = e.currentTarget.dataset.projectid;                                                          // 34
	    Meteor.call('resetDemoData', function (error, result) {                                                      // 35
				if (!error) {                                                                                                 // 36
				}                                                                                                             // 37
			});                                                                                                            // 38
			return false;                                                                                                  // 39
	},                                                                                                               // 40
	"click a.markPhaseAsDone": function (e) {                                                                        // 41
			var data = {};                                                                                                 // 42
			e.preventDefault();                                                                                            // 43
			data.projectsId = e.currentTarget.dataset.projectid;                                                           // 44
			data.phaseName = e.currentTarget.dataset.phaseName;                                                            // 45
	    Meteor.call('markPhaseAsDone', data, function (error, result) {                                              // 46
				if (!error) {                                                                                                 // 47
				}                                                                                                             // 48
			});                                                                                                            // 49
			return false;                                                                                                  // 50
	},                                                                                                               // 51
});                                                                                                               // 52
                                                                                                                  // 53
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/packages/rationalk:touchscreeni18n/en.i18n.js                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _ = Package.underscore._,                                                                                     // 1
    package_name = "rationalk:touchscreen",                                                                       // 2
    namespace = "rationalk:touchscreen";                                                                          // 3
                                                                                                                  // 4
if (package_name != "project") {                                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                         // 6
}                                                                                                                 // 7
// integrate the fallback language translations                                                                   // 8
translations = {};                                                                                                // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};          // 10
TAPi18n._loadLangFileObject("en", translations);                                                                  // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                                    // 12
                                                                                                                  // 13
for (var i = 0; i < package_templates.length; i++) {                                                              // 14
  var package_template = package_templates[i];                                                                    // 15
                                                                                                                  // 16
  registerI18nTemplate(package_template);                                                                         // 17
}                                                                                                                 // 18
                                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/rationalk:touchscreen/packages/rationalk:touchscreeni18n/fr.i18n.js                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _ = Package.underscore._,                                                                                     // 1
    package_name = "rationalk:touchscreen",                                                                       // 2
    namespace = "rationalk:touchscreen";                                                                          // 3
                                                                                                                  // 4
if (package_name != "project") {                                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                         // 6
}                                                                                                                 // 7
                                                                                                                  // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
