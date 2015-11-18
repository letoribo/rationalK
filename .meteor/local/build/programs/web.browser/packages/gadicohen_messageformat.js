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
var Mongo = Package.mongo.Mongo;
var headers = Package['gadicohen:headers'].headers;
var Injected = Package['meteorhacks:inject-initial'].Injected;
var Inject = Package['meteorhacks:inject-initial'].Inject;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Session = Package.session.Session;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var mfPkg, mf, exports, lang, key;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/messageformat.js/messageformat.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * messageformat.js                                                                                                   // 2
 *                                                                                                                    // 3
 * ICU PluralFormat + SelectFormat for JavaScript                                                                     // 4
 *                                                                                                                    // 5
 * @author Alex Sexton - @SlexAxton                                                                                   // 6
 * @version 0.1.5                                                                                                     // 7
 * @license WTFPL                                                                                                     // 8
 * @contributor_license Dojo CLA                                                                                      // 9
*/                                                                                                                    // 10
(function ( root ) {                                                                                                  // 11
                                                                                                                      // 12
  // Create the contructor function                                                                                   // 13
  function MessageFormat ( locale, pluralFunc ) {                                                                     // 14
    var fallbackLocale;                                                                                               // 15
                                                                                                                      // 16
    if ( locale && pluralFunc ) {                                                                                     // 17
      MessageFormat.locale[ locale ] = pluralFunc;                                                                    // 18
    }                                                                                                                 // 19
                                                                                                                      // 20
    // Defaults                                                                                                       // 21
    fallbackLocale = locale = locale || "en";                                                                         // 22
    pluralFunc = pluralFunc || MessageFormat.locale[ fallbackLocale = MessageFormat.Utils.getFallbackLocale( locale ) ];
                                                                                                                      // 24
    if ( ! pluralFunc ) {                                                                                             // 25
      throw new Error( "Plural Function not found for locale: " + locale );                                           // 26
    }                                                                                                                 // 27
                                                                                                                      // 28
    // Own Properties                                                                                                 // 29
    this.pluralFunc = pluralFunc;                                                                                     // 30
    this.locale = locale;                                                                                             // 31
    this.fallbackLocale = fallbackLocale;                                                                             // 32
  }                                                                                                                   // 33
                                                                                                                      // 34
  // Set up the locales object. Add in english by default                                                             // 35
  MessageFormat.locale = {                                                                                            // 36
    "en" : function ( n ) {                                                                                           // 37
      if ( n === 1 ) {                                                                                                // 38
        return "one";                                                                                                 // 39
      }                                                                                                               // 40
      return "other";                                                                                                 // 41
    }                                                                                                                 // 42
  };                                                                                                                  // 43
                                                                                                                      // 44
  // Build out our basic SafeString type                                                                              // 45
  // more or less stolen from Handlebars by @wycats                                                                   // 46
  MessageFormat.SafeString = function( string ) {                                                                     // 47
    this.string = string;                                                                                             // 48
  };                                                                                                                  // 49
                                                                                                                      // 50
  MessageFormat.SafeString.prototype.toString = function () {                                                         // 51
    return this.string.toString();                                                                                    // 52
  };                                                                                                                  // 53
                                                                                                                      // 54
  MessageFormat.Utils = {                                                                                             // 55
    numSub : function ( string, key, depth ) {                                                                        // 56
      // make sure that it's not an escaped octothorpe                                                                // 57
      return string.replace( /^#|[^\\]#/g, function (m) {                                                             // 58
        var prefix = m && m.length === 2 ? m.charAt(0) : '';                                                          // 59
        return prefix + '" + (function(){ var x = ' +                                                                 // 60
        key+';\nif( isNaN(x) ){\nthrow new Error("MessageFormat: `"+lastkey_'+depth+'+"` isnt a number.");\n}\nreturn x;\n})() + "';
      });                                                                                                             // 62
    },                                                                                                                // 63
    escapeExpression : function (string) {                                                                            // 64
      var escape = {                                                                                                  // 65
            "\n": "\\n",                                                                                              // 66
            "\"": '\\"'                                                                                               // 67
          },                                                                                                          // 68
          badChars = /[\n"]/g,                                                                                        // 69
          possible = /[\n"]/,                                                                                         // 70
          escapeChar = function(chr) {                                                                                // 71
            return escape[chr] || "&amp;";                                                                            // 72
          };                                                                                                          // 73
                                                                                                                      // 74
      // Don't escape SafeStrings, since they're already safe                                                         // 75
      if ( string instanceof MessageFormat.SafeString ) {                                                             // 76
        return string.toString();                                                                                     // 77
      }                                                                                                               // 78
      else if ( string === null || string === false ) {                                                               // 79
        return "";                                                                                                    // 80
      }                                                                                                               // 81
                                                                                                                      // 82
      if ( ! possible.test( string ) ) {                                                                              // 83
        return string;                                                                                                // 84
      }                                                                                                               // 85
      return string.replace( badChars, escapeChar );                                                                  // 86
    },                                                                                                                // 87
    getFallbackLocale: function( locale ) {                                                                           // 88
      var tagSeparator = locale.indexOf("-") >= 0 ? "-" : "_";                                                        // 89
                                                                                                                      // 90
      // Lets just be friends, fallback through the language tags                                                     // 91
      while ( ! MessageFormat.locale.hasOwnProperty( locale ) ) {                                                     // 92
        locale = locale.substring(0, locale.lastIndexOf( tagSeparator ));                                             // 93
        if (locale.length === 0) {                                                                                    // 94
          return null;                                                                                                // 95
        }                                                                                                             // 96
      }                                                                                                               // 97
                                                                                                                      // 98
      return locale;                                                                                                  // 99
    }                                                                                                                 // 100
  };                                                                                                                  // 101
                                                                                                                      // 102
  // This is generated and pulled in for browsers.                                                                    // 103
  var mparser = (function(){                                                                                          // 104
    /*                                                                                                                // 105
     * Generated by PEG.js 0.7.0.                                                                                     // 106
     *                                                                                                                // 107
     * http://pegjs.majda.cz/                                                                                         // 108
     */                                                                                                               // 109
                                                                                                                      // 110
    function quote(s) {                                                                                               // 111
      /*                                                                                                              // 112
       * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a                                           // 113
       * string literal except for the closing quote character, backslash,                                            // 114
       * carriage return, line separator, paragraph separator, and line feed.                                         // 115
       * Any character may appear in the form of an escape sequence.                                                  // 116
       *                                                                                                              // 117
       * For portability, we also escape escape all control and non-ASCII                                             // 118
       * characters. Note that "\0" and "\v" escape sequences are not used                                            // 119
       * because JSHint does not like the first and IE the second.                                                    // 120
       */                                                                                                             // 121
       return '"' + s                                                                                                 // 122
        .replace(/\\/g, '\\\\')  // backslash                                                                         // 123
        .replace(/"/g, '\\"')    // closing quote character                                                           // 124
        .replace(/\x08/g, '\\b') // backspace                                                                         // 125
        .replace(/\t/g, '\\t')   // horizontal tab                                                                    // 126
        .replace(/\n/g, '\\n')   // line feed                                                                         // 127
        .replace(/\f/g, '\\f')   // form feed                                                                         // 128
        .replace(/\r/g, '\\r')   // carriage return                                                                   // 129
        .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)                                                      // 130
        + '"';                                                                                                        // 131
    }                                                                                                                 // 132
                                                                                                                      // 133
    var result = {                                                                                                    // 134
      /*                                                                                                              // 135
       * Parses the input with a generated parser. If the parsing is successfull,                                     // 136
       * returns a value explicitly or implicitly specified by the grammar from                                       // 137
       * which the parser was generated (see |PEG.buildParser|). If the parsing is                                    // 138
       * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.                                          // 139
       */                                                                                                             // 140
      parse: function(input, startRule) {                                                                             // 141
        var parseFunctions = {                                                                                        // 142
          "start": parse_start,                                                                                       // 143
          "messageFormatPattern": parse_messageFormatPattern,                                                         // 144
          "messageFormatPatternRight": parse_messageFormatPatternRight,                                               // 145
          "messageFormatElement": parse_messageFormatElement,                                                         // 146
          "elementFormat": parse_elementFormat,                                                                       // 147
          "pluralStyle": parse_pluralStyle,                                                                           // 148
          "selectStyle": parse_selectStyle,                                                                           // 149
          "pluralFormatPattern": parse_pluralFormatPattern,                                                           // 150
          "offsetPattern": parse_offsetPattern,                                                                       // 151
          "selectFormatPattern": parse_selectFormatPattern,                                                           // 152
          "pluralForms": parse_pluralForms,                                                                           // 153
          "stringKey": parse_stringKey,                                                                               // 154
          "string": parse_string,                                                                                     // 155
          "id": parse_id,                                                                                             // 156
          "chars": parse_chars,                                                                                       // 157
          "char": parse_char,                                                                                         // 158
          "digits": parse_digits,                                                                                     // 159
          "hexDigit": parse_hexDigit,                                                                                 // 160
          "_": parse__,                                                                                               // 161
          "whitespace": parse_whitespace                                                                              // 162
        };                                                                                                            // 163
                                                                                                                      // 164
        if (startRule !== undefined) {                                                                                // 165
          if (parseFunctions[startRule] === undefined) {                                                              // 166
            throw new Error("Invalid rule name: " + quote(startRule) + ".");                                          // 167
          }                                                                                                           // 168
        } else {                                                                                                      // 169
          startRule = "start";                                                                                        // 170
        }                                                                                                             // 171
                                                                                                                      // 172
        var pos = 0;                                                                                                  // 173
        var reportFailures = 0;                                                                                       // 174
        var rightmostFailuresPos = 0;                                                                                 // 175
        var rightmostFailuresExpected = [];                                                                           // 176
                                                                                                                      // 177
        function padLeft(input, padding, length) {                                                                    // 178
          var result = input;                                                                                         // 179
                                                                                                                      // 180
          var padLength = length - input.length;                                                                      // 181
          for (var i = 0; i < padLength; i++) {                                                                       // 182
            result = padding + result;                                                                                // 183
          }                                                                                                           // 184
                                                                                                                      // 185
          return result;                                                                                              // 186
        }                                                                                                             // 187
                                                                                                                      // 188
        function escape(ch) {                                                                                         // 189
          var charCode = ch.charCodeAt(0);                                                                            // 190
          var escapeChar;                                                                                             // 191
          var length;                                                                                                 // 192
                                                                                                                      // 193
          if (charCode <= 0xFF) {                                                                                     // 194
            escapeChar = 'x';                                                                                         // 195
            length = 2;                                                                                               // 196
          } else {                                                                                                    // 197
            escapeChar = 'u';                                                                                         // 198
            length = 4;                                                                                               // 199
          }                                                                                                           // 200
                                                                                                                      // 201
          return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);                       // 202
        }                                                                                                             // 203
                                                                                                                      // 204
        function matchFailed(failure) {                                                                               // 205
          if (pos < rightmostFailuresPos) {                                                                           // 206
            return;                                                                                                   // 207
          }                                                                                                           // 208
                                                                                                                      // 209
          if (pos > rightmostFailuresPos) {                                                                           // 210
            rightmostFailuresPos = pos;                                                                               // 211
            rightmostFailuresExpected = [];                                                                           // 212
          }                                                                                                           // 213
                                                                                                                      // 214
          rightmostFailuresExpected.push(failure);                                                                    // 215
        }                                                                                                             // 216
                                                                                                                      // 217
        function parse_start() {                                                                                      // 218
          var result0;                                                                                                // 219
          var pos0;                                                                                                   // 220
                                                                                                                      // 221
          pos0 = pos;                                                                                                 // 222
          result0 = parse_messageFormatPattern();                                                                     // 223
          if (result0 !== null) {                                                                                     // 224
            result0 = (function(offset, messageFormatPattern) { return { type: "program", program: messageFormatPattern }; })(pos0, result0);
          }                                                                                                           // 226
          if (result0 === null) {                                                                                     // 227
            pos = pos0;                                                                                               // 228
          }                                                                                                           // 229
          return result0;                                                                                             // 230
        }                                                                                                             // 231
                                                                                                                      // 232
        function parse_messageFormatPattern() {                                                                       // 233
          var result0, result1, result2;                                                                              // 234
          var pos0, pos1;                                                                                             // 235
                                                                                                                      // 236
          pos0 = pos;                                                                                                 // 237
          pos1 = pos;                                                                                                 // 238
          result0 = parse_string();                                                                                   // 239
          if (result0 !== null) {                                                                                     // 240
            result1 = [];                                                                                             // 241
            result2 = parse_messageFormatPatternRight();                                                              // 242
            while (result2 !== null) {                                                                                // 243
              result1.push(result2);                                                                                  // 244
              result2 = parse_messageFormatPatternRight();                                                            // 245
            }                                                                                                         // 246
            if (result1 !== null) {                                                                                   // 247
              result0 = [result0, result1];                                                                           // 248
            } else {                                                                                                  // 249
              result0 = null;                                                                                         // 250
              pos = pos1;                                                                                             // 251
            }                                                                                                         // 252
          } else {                                                                                                    // 253
            result0 = null;                                                                                           // 254
            pos = pos1;                                                                                               // 255
          }                                                                                                           // 256
          if (result0 !== null) {                                                                                     // 257
            result0 = (function(offset, s1, inner) {                                                                  // 258
              var st = [];                                                                                            // 259
              if ( s1 && s1.val ) {                                                                                   // 260
                st.push( s1 );                                                                                        // 261
              }                                                                                                       // 262
              for( var i in inner ){                                                                                  // 263
                if ( inner.hasOwnProperty( i ) ) {                                                                    // 264
                  st.push( inner[ i ] );                                                                              // 265
                }                                                                                                     // 266
              }                                                                                                       // 267
              return { type: 'messageFormatPattern', statements: st };                                                // 268
            })(pos0, result0[0], result0[1]);                                                                         // 269
          }                                                                                                           // 270
          if (result0 === null) {                                                                                     // 271
            pos = pos0;                                                                                               // 272
          }                                                                                                           // 273
          return result0;                                                                                             // 274
        }                                                                                                             // 275
                                                                                                                      // 276
        function parse_messageFormatPatternRight() {                                                                  // 277
          var result0, result1, result2, result3, result4, result5;                                                   // 278
          var pos0, pos1;                                                                                             // 279
                                                                                                                      // 280
          pos0 = pos;                                                                                                 // 281
          pos1 = pos;                                                                                                 // 282
          if (input.charCodeAt(pos) === 123) {                                                                        // 283
            result0 = "{";                                                                                            // 284
            pos++;                                                                                                    // 285
          } else {                                                                                                    // 286
            result0 = null;                                                                                           // 287
            if (reportFailures === 0) {                                                                               // 288
              matchFailed("\"{\"");                                                                                   // 289
            }                                                                                                         // 290
          }                                                                                                           // 291
          if (result0 !== null) {                                                                                     // 292
            result1 = parse__();                                                                                      // 293
            if (result1 !== null) {                                                                                   // 294
              result2 = parse_messageFormatElement();                                                                 // 295
              if (result2 !== null) {                                                                                 // 296
                result3 = parse__();                                                                                  // 297
                if (result3 !== null) {                                                                               // 298
                  if (input.charCodeAt(pos) === 125) {                                                                // 299
                    result4 = "}";                                                                                    // 300
                    pos++;                                                                                            // 301
                  } else {                                                                                            // 302
                    result4 = null;                                                                                   // 303
                    if (reportFailures === 0) {                                                                       // 304
                      matchFailed("\"}\"");                                                                           // 305
                    }                                                                                                 // 306
                  }                                                                                                   // 307
                  if (result4 !== null) {                                                                             // 308
                    result5 = parse_string();                                                                         // 309
                    if (result5 !== null) {                                                                           // 310
                      result0 = [result0, result1, result2, result3, result4, result5];                               // 311
                    } else {                                                                                          // 312
                      result0 = null;                                                                                 // 313
                      pos = pos1;                                                                                     // 314
                    }                                                                                                 // 315
                  } else {                                                                                            // 316
                    result0 = null;                                                                                   // 317
                    pos = pos1;                                                                                       // 318
                  }                                                                                                   // 319
                } else {                                                                                              // 320
                  result0 = null;                                                                                     // 321
                  pos = pos1;                                                                                         // 322
                }                                                                                                     // 323
              } else {                                                                                                // 324
                result0 = null;                                                                                       // 325
                pos = pos1;                                                                                           // 326
              }                                                                                                       // 327
            } else {                                                                                                  // 328
              result0 = null;                                                                                         // 329
              pos = pos1;                                                                                             // 330
            }                                                                                                         // 331
          } else {                                                                                                    // 332
            result0 = null;                                                                                           // 333
            pos = pos1;                                                                                               // 334
          }                                                                                                           // 335
          if (result0 !== null) {                                                                                     // 336
            result0 = (function(offset, mfe, s1) {                                                                    // 337
              var res = [];                                                                                           // 338
              if ( mfe ) {                                                                                            // 339
                res.push(mfe);                                                                                        // 340
              }                                                                                                       // 341
              if ( s1 && s1.val ) {                                                                                   // 342
                res.push( s1 );                                                                                       // 343
              }                                                                                                       // 344
              return { type: "messageFormatPatternRight", statements : res };                                         // 345
            })(pos0, result0[2], result0[5]);                                                                         // 346
          }                                                                                                           // 347
          if (result0 === null) {                                                                                     // 348
            pos = pos0;                                                                                               // 349
          }                                                                                                           // 350
          return result0;                                                                                             // 351
        }                                                                                                             // 352
                                                                                                                      // 353
        function parse_messageFormatElement() {                                                                       // 354
          var result0, result1, result2;                                                                              // 355
          var pos0, pos1, pos2;                                                                                       // 356
                                                                                                                      // 357
          pos0 = pos;                                                                                                 // 358
          pos1 = pos;                                                                                                 // 359
          result0 = parse_id();                                                                                       // 360
          if (result0 !== null) {                                                                                     // 361
            pos2 = pos;                                                                                               // 362
            if (input.charCodeAt(pos) === 44) {                                                                       // 363
              result1 = ",";                                                                                          // 364
              pos++;                                                                                                  // 365
            } else {                                                                                                  // 366
              result1 = null;                                                                                         // 367
              if (reportFailures === 0) {                                                                             // 368
                matchFailed("\",\"");                                                                                 // 369
              }                                                                                                       // 370
            }                                                                                                         // 371
            if (result1 !== null) {                                                                                   // 372
              result2 = parse_elementFormat();                                                                        // 373
              if (result2 !== null) {                                                                                 // 374
                result1 = [result1, result2];                                                                         // 375
              } else {                                                                                                // 376
                result1 = null;                                                                                       // 377
                pos = pos2;                                                                                           // 378
              }                                                                                                       // 379
            } else {                                                                                                  // 380
              result1 = null;                                                                                         // 381
              pos = pos2;                                                                                             // 382
            }                                                                                                         // 383
            result1 = result1 !== null ? result1 : "";                                                                // 384
            if (result1 !== null) {                                                                                   // 385
              result0 = [result0, result1];                                                                           // 386
            } else {                                                                                                  // 387
              result0 = null;                                                                                         // 388
              pos = pos1;                                                                                             // 389
            }                                                                                                         // 390
          } else {                                                                                                    // 391
            result0 = null;                                                                                           // 392
            pos = pos1;                                                                                               // 393
          }                                                                                                           // 394
          if (result0 !== null) {                                                                                     // 395
            result0 = (function(offset, argIdx, efmt) {                                                               // 396
              var res = {                                                                                             // 397
                type: "messageFormatElement",                                                                         // 398
                argumentIndex: argIdx                                                                                 // 399
              };                                                                                                      // 400
              if ( efmt && efmt.length ) {                                                                            // 401
                res.elementFormat = efmt[1];                                                                          // 402
              }                                                                                                       // 403
              else {                                                                                                  // 404
                res.output = true;                                                                                    // 405
              }                                                                                                       // 406
              return res;                                                                                             // 407
            })(pos0, result0[0], result0[1]);                                                                         // 408
          }                                                                                                           // 409
          if (result0 === null) {                                                                                     // 410
            pos = pos0;                                                                                               // 411
          }                                                                                                           // 412
          return result0;                                                                                             // 413
        }                                                                                                             // 414
                                                                                                                      // 415
        function parse_elementFormat() {                                                                              // 416
          var result0, result1, result2, result3, result4, result5, result6;                                          // 417
          var pos0, pos1;                                                                                             // 418
                                                                                                                      // 419
          pos0 = pos;                                                                                                 // 420
          pos1 = pos;                                                                                                 // 421
          result0 = parse__();                                                                                        // 422
          if (result0 !== null) {                                                                                     // 423
            if (input.substr(pos, 6) === "plural") {                                                                  // 424
              result1 = "plural";                                                                                     // 425
              pos += 6;                                                                                               // 426
            } else {                                                                                                  // 427
              result1 = null;                                                                                         // 428
              if (reportFailures === 0) {                                                                             // 429
                matchFailed("\"plural\"");                                                                            // 430
              }                                                                                                       // 431
            }                                                                                                         // 432
            if (result1 !== null) {                                                                                   // 433
              result2 = parse__();                                                                                    // 434
              if (result2 !== null) {                                                                                 // 435
                if (input.charCodeAt(pos) === 44) {                                                                   // 436
                  result3 = ",";                                                                                      // 437
                  pos++;                                                                                              // 438
                } else {                                                                                              // 439
                  result3 = null;                                                                                     // 440
                  if (reportFailures === 0) {                                                                         // 441
                    matchFailed("\",\"");                                                                             // 442
                  }                                                                                                   // 443
                }                                                                                                     // 444
                if (result3 !== null) {                                                                               // 445
                  result4 = parse__();                                                                                // 446
                  if (result4 !== null) {                                                                             // 447
                    result5 = parse_pluralStyle();                                                                    // 448
                    if (result5 !== null) {                                                                           // 449
                      result6 = parse__();                                                                            // 450
                      if (result6 !== null) {                                                                         // 451
                        result0 = [result0, result1, result2, result3, result4, result5, result6];                    // 452
                      } else {                                                                                        // 453
                        result0 = null;                                                                               // 454
                        pos = pos1;                                                                                   // 455
                      }                                                                                               // 456
                    } else {                                                                                          // 457
                      result0 = null;                                                                                 // 458
                      pos = pos1;                                                                                     // 459
                    }                                                                                                 // 460
                  } else {                                                                                            // 461
                    result0 = null;                                                                                   // 462
                    pos = pos1;                                                                                       // 463
                  }                                                                                                   // 464
                } else {                                                                                              // 465
                  result0 = null;                                                                                     // 466
                  pos = pos1;                                                                                         // 467
                }                                                                                                     // 468
              } else {                                                                                                // 469
                result0 = null;                                                                                       // 470
                pos = pos1;                                                                                           // 471
              }                                                                                                       // 472
            } else {                                                                                                  // 473
              result0 = null;                                                                                         // 474
              pos = pos1;                                                                                             // 475
            }                                                                                                         // 476
          } else {                                                                                                    // 477
            result0 = null;                                                                                           // 478
            pos = pos1;                                                                                               // 479
          }                                                                                                           // 480
          if (result0 !== null) {                                                                                     // 481
            result0 = (function(offset, t, s) {                                                                       // 482
              return {                                                                                                // 483
                type : "elementFormat",                                                                               // 484
                key  : t,                                                                                             // 485
                val  : s.val                                                                                          // 486
              };                                                                                                      // 487
            })(pos0, result0[1], result0[5]);                                                                         // 488
          }                                                                                                           // 489
          if (result0 === null) {                                                                                     // 490
            pos = pos0;                                                                                               // 491
          }                                                                                                           // 492
          if (result0 === null) {                                                                                     // 493
            pos0 = pos;                                                                                               // 494
            pos1 = pos;                                                                                               // 495
            result0 = parse__();                                                                                      // 496
            if (result0 !== null) {                                                                                   // 497
              if (input.substr(pos, 6) === "select") {                                                                // 498
                result1 = "select";                                                                                   // 499
                pos += 6;                                                                                             // 500
              } else {                                                                                                // 501
                result1 = null;                                                                                       // 502
                if (reportFailures === 0) {                                                                           // 503
                  matchFailed("\"select\"");                                                                          // 504
                }                                                                                                     // 505
              }                                                                                                       // 506
              if (result1 !== null) {                                                                                 // 507
                result2 = parse__();                                                                                  // 508
                if (result2 !== null) {                                                                               // 509
                  if (input.charCodeAt(pos) === 44) {                                                                 // 510
                    result3 = ",";                                                                                    // 511
                    pos++;                                                                                            // 512
                  } else {                                                                                            // 513
                    result3 = null;                                                                                   // 514
                    if (reportFailures === 0) {                                                                       // 515
                      matchFailed("\",\"");                                                                           // 516
                    }                                                                                                 // 517
                  }                                                                                                   // 518
                  if (result3 !== null) {                                                                             // 519
                    result4 = parse__();                                                                              // 520
                    if (result4 !== null) {                                                                           // 521
                      result5 = parse_selectStyle();                                                                  // 522
                      if (result5 !== null) {                                                                         // 523
                        result6 = parse__();                                                                          // 524
                        if (result6 !== null) {                                                                       // 525
                          result0 = [result0, result1, result2, result3, result4, result5, result6];                  // 526
                        } else {                                                                                      // 527
                          result0 = null;                                                                             // 528
                          pos = pos1;                                                                                 // 529
                        }                                                                                             // 530
                      } else {                                                                                        // 531
                        result0 = null;                                                                               // 532
                        pos = pos1;                                                                                   // 533
                      }                                                                                               // 534
                    } else {                                                                                          // 535
                      result0 = null;                                                                                 // 536
                      pos = pos1;                                                                                     // 537
                    }                                                                                                 // 538
                  } else {                                                                                            // 539
                    result0 = null;                                                                                   // 540
                    pos = pos1;                                                                                       // 541
                  }                                                                                                   // 542
                } else {                                                                                              // 543
                  result0 = null;                                                                                     // 544
                  pos = pos1;                                                                                         // 545
                }                                                                                                     // 546
              } else {                                                                                                // 547
                result0 = null;                                                                                       // 548
                pos = pos1;                                                                                           // 549
              }                                                                                                       // 550
            } else {                                                                                                  // 551
              result0 = null;                                                                                         // 552
              pos = pos1;                                                                                             // 553
            }                                                                                                         // 554
            if (result0 !== null) {                                                                                   // 555
              result0 = (function(offset, t, s) {                                                                     // 556
                return {                                                                                              // 557
                  type : "elementFormat",                                                                             // 558
                  key  : t,                                                                                           // 559
                  val  : s.val                                                                                        // 560
                };                                                                                                    // 561
              })(pos0, result0[1], result0[5]);                                                                       // 562
            }                                                                                                         // 563
            if (result0 === null) {                                                                                   // 564
              pos = pos0;                                                                                             // 565
            }                                                                                                         // 566
          }                                                                                                           // 567
          return result0;                                                                                             // 568
        }                                                                                                             // 569
                                                                                                                      // 570
        function parse_pluralStyle() {                                                                                // 571
          var result0;                                                                                                // 572
          var pos0;                                                                                                   // 573
                                                                                                                      // 574
          pos0 = pos;                                                                                                 // 575
          result0 = parse_pluralFormatPattern();                                                                      // 576
          if (result0 !== null) {                                                                                     // 577
            result0 = (function(offset, pfp) {                                                                        // 578
              return { type: "pluralStyle", val: pfp };                                                               // 579
            })(pos0, result0);                                                                                        // 580
          }                                                                                                           // 581
          if (result0 === null) {                                                                                     // 582
            pos = pos0;                                                                                               // 583
          }                                                                                                           // 584
          return result0;                                                                                             // 585
        }                                                                                                             // 586
                                                                                                                      // 587
        function parse_selectStyle() {                                                                                // 588
          var result0;                                                                                                // 589
          var pos0;                                                                                                   // 590
                                                                                                                      // 591
          pos0 = pos;                                                                                                 // 592
          result0 = parse_selectFormatPattern();                                                                      // 593
          if (result0 !== null) {                                                                                     // 594
            result0 = (function(offset, sfp) {                                                                        // 595
              return { type: "selectStyle", val: sfp };                                                               // 596
            })(pos0, result0);                                                                                        // 597
          }                                                                                                           // 598
          if (result0 === null) {                                                                                     // 599
            pos = pos0;                                                                                               // 600
          }                                                                                                           // 601
          return result0;                                                                                             // 602
        }                                                                                                             // 603
                                                                                                                      // 604
        function parse_pluralFormatPattern() {                                                                        // 605
          var result0, result1, result2;                                                                              // 606
          var pos0, pos1;                                                                                             // 607
                                                                                                                      // 608
          pos0 = pos;                                                                                                 // 609
          pos1 = pos;                                                                                                 // 610
          result0 = parse_offsetPattern();                                                                            // 611
          result0 = result0 !== null ? result0 : "";                                                                  // 612
          if (result0 !== null) {                                                                                     // 613
            result1 = [];                                                                                             // 614
            result2 = parse_pluralForms();                                                                            // 615
            while (result2 !== null) {                                                                                // 616
              result1.push(result2);                                                                                  // 617
              result2 = parse_pluralForms();                                                                          // 618
            }                                                                                                         // 619
            if (result1 !== null) {                                                                                   // 620
              result0 = [result0, result1];                                                                           // 621
            } else {                                                                                                  // 622
              result0 = null;                                                                                         // 623
              pos = pos1;                                                                                             // 624
            }                                                                                                         // 625
          } else {                                                                                                    // 626
            result0 = null;                                                                                           // 627
            pos = pos1;                                                                                               // 628
          }                                                                                                           // 629
          if (result0 !== null) {                                                                                     // 630
            result0 = (function(offset, op, pf) {                                                                     // 631
              var res = {                                                                                             // 632
                type: "pluralFormatPattern",                                                                          // 633
                pluralForms: pf                                                                                       // 634
              };                                                                                                      // 635
              if ( op ) {                                                                                             // 636
                res.offset = op;                                                                                      // 637
              }                                                                                                       // 638
              else {                                                                                                  // 639
                res.offset = 0;                                                                                       // 640
              }                                                                                                       // 641
              return res;                                                                                             // 642
            })(pos0, result0[0], result0[1]);                                                                         // 643
          }                                                                                                           // 644
          if (result0 === null) {                                                                                     // 645
            pos = pos0;                                                                                               // 646
          }                                                                                                           // 647
          return result0;                                                                                             // 648
        }                                                                                                             // 649
                                                                                                                      // 650
        function parse_offsetPattern() {                                                                              // 651
          var result0, result1, result2, result3, result4, result5, result6;                                          // 652
          var pos0, pos1;                                                                                             // 653
                                                                                                                      // 654
          pos0 = pos;                                                                                                 // 655
          pos1 = pos;                                                                                                 // 656
          result0 = parse__();                                                                                        // 657
          if (result0 !== null) {                                                                                     // 658
            if (input.substr(pos, 6) === "offset") {                                                                  // 659
              result1 = "offset";                                                                                     // 660
              pos += 6;                                                                                               // 661
            } else {                                                                                                  // 662
              result1 = null;                                                                                         // 663
              if (reportFailures === 0) {                                                                             // 664
                matchFailed("\"offset\"");                                                                            // 665
              }                                                                                                       // 666
            }                                                                                                         // 667
            if (result1 !== null) {                                                                                   // 668
              result2 = parse__();                                                                                    // 669
              if (result2 !== null) {                                                                                 // 670
                if (input.charCodeAt(pos) === 58) {                                                                   // 671
                  result3 = ":";                                                                                      // 672
                  pos++;                                                                                              // 673
                } else {                                                                                              // 674
                  result3 = null;                                                                                     // 675
                  if (reportFailures === 0) {                                                                         // 676
                    matchFailed("\":\"");                                                                             // 677
                  }                                                                                                   // 678
                }                                                                                                     // 679
                if (result3 !== null) {                                                                               // 680
                  result4 = parse__();                                                                                // 681
                  if (result4 !== null) {                                                                             // 682
                    result5 = parse_digits();                                                                         // 683
                    if (result5 !== null) {                                                                           // 684
                      result6 = parse__();                                                                            // 685
                      if (result6 !== null) {                                                                         // 686
                        result0 = [result0, result1, result2, result3, result4, result5, result6];                    // 687
                      } else {                                                                                        // 688
                        result0 = null;                                                                               // 689
                        pos = pos1;                                                                                   // 690
                      }                                                                                               // 691
                    } else {                                                                                          // 692
                      result0 = null;                                                                                 // 693
                      pos = pos1;                                                                                     // 694
                    }                                                                                                 // 695
                  } else {                                                                                            // 696
                    result0 = null;                                                                                   // 697
                    pos = pos1;                                                                                       // 698
                  }                                                                                                   // 699
                } else {                                                                                              // 700
                  result0 = null;                                                                                     // 701
                  pos = pos1;                                                                                         // 702
                }                                                                                                     // 703
              } else {                                                                                                // 704
                result0 = null;                                                                                       // 705
                pos = pos1;                                                                                           // 706
              }                                                                                                       // 707
            } else {                                                                                                  // 708
              result0 = null;                                                                                         // 709
              pos = pos1;                                                                                             // 710
            }                                                                                                         // 711
          } else {                                                                                                    // 712
            result0 = null;                                                                                           // 713
            pos = pos1;                                                                                               // 714
          }                                                                                                           // 715
          if (result0 !== null) {                                                                                     // 716
            result0 = (function(offset, d) {                                                                          // 717
              return d;                                                                                               // 718
            })(pos0, result0[5]);                                                                                     // 719
          }                                                                                                           // 720
          if (result0 === null) {                                                                                     // 721
            pos = pos0;                                                                                               // 722
          }                                                                                                           // 723
          return result0;                                                                                             // 724
        }                                                                                                             // 725
                                                                                                                      // 726
        function parse_selectFormatPattern() {                                                                        // 727
          var result0, result1;                                                                                       // 728
          var pos0;                                                                                                   // 729
                                                                                                                      // 730
          pos0 = pos;                                                                                                 // 731
          result0 = [];                                                                                               // 732
          result1 = parse_pluralForms();                                                                              // 733
          while (result1 !== null) {                                                                                  // 734
            result0.push(result1);                                                                                    // 735
            result1 = parse_pluralForms();                                                                            // 736
          }                                                                                                           // 737
          if (result0 !== null) {                                                                                     // 738
            result0 = (function(offset, pf) {                                                                         // 739
              return {                                                                                                // 740
                type: "selectFormatPattern",                                                                          // 741
                pluralForms: pf                                                                                       // 742
              };                                                                                                      // 743
            })(pos0, result0);                                                                                        // 744
          }                                                                                                           // 745
          if (result0 === null) {                                                                                     // 746
            pos = pos0;                                                                                               // 747
          }                                                                                                           // 748
          return result0;                                                                                             // 749
        }                                                                                                             // 750
                                                                                                                      // 751
        function parse_pluralForms() {                                                                                // 752
          var result0, result1, result2, result3, result4, result5, result6, result7;                                 // 753
          var pos0, pos1;                                                                                             // 754
                                                                                                                      // 755
          pos0 = pos;                                                                                                 // 756
          pos1 = pos;                                                                                                 // 757
          result0 = parse__();                                                                                        // 758
          if (result0 !== null) {                                                                                     // 759
            result1 = parse_stringKey();                                                                              // 760
            if (result1 !== null) {                                                                                   // 761
              result2 = parse__();                                                                                    // 762
              if (result2 !== null) {                                                                                 // 763
                if (input.charCodeAt(pos) === 123) {                                                                  // 764
                  result3 = "{";                                                                                      // 765
                  pos++;                                                                                              // 766
                } else {                                                                                              // 767
                  result3 = null;                                                                                     // 768
                  if (reportFailures === 0) {                                                                         // 769
                    matchFailed("\"{\"");                                                                             // 770
                  }                                                                                                   // 771
                }                                                                                                     // 772
                if (result3 !== null) {                                                                               // 773
                  result4 = parse__();                                                                                // 774
                  if (result4 !== null) {                                                                             // 775
                    result5 = parse_messageFormatPattern();                                                           // 776
                    if (result5 !== null) {                                                                           // 777
                      result6 = parse__();                                                                            // 778
                      if (result6 !== null) {                                                                         // 779
                        if (input.charCodeAt(pos) === 125) {                                                          // 780
                          result7 = "}";                                                                              // 781
                          pos++;                                                                                      // 782
                        } else {                                                                                      // 783
                          result7 = null;                                                                             // 784
                          if (reportFailures === 0) {                                                                 // 785
                            matchFailed("\"}\"");                                                                     // 786
                          }                                                                                           // 787
                        }                                                                                             // 788
                        if (result7 !== null) {                                                                       // 789
                          result0 = [result0, result1, result2, result3, result4, result5, result6, result7];         // 790
                        } else {                                                                                      // 791
                          result0 = null;                                                                             // 792
                          pos = pos1;                                                                                 // 793
                        }                                                                                             // 794
                      } else {                                                                                        // 795
                        result0 = null;                                                                               // 796
                        pos = pos1;                                                                                   // 797
                      }                                                                                               // 798
                    } else {                                                                                          // 799
                      result0 = null;                                                                                 // 800
                      pos = pos1;                                                                                     // 801
                    }                                                                                                 // 802
                  } else {                                                                                            // 803
                    result0 = null;                                                                                   // 804
                    pos = pos1;                                                                                       // 805
                  }                                                                                                   // 806
                } else {                                                                                              // 807
                  result0 = null;                                                                                     // 808
                  pos = pos1;                                                                                         // 809
                }                                                                                                     // 810
              } else {                                                                                                // 811
                result0 = null;                                                                                       // 812
                pos = pos1;                                                                                           // 813
              }                                                                                                       // 814
            } else {                                                                                                  // 815
              result0 = null;                                                                                         // 816
              pos = pos1;                                                                                             // 817
            }                                                                                                         // 818
          } else {                                                                                                    // 819
            result0 = null;                                                                                           // 820
            pos = pos1;                                                                                               // 821
          }                                                                                                           // 822
          if (result0 !== null) {                                                                                     // 823
            result0 = (function(offset, k, mfp) {                                                                     // 824
              return {                                                                                                // 825
                type: "pluralForms",                                                                                  // 826
                key: k,                                                                                               // 827
                val: mfp                                                                                              // 828
              };                                                                                                      // 829
            })(pos0, result0[1], result0[5]);                                                                         // 830
          }                                                                                                           // 831
          if (result0 === null) {                                                                                     // 832
            pos = pos0;                                                                                               // 833
          }                                                                                                           // 834
          return result0;                                                                                             // 835
        }                                                                                                             // 836
                                                                                                                      // 837
        function parse_stringKey() {                                                                                  // 838
          var result0, result1;                                                                                       // 839
          var pos0, pos1;                                                                                             // 840
                                                                                                                      // 841
          pos0 = pos;                                                                                                 // 842
          result0 = parse_id();                                                                                       // 843
          if (result0 !== null) {                                                                                     // 844
            result0 = (function(offset, i) {                                                                          // 845
              return i;                                                                                               // 846
            })(pos0, result0);                                                                                        // 847
          }                                                                                                           // 848
          if (result0 === null) {                                                                                     // 849
            pos = pos0;                                                                                               // 850
          }                                                                                                           // 851
          if (result0 === null) {                                                                                     // 852
            pos0 = pos;                                                                                               // 853
            pos1 = pos;                                                                                               // 854
            if (input.charCodeAt(pos) === 61) {                                                                       // 855
              result0 = "=";                                                                                          // 856
              pos++;                                                                                                  // 857
            } else {                                                                                                  // 858
              result0 = null;                                                                                         // 859
              if (reportFailures === 0) {                                                                             // 860
                matchFailed("\"=\"");                                                                                 // 861
              }                                                                                                       // 862
            }                                                                                                         // 863
            if (result0 !== null) {                                                                                   // 864
              result1 = parse_digits();                                                                               // 865
              if (result1 !== null) {                                                                                 // 866
                result0 = [result0, result1];                                                                         // 867
              } else {                                                                                                // 868
                result0 = null;                                                                                       // 869
                pos = pos1;                                                                                           // 870
              }                                                                                                       // 871
            } else {                                                                                                  // 872
              result0 = null;                                                                                         // 873
              pos = pos1;                                                                                             // 874
            }                                                                                                         // 875
            if (result0 !== null) {                                                                                   // 876
              result0 = (function(offset, d) {                                                                        // 877
                return d;                                                                                             // 878
              })(pos0, result0[1]);                                                                                   // 879
            }                                                                                                         // 880
            if (result0 === null) {                                                                                   // 881
              pos = pos0;                                                                                             // 882
            }                                                                                                         // 883
          }                                                                                                           // 884
          return result0;                                                                                             // 885
        }                                                                                                             // 886
                                                                                                                      // 887
        function parse_string() {                                                                                     // 888
          var result0, result1, result2, result3, result4;                                                            // 889
          var pos0, pos1, pos2;                                                                                       // 890
                                                                                                                      // 891
          pos0 = pos;                                                                                                 // 892
          pos1 = pos;                                                                                                 // 893
          result0 = parse__();                                                                                        // 894
          if (result0 !== null) {                                                                                     // 895
            result1 = [];                                                                                             // 896
            pos2 = pos;                                                                                               // 897
            result2 = parse__();                                                                                      // 898
            if (result2 !== null) {                                                                                   // 899
              result3 = parse_chars();                                                                                // 900
              if (result3 !== null) {                                                                                 // 901
                result4 = parse__();                                                                                  // 902
                if (result4 !== null) {                                                                               // 903
                  result2 = [result2, result3, result4];                                                              // 904
                } else {                                                                                              // 905
                  result2 = null;                                                                                     // 906
                  pos = pos2;                                                                                         // 907
                }                                                                                                     // 908
              } else {                                                                                                // 909
                result2 = null;                                                                                       // 910
                pos = pos2;                                                                                           // 911
              }                                                                                                       // 912
            } else {                                                                                                  // 913
              result2 = null;                                                                                         // 914
              pos = pos2;                                                                                             // 915
            }                                                                                                         // 916
            while (result2 !== null) {                                                                                // 917
              result1.push(result2);                                                                                  // 918
              pos2 = pos;                                                                                             // 919
              result2 = parse__();                                                                                    // 920
              if (result2 !== null) {                                                                                 // 921
                result3 = parse_chars();                                                                              // 922
                if (result3 !== null) {                                                                               // 923
                  result4 = parse__();                                                                                // 924
                  if (result4 !== null) {                                                                             // 925
                    result2 = [result2, result3, result4];                                                            // 926
                  } else {                                                                                            // 927
                    result2 = null;                                                                                   // 928
                    pos = pos2;                                                                                       // 929
                  }                                                                                                   // 930
                } else {                                                                                              // 931
                  result2 = null;                                                                                     // 932
                  pos = pos2;                                                                                         // 933
                }                                                                                                     // 934
              } else {                                                                                                // 935
                result2 = null;                                                                                       // 936
                pos = pos2;                                                                                           // 937
              }                                                                                                       // 938
            }                                                                                                         // 939
            if (result1 !== null) {                                                                                   // 940
              result0 = [result0, result1];                                                                           // 941
            } else {                                                                                                  // 942
              result0 = null;                                                                                         // 943
              pos = pos1;                                                                                             // 944
            }                                                                                                         // 945
          } else {                                                                                                    // 946
            result0 = null;                                                                                           // 947
            pos = pos1;                                                                                               // 948
          }                                                                                                           // 949
          if (result0 !== null) {                                                                                     // 950
            result0 = (function(offset, ws, s) {                                                                      // 951
              var tmp = [];                                                                                           // 952
              for( var i = 0; i < s.length; ++i ) {                                                                   // 953
                for( var j = 0; j < s[ i ].length; ++j ) {                                                            // 954
                  tmp.push(s[i][j]);                                                                                  // 955
                }                                                                                                     // 956
              }                                                                                                       // 957
              return {                                                                                                // 958
                type: "string",                                                                                       // 959
                val: ws + tmp.join('')                                                                                // 960
              };                                                                                                      // 961
            })(pos0, result0[0], result0[1]);                                                                         // 962
          }                                                                                                           // 963
          if (result0 === null) {                                                                                     // 964
            pos = pos0;                                                                                               // 965
          }                                                                                                           // 966
          return result0;                                                                                             // 967
        }                                                                                                             // 968
                                                                                                                      // 969
        function parse_id() {                                                                                         // 970
          var result0, result1, result2, result3;                                                                     // 971
          var pos0, pos1;                                                                                             // 972
                                                                                                                      // 973
          pos0 = pos;                                                                                                 // 974
          pos1 = pos;                                                                                                 // 975
          result0 = parse__();                                                                                        // 976
          if (result0 !== null) {                                                                                     // 977
            if (/^[a-zA-Z$_]/.test(input.charAt(pos))) {                                                              // 978
              result1 = input.charAt(pos);                                                                            // 979
              pos++;                                                                                                  // 980
            } else {                                                                                                  // 981
              result1 = null;                                                                                         // 982
              if (reportFailures === 0) {                                                                             // 983
                matchFailed("[a-zA-Z$_]");                                                                            // 984
              }                                                                                                       // 985
            }                                                                                                         // 986
            if (result1 !== null) {                                                                                   // 987
              result2 = [];                                                                                           // 988
              if (/^[^ \t\n\r,.+={}]/.test(input.charAt(pos))) {                                                      // 989
                result3 = input.charAt(pos);                                                                          // 990
                pos++;                                                                                                // 991
              } else {                                                                                                // 992
                result3 = null;                                                                                       // 993
                if (reportFailures === 0) {                                                                           // 994
                  matchFailed("[^ \\t\\n\\r,.+={}]");                                                                 // 995
                }                                                                                                     // 996
              }                                                                                                       // 997
              while (result3 !== null) {                                                                              // 998
                result2.push(result3);                                                                                // 999
                if (/^[^ \t\n\r,.+={}]/.test(input.charAt(pos))) {                                                    // 1000
                  result3 = input.charAt(pos);                                                                        // 1001
                  pos++;                                                                                              // 1002
                } else {                                                                                              // 1003
                  result3 = null;                                                                                     // 1004
                  if (reportFailures === 0) {                                                                         // 1005
                    matchFailed("[^ \\t\\n\\r,.+={}]");                                                               // 1006
                  }                                                                                                   // 1007
                }                                                                                                     // 1008
              }                                                                                                       // 1009
              if (result2 !== null) {                                                                                 // 1010
                result3 = parse__();                                                                                  // 1011
                if (result3 !== null) {                                                                               // 1012
                  result0 = [result0, result1, result2, result3];                                                     // 1013
                } else {                                                                                              // 1014
                  result0 = null;                                                                                     // 1015
                  pos = pos1;                                                                                         // 1016
                }                                                                                                     // 1017
              } else {                                                                                                // 1018
                result0 = null;                                                                                       // 1019
                pos = pos1;                                                                                           // 1020
              }                                                                                                       // 1021
            } else {                                                                                                  // 1022
              result0 = null;                                                                                         // 1023
              pos = pos1;                                                                                             // 1024
            }                                                                                                         // 1025
          } else {                                                                                                    // 1026
            result0 = null;                                                                                           // 1027
            pos = pos1;                                                                                               // 1028
          }                                                                                                           // 1029
          if (result0 !== null) {                                                                                     // 1030
            result0 = (function(offset, s1, s2) {                                                                     // 1031
              return s1 + (s2 ? s2.join('') : '');                                                                    // 1032
            })(pos0, result0[1], result0[2]);                                                                         // 1033
          }                                                                                                           // 1034
          if (result0 === null) {                                                                                     // 1035
            pos = pos0;                                                                                               // 1036
          }                                                                                                           // 1037
          return result0;                                                                                             // 1038
        }                                                                                                             // 1039
                                                                                                                      // 1040
        function parse_chars() {                                                                                      // 1041
          var result0, result1;                                                                                       // 1042
          var pos0;                                                                                                   // 1043
                                                                                                                      // 1044
          pos0 = pos;                                                                                                 // 1045
          result1 = parse_char();                                                                                     // 1046
          if (result1 !== null) {                                                                                     // 1047
            result0 = [];                                                                                             // 1048
            while (result1 !== null) {                                                                                // 1049
              result0.push(result1);                                                                                  // 1050
              result1 = parse_char();                                                                                 // 1051
            }                                                                                                         // 1052
          } else {                                                                                                    // 1053
            result0 = null;                                                                                           // 1054
          }                                                                                                           // 1055
          if (result0 !== null) {                                                                                     // 1056
            result0 = (function(offset, chars) { return chars.join(''); })(pos0, result0);                            // 1057
          }                                                                                                           // 1058
          if (result0 === null) {                                                                                     // 1059
            pos = pos0;                                                                                               // 1060
          }                                                                                                           // 1061
          return result0;                                                                                             // 1062
        }                                                                                                             // 1063
                                                                                                                      // 1064
        function parse_char() {                                                                                       // 1065
          var result0, result1, result2, result3, result4;                                                            // 1066
          var pos0, pos1;                                                                                             // 1067
                                                                                                                      // 1068
          pos0 = pos;                                                                                                 // 1069
          if (/^[^{}\\\0-\x1F \t\n\r]/.test(input.charAt(pos))) {                                                    // 1070
            result0 = input.charAt(pos);                                                                              // 1071
            pos++;                                                                                                    // 1072
          } else {                                                                                                    // 1073
            result0 = null;                                                                                           // 1074
            if (reportFailures === 0) {                                                                               // 1075
              matchFailed("[^{}\\\\\\0-\\x1F \\t\\n\\r]");                                                           // 1076
            }                                                                                                         // 1077
          }                                                                                                           // 1078
          if (result0 !== null) {                                                                                     // 1079
            result0 = (function(offset, x) {                                                                          // 1080
              return x;                                                                                               // 1081
            })(pos0, result0);                                                                                        // 1082
          }                                                                                                           // 1083
          if (result0 === null) {                                                                                     // 1084
            pos = pos0;                                                                                               // 1085
          }                                                                                                           // 1086
          if (result0 === null) {                                                                                     // 1087
            pos0 = pos;                                                                                               // 1088
            if (input.substr(pos, 2) === "\\#") {                                                                     // 1089
              result0 = "\\#";                                                                                        // 1090
              pos += 2;                                                                                               // 1091
            } else {                                                                                                  // 1092
              result0 = null;                                                                                         // 1093
              if (reportFailures === 0) {                                                                             // 1094
                matchFailed("\"\\\\#\"");                                                                             // 1095
              }                                                                                                       // 1096
            }                                                                                                         // 1097
            if (result0 !== null) {                                                                                   // 1098
              result0 = (function(offset) {                                                                           // 1099
                return "\\#";                                                                                         // 1100
              })(pos0);                                                                                               // 1101
            }                                                                                                         // 1102
            if (result0 === null) {                                                                                   // 1103
              pos = pos0;                                                                                             // 1104
            }                                                                                                         // 1105
            if (result0 === null) {                                                                                   // 1106
              pos0 = pos;                                                                                             // 1107
              if (input.substr(pos, 2) === "\\{") {                                                                   // 1108
                result0 = "\\{";                                                                                      // 1109
                pos += 2;                                                                                             // 1110
              } else {                                                                                                // 1111
                result0 = null;                                                                                       // 1112
                if (reportFailures === 0) {                                                                           // 1113
                  matchFailed("\"\\\\{\"");                                                                           // 1114
                }                                                                                                     // 1115
              }                                                                                                       // 1116
              if (result0 !== null) {                                                                                 // 1117
                result0 = (function(offset) {                                                                         // 1118
                  return "\u007B";                                                                                    // 1119
                })(pos0);                                                                                             // 1120
              }                                                                                                       // 1121
              if (result0 === null) {                                                                                 // 1122
                pos = pos0;                                                                                           // 1123
              }                                                                                                       // 1124
              if (result0 === null) {                                                                                 // 1125
                pos0 = pos;                                                                                           // 1126
                if (input.substr(pos, 2) === "\\}") {                                                                 // 1127
                  result0 = "\\}";                                                                                    // 1128
                  pos += 2;                                                                                           // 1129
                } else {                                                                                              // 1130
                  result0 = null;                                                                                     // 1131
                  if (reportFailures === 0) {                                                                         // 1132
                    matchFailed("\"\\\\}\"");                                                                         // 1133
                  }                                                                                                   // 1134
                }                                                                                                     // 1135
                if (result0 !== null) {                                                                               // 1136
                  result0 = (function(offset) {                                                                       // 1137
                    return "\u007D";                                                                                  // 1138
                  })(pos0);                                                                                           // 1139
                }                                                                                                     // 1140
                if (result0 === null) {                                                                               // 1141
                  pos = pos0;                                                                                         // 1142
                }                                                                                                     // 1143
                if (result0 === null) {                                                                               // 1144
                  pos0 = pos;                                                                                         // 1145
                  pos1 = pos;                                                                                         // 1146
                  if (input.substr(pos, 2) === "\\u") {                                                               // 1147
                    result0 = "\\u";                                                                                  // 1148
                    pos += 2;                                                                                         // 1149
                  } else {                                                                                            // 1150
                    result0 = null;                                                                                   // 1151
                    if (reportFailures === 0) {                                                                       // 1152
                      matchFailed("\"\\\\u\"");                                                                       // 1153
                    }                                                                                                 // 1154
                  }                                                                                                   // 1155
                  if (result0 !== null) {                                                                             // 1156
                    result1 = parse_hexDigit();                                                                       // 1157
                    if (result1 !== null) {                                                                           // 1158
                      result2 = parse_hexDigit();                                                                     // 1159
                      if (result2 !== null) {                                                                         // 1160
                        result3 = parse_hexDigit();                                                                   // 1161
                        if (result3 !== null) {                                                                       // 1162
                          result4 = parse_hexDigit();                                                                 // 1163
                          if (result4 !== null) {                                                                     // 1164
                            result0 = [result0, result1, result2, result3, result4];                                  // 1165
                          } else {                                                                                    // 1166
                            result0 = null;                                                                           // 1167
                            pos = pos1;                                                                               // 1168
                          }                                                                                           // 1169
                        } else {                                                                                      // 1170
                          result0 = null;                                                                             // 1171
                          pos = pos1;                                                                                 // 1172
                        }                                                                                             // 1173
                      } else {                                                                                        // 1174
                        result0 = null;                                                                               // 1175
                        pos = pos1;                                                                                   // 1176
                      }                                                                                               // 1177
                    } else {                                                                                          // 1178
                      result0 = null;                                                                                 // 1179
                      pos = pos1;                                                                                     // 1180
                    }                                                                                                 // 1181
                  } else {                                                                                            // 1182
                    result0 = null;                                                                                   // 1183
                    pos = pos1;                                                                                       // 1184
                  }                                                                                                   // 1185
                  if (result0 !== null) {                                                                             // 1186
                    result0 = (function(offset, h1, h2, h3, h4) {                                                     // 1187
                        return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));                               // 1188
                    })(pos0, result0[1], result0[2], result0[3], result0[4]);                                         // 1189
                  }                                                                                                   // 1190
                  if (result0 === null) {                                                                             // 1191
                    pos = pos0;                                                                                       // 1192
                  }                                                                                                   // 1193
                }                                                                                                     // 1194
              }                                                                                                       // 1195
            }                                                                                                         // 1196
          }                                                                                                           // 1197
          return result0;                                                                                             // 1198
        }                                                                                                             // 1199
                                                                                                                      // 1200
        function parse_digits() {                                                                                     // 1201
          var result0, result1;                                                                                       // 1202
          var pos0;                                                                                                   // 1203
                                                                                                                      // 1204
          pos0 = pos;                                                                                                 // 1205
          if (/^[0-9]/.test(input.charAt(pos))) {                                                                     // 1206
            result1 = input.charAt(pos);                                                                              // 1207
            pos++;                                                                                                    // 1208
          } else {                                                                                                    // 1209
            result1 = null;                                                                                           // 1210
            if (reportFailures === 0) {                                                                               // 1211
              matchFailed("[0-9]");                                                                                   // 1212
            }                                                                                                         // 1213
          }                                                                                                           // 1214
          if (result1 !== null) {                                                                                     // 1215
            result0 = [];                                                                                             // 1216
            while (result1 !== null) {                                                                                // 1217
              result0.push(result1);                                                                                  // 1218
              if (/^[0-9]/.test(input.charAt(pos))) {                                                                 // 1219
                result1 = input.charAt(pos);                                                                          // 1220
                pos++;                                                                                                // 1221
              } else {                                                                                                // 1222
                result1 = null;                                                                                       // 1223
                if (reportFailures === 0) {                                                                           // 1224
                  matchFailed("[0-9]");                                                                               // 1225
                }                                                                                                     // 1226
              }                                                                                                       // 1227
            }                                                                                                         // 1228
          } else {                                                                                                    // 1229
            result0 = null;                                                                                           // 1230
          }                                                                                                           // 1231
          if (result0 !== null) {                                                                                     // 1232
            result0 = (function(offset, ds) {                                                                         // 1233
              return parseInt((ds.join('')), 10);                                                                     // 1234
            })(pos0, result0);                                                                                        // 1235
          }                                                                                                           // 1236
          if (result0 === null) {                                                                                     // 1237
            pos = pos0;                                                                                               // 1238
          }                                                                                                           // 1239
          return result0;                                                                                             // 1240
        }                                                                                                             // 1241
                                                                                                                      // 1242
        function parse_hexDigit() {                                                                                   // 1243
          var result0;                                                                                                // 1244
                                                                                                                      // 1245
          if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {                                                               // 1246
            result0 = input.charAt(pos);                                                                              // 1247
            pos++;                                                                                                    // 1248
          } else {                                                                                                    // 1249
            result0 = null;                                                                                           // 1250
            if (reportFailures === 0) {                                                                               // 1251
              matchFailed("[0-9a-fA-F]");                                                                             // 1252
            }                                                                                                         // 1253
          }                                                                                                           // 1254
          return result0;                                                                                             // 1255
        }                                                                                                             // 1256
                                                                                                                      // 1257
        function parse__() {                                                                                          // 1258
          var result0, result1;                                                                                       // 1259
          var pos0;                                                                                                   // 1260
                                                                                                                      // 1261
          reportFailures++;                                                                                           // 1262
          pos0 = pos;                                                                                                 // 1263
          result0 = [];                                                                                               // 1264
          result1 = parse_whitespace();                                                                               // 1265
          while (result1 !== null) {                                                                                  // 1266
            result0.push(result1);                                                                                    // 1267
            result1 = parse_whitespace();                                                                             // 1268
          }                                                                                                           // 1269
          if (result0 !== null) {                                                                                     // 1270
            result0 = (function(offset, w) { return w.join(''); })(pos0, result0);                                    // 1271
          }                                                                                                           // 1272
          if (result0 === null) {                                                                                     // 1273
            pos = pos0;                                                                                               // 1274
          }                                                                                                           // 1275
          reportFailures--;                                                                                           // 1276
          if (reportFailures === 0 && result0 === null) {                                                             // 1277
            matchFailed("whitespace");                                                                                // 1278
          }                                                                                                           // 1279
          return result0;                                                                                             // 1280
        }                                                                                                             // 1281
                                                                                                                      // 1282
        function parse_whitespace() {                                                                                 // 1283
          var result0;                                                                                                // 1284
                                                                                                                      // 1285
          if (/^[ \t\n\r]/.test(input.charAt(pos))) {                                                                 // 1286
            result0 = input.charAt(pos);                                                                              // 1287
            pos++;                                                                                                    // 1288
          } else {                                                                                                    // 1289
            result0 = null;                                                                                           // 1290
            if (reportFailures === 0) {                                                                               // 1291
              matchFailed("[ \\t\\n\\r]");                                                                            // 1292
            }                                                                                                         // 1293
          }                                                                                                           // 1294
          return result0;                                                                                             // 1295
        }                                                                                                             // 1296
                                                                                                                      // 1297
                                                                                                                      // 1298
        function cleanupExpected(expected) {                                                                          // 1299
          expected.sort();                                                                                            // 1300
                                                                                                                      // 1301
          var lastExpected = null;                                                                                    // 1302
          var cleanExpected = [];                                                                                     // 1303
          for (var i = 0; i < expected.length; i++) {                                                                 // 1304
            if (expected[i] !== lastExpected) {                                                                       // 1305
              cleanExpected.push(expected[i]);                                                                        // 1306
              lastExpected = expected[i];                                                                             // 1307
            }                                                                                                         // 1308
          }                                                                                                           // 1309
          return cleanExpected;                                                                                       // 1310
        }                                                                                                             // 1311
                                                                                                                      // 1312
        function computeErrorPosition() {                                                                             // 1313
          /*                                                                                                          // 1314
           * The first idea was to use |String.split| to break the input up to the                                    // 1315
           * error position along newlines and derive the line and column from                                        // 1316
           * there. However IE's |split| implementation is so broken that it was                                      // 1317
           * enough to prevent it.                                                                                    // 1318
           */                                                                                                         // 1319
                                                                                                                      // 1320
          var line = 1;                                                                                               // 1321
          var column = 1;                                                                                             // 1322
          var seenCR = false;                                                                                         // 1323
                                                                                                                      // 1324
          for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {                                             // 1325
            var ch = input.charAt(i);                                                                                 // 1326
            if (ch === "\n") {                                                                                        // 1327
              if (!seenCR) { line++; }                                                                                // 1328
              column = 1;                                                                                             // 1329
              seenCR = false;                                                                                         // 1330
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {                                           // 1331
              line++;                                                                                                 // 1332
              column = 1;                                                                                             // 1333
              seenCR = true;                                                                                          // 1334
            } else {                                                                                                  // 1335
              column++;                                                                                               // 1336
              seenCR = false;                                                                                         // 1337
            }                                                                                                         // 1338
          }                                                                                                           // 1339
                                                                                                                      // 1340
          return { line: line, column: column };                                                                      // 1341
        }                                                                                                             // 1342
                                                                                                                      // 1343
                                                                                                                      // 1344
        var result = parseFunctions[startRule]();                                                                     // 1345
                                                                                                                      // 1346
        /*                                                                                                            // 1347
         * The parser is now in one of the following three states:                                                    // 1348
         *                                                                                                            // 1349
         * 1. The parser successfully parsed the whole input.                                                         // 1350
         *                                                                                                            // 1351
         *    - |result !== null|                                                                                     // 1352
         *    - |pos === input.length|                                                                                // 1353
         *    - |rightmostFailuresExpected| may or may not contain something                                          // 1354
         *                                                                                                            // 1355
         * 2. The parser successfully parsed only a part of the input.                                                // 1356
         *                                                                                                            // 1357
         *    - |result !== null|                                                                                     // 1358
         *    - |pos < input.length|                                                                                  // 1359
         *    - |rightmostFailuresExpected| may or may not contain something                                          // 1360
         *                                                                                                            // 1361
         * 3. The parser did not successfully parse any part of the input.                                            // 1362
         *                                                                                                            // 1363
         *   - |result === null|                                                                                      // 1364
         *   - |pos === 0|                                                                                            // 1365
         *   - |rightmostFailuresExpected| contains at least one failure                                              // 1366
         *                                                                                                            // 1367
         * All code following this comment (including called functions) must                                          // 1368
         * handle these states.                                                                                       // 1369
         */                                                                                                           // 1370
        if (result === null || pos !== input.length) {                                                                // 1371
          var offset = Math.max(pos, rightmostFailuresPos);                                                           // 1372
          var found = offset < input.length ? input.charAt(offset) : null;                                            // 1373
          var errorPosition = computeErrorPosition();                                                                 // 1374
                                                                                                                      // 1375
          throw new this.SyntaxError(                                                                                 // 1376
            cleanupExpected(rightmostFailuresExpected),                                                               // 1377
            found,                                                                                                    // 1378
            offset,                                                                                                   // 1379
            errorPosition.line,                                                                                       // 1380
            errorPosition.column                                                                                      // 1381
          );                                                                                                          // 1382
        }                                                                                                             // 1383
                                                                                                                      // 1384
        return result;                                                                                                // 1385
      },                                                                                                              // 1386
                                                                                                                      // 1387
      /* Returns the parser source code. */                                                                           // 1388
      toSource: function() { return this._source; }                                                                   // 1389
    };                                                                                                                // 1390
                                                                                                                      // 1391
    /* Thrown when a parser encounters a syntax error. */                                                             // 1392
                                                                                                                      // 1393
    result.SyntaxError = function(expected, found, offset, line, column) {                                            // 1394
      function buildMessage(expected, found) {                                                                        // 1395
        var expectedHumanized, foundHumanized;                                                                        // 1396
                                                                                                                      // 1397
        switch (expected.length) {                                                                                    // 1398
          case 0:                                                                                                     // 1399
            expectedHumanized = "end of input";                                                                       // 1400
            break;                                                                                                    // 1401
          case 1:                                                                                                     // 1402
            expectedHumanized = expected[0];                                                                          // 1403
            break;                                                                                                    // 1404
          default:                                                                                                    // 1405
            expectedHumanized = expected.slice(0, expected.length - 1).join(", ")                                     // 1406
              + " or "                                                                                                // 1407
              + expected[expected.length - 1];                                                                        // 1408
        }                                                                                                             // 1409
                                                                                                                      // 1410
        foundHumanized = found ? quote(found) : "end of input";                                                       // 1411
                                                                                                                      // 1412
        return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";                                // 1413
      }                                                                                                               // 1414
                                                                                                                      // 1415
      this.name = "SyntaxError";                                                                                      // 1416
      this.expected = expected;                                                                                       // 1417
      this.found = found;                                                                                             // 1418
      this.message = buildMessage(expected, found);                                                                   // 1419
      this.offset = offset;                                                                                           // 1420
      this.line = line;                                                                                               // 1421
      this.column = column;                                                                                           // 1422
    };                                                                                                                // 1423
                                                                                                                      // 1424
    result.SyntaxError.prototype = Error.prototype;                                                                   // 1425
                                                                                                                      // 1426
    return result;                                                                                                    // 1427
  })();                                                                                                               // 1428
                                                                                                                      // 1429
  MessageFormat.prototype.parse = function () {                                                                       // 1430
    // Bind to itself so error handling works                                                                         // 1431
    return mparser.parse.apply( mparser, arguments );                                                                 // 1432
  };                                                                                                                  // 1433
                                                                                                                      // 1434
  MessageFormat.prototype.precompile = function ( ast ) {                                                             // 1435
    var self = this,                                                                                                  // 1436
        needOther = false,                                                                                            // 1437
        fp = {                                                                                                        // 1438
      begin: 'function(d){\nvar r = "";\n',                                                                           // 1439
      end  : "return r;\n}"                                                                                           // 1440
    };                                                                                                                // 1441
                                                                                                                      // 1442
    function interpMFP ( ast, data ) {                                                                                // 1443
      // Set some default data                                                                                        // 1444
      data = data || {};                                                                                              // 1445
      var s = '', i, tmp, lastkeyname;                                                                                // 1446
                                                                                                                      // 1447
      switch ( ast.type ) {                                                                                           // 1448
        case 'program':                                                                                               // 1449
          return interpMFP( ast.program );                                                                            // 1450
        case 'messageFormatPattern':                                                                                  // 1451
          for ( i = 0; i < ast.statements.length; ++i ) {                                                             // 1452
            s += interpMFP( ast.statements[i], data );                                                                // 1453
          }                                                                                                           // 1454
          return fp.begin + s + fp.end;                                                                               // 1455
        case 'messageFormatPatternRight':                                                                             // 1456
          for ( i = 0; i < ast.statements.length; ++i ) {                                                             // 1457
            s += interpMFP( ast.statements[i], data );                                                                // 1458
          }                                                                                                           // 1459
          return s;                                                                                                   // 1460
        case 'messageFormatElement':                                                                                  // 1461
          data.pf_count = data.pf_count || 0;                                                                         // 1462
          s += 'if(!d){\nthrow new Error("MessageFormat: No data passed to function.");\n}\n';                        // 1463
          if ( ast.output ) {                                                                                         // 1464
            s += 'r += d["' + ast.argumentIndex + '"];\n';                                                            // 1465
          }                                                                                                           // 1466
          else {                                                                                                      // 1467
            lastkeyname = 'lastkey_'+(data.pf_count+1);                                                               // 1468
            s += 'var '+lastkeyname+' = "'+ast.argumentIndex+'";\n';                                                  // 1469
            s += 'var k_'+(data.pf_count+1)+'=d['+lastkeyname+'];\n';                                                 // 1470
            s += interpMFP( ast.elementFormat, data );                                                                // 1471
          }                                                                                                           // 1472
          return s;                                                                                                   // 1473
        case 'elementFormat':                                                                                         // 1474
          if ( ast.key === 'select' ) {                                                                               // 1475
            s += interpMFP( ast.val, data );                                                                          // 1476
            s += 'r += (pf_' +                                                                                        // 1477
                 data.pf_count +                                                                                      // 1478
                 '[ k_' + (data.pf_count+1) + ' ] || pf_'+data.pf_count+'[ "other" ])( d );\n';                       // 1479
          }                                                                                                           // 1480
          else if ( ast.key === 'plural' ) {                                                                          // 1481
            s += interpMFP( ast.val, data );                                                                          // 1482
            s += 'if ( pf_'+(data.pf_count)+'[ k_'+(data.pf_count+1)+' + "" ] ) {\n';                                 // 1483
            s += 'r += pf_'+data.pf_count+'[ k_'+(data.pf_count+1)+' + "" ]( d ); \n';                                // 1484
            s += '}\nelse {\n';                                                                                       // 1485
            s += 'r += (pf_' +                                                                                        // 1486
                 data.pf_count +                                                                                      // 1487
                 '[ MessageFormat.locale["' +                                                                         // 1488
                 self.fallbackLocale +                                                                                // 1489
                 '"]( k_'+(data.pf_count+1)+' - off_'+(data.pf_count)+' ) ] || pf_'+data.pf_count+'[ "other" ] )( d );\n';
            s += '}\n';                                                                                               // 1491
          }                                                                                                           // 1492
          return s;                                                                                                   // 1493
        /* // Unreachable cases.                                                                                      // 1494
        case 'pluralStyle':                                                                                           // 1495
        case 'selectStyle':*/                                                                                         // 1496
        case 'pluralFormatPattern':                                                                                   // 1497
          data.pf_count = data.pf_count || 0;                                                                         // 1498
          s += 'var off_'+data.pf_count+' = '+ast.offset+';\n';                                                       // 1499
          s += 'var pf_' + data.pf_count + ' = { \n';                                                                 // 1500
          needOther = true;                                                                                           // 1501
          // We're going to simultaneously check to make sure we hit the required 'other' option.                     // 1502
                                                                                                                      // 1503
          for ( i = 0; i < ast.pluralForms.length; ++i ) {                                                            // 1504
            if ( ast.pluralForms[ i ].key === 'other' ) {                                                             // 1505
              needOther = false;                                                                                      // 1506
            }                                                                                                         // 1507
            if ( tmp ) {                                                                                              // 1508
              s += ',\n';                                                                                             // 1509
            }                                                                                                         // 1510
            else{                                                                                                     // 1511
              tmp = 1;                                                                                                // 1512
            }                                                                                                         // 1513
            s += '"' + ast.pluralForms[ i ].key + '" : ' + interpMFP( ast.pluralForms[ i ].val,                       // 1514
          (function(){ var res = JSON.parse(JSON.stringify(data)); res.pf_count++; return res; })() );                // 1515
          }                                                                                                           // 1516
          s += '\n};\n';                                                                                              // 1517
          if ( needOther ) {                                                                                          // 1518
            throw new Error("No 'other' form found in pluralFormatPattern " + data.pf_count);                         // 1519
          }                                                                                                           // 1520
          return s;                                                                                                   // 1521
        case 'selectFormatPattern':                                                                                   // 1522
                                                                                                                      // 1523
          data.pf_count = data.pf_count || 0;                                                                         // 1524
          s += 'var off_'+data.pf_count+' = 0;\n';                                                                    // 1525
          s += 'var pf_' + data.pf_count + ' = { \n';                                                                 // 1526
          needOther = true;                                                                                           // 1527
                                                                                                                      // 1528
          for ( i = 0; i < ast.pluralForms.length; ++i ) {                                                            // 1529
            if ( ast.pluralForms[ i ].key === 'other' ) {                                                             // 1530
              needOther = false;                                                                                      // 1531
            }                                                                                                         // 1532
            if ( tmp ) {                                                                                              // 1533
              s += ',\n';                                                                                             // 1534
            }                                                                                                         // 1535
            else{                                                                                                     // 1536
              tmp = 1;                                                                                                // 1537
            }                                                                                                         // 1538
            s += '"' + ast.pluralForms[ i ].key + '" : ' + interpMFP( ast.pluralForms[ i ].val,                       // 1539
              (function(){                                                                                            // 1540
                var res = JSON.parse( JSON.stringify( data ) );                                                       // 1541
                res.pf_count++;                                                                                       // 1542
                return res;                                                                                           // 1543
              })()                                                                                                    // 1544
            );                                                                                                        // 1545
          }                                                                                                           // 1546
          s += '\n};\n';                                                                                              // 1547
          if ( needOther ) {                                                                                          // 1548
            throw new Error("No 'other' form found in selectFormatPattern " + data.pf_count);                         // 1549
          }                                                                                                           // 1550
          return s;                                                                                                   // 1551
        /* // Unreachable                                                                                             // 1552
        case 'pluralForms':                                                                                           // 1553
        */                                                                                                            // 1554
        case 'string':                                                                                                // 1555
          return 'r += "' + MessageFormat.Utils.numSub(                                                               // 1556
            MessageFormat.Utils.escapeExpression( ast.val ),                                                          // 1557
            'k_' + data.pf_count + ' - off_' + ( data.pf_count - 1 ),                                                 // 1558
            data.pf_count                                                                                             // 1559
          ) + '";\n';                                                                                                 // 1560
        default:                                                                                                      // 1561
          throw new Error( 'Bad AST type: ' + ast.type );                                                             // 1562
      }                                                                                                               // 1563
    }                                                                                                                 // 1564
    return interpMFP( ast );                                                                                          // 1565
  };                                                                                                                  // 1566
                                                                                                                      // 1567
  MessageFormat.prototype.compile = function ( message ) {                                                            // 1568
    return (new Function( 'MessageFormat',                                                                            // 1569
      'return ' +                                                                                                     // 1570
        this.precompile(                                                                                              // 1571
          this.parse( message )                                                                                       // 1572
        )                                                                                                             // 1573
    ))(MessageFormat);                                                                                                // 1574
  };                                                                                                                  // 1575
                                                                                                                      // 1576
                                                                                                                      // 1577
  if (typeof exports !== 'undefined') {                                                                               // 1578
    if (typeof module !== 'undefined' && module.exports) {                                                            // 1579
      exports = module.exports = MessageFormat;                                                                       // 1580
    }                                                                                                                 // 1581
    exports.MessageFormat = MessageFormat;                                                                            // 1582
  }                                                                                                                   // 1583
  else if (typeof define === 'function' && define.amd) {                                                              // 1584
    define(function() {                                                                                               // 1585
      return MessageFormat;                                                                                           // 1586
    });                                                                                                               // 1587
  }                                                                                                                   // 1588
  else {                                                                                                              // 1589
    root['MessageFormat'] = MessageFormat;                                                                            // 1590
  }                                                                                                                   // 1591
                                                                                                                      // 1592
})( this );                                                                                                           // 1593
                                                                                                                      // 1594
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/messageformat.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
 * TODO                                                                                                               // 2
 *                                                                                                                    // 3
 * -> Revisions, show diff                                                                                            // 4
 * -> Mark stuff as fuzzy or invalid depending on how big the change is                                               // 5
 * -> transUI, enable on load, etc... decide on mfTrans.js format                                                     // 6
 *                                                                                                                    // 7
 * sendNative code (force send of native strings in case not kept inline)                                             // 8
 * ready() function for loadlang, sub.  XXX-                                                                          // 9
 * setLocale()                                                                                                        // 10
 * language loader tooltip                                                                                            // 11
 *                                                                                                                    // 12
 */                                                                                                                   // 13
                                                                                                                      // 14
                                                                                                                      // 15
