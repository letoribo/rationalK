(function(){Template.viewList.helpers({
  views: function () {
    return Views.find({
      type: {
        $not: "system"
      }
    });
  }
});

Template.view.helpers({
  keysInOrder: function () {
    return Views.getFieldInOrder(this._id);
  }
});

})();
