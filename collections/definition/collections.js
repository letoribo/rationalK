History = new Mongo.Collection('history');
Views = new Mongo.Collection('views');
Docs = new Mongo.Collection('docs');
Revisions = new Mongo.Collection('revisions');
Categories = new Mongo.Collection('categories');
Singeletons = new Mongo.Collection('singletons');
PredefinedTags = new Mongo.Collection('predefinedtags');
rkSettings = new Mongo.Collection('rkSettings');
rkStatus = new Mongo.Collection('rkStatus');
userSpaces = new Mongo.Collection('userspaces');
FoldersToScan = new Mongo.Collection('folderstoscan');
TempWalkedFiles = new Mongo.Collection('tempwalkedfiles');
WalkedFiles = new Mongo.Collection('walkedfiles');
SearchQueries = new Mongo.Collection('searchqueries');
Discussions = new Mongo.Collection('discussions');
Messages = new Mongo.Collection('messages');
Notes = new Mongo.Collection('notes');
Synonyms = new Mongo.Collection('synonyms');
ProcessDocuments = new Mongo.Collection('processdocuments');
Processes = new Mongo.Collection('processes');
Expert = new Mongo.Collection('expert');
Projects = new Mongo.Collection('projects');
TempProjectFiles = new Mongo.Collection('tempprojectfiles');
ProjectFiles = new Mongo.Collection('projectfiles');
Production = new Mongo.Collection('production');
controlPlan = new Mongo.Collection('controlplan');
Filelinks = new Mongo.Collection('filelinks');
Tags = new Mongo.Collection('tags');
External = new Mongo.Collection('external');
WebSearchResults = new Mongo.Collection('websearchresults');
XMLFiles = new Mongo.Collection('xmlfiles');
RessourcePlanning = new Mongo.Collection('ressourceplanning');
Gantts = new Mongo.Collection('gantts');
FollowUp = new Mongo.Collection('FollowUp');

if (Meteor.isServer) {
	if (typeof Docs.createIndex === 'function') {
		if (Meteor.settings.public.debug) {
			console.log("You are runnning a mongodb version >3.");
		}
		Docs.createIndex( { full: "text" }, {name: "MyFullTextSearchIndex"});
		WalkedFiles.createIndex( { path: "text" }, {name: "MyFileFullTextSearchIndex"});
		External.createIndex({ "$**": "text" }, { name: "TextIndex" });
	}
	else {
		if (Meteor.settings.public.debug) {
			console.log("You are runnning a mongodb version <3 (probably 2.6.X).");
		}
		if (typeof Docs._ensureIndex === 'function') {
			Docs._ensureIndex( { full: "text" }, {name: "MyFullTextSearchIndex"});
			WalkedFiles._ensureIndex( { path: "text" }, {name: "MyFileFullTextSearchIndex"});
			External._ensureIndex({ "$**": "text" }, { name: "TextIndex" });
	}
}
} //end if Server

XMLFiles.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Gantts.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

External.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Filelinks.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

FollowUp.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Tags.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

controlPlan.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Production.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});


Synonyms.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Projects.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

TempProjectFiles.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

ProjectFiles.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Expert.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Processes.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

ProcessDocuments.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Messages.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Notes.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

Discussions.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

WalkedFiles.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

TempWalkedFiles.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

SearchQueries.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

PredefinedTags.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});


PredefinedTags.attachSchema(new SimpleSchema({
  label: {
    type: String,
    label: "Tags",
    max: 30,
  },
}));

FoldersToScan.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

rkSettings.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

rkStatus.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

userSpaces.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});


Attachments = new FS.Collection("attachments", {
	stores: [
		new FS.Store.FileSystem("attachments"),
	],
});

Attachments.allow({
	insert: function (userId) {return !! userId; },
	update: function (userId) {return !!userId; },
	remove: function (userId) {return !!userId; },
  download: function (userId) {return !!userId; },
});
