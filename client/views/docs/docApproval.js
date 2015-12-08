Template.docApproval.events({
  'submit #docApprovalForm': function (e, t) {
    var docApprovalAdditionalText;
    if (typeof(toastr) !== 'undefined') {
      toastr.success(TAPi18n.__('Submitted for approval'));
    }
    e.preventDefault();
    docApprovalAdditionalText = t.$('#docApprovalAdditionalText').val();
    data = {};
    data.docApprovalAdditionalText = docApprovalAdditionalText;
    data.docId = this._id;
    data.submitterUserId = Meteor.user()._id;
    data.submitterUsername = Meteor.user().username;
    data.submitterEmail = Meteor.user().emails[0].address;
    RKCore.log(data);
    Meteor.call('submitForApproval', data, function (err) {
      if (err) {
        if (typeof(toastr) !== 'undefined') {
          toastr.error(err.reason + ". Please try again.");
        }
      }
      else {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__('Email sent.'));
        }
      }
    });
  },
});
