Template.discussions.rendered = function () {


};

Template.discussions.helpers({
	Discussions: function () {
		return Discussions.find({});
	},
	searchQuery: function () {
    	return Session.get("searchQuery");
  	},
  	lastRevision: function () {
	  	if (typeof Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})!== 'undefined'){
			return Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})._id;
		}
		else {
			return false;
		}
	},
	categoryName: function (){
		var Category = Categories.findOne(this.categoryId);
		return Category.name;
	},
	highlightResults: function () {
    	return Session.get("highlightResults");
  	},
  	fileLink: function () {
	  	//console.log(this);
	  	viewId = Categories.findOne(this.categoryId).viewId;
	  	fields = Views.findOne(viewId).fields;
	  	currentDoc = this;
	  	var fileLink = false;
	  	for (var fieldname in fields) {
	  		//console.log("o." + fieldname + " = " + fields[fieldname]);
	  		//console.log(fields[fieldname].type);
	  		if (fields[fieldname].type=='filelink'){
		  		//console.log("I have found a filelink in the current doc");
		  		//console.log(currentDoc);
		  		//console.log("this.fields");
		  		//console.log(currentDoc.fields);
		  		//console.log("fieldname");
		  		//console.log(fieldname);
		  		//console.log(currentDoc.fields[fieldname].value);
		  		var fileLink = currentDoc.fields[fieldname].value;
		  		//return
	  		}
		}
		if (fileLink){
			return fileLink;
		} else {
			return false;
		}
	  	//Members.collection.findOne({accountId:this.who}).username;
  	}
});

Template.discussions.events({
  	"change .highlight-checkbox input": function (event) {
  		Session.set("highlightResults", event.target.checked);
  		if (Session.get("highlightResults")) {
			Template.discussions.myHilitor.apply(Session.get("searchQuery"));
		}
		else {
			Template.discussions.myHilitor.remove();
		}
	},
	"submit .searchForm": function (event,template) {
		event.preventDefault();
		Session.set("searchQuery",event.target.searchQuery.value);
		// Pas top pour les performances car on cherche deux fois ...
		var numberOfSearchResults=Docs.find({full: { $regex : event.target.searchQuery.value, $options:"i" } }).count();
		SearchQueries.insert({
		    searchDate: new Date(),
			who: Meteor.userId(),
			searchQuery: event.target.searchQuery.value,
			numberOfSearchResults : numberOfSearchResults
		});
	}
});

Template.discussionElementInTheList.helpers({
	memberUsername: function (who){
		return Members.collection.findOne({accountId:who}).profile.nickname;
	},
	messageCount: function (){
		return Messages.find({discussionId:this._id}).count();
	}
});


Template.discussion.rendered = function () {
	//Session.set("discussionId",params._id);
};


Template.discussion.helpers({
	Messages: function () {
		return Messages.find({discussionId:this._id});
	}
});

Template.messageElementInTheList.helpers({
	memberUsername: function (who){
		return Members.collection.findOne({accountId:who}).profile.nickname;
	}
});


Template.createDiscussionForm.events({
	'submit form': function (event){
	    event.preventDefault();
	    var discussionSubject = event.target.discussionSubject.value;
	    Discussions.insert({
	        subject: discussionSubject,
			createdAt: new Date(),
			who: Meteor.userId()
	    });
	}
});

Template.addMessageToTheDiscussion.events({
	'submit form': function (event){
	    event.preventDefault();
	    var discussionMessage = event.target.discussionMessage.value;
	    Messages.insert({
	        message: discussionMessage,
	        discussionId : this._id,
	        createdAt: new Date(),
			who: Meteor.userId()
	    });
	}
});