mfPkg = {                                                                                                             // 16
    native: 'en',   // Fine to use reserved words for IdentifierNames (vs Identifiers)                                // 17
    objects: {},                                                                                                      // 18
    compiled: {},                                                                                                     // 19
    strings: {},                                                                                                      // 20
    meta: {},                                                                                                         // 21
    initted: false,                                                                                                   // 22
                                                                                                                      // 23
    sendPolicy: 'all',                                                                                                // 24
    sendNative: false,                                                                                                // 25
    transUI: {                                                                                                        // 26
        enabled: true                                                                                                 // 27
    },                                                                                                                // 28
                                                                                                                      // 29
    mfStrings: typeof Mongo !== 'undefined' ? new Mongo.Collection('mfStrings') : new Meteor.Collection('mfStrings'), // 30
    mfRevisions: typeof Mongo !== 'undefined' ? new Mongo.Collection('mfRevisions') : new Meteor.Collection('mfRevisions'),
    mfMeta: typeof Mongo !== 'undefined' ? new Mongo.Collection('mfMeta') : new Meteor.Collection('mfMeta'),          // 32
                                                                                                                      // 33
    init: function(native, options) {                                                                                 // 34
        this.native = native;                                                                                         // 35
        this.initted = true;                                                                                          // 36
        if (Meteor.isServer)                                                                                          // 37
            this.serverInit(native, options);                                                                         // 38
        else                                                                                                          // 39
            this.clientInit(native, options);                                                                         // 40
    },                                                                                                                // 41
                                                                                                                      // 42
    /*                                                                                                                // 43
     * Observe additions/changes from after our last extract time, and                                                // 44
     * update the local cache accordingly                                                                             // 45
     */                                                                                                               // 46
    observeFrom: function(mtime, which) {                                                                             // 47
        var query = {mtime: {$gt: mtime}};                                                                            // 48
        if (which == 'native')                                                                                        // 49
            query.lang = mfPkg.native;                                                                                // 50
        else if (which == 'trans')                                                                                    // 51
            query.lang = { $not: mfPkg.native };                                                                      // 52
                                                                                                                      // 53
        this.mfStrings.find().observe({                                                                               // 54
            added: function(doc) {                                                                                    // 55
//                console.log('added ' + doc.key + ' ' + doc.text);                                                   // 56
                if (!mfPkg.strings[doc.lang])                                                                         // 57
                    mfPkg.strings[doc.lang] = {};                                                                     // 58
                if (!mfPkg.compiled[doc.lang])                                                                        // 59
                    mfPkg.compiled[doc.lang] = {};                                                                    // 60
                mfPkg.strings[doc.lang][doc.key]                                                                      // 61
                    = Meteor.isClient ? doc.text : doc;                                                               // 62
            }, changed: function(doc) {                                                                               // 63
//                console.log('changed ' + doc.key + ' ' + doc.text);                                                 // 64
                mfPkg.strings[doc.lang][doc.key]                                                                      // 65
                    = Meteor.isClient ? doc.text : doc;                                                               // 66
                if (mfPkg.compiled[doc.lang][doc.key])                                                                // 67
                    delete mfPkg.compiled[doc.lang][doc.key];                                                         // 68
            }                                                                                                         // 69
        });                                                                                                           // 70
    },                                                                                                                // 71
                                                                                                                      // 72
    webUI: {                                                                                                          // 73
        allowFuncs: [ function() { return !!Meteor.userId(); } ],                                                     // 74
        denyFuncs: [],                                                                                                // 75
        allow: function(func) { this.allowFuncs.push(func); },                                                        // 76
        deny: function(func) { this.denyFuncs.push(func); },                                                          // 77
        allowed: function() {                                                                                         // 78
            var self = this, args = arguments;                                                                        // 79
            return _.some(mfPkg.webUI.allowFuncs, function(func) {                                                    // 80
                return func.apply(self, args);                                                                        // 81
            });                                                                                                       // 82
        },                                                                                                            // 83
        denied: function() {                                                                                          // 84
            var self = this, args = arguments;                                                                        // 85
            return _.some(mfPkg.webUI.denyFuncs, function(func) {                                                     // 86
                return func.apply(self, args);                                                                        // 87
            });                                                                                                       // 88
        }                                                                                                             // 89
    }                                                                                                                 // 90
}                                                                                                                     // 91
                                                                                                                      // 92
