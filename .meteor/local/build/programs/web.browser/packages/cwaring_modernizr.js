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

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/cwaring:modernizr/modernizr-dev.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * modernizr v3.0.0pre                                                                                                 // 2
 * Build http://v3.modernizr.com/download/#-applicationcache-audio-backgroundsize-borderimage-borderradius-boxshadow-canvas-canvastext-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-draganddrop-flexbox-flexboxlegacy-fontface-generatedcontent-geolocation-hashchange-history-hsla-indexeddb-inlinesvg-input-inputtypes-localstorage-multiplebgs-opacity-postmessage-rgba-sessionstorage-smil-svg-svgclippaths-textshadow-video-webgl-websockets-websqldatabase-webworkers-addtest-cssclasses-domprefixes-hasevent-prefixed-prefixes-shiv-testallprops-testprop-teststyles
 *                                                                                                                     // 4
 * Copyright (c)                                                                                                       // 5
 *  Faruk Ates                                                                                                         // 6
 *  Paul Irish                                                                                                         // 7
 *  Alex Sexton                                                                                                        // 8
 *  Ryan Seddon                                                                                                        // 9
 *  Alexander Farkas                                                                                                   // 10
 *  Patrick Kettner                                                                                                    // 11
 *  Stu Cox                                                                                                            // 12
 *  Richard Herrera                                                                                                    // 13
                                                                                                                       // 14
 * MIT License                                                                                                         // 15
 */                                                                                                                    // 16
                                                                                                                       // 17
/*                                                                                                                     // 18
 * Modernizr tests which native CSS3 and HTML5 features are available in the                                           // 19
 * current UA and makes the results available to you in two ways: as properties on                                     // 20
 * a global `Modernizr` object, and as classes on the `<html>` element. This                                           // 21
 * information allows you to progressively enhance your pages with a granular level                                    // 22
 * of control over the experience.                                                                                     // 23
*/                                                                                                                     // 24
                                                                                                                       // 25
;(function(window, document, undefined){                                                                               // 26
                                                                                                                       // 27
  var classes = [];                                                                                                    // 28
                                                                                                                       // 29
                                                                                                                       // 30
  // Take the html5 variable out of the                                                                                // 31
  // html5shiv scope so we can return it.                                                                              // 32
  var html5;                                                                                                           // 33
  /**                                                                                                                  // 34
  * @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed                                  // 35
  */                                                                                                                   // 36
  ;(function(window, document) {                                                                                       // 37
  /*jshint evil:true */                                                                                                // 38
    /** version */                                                                                                     // 39
    var version = '3.7.2';                                                                                             // 40
                                                                                                                       // 41
    /** Preset options */                                                                                              // 42
    var options = window.html5 || {};                                                                                  // 43
                                                                                                                       // 44
    /** Used to skip problem elements */                                                                               // 45
    var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;                                 // 46
                                                                                                                       // 47
    /** Not all elements can be cloned in IE **/                                                                       // 48
    var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
                                                                                                                       // 50
    /** Detect whether the browser supports default html5 styles */                                                    // 51
    var supportsHtml5Styles;                                                                                           // 52
                                                                                                                       // 53
    /** Name of the expando, to work with multiple documents or to re-shiv one document */                             // 54
    var expando = '_html5shiv';                                                                                        // 55
                                                                                                                       // 56
    /** The id for the the documents expando */                                                                        // 57
    var expanID = 0;                                                                                                   // 58
                                                                                                                       // 59
    /** Cached data for each document */                                                                               // 60
    var expandoData = {};                                                                                              // 61
                                                                                                                       // 62
    /** Detect whether the browser supports unknown elements */                                                        // 63
    var supportsUnknownElements;                                                                                       // 64
                                                                                                                       // 65
    (function() {                                                                                                      // 66
      try {                                                                                                            // 67
          var a = document.createElement('a');                                                                         // 68
          a.innerHTML = '<xyz></xyz>';                                                                                 // 69
          //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles          // 70
          supportsHtml5Styles = ('hidden' in a);                                                                       // 71
                                                                                                                       // 72
          supportsUnknownElements = a.childNodes.length == 1 || (function() {                                          // 73
            // assign a false positive if unable to shiv                                                               // 74
            (document.createElement)('a');                                                                             // 75
            var frag = document.createDocumentFragment();                                                              // 76
            return (                                                                                                   // 77
              typeof frag.cloneNode == 'undefined' ||                                                                  // 78
              typeof frag.createDocumentFragment == 'undefined' ||                                                     // 79
              typeof frag.createElement == 'undefined'                                                                 // 80
            );                                                                                                         // 81
          }());                                                                                                        // 82
      } catch(e) {                                                                                                     // 83
        // assign a false positive if detection fails => unable to shiv                                                // 84
        supportsHtml5Styles = true;                                                                                    // 85
        supportsUnknownElements = true;                                                                                // 86
      }                                                                                                                // 87
                                                                                                                       // 88
    }());                                                                                                              // 89
                                                                                                                       // 90
    /*--------------------------------------------------------------------------*/                                     // 91
                                                                                                                       // 92
    /**                                                                                                                // 93
     * Creates a style sheet with the given CSS text and adds it to the document.                                      // 94
     * @private                                                                                                        // 95
     * @param {Document} ownerDocument The document.                                                                   // 96
     * @param {String} cssText The CSS text.                                                                           // 97
     * @returns {StyleSheet} The style element.                                                                        // 98
     */                                                                                                                // 99
    function addStyleSheet(ownerDocument, cssText) {                                                                   // 100
      var p = ownerDocument.createElement('p'),                                                                        // 101
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;                     // 102
                                                                                                                       // 103
      p.innerHTML = 'x<style>' + cssText + '</style>';                                                                 // 104
      return parent.insertBefore(p.lastChild, parent.firstChild);                                                      // 105
    }                                                                                                                  // 106
                                                                                                                       // 107
    /**                                                                                                                // 108
     * Returns the value of `html5.elements` as an array.                                                              // 109
     * @private                                                                                                        // 110
     * @returns {Array} An array of shived element node names.                                                         // 111
     */                                                                                                                // 112
    function getElements() {                                                                                           // 113
      var elements = html5.elements;                                                                                   // 114
      return typeof elements == 'string' ? elements.split(' ') : elements;                                             // 115
    }                                                                                                                  // 116
                                                                                                                       // 117
    /**                                                                                                                // 118
     * Extends the built-in list of html5 elements                                                                     // 119
     * @memberOf html5                                                                                                 // 120
     * @param {String|Array} newElements whitespace separated list or array of new element names to shiv               // 121
     * @param {Document} ownerDocument The context document.                                                           // 122
     */                                                                                                                // 123
    function addElements(newElements, ownerDocument) {                                                                 // 124
      var elements = html5.elements;                                                                                   // 125
      if(typeof elements != 'string'){                                                                                 // 126
        elements = elements.join(' ');                                                                                 // 127
      }                                                                                                                // 128
      if(typeof newElements != 'string'){                                                                              // 129
        newElements = newElements.join(' ');                                                                           // 130
      }                                                                                                                // 131
      html5.elements = elements +' '+ newElements;                                                                     // 132
      shivDocument(ownerDocument);                                                                                     // 133
    }                                                                                                                  // 134
                                                                                                                       // 135
     /**                                                                                                               // 136
     * Returns the data associated to the given document                                                               // 137
     * @private                                                                                                        // 138
     * @param {Document} ownerDocument The document.                                                                   // 139
     * @returns {Object} An object of data.                                                                            // 140
     */                                                                                                                // 141
    function getExpandoData(ownerDocument) {                                                                           // 142
      var data = expandoData[ownerDocument[expando]];                                                                  // 143
      if (!data) {                                                                                                     // 144
          data = {};                                                                                                   // 145
          expanID++;                                                                                                   // 146
          ownerDocument[expando] = expanID;                                                                            // 147
          expandoData[expanID] = data;                                                                                 // 148
      }                                                                                                                // 149
      return data;                                                                                                     // 150
    }                                                                                                                  // 151
                                                                                                                       // 152
    /**                                                                                                                // 153
     * returns a shived element for the given nodeName and document                                                    // 154
     * @memberOf html5                                                                                                 // 155
     * @param {String} nodeName name of the element                                                                    // 156
     * @param {Document} ownerDocument The context document.                                                           // 157
     * @returns {Object} The shived element.                                                                           // 158
     */                                                                                                                // 159
    function createElement(nodeName, ownerDocument, data){                                                             // 160
      if (!ownerDocument) {                                                                                            // 161
          ownerDocument = document;                                                                                    // 162
      }                                                                                                                // 163
      if(supportsUnknownElements){                                                                                     // 164
          return ownerDocument.createElement(nodeName);                                                                // 165
      }                                                                                                                // 166
      if (!data) {                                                                                                     // 167
          data = getExpandoData(ownerDocument);                                                                        // 168
      }                                                                                                                // 169
      var node;                                                                                                        // 170
                                                                                                                       // 171
      if (data.cache[nodeName]) {                                                                                      // 172
          node = data.cache[nodeName].cloneNode();                                                                     // 173
      } else if (saveClones.test(nodeName)) {                                                                          // 174
          node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();                                       // 175
      } else {                                                                                                         // 176
          node = data.createElem(nodeName);                                                                            // 177
      }                                                                                                                // 178
                                                                                                                       // 179
      // Avoid adding some elements to fragments in IE < 9 because                                                     // 180
      // * Attributes like `name` or `type` cannot be set/changed once an element                                      // 181
      //   is inserted into a document/fragment                                                                        // 182
      // * Link elements with `src` attributes that are inaccessible, as with                                          // 183
      //   a 403 response, will cause the tab/window to crash                                                          // 184
      // * Script elements appended to fragments will execute when their `src`                                         // 185
      //   or `text` property is set                                                                                   // 186
      return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;      // 187
    }                                                                                                                  // 188
                                                                                                                       // 189
    /**                                                                                                                // 190
     * returns a shived DocumentFragment for the given document                                                        // 191
     * @memberOf html5                                                                                                 // 192
     * @param {Document} ownerDocument The context document.                                                           // 193
     * @returns {Object} The shived DocumentFragment.                                                                  // 194
     */                                                                                                                // 195
    function createDocumentFragment(ownerDocument, data){                                                              // 196
      if (!ownerDocument) {                                                                                            // 197
          ownerDocument = document;                                                                                    // 198
      }                                                                                                                // 199
      if(supportsUnknownElements){                                                                                     // 200
          return ownerDocument.createDocumentFragment();                                                               // 201
      }                                                                                                                // 202
      data = data || getExpandoData(ownerDocument);                                                                    // 203
      var clone = data.frag.cloneNode(),                                                                               // 204
          i = 0,                                                                                                       // 205
          elems = getElements(),                                                                                       // 206
          l = elems.length;                                                                                            // 207
      for(;i<l;i++){                                                                                                   // 208
          clone.createElement(elems[i]);                                                                               // 209
      }                                                                                                                // 210
      return clone;                                                                                                    // 211
    }                                                                                                                  // 212
                                                                                                                       // 213
    /**                                                                                                                // 214
     * Shivs the `createElement` and `createDocumentFragment` methods of the document.                                 // 215
     * @private                                                                                                        // 216
     * @param {Document|DocumentFragment} ownerDocument The document.                                                  // 217
     * @param {Object} data of the document.                                                                           // 218
     */                                                                                                                // 219
    function shivMethods(ownerDocument, data) {                                                                        // 220
      if (!data.cache) {                                                                                               // 221
          data.cache = {};                                                                                             // 222
          data.createElem = ownerDocument.createElement;                                                               // 223
          data.createFrag = ownerDocument.createDocumentFragment;                                                      // 224
          data.frag = data.createFrag();                                                                               // 225
      }                                                                                                                // 226
                                                                                                                       // 227
                                                                                                                       // 228
      ownerDocument.createElement = function(nodeName) {                                                               // 229
        //abort shiv                                                                                                   // 230
        if (!html5.shivMethods) {                                                                                      // 231
            return data.createElem(nodeName);                                                                          // 232
        }                                                                                                              // 233
        return createElement(nodeName, ownerDocument, data);                                                           // 234
      };                                                                                                               // 235
                                                                                                                       // 236
      ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +                                    // 237
        'var n=f.cloneNode(),c=n.createElement;' +                                                                     // 238
        'h.shivMethods&&(' +                                                                                           // 239
          // unroll the `createElement` calls                                                                          // 240
          getElements().join().replace(/[\w\-:]+/g, function(nodeName) {                                               // 241
            data.createElem(nodeName);                                                                                 // 242
            data.frag.createElement(nodeName);                                                                         // 243
            return 'c("' + nodeName + '")';                                                                            // 244
          }) +                                                                                                         // 245
        ');return n}'                                                                                                  // 246
      )(html5, data.frag);                                                                                             // 247
    }                                                                                                                  // 248
                                                                                                                       // 249
    /*--------------------------------------------------------------------------*/                                     // 250
                                                                                                                       // 251
    /**                                                                                                                // 252
     * Shivs the given document.                                                                                       // 253
     * @memberOf html5                                                                                                 // 254
     * @param {Document} ownerDocument The document to shiv.                                                           // 255
     * @returns {Document} The shived document.                                                                        // 256
     */                                                                                                                // 257
    function shivDocument(ownerDocument) {                                                                             // 258
      if (!ownerDocument) {                                                                                            // 259
          ownerDocument = document;                                                                                    // 260
      }                                                                                                                // 261
      var data = getExpandoData(ownerDocument);                                                                        // 262
                                                                                                                       // 263
      if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {                                                     // 264
        data.hasCSS = !!addStyleSheet(ownerDocument,                                                                   // 265
          // corrects block display not defined in IE6/7/8/9                                                           // 266
          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +              // 267
          // adds styling not present in IE6/7/8/9                                                                     // 268
          'mark{background:#FF0;color:#000}' +                                                                         // 269
          // hides non-rendered elements                                                                               // 270
          'template{display:none}'                                                                                     // 271
        );                                                                                                             // 272
      }                                                                                                                // 273
      if (!supportsUnknownElements) {                                                                                  // 274
        shivMethods(ownerDocument, data);                                                                              // 275
      }                                                                                                                // 276
      return ownerDocument;                                                                                            // 277
    }                                                                                                                  // 278
                                                                                                                       // 279
    /*--------------------------------------------------------------------------*/                                     // 280
                                                                                                                       // 281
    /**                                                                                                                // 282
     * The `html5` object is exposed so that more elements can be shived and                                           // 283
     * existing shiving can be detected on iframes.                                                                    // 284
     * @type Object                                                                                                    // 285
     * @example                                                                                                        // 286
     *                                                                                                                 // 287
     * // options can be changed before the script is included                                                         // 288
     * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };                                 // 289
     */                                                                                                                // 290
    var html5 = {                                                                                                      // 291
                                                                                                                       // 292
      /**                                                                                                              // 293
       * An array or space separated string of node names of the elements to shiv.                                     // 294
       * @memberOf html5                                                                                               // 295
       * @type Array|String                                                                                            // 296
       */                                                                                                              // 297
      'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
                                                                                                                       // 299
      /**                                                                                                              // 300
       * current version of html5shiv                                                                                  // 301
       */                                                                                                              // 302
      'version': version,                                                                                              // 303
                                                                                                                       // 304
      /**                                                                                                              // 305
       * A flag to indicate that the HTML5 style sheet should be inserted.                                             // 306
       * @memberOf html5                                                                                               // 307
       * @type Boolean                                                                                                 // 308
       */                                                                                                              // 309
      'shivCSS': (options.shivCSS !== false),                                                                          // 310
                                                                                                                       // 311
      /**                                                                                                              // 312
       * Is equal to true if a browser supports creating unknown/HTML5 elements                                        // 313
       * @memberOf html5                                                                                               // 314
       * @type boolean                                                                                                 // 315
       */                                                                                                              // 316
      'supportsUnknownElements': supportsUnknownElements,                                                              // 317
                                                                                                                       // 318
      /**                                                                                                              // 319
       * A flag to indicate that the document's `createElement` and `createDocumentFragment`                           // 320
       * methods should be overwritten.                                                                                // 321
       * @memberOf html5                                                                                               // 322
       * @type Boolean                                                                                                 // 323
       */                                                                                                              // 324
      'shivMethods': (options.shivMethods !== false),                                                                  // 325
                                                                                                                       // 326
      /**                                                                                                              // 327
       * A string to describe the type of `html5` object ("default" or "default print").                               // 328
       * @memberOf html5                                                                                               // 329
       * @type String                                                                                                  // 330
       */                                                                                                              // 331
      'type': 'default',                                                                                               // 332
                                                                                                                       // 333
      // shivs the document according to the specified `html5` object options                                          // 334
      'shivDocument': shivDocument,                                                                                    // 335
                                                                                                                       // 336
      //creates a shived element                                                                                       // 337
      createElement: createElement,                                                                                    // 338
                                                                                                                       // 339
      //creates a shived documentFragment                                                                              // 340
      createDocumentFragment: createDocumentFragment,                                                                  // 341
                                                                                                                       // 342
      //extends list of elements                                                                                       // 343
      addElements: addElements                                                                                         // 344
    };                                                                                                                 // 345
                                                                                                                       // 346
    /*--------------------------------------------------------------------------*/                                     // 347
                                                                                                                       // 348
    // expose html5                                                                                                    // 349
    window.html5 = html5;                                                                                              // 350
                                                                                                                       // 351
    // shiv the document                                                                                               // 352
    shivDocument(document);                                                                                            // 353
                                                                                                                       // 354
  }(this, document));                                                                                                  // 355
                                                                                                                       // 356
                                                                                                                       // 357
  var tests = [];                                                                                                      // 358
                                                                                                                       // 359
                                                                                                                       // 360
  var ModernizrProto = {                                                                                               // 361
    // The current version, dummy                                                                                      // 362
    _version: 'v3.0.0pre',                                                                                             // 363
                                                                                                                       // 364
    // Any settings that don't work as separate modules                                                                // 365
    // can go in here as configuration.                                                                                // 366
    _config: {                                                                                                         // 367
      classPrefix : '',                                                                                                // 368
      enableClasses : true,                                                                                            // 369
      enableJSClass : true,                                                                                            // 370
      usePrefixes : true                                                                                               // 371
    },                                                                                                                 // 372
                                                                                                                       // 373
    // Queue of tests                                                                                                  // 374
    _q: [],                                                                                                            // 375
                                                                                                                       // 376
    // Stub these for people who are listening                                                                         // 377
    on: function( test, cb ) {                                                                                         // 378
      // I don't really think people should do this, but we can                                                        // 379
      // safe guard it a bit.                                                                                          // 380
      // -- NOTE:: this gets WAY overridden in src/addTest for                                                         // 381
      // actual async tests. This is in case people listen to                                                          // 382
      // synchronous tests. I would leave it out, but the code                                                         // 383
      // to *disallow* sync tests in the real version of this                                                          // 384
      // function is actually larger than this.                                                                        // 385
      var self = this;                                                                                                 // 386
      setTimeout(function() {                                                                                          // 387
        cb(self[test]);                                                                                                // 388
      }, 0);                                                                                                           // 389
    },                                                                                                                 // 390
                                                                                                                       // 391
    addTest: function( name, fn, options ) {                                                                           // 392
      tests.push({name : name, fn : fn, options : options });                                                          // 393
    },                                                                                                                 // 394
                                                                                                                       // 395
    addAsyncTest: function (fn) {                                                                                      // 396
      tests.push({name : null, fn : fn});                                                                              // 397
    }                                                                                                                  // 398
  };                                                                                                                   // 399
                                                                                                                       // 400
                                                                                                                       // 401
                                                                                                                       // 402
  // Fake some of Object.create                                                                                        // 403
  // so we can force non test results                                                                                  // 404
  // to be non "own" properties.                                                                                       // 405
  var Modernizr = function(){};                                                                                        // 406
  Modernizr.prototype = ModernizrProto;                                                                                // 407
                                                                                                                       // 408
  // Leak modernizr globally when you `require` it                                                                     // 409
  // rather than force it here.                                                                                        // 410
  // Overwrite name so constructor name is nicer :D                                                                    // 411
  Modernizr = new Modernizr();                                                                                         // 412
                                                                                                                       // 413
                                                                                                                       // 414
/*!                                                                                                                    // 415
{                                                                                                                      // 416
  "name": "Application Cache",                                                                                         // 417
  "property": "applicationcache",                                                                                      // 418
  "caniuse": "offline-apps",                                                                                           // 419
  "tags": ["storage", "offline"],                                                                                      // 420
  "notes": [{                                                                                                          // 421
    "name": "MDN documentation",                                                                                       // 422
    "href": "https://developer.mozilla.org/en/docs/HTML/Using_the_application_cache"                                   // 423
  }],                                                                                                                  // 424
  "polyfills": ["html5gears"]                                                                                          // 425
}                                                                                                                      // 426
!*/                                                                                                                    // 427
/* DOC                                                                                                                 // 428
Detects support for the Application Cache, for storing data to enable web-based applications run offline.              // 429
                                                                                                                       // 430
The API has been [heavily criticized](http://alistapart.com/article/application-cache-is-a-douchebag) and discussions are underway to address this.
*/                                                                                                                     // 432
                                                                                                                       // 433
  Modernizr.addTest('applicationcache', 'applicationCache' in window);                                                 // 434
                                                                                                                       // 435
/*!                                                                                                                    // 436
{                                                                                                                      // 437
  "name": "Geolocation API",                                                                                           // 438
  "property": "geolocation",                                                                                           // 439
  "caniuse": "geolocation",                                                                                            // 440
  "tags": ["media"],                                                                                                   // 441
  "notes": [{                                                                                                          // 442
    "name": "MDN documentation",                                                                                       // 443
    "href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"                                        // 444
  }],                                                                                                                  // 445
  "polyfills": [                                                                                                       // 446
    "joshuabell-polyfill",                                                                                             // 447
    "webshims",                                                                                                        // 448
    "geolocationshim",                                                                                                 // 449
    "geo-location-javascript",                                                                                         // 450
    "geolocation-api-polyfill"                                                                                         // 451
  ]                                                                                                                    // 452
}                                                                                                                      // 453
!*/                                                                                                                    // 454
/* DOC                                                                                                                 // 455
Detects support for the Geolocation API for users to provide their location to web applications.                       // 456
*/                                                                                                                     // 457
                                                                                                                       // 458
  // geolocation is often considered a trivial feature detect...                                                       // 459
  // Turns out, it's quite tricky to get right:                                                                        // 460
  //                                                                                                                   // 461
  // Using !!navigator.geolocation does two things we don't want. It:                                                  // 462
  //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513                                               // 463
  //   2. Disables page caching in WebKit: webk.it/43956                                                               // 464
  //                                                                                                                   // 465
  // Meanwhile, in Firefox < 8, an about:config setting could expose                                                   // 466
  // a false positive that would throw an exception: bugzil.la/688158                                                  // 467
                                                                                                                       // 468
  Modernizr.addTest('geolocation', 'geolocation' in navigator);                                                        // 469
                                                                                                                       // 470
/*!                                                                                                                    // 471
{                                                                                                                      // 472
  "name": "History API",                                                                                               // 473
  "property": "history",                                                                                               // 474
  "caniuse": "history",                                                                                                // 475
  "tags": ["history"],                                                                                                 // 476
  "authors": ["Hay Kranen", "Alexander Farkas"],                                                                       // 477
  "notes": [{                                                                                                          // 478
    "name": "W3C Spec",                                                                                                // 479
    "href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"                                          // 480
  }, {                                                                                                                 // 481
    "name": "MDN documentation",                                                                                       // 482
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"                                          // 483
  }],                                                                                                                  // 484
  "polyfills": ["historyjs", "html5historyapi"]                                                                        // 485
}                                                                                                                      // 486
!*/                                                                                                                    // 487
/* DOC                                                                                                                 // 488
Detects support for the History API for manipulating the browser session history.                                      // 489
*/                                                                                                                     // 490
                                                                                                                       // 491
  Modernizr.addTest('history', function() {                                                                            // 492
    // Issue #733                                                                                                      // 493
    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support                           // 494
    // Unfortunately support is really buggy and there is no clean way to detect                                       // 495
    // these bugs, so we fall back to a user agent sniff :(                                                            // 496
    var ua = navigator.userAgent;                                                                                      // 497
                                                                                                                       // 498
    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies                                  // 499
    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).                                             // 500
    if ((ua.indexOf('Android 2.') !== -1 ||                                                                            // 501
        (ua.indexOf('Android 4.0') !== -1)) &&                                                                         // 502
        ua.indexOf('Mobile Safari') !== -1 &&                                                                          // 503
        ua.indexOf('Chrome') === -1 &&                                                                                 // 504
        ua.indexOf('Windows Phone') === -1) {                                                                          // 505
      return false;                                                                                                    // 506
    }                                                                                                                  // 507
                                                                                                                       // 508
    // Return the regular check                                                                                        // 509
    return (window.history && 'pushState' in window.history);                                                          // 510
  });                                                                                                                  // 511
                                                                                                                       // 512
