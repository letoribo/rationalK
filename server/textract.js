var fs;
if (Meteor.isServer) {
  fs = Npm.require("fs");

  Meteor.methods({
	  removeFilesContent: function () {
		  FilesContent.remove({});
	  },
    indexFilesContent: function () {
      var stats = {};
      var fileTree = [];
      var fileContents;
      var extension;
      var walkPath;
      var folders;
      var serverFilename;
      var allowedExtensions = ["doc", "docx"];
      FilesContent.remove({});
      folders = FoldersToScan.find().fetch();
      folders.forEach(function (folder) {
        if (folder.path !== "") {
          walkPath = folder.path;
          walkPath = walkPath.replace(/\/$/, ""); //removing trailing slash
          fileTree = getFilesRecursive(walkPath);

					function getFilesRecursive (folder) {
          	if (fs.existsSync(folder)) {
            	fileContents = fs.readdirSync(folder);
            	fileTree = [];
            	fileContents.forEach(function (fileName) {
              	stats = fs.lstatSync(folder + '/' + fileName);
              	serverFilename = folder + '\\' + fileName;
              	serverFilename = serverFilename.replace(/\\/g, "/");

                if (stats.isDirectory()) {
									//this is a folder
                  fileTree.push({
										name: fileName,
                    children: getFilesRecursive(folder + '/' + fileName),
                  });
                }
                else {
                  // this is a file and not a folder
                  fileTree.push({
										name: fileName,
                  });
                  extension = fileName.split('.').pop();
                  if (allowedExtensions.indexOf(extension) > 0) {
										//do scan the file
										if (Meteor.settings.public.debug) {
											console.log('do scan the file : ');
											console.log(serverFilename);
										}
              			Meteor.call("indexSingleFileContent", serverFilename, function (error, results) {
											if (Meteor.settings.public.debug) {
												console.log("error from the meteor call indexSingleFileContent : ");
							  				console.log(error);
							  				console.log("results from the meteor call indexSingleFileContent : ");
							  				console.log(results);
											}
                      if (results) {
												insertedId = FilesContent.insert({
													filePath: results.filePath,
													text: results.text,
                        });
												if (Meteor.settings.public.debug) {
													console.log("insertedId :");
													console.log(insertedId);
												}
                      }
                    });
                  } //end if allowed extensions
                } // end of this is a file
              });
          }
          else {
            if (Meteor.settings.public.debug) {
							console.log(folder + ' does NOT exists. I will skip this folder.');
						}
            fileTree = false;
          }
          return fileTree;
        }
      } //end if not empty
    }); // end loop over folders
    },
    'indexSingleFileContent': function indexSingleFileContent (filePath) {
			var textract;
			var textractAsync;
			var obj = {};
			check(filePath, String);
      textract = Meteor.npmRequire('textract');
      textractAsync = Async.runSync(function (done) {
        textract.fromFileWithPath(filePath, function (error, text ) {
					if (Meteor.settings.public.debug) {
						console.log(error);
						console.log(text);
					}
					done(error, text);
        });
      });
	  if (Meteor.settings.public.debug) {
			console.log("textractAsync.error : ");
			console.log(textractAsync.error);
			console.log("textractAsync.result : ");
			console.log(textractAsync.result);
	  }

    obj.filePath = filePath;
    obj.text = textractAsync.result;
    obj.error = textractAsync.error;
	  if (Meteor.settings.public.debug) {
			console.log("obj:");
			console.log(obj);
	  }
      return obj;
    },
  });

  if (Meteor.settings.scanFilesContent.do) {
	  SyncedCron.add({
		  name: 'Index files content',
		  schedule: function (parser) {
			// parser is a later.parse object
			return parser.text(Meteor.settings.scanFilesContent.interval);
		  },
			job: function () {
		    Meteor.call("indexFilesContent", function (error, results) {
				if (Meteor.settings.public.debug) {
				  console.log("error from the meteor call : ");
				  console.log(error);
				  console.log("results from the meteor call : ");
				  console.log(results);
				}
		    });
		  },
		});
  }
} //end of if server check
