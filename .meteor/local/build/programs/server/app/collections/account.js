(function(){Meteor.methods({
  accountUpdate: function (att) {
    var account = Meteor.users.findOne({_id: att.accountId});
    if (!Meteor.user()) {
      throw new Meteor.Error(401, "You need to login to post new account");
    }
    if (!att.accountId) {
      throw new Meteor.Error(422, "Please fill in with the accountId");
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    Meteor.users.update({
      _id: att.accountId,
    }, {
      $set: {
        "profile.name": att.name,
        "profile.nickname": att.nickname,
      },
    });
    console.log(att.accountId);

    return Roles.setUserRoles(account, att.roles || []);
  },
  accountDelete: function (accountId) {
    if (!Meteor.user()) {
      throw new Meteor.Error(401, "You need to login to post new account");
    }
    Roles.setUserRoles(accountId, []);
    Meteor.users.remove({
      _id: accountId,
    });
  },
  accountNew: function (att) {
    var accountId = Accounts.createUser({
      email: att.email,
      password: "testPass",
      profile: {
        name: att.name,
        nickname: att.nickname,
        orgId: Meteor.orgIdForHostname(att.hostname),
      },
    });

    if (!Meteor.user()) {
      throw new Meteor.Error(401, "You need to login to add new account");
    }
    if (!att.email) {
      throw new Meteor.Error(422, "Please fill in with the email");
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    Roles.setUserRoles(accountId, att.roles || []);
    return accountId;
  },
});

})();
