(function(){Meteor.checkLoggedIn = function () {
  var user;
  user = Meteor.user();
  if (!user) {
    throw new Meteor.Error(401, "You need to login to delete a org");
  }
};

})();
