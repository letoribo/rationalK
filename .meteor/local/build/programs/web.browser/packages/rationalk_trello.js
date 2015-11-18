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
var RKTrello, Trello, f, fileLink, fileLinkUrl;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/methods.js                                                              //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
RKTrello = {};                                                                                           // 1
                                                                                                         // 2
RKTrello.findAll = function () {                                                                         // 3
  return Trello.find({}, {sort: {score: -1}}).fetch();                                                   // 4
};                                                                                                       // 5
                                                                                                         // 6
RKTrello.findFullText = function (searchQuery) {                                                         // 7
  return RKTrello.Trello.find( {                                                                         // 8
        $text: {                                                                                         // 9
          $search: searchQuery,                                                                          // 10
        },                                                                                               // 11
    }, {                                                                                                 // 12
        fields: { score: { $meta: 'textScore' } },                                                       // 13
        sort: { score: { $meta: 'textScore' } },                                                         // 14
        limit: 30,                                                                                       // 15
    });                                                                                                  // 16
};                                                                                                       // 17
                                                                                                         // 18
RKTrello.findDummy = function () {                                                                       // 19
  return Trello.find({$text: { $search: "somethingthatyouwillneverfind" }});                             // 20
};                                                                                                       // 21
                                                                                                         // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/collections.js                                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Trello = new Mongo.Collection('Trello');                                                                 // 1
                                                                                                         // 2
Trello.allow( {                                                                                          // 3
		insert: function (userId) {return !! userId; },                                                        // 4
		update: function (userId) {return !!userId; },                                                         // 5
    remove: function (userId) {return !!userId; },                                                       // 6
});                                                                                                      // 7
                                                                                                         // 8
if (Meteor.isServer) {                                                                                   // 9
	if (typeof Trello.createIndex === 'function') {                                                         // 10
		Trello.createIndex({ full: "text" }, { name: "TextIndex" });                                           // 11
	}                                                                                                       // 12
	else {                                                                                                  // 13
		if (typeof Trello._ensureIndex === 'function') {                                                       // 14
			Trello._ensureIndex( { full: "text" }, {name: "TextIndex"});                                          // 15
	}                                                                                                       // 16
}                                                                                                        // 17
} //end if Server                                                                                        // 18
                                                                                                         // 19
//expose it to the other packages :                                                                      // 20
RKTrello.Trello = Trello;                                                                                // 21
                                                                                                         // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/routes.js                                                               //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
if (Meteor.settings.public.show.trello) {                                                                // 1
  Router.route("/trello", {                                                                              // 2
    name: "trello",                                                                                      // 3
    waitOn: function () {                                                                                // 4
      return [                                                                                           // 5
        Meteor.subscribe("trello"),                                                                      // 6
        Meteor.subscribe("members"),                                                                     // 7
        Meteor.subscribe("rkSettings"),                                                                  // 8
      ];                                                                                                 // 9
    },                                                                                                   // 10
  });                                                                                                    // 11
}                                                                                                        // 12
                                                                                                         // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/client/template.trello.js                                               //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         // 1
