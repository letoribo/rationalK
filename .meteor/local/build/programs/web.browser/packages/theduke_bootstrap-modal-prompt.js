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
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var BootstrapModalPrompt;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/theduke:bootstrap-modal-prompt/prompt.js                                                     //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
BootstrapModalPrompt = {                                                                                 // 1
                                                                                                         // 2
  /*                                                                                                     // 3
   * Expected format of options:                                                                         // 4
   * {                                                                                                   // 5
   *   title: 'Modal Title',                                                                             // 6
   *   content: 'Text content for modal',                                                                // 7
   *   template: 'templateWithContentName',                                                              // 8
   *   templateData: {},                                                                                 // 9
   *   btnDismissText: 'Close',                                                                          // 10
   *   btnOkText: 'OK',                                                                                  // 11
   *   onShown: function() {} // callback function.                                                      // 12
   * }                                                                                                   // 13
   */                                                                                                    // 14
  prompt: function(options, callback) {                                                                  // 15
    options = _.extend({                                                                                 // 16
      title: 'Confirmation',                                                                             // 17
      content: '',                                                                                       // 18
      template: null,                                                                                    // 19
      templateData: {},                                                                                  // 20
                                                                                                         // 21
      formSchema: null,                                                                                  // 22
                                                                                                         // 23
      btnDismissText: 'Close',                                                                           // 24
      btnOkText: 'OK',                                                                                   // 25
                                                                                                         // 26
      // Callback called before the modal is shown.                                                      // 27
      // Arguments are the passed initial options, and the modal DOM node.                               // 28
      beforeShow: function(options, node) {                                                              // 29
                                                                                                         // 30
      },                                                                                                 // 31
      // Called after the modal is shown and all transitions have been completed.                        // 32
      // Arguments are the passed initial options, and the modal DOM node.                               // 33
      afterShow: function(options, node) {                                                               // 34
                                                                                                         // 35
      },                                                                                                 // 36
                                                                                                         // 37
      // Callback called before the modal is hidden.                                                     // 38
      // Arguments are the passed initial options, and the modal DOM node.                               // 39
      beforeHide: function(options, node) {                                                              // 40
                                                                                                         // 41
      },                                                                                                 // 42
                                                                                                         // 43
      // Callback called after the modal has been hidden and all transitions have completed.             // 44
      // Arguments are the passed initial options, and the modal DOM node.                               // 45
      afterHide: function(options, node) {                                                               // 46
                                                                                                         // 47
      },                                                                                                 // 48
                                                                                                         // 49
      // Called when the users clicks on the confirm button.                                             // 50
      // If the function returns false, the confirm will be ABORTED.                                     // 51
      // Otherwise the modal will be closed and the regular callback is called with the result.          // 52
      // Arguments are the passed initial options, and the modal DOM node.                               // 53
      onConfirm: function(options, node) {                                                               // 54
        // return false; // Aborts closing of modal!                                                     // 55
      }                                                                                                  // 56
    }, options);                                                                                         // 57
                                                                                                         // 58
    var modalWrap = $('.bs-prompt-modal');                                                               // 59
    if (!modalWrap.size()) {                                                                             // 60
      modalWrap = this.createModal();                                                                    // 61
    }                                                                                                    // 62
                                                                                                         // 63
    var modal = modalWrap.find('.modal');                                                                // 64
                                                                                                         // 65
    modal.find('.modal-title').html(options.title);                                                      // 66
                                                                                                         // 67
    // Reset body.                                                                                       // 68
    var body = modal.find('.modal-body').html('');                                                       // 69
                                                                                                         // 70
    // Function to be called when confirmed.                                                             // 71
    // Defined up here so it can be used in AutoForm submit hook.                                        // 72
    function onConfirm(data) {                                                                           // 73
      if (options.onConfirm) {                                                                           // 74
        var flag = options.onConfirm(options, modal.get(0), data);                                       // 75
        if (flag === false) {                                                                            // 76
          return false;                                                                                  // 77
        }                                                                                                // 78
      }                                                                                                  // 79
                                                                                                         // 80
      if (options.beforeHide) {                                                                          // 81
        options.beforeHide(options, modal.get(0), data);                                                 // 82
      }                                                                                                  // 83
                                                                                                         // 84
      modal.modal('hide');                                                                               // 85
      callback(data ? data : true);                                                                      // 86
    }                                                                                                    // 87
                                                                                                         // 88
    var content = options.content;                                                                       // 89
    if (options.template) {                                                                              // 90
      // Render the given template with the specified data and insert it                                 // 91
      // to the modal-body directly.                                                                     // 92
      Blaze.renderWithData(                                                                              // 93
        options.template,                                                                                // 94
        options.templateData,                                                                            // 95
        body.get(0)                                                                                      // 96
      );                                                                                                 // 97
    }                                                                                                    // 98
    else if (options.formSchema) {                                                                       // 99
      // Render the form using the autoform quickForm template.                                          // 100
      Blaze.renderWithData(                                                                              // 101
        Template.quickForm,                                                                              // 102
        {schema: options.formSchema, id: 'bootstrapModalPromptForm'},                                    // 103
        body.get(0)                                                                                      // 104
      );                                                                                                 // 105
                                                                                                         // 106
      // Note the important second parameter true for replacing hooks.                                   // 107
      AutoForm.addHooks('bootstrapModalPromptForm', {                                                    // 108
        onSubmit: function (insertDoc, updateDoc, currentDoc) {                                          // 109
          onConfirm(insertDoc);                                                                          // 110
          return false;                                                                                  // 111
        }                                                                                                // 112
      }, true);                                                                                          // 113
    }                                                                                                    // 114
    else {                                                                                               // 115
      modal.find('.modal-body').html(content);                                                           // 116
    }                                                                                                    // 117
                                                                                                         // 118
    modal.find('.modal-btn-dismiss').html(options.btnDismissText);                                       // 119
    modal.find('.modal-btn-save').html(options.btnOkText);                                               // 120
                                                                                                         // 121
    modal.on('shown.bs.modal', function() {                                                              // 122
      if (options.afterShow) {                                                                           // 123
        options.afterShow(options, modal.get(0));                                                        // 124
      }                                                                                                  // 125
    });                                                                                                  // 126
    modal.on('hidden.bs.modal', function() {                                                             // 127
      if (options.afterHide) {                                                                           // 128
        options.afterHide(options, modal.get(0));                                                        // 129
      }                                                                                                  // 130
    });                                                                                                  // 131
                                                                                                         // 132
    if (options.beforeShow) {                                                                            // 133
      options.beforeShow(options, modal.get(0));                                                         // 134
    }                                                                                                    // 135
                                                                                                         // 136
    modal.find('.modal-btn-dismiss').off().click(function(){                                             // 137
      if (options.beforeHide) {                                                                          // 138
        options.beforeHide(options, modal.get(0));                                                       // 139
      }                                                                                                  // 140
                                                                                                         // 141
      modal.modal('hide');                                                                               // 142
      callback(false);                                                                                   // 143
                                                                                                         // 144
      return false;                                                                                      // 145
    });                                                                                                  // 146
                                                                                                         // 147
                                                                                                         // 148
                                                                                                         // 149
    modal.find('.modal-btn-confirm').off().click(function() {                                            // 150
      if (options.formSchema) {                                                                          // 151
        modal.find('form').submit();                                                                     // 152
      }                                                                                                  // 153
      else {                                                                                             // 154
        onConfirm();                                                                                     // 155
      }                                                                                                  // 156
                                                                                                         // 157
      return false;                                                                                      // 158
    });                                                                                                  // 159
                                                                                                         // 160
    modal.modal('show');                                                                                 // 161
  },                                                                                                     // 162
                                                                                                         // 163
  createModal: function() {                                                                              // 164
    var tpl = '<div class="bs-prompt-modal">' +                                                          // 165
                '<div class="modal fade"><div class="modal-dialog"><div class="modal-content">' +        // 166
                  '<div class="modal-header">' +                                                         // 167
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title"></h4>' +                                                    // 169
                  '</div>' +                                                                             // 170
                  '<div class="modal-body">' +                                                           // 171
                                                                                                         // 172
                  '</div>' +                                                                             // 173
                  '<div class="modal-footer">' +                                                         // 174
                    '<button type="button" class="btn btn-default modal-btn-dismiss" >Close</button>' +  // 175
                    '<button type="button" class="btn btn-primary modal-btn-confirm">OK</button>' +      // 176
                  '</div>' +                                                                             // 177
                                                                                                         // 178
                '</div></div></div>' +                                                                   // 179
              '</div>';                                                                                  // 180
                                                                                                         // 181
    $('body').append(tpl);                                                                               // 182
    return $('.bs-prompt-modal');                                                                        // 183
  }                                                                                                      // 184
};                                                                                                       // 185
                                                                                                         // 186
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['theduke:bootstrap-modal-prompt'] = {
  BootstrapModalPrompt: BootstrapModalPrompt
};

})();
