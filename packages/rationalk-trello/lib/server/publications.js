Meteor.publish("trello", function () {
  return Trello.find();
});
