Template.docApproval.rendered = function () {

};

Template.docApproval.events({
  'submit #docApprovalForm' : function (e, t){
    if (typeof(toastr) !== 'undefined') {
      toastr.success(TAPi18n.__('Submitted for approval'));
    }
    e.preventDefault();
    var docApprovalAdditionalText = t.$('#docApprovalAdditionalText').val();
    var data = {};
    data.docApprovalAdditionalText = docApprovalAdditionalText;
    data.docId = this._id;
    data.submitterUserId = Meteor.user()._id;
    data.submitterUsername = Meteor.user().username;
    data.submitterEmail = Meteor.user().emails[0].address
    if (Meteor.settings.public.debug){
      console.log(data)
    }
    Meteor.call('submitForApproval',data, function (err){
      if (err){
        if (typeof(toastr) !== 'undefined') {
          toastr.error(err.reason+". Please try again.");
        }
      }
      else
      {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__('Email sent.'));
        }
      }
    })

  }
});

Template.docApproval.helpers({

});