mfPkg.mfStrings.allow({insert:mfPkg.webUI.allowed, update:mfPkg.webUI.allowed, remove:mfPkg.webUI.allowed});          // 93
mfPkg.mfStrings.deny({insert:mfPkg.webUI.denied, update:mfPkg.webUI.denied, remove:mfPkg.webUI.denied});              // 94
mfPkg.mfRevisions.allow({insert:mfPkg.webUI.allowed, update:mfPkg.webUI.allowed, remove:mfPkg.webUI.allowed});        // 95
mfPkg.mfRevisions.deny({insert:mfPkg.webUI.denied, update:mfPkg.webUI.denied, remove:mfPkg.webUI.denied});            // 96
mfPkg.mfMeta.deny(function() { return true; });                                                                       // 97
                                                                                                                      // 98
mf = function(key, params, message, locale) {                                                                         // 99
    if (!locale && Meteor.isClient)                                                                                   // 100
        locale = Session.get('locale');                                                                               // 101
    if (!locale)                                                                                                      // 102
        locale = mfPkg.native;                                                                                        // 103
    if (_.isString(params)) {                                                                                         // 104
        message = params;                                                                                             // 105
        params = null;                                                                                                // 106
    }                                                                                                                 // 107
                                                                                                                      // 108
    var mf = mfPkg.objects[locale];                                                                                   // 109
    if (!mf) {                                                                                                        // 110
        mf = mfPkg.objects[locale] = new MessageFormat(locale);                                                       // 111
        if (!mfPkg.strings[locale]) mfPkg.strings[locale] = {};                                                       // 112
        mfPkg.compiled[locale] = {};                                                                                  // 113
    }                                                                                                                 // 114
                                                                                                                      // 115
    var cmessage = mfPkg.compiled[locale][key];                                                                       // 116
    if (!cmessage) {                                                                                                  // 117
        // try find key in 1) locale, 2) native, 3) as an argument, 4) just show the key name                         // 118
        if (mfPkg.strings[locale] && mfPkg.strings[locale][key])                                                      // 119
            message = mfPkg.strings[locale][key];                                                                     // 120
        else if (mfPkg.strings[mfPkg.native][key])                                                                    // 121
            message = mfPkg.strings[mfPkg.native][key];                                                               // 122
        else                                                                                                          // 123
            message = message || key;                                                                                 // 124
                                                                                                                      // 125
        // If loaded from database (only when mfExtract/All.js exists)                                                // 126
        if (Meteor.isServer && _.isObject(message))                                                                   // 127
        	message = message.text;                                                                                      // 128
                                                                                                                      // 129
        cmessage = mfPkg.compiled[locale][key] = mf.compile(message);                                                 // 130
    }                                                                                                                 // 131
                                                                                                                      // 132
    try {                                                                                                             // 133
        cmessage = cmessage(params);                                                                                  // 134
    }                                                                                                                 // 135
    catch(err) {                                                                                                      // 136
        cmessage = err;                                                                                               // 137
    }                                                                                                                 // 138
                                                                                                                      // 139
    return cmessage;                                                                                                  // 140
}                                                                                                                     // 141
                                                                                                                      // 142
                                                                                                                      // 143
