Template.externalInSearchResults.events({
	"click .searchThisTag": function (e, t) {
			e.preventDefault();
			console.log(e.target.dataset.tag)
			Session.set("searchQuery",e.target.dataset.tag);
			document.getElementById("keywords").value = e.target.dataset.tag ;
			Session.set("searchType","regexpSearch");
			document.getElementById("searchType").value = "regexpSearch";
      return false;
  	}

});


Template.externalInSearchResults.helpers({
  	lastRevision: function () {
	  	if (typeof Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})!== 'undefined'){
			return Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})._id;
		}
		else {
			return false;
		}
	},
	searchTypeIsFullTextSearch: function () {
		return (Session.get('searchType')==='fullTextSearch')
	},
	categoryName: function (){
		var Category = Exte.findOne(this.categoryId);
		return Category.name;
	},
	textScore: function (){
		return Math.round(this.score*100)/100;
	},
	fileLinkUrl: function () {

	  	var fileLink = false;
	  	var category=Categories.findOne(this.categoryId);
	  	if (typeof category!== 'undefined'){
		  	viewId = category.viewId;
		  	fields = Views.findOne(viewId).fields;
		  	currentDoc = this;
		  	for (var fieldname in fields) {
		  		if ((fields[fieldname].type=='filelink') && (typeof currentDoc.fields[fieldname]!== 'undefined') ){
			  		var fileLink = currentDoc.fields[fieldname].value.replace(/\"/g, ''); //remove " from filelink ;
		  		}
			}
		}


		if (fileLink){
			fileLink = replaceFilename(fileLink);
			var fileLinkUrl = 'rk:'+fileLink;
		}
		else {
			var fileLinkUrl ='';
		}


		if (fileLinkUrl){

			return fileLinkUrl;
		} else {
			return false;
		}
  	},
		fileLinkUrlForClipboard: function () {
			if (this.hasFilelink){
				var filelink = this.fields[this.filelinkFieldName].value.replace(/\"/g, ''); //remove " from filelink ;
				return filelink;

			}
			else {
				return false;
			}

		},
  	prettySearchDisplay : function (){
	  	var prettySearchDisplay=[];

		var category=Categories.findOne(this.categoryId);
	  	if (typeof category!== 'undefined'){
		  	viewId = category.viewId;
		  	fieldsInThisCategory = Views.findOne(viewId).fields;
		}
		//console.log('Fields in this category');
		//console.log(fieldsInThisCategory);
		//console.log('Fields in this result :');
		var fields = this.fields;
		//console.log(fields);
		for (var fieldname in fields) {
				var showField = true;
				//console.log('Considering this field : ' + fieldname);
				//console.log('hide : '  + fieldsInThisCategory[fieldname].hideInSearchResultsDisplay);
				if (typeof fieldsInThisCategory[fieldname]!== 'undefined'){
					if (typeof fieldsInThisCategory[fieldname].hideInSearchResultsDisplay=== 'undefined'){
						//console.log('undefined I knew it...');
					}
					else if (fieldsInThisCategory[fieldname].hideInSearchResultsDisplay){
						//console.log('you should hide it');
						showField = false;
					}
					else {
						//console.log('you should show it');
						showField = true;
					}
				}
				else {
					showField = false;
				}
				//console.log('show : ' + showField);
				if (showField){

					var object={};

					if (fields[fieldname].value){ //display only when there is something
						object.fieldname=fieldname;
						object.fieldvalue=fields[fieldname].value;
						object.fieldtype=fieldsInThisCategory[fieldname].type;

						if (object.fieldtype==='tags'){
							tags = object.fieldvalue.replace(/;/g, ',').split(',');
							//console.log(tags)
								htmlTags = tags.map(function (tag) {
			          return "<a href='#'><span class='label label-info searchThisTag' data-tag='"+tag.trim()+"'>" + tag.trim() + "</span></a>";
			        });
							object.fieldvalue=  new Spacebars.SafeString(htmlTags.join(' '));
							//console.log(object)
						}
						else if (object.fieldtype==='filelink'){
							//Check if broken filelink (if exists or not)
							if (fields[fieldname].exists){
								BrokenFileLinkWarning = "";
							}
							else {
								BrokenFileLinkWarning =  " <span class='label label-warning'>" + TAPi18n.__('Broken filelink') + "</span>";
							}
							object.fieldvalue =  new Spacebars.SafeString(object.fieldvalue + BrokenFileLinkWarning)
						}

						prettySearchDisplay.push(object);
					}
				}
		}
		//console.log(prettySearchDisplay);
		return prettySearchDisplay;

	},
	userSpaceIcon: function () {
		if (userSpaceHasDoc(Meteor.userId(), this._id))
			return 'glyphicon-star';
		else
			return 'glyphicon-star-empty';
	},
	userSpaceLinkTitle: function () {
		if (userSpaceHasDoc(Meteor.userId(), this._id))
			return TAPi18n.__('Remove from my space');
		else
			return TAPi18n.__('Add to my space');
	}
});

var userSpaceHasDoc = function (userId, docId) {
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);
};
