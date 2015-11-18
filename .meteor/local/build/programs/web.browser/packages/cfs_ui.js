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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package.templating.Template;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Helpers;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/cfs:ui/template.ui.js                                                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
                                                                                                          // 1
Template.__checkName("_fs_DeleteButton");                                                                 // 2
Template["_fs_DeleteButton"] = new Template("Template._fs_DeleteButton", (function() {                    // 3
  var view = this;                                                                                        // 4
  return Blaze._TemplateWith(function() {                                                                 // 5
    return {                                                                                              // 6
      atts: Spacebars.call(view.lookup(".")),                                                             // 7
      fileObj: Spacebars.call(view.lookup("..")),                                                         // 8
      contentBlock: Spacebars.call(view.templateContentBlock)                                             // 9
    };                                                                                                    // 10
  }, function() {                                                                                         // 11
    return Spacebars.include(view.lookupTemplate("_fs_DeleteButton2"));                                   // 12
  });                                                                                                     // 13
}));                                                                                                      // 14
                                                                                                          // 15
Template.__checkName("_fs_DeleteButton2");                                                                // 16
Template["_fs_DeleteButton2"] = new Template("Template._fs_DeleteButton2", (function() {                  // 17
  var view = this;                                                                                        // 18
  return HTML.BUTTON(HTML.Attrs({                                                                         // 19
    type: "button"                                                                                        // 20
  }, function() {                                                                                         // 21
    return Spacebars.attrMustache(view.lookup("atts"));                                                   // 22
  }), Spacebars.With(function() {                                                                         // 23
    return Spacebars.call(view.lookup("contentBlock"));                                                   // 24
  }, function() {                                                                                         // 25
    return Spacebars.include(view.lookupTemplate("."));                                                   // 26
  }, function() {                                                                                         // 27
    return "Delete";                                                                                      // 28
  }));                                                                                                    // 29
}));                                                                                                      // 30
                                                                                                          // 31
