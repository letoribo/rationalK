(function(){Template.axapta.rendered = function () {

};

Template.axapta.events({
	"click .updateDocInMySpace": function (e) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace', e.currentTarget.dataset.docid);
		return false;
	},
});

Template.axapta.helpers({
	packageDashboard: function () {
		return RKCore.packageDashboard;
	},
	Axapta: function () {
		return Axapta.find({}, {}).fetch();
	},
	lastActivity: function () {
		return History.find({}, {sort: { createdAt: -1}, limit: 20}).fetch();
	},
	settingsAxapta: function () {
		return {
			rowsPerPage: 10,
			showFilter: false,
			class: 'table table-condensed col-sm-12',
			showNavigation: 'auto',
			fields: [
				{
					key: 'projectId',
					label: TAPi18n.__("projectId")
				},
				{
					key: 'projectName',
					label: TAPi18n.__("projectName")
				},
				{
					key: 'projectManager',
					label: TAPi18n.__("projectManager")
				},
				{
					key: 'customerAccount',
					label: TAPi18n.__("customerAccount")
				},
				{
					key: 'status',
					label: TAPi18n.__("Status")
				},
				{
					key: 'type',
					label: TAPi18n.__("Type")
				},
				{
					key: 'salesman',
					label: TAPi18n.__("salesman")
				},
			], // end of array : fields
		};
	},
});

})();
