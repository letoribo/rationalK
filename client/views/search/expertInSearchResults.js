Template.expertInSearchResults.helpers({
	memberUsername: function (who){
			return Members.collection.findOne({accountId:who}).profile.nickname;
	}
});
