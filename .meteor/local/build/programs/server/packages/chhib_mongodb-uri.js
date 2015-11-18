(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var MongoDBURI;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/chhib:mongodb-uri/mongodb-uri.js                         //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
MongoDBURI = Npm.require("mongodb-uri");                             // 1
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['chhib:mongodb-uri'] = {
  MongoDBURI: MongoDBURI
};

})();

//# sourceMappingURL=chhib_mongodb-uri.js.map
