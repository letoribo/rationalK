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
    rolesUpdate: function (data) {
      check(data, {
          roleId: String,
          allowedCategories: Array,
        }
      );
      rKRoles.update(
        {
          _id: data.roleId,
        },
        { $set:
          {
            allowedCategories: data.allowedCategories,
          },
        }
      ).fetch();
      return false;
    },
  }); //end of methods
} //end of is Server
