if (Meteor.isServer) {

  Meteor.methods({
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
    }
  });

  indexFileContent3 = function () {
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
  };

  SyncedCron.add({
	  name: 'index file content',
	  schedule: function (parser) {
	    // parser is a later.parse object
	    return parser.text('every 2 minutes');
	  },
	  job: indexFileContent3
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
