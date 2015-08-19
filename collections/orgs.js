Meteor.methods({
  orgNew: function (att) {
    var user;
    Meteor.checkLoggedIn();
    Meteor.checkAttributes(att, ["name", "location", "email", "subdomain"]);
    user = Meteor.user();
    Orgs.insert({
      name: att.name,
      location: att.location,
      email: att.email,
      subdomain: att.subdomain,
      userId: user._id
    });
  },
  orgEdit: function (att) {
    var org, user;
    Meteor.checkLoggedIn();
    Meteor.checkAttributes(att, ["name", "location", "email", "subdomain", "orgId"]);
    user = Meteor.user();
    org = Orgs.findOne({
      id: att.orgId
    });
    return Orgs.update({
      id: att.orgId,
      userId: user._id
    }, {
      $set: {
        name: att.name,
        location: att.location,
        email: att.email,
        subdomain: att.subdomain
      }
    });
  },
  orgDelete: function (orgId) {
    var user;
    Meteor.checkLoggedIn();
    user = Meteor.user();
    return Orgs.remove({
      _id: orgId,
      userId: user._id
    });
  }
});