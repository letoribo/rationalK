Meteor.methods({
  readXML: function (filepath) {
    var fs = Npm.require('fs');
  	var parser = new xml2js.Parser(); // need package : peerlibrary:xml2js
    var xml = fs.readFileSync(filepath);
    var result1; //needed to be define here to go out the callback
    var myJSON;
    var myData;
    var arrayLength;
    var i;
    var myCurrentData;
    var obj = {};
    check(filepath, String);
    parser.addListener('end', function (result) {
      result1 = result;
      return true;
    });
    parser.parseString(xml);
    myJSON = JSON.stringify(result1);
    myData = JSON.parse(myJSON).Documents.Document;
    XMLFiles.remove({});

    arrayLength = myData.length;
    for (i = 0; i < arrayLength; i++) {
        myCurrentData = myData[i];
        myCurrentData.Dollar = myCurrentData['$']; // error avec le symbol dollar
        delete myCurrentData['$'];
        obj = {};
        obj.Title = myCurrentData.Title; //custom to the patent file (todo pass as parameters)
        obj.Abstract = myCurrentData.Abstract; //custom to the patent file
        RKCore.log("Current data : ");
        RKCore.log(obj);
        XMLFiles.insert(obj); // il doit etre possible de faire tout en un seul insert todo
      }
    },
});
