Template.filesContentInSearchResults.events({
	"click .searchThisTag": function (e, t) {
			e.preventDefault();
			if (Meteor.settings.public.debug){
				console.log(e.target.dataset.tag)
			}
			Session.set("searchQuery",e.target.dataset.tag);
			document.getElementById("keywords").value = e.target.dataset.tag ;
			Session.set("searchType","regexpSearch");
			document.getElementById("searchType").value = "regexpSearch";
      return false;
  }

});


Template.filesContentInSearchResults.helpers({
	lastRevision: function () {
		var lastRevision = Revisions.findOne({docId: this._id },{sort: { revisionNumber: -1}})
  	return ((typeof lastRevision)!== 'undefined') ? lastRevision : false;
	},
	shortText: function() {
		return this.text.substring(0, 500);
	},
	searchTypeIsFullTextSearch: function () {
		return (Session.get('searchType')==='fullTextSearch')
	},
	categoryName: function (){
		var Category = Categories.findOne(this.categoryId);
		return Category.name;
	},
	textScore: function (){
		//limit to 2 digits after comma :
		return Math.round(this.score*100)/100;
	},
	fileLinkUrl: function () {
			fileLink = clientFilename(this.filePath);
	  	return fileLinkUrl = 'rk:'+fileLink;
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
