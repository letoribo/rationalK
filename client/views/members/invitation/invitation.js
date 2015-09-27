Template.invitation.rendered = function () {
  Meteor.logout();
};

Template.invitation.events({
  "click .setLanguage": function (e) {
    e.preventDefault();
    TAPi18n.setLanguage(e.currentTarget.dataset.locale);
    return false;
  },
  "click #join": function (ev) {
    var email = this.email.toLowerCase();
    var password = $('input[name=password]').val();
    ev.preventDefault();
    Meteor.call("invitationAccepted", this._id, $('input[name=password]').val(), $('input[name=password2]').val(), function (error) {
      if (error) {
  			toastr.error(error.reason);
        return false;
      }
      return Meteor.setTimeout(function () {
        return Meteor.loginWithPassword(email, password, function (err) {
          if (!err) {
            return Router.go("dashboard");
          }
        });
      }, 2000);
    });
    return false;
  },
});