/*!                                                                                                                    // 513
{                                                                                                                      // 514
  "name": "Local Storage",                                                                                             // 515
  "property": "localstorage",                                                                                          // 516
  "caniuse": "namevalue-storage",                                                                                      // 517
  "tags": ["storage"],                                                                                                 // 518
  "knownBugs": [],                                                                                                     // 519
  "notes": [],                                                                                                         // 520
  "warnings": [],                                                                                                      // 521
  "polyfills": [                                                                                                       // 522
    "joshuabell-polyfill",                                                                                             // 523
    "cupcake",                                                                                                         // 524
    "storagepolyfill",                                                                                                 // 525
    "amplifyjs",                                                                                                       // 526
    "yui-cacheoffline",                                                                                                // 527
    "textstorage"                                                                                                      // 528
  ]                                                                                                                    // 529
}                                                                                                                      // 530
!*/                                                                                                                    // 531
                                                                                                                       // 532
  // In FF4, if disabled, window.localStorage should === null.                                                         // 533
                                                                                                                       // 534
  // Normally, we could not test that directly and need to do a                                                        // 535
  //   `('localStorage' in window) && ` test first because otherwise Firefox will                                      // 536
  //   throw bugzil.la/365772 if cookies are disabled                                                                  // 537
                                                                                                                       // 538
  // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem                                        // 539
  // will throw the exception:                                                                                         // 540
  //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.                                                                         // 541
  // Peculiarly, getItem and removeItem calls do not throw.                                                            // 542
                                                                                                                       // 543
  // Because we are forced to try/catch this, we'll go aggressive.                                                     // 544
                                                                                                                       // 545
  // Just FWIW: IE8 Compat mode supports these features completely:                                                    // 546
  //   www.quirksmode.org/dom/html5.html                                                                               // 547
  // But IE8 doesn't support either with local files                                                                   // 548
                                                                                                                       // 549
  Modernizr.addTest('localstorage', function() {                                                                       // 550
    var mod = 'modernizr';                                                                                             // 551
    try {                                                                                                              // 552
      localStorage.setItem(mod, mod);                                                                                  // 553
      localStorage.removeItem(mod);                                                                                    // 554
      return true;                                                                                                     // 555
    } catch(e) {                                                                                                       // 556
      return false;                                                                                                    // 557
    }                                                                                                                  // 558
  });                                                                                                                  // 559
                                                                                                                       // 560
/*!                                                                                                                    // 561
{                                                                                                                      // 562
  "name": "postMessage",                                                                                               // 563
  "property": "postmessage",                                                                                           // 564
  "caniuse": "x-doc-messaging",                                                                                        // 565
  "notes": [{                                                                                                          // 566
    "name": "W3C Spec",                                                                                                // 567
    "href": "http://www.w3.org/TR/html5/comms.html#posting-messages"                                                   // 568
  }],                                                                                                                  // 569
  "polyfills": ["easyxdm", "postmessage-jquery"]                                                                       // 570
}                                                                                                                      // 571
!*/                                                                                                                    // 572
/* DOC                                                                                                                 // 573
Detects support for the `window.postMessage` protocol for cross-document messaging.                                    // 574
*/                                                                                                                     // 575
                                                                                                                       // 576
  Modernizr.addTest('postmessage', 'postMessage' in window);                                                           // 577
                                                                                                                       // 578
/*!                                                                                                                    // 579
{                                                                                                                      // 580
  "name": "Session Storage",                                                                                           // 581
  "property": "sessionstorage",                                                                                        // 582
  "tags": ["storage"],                                                                                                 // 583
  "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]                                                    // 584
}                                                                                                                      // 585
!*/                                                                                                                    // 586
                                                                                                                       // 587
  // Because we are forced to try/catch this, we'll go aggressive.                                                     // 588
                                                                                                                       // 589
  // Just FWIW: IE8 Compat mode supports these features completely:                                                    // 590
  //   www.quirksmode.org/dom/html5.html                                                                               // 591
  // But IE8 doesn't support either with local files                                                                   // 592
  Modernizr.addTest('sessionstorage', function() {                                                                     // 593
    var mod = 'modernizr';                                                                                             // 594
    try {                                                                                                              // 595
      sessionStorage.setItem(mod, mod);                                                                                // 596
      sessionStorage.removeItem(mod);                                                                                  // 597
      return true;                                                                                                     // 598
    } catch(e) {                                                                                                       // 599
      return false;                                                                                                    // 600
    }                                                                                                                  // 601
  });                                                                                                                  // 602
                                                                                                                       // 603
/*!                                                                                                                    // 604
{                                                                                                                      // 605
  "name": "SVG",                                                                                                       // 606
  "property": "svg",                                                                                                   // 607
  "caniuse": "svg",                                                                                                    // 608
  "tags": ["svg"],                                                                                                     // 609
  "authors": ["Erik Dahlstrom"],                                                                                       // 610
  "polyfills": [                                                                                                       // 611
    "svgweb",                                                                                                          // 612
    "raphael",                                                                                                         // 613
    "amplesdk",                                                                                                        // 614
    "canvg",                                                                                                           // 615
    "svg-boilerplate",                                                                                                 // 616
    "sie",                                                                                                             // 617
    "dojogfx",                                                                                                         // 618
    "fabricjs"                                                                                                         // 619
  ]                                                                                                                    // 620
}                                                                                                                      // 621
!*/                                                                                                                    // 622
/* DOC                                                                                                                 // 623
Detects support for SVG in `<embed>` or `<object>` elements.                                                           // 624
*/                                                                                                                     // 625
                                                                                                                       // 626
  Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
                                                                                                                       // 628
