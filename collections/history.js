Meteor.history = function (txt,data,type,docId) {
  check(txt,String);
  check(data,Match.Any);
  check(type,Match.Optional(String));
  check(docId,Match.Optional(String));
  var historyId, obj, orgId, user, userId, who;
  //type can be docCreation, docRevision, ...
  // use this if you know that a truthy value comparison will be enough
  if (data) {
      // data was passed and has truthy value
  } else {
      // data was not passed or has falsy value
      var data={};
  }
  if (type) {
      // data was passed and has truthy value
  } else {
      // data was not passed or has falsy value
      var type={};
  }
  if (docId) {
      // data was passed and has truthy value
  } else {
      // data was not passed or has falsy value
      var docId={};
  }


  user = Meteor.user();
  if (user) {
    who = user != null ? user.profile.name : void 0;
    orgId = user != null ? user.profile.orgId : void 0;
    userId = user != null ? user._id : void 0;
  } else {
    who = 'cron';
    orgId = 'cron';
    userId = Meteor.users.findOne({
      username: 'cron'
    })._id;
  }
  obj = {
    what: txt,
    createdAt : new Date(),
    who : who,
    userId : userId,
    orgId : orgId,
    data : data,
    type : type,
    docId : docId
  };
  return historyId = History.insert(obj);
};
