categoriesThatUserIsAllowedToBrowse = function (userId) {
  var categoriesThatIAmAllowedToBrowse = [];
  catRoles = Members.collection.findOne({accountId: userId}).catRoles;
  if (typeof catRoles !== 'undefined') {
    RKCore.log("catRoles : ");
    RKCore.log(catRoles);
    var nCatRoles = catRoles.length;
    for (var i = 0; i < nCatRoles; i++) {
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
