Template.categoryEdit.events({
  "submit form#categoryEditForm": function (e) {
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
  "submit form#changeNameOfFieldForAllDocs": function (e) {
    var properties;
    RKCore.log("clicked");
    e.preventDefault();
    properties = {
      nameCurrent: $(e.target).find("[name=nameCurrent]").val(),
      nameDestination: $(e.target).find("[name=nameDestination]").val(),
      categoryId: this._id,
    };
    Meteor.call("changeNameOfFieldForAllDocs", properties, function (err) {
      RKCore.log("test2");
      if (!err) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success("Name changed successfully");
        }
        return false;
      }
    });
    return false;
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
