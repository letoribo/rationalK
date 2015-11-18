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
var RKNotes, Notes, url, menuHTML;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/methods.js                                                   //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
RKNotes = {};                                                                                // 1
RKCore.searchResultsPackage.push(                                                            // 2
  {                                                                                          // 3
    name: "RKNotes",                                                                         // 4
  }                                                                                          // 5
);                                                                                           // 6
                                                                                             // 7
RKNotes.findAllFullTextSearch = function () {                                                // 8
  var sr = [];                                                                               // 9
  sr = sr.concat(Notes.find({}, {sort: {score: -1}}).fetch());                               // 10
  return sr;                                                                                 // 11
};                                                                                           // 12
                                                                                             // 13
RKNotes.findFullText = function (searchQuery) {                                              // 14
  var sr;                                                                                    // 15
  check(searchQuery, String);                                                                // 16
  sr = Notes.find(                                                                           // 17
    {                                                                                        // 18
      $text: {                                                                               // 19
        $search: searchQuery,                                                                // 20
      },                                                                                     // 21
    },                                                                                       // 22
    {                                                                                        // 23
      fields: { score: { $meta: 'textScore' } },                                             // 24
      sort: { score: { $meta: 'textScore' } },                                               // 25
      limit: 30,                                                                             // 26
    });                                                                                      // 27
    return sr;                                                                               // 28
};                                                                                           // 29
                                                                                             // 30
RKNotes.findDummy = function () {                                                            // 31
  return Notes.find({$text: { $search: "somethingthatyouwillneverfind" }});                  // 32
};                                                                                           // 33
                                                                                             // 34
Meteor.methods({                                                                             // 35
	updateNote: function (content, userId) {                                                    // 36
		Notes.update(                                                                              // 37
			{                                                                                         // 38
			  userId: Meteor.userId(),                                                                // 39
			},                                                                                        // 40
			{                                                                                         // 41
			    content: content,                                                                     // 42
			    updatedAt: new Date(),                                                                // 43
				  userId: userId,                                                                        // 44
          searchResultFromNotes: true,                                                       // 45
			},                                                                                        // 46
			{                                                                                         // 47
			    upsert: true,                                                                         // 48
			}                                                                                         // 49
		);                                                                                         // 50
		if (typeof(toastr) !== 'undefined') {                                                      // 51
			toastr.success('Note updated succesfully');                                               // 52
		}                                                                                          // 53
	},                                                                                          // 54
});                                                                                          // 55
                                                                                             // 56
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/collections.js                                               //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Notes = new Mongo.Collection('notes');                                                       // 1
                                                                                             // 2
Notes.allow( {                                                                               // 3
		insert: function (userId) {return !! userId; },                                            // 4
		update: function (userId) {return !!userId; },                                             // 5
    remove: function (userId) {return !!userId; },                                           // 6
});                                                                                          // 7
                                                                                             // 8
if (Meteor.isServer) {                                                                       // 9
	if (typeof Notes.createIndex === 'function') {                                              // 10
		Notes.createIndex({ content: "text" }, { name: "TextIndex" });                             // 11
	}                                                                                           // 12
	else {                                                                                      // 13
		if (typeof Notes._ensureIndex === 'function') {                                            // 14
			Notes._ensureIndex( { content: "text" }, {name: "TextIndex"});                            // 15
		}                                                                                          // 16
	}                                                                                           // 17
}                                                                                            // 18
                                                                                             // 19
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/routes.js                                                    //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
if (Meteor.settings.public.show.notes) {                                                     // 1
  Router.route("/notes", {                                                                   // 2
    name: "notes",                                                                           // 3
    waitOn: function () {                                                                    // 4
      return [                                                                               // 5
        Meteor.subscribe("myNotes"),                                                         // 6
        Meteor.subscribe("members"),                                                         // 7
      ];                                                                                     // 8
    },                                                                                       // 9
  });                                                                                        // 10
                                                                                             // 11
  url = Router.routes.notes.path();                                                          // 12
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="My notes"><strong><span class="glyphicon glyphicon-pencil"></span></strong> Notes</a></li>');
  RKCore.packageMenu.push(                                                                   // 14
    {                                                                                        // 15
      "menuHTML": menuHTML,                                                                  // 16
      "fromPackage": "rationalk:notes",                                                      // 17
    }                                                                                        // 18
  );                                                                                         // 19
}                                                                                            // 20
                                                                                             // 21
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/client/template.notes.js                                     //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
                                                                                             // 1
