Template.qrcode.rendered = function () {
  if (Router.current().route.getName() === "docEdit" ){
    if (Meteor.settings.public.debug){
      console.log("I am on docEdit page")
      console.log(this);
    }
    var docId = this.data._id;
  }
  else {
    //Revision view page
    var docId = this.data.docId;
  }

  qrCodeUrl = Router.routes.docEdit.url({_id: docId});
  if (Meteor.settings.public.debug){
    console.log(this)
    console.log(qrCodeUrl);
  }
  $('#qrcode').qrcode( {
        text: qrCodeUrl,
        render: 'canvas',
        width: 128,
        height: 128,
        ecLevel: 'H',
        radius: 0.2,
  });
}