Template.__checkName("trello");                                                                          // 2
Template["trello"] = new Template("Template.trello", (function() {                                       // 3
  var view = this;                                                                                       // 4
  return [ HTML.DIV({                                                                                    // 5
    "class": "row"                                                                                       // 6
  }, "\n		", HTML.DIV({                                                                                  // 7
    "class": "col-md-12"                                                                                 // 8
  }, "\n			 ", HTML.DIV({                                                                                // 9
    "class": "panel panel-default"                                                                       // 10
  }, "\n				", HTML.DIV({                                                                                // 11
    "class": "panel-heading",                                                                            // 12
    style: "position:relative"                                                                           // 13
  }, "\n					", HTML.H3({                                                                                // 14
    "class": "panel-title"                                                                               // 15
  }, Blaze.View("lookup:_", function() {                                                                 // 16
    return Spacebars.mustache(view.lookup("_"), "Trello Upload");                                        // 17
  })), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					<input type="file" id="files" name="files[]">\n				</div>'), "\n				"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"                                                                                       // 19
  }, "\n		", HTML.DIV({                                                                                  // 20
    "class": "col-md-12"                                                                                 // 21
  }, "\n			 ", HTML.DIV({                                                                                // 22
    "class": "panel panel-default"                                                                       // 23
  }, "\n			 	", HTML.DIV({                                                                               // 24
    "class": "panel-heading",                                                                            // 25
    style: "position:relative"                                                                           // 26
  }, "\n			 		", HTML.H3({                                                                               // 27
    "class": "panel-title"                                                                               // 28
  }, Blaze.View("lookup:_", function() {                                                                 // 29
    return Spacebars.mustache(view.lookup("_"), "Trello Content");                                       // 30
  })), "\n        "), "\n				", HTML.DIV({                                                               // 31
    "class": "panel-body"                                                                                // 32
  }, "\n						", Blaze._TemplateWith(function() {                                                        // 33
    return {                                                                                             // 34
      collection: Spacebars.call(view.lookup("Trello")),                                                 // 35
      settings: Spacebars.call(view.lookup("settingsTrello"))                                            // 36
    };                                                                                                   // 37
  }, function() {                                                                                        // 38
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                      // 39
  }), "\n        "), "\n    		"), "\n		"), "\n	") ];                                                     // 40
}));                                                                                                     // 41
                                                                                                         // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/client/trello.js                                                        //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Template.trello.rendered = function () {                                                                 // 1
	document.getElementById('files').addEventListener('change', handleFileSelect, false);                   // 2
                                                                                                         // 3
	function handleFileSelect (evt) {                                                                       // 4
		var reader;                                                                                            // 5
    var files = evt.target.files;                                                                        // 6
		f = files[0];                                                                                          // 7
                                                                                                         // 8
    if (f.type.match('application/json')) {                                                              // 9
      reader = new FileReader();                                                                         // 10
      reader.onload = (function (theFile) {                                                              // 11
        return function (e) {                                                                            // 12
					var trelloBoardJSON = JSON.parse(e.target.result);                                                  // 13
					if (Meteor.settings.public.debug) {                                                                 // 14
						console.log("Filename : ");                                                                        // 15
						console.log(theFile.name);                                                                         // 16
						console.log("trelloBoardJSON : ");                                                                 // 17
						console.log(trelloBoardJSON);                                                                      // 18
					}                                                                                                   // 19
					Meteor.call('loadTrelloBoardJSON', trelloBoardJSON, function () {});                                // 20
        };                                                                                               // 21
      })(f);                                                                                             // 22
      reader.readAsText(f);                                                                              // 23
		}                                                                                                      // 24
  }                                                                                                      // 25
};                                                                                                       // 26
                                                                                                         // 27
Template.trello.helpers({                                                                                // 28
	Trello: function () {                                                                                   // 29
		return Trello.find().fetch();                                                                          // 30
	},                                                                                                      // 31
	settingsTrello: function () {                                                                           // 32
    return {                                                                                             // 33
        rowsPerPage: 100,                                                                                // 34
        showFilter: true,                                                                                // 35
        class: 'table table-condensed col-sm-12',                                                        // 36
			}                                                                                                     // 37
	},                                                                                                      // 38
});                                                                                                      // 39
                                                                                                         // 40
Template.trello.events({                                                                                 // 41
	"click a.loadTrello": function (e) {                                                                    // 42
		var trelloJSONFilename = "trello/myboard.json";                                                        // 43
		e.preventDefault();                                                                                    // 44
		Meteor.call('loadTrelloBoard', trelloJSONFilename, function () {});                                    // 45
		return false;                                                                                          // 46
	},                                                                                                      // 47
});                                                                                                      // 48
                                                                                                         // 49
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/client/template.trelloCardInSearchResults.js                            //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         // 1
Template.__checkName("trelloCardInSearchResults");                                                       // 2
Template["trelloCardInSearchResults"] = new Template("Template.trelloCardInSearchResults", (function() { // 3
  var view = this;                                                                                       // 4
  return HTML.DIV({                                                                                      // 5
    "class": "post"                                                                                      // 6
  }, "\n		", HTML.DIV({                                                                                  // 7
    "class": "row"                                                                                       // 8
  }, "\n			", HTML.DIV({                                                                                 // 9
    "class": "col-md-10"                                                                                 // 10
  }, "\n				", HTML.P(Blaze.View("lookup:full", function() {                                             // 11
    return Spacebars.mustache(view.lookup("full"));                                                      // 12
  })), "\n			"), "\n			", HTML.DIV({                                                                     // 13
    "class": "col-md-2"                                                                                  // 14
  }, "\n				", HTML.SPAN({                                                                               // 15
    "class": "label label-default"                                                                       // 16
  }, "Trello Card in board : ", Blaze.View("lookup:boardName", function() {                              // 17
    return Spacebars.mustache(view.lookup("boardName"));                                                 // 18
  })), "\n				", HTML.Raw("<br>"), "\n				", HTML.A({                                                    // 19
    href: function() {                                                                                   // 20
      return Spacebars.mustache(view.lookup("url"));                                                     // 21
    },                                                                                                   // 22
    target: "_blank",                                                                                    // 23
    title: function() {                                                                                  // 24
      return Spacebars.mustache(view.lookup("_"), "Open Card in Trello");                                // 25
    }                                                                                                    // 26
  }, HTML.Raw('<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>')), "\n				", HTML.Raw("<br>"), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));                                    // 28
  }, function() {                                                                                        // 29
    return [ "\n					", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {            // 30
      return Spacebars.mustache(view.lookup("textScore"));                                               // 31
    })), "\n				" ];                                                                                     // 32
  }), "\n			"), "\n		"), "\n	");                                                                         // 33
}));                                                                                                     // 34
                                                                                                         // 35
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/client/trelloCardInSearchResults.js                                     //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Template.trelloCardInSearchResults.events({                                                              // 1
	"click .searchThisTag": function (e, t) {                                                               // 2
			e.preventDefault();                                                                                   // 3
			if (Meteor.settings.public.debug){                                                                    // 4
				console.log(e.target.dataset.tag)                                                                    // 5
			}                                                                                                     // 6
			Session.set("searchQuery",e.target.dataset.tag);                                                      // 7
			document.getElementById("keywords").value = e.target.dataset.tag ;                                    // 8
			Session.set("searchType","regexpSearch");                                                             // 9
			document.getElementById("searchType").value = "regexpSearch";                                         // 10
      return false;                                                                                      // 11
  },                                                                                                     // 12
});                                                                                                      // 13
                                                                                                         // 14