/*!                                                                                                                    // 629
{                                                                                                                      // 630
  "name": "Web SQL Database",                                                                                          // 631
  "property": "websqldatabase",                                                                                        // 632
  "caniuse": "sql-storage",                                                                                            // 633
  "tags": ["storage"]                                                                                                  // 634
}                                                                                                                      // 635
!*/                                                                                                                    // 636
                                                                                                                       // 637
  // Chrome incognito mode used to throw an exception when using openDatabase                                          // 638
  // It doesn't anymore.                                                                                               // 639
  Modernizr.addTest('websqldatabase', 'openDatabase' in window);                                                       // 640
                                                                                                                       // 641
/*!                                                                                                                    // 642
{                                                                                                                      // 643
  "name": "Web Workers",                                                                                               // 644
  "property": "webworkers",                                                                                            // 645
  "caniuse" : "webworkers",                                                                                            // 646
  "tags": ["performance", "workers"],                                                                                  // 647
  "notes": [{                                                                                                          // 648
    "name": "W3C Reference",                                                                                           // 649
    "href": "http://www.w3.org/TR/workers/"                                                                            // 650
  }, {                                                                                                                 // 651
    "name": "HTML5 Rocks article",                                                                                     // 652
    "href": "http://www.html5rocks.com/en/tutorials/workers/basics/"                                                   // 653
  }, {                                                                                                                 // 654
    "name": "MDN documentation",                                                                                       // 655
    "href": "https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers"                         // 656
  }],                                                                                                                  // 657
  "polyfills": ["fakeworker", "html5shims"]                                                                            // 658
}                                                                                                                      // 659
!*/                                                                                                                    // 660
/* DOC                                                                                                                 // 661
Detects support for the basic `Worker` API from the Web Workers spec. Web Workers provide a simple means for web content to run scripts in background threads.
*/                                                                                                                     // 663
                                                                                                                       // 664
  Modernizr.addTest('webworkers', 'Worker' in window);                                                                 // 665
                                                                                                                       // 666
/*!                                                                                                                    // 667
{                                                                                                                      // 668
  "name": "WebSockets Support",                                                                                        // 669
  "property": "websockets",                                                                                            // 670
  "authors": ["Phread [fearphage]", "Mike Sherov [mikesherov]", "Burak Yigit Kaya [BYK]"],                             // 671
  "caniuse": "websockets",                                                                                             // 672
  "tags": ["html5"],                                                                                                   // 673
  "warnings": [                                                                                                        // 674
    "This test will reject any old version of WebSockets even if it is not prefixed such as in Safari 5.1"             // 675
  ],                                                                                                                   // 676
  "notes": [{                                                                                                          // 677
    "name": "CLOSING State and Spec",                                                                                  // 678
    "href": "http://www.w3.org/TR/websockets/#the-websocket-interface"                                                 // 679
  }],                                                                                                                  // 680
  "polyfills": [                                                                                                       // 681
    "sockjs",                                                                                                          // 682
    "socketio",                                                                                                        // 683
    "kaazing-websocket-gateway",                                                                                       // 684
    "websocketjs",                                                                                                     // 685
    "atmosphere",                                                                                                      // 686
    "graceful-websocket",                                                                                              // 687
    "portal",                                                                                                          // 688
    "datachannel"                                                                                                      // 689
  ]                                                                                                                    // 690
}                                                                                                                      // 691
!*/                                                                                                                    // 692
                                                                                                                       // 693
  Modernizr.addTest('websockets', 'WebSocket' in window && window.WebSocket.CLOSING === 2);                            // 694
                                                                                                                       // 695
                                                                                                                       // 696
  // List of property values to set for css tests. See ticket #21                                                      // 697
  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);                   // 698
                                                                                                                       // 699
  // expose these for the plugin API. Look in the source for how to join() them against your input                     // 700
  ModernizrProto._prefixes = prefixes;                                                                                 // 701
                                                                                                                       // 702
                                                                                                                       // 703
                                                                                                                       // 704
  /**                                                                                                                  // 705
   * is returns a boolean for if typeof obj is exactly type.                                                           // 706
   */                                                                                                                  // 707
  function is( obj, type ) {                                                                                           // 708
    return typeof obj === type;                                                                                        // 709
  }                                                                                                                    // 710
  ;                                                                                                                    // 711
                                                                                                                       // 712
  // Run through all tests and detect their support in the current UA.                                                 // 713
  function testRunner() {                                                                                              // 714
    var featureNames;                                                                                                  // 715
    var feature;                                                                                                       // 716
    var aliasIdx;                                                                                                      // 717
    var result;                                                                                                        // 718
    var nameIdx;                                                                                                       // 719
    var featureName;                                                                                                   // 720
    var featureNameSplit;                                                                                              // 721
                                                                                                                       // 722
    for ( var featureIdx in tests ) {                                                                                  // 723
      featureNames = [];                                                                                               // 724
      feature = tests[featureIdx];                                                                                     // 725
      // run the test, throw the return value into the Modernizr,                                                      // 726
      //   then based on that boolean, define an appropriate className                                                 // 727
      //   and push it into an array of classes we'll join later.                                                      // 728
      //                                                                                                               // 729
      //   If there is no name, it's an 'async' test that is run,                                                      // 730
      //   but not directly added to the object. That should                                                           // 731
      //   be done with a post-run addTest call.                                                                       // 732
      if ( feature.name ) {                                                                                            // 733
        featureNames.push(feature.name.toLowerCase());                                                                 // 734
                                                                                                                       // 735
        if (feature.options && feature.options.aliases && feature.options.aliases.length) {                            // 736
          // Add all the aliases into the names list                                                                   // 737
          for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {                                  // 738
            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());                                        // 739
          }                                                                                                            // 740
        }                                                                                                              // 741
      }                                                                                                                // 742
                                                                                                                       // 743
      // Run the test, or use the raw value if it's not a function                                                     // 744
      result = is(feature.fn, 'function') ? feature.fn() : feature.fn;                                                 // 745
                                                                                                                       // 746
                                                                                                                       // 747
      // Set each of the names on the Modernizr object                                                                 // 748
      for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {                                                    // 749
        featureName = featureNames[nameIdx];                                                                           // 750
        // Support dot properties as sub tests. We don't do checking to make sure                                      // 751
        // that the implied parent tests have been added. You must call them in                                        // 752
        // order (either in the test, or make the parent test a dependency).                                           // 753
        //                                                                                                             // 754
        // Cap it to TWO to make the logic simple and because who needs that kind of subtesting                        // 755
        // hashtag famous last words                                                                                   // 756
        featureNameSplit = featureName.split('.');                                                                     // 757
                                                                                                                       // 758
        if (featureNameSplit.length === 1) {                                                                           // 759
          Modernizr[featureNameSplit[0]] = result;                                                                     // 760
        }                                                                                                              // 761
        else if (featureNameSplit.length === 2) {                                                                      // 762
          // cast to a Boolean, if not one already                                                                     // 763
          /* jshint -W053 */                                                                                           // 764
          if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {                // 765
            Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);                              // 766
          }                                                                                                            // 767
                                                                                                                       // 768
          Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;                                                // 769
        }                                                                                                              // 770
                                                                                                                       // 771
        classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));                                              // 772
      }                                                                                                                // 773
    }                                                                                                                  // 774
  }                                                                                                                    // 775
                                                                                                                       // 776
  ;                                                                                                                    // 777
                                                                                                                       // 778
  var docElement = document.documentElement;                                                                           // 779
                                                                                                                       // 780
                                                                                                                       // 781
  // Pass in an and array of class names, e.g.:                                                                        // 782
  //  ['no-webp', 'borderradius', ...]                                                                                 // 783
  function setClasses( classes ) {                                                                                     // 784
    var className = docElement.className;                                                                              // 785
    var classPrefix = Modernizr._config.classPrefix || '';                                                             // 786
                                                                                                                       // 787
    // Change `no-js` to `js` (we do this independently of the `enableClasses`                                         // 788
    // option)                                                                                                         // 789
    // Handle classPrefix on this too                                                                                  // 790
    if(Modernizr._config.enableJSClass) {                                                                              // 791
      var reJS = new RegExp('(^|\\s)'+classPrefix+'no-js(\\s|$)');                                                     // 792
      className = className.replace(reJS, '$1'+classPrefix+'js$2');                                                    // 793
    }                                                                                                                  // 794
                                                                                                                       // 795
    if(Modernizr._config.enableClasses) {                                                                              // 796
      // Add the new classes                                                                                           // 797
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);                                                // 798
      docElement.className = className;                                                                                // 799
    }                                                                                                                  // 800
                                                                                                                       // 801
  }                                                                                                                    // 802
                                                                                                                       // 803
  ;                                                                                                                    // 804
                                                                                                                       // 805
  // hasOwnProperty shim by kangax needed for Safari 2.0 support                                                       // 806
  var hasOwnProp;                                                                                                      // 807
                                                                                                                       // 808
  (function() {                                                                                                        // 809
    var _hasOwnProperty = ({}).hasOwnProperty;                                                                         // 810
    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {                               // 811
      hasOwnProp = function (object, property) {                                                                       // 812
        return _hasOwnProperty.call(object, property);                                                                 // 813
      };                                                                                                               // 814
    }                                                                                                                  // 815
    else {                                                                                                             // 816
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));                      // 818
      };                                                                                                               // 819
    }                                                                                                                  // 820
  })();                                                                                                                // 821
                                                                                                                       // 822
                                                                                                                       // 823
                                                                                                                       // 824
  // As far as I can think of, we shouldn't need or                                                                    // 825
  // allow 'on' for non-async tests, and you can't do                                                                  // 826
  // async tests without this 'addTest' module.                                                                        // 827
                                                                                                                       // 828
  // Listeners for async or post-run tests                                                                             // 829
  ModernizrProto._l = {};                                                                                              // 830
                                                                                                                       // 831
  // 'addTest' implies a test after the core runloop,                                                                  // 832
  // So we'll add in the events                                                                                        // 833
  ModernizrProto.on = function( test, cb ) {                                                                           // 834
    // Create the list of listeners if it doesn't exist                                                                // 835
    if (!this._l[test]) {                                                                                              // 836
      this._l[test] = [];                                                                                              // 837
    }                                                                                                                  // 838
                                                                                                                       // 839
    // Push this test on to the listener list                                                                          // 840
    this._l[test].push(cb);                                                                                            // 841
                                                                                                                       // 842
    // If it's already been resolved, trigger it on next tick                                                          // 843
    if (Modernizr.hasOwnProperty(test)) {                                                                              // 844
      // Next Tick                                                                                                     // 845
      setTimeout(function() {                                                                                          // 846
        Modernizr._trigger(test, Modernizr[test]);                                                                     // 847
      }, 0);                                                                                                           // 848
    }                                                                                                                  // 849
  };                                                                                                                   // 850
                                                                                                                       // 851
  ModernizrProto._trigger = function( test, res ) {                                                                    // 852
    if (!this._l[test]) {                                                                                              // 853
      return;                                                                                                          // 854
    }                                                                                                                  // 855
                                                                                                                       // 856
    var cbs = this._l[test];                                                                                           // 857
                                                                                                                       // 858
    // Force async                                                                                                     // 859
    setTimeout(function() {                                                                                            // 860
      var i, cb;                                                                                                       // 861
      for (i = 0; i < cbs.length; i++) {                                                                               // 862
        cb = cbs[i];                                                                                                   // 863
        cb(res);                                                                                                       // 864
      }                                                                                                                // 865
    },0);                                                                                                              // 866
                                                                                                                       // 867
    // Don't trigger these again                                                                                       // 868
    delete this._l[test];                                                                                              // 869
  };                                                                                                                   // 870
                                                                                                                       // 871
  /**                                                                                                                  // 872
   * addTest allows the user to define their own feature tests                                                         // 873
   * the result will be added onto the Modernizr object,                                                               // 874
   * as well as an appropriate className set on the html element                                                       // 875
   *                                                                                                                   // 876
   * @param feature - String naming the feature                                                                        // 877
   * @param test - Function returning true if feature is supported, false if not                                       // 878
   */                                                                                                                  // 879
  function addTest( feature, test ) {                                                                                  // 880
    if ( typeof feature == 'object' ) {                                                                                // 881
      for ( var key in feature ) {                                                                                     // 882
        if ( hasOwnProp( feature, key ) ) {                                                                            // 883
          addTest( key, feature[ key ] );                                                                              // 884
        }                                                                                                              // 885
      }                                                                                                                // 886
    } else {                                                                                                           // 887
                                                                                                                       // 888
      feature = feature.toLowerCase();                                                                                 // 889
      var featureNameSplit = feature.split('.');                                                                       // 890
      var last = Modernizr[featureNameSplit[0]];                                                                       // 891
                                                                                                                       // 892
      // Again, we don't check for parent test existence. Get that right, though.                                      // 893
      if (featureNameSplit.length == 2) {                                                                              // 894
        last = last[featureNameSplit[1]];                                                                              // 895
      }                                                                                                                // 896
                                                                                                                       // 897
      if ( typeof last != 'undefined' ) {                                                                              // 898
        // we're going to quit if you're trying to overwrite an existing test                                          // 899
        // if we were to allow it, we'd do this:                                                                       // 900
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");                                                       // 901
        //   docElement.className = docElement.className.replace( re, '' );                                            // 902
        // but, no rly, stuff 'em.                                                                                     // 903
        return Modernizr;                                                                                              // 904
      }                                                                                                                // 905
                                                                                                                       // 906
      test = typeof test == 'function' ? test() : test;                                                                // 907
                                                                                                                       // 908
      // Set the value (this is the magic, right here).                                                                // 909
      if (featureNameSplit.length == 1) {                                                                              // 910
        Modernizr[featureNameSplit[0]] = test;                                                                         // 911
      }                                                                                                                // 912
      else if (featureNameSplit.length == 2) {                                                                         // 913
        // cast to a Boolean, if not one already                                                                       // 914
        /* jshint -W053 */                                                                                             // 915
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {                  // 916
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);                                // 917
        }                                                                                                              // 918
                                                                                                                       // 919
        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;                                                    // 920
      }                                                                                                                // 921
                                                                                                                       // 922
      // Set a single class (either `feature` or `no-feature`)                                                         // 923
      /* jshint -W041 */                                                                                               // 924
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);                               // 925
      /* jshint +W041 */                                                                                               // 926
                                                                                                                       // 927
      // Trigger the event                                                                                             // 928
      Modernizr._trigger(feature, test);                                                                               // 929
    }                                                                                                                  // 930
                                                                                                                       // 931
    return Modernizr; // allow chaining.                                                                               // 932
  }                                                                                                                    // 933
                                                                                                                       // 934
  // After all the tests are run, add self                                                                             // 935
  // to the Modernizr prototype                                                                                        // 936
  Modernizr._q.push(function() {                                                                                       // 937
    ModernizrProto.addTest = addTest;                                                                                  // 938
  });                                                                                                                  // 939
                                                                                                                       // 940
                                                                                                                       // 941
                                                                                                                       // 942
  // Helper function for converting kebab-case to camelCase,                                                           // 943
  // e.g. box-sizing -> boxSizing                                                                                      // 944
  function cssToDOM( name ) {                                                                                          // 945
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {                                                    // 946
      return m1 + m2.toUpperCase();                                                                                    // 947
    }).replace(/^-/, '');                                                                                              // 948
  }                                                                                                                    // 949
  ;                                                                                                                    // 950
                                                                                                                       // 951
  /**                                                                                                                  // 952
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in                                          // 953
   * some prefixed form, or false, in the case of an unsupported rule                                                  // 954
   *                                                                                                                   // 955
   * @param prop - String naming the property to test                                                                  // 956
   */                                                                                                                  // 957
                                                                                                                       // 958
  var atRule = function(prop) {                                                                                        // 959
    var length = prefixes.length;                                                                                      // 960
    var cssrule = window.CSSRule;                                                                                      // 961
    var rule;                                                                                                          // 962
                                                                                                                       // 963
    if (typeof cssrule === 'undefined') {                                                                              // 964
      return false;                                                                                                    // 965
    }                                                                                                                  // 966
                                                                                                                       // 967
    // remove literal @ from beginning of provided property                                                            // 968
    prop = prop.replace(/^@/,'');                                                                                      // 969
                                                                                                                       // 970
    // CSSRules use underscores instead of dashes                                                                      // 971
    rule = prop.replace(/-/g,'_').toUpperCase() + '_RULE';                                                             // 972
                                                                                                                       // 973
    if (rule in cssrule) {                                                                                             // 974
      return '@' + prop;                                                                                               // 975
    }                                                                                                                  // 976
                                                                                                                       // 977
    for ( var i = 0; i < length; i++ ) {                                                                               // 978
      // prefixes gives us something like -o-, and we want O_                                                          // 979
      var prefix = prefixes[i];                                                                                        // 980
      var thisRule = prefix.toUpperCase() + '_' + rule;                                                                // 981
                                                                                                                       // 982
      if (thisRule in cssrule) {                                                                                       // 983
        return '@-' + prefix.toLowerCase() + '-' + prop;                                                               // 984
      }                                                                                                                // 985
    }                                                                                                                  // 986
                                                                                                                       // 987
    return false;                                                                                                      // 988
  };                                                                                                                   // 989
                                                                                                                       // 990
                                                                                                                       // 991
                                                                                                                       // 992
  // Following spec is to expose vendor-specific style properties as:                                                  // 993
  //   elem.style.WebkitBorderRadius                                                                                   // 994
  // and the following would be incorrect:                                                                             // 995
  //   elem.style.webkitBorderRadius                                                                                   // 996
                                                                                                                       // 997
  // Webkit ghosts their properties in lowercase but Opera & Moz do not.                                               // 998
  // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+                                               // 999
  //   erik.eae.net/archives/2008/03/10/21.48.10/                                                                      // 1000
                                                                                                                       // 1001
  // More here: github.com/Modernizr/Modernizr/issues/issue/21                                                         // 1002
  var omPrefixes = 'Webkit Moz O ms';                                                                                  // 1003
                                                                                                                       // 1004
                                                                                                                       // 1005
  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);                   // 1006
  ModernizrProto._domPrefixes = domPrefixes;                                                                           // 1007
                                                                                                                       // 1008
                                                                                                                       // 1009
  var createElement = function() {                                                                                     // 1010
    if (typeof document.createElement !== 'function') {                                                                // 1011
      // This is the case in IE7, where the type of createElement is "object".                                         // 1012
      // For this reason, we cannot call apply() as Object is not a Function.                                          // 1013
      return document.createElement(arguments[0]);                                                                     // 1014
    } else {                                                                                                           // 1015
      return document.createElement.apply(document, arguments);                                                        // 1016
    }                                                                                                                  // 1017
  };                                                                                                                   // 1018
                                                                                                                       // 1019
