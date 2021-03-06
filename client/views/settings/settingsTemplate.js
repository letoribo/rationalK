Template.settingsTemplate.events({
  "submit .option1": function (event) {
	    // This function is called when the new task form is submitted
		var optionName = "option1";
	  var optionValue = event.target.option1.value;

	  Meteor.call('updateOption', optionName, optionValue, function (error, result) {
  		if (result) {
        console.log(result);
      }
    });
		return false;
	},
	"submit .custom_settings": function (event) {
	    // This function is called when the new task form is submitted
		var optionName = "custom_settings";
	    var optionValue = event.target.custom_settings.value;
	    Meteor.call('updateOption', optionName, optionValue, function () {});
	    return false;
  	},
    'submit #validatedFilesPathForm' : function (e, t) {
  		e.preventDefault();
  		var validatedFilesPath = t.$('#validatedFilesPath').val();
  		var data = {};
      data.validatedFilesPath = validatedFilesPath;
  	  Meteor.call('updateSettings',data, function (err){
  	    if (err){
          if (typeof(toastr) !== 'undefined') {
      			toastr.error(err.reason+". Please try again.");
      		}
  	    }
  	    else
  	    {
          if (typeof(toastr) !== 'undefined') {
      			toastr.success(TAPi18n.__('Saved'));
      		}
  	    }
      })
    },
    'submit #rolesForm': function (e, t) {
  		var data = {};
      e.preventDefault();
  		data.Roles = t.$('#Roles').val();
  	  Meteor.call('updateSettings', data, function (err) {
	    if (err) {
        if (typeof(toastr) !== 'undefined') {
    		    toastr.error(err.reason + ". Please try again.");
        }
	    }
	    else {
        if (typeof(toastr) !== 'undefined') {
    			toastr.success(TAPi18n.__('Saved'));
    		}
	    }
      });
    },
    "click a.walkThruFilelinks": function (e) {
      e.preventDefault();
      if (typeof(toastr) !== 'undefined') {
        toastr.success(TAPi18n.__('Scan through filelink started. This may takes some times.'));
      }
      Meteor.call('walkThruFilelinks', function (err) {
        if (!err) {
          if (typeof(toastr) !== 'undefined') {
            toastr.success(TAPi18n.__('Scan through filelink finished with success.'));
          }
        }
      });
      return false;
    },
    "click a.clearFilelinks": function (e) {
      e.preventDefault();
      Meteor.call('clearFilelinks', function (err) {
        if (!err) {
          if (typeof(toastr) !== 'undefined') {
            toastr.success(TAPi18n.__('Filelinks database is now empty.'));
          }
        }
      });
      return false;
    },
    "click a.walkThruFolders": function (e) {
      e.preventDefault();
      Meteor.call('walkThruFolders', function (error, result) {
        RKCore.log(error);
        RKCore.log(result);
      });
      return false;
    },
    "click a.clearWalkedFiles": function (e) {
      e.preventDefault();
      Meteor.call('clearWalkedFiles', function (err) {
        if (!err) {
          if (typeof(toastr) !== 'undefined') {
            toastr.success(TAPi18n.__('Walked files database is now empty.'));
          }
        }
      });
      return false;
    },
    "click a.clearHistory": function (e) {
      e.preventDefault();
      Meteor.call('clearHistory', function (error, result) {
        RKCore.log(error);
        RKCore.log(result);
      });
      return false;
    },
});


Template.settingsTemplate.helpers({
  packageSettings: function () {
		return RKCore.packageSettings;
	},
  validatedFilesPath: function () {
    var validatedFilesPath = rkSettings.findOne({key: "validatedFilesPath"});
    var validatedFilesPathValue = "";
    if (typeof  validatedFilesPath !== 'undefined') {
      validatedFilesPathValue = rkSettings.findOne({key: "validatedFilesPath"}).value;
    }
    return validatedFilesPathValue;
  },
  Roles: function () {
    var settings = rkSettings.findOne({key: "Roles"});
    if (typeof  settings !== 'undefined') {
      Roles = settings.value.map(function (role) {
        return role.name;
      });
      return Roles.join("|");
    }
  },
  hasTemplate: function (templateName) {
    return Template[templateName];
  },
});