Template.__checkName("_fs_UploadProgressBar");                                                            // 32
Template["_fs_UploadProgressBar"] = new Template("Template._fs_UploadProgressBar", (function() {          // 33
  var view = this;                                                                                        // 34
  return Spacebars.With(function() {                                                                      // 35
    return Spacebars.dataMustache(view.lookup("getAttsAndFileObj"), view.lookup("."), view.lookup("..")); // 36
  }, function() {                                                                                         // 37
    return [ "\n  ", Blaze.If(function() {                                                                // 38
      return Spacebars.call(Spacebars.dot(view.lookup("."), "useBootstrap"));                             // 39
    }, function() {                                                                                       // 40
      return [ "\n  ", HTML.DIV({                                                                         // 41
        "class": "progress"                                                                               // 42
      }, "\n  	", HTML.DIV(HTML.Attrs(function() {                                                        // 43
        return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                           // 44
      }), "\n        ", Blaze.If(function() {                                                             // 45
        return Spacebars.call(Spacebars.dot(view.lookup("."), "showPercent"));                            // 46
      }, function() {                                                                                     // 47
        return [ "\n        ", Blaze.View(function() {                                                    // 48
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 49
        }), "%\n        " ];                                                                              // 50
      }, function() {                                                                                     // 51
        return [ "\n	    ", HTML.SPAN({                                                                   // 52
          "class": "sr-only"                                                                              // 53
        }, Blaze.View(function() {                                                                        // 54
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 55
        }), "% Complete"), "\n        " ];                                                                // 56
      }), "\n    "), "\n  "), "\n  " ];                                                                   // 57
    }, function() {                                                                                       // 58
      return [ "\n  ", Blaze.If(function() {                                                              // 59
        return Spacebars.call(Spacebars.dot(view.lookup("."), "useSemantic"));                            // 60
      }, function() {                                                                                     // 61
        return [ "\n  ", HTML.DIV(HTML.Attrs(function() {                                                 // 62
          return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                         // 63
        }), "\n    ", HTML.DIV({                                                                          // 64
          "class": "bar",                                                                                 // 65
          style: function() {                                                                             // 66
            return [ "width: ", Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress")), "%" ];   // 67
          }                                                                                               // 68
        }), "\n  "), "\n  " ];                                                                            // 69
      }, function() {                                                                                     // 70
        return [ "\n  ", HTML.PROGRESS(HTML.Attrs({                                                       // 71
          value: function() {                                                                             // 72
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                       // 73
          },                                                                                              // 74
          max: "100"                                                                                      // 75
        }, function() {                                                                                   // 76
          return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                         // 77
        }), Blaze.View(function() {                                                                       // 78
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 79
        }), "%"), "\n  " ];                                                                               // 80
      }), "\n  " ];                                                                                       // 81
    }), "\n  " ];                                                                                         // 82
  });                                                                                                     // 83
}));                                                                                                      // 84
                                                                                                          // 85
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/cfs:ui/ui.js                                                                                  //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
/* global Helpers:true */                                                                                 // 1
/* global Template */                                                                                     // 2
/* global FS */                                                                                           // 3
                                                                                                          // 4
Helpers = {};                                                                                             // 5
                                                                                                          // 6
// We expose the properties of Helpers on `FS` globally                                                   // 7
Template.registerHelper('FS', Helpers);                                                                   // 8
                                                                                                          // 9
// Usage: {{#with FS.GetFile collectionName id}}{{/with}}                                                 // 10
Helpers.GetFile = function cfsGetFile(collectionName, id) {                                               // 11
  var collection = FS._collections[collectionName];                                                       // 12
  return collection ? collection.findOne(id) : null;                                                      // 13
};                                                                                                        // 14
                                                                                                          // 15
// Usage: {{> FS.DeleteButton}} or {{#FS.DeleteButton}}Button Text{{/FS.DeleteButton}} (with FS.File as current context)
// Supported Options: any attribute                                                                       // 17
Helpers.DeleteButton = Template._fs_DeleteButton;                                                         // 18
                                                                                                          // 19
Template._fs_DeleteButton2.events({                                                                       // 20
  'click button': function(event, template) {                                                             // 21
    var fileObj = template.data.fileObj;                                                                  // 22
    if (!fileObj) {                                                                                       // 23
      return false;                                                                                       // 24
    }                                                                                                     // 25
    fileObj.remove();                                                                                     // 26
    return false;                                                                                         // 27
  }                                                                                                       // 28
});                                                                                                       // 29
                                                                                                          // 30
// Usage: {{> FS.UploadProgressBar attribute=value}} (with FS.File as current context or not for overall) // 31
Helpers.UploadProgressBar = Template._fs_UploadProgressBar;                                               // 32
                                                                                                          // 33
Template._fs_UploadProgressBar.helpers({                                                                  // 34
  getAttsAndFileObj: function getAttsAndFileObj(atts, fileObj) {                                          // 35
    if (atts instanceof FS.File) {                                                                        // 36
      fileObj = atts;                                                                                     // 37
      atts = {};                                                                                          // 38
    } else {                                                                                              // 39
      atts = atts || {};                                                                                  // 40
    }                                                                                                     // 41
                                                                                                          // 42
    var progressFunc;                                                                                     // 43
    if (fileObj instanceof FS.File) {                                                                     // 44
      progressFunc = function () {                                                                        // 45
        return fileObj.uploadProgress();                                                                  // 46
      };                                                                                                  // 47
    } else {                                                                                              // 48
      progressFunc = function () {                                                                        // 49
        return FS.HTTP.uploadQueue.progress();                                                            // 50
      };                                                                                                  // 51
    }                                                                                                     // 52
                                                                                                          // 53
    // We clone atts so that we can remove bootstrap or semantic props without losing them for            // 54
    // later reactive reruns.                                                                             // 55
    atts = FS.Utility.extend({}, atts);                                                                   // 56
                                                                                                          // 57
    var useBootstrap = false, useSemantic = false, show_percentage = false;                               // 58
    if (atts.semantic) {                                                                                  // 59
      useSemantic = true;                                                                                 // 60
      if (typeof atts["class"] === "string") {                                                            // 61
        atts["class"] += " ui progress";                                                                  // 62
      } else {                                                                                            // 63
        atts["class"] = "ui progress";                                                                    // 64
      }                                                                                                   // 65
      delete atts.semantic;                                                                               // 66
    } else if (atts.bootstrap) {                                                                          // 67
      useBootstrap = true;                                                                                // 68
      var progress = progressFunc();                                                                      // 69
      if (typeof atts["class"] === "string") {                                                            // 70
        atts["class"] += " progress-bar";                                                                 // 71
      } else {                                                                                            // 72
        atts["class"] = "progress-bar";                                                                   // 73
      }                                                                                                   // 74
      if (typeof atts.style === "string") {                                                               // 75
        atts.style += " width: " + progress + "%;";                                                       // 76
      } else {                                                                                            // 77
        atts.style = "width: " + progress + "%;";                                                         // 78
      }                                                                                                   // 79
      if (atts.showPercent) show_percentage = true;                                                       // 80
      atts.role = "progressbar";                                                                          // 81
      atts["aria-valuenow"] = ''+progress;                                                                // 82
      atts["aria-valuemin"] = "0";                                                                        // 83
      atts["aria-valuemax"] = "100";                                                                      // 84
      delete atts.bootstrap;                                                                              // 85
    }                                                                                                     // 86
                                                                                                          // 87
    return {                                                                                              // 88
      progress: progressFunc,                                                                             // 89
      atts: atts,                                                                                         // 90
      showPercent : show_percentage,                                                                      // 91
      useBootstrap: useBootstrap,                                                                         // 92
      useSemantic: useSemantic                                                                            // 93
    };                                                                                                    // 94
  }                                                                                                       // 95
});                                                                                                       // 96
                                                                                                          // 97
FS.EventHandlers = {};                                                                                    // 98
                                                                                                          // 99
// Simplifies some of the repetitive code for making an event handler that does a file insert             // 100
FS.EventHandlers.insertFiles = function cfsInsertFiles(collection, options) {                             // 101
  options = options || {};                                                                                // 102
  var afterCallback = options.after;                                                                      // 103
  var metadataCallback = options.metadata;                                                                // 104
                                                                                                          // 105
  function insertFilesHandler(event) {                                                                    // 106
    FS.Utility.eachFile(event, function (file) {                                                          // 107
      var f = new FS.File(file);                                                                          // 108
      if (metadataCallback) {                                                                             // 109
        FS.Utility.extend(f, metadataCallback(f));                                                        // 110
      }                                                                                                   // 111
      collection.insert(f, afterCallback);                                                                // 112
    });                                                                                                   // 113
  }                                                                                                       // 114
                                                                                                          // 115
  return insertFilesHandler;                                                                              // 116
};                                                                                                        // 117
                                                                                                          // 118
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:ui'] = {};

})();
