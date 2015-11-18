(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/methods.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RKDiscussions = {};                                                                                                    // 1
RKMessages = {};                                                                                                       // 2
RKDiscussions.Collections = {};                                                                                        // 3
RKCore.searchResultsPackage.push(                                                                                      // 4
  {                                                                                                                    // 5
    name: "RKDiscussions", // RKDiscussions.findAllFullTextSearch should exists                                        // 6
  }                                                                                                                    // 7
);                                                                                                                     // 8
RKCore.searchResultsPackage.push(                                                                                      // 9
  {                                                                                                                    // 10
    name: "RKMessages", // RKDiscussions.findAllFullTextSearch should exists                                           // 11
  }                                                                                                                    // 12
);                                                                                                                     // 13
                                                                                                                       // 14
if (typeof(RKCore) !== 'undefined') {                                                                                  // 15
  console.log("RKCore : ");                                                                                            // 16
  console.log(RKCore);                                                                                                 // 17
}                                                                                                                      // 18
                                                                                                                       // 19
RKDiscussions.findAllFullTextSearch = function () {                                                                    // 20
  var sr = [];                                                                                                         // 21
  sr = sr.concat(Discussions.find({}, {sort: {score: -1}}).fetch());                                                   // 22
  sr = sr.concat(Messages.find({}, {sort: {score: -1}}).fetch());                                                      // 23
  return sr;                                                                                                           // 24
};                                                                                                                     // 25
                                                                                                                       // 26
RKDiscussions.findFullTextDiscussions = function (searchQuery) {                                                       // 27
  var sr;                                                                                                              // 28
  check(searchQuery, String);                                                                                          // 29
  sr = Discussions.find(                                                                                               // 30
    {                                                                                                                  // 31
      $text: {                                                                                                         // 32
        $search: searchQuery,                                                                                          // 33
      },                                                                                                               // 34
    },                                                                                                                 // 35
    {                                                                                                                  // 36
      fields: { score: { $meta: 'textScore' } },                                                                       // 37
      sort: { score: { $meta: 'textScore' } },                                                                         // 38
      limit: 30,                                                                                                       // 39
    });                                                                                                                // 40
    return sr;                                                                                                         // 41
};                                                                                                                     // 42
                                                                                                                       // 43
RKDiscussions.findFullText = function (searchQuery) {                                                                  // 44
  var sr;                                                                                                              // 45
  check(searchQuery, String);                                                                                          // 46
  sr = Discussions.find(                                                                                               // 47
    {                                                                                                                  // 48
      $text: {                                                                                                         // 49
        $search: searchQuery,                                                                                          // 50
      },                                                                                                               // 51
    },                                                                                                                 // 52
    {                                                                                                                  // 53
      fields: { score: { $meta: 'textScore' } },                                                                       // 54
      sort: { score: { $meta: 'textScore' } },                                                                         // 55
      limit: 30,                                                                                                       // 56
    });                                                                                                                // 57
    return sr;                                                                                                         // 58
};                                                                                                                     // 59
                                                                                                                       // 60
RKDiscussions.findFullTextMessages = function (searchQuery) {                                                          // 61
  var sr;                                                                                                              // 62
  check(searchQuery, String);                                                                                          // 63
  sr = Messages.find(                                                                                                  // 64
    {                                                                                                                  // 65
      $text: {                                                                                                         // 66
        $search: searchQuery,                                                                                          // 67
      },                                                                                                               // 68
    },                                                                                                                 // 69
    {                                                                                                                  // 70
      fields: { score: { $meta: 'textScore' } },                                                                       // 71
      sort: { score: { $meta: 'textScore' } },                                                                         // 72
      limit: 30,                                                                                                       // 73
    }                                                                                                                  // 74
  );                                                                                                                   // 75
  return sr;                                                                                                           // 76
};                                                                                                                     // 77
                                                                                                                       // 78
RKMessages.findFullText = function (searchQuery) {                                                                     // 79
  var sr;                                                                                                              // 80
  check(searchQuery, String);                                                                                          // 81
  sr = Messages.find(                                                                                                  // 82
    {                                                                                                                  // 83
      $text: {                                                                                                         // 84
        $search: searchQuery,                                                                                          // 85
      },                                                                                                               // 86
    },                                                                                                                 // 87
    {                                                                                                                  // 88
      fields: { score: { $meta: 'textScore' } },                                                                       // 89
      sort: { score: { $meta: 'textScore' } },                                                                         // 90
      limit: 30,                                                                                                       // 91
    }                                                                                                                  // 92
  );                                                                                                                   // 93
  return sr;                                                                                                           // 94
};                                                                                                                     // 95
                                                                                                                       // 96
RKDiscussions.findDummyDiscussions = function () {                                                                     // 97
  return Discussions.find({$text: { $search: "somethingthatyouwillneverfind" }});                                      // 98
};                                                                                                                     // 99
RKDiscussions.findDummyMessages = function () {                                                                        // 100
  return Messages.find({$text: { $search: "somethingthatyouwillneverfind" }});                                         // 101
};                                                                                                                     // 102
                                                                                                                       // 103
RKDiscussions.findDummy = function () {                                                                                // 104
  return Discussions.find({$text: { $search: "somethingthatyouwillneverfind" }});                                      // 105
};                                                                                                                     // 106
RKMessages.findDummy = function () {                                                                                   // 107
  return Messages.find({$text: { $search: "somethingthatyouwillneverfind" }});                                         // 108
};                                                                                                                     // 109
                                                                                                                       // 110
Meteor.methods({                                                                                                       // 111
	createDiscussion: function (discussionSubject) {                                                                      // 112
    check(discussionSubject, String);                                                                                  // 113
    Discussions.insert({                                                                                               // 114
      subject: discussionSubject,                                                                                      // 115
      createdAt: new Date(),                                                                                           // 116
      who: Meteor.userId(),                                                                                            // 117
      searchResultFromDiscussion: true,                                                                                // 118
    });                                                                                                                // 119
                                                                                                                       // 120
		if (typeof(toastr) !== 'undefined') {                                                                                // 121
			toastr.success('Discussion succesfully created');                                                                   // 122
		}                                                                                                                    // 123
	},                                                                                                                    // 124
  addMessageToDiscussion: function (message, discussionId) {                                                           // 125
    check(message, String);                                                                                            // 126
    check(discussionId, String);                                                                                       // 127
    Messages.insert({                                                                                                  // 128
      message: message,                                                                                                // 129
      discussionId: discussionId,                                                                                      // 130
      createdAt: new Date(),                                                                                           // 131
      who: Meteor.userId(),                                                                                            // 132
      searchResultFromMessage: true,                                                                                   // 133
    });                                                                                                                // 134
                                                                                                                       // 135
		if (typeof(toastr) !== 'undefined') {                                                                                // 136
			toastr.success('Message succesfully posted');                                                                       // 137
		}                                                                                                                    // 138
	},                                                                                                                    // 139
});                                                                                                                    // 140
                                                                                                                       // 141
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/collections.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Discussions = new Mongo.Collection('discussions');                                                                     // 1
Messages = new Mongo.Collection('messages');                                                                           // 2
                                                                                                                       // 3
Discussions.allow( {                                                                                                   // 4
		insert: function (userId) {return !! userId; },                                                                      // 5
		update: function (userId) {return !!userId; },                                                                       // 6
    remove: function (userId) {return !!userId; },                                                                     // 7
});                                                                                                                    // 8
                                                                                                                       // 9
Messages.allow( {                                                                                                      // 10
		insert: function (userId) {return !! userId; },                                                                      // 11
		update: function (userId) {return !!userId; },                                                                       // 12
    remove: function (userId) {return !!userId; },                                                                     // 13
});                                                                                                                    // 14
                                                                                                                       // 15
if (Meteor.isServer) {                                                                                                 // 16
	if (typeof Discussions.createIndex === 'function') {                                                                  // 17
		Discussions.createIndex({ subject: "text" }, { name: "TextIndex" });                                                 // 18
	}                                                                                                                     // 19
	else {                                                                                                                // 20
		if (typeof Discussions._ensureIndex === 'function') {                                                                // 21
			Discussions._ensureIndex( { subject: "text" }, {name: "TextIndex"});                                                // 22
		}                                                                                                                    // 23
	}                                                                                                                     // 24
	if (typeof Messages.createIndex === 'function') {                                                                     // 25
		Messages.createIndex({ message: "text" }, { name: "TextIndex" });                                                    // 26
	}                                                                                                                     // 27
	else {                                                                                                                // 28
		if (typeof Messages._ensureIndex === 'function') {                                                                   // 29
			Messages._ensureIndex( { message: "text" }, {name: "TextIndex"});                                                   // 30
		}                                                                                                                    // 31
	}                                                                                                                     // 32
}                                                                                                                      // 33
                                                                                                                       // 34
RKDiscussions.Collections.Messages = Messages;                                                                         // 35
RKDiscussions.Collections.Discussions = Discussions;                                                                   // 36
                                                                                                                       // 37
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/routes.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Meteor.settings.public.show.discussions) {                                                                         // 1
  Router.route("/discussions", {                                                                                       // 2
    name: "discussions",                                                                                               // 3
    waitOn: function () {                                                                                              // 4
      return [                                                                                                         // 5
        Meteor.subscribe("discussions"),                                                                               // 6
        Meteor.subscribe("messages"),                                                                                  // 7
        Meteor.subscribe("members"),                                                                                   // 8
      ];                                                                                                               // 9
    },                                                                                                                 // 10
  });                                                                                                                  // 11
                                                                                                                       // 12
  Router.route("/discussion/:_id", {                                                                                   // 13
    name: "discussion",                                                                                                // 14
    data: function () {                                                                                                // 15
      return Discussions.findOne({}, {                                                                                 // 16
        reactive: true,                                                                                                // 17
      });                                                                                                              // 18
    },                                                                                                                 // 19
    waitOn: function () {                                                                                              // 20
      return [                                                                                                         // 21
        Meteor.subscribe("discussion", this.params._id),                                                               // 22
        Meteor.subscribe("messagesinthisdiscussion", this.params._id),                                                 // 23
        Meteor.subscribe("members"),                                                                                   // 24
      ];                                                                                                               // 25
    },                                                                                                                 // 26
  });                                                                                                                  // 27
                                                                                                                       // 28
  url = Router.routes.discussions.path();                                                                              // 29
  menuHTML = new Spacebars.SafeString('<li><a href="' + url + '" title="Ban emails, start discussions !"><strong><span class="glyphicon glyphicon-comment"></span></strong> Discussions</a></li>');
                                                                                                                       // 31
  RKCore.packageMenu.push(                                                                                             // 32
    {                                                                                                                  // 33
      "menuHTML": menuHTML,                                                                                            // 34
      "fromPackage": "rationalk:discussions",                                                                          // 35
    }                                                                                                                  // 36
  );                                                                                                                   // 37
}                                                                                                                      // 38
                                                                                                                       // 39
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/template.discussions.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("discussions");                                                                                   // 2
Template["discussions"] = new Template("Template.discussions", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row"                                                                                                     // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "col-md-12"                                                                                               // 8
  }, "\n			 ", HTML.DIV({                                                                                              // 9
    "class": "panel panel-default"                                                                                     // 10
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Discussions</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                              // 12
  }, "\n					", Spacebars.include(view.lookupTemplate("createDiscussionForm")), "\n					", HTML.DIV({                  // 13
    "class": "row"                                                                                                     // 14
  }, "\n						", HTML.DIV({                                                                                            // 15
    "class": "col-md-12"                                                                                               // 16
  }, "\n							 ", HTML.DIV({                                                                                          // 17
    "class": "panel panel-default"                                                                                     // 18
  }, "\n							 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Active discussions</h3>\n				        		</div>'), "\n								", HTML.DIV({
    "class": "panel-body"                                                                                              // 20
  }, "\n					    			", Blaze.Each(function() {                                                                         // 21
    return Spacebars.call(view.lookup("Discussions"));                                                                 // 22
  }, function() {                                                                                                      // 23
    return [ "\n					    				", Spacebars.include(view.lookupTemplate("discussionElementInTheList")), "\n									" ]; // 24
  }, function() {                                                                                                      // 25
    return [ "\n										", HTML.P("You should create a discussion."), "	\n									" ];                              // 26
  }), "\n								"), "\n							 "), "\n						"), "\n					"), "\n        		"), "\n    		"), "\n		"), "\n	");            // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
