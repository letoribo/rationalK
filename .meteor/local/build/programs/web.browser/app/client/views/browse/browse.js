(function(){Template.browse.helpers({
  hasSelectedCategory: function () {
    return Session.get('selectedCategory');
  },
});

Template.browse.rendered = function () {
  if (Meteor.settings.public.debug) {
    console.log("Data : ");
    console.log(this.data);
  }
  if (this.data) {
    Session.set('selectedCategory', Categories.findOne({"slug": this.data})._id);
  }
};

})();
