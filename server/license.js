if (Meteor.isServer){

	//A cron that check the license :
	var checkLicense = function (){
      	Meteor.call('checkLicense');
	}

	SyncedCron.add({
	  name: 'A cron that check the license',
	  schedule: function (parser) {
	    return parser.text('at 5:00 am');
	  },
	  job: checkLicense
	});


	// The following method is called once a day in the cron.js file and in the client about page
	Meteor.methods({
		contactLicenseServer: function () {
			this.unblock();
			console.log("Contacting rationalK license server...");
			return Meteor.http.get(Meteor.settings.rationalK_license_url+"="+Meteor.settings.rationalK_license_key);
		},
		checkLicense: function (){
			if (typeof(process) !== 'undefined') {
		        if (typeof(Meteor.settings.rationalK_license_key) === 'undefined') {
			        process.env.RATIONALK_LICENSE_ERROR_MSG='No license key defined in variable RATIONALK_LICENSE_KEY';
	            console.log("********ERROR********");
	            console.log(process.env.RATIONALK_LICENSE_ERROR_MSG);
	            console.log("*********************");
		        }
		        else {
			        //the variable is defined so let's check if the license is correct :
							if ( Meteor.settings.rationalK_license_mode==="offline" ) {
								// #todo
								process.env.RATIONALK_LICENSE_EXPDATE="2020-31-12";
								process.env.RATIONALK_LICENSE_VALID=1;
								// result should be a JSON :
								//var result = '{"error":false,"licenseExpDate":"2020-31-12","licenseNumberUsers":"unlimited","licenseKey":"licenseJES01"}';
								var result = {}
								result.content = Assets.getText('licenseFile.json');
							}
							else {
			        	var result = Meteor.call('contactLicenseServer');
			        	content = JSON.parse(result.content);

						    if (content['error']===false){
						    	process.env.RATIONALK_LICENSE_EXPDATE=content['licenseExpDate'];
						    	process.env.RATIONALK_LICENSE_VALID=1;
						    	console.log("********INFO********");
						    	console.log('Meteor.settings.rationalK_license_url = ' + Meteor.settings.rationalK_license_url);
						    	console.log('process.env.RATIONALK_LICENSE = ' + process.env.RATIONALK_LICENSE);
						    	console.log('process.env.RATIONALK_LICENSE_EXPDATE = ' + process.env.RATIONALK_LICENSE_EXPDATE);
						    	console.log("*********************");
						    }
						    else {
							    if (content['errorId'] === 'non-valid-license-key'){
										process.env.RATIONALK_LICENSE_ERROR_MSG='Non valid license key defined in variable RATIONALK_LICENSE';
									}
									else if (content['errorId'] === 'license-expired'){
										process.env.RATIONALK_LICENSE_ERROR_MSG='License expired, please contact info@rationalk.ch';
									}
			  		    	process.env.RATIONALK_LICENSE_VALID=0;
			            console.log(process.env.RATIONALK_LICENSE_ERROR_MSG);
			  		    }
							} //end if online mode
		        } //end of the key is weel defined
		    }// end process check
		    return result;
		}
	});
}
