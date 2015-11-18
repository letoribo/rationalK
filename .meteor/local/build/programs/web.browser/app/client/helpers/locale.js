(function(){Meteor.startup(function () {
  //you need to refresh to see the change
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
});

})();