/*!                                                                                                                    // 1020
{                                                                                                                      // 1021
  "name": "Canvas",                                                                                                    // 1022
  "property": "canvas",                                                                                                // 1023
  "caniuse": "canvas",                                                                                                 // 1024
  "tags": ["canvas", "graphics"],                                                                                      // 1025
  "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]                                                     // 1026
}                                                                                                                      // 1027
!*/                                                                                                                    // 1028
/* DOC                                                                                                                 // 1029
Detects support for the `<canvas>` element for 2D drawing.                                                             // 1030
*/                                                                                                                     // 1031
                                                                                                                       // 1032
  // On the S60 and BB Storm, getContext exists, but always returns undefined                                          // 1033
  // so we actually have to call getContext() to verify                                                                // 1034
  // github.com/Modernizr/Modernizr/issues/issue/97/                                                                   // 1035
  Modernizr.addTest('canvas', function() {                                                                             // 1036
    var elem = createElement('canvas');                                                                                // 1037
    return !!(elem.getContext && elem.getContext('2d'));                                                               // 1038
  });                                                                                                                  // 1039
                                                                                                                       // 1040
/*!                                                                                                                    // 1041
{                                                                                                                      // 1042
  "name": "Canvas text",                                                                                               // 1043
  "property": "canvastext",                                                                                            // 1044
  "caniuse": "canvas-text",                                                                                            // 1045
  "tags": ["canvas", "graphics"],                                                                                      // 1046
  "polyfills": ["canvastext"]                                                                                          // 1047
}                                                                                                                      // 1048
!*/                                                                                                                    // 1049
/* DOC                                                                                                                 // 1050
Detects support for the text APIs for `<canvas>` elements.                                                             // 1051
*/                                                                                                                     // 1052
                                                                                                                       // 1053
  Modernizr.addTest('canvastext',  function() {                                                                        // 1054
    if (Modernizr.canvas  === false) return false;                                                                     // 1055
    return typeof createElement('canvas').getContext('2d').fillText == 'function';                                     // 1056
  });                                                                                                                  // 1057
                                                                                                                       // 1058
/*!                                                                                                                    // 1059
{                                                                                                                      // 1060
  "name": "CSS Gradients",                                                                                             // 1061
  "caniuse": "css-gradients",                                                                                          // 1062
  "property": "cssgradients",                                                                                          // 1063
  "tags": ["css"],                                                                                                     // 1064
  "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],                       // 1065
  "notes": [{                                                                                                          // 1066
    "name": "Webkit Gradient Syntax",                                                                                  // 1067
    "href": "http://webkit.org/blog/175/introducing-css-gradients/"                                                    // 1068
  },{                                                                                                                  // 1069
    "name": "Mozilla Linear Gradient Syntax",                                                                          // 1070
    "href": "http://developer.mozilla.org/en/CSS/-moz-linear-gradient"                                                 // 1071
  },{                                                                                                                  // 1072
    "name": "Mozilla Radial Gradient Syntax",                                                                          // 1073
    "href": "http://developer.mozilla.org/en/CSS/-moz-radial-gradient"                                                 // 1074
  },{                                                                                                                  // 1075
    "name": "W3C Gradient Spec",                                                                                       // 1076
    "href": "dev.w3.org/csswg/css3-images/#gradients-"                                                                 // 1077
  }]                                                                                                                   // 1078
}                                                                                                                      // 1079
!*/                                                                                                                    // 1080
                                                                                                                       // 1081
                                                                                                                       // 1082
  Modernizr.addTest('cssgradients', function() {                                                                       // 1083
                                                                                                                       // 1084
    var str1 = 'background-image:';                                                                                    // 1085
    var str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';                                         // 1086
    var str3 = 'linear-gradient(left top,#9f9, white);';                                                               // 1087
                                                                                                                       // 1088
    // standard syntax             // trailing 'background-image:'                                                     // 1089
    var css = str1 + prefixes.join(str3 + str1).slice(0, -str1.length);                                                // 1090
    if (Modernizr._config.usePrefixes) {                                                                               // 1091
    // legacy webkit syntax (FIXME: remove when syntax not in use anymore)                                             // 1092
      css += str1 + '-webkit-' + str2;                                                                                 // 1093
    }                                                                                                                  // 1094
                                                                                                                       // 1095
    var elem = createElement('div');                                                                                   // 1096
    var style = elem.style;                                                                                            // 1097
    style.cssText = css;                                                                                               // 1098
                                                                                                                       // 1099
    // IE6 returns undefined so cast to string                                                                         // 1100
    return ('' + style.backgroundImage).indexOf('gradient') > -1;                                                      // 1101
  });                                                                                                                  // 1102
                                                                                                                       // 1103
/*!                                                                                                                    // 1104
{                                                                                                                      // 1105
  "name": "CSS Multiple Backgrounds",                                                                                  // 1106
  "caniuse": "multibackgrounds",                                                                                       // 1107
  "property": "multiplebgs",                                                                                           // 1108
  "tags": ["css"]                                                                                                      // 1109
}                                                                                                                      // 1110
!*/                                                                                                                    // 1111
                                                                                                                       // 1112
  // Setting multiple images AND a color on the background shorthand property                                          // 1113
  // and then querying the style.background property value for the number of                                           // 1114
  // occurrences of "url(" is a reliable method for detecting ACTUAL support for this!                                 // 1115
                                                                                                                       // 1116
  Modernizr.addTest('multiplebgs', function() {                                                                        // 1117
    var elem = createElement('div');                                                                                   // 1118
    var style = elem.style;                                                                                            // 1119
    style.cssText = 'background:url(https://),url(https://),red url(https://)';                                        // 1120
                                                                                                                       // 1121
    // If the UA supports multiple backgrounds, there should be three occurrences                                      // 1122
    // of the string "url(" in the return value for elemStyle.background                                               // 1123
    return (/(url\s*\(.*?){3}/).test(style.background);                                                                // 1124
  });                                                                                                                  // 1125
                                                                                                                       // 1126
/*!                                                                                                                    // 1127
{                                                                                                                      // 1128
  "name": "CSS Opacity",                                                                                               // 1129
  "caniuse": "css-opacity",                                                                                            // 1130
  "property": "opacity",                                                                                               // 1131
  "tags": ["css"],                                                                                                     // 1132
  "notes": ["Opacity must be be in the range of [0.0,1.0], according to the spec."]                                    // 1133
}                                                                                                                      // 1134
!*/                                                                                                                    // 1135
                                                                                                                       // 1136
  // Browsers that actually have CSS Opacity implemented have done so                                                  // 1137
  // according to spec, which means their return values are within the                                                 // 1138
  // range of [0.0,1.0] - including the leading zero.                                                                  // 1139
                                                                                                                       // 1140
  Modernizr.addTest('opacity', function() {                                                                            // 1141
    var elem = createElement('div');                                                                                   // 1142
    var style = elem.style;                                                                                            // 1143
    style.cssText = prefixes.join('opacity:.55;');                                                                     // 1144
                                                                                                                       // 1145
    // The non-literal . in this regex is intentional:                                                                 // 1146
    // German Chrome returns this value as 0,55                                                                        // 1147
    // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632                                                  // 1148
    return (/^0.55$/).test(style.opacity);                                                                             // 1149
  });                                                                                                                  // 1150
                                                                                                                       // 1151
/*!                                                                                                                    // 1152
{                                                                                                                      // 1153
  "name": "CSS rgba",                                                                                                  // 1154
  "caniuse": "css3-colors",                                                                                            // 1155
  "property": "rgba",                                                                                                  // 1156
  "tags": ["css"],                                                                                                     // 1157
  "notes": [{                                                                                                          // 1158
    "name": "CSSTricks Tutorial",                                                                                      // 1159
    "href": "http://css-tricks.com/rgba-browser-support/"                                                              // 1160
  }]                                                                                                                   // 1161
}                                                                                                                      // 1162
!*/                                                                                                                    // 1163
                                                                                                                       // 1164
  Modernizr.addTest('rgba', function() {                                                                               // 1165
    var elem = createElement('div');                                                                                   // 1166
    var style = elem.style;                                                                                            // 1167
    style.cssText = 'background-color:rgba(150,255,150,.5)';                                                           // 1168
                                                                                                                       // 1169
    return ('' + style.backgroundColor).indexOf('rgba') > -1;                                                          // 1170
  });                                                                                                                  // 1171
                                                                                                                       // 1172
/*!                                                                                                                    // 1173
{                                                                                                                      // 1174
  "name": "Drag & Drop",                                                                                               // 1175
  "property": "draganddrop",                                                                                           // 1176
  "caniuse": "dragndrop",                                                                                              // 1177
  "knownBugs": ["Mobile browsers like Android, iOS < 6, and Firefox OS technically support the APIs, but don't expose it to the end user, resulting in a false positive."],
  "notes": [{                                                                                                          // 1179
    "name": "W3C spec",                                                                                                // 1180
    "href": "http://www.w3.org/TR/2010/WD-html5-20101019/dnd.html"                                                     // 1181
  }],                                                                                                                  // 1182
  "polyfills": ["dropfile", "moxie", "fileapi"]                                                                        // 1183
}                                                                                                                      // 1184
!*/                                                                                                                    // 1185
/* DOC                                                                                                                 // 1186
Detects support for native drag & drop of elements.                                                                    // 1187
*/                                                                                                                     // 1188
                                                                                                                       // 1189
  Modernizr.addTest('draganddrop', function() {                                                                        // 1190
    var div = createElement('div');                                                                                    // 1191
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);                                          // 1192
  });                                                                                                                  // 1193
                                                                                                                       // 1194
/*!                                                                                                                    // 1195
{                                                                                                                      // 1196
  "name" : "HTML5 Audio Element",                                                                                      // 1197
  "property": "audio",                                                                                                 // 1198
  "tags" : ["html5", "audio", "media"]                                                                                 // 1199
}                                                                                                                      // 1200
!*/                                                                                                                    // 1201
/* DOC                                                                                                                 // 1202
Detects the audio element                                                                                              // 1203
*/                                                                                                                     // 1204
                                                                                                                       // 1205
  // This tests evaluates support of the audio element, as well as                                                     // 1206
  // testing what types of content it supports.                                                                        // 1207
  //                                                                                                                   // 1208
  // We're using the Boolean constructor here, so that we can extend the value                                         // 1209
  // e.g.  Modernizr.audio     // true                                                                                 // 1210
  //       Modernizr.audio.ogg // 'probably'                                                                           // 1211
  //                                                                                                                   // 1212
  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845                                // 1213
  //                     thx to NielsLeenheer and zcorpan                                                              // 1214
                                                                                                                       // 1215
  // Note: in some older browsers, "no" was a return value instead of empty string.                                    // 1216
  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2                                                            // 1217
  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5                                                    // 1218
  Modernizr.addTest('audio', function() {                                                                              // 1219
    /* jshint -W053 */                                                                                                 // 1220
    var elem = createElement('audio');                                                                                 // 1221
    var bool = false;                                                                                                  // 1222
                                                                                                                       // 1223
    try {                                                                                                              // 1224
      if ( bool = !!elem.canPlayType ) {                                                                               // 1225
        bool      = new Boolean(bool);                                                                                 // 1226
        bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');                                 // 1227
        bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');                                 // 1228
        bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"') .replace(/^no$/,'');                                 // 1229
                                                                                                                       // 1230
        // Mimetypes accepted:                                                                                         // 1231
        //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements                          // 1232
        //   bit.ly/iphoneoscodecs                                                                                     // 1233
        bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');                                 // 1234
        bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||                                                   // 1235
                     elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');                                  // 1236
      }                                                                                                                // 1237
    } catch(e) { }                                                                                                     // 1238
                                                                                                                       // 1239
    return bool;                                                                                                       // 1240
  });                                                                                                                  // 1241
                                                                                                                       // 1242
