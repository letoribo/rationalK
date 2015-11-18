(function(){Meteor.orgIdForHostname = function (hostname) {
  console.log(hostname);
  return Orgs.findOne({
    subdomain: "kdanse"
  })._id;
};

})();
