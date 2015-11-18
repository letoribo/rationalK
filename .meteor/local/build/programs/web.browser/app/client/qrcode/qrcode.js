(function(){Template.qrcode.rendered = function () {
  var docId;
  if (Router.current().route.getName() === "docEdit" ) {
    docId = this.data._id;
  }
  else {
    //Revision view page
    docId = this.data.docId;
  }
  qrCodeUrl = Router.routes.docEdit.url({_id: docId});
  $('#qrcode').qrcode( {
        text: qrCodeUrl,
        render: 'canvas',
        width: 128,
        height: 128,
        ecLevel: 'H',
        radius: 0.2,
  });
};

})();
