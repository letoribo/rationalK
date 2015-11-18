(function(){Meteor.methods({
  readXML : function (filepath) {
    check(filepath,String);
    var fs = Npm.require('fs');
  	var parser = new xml2js.Parser(); // need package : peerlibrary:xml2js
    var xml = fs.readFileSync(filepath)

    var result1; //needed to be define here to go out the callback
    parser.addListener('end', function (result) {
      result1 = result
      return true;
    });

    parser.parseString(xml);

    var myJSON = JSON.stringify(result1);
    var myData = JSON.parse(myJSON).Documents.Document;
    XMLFiles.remove({});

    var arrayLength = myData.length;
    for (var i = 0; i < arrayLength; i++) {
        var myCurrentData = myData[i];
        myCurrentData.Dollar = myCurrentData['$']; // error avec le symbol dollar
        delete myCurrentData['$'];
        var obj ={};
        obj.Title = myCurrentData.Title; //custom to the patent file (todo pass as parameters)
        obj.Abstract = myCurrentData.Abstract; //custom to the patent file
        if (Meteor.settings.public.debug){
          console.log("Current data : ")
          console.log(obj);
        }
        XMLFiles.insert(obj); // il doit etre possible de faire tout en un seul insert todo
      }
    }
})

})();
