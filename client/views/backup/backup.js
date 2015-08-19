Template.backup.rendered = function () {

};

Template.backup.helpers({
		isAdmin: function () {
	    var loggedInUser;
	    loggedInUser = Meteor.user();
	    return Roles.userIsInRole(loggedInUser, ['admin']);
  	}
});


Template.backup.events({

});
