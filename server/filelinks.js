var walkThruFilelinks;

walkThruFilelinks = function () {
	Meteor.call('walkThruFilelinks');
};

SyncedCron.add({
	  name: 'Walk thru filelinks',
	  schedule: function (parser) {
			return parser.text(Meteor.settings.rationalK_filelink_check_cron_interval);
	  },
	  job: walkThruFilelinks
});


Meteor.methods({
	walkThruFilelinks: function () {
		var validatedFilesPathArray = [];
		var validatedFilesPath;
		if (Meteor.settings.public.debug) {
			console.log('Starting walking thru the different filelinks...');
		}


		if (typeof rkSettings.findOne({key: "validatedFilesPath"}) !== 'undefined') {
			validatedFilesPath = rkSettings.findOne({key: "validatedFilesPath"}).value;
			//they can be separated by | :
			validatedFilesPathArray = validatedFilesPath.split("|");
		}

			if (Meteor.settings.public.debug){
				console.log('validatedFilesPathArray : ');
				console.log(validatedFilesPathArray);
			}

      Filelinks.remove({});
			var fs=Npm.require("fs");
      var cat = Categories.find().fetch();
      var arrayLength = cat.length;
      for (var i = 0; i < arrayLength; i++) {
          //console.log("Cat Id : "+cat[i]._id);
          //console.log("View Id : "+cat[i].viewId);
          fieldsInThisView = Views.findOne(
            {
              $and: [
                {"_id":cat[i].viewId}
      			   ]
            }
          ).fields;
          //console.log(fieldsInThisView);

          for (key in fieldsInThisView) {
              if (fieldsInThisView.hasOwnProperty(key)) {
                  if (fieldsInThisView[key].type=="filelink"){
                    //console.log(key);
                    //console.log(fieldsInThisView[key].type);

                    var docs = Docs.find({"categoryId":cat[i]._id}).fetch();
                    var nDocs = docs.length;
                    //console.log(nDocs);
                    for (var j = 0; j < nDocs; j++) {
                      fields = docs[j].fields;
                      filelinkObj = fields[key];
                      filelinkObj.type = "filelink";
                      filelinkObj.docId = docs[j]._id;
											filelinkObj.inValidatedFolder = false;

                      var fullFilename=filelinkObj.value

											if (fullFilename!==""){

												// Check if the file is inside a validated folder (validated in the sense of the quality dpt)
												var validatedFilesPathArrayLength = validatedFilesPathArray.length;
												for (var k = 0; k < validatedFilesPathArrayLength; k++) {

													validatedFilesPath = validatedFilesPathArray[k];

													var fullFilenameWithForwardSlash = fullFilename.replace(/\\/g,"/");

													if (fullFilenameWithForwardSlash.indexOf(validatedFilesPath)>=0){
														filelinkObj.inValidatedFolder = true;
														if (Meteor.settings.public.debug){
																console.log("The file : " + fullFilename + " is in the validated folder : "+ validatedFilesPath);
																console.log("inValidatedFolder : " + filelinkObj.inValidatedFolder);
														}
														break;
													}
													else {
														console.log("The file : " + fullFilename + " is NOT in the validated folder : "+ validatedFilesPath);
														console.log("inValidatedFolder : " + filelinkObj.inValidatedFolder);
													}

												}

												fullFilename =  Meteor.call('stripBeginEndQuotes', fullFilename);
                        // do some replacement if needed
												//console.log("Avant (Client): " + fullFilename)
												fullFilename = Meteor.call('serverFilename', fullFilename);
												//console.log("Après (Server): " + fullFilename)

                        try {
                          // Query the entry
                          stats = fs.lstatSync(fullFilename);
                          //console.log(stats);
                          if (stats.isDirectory()) {
                              filelinkObj.filefolder="folder";
                          }
                          if (stats.isFile()) {
                              filelinkObj.filefolder="file";
                          }
                          filelinkObj.stats = stats;
                          filelinkObj.exists = true;
                        }
                        catch (e) {
                          //console.log(e);
                          filelinkObj.exists = false;
                        }
											}
											else { //doc with filelink empty.
												filelinkObj.exists = true;
												filelinkObj.filefolder="empty";
												filelinkObj.stats = []
											}

                      fields[key] = filelinkObj;
                      //console.log(fields[key]);
                      //console.log(fields)
                      //the direct is to prevent to create a revision
                      Docs.direct.update(
                  			{
                  			  _id: docs[j]._id
                  			},
                  			{
                          $set: {
                            fields: fields ,
                            hasFilelink: filelinkObj.exists ,
                            filelinkFieldName: key
                            }
                        }
                  		);
											if (filelinkObj.filefolder!=="empty"){
                        Filelinks.insert(
                    			{
                    			    path: Meteor.call('stripBeginEndQuotes', filelinkObj.value),
															serverPath : fullFilename,
                              stats: filelinkObj.stats,
                              exists : filelinkObj.exists,
                              type : filelinkObj.filefolder,
                              docId : filelinkObj.docId,
															inValidatedFolder : filelinkObj.inValidatedFolder
                    			}
                    		);
											}

                    }
                  }
              }
          }
      }
			if (Meteor.settings.public.debug){
				console.log('Finished walking thru the different filelinks...');
			}
	    return true;
	},
	walkThruOneFilelink: function (docId,clientPath,fieldName) {
			check(docId, String);
			check(clientPath, String);
			check(fieldName, String);
			console.log('Starting to checking one filelink...');
			var fs=Npm.require("fs");

			clientPath =  Meteor.call('stripBeginEndQuotes', clientPath);
			fullFilename = Meteor.call('serverFilename', clientPath);
			console.log("Après (Server): " + fullFilename)

			//Pas top, obligé de charger tous les fields pour n'en modifier qu'un seul...
			console.log('docId = ' + docId);
			var fields = Docs.findOne({_id : docId}).fields
			console.log(fields)

			try {
				var stats = fs.lstatSync(fullFilename);
				if (stats.isDirectory()) {
						fields[fieldName].filefolder = "folder";
				}
				if (stats.isFile()) {
						fields[fieldName].filefolder = "file";
				}
				fields[fieldName].exists = true;
				fields[fieldName].stats = stats;
			}
			catch (e) {
				console.log("There was an error with the file : " + fullFilename);
				console.log(e);
				fields[fieldName].exists = false;
				fields[fieldName].stats = [];
				fields[fieldName].filefolder = [];
			}

			Docs.direct.update(
				{
					_id: docId
				},
				{
					$set: {
						hasFilelink : true,
						fields : fields,
						filelinkFieldName: fieldName
						}
				}
			);

			console.log('Finished walking thru one filelink...');
	    return true;
	}
});
