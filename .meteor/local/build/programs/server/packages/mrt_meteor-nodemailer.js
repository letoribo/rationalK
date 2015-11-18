(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Nodemailer;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mrt:meteor-nodemailer/nodemailer.js                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Nodemailer = Npm.require('nodemailer');                              // 1
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:meteor-nodemailer'] = {
  Nodemailer: Nodemailer
};

})();

//# sourceMappingURL=mrt_meteor-nodemailer.js.map
