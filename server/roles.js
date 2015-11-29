if (Meteor.isServer) {
  Meteor.methods({
    rolesNew: function (data) {
      check(data, {
          roleName: String,
        }
      );
      rKRoles.insert(
        {
          roleName: data.roleName,
        }
      ).fetch();
      return false;
    },
  }); //end of methods
} //end of is Server
