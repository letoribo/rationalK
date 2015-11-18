(function () {

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/rationalk:discussions/lib/methods.js                                  //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
RKDiscussions = {};                                                               // 1
RKMessages = {};                                                                  // 2
RKDiscussions.Collections = {};                                                   // 3
RKCore.searchResultsPackage.push(                                                 // 4
  {                                                                               // 5
    name: "RKDiscussions", // RKDiscussions.findAllFullTextSearch should exists   // 6
  }                                                                               // 7
);                                                                                // 8
RKCore.searchResultsPackage.push(                                                 // 9
  {                                                                               // 10
    name: "RKMessages", // RKDiscussions.findAllFullTextSearch should exists      // 11
  }                                                                               // 12
);                                                                                // 13
                                                                                  // 14
if (typeof(RKCore) !== 'undefined') {                                             // 15
  console.log("RKCore : ");                                                       // 16
  console.log(RKCore);                                                            // 17
}                                                                                 // 18
                                                                                  // 19
RKDiscussions.findAllFullTextSearch = function () {                               // 20
  var sr = [];                                                                    // 21
  sr = sr.concat(Discussions.find({}, {sort: {score: -1}}).fetch());              // 22
  sr = sr.concat(Messages.find({}, {sort: {score: -1}}).fetch());                 // 23
  return sr;                                                                      // 24
};                                                                                // 25
                                                                                  // 26
RKDiscussions.findFullTextDiscussions = function (searchQuery) {                  // 27
  var sr;                                                                         // 28
  check(searchQuery, String);                                                     // 29
  sr = Discussions.find(                                                          // 30
    {                                                                             // 31
      $text: {                                                                    // 32
        $search: searchQuery,                                                     // 33
      },                                                                          // 34
    },                                                                            // 35
    {                                                                             // 36
      fields: { score: { $meta: 'textScore' } },                                  // 37
      sort: { score: { $meta: 'textScore' } },                                    // 38
      limit: 30,                                                                  // 39
    });                                                                           // 40
    return sr;                                                                    // 41
};                                                                                // 42
                                                                                  // 43
RKDiscussions.findFullText = function (searchQuery) {                             // 44
  var sr;                                                                         // 45
  check(searchQuery, String);                                                     // 46
  sr = Discussions.find(                                                          // 47
    {                                                                             // 48
      $text: {                                                                    // 49
        $search: searchQuery,                                                     // 50
      },                                                                          // 51
    },                                                                            // 52
    {                                                                             // 53
      fields: { score: { $meta: 'textScore' } },                                  // 54
      sort: { score: { $meta: 'textScore' } },                                    // 55
      limit: 30,                                                                  // 56
    });                                                                           // 57
    return sr;                                                                    // 58
};                                                                                // 59
                                                                                  // 60
RKDiscussions.findFullTextMessages = function (searchQuery) {                     // 61
  var sr;                                                                         // 62
  check(searchQuery, String);                                                     // 63
  sr = Messages.find(                                                             // 64
    {                                                                             // 65
      $text: {                                                                    // 66
        $search: searchQuery,                                                     // 67
      },                                                                          // 68
    },                                                                            // 69
    {                                                                             // 70
      fields: { score: { $meta: 'textScore' } },                                  // 71
      sort: { score: { $meta: 'textScore' } },                                    // 72
      limit: 30,                                                                  // 73
    }                                                                             // 74
  );                                                                              // 75
  return sr;                                                                      // 76
};                                                                                // 77
                                                                                  // 78
RKMessages.findFullText = function (searchQuery) {                                // 79
  var sr;                                                                         // 80
  check(searchQuery, String);                                                     // 81
  sr = Messages.find(                                                             // 82
    {                                                                             // 83
      $text: {                                                                    // 84
        $search: searchQuery,                                                     // 85
      },                                                                          // 86
    },                                                                            // 87
    {                                                                             // 88
      fields: { score: { $meta: 'textScore' } },                                  // 89
      sort: { score: { $meta: 'textScore' } },                                    // 90
      limit: 30,                                                                  // 91
    }                                                                             // 92
  );                                                                              // 93
  return sr;                                                                      // 94
};                                                                                // 95
                                                                                  // 96
RKDiscussions.findDummyDiscussions = function () {                                // 97
  return Discussions.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 98
};                                                                                // 99
RKDiscussions.findDummyMessages = function () {                                   // 100
  return Messages.find({$text: { $search: "somethingthatyouwillneverfind" }});    // 101
};                                                                                // 102
                                                                                  // 103
RKDiscussions.findDummy = function () {                                           // 104
  return Discussions.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 105
};                                                                                // 106
RKMessages.findDummy = function () {                                              // 107
  return Messages.find({$text: { $search: "somethingthatyouwillneverfind" }});    // 108
};                                                                                // 109
                                                                                  // 110
Meteor.methods({                                                                  // 111
	createDiscussion: function (discussionSubject) {                                 // 112
    check(discussionSubject, String);                                             // 113
    Discussions.insert({                                                          // 114
      subject: discussionSubject,                                                 // 115
      createdAt: new Date(),                                                      // 116
      who: Meteor.userId(),                                                       // 117
      searchResultFromDiscussion: true,                                           // 118
    });                                                                           // 119
                                                                                  // 120
		if (typeof(toastr) !== 'undefined') {                                           // 121
			toastr.success('Discussion succesfully created');                              // 122
		}                                                                               // 123
	},                                                                               // 124
  addMessageToDiscussion: function (message, discussionId) {                      // 125
    check(message, String);                                                       // 126
    check(discussionId, String);                                                  // 127
    Messages.insert({                                                             // 128
      message: message,                                                           // 129
      discussionId: discussionId,                                                 // 130
      createdAt: new Date(),                                                      // 131
      who: Meteor.userId(),                                                       // 132
      searchResultFromMessage: true,                                              // 133
    });                                                                           // 134
                                                                                  // 135
		if (typeof(toastr) !== 'undefined') {                                           // 136
			toastr.success('Message succesfully posted');                                  // 137
		}                                                                               // 138
	},                                                                               // 139
});                                                                               // 140
                                                                                  // 141
////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/rationalk:discussions/lib/collections.js                              //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
Discussions = new Mongo.Collection('discussions');                                // 1
Messages = new Mongo.Collection('messages');                                      // 2
                                                                                  // 3
Discussions.allow( {                                                              // 4
		insert: function (userId) {return !! userId; },                                 // 5
		update: function (userId) {return !!userId; },                                  // 6
    remove: function (userId) {return !!userId; },                                // 7
});                                                                               // 8
                                                                                  // 9
Messages.allow( {                                                                 // 10
		insert: function (userId) {return !! userId; },                                 // 11
		update: function (userId) {return !!userId; },                                  // 12
    remove: function (userId) {return !!userId; },                                // 13
});                                                                               // 14
                                                                                  // 15
if (Meteor.isServer) {                                                            // 16
	if (typeof Discussions.createIndex === 'function') {                             // 17
		Discussions.createIndex({ subject: "text" }, { name: "TextIndex" });            // 18
	}                                                                                // 19
	else {                                                                           // 20
		if (typeof Discussions._ensureIndex === 'function') {                           // 21
			Discussions._ensureIndex( { subject: "text" }, {name: "TextIndex"});           // 22
		}                                                                               // 23
	}                                                                                // 24
	if (typeof Messages.createIndex === 'function') {                                // 25
		Messages.createIndex({ message: "text" }, { name: "TextIndex" });               // 26
	}                                                                                // 27
	else {                                                                           // 28
		if (typeof Messages._ensureIndex === 'function') {                              // 29
			Messages._ensureIndex( { message: "text" }, {name: "TextIndex"});              // 30
		}                                                                               // 31
	}                                                                                // 32
}                                                                                 // 33
                                                                                  // 34
RKDiscussions.Collections.Messages = Messages;                                    // 35
RKDiscussions.Collections.Discussions = Discussions;                              // 36
                                                                                  // 37
////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/rationalk:discussions/lib/routes.js                                   //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
if (Meteor.settings.public.show.discussions) {                                    // 1
  Router.route("/discussions", {                                                  // 2
    name: "discussions",                                                          // 3
    waitOn: function () {                                                         // 4
      return [                                                                    // 5
        Meteor.subscribe("discussions"),                                          // 6
        Meteor.subscribe("messages"),                                             // 7
        Meteor.subscribe("members"),                                              // 8
      ];                                                                          // 9
    },                                                                            // 10
  });                                                                             // 11
                                                                                  // 12
  Router.route("/discussion/:_id", {                                              // 13
    name: "discussion",                                                           // 14
    data: function () {                                                           // 15
      return Discussions.findOne({}, {                                            // 16
        reactive: true,                                                           // 17
      });                                                                         // 18
    },                                                                            // 19
    waitOn: function () {                                                         // 20
      return [                                                                    // 21
        Meteor.subscribe("discussion", this.params._id),                          // 22
        Meteor.subscribe("messagesinthisdiscussion", this.params._id),            // 23
        Meteor.subscribe("members"),                                              // 24
      ];                                                                          // 25
    },                                                                            // 26
  });                                                                             // 27
                                                                                  // 28
  url = Router.routes.discussions.path();                                         // 29
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Ban emails, start discussions !"><strong><span class="glyphicon glyphicon-comment"></span></strong> Discussions</a></li>');
                                                                                  // 31
  RKCore.packageMenu.push(                                                        // 32
    {                                                                             // 33
      "menuHTML": menuHTML,                                                       // 34
      "fromPackage": "rationalk:discussions",                                     // 35
    }                                                                             // 36
  );                                                                              // 37
}                                                                                 // 38
                                                                                  // 39
////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/rationalk:discussions/lib/server/publications.js                      //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
Meteor.publish("discussions", function () {                                       // 1
  return Discussions.find();                                                      // 2
});                                                                               // 3
                                                                                  // 4
Meteor.publish("discussion", function (discussionId) {                            // 5
  check(discussionId, String);                                                    // 6
  return Discussions.find({                                                       // 7
    _id: discussionId,                                                            // 8
  });                                                                             // 9
});                                                                               // 10
                                                                                  // 11
Meteor.publish("messages", function () {                                          // 12
  return Messages.find();                                                         // 13
});                                                                               // 14
                                                                                  // 15
Meteor.publish("messagesinthisdiscussion", function (discussionId) {              // 16
  check(discussionId, String);                                                    // 17
  return Messages.find({                                                          // 18
    discussionId: discussionId,                                                   // 19
  });                                                                             // 20
});                                                                               // 21
                                                                                  // 22
////////////////////////////////////////////////////////////////////////////////////

}).call(this);
