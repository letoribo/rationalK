Template.layout.helpers({
  validLicense: function () {
	    return Session.get('validLicense');
	},
  show: function (navItem) {
		return Meteor.settings.public.show[navItem];
  },
});
