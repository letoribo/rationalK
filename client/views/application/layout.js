Template.header.helpers({

});

Template.layout.helpers({
  validLicense: function (){
	    return Session.get('validLicense');
	},
	showFooter: function (){
	    return (Meteor.settings.public.show_footer)?true:false;
	}
});

Template.layout.events({

});