/*!                                                                                                                    // 1243
{                                                                                                                      // 1244
  "name": "HTML5 Video",                                                                                               // 1245
  "property": "video",                                                                                                 // 1246
  "caniuse": "video",                                                                                                  // 1247
  "tags": ["html5"],                                                                                                   // 1248
  "knownBugs": [                                                                                                       // 1249
    "Without QuickTime, `Modernizr.video.h264` will be `undefined`; http://github.com/Modernizr/Modernizr/issues/546"  // 1250
  ],                                                                                                                   // 1251
  "polyfills": [                                                                                                       // 1252
    "html5media",                                                                                                      // 1253
    "mediaelementjs",                                                                                                  // 1254
    "sublimevideo",                                                                                                    // 1255
    "videojs",                                                                                                         // 1256
    "leanbackplayer",                                                                                                  // 1257
    "videoforeverybody"                                                                                                // 1258
  ]                                                                                                                    // 1259
}                                                                                                                      // 1260
!*/                                                                                                                    // 1261
/* DOC                                                                                                                 // 1262
Detects support for the video element, as well as testing what types of content it supports.                           // 1263
                                                                                                                       // 1264
Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:                             // 1265
                                                                                                                       // 1266
```javascript                                                                                                          // 1267
Modernizr.video         // true                                                                                        // 1268
Modernizr.video.ogg     // 'probably'                                                                                  // 1269
```                                                                                                                    // 1270
*/                                                                                                                     // 1271
                                                                                                                       // 1272
  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845                                // 1273
  //                     thx to NielsLeenheer and zcorpan                                                              // 1274
                                                                                                                       // 1275
  // Note: in some older browsers, "no" was a return value instead of empty string.                                    // 1276
  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2                                                            // 1277
  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5                                                    // 1278
                                                                                                                       // 1279
  Modernizr.addTest('video', function() {                                                                              // 1280
    /* jshint -W053 */                                                                                                 // 1281
    var elem = createElement('video');                                                                                 // 1282
    var bool = false;                                                                                                  // 1283
                                                                                                                       // 1284
    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224                                 // 1285
    try {                                                                                                              // 1286
      if ( bool = !!elem.canPlayType ) {                                                                               // 1287
        bool = new Boolean(bool);                                                                                      // 1288
        bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');                                  // 1289
                                                                                                                       // 1290
        // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546                // 1291
        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');                            // 1292
                                                                                                                       // 1293
        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');                           // 1294
                                                                                                                       // 1295
        bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,'');                                    // 1296
                                                                                                                       // 1297
        bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,'');                 // 1298
      }                                                                                                                // 1299
    } catch(e){}                                                                                                       // 1300
                                                                                                                       // 1301
    return bool;                                                                                                       // 1302
  });                                                                                                                  // 1303
                                                                                                                       // 1304
/*!                                                                                                                    // 1305
{                                                                                                                      // 1306
  "name": "Inline SVG",                                                                                                // 1307
  "property": "inlinesvg",                                                                                             // 1308
  "caniuse": "svg-html5",                                                                                              // 1309
  "tags": ["svg"],                                                                                                     // 1310
  "notes": [{                                                                                                          // 1311
    "name": "Test page",                                                                                               // 1312
    "href": "http://paulirish.com/demo/inline-svg"                                                                     // 1313
  }],                                                                                                                  // 1314
  "polyfills": ["inline-svg-polyfill"]                                                                                 // 1315
}                                                                                                                      // 1316
!*/                                                                                                                    // 1317
/* DOC                                                                                                                 // 1318
Detects support for inline SVG in HTML (not within XHTML).                                                             // 1319
*/                                                                                                                     // 1320
                                                                                                                       // 1321
  Modernizr.addTest('inlinesvg', function() {                                                                          // 1322
    var div = createElement('div');                                                                                    // 1323
    div.innerHTML = '<svg/>';                                                                                          // 1324
    return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';                            // 1325
  });                                                                                                                  // 1326
                                                                                                                       // 1327
/*!                                                                                                                    // 1328
{                                                                                                                      // 1329
  "name": "WebGL",                                                                                                     // 1330
  "property": "webgl",                                                                                                 // 1331
  "caniuse": "webgl",                                                                                                  // 1332
  "tags": ["webgl", "graphics"],                                                                                       // 1333
  "polyfills": ["jebgl", "webglcompat", "cwebgl", "iewebgl"]                                                           // 1334
}                                                                                                                      // 1335
!*/                                                                                                                    // 1336
                                                                                                                       // 1337
  Modernizr.addTest('webgl', function() {                                                                              // 1338
    var canvas = createElement('canvas');                                                                              // 1339
    var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' :  'supportsContext';               // 1340
    if (supports in canvas) {                                                                                          // 1341
      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');                                      // 1342
    }                                                                                                                  // 1343
    return 'WebGLRenderingContext' in window;                                                                          // 1344
  });                                                                                                                  // 1345
                                                                                                                       // 1346
                                                                                                                       // 1347
  // isEventSupported determines if the given element supports the given event                                         // 1348
  // kangax.github.com/iseventsupported/                                                                               // 1349
  // github.com/Modernizr/Modernizr/pull/636                                                                           // 1350
  //                                                                                                                   // 1351
  // Known incorrects:                                                                                                 // 1352
  //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative                                               // 1353
  //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333                         // 1354
  var isEventSupported = (function (undefined) {                                                                       // 1355
                                                                                                                       // 1356
    // Detect whether event support can be detected via `in`. Test on a DOM element                                    // 1357
    // using the "blur" event b/c it should always exist. bit.ly/event-detection                                       // 1358
    var needsFallback = !('onblur' in document.documentElement);                                                       // 1359
                                                                                                                       // 1360
    /**                                                                                                                // 1361
     * @param  {string|*}           eventName  is the name of an event to test for (e.g. "resize")                     // 1362
     * @param  {(Object|string|*)=} element    is the element|document|window|tagName to test on                       // 1363
     * @return {boolean}                                                                                               // 1364
     */                                                                                                                // 1365
    function isEventSupportedInner( eventName, element ) {                                                             // 1366
                                                                                                                       // 1367
      var isSupported;                                                                                                 // 1368
      if ( !eventName ) { return false; }                                                                              // 1369
      if ( !element || typeof element === 'string' ) {                                                                 // 1370
        element = createElement(element || 'div');                                                                     // 1371
      }                                                                                                                // 1372
                                                                                                                       // 1373
      // Testing via the `in` operator is sufficient for modern browsers and IE.                                       // 1374
      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and                                       // 1375
      // "resize", whereas `in` "catches" those.                                                                       // 1376
      eventName = 'on' + eventName;                                                                                    // 1377
      isSupported = eventName in element;                                                                              // 1378
                                                                                                                       // 1379
      // Fallback technique for old Firefox - bit.ly/event-detection                                                   // 1380
      if ( !isSupported && needsFallback ) {                                                                           // 1381
        if ( !element.setAttribute ) {                                                                                 // 1382
          // Switch to generic element if it lacks `setAttribute`.                                                     // 1383
          // It could be the `document`, `window`, or something else.                                                  // 1384
          element = createElement('div');                                                                              // 1385
        }                                                                                                              // 1386
        if ( element.setAttribute && element.removeAttribute ) {                                                       // 1387
          element.setAttribute(eventName, '');                                                                         // 1388
          isSupported = typeof element[eventName] === 'function';                                                      // 1389
                                                                                                                       // 1390
          if ( element[eventName] !== undefined ) {                                                                    // 1391
            // If property was created, "remove it" by setting value to `undefined`.                                   // 1392
            element[eventName] = undefined;                                                                            // 1393
          }                                                                                                            // 1394
          element.removeAttribute(eventName);                                                                          // 1395
        }                                                                                                              // 1396
      }                                                                                                                // 1397
                                                                                                                       // 1398
      return isSupported;                                                                                              // 1399
    }                                                                                                                  // 1400
    return isEventSupportedInner;                                                                                      // 1401
  })();                                                                                                                // 1402
                                                                                                                       // 1403
                                                                                                                       // 1404
                                                                                                                       // 1405
  // Modernizr.hasEvent() detects support for a given event, with an optional element to test on                       // 1406
  // Modernizr.hasEvent('gesturestart', elem)                                                                          // 1407
  var hasEvent = ModernizrProto.hasEvent = isEventSupported;                                                           // 1408
                                                                                                                       // 1409
/*!                                                                                                                    // 1410
{                                                                                                                      // 1411
  "name": "Hashchange event",                                                                                          // 1412
  "property": "hashchange",                                                                                            // 1413
  "caniuse": "hashchange",                                                                                             // 1414
  "tags": ["history"],                                                                                                 // 1415
  "notes": [{                                                                                                          // 1416
    "name": "MDN documentation",                                                                                       // 1417
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"                                     // 1418
  }],                                                                                                                  // 1419
  "polyfills": [                                                                                                       // 1420
    "jquery-hashchange",                                                                                               // 1421
    "moo-historymanager",                                                                                              // 1422
    "jquery-ajaxy",                                                                                                    // 1423
    "hasher",                                                                                                          // 1424
    "shistory"                                                                                                         // 1425
  ]                                                                                                                    // 1426
}                                                                                                                      // 1427
!*/                                                                                                                    // 1428
/* DOC                                                                                                                 // 1429
Detects support for the `hashchange` event, fired when the current location fragment changes.                          // 1430
*/                                                                                                                     // 1431
                                                                                                                       // 1432
  Modernizr.addTest('hashchange', function() {                                                                         // 1433
    if (hasEvent('hashchange', window) === false) {                                                                    // 1434
      return false;                                                                                                    // 1435
    }                                                                                                                  // 1436
                                                                                                                       // 1437
    // documentMode logic from YUI to filter out IE8 Compat Mode                                                       // 1438
    //   which false positives.                                                                                        // 1439
    return (document.documentMode === undefined || document.documentMode > 7);                                         // 1440
  });                                                                                                                  // 1441
                                                                                                                       // 1442
                                                                                                                       // 1443
  /**                                                                                                                  // 1444
   * contains returns a boolean for if substr is found within str.                                                     // 1445
   */                                                                                                                  // 1446
  function contains( str, substr ) {                                                                                   // 1447
    return !!~('' + str).indexOf(substr);                                                                              // 1448
  }                                                                                                                    // 1449
                                                                                                                       // 1450
  ;                                                                                                                    // 1451
/*!                                                                                                                    // 1452
{                                                                                                                      // 1453
  "name": "CSS HSLA Colors",                                                                                           // 1454
  "caniuse": "css3-colors",                                                                                            // 1455
  "property": "hsla",                                                                                                  // 1456
  "tags": ["css"],                                                                                                     // 1457
  "notes": ["Same as rgba(), in fact, browsers re-map hsla() to rgba() internally, except IE9 who retains it as hsla"] // 1458
}                                                                                                                      // 1459
!*/                                                                                                                    // 1460
                                                                                                                       // 1461
  Modernizr.addTest('hsla', function() {                                                                               // 1462
    var elem = createElement('div');                                                                                   // 1463
    var style = elem.style;                                                                                            // 1464
    style.cssText = 'background-color:hsla(120,40%,100%,.5)';                                                          // 1465
    return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');                         // 1466
  });                                                                                                                  // 1467
                                                                                                                       // 1468
/*!                                                                                                                    // 1469
{                                                                                                                      // 1470
  "name": "CSS Supports",                                                                                              // 1471
  "property": "supports",                                                                                              // 1472
  "caniuse": "css-featurequeries",                                                                                     // 1473
  "tags": ["css"],                                                                                                     // 1474
  "builderAliases": ["css_supports"],                                                                                  // 1475
  "notes": [{                                                                                                          // 1476
    "name": "W3 Spec",                                                                                                 // 1477
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"                                                    // 1478
  },{                                                                                                                  // 1479
    "name": "Related Github Issue",                                                                                    // 1480
    "href": "github.com/Modernizr/Modernizr/issues/648"                                                                // 1481
  },{                                                                                                                  // 1482
    "name": "W3 Info",                                                                                                 // 1483
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"                                  // 1484
  }]                                                                                                                   // 1485
}                                                                                                                      // 1486
!*/                                                                                                                    // 1487
                                                                                                                       // 1488
  Modernizr.addTest('supports', 'CSS' in window && 'supports' in window.CSS);                                          // 1489
                                                                                                                       // 1490
                                                                                                                       // 1491
  var inputElem = createElement('input');                                                                              // 1492
                                                                                                                       // 1493
                                                                                                                       // 1494
  var inputtypes = 'search tel url email datetime date month week time datetime-local number range color'.split(' ');  // 1495
                                                                                                                       // 1496
                                                                                                                       // 1497
  var inputs = {};                                                                                                     // 1498
                                                                                                                       // 1499
                                                                                                                       // 1500
  var smile = ':)';                                                                                                    // 1501
                                                                                                                       // 1502
