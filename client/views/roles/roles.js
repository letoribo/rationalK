Template.rKRoles.events({
  "submit form#roleForm": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      roleName: $(e.target).find("[name=roleName]").val(),
    };
    Meteor.call("rolesNew", properties, function (error) {
      if (!error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Role created with success"));
        }
      }
    });
  },
  "submit form.editForm": function (e) {
    var properties;
    var cat = $(e.target).find("[name=categorie]");
    var allowedCategories = [];
    e.preventDefault();
    RKCore.log(cat);
    cat.each(function (i) {
      if (cat[i].checked) {
        allowedCategories.push(cat[i].value);
      }
    });
    RKCore.log(allowedCategories);

    properties = {
      roleId: $(e.target).find("[name=roleId]").val(),
      allowedCategories: allowedCategories,
    };
    Meteor.call("rolesUpdate", properties, function (error) {
      if (!error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Role updated with success"));
        }
      }
    });
  },
  "click #deleteRole": function (e) {
    e.preventDefault();
    bootbox.confirm(TAPi18n.__("Are you sure you want to delete this role ?"), function (result) {
		 if (result) {
       properties = {
         roleId: e.currentTarget.dataset.roleid,
       };
       RKCore.log("properties : ");
       RKCore.log(properties);
       Meteor.call("rolesDelete", properties, function (error) {
         if (!error) {
           if (typeof(toastr) !== 'undefined') {
             toastr.success(TAPi18n.__("Role deleted with success"));
           }
         }
       });
       return true;
		 }
		});
    return false;
  },
  "submit form.editMemberForm": function (e) {
    var properties;
    var roles = $(e.target).find("[name=role]");
    var allowedRoles = [];
    e.preventDefault();
    RKCore.log(roles);
    roles.each(function (i) {
      if (roles[i].checked) {
        allowedRoles.push(roles[i].value);
      }
    });
    RKCore.log(allowedRoles);

    properties = {
      memberId: $(e.target).find("[name=memberId]").val(),
      allowedRoles: allowedRoles,
    };
    Meteor.call("memberRolesUpdate", properties, function (error) {
      if (!error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Member updated with success"));
        }
      }
    });
  },
});

Template.rKRoles.helpers({
  myMembers: function () {
		return Members.collection.find().fetch();
	},
  Roles: function () {
    var roles = rKRoles.find({}).fetch();
    RKCore.log("roles :");
    RKCore.log(roles);
    return roles;
  },
  rolesSettings: function () {
    return {
        rowsPerPage: 100,
        showFilter: true,
        class: 'table table-condensed col-sm-12',
        showNavigation: 'auto',
        fields: [
            {
              key: 'roleName',
              label: 'Role name',
            },
            {
              key: '_id',
              label: 'Role Id',
            },
        ],
    };
  },
  cat: function () {
    var cat = Categories.find().fetch();
    var nCat = cat.length;
    var i;
    RKCore.log(this);
    for (i = 0; i < nCat; i++) {
      if (typeof(this.allowedCategories) === 'undefined') {
        cat[i].thisCategoryIsAllowedForThisRole = false;
      }
      else {
        if (this.allowedCategories.indexOf(cat[i]._id) >= 0) {
          cat[i].thisCategoryIsAllowedForThisRole = true;
        }
        else {
          cat[i].thisCategoryIsAllowedForThisRole = false;
        }
      }
    }
    RKCore.log("cat :");
    RKCore.log(cat);
    return cat;
  },
  rolesForThisMember: function () {
    var roles = rKRoles.find({}).fetch();
    var nRoles = roles.length;
    var i;
    RKCore.log(this);
    for (i = 0; i < nRoles; i++) {
      if (typeof(this.catRoles) === 'undefined') {
        roles[i].thisRoleIsAllowedForThisMember = false;
      }
      else {
        if (this.catRoles.indexOf(roles[i]._id) >= 0) {
          roles[i].thisRoleIsAllowedForThisMember = true;
        }
        else {
          roles[i].thisRoleIsAllowedForThisMember = false;
        }
      }
    }
    RKCore.log("roles :");
    RKCore.log(roles);
    return roles;
  },
});
