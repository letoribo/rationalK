categoriesThatUserIsAllowedToBrowse = function (userId) {
  var categoriesThatIAmAllowedToBrowse = [];
  var categoriesThatIAmAllowedToBrowseThanksToThisRole;
  var nCatRoles;
  catRoles = Members.collection.findOne({accountId: userId}).catRoles;
  if (typeof catRoles !== 'undefined') {
    RKCore.log("catRoles : ");
    RKCore.log(catRoles);
    nCatRoles = catRoles.length;
    for (var i = 0; i < nCatRoles; i++) {
        RKCore.log("catRoles[i] : ");
        RKCore.log(catRoles[i]);
        aa = rKRoles.findOne({});
        RKCore.log("aa");
        RKCore.log(aa);

        categoriesThatIAmAllowedToBrowseThanksToThisRole = rKRoles.findOne({_id: catRoles[i]}).allowedCategories;
        RKCore.log("categoriesThatIAmAllowedToBrowseThanksToThisRole : ");
        RKCore.log(categoriesThatIAmAllowedToBrowseThanksToThisRole);
        categoriesThatIAmAllowedToBrowse = categoriesThatIAmAllowedToBrowse.concat(categoriesThatIAmAllowedToBrowseThanksToThisRole);
    }
    RKCore.log("categoriesThatIAmAllowedToBrowse : ");
    RKCore.log(categoriesThatIAmAllowedToBrowse);
    return categoriesThatIAmAllowedToBrowse
  }
  return []; //do not show anything if the user has no role.
};

if (Meteor.isServer) {
  Meteor.methods({
  	categoriesThatUserIsAllowedToBrowseMethod: function (userId) {
  		var cats = categoriesThatUserIsAllowedToBrowse(userId);
      check(userId, String);
      return cats;
  	},
  });
}
