Template.categoriesSelector.helpers({
  categories: function () {
    return Categories.find();
  },
  views: function () {
    return Views.find({
      type: {
        $not: "system",
      },
    });
  },
  isSelected: function () {
    if (Session.get('selectedCategory') === this._id) {
      return "selected";
    }
  },
  selectedCategory: function () {
    return Session.get('selectedCategory');
  },
  info: function () {
    if (Session.get('selectedCategory')) {
      return Categories.findOne({_id: Session.get('selectedCategory')}).info;
    }
    return false;
  },
});

Template.categoriesSelector.events({
  "click a.select": function (e) {
    e.preventDefault();
    Session.set('selectedCategory', this._id);
    history.pushState(null, null, Router.routes.browse.path({categorySlug: this.slug}));
    return false;
  },
});
