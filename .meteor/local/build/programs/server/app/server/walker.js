(function(){var walkThruFolders;
var fs;

if (Meteor.isServer) {
	walkThruFolders = function () {
    Meteor.call('walkThruFolders');
	};

	if (Meteor.settings.scanFolders.do) {
		SyncedCron.add({
			  name: 'Walk thru folders',
			  schedule: function (parser) {
			    return parser.text(Meteor.settings.scanFolders.interval);
			  },
			  job: walkThruFolders,
		});
	}

	fs = Npm.require("fs");

	Meteor.methods({
		walkThruFolders: function () {
			var folders;
			var walkPath;
			var fileTree;
			var lastWalkedFiles;
			RKCore.log('Starting scanning all folders.');
			rkStatus.update(
				{
					method: 'walkThruFolders',
				},
				{
					method: 'walkThruFolders',
					state: 'running',
					date: new Date(),
				},
				{
					upsert: true,
				}
			);

			RKCore.log('Starting scanning all folders...');

			TempWalkedFiles.remove({});

  		// #todo : this has to be replace with a diff function based on size, and modified time
	    folders = FoldersToScan.find().fetch();
			folders.forEach(function (folder) {
				if (folder.path !== "") {
				walkPath = folder.path;
				walkPath = walkPath.replace(/\/$/, ""); //removing trailing slash
				fileTree = getFilesRecursive(walkPath);

				function getFilesRecursive (folder) {
					var fileContents;
					var fileTree;
					var stats;
					var serverFilename;
					var doUpdate;
					var extension;
					var allowedExtensions;
					var nFilelinksWithThisPath;
					var belongsToADocumentEntry;
					var existingWalkedFile;
					var previousLastModifiedDate;
					var currentLastModifiedDate;
					if (fs.existsSync(folder)) {
						//console.log(folder +' exists. I will scan inside.');
						fileContents = fs.readdirSync(folder);
					  fileTree = [];
					  stats = {};

					  fileContents.forEach(function (fileName) {
					  stats = fs.lstatSync(folder + '/' + fileName);

						serverFilename = folder + '\\' + fileName;
						serverFilename = serverFilename.replace(/\\/g, "/");

		        if (stats.isDirectory()) {
	            fileTree.push({
	                name: fileName,
	                children: getFilesRecursive(folder + '/' + fileName)
	            });
		        }
						else {
	            fileTree.push({
	                name: fileName,
	            });
	            extension = fileName.split('.').pop();
	            allowedExtensions = ["doc", "docx", "xls", "xlsx", "xlsm", "txt", "pdf"];
	            if (allowedExtensions.indexOf(extension) > 0) {
		            TempWalkedFiles.insert(
									{
										createdBy: 'cron',
										createdAt: new Date(),
										path: serverFilename,
										ctime: stats.ctime,
										mtime: stats.mtime,
										size: stats.size,
									}
								);
								// C'est pas vraiment un diff. :
								doUpdate = false;
								//check if the file belongs to a document
								nFilelinksWithThisPath = Filelinks.find({serverPath: serverFilename}).count();
								if (nFilelinksWithThisPath > 0) {
									RKCore.log("The file " + serverFilename + " is belonging to an existing DB entry.");
									doUpdate = true;
									belongsToADocumentEntry = true;
								}
								else {
									belongsToADocumentEntry = false;
								}

								existingWalkedFile = WalkedFiles.findOne({path: folder + '/' + fileName});

								if (typeof existingWalkedFile === 'undefined') {
									//this is a new doc
									//console.log('We have found a new document : '+folder + '/' + fileName+'. We will add it to the database.');
									doUpdate = true;
								}
								else {
									//The files already exists, let's now check the size or the mtime
									//console.log(existingWalkedFile);
									if (existingWalkedFile.size !== stats.size) {
										//console.log("The document size has changed. Before : " + existingWalkedFile.size + "kB / Now : "+ stats.size+"kB.");
										doUpdate = true;
									}

									previousLastModifiedDate = new Date(existingWalkedFile.mtime).getTime();
									currentLastModifiedDate = new Date(stats.mtime).getTime();
									if (previousLastModifiedDate !== currentLastModifiedDate) {
										//console.log("The document has been modified between two consecutive scans. Before : " + previousLastModifiedDate + " / Now : "+ currentLastModifiedDate);
										doUpdate = true;
									}
								} // end of else i.e. the file already exists

								if (doUpdate) {
									RKCore.log("I will update the list of WalkedFiles");
									RKCore.log(serverFilename);
									WalkedFiles.update(
										{
											path: serverFilename,
										},
										{
											createdBy: 'cron',
											walkedDate: new Date(),
											path: serverFilename,
											ctime: stats.ctime,
											mtime: stats.mtime,
											size: stats.size,
											otherStats: stats,
											belongsToADocumentEntry: belongsToADocumentEntry,
										},
										{
											upsert: true,
										}
									);
								}
								else {
									RKCore.log("Nothing has changed since the last walk.");
								}
						  } //end if allowed extensions
					  }
					});
					return fileTree;
				}
				RKCore.log(folder + ' does NOT exists. I will skip this folder.');
				return false;
			}
		} //end if not empty
	}); // end loop over folders
	// Delete all files that do not exists anymore :
	//console.log("Cleaning all files that have been deleted between two walks...")
	lastWalkedFiles = WalkedFiles.find({}).fetch();
	lastWalkedFiles.forEach(function (entry) {
		if (typeof TempWalkedFiles.findOne({path: entry.path}) === 'undefined') {
				//This files has been deleted so we need to reflect the changes in the db
				WalkedFiles.remove(entry._id);
			}
	});
	RKCore.log('Finished scanning all folders.');
	//not toastr on the server
	rkStatus.update(
		{
			method: 'walkThruFolders',
		},
		{
			method: 'walkThruFolders',
			state: 'finished',
			date: new Date(),
		},
		{
			upsert: true,
		}
	);
  return true;
	},
	});
} // end of is Server check

})();
