var decFieldCount, incFieldCount;

incFieldCount = function (field) {
  check(field, Match.Any);
  var view = Views.findOne({
    type: "system"
  });
  if (!view) {
    Views.insert({
      type: "system"
    });
  }
  var obj = {};
  obj["fields." + field] = 1;
  return Views.update({
    type: "system"
  }, {
    $inc: obj
  });
};

decFieldCount = function (field) {
  check(field,Match.Any);
  var view = Views.findOne({
    type: "system"
  });
  if (!view) {
    return;
  }
  var obj = {};
  obj["fields." + field] = -1;
  Views.update(view._id, {
    $inc: obj
  });
  if (view.fields["" + field] <= 1) {
    return Views.update({
      _id: view._id
    }, {
      $unset: obj
    });
  }
};

Meteor.methods({
  docDelete: function (docId) {
    check(docId,String);
    var doc, key, user;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to delete this doc");
    }
    if (!user || !Roles.userIsInRole(user,['admin'])) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Access denied. Only admin can do this.");
      }
      throw new Meteor.Error(403, "Access denied. Only admin can do this.")
    }

    doc = Docs.findOne({
      _id: docId
    });
    Docs.remove({
      _id: docId
    });
    for (key in doc.fields) {
      decFieldCount(key);
    }
  },
  deleteAllDocsInACategory: function (categoryId) {
    check(categoryId,String);
    if (!Meteor.user()) {
      throw new Meteor.Error(401, "You need to login to delete this doc");
    }
    Docs.remove({
      categoryId: categoryId
    });
  },
  docUpdate: function (att) {
    check(att, Match.Any);
    var doc, docId, fields, full, key, now, obj, ref, ref1, user, value;
    if (Meteor.isClient) {
      user = Meteor.user();
      if (!user) {
        throw new Meteor.Error(401, "You need to login to update a doc");
      }
    }
    if (!att.fields) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the fields");
      }
      throw new Meteor.Error(422, "Please fill in with the fields");
    }
    if (!att.categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please select a category");
      }
      throw new Meteor.Error(422, "Please select a category");
    }
    fields = Views.findOne({
      _id: Categories.findOne({
        _id: att.categoryId
      }).viewId
    }).fields;
    for (key in fields) {
      if (fields[key].mandatory) {
        if (!att.fields[key]) {
          if (typeof(toastr) !== 'undefined') {
      			toastr.error("Missing mandatory field " + key);
      		}
          throw new Meteor.Error(422, "Missing mandatory field " + key);
        }
      }
    }
    now = new Date();
    if (att.docId) {
      obj = {
        categoryId : att.categoryId,
        searchScore : att.searchScore,
        usefulForRoles : att.usefulForRoles,
        modifiedAt : now,
        docId : docId
      };
      ref = att.fields;
      for (key in ref) {
        value = ref[key];
        obj["fields." + key + ".value"] = value;
      }
      Docs.update({
        _id: att.docId
      }, {
        $set: obj
      });

      doc = Docs.findOne({
        _id: att.docId
      });
      full = "";
      for (key in doc.fields) {
        full = full.concat(doc.fields[key].value).concat(" ");
      }
      Docs.update({
        _id: att.docId
      }, {
        $set: {
          full: full
        }
      });
      Docs.update({
        _id: att.docId
      }, {
        $inc: {
          revisionNumber: 1
        }
      });
      att.docId;
      return att.docId;
    } else {
      obj = {
        categoryId : att.categoryId,
        searchScore : att.searchScore,
        usefulForRoles : att.usefulForRoles,
        createdAt : now,
        modifiedAt : now,
        fields : {},
        revisionNumber : 0
      };
      full = "";
      ref1 = att.fields;
      for (key in ref1) {
        value = ref1[key];
        obj.fields["" + key] = {};
        obj.fields["" + key].value = value;
        full = full.concat(value).concat(" ");
      }
      obj.full = full;
      if (Meteor.isClient) {
        obj.orgId = user.profile.orgId;
      }
      if (Meteor.isServer) {
        obj.orgId = "serverOrgId";
      }
      docId = Docs.insert(obj);
      return docId;
    }
  }
});
