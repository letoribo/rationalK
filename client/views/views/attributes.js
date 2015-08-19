Template.attributes.helpers({
  attributes: function () {
    return Object.keys(Views.findOne({
      type: "system"
    }).fields);
  }
});

Template.attributes.events({
  'click #select-all': function () {
    return $('#attributes').multiSelect('select_all');
  },
  'click #select-none': function () {
    return $('#attributes').multiSelect('deselect_all');
  }
});
