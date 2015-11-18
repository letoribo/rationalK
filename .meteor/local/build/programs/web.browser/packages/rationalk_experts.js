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
var RKExperts, Expert, url, menuHTML;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/methods.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RKExperts = {};                                                                                                        // 1
RKCore.searchResultsPackage.push(                                                                                      // 2
  {                                                                                                                    // 3
    name: "RKExperts", // RKExperts.findAllFullTextSearch should exists                                                // 4
  }                                                                                                                    // 5
);                                                                                                                     // 6
                                                                                                                       // 7
RKExperts.findAll = function () {                                                                                      // 8
  return Expert.find({}).fetch();                                                                                      // 9
};                                                                                                                     // 10
                                                                                                                       // 11
RKExperts.findAllFullTextSearch = function () {                                                                        // 12
  return Expert.find({}, {sort: {score: -1}}).fetch();                                                                 // 13
};                                                                                                                     // 14
                                                                                                                       // 15
RKExperts.findAnd = function (arrayOfAndForExperts) {                                                                  // 16
  return Expert.find({$and: arrayOfAndForExperts }, {limit: 30});                                                      // 17
};                                                                                                                     // 18
                                                                                                                       // 19
RKExperts.findOr = function (arrayOfOrForExperts) {                                                                    // 20
  return Expert.find(                                                                                                  // 21
    {                                                                                                                  // 22
      $or: arrayOfOrForExperts,                                                                                        // 23
    },                                                                                                                 // 24
    {                                                                                                                  // 25
      limit: 30,                                                                                                       // 26
    }                                                                                                                  // 27
  );                                                                                                                   // 28
};                                                                                                                     // 29
                                                                                                                       // 30
RKExperts.findFullText = function (searchQuery) {                                                                      // 31
  var sr;                                                                                                              // 32
  check(searchQuery, String);                                                                                          // 33
  sr = Expert.find(                                                                                                    // 34
    {                                                                                                                  // 35
      $text: {                                                                                                         // 36
        $search: searchQuery,                                                                                          // 37
      },                                                                                                               // 38
    },                                                                                                                 // 39
    {                                                                                                                  // 40
      fields: { score: { $meta: 'textScore' } },                                                                       // 41
      sort: { score: { $meta: 'textScore' } },                                                                         // 42
      limit: 30,                                                                                                       // 43
    });                                                                                                                // 44
    return sr;                                                                                                         // 45
};                                                                                                                     // 46
                                                                                                                       // 47
RKExperts.findDummy = function () {                                                                                    // 48
  return Expert.find({$text: { $search: "somethingthatyouwillneverfind" }});                                           // 49
};                                                                                                                     // 50
                                                                                                                       // 51
                                                                                                                       // 52
Meteor.methods({                                                                                                       // 53
	updateFieldOfExpertise: function (content, userId) {                                                                  // 54
    check(content, String);                                                                                            // 55
    check(userId, String);                                                                                             // 56
		Expert.update(                                                                                                       // 57
			{                                                                                                                   // 58
			  userId: Meteor.userId(),                                                                                          // 59
			},                                                                                                                  // 60
			{                                                                                                                   // 61
		    fieldOfExpertise: content,                                                                                       // 62
        searchResultFromExperts: true,                                                                                 // 63
		    updatedAt: new Date(),                                                                                           // 64
        userId: userId,                                                                                                // 65
			},                                                                                                                  // 66
			{                                                                                                                   // 67
		    upsert: true,                                                                                                    // 68
			}                                                                                                                   // 69
		);                                                                                                                   // 70
		if (typeof(toastr) !== 'undefined') {                                                                                // 71
			toastr.success('Updated succesfully');                                                                              // 72
		}                                                                                                                    // 73
	},                                                                                                                    // 74
});                                                                                                                    // 75
                                                                                                                       // 76
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/collections.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Expert = new Mongo.Collection('expert');                                                                               // 1
                                                                                                                       // 2
Expert.allow( {                                                                                                        // 3
		insert: function (userId) {return !! userId; },                                                                      // 4
		update: function (userId) {return !!userId; },                                                                       // 5
    remove: function (userId) {return !!userId; },                                                                     // 6
});                                                                                                                    // 7
                                                                                                                       // 8
if (Meteor.isServer) {                                                                                                 // 9
	if (typeof Expert.createIndex === 'function') {                                                                       // 10
		Expert.createIndex({ fieldOfExpertise: "text" }, { name: "TextIndex" });                                             // 11
	}                                                                                                                     // 12
	else {                                                                                                                // 13
		if (typeof Expert._ensureIndex === 'function') {                                                                     // 14
			Expert._ensureIndex( { fieldOfExpertise: "text" }, {name: "TextIndex"});                                            // 15
		}                                                                                                                    // 16
	}                                                                                                                     // 17
}                                                                                                                      // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/routes.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Meteor.settings.public.show.expert) {                                                                              // 1
  Router.route("/expert", {                                                                                            // 2
    name: "expert",                                                                                                    // 3
    waitOn: function () {                                                                                              // 4
      return [                                                                                                         // 5
        Meteor.subscribe("expert"),                                                                                    // 6
        Meteor.subscribe("members"),                                                                                   // 7
      ];                                                                                                               // 8
    },                                                                                                                 // 9
  });                                                                                                                  // 10
                                                                                                                       // 11
  url = Router.routes.expert.path();                                                                                   // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Experts"><strong><span class="glyphicon glyphicon-user"></span></strong> Experts</a></li>');
                                                                                                                       // 14
  RKCore.packageMenu.push(                                                                                             // 15
    {                                                                                                                  // 16
      "menuHTML": menuHTML,                                                                                            // 17
      "fromPackage": "rationalk:experts",                                                                              // 18
    }                                                                                                                  // 19
  );                                                                                                                   // 20
}                                                                                                                      // 21
                                                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/client/template.expert.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("expert");                                                                                        // 2