Template.__checkName("discussionElementInTheList");                                                                    // 30
Template["discussionElementInTheList"] = new Template("Template.discussionElementInTheList", (function() {             // 31
  var view = this;                                                                                                     // 32
  return HTML.DIV({                                                                                                    // 33
    "class": "row"                                                                                                     // 34
  }, "\n			", HTML.DIV({                                                                                               // 35
    "class": "col-md-12"                                                                                               // 36
  }, "\n				", HTML.DIV({                                                                                              // 37
    "class": "post"                                                                                                    // 38
  }, "\n					", Blaze.View("lookup:subject", function() {                                                              // 39
    return Spacebars.mustache(view.lookup("subject"));                                                                 // 40
  }), " - ", HTML.A({                                                                                                  // 41
    href: function() {                                                                                                 // 42
      return Spacebars.mustache(view.lookup("pathFor"), "discussion");                                                 // 43
    },                                                                                                                 // 44
    title: "Open this discussion"                                                                                      // 45
  }, "Messages ", HTML.SPAN({                                                                                          // 46
    "class": "badge"                                                                                                   // 47
  }, Blaze.View("lookup:messageCount", function() {                                                                    // 48
    return Spacebars.mustache(view.lookup("messageCount"));                                                            // 49
  }))), " (Discussion initiated by ", Blaze.View("lookup:memberUsername", function() {                                 // 50
    return Spacebars.mustache(view.lookup("memberUsername"), view.lookup("who"));                                      // 51
  }), " on ", Blaze.View("lookup:createdAt", function() {                                                              // 52
    return Spacebars.mustache(view.lookup("createdAt"));                                                               // 53
  }), ")\n				"), "\n			"), "\n	");                                                                                    // 54
}));                                                                                                                   // 55
                                                                                                                       // 56