// needs to be on client and server for routing to work properly                                                      // 144
if (Package['iron:router'])                                                                                           // 145
Package['iron:router'].Router.map(function() {                                                                        // 146
    this.route('mfAll', {                                                                                             // 147
        path: '/translate/mfAll.js',                                                                                  // 148
        where: 'server',                                                                                              // 149
        action: function() {                                                                                          // 150
            var out, meta = { exportedAt: new Date().getTime(), updatedAt: 0 };                                       // 151
            for (lang in mfPkg.strings)                                                                               // 152
                for (key in mfPkg.strings[lang])                                                                      // 153
                    if (mfPkg.strings[lang][key].mtime > meta.updatedAt)                                              // 154
                        meta.updatedAt = mfPkg.strings[lang][key].mtime;                                              // 155
                                                                                                                      // 156
            out = 'mfPkg.syncAll('                                                                                    // 157
                + JSON.stringify(mfPkg.strings, null, 2)                                                              // 158
                + ', ' + JSON.stringify(meta, null, 2) + ');';                                                        // 159
            //this.response.writeHead(200, {'Content-Type': 'application/javascript'});                               // 160
            this.response.writeHead(200, {'Content-Disposition': 'attachment; filename=mfAll.js'});                   // 161
            this.response.end(out, 'utf8');                                                                           // 162
        }                                                                                                             // 163
    });                                                                                                               // 164
});                                                                                                                   // 165
                                                                                                                      // 166
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/locale-all.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
MessageFormat.locale.af = function ( n ) {                                                                            // 1
  if ( n === 1 ) {                                                                                                    // 2
    return "one";                                                                                                     // 3
  }                                                                                                                   // 4
  return "other";                                                                                                     // 5
};                                                                                                                    // 6
MessageFormat.locale.am = function(n) {                                                                               // 7
  if (n === 0 || n == 1) {                                                                                            // 8
    return 'one';                                                                                                     // 9
  }                                                                                                                   // 10
  return 'other';                                                                                                     // 11
};                                                                                                                    // 12
MessageFormat.locale.ar = function(n) {                                                                               // 13
  if (n === 0) {                                                                                                      // 14
    return 'zero';                                                                                                    // 15
  }                                                                                                                   // 16
  if (n == 1) {                                                                                                       // 17
    return 'one';                                                                                                     // 18
  }                                                                                                                   // 19
  if (n == 2) {                                                                                                       // 20
    return 'two';                                                                                                     // 21
  }                                                                                                                   // 22
  if ((n % 100) >= 3 && (n % 100) <= 10 && n == Math.floor(n)) {                                                      // 23
    return 'few';                                                                                                     // 24
  }                                                                                                                   // 25
  if ((n % 100) >= 11 && (n % 100) <= 99 && n == Math.floor(n)) {                                                     // 26
    return 'many';                                                                                                    // 27
  }                                                                                                                   // 28
  return 'other';                                                                                                     // 29
};                                                                                                                    // 30
MessageFormat.locale.bg = function ( n ) {                                                                            // 31
  if ( n === 1 ) {                                                                                                    // 32
    return "one";                                                                                                     // 33
  }                                                                                                                   // 34
  return "other";                                                                                                     // 35
};                                                                                                                    // 36
MessageFormat.locale.bn = function ( n ) {                                                                            // 37
  if ( n === 1 ) {                                                                                                    // 38
    return "one";                                                                                                     // 39
  }                                                                                                                   // 40
  return "other";                                                                                                     // 41
};                                                                                                                    // 42
MessageFormat.locale.br = function (n) {                                                                              // 43
  if (n === 0) {                                                                                                      // 44
    return 'zero';                                                                                                    // 45
  }                                                                                                                   // 46
  if (n == 1) {                                                                                                       // 47
    return 'one';                                                                                                     // 48
  }                                                                                                                   // 49
  if (n == 2) {                                                                                                       // 50
    return 'two';                                                                                                     // 51
  }                                                                                                                   // 52
  if (n == 3) {                                                                                                       // 53
    return 'few';                                                                                                     // 54
  }                                                                                                                   // 55
  if (n == 6) {                                                                                                       // 56
    return 'many';                                                                                                    // 57
  }                                                                                                                   // 58
  return 'other';                                                                                                     // 59
};                                                                                                                    // 60
MessageFormat.locale.ca = function ( n ) {                                                                            // 61
  if ( n === 1 ) {                                                                                                    // 62
    return "one";                                                                                                     // 63
  }                                                                                                                   // 64
  return "other";                                                                                                     // 65
};                                                                                                                    // 66
MessageFormat.locale.cs = function (n) {                                                                              // 67
  if (n == 1) {                                                                                                       // 68
    return 'one';                                                                                                     // 69
  }                                                                                                                   // 70
  if (n == 2 || n == 3 || n == 4) {                                                                                   // 71
    return 'few';                                                                                                     // 72
  }                                                                                                                   // 73
  return 'other';                                                                                                     // 74
};                                                                                                                    // 75
MessageFormat.locale.cy = function (n) {                                                                              // 76
  if (n === 0) {                                                                                                      // 77
    return 'zero';                                                                                                    // 78
  }                                                                                                                   // 79
  if (n == 1) {                                                                                                       // 80
    return 'one';                                                                                                     // 81
  }                                                                                                                   // 82
  if (n == 2) {                                                                                                       // 83
    return 'two';                                                                                                     // 84
  }                                                                                                                   // 85
  if (n == 3) {                                                                                                       // 86
    return 'few';                                                                                                     // 87
  }                                                                                                                   // 88
  if (n == 6) {                                                                                                       // 89
    return 'many';                                                                                                    // 90
  }                                                                                                                   // 91
  return 'other';                                                                                                     // 92
};                                                                                                                    // 93
MessageFormat.locale.da = function ( n ) {                                                                            // 94
  if ( n === 1 ) {                                                                                                    // 95
    return "one";                                                                                                     // 96
  }                                                                                                                   // 97
  return "other";                                                                                                     // 98
};                                                                                                                    // 99
MessageFormat.locale.de = function ( n ) {                                                                            // 100
  if ( n === 1 ) {                                                                                                    // 101
    return "one";                                                                                                     // 102
  }                                                                                                                   // 103
  return "other";                                                                                                     // 104
};                                                                                                                    // 105
MessageFormat.locale.el = function ( n ) {                                                                            // 106
  if ( n === 1 ) {                                                                                                    // 107
    return "one";                                                                                                     // 108
  }                                                                                                                   // 109
  return "other";                                                                                                     // 110
};                                                                                                                    // 111
MessageFormat.locale.en = function ( n ) {                                                                            // 112
  if ( n === 1 ) {                                                                                                    // 113
    return "one";                                                                                                     // 114
  }                                                                                                                   // 115
  return "other";                                                                                                     // 116
};                                                                                                                    // 117
MessageFormat.locale.es = function ( n ) {                                                                            // 118
  if ( n === 1 ) {                                                                                                    // 119
    return "one";                                                                                                     // 120
  }                                                                                                                   // 121
  return "other";                                                                                                     // 122
};                                                                                                                    // 123
MessageFormat.locale.et = function ( n ) {                                                                            // 124
  if ( n === 1 ) {                                                                                                    // 125
    return "one";                                                                                                     // 126
  }                                                                                                                   // 127
  return "other";                                                                                                     // 128
};                                                                                                                    // 129
MessageFormat.locale.eu = function ( n ) {                                                                            // 130
  if ( n === 1 ) {                                                                                                    // 131
    return "one";                                                                                                     // 132
  }                                                                                                                   // 133
  return "other";                                                                                                     // 134
};                                                                                                                    // 135
MessageFormat.locale.fa = function ( n ) {                                                                            // 136
  return "other";                                                                                                     // 137
};                                                                                                                    // 138
MessageFormat.locale.fi = function ( n ) {                                                                            // 139
  if ( n === 1 ) {                                                                                                    // 140
    return "one";                                                                                                     // 141
  }                                                                                                                   // 142
  return "other";                                                                                                     // 143
};                                                                                                                    // 144
MessageFormat.locale.fil = function(n) {                                                                              // 145
  if (n === 0 || n == 1) {                                                                                            // 146
    return 'one';                                                                                                     // 147
  }                                                                                                                   // 148
  return 'other';                                                                                                     // 149
};                                                                                                                    // 150
MessageFormat.locale.fr = function (n) {                                                                              // 151
  if (n >= 0 && n < 2) {                                                                                              // 152
    return 'one';                                                                                                     // 153
  }                                                                                                                   // 154
  return 'other';                                                                                                     // 155
};                                                                                                                    // 156
MessageFormat.locale.ga = function (n) {                                                                              // 157
  if (n == 1) {                                                                                                       // 158
    return 'one';                                                                                                     // 159
  }                                                                                                                   // 160
  if (n == 2) {                                                                                                       // 161
    return 'two';                                                                                                     // 162
  }                                                                                                                   // 163
  return 'other';                                                                                                     // 164
};                                                                                                                    // 165
MessageFormat.locale.gl = function ( n ) {                                                                            // 166
  if ( n === 1 ) {                                                                                                    // 167
    return "one";                                                                                                     // 168
  }                                                                                                                   // 169
  return "other";                                                                                                     // 170
};                                                                                                                    // 171
MessageFormat.locale.gsw = function ( n ) {                                                                           // 172
  if ( n === 1 ) {                                                                                                    // 173
    return "one";                                                                                                     // 174
  }                                                                                                                   // 175
  return "other";                                                                                                     // 176
};                                                                                                                    // 177
MessageFormat.locale.gu = function ( n ) {                                                                            // 178
  if ( n === 1 ) {                                                                                                    // 179
    return "one";                                                                                                     // 180
  }                                                                                                                   // 181
  return "other";                                                                                                     // 182
};                                                                                                                    // 183
MessageFormat.locale.he = function ( n ) {                                                                            // 184
  if ( n === 1 ) {                                                                                                    // 185
    return "one";                                                                                                     // 186
  }                                                                                                                   // 187
  return "other";                                                                                                     // 188
};                                                                                                                    // 189
MessageFormat.locale.hi = function(n) {                                                                               // 190
  if (n === 0 || n == 1) {                                                                                            // 191
    return 'one';                                                                                                     // 192
  }                                                                                                                   // 193
  return 'other';                                                                                                     // 194
};                                                                                                                    // 195
MessageFormat.locale.hr = function (n) {                                                                              // 196
  if ((n % 10) == 1 && (n % 100) != 11) {                                                                             // 197
    return 'one';                                                                                                     // 198
  }                                                                                                                   // 199
  if ((n % 10) >= 2 && (n % 10) <= 4 &&                                                                               // 200
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {                                                     // 201
    return 'few';                                                                                                     // 202
  }                                                                                                                   // 203
  if ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9) ||                                                           // 204
      ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {                                                   // 205
    return 'many';                                                                                                    // 206
  }                                                                                                                   // 207
  return 'other';                                                                                                     // 208
};                                                                                                                    // 209
MessageFormat.locale.hu = function(n) {                                                                               // 210
  return 'other';                                                                                                     // 211
};                                                                                                                    // 212
MessageFormat.locale.id = function(n) {                                                                               // 213
  return 'other';                                                                                                     // 214
};                                                                                                                    // 215
MessageFormat.locale["in"] = function(n) {                                                                            // 216
  return 'other';                                                                                                     // 217
};                                                                                                                    // 218
MessageFormat.locale.is = function ( n ) {                                                                            // 219
  if ( n === 1 ) {                                                                                                    // 220
    return "one";                                                                                                     // 221
  }                                                                                                                   // 222
  return "other";                                                                                                     // 223
};                                                                                                                    // 224
MessageFormat.locale.it = function ( n ) {                                                                            // 225
  if ( n === 1 ) {                                                                                                    // 226
    return "one";                                                                                                     // 227
  }                                                                                                                   // 228
  return "other";                                                                                                     // 229
};                                                                                                                    // 230
MessageFormat.locale.iw = function ( n ) {                                                                            // 231
  if ( n === 1 ) {                                                                                                    // 232
    return "one";                                                                                                     // 233
  }                                                                                                                   // 234
  return "other";                                                                                                     // 235
};                                                                                                                    // 236
MessageFormat.locale.ja = function ( n ) {                                                                            // 237
  return "other";                                                                                                     // 238
};                                                                                                                    // 239
MessageFormat.locale.kn = function ( n ) {                                                                            // 240
  return "other";                                                                                                     // 241
};                                                                                                                    // 242
MessageFormat.locale.ko = function ( n ) {                                                                            // 243
  return "other";                                                                                                     // 244
};                                                                                                                    // 245
MessageFormat.locale.lag = function (n) {                                                                             // 246
  if (n === 0) {                                                                                                      // 247
    return 'zero';                                                                                                    // 248
  }                                                                                                                   // 249
  if (n > 0 && n < 2) {                                                                                               // 250
    return 'one';                                                                                                     // 251
  }                                                                                                                   // 252
  return 'other';                                                                                                     // 253
};                                                                                                                    // 254
MessageFormat.locale.ln = function(n) {                                                                               // 255
  if (n === 0 || n == 1) {                                                                                            // 256
    return 'one';                                                                                                     // 257
  }                                                                                                                   // 258
  return 'other';                                                                                                     // 259
};                                                                                                                    // 260
MessageFormat.locale.lt = function (n) {                                                                              // 261
  if ((n % 10) == 1 && ((n % 100) < 11 || (n % 100) > 19)) {                                                          // 262
    return 'one';                                                                                                     // 263
  }                                                                                                                   // 264
  if ((n % 10) >= 2 && (n % 10) <= 9 &&                                                                               // 265
      ((n % 100) < 11 || (n % 100) > 19) && n == Math.floor(n)) {                                                     // 266
    return 'few';                                                                                                     // 267
  }                                                                                                                   // 268
  return 'other';                                                                                                     // 269
};                                                                                                                    // 270
MessageFormat.locale.lv = function (n) {                                                                              // 271
  if (n === 0) {                                                                                                      // 272
    return 'zero';                                                                                                    // 273
  }                                                                                                                   // 274
  if ((n % 10) == 1 && (n % 100) != 11) {                                                                             // 275
    return 'one';                                                                                                     // 276
  }                                                                                                                   // 277
  return 'other';                                                                                                     // 278
};                                                                                                                    // 279
MessageFormat.locale.mk = function (n) {                                                                              // 280
  if ((n % 10) == 1 && n != 11) {                                                                                     // 281
    return 'one';                                                                                                     // 282
  }                                                                                                                   // 283
  return 'other';                                                                                                     // 284
};                                                                                                                    // 285
MessageFormat.locale.ml = function ( n ) {                                                                            // 286
  if ( n === 1 ) {                                                                                                    // 287
    return "one";                                                                                                     // 288
  }                                                                                                                   // 289
  return "other";                                                                                                     // 290
};                                                                                                                    // 291
MessageFormat.locale.mo = function (n) {                                                                              // 292
  if (n == 1) {                                                                                                       // 293
    return 'one';                                                                                                     // 294
  }                                                                                                                   // 295
  if (n === 0 || n != 1 && (n % 100) >= 1 &&                                                                          // 296
      (n % 100) <= 19 && n == Math.floor(n)) {                                                                        // 297
    return 'few';                                                                                                     // 298
  }                                                                                                                   // 299
  return 'other';                                                                                                     // 300
};                                                                                                                    // 301
MessageFormat.locale.mr = function ( n ) {                                                                            // 302
  if ( n === 1 ) {                                                                                                    // 303
    return "one";                                                                                                     // 304
  }                                                                                                                   // 305
  return "other";                                                                                                     // 306
};                                                                                                                    // 307
MessageFormat.locale.ms = function ( n ) {                                                                            // 308
  return "other";                                                                                                     // 309
};                                                                                                                    // 310
MessageFormat.locale.mt = function (n) {                                                                              // 311
  if (n == 1) {                                                                                                       // 312
    return 'one';                                                                                                     // 313
  }                                                                                                                   // 314
  if (n === 0 || ((n % 100) >= 2 && (n % 100) <= 4 && n == Math.floor(n))) {                                          // 315
    return 'few';                                                                                                     // 316
  }                                                                                                                   // 317
  if ((n % 100) >= 11 && (n % 100) <= 19 && n == Math.floor(n)) {                                                     // 318
    return 'many';                                                                                                    // 319
  }                                                                                                                   // 320
  return 'other';                                                                                                     // 321
};                                                                                                                    // 322
MessageFormat.locale.nl = function ( n ) {                                                                            // 323
  if ( n === 1 ) {                                                                                                    // 324
    return "one";                                                                                                     // 325
  }                                                                                                                   // 326
  return "other";                                                                                                     // 327
};                                                                                                                    // 328
MessageFormat.locale.no = function ( n ) {                                                                            // 329
  if ( n === 1 ) {                                                                                                    // 330
    return "one";                                                                                                     // 331
  }                                                                                                                   // 332
  return "other";                                                                                                     // 333
};                                                                                                                    // 334
MessageFormat.locale.or = function ( n ) {                                                                            // 335
  if ( n === 1 ) {                                                                                                    // 336
    return "one";                                                                                                     // 337
  }                                                                                                                   // 338
  return "other";                                                                                                     // 339
};                                                                                                                    // 340
MessageFormat.locale.pl = function (n) {                                                                              // 341
  if (n == 1) {                                                                                                       // 342
    return 'one';                                                                                                     // 343
  }                                                                                                                   // 344
  if ((n % 10) >= 2 && (n % 10) <= 4 &&                                                                               // 345
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {                                                     // 346
    return 'few';                                                                                                     // 347
  }                                                                                                                   // 348
  if ((n % 10) === 0 || n != 1 && (n % 10) == 1 ||                                                                    // 349
      ((n % 10) >= 5 && (n % 10) <= 9 || (n % 100) >= 12 && (n % 100) <= 14) &&                                       // 350
      n == Math.floor(n)) {                                                                                           // 351
    return 'many';                                                                                                    // 352
  }                                                                                                                   // 353
  return 'other';                                                                                                     // 354
};                                                                                                                    // 355
MessageFormat.locale.pt = function ( n ) {                                                                            // 356
  if ( n === 1 ) {                                                                                                    // 357
    return "one";                                                                                                     // 358
  }                                                                                                                   // 359
  return "other";                                                                                                     // 360
};                                                                                                                    // 361
MessageFormat.locale.ro = function (n) {                                                                              // 362
  if (n == 1) {                                                                                                       // 363
    return 'one';                                                                                                     // 364
  }                                                                                                                   // 365
  if (n === 0 || n != 1 && (n % 100) >= 1 &&                                                                          // 366
      (n % 100) <= 19 && n == Math.floor(n)) {                                                                        // 367
    return 'few';                                                                                                     // 368
  }                                                                                                                   // 369
  return 'other';                                                                                                     // 370
};                                                                                                                    // 371
MessageFormat.locale.ru = function (n) {                                                                              // 372
  if ((n % 10) == 1 && (n % 100) != 11) {                                                                             // 373
    return 'one';                                                                                                     // 374
  }                                                                                                                   // 375
  if ((n % 10) >= 2 && (n % 10) <= 4 &&                                                                               // 376
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {                                                     // 377
    return 'few';                                                                                                     // 378
  }                                                                                                                   // 379
  if ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9) ||                                                           // 380
      ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {                                                   // 381
    return 'many';                                                                                                    // 382
  }                                                                                                                   // 383
  return 'other';                                                                                                     // 384
};                                                                                                                    // 385
MessageFormat.locale.shi = function(n) {                                                                              // 386
  if (n >= 0 && n <= 1) {                                                                                             // 387
    return 'one';                                                                                                     // 388
  }                                                                                                                   // 389
  if (n >= 2 && n <= 10 && n == Math.floor(n)) {                                                                      // 390
    return 'few';                                                                                                     // 391
  }                                                                                                                   // 392
  return 'other';                                                                                                     // 393
};                                                                                                                    // 394
MessageFormat.locale.sk = function (n) {                                                                              // 395
  if (n == 1) {                                                                                                       // 396
    return 'one';                                                                                                     // 397
  }                                                                                                                   // 398
  if (n == 2 || n == 3 || n == 4) {                                                                                   // 399
    return 'few';                                                                                                     // 400
  }                                                                                                                   // 401
  return 'other';                                                                                                     // 402
};                                                                                                                    // 403
MessageFormat.locale.sl = function (n) {                                                                              // 404
  if ((n % 100) == 1) {                                                                                               // 405
    return 'one';                                                                                                     // 406
  }                                                                                                                   // 407
  if ((n % 100) == 2) {                                                                                               // 408
    return 'two';                                                                                                     // 409
  }                                                                                                                   // 410
  if ((n % 100) == 3 || (n % 100) == 4) {                                                                             // 411
    return 'few';                                                                                                     // 412
  }                                                                                                                   // 413
  return 'other';                                                                                                     // 414
};                                                                                                                    // 415
MessageFormat.locale.sq = function ( n ) {                                                                            // 416
  if ( n === 1 ) {                                                                                                    // 417
    return "one";                                                                                                     // 418
  }                                                                                                                   // 419
  return "other";                                                                                                     // 420
};                                                                                                                    // 421
MessageFormat.locale.sr = function (n) {                                                                              // 422
  if ((n % 10) == 1 && (n % 100) != 11) {                                                                             // 423
    return 'one';                                                                                                     // 424
  }                                                                                                                   // 425
  if ((n % 10) >= 2 && (n % 10) <= 4 &&                                                                               // 426
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {                                                     // 427
    return 'few';                                                                                                     // 428
  }                                                                                                                   // 429
  if ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9) ||                                                           // 430
      ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {                                                   // 431
    return 'many';                                                                                                    // 432
  }                                                                                                                   // 433
  return 'other';                                                                                                     // 434
};                                                                                                                    // 435
MessageFormat.locale.sv = function ( n ) {                                                                            // 436
  if ( n === 1 ) {                                                                                                    // 437
    return "one";                                                                                                     // 438
  }                                                                                                                   // 439
  return "other";                                                                                                     // 440
};                                                                                                                    // 441
MessageFormat.locale.sw = function ( n ) {                                                                            // 442
  if ( n === 1 ) {                                                                                                    // 443
    return "one";                                                                                                     // 444
  }                                                                                                                   // 445
  return "other";                                                                                                     // 446
};                                                                                                                    // 447
MessageFormat.locale.ta = function ( n ) {                                                                            // 448
  if ( n === 1 ) {                                                                                                    // 449
    return "one";                                                                                                     // 450
  }                                                                                                                   // 451
  return "other";                                                                                                     // 452
};                                                                                                                    // 453
MessageFormat.locale.te = function ( n ) {                                                                            // 454
  if ( n === 1 ) {                                                                                                    // 455
    return "one";                                                                                                     // 456
  }                                                                                                                   // 457
  return "other";                                                                                                     // 458
};                                                                                                                    // 459
MessageFormat.locale.th = function ( n ) {                                                                            // 460
  return "other";                                                                                                     // 461
};                                                                                                                    // 462
MessageFormat.locale.tl = function(n) {                                                                               // 463
  if (n === 0 || n == 1) {                                                                                            // 464
    return 'one';                                                                                                     // 465
  }                                                                                                                   // 466
  return 'other';                                                                                                     // 467
};                                                                                                                    // 468
MessageFormat.locale.tr = function(n) {                                                                               // 469
  return 'other';                                                                                                     // 470
};                                                                                                                    // 471
MessageFormat.locale.uk = function (n) {                                                                              // 472
  if ((n % 10) == 1 && (n % 100) != 11) {                                                                             // 473
    return 'one';                                                                                                     // 474
  }                                                                                                                   // 475
  if ((n % 10) >= 2 && (n % 10) <= 4 &&                                                                               // 476
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {                                                     // 477
    return 'few';                                                                                                     // 478
  }                                                                                                                   // 479
  if ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9) ||                                                           // 480
      ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {                                                   // 481
    return 'many';                                                                                                    // 482
  }                                                                                                                   // 483
  return 'other';                                                                                                     // 484
};                                                                                                                    // 485
MessageFormat.locale.ur = function ( n ) {                                                                            // 486
  if ( n === 1 ) {                                                                                                    // 487
    return "one";                                                                                                     // 488
  }                                                                                                                   // 489
  return "other";                                                                                                     // 490
};                                                                                                                    // 491
MessageFormat.locale.vi = function ( n ) {                                                                            // 492
  return "other";                                                                                                     // 493
};                                                                                                                    // 494
MessageFormat.locale.zh = function ( n ) {                                                                            // 495
  return "other";                                                                                                     // 496
};                                                                                                                    // 497
                                                                                                                      // 498
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/template.messageformat.js                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("mf");                                                                                           // 2
Template["mf"] = new Template("Template.mf", (function() {                                                            // 3
  var view = this;                                                                                                    // 4
  return Blaze.View(function() {                                                                                      // 5
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("helper"), view.templateContentBlock));                   // 6
  });                                                                                                                 // 7
}));                                                                                                                  // 8
                                                                                                                      // 9
