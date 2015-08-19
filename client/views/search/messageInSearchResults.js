Template.messageInSearchResults.helpers({
	memberUsername: function (who){
		if (Meteor.settings.public.debug){
			console.log("Member who :");
			console.log(who);
		}
		return Members.collection.findOne({accountId:who}).profile.nickname;
	}
});
