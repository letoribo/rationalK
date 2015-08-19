var sendVerificationEmail;

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: true
});

sendVerificationEmail = function(userId) {
  return Accounts.sendVerificationEmail(userId);
};

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = {};
    if (!options.verified) {
      Meteor.setTimeout((function() {
        Accounts.sendVerificationEmail(user._id);
      }), 2 * 1000);
    } else {
      Meteor.setTimeout((function() {
        Meteor.users.update({
          _id: user._id
        }, {
          $set: {
            "emails.0.verified": true
          }
        });
      }), 2 * 1000);
    }
    return user;
  });
  Meteor.startup(function() {
    var loginAttemptVerifier;
    loginAttemptVerifier = function(parameters) {
      var found, memberId, ref, ref1, user;
      if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
        user = parameters.user;
        found = _.find(user.emails, function(thisEmail) {
          return thisEmail.verified;
        });
        if (!found) {
          Accounts.sendVerificationEmail(user._id);
          throw new Meteor.Error(500, "We sent you an email.");
        } else {
          if (!Members.collection.find({
            accountId: user._id
          }).count() > 0) {
            memberId = Members.collection.insert({
              email: (ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0,
              orgId: user.profile.orgId,
              profile: user.profile,
              accountId: user._id
            });
            Roles.setUserRoles(user._id, ['admin']);
          }
        }
        return found && parameters.allowed;
      } else {
        console.log("user has no registered emails.");
        return false;
      }
    };
    return Accounts.validateLoginAttempt(loginAttemptVerifier);
  });
}
