Template.nav.rendered = function () {
	document.title = (typeof(Meteor.settings.public.header_text) !== 'undefined') ? Meteor.settings.public.header_text : "rationalK";


	 Mousetrap.bind('c d', function () {
		 Router.go("docCreate");
	 });

	 if (Meteor.settings.public.show.followup) {
	 	Mousetrap.bind('f u', function () {
		 bootbox.prompt("Type some tags separated with ,", function(result) {
			 var FollowUp = {};
			 if (result !== null) {
				 FollowUp.tags = result;
				 Session.set("FollowUp", FollowUp);
				 bootbox.prompt("Type some text", function (r) {
					 FollowUp = Session.get("FollowUp");
					 if (r !== null) {
						 FollowUp.text = r;
						 Session.set("FollowUp", FollowUp);
						 Meteor.call('createFollowUp', FollowUp, function (error) {
				 			if (!error) {
								if (typeof(toastr) !== 'undefined') {
	                toastr.success("Follow Up succesfully saved");
	              }
							}
						});
					 }
				 }); //end of second bootbox
			 } //end of else
		 });
	 });
	} // end of if followup
};

Template.nav.helpers({
	onDemo: function () {
		return (document.URL.indexOf("demo.rationalk.ch") === -1) ? false : true;
	},
	updateLocale: function () {
		if ( (typeof(Meteor.user()) !== 'undefined') && (Meteor.user()) ) {
	    if (typeof(Meteor.user().profile.locale) !== 'undefined') {
	      TAPi18n.setLanguage(Meteor.user().profile.locale);
				i18n.setLanguage(Meteor.user().profile.locale);
	    }
	    else {
	      TAPi18n.setLanguage('en');
				i18n.setLanguage('en');
	    }
	  }
	  else {
	    TAPi18n.setLanguage('en');
			i18n.setLanguage('en');
	  }
	},
	onInvitationPage: function () {
	  if (Router.current().url.indexOf("/invitation/") !== -1) {
			if (Meteor.settings.public.debug) {
				console.log('I am on the invitation page, I will hide the Sign-In button.');
			}
	    return true;
	  }
		return false;
	},
	loggedIn: function () {
    return Meteor.user();
  },
	username: function () {
		return Meteor.user().username;
	},
	show: function (navItem) {
		return Meteor.settings.public.show[navItem];
  },
	hasTemplate: function (templateName) {
    return Template[templateName];
  },
	headerText: function () {
		return (typeof(Meteor.settings.public.header_text) !== 'undefined') ? Meteor.settings.public.header_text : "rationalK";
	},
	categories: function () {
		return Categories.find().fetch();
	}
});

Template.nav.events({
	'submit #logout-form': function (e) {
		e.preventDefault();
	  Meteor.logout();
	  return false;
	},
	'click a.logout': function (e) {
		e.preventDefault();
	  Meteor.logout();
	  return false;
	},
	"click a.selectCategory": function (e) {
		e.preventDefault();
	  Session.set('selectedCategory', e.currentTarget.dataset.catid);
	  return Router.go("browse", {categorySlug: e.currentTarget.dataset.slug});
	},
});
