//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Util;

(function () {

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages/meteorspark:util/lib/util-client.js                       //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
// https://github.com/isaacs/inherits/blob/master/inherits_browser.js // 1
Util = {}                                                             // 2
if (typeof Object.create === 'function') {                            // 3
  // implementation from standard node.js 'util' module               // 4
  Util.inherits = function (ctor, superCtor) {                        // 5
    ctor.super_ = superCtor                                           // 6
    ctor.prototype = Object.create(superCtor.prototype, {             // 7
      constructor: {                                                  // 8
        value: ctor,                                                  // 9
        enumerable: false,                                            // 10
        writable: true,                                               // 11
        configurable: true                                            // 12
      }                                                               // 13
    });                                                               // 14
  };                                                                  // 15
} else {                                                              // 16
  // old school shim for old browsers                                 // 17
  Util.inherits = function (ctor, superCtor) {                        // 18
    ctor.super_ = superCtor                                           // 19
    var TempCtor = function () {}                                     // 20
    TempCtor.prototype = superCtor.prototype                          // 21
    ctor.prototype = new TempCtor()                                   // 22
    ctor.prototype.constructor = ctor                                 // 23
  }                                                                   // 24
}                                                                     // 25
                                                                      // 26
////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorspark:util'] = {
  Util: Util
};

})();
