(function(){Template.accountEdit.events({
  "submit form": function (e) {
    var properties;
    e.preventDefault();
    properties = {
      name: $(e.target).find("[name=name]").val(),
      accountId: this._id,
      nickname: $(e.target).find("[name=nickname]").val(),
      roles: $('select#roles').val()
    };
    return Meteor.call("accountUpdate", properties, function (error, id) {
      if (error) {
        // popup ?
      } else {
        Router.go("accountList");
      }
    });
  },
  "click .delete": function (e) {
    e.preventDefault();
    if (confirm("Delete this account?")) {
      Meteor.call("accountDelete", this._id, function (error, id) {
        if (error) {
          // popup ?
        } else {
          return Router.go("accountList");
        }
      });
      return false;
    }
    return false;
  }
});

Template.accountEdit.helpers({
  email: function () {
    return this.emails[0].address;
  },
  isMe: function () {
    var ref;
    return ((ref = Meteor.user()) != null ? ref._id : void 0) === this._id;
  }
});

Template.accountEdit.rendered = function () {
  return $('#roles').multiSelect('select', Meteor.users.findOne({
    _id: this.data._id
  }).roles);
};

})();
