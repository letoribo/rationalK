(function(){Template.memberEdit.events({
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
      nickname: $(e.target).find("[name=nickname]").val(),
    };
    Meteor.call("memberUpdate", properties, function (error) {
      if (error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.error(error.reason);
        }
      }
      else {
        Router.go("members");
      }
    });
    return false;
  },
  "click .delete": function (e) {
    var doDelete = function() {

    };
    e.preventDefault();

    BootstrapModalPrompt.prompt({
    title: "Confirmation",
    content: "Do you really want to delete this user ?",
    }, function (result) {
      if (result) {
        console.log(e.currentTarget.dataset.memberid);
        Meteor.call("memberDelete", e.currentTarget.dataset.memberid, function (error) {
          if (error) {
            if (typeof(toastr) !== 'undefined') {
              toastr.error(error.reason);
            }
          }
          else {
            return Router.go("members");
          }
        });
        return false;
      }
    });

    /*
    if (confirm("Delete this member?")) {
      Meteor.call("memberDelete", this._id, function (error) {
        if (error) {
          if (typeof(toastr) !== 'undefined') {
            toastr.error(error.reason);
          }
        }
        else {
          return Router.go("members");
        }
      });
      return false;
    }
    */
    return false;
  },
});

Template.memberEdit.rendered = function () {
  $("#" + this.data.gender).prop('checked', true);
  if (this.data.profile.roles) {
    $('#roles').multiSelect('select', this.data.profile.roles);
  }
  return false;
};

})();