Template.__checkName("mfTrans");                                                                                      // 10
Template["mfTrans"] = new Template("Template.mfTrans", (function() {                                                  // 11
  var view = this;                                                                                                    // 12
  return HTML.DIV({                                                                                                   // 13
    "class": "container",                                                                                             // 14
    id: "mfTransContainer"                                                                                            // 15
  }, "\n	", HTML.H2(Blaze.View(function() {                                                                           // 16
    return Spacebars.mustache(view.lookup("mf"), "mf_site_translations", "Site Translations");                        // 17
  })), "\n	", HTML.P("Native language: ", HTML.B(Blaze.View(function() {                                              // 18
    return Spacebars.mustache(view.lookup("native"));                                                                 // 19
  })), " (", Blaze.View(function() {                                                                                  // 20
    return Spacebars.mustache(Spacebars.dot(view.lookup("stats"), "total"));                                          // 21
  }), " strings)"), "\n\n	", Blaze.If(function() {                                                                    // 22
    return Spacebars.call(Spacebars.dot(view.lookup("stats"), "total"));                                              // 23
  }, function() {                                                                                                     // 24
    return [ "\n\n		", HTML.TABLE({                                                                                   // 25
      "class": "mfTrans"                                                                                              // 26
    }, "\n			", HTML.TR("\n				", HTML.TH("Language"), "\n				", HTML.TH("trans."), "\n				", HTML.TH("%"), "\n				", HTML.TH("fuzzy"), "\n				", HTML.TH("%"), "\n				", HTML.TH("untrans"), "\n				", HTML.TH("%"), "\n				", HTML.TH("graph"), "\n			"), "\n			", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("stats"), "langs"));                                            // 28
    }, function() {                                                                                                   // 29
      return [ "\n			", HTML.TR("\n				", HTML.TD(HTML.A({                                                            // 30
        href: function() {                                                                                            // 31
          return [ "/translate/", Spacebars.mustache(view.lookup("lang")) ];                                          // 32
        }                                                                                                             // 33
      }, Blaze.View(function() {                                                                                      // 34
        return Spacebars.mustache(view.lookup("lang"));                                                               // 35
      }))), "\n				", HTML.TD(Blaze.View(function() {                                                                 // 36
        return Spacebars.mustache(view.lookup("trans"));                                                              // 37
      })), "\n				", HTML.TD(Blaze.View(function() {                                                                  // 38
        return Spacebars.mustache(view.lookup("transPercent"));                                                       // 39
      })), "\n				", HTML.TD(Blaze.View(function() {                                                                  // 40
        return Spacebars.mustache(view.lookup("fuzzy"));                                                              // 41
      })), "\n				", HTML.TD(Blaze.View(function() {                                                                  // 42
        return Spacebars.mustache(view.lookup("fuzzyPercent"));                                                       // 43
      })), "\n				", HTML.TD(Blaze.View(function() {                                                                  // 44
        return Spacebars.mustache(view.lookup("untrans"));                                                            // 45
      })), "\n				", HTML.TD(Blaze.View(function() {                                                                  // 46
        return Spacebars.mustache(view.lookup("untransPercent"));                                                     // 47
      })), "\n				", HTML.TD("\n					", HTML.DIV({                                                                    // 48
        "class": "mfTransGraph trans",                                                                                // 49
        style: function() {                                                                                           // 50
          return Spacebars.mustache(view.lookup("transWidth"));                                                       // 51
        }                                                                                                             // 52
      }), HTML.DIV({                                                                                                  // 53
        "class": "mfTransGraph fuzzy",                                                                                // 54
        style: function() {                                                                                           // 55
          return Spacebars.mustache(view.lookup("fuzzyWidth"));                                                       // 56
        }                                                                                                             // 57
      }), HTML.DIV({                                                                                                  // 58
        "class": "mfTransGraph untrans",                                                                              // 59
        style: function() {                                                                                           // 60
          return Spacebars.mustache(view.lookup("untransWidth"));                                                     // 61
        }                                                                                                             // 62
      }), "\n				"), "\n			"), "\n			" ];                                                                             // 63
    }), "\n		"), "\n\n		", HTML.BR(), "\n		", HTML.P("\n			New language:\n			", HTML.INPUT({                          // 64
      type: "text",                                                                                                   // 65
      id: "mfTransNewText",                                                                                           // 66
      placeholder: "fr, en_GB, etc"                                                                                   // 67
    }), "\n			", HTML.INPUT({                                                                                         // 68
      type: "submit",                                                                                                 // 69
      id: "mfTransNewSubmit",                                                                                         // 70
      value: "Go"                                                                                                     // 71
    }), "\n		"), "\n\n		", HTML.P("\n			Download ", HTML.A({                                                          // 72
      id: "mfAllJs",                                                                                                  // 73
      href: "/translate/mfAll.js"                                                                                     // 74
    }, "server/mfAll.js"), "\n			(latest strings from all langs; save before redeploying/releasing an app)\n		"), "\n    ", HTML.Comment('\n		<p>\n			Download <a href="/translate/mfSmart.js">server/mfSmart.js</a>\n			(all strings, untranslateable; save before releasing a smart package)\n		</p>\n    '), "\n\n	" ];
  }, function() {                                                                                                     // 76
    return [ "\n\n		", HTML.P("Run ", HTML.B("mf_extract"), " in the root directory of your project to extract\n		all the translateable strings."), "\n\n		", HTML.P("For more details see:\n		", HTML.A({
      href: "http://messageformat.meteor.com/"                                                                        // 78
    }, "messageformat.meteor.com"), ".\n		"), "\n\n	" ];                                                              // 79
  }), "\n	");                                                                                                         // 80
}));                                                                                                                  // 81
                                                                                                                      // 82
Template.__checkName("mfTransLang");                                                                                  // 83
Template["mfTransLang"] = new Template("Template.mfTransLang", (function() {                                          // 84
  var view = this;                                                                                                    // 85
  return HTML.DIV({                                                                                                   // 86
    "class": "container",                                                                                             // 87
    id: "mfTransLang"                                                                                                 // 88
  }, "\n\n		", HTML.DIV({                                                                                             // 89
    id: "mfTransPreview"                                                                                              // 90
  }, "\n			", HTML.TABLE("\n				", HTML.THEAD("\n					", HTML.TR("\n						", HTML.TH("Original String (", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("orig"));                                                                   // 92
  }), ")"), "\n						", HTML.TH("Translation (", Blaze.View(function() {                                              // 93
    return Spacebars.mustache(view.lookup("trans"));                                                                  // 94
  }), ")"), "\n					"), "\n				"), "\n			"), "\n			", HTML.DIV({                                                      // 95
    "class": "tbodyScroll"                                                                                            // 96
  }, "\n				", HTML.TABLE("\n					", HTML.TBODY("\n					", Blaze.Each(function() {                                    // 97
    return Spacebars.call(view.lookup("strings"));                                                                    // 98
  }, function() {                                                                                                     // 99
    return [ "\n						", HTML.TR({                                                                                    // 100
      "data-key": function() {                                                                                        // 101
        return Spacebars.mustache(view.lookup("key"));                                                                // 102
      },                                                                                                              // 103
      "class": function() {                                                                                           // 104
        return [ Spacebars.mustache(view.lookup("stateClass")), " ", Spacebars.mustache(view.lookup("isCurrent")) ];  // 105
      }                                                                                                               // 106
    }, "\n							", HTML.TD(Blaze.View(function() {                                                                   // 107
      return Spacebars.mustache(view.lookup("orig"));                                                                 // 108
    })), "\n							", HTML.TD(Blaze.View(function() {                                                                 // 109
      return Spacebars.mustache(view.lookup("trans"));                                                                // 110
    })), "\n						"), "\n					" ];                                                                                    // 111
  }), "\n					"), "\n				"), "\n			"), "\n		"), HTML.Raw("\n		<p>Use ctrl-up and ctrl-down to quickly change keys</p>\n		"), HTML.SPAN(HTML.B(Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "key"));                                          // 113
  })), " in ", Blaze.View(function() {                                                                                // 114
    return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "file"));                                         // 115
  }), ":", Blaze.View(function() {                                                                                    // 116
    return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "line"));                                         // 117
  }), Blaze.If(function() {                                                                                           // 118
    return Spacebars.call(Spacebars.dot(view.lookup("keyInfo"), "template"));                                         // 119
  }, function() {                                                                                                     // 120
    return [ " (template\n				", Blaze.If(function() {                                                                // 121
      return Spacebars.call(Spacebars.dot(view.lookup("keyInfo"), "routeUrl"));                                       // 122
    }, function() {                                                                                                   // 123
      return [ "\n					", HTML.A({                                                                                    // 124
        href: function() {                                                                                            // 125
          return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "routeUrl"));                               // 126
        }                                                                                                             // 127
      }, Blaze.View(function() {                                                                                      // 128
        return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "template"));                                 // 129
      })) ];                                                                                                          // 130
    }, function() {                                                                                                   // 131
      return [ '"', Blaze.View(function() {                                                                           // 132
        return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "template"));                                 // 133
      }), '"' ];                                                                                                      // 134
    }), ")" ];                                                                                                        // 135
  }), Blaze.If(function() {                                                                                           // 136
    return Spacebars.call(Spacebars.dot(view.lookup("keyInfo"), "func"));                                             // 137
  }, function() {                                                                                                     // 138
    return [ "; ", Blaze.View(function() {                                                                            // 139
      return Spacebars.mustache(Spacebars.dot(view.lookup("keyInfo"), "func"));                                       // 140
    }) ];                                                                                                             // 141
  }), "\n		"), HTML.Raw("<br>\n		"), HTML.TEXTAREA({                                                                  // 142
    id: "mfTransOrig",                                                                                                // 143
    readonly: "",                                                                                                     // 144
    value: function() {                                                                                               // 145
      return Spacebars.mustache(view.lookup("mfTransOrig"));                                                          // 146
    }                                                                                                                 // 147
  }), "\n		", HTML.TEXTAREA({                                                                                         // 148
    id: "mfTransDest",                                                                                                // 149
    value: function() {                                                                                               // 150
      return Spacebars.mustache(view.lookup("mfTransTrans"));                                                         // 151
    }                                                                                                                 // 152
  }), HTML.Raw('\n\n	<br><br>\n	<p>\n		<a href="/translate">Back to Translation Summary</a>\n	</p>\n\n	'));           // 153
}));                                                                                                                  // 154
                                                                                                                      // 155
Template.__checkName("mfTransLangDenied");                                                                            // 156
Template["mfTransLangDenied"] = new Template("Template.mfTransLangDenied", (function() {                              // 157
  var view = this;                                                                                                    // 158
  return HTML.DIV({                                                                                                   // 159
    "class": "container",                                                                                             // 160
    id: "mfTransLang"                                                                                                 // 161
  }, "\n		", HTML.H1(Blaze.View(function() {                                                                          // 162
    return Spacebars.mustache(view.lookup("mf"), "access_denied", "Access Denied");                                   // 163
  })), "\n		", HTML.P(Blaze.View(function() {                                                                         // 164
    return Spacebars.mustache(view.lookup("mf"), "login_and_access", "Please ensure you are logged in and have the relevant access to add/edit translations.");
  })), "\n	");                                                                                                        // 166
}));                                                                                                                  // 167
                                                                                                                      // 168
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/messageformat-client.js                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
 * Main Handlebars regular helper / block helper, calls mf() with correct                                             // 2
 * parameters.  On the client, mf() honors the Session locale if none is                                              // 3
 * manually specified here (see messageformat.js), making this a reactive                                             // 4
 * data source.                                                                                                       // 5
 */                                                                                                                   // 6
mfPkg.mfHelper = function(key, message, params) {                                                                     // 7
	// For best performance, waiton mfPkg.ready() before drawing template                                                // 8
	var dep = mfPkg.updated();                                                                                           // 9
	if (typeof key == "undefined") {                                                                                     // 10
		key = this.KEY;                                                                                                     // 11
	} else {                                                                                                             // 12
		message = params ? message : null;                                                                                  // 13
		params = params ? params.hash : {};                                                                                 // 14
	}                                                                                                                    // 15
                                                                                                                      // 16
	return mf(key, params, message, params ? params.LOCALE : null)                                                       // 17
};                                                                                                                    // 18
UI.registerHelper('mf', mfPkg.mfHelper);                                                                              // 19
                                                                                                                      // 20
