(function(){var addDocumentToRevisions = function (userId, doc) {
    //TODO we should save the attachments and the tags associated with the document (Tags should be done automatically because it is a field)
    // but attachments are not treated as a regulard field, but a custom field

    if (Meteor.isServer) {
        user = Meteor.users.findOne({_id: userId});
		    member = Members.collection.findOne({accountId: userId});
        if (typeof(user) === 'undefined') {
            var who={}
            who.name = 'Administrateur';
			      who.nickname = 'admin';
            who.accountId = userId;
            who.memberId = member._id;
        }
        else {
            var who = member.profile;
            who.memberId = member._id;
            who.accountId = member.accountId;
        }
        if (Revisions.find({docId: doc._id, revisionNumber: doc.revisionNumber}).count() == 0) {
            Revisions.insert({
                    docId: doc._id,
                    categoryId: doc.categoryId,
                    fields: doc.fields,
                    full: doc.full,
                    revisionNumber: doc.revisionNumber,
                    who: who,
                    when: new Date()
                }
            );
        } else {
            //console.log('Je rajoute pas de revision');
        }
    }
};

// Hooks :

Docs.after.insert(function (userId, doc) {
  var data = {}
  data.doc = doc
  data.previous = this.previous
  var historyType = "docCreation"
  //console.log(doc)
  // doc.categoryId
  Meteor.history(doc.full,data,historyType,doc._id);
  addDocumentToRevisions(userId, doc);
});

Docs.after.update(function (userId, doc, fieldNames, modifier, options) {
  addDocumentToRevisions(userId, doc);
});

Revisions.after.insert(function (userId, doc) {
  // only for revisionNumber > 0
  if (doc.revisionNumber>0){
    var data = {}
    data.doc = doc
    data.previous = this.previous
    var historyType = "docRevision"
    //  doc.categoryId +
    // Revision id :  doc._id
    Meteor.history(doc.full,data,historyType,doc.docId);
  }
});

})();
