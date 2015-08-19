Meteor.startup(function () {

  


  var username = "server@rationalK.ch";
  var password = "server";
  var host = "@mail.infomaniak.ch";
  var port = "587";
  return process.env.MAIL_URL = "smtp://" + username + ":" + password + host + ":" + port + "/";


});
