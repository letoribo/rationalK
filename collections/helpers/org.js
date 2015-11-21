Meteor.orgIdForHostname = function (hostname) {
  RKCore.log(hostname);
  return Orgs.findOne({
    subdomain: "kdanse",
  })._id;
};
