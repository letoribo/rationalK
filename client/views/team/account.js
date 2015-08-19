Template.account.helpers({
  email: function () {
    return this.emails[0].address;
  },
  isMe: function () {
    var ref;
    return ((ref = Meteor.user()) != null ? ref._id : void 0) === this._id;
  },
  emailStatus: function () {
    if (this.emails[0].verified) {
      return '<span class="label label-success">verified</span>';
    } else {
      return '<span class="label label-danger">unverified</span>';
    }
  }
});
