(function(){Template.filelinks.helpers({
	Filelinks: function () {
		return Filelinks.find().fetch();
	},
	settingsFilelinks: function () {
        return {
            rowsPerPage: 100,
            showFilter: true,
            class: 'table table-condensed col-sm-12',
						rowClass: function (item) {
					  var exists = item.exists;
					  switch (exists) {
					    case '':
							case false:
					      return 'danger';
					    default:
					      return '';
					  }
					},
			fields: [
			    {
			        key: 'exists',
			        label: 'Exists',
			    },
			    {
			        key: 'path',
			        label: 'Client Path',
			    },
					{
			        key: 'serverPath',
			        label: 'Server Path',
			    },
			    {
			        key: 'type',
			        label: 'Type',
			    },
					{
			        key: 'inValidatedFolder',
			        label: 'In a validated folder',
			    },
			    {
			        key: 'mtime',
			        label: 'Modified On',
							hidden: true,
			    },
			    {
			        key: 'actions',
			        label: 'Actions',
			        fn: function (value, object) {
				        	var url;
				        	url = Router.routes.docEdit.path({
					        	_id: object.docId,
					        });
							return new Spacebars.SafeString('<a href="' + url + '" title="Edit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>');
				       	}
			    }
			],
		};
    },
	isAdmin: function () {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  },
});

})();