Template.mf.helpers({                                                                                                 // 21
	helper: function(component, options) {                                                                               // 22
		var dep = mfPkg.updated();                                                                                          // 23
		var key = this.KEY;                                                                                                 // 24
		if(typeof(UI.toRawText) == "function") //0.8.2 compat                                                               // 25
			var message = UI.toRawText(component);                                                                             // 26
		else{                                                                                                               // 27
			var message = Blaze._toText ? Blaze._toText(component, HTML.TEXTMODE.STRING) : Blaze.toText(component, HTML.TEXTMODE.STRING);
		}                                                                                                                   // 29
		return mf(key, this, message, this.LOCALE);                                                                         // 30
	}                                                                                                                    // 31
});                                                                                                                   // 32
                                                                                                                      // 33
mfPkg.sendPolicy = 'current';                                                                                         // 34
mfPkg.mfStringsSub = Meteor.subscribe('mfStrings', 'notReady');                                                       // 35
mfPkg.clientInit = function(native, options) {                                                                        // 36
	if (!options)                                                                                                        // 37
		options = {};                                                                                                       // 38
                                                                                                                      // 39
	if (options.sendPolicy)                                                                                              // 40
		this.sendPolicy = options.sendPolicy;                                                                               // 41
                                                                                                                      // 42
	mfPkg.strings[native] = {};                                                                                          // 43
                                                                                                                      // 44
	Deps.autorun(function() {                                                                                            // 45
		var locale =                                                                                                        // 46
			mfPkg.sendPolicy == 'all' ? 'all'                                                                                  // 47
			: Session.get('locale') || mfPkg.native;                                                                           // 48
			// console.log(locale);                                                                                            // 49
                                                                                                                      // 50
		// If we requested the lang previously, or requesting native lang,                                                  // 51
		// don't retrieve the strings [again], just update the subscription                                                 // 52
		if (mfPkg.strings[locale] || (!mfPkg.sendNative && locale == mfPkg.native))                                         // 53
			updateSubs();                                                                                                      // 54
		else                                                                                                                // 55
			mfPkg.loadLangs(locale, updateSubs);                                                                               // 56
	});                                                                                                                  // 57
                                                                                                                      // 58
	// if momentjs is used on the client, we reactively change the locale on moment globally                             // 59
	if(typeof moment == 'function')                                                                                      // 60
		Deps.autorun(function() {                                                                                           // 61
			moment.locale(Session.get('locale') || mfPkg.native);                                                              // 62
		});                                                                                                                 // 63
}                                                                                                                     // 64
                                                                                                                      // 65
/*                                                                                                                    // 66
 * Fetch lang data from server, more efficiently than through a                                                       // 67
 * collection publish (which we only use when editing translations)                                                   // 68
 */                                                                                                                   // 69
mfPkg.lastSync = {};                                                                                                  // 70
mfPkg.langsLoading = false;                                                                                           // 71
mfPkg.loadLangs = function(reqLang, callback) {                                                                       // 72
	mfPkg.langsLoading = true;                                                                                           // 73
	mfPkg.readyDep.changed();                                                                                            // 74
	Meteor.call('mfLoadLangs', reqLang, function(error, data) {                                                          // 75
		if (error)                                                                                                          // 76
			throw new Error(error);                                                                                            // 77
                                                                                                                      // 78
		for (lang in data.strings) {                                                                                        // 79
			mfPkg.strings[lang] = data.strings[lang];                                                                          // 80
			mfPkg.compiled[lang] = {};  // reset if exists                                                                     // 81
		}                                                                                                                   // 82
                                                                                                                      // 83
		mfPkg.lastSync[reqLang || 'all'] = data.lastSync;                                                                   // 84
		if (callback)                                                                                                       // 85
			callback();                                                                                                        // 86
                                                                                                                      // 87
		mfPkg.langsLoading = false;                                                                                         // 88
		mfPkg.readyDep.changed();                                                                                           // 89
	});                                                                                                                  // 90
};                                                                                                                    // 91
                                                                                                                      // 92
/*                                                                                                                    // 93
 * Reactive ready function.  All our subscriptions are dependencies.                                                  // 94
 * Additionally, this is set to false when loadLang is called, and                                                    // 95
 * true when it returns.                                                                                              // 96
 */                                                                                                                   // 97
mfPkg.readyDep = new Deps.Dependency;                                                                                 // 98
mfPkg.ready = function() {                                                                                            // 99
	var ready = !mfPkg.langsLoading && mfPkg.mfStringsSub.ready();                                                       // 100
	//console.log('changed to: ' + ready);                                                                               // 101
	this.readyDep.depend();                                                                                              // 102
	return ready;                                                                                                        // 103
}                                                                                                                     // 104
                                                                                                                      // 105
/*                                                                                                                    // 106
 * Similar to the above, but only gets invalidated each time ready() set to true                                      // 107
 */                                                                                                                   // 108
mfPkg.updatedDep = new Deps.Dependency;                                                                               // 109
mfPkg.updatedCurrent = false;                                                                                         // 110
mfPkg.updated = function() {                                                                                          // 111
	this.updatedDep.depend();                                                                                            // 112
	return null;                                                                                                         // 113
}                                                                                                                     // 114
                                                                                                                      // 115
/*                                                                                                                    // 116
 * Simple placeholder for now.  Future improvements detailed in                                                       // 117
 * https://github.com/gadicc/meteor-messageformat/issues/38                                                           // 118
 */                                                                                                                   // 119
mfPkg.setLocale = function(locale) {                                                                                  // 120
	Session.set('locale', locale);                                                                                       // 121
}                                                                                                                     // 122
                                                                                                                      // 123
/*                                                                                                                    // 124
 * On user connect, honor their language preferences if no Session var                                                // 125
 * already set.  headers.ready() is run immediately unless appcache is                                                // 126
 * being used.  langList is available instantly unless appcache is                                                    // 127
 * being used, and then we have to fetch it ourselves                                                                 // 128
 */                                                                                                                   // 129
var setLocaleFromHeader = function(langList) {                                                                        // 130
    var lang;                                                                                                         // 131
    var acceptLangs = headers.get('accept-language').split(',');                                                      // 132
    for (var i=0; i < acceptLangs.length; i++) {                                                                      // 133
        lang = acceptLangs[i].split(';')[0].trim();                                                                   // 134
        if (_.contains(langList, lang)) {                                                                             // 135
            Session.set('locale', lang);                                                                              // 136
            return;                                                                                                   // 137
        }                                                                                                             // 138
    }	                                                                                                                // 139
}                                                                                                                     // 140
headers.ready(function() {                                                                                            // 141
	if (!Session.get('locale') && headers.get('accept-language')) {                                                      // 142
                                                                                                                      // 143
		var langList = Inject.getObj('meteor-langList');                                                                    // 144
		if (langList)                                                                                                       // 145
			setLocaleFromHeader(langList);                                                                                     // 146
		else                                                                                                                // 147
			Meteor.call('mfPkg.langList', function(error, langList) {                                                          // 148
				if (error)                                                                                                        // 149
					console.log('messageformat: error retrieving language list',                                                     // 150
						error);                                                                                                         // 151
                                                                                                                      // 152
				setLocaleFromHeader(langList);                                                                                    // 153
			});                                                                                                                // 154
	}                                                                                                                    // 155
});                                                                                                                   // 156
                                                                                                                      // 157
Deps.autorun(function() {                                                                                             // 158
	if (mfPkg.ready() && !mfPkg.updatedCurrent) {                                                                        // 159
		mfPkg.updatedCurrent = true;                                                                                        // 160
		mfPkg.updatedDep.changed();                                                                                         // 161
	} else if (mfPkg.updatedCurrent) {                                                                                   // 162
		mfPkg.updatedCurrent = false;                                                                                       // 163
	}                                                                                                                    // 164
});                                                                                                                   // 165
                                                                                                                      // 166
/*                                                                                                                    // 167
 * Update our subscription for language updates.  If we change languages, we'll                                       // 168
 * we'll still have all the lang data in mfPkg, we just stop getting updates for                                      // 169
 * that language.  If we change back, we'll get all the updates since our last                                        // 170
 * sync for that lang.                                                                                                // 171
 */                                                                                                                   // 172
function updateSubs() {                                                                                               // 173
	var locale = Session.get('locale') || mfPkg.native;                                                                  // 174
	mfPkg.observeFrom(mfPkg.lastSync[locale]);                                                                           // 175
	if (mfPkg.mfStringsSub)                                                                                              // 176
		mfPkg.mfStringsSub.stop();                                                                                          // 177
	mfPkg.mfStringsSub                                                                                                   // 178
		= Meteor.subscribe('mfStrings', locale,                                                                             // 179
			mfPkg.lastSync[locale], false);                                                                                    // 180
}                                                                                                                     // 181
                                                                                                                      // 182
/*                                                                                                                    // 183
 * Finds the name of the first route using the given template                                                         // 184
 */                                                                                                                   // 185
function routeNameFromTemplate(name) {                                                                                // 186
	var route = _.find(Router.routes, function(route) {                                                                  // 187
		if (route.options.template)                                                                                         // 188
			return route.options.template == name;                                                                             // 189
		else                                                                                                                // 190
			return route.name == name;                                                                                         // 191
	});                                                                                                                  // 192
	return route && route.name;                                                                                          // 193
}                                                                                                                     // 194
                                                                                                                      // 195
/*                                                                                                                    // 196
 * After user presses ctrl up-down, if the newly highlighted row                                                      // 197
 * is not above or below the viewable area, scroll appropriately                                                      // 198
 */                                                                                                                   // 199
function mfCheckScroll(tr) {                                                                                          // 200
	var box = $('#mfTransPreview .tbodyScroll');                                                                         // 201
	if (tr.position().top + tr.outerHeight() > box.outerHeight()) {                                                      // 202
		box.scrollTop(box.scrollTop()+tr.outerHeight());                                                                    // 203
	} else if (tr.position().top < 0) {                                                                                  // 204
		box.scrollTop(box.scrollTop()-tr.outerHeight())                                                                     // 205
	}                                                                                                                    // 206
}                                                                                                                     // 207
                                                                                                                      // 208
/*                                                                                                                    // 209
 * Called whenever the user changes rows.  Checks if the text string is                                               // 210
 * non-empty and changed, and does the relevant database mods.  TODO,                                                 // 211
 * consider refactoring as a Method                                                                                   // 212
 */                                                                                                                   // 213
function saveChange(lang, key, text) {                                                                                // 214
	var existing = mfPkg.mfStrings.findOne({                                                                             // 215
		lang: lang, key: key                                                                                                // 216
	});                                                                                                                  // 217
	var source = mfPkg.mfStrings.findOne({                                                                               // 218
		lang: mfPkg.native, key: key                                                                                        // 219
	});                                                                                                                  // 220
                                                                                                                      // 221
	if (!text || (existing && text == existing.text))                                                                    // 222
		return;                                                                                                             // 223
                                                                                                                      // 224
	var revisionId = mfPkg.mfRevisions.insert({                                                                          // 225
		lang: lang,                                                                                                         // 226
		key: key,                                                                                                           // 227
		text: text,                                                                                                         // 228
		ctime: new Date().getTime(),                                                                                        // 229
		userId: Meteor.userId(),                                                                                            // 230
		sourceId: source.revisionId                                                                                         // 231
	});                                                                                                                  // 232
                                                                                                                      // 233
	if (existing)                                                                                                        // 234
		mfPkg.mfStrings.update(existing._id, { $set: {                                                                      // 235
			lang: lang,                                                                                                        // 236
			text: text,                                                                                                        // 237
			mtime: new Date().getTime(),                                                                                       // 238
			revisionId: revisionId                                                                                             // 239
		}, $unset: { fuzzy: "" }});                                                                                         // 240
	else                                                                                                                 // 241
		mfPkg.mfStrings.insert({                                                                                            // 242
			key: key,                                                                                                          // 243
			lang: lang,                                                                                                        // 244
			text: text,                                                                                                        // 245
			ctime: new Date().getTime(),                                                                                       // 246
			mtime: new Date().getTime(),                                                                                       // 247
			revisionId: revisionId                                                                                             // 248
		});                                                                                                                 // 249
}                                                                                                                     // 250
                                                                                                                      // 251
/*                                                                                                                    // 252
 * Called everytime the current key is changed (ctrl up/down or click)                                                // 253
 */                                                                                                                   // 254
function changeKey(newKey) {                                                                                          // 255
	var destLang = Session.get('mfTransTrans');                                                                          // 256
	var oldKey = Session.get('mfTransKey');                                                                              // 257
	if (oldKey == newKey) return;                                                                                        // 258
                                                                                                                      // 259
	saveChange(destLang, oldKey, $('#mfTransDest').val());                                                               // 260
                                                                                                                      // 261
	// Temporary, need to turn off preserve                                                                              // 262
	var str = mfPkg.mfStrings.findOne({                                                                                  // 263
		key: newKey, lang: destLang                                                                                         // 264
	});                                                                                                                  // 265
	$('#mfTransDest').val(str ? str.text : '');                                                                          // 266
                                                                                                                      // 267
	Session.set('mfTransKey', newKey);                                                                                   // 268
	$('#mfTransDest').focus();                                                                                           // 269
}                                                                                                                     // 270
                                                                                                                      // 271
if (Package['iron:router'])                                                                                           // 272
Package['iron:router'].Router.map(function() {                                                                        // 273
	// Main translation page, summary of all language data                                                               // 274
	this.route('mfTrans', {                                                                                              // 275
		path: '/translate',                                                                                                 // 276
		waitOn: function() {                                                                                                // 277
			return Meteor.subscribe('mfStats');                                                                                // 278
		},                                                                                                                  // 279
		data: function() {                                                                                                  // 280
			var data = {};                                                                                                     // 281
			data.strings = mfPkg.mfStrings.find();                                                                             // 282
			data.stats = mfPkg.mfMeta.findOne({_id: '__stats'});                                                               // 283
			data.native = mfPkg.native;                                                                                        // 284
			return data;                                                                                                       // 285
		}                                                                                                                   // 286
	});                                                                                                                  // 287
                                                                                                                      // 288
	// Modify translations for a particular language                                                                     // 289
	this.route('mfTransLang', {                                                                                          // 290
		path: '/translate/:lang',                                                                                           // 291
		waitOn: function() {                                                                                                // 292
			// Note, this is in ADDITION to the regular mfStrings sub                                                          // 293
			return Meteor.subscribe('mfStrings',                                                                               // 294
				[mfPkg.native, this.params.lang], 0, true);                                                                       // 295
		},                                                                                                                  // 296
		onBeforeAction: function() {                                                                                        // 297
			if (!mfPkg.webUI.allowed.call(this) || mfPkg.webUI.denied.call(this)) {                                            // 298
				this.render('mfTransLangDenied');                                                                                 // 299
			} else {                                                                                                           // 300
				// Temporary, only used to override preserve on dest                                                              // 301
				Session.set('mfTransTrans', this.params.lang);                                                                    // 302
                                                                                                                      // 303
				// Handle ctrl-up/ctrl-down, respectively                                                                         // 304
				$(window).on('keydown.mfTrans', function(event) {                                                                 // 305
					if (event.ctrlKey && (event.which == 38 || event.which == 40)) {                                                 // 306
						event.preventDefault(); event.stopPropagation();                                                                // 307
						var tr = event.which == 38                                                                                      // 308
							? $('#mfTransLang tr.current').prev()                                                                          // 309
							: $('#mfTransLang tr.current').next();                                                                         // 310
						if (tr.length) {                                                                                                // 311
							changeKey(tr.data('key'));                                                                                     // 312
							mfCheckScroll(tr);                                                                                             // 313
						}                                                                                                               // 314
					}                                                                                                                // 315
				});                                                                                                               // 316
                                                                                                                      // 317
				this.subscribe('mfRevisions', this.params.lang, 10);                                                              // 318
				this.next();                                                                                                      // 319
			}                                                                                                                  // 320
		},                                                                                                                  // 321
		onStop: function() {                                                                                                // 322
			$(window).off('keydown.mfTrans');                                                                                  // 323
		},                                                                                                                  // 324
		data: function() {                                                                                                  // 325
			var data = { strings: {} };                                                                                        // 326
			var strings, out = {};                                                                                             // 327
			data.orig = mfPkg.native;                                                                                          // 328
			data.trans = this.params.lang;                                                                                     // 329
                                                                                                                      // 330
			// summarise matching keys (orig + trans) to a single record                                                       // 331
			strings = mfPkg.mfStrings.find({                                                                                   // 332
				$and: [{$or: [{lang: data.orig}, {lang: this.params.lang}]},                                                      // 333
					{removed: undefined}]                                                                                            // 334
			}).fetch();                                                                                                        // 335
			_.each(strings, function(str) {                                                                                    // 336
				if (!out[str.key])                                                                                                // 337
					out[str.key] = { key: str.key };                                                                                 // 338
				if (str.lang == data.orig)                                                                                        // 339
					out[str.key].orig = str.text;                                                                                    // 340
				else                                                                                                              // 341
					out[str.key].trans = str.text;                                                                                   // 342
				if (str.fuzzy)                                                                                                    // 343
					out[str.key].fuzzy = true;                                                                                       // 344
			});                                                                                                                // 345
			data.strings = _.values(out);                                                                                      // 346
                                                                                                                      // 347
			return data;                                                                                                       // 348
		}                                                                                                                   // 349
	});                                                                                                                  // 350
});                                                                                                                   // 351
                                                                                                                      // 352
Template.mfTrans.events({                                                                                             // 353
	'click #mfTransNewSubmit': function() {                                                                              // 354
		Router.go('/translate/' + $('#mfTransNewText').val());                                                              // 355
	},                                                                                                                   // 356
	'click #mfAllJs': function(event, tpl) {                                                                             // 357
		// Make sure we have no conflicts with iron-router                                                                  // 358
		// Not really sure why this is necessary; TODO, investigate                                                         // 359
		event.preventDefault();                                                                                             // 360
		event.stopPropagation();                                                                                            // 361
		window.location = '/translate/mfAll.js';                                                                            // 362
	}                                                                                                                    // 363
});                                                                                                                   // 364
                                                                                                                      // 365
Template.mfTransLang.events({                                                                                         // 366
	'click #mfTransLang tr': function(event) {                                                                           // 367
		var tr = $(event.target).parents('tr');                                                                             // 368
		var key = tr.data('key');                                                                                           // 369
		if (key) changeKey(key);                                                                                            // 370
	}                                                                                                                    // 371
});                                                                                                                   // 372
                                                                                                                      // 373
Template.mfTransLang.helpers({                                                                                        // 374
	stateClass: function() {                                                                                             // 375
		if (this.fuzzy)                                                                                                     // 376
			return 'fuzzy';                                                                                                    // 377
		if (this.trans)                                                                                                     // 378
			return 'trans';                                                                                                    // 379
		else                                                                                                                // 380
			return 'untrans';                                                                                                  // 381
	},                                                                                                                   // 382
	isCurrent: function() {                                                                                              // 383
		if (this.key == Session.get('mfTransKey'))                                                                          // 384
			return 'current';                                                                                                  // 385
	},                                                                                                                   // 386
	mfTransOrig: function() {                                                                                            // 387
		var str = mfPkg.mfStrings.findOne({                                                                                 // 388
			key: Session.get('mfTransKey'),                                                                                    // 389
			lang: this.orig                                                                                                    // 390
		});                                                                                                                 // 391
		return str ? str.text : '';                                                                                         // 392
	},                                                                                                                   // 393
	mfTransTrans: function() {                                                                                           // 394
		var str = mfPkg.mfStrings.findOne({                                                                                 // 395
			key: Session.get('mfTransKey'),                                                                                    // 396
			lang: this.trans                                                                                                   // 397
		});                                                                                                                 // 398
		return str ? str.text : '';                                                                                         // 399
	},                                                                                                                   // 400
	keyInfo: function() {                                                                                                // 401
		var str = mfPkg.mfStrings.findOne({                                                                                 // 402
			key: Session.get('mfTransKey'),                                                                                    // 403
			lang: this.orig                                                                                                    // 404
		});                                                                                                                 // 405
		if (str && str.template) {                                                                                          // 406
			var routeName = routeNameFromTemplate(str.template);                                                               // 407
			if (routeName)                                                                                                     // 408
				str.routeUrl = Router.path(routeName);                                                                            // 409
		}                                                                                                                   // 410
		return str || {};                                                                                                   // 411
	}                                                                                                                    // 412
});                                                                                                                   // 413
                                                                                                                      // 414
var initialRender = _.once(function() {                                                                               // 415
	var key = Session.get('mfTransKey'),                                                                                 // 416
		tr = $('#mfTransLang tr[data-key="'+key+'"]');                                                                      // 417
	if (tr.length)                                                                                                       // 418
		$('#mfTransPreview .tbodyScroll').scrollTop(tr.position().top);                                                     // 419
                                                                                                                      // 420
	$('#mfTransDest').focus();                                                                                           // 421
});                                                                                                                   // 422
                                                                                                                      // 423
Template.mfTransLang.rendered = function() {                                                                          // 424
	var tr, key = Session.get('mfTransKey');                                                                             // 425
                                                                                                                      // 426
	// For unset or nonexistent key, set to first row                                                                    // 427
	if (!key || !$('tr[data-key="' + key + '"]').length) {                                                               // 428
		key = $('#mfTransLang tr[data-key]:first-child').data('key');                                                       // 429
		Session.set('mfTransKey', key);                                                                                     // 430
	}                                                                                                                    // 431
                                                                                                                      // 432
	var transDest = $('#mfTransDest');                                                                                   // 433
	if (typeof transDest.tabOverride === 'function') transDest.tabOverride();                                            // 434
	initialRender();                                                                                                     // 435
};                                                                                                                    // 436
                                                                                                                      // 437
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/3rdparty/taboverride.js                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*! taboverride v4.0.0 | https://github.com/wjbryant/taboverride                                                      // 1
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */                                                // 2
                                                                                                                      // 3
/**                                                                                                                   // 4
 * @fileOverview taboverride                                                                                          // 5
 * @author       Bill Bryant                                                                                          // 6
 * @version      4.0.0                                                                                                // 7
 */                                                                                                                   // 8
                                                                                                                      // 9
/*jslint browser: true */                                                                                             // 10
/*global exports, define */                                                                                           // 11
                                                                                                                      // 12
