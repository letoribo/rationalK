/*
var categoryId = "MLqJ4PQTfEsyo2FKk";
var newFieldName = "Type";
var docs = Docs.find({categoryId:categoryId}).fetch();
var nDocs = docs.length;
var i;
for ( i = 0; i < nDocs; i++) {
    var fields = docs[i].fields;
    var docId = docs[i]._id;
    //RKCore.log(fields);
    for (var prop in fields) {
      if (fields.hasOwnProperty(prop)) {
      // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
        //if (prop === oldFieldName){
        //RKCore.log("prop 3: " + prop.slice(0,3));
        //if (prop.slice(0,5) === "Lien2"){
        if (prop.slice(0,3) === "Typ"){
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
              }
            }
          );

        }
      }
    }
}
*/
