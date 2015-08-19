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
    ev.preventDefault();
    var memberId = this.memberId;
    var email = this.email.toLowerCase();
    var password = $('input[name=password]').val();
    Meteor.call("invitationAccepted", this._id, $('input[name=password]').val(), $('input[name=password2]').val(), function (error, id) {
      if (error) {
  			toastr.error(error.reason);
        return false;
      } else {
        return Meteor.setTimeout(function () {
          return Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
              return Errors.throwError("We were unable to log you in");
            } else {
              return Router.go("dashboard");
            }
          });
        }, 2000);
      }
    });
    return false;
  }
});