/*!                                                                                                                    // 1503
{                                                                                                                      // 1504
  "name": "Form input types",                                                                                          // 1505
  "property": "inputtypes",                                                                                            // 1506
  "caniuse": "forms",                                                                                                  // 1507
  "tags": ["forms"],                                                                                                   // 1508
  "authors": ["Mike Taylor"],                                                                                          // 1509
  "polyfills": [                                                                                                       // 1510
    "jquerytools",                                                                                                     // 1511
    "webshims",                                                                                                        // 1512
    "h5f",                                                                                                             // 1513
    "webforms2",                                                                                                       // 1514
    "nwxforms",                                                                                                        // 1515
    "fdslider",                                                                                                        // 1516
    "html5slider",                                                                                                     // 1517
    "galleryhtml5forms",                                                                                               // 1518
    "jscolor",                                                                                                         // 1519
    "html5formshim",                                                                                                   // 1520
    "jqueryformshim",                                                                                                  // 1521
    "selectedoptionsjs",                                                                                               // 1522
    "formvalidationjs"                                                                                                 // 1523
  ]                                                                                                                    // 1524
}                                                                                                                      // 1525
!*/                                                                                                                    // 1526
/* DOC                                                                                                                 // 1527
Detects support for HTML5 form input types and exposes Boolean subproperties with the results:                         // 1528
                                                                                                                       // 1529
```javascript                                                                                                          // 1530
Modernizr.inputtypes.color                                                                                             // 1531
Modernizr.inputtypes.date                                                                                              // 1532
Modernizr.inputtypes.datetime                                                                                          // 1533
Modernizr.inputtypes['datetime-local']                                                                                 // 1534
Modernizr.inputtypes.email                                                                                             // 1535
Modernizr.inputtypes.month                                                                                             // 1536
Modernizr.inputtypes.number                                                                                            // 1537
Modernizr.inputtypes.range                                                                                             // 1538
Modernizr.inputtypes.search                                                                                            // 1539
Modernizr.inputtypes.tel                                                                                               // 1540
Modernizr.inputtypes.time                                                                                              // 1541
Modernizr.inputtypes.url                                                                                               // 1542
Modernizr.inputtypes.week                                                                                              // 1543
```                                                                                                                    // 1544
*/                                                                                                                     // 1545
                                                                                                                       // 1546
  // Run through HTML5's new input types to see if the UA understands any.                                             // 1547
  //   This is put behind the tests runloop because it doesn't return a                                                // 1548
  //   true/false like all the other tests; instead, it returns an object                                              // 1549
  //   containing each input type with its corresponding true/false value                                              // 1550
                                                                                                                       // 1551
  // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/                                            // 1552
  Modernizr['inputtypes'] = (function(props) {                                                                         // 1553
    var bool;                                                                                                          // 1554
    var inputElemType;                                                                                                 // 1555
    var defaultView;                                                                                                   // 1556
    var len = props.length;                                                                                            // 1557
                                                                                                                       // 1558
    for ( var i = 0; i < len; i++ ) {                                                                                  // 1559
                                                                                                                       // 1560
      inputElem.setAttribute('type', inputElemType = props[i]);                                                        // 1561
      bool = inputElem.type !== 'text';                                                                                // 1562
                                                                                                                       // 1563
      // We first check to see if the type we give it sticks..                                                         // 1564
      // If the type does, we feed it a textual value, which shouldn't be valid.                                       // 1565
      // If the value doesn't stick, we know there's input sanitization which infers a custom UI                       // 1566
      if ( bool ) {                                                                                                    // 1567
                                                                                                                       // 1568
        inputElem.value         = smile;                                                                               // 1569
        inputElem.style.cssText = 'position:absolute;visibility:hidden;';                                              // 1570
                                                                                                                       // 1571
        if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {                       // 1572
                                                                                                                       // 1573
          docElement.appendChild(inputElem);                                                                           // 1574
          defaultView = document.defaultView;                                                                          // 1575
                                                                                                                       // 1576
          // Safari 2-4 allows the smiley as a value, despite making a slider                                          // 1577
          bool =  defaultView.getComputedStyle &&                                                                      // 1578
            defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&                          // 1579
            // Mobile android web browser has false positive, so must                                                  // 1580
            // check the height to see if the widget is actually there.                                                // 1581
            (inputElem.offsetHeight !== 0);                                                                            // 1582
                                                                                                                       // 1583
          docElement.removeChild(inputElem);                                                                           // 1584
                                                                                                                       // 1585
        } else if ( /^(search|tel)$/.test(inputElemType) ){                                                            // 1586
          // Spec doesn't define any special parsing or detectable UI                                                  // 1587
          //   behaviors so we pass these through as true                                                              // 1588
                                                                                                                       // 1589
          // Interestingly, opera fails the earlier test, so it doesn't                                                // 1590
          //  even make it here.                                                                                       // 1591
                                                                                                                       // 1592
        } else if ( /^(url|email|number)$/.test(inputElemType) ) {                                                     // 1593
          // Real url and email support comes with prebaked validation.                                                // 1594
          bool = inputElem.checkValidity && inputElem.checkValidity() === false;                                       // 1595
                                                                                                                       // 1596
        } else {                                                                                                       // 1597
          // If the upgraded input compontent rejects the :) text, we got a winner                                     // 1598
          bool = inputElem.value != smile;                                                                             // 1599
        }                                                                                                              // 1600
      }                                                                                                                // 1601
                                                                                                                       // 1602
      inputs[ props[i] ] = !!bool;                                                                                     // 1603
    }                                                                                                                  // 1604
    return inputs;                                                                                                     // 1605
  })(inputtypes);                                                                                                      // 1606
                                                                                                                       // 1607
                                                                                                                       // 1608
  var attrs = {};                                                                                                      // 1609
                                                                                                                       // 1610
                                                                                                                       // 1611
  var inputattrs = 'autocomplete autofocus list placeholder max min multiple pattern required step'.split(' ');        // 1612
                                                                                                                       // 1613
/*!                                                                                                                    // 1614
{                                                                                                                      // 1615
  "name": "Input attributes",                                                                                          // 1616
  "property": "input",                                                                                                 // 1617
  "tags": ["forms"],                                                                                                   // 1618
  "authors": ["Mike Taylor"],                                                                                          // 1619
  "notes": [{                                                                                                          // 1620
    "name": "WHATWG spec",                                                                                             // 1621
    "href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary"
  }],                                                                                                                  // 1623
  "knownBugs": ["Some blackberry devices report false positive for input.multiple"]                                    // 1624
}                                                                                                                      // 1625
!*/                                                                                                                    // 1626
/* DOC                                                                                                                 // 1627
Detects support for HTML5 `<input>` element attributes and exposes Boolean subproperties with the results:             // 1628
                                                                                                                       // 1629
```javascript                                                                                                          // 1630
Modernizr.input.autocomplete                                                                                           // 1631
Modernizr.input.autofocus                                                                                              // 1632
Modernizr.input.list                                                                                                   // 1633
Modernizr.input.max                                                                                                    // 1634
Modernizr.input.min                                                                                                    // 1635
Modernizr.input.multiple                                                                                               // 1636
Modernizr.input.pattern                                                                                                // 1637
Modernizr.input.placeholder                                                                                            // 1638
Modernizr.input.required                                                                                               // 1639
Modernizr.input.step                                                                                                   // 1640
```                                                                                                                    // 1641
*/                                                                                                                     // 1642
                                                                                                                       // 1643
  // Run through HTML5's new input attributes to see if the UA understands any.                                        // 1644
  // Mike Taylr has created a comprehensive resource for testing these attributes                                      // 1645
  //   when applied to all input types:                                                                                // 1646
  //   miketaylr.com/code/input-type-attr.html                                                                         // 1647
                                                                                                                       // 1648
  // Only input placeholder is tested while textarea's placeholder is not.                                             // 1649
  // Currently Safari 4 and Opera 11 have support only for the input placeholder                                       // 1650
  // Both tests are available in feature-detects/forms-placeholder.js                                                  // 1651
  Modernizr['input'] = (function( props ) {                                                                            // 1652
    for ( var i = 0, len = props.length; i < len; i++ ) {                                                              // 1653
      attrs[ props[i] ] = !!(props[i] in inputElem);                                                                   // 1654
    }                                                                                                                  // 1655
    if (attrs.list){                                                                                                   // 1656
      // safari false positive's on datalist: webk.it/74252                                                            // 1657
      // see also github.com/Modernizr/Modernizr/issues/146                                                            // 1658
      attrs.list = !!(createElement('datalist') && window.HTMLDataListElement);                                        // 1659
    }                                                                                                                  // 1660
    return attrs;                                                                                                      // 1661
  })(inputattrs);                                                                                                      // 1662
                                                                                                                       // 1663
                                                                                                                       // 1664
  var toStringFn = ({}).toString;                                                                                      // 1665
                                                                                                                       // 1666
/*!                                                                                                                    // 1667
{                                                                                                                      // 1668
  "name": "SVG clip paths",                                                                                            // 1669
  "property": "svgclippaths",                                                                                          // 1670
  "tags": ["svg"],                                                                                                     // 1671
  "notes": [{                                                                                                          // 1672
    "name": "Demo",                                                                                                    // 1673
    "href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"                                        // 1674
  }]                                                                                                                   // 1675
}                                                                                                                      // 1676
!*/                                                                                                                    // 1677
/* DOC                                                                                                                 // 1678
Detects support for clip paths in SVG (only, not on HTML content).                                                     // 1679
                                                                                                                       // 1680
See [this discussion](http://github.com/Modernizr/Modernizr/issues/213) regarding applying SVG clip paths to HTML content.
*/                                                                                                                     // 1682
                                                                                                                       // 1683
  Modernizr.addTest('svgclippaths', function() {                                                                       // 1684
    return !!document.createElementNS &&                                                                               // 1685
      /SVGClipPath/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')));         // 1686
  });                                                                                                                  // 1687
                                                                                                                       // 1688
/*!                                                                                                                    // 1689
{                                                                                                                      // 1690
  "name": "SVG SMIL animation",                                                                                        // 1691
  "property": "smil",                                                                                                  // 1692
  "caniuse": "svg-smil",                                                                                               // 1693
  "tags": ["svg"],                                                                                                     // 1694
  "notes": [{                                                                                                          // 1695
  "name": "W3C Synchronised Multimedia spec",                                                                          // 1696
  "href": "http://www.w3.org/AudioVideo/"                                                                              // 1697
  }]                                                                                                                   // 1698
}                                                                                                                      // 1699
!*/                                                                                                                    // 1700
                                                                                                                       // 1701
  // SVG SMIL animation                                                                                                // 1702
  Modernizr.addTest('smil', function() {                                                                               // 1703
    return !!document.createElementNS &&                                                                               // 1704
      /SVGAnimate/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'animate')));           // 1705
  });                                                                                                                  // 1706
                                                                                                                       // 1707
                                                                                                                       // 1708
  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);                               // 1709
  ModernizrProto._cssomPrefixes = cssomPrefixes;                                                                       // 1710
                                                                                                                       // 1711
                                                                                                                       // 1712
  function getBody() {                                                                                                 // 1713
    // After page load injecting a fake body doesn't work so check if body exists                                      // 1714
    var body = document.body;                                                                                          // 1715
                                                                                                                       // 1716
    if(!body) {                                                                                                        // 1717
      // Can't use the real body create a fake one.                                                                    // 1718
      body = createElement('body');                                                                                    // 1719
      body.fake = true;                                                                                                // 1720
    }                                                                                                                  // 1721
                                                                                                                       // 1722
    return body;                                                                                                       // 1723
  }                                                                                                                    // 1724
                                                                                                                       // 1725
  ;                                                                                                                    // 1726
                                                                                                                       // 1727
  // Inject element with style element and some CSS rules                                                              // 1728
  function injectElementWithStyles( rule, callback, nodes, testnames ) {                                               // 1729
    var mod = 'modernizr';                                                                                             // 1730
    var style;                                                                                                         // 1731
    var ret;                                                                                                           // 1732
    var node;                                                                                                          // 1733
    var docOverflow;                                                                                                   // 1734
    var div = createElement('div');                                                                                    // 1735
    var body = getBody();                                                                                              // 1736
                                                                                                                       // 1737
    if ( parseInt(nodes, 10) ) {                                                                                       // 1738
      // In order not to give false positives we create a node for each test                                           // 1739
      // This also allows the method to scale for unspecified uses                                                     // 1740
      while ( nodes-- ) {                                                                                              // 1741
        node = createElement('div');                                                                                   // 1742
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);                                                    // 1743
        div.appendChild(node);                                                                                         // 1744
      }                                                                                                                // 1745
    }                                                                                                                  // 1746
                                                                                                                       // 1747
    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed                       // 1748
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element                      // 1749
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.             // 1750
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx                                                       // 1751
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277           // 1752
    style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');                                           // 1753
    div.id = mod;                                                                                                      // 1754
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;                                                                      // 1757
    body.appendChild(div);                                                                                             // 1758
    if ( body.fake ) {                                                                                                 // 1759
      //avoid crashing IE8, if background image is used                                                                // 1760
      body.style.background = '';                                                                                      // 1761
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible                  // 1762
      body.style.overflow = 'hidden';                                                                                  // 1763
      docOverflow = docElement.style.overflow;                                                                         // 1764
      docElement.style.overflow = 'hidden';                                                                            // 1765
      docElement.appendChild(body);                                                                                    // 1766
    }                                                                                                                  // 1767
                                                                                                                       // 1768
    ret = callback(div, rule);                                                                                         // 1769
    // If this is done after page load we don't want to remove the body so check if body exists                        // 1770
    if ( body.fake ) {                                                                                                 // 1771
      body.parentNode.removeChild(body);                                                                               // 1772
      docElement.style.overflow = docOverflow;                                                                         // 1773
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+                                                   // 1774
      docElement.offsetHeight;                                                                                         // 1775
    } else {                                                                                                           // 1776
      div.parentNode.removeChild(div);                                                                                 // 1777
    }                                                                                                                  // 1778
                                                                                                                       // 1779
    return !!ret;                                                                                                      // 1780
                                                                                                                       // 1781
  }                                                                                                                    // 1782
                                                                                                                       // 1783
  ;                                                                                                                    // 1784
                                                                                                                       // 1785
  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;                                                // 1786
                                                                                                                       // 1787
/*!                                                                                                                    // 1788
{                                                                                                                      // 1789
  "name": "@font-face",                                                                                                // 1790
  "property": "fontface",                                                                                              // 1791
  "authors": ["Diego Perini", "Mat Marquis"],                                                                          // 1792
  "tags": ["css"],                                                                                                     // 1793
  "knownBugs": [                                                                                                       // 1794
    "False Positive: WebOS http://github.com/Modernizr/Modernizr/issues/342",                                          // 1795
    "False Postive: WP7 http://github.com/Modernizr/Modernizr/issues/538"                                              // 1796
  ],                                                                                                                   // 1797
  "notes": [{                                                                                                          // 1798
    "name": "@font-face detection routine by Diego Perini",                                                            // 1799
    "href": "http://javascript.nwbox.com/CSSSupport/"                                                                  // 1800
  },{                                                                                                                  // 1801
    "name": "Filament Group @font-face compatibility research",                                                        // 1802
    "href": "https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.p"      // 1803
  },{                                                                                                                  // 1804
    "name": "Filament Grunticon/@font-face device testing results",                                                    // 1805
    "href": "https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0"           // 1806
  },{                                                                                                                  // 1807
    "name": "CSS fonts on Android",                                                                                    // 1808
    "href": "http://stackoverflow.com/questions/3200069/css-fonts-on-android"                                          // 1809
  },{                                                                                                                  // 1810
    "name": "@font-face and Android",                                                                                  // 1811
    "href": "http://archivist.incutio.com/viewlist/css-discuss/115960"                                                 // 1812
  }]                                                                                                                   // 1813
}                                                                                                                      // 1814
!*/                                                                                                                    // 1815
                                                                                                                       // 1816
  var blacklist = (function() {                                                                                        // 1817
    var ua = navigator.userAgent;                                                                                      // 1818
    var wkvers = ua.match( /applewebkit\/([0-9]+)/gi ) && parseFloat( RegExp.$1 );                                     // 1819
    var webos = ua.match( /w(eb)?osbrowser/gi );                                                                       // 1820
    var wppre8 = ua.match( /windows phone/gi ) && ua.match( /iemobile\/([0-9])+/gi ) && parseFloat( RegExp.$1 ) >= 9;  // 1821
    var oldandroid = wkvers < 533 && ua.match( /android/gi );                                                          // 1822
    return webos || oldandroid || wppre8;                                                                              // 1823
  }());                                                                                                                // 1824
  if( blacklist ) {                                                                                                    // 1825
    Modernizr.addTest('fontface', false);                                                                              // 1826
  } else {                                                                                                             // 1827
    testStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {                         // 1828
      var style = document.getElementById('smodernizr');                                                               // 1829
      var sheet = style.sheet || style.styleSheet;                                                                     // 1830
      var cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
      var bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;                                    // 1832
      Modernizr.addTest('fontface', bool);                                                                             // 1833
    });                                                                                                                // 1834
  }                                                                                                                    // 1835
