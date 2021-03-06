var saveOrder;

Template.viewEdit.events({
  "submit form#viewEdit": function (e) {
    var properties;
    properties = {
      name: $(e.target).find("[name=name]").val(),
      viewId: this._id,
    };
    return Meteor.call("viewUpdate", properties, function (error) {
      if (!error) {
        Router.go("viewList");
      }
    });
  },
  "click #viewDelete": function (e) {
    e.preventDefault();
    bootbox.confirm(TAPi18n.__("Are you sure you want to delete this view ?"), function (result) {
		 if (result) {
       Meteor.call("viewDelete", this._id, function (error) {
         if (!error) {
           return Router.go("viewList");
         }
       });
		 }
		});
    return false;
  },
});

saveOrder = function (viewId) {
  var order;
  order = [];
  $("input#newField[name=field]").each(function (index, el) {
    return order.push($(el).val());
  });
  return Meteor.call("viewUpdateOrder", viewId, order, function () {});
};

Template.viewEdit.rendered = function () {
  var viewId;
  viewId = this.data._id;
  return this.$("ul#fields").sortable({
    stop: function () {
      saveOrder(viewId);
    },
  });
};

Template.viewEdit.helpers({
  fieldKeys: function () {
    var keys;
    var me;
    me = this;
    keys = Views.getFieldInOrder(this._id);
    return keys.map(function (key) {
      return {
        key: key,
        _id: key,
        value: me.fields[key],
      };
    });
  },
});
