(function(){Template.docHistory.events({
  "click .updateDocInMySpace": function (e) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace', e.currentTarget.dataset.docid);
		return false;
  },
});

Template.docHistory.helpers({
	docHistory: function () {
		return History.find({}).fetch();
	},
	settingsDocHistory: function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            class: 'table table-condensed col-sm-12',
						showNavigation: 'auto',
			fields: [
        {
          key: 'createdAt',
          label: 'Date',
          sortDirection: 'descending',
					fn: function (value) {
							return moment(value).format('DD.MM.YY HH:mm');
					},
        },
        {key: 'type', label: 'Type'},
        {key: 'who', label: 'Who'},
          {
            key: 'what',
            label: 'Description',
          },
			],
		};
  },
});

})();
