(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Inject = Package['meteorhacks:inject-initial'].Inject;

/* Package-scope variables */
var Zones, Inject;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/meteorhacks:zones/server/inject.js                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var format = Npm.require('util').format;                                                       // 1
                                                                                               // 2
// only Meteor < 0.9 has this tyoe of naming for packages                                      // 3
if(Package['inject-initial']) {                                                                // 4
  Inject = Package['inject-initial'].Inject;                                                   // 5
  var packageName = 'zones';                                                                   // 6
} else {                                                                                       // 7
  // for Meteor 0.9 +                                                                          // 8
  Inject = Package['meteorhacks:inject-initial'].Inject;                                       // 9
                                                                                               // 10
  // this is a trick to idnentify the test environment                                         // 11
  // need to set this env var before running tests                                             // 12
  if(process.env['METEOR_ENV'] == 'test') {                                                    // 13
    var packageName = 'local-test_meteorhacks_zones';                                          // 14
  } else {                                                                                     // 15
    var packageName = 'meteorhacks_zones';                                                     // 16
  }                                                                                            // 17
}                                                                                              // 18
                                                                                               // 19
var fileList = [                                                                               // 20
  'utils.js', 'before.js', 'zone.js', 'tracer.js',                                             // 21
  'after.js', 'reporters.js'                                                                   // 22
];                                                                                             // 23
                                                                                               // 24
var cacheAvoider = (new Date).getTime();                                                       // 25
var finalHtml = '';                                                                            // 26
fileList.forEach(function(file) {                                                              // 27
  var template = '<script type="text/javascript" src="/packages/%s/assets/%s?%s"></script>\n'; // 28
  finalHtml += format(template, packageName, file, cacheAvoider);                              // 29
});                                                                                            // 30
                                                                                               // 31
Zones = {                                                                                      // 32
  html: finalHtml,                                                                             // 33
  enabled: true,                                                                               // 34
};                                                                                             // 35
                                                                                               // 36
Zones.enable = function () {                                                                   // 37
  Zones.enabled = true;                                                                        // 38
};                                                                                             // 39
                                                                                               // 40
Zones.disable = function () {                                                                  // 41
  Zones.enabled = false;                                                                       // 42
};                                                                                             // 43
                                                                                               // 44
Inject.rawHead('zones', function () {                                                          // 45
  return Zones.enabled ? Zones.html : '';                                                      // 46
});                                                                                            // 47
                                                                                               // 48
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:zones'] = {
  Zones: Zones
};

})();

//# sourceMappingURL=meteorhacks_zones.js.map
