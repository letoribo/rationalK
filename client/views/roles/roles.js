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
});

Template.rKRoles.helpers({
  Roles: function () {
    return rKRoles.find({}).fetch();
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
        if (this.allowedCategories.indexOf(Roles[i]._id) >= 0) {
          cat[i].thisCategoryIsAllowedForThisRole = true;
        }
        else {
          cat[i].thisCategoryIsAllowedForThisRole = false;
        }
      }
    }
    return cat;
  },
});
