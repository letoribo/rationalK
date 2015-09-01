if (Meteor.isServer) {

  var fs=Npm.require("fs");

  Meteor.methods({
    indexFilesContent4: function () {
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
                        console.log('do scan the file');
                        console.log(serverFilename);
                        Meteor.call("indexFileContent2", serverFilename, function (error, results) {
                          console.log("error from the meteor call indexFileContent2 : ");
                          console.log(error);
                          console.log("results from the meteor call indexFileContent2 : ");
                          console.log(results);

                          if (results) {
                            insertedId = FilesContent.insert({
                              filePath: results.filePath,
                              text: results.text,
                            });
                            console.log("insertedId :");
                            console.log(insertedId);
                          }
                        });





                      } //end if allowed extensions
                  } // end of this is a file
              });
          }
          else {
            console.log(folder + ' does NOT exists. I will skip this folder.');
            fileTree = false;
          }
          return fileTree;
        }
      } //end if not empty
    }); // end loop over folders
    },
    'indexFileContent2': function indexFileContent2(filePath) {
      check(filePath, String);
      var textract = Meteor.npmRequire('textract');

      var textract2 = Async.runSync(function(done) {

        textract.fromFileWithPath(filePath, function( error, text ) {
          console.log(error);
          console.log(text);
          done(error, text);
        });

      });
      console.log("textract2.error : ");
      console.log(textract2.error);
      console.log("textract2.result : ");
      console.log(textract2.result);

      var obj = {};
      obj.filePath = filePath;
      obj.text = textract2.result;
      obj.error = textract2.error;
      console.log("obj:");
      console.log(obj);
      return obj;
    },
  });

  indexFilesContent5 = function () {
    Meteor.call("indexFilesContent4", function (error, results) {
      console.log("error from the meteor call : ");
      console.log(error);
      console.log("results from the meteor call : ");
      console.log(results);
    });
  };

  indexFileContent3 = function () {
    var filePath = "C:/Users/doki/test.docx";
    Meteor.call("indexFileContent2",filePath, function (error, results) {
      console.log("error from the meteor call : ");
      console.log(error);
      console.log("results from the meteor call : ");
      console.log(results);

      if (results) {
        insertedId = FilesContent.insert({
          filePath: results.filePath,
          text: results.text,
        });
        console.log("insertedId :");
        console.log(insertedId);
      }
    });
  };

  SyncedCron.add({
	  name: 'index file content',
	  schedule: function (parser) {
	    // parser is a later.parse object
	    return parser.text('every 2 hours');
	  },
	  //job: indexFileContent3,
    job: indexFilesContent5,
	});

} //end of if server check

/*
var filePath = "C:/Users/doki/test.docx";
Meteor.call("indexFileContent2",filePath, function (error, results) {
  console.log("error from the meteor call : ");
  console.log(error);
  console.log("results from the meteor call : ");
  console.log(results);

  if (results){
    insertedId = FilesContent.insert({
      filePath: results.filePath,
      text: results.text,
    });
    console.log("insertedId :");
    console.log(insertedId);
  }
});
*/
