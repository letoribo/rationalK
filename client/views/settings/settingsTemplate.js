// Inside the if (Meteor.isClient) block, right after Template.body.helpers:
Template.settingsTemplate.events({
  "submit .option1": function (event) {
	    // This function is called when the new task form is submitted
		var optionName = "option1";
	    var optionValue = event.target.option1.value;

	    Meteor.call('updateOption', optionName, optionValue, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		    console.log(result);
		  }
		});
		return false;
	},
	"submit .custom_settings": function (event) {
	    // This function is called when the new task form is submitted
		var optionName = "custom_settings";
	    var optionValue = event.target.custom_settings.value;

	    Meteor.call('updateOption', optionName, optionValue, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		    console.log(result);
		  }
		});

	    // Clear form
	    //event.target.option1.value = optionValue;

	    // Prevent default form submit
	    return false;
  	},
    'submit #validatedFilesPathForm' : function (e, t){
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
    "click a.walkThruFilelinks": function (e) {
      e.preventDefault();
      Meteor.call('walkThruFilelinks',function (error, result) {});
      return false;
    },
    "click a.walkThruFolders": function (e) {
      e.preventDefault();
      Meteor.call('walkThruFolders',function (error, result) {
        console.log(error);
        console.log(result);
      });
      return false;
    }
});


Template.settingsTemplate.helpers({
  validatedFilesPath: function () {
    var validatedFilesPath = rkSettings.findOne({key: "validatedFilesPath"});
    var validatedFilesPathValue="";
    if (typeof  validatedFilesPath !== 'undefined') {
      validatedFilesPathValue = rkSettings.findOne({key: "validatedFilesPath"}).value;
    }
    return validatedFilesPathValue;
  },
});
