Template.roles.rendered = function () {
  $('#roles').multiSelect({
    selectableHeader: "<div class='custom-header'>Selectable items</div>",
    selectionHeader: "<div class='custom-header'>Selection items</div>",
  });
};

Template.roles.helpers({
  roles: function () {
    return [
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
