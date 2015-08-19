Template.orgs.helpers({
  orgs: function () {
    return Orgs.find();
  }
});

Template.org.events({
  "click .delete": function (e) {
    e.preventDefault();
    if (confirm("Delete this org " + this.name + "?")) {
      return Meteor.call("orgDelete", this._id, function (error, id) {
        if (error) {
          // do nothing (a popup should appear)
        }
      });
    }
    return false;
  }
});
