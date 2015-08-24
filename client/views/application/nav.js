Template.nav.rendered = function () {
	document.title = (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";

	// single keys
	 Mousetrap.bind('4', function() { console.log('4'); });
	 Mousetrap.bind("?", function() { console.log('show shortcuts!'); });
	 Mousetrap.bind('esc', function() { console.log('escape'); }, 'keyup');

	 // combinations
	 Mousetrap.bind('command+shift+u', function() { console.log('command shift u'); });

	 // map multiple combinations to the same callback
	 Mousetrap.bind(['command+k', 'ctrl+k'], function() {
			 console.log('command k or control k');

			 // return false to prevent default browser behavior
			 // and stop event from bubbling
			 return false;
	 });

	 // gmail style sequences
	 Mousetrap.bind('g i', function() { console.log('go to inbox'); });
	 Mousetrap.bind('f u', function() {
		 console.log('go to follow up');
		 bootbox.prompt("Type some tags separated with ,", function(result) {
			 var FollowUp ={};
			 if (result === null) {
			 }
			 else {
				 console.log("Hi <b>"+result+"</b>");
				 FollowUp.tags = result;
				 Session.set("FollowUp",FollowUp);
				 bootbox.prompt("Type some text", function(result) {
					 FollowUp = Session.get("FollowUp");
					 if (result === null) {

					 }
					 else {
						 FollowUp.text = result;
						 Session.set("FollowUp",FollowUp);
						 Meteor.call('createFollowUp', FollowUp, function (error, result) {
				 			if (error) {

				 			}
							else {
								if (typeof(toastr) !== 'undefined') {
	                toastr.success("Follow Up succesfully saved");
	              }
							}
						});

					 }
				 }); //end of second bootbox
			 } //end of else
		 });
	 Mousetrap.bind('* a', function() { console.log('select all'); });

	 // konami code!
	 Mousetrap.bind('up up down down left right left right b a enter', function() {
			 console.log('konami code');
	 });


});

};

Template.nav.helpers({
	onDemo: function () {
		return (document.URL.indexOf("demo.rationalk.ch") == -1)? false : true;
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
			if (Meteor.settings.public.debug){
				console.log('I am on the invitation page, I will hide the Sign-In button.')
			}
	    return true
	  }
	},
	loggedIn: function () {
    return Meteor.user();
  },
	username: function (){
		return Meteor.user().username;
	},
	showERP: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("erp")<0)?true:false;
	},
	showProcesses: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("processes")<0)?true:false;
	},
	showAbout: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("about")<0)?true:false;
	},
	showControlPlan: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("controlplan")<0)?true:false;
	},
	showFiles: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("files")<0)?true:false;
	},
	showProjects: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("projects")<0)?true:false;
	},
	showDiscussions: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("discussions")<0)?true:false;
	},
	showExperts: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("experts")<0)?true:false;
	},
	showNotes: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("notes")<0)?true:false;
	},
	showDBrelationships: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("dbrelationships")<0)?true:false;
	},
	showGantts: function (){
		return (Meteor.settings.public.hide_in_main_nav.indexOf("gantts")<0)?true:false;
	},
	headerText: function (){
		return (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";
	},
	categories : function (){
		return Categories.find().fetch();
	}
});

Template.nav.events({
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
