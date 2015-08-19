Template.categoryNew.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val()
    };
    Meteor.call("categoryNew", properties, function (error, id) {
      if (error) {
        // do nothing (a popup should appear)
      } else {
        Router.go("categoryEdit", {
          _id: id
        });
      }
    });
  }
});

Template.categoryNew.helpers({
  views: function () {
    return Views.find({
      type: {
        $not: "system"
      }
    });
  }
});
