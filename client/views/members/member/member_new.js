Template.memberNew.events({
  "submit form": function (e) {
    var properties, rd, shareDialogInfo;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      email: $(e.target).find("[name=email]").val().toLowerCase(),
      nickname: $(e.target).find("[name=nickname]").val(),
      roles: $('select#roles').val(),
      hostname: window.location.hostname
    };
    shareDialogInfo = {
      template: Template.spinner,
      title: "Wait",
      modalDialogClass: "wait-dialog",
      modalBodyClass: "share-modal-body",
      modalFooterClass: "share-modal-footer",
      removeOnHide: true,
      buttons: {}
    };
    rd = ReactiveModal.initDialog(shareDialogInfo);
    rd.show();
    Meteor.call("memberNew", properties, function (error, id) {
      rd.hide();
      if (error) {
        Errors.throwError(error.reason);
      } else {
        Router.go("members");
      }
    });
  }
});