Template.trelloCardInSearchResults.helpers({                                                             // 15
	lastRevision: function () {                                                                             // 16
		var lastRevision = Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})                 // 17
  	return ((typeof lastRevision)!== 'undefined') ? lastRevision : false;                                 // 18
	},                                                                                                      // 19
	shortText: function() {                                                                                 // 20
		return this.text.substring(0, 500);                                                                    // 21
	},                                                                                                      // 22
	searchTypeIsFullTextSearch: function () {                                                               // 23
		return (Session.get('searchType')==='fullTextSearch')                                                  // 24
	},                                                                                                      // 25
	categoryName: function (){                                                                              // 26
		var Category = Categories.findOne(this.categoryId);                                                    // 27
		return Category.name;                                                                                  // 28
	},                                                                                                      // 29
	textScore: function (){                                                                                 // 30
		//limit to 2 digits after comma :                                                                      // 31
		return Math.round(this.score*100)/100;                                                                 // 32
	},                                                                                                      // 33
	fileLinkUrl: function () {                                                                              // 34
			fileLink = clientFilename(this.filePath);                                                             // 35
	  	return fileLinkUrl = 'rk:'+fileLink;                                                                 // 36
  },                                                                                                     // 37
	userSpaceIcon: function () {                                                                            // 38
		if (userSpaceHasDoc(Meteor.userId(), this._id))                                                        // 39
			return 'glyphicon-star';                                                                              // 40
		else                                                                                                   // 41
			return 'glyphicon-star-empty';                                                                        // 42
	},                                                                                                      // 43
	userSpaceLinkTitle: function () {                                                                       // 44
		if (userSpaceHasDoc(Meteor.userId(), this._id))                                                        // 45
			return TAPi18n.__('Remove from my space');                                                            // 46
		else                                                                                                   // 47
			return TAPi18n.__('Add to my space');                                                                 // 48
	}                                                                                                       // 49
});                                                                                                      // 50
                                                                                                         // 51
var userSpaceHasDoc = function (userId, docId) {                                                         // 52
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);                                   // 53
};                                                                                                       // 54
                                                                                                         // 55
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:trello/lib/client/template.trelloSettings.js                                       //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         // 1
Template.__checkName("trelloSettings");                                                                  // 2
Template["trelloSettings"] = new Template("Template.trelloSettings", (function() {                       // 3
  var view = this;                                                                                       // 4
  return HTML.DIV({                                                                                      // 5
    "class": "row"                                                                                       // 6
  }, "\n		", HTML.DIV({                                                                                  // 7
    "class": "col-md-12"                                                                                 // 8
  }, "\n			 ", HTML.DIV({                                                                                // 9
    "class": "panel panel-default"                                                                       // 10
  }, "\n				", HTML.DIV({                                                                                // 11
    "class": "panel-heading",                                                                            // 12
    style: "position:relative"                                                                           // 13
  }, "\n					", HTML.H3({                                                                                // 14
    "class": "panel-title"                                                                               // 15
  }, Blaze.View("lookup:_", function() {                                                                 // 16
    return Spacebars.mustache(view.lookup("_"), "Trello");                                               // 17
  })), "\n				"), "\n				", HTML.DIV({                                                                   // 18
    "class": "panel-body"                                                                                // 19
  }, "\n					", HTML.A({                                                                                 // 20
    href: function() {                                                                                   // 21
      return Spacebars.mustache(view.lookup("pathFor"), "trello");                                       // 22
    },                                                                                                   // 23
    title: "Trello"                                                                                      // 24
  }, "Trello"), "\n				"), "\n				"), "\n		"), "\n	");                                                   // 25
}));                                                                                                     // 26
                                                                                                         // 27
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:trello'] = {
  RKTrello: RKTrello
};

})();