Template.__checkName("createDiscussionForm");                                                                          // 57
Template["createDiscussionForm"] = new Template("Template.createDiscussionForm", (function() {                         // 58
  var view = this;                                                                                                     // 59
  return HTML.DIV({                                                                                                    // 60
    "class": "row"                                                                                                     // 61
  }, "\n		", HTML.DIV({                                                                                                // 62
    "class": "col-md-12"                                                                                               // 63
  }, "\n			 ", HTML.DIV({                                                                                              // 64
    "class": "panel panel-default"                                                                                     // 65
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Initiate a discussion</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                              // 67
  }, "\n					", HTML.FORM("\n					    ", HTML.DIV({                                                                    // 68
    "class": "form-group"                                                                                              // 69
  }, "\n						    ", HTML.TEXTAREA({                                                                                   // 70
    "class": "form-control",                                                                                           // 71
    rows: "3",                                                                                                         // 72
    name: "discussionSubject",                                                                                         // 73
    placeholder: "The subject or your question"                                                                        // 74
  }), "\n					    "), "\n					    ", HTML.Raw('<button type="submit" class="btn btn-primary">Initiate Discussion</button>'), "\n				    "), "\n				"), "\n			 "), "\n		"), "\n	");
}));                                                                                                                   // 76
                                                                                                                       // 77
