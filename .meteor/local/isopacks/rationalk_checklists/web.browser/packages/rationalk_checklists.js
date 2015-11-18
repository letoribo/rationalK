(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/methods.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
RKCheckLists = {};                                                                                               // 1
                                                                                                                 // 2
// RKTrello.Trello = Trello; -> done in collections.js                                                           // 3
                                                                                                                 // 4
RKCheckLists.findAll = function () {                                                                             // 5
  return RKCheckLists.find({}, {sort: {score: -1}}).fetch();                                                     // 6
};                                                                                                               // 7
                                                                                                                 // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/collections.js                                                              //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
CheckLists = new Mongo.Collection('Checklists');                                                                 // 1
                                                                                                                 // 2
CheckLists.allow( {                                                                                              // 3
		insert: function (userId) {return !! userId; },                                                                // 4
		update: function (userId) {return !!userId; },                                                                 // 5
    remove: function (userId) {return !!userId; },                                                               // 6
});                                                                                                              // 7
                                                                                                                 // 8
if (Meteor.isServer) {                                                                                           // 9
	if (typeof CheckLists.createIndex === 'function') {                                                             // 10
		CheckLists.createIndex({ full: "text" }, { name: "TextIndex" });                                               // 11
	}                                                                                                               // 12
	else {                                                                                                          // 13
		if (typeof CheckLists._ensureIndex === 'function') {                                                           // 14
			CheckLists._ensureIndex( { full: "text" }, {name: "TextIndex"});                                              // 15
	}                                                                                                               // 16
}                                                                                                                // 17
} //end if Server                                                                                                // 18
                                                                                                                 // 19
//expose it to the other packages :                                                                              // 20
RKCheckLists.CheckLists = CheckLists;                                                                            // 21
                                                                                                                 // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/routes.js                                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
if (Meteor.settings.public.show.checklists) {                                                                    // 1
  Router.route("/checklists", {                                                                                  // 2
    name: "checklists",                                                                                          // 3
    waitOn: function () {                                                                                        // 4
      return [                                                                                                   // 5
        Meteor.subscribe("checklists"),                                                                          // 6
        Meteor.subscribe("members"),                                                                             // 7
        Meteor.subscribe("rkSettings"),                                                                          // 8
      ];                                                                                                         // 9
    },                                                                                                           // 10
  });                                                                                                            // 11
}                                                                                                                // 12
                                                                                                                 // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/template.checklists.js                                               //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("checklists");                                                                              // 2
Template["checklists"] = new Template("Template.checklists", (function() {                                       // 3
  var view = this;                                                                                               // 4
  return [ HTML.DIV({                                                                                            // 5
    "class": "row"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                          // 7
    "class": "col-md-12"                                                                                         // 8
  }, "\n			 ", HTML.DIV({                                                                                        // 9
    "class": "panel panel-default"                                                                               // 10
  }, "\n				", HTML.DIV({                                                                                        // 11
    "class": "panel-heading",                                                                                    // 12
    style: "position:relative"                                                                                   // 13
  }, "\n					", HTML.H3({                                                                                        // 14
    "class": "panel-title"                                                                                       // 15
  }, Blaze.View("lookup:_", function() {                                                                         // 16
    return Spacebars.mustache(view.lookup("_"), "Trello Upload");                                                // 17
  })), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					<input type="file" id="files" name="files[]">\n				</div>'), "\n				"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"                                                                                               // 19
  }, "\n		", HTML.DIV({                                                                                          // 20
    "class": "col-md-12"                                                                                         // 21
  }, "\n			 ", HTML.DIV({                                                                                        // 22
    "class": "panel panel-default"                                                                               // 23
  }, "\n			 	", HTML.DIV({                                                                                       // 24
    "class": "panel-heading",                                                                                    // 25
    style: "position:relative"                                                                                   // 26
  }, "\n			 		", HTML.H3({                                                                                       // 27
    "class": "panel-title"                                                                                       // 28
  }, Blaze.View("lookup:_", function() {                                                                         // 29
    return Spacebars.mustache(view.lookup("_"), "Trello Content");                                               // 30
  })), "\n        "), "\n				", HTML.DIV({                                                                       // 31
    "class": "panel-body"                                                                                        // 32
  }, "\n						", Blaze._TemplateWith(function() {                                                                // 33
    return {                                                                                                     // 34
      collection: Spacebars.call(view.lookup("Trello")),                                                         // 35
      settings: Spacebars.call(view.lookup("settingsTrello"))                                                    // 36
    };                                                                                                           // 37
  }, function() {                                                                                                // 38
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                              // 39
  }), "\n        "), "\n    		"), "\n		"), "\n	") ];                                                             // 40
}));                                                                                                             // 41
                                                                                                                 // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/checklists.js                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Template.checklists.rendered = function () {                                                                     // 1
                                                                                                                 // 2
};                                                                                                               // 3
                                                                                                                 // 4
Template.checklists.helpers({                                                                                    // 5
	CheckLists: function () {                                                                                       // 6
		return CheckLists.find().fetch();                                                                              // 7
	},                                                                                                              // 8
	settingsCheckLists: function () {                                                                               // 9
    return {                                                                                                     // 10
        rowsPerPage: 100,                                                                                        // 11
        showFilter: true,                                                                                        // 12
        class: 'table table-condensed col-sm-12',                                                                // 13
			}                                                                                                             // 14
	},                                                                                                              // 15
});                                                                                                              // 16
                                                                                                                 // 17
Template.checklists.events({                                                                                     // 18
                                                                                                                 // 19
});                                                                                                              // 20
                                                                                                                 // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/rationalk:checklists/lib/client/template.checklistsSettings.js                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("checklistsSettings");                                                                      // 2
Template["checklistsSettings"] = new Template("Template.checklistsSettings", (function() {                       // 3
  var view = this;                                                                                               // 4
  return HTML.DIV({                                                                                              // 5
    "class": "row"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                          // 7
    "class": "col-md-12"                                                                                         // 8
  }, "\n			 ", HTML.DIV({                                                                                        // 9
    "class": "panel panel-default"                                                                               // 10
  }, "\n				", HTML.DIV({                                                                                        // 11
    "class": "panel-heading",                                                                                    // 12
    style: "position:relative"                                                                                   // 13
  }, "\n					", HTML.H3({                                                                                        // 14
    "class": "panel-title"                                                                                       // 15
  }, Blaze.View("lookup:_", function() {                                                                         // 16
    return Spacebars.mustache(view.lookup("_"), "Checklists");                                                   // 17
  })), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					\n				</div>'), "\n				"), "\n		"), "\n	"); // 18
}));                                                                                                             // 19
                                                                                                                 // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
