Template.findAndReplaceTag.events({
  "submit form#findAndReplaceTag": function (e) {
    var data;
    e.preventDefault();
    data = {
      tagSource: $(e.target).find("[name=tagSource]").val(),
      tagDestination: $(e.target).find("[name=tagDestination]").val(),
    };
    Meteor.call("findAndReplaceTag", data, function (err) {
      if (!err) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Tag replaced with success"));
        }
      }
    });
    return false;
  },
});

Template.findAndReplaceTag.rendered = function () {

};

Template.findAndReplaceTag.helpers({

});