// use CommonJS or AMD if available                                                                                   // 13
(function (factory) {                                                                                                 // 14
    'use strict';                                                                                                     // 15
                                                                                                                      // 16
    var mod;                                                                                                          // 17
                                                                                                                      // 18
    if (typeof exports === 'object') {                                                                                // 19
        // Node.js/CommonJS                                                                                           // 20
        factory(exports);                                                                                             // 21
    } else if (typeof define === 'function' && define.amd) {                                                          // 22
        // AMD - register as an anonymous module                                                                      // 23
        // files must be concatenated using an AMD-aware tool such as r.js                                            // 24
        define(['exports'], factory);                                                                                 // 25
    } else {                                                                                                          // 26
        // no module format - create global variable                                                                  // 27
        mod = window.tabOverride = {};                                                                                // 28
        factory(mod);                                                                                                 // 29
    }                                                                                                                 // 30
}(function (tabOverride) {                                                                                            // 31
    'use strict';                                                                                                     // 32
                                                                                                                      // 33
    /**                                                                                                               // 34
     * The tabOverride namespace object                                                                               // 35
     *                                                                                                                // 36
     * @namespace tabOverride                                                                                         // 37
     */                                                                                                               // 38
                                                                                                                      // 39
    var document = window.document,                                                                                   // 40
        listeners,                                                                                                    // 41
        aTab = '\t', // the string representing a tab                                                                 // 42
        tabKey = 9,                                                                                                   // 43
        untabKey = 9,                                                                                                 // 44
        tabModifierKeys = [],                                                                                         // 45
        untabModifierKeys = ['shiftKey'],                                                                             // 46
        autoIndent = true, // whether each line should be automatically indented                                      // 47
        inWhitespace = false, // whether the start of the selection is in the leading whitespace on enter             // 48
        textareaElem = document.createElement('textarea'), // temp textarea element to get newline character(s)       // 49
        newline, // the newline character sequence (\n or \r\n)                                                       // 50
        newlineLen, // the number of characters used for a newline (1 or 2)                                           // 51
        hooks = {};                                                                                                   // 52
                                                                                                                      // 53
    /**                                                                                                               // 54
     * Determines whether the specified modifier keys match the modifier keys                                         // 55
     * that were pressed.                                                                                             // 56
     *                                                                                                                // 57
     * @param  {string[]} modifierKeys  the modifier keys to check - ex: ['shiftKey']                                 // 58
     * @param  {Event}    e             the event object for the keydown event                                        // 59
     * @return {boolean}                whether modifierKeys are valid for the event                                  // 60
     *                                                                                                                // 61
     * @method tabOverride.utils.isValidModifierKeyCombo                                                              // 62
     */                                                                                                               // 63
    function isValidModifierKeyCombo(modifierKeys, e) {                                                               // 64
        var modifierKeyNames = ['alt', 'ctrl', 'meta', 'shift'],                                                      // 65
            numModKeys = modifierKeys.length,                                                                         // 66
            i,                                                                                                        // 67
            j,                                                                                                        // 68
            currModifierKey,                                                                                          // 69
            isValid = true;                                                                                           // 70
                                                                                                                      // 71
        // check that all required modifier keys were pressed                                                         // 72
        for (i = 0; i < numModKeys; i += 1) {                                                                         // 73
            if (!e[modifierKeys[i]]) {                                                                                // 74
                isValid = false;                                                                                      // 75
                break;                                                                                                // 76
            }                                                                                                         // 77
        }                                                                                                             // 78
                                                                                                                      // 79
        // if the requirements were met, check for additional modifier keys                                           // 80
        if (isValid) {                                                                                                // 81
            for (i = 0; i < modifierKeyNames.length; i += 1) {                                                        // 82
                currModifierKey = modifierKeyNames[i] + 'Key';                                                        // 83
                                                                                                                      // 84
                // if this key was pressed                                                                            // 85
                if (e[currModifierKey]) {                                                                             // 86
                    // if there are required keys, check whether the current key                                      // 87
                    // is required                                                                                    // 88
                    if (numModKeys) {                                                                                 // 89
                        isValid = false;                                                                              // 90
                                                                                                                      // 91
                        // if this is a required key, continue                                                        // 92
                        for (j = 0; j < numModKeys; j += 1) {                                                         // 93
                            if (currModifierKey === modifierKeys[j]) {                                                // 94
                                isValid = true;                                                                       // 95
                                break;                                                                                // 96
                            }                                                                                         // 97
                        }                                                                                             // 98
                    } else {                                                                                          // 99
                        // no required keys, but one was pressed                                                      // 100
                        isValid = false;                                                                              // 101
                    }                                                                                                 // 102
                }                                                                                                     // 103
                                                                                                                      // 104
                // an extra key was pressed, don't check anymore                                                      // 105
                if (!isValid) {                                                                                       // 106
                    break;                                                                                            // 107
                }                                                                                                     // 108
            }                                                                                                         // 109
        }                                                                                                             // 110
                                                                                                                      // 111
        return isValid;                                                                                               // 112
    }                                                                                                                 // 113
                                                                                                                      // 114
    /**                                                                                                               // 115
     * Determines whether the tab key combination was pressed.                                                        // 116
     *                                                                                                                // 117
     * @param  {number}  keyCode  the key code of the key that was pressed                                            // 118
     * @param  {Event}   e        the event object for the key event                                                  // 119
     * @return {boolean}          whether the tab key combo was pressed                                               // 120
     *                                                                                                                // 121
     * @private                                                                                                       // 122
     */                                                                                                               // 123
    function tabKeyComboPressed(keyCode, e) {                                                                         // 124
        return keyCode === tabKey && isValidModifierKeyCombo(tabModifierKeys, e);                                     // 125
    }                                                                                                                 // 126
                                                                                                                      // 127
    /**                                                                                                               // 128
     * Determines whether the untab key combination was pressed.                                                      // 129
     *                                                                                                                // 130
     * @param  {number}  keyCode  the key code of the key that was pressed                                            // 131
     * @param  {Event}   e        the event object for the key event                                                  // 132
     * @return {boolean}          whether the untab key combo was pressed                                             // 133
     *                                                                                                                // 134
     * @private                                                                                                       // 135
     */                                                                                                               // 136
    function untabKeyComboPressed(keyCode, e) {                                                                       // 137
        return keyCode === untabKey && isValidModifierKeyCombo(untabModifierKeys, e);                                 // 138
    }                                                                                                                 // 139
                                                                                                                      // 140
    /**                                                                                                               // 141
     * Creates a function to get and set the specified key combination.                                               // 142
     *                                                                                                                // 143
     * @param  {Function} keyFunc       getter/setter function for the key                                            // 144
     * @param  {string[]} modifierKeys  the array of modifier keys to manipulate                                      // 145
     * @return {Function}               a getter/setter function for the specified                                    // 146
     *                                  key combination                                                               // 147
     *                                                                                                                // 148
     * @private                                                                                                       // 149
     */                                                                                                               // 150
    function createKeyComboFunction(keyFunc, modifierKeys) {                                                          // 151
        return function (keyCode, modifierKeyNames) {                                                                 // 152
            var i,                                                                                                    // 153
                keyCombo = '';                                                                                        // 154
                                                                                                                      // 155
            if (arguments.length) {                                                                                   // 156
                if (typeof keyCode === 'number') {                                                                    // 157
                    keyFunc(keyCode);                                                                                 // 158
                                                                                                                      // 159
                    modifierKeys.length = 0; // clear the array                                                       // 160
                                                                                                                      // 161
                    if (modifierKeyNames && modifierKeyNames.length) {                                                // 162
                        for (i = 0; i < modifierKeyNames.length; i += 1) {                                            // 163
                            modifierKeys.push(modifierKeyNames[i] + 'Key');                                           // 164
                        }                                                                                             // 165
                    }                                                                                                 // 166
                }                                                                                                     // 167
                                                                                                                      // 168
                return this;                                                                                          // 169
            }                                                                                                         // 170
                                                                                                                      // 171
            for (i = 0; i < modifierKeys.length; i += 1) {                                                            // 172
                keyCombo += modifierKeys[i].slice(0, -3) + '+';                                                       // 173
            }                                                                                                         // 174
                                                                                                                      // 175
            return keyCombo + keyFunc();                                                                              // 176
        };                                                                                                            // 177
    }                                                                                                                 // 178
                                                                                                                      // 179
    /**                                                                                                               // 180
     * Event handler to insert or remove tabs and newlines on the keydown event                                       // 181
     * for the tab or enter key.                                                                                      // 182
     *                                                                                                                // 183
     * @param {Event} e  the event object                                                                             // 184
     *                                                                                                                // 185
     * @method tabOverride.handlers.keydown                                                                           // 186
     */                                                                                                               // 187
    function overrideKeyDown(e) {                                                                                     // 188
        e = e || event;                                                                                               // 189
                                                                                                                      // 190
        // textarea elements can only contain text nodes which don't receive                                          // 191
        // keydown events, so the event target/srcElement will always be the                                          // 192
        // textarea element, however, prefer currentTarget in order to support                                        // 193
        // delegated events in compliant browsers                                                                     // 194
        var target = e.currentTarget || e.srcElement, // don't use the "this" keyword (doesn't work in old IE)        // 195
            key = e.keyCode, // the key code for the key that was pressed                                             // 196
            tab, // the string representing a tab                                                                     // 197
            tabLen, // the length of a tab                                                                            // 198
            text, // initial text in the textarea                                                                     // 199
            range, // the IE TextRange object                                                                         // 200
            tempRange, // used to calculate selection start and end positions in IE                                   // 201
            preNewlines, // the number of newline character sequences before the selection start (for IE)             // 202
            selNewlines, // the number of newline character sequences within the selection (for IE)                   // 203
            initScrollTop, // initial scrollTop value used to fix scrolling in Firefox                                // 204
            selStart, // the selection start position                                                                 // 205
            selEnd, // the selection end position                                                                     // 206
            sel, // the selected text                                                                                 // 207
            startLine, // for multi-line selections, the first character position of the first line                   // 208
            endLine, // for multi-line selections, the last character position of the last line                       // 209
            numTabs, // the number of tabs inserted / removed in the selection                                        // 210
            startTab, // if a tab was removed from the start of the first line                                        // 211
            preTab, // if a tab was removed before the start of the selection                                         // 212
            whitespace, // the whitespace at the beginning of the first selected line                                 // 213
            whitespaceLen, // the length of the whitespace at the beginning of the first selected line                // 214
            CHARACTER = 'character'; // string constant used for the Range.move methods                               // 215
                                                                                                                      // 216
        // don't do any unnecessary work                                                                              // 217
        if ((target.nodeName && target.nodeName.toLowerCase() !== 'textarea') ||                                      // 218
                (key !== tabKey && key !== untabKey && (key !== 13 || !autoIndent))) {                                // 219
            return;                                                                                                   // 220
        }                                                                                                             // 221
                                                                                                                      // 222
        // initialize variables used for tab and enter keys                                                           // 223
        inWhitespace = false; // this will be set to true if enter is pressed in the leading whitespace               // 224
        text = target.value;                                                                                          // 225
                                                                                                                      // 226
        // this is really just for Firefox, but will be used by all browsers that support                             // 227
        // selectionStart and selectionEnd - whenever the textarea value property is reset,                           // 228
        // Firefox scrolls back to the top - this is used to set it back to the original value                        // 229
        // scrollTop is nonstandard, but supported by all modern browsers                                             // 230
        initScrollTop = target.scrollTop;                                                                             // 231
                                                                                                                      // 232
        // get the text selection                                                                                     // 233
        if (typeof target.selectionStart === 'number') {                                                              // 234
            selStart = target.selectionStart;                                                                         // 235
            selEnd = target.selectionEnd;                                                                             // 236
            sel = text.slice(selStart, selEnd);                                                                       // 237
                                                                                                                      // 238
        } else if (document.selection) { // IE                                                                        // 239
            range = document.selection.createRange();                                                                 // 240
            sel = range.text;                                                                                         // 241
            tempRange = range.duplicate();                                                                            // 242
            tempRange.moveToElementText(target);                                                                      // 243
            tempRange.setEndPoint('EndToEnd', range);                                                                 // 244
            selEnd = tempRange.text.length;                                                                           // 245
            selStart = selEnd - sel.length;                                                                           // 246
                                                                                                                      // 247
            // whenever the value of the textarea is changed, the range needs to be reset                             // 248
            // IE <9 (and Opera) use both \r and \n for newlines - this adds an extra character                       // 249
            // that needs to be accounted for when doing position calculations with ranges                            // 250
            // these values are used to offset the selection start and end positions                                  // 251
            if (newlineLen > 1) {                                                                                     // 252
                preNewlines = text.slice(0, selStart).split(newline).length - 1;                                      // 253
                selNewlines = sel.split(newline).length - 1;                                                          // 254
            } else {                                                                                                  // 255
                preNewlines = selNewlines = 0;                                                                        // 256
            }                                                                                                         // 257
        } else {                                                                                                      // 258
            return; // cannot access textarea selection - do nothing                                                  // 259
        }                                                                                                             // 260
                                                                                                                      // 261
        // tab / untab key - insert / remove tab                                                                      // 262
        if (key === tabKey || key === untabKey) {                                                                     // 263
                                                                                                                      // 264
            // initialize tab variables                                                                               // 265
            tab = aTab;                                                                                               // 266
            tabLen = tab.length;                                                                                      // 267
            numTabs = 0;                                                                                              // 268
            startTab = 0;                                                                                             // 269
            preTab = 0;                                                                                               // 270
                                                                                                                      // 271
            // multi-line selection                                                                                   // 272
            if (selStart !== selEnd && sel.indexOf('\n') !== -1) {                                                    // 273
                // for multiple lines, only insert / remove tabs from the beginning of each line                      // 274
                                                                                                                      // 275
                // find the start of the first selected line                                                          // 276
                if (selStart === 0 || text.charAt(selStart - 1) === '\n') {                                           // 277
                    // the selection starts at the beginning of a line                                                // 278
                    startLine = selStart;                                                                             // 279
                } else {                                                                                              // 280
                    // the selection starts after the beginning of a line                                             // 281
                    // set startLine to the beginning of the first partially selected line                            // 282
                    // subtract 1 from selStart in case the cursor is at the newline character,                       // 283
                    // for instance, if the very end of the previous line was selected                                // 284
                    // add 1 to get the next character after the newline                                              // 285
                    // if there is none before the selection, lastIndexOf returns -1                                  // 286
                    // when 1 is added to that it becomes 0 and the first character is used                           // 287
                    startLine = text.lastIndexOf('\n', selStart - 1) + 1;                                             // 288
                }                                                                                                     // 289
                                                                                                                      // 290
                // find the end of the last selected line                                                             // 291
                if (selEnd === text.length || text.charAt(selEnd) === '\n') {                                         // 292
                    // the selection ends at the end of a line                                                        // 293
                    endLine = selEnd;                                                                                 // 294
                } else if (text.charAt(selEnd - 1) === '\n') {                                                        // 295
                    // the selection ends at the start of a line, but no                                              // 296
                    // characters are selected - don't indent this line                                               // 297
                    endLine = selEnd - 1;                                                                             // 298
                } else {                                                                                              // 299
                    // the selection ends before the end of a line                                                    // 300
                    // set endLine to the end of the last partially selected line                                     // 301
                    endLine = text.indexOf('\n', selEnd);                                                             // 302
                    if (endLine === -1) {                                                                             // 303
                        endLine = text.length;                                                                        // 304
                    }                                                                                                 // 305
                }                                                                                                     // 306
                                                                                                                      // 307
                // tab key combo - insert tabs                                                                        // 308
                if (tabKeyComboPressed(key, e)) {                                                                     // 309
                                                                                                                      // 310
                    numTabs = 1; // for the first tab                                                                 // 311
                                                                                                                      // 312
                    // insert tabs at the beginning of each line of the selection                                     // 313
                    target.value = text.slice(0, startLine) + tab +                                                   // 314
                        text.slice(startLine, endLine).replace(/\n/g, function () {                                   // 315
                            numTabs += 1;                                                                             // 316
                            return '\n' + tab;                                                                        // 317
                        }) + text.slice(endLine);                                                                     // 318
                                                                                                                      // 319
                    // set start and end points                                                                       // 320
                    if (range) { // IE                                                                                // 321
                        range.collapse();                                                                             // 322
                        range.moveEnd(CHARACTER, selEnd + (numTabs * tabLen) - selNewlines - preNewlines);            // 323
                        range.moveStart(CHARACTER, selStart + tabLen - preNewlines);                                  // 324
                        range.select();                                                                               // 325
                    } else {                                                                                          // 326
                        // the selection start is always moved by 1 character                                         // 327
                        target.selectionStart = selStart + tabLen;                                                    // 328
                        // move the selection end over by the total number of tabs inserted                           // 329
                        target.selectionEnd = selEnd + (numTabs * tabLen);                                            // 330
                        target.scrollTop = initScrollTop;                                                             // 331
                    }                                                                                                 // 332
                } else if (untabKeyComboPressed(key, e)) {                                                            // 333
                    // if the untab key combo was pressed, remove tabs instead of inserting them                      // 334
                                                                                                                      // 335
                    if (text.slice(startLine).indexOf(tab) === 0) {                                                   // 336
                        // is this tab part of the selection?                                                         // 337
                        if (startLine === selStart) {                                                                 // 338
                            // it is, remove it                                                                       // 339
                            sel = sel.slice(tabLen);                                                                  // 340
                        } else {                                                                                      // 341
                            // the tab comes before the selection                                                     // 342
                            preTab = tabLen;                                                                          // 343
                        }                                                                                             // 344
                        startTab = tabLen;                                                                            // 345
                    }                                                                                                 // 346
                                                                                                                      // 347
                    target.value = text.slice(0, startLine) + text.slice(startLine + preTab, selStart) +              // 348
                        sel.replace(new RegExp('\n' + tab, 'g'), function () {                                        // 349
                            numTabs += 1;                                                                             // 350
                            return '\n';                                                                              // 351
                        }) + text.slice(selEnd);                                                                      // 352
                                                                                                                      // 353
                    // set start and end points                                                                       // 354
                    if (range) { // IE                                                                                // 355
                        // setting end first makes calculations easier                                                // 356
                        range.collapse();                                                                             // 357
                        range.moveEnd(CHARACTER, selEnd - startTab - (numTabs * tabLen) - selNewlines - preNewlines); // 358
                        range.moveStart(CHARACTER, selStart - preTab - preNewlines);                                  // 359
                        range.select();                                                                               // 360
                    } else {                                                                                          // 361
                        // set start first for Opera                                                                  // 362
                        target.selectionStart = selStart - preTab; // preTab is 0 or tabLen                           // 363
                        // move the selection end over by the total number of tabs removed                            // 364
                        target.selectionEnd = selEnd - startTab - (numTabs * tabLen);                                 // 365
                    }                                                                                                 // 366
                } else {                                                                                              // 367
                    return; // do nothing for invalid key combinations                                                // 368
                }                                                                                                     // 369
                                                                                                                      // 370
            } else { // single line selection                                                                         // 371
                                                                                                                      // 372
                // tab key combo - insert a tab                                                                       // 373
                if (tabKeyComboPressed(key, e)) {                                                                     // 374
                    if (range) { // IE                                                                                // 375
                        range.text = tab;                                                                             // 376
                        range.select();                                                                               // 377
                    } else {                                                                                          // 378
                        target.value = text.slice(0, selStart) + tab + text.slice(selEnd);                            // 379
                        target.selectionEnd = target.selectionStart = selStart + tabLen;                              // 380
                        target.scrollTop = initScrollTop;                                                             // 381
                    }                                                                                                 // 382
                } else if (untabKeyComboPressed(key, e)) {                                                            // 383
                    // if the untab key combo was pressed, remove a tab instead of inserting one                      // 384
                                                                                                                      // 385
                    // if the character before the selection is a tab, remove it                                      // 386
                    if (text.slice(selStart - tabLen).indexOf(tab) === 0) {                                           // 387
                        target.value = text.slice(0, selStart - tabLen) + text.slice(selStart);                       // 388
                                                                                                                      // 389
                        // set start and end points                                                                   // 390
                        if (range) { // IE                                                                            // 391
                            // collapses range and moves it by -1 tab                                                 // 392
                            range.move(CHARACTER, selStart - tabLen - preNewlines);                                   // 393
                            range.select();                                                                           // 394
                        } else {                                                                                      // 395
                            target.selectionEnd = target.selectionStart = selStart - tabLen;                          // 396
                            target.scrollTop = initScrollTop;                                                         // 397
                        }                                                                                             // 398
                    }                                                                                                 // 399
                } else {                                                                                              // 400
                    return; // do nothing for invalid key combinations                                                // 401
                }                                                                                                     // 402
            }                                                                                                         // 403
        } else if (autoIndent) { // Enter key                                                                         // 404
            // insert a newline and copy the whitespace from the beginning of the line                                // 405
                                                                                                                      // 406
            // find the start of the first selected line                                                              // 407
            if (selStart === 0 || text.charAt(selStart - 1) === '\n') {                                               // 408
                // the selection starts at the beginning of a line                                                    // 409
                // do nothing special                                                                                 // 410
                inWhitespace = true;                                                                                  // 411
                return;                                                                                               // 412
            }                                                                                                         // 413
                                                                                                                      // 414
            // see explanation under "multi-line selection" above                                                     // 415
            startLine = text.lastIndexOf('\n', selStart - 1) + 1;                                                     // 416
                                                                                                                      // 417
            // find the end of the first selected line                                                                // 418
            endLine = text.indexOf('\n', selStart);                                                                   // 419
                                                                                                                      // 420
            // if no newline is found, set endLine to the end of the text                                             // 421
            if (endLine === -1) {                                                                                     // 422
                endLine = text.length;                                                                                // 423
            }                                                                                                         // 424
                                                                                                                      // 425
            // get the whitespace at the beginning of the first selected line (spaces and tabs only)                  // 426
            whitespace = text.slice(startLine, endLine).match(/^[ \t]*/)[0];                                          // 427
            whitespaceLen = whitespace.length;                                                                        // 428
                                                                                                                      // 429
            // the cursor (selStart) is in the whitespace at beginning of the line                                    // 430
            // do nothing special                                                                                     // 431
            if (selStart < startLine + whitespaceLen) {                                                               // 432
                inWhitespace = true;                                                                                  // 433
                return;                                                                                               // 434
            }                                                                                                         // 435
                                                                                                                      // 436
            if (range) { // IE                                                                                        // 437
                // insert the newline and whitespace                                                                  // 438
                range.text = '\n' + whitespace;                                                                       // 439
                range.select();                                                                                       // 440
            } else {                                                                                                  // 441
                // insert the newline and whitespace                                                                  // 442
                target.value = text.slice(0, selStart) + '\n' + whitespace + text.slice(selEnd);                      // 443
                // Opera uses \r\n for a newline, instead of \n,                                                      // 444
                // so use newlineLen instead of a hard-coded value                                                    // 445
                target.selectionEnd = target.selectionStart = selStart + newlineLen + whitespaceLen;                  // 446
                target.scrollTop = initScrollTop;                                                                     // 447
            }                                                                                                         // 448
        }                                                                                                             // 449
                                                                                                                      // 450
        if (e.preventDefault) {                                                                                       // 451
            e.preventDefault();                                                                                       // 452
        } else {                                                                                                      // 453
            e.returnValue = false;                                                                                    // 454
            return false;                                                                                             // 455
        }                                                                                                             // 456
    }                                                                                                                 // 457
                                                                                                                      // 458
    /**                                                                                                               // 459
     * Event handler to prevent the default action for the keypress event when                                        // 460
     * tab or enter is pressed. Opera and Firefox also fire a keypress event                                          // 461
     * when the tab or enter key is pressed. Opera requires that the default                                          // 462
     * action be prevented on this event or the textarea will lose focus.                                             // 463
     *                                                                                                                // 464
     * @param {Event} e  the event object                                                                             // 465
     *                                                                                                                // 466
     * @method tabOverride.handlers.keypress                                                                          // 467
     */                                                                                                               // 468
    function overrideKeyPress(e) {                                                                                    // 469
        e = e || event;                                                                                               // 470
                                                                                                                      // 471
        var key = e.keyCode;                                                                                          // 472
                                                                                                                      // 473
        if (tabKeyComboPressed(key, e) || untabKeyComboPressed(key, e) ||                                             // 474
                (key === 13 && autoIndent && !inWhitespace)) {                                                        // 475
                                                                                                                      // 476
            if (e.preventDefault) {                                                                                   // 477
                e.preventDefault();                                                                                   // 478
            } else {                                                                                                  // 479
                e.returnValue = false;                                                                                // 480
                return false;                                                                                         // 481
            }                                                                                                         // 482
        }                                                                                                             // 483
    }                                                                                                                 // 484
                                                                                                                      // 485
    /**                                                                                                               // 486
     * Executes all registered extension functions for the specified hook.                                            // 487
     *                                                                                                                // 488
     * @param {string} hook    the name of the hook for which the extensions are registered                           // 489
     * @param {Array}  [args]  the arguments to pass to the extension                                                 // 490
     *                                                                                                                // 491
     * @method tabOverride.utils.executeExtensions                                                                    // 492
     */                                                                                                               // 493
    function executeExtensions(hook, args) {                                                                          // 494
        var i,                                                                                                        // 495
            extensions = hooks[hook] || [],                                                                           // 496
            len = extensions.length;                                                                                  // 497
                                                                                                                      // 498
        for (i = 0; i < len; i += 1) {                                                                                // 499
            extensions[i].apply(null, args);                                                                          // 500
        }                                                                                                             // 501
    }                                                                                                                 // 502
                                                                                                                      // 503
    /**                                                                                                               // 504
     * @typedef {Object} tabOverride.utils~handlerObj                                                                 // 505
     *                                                                                                                // 506
     * @property {string}   type     the event type                                                                   // 507
     * @property {Function} handler  the handler function - passed an Event object                                    // 508
     */                                                                                                               // 509
                                                                                                                      // 510
    /**                                                                                                               // 511
     * @typedef {Object} tabOverride.utils~listenersObj                                                               // 512
     *                                                                                                                // 513
     * @property {Function} add     Adds all the event listeners to the                                               // 514
     *                              specified element                                                                 // 515
     * @property {Function} remove  Removes all the event listeners from                                              // 516
     *                              the specified element                                                             // 517
     */                                                                                                               // 518
                                                                                                                      // 519
    /**                                                                                                               // 520
     * Creates functions to add and remove event listeners in a cross-browser                                         // 521
     * compatible way.                                                                                                // 522
     *                                                                                                                // 523
     * @param  {tabOverride.utils~handlerObj[]} handlerList  an array of {@link tabOverride.utils~handlerObj handlerObj} objects
     * @return {tabOverride.utils~listenersObj}              a listenersObj object used to add and remove the event listeners
     *                                                                                                                // 526
     * @method tabOverride.utils.createListeners                                                                      // 527
     */                                                                                                               // 528
    function createListeners(handlerList) {                                                                           // 529
        var i,                                                                                                        // 530
            len = handlerList.length,                                                                                 // 531
            remove,                                                                                                   // 532
            add;                                                                                                      // 533
                                                                                                                      // 534
        function loop(func) {                                                                                         // 535
            for (i = 0; i < len; i += 1) {                                                                            // 536
                func(handlerList[i].type, handlerList[i].handler);                                                    // 537
            }                                                                                                         // 538
        }                                                                                                             // 539
                                                                                                                      // 540
        // use the standard event handler registration method when available                                          // 541
        if (document.addEventListener) {                                                                              // 542
            remove = function (elem) {                                                                                // 543
                loop(function (type, handler) {                                                                       // 544
                    elem.removeEventListener(type, handler, false);                                                   // 545
                });                                                                                                   // 546
            };                                                                                                        // 547
            add = function (elem) {                                                                                   // 548
                // remove listeners before adding them to make sure they are not                                      // 549
                // added more than once                                                                               // 550
                remove(elem);                                                                                         // 551
                loop(function (type, handler) {                                                                       // 552
                    elem.addEventListener(type, handler, false);                                                      // 553
                });                                                                                                   // 554
            };                                                                                                        // 555
        } else if (document.attachEvent) {                                                                            // 556
            // support IE 6-8                                                                                         // 557
            remove = function (elem) {                                                                                // 558
                loop(function (type, handler) {                                                                       // 559
                    elem.detachEvent('on' + type, handler);                                                           // 560
                });                                                                                                   // 561
            };                                                                                                        // 562
            add = function (elem) {                                                                                   // 563
                remove(elem);                                                                                         // 564
                loop(function (type, handler) {                                                                       // 565
                    elem.attachEvent('on' + type, handler);                                                           // 566
                });                                                                                                   // 567
            };                                                                                                        // 568
        }                                                                                                             // 569
                                                                                                                      // 570
        return {                                                                                                      // 571
            add: add,                                                                                                 // 572
            remove: remove                                                                                            // 573
        };                                                                                                            // 574
    }                                                                                                                 // 575
                                                                                                                      // 576
    /**                                                                                                               // 577
     * Adds the Tab Override event listeners to the specified element.                                                // 578
     *                                                                                                                // 579
     * Hooks: addListeners - passed the element to which the listeners will                                           // 580
     * be added.                                                                                                      // 581
     *                                                                                                                // 582
     * @param {Element} elem  the element to which the listeners will be added                                        // 583
     *                                                                                                                // 584
     * @method tabOverride.utils.addListeners                                                                         // 585
     */                                                                                                               // 586
    function addListeners(elem) {                                                                                     // 587
        executeExtensions('addListeners', [elem]);                                                                    // 588
        listeners.add(elem);                                                                                          // 589
    }                                                                                                                 // 590
                                                                                                                      // 591
    /**                                                                                                               // 592
     * Removes the Tab Override event listeners from the specified element.                                           // 593
     *                                                                                                                // 594
     * Hooks: removeListeners - passed the element from which the listeners                                           // 595
     * will be removed.                                                                                               // 596
     *                                                                                                                // 597
     * @param {Element} elem  the element from which the listeners will be removed                                    // 598
     *                                                                                                                // 599
     * @method tabOverride.utils.removeListeners                                                                      // 600
     */                                                                                                               // 601
    function removeListeners(elem) {                                                                                  // 602
        executeExtensions('removeListeners', [elem]);                                                                 // 603
        listeners.remove(elem);                                                                                       // 604
    }                                                                                                                 // 605
                                                                                                                      // 606
                                                                                                                      // 607
    // Initialize Variables                                                                                           // 608
                                                                                                                      // 609
    listeners = createListeners([                                                                                     // 610
        { type: 'keydown', handler: overrideKeyDown },                                                                // 611
        { type: 'keypress', handler: overrideKeyPress }                                                               // 612
    ]);                                                                                                               // 613
                                                                                                                      // 614
    // get the characters used for a newline                                                                          // 615
    textareaElem.value = '\n';                                                                                        // 616
    newline = textareaElem.value;                                                                                     // 617
    newlineLen = newline.length;                                                                                      // 618
    textareaElem = null;                                                                                              // 619
                                                                                                                      // 620
                                                                                                                      // 621
    // Public Properties and Methods                                                                                  // 622
                                                                                                                      // 623
    /**                                                                                                               // 624
     * Namespace for utility methods                                                                                  // 625
     *                                                                                                                // 626
     * @namespace                                                                                                     // 627
     */                                                                                                               // 628
    tabOverride.utils = {                                                                                             // 629
        executeExtensions: executeExtensions,                                                                         // 630
        isValidModifierKeyCombo: isValidModifierKeyCombo,                                                             // 631
        createListeners: createListeners,                                                                             // 632
        addListeners: addListeners,                                                                                   // 633
        removeListeners: removeListeners                                                                              // 634
    };                                                                                                                // 635
                                                                                                                      // 636
    /**                                                                                                               // 637
     * Namespace for event handler functions                                                                          // 638
     *                                                                                                                // 639
     * @namespace                                                                                                     // 640
     */                                                                                                               // 641
    tabOverride.handlers = {                                                                                          // 642
        keydown: overrideKeyDown,                                                                                     // 643
        keypress: overrideKeyPress                                                                                    // 644
    };                                                                                                                // 645
                                                                                                                      // 646
    /**                                                                                                               // 647
     * Adds an extension function to be executed when the specified hook is                                           // 648
     * "fired." The extension function is called for each element and is passed                                       // 649
     * any relevant arguments for the hook.                                                                           // 650
     *                                                                                                                // 651
     * @param  {string}   hook  the name of the hook for which the extension                                          // 652
     *                          will be registered                                                                    // 653
     * @param  {Function} func  the function to be executed when the hook is "fired"                                  // 654
     * @return {Object}         the tabOverride object                                                                // 655
     */                                                                                                               // 656
    tabOverride.addExtension = function (hook, func) {                                                                // 657
        if (hook && typeof hook === 'string' && typeof func === 'function') {                                         // 658
            if (!hooks[hook]) {                                                                                       // 659
                hooks[hook] = [];                                                                                     // 660
            }                                                                                                         // 661
            hooks[hook].push(func);                                                                                   // 662
        }                                                                                                             // 663
                                                                                                                      // 664
        return this;                                                                                                  // 665
    };                                                                                                                // 666
                                                                                                                      // 667
    /**                                                                                                               // 668
     * Enables or disables Tab Override for the specified textarea element(s).                                        // 669
     *                                                                                                                // 670
     * Hooks: set - passed the current element and a boolean indicating whether                                       // 671
     * Tab Override was enabled or disabled.                                                                          // 672
     *                                                                                                                // 673
     * @param  {Element|Element[]} elems          the textarea element(s) for                                         // 674
     *                                            which to enable or disable                                          // 675
     *                                            Tab Override                                                        // 676
     * @param  {boolean}           [enable=true]  whether Tab Override should be                                      // 677
     *                                            enabled for the element(s)                                          // 678
     * @return {Object}                           the tabOverride object                                              // 679
     */                                                                                                               // 680
    tabOverride.set = function (elems, enable) {                                                                      // 681
        var enableFlag,                                                                                               // 682
            elemsArr,                                                                                                 // 683
            numElems,                                                                                                 // 684
            setListeners,                                                                                             // 685
            attrValue,                                                                                                // 686
            i,                                                                                                        // 687
            elem;                                                                                                     // 688
                                                                                                                      // 689
        if (elems) {                                                                                                  // 690
            enableFlag = arguments.length < 2 || enable;                                                              // 691
                                                                                                                      // 692
            // don't manipulate param when referencing arguments object                                               // 693
            // this is just a matter of practice                                                                      // 694
            elemsArr = elems;                                                                                         // 695
            numElems = elemsArr.length;                                                                               // 696
                                                                                                                      // 697
            if (typeof numElems !== 'number') {                                                                       // 698
                elemsArr = [elemsArr];                                                                                // 699
                numElems = 1;                                                                                         // 700
            }                                                                                                         // 701
                                                                                                                      // 702
            if (enableFlag) {                                                                                         // 703
                setListeners = addListeners;                                                                          // 704
                attrValue = 'true';                                                                                   // 705
            } else {                                                                                                  // 706
                setListeners = removeListeners;                                                                       // 707
                attrValue = '';                                                                                       // 708
            }                                                                                                         // 709
                                                                                                                      // 710
            for (i = 0; i < numElems; i += 1) {                                                                       // 711
                elem = elemsArr[i];                                                                                   // 712
                if (elem && elem.nodeName && elem.nodeName.toLowerCase() === 'textarea') {                            // 713
                    executeExtensions('set', [elem, enableFlag]);                                                     // 714
                    elem.setAttribute('data-taboverride-enabled', attrValue);                                         // 715
                    setListeners(elem);                                                                               // 716
                }                                                                                                     // 717
            }                                                                                                         // 718
        }                                                                                                             // 719
                                                                                                                      // 720
        return this;                                                                                                  // 721
    };                                                                                                                // 722
                                                                                                                      // 723
    /**                                                                                                               // 724
     * Gets or sets the tab size for all elements that have Tab Override enabled.                                     // 725
     * 0 represents the tab character.                                                                                // 726
     *                                                                                                                // 727
     * @param  {number}        [size]  the tab size                                                                   // 728
     * @return {number|Object}         the tab size or the tabOverride object                                         // 729
     */                                                                                                               // 730
    tabOverride.tabSize = function (size) {                                                                           // 731
        var i;                                                                                                        // 732
                                                                                                                      // 733
        if (arguments.length) {                                                                                       // 734
            if (!size) { // size is 0 (or falsy)                                                                      // 735
                aTab = '\t';                                                                                          // 736
            } else if (typeof size === 'number' && size > 0) {                                                        // 737
                aTab = '';                                                                                            // 738
                for (i = 0; i < size; i += 1) {                                                                       // 739
                    aTab += ' ';                                                                                      // 740
                }                                                                                                     // 741
            }                                                                                                         // 742
            return this;                                                                                              // 743
        }                                                                                                             // 744
                                                                                                                      // 745
        return (aTab === '\t') ? 0 : aTab.length;                                                                     // 746
    };                                                                                                                // 747
                                                                                                                      // 748
    /**                                                                                                               // 749
     * Gets or sets the auto indent setting. True if each line should be                                              // 750
     * automatically indented (default = true).                                                                       // 751
     *                                                                                                                // 752
     * @param  {boolean}        [enable]  whether auto indent should be enabled                                       // 753
     * @return {boolean|Object}           whether auto indent is enabled or the                                       // 754
     *                                    tabOverride object                                                          // 755
     */                                                                                                               // 756
    tabOverride.autoIndent = function (enable) {                                                                      // 757
        if (arguments.length) {                                                                                       // 758
            autoIndent = enable ? true : false;                                                                       // 759
            return this;                                                                                              // 760
        }                                                                                                             // 761
                                                                                                                      // 762
        return autoIndent;                                                                                            // 763
    };                                                                                                                // 764
                                                                                                                      // 765
    /**                                                                                                               // 766
     * Gets or sets the tab key combination.                                                                          // 767
     *                                                                                                                // 768
     * @param  {number}        keyCode             the key code of the key to use for tab                             // 769
     * @param  {string[]}      [modifierKeyNames]  the modifier key names - valid names are                           // 770
     *                                             'alt', 'ctrl', 'meta', and 'shift'                                 // 771
     * @return {string|Object}                     the current tab key combination or the                             // 772
     *                                             tabOverride object                                                 // 773
     *                                                                                                                // 774
     * @method                                                                                                        // 775
     */                                                                                                               // 776
    tabOverride.tabKey = createKeyComboFunction(function (keyCode) {                                                  // 777
        if (!arguments.length) {                                                                                      // 778
            return tabKey;                                                                                            // 779
        }                                                                                                             // 780
        tabKey = keyCode;                                                                                             // 781
    }, tabModifierKeys);                                                                                              // 782
                                                                                                                      // 783
    /**                                                                                                               // 784
     * Gets or sets the untab key combination.                                                                        // 785
     *                                                                                                                // 786
     * @param  {number}        keyCode             the key code of the key to use for untab                           // 787
     * @param  {string[]}      [modifierKeyNames]  the modifier key names - valid names are                           // 788
     *                                             'alt', 'ctrl', 'meta', and 'shift'                                 // 789
     * @return {string|Object}                     the current untab key combination or the                           // 790
     *                                             tabOverride object                                                 // 791
     *                                                                                                                // 792
     * @method                                                                                                        // 793
     */                                                                                                               // 794
    tabOverride.untabKey = createKeyComboFunction(function (keyCode) {                                                // 795
        if (!arguments.length) {                                                                                      // 796
            return untabKey;                                                                                          // 797
        }                                                                                                             // 798
        untabKey = keyCode;                                                                                           // 799
    }, untabModifierKeys);                                                                                            // 800
}));                                                                                                                  // 801
                                                                                                                      // 802
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/gadicohen:messageformat/lib/mfPkg/3rdparty/taboverride.jquery.js                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*! jquery.taboverride v4.0.0 | https://github.com/wjbryant/jquery.taboverride                                        // 1
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */                                                // 2
                                                                                                                      // 3