Template.__checkName("discussion");                                                                                    // 78
Template["discussion"] = new Template("Template.discussion", (function() {                                             // 79
  var view = this;                                                                                                     // 80
  return HTML.DIV({                                                                                                    // 81
    "class": "row"                                                                                                     // 82
  }, "\n			", HTML.DIV({                                                                                               // 83
    "class": "col-md-12"                                                                                               // 84
  }, "\n				", HTML.DIV({                                                                                              // 85
    "class": "panel panel-default"                                                                                     // 86
  }, "\n			 	", HTML.DIV({                                                                                             // 87
    "class": "panel-heading",                                                                                          // 88
    style: "position:relative"                                                                                         // 89
  }, "\n			 		", HTML.H3({                                                                                             // 90
    "class": "panel-title"                                                                                             // 91
  }, "Discussion : ", Blaze.View("lookup:subject", function() {                                                        // 92
    return Spacebars.mustache(view.lookup("subject"));                                                                 // 93
  })), "\n        		"), "\n				", HTML.DIV({                                                                           // 94
    "class": "panel-body"                                                                                              // 95
  }, "\n					", Blaze.Each(function() {                                                                                // 96
    return Spacebars.call(view.lookup("Messages"));                                                                    // 97
  }, function() {                                                                                                      // 98
    return [ "\n						", Spacebars.include(view.lookupTemplate("messageElementInTheList")), "\n					" ];               // 99
  }, function() {                                                                                                      // 100
    return [ "\n						", HTML.P("There is no message in this discussion yet."), "\n					" ];                           // 101
  }), "\n					", HTML.Raw("<hr>"), "\n					", Spacebars.include(view.lookupTemplate("addMessageToTheDiscussion")), "\n        		"), "\n    		"), "\n			"), "\n	");
}));                                                                                                                   // 103
                                                                                                                       // 104
