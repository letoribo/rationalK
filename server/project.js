if (Meteor.isServer){

	var fs=Npm.require("fs");

	Meteor.methods({
  		walkThruProjectFolder: function (projectId) {
	  		console.log('Starting walking thru the folder directory...');
	  		TempProjectFiles.remove({});


	  		// #todo : this has to be replace with a diff function based on size, and modified time

		    //var files = fs.readdirSync('./');
		    var folderpath = Projects.findOne(projectId).folderpath;
		    console.log(folderpath);
			if (folderpath!=""){
				var walkPath = folderpath
				walkPath = walkPath.replace(/\/$/, ""); //removing trailing slash

				var fileTree = getFilesRecursive(walkPath);
				//console.log(fileTree);

				function getFilesRecursive (folder) {

					if (fs.existsSync(folder)) {
						console.log(folder +' exists. I will scan inside.');

						var fileContents = fs.readdirSync(folder);
					    var fileTree = [];
					    var stats = {};

					    fileContents.forEach(function (fileName) {
					        stats = fs.lstatSync(folder + '/' + fileName);

					        if (stats.isDirectory()) {
					            fileTree.push({
					                name: fileName,
					                children: getFilesRecursive(folder + '/' + fileName)
					            });
					        } else {
					            fileTree.push({
					                name: fileName
					            });


					            var extension = fileName.split('.').pop();
					            var allowedExtensions = ["doc", "docx", "xls", "xlsx", "xlsm","txt"];
					            if (allowedExtensions.indexOf(extension)>0){
						            TempProjectFiles.insert(
											{
												createdBy: 'cron',
												createdAt: new Date(),
												path: folder + '/' + fileName,
												ctime : stats.ctime,
												mtime : stats.mtime,
												size: stats.size,
												projectId:projectId,
												filename : fileName
											}
									);

									var doUpdate=false;

									var existingWalkedFile = ProjectFiles.findOne({
										$and: [
											{path:folder + '/' + fileName},{projectId:projectId}
		  								]
										});

									if(typeof existingWalkedFile === 'undefined'){
										//this is a new doc
										console.log('We have found a new document : '+folder + '/' + fileName+'. We will add it to the database.');
										doUpdate = true;
									}
									else {
										//The files already exists, let's now check the size or the mtime
										console.log(existingWalkedFile);

										if (existingWalkedFile.size!=stats.size){
											console.log("The document size has changed. Before : " + existingWalkedFile.size + "kB / Now : "+ stats.size+"kB.");
											doUpdate = true;
										}


										var previousLastModifiedDate = new Date(existingWalkedFile.mtime).getTime();
										var currentLastModifiedDate = new Date(stats.mtime).getTime();
										if (previousLastModifiedDate!=currentLastModifiedDate){
											console.log("The document has been modified between two consecutive scans. Before : " + previousLastModifiedDate + " / Now : "+ currentLastModifiedDate);
											doUpdate = true;
										}
									}
									if (doUpdate){
										ProjectFiles.update(
											{
												$and :[
													{ path: folder + '/' + fileName },{projectId: projectId}
												]
											},
											{
												createdBy: 'cron',
												walkedDate: new Date(),
												path: folder + '/' + fileName,
												ctime : stats.ctime,
												mtime : stats.mtime,
												size: stats.size,
												otherStats : stats,
												projectId: projectId,
												filename : fileName
											},
											{
												upsert: true
											}
										);
									} else {
										console.log("Nothing has changed since the last walk.");
									}

						        } //end if allowed extensions

					        }
					    });
					    return fileTree;


					} else {
						console.log(folder +' does NOT exists. I will skip this folder.');
						return false;
					}
				};
			} //end if not empty

			// Delete all files that do not exists anymore :
			console.log("Cleaning all files that have been deleted between two walks...")
			var lastProjectFiles=ProjectFiles.find({}).fetch();
			lastProjectFiles.forEach(function (entry) {
				if(typeof TempProjectFiles.findOne({$and:[{path:entry.path},{projectId:projectId}]}) === 'undefined'){
					//This files has been deleted so we need to reflect the changes in the db
					ProjectFiles.remove(entry._id);
				}
			});
		    return true;
		}
	});

} // end of is Server check
