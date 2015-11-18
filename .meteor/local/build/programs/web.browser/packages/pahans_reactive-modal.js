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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var ReactiveModal, result, EV;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/pahans:reactive-modal/lib/template.reactive-modal.js                       //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
                                                                                       // 1
Template.__checkName("_reactiveModal");                                                // 2
Template["_reactiveModal"] = new Template("Template._reactiveModal", (function() {     // 3
  var view = this;                                                                     // 4
  return HTML.DIV({                                                                    // 5
    "class": "modal fade",                                                             // 6
    id: function() {                                                                   // 7
      return Spacebars.mustache(view.lookup("key"));                                   // 8
    },                                                                                 // 9
    tabindex: "-1",                                                                    // 10
    role: "dialog",                                                                    // 11
    "aria-labelledby": function() {                                                    // 12
      return [ Spacebars.mustache(view.lookup("key")), "Label" ];                      // 13
    },                                                                                 // 14
    "aria-hidden": "true"                                                              // 15
  }, "\n    ", HTML.DIV({                                                              // 16
    "class": function() {                                                              // 17
      return [ "modal-dialog ", Spacebars.mustache(view.lookup("modalDialogClass")) ]; // 18
    }                                                                                  // 19
  }, "\n      ", HTML.DIV({                                                            // 20
    "class": "modal-content"                                                           // 21
  }, "\n        ", HTML.DIV({                                                          // 22
    "class": "modal-header"                                                            // 23
  }, "\n          ", HTML.Raw('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'), "\n          ", HTML.H4({
    "class": "modal-title",                                                            // 25
    id: function() {                                                                   // 26
      return [ Spacebars.mustache(view.lookup("key")), "Label" ];                      // 27
    }                                                                                  // 28
  }, Blaze.View(function() {                                                           // 29
    return Spacebars.mustache(view.lookup("title"));                                   // 30
  })), "\n        "), "\n        ", HTML.DIV({                                         // 31
    "class": function() {                                                              // 32
      return [ "modal-body ", Spacebars.mustache(view.lookup("modalBodyClass")) ];     // 33
    }                                                                                  // 34
  }, "\n          ", HTML.Raw("<!-- strange: {{> template}} works fine, but with the data context, template is searched inside the data context (the second variable) -->"), "\n          ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("doc"));                                         // 36
  }, function() {                                                                      // 37
    return Spacebars.include(function() {                                              // 38
      return Spacebars.call(Spacebars.dot(view.lookup(".."), "template"));             // 39
    });                                                                                // 40
  }), "\n        "), "\n        ", HTML.DIV({                                          // 41
    "class": function() {                                                              // 42
      return [ "modal-footer ", Spacebars.mustache(view.lookup("modalFooterClass")) ]; // 43
    }                                                                                  // 44
  }, "\n          ", Blaze.Each(function() {                                           // 45
    return Spacebars.dataMustache(view.lookup("arrayify"), view.lookup("buttons"));    // 46
  }, function() {                                                                      // 47
    return [ "\n            ", HTML.BUTTON(HTML.Attrs({                                // 48
      type: "button",                                                                  // 49
      id: function() {                                                                 // 50
        return Spacebars.mustache(Spacebars.dot(view.lookup("button"), "id"));         // 51
      },                                                                               // 52
      "class": function() {                                                            // 53
        return [ "btn ", Spacebars.mustache(Spacebars.dot(view.lookup("button"), "class")), " ", Spacebars.mustache(view.lookup("name")), " reactive-modal-btn" ];
      },                                                                               // 55
      "data-dismiss": function() {                                                     // 56
        return Spacebars.mustache(view.lookup("dismiss"));                             // 57
      }                                                                                // 58
    }, function() {                                                                    // 59
      return Spacebars.attrMustache(view.lookup("disabled"));                          // 60
    }), Blaze.View(function() {                                                        // 61
      return Spacebars.mustache(Spacebars.dot(view.lookup("button"), "label"));        // 62
    })), "\n          " ];                                                             // 63
  }), "\n        "), "\n      "), "\n    "), "\n  ");                                  // 64
}));                                                                                   // 65
                                                                                       // 66
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/pahans:reactive-modal/lib/reactive-modal.js                                //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var _modals = {};                                                                      // 1
ReactiveModal = function(){                                                            // 2
  // EV.call(this);                                                                    // 3
  this.buttons = {};                                                                   // 4
};                                                                                     // 5
// _.extend(ReactiveModal.prototype, EV.prototype);                                    // 6
Template._reactiveModal.helpers({                                                      // 7
  class: function(){                                                                   // 8
    var att;                                                                           // 9
    if(this.class){                                                                    // 10
      att = 'btn ' + this.class;                                                       // 11
    }                                                                                  // 12
    return att;                                                                        // 13
  },                                                                                   // 14
  disabled: function(){                                                                // 15
    if (this.button.disabled.get()) {                                                  // 16
      return "disabled"                                                                // 17
    } else {                                                                           // 18
      return null;                                                                     // 19
    }                                                                                  // 20
  },                                                                                   // 21
  dismiss: function(){                                                                 // 22
    if(this.button.closeModalOnClick){                                                 // 23
      return "modal";                                                                  // 24
    }                                                                                  // 25
  },                                                                                   // 26
  arrayify: function(obj){                                                             // 27
    result = [];                                                                       // 28
    for (var key in obj) result.push({name:key,button:obj[key]});                      // 29
    return result;                                                                     // 30
  }                                                                                    // 31
});                                                                                    // 32
                                                                                       // 33
