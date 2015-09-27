Template.licenseError.helpers({
  refreshLicenseResult: function () {
	  return "valid license : " + Session.get('validLicense') + " / Error Id : " + Session.get('licenseErrorId');
	},
});

Template.licenseError.events({
	"click .refreshLicense": function (e) {
    e.preventDefault();
		Meteor.call('checkLicense', function (error, result) {
			if (!error) {
          RKCore.log(result);
			    content = JSON.parse(result.content);
				  RKCore.log(content);
			    if (content.error === false) {
			    	Session.set('licenseExpDate', content.licenseExpDate);
			    	Session.set('licensedTo', content.licensedTo);
			    	Session.set('licenseKey', content.licenseKey);
			    	Session.set('licenseNumberUsers', content.licenseNumberUsers);
			    	Session.set('validLicense', true);
			    }
			    else {
	  		    	Session.set('validLicense', false);
              Session.set('licenseErrorId', content.errorId);
	  		  }
	  		}
		});
    return false;
  },
});
