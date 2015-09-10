if (Meteor.settings.public.show.trello) {
  Router.route("/trello", {
    name: "trello",
    waitOn: function () {
      return [
        Meteor.subscribe("trello"),
        Meteor.subscribe("members"),
        Meteor.subscribe("rkSettings"),
      ];
    },
  });
}