/**                                                                                                                   // 4
 * @fileOverview Tab Override jQuery plugin                                                                           // 5
 * @author       Bill Bryant                                                                                          // 6
 * @version      4.0.0                                                                                                // 7
 */                                                                                                                   // 8
                                                                                                                      // 9
/*global exports, require, define, jQuery, tabOverride */                                                             // 10
                                                                                                                      // 11
/**                                                                                                                   // 12
 * The jQuery plugin namespace                                                                                        // 13
 *                                                                                                                    // 14
 * @external "jQuery.fn"                                                                                              // 15
 */                                                                                                                   // 16
                                                                                                                      // 17
// Use CommonJS or AMD if available                                                                                   // 18
(function ( factory ) {                                                                                               // 19
	"use strict";                                                                                                        // 20
                                                                                                                      // 21
	if ( typeof exports === "object" && typeof require === "function" ) {                                                // 22
		// Node.js/CommonJS                                                                                                 // 23
		factory( require( "jquery" ), require( "taboverride" ) );                                                           // 24
	} else if ( typeof define === "function" && define.amd ) {                                                           // 25
		// AMD - Register as an anonymous module                                                                            // 26
		// Files must be concatenated using an AMD-aware tool such as r.js                                                  // 27
		define( [ "jquery", "taboverride" ], factory );                                                                     // 28
	} else {                                                                                                             // 29
		// No module format - Use global variables instead                                                                  // 30
		factory( jQuery, tabOverride );                                                                                     // 31
	}                                                                                                                    // 32
}(function ( $, tabOverride ) {                                                                                       // 33
	"use strict";                                                                                                        // 34
                                                                                                                      // 35
	var $fnTabOverride;                                                                                                  // 36
                                                                                                                      // 37
	/**                                                                                                                  // 38
	 * Helper function to remove the delegated listeners. This is only used in                                           // 39
	 * the removeDelegatedListeners and addDelegatedListeners functions.                                                 // 40
	 *                                                                                                                   // 41
	 * @see external:"jQuery.fn".tabOverride.utils.removeDelegatedListeners                                              // 42
	 * @private                                                                                                          // 43
	 */                                                                                                                  // 44
	function removeDelegatedListenersHelper( $container, selector ) {                                                    // 45
		$container.off({                                                                                                    // 46
			"keydown.tabOverride": tabOverride.handlers.keydown,                                                               // 47
			"keypress.tabOverride": tabOverride.handlers.keypress                                                              // 48
		}, selector );                                                                                                      // 49
	}                                                                                                                    // 50
                                                                                                                      // 51
	/**                                                                                                                  // 52
	 * Removes the Tab Override event listeners on the container element                                                 // 53
	 * using jQuery delegated events.                                                                                    // 54
	 *                                                                                                                   // 55
	 * Hooks: removeDelegatedListeners - passed the jQuery object for the                                                // 56
	 * container element(s) and the selector string                                                                      // 57
	 *                                                                                                                   // 58
	 * @param {Object} $container  the jQuery object for the container element                                           // 59
	 * @param {string} selector    the selector string to use for the delegated events                                   // 60
	 *                                                                                                                   // 61
	 * @method external:"jQuery.fn".tabOverride.utils.removeDelegatedListeners                                           // 62
	 */                                                                                                                  // 63
	function removeDelegatedListeners( $container, selector ) {                                                          // 64
		tabOverride.utils.executeExtensions( "removeDelegatedListeners", [ $container, selector ] );                        // 65
		removeDelegatedListenersHelper( $container, selector );                                                             // 66
	}                                                                                                                    // 67
                                                                                                                      // 68
	/**                                                                                                                  // 69
	 * Adds the Tab Override event listeners to the container element using                                              // 70
	 * jQuery delegated events.                                                                                          // 71
	 *                                                                                                                   // 72
	 * Hooks: addDelegatedListeners - passed the jQuery object for the                                                   // 73
	 * container element(s) and the selector string                                                                      // 74
	 *                                                                                                                   // 75
	 * @param {Object} $container  the jQuery object for the container element                                           // 76
	 * @param {string} selector    the selector string to use for the delegated events                                   // 77
	 *                                                                                                                   // 78
	 * @method external:"jQuery.fn".tabOverride.utils.addDelegatedListeners                                              // 79
	 */                                                                                                                  // 80
	function addDelegatedListeners( $container, selector ) {                                                             // 81
		tabOverride.utils.executeExtensions( "addDelegatedListeners", [ $container, selector ] );                           // 82
		removeDelegatedListenersHelper( $container, selector );                                                             // 83
		$container.on({                                                                                                     // 84
			"keydown.tabOverride": tabOverride.handlers.keydown,                                                               // 85
			"keypress.tabOverride": tabOverride.handlers.keypress                                                              // 86
		}, selector );                                                                                                      // 87
	}                                                                                                                    // 88
                                                                                                                      // 89
	/**                                                                                                                  // 90
	 * The tabOverride method namespace                                                                                  // 91
	 *                                                                                                                   // 92
	 * @namespace external:"jQuery.fn".tabOverride                                                                       // 93
	 */                                                                                                                  // 94
                                                                                                                      // 95
	/**                                                                                                                  // 96
	 * Enables/disables Tab Override. If enabled, tabs (or spaces) will be                                               // 97
	 * inserted in the selected textarea elements when the tab key is pressed.                                           // 98
	 *                                                                                                                   // 99
	 * Hooks: setDelegated - fired when delegated events are used, passed the                                            // 100
	 * jQuery object for the container element(s), the selector string, and a                                            // 101
	 * boolean indicating whether Tab Override was enabled or disabled.                                                  // 102
	 *                                                                                                                   // 103
	 * @param  {boolean} [enable=true]  whether Tab Override should be enabled                                           // 104
	 *                                  for the element(s)                                                               // 105
	 * @param  {string}  [selector]     the selector string for delegated events                                         // 106
	 * @return {Object}                 the jQuery object                                                                // 107
	 *                                                                                                                   // 108
	 * @method external:"jQuery.fn".tabOverride(2)                                                                       // 109
	 */                                                                                                                  // 110
	$fnTabOverride = $.fn.tabOverride = function ( enable, selector ) {                                                  // 111
                                                                                                                      // 112
		var enablePlugin = !arguments.length || enable,                                                                     // 113
			isDelegated = typeof selector === "string",                                                                        // 114
			$container;                                                                                                        // 115
                                                                                                                      // 116
		if ( isDelegated ) {                                                                                                // 117
			$container = this;                                                                                                 // 118
                                                                                                                      // 119
			tabOverride.utils.executeExtensions( "setDelegated", [ $container, selector, enable ] );                           // 120
                                                                                                                      // 121
			if ( enablePlugin ) {                                                                                              // 122
				addDelegatedListeners( $container, selector );                                                                    // 123
			} else {                                                                                                           // 124
				removeDelegatedListeners( $container, selector );                                                                 // 125
			}                                                                                                                  // 126
		} else {                                                                                                            // 127
			// The jQuery object acts as an array of elements, so it can be passed                                             // 128
			// to tabOverride.set()                                                                                            // 129
			tabOverride.set( this, enablePlugin );                                                                             // 130
		}                                                                                                                   // 131
                                                                                                                      // 132
		// Return the jQuery object                                                                                         // 133
		return this;                                                                                                        // 134
	};                                                                                                                   // 135
                                                                                                                      // 136
	/**                                                                                                                  // 137
	 * Namespace for utility methods                                                                                     // 138
	 *                                                                                                                   // 139
	 * @namespace external:"jQuery.fn".tabOverride.utils                                                                 // 140
	 */                                                                                                                  // 141
	$fnTabOverride.utils = {                                                                                             // 142
		addDelegatedListeners: addDelegatedListeners,                                                                       // 143
		removeDelegatedListeners: removeDelegatedListeners                                                                  // 144
	};                                                                                                                   // 145
                                                                                                                      // 146
	/**                                                                                                                  // 147
	 * Gets or sets the tab size for all elements that have Tab Override enabled.                                        // 148
	 * 0 represents the tab character.                                                                                   // 149
	 *                                                                                                                   // 150
	 * @param  {number}          [size]  the tab size                                                                    // 151
	 * @return {number|Function}         the tab size or the tabOverride function                                        // 152
	 *                                                                                                                   // 153
	 * @method external:"jQuery.fn".tabOverride.tabSize                                                                  // 154
	 */                                                                                                                  // 155
	$fnTabOverride.tabSize = tabOverride.tabSize;                                                                        // 156
                                                                                                                      // 157
	/**                                                                                                                  // 158
	 * Gets or sets the auto indent setting. True if each line should be                                                 // 159
	 * automatically indented (default = false).                                                                         // 160
	 *                                                                                                                   // 161
	 * @param  {boolean}          [enable]  whether auto indent should be enabled                                        // 162
	 * @return {boolean|Function}           whether auto indent is enabled or the                                        // 163
	 *                                      tabOverride function                                                         // 164
	 *                                                                                                                   // 165
	 * @method external:"jQuery.fn".tabOverride.autoIndent                                                               // 166
	 */                                                                                                                  // 167
	$fnTabOverride.autoIndent = tabOverride.autoIndent;                                                                  // 168
                                                                                                                      // 169
	/**                                                                                                                  // 170
	 * Gets or sets the tab key combination.                                                                             // 171
	 *                                                                                                                   // 172
	 * @param  {number}          keyCode             the key code of the key to use for tab                              // 173
	 * @param  {string[]}        [modifierKeyNames]  the modifier key names - valid names are                            // 174
	 *                                               'alt', 'ctrl', 'meta', and 'shift'                                  // 175
	 * @return {string|Function}                     the current tab key combination or the                              // 176
	 *                                               tabOverride function                                                // 177
	 *                                                                                                                   // 178
	 * @method external:"jQuery.fn".tabOverride.tabKey                                                                   // 179
	 */                                                                                                                  // 180
	$fnTabOverride.tabKey = tabOverride.tabKey;                                                                          // 181
                                                                                                                      // 182
	/**                                                                                                                  // 183
	 * Gets or sets the untab key combination.                                                                           // 184
	 *                                                                                                                   // 185
	 * @param  {number}          keyCode             the key code of the key to use for untab                            // 186
	 * @param  {string[]}        [modifierKeyNames]  the modifier key names - valid names are                            // 187
	 *                                               'alt', 'ctrl', 'meta', and 'shift'                                  // 188
	 * @return {string|Function}                     the current untab key combination or the                            // 189
	 *                                               tabOverride function                                                // 190
	 *                                                                                                                   // 191
	 * @method external:"jQuery.fn".tabOverride.untabKey                                                                 // 192
	 */                                                                                                                  // 193
	$fnTabOverride.untabKey = tabOverride.untabKey;                                                                      // 194
}));                                                                                                                  // 195
                                                                                                                      // 196
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicohen:messageformat'] = {
  mfPkg: mfPkg,
  mf: mf
};

})();
