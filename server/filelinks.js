var walkThruFilelinks;

walkThruFilelinks = function () {
	Meteor.call('walkThruFilelinks');
};

if (Meteor.settings.scanFilelinks.do) {
	SyncedCron.add({
		  name: 'Walk thru filelinks',
		  schedule: function (parser) {
				return parser.text(Meteor.settings.scanFilelinks.interval);
		  },
		  job: walkThruFilelinks,
	});
}

Meteor.methods({
	clearFilelinks: function () {
		Filelinks.remove({});
	},
	walkThruFilelinks: function () {
		var validatedFilesPathArray = [];
		var validatedFilesPath;
		var cat;
		var fs;
		var docs;
		var nDocs;
		var nCats;
		var fullFilename;
		var validatedFilesPathArrayLength;
		var fullFilenameWithForwardSlash;
		RKCore.log('Starting walking thru the different filelinks...');

		if (typeof rkSettings.findOne({key: "validatedFilesPath"}) !== 'undefined') {
			validatedFilesPath = rkSettings.findOne({key: "validatedFilesPath"}).value;
			//they can be separated by | :
			validatedFilesPathArray = validatedFilesPath.split("|");
			RKCore.log('The files in the following folders are considered as validated in term on quality : ');
			RKCore.log('validatedFilesPathArray : ');
			RKCore.log(validatedFilesPathArray);
		}

    Filelinks.remove({});
		fs = Npm.require("fs");
    cat = Categories.find().fetch();
		nCats = cat.length;
		RKCore.log('You have ' + nCats + ' categorie(s)');
    for (i = 0; i < nCats; i++) {
        RKCore.log("Cat Id : " + cat[i]._id);
        RKCore.log("View Id : " + cat[i].viewId);
        fieldsInThisView = Views.findOne(
          {
            $and: [
              {
								"_id": cat[i].viewId,
							},
						],
          }
        ).fields;

				RKCore.log("The fields in this view/category are : ");
				RKCore.log(fieldsInThisView);

        for (key in fieldsInThisView) {
            if (fieldsInThisView.hasOwnProperty(key)) {
                if (fieldsInThisView[key].type === "filelink") {
									RKCore.log("Let's consider the field named : " + key + " which is of type : " + fieldsInThisView[key].type);

                  docs = Docs.find(
										{
											$and: [
				                {
													"categoryId": cat[i]._id,
												},
											],
									}).fetch();
									// #todo : take only the doc with and existing filelink key;
                  nDocs = docs.length;

									RKCore.log('You have ' + nDocs + ' documents in this categorie(s)');

                  for (j = 0; j < nDocs; j++) {
                    fields = docs[j].fields;

										RKCore.log('In the doc number ' + j + ", the fields are : ");
										RKCore.log(fields);

                    filelinkObj = fields[key];
										doUpdate = false;
										if (typeof filelinkObj !== 'undefined') {
                    	filelinkObj.type = "filelink";
                    	filelinkObj.docId = docs[j]._id;
											filelinkObj.inValidatedFolder = false;
                    	fullFilename = filelinkObj.value;

											if (fullFilename !== "") {
												// Check if the file is inside a validated folder (validated in the sense of the quality dpt)
												validatedFilesPathArrayLength = validatedFilesPathArray.length;
												for (k = 0; k < validatedFilesPathArrayLength; k++) {
													validatedFilesPath = validatedFilesPathArray[k];
													fullFilenameWithForwardSlash = fullFilename.replace(/\\/g, "/");
													if (fullFilenameWithForwardSlash.indexOf(validatedFilesPath) >= 0) {
														filelinkObj.inValidatedFolder = true;
														RKCore.log("The file : " + fullFilename + " is in the validated folder : " + validatedFilesPath);
														RKCore.log("inValidatedFolder : " + filelinkObj.inValidatedFolder);
														break;
													}
													else {
														RKCore.log("The file : " + fullFilename + " is NOT in the validated folder : " + validatedFilesPath);
														RKCore.log("inValidatedFolder : " + filelinkObj.inValidatedFolder);
													}
												} //end of loop over validated path

												fullFilename =  Meteor.call('stripBeginEndQuotes', fullFilename);
												fullFilename = Meteor.call('serverFilename', fullFilename);

                        try {
                          // Query the entry
                          stats = fs.lstatSync(fullFilename);
                          if (stats.isDirectory()) {
                              filelinkObj.filefolder = "folder";
                          }
                          if (stats.isFile()) {
                              filelinkObj.filefolder = "file";
                          }
                          filelinkObj.stats = stats;
                          filelinkObj.exists = true;
													doUpdate = true;
                        }
                        catch (e) {
                          filelinkObj.exists = false;
                        }
											}
											else { //doc with filelink empty.
												doUpdate = false;
												filelinkObj.exists = true;
												filelinkObj.filefolder = "empty";
												filelinkObj.stats = [];
											}

                      fields[key] = filelinkObj;
                      //the direct is to prevent to create a revision
                      Docs.direct.update(
                  			{
                  			  _id: docs[j]._id,
                  			},
                  			{
                          $set: {
                            fields: fields,
                            hasFilelink: filelinkObj.exists,
                            filelinkFieldName: key,
													},
                        }
                  		);
											if (filelinkObj.filefolder !== "empty") {
												RKCore.log("We insert the filelinkObj into the filelinkDB.");
                        Filelinks.insert(
                    			{
                    			    path: Meteor.call('stripBeginEndQuotes', filelinkObj.value),
															serverPath: fullFilename,
                              stats: filelinkObj.stats,
                              exists: filelinkObj.exists,
                              type: filelinkObj.filefolder,
                              docId: filelinkObj.docId,
															inValidatedFolder: filelinkObj.inValidatedFolder,
                    			}
                    		);
											}
										} // end of filelink field is undefined
                  }
                }
            }
          }
      }
			RKCore.log('Finished walking through the different filelinks.');
	    return true;
	},
	walkThruOneFilelink: function (docId, clientPath, fieldName) {
			var fs = Npm.require("fs");
			var stats;
			var fields;
			check(docId, String);
			check(clientPath, String);
			check(fieldName, String);

			RKCore.log('Starting to checking one filelink...');

			clientPathStripped =  Meteor.call('stripBeginEndQuotes', clientPath);
			fullFilename = Meteor.call('serverFilename', clientPathStripped);

			RKCore.log("Après (Server): " + fullFilename);
			//Pas top, obligé de charger tous les fields pour n'en modifier qu'un seul...

			RKCore.log('docId = ' + docId);
			fields = Docs.findOne({_id: docId}).fields;

			RKCore.log(fields);

			if (fullFilename !== "") {
				//le champ est rempli
				try {
					stats = fs.lstatSync(fullFilename);
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
					RKCore.log("There was an error with the file : " + fullFilename);
					RKCore.log(e);
					fields[fieldName].exists = false;
					fields[fieldName].stats = [];
					fields[fieldName].filefolder = [];
				}
			}
			else {
				//le champ est vide
				RKCore.log("Empty filelink");
				fields[fieldName].exists = false;
				fields[fieldName].stats = [];
				fields[fieldName].filefolder = [];
			}

			Docs.direct.update(
				{
					_id: docId,
				},
				{
					$set: {
						hasFilelink: true,
						fields: fields,
						filelinkFieldName: fieldName,
					},
				}
			);
			RKCore.log('Finished walking thru one filelink.');
	    return true;
	},
});
