(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/methods.js                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
RKCheckLists = {};                                                   // 1
                                                                     // 2
// RKTrello.Trello = Trello; -> done in collections.js               // 3
                                                                     // 4
RKCheckLists.findAll = function () {                                 // 5
  return RKCheckLists.find({}, {sort: {score: -1}}).fetch();         // 6
};                                                                   // 7
                                                                     // 8
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/collections.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
CheckLists = new Mongo.Collection('Checklists');                     // 1
                                                                     // 2
CheckLists.allow( {                                                  // 3
		insert: function (userId) {return !! userId; },                    // 4
		update: function (userId) {return !!userId; },                     // 5
    remove: function (userId) {return !!userId; },                   // 6
});                                                                  // 7
                                                                     // 8
if (Meteor.isServer) {                                               // 9
	if (typeof CheckLists.createIndex === 'function') {                 // 10
		CheckLists.createIndex({ full: "text" }, { name: "TextIndex" });   // 11
	}                                                                   // 12
	else {                                                              // 13
		if (typeof CheckLists._ensureIndex === 'function') {               // 14
			CheckLists._ensureIndex( { full: "text" }, {name: "TextIndex"});  // 15
	}                                                                   // 16
}                                                                    // 17
} //end if Server                                                    // 18
                                                                     // 19
//expose it to the other packages :                                  // 20
RKCheckLists.CheckLists = CheckLists;                                // 21
                                                                     // 22
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/routes.js                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
if (Meteor.settings.public.show.checklists) {                        // 1
  Router.route("/checklists", {                                      // 2
    name: "checklists",                                              // 3
    waitOn: function () {                                            // 4
      return [                                                       // 5
        Meteor.subscribe("checklists"),                              // 6
        Meteor.subscribe("members"),                                 // 7
        Meteor.subscribe("rkSettings"),                              // 8
      ];                                                             // 9
    },                                                               // 10
  });                                                                // 11
}                                                                    // 12
                                                                     // 13
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/server/publications.js          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.publish("checklists", function () {                           // 1
  return CheckLists.find();                                          // 2
});                                                                  // 3
                                                                     // 4
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rationalk:checklists/lib/server/checklists.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.methods({                                                     // 1
                                                                     // 2
});                                                                  // 3
                                                                     // 4
///////////////////////////////////////////////////////////////////////

}).call(this);
