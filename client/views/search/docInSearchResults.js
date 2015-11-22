var userSpaceHasDoc = function (userId, docId) {
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);
};

Template.docInSearchResults.events({
	"click .searchThisTag": function (e) {
			e.preventDefault();
			RKCore.log(e.target.dataset.tag);
			Session.set("searchQuery", e.target.dataset.tag);
			document.getElementById("keywords").value = e.target.dataset.tag;
			Session.set("searchType", "regexpSearch");
			document.getElementById("searchType").value = "regexpSearch";
      return false;
  },
});


Template.docInSearchResults.helpers({
	lastRevision: function () {
		var lastRevision = Revisions.findOne({docId: this._id }, {sort: { revisionNumber: -1}});
  	return ((typeof lastRevision) !== 'undefined') ? lastRevision : false;
	},
	searchTypeIsFullTextSearch: function () {
		return (Session.get('searchType') === 'fullTextSearch');
	},
	categoryName: function () {
		var Category = Categories.findOne(this.categoryId);
		return Category.name;
	},
	textScore: function () {
		//limit to 2 digits after comma :
		return Math.round(this.score * 100) / 100;
	},
	fileLinkUrl: function () {
	  	var fileLink = false;
	  	var category = Categories.findOne(this.categoryId);
			var fieldname;
			var fileLinkUrl = '';
	  	if (typeof category !== 'undefined') {
		  	viewId = category.viewId;
		  	fields = Views.findOne(viewId).fields;
		  	currentDoc = this;
		  	for (fieldname in fields) {
		  		if ((fields[fieldname].type === 'filelink') && (typeof currentDoc.fields[fieldname] !== 'undefined') ) {
			  		fileLink = currentDoc.fields[fieldname].value.replace(/\"/g, ''); //remove " from filelink ;
		  		}
			}
		}
		if (fileLink) {
			fileLink = clientFilename(fileLink);
			fileLinkUrl = 'rk:' + fileLink;
		}
		return fileLinkUrl;
  	},
		fileLinkUrlForClipboard: function () {
			var filelink;
			if (this.hasFilelink) {
				filelink = this.fields[this.filelinkFieldName].value.replace(/\"/g, ''); //remove " from filelink ;
				return filelink;
			}
			return false;
		},
  	prettySearchDisplay: function () {
	  	var prettySearchDisplay = [];
			var category = Categories.findOne(this.categoryId);
			var fields;
			var fieldname;
			var showField;
			var object = {};
	  	if (typeof category !== 'undefined') {
		  	viewId = category.viewId;
		  	fieldsInThisCategory = Views.findOne(viewId).fields;
			}
			fields = this.fields;
			for (fieldname in fields) {
					showField = true;
					if (typeof fieldsInThisCategory[fieldname] !== 'undefined') {
						if (typeof fieldsInThisCategory[fieldname].hideInSearchResultsDisplay === 'undefined'){
							showField = false;
						}
						else if (fieldsInThisCategory[fieldname].hideInSearchResultsDisplay){
							showField = false;
						}
						else {
							showField = true;
						}
					}
					else {
						showField = false;
					}
					//console.log('show : ' + showField);
					if (showField) {
						object = {};
						if (fields[fieldname].value) { //display only when there is something
							object.fieldname = fieldname;
							object.fieldvalue = fields[fieldname].value;
							object.fieldtype = fieldsInThisCategory[fieldname].type;

							if (object.fieldtype === 'tags') {
								tags = object.fieldvalue.replace(/;/g, ',').split(',');
								htmlTags = tags.map(function (tag) {
				        	return "<a href='#'><span class='label label-info searchThisTag' data-tag='" + tag.trim() + "'>" + tag.trim() + "</span></a>";
				        });
								object.fieldvalue =  new Spacebars.SafeString(htmlTags.join(' '));
							}
							else if (object.fieldtype === 'filelink') {
								if (fields[fieldname].exists) {
									BrokenFileLinkWarning = "";
								}
								else {
									BrokenFileLinkWarning =  " <span class='label label-warning'>" + TAPi18n.__('Broken filelink') + "</span>";
								}
								if (fields[fieldname].inValidatedFolder) {
									inValidatedFolder =  " <span class='label label-success'>" + TAPi18n.__('Validated') + "</span>";
								}
								else {
									inValidatedFolder = "";
								}
								object.fieldvalue =  new Spacebars.SafeString(object.fieldvalue + BrokenFileLinkWarning + inValidatedFolder);
							}
							prettySearchDisplay.push(object);
						}
					}
			}
			return prettySearchDisplay;
	},
	userSpaceIcon: function () {
		if (userSpaceHasDoc(Meteor.userId(), this._id)) {
			return 'glyphicon-star';
		}
		return 'glyphicon-star-empty';
	},
	userSpaceLinkTitle: function () {
		if (userSpaceHasDoc(Meteor.userId(), this._id)) {
			return TAPi18n.__('Remove from my space');
		}
		return TAPi18n.__('Add to my space');
	},
});
