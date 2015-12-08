var filterByOrg;

filterByOrg = function (meteor, collection, userId, strict) {
  var user;
  if (userId) {
    user = Meteor.users.findOne(userId);
    return collection.find({
      orgId: user.profile.orgId,
    });
  }
  else if (!strict) {
    return collection.find();
  }
  return meteor.ready();
};

filterByOrg = function (meteor, collection, userId, strict, options) {
  var user;
  if (userId) {
    user = Meteor.users.findOne(userId);
    return collection.find({
      orgId: user.profile.orgId,
    }, options);
  }
  else if (!strict) {
    return collection.find();
  }
  return meteor.ready();
};

Meteor.publish("members", function (limit) {
  check(limit, Match.Optional(Number));
  return filterByOrg(this, Members.collection, this.userId, true, {
    limit: limit,
  });
});

Meteor.publish("member", function (memberId) {
  var user = Meteor.users.findOne(this.userId);
  check(memberId, String);
  if (user) {
    return Members.collection.find({
      _id: memberId,
      orgId: user.profile.orgId,
    });
  }
});

Meteor.publish("oneMember", function (memberId) {
  RKCore.log("memberId : ");
  RKCore.log(memberId);
  check(memberId, String);
  oneMember = Members.collection.find({_id: memberId});
  RKCore.log("oneMember :");
  RKCore.log(oneMember.fetch());
  return oneMember;
});

Meteor.publish("invitation", function (id) {
  check(id, Match.Optional(String));
  return Members.invitations.find({_id: id});
});

Meteor.methods({
  memberAutocomplete: function (name) {
    var search;
    var user;
    search = {
      $regex: new RegExp(name, 'i'),
    };
    if (Meteor.user()) {
      user = Meteor.users.findOne(Meteor.user()._id);
      return Members.collection.find({
        $and: [
          {
            $or: [
              {
                "profile.name": search,
              }, {
                "profile.nickname": search,
              },
            ],
            orgId: user.profile.orgId,
          },
        ],
      }).fetch().map(function (member) {
        return {
          value: member.profile.name,
          gender: member.gender,
          memberId: member._id,
        };
      });
    }
    return [];
  },
  invitationAccepted: function (invitationId, password, password2) {
    var accountId;
    var invitation;
    var member;
    var memberId;
    var ref;
    check(invitationId, String);
    check(password, String);
    check(password2, String);

    if (!password) {
      throw new Meteor.Error(422, "Please type in a password");
    }
    if (password !== password2) {
      throw new Meteor.Error(422, "The two passwords are different. Please try again.");
    }
    invitation = Members.invitations.findOne({
      _id: invitationId,
    });
    if (!invitation) {
      throw new Meteor.Error(422, "This invitation is not valid anymore. Please contact your administrator.");
    }
    memberId = invitation.memberId;
    member = Members.collection.findOne({
      _id: memberId,
    });
    if (!member) {
      throw new Meteor.Error(422, "This invitation is not valid anymore (member not valid). Please contact your administrator.");
    }
    accountId = Accounts.createUser({
      email: invitation.email,
      profile: invitation.profile,
      password: password,
      verified: true,
    });
    Meteor.users.update({
      _id: accountId,
    }, {
      $set: {
        username: invitation.email,
        profile: invitation.profile,
      },
    });
    Members.collection.update({
      _id: memberId,
    }, {
      $set: {
        accountId: accountId,
      },
    });
    if (((ref = member.profile.roles) != null ? ref.length : void 0) > 0) {
      Roles.addUsersToRoles(accountId, member.profile.roles);
    }
    return invitationId;
  },
});
