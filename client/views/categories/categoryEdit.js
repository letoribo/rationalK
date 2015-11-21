Template.categoryEdit.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      info: $(e.target).find("[name=info]").val(),
      globalFilterOnTableView: $(e.target).find("[name=globalFilterOnTableView]").is(':checked'),
      showColumnTogglesOnTableView: $(e.target).find("[name=showColumnTogglesOnTableView]").is(':checked'),
      viewId: $("#selectedView").val(),
      categoryId: this._id,
      slug: getSlug($(e.target).find("[name=name]").val()),
    };
    Meteor.call("categoryUpdate", properties, function (error) {
      if (!error) {
        Router.go("categoryList");
      }
    });
  },
});

Template.categoryEdit.helpers({
  views: function () {
    return Views.find({
      type: {
        $not: "system",
      },
    });
  },
  isViewSelected: function (viewId) {
    return this._id === viewId;
  },
  viewData: function () {
    return Views.findOne({
      _id: this.viewId,
    });
  },
});

Template.categoryEdit.rendered = function () {
  return Session.set("selectedCategory", this.$('#selectedCategory').val());
};
