(function(){Template.docList.helpers({
  categoryName: function () {
    return Categories.findOne({_id: Session.get('selectedCategory')}).name;
  },
  categoryId: function () {
    return Categories.findOne({_id: Session.get('selectedCategory')})._id;
  },
	categorySlugLink: function () {
    var slug = Categories.findOne({ _id: Session.get('selectedCategory') }).slug;
		var url = Router.routes.browse.path({categorySlug: slug});
		return new Spacebars.SafeString(
      "<small>(<a title='" + TAPi18n.__('Direct link to this category')
      + "' href='" + url + "'>" + url + "</a>)</small>"
    );
  },
  docs: function () {
    return Docs.find({categoryId: Session.get('selectedCategory')});
  },
  tableSettings: function () {
    var viewId = Categories.findOne({_id: Session.get('selectedCategory')}).viewId;
    var keys = Views.getFieldInOrder(viewId);
    var view = Views.findOne({_id: viewId});
    var columns = keys.map(function (key) {
      return {
        key: "fields." + key + ".value",
        label: key,
        sortByValue: true,
        hidden: function () {
          return view.fields[key].hideInTable;
        },
        fn: function (value) {
          var content = Meteor.FieldType.transformValue(view.fields[key].type, value);
          var nCharacters = 300;
					if (typeof(content) !== 'undefined') {
	          if (content.length > nCharacters) {
	            content = content.replace(/^(.{nCharacters}[^\s]*).*/, "$1") + " [...]";
	          }
					}
          return content;
        },
      };
    });
    columns.push({
      key: "Edit",
      label: "Action",
      fn: function (value, object) {
        var url = Router.routes.docEdit.path({_id: object._id});
        var filelinkInfo = '';
        var inValidatedFolder = '';
        var userSpaceLinkTitle;
        var userSpaceIcon;
        var editLink;
        if (typeof(object.filelinkFieldName) !== 'undefined') {
          if (object.fields[object.filelinkFieldName].value !== "") {
            if (!object.fields[object.filelinkFieldName].exists) {
              filelinkInfo = " <span class='label label-warning'>" + TAPi18n.__('Broken filelink') + "</span>";
            }
            if (object.fields[object.filelinkFieldName].inValidatedFolder) {
              inValidatedFolder =  " <span class='label label-success'>" + TAPi18n.__('Validated') + "</span>";
            }
          }
        }
        if (userSpaceHasDoc(Meteor.userId(), object._id)) {
          userSpaceLinkTitle = TAPi18n.__('Remove from my space');
          userSpaceIcon = 'glyphicon-star';
        }
        else {
          userSpaceLinkTitle = TAPi18n.__('Add to my space');
          userSpaceIcon = 'glyphicon-star-empty';
        }
        editLink = "<a class='" + Members.getHiddenStatusIfReadOnly() + "' title='" + TAPi18n.__('Edit') + "' href='" + url + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a>";
        return new Spacebars.SafeString(editLink + "<a href='#' data-docId='" + object._id + "' title='" + userSpaceLinkTitle + "' class='updateDocInMySpace'> <span class='glyphicon " + userSpaceIcon + "' aria-hidden='true'></span></a>" + filelinkInfo + inValidatedFolder);
      },
    });
    columns.push({
      key: "revisionNumber",
      label: "Rev",
      fn: function (value, object) {
        if (!value) {
          return '0';
        }
        url = Router.routes.revisions.path({docId: object._id});
        return new Spacebars.SafeString("<a href='" + url + "'>" + value + "</a>");
      },
    });
    return {
      showNavigation: "auto",
      fields: columns,
      showColumnToggles: true,
    };
  },
  hasDocs: function () {
    return Docs.find({
      categoryId: Session.get('selectedCategory'),
    }).count();
  },
  hasSelectedCategory: function () {
    return Session.get('selectedCategory');
  },
});

Template.docList.rendered = function () {
	var categorySlug = Router.current().params.categorySlug;
  if (typeof(categorySlug) !== 'undefined') {
    RKCore.log(categorySlug);
	  Session.set('selectedCategory', Categories.findOne({"slug": categorySlug})._id);
  }
};

Template.docList.events({
  'change #selectedView': function (e) {
    e.preventDefault();
    Session.set('selectedView', $('#selectedView').val());
    return Session.set('selectedCategory', $('#selectedView').val());
  },
  'click a#clear-all': function (e) {
    e.preventDefault();
    Meteor.call("docClearAll", Session.get('selectedCategory'));
    return false;
  },
  "click .updateDocInMySpace": function (e) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace', e.currentTarget.dataset.docid);
		return false;
  },
});

})();
