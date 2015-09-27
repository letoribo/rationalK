Template.memberNew.events({
  "submit form": function (e) {
    var properties;
    var rd;
    var shareDialogInfo;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      email: $(e.target).find("[name=email]").val().toLowerCase(),
      nickname: $(e.target).find("[name=nickname]").val(),
      roles: $('select#roles').val(),
      hostname: window.location.hostname,
    };
    shareDialogInfo = {
      template: Template.spinner,
      title: "Wait",
      modalDialogClass: "wait-dialog",
      modalBodyClass: "share-modal-body",
      modalFooterClass: "share-modal-footer",
      removeOnHide: true,
      buttons: {},
    };
    rd = ReactiveModal.initDialog(shareDialogInfo);
    rd.show();
    Meteor.call("memberNew", properties, function (error) {
      rd.hide();
      if (error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.error(error.reason);
        }
      }
      else {
        Router.go("members");
      }
    });
  },
});
