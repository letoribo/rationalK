(function(){Template.accountNew.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      email: $(e.target).find("[name=email]").val(),
      nickname: $(e.target).find("[name=nickname]").val(),
      roles: $('select#roles').val(),
      hostname: window.location.hostname
    };
    Meteor.call("accountNew", properties, function (error, id) {
      if (error) {
        // popup ?
      } else {
        Router.go("accountList");
      }
    });
  }
});

})();