Template._reactiveModal.events({                                                       // 34
  'click .modal-footer .reactive-modal-btn.btn': function(e){                          // 35
    this.button.emit('click', this.button);                                            // 36
  }                                                                                    // 37
});                                                                                    // 38
                                                                                       // 39
ReactiveModal.initDialog = function (info){                                            // 40
  var key = "rm-"+Meteor.uuid();                                                       // 41
  if(!info || !info.template){                                                         // 42
    console.error("you must define a template for " , key);                            // 43
  } else {                                                                             // 44
    info.key = key;                                                                    // 45
    _modals[key] = info;                                                               // 46
                                                                                       // 47
    for(var button in info.buttons){                                                   // 48
      var newButton = _.clone(info.buttons[button]);                                   // 49
      _.extend(newButton, new EV());                                                   // 50
      info.buttons[button] = newButton;                                                // 51
      newButton.closeModalOnClick = (info.buttons[button].closeModalOnClick === undefined || info.buttons[button].closeModalOnClick === true) ? true : false;
      newButton.disabled = new ReactiveVar((info.buttons[button].disabled === undefined || info.buttons[button].disabled === false) ? false : true);
      newButton.disable =  function () {newButton.disabled.set(true);},                // 54
      newButton.enable = function () {newButton.disabled.set(false);}                  // 55
    };                                                                                 // 56
                                                                                       // 57
    Blaze.renderWithData(Template._reactiveModal, info, document.body);                // 58
  }                                                                                    // 59
                                                                                       // 60
  var modalTarget = $('#' + key);                                                      // 61
  info.show = function(){                                                              // 62
    modalTarget.modal('show');                                                         // 63
  }                                                                                    // 64
  info.hide = function(){                                                              // 65
    modalTarget.modal('hide');                                                         // 66
  }                                                                                    // 67
                                                                                       // 68
  if (info.removeOnHide) {                                                             // 69
    modalTarget.on('hidden.bs.modal', function() {                                     // 70
      $(this).remove();                                                                // 71
    });                                                                                // 72
  }                                                                                    // 73
                                                                                       // 74
  info.modalTarget = modalTarget;                                                      // 75
  return info;                                                                         // 76
};                                                                                     // 77
                                                                                       // 78
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/pahans:reactive-modal/lib/ev.js                                            //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
EV = function() {                                                                      // 1
  this._evHandlers = {};                                                               // 2
}                                                                                      // 3
                                                                                       // 4
EV.prototype.emit = function emit(event) {                                             // 5
  var args = Array.prototype.slice.call(arguments, 1);                                 // 6
  var emitted = false;                                                                 // 7
                                                                                       // 8
  if(this._evHandlers[event]) {                                                        // 9
    var events = _.clone(this._evHandlers[event]);                                     // 10
    for(var lc=0; lc<events.length; lc++) {                                            // 11
      var handler = events[lc];                                                        // 12
      handler.apply(this, args);                                                       // 13
      emitted = true;                                                                  // 14
    }                                                                                  // 15
  }                                                                                    // 16
                                                                                       // 17
  if(event == 'error' && !emitted) {                                                   // 18
    throw args[0];                                                                     // 19
  }                                                                                    // 20
  return this;                                                                         // 21
};                                                                                     // 22
                                                                                       // 23
EV.prototype.on = function on(event, callback) {                                       // 24
  if(!this._evHandlers[event]) {                                                       // 25
    this._evHandlers[event] = [];                                                      // 26
  }                                                                                    // 27
  this._evHandlers[event].push(callback);                                              // 28
  return this;                                                                         // 29
};                                                                                     // 30
                                                                                       // 31
EV.prototype.once = function once(event, callback) {                                   // 32
  this.on(event, function onetimeCallback() {                                          // 33
    callback.apply(this, arguments);                                                   // 34
    this.removeListener(event, onetimeCallback);                                       // 35
  });                                                                                  // 36
  return this;                                                                         // 37
};                                                                                     // 38
                                                                                       // 39
EV.prototype.removeListener = function removeListener(event, callback) {               // 40
  if(this._evHandlers[event]) {                                                        // 41
    var index = this._evHandlers[event].indexOf(callback);                             // 42
    var removed = this._evHandlers[event].splice(index, 1);                            // 43
  }                                                                                    // 44
  return this;                                                                         // 45
};                                                                                     // 46
                                                                                       // 47
EV.prototype.removeAllListeners = function removeAllListeners(event) {                 // 48
  this._evHandlers[event] = undefined;                                                 // 49
  return this;                                                                         // 50
};                                                                                     // 51
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['pahans:reactive-modal'] = {
  ReactiveModal: ReactiveModal
};

})();
