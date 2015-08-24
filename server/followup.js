if (Meteor.isServer) {
  Meteor.methods({
    createFollowUp: function (data) {
      check(data, {
          text: String,
          tags: String,
        }
      );
      FollowUp.insert({
        createdAt: new Date(),
  			who: Meteor.userId(),
  			tags: data.tags,
  			text: data.text,
  		});
      return true;
    },
  }); //end of server methods
}// end of if Server