;                                                                                                                      // 1836
/*!                                                                                                                    // 1837
{                                                                                                                      // 1838
  "name": "CSS Generated Content",                                                                                     // 1839
  "property": "generatedcontent",                                                                                      // 1840
  "tags": ["css"],                                                                                                     // 1841
  "warnings": ["Android won't return correct height for anything below 7px #738"]                                      // 1842
}                                                                                                                      // 1843
!*/                                                                                                                    // 1844
                                                                                                                       // 1845
  testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function( node ) { // 1846
    Modernizr.addTest('generatedcontent', node.offsetHeight >= 7);                                                     // 1847
  });                                                                                                                  // 1848
                                                                                                                       // 1849
                                                                                                                       // 1850
  // Change the function's scope.                                                                                      // 1851
  function fnBind(fn, that) {                                                                                          // 1852
    return function() {                                                                                                // 1853
      return fn.apply(that, arguments);                                                                                // 1854
    };                                                                                                                 // 1855
  }                                                                                                                    // 1856
                                                                                                                       // 1857
  ;                                                                                                                    // 1858
                                                                                                                       // 1859
  /**                                                                                                                  // 1860
   * testDOMProps is a generic DOM property test; if a browser supports                                                // 1861
   *   a certain property, it won't return undefined for it.                                                           // 1862
   */                                                                                                                  // 1863
  function testDOMProps( props, obj, elem ) {                                                                          // 1864
    var item;                                                                                                          // 1865
                                                                                                                       // 1866
    for ( var i in props ) {                                                                                           // 1867
      if ( props[i] in obj ) {                                                                                         // 1868
                                                                                                                       // 1869
        // return the property name as a string                                                                        // 1870
        if (elem === false) return props[i];                                                                           // 1871
                                                                                                                       // 1872
        item = obj[props[i]];                                                                                          // 1873
                                                                                                                       // 1874
        // let's bind a function                                                                                       // 1875
        if (is(item, 'function')) {                                                                                    // 1876
          // bind to obj unless overriden                                                                              // 1877
          return fnBind(item, elem || obj);                                                                            // 1878
        }                                                                                                              // 1879
                                                                                                                       // 1880
        // return the unbound function or obj or value                                                                 // 1881
        return item;                                                                                                   // 1882
      }                                                                                                                // 1883
    }                                                                                                                  // 1884
    return false;                                                                                                      // 1885
  }                                                                                                                    // 1886
                                                                                                                       // 1887
  ;                                                                                                                    // 1888
                                                                                                                       // 1889
  /**                                                                                                                  // 1890
   * Create our "modernizr" element that we do most feature tests on.                                                  // 1891
   */                                                                                                                  // 1892
  var modElem = {                                                                                                      // 1893
    elem : createElement('modernizr')                                                                                  // 1894
  };                                                                                                                   // 1895
                                                                                                                       // 1896
  // Clean up this element                                                                                             // 1897
  Modernizr._q.push(function() {                                                                                       // 1898
    delete modElem.elem;                                                                                               // 1899
  });                                                                                                                  // 1900
                                                                                                                       // 1901
                                                                                                                       // 1902
                                                                                                                       // 1903
  var mStyle = {                                                                                                       // 1904
    style : modElem.elem.style                                                                                         // 1905
  };                                                                                                                   // 1906
                                                                                                                       // 1907
  // kill ref for gc, must happen before                                                                               // 1908
  // mod.elem is removed, so we unshift on to                                                                          // 1909
  // the front of the queue.                                                                                           // 1910
  Modernizr._q.unshift(function() {                                                                                    // 1911
    delete mStyle.style;                                                                                               // 1912
  });                                                                                                                  // 1913
                                                                                                                       // 1914
                                                                                                                       // 1915
                                                                                                                       // 1916
  // Helper function for converting camelCase to kebab-case,                                                           // 1917
  // e.g. boxSizing -> box-sizing                                                                                      // 1918
  function domToCSS( name ) {                                                                                          // 1919
    return name.replace(/([A-Z])/g, function(str, m1) {                                                                // 1920
      return '-' + m1.toLowerCase();                                                                                   // 1921
    }).replace(/^ms-/, '-ms-');                                                                                        // 1922
  }                                                                                                                    // 1923
  ;                                                                                                                    // 1924
                                                                                                                       // 1925
  // Function to allow us to use native feature detection functionality if available.                                  // 1926
  // Accepts a list of property names and a single value                                                               // 1927
  // Returns `undefined` if native detection not available                                                             // 1928
  function nativeTestProps ( props, value ) {                                                                          // 1929
    var i = props.length;                                                                                              // 1930
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface                                 // 1931
    if ('CSS' in window && 'supports' in window.CSS) {                                                                 // 1932
      // Try every prefixed variant of the property                                                                    // 1933
      while (i--) {                                                                                                    // 1934
        if (window.CSS.supports(domToCSS(props[i]), value)) {                                                          // 1935
          return true;                                                                                                 // 1936
        }                                                                                                              // 1937
      }                                                                                                                // 1938
      return false;                                                                                                    // 1939
    }                                                                                                                  // 1940
    // Otherwise fall back to at-rule (for FF 17 and Opera 12.x)                                                       // 1941
    else if ('CSSSupportsRule' in window) {                                                                            // 1942
      // Build a condition string for every prefixed variant                                                           // 1943
      var conditionText = [];                                                                                          // 1944
      while (i--) {                                                                                                    // 1945
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');                                              // 1946
      }                                                                                                                // 1947
      conditionText = conditionText.join(' or ');                                                                      // 1948
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function( node ) {
        return (window.getComputedStyle ?                                                                              // 1950
                getComputedStyle(node, null) :                                                                         // 1951
                node.currentStyle)['position'] == 'absolute';                                                          // 1952
      });                                                                                                              // 1953
    }                                                                                                                  // 1954
    return undefined;                                                                                                  // 1955
  }                                                                                                                    // 1956
  ;                                                                                                                    // 1957
                                                                                                                       // 1958
  // testProps is a generic CSS / DOM property test.                                                                   // 1959
                                                                                                                       // 1960
  // In testing support for a given CSS property, it's legit to test:                                                  // 1961
  //    `elem.style[styleName] !== undefined`                                                                          // 1962
  // If the property is supported it will return an empty string,                                                      // 1963
  // if unsupported it will return undefined.                                                                          // 1964
                                                                                                                       // 1965
  // We'll take advantage of this quick test and skip setting a style                                                  // 1966
  // on our modernizr element, but instead just testing undefined vs                                                   // 1967
  // empty string.                                                                                                     // 1968
                                                                                                                       // 1969
  // Property names can be provided in either camelCase or kebab-case.                                                 // 1970
                                                                                                                       // 1971
  function testProps( props, prefixed, value, skipValueTest ) {                                                        // 1972
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;                                            // 1973
                                                                                                                       // 1974
    // Try native detect first                                                                                         // 1975
    if (!is(value, 'undefined')) {                                                                                     // 1976
      var result = nativeTestProps(props, value);                                                                      // 1977
      if(!is(result, 'undefined')) {                                                                                   // 1978
        return result;                                                                                                 // 1979
      }                                                                                                                // 1980
    }                                                                                                                  // 1981
                                                                                                                       // 1982
    // Otherwise do it properly                                                                                        // 1983
    var afterInit, i, propsLength, prop, before;                                                                       // 1984
                                                                                                                       // 1985
    // If we don't have a style element, that means                                                                    // 1986
    // we're running async or after the core tests,                                                                    // 1987
    // so we'll need to create our own elements to use                                                                 // 1988
    if ( !mStyle.style ) {                                                                                             // 1989
      afterInit = true;                                                                                                // 1990
      mStyle.modElem = createElement('modernizr');                                                                     // 1991
      mStyle.style = mStyle.modElem.style;                                                                             // 1992
    }                                                                                                                  // 1993
                                                                                                                       // 1994
    // Delete the objects if we                                                                                        // 1995
    // we created them.                                                                                                // 1996
    function cleanElems() {                                                                                            // 1997
      if (afterInit) {                                                                                                 // 1998
        delete mStyle.style;                                                                                           // 1999
        delete mStyle.modElem;                                                                                         // 2000
      }                                                                                                                // 2001
    }                                                                                                                  // 2002
                                                                                                                       // 2003
    propsLength = props.length;                                                                                        // 2004
    for ( i = 0; i < propsLength; i++ ) {                                                                              // 2005
      prop = props[i];                                                                                                 // 2006
      before = mStyle.style[prop];                                                                                     // 2007
                                                                                                                       // 2008
      if (contains(prop, '-')) {                                                                                       // 2009
        prop = cssToDOM(prop);                                                                                         // 2010
      }                                                                                                                // 2011
                                                                                                                       // 2012
      if ( mStyle.style[prop] !== undefined ) {                                                                        // 2013
                                                                                                                       // 2014
        // If value to test has been passed in, do a set-and-check test.                                               // 2015
        // 0 (integer) is a valid property value, so check that `value` isn't                                          // 2016
        // undefined, rather than just checking it's truthy.                                                           // 2017
        if (!skipValueTest && !is(value, 'undefined')) {                                                               // 2018
                                                                                                                       // 2019
          // Needs a try catch block because of old IE. This is slow, but will                                         // 2020
          // be avoided in most cases because `skipValueTest` will be used.                                            // 2021
          try {                                                                                                        // 2022
            mStyle.style[prop] = value;                                                                                // 2023
          } catch (e) {}                                                                                               // 2024
                                                                                                                       // 2025
          // If the property value has changed, we assume the value used is                                            // 2026
          // supported. If `value` is empty string, it'll fail here (because                                           // 2027
          // it hasn't changed), which matches how browsers have implemented                                           // 2028
          // CSS.supports()                                                                                            // 2029
          if (mStyle.style[prop] != before) {                                                                          // 2030
            cleanElems();                                                                                              // 2031
            return prefixed == 'pfx' ? prop : true;                                                                    // 2032
          }                                                                                                            // 2033
        }                                                                                                              // 2034
        // Otherwise just return true, or the property name if this is a                                               // 2035
        // `prefixed()` call                                                                                           // 2036
        else {                                                                                                         // 2037
          cleanElems();                                                                                                // 2038
          return prefixed == 'pfx' ? prop : true;                                                                      // 2039
        }                                                                                                              // 2040
      }                                                                                                                // 2041
    }                                                                                                                  // 2042
    cleanElems();                                                                                                      // 2043
    return false;                                                                                                      // 2044
  }                                                                                                                    // 2045
                                                                                                                       // 2046
  ;                                                                                                                    // 2047
                                                                                                                       // 2048
  // Modernizr.testProp() investigates whether a given style property is recognized                                    // 2049
  // Property names can be provided in either camelCase or kebab-case.                                                 // 2050
  // Modernizr.testProp('pointerEvents')                                                                               // 2051
  // Also accepts optional 2nd arg, of a value to use for native feature detection, e.g.:                              // 2052
  // Modernizr.testProp('pointerEvents', 'none')                                                                       // 2053
  var testProp = ModernizrProto.testProp = function( prop, value, useValue ) {                                         // 2054
    return testProps([prop], undefined, value, useValue);                                                              // 2055
  };                                                                                                                   // 2056
                                                                                                                       // 2057
/*!                                                                                                                    // 2058
{                                                                                                                      // 2059
  "name": "CSS textshadow",                                                                                            // 2060
  "property": "textshadow",                                                                                            // 2061
  "caniuse": "css-textshadow",                                                                                         // 2062
  "tags": ["css"],                                                                                                     // 2063
  "knownBugs": ["FF3.0 will false positive on this test"]                                                              // 2064
}                                                                                                                      // 2065
!*/                                                                                                                    // 2066
                                                                                                                       // 2067
  Modernizr.addTest('textshadow', testProp('textShadow', '1px 1px'));                                                  // 2068
                                                                                                                       // 2069
                                                                                                                       // 2070
  /**                                                                                                                  // 2071
   * testPropsAll tests a list of DOM properties we want to check against.                                             // 2072
   *     We specify literally ALL possible (known and/or likely) properties on                                         // 2073
   *     the element including the non-vendor prefixed one, for forward-                                               // 2074
   *     compatibility.                                                                                                // 2075
   */                                                                                                                  // 2076
  function testPropsAll( prop, prefixed, elem, value, skipValueTest ) {                                                // 2077
                                                                                                                       // 2078
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),                                                         // 2079
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');                                       // 2080
                                                                                                                       // 2081
    // did they call .prefixed('boxSizing') or are we just testing a prop?                                             // 2082
    if(is(prefixed, 'string') || is(prefixed, 'undefined')) {                                                          // 2083
      return testProps(props, prefixed, value, skipValueTest);                                                         // 2084
                                                                                                                       // 2085
      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])                                     // 2086
    } else {                                                                                                           // 2087
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');                                     // 2088
      return testDOMProps(props, prefixed, elem);                                                                      // 2089
    }                                                                                                                  // 2090
  }                                                                                                                    // 2091
                                                                                                                       // 2092
  // Modernizr.testAllProps() investigates whether a given style property,                                             // 2093
  //     or any of its vendor-prefixed variants, is recognized                                                         // 2094
  // Note that the property names must be provided in the camelCase variant.                                           // 2095
  // Modernizr.testAllProps('boxSizing')                                                                               // 2096
  ModernizrProto.testAllProps = testPropsAll;                                                                          // 2097
                                                                                                                       // 2098
                                                                                                                       // 2099
                                                                                                                       // 2100
  // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input                      // 2101
  // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'                                                                 // 2102
                                                                                                                       // 2103
  // Properties can be passed as DOM-style camelCase or CSS-style kebab-case.                                          // 2104
  // Return values will always be in camelCase; if you want kebab-case, use Modernizr.prefixedCSS().                   // 2105
                                                                                                                       // 2106
  // If you're trying to ascertain which transition end event to bind to, you might do something like...               // 2107
  //                                                                                                                   // 2108
  //     var transEndEventNames = {                                                                                    // 2109
  //         'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser                                      // 2110
  //         'MozTransition'    : 'transitionend',      // only for FF < 15                                            // 2111
  //         'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+                         // 2112
  //     },                                                                                                            // 2113
  //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];                                   // 2114
                                                                                                                       // 2115
  var prefixed = ModernizrProto.prefixed = function( prop, obj, elem ) {                                               // 2116
    if (prop.indexOf('@') === 0) {                                                                                     // 2117
      return atRule(prop);                                                                                             // 2118
    }                                                                                                                  // 2119
                                                                                                                       // 2120
    if (prop.indexOf('-') != -1) {                                                                                     // 2121
      // Convert kebab-case to camelCase                                                                               // 2122
      prop = cssToDOM(prop);                                                                                           // 2123
    }                                                                                                                  // 2124
    if (!obj) {                                                                                                        // 2125
      return testPropsAll(prop, 'pfx');                                                                                // 2126
    } else {                                                                                                           // 2127
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'   // 2128
      return testPropsAll(prop, obj, elem);                                                                            // 2129
    }                                                                                                                  // 2130
  };                                                                                                                   // 2131
                                                                                                                       // 2132
                                                                                                                       // 2133
/*!                                                                                                                    // 2134
{                                                                                                                      // 2135
  "name": "IndexedDB",                                                                                                 // 2136
  "property": "indexeddb",                                                                                             // 2137
  "caniuse": "indexeddb",                                                                                              // 2138
  "tags": ["storage"],                                                                                                 // 2139
  "polyfills": ["indexeddb"]                                                                                           // 2140
}                                                                                                                      // 2141
!*/                                                                                                                    // 2142
/* DOC                                                                                                                 // 2143
Detects support for the IndexedDB client-side storage API (final spec).                                                // 2144
*/                                                                                                                     // 2145
                                                                                                                       // 2146
  // Vendors had inconsistent prefixing with the experimental Indexed DB:                                              // 2147
  // - Webkit's implementation is accessible through webkitIndexedDB                                                   // 2148
  // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB                                // 2149
  // For speed, we don't test the legacy (and beta-only) indexedDB                                                     // 2150
                                                                                                                       // 2151
  var indexeddb = prefixed('indexedDB', window);                                                                       // 2152
  Modernizr.addTest('indexeddb', !!indexeddb);                                                                         // 2153
                                                                                                                       // 2154
  if (!!indexeddb) {                                                                                                   // 2155
    Modernizr.addTest('indexeddb.deletedatabase', 'deleteDatabase' in indexeddb);                                      // 2156
  }                                                                                                                    // 2157
