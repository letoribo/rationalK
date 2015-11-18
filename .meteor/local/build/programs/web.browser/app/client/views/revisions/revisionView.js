(function(){var userSpaceHasDoc;

userSpaceHasDoc = function (userId, docId) {
  return userSpaces.find({
    docId: docId,
    userId: userId
  }).count() > 0;
};

Template.revisionView.helpers({
  tags: function () {
    return PredefinedTags.find();
  },
  userSpaceLinkTitle: function () {
    if (userSpaceHasDoc(Meteor.userId(), this.docId)) {
      return 'Remove doc from my space';
    } else {
      return 'Add doc to my space';
    }
  },
  userSpaceIcon: function () {
    if (userSpaceHasDoc(Meteor.userId(), this.docId)) {
      return 'glyphicon-star';
    } else {
      return 'glyphicon-star-empty';
    }
  },
  fieldIs: function (field) {
    return this.type === field;
  },
  attachments: function () {
    return Attachments.find();
  },
  categories: function () {
    return Categories.find();
  },
  dataForKey: function () {
    var data, ref, ref1, ref2, value;
    value = (ref = Template.parentData(1)) != null ? (ref1 = ref.fields) != null ? (ref2 = ref1[this.key]) != null ? ref2.value : void 0 : void 0 : void 0;
    if (!value) {
      //value = previousFields[this.key];
      value = "";
    }
    if (!value) {
      value = Meteor.FieldType.getDefaultValue(this.key, this.type);
    }
    data = {
      key: this.key,
      value: {
        value: value,
        type: this.type,
        mandatory: this.mandatory
      }
    };
    return data;
  },
  viewFields: function () {
    var categoryId, fields, keys, ref, view, viewId;
    categoryId = this.categoryId;
    viewId = (ref = Categories.findOne({
      _id: categoryId
    })) != null ? ref.viewId : void 0;
    if (viewId) {
      keys = Views.getFieldInOrder(viewId);
      view = Views.findOne({
        _id: viewId
      });
      fields = view.fields;
      return keys.map(function (key) {
        return {
          key: key,
          _id: key,
          type: fields[key].type,
          mandatory: fields[key].mandatory
        };
      });
    }
  }
});

Template.revisionView.rendered = function () {
  $("form.main input").prop("disabled", true);
  $("form.main textarea").prop("disabled", true);
  return $("form.main a.deleteField").hide();
};

Template.revisionView.events({
  "click .updateDocInMySpace": function (e) {
    e.preventDefault();
    Meteor.call('updateDocInMySpace', this.docId);
    return false;
  }
});

})();