Template["expert"] = new Template("Template.expert", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "post"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-md-12"                                                                                               // 10
  }, "\n				 ", HTML.DIV({                                                                                             // 11
    "class": "panel panel-default"                                                                                     // 12
  }, "\n				 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n				 		<h3 class="panel-title">My field of expertise</h3>\n	        		</div>'), "\n					", HTML.DIV({
    "class": "panel-body"                                                                                              // 14
  }, "\n						", HTML.FORM("\n					        ", HTML.DIV({                                                               // 15
    "class": "form-group"                                                                                              // 16
  }, "\n							    ", HTML.TEXTAREA({                                                                                  // 17
    "class": "form-control",                                                                                           // 18
    rows: "3",                                                                                                         // 19
    name: "myFieldOfExpertise",                                                                                        // 20
    placeholder: "My Skills",                                                                                          // 21
    value: function() {                                                                                                // 22
      return Spacebars.mustache(view.lookup("myFieldOfExpertise"));                                                    // 23
    }                                                                                                                  // 24
  }), "\n						    "), "\n						    ", HTML.Raw('<button type="submit" class="btn btn-primary">Save</button>'), "\n						    ", HTML.Raw('<p class="help-block">Write down your profile incl. skills and fields of expertise.</p>'), "\n					    "), "\n	        		"), "\n	    		"), "\n			"), "\n		"), "\n	");
}));                                                                                                                   // 26
                                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/client/expert.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.expert.helpers({                                                                                              // 1
	myFieldOfExpertise: function () {                                                                                     // 2
    var myExpert = Expert.findOne({userId: Meteor.userId()});                                                          // 3
    if (typeof(myExpert) !== 'undefined') {                                                                            // 4
		    return myExpert.fieldOfExpertise;                                                                                // 5
    }                                                                                                                  // 6
    return false;                                                                                                      // 7
	},                                                                                                                    // 8
});                                                                                                                    // 9
                                                                                                                       // 10
Template.expert.events({                                                                                               // 11
	'submit form': function (e) {                                                                                         // 12
		var myFieldOfExpertise = e.target.myFieldOfExpertise.value;                                                          // 13
	  e.preventDefault();                                                                                                 // 14
	  Meteor.call('updateFieldOfExpertise', myFieldOfExpertise, Meteor.userId());                                         // 15
	},                                                                                                                    // 16
});                                                                                                                    // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/client/template.expertInSearchResults.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("expertInSearchResults");                                                                         // 2
Template["expertInSearchResults"] = new Template("Template.expertInSearchResults", (function() {                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "post"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-md-10"                                                                                               // 10
  }, "\n				", HTML.P(Blaze.View("lookup:fieldOfExpertise", function() {                                               // 11
    return Spacebars.mustache(view.lookup("fieldOfExpertise"));                                                        // 12
  })), "\n			"), "\n			", HTML.DIV({                                                                                   // 13
    "class": "col-md-2"                                                                                                // 14
  }, "\n				", HTML.Raw('<span class="label label-success"> Expert</span>'), HTML.Raw("<br>"), "\n				 ", HTML.SPAN({  // 15
    "class": "label label-default"                                                                                     // 16
  }, HTML.Raw('<span class="glyphicon glyphicon-user"></span>'), " ", Blaze.View("lookup:memberUsername", function() { // 17
    return Spacebars.mustache(view.lookup("memberUsername"), view.lookup("userId"));                                   // 18
  })), "\n				 ", HTML.Raw("<br>"), "\n	 			", Blaze.If(function() {                                                   // 19
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                                  // 20
  }, function() {                                                                                                      // 21
    return [ "\n	 				", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {                         // 22
      return Spacebars.mustache(view.lookup("textScore"));                                                             // 23
    })), "\n	 			" ];                                                                                                  // 24
  }), "\n			"), "\n		"), "\n	");                                                                                       // 25
}));                                                                                                                   // 26
                                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:experts/lib/client/expertInSearchResults.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.expertInSearchResults.helpers({                                                                               // 1
	memberUsername: function (who) {                                                                                      // 2
			return Members.collection.findOne({accountId: who}).profile.nickname;                                               // 3
	},                                                                                                                    // 4
	searchTypeIsFullTextSearch: function () {                                                                             // 5
		return (Session.get('searchType') === 'fullTextSearch');                                                             // 6
	},                                                                                                                    // 7
	textScore: function () {                                                                                              // 8
		//limit to 2 digits after comma :                                                                                    // 9
		return Math.round(this.score * 100) / 100;                                                                           // 10
	},                                                                                                                    // 11
});                                                                                                                    // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:experts'] = {
  RKExperts: RKExperts
};

})();
