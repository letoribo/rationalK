Meteor.methods({
  categoryUpdate: function (att) {
    check(att, {
      name : String,
      categoryId: String,
      info : Match.Optional(String),
      slug : Match.Optional(String)
    })
    var user = Meteor.user();
    if (!user) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("You need to login to delete a category");
      }
      throw new Meteor.Error(401, "You need to login to delete a category");
    }
    if (!att.name) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the category");
      }
      throw new Meteor.Error(422, "Please fill in with the category");
    }
    if (!att.categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the categoryId");
      }
      throw new Meteor.Error(422, "Please fill in with the categoryId");
    }
    Categories.update({
      _id: att.categoryId
    }, {
      $set: {
        name: att.name,
        info: att.info,
        slug: att.slug
      }
    });
  },
  categoryNew: function (att) {
    check(att, {name : String})
    var orgId, viewId;
    var user = Meteor.user();
    if (!user) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("You need to login to add a new category");
      }
      throw new Meteor.Error(401, "You need to login to add a new category");
    }
    if (!att.name) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the category");
      }
      throw new Meteor.Error(422, "Please fill in with the category");
    }
    orgId = user.profile.orgId;
    viewId = Views.insert({
      orgId: orgId,
      name: att.name
    });
    return Categories.insert({
      orgId: orgId,
      name: att.name,
      slug: att.slug,
      viewId: viewId
    });
  },
  categoryDelete: function (categoryId) {
    check(categoryId,String)
    var user;
    user = Meteor.user();
    if (!user) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("You need to login to delete a tag");
      }
      throw new Meteor.Error(401, "You need to login to delete a tag");
    }
    if (!categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the tag name");
      }
      throw new Meteor.Error(422, "Please fill in with the tag name");
    }
    Categories.remove({
      _id: categoryId
    });
  }
});
