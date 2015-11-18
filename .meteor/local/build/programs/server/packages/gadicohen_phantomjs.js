(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/gadicohen:phantomjs/phantom.js                                //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
var phantomjs = Npm.require('phantomjs-sun'), path = Npm.require('path'); // 1
process.env.PATH += ':' + path.dirname(phantomjs.path);                   // 2
                                                                          // 3
////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicohen:phantomjs'] = {};

})();

//# sourceMappingURL=gadicohen_phantomjs.js.map
