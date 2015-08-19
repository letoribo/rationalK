Meteor.methods({
  deleteAllRevisionsInACategory: function (categoryId) {
    if (! this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to add a doc to your space.");
    }

	Revisions.remove({categoryId:categoryId});
    return true;
  }
});