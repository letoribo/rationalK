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
      );
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
      );
      return false;
    },
    memberRolesUpdate: function (data) {
      check(data, {
          memberId: String,
          allowedRoles: Array,
        }
      );
      Members.collection.update(
        {
          _id: data.memberId,
        },
        { $set:
          {
            catRoles: data.allowedRoles,
          },
        }
      );
      return false;
    },
    rolesDelete: function (data) {
      check(data, {
          roleId: String,
        }
      );
      rKRoles.remove(
        {
          _id: data.roleId,
        }
      );
      return false;
    },
  }); //end of methods
} //end of is Server
