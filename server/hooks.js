var addDocumentToRevisions = function (userId, doc) {
  var who;
    //todo we should save the attachments and the tags associated with the document (Tags should be done automatically because it is a field)
    // but attachments are not treated as a regulard field, but a custom field
    if (Meteor.isServer) {
        user = Meteor.users.findOne({_id: userId});
		    member = Members.collection.findOne({accountId: userId});
        if (typeof(user) === 'undefined') {
            who = {};
            who.name = 'Administrateur';
			      who.nickname = 'admin';
            who.accountId = userId;
            who.memberId = member._id;
        }
        else {
            who = member.profile;
            who.memberId = member._id;
            who.accountId = member.accountId;
        }
        if (Revisions.find({docId: doc._id, revisionNumber: doc.revisionNumber}).count() === 0) {
            Revisions.insert({
                    docId: doc._id,
                    categoryId: doc.categoryId,
                    fields: doc.fields,
                    full: doc.full,
                    revisionNumber: doc.revisionNumber,
                    who: who,
                    when: new Date(),
                }
            );
        }
    }
};

// Hooks :
Docs.after.insert(function (userId, doc) {
  var data = {};
  var historyType = "docCreation";
  data.doc = doc;
  data.previous = this.previous;
  Meteor.history(doc.full, data, historyType, doc._id);
  addDocumentToRevisions(userId, doc);
});

Docs.after.update(function (userId, doc) {
  addDocumentToRevisions(userId, doc);
});

Revisions.after.insert(function (userId, doc) {
  var data = {};
  var historyType = "docRevision";
  if (doc.revisionNumber > 0) {
    data.doc = doc;
    data.previous = this.previous;
    Meteor.history(doc.full, data, historyType, doc.docId);
  }
});
