(function(){Template.listDocsForRoles.helpers({
  roleSlug: function () {
    return Router.current().params.role;
  },
  docsForRole: function () {
		return Docs.find().fetch(); //already filtered at the publication level
	},
  settingsdocsForRole: function () {
      return {
          rowsPerPage: 100,
          showFilter: true,
          class: 'table table-condensed col-sm-12',
					showNavigation: 'auto',
					fields: [
              {
                key : 'full',
                label: 'Full',
                fn: function (value, object) {
                    console.log(object)
                    return object.full;
                }
              }
					]
		}
  }
});

})();
