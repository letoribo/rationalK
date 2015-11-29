Template.rolesNew.events({
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
});

Template.rolesList.helpers({
  Roles: function () {
    return rKRoles.find({});
  },
  rolesSettings: function () {
    return {
        rowsPerPage: 100,
        showFilter: true,
        class: 'table table-condensed col-sm-12',
        showNavigation: 'auto',
        fields: [
            {
              key : 'roleName',
              label: 'Role name',
            },
        ],
    }
  },
});
