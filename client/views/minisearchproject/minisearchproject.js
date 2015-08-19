Template.minisearchproject.rendered = function () {
	var myHilitor;
	Template.minisearch.myHilitor = new Hilitor.highlight("resultsContent");
	Template.minisearch.myHilitor.setMatchType("left");
};

Template.minisearchproject.helpers({
	Docs: function () {
		if (typeof Session.get("searchQuery")!== 'undefined'){
			var searchQuery = Session.get("searchQuery");

			var parts = searchQuery.trim().split(/[ \-\:]+/);
			regExp = new RegExp("(" + parts.join('|') + ")", "ig");


			function buildRegExp(searchText) {
			  // this is a dumb implementation
			  var parts = searchText.trim().split(/[ \-\:]+/);
			  return new RegExp("(" + parts.join('|') + ")", "ig");
			}

			var regExp = buildRegExp(searchQuery);
			var selector = {$or: [
				{full: regExp}
			]};

			var options = {
				sort: {searchScore: -1},
				keepHistory: 1000 * 60 * 5,
				localSearch: true
			};

			docsResults = Docs.find(selector, options).fetch();


			var selector = {$or: [
				{path: regExp}
			]};
			filesResults = WalkedFiles.find(selector).fetch();

			var results = docsResults.concat(filesResults);

			return results;
		}
		else {
			return false;
		}
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

Template.docInMiniSearchResultsProject.helpers({
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


Template.minisearchproject.events({
	"keyup input.keywords": function (event, template) {
		if (event.target.value.length>=2){
			//Session.set("searchQuery",event.target.value);
			if (Session.get("highlightResults")) {
				Template.minisearch.myHilitor.apply(event.target.value);
			}
		}
  	},
  	"change .highlight-checkbox input": function (event) {
  		Session.set("highlightResults", event.target.checked);
  		if (Session.get("highlightResults")) {
			Template.minisearch.myHilitor.apply(Session.get("searchQuery"));
		}
		else {
			Template.minisearch.myHilitor.remove();
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
	},
	"click a.addToProject": function (event,template){
	    event.preventDefault();
	    var lastRevision =  Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})._id
	    //var linkToLastRevision = "/revision/"+lastRevision+"/view";
	    var dataset={};
   	    dataset.docId=this._id;
	    dataset.lastRevision=lastRevision;
	    dataset.projectId=template.data._id;
	    //dataset.projectId =
	     Meteor.call('addToProject',dataset, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
		return false;
	},
	"click a.addFileLinkToNote": function (event){
	    event.preventDefault();
	    console.log(this);
	    var lastRevision =  Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})._id
	    var linkToLastRevision = "/revision/"+lastRevision+"/view";
	    $('#myhtml').val($('#myhtml').val() + '\n<a href="'+linkToLastRevision+'">DocName</a>');
			return false;
	}
});
