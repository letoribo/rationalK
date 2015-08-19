Template.update.helpers({
	Orgs: function () {
		return Orgs.find();
	},
	version : function () {
		return rK_version; //global variable defined in lib/rK_version.js
	},
	licenseKey : function () {
		return Session.get('licenseKey');
	},
	licenseExpDate : function () {
		return Session.get('licenseExpDate');
	},
	licenseNumberUsers : function () {
		return Session.get('licenseNumberUsers');
	},
	licensedTo : function () {
		return Session.get('licensedTo');
	},
	internetConnection : function () {
		if (Session.get('internetConnection')){
			return new Spacebars.SafeString(TAPi18n.__("Your internet connection is alive."));
		}
		else {
			return new Spacebars.SafeString(TAPi18n.__("Please check your internet connection."));
		}
	},
	lastVersion : function () {
		return Session.get('lastVersion');
	},
	newInThisVersion : function () {
		return Session.get('newInThisVersion');
	},
  updateInProgress : function () {
		if (typeof Session.get('updateInProgress') === "undefined") {
      // nothing
    }
    else if (Session.get('updateInProgress') === true){
      return new Spacebars.SafeString('<img src="/images/spinner.gif" height="20"/> '+TAPi18n.__("Update in progress. Please wait..."));
    }
    else {
      if (Meteor.settings.public.debug){
        console.log(Session.get('updateInProgress'));
      }
      Meteor.setTimeout(function () {Session.set('updateInProgress', undefined)},2000);
      if (typeof(toastr) !== 'undefined') {
        toastr.success(TAPi18n.__("Done. Update has been installed."));
      }
      return new Spacebars.SafeString(TAPi18n.__("Done. Update has been installed."));
    }
	},
	updateLoadingAnimation :function () {
		var updateStatus = rkStatus.findOne({method : 'updateRationalK' });
		if (typeof(updateStatus) !== 'undefined') {
			if (updateStatus.state=='running'){
				return  ""
			}
			else {
				return  "hidden"
			}
		}
	},
	downloadLink : function () {
		var lastVersion = Session.get('lastVersion');
		var downloadLink = "http://rationalk.ch/downloads/rK_v"+lastVersion+".tar.gz";
		return downloadLink;
	},
	myVersionIsBehind : function () {
		function versionCompare(v1, v2, options) {
		    var lexicographical = options && options.lexicographical,
		        zeroExtend = options && options.zeroExtend
		    var v1parts = v1.split('.');
		    var v2parts = v2.split('.');

		    function isValidPart(x) {
		        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
		    }

		    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		        return NaN;
		    }

		    if (zeroExtend) {
		        while (v1parts.length < v2parts.length) v1parts.push("0");
		        while (v2parts.length < v1parts.length) v2parts.push("0");
		    }

		    if (!lexicographical) {
		        v1parts = v1parts.map(Number);
		        v2parts = v2parts.map(Number);
		    }

		    for (var i = 0; i < v1parts.length; ++i) {
		        if (v2parts.length == i) {
		            return 1;
		        }

		        if (v1parts[i] == v2parts[i]) {
		            continue;
		        }
		        else if (v1parts[i] > v2parts[i]) {
		            return 1;
		        }
		        else {
		            return -1;
		        }
		    }

		    if (v1parts.length != v2parts.length) {
		        return -1;
		    }

		    return 0;
		}

		// versionCompare("1.2", "1.3") -> returns -1 car la version est derriere
		// versionCompare("1.3", "1.3") -> returns 0 car version a jour
		// versionCompare("1.4", "1.3") -> returns 1 car version en avance : ce qui ne doit pas arriver !
		var lastVersion = 0;
		lastVersion = Session.get('lastVersion');
		if (typeof lastVersion === "undefined") {
			lastVersion=0;
		}

		var myVersion = rK_version; //rK_version is defined in /lib/rK_version.js

		if (versionCompare(myVersion,lastVersion)<0){
			// The installed version is behind
			return true;
		}
		else {
			return false;
		}
	}
});

Template.update.rendered = function (template) {
		Meteor.call('contactLicenseServer', function (error, result) {
			  if (error) {
					if (typeof(toastr) !== 'undefined') {
		        toastr.error(TAPi18n.__("Not able to contact license server"));
		      }
			  }
				else {
			    content = JSON.parse(result.content);

			    if (content['error']==false){
			    	Session.set('licenseExpDate',content['licenseExpDate']);
			    	Session.set('licensedTo',content['licensedTo']);
			    	Session.set('licenseKey',content['licenseKey']);
			    	Session.set('licenseNumberUsers',content['licenseNumberUsers']);
			    	Session.set('validLicense',true);
			    }
			    else {
	  		    	Session.set('validLicense',false);
	  		    }
			  }
		});
	Meteor.call('checkInternetConnection',function (error, result) {
		if (error){
			if (typeof(toastr) !== 'undefined') {
        toastr.error(TAPi18n.__("Your internet connection is down"));
      }
		}
		else {
			Session.set('internetConnection',result);
		}
  });
  Meteor.call('whatIsLastVersion',function (error, result) {
		if (error){
			if (typeof(toastr) !== 'undefined') {
        toastr.error(TAPi18n.__("Error while fetching the last version"));
      }
		}
		else {
			Session.set('lastVersion',result['lastVersion']);
			Session.set('newInThisVersion',result['newInThisVersion']);
		}
  });
}



Template.update.events({
	"click a.updateRationalK": function (event){
			event.preventDefault();
      Session.set('updateInProgress',true)
			Meteor.call('updateRationalK', function (error, result) {
				if (error) {
          if (Meteor.settings.public.debug){console.log(error);}
				} else {
          if (Meteor.settings.public.debug){console.log(result);}
          Session.set('updateInProgress',false)
				}
		});
	}
});
