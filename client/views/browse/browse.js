Template.browse.helpers({
  hasSelectedCategory: function () {
    return Session.get('selectedCategory');
  },
});

Template.browse.rendered = function () {
  RKCore.log("Data : ");
  RKCore.log(this.data);
  if (this.data) {
    Session.set('selectedCategory', Categories.findOne({"slug": this.data})._id);
  }
};
