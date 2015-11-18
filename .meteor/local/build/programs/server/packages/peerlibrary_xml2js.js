(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var blocking = Package['peerlibrary:blocking'].blocking;

/* Package-scope variables */
var xml2js;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/peerlibrary:xml2js/server.js                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
xml2js = Npm.require('xml2js');                                      // 1
                                                                     // 2
xml2js.parseStringSync = blocking(xml2js.parseString);               // 3
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:xml2js'] = {
  xml2js: xml2js
};

})();

//# sourceMappingURL=peerlibrary_xml2js.js.map
