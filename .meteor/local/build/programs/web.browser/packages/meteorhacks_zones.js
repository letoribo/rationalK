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
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package.templating.Template;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Session = Package.session.Session;
var DDP = Package.ddp.DDP;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var HTML = Package.htmljs.HTML;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteorhacks:zones/client/hijack.js                                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
// Hijack only if zone is available                                                                              // 1
if(!window.Zone || !window.Zone.inited) {                                                                        // 2
  return;                                                                                                        // 3
}                                                                                                                // 4
                                                                                                                 // 5
// some EnvironmentVariables to optimize tracking                                                                // 6
// see /assests/utils.js                                                                                         // 7
Zone.fromCall = new Meteor.EnvironmentVariable();                                                                // 8
Zone.fromObserve = new Meteor.EnvironmentVariable();                                                             // 9
Zone.notFromForEach = new Meteor.EnvironmentVariable();                                                          // 10
                                                                                                                 // 11
var ConnectionProto = getConnectionProto();                                                                      // 12
                                                                                                                 // 13
/*                                                                                                               // 14
 * Hijack method calls                                                                                           // 15
 */                                                                                                              // 16
ConnectionProto.apply = hijackConnection(                                                                        // 17
  ConnectionProto.apply,                                                                                         // 18
  'Connection.apply'                                                                                             // 19
);                                                                                                               // 20
                                                                                                                 // 21
/**                                                                                                              // 22
 * For better stackTraces                                                                                        // 23
 */                                                                                                              // 24
Meteor.call = hijackConnection(Meteor.call, 'Meteor.call');                                                      // 25
                                                                                                                 // 26
/*                                                                                                               // 27
 * Hijack DDP subscribe method                                                                                   // 28
 * Used when connecting to external DDP servers                                                                  // 29
 */                                                                                                              // 30
ConnectionProto.subscribe = hijackSubscribe(                                                                     // 31
  ConnectionProto.subscribe,                                                                                     // 32
  'Connection.subscribe'                                                                                         // 33
);                                                                                                               // 34
                                                                                                                 // 35
/**                                                                                                              // 36
 * Hijack Meteor.subscribe because Meteor.subscribe binds to                                                     // 37
 * Connection.subscribe before the hijack                                                                        // 38
 */                                                                                                              // 39
Meteor.subscribe = hijackSubscribe(Meteor.subscribe, 'Meteor.subscribe');                                        // 40
                                                                                                                 // 41
hijackCursor(LocalCollection.Cursor.prototype);                                                                  // 42
                                                                                                                 // 43
/**                                                                                                              // 44
 * Hijack Template.prototype.events() to add useful owner info to zone object                                    // 45
 * Use UI.Component.events for older versions of Meteor                                                          // 46
 * e.g. {type: 'templateEvent', event: 'click .selector', template: 'home'}                                      // 47
 */                                                                                                              // 48
if(Template.prototype) {                                                                                         // 49
  Template.prototype.events = hijackComponentEvents(Template.prototype.events);                                  // 50
} else if (UI.Component) {                                                                                       // 51
  UI.Component.events = hijackComponentEvents(UI.Component.events);                                              // 52
}                                                                                                                // 53
                                                                                                                 // 54
/**                                                                                                              // 55
 * Hijack global template helpers using `UI.registerHelper`                                                      // 56
 */                                                                                                              // 57
hijackGlobalHelpers(UI._globalHelpers);                                                                          // 58
UI.registerHelper = hijackNewGlobalHelpers(UI.registerHelper);                                                   // 59
                                                                                                                 // 60
/**                                                                                                              // 61
 * Hijack each templates rendered handler to add template name to owner info                                     // 62
 */                                                                                                              // 63
var CoreTemplates = ['prototype', '__body__', '__dynamic', '__dynamicWithDataContext', '__IronDefaultLayout__']; // 64
Meteor.startup(function () {                                                                                     // 65
  _(Template).each(function (template, name) {                                                                   // 66
    if(typeof template === 'object') {                                                                           // 67
      // hijack template helpers including 'rendered'                                                            // 68
      if(_.indexOf(CoreTemplates, name) === -1) {                                                                // 69
        hijackTemplateHelpers(template, name);                                                                   // 70
        template.helpers = hijackNewTemplateHelpers(template.helpers, name);                                     // 71
      }                                                                                                          // 72
    }                                                                                                            // 73
  });                                                                                                            // 74
});                                                                                                              // 75
                                                                                                                 // 76
/**                                                                                                              // 77
 * Hijack Session.set to add events                                                                              // 78
 */                                                                                                              // 79
Session.set = hijackSessionSet(Session.set, 'Session.set');                                                      // 80
                                                                                                                 // 81
/**                                                                                                              // 82
 * Hijack Deps.autorun to set correct zone owner type                                                            // 83
 * Otherwise these will be setTimeout                                                                            // 84
 */                                                                                                              // 85
Deps.flush = hijackDepsFlush(Deps.flush, 'Deps.flush');                                                          // 86
                                                                                                                 // 87
//--------------------------------------------------------------------------\\
                                                                                                                 // 89
function getConnectionProto() {                                                                                  // 90
  var con = DDP.connect(getCurrentUrlOrigin());                                                                  // 91
  con.disconnect();                                                                                              // 92
  var proto = con.constructor.prototype;                                                                         // 93
  return proto;                                                                                                  // 94
}                                                                                                                // 95
                                                                                                                 // 96
function getCurrentUrlOrigin() {                                                                                 // 97
  // Internet Explorer doesn't have window.location.origin                                                       // 98
  return window.location.origin || window.location.protocol                                                      // 99
  + window.location.hostname                                                                                     // 100
  + window.location.port;                                                                                        // 101
}                                                                                                                // 102
                                                                                                                 // 103
// we've a better error handling support with zones                                                              // 104
// Meteor._debug will prevent it (specially inside deps)                                                         // 105
// So we are killing Meteor._debug                                                                               // 106
var originalMeteorDebug = Meteor._debug;                                                                         // 107
Meteor._debug = function(message, stack) {                                                                       // 108
  var err = new Error(message);                                                                                  // 109
  err.stack = (stack instanceof Error)? stack.stack: stack;                                                      // 110
  if(zone) {                                                                                                     // 111
    zone.onError(err);                                                                                           // 112
  } else {                                                                                                       // 113
    originalMeteorDebug(message, stack);                                                                         // 114
  }                                                                                                              // 115
};                                                                                                               // 116
                                                                                                                 // 117
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:zones'] = {};

})();