Template.__checkName("notes");                                                               // 2
Template["notes"] = new Template("Template.notes", (function() {                             // 3
  var view = this;                                                                           // 4
  return HTML.DIV({                                                                          // 5
    "class": "row"                                                                           // 6
  }, "\n		", HTML.DIV({                                                                      // 7
    "class": "col-md-12"                                                                     // 8
  }, "\n			 ", HTML.DIV({                                                                    // 9
    "class": "panel panel-default"                                                           // 10
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">My Notes</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                    // 12
  }, "\n					", HTML.FORM("\n				        ", HTML.DIV({                                       // 13
    "class": "form-group"                                                                    // 14
  }, "\n						    ", HTML.TEXTAREA({                                                         // 15
    "class": "form-control",                                                                 // 16
    rows: "8",                                                                               // 17
    name: "content",                                                                         // 18
    placeholder: "My Notes",                                                                 // 19
    value: function() {                                                                      // 20
      return Spacebars.mustache(view.lookup("noteContent"));                                 // 21
    }                                                                                        // 22
  }), "\n					    "), "\n					    ", HTML.Raw('<button type="submit" class="btn btn-primary">Save</button>'), "\n					    ", HTML.Raw('<p class="help-block">Only you can see them. Use them as todo, reminders or whatever you want.</p>'), "\n					    ", HTML.Raw('<p class="help-block">They will appear in search results (but only for you)</p>'), "\n				    "), "        					\n        		"), "\n    		"), "\n		"), "\n	");
}));                                                                                         // 24
                                                                                             // 25
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/client/notes.js                                              //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Template.notes.helpers({                                                                     // 1
	noteContent: function () {                                                                  // 2
		var myNotes = Notes.findOne({userId: Meteor.userId()});                                    // 3
		if (typeof myNotes !== 'undefined') {                                                      // 4
			return myNotes.content;                                                                   // 5
		}                                                                                          // 6
		return false;                                                                              // 7
	},                                                                                          // 8
});                                                                                          // 9
                                                                                             // 10
Template.notes.events({                                                                      // 11
	'submit form': function (e) {                                                               // 12
    var content = e.target.content.value;                                                    // 13
    e.preventDefault();                                                                      // 14
	  Meteor.call('updateNote', content, Meteor.userId(), function () {});                      // 15
	},                                                                                          // 16
});                                                                                          // 17
                                                                                             // 18
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/client/template.noteInSearchResults.js                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
                                                                                             // 1
Template.__checkName("noteInSearchResults");                                                 // 2
Template["noteInSearchResults"] = new Template("Template.noteInSearchResults", (function() { // 3
  var view = this;                                                                           // 4
  return HTML.DIV({                                                                          // 5
    "class": "post"                                                                          // 6
  }, "\n		", HTML.DIV({                                                                      // 7
    "class": "row"                                                                           // 8
  }, "\n			", HTML.DIV({                                                                     // 9
    "class": "col-md-10"                                                                     // 10
  }, "\n				", HTML.P(Blaze.View("lookup:content", function() {                              // 11
    return Spacebars.mustache(view.lookup("content"));                                       // 12
  })), "\n			"), "\n			", HTML.Raw('<div class="col-md-2">\n				<span class="label label-success">My Note</span><br>\n				<p>Only you can see this</p>\n			</div>'), "\n		"), "\n	");
}));                                                                                         // 14
                                                                                             // 15
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/rationalk:notes/lib/client/noteInSearchResults.js                                //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Template.noteInSearchResults.helpers({                                                       // 1
	memberUsername: function (who){                                                             // 2
			return Members.collection.findOne({accountId:who}).profile.nickname;                      // 3
	}                                                                                           // 4
});                                                                                          // 5
                                                                                             // 6
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:notes'] = {
  RKNotes: RKNotes
};

})();