;                                                                                                                      // 2158
                                                                                                                       // 2159
  /**                                                                                                                  // 2160
   * testAllProps determines whether a given CSS property, in some prefixed                                            // 2161
   * form, is supported by the browser. It can optionally be given a value; in                                         // 2162
   * which case testAllProps will only return true if the browser supports that                                        // 2163
   * value for the named property; this latter case will use native detection                                          // 2164
   * (via window.CSS.supports) if available. A boolean can be passed as a 3rd                                          // 2165
   * parameter to skip the value check when native detection isn't available,                                          // 2166
   * to improve performance when simply testing for support of a property.                                             // 2167
   *                                                                                                                   // 2168
   * @param prop - String naming the property to test (either camelCase or                                             // 2169
   *               kebab-case)                                                                                         // 2170
   * @param value - [optional] String of the value to test                                                             // 2171
   * @param skipValueTest - [optional] Whether to skip testing that the value                                          // 2172
   *                        is supported when using non-native detection                                               // 2173
   *                        (default: false)                                                                           // 2174
   */                                                                                                                  // 2175
  function testAllProps (prop, value, skipValueTest) {                                                                 // 2176
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);                                             // 2177
  }                                                                                                                    // 2178
  ModernizrProto.testAllProps = testAllProps;                                                                          // 2179
                                                                                                                       // 2180
/*!                                                                                                                    // 2181
{                                                                                                                      // 2182
  "name": "Background Size",                                                                                           // 2183
  "property": "backgroundsize",                                                                                        // 2184
  "tags": ["css"],                                                                                                     // 2185
  "knownBugs": ["This will false positive in Opera Mini - http://github.com/Modernizr/Modernizr/issues/396"],          // 2186
  "notes": [{                                                                                                          // 2187
    "name": "Related Issue",                                                                                           // 2188
    "href": "http://github.com/Modernizr/Modernizr/issues/396"                                                         // 2189
  }]                                                                                                                   // 2190
}                                                                                                                      // 2191
!*/                                                                                                                    // 2192
                                                                                                                       // 2193
  Modernizr.addTest('backgroundsize', testAllProps('backgroundSize', '100%', true));                                   // 2194
                                                                                                                       // 2195
/*!                                                                                                                    // 2196
{                                                                                                                      // 2197
  "name": "Border Image",                                                                                              // 2198
  "property": "borderimage",                                                                                           // 2199
  "caniuse": "border-image",                                                                                           // 2200
  "polyfills": ["css3pie"],                                                                                            // 2201
   "knownBugs": ["Android < 2.0 is true, but has a broken implementation"],                                            // 2202
  "tags": ["css"]                                                                                                      // 2203
}                                                                                                                      // 2204
!*/                                                                                                                    // 2205
                                                                                                                       // 2206
  Modernizr.addTest('borderimage', testAllProps('borderImage', 'url() 1', true));                                      // 2207
                                                                                                                       // 2208
/*!                                                                                                                    // 2209
{                                                                                                                      // 2210
  "name": "Border Radius",                                                                                             // 2211
  "property": "borderradius",                                                                                          // 2212
  "caniuse": "border-radius",                                                                                          // 2213
  "polyfills": ["css3pie"],                                                                                            // 2214
  "tags": ["css"],                                                                                                     // 2215
  "notes": [{                                                                                                          // 2216
    "name": "Comprehensive Compat Chart",                                                                              // 2217
    "href": "http://muddledramblings.com/table-of-css3-border-radius-compliance"                                       // 2218
  }]                                                                                                                   // 2219
}                                                                                                                      // 2220
!*/                                                                                                                    // 2221
                                                                                                                       // 2222
  Modernizr.addTest('borderradius', testAllProps('borderRadius', '0px', true));                                        // 2223
                                                                                                                       // 2224
/*!                                                                                                                    // 2225
{                                                                                                                      // 2226
  "name": "Box Shadow",                                                                                                // 2227
  "property": "boxshadow",                                                                                             // 2228
  "caniuse": "css-boxshadow",                                                                                          // 2229
  "tags": ["css"],                                                                                                     // 2230
  "knownBugs": [                                                                                                       // 2231
    "WebOS false positives on this test.",                                                                             // 2232
    "The Kindle Silk browser false positives"                                                                          // 2233
  ]                                                                                                                    // 2234
}                                                                                                                      // 2235
!*/                                                                                                                    // 2236
                                                                                                                       // 2237
  Modernizr.addTest('boxshadow', testAllProps('boxShadow', '1px 1px', true));                                          // 2238
                                                                                                                       // 2239
/*!                                                                                                                    // 2240
{                                                                                                                      // 2241
  "name": "CSS Animations",                                                                                            // 2242
  "property": "cssanimations",                                                                                         // 2243
  "caniuse": "css-animation",                                                                                          // 2244
  "polyfills": ["transformie", "csssandpaper"],                                                                        // 2245
  "tags": ["css"],                                                                                                     // 2246
  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],                   // 2247
  "notes": [{                                                                                                          // 2248
    "name" : "Article: 'Dispelling the Android CSS animation myths'",                                                  // 2249
    "href": "http://goo.gl/OGw5Gm"                                                                                     // 2250
  }]                                                                                                                   // 2251
}                                                                                                                      // 2252
!*/                                                                                                                    // 2253
/* DOC                                                                                                                 // 2254
Detects whether or not elements can be animated using CSS                                                              // 2255
*/                                                                                                                     // 2256
                                                                                                                       // 2257
  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));                                        // 2258
                                                                                                                       // 2259
/*!                                                                                                                    // 2260
{                                                                                                                      // 2261
  "name": "CSS Columns",                                                                                               // 2262
  "property": "csscolumns",                                                                                            // 2263
  "caniuse": "multicolumn",                                                                                            // 2264
  "polyfills": ["css3multicolumnjs"],                                                                                  // 2265
  "tags": ["css"]                                                                                                      // 2266
}                                                                                                                      // 2267
!*/                                                                                                                    // 2268
                                                                                                                       // 2269
                                                                                                                       // 2270
  (function() {                                                                                                        // 2271
                                                                                                                       // 2272
    /* jshint -W053 */                                                                                                 // 2273
    Modernizr.addTest('csscolumns', function(){                                                                        // 2274
      var bool = false;                                                                                                // 2275
      var test = testAllProps('columnCount');                                                                          // 2276
      try {                                                                                                            // 2277
        if ( bool = !!test ) {                                                                                         // 2278
          bool = new Boolean(bool);                                                                                    // 2279
        }                                                                                                              // 2280
      } catch(e){}                                                                                                     // 2281
                                                                                                                       // 2282
      return bool;                                                                                                     // 2283
    });                                                                                                                // 2284
                                                                                                                       // 2285
    var props = ['Width', 'Span', 'Fill', 'Gap', 'Rule', 'RuleColor', 'RuleStyle', 'RuleWidth', 'BreakBefore', 'BreakAfter', 'BreakInside'];
    var name, test;                                                                                                    // 2287
                                                                                                                       // 2288
    for (var i = 0; i < props.length; i++) {                                                                           // 2289
      name = props[i].toLowerCase();                                                                                   // 2290
      test = testAllProps('column' + props[i]);                                                                        // 2291
                                                                                                                       // 2292
      // break-before, break-after & break-inside are not "column"-prefixed in spec                                    // 2293
      if (name === 'breakbefore' || name === 'breakafter' || name == 'breakinside') {                                  // 2294
        test = test || testAllProps(props[i]);                                                                         // 2295
      }                                                                                                                // 2296
                                                                                                                       // 2297
      Modernizr.addTest('csscolumns.' + name, test);                                                                   // 2298
    }                                                                                                                  // 2299
                                                                                                                       // 2300
                                                                                                                       // 2301
  })();                                                                                                                // 2302
                                                                                                                       // 2303
                                                                                                                       // 2304
/*!                                                                                                                    // 2305
{                                                                                                                      // 2306
  "name": "CSS Reflections",                                                                                           // 2307
  "caniuse": "css-reflections",                                                                                        // 2308
  "property": "cssreflections",                                                                                        // 2309
  "tags": ["css"]                                                                                                      // 2310
}                                                                                                                      // 2311
!*/                                                                                                                    // 2312
                                                                                                                       // 2313
  Modernizr.addTest('cssreflections', testAllProps('boxReflect', 'above', true));                                      // 2314
                                                                                                                       // 2315
/*!                                                                                                                    // 2316
{                                                                                                                      // 2317
  "name": "CSS Transforms",                                                                                            // 2318
  "property": "csstransforms",                                                                                         // 2319
  "caniuse": "transforms2d",                                                                                           // 2320
  "tags": ["css"]                                                                                                      // 2321
}                                                                                                                      // 2322
!*/                                                                                                                    // 2323
                                                                                                                       // 2324
  Modernizr.addTest('csstransforms', function() {                                                                      // 2325
    // Android < 3.0 is buggy, so we sniff and blacklist                                                               // 2326
    // http://git.io/hHzL7w                                                                                            // 2327
    return navigator.userAgent.indexOf('Android 2.') === -1 &&                                                         // 2328
           testAllProps('transform', 'scale(1)', true);                                                                // 2329
  });                                                                                                                  // 2330
                                                                                                                       // 2331
/*!                                                                                                                    // 2332
{                                                                                                                      // 2333
  "name": "CSS Transforms 3D",                                                                                         // 2334
  "property": "csstransforms3d",                                                                                       // 2335
  "caniuse": "transforms3d",                                                                                           // 2336
  "tags": ["css"],                                                                                                     // 2337
  "warnings": [                                                                                                        // 2338
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]                                                                                                                    // 2340
}                                                                                                                      // 2341
!*/                                                                                                                    // 2342
                                                                                                                       // 2343
  Modernizr.addTest('csstransforms3d', function() {                                                                    // 2344
    var ret = !!testAllProps('perspective', '1px', true);                                                              // 2345
    var usePrefix = Modernizr._config.usePrefixes;                                                                     // 2346
                                                                                                                       // 2347
    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.                                   // 2348
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in                                     // 2349
    //   some conditions. As a result, Webkit typically recognizes the syntax but                                      // 2350
    //   will sometimes throw a false positive, thus we must do a more thorough check:                                 // 2351
    if ( ret && (!usePrefix || 'webkitPerspective' in docElement.style )) {                                            // 2352
      var mq;                                                                                                          // 2353
      // Use CSS Conditional Rules if available                                                                        // 2354
      if (Modernizr.supports) {                                                                                        // 2355
        mq = '@supports (perspective: 1px)';                                                                           // 2356
      } else {                                                                                                         // 2357
        // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.                        // 2358
        // `@media (transform-3d),(-webkit-transform-3d){ ... }`                                                       // 2359
        mq = '@media (transform-3d)';                                                                                  // 2360
        if (usePrefix ) mq += ',(-webkit-transform-3d)';                                                               // 2361
      }                                                                                                                // 2362
      // If loaded inside the body tag and the test element inherits any padding, margin or borders it will fail #740  // 2363
      mq += '{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}';                         // 2364
                                                                                                                       // 2365
      testStyles(mq, function( elem ) {                                                                                // 2366
        ret = elem.offsetLeft === 9 && elem.offsetHeight === 5;                                                        // 2367
      });                                                                                                              // 2368
    }                                                                                                                  // 2369
                                                                                                                       // 2370
    return ret;                                                                                                        // 2371
  });                                                                                                                  // 2372
                                                                                                                       // 2373
/*!                                                                                                                    // 2374
{                                                                                                                      // 2375
  "name": "CSS Transitions",                                                                                           // 2376
  "property": "csstransitions",                                                                                        // 2377
  "caniuse": "css-transitions",                                                                                        // 2378
  "tags": ["css"]                                                                                                      // 2379
}                                                                                                                      // 2380
!*/                                                                                                                    // 2381
                                                                                                                       // 2382
  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));                                        // 2383
                                                                                                                       // 2384
/*!                                                                                                                    // 2385
{                                                                                                                      // 2386
  "name": "Flexbox",                                                                                                   // 2387
  "property": "flexbox",                                                                                               // 2388
  "caniuse": "flexbox",                                                                                                // 2389
  "tags": ["css"],                                                                                                     // 2390
  "notes": [{                                                                                                          // 2391
    "name": "The _new_ flexbox",                                                                                       // 2392
    "href": "http://dev.w3.org/csswg/css3-flexbox"                                                                     // 2393
  }],                                                                                                                  // 2394
  "warnings": [                                                                                                        // 2395
    "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
  ]                                                                                                                    // 2397
}                                                                                                                      // 2398
!*/                                                                                                                    // 2399
/* DOC                                                                                                                 // 2400
Detects support for the Flexible Box Layout model, a.k.a. Flexbox, which allows easy manipulation of layout order and sizing within a container.
*/                                                                                                                     // 2402
                                                                                                                       // 2403
  Modernizr.addTest('flexbox', testAllProps('flexBasis', '1px', true));                                                // 2404
                                                                                                                       // 2405
/*!                                                                                                                    // 2406
{                                                                                                                      // 2407
  "name": "Flexbox (legacy)",                                                                                          // 2408
  "property": "flexboxlegacy",                                                                                         // 2409
  "tags": ["css"],                                                                                                     // 2410
  "polyfills": ["flexie"],                                                                                             // 2411
  "notes": [{                                                                                                          // 2412
    "name": "The _old_ flexbox",                                                                                       // 2413
    "href": "http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/"                                                      // 2414
  }]                                                                                                                   // 2415
}                                                                                                                      // 2416
!*/                                                                                                                    // 2417
                                                                                                                       // 2418
  Modernizr.addTest('flexboxlegacy', testAllProps('boxDirection', 'reverse', true));                                   // 2419
                                                                                                                       // 2420
                                                                                                                       // 2421
  // Run each test                                                                                                     // 2422
  testRunner();                                                                                                        // 2423
                                                                                                                       // 2424
  // Remove the "no-js" class if it exists                                                                             // 2425
  setClasses(classes);                                                                                                 // 2426
                                                                                                                       // 2427
  delete ModernizrProto.addTest;                                                                                       // 2428
  delete ModernizrProto.addAsyncTest;                                                                                  // 2429
                                                                                                                       // 2430
  // Run the things that are supposed to run after the tests                                                           // 2431
  for (var i = 0; i < Modernizr._q.length; i++) {                                                                      // 2432
    Modernizr._q[i]();                                                                                                 // 2433
  }                                                                                                                    // 2434
                                                                                                                       // 2435
  // Leak Modernizr namespace                                                                                          // 2436
  window.Modernizr = Modernizr;                                                                                        // 2437
                                                                                                                       // 2438
                                                                                                                       // 2439
                                                                                                                       // 2440
})(window, document);                                                                                                  // 2441
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cwaring:modernizr'] = {};

})();
