(function(){Template.viewNew.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      attributes: $('select#attributes').val()
    };
    Meteor.call("viewNew", properties, function (error, id) {
      if (error) {
        // popup ?
      } else {
        Router.go("viewList");
      }
    });
  }
});

})();
