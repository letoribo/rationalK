Template.roles.rendered = function () {
  $('#roles').multiSelect({
    selectableHeader: "<div class='custom-header'>Selectable items</div>",
    selectionHeader: "<div class='custom-header'>Selection items</div>",
  });
};

Template.roles.helpers({
  roles: function () {
    var role;
    var arrayLength;
    var Roles = [
      {
        name: "admin",
      },
      {
        name: "readonly",
      },
      {
        name: "approver",
      },
    ];
    var rolesSettings = rkSettings.findOne({
      key: "Roles",
    },
    {
      fields: {
        'value': 1,
      },
    });
    if (typeof  rolesSettings !== 'undefined') {
      rolesSettingsVal = rolesSettings.value;
      arrayLength = rolesSettingsVal.length;
      for (i = 0; i < arrayLength; i++) {
        role = {};
        Roles.push(rolesSettingsVal[i]);
      }
    }
    console.log(Roles);
    return Roles;
  },
});

Template.roles.events({
  'click #select-all': function () {
    return $('#roles').multiSelect('select_all');
  },
  'click #select-none': function () {
    return $('#roles').multiSelect('deselect_all');
  },
});
