Template.navExternal.rendered = function () {
	document.title = (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";
};

Template.navExternal.helpers({
	onDemo: function () {
		if (document.URL.indexOf("demo.rationalk.ch") == -1){
			return false;
		}
		else {
			return true;
		}
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
	onInvitationPage : function () {
	  if (Router.current().url.indexOf("/invitation/") == -1){
	    // I am not on the invitation page
	    return false
	  }
	  else {
			console.log('I am on the invitation page, I will hide the Sign-In button.')
	    return true
	  }
	},
	loggedIn: function () {
    return Meteor.user();
  },
	username: function (){
		return Meteor.user().username;
	},
	headerText: function (){
		return (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";
	},
	categoriesWithSlug : function (){
		return Session.get("categoriesWithSlug");
	}
});

Template.navExternal.events({
	'submit #logout-form' : function (e, t){
		e.preventDefault();
	  Meteor.logout();
	  return false;
	},
	'click a.logout' : function (e, t){
		e.preventDefault();
	  Meteor.logout();
	  return false;
	},
	"click a.selectCategory": function (e) {
		e.preventDefault();
	  Session.set('selectedCategory', e.currentTarget.dataset.catid);
	  return Router.go("browse",{categorySlug : e.currentTarget.dataset.slug});
	 }
});