Template.__checkName("messageElementInTheList");                                                                       // 105
Template["messageElementInTheList"] = new Template("Template.messageElementInTheList", (function() {                   // 106
  var view = this;                                                                                                     // 107
  return HTML.DIV({                                                                                                    // 108
    "class": "row"                                                                                                     // 109
  }, "\n			", HTML.DIV({                                                                                               // 110
    "class": "col-md-12"                                                                                               // 111
  }, "\n				", HTML.DIV({                                                                                              // 112
    "class": "post"                                                                                                    // 113
  }, "\n					", HTML.DIV({                                                                                             // 114
    "class": "row"                                                                                                     // 115
  }, "\n						", HTML.DIV({                                                                                            // 116
    "class": "col-md-10"                                                                                               // 117
  }, "\n							", Blaze.View("lookup:message", function() {                                                            // 118
    return Spacebars.mustache(view.lookup("message"));                                                                 // 119
  }), "\n						"), "\n						", HTML.DIV({                                                                              // 120
    "class": "col-md-2"                                                                                                // 121
  }, "\n							written on ", Blaze.View("lookup:createdAt", function() {                                               // 122
    return Spacebars.mustache(view.lookup("createdAt"));                                                               // 123
  }), " by ", Blaze.View("lookup:memberUsername", function() {                                                         // 124
    return Spacebars.mustache(view.lookup("memberUsername"), view.lookup("who"));                                      // 125
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n	");                                                            // 126
}));                                                                                                                   // 127
                                                                                                                       // 128
Template.__checkName("addMessageToTheDiscussion");                                                                     // 129
Template["addMessageToTheDiscussion"] = new Template("Template.addMessageToTheDiscussion", (function() {               // 130
  var view = this;                                                                                                     // 131
  return HTML.FORM("\n        ", HTML.DIV({                                                                            // 132
    "class": "form-group"                                                                                              // 133
  }, "\n		    ", HTML.TEXTAREA({                                                                                       // 134
    "class": "form-control",                                                                                           // 135
    rows: "3",                                                                                                         // 136
    name: "discussionMessage",                                                                                         // 137
    placeholder: "Say something"                                                                                       // 138
  }), "\n	    "), HTML.Raw('\n	    <button type="submit" class="btn btn-primary">Contribute to this discussion</button>\n    '));
}));                                                                                                                   // 140
                                                                                                                       // 141
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/discussions.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.discussions.helpers({                                                                                         // 1
	Discussions: function () {                                                                                            // 2
		return Discussions.find({});                                                                                         // 3
	},                                                                                                                    // 4
});                                                                                                                    // 5
                                                                                                                       // 6
Template.discussionElementInTheList.helpers({                                                                          // 7
	memberUsername: function (who) {                                                                                      // 8
		return Members.collection.findOne({accountId: who}).profile.nickname;                                                // 9
	},                                                                                                                    // 10
	messageCount: function () {                                                                                           // 11
		return Messages.find({discussionId: this._id}).count();                                                              // 12
	},                                                                                                                    // 13
});                                                                                                                    // 14
                                                                                                                       // 15
Template.discussion.helpers({                                                                                          // 16
	Messages: function () {                                                                                               // 17
		return Messages.find({discussionId: this._id});                                                                      // 18
	},                                                                                                                    // 19
});                                                                                                                    // 20
                                                                                                                       // 21
Template.messageElementInTheList.helpers({                                                                             // 22
	memberUsername: function (who) {                                                                                      // 23
		return Members.collection.findOne({accountId: who}).profile.nickname;                                                // 24
	},                                                                                                                    // 25
});                                                                                                                    // 26
                                                                                                                       // 27
                                                                                                                       // 28
Template.createDiscussionForm.events({                                                                                 // 29
	'submit form': function (e) {                                                                                         // 30
	    e.preventDefault();                                                                                               // 31
			Meteor.call('createDiscussion', e.target.discussionSubject.value);                                                  // 32
	},                                                                                                                    // 33
});                                                                                                                    // 34
                                                                                                                       // 35
Template.addMessageToTheDiscussion.events({                                                                            // 36
	'submit form': function (e) {                                                                                         // 37
	    var discussionMessage = e.target.discussionMessage.value;                                                         // 38
			e.preventDefault();                                                                                                 // 39
			Meteor.call('addMessageToDiscussion', discussionMessage, this._id);                                                 // 40
	},                                                                                                                    // 41
});                                                                                                                    // 42
                                                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/template.discussionInSearchResults.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("discussionInSearchResults");                                                                     // 2
Template["discussionInSearchResults"] = new Template("Template.discussionInSearchResults", (function() {               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "post"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-md-10"                                                                                               // 10
  }, "\n				", HTML.P(Blaze.View("lookup:subject", function() {                                                        // 11
    return Spacebars.mustache(view.lookup("subject"));                                                                 // 12
  })), "\n			"), "\n			", HTML.DIV({                                                                                   // 13
    "class": "col-md-2"                                                                                                // 14
  }, "\n				", HTML.Raw('<span class="label label-success">Discussion</span>'), HTML.Raw("<br>"), "\n				Initiated by ", HTML.SPAN({
    "class": "label label-default"                                                                                     // 16
  }, Blaze.View("lookup:memberUsername", function() {                                                                  // 17
    return Spacebars.mustache(view.lookup("memberUsername"), view.lookup("who"));                                      // 18
  })), "\n				", HTML.Raw("<br>"), "\n				on ", Blaze.View("lookup:createdAt", function() {                            // 19
    return Spacebars.mustache(view.lookup("createdAt"));                                                               // 20
  }), "\n			"), "\n		"), "\n	");                                                                                       // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/discussionInSearchResults.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.discussionInSearchResults.helpers({                                                                           // 1
	memberUsername: function (who){                                                                                       // 2
			return Members.collection.findOne({accountId:who}).profile.nickname;                                                // 3
	}                                                                                                                     // 4
});                                                                                                                    // 5
                                                                                                                       // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/template.messageInSearchResults.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("messageInSearchResults");                                                                        // 2
Template["messageInSearchResults"] = new Template("Template.messageInSearchResults", (function() {                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "post"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-md-10"                                                                                               // 10
  }, "\n				", HTML.P(Blaze.View("lookup:message", function() {                                                        // 11
    return Spacebars.mustache(view.lookup("message"));                                                                 // 12
  })), "\n			"), "\n			", HTML.DIV({                                                                                   // 13
    "class": "col-md-2"                                                                                                // 14
  }, "\n				", HTML.Raw('<span class="label label-success">Message</span>'), HTML.Raw("<br>"), "\n				Posted by ", HTML.SPAN({
    "class": "label label-default"                                                                                     // 16
  }, Blaze.View("lookup:memberUsername", function() {                                                                  // 17
    return Spacebars.mustache(view.lookup("memberUsername"), view.lookup("who"));                                      // 18
  })), "\n				", HTML.Raw("<br>"), "\n				on ", Blaze.View("lookup:formatTime", function() {                           // 19
    return Spacebars.mustache(view.lookup("formatTime"), view.lookup("createdAt"));                                    // 20
  }), "\n				", HTML.Raw("<br>"), "\n				in ", HTML.A({                                                                // 21
    href: function() {                                                                                                 // 22
      return Spacebars.mustache(view.lookup("pathFor"), "discussion", Spacebars.kw({                                   // 23
        _id: view.lookup("discussionId")                                                                               // 24
      }));                                                                                                             // 25
    },                                                                                                                 // 26
    title: "Open the discussions"                                                                                      // 27
  }, "this discussion"), ".\n			"), "\n		"), "\n	");                                                                   // 28
}));                                                                                                                   // 29
                                                                                                                       // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:discussions/lib/client/messageInSearchResults.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.messageInSearchResults.helpers({                                                                              // 1
	memberUsername: function (who) {                                                                                      // 2
		check(who, String);                                                                                                  // 3
		return Members.collection.findOne({accountId: who}).profile.nickname;                                                // 4
	},                                                                                                                    // 5
});                                                                                                                    // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
