Meteor.history = function (txt, data, type, docId) {
  var historyId;
  var obj;
  var orgId;
  var user;
  var userId;
  var who;
  check(txt, String);
  check(data, Match.Any);
  check(type, Match.Optional(String));
  check(docId, Match.Optional(String));
  //type can be docCreation, docRevision, ...
  // use this if you know that a truthy value comparison will be enough
  if (data) {
      // data was passed and has truthy value
  }
  else {
      // data was not passed or has falsy value
      data = {};
  }
  if (type) {
      // data was passed and has truthy value
  }
  else {
      // data was not passed or has falsy value
      type = {};
  }
  if (docId) {
      // data was passed and has truthy value
  } else {
      // data was not passed or has falsy value
      docId = {};
  }

  user = Meteor.user();
  if (user) {
    who = user !== null ? user.profile.name : void 0;
    orgId = user !== null ? user.profile.orgId : void 0;
    userId = user !== null ? user._id : void 0;
  }
  else {
    who = 'cron';
    orgId = 'cron';
    userId = Meteor.users.findOne({
      username: 'cron',
    })._id;
  }
  obj = {
    what: txt,
    createdAt: new Date(),
    who: who,
    userId: userId,
    orgId: orgId,
    data: data,
    type: type,
    docId: docId,
  };
  historyId = History.insert(obj);

  nEntries = History.find({}).count();
  RKCore.log("nEntries in History : " + nEntries);
  maxHistoryEntries = 300;
  /*
  while (nEntries > maxHistoryEntries) {
    RKCore.log("History db has exceed the number of entries. Let's remove the oldest entries");
    oldestEntry = History.findOne({}, {sort: {createdAt: 1}})._id;
    History.remove(oldestEntry);
    nEntries = History.find({}).count();
  }
  */

  return true;
};
