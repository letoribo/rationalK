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
var FS = Package['cfs:base-package'].FS;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var check = Package.check.check;
var Match = Package.check.Match;
var DDP = Package.ddp.DDP;
var EJSON = Package.ejson.EJSON;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var _storageAdapters;

(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/cfs:storage-adapter/storageAdapter.client.js                         //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
/* global FS, _storageAdapters:true, EventEmitter */                             // 1
                                                                                 // 2
// ############################################################################# // 3
//                                                                               // 4
// STORAGE ADAPTER                                                               // 5
//                                                                               // 6
// ############################################################################# // 7
                                                                                 // 8
_storageAdapters = {};                                                           // 9
                                                                                 // 10
FS.StorageAdapter = function(name, options, api) {                               // 11
  var self = this;                                                               // 12
                                                                                 // 13
  // Check the api                                                               // 14
  if (typeof api === 'undefined') {                                              // 15
    throw new Error('FS.StorageAdapter please define an api');                   // 16
  }                                                                              // 17
                                                                                 // 18
  // store reference for easy lookup by name                                     // 19
  if (typeof _storageAdapters[name] !== 'undefined') {                           // 20
    throw new Error('Storage name already exists: "' + name + '"');              // 21
  } else {                                                                       // 22
    _storageAdapters[name] = self;                                               // 23
  }                                                                              // 24
                                                                                 // 25
  // extend self with options and other info                                     // 26
  FS.Utility.extend(this, options || {}, {                                       // 27
    name: name                                                                   // 28
  });                                                                            // 29
                                                                                 // 30
  // XXX: TODO, add upload feature here...                                       // 31
  // we default to ddp upload but really let the SA like S3Cloud overwrite to    // 32
  // implement direct client to s3 upload                                        // 33
                                                                                 // 34
};                                                                               // 35
                                                                                 // 36
FS.StorageAdapter.prototype = new EventEmitter();                                // 37
                                                                                 // 38
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:storage-adapter'] = {};

})();
