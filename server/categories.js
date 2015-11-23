if (Meteor.isServer) {
  Meteor.methods({
    changeNameOfFieldForAllDocs: function (data) {
      var newFieldName;
      var docs;
      var i;
      var docId;
      var fields;
      var prop;
      var nDocs;
      var nDocsUpdated = 0;
      check(data, {
          nameCurrent: String,
          nameDestination: String,
          categoryId: String,
        }
      );
      RKCore.log("changeNameOfField called in the server");
      docs = Docs.find({categoryId: data.categoryId}).fetch();
      nDocs = docs.length;
      oldFieldName = data.nameCurrent;
      newFieldName = data.nameDestination;
      RKCore.log("nDocs : " + nDocs);

      for ( i = 0; i < nDocs; i++) {
          fields = docs[i].fields;
          docId = docs[i]._id;
          for (prop in fields) {
            if (fields.hasOwnProperty(prop)) {
            // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
              if (prop === oldFieldName) {
                //RKCore.log("prop 3: " + prop.slice(0,3));
                //if (prop.slice(0,5) === "Lien2"){
                //if (prop.slice(0,3) === "Typ"){
                //RKCore.log("prop: " + prop + " value: " + fields[prop].value);
                fields[newFieldName] = fields[prop];
                delete fields[prop];
                Docs.update(
                  {
                    _id: docId,
                  },
                  {$set:
                    {
                      fields: fields,
                    },
                  }
                );
                nDocsUpdated = nDocsUpdated + 1;
              }
            }
          }
      }
      RKCore.log("nDocs updated : " + nDocsUpdated);
      return false;
    },
  }); //end of methods
} //end of is Server
