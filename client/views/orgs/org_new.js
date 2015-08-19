Template.orgNew.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      email: $(e.target).find("[name=email]").val(),
      location: $(e.target).find("[name=location]").val(),
      subdomain: $(e.target).find("[name=subdomain]").val()
    };
    Meteor.call("orgNew", properties, function (error, id) {
      if (error) {
        // popup ?
      } else {
        Router.go("orgs");
      }
    });
  }
});
