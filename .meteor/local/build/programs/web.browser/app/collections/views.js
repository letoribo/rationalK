(function(){var indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Meteor.methods({
  viewDelete: function (viewId) {
	  // method to delete a view through its _id
	  // viewId: _id of the view to delete
    var user, view;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to delete this view");
    }
    view = Views.findOne({
      _id: viewId
    });
    Views.remove({
      _id: viewId
    });
  },
  deleteViewByCategoryId: function (categoryId) {
    var user, view, viewId;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to delete this view");
    }
    viewId = Categories.findOne({
      _id: categoryId
    }).viewId;
    view = Views.remove({
      _id: viewId
    });
  },
  viewNew: function (att) {
	  // method to create a new view
	  // a user must be logged in
	  //  att:
	  //   name: name of the view
	  //   attributes: attributes of the view
    var orgId, user, viewId;
    if (Meteor.isClient) {
      user = Meteor.user();
      if (!user) {
        throw new Meteor.Error(401, "You need to login to add new member");
      }
      orgId = user.profile.orgId;
    }
    if (Meteor.isServer) {
      orgId = "serverOrgId";
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    viewId = Views.insert({
      orgId: orgId,
      name: att.name,
      attributes: att.attributes
    });
    Meteor.history("added view " + att.name);
    return viewId;
  },
  viewUpdate: function (att) {
    var user, view;
    if (Meteor.isClient) {
      user = Meteor.user();
      if (!user) {
        throw new Meteor.Error(401, "You need to login to update a view");
      }
    }
    if (!att.viewId) {
      throw new Meteor.Error(422, "Please fill in with the viewId");
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    Views.update({
      _id: att.viewId
    }, {
      $set: {
        name: att.name,
        attributes: att.attributes
      }
    });
    return view = Views.findOne({
      _id: att.viewId
    });
  },
  viewUpdateOrder: function (viewId, order) {
    check(viewId,String)
    check(order,Match.Any)
	  // method to set the order of the attributes
	  // a user must be logged in
	  //  viewId: _id of the view to update
	  //  order: array with the name of the attributes
    var user;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to update a view");
    }
    if (!viewId) {
      throw new Meteor.Error(422, "Please fill in with the viewId");
    }
    if (!order) {
      throw new Meteor.Error(422, "Please fill in with the order");
    }
    Views.update({
      _id: viewId
    }, {
      $set: {
        order: order
      }
    });
    if (typeof(toastr) !== 'undefined') {
			toastr.success('Order succesfully saved');
		}
    return viewId;
  },
  viewAddField: function (att) {
	   // method to add a new field to a view
  // a user must be logged in
  //  att:
  //   viewId: _id of the view to update
  //   newField: name of the new field
  //   newFieldType: type of the new field
  //   mandatory: true if the new field is mandatory
  //   unique: true if the new field value should be unique
  //   hideInSearchResultsDisplay: true if this field should be hidden by default in the search results page
  //   hideInTable: true if the new field value should be hidden by default in the browse table
  //
  // the new field appears last in the order array
  check(att, {
    viewId : String,
    newField: String,
    newFieldType: String,
    mandatory: Boolean,
    unique: Match.Optional(Boolean),
    hideInSearchResultsDisplay: Match.Optional(Boolean),
    hideInTable: Match.Optional(Boolean)
  })


    var obj, ref, user, view;
    if (Meteor.isClient) {
      user = Meteor.user();
      if (!user) {
        throw new Meteor.Error(401, "You need to login to update a view");
      }
    }
    if (!att.viewId) {
      throw new Meteor.Error(422, "Please fill in with the viewId");
    }
    if (!att.newField) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error(TAPi18n.__("Please fill in with a field title"));
      }
      throw new Meteor.Error(422, "Please fill in with a field");
    }
    if (!att.newFieldType) {
      throw new Meteor.Error(422, "Please fill in with a field type");
    }
    view = Views.findOne({
      _id: att.viewId
    });
    if (!view) {
      return;
    }
    if ((ref = view.fields) != null ? ref[att.newField] : void 0) {
      return;
    }
    obj = {};
    obj["fields." + att.newField + ".type"] = att.newFieldType;
    obj["fields." + att.newField + ".mandatory"] = att.mandatory;
    obj["fields." + att.newField + ".unique"] = att.unique;
    obj["fields." + att.newField + ".hideInSearchResultsDisplay"] = att.hideInSearchResultsDisplay;
    obj["fields." + att.newField + ".hideInTable"] = att.hideInTable;
    Views.update({
      _id: att.viewId
    }, {
      $addToSet: {
        keys: att.newField,
        order: att.newField
      }
    });
    return Views.update({
      _id: att.viewId
    }, {
      $set: obj
    });
  },
  viewUpdateField: function (viewId, field, newField, newFieldType, mandatory, unique, hideInTable, hideInSearchResultsDisplay, multipleChoices) {

	    // method to update an existing field of a view
  // a user must be logged in
  //   viewId: _id of the view to update
  //   field: name of an existing field
  //   newField: new name for the existing field (newField can be equals to field if no rename is necessary)
  //   newFieldType: type to apply to newField
  //   mandatory: true if newField is mandatory
  //   unique : true if newField should be unique
  //   hideInSearchResultsDisplay : true if newField should be hidden in search result page by default
  //   hideInTable : true if newField should be hidden in Table by default
  // the order is not changed if the field is not renamed
  // WARNING: Renaming the field of the view DOES NOT rename of the field of ANY DOCUMENT.
  check(viewId, String);
  check(field,String);
  check(newField, String);
  check(newFieldType, String);
  check(mandatory, Boolean);
  check(unique, Boolean);
  check(hideInTable, Boolean);
  check(hideInSearchResultsDisplay, Boolean);
  check(multipleChoices,String);



    var obj, user, view;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to update a view");
    }
    if (!viewId) {
      throw new Meteor.Error(422, "Please fill in with the viewId");
    }
    if (!newField) {
      throw new Meteor.Error(422, "Please fill in with a field");
    }
    if (!newFieldType) {
      throw new Meteor.Error(422, "Please fill in with a field type");
    }
    view = Views.findOne({
      _id: viewId
    });
    if (!(view && view.fields)) {
      return;
    }
    if (!view.fields[field]) {
      console.log(field + " field does not exists");
      return;
    }
    if (field !== newField) {
      Meteor.call('viewRemoveField', viewId, field);
      return Meteor.call('viewAddField', {
        viewId: viewId,
        newField: newField,
        newFieldType: newFieldType,
        mandatory: mandatory,
        unique: unique,
        hideInSearchResultsDisplay: hideInSearchResultsDisplay,
        hideInTable: hideInTable //do not add here multiple choices, only on edit
      });
    } else {
      obj = {};
      obj["fields." + newField + ".type"] = newFieldType;
      obj["fields." + newField + ".mandatory"] = mandatory;
      obj["fields." + newField + ".unique"] = unique;
      obj["fields." + newField + ".hideInSearchResultsDisplay"] = hideInSearchResultsDisplay;
      obj["fields." + newField + ".hideInTable"] = hideInTable;
      obj["fields." + newField + ".multipleChoices"] = multipleChoices;
      return Views.update({
        _id: viewId
      }, {
        $set: obj
      });
    }
  },
  viewRemoveField: function (viewId, field) {

	    // method to remove a field from an existing view
  // a user must be logged in
  //   viewId: _id of the view to update
  //   field: name of an existing field
  // the field remained in the order array (but it will not be displayed by the view)
  // it will automatically be removed when a new order is set by the user


    var doc, obj, user;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to update a view");
    }
    if (!viewId) {
      throw new Meteor.Error(422, "Please fill in with the viewId");
    }
    if (!field) {
      throw new Meteor.Error(422, "Please fill in with a field");
    }
    obj = {};
    obj["fields." + field] = 0;
    doc = Views.findOne(viewId);
    Views.update({
      _id: viewId
    }, {
      $pull: {
        keys: field
      }
    });
    return Views.update({
      _id: viewId
    }, {
      $unset: obj
    });
  }
});

Views.getFieldInOrder = function (viewId) {
	// Get the order in which to display the views
//
// 1. Get the existing order in the view
// 2. Add exiting fields that were not specified in the order array
// 3. Removed fields that have been deleted


  var existing, i, j, key, len, len1, order, ref, results, view;
  view = Views.findOne({
    _id: viewId
  });
  if (!view) {
    console.log("Wrong call to viewId with " + viewId);
    return;
  }
  results = [];
  existing = [];
  if (view != null ? view.fields : void 0) {
    existing = Object.keys(view.fields);
  }
  order = (ref = view.order) != null ? ref : [];
  for (i = 0, len = order.length; i < len; i++) {
    key = order[i];
    if (indexOf.call(existing, key) >= 0) {
      results.push(key);
    }
  }
  for (j = 0, len1 = existing.length; j < len1; j++) {
    key = existing[j];
    if (indexOf.call(order, key) < 0) {
      results.push(key);
    }
  }
  return results;
};

})();
