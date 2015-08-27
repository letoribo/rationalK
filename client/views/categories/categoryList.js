Template.categoryList.helpers({
  categories: function () {
    return Categories.find().fetch();
  },
  settingsCategories: function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            class: 'table table-condensed col-sm-12',
						showNavigation: 'auto',
						fields: [
              {
                key: 'name',
                label: TAPi18n.__("Name")},
						    {
						        key: 'actions',
						        label: 'Actions',
						        fn: function (value, object) {
                      var urlBrowse = Router.routes.browse.path({categorySlug : object.slug});
                      var urlCategoryEdit = Router.routes.categoryEdit.path({_id : object._id});
                      return new Spacebars.SafeString('<a href="'+ urlCategoryEdit +'" title="Edit this category"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a class="select" href="'+ urlBrowse +'" title="Browse file in this category"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a> <a class="delete" href="#" title="Delete this category, the associated view and the associated docs"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>');
							    }
						    }
						]
		}
  }
});

Template.categoryList.events({
  "click a.delete": function (e) {
    e.preventDefault();
    if (confirm("Are you sure that you want to delete this category and the associated documents ?")) {
      Meteor.call('deleteViewByCategoryId', this._id);
      Meteor.call('categoryDelete', this._id);
      Meteor.call('deleteAllDocsInACategory', this._id);
      Meteor.call('deleteAllRevisionsInACategory', this._id);
      Meteor.call('deleteAllDocFromUserSpaceByCategory', this._id);
      delete Session.keys['selectedCategory'];
      return false;
    }
  }
});
