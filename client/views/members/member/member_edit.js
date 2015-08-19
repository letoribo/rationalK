Template.memberEdit.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      gender: $(e.target).find("[name=gender]:checked").val(),
      email: $(e.target).find("[name=email]").val().toLowerCase(),
      locale: $(e.target).find("[name=locale]").val(),
      memberId: this._id,
      roles: $('select#roles').val(),
      nickname: $(e.target).find("[name=nickname]").val()
    };
    Meteor.call("memberUpdate", properties, function (error, id) {
      if (error) {
        Errors.throwError(error.reason);
      } else {
        Router.go("members");
      }
    });
    return false;
  },
  "click .delete": function (e) {
    e.preventDefault();
    if (confirm("Delete this member?")) {
      Meteor.call("memberDelete", this._id, function (error, id) {
        if (error) {
          return Errors.throwError(error.reason);
        } else {
          return Router.go("members");
        }
      });
      return false;
    }
    return false;
  }
});

Template.memberEdit.rendered = function () {
  $("#" + this.data.gender).prop('checked', true);
  return $('#roles').multiSelect('select', this.data.profile.roles);
};
