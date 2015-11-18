(function(){Meteor.startup(function () {
  var username = Meteor.settings.rationalK_mail.username;
  var password = Meteor.settings.rationalK_mail.password;
  var host = Meteor.settings.rationalK_mail.host;
  var port = Meteor.settings.rationalK_mail.port;
  return process.env.MAIL_URL = "smtp://" + username + ":" + password + "@" + host + ":" + port + "/";
});

})();
