filterByOrg = function (meteor, collection, userId, strict) {
  var user;
  if (userId) {
    user = Meteor.users.findOne(userId);
    return collection.find({
      orgId: user.profile.orgId
    });
  }
  else if (!strict) {
    return collection.find();
  }
  else {
    return meteor.ready();
  }
};

Meteor.publish("followup", function () {
  return FollowUp.find();
});

Meteor.publish("accounts", function () {
  return Meteor.users.find({}, {
    fields: {
      username: 1,
      profile: 1,
      emails: 1,
      roles: 1,
    }
  });
});

Meteor.publish("tags", function () {
  return Tags.find();
});

Meteor.publish("XMLFiles", function () {
  return XMLFiles.find();
});

Meteor.publish("external", function (externalDocId) {
  check(externalDocId, String);
  return External.find(
    {
      'externalDocId': externalDocId,
    },
    {
      fields: {
        'externalDocId': 0,
        'full': 0,
      },
    });
});


Meteor.publish("controlplan", function () {
  return controlPlan.find();
});

Meteor.publish("filelinks", function () {
  return Filelinks.find();
});

Meteor.publish("messages", function () {
  return Messages.find();
});

Meteor.publish("processes", function () {
  return Processes.find();
});

Meteor.publish("process", function (processId) {
  check(processId, String);
  return Processes.find({
    _id: processId,
  });
});

Meteor.publish("processdocuments", function () {
  return ProcessDocuments.find();
});

Meteor.publish(null, function () {
  return Meteor.roles.find({});
});

Meteor.publish("orgs", function () {
  return Orgs.find({
    userId: this.userId,
  });
});

Meteor.publish("currentOrg", function () {
  return Orgs.find();
});

Meteor.publish("searchqueries", function () {
  return SearchQueries.find();
});

Meteor.publish("myCurrentSearchQuery", function () {
  return SearchQueries.find(
    {who: this.userId},
    {
      fields: {numberOfSearchResults: 1},
      sort: { searchDate: -1 },
      limit: 1,
    }
  );
});

Meteor.publish('cse', function (query) {
  var self = this;
  var response;
  var thumb;
  var doc;
  check(query, String);
  if (typeof Meteor.settings.cse !== 'undefined') {
  if (query) {
    try {
      response = Meteor.http.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: query,
          cx: Meteor.settings.cse.cx,
          key: Meteor.settings.cse.key,
        },
      });
      _.each(response.data.items, function (item) {
        if (typeof item.pagemap.cse_thumbnail !== 'undefined') {
          thumb = item.pagemap.cse_thumbnail[0].src;
        }
        else {
          thumb = "/images/noimgavailable.png";
        }
        doc = {
          thumb: thumb,
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        };

        self.added('websearchresults', Random.id(), doc);
      });
      self.ready();
    }
    catch(error) {
      console.log(error);
    }
  }
  else {
    self.ready();
  }
  }
  else {
    console.log("You need to defined cse in your setting file settings.json");
  }
});

Meteor.publish("dates", function () {
  return Dates.find();
});

Meteor.publish("history", function () {
  var user;
  if (this.userId) {
    user = Meteor.users.findOne(this.userId);
    return History.find({
    }, {
      sort: {
        createdAt: -1
      },
      limit: 100
    });
  } else {
    return this.ready();
  }
});

Meteor.publish("views", function (data) {
  check(data, Match.Optional(
    {
      viewId: Match.Optional(String),
      categoryId: Match.Optional(String),
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Views.find();
  }
  else {
    if (typeof data.viewId !== 'undefined') {
      return Views.find({_id: data.viewId});
    }
    else if (typeof data.categoryId !== 'undefined') {
      viewId = Categories.findOne({_id: data.categoryId}).viewId;
      return Views.find({_id: viewId});
    }
    else if (typeof data.revisionId !== 'undefined') {
      categoryId = Revisions.findOne({_id: data.revisionId}).categoryId;
      viewId = Categories.findOne({_id: categoryId}).viewId;
      return Views.find({_id: viewId});
    }
  }
});

Meteor.publish("docs", function (data) {
  check(data, Match.Optional(
    {
      // Optional, but if present must be a string.
      revisionId: Match.Optional(String),
      docId: Match.Optional(String),
      role: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Docs.find();
  }
  else {
    if (typeof data.docId !== 'undefined') {
      return Docs.find({_id: data.docId});
    }
    else if (typeof data.revisionId !== 'undefined') {
      docId = Revisions.findOne({_id: data.revisionId}).docId;
      return Docs.find({_id: docId});
    }
    else if (typeof data.role !== 'undefined') {
      // data.role should contains the slug
      return Docs.find({usefulForRoles: data.role});
    }
  }
});

Meteor.publish("categories", function (data) {
  check(data, Match.Optional(
    {
      // Optional, but if present must be a string.
      categoryId: Match.Optional(String),
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Categories.find();
  }
  else {
    if (typeof data.categoryId !== 'undefined'){
      return Categories.find({_id: data.categoryId});
    }
    else if (typeof data.revisionId !== 'undefined'){
      categoryId = Revisions.findOne({_id:data.revisionId}).categoryId;
      return Categories.find({_id: categoryId});
    }
  }
});

Meteor.publish("gantts", function (id) {
  check(id, Match.Optional(String));
  if (typeof id === 'undefined') {
    return Gantts.find();
  }
  else {
    return Gantts.find({_id: id});
  }
});

Meteor.publish("predefinedtags", function () {
  return PredefinedTags.find();
});

Meteor.publish("rkSettings", function () {
  return rkSettings.find();
});
Meteor.publish("rkStatus", function () {
  return rkStatus.find();
});


Meteor.publish("folderstoscan", function () {
  return FoldersToScan.find();
});

Meteor.publish("tempwalkedfiles", function () {
  return TempWalkedFiles.find();
});

Meteor.publish("walkedfiles", function () {
  return WalkedFiles.find();
});

Meteor.publish("mySpace", function () {
  return userSpaces.find({userId: this.userId});
});

Meteor.publish("myNotes", function () {
  return Notes.find({userId: this.userId});
});


Meteor.publish("synonyms", function () {
  return Synonyms.find();
});

Meteor.publish("discussions", function () {
  return Discussions.find();
});

Meteor.publish("discussion", function (discussionId) {
  check(discussionId, String)
  return Discussions.find({
    _id: discussionId
  });
});

Meteor.publish("docHistory", function (docId) {
  check(docId, String);
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    var docHistory =  History.find({
      $and: [
        { orgId : user.profile.orgId},
        { docId : docId }
        ]
      },
      {
      sort: {
          createdAt: -1
      }
    });
    return docHistory;
  } else {
    return this.ready();
  }
});


Meteor.publish("messagesinthisdiscussion", function (discussionId) {
  check(discussionId, String)
  return Messages.find({
    discussionId: discussionId
  });
});

Meteor.publish("revisions", function (data) {
  check(data, Match.Optional(
    {
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined'){
    return Revisions.find();
  }
  else {
    if (typeof data.revisionId !== 'undefined'){
      return Revisions.find({_id: data.revisionId});
    }
  }
});

Meteor.publish("doc-revisions", function (docId) {
  check(docId,String)
  return Revisions.find({
    docId: docId
  }, {
    sort: {
      revisionNumber: 1
    }
  });
});

Meteor.publish("singleton", function (name) {
  check(name,String)
  return Singletons.find({
    name: name
  });
});

Meteor.publish("attachments", function (docId) {
  check(docId, String);
  return Attachments.find({
    "metadata.document": docId
  });
});
