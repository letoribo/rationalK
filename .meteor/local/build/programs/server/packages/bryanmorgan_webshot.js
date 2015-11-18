(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var webshot;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/bryanmorgan:webshot/lib/webshot.js                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var _webshot = Npm.require("webshot");                               // 1
                                                                     // 2
webshot = function (url, filePath, options, callback) {              // 3
    var webshotAsync = Meteor.wrapAsync(_webshot);                   // 4
    var callback = [].slice.apply(arguments).pop();                  // 5
                                                                     // 6
    if (typeof callback !== 'function') {                            // 7
        throw new Error("Missing callback function");                // 8
    }                                                                // 9
    if (arguments.length === 2) {                                    // 10
        return webshotAsync(url, callback);                          // 11
    } else if (arguments.length === 3) {                             // 12
        return webshotAsync(url, filePath, callback);                // 13
    }                                                                // 14
                                                                     // 15
    webshotAsync(url, filePath, options, callback);                  // 16
};                                                                   // 17
                                                                     // 18
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['bryanmorgan:webshot'] = {
  webshot: webshot
};

})();

//# sourceMappingURL=bryanmorgan_webshot.js.map
