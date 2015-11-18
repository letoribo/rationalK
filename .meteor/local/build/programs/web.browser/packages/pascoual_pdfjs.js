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
var PDFJS;

(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/pascoual:pdfjs/build/pdf.js                                          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */ // 1
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */              // 2
/* Copyright 2012 Mozilla Foundation                                             // 3
 *                                                                               // 4
 * Licensed under the Apache License, Version 2.0 (the "License");               // 5
 * you may not use this file except in compliance with the License.              // 6
 * You may obtain a copy of the License at                                       // 7
 *                                                                               // 8
 *     http://www.apache.org/licenses/LICENSE-2.0                                // 9
 *                                                                               // 10
 * Unless required by applicable law or agreed to in writing, software           // 11
 * distributed under the License is distributed on an "AS IS" BASIS,             // 12
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.      // 13
 * See the License for the specific language governing permissions and           // 14
 * limitations under the License.                                                // 15
 */                                                                              // 16
/*jshint globalstrict: false */                                                  // 17
/* globals PDFJS */                                                              // 18
                                                                                 // 19
// Initializing PDFJS global object (if still undefined)                         // 20
if (typeof PDFJS === 'undefined') {                                              // 21
  (typeof window !== 'undefined' ? window : this).PDFJS = {};                    // 22
}                                                                                // 23
// Pascoual hack for Meteor                                                      // 24
if (!PDFJS)                                                                      // 25
  PDFJS = {};                                                                    // 26
                                                                                 // 27
PDFJS.version = '1.1.114';                                                       // 28
PDFJS.build = '3fd44fd';                                                         // 29
                                                                                 // 30
(function pdfjsWrapper() {                                                       // 31
  // Use strict in our context only - users might not want it                    // 32
  'use strict';                                                                  // 33
                                                                                 // 34
/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */ // 35
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */              // 36
/* Copyright 2012 Mozilla Foundation                                             // 37
 *                                                                               // 38
 * Licensed under the Apache License, Version 2.0 (the "License");               // 39
 * you may not use this file except in compliance with the License.              // 40
 * You may obtain a copy of the License at                                       // 41
 *                                                                               // 42
 *     http://www.apache.org/licenses/LICENSE-2.0                                // 43
 *                                                                               // 44
 * Unless required by applicable law or agreed to in writing, software           // 45
 * distributed under the License is distributed on an "AS IS" BASIS,             // 46
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.      // 47
 * See the License for the specific language governing permissions and           // 48
 * limitations under the License.                                                // 49
 */                                                                              // 50
/* globals Cmd, ColorSpace, Dict, MozBlobBuilder, Name, PDFJS, Ref, URL,         // 51
           Promise */                                                            // 52
                                                                                 // 53
'use strict';                                                                    // 54
                                                                                 // 55
var globalScope = (typeof window === 'undefined') ? this : window;               // 56
                                                                                 // 57
var isWorker = (typeof window === 'undefined');                                  // 58
                                                                                 // 59
var FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];                           // 60
                                                                                 // 61
var TextRenderingMode = {                                                        // 62
  FILL: 0,                                                                       // 63
  STROKE: 1,                                                                     // 64
  FILL_STROKE: 2,                                                                // 65
  INVISIBLE: 3,                                                                  // 66
  FILL_ADD_TO_PATH: 4,                                                           // 67
  STROKE_ADD_TO_PATH: 5,                                                         // 68
  FILL_STROKE_ADD_TO_PATH: 6,                                                    // 69
  ADD_TO_PATH: 7,                                                                // 70
  FILL_STROKE_MASK: 3,                                                           // 71
  ADD_TO_PATH_FLAG: 4                                                            // 72
};                                                                               // 73
                                                                                 // 74
var ImageKind = {                                                                // 75
  GRAYSCALE_1BPP: 1,                                                             // 76
  RGB_24BPP: 2,                                                                  // 77
  RGBA_32BPP: 3                                                                  // 78
};                                                                               // 79
                                                                                 // 80
var AnnotationType = {                                                           // 81
  WIDGET: 1,                                                                     // 82
  TEXT: 2,                                                                       // 83
  LINK: 3                                                                        // 84
};                                                                               // 85
                                                                                 // 86
var StreamType = {                                                               // 87
  UNKNOWN: 0,                                                                    // 88
  FLATE: 1,                                                                      // 89
  LZW: 2,                                                                        // 90
  DCT: 3,                                                                        // 91
  JPX: 4,                                                                        // 92
  JBIG: 5,                                                                       // 93
  A85: 6,                                                                        // 94
  AHX: 7,                                                                        // 95
  CCF: 8,                                                                        // 96
  RL: 9                                                                          // 97
};                                                                               // 98
                                                                                 // 99
var FontType = {                                                                 // 100
  UNKNOWN: 0,                                                                    // 101
  TYPE1: 1,                                                                      // 102
  TYPE1C: 2,                                                                     // 103
  CIDFONTTYPE0: 3,                                                               // 104
  CIDFONTTYPE0C: 4,                                                              // 105
  TRUETYPE: 5,                                                                   // 106
  CIDFONTTYPE2: 6,                                                               // 107
  TYPE3: 7,                                                                      // 108
  OPENTYPE: 8,                                                                   // 109
  TYPE0: 9,                                                                      // 110
  MMTYPE1: 10                                                                    // 111
};                                                                               // 112
                                                                                 // 113
// The global PDFJS object exposes the API                                       // 114
// In production, it will be declared outside a global wrapper                   // 115
// In development, it will be declared here                                      // 116
if (!globalScope.PDFJS) {                                                        // 117
  globalScope.PDFJS = {};                                                        // 118
}                                                                                // 119
                                                                                 // 120
globalScope.PDFJS.pdfBug = false;                                                // 121
                                                                                 // 122
PDFJS.VERBOSITY_LEVELS = {                                                       // 123
  errors: 0,                                                                     // 124
  warnings: 1,                                                                   // 125
  infos: 5                                                                       // 126
};                                                                               // 127
                                                                                 // 128
// All the possible operations for an operator list.                             // 129
var OPS = PDFJS.OPS = {                                                          // 130
  // Intentionally start from 1 so it is easy to spot bad operators that will be // 131
  // 0's.                                                                        // 132
  dependency: 1,                                                                 // 133
  setLineWidth: 2,                                                               // 134
  setLineCap: 3,                                                                 // 135
  setLineJoin: 4,                                                                // 136
  setMiterLimit: 5,                                                              // 137
  setDash: 6,                                                                    // 138
  setRenderingIntent: 7,                                                         // 139
  setFlatness: 8,                                                                // 140
  setGState: 9,                                                                  // 141
  save: 10,                                                                      // 142
  restore: 11,                                                                   // 143
  transform: 12,                                                                 // 144
  moveTo: 13,                                                                    // 145
  lineTo: 14,                                                                    // 146
  curveTo: 15,                                                                   // 147
  curveTo2: 16,                                                                  // 148
  curveTo3: 17,                                                                  // 149
  closePath: 18,                                                                 // 150
  rectangle: 19,                                                                 // 151
  stroke: 20,                                                                    // 152
  closeStroke: 21,                                                               // 153
  fill: 22,                                                                      // 154
  eoFill: 23,                                                                    // 155
  fillStroke: 24,                                                                // 156
  eoFillStroke: 25,                                                              // 157
  closeFillStroke: 26,                                                           // 158
  closeEOFillStroke: 27,                                                         // 159
  endPath: 28,                                                                   // 160
  clip: 29,                                                                      // 161
  eoClip: 30,                                                                    // 162
  beginText: 31,                                                                 // 163
  endText: 32,                                                                   // 164
  setCharSpacing: 33,                                                            // 165
  setWordSpacing: 34,                                                            // 166
  setHScale: 35,                                                                 // 167
  setLeading: 36,                                                                // 168
  setFont: 37,                                                                   // 169
  setTextRenderingMode: 38,                                                      // 170
  setTextRise: 39,                                                               // 171
  moveText: 40,                                                                  // 172
  setLeadingMoveText: 41,                                                        // 173
  setTextMatrix: 42,                                                             // 174
  nextLine: 43,                                                                  // 175
  showText: 44,                                                                  // 176
  showSpacedText: 45,                                                            // 177
  nextLineShowText: 46,                                                          // 178
  nextLineSetSpacingShowText: 47,                                                // 179
  setCharWidth: 48,                                                              // 180
  setCharWidthAndBounds: 49,                                                     // 181
  setStrokeColorSpace: 50,                                                       // 182
  setFillColorSpace: 51,                                                         // 183
  setStrokeColor: 52,                                                            // 184
  setStrokeColorN: 53,                                                           // 185
  setFillColor: 54,                                                              // 186
  setFillColorN: 55,                                                             // 187
  setStrokeGray: 56,                                                             // 188
  setFillGray: 57,                                                               // 189
  setStrokeRGBColor: 58,                                                         // 190
  setFillRGBColor: 59,                                                           // 191
  setStrokeCMYKColor: 60,                                                        // 192
  setFillCMYKColor: 61,                                                          // 193
  shadingFill: 62,                                                               // 194
  beginInlineImage: 63,                                                          // 195
  beginImageData: 64,                                                            // 196
  endInlineImage: 65,                                                            // 197
  paintXObject: 66,                                                              // 198
  markPoint: 67,                                                                 // 199
  markPointProps: 68,                                                            // 200
  beginMarkedContent: 69,                                                        // 201
  beginMarkedContentProps: 70,                                                   // 202
  endMarkedContent: 71,                                                          // 203
  beginCompat: 72,                                                               // 204
  endCompat: 73,                                                                 // 205
  paintFormXObjectBegin: 74,                                                     // 206
  paintFormXObjectEnd: 75,                                                       // 207
  beginGroup: 76,                                                                // 208
  endGroup: 77,                                                                  // 209
  beginAnnotations: 78,                                                          // 210
  endAnnotations: 79,                                                            // 211
  beginAnnotation: 80,                                                           // 212
  endAnnotation: 81,                                                             // 213
  paintJpegXObject: 82,                                                          // 214
  paintImageMaskXObject: 83,                                                     // 215
  paintImageMaskXObjectGroup: 84,                                                // 216
  paintImageXObject: 85,                                                         // 217
  paintInlineImageXObject: 86,                                                   // 218
  paintInlineImageXObjectGroup: 87,                                              // 219
  paintImageXObjectRepeat: 88,                                                   // 220
  paintImageMaskXObjectRepeat: 89,                                               // 221
  paintSolidColorImageMask: 90,                                                  // 222
  constructPath: 91                                                              // 223
};                                                                               // 224
                                                                                 // 225
// A notice for devs. These are good for things that are helpful to devs, such   // 226
// as warning that Workers were disabled, which is important to devs but not     // 227
// end users.                                                                    // 228
function info(msg) {                                                             // 229
  if (PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.infos) {                         // 230
    console.log('Info: ' + msg);                                                 // 231
  }                                                                              // 232
}                                                                                // 233
                                                                                 // 234
// Non-fatal warnings.                                                           // 235
function warn(msg) {                                                             // 236
  if (PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.warnings) {                      // 237
    console.log('Warning: ' + msg);                                              // 238
  }                                                                              // 239
}                                                                                // 240
                                                                                 // 241
// Fatal errors that should trigger the fallback UI and halt execution by        // 242
// throwing an exception.                                                        // 243
function error(msg) {                                                            // 244
  if (PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.errors) {                        // 245
    console.log('Error: ' + msg);                                                // 246
    console.log(backtrace());                                                    // 247
  }                                                                              // 248
  UnsupportedManager.notify(UNSUPPORTED_FEATURES.unknown);                       // 249
  throw new Error(msg);                                                          // 250
}                                                                                // 251
                                                                                 // 252
function backtrace() {                                                           // 253
  try {                                                                          // 254
    throw new Error();                                                           // 255
  } catch (e) {                                                                  // 256
    return e.stack ? e.stack.split('\n').slice(2).join('\n') : '';               // 257
  }                                                                              // 258
}                                                                                // 259
                                                                                 // 260
function assert(cond, msg) {                                                     // 261
  if (!cond) {                                                                   // 262
    error(msg);                                                                  // 263
  }                                                                              // 264
}                                                                                // 265
                                                                                 // 266
var UNSUPPORTED_FEATURES = PDFJS.UNSUPPORTED_FEATURES = {                        // 267
  unknown: 'unknown',                                                            // 268
  forms: 'forms',                                                                // 269
  javaScript: 'javaScript',                                                      // 270
  smask: 'smask',                                                                // 271
  shadingPattern: 'shadingPattern',                                              // 272
  font: 'font'                                                                   // 273
};                                                                               // 274
                                                                                 // 275
var UnsupportedManager = PDFJS.UnsupportedManager =                              // 276
  (function UnsupportedManagerClosure() {                                        // 277
  var listeners = [];                                                            // 278
  return {                                                                       // 279
    listen: function (cb) {                                                      // 280
      listeners.push(cb);                                                        // 281
    },                                                                           // 282
    notify: function (featureId) {                                               // 283
      warn('Unsupported feature "' + featureId + '"');                           // 284
      for (var i = 0, ii = listeners.length; i < ii; i++) {                      // 285
        listeners[i](featureId);                                                 // 286
      }                                                                          // 287
    }                                                                            // 288
  };                                                                             // 289
})();                                                                            // 290
                                                                                 // 291
// Combines two URLs. The baseUrl shall be absolute URL. If the url is an        // 292
// absolute URL, it will be returned as is.                                      // 293
function combineUrl(baseUrl, url) {                                              // 294
  if (!url) {                                                                    // 295
    return baseUrl;                                                              // 296
  }                                                                              // 297
  if (/^[a-z][a-z0-9+\-.]*:/i.test(url)) {                                       // 298
    return url;                                                                  // 299
  }                                                                              // 300
  var i;                                                                         // 301
  if (url.charAt(0) === '/') {                                                   // 302
    // absolute path                                                             // 303
    i = baseUrl.indexOf('://');                                                  // 304
    if (url.charAt(1) === '/') {                                                 // 305
      ++i;                                                                       // 306
    } else {                                                                     // 307
      i = baseUrl.indexOf('/', i + 3);                                           // 308
    }                                                                            // 309
    return baseUrl.substring(0, i) + url;                                        // 310
  } else {                                                                       // 311
    // relative path                                                             // 312
    var pathLength = baseUrl.length;                                             // 313
    i = baseUrl.lastIndexOf('#');                                                // 314
    pathLength = i >= 0 ? i : pathLength;                                        // 315
    i = baseUrl.lastIndexOf('?', pathLength);                                    // 316
    pathLength = i >= 0 ? i : pathLength;                                        // 317
    var prefixLength = baseUrl.lastIndexOf('/', pathLength);                     // 318
    return baseUrl.substring(0, prefixLength + 1) + url;                         // 319
  }                                                                              // 320
}                                                                                // 321
                                                                                 // 322
// Validates if URL is safe and allowed, e.g. to avoid XSS.                      // 323
function isValidUrl(url, allowRelative) {                                        // 324
  if (!url) {                                                                    // 325
    return false;                                                                // 326
  }                                                                              // 327
  // RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)                   // 328
  // scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )                         // 329
  var protocol = /^[a-z][a-z0-9+\-.]*(?=:)/i.exec(url);                          // 330
  if (!protocol) {                                                               // 331
    return allowRelative;                                                        // 332
  }                                                                              // 333
  protocol = protocol[0].toLowerCase();                                          // 334
  switch (protocol) {                                                            // 335
    case 'http':                                                                 // 336
    case 'https':                                                                // 337
    case 'ftp':                                                                  // 338
    case 'mailto':                                                               // 339
    case 'tel':                                                                  // 340
      return true;                                                               // 341
    default:                                                                     // 342
      return false;                                                              // 343
  }                                                                              // 344
}                                                                                // 345
PDFJS.isValidUrl = isValidUrl;                                                   // 346
                                                                                 // 347
function shadow(obj, prop, value) {                                              // 348
  Object.defineProperty(obj, prop, { value: value,                               // 349
                                     enumerable: true,                           // 350
                                     configurable: true,                         // 351
                                     writable: false });                         // 352
  return value;                                                                  // 353
}                                                                                // 354
PDFJS.shadow = shadow;                                                           // 355
                                                                                 // 356
var PasswordResponses = PDFJS.PasswordResponses = {                              // 357
  NEED_PASSWORD: 1,                                                              // 358
  INCORRECT_PASSWORD: 2                                                          // 359
};                                                                               // 360
                                                                                 // 361
var PasswordException = (function PasswordExceptionClosure() {                   // 362
  function PasswordException(msg, code) {                                        // 363
    this.name = 'PasswordException';                                             // 364
    this.message = msg;                                                          // 365
    this.code = code;                                                            // 366
  }                                                                              // 367
                                                                                 // 368
  PasswordException.prototype = new Error();                                     // 369
  PasswordException.constructor = PasswordException;                             // 370
                                                                                 // 371
  return PasswordException;                                                      // 372
})();                                                                            // 373
PDFJS.PasswordException = PasswordException;                                     // 374
                                                                                 // 375
var UnknownErrorException = (function UnknownErrorExceptionClosure() {           // 376
  function UnknownErrorException(msg, details) {                                 // 377
    this.name = 'UnknownErrorException';                                         // 378
    this.message = msg;                                                          // 379
    this.details = details;                                                      // 380
  }                                                                              // 381
                                                                                 // 382
  UnknownErrorException.prototype = new Error();                                 // 383
  UnknownErrorException.constructor = UnknownErrorException;                     // 384
                                                                                 // 385
  return UnknownErrorException;                                                  // 386
})();                                                                            // 387
PDFJS.UnknownErrorException = UnknownErrorException;                             // 388
                                                                                 // 389
var InvalidPDFException = (function InvalidPDFExceptionClosure() {               // 390
  function InvalidPDFException(msg) {                                            // 391
    this.name = 'InvalidPDFException';                                           // 392
    this.message = msg;                                                          // 393
  }                                                                              // 394
                                                                                 // 395
  InvalidPDFException.prototype = new Error();                                   // 396
  InvalidPDFException.constructor = InvalidPDFException;                         // 397
                                                                                 // 398
  return InvalidPDFException;                                                    // 399
})();                                                                            // 400
PDFJS.InvalidPDFException = InvalidPDFException;                                 // 401
                                                                                 // 402
var MissingPDFException = (function MissingPDFExceptionClosure() {               // 403
  function MissingPDFException(msg) {                                            // 404
    this.name = 'MissingPDFException';                                           // 405
    this.message = msg;                                                          // 406
  }                                                                              // 407
                                                                                 // 408
  MissingPDFException.prototype = new Error();                                   // 409
  MissingPDFException.constructor = MissingPDFException;                         // 410
                                                                                 // 411
  return MissingPDFException;                                                    // 412
})();                                                                            // 413
PDFJS.MissingPDFException = MissingPDFException;                                 // 414
                                                                                 // 415
var UnexpectedResponseException =                                                // 416
    (function UnexpectedResponseExceptionClosure() {                             // 417
  function UnexpectedResponseException(msg, status) {                            // 418
    this.name = 'UnexpectedResponseException';                                   // 419
    this.message = msg;                                                          // 420
    this.status = status;                                                        // 421
  }                                                                              // 422
                                                                                 // 423
  UnexpectedResponseException.prototype = new Error();                           // 424
  UnexpectedResponseException.constructor = UnexpectedResponseException;         // 425
                                                                                 // 426
  return UnexpectedResponseException;                                            // 427
})();                                                                            // 428
PDFJS.UnexpectedResponseException = UnexpectedResponseException;                 // 429
                                                                                 // 430
var NotImplementedException = (function NotImplementedExceptionClosure() {       // 431
  function NotImplementedException(msg) {                                        // 432
    this.message = msg;                                                          // 433
  }                                                                              // 434
                                                                                 // 435
  NotImplementedException.prototype = new Error();                               // 436
  NotImplementedException.prototype.name = 'NotImplementedException';            // 437
  NotImplementedException.constructor = NotImplementedException;                 // 438
                                                                                 // 439
  return NotImplementedException;                                                // 440
})();                                                                            // 441
                                                                                 // 442
var MissingDataException = (function MissingDataExceptionClosure() {             // 443
  function MissingDataException(begin, end) {                                    // 444
    this.begin = begin;                                                          // 445
    this.end = end;                                                              // 446
    this.message = 'Missing data [' + begin + ', ' + end + ')';                  // 447
  }                                                                              // 448
                                                                                 // 449
  MissingDataException.prototype = new Error();                                  // 450
  MissingDataException.prototype.name = 'MissingDataException';                  // 451
  MissingDataException.constructor = MissingDataException;                       // 452
                                                                                 // 453
  return MissingDataException;                                                   // 454
})();                                                                            // 455
                                                                                 // 456
var XRefParseException = (function XRefParseExceptionClosure() {                 // 457
  function XRefParseException(msg) {                                             // 458
    this.message = msg;                                                          // 459
  }                                                                              // 460
                                                                                 // 461
  XRefParseException.prototype = new Error();                                    // 462
  XRefParseException.prototype.name = 'XRefParseException';                      // 463
  XRefParseException.constructor = XRefParseException;                           // 464
                                                                                 // 465
  return XRefParseException;                                                     // 466
})();                                                                            // 467
                                                                                 // 468
                                                                                 // 469
function bytesToString(bytes) {                                                  // 470
  assert(bytes !== null && typeof bytes === 'object' &&                          // 471
         bytes.length !== undefined, 'Invalid argument for bytesToString');      // 472
  var length = bytes.length;                                                     // 473
  var MAX_ARGUMENT_COUNT = 8192;                                                 // 474
  if (length < MAX_ARGUMENT_COUNT) {                                             // 475
    return String.fromCharCode.apply(null, bytes);                               // 476
  }                                                                              // 477
  var strBuf = [];                                                               // 478
  for (var i = 0; i < length; i += MAX_ARGUMENT_COUNT) {                         // 479
    var chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);                     // 480
    var chunk = bytes.subarray(i, chunkEnd);                                     // 481
    strBuf.push(String.fromCharCode.apply(null, chunk));                         // 482
  }                                                                              // 483
  return strBuf.join('');                                                        // 484
}                                                                                // 485
                                                                                 // 486
function stringToBytes(str) {                                                    // 487
  assert(typeof str === 'string', 'Invalid argument for stringToBytes');         // 488
  var length = str.length;                                                       // 489
  var bytes = new Uint8Array(length);                                            // 490
  for (var i = 0; i < length; ++i) {                                             // 491
    bytes[i] = str.charCodeAt(i) & 0xFF;                                         // 492
  }                                                                              // 493
  return bytes;                                                                  // 494
}                                                                                // 495
                                                                                 // 496
function string32(value) {                                                       // 497
  return String.fromCharCode((value >> 24) & 0xff, (value >> 16) & 0xff,         // 498
                             (value >> 8) & 0xff, value & 0xff);                 // 499
}                                                                                // 500
                                                                                 // 501
function log2(x) {                                                               // 502
  var n = 1, i = 0;                                                              // 503
  while (x > n) {                                                                // 504
    n <<= 1;                                                                     // 505
    i++;                                                                         // 506
  }                                                                              // 507
  return i;                                                                      // 508
}                                                                                // 509
                                                                                 // 510
function readInt8(data, start) {                                                 // 511
  return (data[start] << 24) >> 24;                                              // 512
}                                                                                // 513
                                                                                 // 514
function readUint16(data, offset) {                                              // 515
  return (data[offset] << 8) | data[offset + 1];                                 // 516
}                                                                                // 517
                                                                                 // 518
function readUint32(data, offset) {                                              // 519
  return ((data[offset] << 24) | (data[offset + 1] << 16) |                      // 520
         (data[offset + 2] << 8) | data[offset + 3]) >>> 0;                      // 521
}                                                                                // 522
                                                                                 // 523
// Lazy test the endianness of the platform                                      // 524
// NOTE: This will be 'true' for simulated TypedArrays                           // 525
function isLittleEndian() {                                                      // 526
  var buffer8 = new Uint8Array(2);                                               // 527
  buffer8[0] = 1;                                                                // 528
  var buffer16 = new Uint16Array(buffer8.buffer);                                // 529
  return (buffer16[0] === 1);                                                    // 530
}                                                                                // 531
                                                                                 // 532
Object.defineProperty(PDFJS, 'isLittleEndian', {                                 // 533
  configurable: true,                                                            // 534
  get: function PDFJS_isLittleEndian() {                                         // 535
    return shadow(PDFJS, 'isLittleEndian', isLittleEndian());                    // 536
  }                                                                              // 537
});                                                                              // 538
                                                                                 // 539
  // Lazy test if the userAgant support CanvasTypedArrays                        // 540
function hasCanvasTypedArrays() {                                                // 541
  var canvas = document.createElement('canvas');                                 // 542
  canvas.width = canvas.height = 1;                                              // 543
  var ctx = canvas.getContext('2d');                                             // 544
  var imageData = ctx.createImageData(1, 1);                                     // 545
  return (typeof imageData.data.buffer !== 'undefined');                         // 546
}                                                                                // 547
                                                                                 // 548
Object.defineProperty(PDFJS, 'hasCanvasTypedArrays', {                           // 549
  configurable: true,                                                            // 550
  get: function PDFJS_hasCanvasTypedArrays() {                                   // 551
    return shadow(PDFJS, 'hasCanvasTypedArrays', hasCanvasTypedArrays());        // 552
  }                                                                              // 553
});                                                                              // 554
                                                                                 // 555
var Uint32ArrayView = (function Uint32ArrayViewClosure() {                       // 556
                                                                                 // 557
  function Uint32ArrayView(buffer, length) {                                     // 558
    this.buffer = buffer;                                                        // 559
    this.byteLength = buffer.length;                                             // 560
    this.length = length === undefined ? (this.byteLength >> 2) : length;        // 561
    ensureUint32ArrayViewProps(this.length);                                     // 562
  }                                                                              // 563
  Uint32ArrayView.prototype = Object.create(null);                               // 564
                                                                                 // 565
  var uint32ArrayViewSetters = 0;                                                // 566
  function createUint32ArrayProp(index) {                                        // 567
    return {                                                                     // 568
      get: function () {                                                         // 569
        var buffer = this.buffer, offset = index << 2;                           // 570
        return (buffer[offset] | (buffer[offset + 1] << 8) |                     // 571
          (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24)) >>> 0;        // 572
      },                                                                         // 573
      set: function (value) {                                                    // 574
        var buffer = this.buffer, offset = index << 2;                           // 575
        buffer[offset] = value & 255;                                            // 576
        buffer[offset + 1] = (value >> 8) & 255;                                 // 577
        buffer[offset + 2] = (value >> 16) & 255;                                // 578
        buffer[offset + 3] = (value >>> 24) & 255;                               // 579
      }                                                                          // 580
    };                                                                           // 581
  }                                                                              // 582
                                                                                 // 583
  function ensureUint32ArrayViewProps(length) {                                  // 584
    while (uint32ArrayViewSetters < length) {                                    // 585
      Object.defineProperty(Uint32ArrayView.prototype,                           // 586
        uint32ArrayViewSetters,                                                  // 587
        createUint32ArrayProp(uint32ArrayViewSetters));                          // 588
      uint32ArrayViewSetters++;                                                  // 589
    }                                                                            // 590
  }                                                                              // 591
                                                                                 // 592
  return Uint32ArrayView;                                                        // 593
})();                                                                            // 594
                                                                                 // 595
var IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];                                        // 596
                                                                                 // 597
var Util = PDFJS.Util = (function UtilClosure() {                                // 598
  function Util() {}                                                             // 599
                                                                                 // 600
  var rgbBuf = ['rgb(', 0, ',', 0, ',', 0, ')'];                                 // 601
                                                                                 // 602
  // makeCssRgb() can be called thousands of times. Using |rgbBuf| avoids        // 603
  // creating many intermediate strings.                                         // 604
  Util.makeCssRgb = function Util_makeCssRgb(r, g, b) {                          // 605
    rgbBuf[1] = r;                                                               // 606
    rgbBuf[3] = g;                                                               // 607
    rgbBuf[5] = b;                                                               // 608
    return rgbBuf.join('');                                                      // 609
  };                                                                             // 610
                                                                                 // 611
  // Concatenates two transformation matrices together and returns the result.   // 612
  Util.transform = function Util_transform(m1, m2) {                             // 613
    return [                                                                     // 614
      m1[0] * m2[0] + m1[2] * m2[1],                                             // 615
      m1[1] * m2[0] + m1[3] * m2[1],                                             // 616
      m1[0] * m2[2] + m1[2] * m2[3],                                             // 617
      m1[1] * m2[2] + m1[3] * m2[3],                                             // 618
      m1[0] * m2[4] + m1[2] * m2[5] + m1[4],                                     // 619
      m1[1] * m2[4] + m1[3] * m2[5] + m1[5]                                      // 620
    ];                                                                           // 621
  };                                                                             // 622
                                                                                 // 623
  // For 2d affine transforms                                                    // 624
  Util.applyTransform = function Util_applyTransform(p, m) {                     // 625
    var xt = p[0] * m[0] + p[1] * m[2] + m[4];                                   // 626
    var yt = p[0] * m[1] + p[1] * m[3] + m[5];                                   // 627
    return [xt, yt];                                                             // 628
  };                                                                             // 629
                                                                                 // 630
  Util.applyInverseTransform = function Util_applyInverseTransform(p, m) {       // 631
    var d = m[0] * m[3] - m[1] * m[2];                                           // 632
    var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;        // 633
    var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;       // 634
    return [xt, yt];                                                             // 635
  };                                                                             // 636
                                                                                 // 637
  // Applies the transform to the rectangle and finds the minimum axially        // 638
  // aligned bounding box.                                                       // 639
  Util.getAxialAlignedBoundingBox =                                              // 640
    function Util_getAxialAlignedBoundingBox(r, m) {                             // 641
                                                                                 // 642
    var p1 = Util.applyTransform(r, m);                                          // 643
    var p2 = Util.applyTransform(r.slice(2, 4), m);                              // 644
    var p3 = Util.applyTransform([r[0], r[3]], m);                               // 645
    var p4 = Util.applyTransform([r[2], r[1]], m);                               // 646
    return [                                                                     // 647
      Math.min(p1[0], p2[0], p3[0], p4[0]),                                      // 648
      Math.min(p1[1], p2[1], p3[1], p4[1]),                                      // 649
      Math.max(p1[0], p2[0], p3[0], p4[0]),                                      // 650
      Math.max(p1[1], p2[1], p3[1], p4[1])                                       // 651
    ];                                                                           // 652
  };                                                                             // 653
                                                                                 // 654
  Util.inverseTransform = function Util_inverseTransform(m) {                    // 655
    var d = m[0] * m[3] - m[1] * m[2];                                           // 656
    return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d,                            // 657
      (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];         // 658
  };                                                                             // 659
                                                                                 // 660
  // Apply a generic 3d matrix M on a 3-vector v:                                // 661
  //   | a b c |   | X |                                                         // 662
  //   | d e f | x | Y |                                                         // 663
  //   | g h i |   | Z |                                                         // 664
  // M is assumed to be serialized as [a,b,c,d,e,f,g,h,i],                       // 665
  // with v as [X,Y,Z]                                                           // 666
  Util.apply3dTransform = function Util_apply3dTransform(m, v) {                 // 667
    return [                                                                     // 668
      m[0] * v[0] + m[1] * v[1] + m[2] * v[2],                                   // 669
      m[3] * v[0] + m[4] * v[1] + m[5] * v[2],                                   // 670
      m[6] * v[0] + m[7] * v[1] + m[8] * v[2]                                    // 671
    ];                                                                           // 672
  };                                                                             // 673
                                                                                 // 674
  // This calculation uses Singular Value Decomposition.                         // 675
  // The SVD can be represented with formula A = USV. We are interested in the   // 676
  // matrix S here because it represents the scale values.                       // 677
  Util.singularValueDecompose2dScale =                                           // 678
    function Util_singularValueDecompose2dScale(m) {                             // 679
                                                                                 // 680
    var transpose = [m[0], m[2], m[1], m[3]];                                    // 681
                                                                                 // 682
    // Multiply matrix m with its transpose.                                     // 683
    var a = m[0] * transpose[0] + m[1] * transpose[2];                           // 684
    var b = m[0] * transpose[1] + m[1] * transpose[3];                           // 685
    var c = m[2] * transpose[0] + m[3] * transpose[2];                           // 686
    var d = m[2] * transpose[1] + m[3] * transpose[3];                           // 687
                                                                                 // 688
    // Solve the second degree polynomial to get roots.                          // 689
    var first = (a + d) / 2;                                                     // 690
    var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;         // 691
    var sx = first + second || 1;                                                // 692
    var sy = first - second || 1;                                                // 693
                                                                                 // 694
    // Scale values are the square roots of the eigenvalues.                     // 695
    return [Math.sqrt(sx), Math.sqrt(sy)];                                       // 696
  };                                                                             // 697
                                                                                 // 698
  // Normalize rectangle rect=[x1, y1, x2, y2] so that (x1,y1) < (x2,y2)         // 699
  // For coordinate systems whose origin lies in the bottom-left, this           // 700
  // means normalization to (BL,TR) ordering. For systems with origin in the     // 701
  // top-left, this means (TL,BR) ordering.                                      // 702
  Util.normalizeRect = function Util_normalizeRect(rect) {                       // 703
    var r = rect.slice(0); // clone rect                                         // 704
    if (rect[0] > rect[2]) {                                                     // 705
      r[0] = rect[2];                                                            // 706
      r[2] = rect[0];                                                            // 707
    }                                                                            // 708
    if (rect[1] > rect[3]) {                                                     // 709
      r[1] = rect[3];                                                            // 710
      r[3] = rect[1];                                                            // 711
    }                                                                            // 712
    return r;                                                                    // 713
  };                                                                             // 714
                                                                                 // 715
  // Returns a rectangle [x1, y1, x2, y2] corresponding to the                   // 716
  // intersection of rect1 and rect2. If no intersection, returns 'false'        // 717
  // The rectangle coordinates of rect1, rect2 should be [x1, y1, x2, y2]        // 718
  Util.intersect = function Util_intersect(rect1, rect2) {                       // 719
    function compare(a, b) {                                                     // 720
      return a - b;                                                              // 721
    }                                                                            // 722
                                                                                 // 723
    // Order points along the axes                                               // 724
    var orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare),       // 725
        orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare),       // 726
        result = [];                                                             // 727
                                                                                 // 728
    rect1 = Util.normalizeRect(rect1);                                           // 729
    rect2 = Util.normalizeRect(rect2);                                           // 730
                                                                                 // 731
    // X: first and second points belong to different rectangles?                // 732
    if ((orderedX[0] === rect1[0] && orderedX[1] === rect2[0]) ||                // 733
        (orderedX[0] === rect2[0] && orderedX[1] === rect1[0])) {                // 734
      // Intersection must be between second and third points                    // 735
      result[0] = orderedX[1];                                                   // 736
      result[2] = orderedX[2];                                                   // 737
    } else {                                                                     // 738
      return false;                                                              // 739
    }                                                                            // 740
                                                                                 // 741
    // Y: first and second points belong to different rectangles?                // 742
    if ((orderedY[0] === rect1[1] && orderedY[1] === rect2[1]) ||                // 743
        (orderedY[0] === rect2[1] && orderedY[1] === rect1[1])) {                // 744
      // Intersection must be between second and third points                    // 745
      result[1] = orderedY[1];                                                   // 746
      result[3] = orderedY[2];                                                   // 747
    } else {                                                                     // 748
      return false;                                                              // 749
    }                                                                            // 750
                                                                                 // 751
    return result;                                                               // 752
  };                                                                             // 753
                                                                                 // 754
  Util.sign = function Util_sign(num) {                                          // 755
    return num < 0 ? -1 : 1;                                                     // 756
  };                                                                             // 757
                                                                                 // 758
  Util.appendToArray = function Util_appendToArray(arr1, arr2) {                 // 759
    Array.prototype.push.apply(arr1, arr2);                                      // 760
  };                                                                             // 761
                                                                                 // 762
  Util.prependToArray = function Util_prependToArray(arr1, arr2) {               // 763
    Array.prototype.unshift.apply(arr1, arr2);                                   // 764
  };                                                                             // 765
                                                                                 // 766
  Util.extendObj = function extendObj(obj1, obj2) {                              // 767
    for (var key in obj2) {                                                      // 768
      obj1[key] = obj2[key];                                                     // 769
    }                                                                            // 770
  };                                                                             // 771
                                                                                 // 772
  Util.getInheritableProperty = function Util_getInheritableProperty(dict,       // 773
                                                                     name) {     // 774
    while (dict && !dict.has(name)) {                                            // 775
      dict = dict.get('Parent');                                                 // 776
    }                                                                            // 777
    if (!dict) {                                                                 // 778
      return null;                                                               // 779
    }                                                                            // 780
    return dict.get(name);                                                       // 781
  };                                                                             // 782
                                                                                 // 783
  Util.inherit = function Util_inherit(sub, base, prototype) {                   // 784
    sub.prototype = Object.create(base.prototype);                               // 785
    sub.prototype.constructor = sub;                                             // 786
    for (var prop in prototype) {                                                // 787
      sub.prototype[prop] = prototype[prop];                                     // 788
    }                                                                            // 789
  };                                                                             // 790
                                                                                 // 791
  Util.loadScript = function Util_loadScript(src, callback) {                    // 792
    var script = document.createElement('script');                               // 793
    var loaded = false;                                                          // 794
    script.setAttribute('src', src);                                             // 795
    if (callback) {                                                              // 796
      script.onload = function() {                                               // 797
        if (!loaded) {                                                           // 798
          callback();                                                            // 799
        }                                                                        // 800
        loaded = true;                                                           // 801
      };                                                                         // 802
    }                                                                            // 803
    document.getElementsByTagName('head')[0].appendChild(script);                // 804
  };                                                                             // 805
                                                                                 // 806
  return Util;                                                                   // 807
})();                                                                            // 808
                                                                                 // 809
/**                                                                              // 810
 * PDF page viewport created based on scale, rotation and offset.                // 811
 * @class                                                                        // 812
 * @alias PDFJS.PageViewport                                                     // 813
 */                                                                              // 814
var PageViewport = PDFJS.PageViewport = (function PageViewportClosure() {        // 815
  /**                                                                            // 816
   * @constructor                                                                // 817
   * @private                                                                    // 818
   * @param viewBox {Array} xMin, yMin, xMax and yMax coordinates.               // 819
   * @param scale {number} scale of the viewport.                                // 820
   * @param rotation {number} rotations of the viewport in degrees.              // 821
   * @param offsetX {number} offset X                                            // 822
   * @param offsetY {number} offset Y                                            // 823
   * @param dontFlip {boolean} if true, axis Y will not be flipped.              // 824
   */                                                                            // 825
  function PageViewport(viewBox, scale, rotation, offsetX, offsetY, dontFlip) {  // 826
    this.viewBox = viewBox;                                                      // 827
    this.scale = scale;                                                          // 828
    this.rotation = rotation;                                                    // 829
    this.offsetX = offsetX;                                                      // 830
    this.offsetY = offsetY;                                                      // 831
                                                                                 // 832
    // creating transform to convert pdf coordinate system to the normal         // 833
    // canvas like coordinates taking in account scale and rotation              // 834
    var centerX = (viewBox[2] + viewBox[0]) / 2;                                 // 835
    var centerY = (viewBox[3] + viewBox[1]) / 2;                                 // 836
    var rotateA, rotateB, rotateC, rotateD;                                      // 837
    rotation = rotation % 360;                                                   // 838
    rotation = rotation < 0 ? rotation + 360 : rotation;                         // 839
    switch (rotation) {                                                          // 840
      case 180:                                                                  // 841
        rotateA = -1; rotateB = 0; rotateC = 0; rotateD = 1;                     // 842
        break;                                                                   // 843
      case 90:                                                                   // 844
        rotateA = 0; rotateB = 1; rotateC = 1; rotateD = 0;                      // 845
        break;                                                                   // 846
      case 270:                                                                  // 847
        rotateA = 0; rotateB = -1; rotateC = -1; rotateD = 0;                    // 848
        break;                                                                   // 849
      //case 0:                                                                  // 850
      default:                                                                   // 851
        rotateA = 1; rotateB = 0; rotateC = 0; rotateD = -1;                     // 852
        break;                                                                   // 853
    }                                                                            // 854
                                                                                 // 855
    if (dontFlip) {                                                              // 856
      rotateC = -rotateC; rotateD = -rotateD;                                    // 857
    }                                                                            // 858
                                                                                 // 859
    var offsetCanvasX, offsetCanvasY;                                            // 860
    var width, height;                                                           // 861
    if (rotateA === 0) {                                                         // 862
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;          // 863
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;          // 864
      width = Math.abs(viewBox[3] - viewBox[1]) * scale;                         // 865
      height = Math.abs(viewBox[2] - viewBox[0]) * scale;                        // 866
    } else {                                                                     // 867
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;          // 868
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;          // 869
      width = Math.abs(viewBox[2] - viewBox[0]) * scale;                         // 870
      height = Math.abs(viewBox[3] - viewBox[1]) * scale;                        // 871
    }                                                                            // 872
    // creating transform for the following operations:                          // 873
    // translate(-centerX, -centerY), rotate and flip vertically,                // 874
    // scale, and translate(offsetCanvasX, offsetCanvasY)                        // 875
    this.transform = [                                                           // 876
      rotateA * scale,                                                           // 877
      rotateB * scale,                                                           // 878
      rotateC * scale,                                                           // 879
      rotateD * scale,                                                           // 880
      offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY,     // 881
      offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY      // 882
    ];                                                                           // 883
                                                                                 // 884
    this.width = width;                                                          // 885
    this.height = height;                                                        // 886
    this.fontScale = scale;                                                      // 887
  }                                                                              // 888
  PageViewport.prototype = /** @lends PDFJS.PageViewport.prototype */ {          // 889
    /**                                                                          // 890
     * Clones viewport with additional properties.                               // 891
     * @param args {Object} (optional) If specified, may contain the 'scale' or  // 892
     * 'rotation' properties to override the corresponding properties in         // 893
     * the cloned viewport.                                                      // 894
     * @returns {PDFJS.PageViewport} Cloned viewport.                            // 895
     */                                                                          // 896
    clone: function PageViewPort_clone(args) {                                   // 897
      args = args || {};                                                         // 898
      var scale = 'scale' in args ? args.scale : this.scale;                     // 899
      var rotation = 'rotation' in args ? args.rotation : this.rotation;         // 900
      return new PageViewport(this.viewBox.slice(), scale, rotation,             // 901
                              this.offsetX, this.offsetY, args.dontFlip);        // 902
    },                                                                           // 903
    /**                                                                          // 904
     * Converts PDF point to the viewport coordinates. For examples, useful for  // 905
     * converting PDF location into canvas pixel coordinates.                    // 906
     * @param x {number} X coordinate.                                           // 907
     * @param y {number} Y coordinate.                                           // 908
     * @returns {Object} Object that contains 'x' and 'y' properties of the      // 909
     * point in the viewport coordinate space.                                   // 910
     * @see {@link convertToPdfPoint}                                            // 911
     * @see {@link convertToViewportRectangle}                                   // 912
     */                                                                          // 913
    convertToViewportPoint: function PageViewport_convertToViewportPoint(x, y) { // 914
      return Util.applyTransform([x, y], this.transform);                        // 915
    },                                                                           // 916
    /**                                                                          // 917
     * Converts PDF rectangle to the viewport coordinates.                       // 918
     * @param rect {Array} xMin, yMin, xMax and yMax coordinates.                // 919
     * @returns {Array} Contains corresponding coordinates of the rectangle      // 920
     * in the viewport coordinate space.                                         // 921
     * @see {@link convertToViewportPoint}                                       // 922
     */                                                                          // 923
    convertToViewportRectangle:                                                  // 924
      function PageViewport_convertToViewportRectangle(rect) {                   // 925
      var tl = Util.applyTransform([rect[0], rect[1]], this.transform);          // 926
      var br = Util.applyTransform([rect[2], rect[3]], this.transform);          // 927
      return [tl[0], tl[1], br[0], br[1]];                                       // 928
    },                                                                           // 929
    /**                                                                          // 930
     * Converts viewport coordinates to the PDF location. For examples, useful   // 931
     * for converting canvas pixel location into PDF one.                        // 932
     * @param x {number} X coordinate.                                           // 933
     * @param y {number} Y coordinate.                                           // 934
     * @returns {Object} Object that contains 'x' and 'y' properties of the      // 935
     * point in the PDF coordinate space.                                        // 936
     * @see {@link convertToViewportPoint}                                       // 937
     */                                                                          // 938
    convertToPdfPoint: function PageViewport_convertToPdfPoint(x, y) {           // 939
      return Util.applyInverseTransform([x, y], this.transform);                 // 940
    }                                                                            // 941
  };                                                                             // 942
  return PageViewport;                                                           // 943
})();                                                                            // 944
                                                                                 // 945
var PDFStringTranslateTable = [                                                  // 946
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,        // 947
  0x2D8, 0x2C7, 0x2C6, 0x2D9, 0x2DD, 0x2DB, 0x2DA, 0x2DC, 0, 0, 0, 0, 0, 0, 0,   // 948
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 949
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 950
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 951
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014,       // 952
  0x2013, 0x192, 0x2044, 0x2039, 0x203A, 0x2212, 0x2030, 0x201E, 0x201C,         // 953
  0x201D, 0x2018, 0x2019, 0x201A, 0x2122, 0xFB01, 0xFB02, 0x141, 0x152, 0x160,   // 954
  0x178, 0x17D, 0x131, 0x142, 0x153, 0x161, 0x17E, 0, 0x20AC                     // 955
];                                                                               // 956
                                                                                 // 957
function stringToPDFString(str) {                                                // 958
  var i, n = str.length, strBuf = [];                                            // 959
  if (str[0] === '\xFE' && str[1] === '\xFF') {                                  // 960
    // UTF16BE BOM                                                               // 961
    for (i = 2; i < n; i += 2) {                                                 // 962
      strBuf.push(String.fromCharCode(                                           // 963
        (str.charCodeAt(i) << 8) | str.charCodeAt(i + 1)));                      // 964
    }                                                                            // 965
  } else {                                                                       // 966
    for (i = 0; i < n; ++i) {                                                    // 967
      var code = PDFStringTranslateTable[str.charCodeAt(i)];                     // 968
      strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));             // 969
    }                                                                            // 970
  }                                                                              // 971
  return strBuf.join('');                                                        // 972
}                                                                                // 973
                                                                                 // 974
function stringToUTF8String(str) {                                               // 975
  return decodeURIComponent(escape(str));                                        // 976
}                                                                                // 977
                                                                                 // 978
function isEmptyObj(obj) {                                                       // 979
  for (var key in obj) {                                                         // 980
    return false;                                                                // 981
  }                                                                              // 982
  return true;                                                                   // 983
}                                                                                // 984
                                                                                 // 985
function isBool(v) {                                                             // 986
  return typeof v === 'boolean';                                                 // 987
}                                                                                // 988
                                                                                 // 989
function isInt(v) {                                                              // 990
  return typeof v === 'number' && ((v | 0) === v);                               // 991
}                                                                                // 992
                                                                                 // 993
function isNum(v) {                                                              // 994
  return typeof v === 'number';                                                  // 995
}                                                                                // 996
                                                                                 // 997
function isString(v) {                                                           // 998
  return typeof v === 'string';                                                  // 999
}                                                                                // 1000
                                                                                 // 1001
function isName(v) {                                                             // 1002
  return v instanceof Name;                                                      // 1003
}                                                                                // 1004
                                                                                 // 1005
function isCmd(v, cmd) {                                                         // 1006
  return v instanceof Cmd && (cmd === undefined || v.cmd === cmd);               // 1007
}                                                                                // 1008
                                                                                 // 1009
function isDict(v, type) {                                                       // 1010
  if (!(v instanceof Dict)) {                                                    // 1011
    return false;                                                                // 1012
  }                                                                              // 1013
  if (!type) {                                                                   // 1014
    return true;                                                                 // 1015
  }                                                                              // 1016
  var dictType = v.get('Type');                                                  // 1017
  return isName(dictType) && dictType.name === type;                             // 1018
}                                                                                // 1019
                                                                                 // 1020
function isArray(v) {                                                            // 1021
  return v instanceof Array;                                                     // 1022
}                                                                                // 1023
                                                                                 // 1024
function isStream(v) {                                                           // 1025
  return typeof v === 'object' && v !== null && v.getBytes !== undefined;        // 1026
}                                                                                // 1027
                                                                                 // 1028
function isArrayBuffer(v) {                                                      // 1029
  return typeof v === 'object' && v !== null && v.byteLength !== undefined;      // 1030
}                                                                                // 1031
                                                                                 // 1032
function isRef(v) {                                                              // 1033
  return v instanceof Ref;                                                       // 1034
}                                                                                // 1035
                                                                                 // 1036
/**                                                                              // 1037
 * Promise Capability object.                                                    // 1038
 *                                                                               // 1039
 * @typedef {Object} PromiseCapability                                           // 1040
 * @property {Promise} promise - A promise object.                               // 1041
 * @property {function} resolve - Fullfills the promise.                         // 1042
 * @property {function} reject - Rejects the promise.                            // 1043
 */                                                                              // 1044
                                                                                 // 1045
/**                                                                              // 1046
 * Creates a promise capability object.                                          // 1047
 * @alias PDFJS.createPromiseCapability                                          // 1048
 *                                                                               // 1049
 * @return {PromiseCapability} A capability object contains:                     // 1050
 * - a Promise, resolve and reject methods.                                      // 1051
 */                                                                              // 1052
function createPromiseCapability() {                                             // 1053
  var capability = {};                                                           // 1054
  capability.promise = new Promise(function (resolve, reject) {                  // 1055
    capability.resolve = resolve;                                                // 1056
    capability.reject = reject;                                                  // 1057
  });                                                                            // 1058
  return capability;                                                             // 1059
}                                                                                // 1060
                                                                                 // 1061
PDFJS.createPromiseCapability = createPromiseCapability;                         // 1062
                                                                                 // 1063
/**                                                                              // 1064
 * Polyfill for Promises:                                                        // 1065
 * The following promise implementation tries to generally implement the         // 1066
 * Promise/A+ spec. Some notable differences from other promise libaries are:    // 1067
 * - There currently isn't a seperate deferred and promise object.               // 1068
 * - Unhandled rejections eventually show an error if they aren't handled.       // 1069
 *                                                                               // 1070
 * Based off of the work in:                                                     // 1071
 * https://bugzilla.mozilla.org/show_bug.cgi?id=810490                           // 1072
 */                                                                              // 1073
(function PromiseClosure() {                                                     // 1074
  if (globalScope.Promise) {                                                     // 1075
    // Promises existing in the DOM/Worker, checking presence of all/resolve     // 1076
    if (typeof globalScope.Promise.all !== 'function') {                         // 1077
      globalScope.Promise.all = function (iterable) {                            // 1078
        var count = 0, results = [], resolve, reject;                            // 1079
        var promise = new globalScope.Promise(function (resolve_, reject_) {     // 1080
          resolve = resolve_;                                                    // 1081
          reject = reject_;                                                      // 1082
        });                                                                      // 1083
        iterable.forEach(function (p, i) {                                       // 1084
          count++;                                                               // 1085
          p.then(function (result) {                                             // 1086
            results[i] = result;                                                 // 1087
            count--;                                                             // 1088
            if (count === 0) {                                                   // 1089
              resolve(results);                                                  // 1090
            }                                                                    // 1091
          }, reject);                                                            // 1092
        });                                                                      // 1093
        if (count === 0) {                                                       // 1094
          resolve(results);                                                      // 1095
        }                                                                        // 1096
        return promise;                                                          // 1097
      };                                                                         // 1098
    }                                                                            // 1099
    if (typeof globalScope.Promise.resolve !== 'function') {                     // 1100
      globalScope.Promise.resolve = function (value) {                           // 1101
        return new globalScope.Promise(function (resolve) { resolve(value); });  // 1102
      };                                                                         // 1103
    }                                                                            // 1104
    if (typeof globalScope.Promise.reject !== 'function') {                      // 1105
      globalScope.Promise.reject = function (reason) {                           // 1106
        return new globalScope.Promise(function (resolve, reject) {              // 1107
          reject(reason);                                                        // 1108
        });                                                                      // 1109
      };                                                                         // 1110
    }                                                                            // 1111
    if (typeof globalScope.Promise.prototype.catch !== 'function') {             // 1112
      globalScope.Promise.prototype.catch = function (onReject) {                // 1113
        return globalScope.Promise.prototype.then(undefined, onReject);          // 1114
      };                                                                         // 1115
    }                                                                            // 1116
    return;                                                                      // 1117
  }                                                                              // 1118
  var STATUS_PENDING = 0;                                                        // 1119
  var STATUS_RESOLVED = 1;                                                       // 1120
  var STATUS_REJECTED = 2;                                                       // 1121
                                                                                 // 1122
  // In an attempt to avoid silent exceptions, unhandled rejections are          // 1123
  // tracked and if they aren't handled in a certain amount of time an           // 1124
  // error is logged.                                                            // 1125
  var REJECTION_TIMEOUT = 500;                                                   // 1126
                                                                                 // 1127
  var HandlerManager = {                                                         // 1128
    handlers: [],                                                                // 1129
    running: false,                                                              // 1130
    unhandledRejections: [],                                                     // 1131
    pendingRejectionCheck: false,                                                // 1132
                                                                                 // 1133
    scheduleHandlers: function scheduleHandlers(promise) {                       // 1134
      if (promise._status === STATUS_PENDING) {                                  // 1135
        return;                                                                  // 1136
      }                                                                          // 1137
                                                                                 // 1138
      this.handlers = this.handlers.concat(promise._handlers);                   // 1139
      promise._handlers = [];                                                    // 1140
                                                                                 // 1141
      if (this.running) {                                                        // 1142
        return;                                                                  // 1143
      }                                                                          // 1144
      this.running = true;                                                       // 1145
                                                                                 // 1146
      setTimeout(this.runHandlers.bind(this), 0);                                // 1147
    },                                                                           // 1148
                                                                                 // 1149
    runHandlers: function runHandlers() {                                        // 1150
      var RUN_TIMEOUT = 1; // ms                                                 // 1151
      var timeoutAt = Date.now() + RUN_TIMEOUT;                                  // 1152
      while (this.handlers.length > 0) {                                         // 1153
        var handler = this.handlers.shift();                                     // 1154
                                                                                 // 1155
        var nextStatus = handler.thisPromise._status;                            // 1156
        var nextValue = handler.thisPromise._value;                              // 1157
                                                                                 // 1158
        try {                                                                    // 1159
          if (nextStatus === STATUS_RESOLVED) {                                  // 1160
            if (typeof handler.onResolve === 'function') {                       // 1161
              nextValue = handler.onResolve(nextValue);                          // 1162
            }                                                                    // 1163
          } else if (typeof handler.onReject === 'function') {                   // 1164
              nextValue = handler.onReject(nextValue);                           // 1165
              nextStatus = STATUS_RESOLVED;                                      // 1166
                                                                                 // 1167
              if (handler.thisPromise._unhandledRejection) {                     // 1168
                this.removeUnhandeledRejection(handler.thisPromise);             // 1169
              }                                                                  // 1170
          }                                                                      // 1171
        } catch (ex) {                                                           // 1172
          nextStatus = STATUS_REJECTED;                                          // 1173
          nextValue = ex;                                                        // 1174
        }                                                                        // 1175
                                                                                 // 1176
        handler.nextPromise._updateStatus(nextStatus, nextValue);                // 1177
        if (Date.now() >= timeoutAt) {                                           // 1178
          break;                                                                 // 1179
        }                                                                        // 1180
      }                                                                          // 1181
                                                                                 // 1182
      if (this.handlers.length > 0) {                                            // 1183
        setTimeout(this.runHandlers.bind(this), 0);                              // 1184
        return;                                                                  // 1185
      }                                                                          // 1186
                                                                                 // 1187
      this.running = false;                                                      // 1188
    },                                                                           // 1189
                                                                                 // 1190
    addUnhandledRejection: function addUnhandledRejection(promise) {             // 1191
      this.unhandledRejections.push({                                            // 1192
        promise: promise,                                                        // 1193
        time: Date.now()                                                         // 1194
      });                                                                        // 1195
      this.scheduleRejectionCheck();                                             // 1196
    },                                                                           // 1197
                                                                                 // 1198
    removeUnhandeledRejection: function removeUnhandeledRejection(promise) {     // 1199
      promise._unhandledRejection = false;                                       // 1200
      for (var i = 0; i < this.unhandledRejections.length; i++) {                // 1201
        if (this.unhandledRejections[i].promise === promise) {                   // 1202
          this.unhandledRejections.splice(i);                                    // 1203
          i--;                                                                   // 1204
        }                                                                        // 1205
      }                                                                          // 1206
    },                                                                           // 1207
                                                                                 // 1208
    scheduleRejectionCheck: function scheduleRejectionCheck() {                  // 1209
      if (this.pendingRejectionCheck) {                                          // 1210
        return;                                                                  // 1211
      }                                                                          // 1212
      this.pendingRejectionCheck = true;                                         // 1213
      setTimeout(function rejectionCheck() {                                     // 1214
        this.pendingRejectionCheck = false;                                      // 1215
        var now = Date.now();                                                    // 1216
        for (var i = 0; i < this.unhandledRejections.length; i++) {              // 1217
          if (now - this.unhandledRejections[i].time > REJECTION_TIMEOUT) {      // 1218
            var unhandled = this.unhandledRejections[i].promise._value;          // 1219
            var msg = 'Unhandled rejection: ' + unhandled;                       // 1220
            if (unhandled.stack) {                                               // 1221
              msg += '\n' + unhandled.stack;                                     // 1222
            }                                                                    // 1223
            warn(msg);                                                           // 1224
            this.unhandledRejections.splice(i);                                  // 1225
            i--;                                                                 // 1226
          }                                                                      // 1227
        }                                                                        // 1228
        if (this.unhandledRejections.length) {                                   // 1229
          this.scheduleRejectionCheck();                                         // 1230
        }                                                                        // 1231
      }.bind(this), REJECTION_TIMEOUT);                                          // 1232
    }                                                                            // 1233
  };                                                                             // 1234
                                                                                 // 1235
  function Promise(resolver) {                                                   // 1236
    this._status = STATUS_PENDING;                                               // 1237
    this._handlers = [];                                                         // 1238
    try {                                                                        // 1239
      resolver.call(this, this._resolve.bind(this), this._reject.bind(this));    // 1240
    } catch (e) {                                                                // 1241
      this._reject(e);                                                           // 1242
    }                                                                            // 1243
  }                                                                              // 1244
  /**                                                                            // 1245
   * Builds a promise that is resolved when all the passed in promises are       // 1246
   * resolved.                                                                   // 1247
   * @param {array} array of data and/or promises to wait for.                   // 1248
   * @return {Promise} New dependant promise.                                    // 1249
   */                                                                            // 1250
  Promise.all = function Promise_all(promises) {                                 // 1251
    var resolveAll, rejectAll;                                                   // 1252
    var deferred = new Promise(function (resolve, reject) {                      // 1253
      resolveAll = resolve;                                                      // 1254
      rejectAll = reject;                                                        // 1255
    });                                                                          // 1256
    var unresolved = promises.length;                                            // 1257
    var results = [];                                                            // 1258
    if (unresolved === 0) {                                                      // 1259
      resolveAll(results);                                                       // 1260
      return deferred;                                                           // 1261
    }                                                                            // 1262
    function reject(reason) {                                                    // 1263
      if (deferred._status === STATUS_REJECTED) {                                // 1264
        return;                                                                  // 1265
      }                                                                          // 1266
      results = [];                                                              // 1267
      rejectAll(reason);                                                         // 1268
    }                                                                            // 1269
    for (var i = 0, ii = promises.length; i < ii; ++i) {                         // 1270
      var promise = promises[i];                                                 // 1271
      var resolve = (function(i) {                                               // 1272
        return function(value) {                                                 // 1273
          if (deferred._status === STATUS_REJECTED) {                            // 1274
            return;                                                              // 1275
          }                                                                      // 1276
          results[i] = value;                                                    // 1277
          unresolved--;                                                          // 1278
          if (unresolved === 0) {                                                // 1279
            resolveAll(results);                                                 // 1280
          }                                                                      // 1281
        };                                                                       // 1282
      })(i);                                                                     // 1283
      if (Promise.isPromise(promise)) {                                          // 1284
        promise.then(resolve, reject);                                           // 1285
      } else {                                                                   // 1286
        resolve(promise);                                                        // 1287
      }                                                                          // 1288
    }                                                                            // 1289
    return deferred;                                                             // 1290
  };                                                                             // 1291
                                                                                 // 1292
  /**                                                                            // 1293
   * Checks if the value is likely a promise (has a 'then' function).            // 1294
   * @return {boolean} true if value is thenable                                 // 1295
   */                                                                            // 1296
  Promise.isPromise = function Promise_isPromise(value) {                        // 1297
    return value && typeof value.then === 'function';                            // 1298
  };                                                                             // 1299
                                                                                 // 1300
  /**                                                                            // 1301
   * Creates resolved promise                                                    // 1302
   * @param value resolve value                                                  // 1303
   * @returns {Promise}                                                          // 1304
   */                                                                            // 1305
  Promise.resolve = function Promise_resolve(value) {                            // 1306
    return new Promise(function (resolve) { resolve(value); });                  // 1307
  };                                                                             // 1308
                                                                                 // 1309
  /**                                                                            // 1310
   * Creates rejected promise                                                    // 1311
   * @param reason rejection value                                               // 1312
   * @returns {Promise}                                                          // 1313
   */                                                                            // 1314
  Promise.reject = function Promise_reject(reason) {                             // 1315
    return new Promise(function (resolve, reject) { reject(reason); });          // 1316
  };                                                                             // 1317
                                                                                 // 1318
  Promise.prototype = {                                                          // 1319
    _status: null,                                                               // 1320
    _value: null,                                                                // 1321
    _handlers: null,                                                             // 1322
    _unhandledRejection: null,                                                   // 1323
                                                                                 // 1324
    _updateStatus: function Promise__updateStatus(status, value) {               // 1325
      if (this._status === STATUS_RESOLVED ||                                    // 1326
          this._status === STATUS_REJECTED) {                                    // 1327
        return;                                                                  // 1328
      }                                                                          // 1329
                                                                                 // 1330
      if (status === STATUS_RESOLVED &&                                          // 1331
          Promise.isPromise(value)) {                                            // 1332
        value.then(this._updateStatus.bind(this, STATUS_RESOLVED),               // 1333
                   this._updateStatus.bind(this, STATUS_REJECTED));              // 1334
        return;                                                                  // 1335
      }                                                                          // 1336
                                                                                 // 1337
      this._status = status;                                                     // 1338
      this._value = value;                                                       // 1339
                                                                                 // 1340
      if (status === STATUS_REJECTED && this._handlers.length === 0) {           // 1341
        this._unhandledRejection = true;                                         // 1342
        HandlerManager.addUnhandledRejection(this);                              // 1343
      }                                                                          // 1344
                                                                                 // 1345
      HandlerManager.scheduleHandlers(this);                                     // 1346
    },                                                                           // 1347
                                                                                 // 1348
    _resolve: function Promise_resolve(value) {                                  // 1349
      this._updateStatus(STATUS_RESOLVED, value);                                // 1350
    },                                                                           // 1351
                                                                                 // 1352
    _reject: function Promise_reject(reason) {                                   // 1353
      this._updateStatus(STATUS_REJECTED, reason);                               // 1354
    },                                                                           // 1355
                                                                                 // 1356
    then: function Promise_then(onResolve, onReject) {                           // 1357
      var nextPromise = new Promise(function (resolve, reject) {                 // 1358
        this.resolve = resolve;                                                  // 1359
        this.reject = reject;                                                    // 1360
      });                                                                        // 1361
      this._handlers.push({                                                      // 1362
        thisPromise: this,                                                       // 1363
        onResolve: onResolve,                                                    // 1364
        onReject: onReject,                                                      // 1365
        nextPromise: nextPromise                                                 // 1366
      });                                                                        // 1367
      HandlerManager.scheduleHandlers(this);                                     // 1368
      return nextPromise;                                                        // 1369
    },                                                                           // 1370
                                                                                 // 1371
    catch: function Promise_catch(onReject) {                                    // 1372
      return this.then(undefined, onReject);                                     // 1373
    }                                                                            // 1374
  };                                                                             // 1375
                                                                                 // 1376
  globalScope.Promise = Promise;                                                 // 1377
})();                                                                            // 1378
                                                                                 // 1379
var StatTimer = (function StatTimerClosure() {                                   // 1380
  function rpad(str, pad, length) {                                              // 1381
    while (str.length < length) {                                                // 1382
      str += pad;                                                                // 1383
    }                                                                            // 1384
    return str;                                                                  // 1385
  }                                                                              // 1386
  function StatTimer() {                                                         // 1387
    this.started = {};                                                           // 1388
    this.times = [];                                                             // 1389
    this.enabled = true;                                                         // 1390
  }                                                                              // 1391
  StatTimer.prototype = {                                                        // 1392
    time: function StatTimer_time(name) {                                        // 1393
      if (!this.enabled) {                                                       // 1394
        return;                                                                  // 1395
      }                                                                          // 1396
      if (name in this.started) {                                                // 1397
        warn('Timer is already running for ' + name);                            // 1398
      }                                                                          // 1399
      this.started[name] = Date.now();                                           // 1400
    },                                                                           // 1401
    timeEnd: function StatTimer_timeEnd(name) {                                  // 1402
      if (!this.enabled) {                                                       // 1403
        return;                                                                  // 1404
      }                                                                          // 1405
      if (!(name in this.started)) {                                             // 1406
        warn('Timer has not been started for ' + name);                          // 1407
      }                                                                          // 1408
      this.times.push({                                                          // 1409
        'name': name,                                                            // 1410
        'start': this.started[name],                                             // 1411
        'end': Date.now()                                                        // 1412
      });                                                                        // 1413
      // Remove timer from started so it can be called again.                    // 1414
      delete this.started[name];                                                 // 1415
    },                                                                           // 1416
    toString: function StatTimer_toString() {                                    // 1417
      var i, ii;                                                                 // 1418
      var times = this.times;                                                    // 1419
      var out = '';                                                              // 1420
      // Find the longest name for padding purposes.                             // 1421
      var longest = 0;                                                           // 1422
      for (i = 0, ii = times.length; i < ii; ++i) {                              // 1423
        var name = times[i]['name'];                                             // 1424
        if (name.length > longest) {                                             // 1425
          longest = name.length;                                                 // 1426
        }                                                                        // 1427
      }                                                                          // 1428
      for (i = 0, ii = times.length; i < ii; ++i) {                              // 1429
        var span = times[i];                                                     // 1430
        var duration = span.end - span.start;                                    // 1431
        out += rpad(span['name'], ' ', longest) + ' ' + duration + 'ms\n';       // 1432
      }                                                                          // 1433
      return out;                                                                // 1434
    }                                                                            // 1435
  };                                                                             // 1436
  return StatTimer;                                                              // 1437
})();                                                                            // 1438
                                                                                 // 1439
PDFJS.createBlob = function createBlob(data, contentType) {                      // 1440
  if (typeof Blob !== 'undefined') {                                             // 1441
    return new Blob([data], { type: contentType });                              // 1442
  }                                                                              // 1443
  // Blob builder is deprecated in FF14 and removed in FF18.                     // 1444
  var bb = new MozBlobBuilder();                                                 // 1445
  bb.append(data);                                                               // 1446
  return bb.getBlob(contentType);                                                // 1447
};                                                                               // 1448
                                                                                 // 1449
PDFJS.createObjectURL = (function createObjectURLClosure() {                     // 1450
  // Blob/createObjectURL is not available, falling back to data schema.         // 1451
  var digits =                                                                   // 1452
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';         // 1453
                                                                                 // 1454
  return function createObjectURL(data, contentType) {                           // 1455
    if (!PDFJS.disableCreateObjectURL &&                                         // 1456
        typeof URL !== 'undefined' && URL.createObjectURL) {                     // 1457
      var blob = PDFJS.createBlob(data, contentType);                            // 1458
      return URL.createObjectURL(blob);                                          // 1459
    }                                                                            // 1460
                                                                                 // 1461
    var buffer = 'data:' + contentType + ';base64,';                             // 1462
    for (var i = 0, ii = data.length; i < ii; i += 3) {                          // 1463
      var b1 = data[i] & 0xFF;                                                   // 1464
      var b2 = data[i + 1] & 0xFF;                                               // 1465
      var b3 = data[i + 2] & 0xFF;                                               // 1466
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);                        // 1467
      var d3 = i + 1 < ii ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;                  // 1468
      var d4 = i + 2 < ii ? (b3 & 0x3F) : 64;                                    // 1469
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];               // 1470
    }                                                                            // 1471
    return buffer;                                                               // 1472
  };                                                                             // 1473
})();                                                                            // 1474
                                                                                 // 1475
function MessageHandler(name, comObj) {                                          // 1476
  this.name = name;                                                              // 1477
  this.comObj = comObj;                                                          // 1478
  this.callbackIndex = 1;                                                        // 1479
  this.postMessageTransfers = true;                                              // 1480
  var callbacksCapabilities = this.callbacksCapabilities = {};                   // 1481
  var ah = this.actionHandler = {};                                              // 1482
                                                                                 // 1483
  ah['console_log'] = [function ahConsoleLog(data) {                             // 1484
    console.log.apply(console, data);                                            // 1485
  }];                                                                            // 1486
  ah['console_error'] = [function ahConsoleError(data) {                         // 1487
    console.error.apply(console, data);                                          // 1488
  }];                                                                            // 1489
  ah['_unsupported_feature'] = [function ah_unsupportedFeature(data) {           // 1490
    UnsupportedManager.notify(data);                                             // 1491
  }];                                                                            // 1492
                                                                                 // 1493
  comObj.onmessage = function messageHandlerComObjOnMessage(event) {             // 1494
    var data = event.data;                                                       // 1495
    if (data.isReply) {                                                          // 1496
      var callbackId = data.callbackId;                                          // 1497
      if (data.callbackId in callbacksCapabilities) {                            // 1498
        var callback = callbacksCapabilities[callbackId];                        // 1499
        delete callbacksCapabilities[callbackId];                                // 1500
        if ('error' in data) {                                                   // 1501
          callback.reject(data.error);                                           // 1502
        } else {                                                                 // 1503
          callback.resolve(data.data);                                           // 1504
        }                                                                        // 1505
      } else {                                                                   // 1506
        error('Cannot resolve callback ' + callbackId);                          // 1507
      }                                                                          // 1508
    } else if (data.action in ah) {                                              // 1509
      var action = ah[data.action];                                              // 1510
      if (data.callbackId) {                                                     // 1511
        Promise.resolve().then(function () {                                     // 1512
          return action[0].call(action[1], data.data);                           // 1513
        }).then(function (result) {                                              // 1514
          comObj.postMessage({                                                   // 1515
            isReply: true,                                                       // 1516
            callbackId: data.callbackId,                                         // 1517
            data: result                                                         // 1518
          });                                                                    // 1519
        }, function (reason) {                                                   // 1520
          comObj.postMessage({                                                   // 1521
            isReply: true,                                                       // 1522
            callbackId: data.callbackId,                                         // 1523
            error: reason                                                        // 1524
          });                                                                    // 1525
        });                                                                      // 1526
      } else {                                                                   // 1527
        action[0].call(action[1], data.data);                                    // 1528
      }                                                                          // 1529
    } else {                                                                     // 1530
      error('Unknown action from worker: ' + data.action);                       // 1531
    }                                                                            // 1532
  };                                                                             // 1533
}                                                                                // 1534
                                                                                 // 1535
MessageHandler.prototype = {                                                     // 1536
  on: function messageHandlerOn(actionName, handler, scope) {                    // 1537
    var ah = this.actionHandler;                                                 // 1538
    if (ah[actionName]) {                                                        // 1539
      error('There is already an actionName called "' + actionName + '"');       // 1540
    }                                                                            // 1541
    ah[actionName] = [handler, scope];                                           // 1542
  },                                                                             // 1543
  /**                                                                            // 1544
   * Sends a message to the comObj to invoke the action with the supplied data.  // 1545
   * @param {String} actionName Action to call.                                  // 1546
   * @param {JSON} data JSON data to send.                                       // 1547
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers          // 1548
   */                                                                            // 1549
  send: function messageHandlerSend(actionName, data, transfers) {               // 1550
    var message = {                                                              // 1551
      action: actionName,                                                        // 1552
      data: data                                                                 // 1553
    };                                                                           // 1554
    this.postMessage(message, transfers);                                        // 1555
  },                                                                             // 1556
  /**                                                                            // 1557
   * Sends a message to the comObj to invoke the action with the supplied data.  // 1558
   * Expects that other side will callback with the response.                    // 1559
   * @param {String} actionName Action to call.                                  // 1560
   * @param {JSON} data JSON data to send.                                       // 1561
   * @param {Array} [transfers] Optional list of transfers/ArrayBuffers.         // 1562
   * @returns {Promise} Promise to be resolved with response data.               // 1563
   */                                                                            // 1564
  sendWithPromise:                                                               // 1565
    function messageHandlerSendWithPromise(actionName, data, transfers) {        // 1566
    var callbackId = this.callbackIndex++;                                       // 1567
    var message = {                                                              // 1568
      action: actionName,                                                        // 1569
      data: data,                                                                // 1570
      callbackId: callbackId                                                     // 1571
    };                                                                           // 1572
    var capability = createPromiseCapability();                                  // 1573
    this.callbacksCapabilities[callbackId] = capability;                         // 1574
    try {                                                                        // 1575
      this.postMessage(message, transfers);                                      // 1576
    } catch (e) {                                                                // 1577
      capability.reject(e);                                                      // 1578
    }                                                                            // 1579
    return capability.promise;                                                   // 1580
  },                                                                             // 1581
  /**                                                                            // 1582
   * Sends raw message to the comObj.                                            // 1583
   * @private                                                                    // 1584
   * @param message {Object} Raw message.                                        // 1585
   * @param transfers List of transfers/ArrayBuffers, or undefined.              // 1586
   */                                                                            // 1587
  postMessage: function (message, transfers) {                                   // 1588
    if (transfers && this.postMessageTransfers) {                                // 1589
      this.comObj.postMessage(message, transfers);                               // 1590
    } else {                                                                     // 1591
      this.comObj.postMessage(message);                                          // 1592
    }                                                                            // 1593
  }                                                                              // 1594
};                                                                               // 1595
                                                                                 // 1596
function loadJpegStream(id, imageUrl, objs) {                                    // 1597
  var img = new Image();                                                         // 1598
  img.onload = (function loadJpegStream_onloadClosure() {                        // 1599
    objs.resolve(id, img);                                                       // 1600
  });                                                                            // 1601
  img.onerror = (function loadJpegStream_onerrorClosure() {                      // 1602
    objs.resolve(id, null);                                                      // 1603
    warn('Error during JPEG image loading');                                     // 1604
  });                                                                            // 1605
  img.src = imageUrl;                                                            // 1606
}                                                                                // 1607
                                                                                 // 1608
                                                                                 // 1609
/**                                                                              // 1610
 * The maximum allowed image size in total pixels e.g. width * height. Images    // 1611
 * above this value will not be drawn. Use -1 for no limit.                      // 1612
 * @var {number}                                                                 // 1613
 */                                                                              // 1614
PDFJS.maxImageSize = (PDFJS.maxImageSize === undefined ?                         // 1615
                      -1 : PDFJS.maxImageSize);                                  // 1616
                                                                                 // 1617
/**                                                                              // 1618
 * The url of where the predefined Adobe CMaps are located. Include trailing     // 1619
 * slash.                                                                        // 1620
 * @var {string}                                                                 // 1621
 */                                                                              // 1622
PDFJS.cMapUrl = (PDFJS.cMapUrl === undefined ? null : PDFJS.cMapUrl);            // 1623
                                                                                 // 1624
/**                                                                              // 1625
 * Specifies if CMaps are binary packed.                                         // 1626
 * @var {boolean}                                                                // 1627
 */                                                                              // 1628
PDFJS.cMapPacked = PDFJS.cMapPacked === undefined ? false : PDFJS.cMapPacked;    // 1629
                                                                                 // 1630
/**                                                                              // 1631
 * By default fonts are converted to OpenType fonts and loaded via font face     // 1632
 * rules. If disabled, the font will be rendered using a built in font renderer  // 1633
 * that constructs the glyphs with primitive path commands.                      // 1634
 * @var {boolean}                                                                // 1635
 */                                                                              // 1636
PDFJS.disableFontFace = (PDFJS.disableFontFace === undefined ?                   // 1637
                         false : PDFJS.disableFontFace);                         // 1638
                                                                                 // 1639
/**                                                                              // 1640
 * Path for image resources, mainly for annotation icons. Include trailing       // 1641
 * slash.                                                                        // 1642
 * @var {string}                                                                 // 1643
 */                                                                              // 1644
PDFJS.imageResourcesPath = (PDFJS.imageResourcesPath === undefined ?             // 1645
                            '' : PDFJS.imageResourcesPath);                      // 1646
                                                                                 // 1647
/**                                                                              // 1648
 * Disable the web worker and run all code on the main thread. This will happen  // 1649
 * automatically if the browser doesn't support workers or sending typed arrays  // 1650
 * to workers.                                                                   // 1651
 * @var {boolean}                                                                // 1652
 */                                                                              // 1653
PDFJS.disableWorker = (PDFJS.disableWorker === undefined ?                       // 1654
                       false : PDFJS.disableWorker);                             // 1655
                                                                                 // 1656
/**                                                                              // 1657
 * Path and filename of the worker file. Required when the worker is enabled in  // 1658
 * development mode. If unspecified in the production build, the worker will be  // 1659
 * loaded based on the location of the pdf.js file.                              // 1660
 * @var {string}                                                                 // 1661
 */                                                                              // 1662
PDFJS.workerSrc = (PDFJS.workerSrc === undefined ? null : PDFJS.workerSrc);      // 1663
                                                                                 // 1664
/**                                                                              // 1665
 * Disable range request loading of PDF files. When enabled and if the server    // 1666
 * supports partial content requests then the PDF will be fetched in chunks.     // 1667
 * Enabled (false) by default.                                                   // 1668
 * @var {boolean}                                                                // 1669
 */                                                                              // 1670
PDFJS.disableRange = (PDFJS.disableRange === undefined ?                         // 1671
                      false : PDFJS.disableRange);                               // 1672
                                                                                 // 1673
/**                                                                              // 1674
 * Disable streaming of PDF file data. By default PDF.js attempts to load PDF    // 1675
 * in chunks. This default behavior can be disabled.                             // 1676
 * @var {boolean}                                                                // 1677
 */                                                                              // 1678
PDFJS.disableStream = (PDFJS.disableStream === undefined ?                       // 1679
                       false : PDFJS.disableStream);                             // 1680
                                                                                 // 1681
/**                                                                              // 1682
 * Disable pre-fetching of PDF file data. When range requests are enabled PDF.js // 1683
 * will automatically keep fetching more data even if it isn't needed to display // 1684
 * the current page. This default behavior can be disabled.                      // 1685
 *                                                                               // 1686
 * NOTE: It is also necessary to disable streaming, see above,                   // 1687
 *       in order for disabling of pre-fetching to work correctly.               // 1688
 * @var {boolean}                                                                // 1689
 */                                                                              // 1690
PDFJS.disableAutoFetch = (PDFJS.disableAutoFetch === undefined ?                 // 1691
                          false : PDFJS.disableAutoFetch);                       // 1692
                                                                                 // 1693
/**                                                                              // 1694
 * Enables special hooks for debugging PDF.js.                                   // 1695
 * @var {boolean}                                                                // 1696
 */                                                                              // 1697
PDFJS.pdfBug = (PDFJS.pdfBug === undefined ? false : PDFJS.pdfBug);              // 1698
                                                                                 // 1699
/**                                                                              // 1700
 * Enables transfer usage in postMessage for ArrayBuffers.                       // 1701
 * @var {boolean}                                                                // 1702
 */                                                                              // 1703
PDFJS.postMessageTransfers = (PDFJS.postMessageTransfers === undefined ?         // 1704
                              true : PDFJS.postMessageTransfers);                // 1705
                                                                                 // 1706
/**                                                                              // 1707
 * Disables URL.createObjectURL usage.                                           // 1708
 * @var {boolean}                                                                // 1709
 */                                                                              // 1710
PDFJS.disableCreateObjectURL = (PDFJS.disableCreateObjectURL === undefined ?     // 1711
                                false : PDFJS.disableCreateObjectURL);           // 1712
                                                                                 // 1713
/**                                                                              // 1714
 * Disables WebGL usage.                                                         // 1715
 * @var {boolean}                                                                // 1716
 */                                                                              // 1717
PDFJS.disableWebGL = (PDFJS.disableWebGL === undefined ?                         // 1718
                      true : PDFJS.disableWebGL);                                // 1719
                                                                                 // 1720
/**                                                                              // 1721
 * Disables fullscreen support, and by extension Presentation Mode,              // 1722
 * in browsers which support the fullscreen API.                                 // 1723
 * @var {boolean}                                                                // 1724
 */                                                                              // 1725
PDFJS.disableFullscreen = (PDFJS.disableFullscreen === undefined ?               // 1726
                           false : PDFJS.disableFullscreen);                     // 1727
                                                                                 // 1728
/**                                                                              // 1729
 * Enables CSS only zooming.                                                     // 1730
 * @var {boolean}                                                                // 1731
 */                                                                              // 1732
PDFJS.useOnlyCssZoom = (PDFJS.useOnlyCssZoom === undefined ?                     // 1733
                        false : PDFJS.useOnlyCssZoom);                           // 1734
                                                                                 // 1735
/**                                                                              // 1736
 * Controls the logging level.                                                   // 1737
 * The constants from PDFJS.VERBOSITY_LEVELS should be used:                     // 1738
 * - errors                                                                      // 1739
 * - warnings [default]                                                          // 1740
 * - infos                                                                       // 1741
 * @var {number}                                                                 // 1742
 */                                                                              // 1743
PDFJS.verbosity = (PDFJS.verbosity === undefined ?                               // 1744
                   PDFJS.VERBOSITY_LEVELS.warnings : PDFJS.verbosity);           // 1745
                                                                                 // 1746
/**                                                                              // 1747
 * The maximum supported canvas size in total pixels e.g. width * height.        // 1748
 * The default value is 4096 * 4096. Use -1 for no limit.                        // 1749
 * @var {number}                                                                 // 1750
 */                                                                              // 1751
PDFJS.maxCanvasPixels = (PDFJS.maxCanvasPixels === undefined ?                   // 1752
                         16777216 : PDFJS.maxCanvasPixels);                      // 1753
                                                                                 // 1754
/**                                                                              // 1755
 * Opens external links in a new window if enabled. The default behavior opens   // 1756
 * external links in the PDF.js window.                                          // 1757
 * @var {boolean}                                                                // 1758
 */                                                                              // 1759
PDFJS.openExternalLinksInNewWindow = (                                           // 1760
  PDFJS.openExternalLinksInNewWindow === undefined ?                             // 1761
    false : PDFJS.openExternalLinksInNewWindow);                                 // 1762
                                                                                 // 1763
/**                                                                              // 1764
 * Document initialization / loading parameters object.                          // 1765
 *                                                                               // 1766
 * @typedef {Object} DocumentInitParameters                                      // 1767
 * @property {string}     url   - The URL of the PDF.                            // 1768
 * @property {TypedArray|Array|string} data - Binary PDF data. Use typed arrays  // 1769
 *   (Uint8Array) to improve the memory usage. If PDF data is BASE64-encoded,    // 1770
 *   use atob() to convert it to a binary string first.                          // 1771
 * @property {Object}     httpHeaders - Basic authentication headers.            // 1772
 * @property {boolean}    withCredentials - Indicates whether or not cross-site  // 1773
 *   Access-Control requests should be made using credentials such as cookies    // 1774
 *   or authorization headers. The default is false.                             // 1775
 * @property {string}     password - For decrypting password-protected PDFs.     // 1776
 * @property {TypedArray} initialData - A typed array with the first portion or  // 1777
 *   all of the pdf data. Used by the extension since some data is already       // 1778
 *   loaded before the switch to range requests.                                 // 1779
 * @property {number}     length - The PDF file length. It's used for progress   // 1780
 *   reports and range requests operations.                                      // 1781
 * @property {PDFDataRangeTransport} range                                       // 1782
 */                                                                              // 1783
                                                                                 // 1784
/**                                                                              // 1785
 * @typedef {Object} PDFDocumentStats                                            // 1786
 * @property {Array} streamTypes - Used stream types in the document (an item    // 1787
 *   is set to true if specific stream ID was used in the document).             // 1788
 * @property {Array} fontTypes - Used font type in the document (an item is set  // 1789
 *   to true if specific font ID was used in the document).                      // 1790
 */                                                                              // 1791
                                                                                 // 1792
/**                                                                              // 1793
 * This is the main entry point for loading a PDF and interacting with it.       // 1794
 * NOTE: If a URL is used to fetch the PDF data a standard XMLHttpRequest(XHR)   // 1795
 * is used, which means it must follow the same origin rules that any XHR does   // 1796
 * e.g. No cross domain requests without CORS.                                   // 1797
 *                                                                               // 1798
 * @param {string|TypedArray|DocumentInitParameters|PDFDataRangeTransport} src   // 1799
 * Can be a url to where a PDF is located, a typed array (Uint8Array)            // 1800
 * already populated with data or parameter object.                              // 1801
 *                                                                               // 1802
 * @param {PDFDataRangeTransport} pdfDataRangeTransport (deprecated) It is used  // 1803
 * if you want to manually serve range requests for data in the PDF.             // 1804
 *                                                                               // 1805
 * @param {function} passwordCallback (deprecated) It is used to request a       // 1806
 * password if wrong or no password was provided. The callback receives two      // 1807
 * parameters: function that needs to be called with new password and reason     // 1808
 * (see {PasswordResponses}).                                                    // 1809
 *                                                                               // 1810
 * @param {function} progressCallback (deprecated) It is used to be able to      // 1811
 * monitor the loading progress of the PDF file (necessary to implement e.g.     // 1812
 * a loading bar). The callback receives an {Object} with the properties:        // 1813
 * {number} loaded and {number} total.                                           // 1814
 *                                                                               // 1815
 * @return {PDFDocumentLoadingTask}                                              // 1816
 */                                                                              // 1817
PDFJS.getDocument = function getDocument(src,                                    // 1818
                                         pdfDataRangeTransport,                  // 1819
                                         passwordCallback,                       // 1820
                                         progressCallback) {                     // 1821
  var task = new PDFDocumentLoadingTask();                                       // 1822
                                                                                 // 1823
  // Support of the obsolete arguments (for compatibility with API v1.0)         // 1824
  if (pdfDataRangeTransport) {                                                   // 1825
    if (!(pdfDataRangeTransport instanceof PDFDataRangeTransport)) {             // 1826
      // Not a PDFDataRangeTransport instance, trying to add missing properties. // 1827
      pdfDataRangeTransport = Object.create(pdfDataRangeTransport);              // 1828
      pdfDataRangeTransport.length = src.length;                                 // 1829
      pdfDataRangeTransport.initialData = src.initialData;                       // 1830
    }                                                                            // 1831
    src = Object.create(src);                                                    // 1832
    src.range = pdfDataRangeTransport;                                           // 1833
  }                                                                              // 1834
  task.onPassword = passwordCallback || null;                                    // 1835
  task.onProgress = progressCallback || null;                                    // 1836
                                                                                 // 1837
  var workerInitializedCapability, transport;                                    // 1838
  var source;                                                                    // 1839
  if (typeof src === 'string') {                                                 // 1840
    source = { url: src };                                                       // 1841
  } else if (isArrayBuffer(src)) {                                               // 1842
    source = { data: src };                                                      // 1843
  } else if (src instanceof PDFDataRangeTransport) {                             // 1844
    source = { range: src };                                                     // 1845
  } else {                                                                       // 1846
    if (typeof src !== 'object') {                                               // 1847
      error('Invalid parameter in getDocument, need either Uint8Array, ' +       // 1848
        'string or a parameter object');                                         // 1849
    }                                                                            // 1850
    if (!src.url && !src.data && !src.range) {                                   // 1851
      error('Invalid parameter object: need either .data, .range or .url');      // 1852
    }                                                                            // 1853
                                                                                 // 1854
    source = src;                                                                // 1855
  }                                                                              // 1856
                                                                                 // 1857
  var params = {};                                                               // 1858
  for (var key in source) {                                                      // 1859
    if (key === 'url' && typeof window !== 'undefined') {                        // 1860
      // The full path is required in the 'url' field.                           // 1861
      params[key] = combineUrl(window.location.href, source[key]);               // 1862
      continue;                                                                  // 1863
    } else if (key === 'range') {                                                // 1864
      continue;                                                                  // 1865
    } else if (key === 'data' && !(source[key] instanceof Uint8Array)) {         // 1866
      // Converting string or array-like data to Uint8Array.                     // 1867
      var pdfBytes = source[key];                                                // 1868
      if (typeof pdfBytes === 'string') {                                        // 1869
        params[key] = stringToBytes(pdfBytes);                                   // 1870
      } else if (typeof pdfBytes === 'object' && pdfBytes !== null &&            // 1871
                 !isNaN(pdfBytes.length)) {                                      // 1872
        params[key] = new Uint8Array(pdfBytes);                                  // 1873
      } else {                                                                   // 1874
        error('Invalid PDF binary data: either typed array, string or ' +        // 1875
              'array-like object is expected in the data property.');            // 1876
      }                                                                          // 1877
      continue;                                                                  // 1878
    }                                                                            // 1879
    params[key] = source[key];                                                   // 1880
  }                                                                              // 1881
                                                                                 // 1882
  workerInitializedCapability = createPromiseCapability();                       // 1883
  transport = new WorkerTransport(workerInitializedCapability, source.range);    // 1884
  workerInitializedCapability.promise.then(function transportInitialized() {     // 1885
    transport.fetchDocument(task, params);                                       // 1886
  });                                                                            // 1887
                                                                                 // 1888
  return task;                                                                   // 1889
};                                                                               // 1890
                                                                                 // 1891
/**                                                                              // 1892
 * PDF document loading operation.                                               // 1893
 * @class                                                                        // 1894
 */                                                                              // 1895
var PDFDocumentLoadingTask = (function PDFDocumentLoadingTaskClosure() {         // 1896
  /** @constructs PDFDocumentLoadingTask */                                      // 1897
  function PDFDocumentLoadingTask() {                                            // 1898
    this._capability = createPromiseCapability();                                // 1899
                                                                                 // 1900
    /**                                                                          // 1901
     * Callback to request a password if wrong or no password was provided.      // 1902
     * The callback receives two parameters: function that needs to be called    // 1903
     * with new password and reason (see {PasswordResponses}).                   // 1904
     */                                                                          // 1905
    this.onPassword = null;                                                      // 1906
                                                                                 // 1907
    /**                                                                          // 1908
     * Callback to be able to monitor the loading progress of the PDF file       // 1909
     * (necessary to implement e.g. a loading bar). The callback receives        // 1910
     * an {Object} with the properties: {number} loaded and {number} total.      // 1911
     */                                                                          // 1912
    this.onProgress = null;                                                      // 1913
  }                                                                              // 1914
                                                                                 // 1915
  PDFDocumentLoadingTask.prototype =                                             // 1916
      /** @lends PDFDocumentLoadingTask.prototype */ {                           // 1917
    /**                                                                          // 1918
     * @return {Promise}                                                         // 1919
     */                                                                          // 1920
    get promise() {                                                              // 1921
      return this._capability.promise;                                           // 1922
    },                                                                           // 1923
                                                                                 // 1924
    // TODO add cancel or abort method                                           // 1925
                                                                                 // 1926
    /**                                                                          // 1927
     * Registers callbacks to indicate the document loading completion.          // 1928
     *                                                                           // 1929
     * @param {function} onFulfilled The callback for the loading completion.    // 1930
     * @param {function} onRejected The callback for the loading failure.        // 1931
     * @return {Promise} A promise that is resolved after the onFulfilled or     // 1932
     *                   onRejected callback.                                    // 1933
     */                                                                          // 1934
    then: function PDFDocumentLoadingTask_then(onFulfilled, onRejected) {        // 1935
      return this.promise.then.apply(this.promise, arguments);                   // 1936
    }                                                                            // 1937
  };                                                                             // 1938
                                                                                 // 1939
  return PDFDocumentLoadingTask;                                                 // 1940
})();                                                                            // 1941
                                                                                 // 1942
/**                                                                              // 1943
 * Abstract class to support range requests file loading.                        // 1944
 * @class                                                                        // 1945
 */                                                                              // 1946
var PDFDataRangeTransport = (function pdfDataRangeTransportClosure() {           // 1947
  /**                                                                            // 1948
   * @constructs PDFDataRangeTransport                                           // 1949
   * @param {number} length                                                      // 1950
   * @param {Uint8Array} initialData                                             // 1951
   */                                                                            // 1952
  function PDFDataRangeTransport(length, initialData) {                          // 1953
    this.length = length;                                                        // 1954
    this.initialData = initialData;                                              // 1955
                                                                                 // 1956
    this._rangeListeners = [];                                                   // 1957
    this._progressListeners = [];                                                // 1958
    this._progressiveReadListeners = [];                                         // 1959
    this._readyCapability = createPromiseCapability();                           // 1960
  }                                                                              // 1961
  PDFDataRangeTransport.prototype =                                              // 1962
      /** @lends PDFDataRangeTransport.prototype */ {                            // 1963
    addRangeListener:                                                            // 1964
        function PDFDataRangeTransport_addRangeListener(listener) {              // 1965
      this._rangeListeners.push(listener);                                       // 1966
    },                                                                           // 1967
                                                                                 // 1968
    addProgressListener:                                                         // 1969
        function PDFDataRangeTransport_addProgressListener(listener) {           // 1970
      this._progressListeners.push(listener);                                    // 1971
    },                                                                           // 1972
                                                                                 // 1973
    addProgressiveReadListener:                                                  // 1974
        function PDFDataRangeTransport_addProgressiveReadListener(listener) {    // 1975
      this._progressiveReadListeners.push(listener);                             // 1976
    },                                                                           // 1977
                                                                                 // 1978
    onDataRange: function PDFDataRangeTransport_onDataRange(begin, chunk) {      // 1979
      var listeners = this._rangeListeners;                                      // 1980
      for (var i = 0, n = listeners.length; i < n; ++i) {                        // 1981
        listeners[i](begin, chunk);                                              // 1982
      }                                                                          // 1983
    },                                                                           // 1984
                                                                                 // 1985
    onDataProgress: function PDFDataRangeTransport_onDataProgress(loaded) {      // 1986
      this._readyCapability.promise.then(function () {                           // 1987
        var listeners = this._progressListeners;                                 // 1988
        for (var i = 0, n = listeners.length; i < n; ++i) {                      // 1989
          listeners[i](loaded);                                                  // 1990
        }                                                                        // 1991
      }.bind(this));                                                             // 1992
    },                                                                           // 1993
                                                                                 // 1994
    onDataProgressiveRead:                                                       // 1995
        function PDFDataRangeTransport_onDataProgress(chunk) {                   // 1996
      this._readyCapability.promise.then(function () {                           // 1997
        var listeners = this._progressiveReadListeners;                          // 1998
        for (var i = 0, n = listeners.length; i < n; ++i) {                      // 1999
          listeners[i](chunk);                                                   // 2000
        }                                                                        // 2001
      }.bind(this));                                                             // 2002
    },                                                                           // 2003
                                                                                 // 2004
    transportReady: function PDFDataRangeTransport_transportReady() {            // 2005
      this._readyCapability.resolve();                                           // 2006
    },                                                                           // 2007
                                                                                 // 2008
    requestDataRange:                                                            // 2009
        function PDFDataRangeTransport_requestDataRange(begin, end) {            // 2010
      throw new Error('Abstract method PDFDataRangeTransport.requestDataRange'); // 2011
    }                                                                            // 2012
  };                                                                             // 2013
  return PDFDataRangeTransport;                                                  // 2014
})();                                                                            // 2015
                                                                                 // 2016
PDFJS.PDFDataRangeTransport = PDFDataRangeTransport;                             // 2017
                                                                                 // 2018
/**                                                                              // 2019
 * Proxy to a PDFDocument in the worker thread. Also, contains commonly used     // 2020
 * properties that can be read synchronously.                                    // 2021
 * @class                                                                        // 2022
 */                                                                              // 2023
var PDFDocumentProxy = (function PDFDocumentProxyClosure() {                     // 2024
  function PDFDocumentProxy(pdfInfo, transport) {                                // 2025
    this.pdfInfo = pdfInfo;                                                      // 2026
    this.transport = transport;                                                  // 2027
  }                                                                              // 2028
  PDFDocumentProxy.prototype = /** @lends PDFDocumentProxy.prototype */ {        // 2029
    /**                                                                          // 2030
     * @return {number} Total number of pages the PDF contains.                  // 2031
     */                                                                          // 2032
    get numPages() {                                                             // 2033
      return this.pdfInfo.numPages;                                              // 2034
    },                                                                           // 2035
    /**                                                                          // 2036
     * @return {string} A unique ID to identify a PDF. Not guaranteed to be      // 2037
     * unique.                                                                   // 2038
     */                                                                          // 2039
    get fingerprint() {                                                          // 2040
      return this.pdfInfo.fingerprint;                                           // 2041
    },                                                                           // 2042
    /**                                                                          // 2043
     * @param {number} pageNumber The page number to get. The first page is 1.   // 2044
     * @return {Promise} A promise that is resolved with a {@link PDFPageProxy}  // 2045
     * object.                                                                   // 2046
     */                                                                          // 2047
    getPage: function PDFDocumentProxy_getPage(pageNumber) {                     // 2048
      return this.transport.getPage(pageNumber);                                 // 2049
    },                                                                           // 2050
    /**                                                                          // 2051
     * @param {{num: number, gen: number}} ref The page reference. Must have     // 2052
     *   the 'num' and 'gen' properties.                                         // 2053
     * @return {Promise} A promise that is resolved with the page index that is  // 2054
     * associated with the reference.                                            // 2055
     */                                                                          // 2056
    getPageIndex: function PDFDocumentProxy_getPageIndex(ref) {                  // 2057
      return this.transport.getPageIndex(ref);                                   // 2058
    },                                                                           // 2059
    /**                                                                          // 2060
     * @return {Promise} A promise that is resolved with a lookup table for      // 2061
     * mapping named destinations to reference numbers.                          // 2062
     *                                                                           // 2063
     * This can be slow for large documents: use getDestination instead          // 2064
     */                                                                          // 2065
    getDestinations: function PDFDocumentProxy_getDestinations() {               // 2066
      return this.transport.getDestinations();                                   // 2067
    },                                                                           // 2068
    /**                                                                          // 2069
     * @param {string} id The named destination to get.                          // 2070
     * @return {Promise} A promise that is resolved with all information         // 2071
     * of the given named destination.                                           // 2072
     */                                                                          // 2073
    getDestination: function PDFDocumentProxy_getDestination(id) {               // 2074
      return this.transport.getDestination(id);                                  // 2075
    },                                                                           // 2076
    /**                                                                          // 2077
     * @return {Promise} A promise that is resolved with a lookup table for      // 2078
     * mapping named attachments to their content.                               // 2079
     */                                                                          // 2080
    getAttachments: function PDFDocumentProxy_getAttachments() {                 // 2081
      return this.transport.getAttachments();                                    // 2082
    },                                                                           // 2083
    /**                                                                          // 2084
     * @return {Promise} A promise that is resolved with an array of all the     // 2085
     * JavaScript strings in the name tree.                                      // 2086
     */                                                                          // 2087
    getJavaScript: function PDFDocumentProxy_getJavaScript() {                   // 2088
      return this.transport.getJavaScript();                                     // 2089
    },                                                                           // 2090
    /**                                                                          // 2091
     * @return {Promise} A promise that is resolved with an {Array} that is a    // 2092
     * tree outline (if it has one) of the PDF. The tree is in the format of:    // 2093
     * [                                                                         // 2094
     *  {                                                                        // 2095
     *   title: string,                                                          // 2096
     *   bold: boolean,                                                          // 2097
     *   italic: boolean,                                                        // 2098
     *   color: rgb array,                                                       // 2099
     *   dest: dest obj,                                                         // 2100
     *   items: array of more items like this                                    // 2101
     *  },                                                                       // 2102
     *  ...                                                                      // 2103
     * ].                                                                        // 2104
     */                                                                          // 2105
    getOutline: function PDFDocumentProxy_getOutline() {                         // 2106
      return this.transport.getOutline();                                        // 2107
    },                                                                           // 2108
    /**                                                                          // 2109
     * @return {Promise} A promise that is resolved with an {Object} that has    // 2110
     * info and metadata properties.  Info is an {Object} filled with anything   // 2111
     * available in the information dictionary and similarly metadata is a       // 2112
     * {Metadata} object with information from the metadata section of the PDF.  // 2113
     */                                                                          // 2114
    getMetadata: function PDFDocumentProxy_getMetadata() {                       // 2115
      return this.transport.getMetadata();                                       // 2116
    },                                                                           // 2117
    /**                                                                          // 2118
     * @return {Promise} A promise that is resolved with a TypedArray that has   // 2119
     * the raw data from the PDF.                                                // 2120
     */                                                                          // 2121
    getData: function PDFDocumentProxy_getData() {                               // 2122
      return this.transport.getData();                                           // 2123
    },                                                                           // 2124
    /**                                                                          // 2125
     * @return {Promise} A promise that is resolved when the document's data     // 2126
     * is loaded. It is resolved with an {Object} that contains the length       // 2127
     * property that indicates size of the PDF data in bytes.                    // 2128
     */                                                                          // 2129
    getDownloadInfo: function PDFDocumentProxy_getDownloadInfo() {               // 2130
      return this.transport.downloadInfoCapability.promise;                      // 2131
    },                                                                           // 2132
    /**                                                                          // 2133
     * @return {Promise} A promise this is resolved with current stats about     // 2134
     * document structures (see {@link PDFDocumentStats}).                       // 2135
     */                                                                          // 2136
    getStats: function PDFDocumentProxy_getStats() {                             // 2137
      return this.transport.getStats();                                          // 2138
    },                                                                           // 2139
    /**                                                                          // 2140
     * Cleans up resources allocated by the document, e.g. created @font-face.   // 2141
     */                                                                          // 2142
    cleanup: function PDFDocumentProxy_cleanup() {                               // 2143
      this.transport.startCleanup();                                             // 2144
    },                                                                           // 2145
    /**                                                                          // 2146
     * Destroys current document instance and terminates worker.                 // 2147
     */                                                                          // 2148
    destroy: function PDFDocumentProxy_destroy() {                               // 2149
      this.transport.destroy();                                                  // 2150
    }                                                                            // 2151
  };                                                                             // 2152
  return PDFDocumentProxy;                                                       // 2153
})();                                                                            // 2154
                                                                                 // 2155
/**                                                                              // 2156
 * Page text content.                                                            // 2157
 *                                                                               // 2158
 * @typedef {Object} TextContent                                                 // 2159
 * @property {array} items - array of {@link TextItem}                           // 2160
 * @property {Object} styles - {@link TextStyles} objects, indexed by font       // 2161
 *                    name.                                                      // 2162
 */                                                                              // 2163
                                                                                 // 2164
/**                                                                              // 2165
 * Page text content part.                                                       // 2166
 *                                                                               // 2167
 * @typedef {Object} TextItem                                                    // 2168
 * @property {string} str - text content.                                        // 2169
 * @property {string} dir - text direction: 'ttb', 'ltr' or 'rtl'.               // 2170
 * @property {array} transform - transformation matrix.                          // 2171
 * @property {number} width - width in device space.                             // 2172
 * @property {number} height - height in device space.                           // 2173
 * @property {string} fontName - font name used by pdf.js for converted font.    // 2174
 */                                                                              // 2175
                                                                                 // 2176
/**                                                                              // 2177
 * Text style.                                                                   // 2178
 *                                                                               // 2179
 * @typedef {Object} TextStyle                                                   // 2180
 * @property {number} ascent - font ascent.                                      // 2181
 * @property {number} descent - font descent.                                    // 2182
 * @property {boolean} vertical - text is in vertical mode.                      // 2183
 * @property {string} fontFamily - possible font family                          // 2184
 */                                                                              // 2185
                                                                                 // 2186
/**                                                                              // 2187
 * Page render parameters.                                                       // 2188
 *                                                                               // 2189
 * @typedef {Object} RenderParameters                                            // 2190
 * @property {Object} canvasContext - A 2D context of a DOM Canvas object.       // 2191
 * @property {PDFJS.PageViewport} viewport - Rendering viewport obtained by      // 2192
 *                                calling of PDFPage.getViewport method.         // 2193
 * @property {string} intent - Rendering intent, can be 'display' or 'print'     // 2194
 *                    (default value is 'display').                              // 2195
 * @property {Object} imageLayer - (optional) An object that has beginLayout,    // 2196
 *                    endLayout and appendImage functions.                       // 2197
 * @property {function} continueCallback - (deprecated) A function that will be  // 2198
 *                      called each time the rendering is paused.  To continue   // 2199
 *                      rendering call the function that is the first argument   // 2200
 *                      to the callback.                                         // 2201
 */                                                                              // 2202
                                                                                 // 2203
/**                                                                              // 2204
 * PDF page operator list.                                                       // 2205
 *                                                                               // 2206
 * @typedef {Object} PDFOperatorList                                             // 2207
 * @property {Array} fnArray - Array containing the operator functions.          // 2208
 * @property {Array} argsArray - Array containing the arguments of the           // 2209
 *                               functions.                                      // 2210
 */                                                                              // 2211
                                                                                 // 2212
/**                                                                              // 2213
 * Proxy to a PDFPage in the worker thread.                                      // 2214
 * @class                                                                        // 2215
 */                                                                              // 2216
var PDFPageProxy = (function PDFPageProxyClosure() {                             // 2217
  function PDFPageProxy(pageIndex, pageInfo, transport) {                        // 2218
    this.pageIndex = pageIndex;                                                  // 2219
    this.pageInfo = pageInfo;                                                    // 2220
    this.transport = transport;                                                  // 2221
    this.stats = new StatTimer();                                                // 2222
    this.stats.enabled = !!globalScope.PDFJS.enableStats;                        // 2223
    this.commonObjs = transport.commonObjs;                                      // 2224
    this.objs = new PDFObjects();                                                // 2225
    this.cleanupAfterRender = false;                                             // 2226
    this.pendingDestroy = false;                                                 // 2227
    this.intentStates = {};                                                      // 2228
  }                                                                              // 2229
  PDFPageProxy.prototype = /** @lends PDFPageProxy.prototype */ {                // 2230
    /**                                                                          // 2231
     * @return {number} Page number of the page. First page is 1.                // 2232
     */                                                                          // 2233
    get pageNumber() {                                                           // 2234
      return this.pageIndex + 1;                                                 // 2235
    },                                                                           // 2236
    /**                                                                          // 2237
     * @return {number} The number of degrees the page is rotated clockwise.     // 2238
     */                                                                          // 2239
    get rotate() {                                                               // 2240
      return this.pageInfo.rotate;                                               // 2241
    },                                                                           // 2242
    /**                                                                          // 2243
     * @return {Object} The reference that points to this page. It has 'num' and // 2244
     * 'gen' properties.                                                         // 2245
     */                                                                          // 2246
    get ref() {                                                                  // 2247
      return this.pageInfo.ref;                                                  // 2248
    },                                                                           // 2249
    /**                                                                          // 2250
     * @return {Array} An array of the visible portion of the PDF page in the    // 2251
     * user space units - [x1, y1, x2, y2].                                      // 2252
     */                                                                          // 2253
    get view() {                                                                 // 2254
      return this.pageInfo.view;                                                 // 2255
    },                                                                           // 2256
    /**                                                                          // 2257
     * @param {number} scale The desired scale of the viewport.                  // 2258
     * @param {number} rotate Degrees to rotate the viewport. If omitted this    // 2259
     * defaults to the page rotation.                                            // 2260
     * @return {PDFJS.PageViewport} Contains 'width' and 'height' properties     // 2261
     * along with transforms required for rendering.                             // 2262
     */                                                                          // 2263
    getViewport: function PDFPageProxy_getViewport(scale, rotate) {              // 2264
      if (arguments.length < 2) {                                                // 2265
        rotate = this.rotate;                                                    // 2266
      }                                                                          // 2267
      return new PDFJS.PageViewport(this.view, scale, rotate, 0, 0);             // 2268
    },                                                                           // 2269
    /**                                                                          // 2270
     * @return {Promise} A promise that is resolved with an {Array} of the       // 2271
     * annotation objects.                                                       // 2272
     */                                                                          // 2273
    getAnnotations: function PDFPageProxy_getAnnotations() {                     // 2274
      if (this.annotationsPromise) {                                             // 2275
        return this.annotationsPromise;                                          // 2276
      }                                                                          // 2277
                                                                                 // 2278
      var promise = this.transport.getAnnotations(this.pageIndex);               // 2279
      this.annotationsPromise = promise;                                         // 2280
      return promise;                                                            // 2281
    },                                                                           // 2282
    /**                                                                          // 2283
     * Begins the process of rendering a page to the desired context.            // 2284
     * @param {RenderParameters} params Page render parameters.                  // 2285
     * @return {RenderTask} An object that contains the promise, which           // 2286
     *                      is resolved when the page finishes rendering.        // 2287
     */                                                                          // 2288
    render: function PDFPageProxy_render(params) {                               // 2289
      var stats = this.stats;                                                    // 2290
      stats.time('Overall');                                                     // 2291
                                                                                 // 2292
      // If there was a pending destroy cancel it so no cleanup happens during   // 2293
      // this call to render.                                                    // 2294
      this.pendingDestroy = false;                                               // 2295
                                                                                 // 2296
      var renderingIntent = (params.intent === 'print' ? 'print' : 'display');   // 2297
                                                                                 // 2298
      if (!this.intentStates[renderingIntent]) {                                 // 2299
        this.intentStates[renderingIntent] = {};                                 // 2300
      }                                                                          // 2301
      var intentState = this.intentStates[renderingIntent];                      // 2302
                                                                                 // 2303
      // If there's no displayReadyCapability yet, then the operatorList         // 2304
      // was never requested before. Make the request and create the promise.    // 2305
      if (!intentState.displayReadyCapability) {                                 // 2306
        intentState.receivingOperatorList = true;                                // 2307
        intentState.displayReadyCapability = createPromiseCapability();          // 2308
        intentState.operatorList = {                                             // 2309
          fnArray: [],                                                           // 2310
          argsArray: [],                                                         // 2311
          lastChunk: false                                                       // 2312
        };                                                                       // 2313
                                                                                 // 2314
        this.stats.time('Page Request');                                         // 2315
        this.transport.messageHandler.send('RenderPageRequest', {                // 2316
          pageIndex: this.pageNumber - 1,                                        // 2317
          intent: renderingIntent                                                // 2318
        });                                                                      // 2319
      }                                                                          // 2320
                                                                                 // 2321
      var internalRenderTask = new InternalRenderTask(complete, params,          // 2322
                                                      this.objs,                 // 2323
                                                      this.commonObjs,           // 2324
                                                      intentState.operatorList,  // 2325
                                                      this.pageNumber);          // 2326
      if (!intentState.renderTasks) {                                            // 2327
        intentState.renderTasks = [];                                            // 2328
      }                                                                          // 2329
      intentState.renderTasks.push(internalRenderTask);                          // 2330
      var renderTask = internalRenderTask.task;                                  // 2331
                                                                                 // 2332
      // Obsolete parameter support                                              // 2333
      if (params.continueCallback) {                                             // 2334
        renderTask.onContinue = params.continueCallback;                         // 2335
      }                                                                          // 2336
                                                                                 // 2337
      var self = this;                                                           // 2338
      intentState.displayReadyCapability.promise.then(                           // 2339
        function pageDisplayReadyPromise(transparency) {                         // 2340
          if (self.pendingDestroy) {                                             // 2341
            complete();                                                          // 2342
            return;                                                              // 2343
          }                                                                      // 2344
          stats.time('Rendering');                                               // 2345
          internalRenderTask.initalizeGraphics(transparency);                    // 2346
          internalRenderTask.operatorListChanged();                              // 2347
        },                                                                       // 2348
        function pageDisplayReadPromiseError(reason) {                           // 2349
          complete(reason);                                                      // 2350
        }                                                                        // 2351
      );                                                                         // 2352
                                                                                 // 2353
      function complete(error) {                                                 // 2354
        var i = intentState.renderTasks.indexOf(internalRenderTask);             // 2355
        if (i >= 0) {                                                            // 2356
          intentState.renderTasks.splice(i, 1);                                  // 2357
        }                                                                        // 2358
                                                                                 // 2359
        if (self.cleanupAfterRender) {                                           // 2360
          self.pendingDestroy = true;                                            // 2361
        }                                                                        // 2362
        self._tryDestroy();                                                      // 2363
                                                                                 // 2364
        if (error) {                                                             // 2365
          internalRenderTask.capability.reject(error);                           // 2366
        } else {                                                                 // 2367
          internalRenderTask.capability.resolve();                               // 2368
        }                                                                        // 2369
        stats.timeEnd('Rendering');                                              // 2370
        stats.timeEnd('Overall');                                                // 2371
      }                                                                          // 2372
                                                                                 // 2373
      return renderTask;                                                         // 2374
    },                                                                           // 2375
                                                                                 // 2376
    /**                                                                          // 2377
     * @return {Promise} A promise resolved with an {@link PDFOperatorList}      // 2378
     * object that represents page's operator list.                              // 2379
     */                                                                          // 2380
    getOperatorList: function PDFPageProxy_getOperatorList() {                   // 2381
      function operatorListChanged() {                                           // 2382
        if (intentState.operatorList.lastChunk) {                                // 2383
          intentState.opListReadCapability.resolve(intentState.operatorList);    // 2384
        }                                                                        // 2385
      }                                                                          // 2386
                                                                                 // 2387
      var renderingIntent = 'oplist';                                            // 2388
      if (!this.intentStates[renderingIntent]) {                                 // 2389
        this.intentStates[renderingIntent] = {};                                 // 2390
      }                                                                          // 2391
      var intentState = this.intentStates[renderingIntent];                      // 2392
                                                                                 // 2393
      if (!intentState.opListReadCapability) {                                   // 2394
        var opListTask = {};                                                     // 2395
        opListTask.operatorListChanged = operatorListChanged;                    // 2396
        intentState.receivingOperatorList = true;                                // 2397
        intentState.opListReadCapability = createPromiseCapability();            // 2398
        intentState.renderTasks = [];                                            // 2399
        intentState.renderTasks.push(opListTask);                                // 2400
        intentState.operatorList = {                                             // 2401
          fnArray: [],                                                           // 2402
          argsArray: [],                                                         // 2403
          lastChunk: false                                                       // 2404
        };                                                                       // 2405
                                                                                 // 2406
        this.transport.messageHandler.send('RenderPageRequest', {                // 2407
          pageIndex: this.pageIndex,                                             // 2408
          intent: renderingIntent                                                // 2409
        });                                                                      // 2410
      }                                                                          // 2411
      return intentState.opListReadCapability.promise;                           // 2412
    },                                                                           // 2413
                                                                                 // 2414
    /**                                                                          // 2415
     * @return {Promise} That is resolved a {@link TextContent}                  // 2416
     * object that represent the page text content.                              // 2417
     */                                                                          // 2418
    getTextContent: function PDFPageProxy_getTextContent() {                     // 2419
      return this.transport.messageHandler.sendWithPromise('GetTextContent', {   // 2420
        pageIndex: this.pageNumber - 1                                           // 2421
      });                                                                        // 2422
    },                                                                           // 2423
    /**                                                                          // 2424
     * Destroys resources allocated by the page.                                 // 2425
     */                                                                          // 2426
    destroy: function PDFPageProxy_destroy() {                                   // 2427
      this.pendingDestroy = true;                                                // 2428
      this._tryDestroy();                                                        // 2429
    },                                                                           // 2430
    /**                                                                          // 2431
     * For internal use only. Attempts to clean up if rendering is in a state    // 2432
     * where that's possible.                                                    // 2433
     * @ignore                                                                   // 2434
     */                                                                          // 2435
    _tryDestroy: function PDFPageProxy__destroy() {                              // 2436
      if (!this.pendingDestroy ||                                                // 2437
          Object.keys(this.intentStates).some(function(intent) {                 // 2438
            var intentState = this.intentStates[intent];                         // 2439
            return (intentState.renderTasks.length !== 0 ||                      // 2440
                    intentState.receivingOperatorList);                          // 2441
          }, this)) {                                                            // 2442
        return;                                                                  // 2443
      }                                                                          // 2444
                                                                                 // 2445
      Object.keys(this.intentStates).forEach(function(intent) {                  // 2446
        delete this.intentStates[intent];                                        // 2447
      }, this);                                                                  // 2448
      this.objs.clear();                                                         // 2449
      this.annotationsPromise = null;                                            // 2450
      this.pendingDestroy = false;                                               // 2451
    },                                                                           // 2452
    /**                                                                          // 2453
     * For internal use only.                                                    // 2454
     * @ignore                                                                   // 2455
     */                                                                          // 2456
    _startRenderPage: function PDFPageProxy_startRenderPage(transparency,        // 2457
                                                            intent) {            // 2458
      var intentState = this.intentStates[intent];                               // 2459
      // TODO Refactor RenderPageRequest to separate rendering                   // 2460
      // and operator list logic                                                 // 2461
      if (intentState.displayReadyCapability) {                                  // 2462
        intentState.displayReadyCapability.resolve(transparency);                // 2463
      }                                                                          // 2464
    },                                                                           // 2465
    /**                                                                          // 2466
     * For internal use only.                                                    // 2467
     * @ignore                                                                   // 2468
     */                                                                          // 2469
    _renderPageChunk: function PDFPageProxy_renderPageChunk(operatorListChunk,   // 2470
                                                            intent) {            // 2471
      var intentState = this.intentStates[intent];                               // 2472
      var i, ii;                                                                 // 2473
      // Add the new chunk to the current operator list.                         // 2474
      for (i = 0, ii = operatorListChunk.length; i < ii; i++) {                  // 2475
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);     // 2476
        intentState.operatorList.argsArray.push(                                 // 2477
          operatorListChunk.argsArray[i]);                                       // 2478
      }                                                                          // 2479
      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;          // 2480
                                                                                 // 2481
      // Notify all the rendering tasks there are more operators to be consumed. // 2482
      for (i = 0; i < intentState.renderTasks.length; i++) {                     // 2483
        intentState.renderTasks[i].operatorListChanged();                        // 2484
      }                                                                          // 2485
                                                                                 // 2486
      if (operatorListChunk.lastChunk) {                                         // 2487
        intentState.receivingOperatorList = false;                               // 2488
        this._tryDestroy();                                                      // 2489
      }                                                                          // 2490
    }                                                                            // 2491
  };                                                                             // 2492
  return PDFPageProxy;                                                           // 2493
})();                                                                            // 2494
                                                                                 // 2495
/**                                                                              // 2496
 * For internal use only.                                                        // 2497
 * @ignore                                                                       // 2498
 */                                                                              // 2499
var WorkerTransport = (function WorkerTransportClosure() {                       // 2500
  function WorkerTransport(workerInitializedCapability, pdfDataRangeTransport) { // 2501
    this.pdfDataRangeTransport = pdfDataRangeTransport;                          // 2502
    this.workerInitializedCapability = workerInitializedCapability;              // 2503
    this.commonObjs = new PDFObjects();                                          // 2504
                                                                                 // 2505
    this.loadingTask = null;                                                     // 2506
                                                                                 // 2507
    this.pageCache = [];                                                         // 2508
    this.pagePromises = [];                                                      // 2509
    this.downloadInfoCapability = createPromiseCapability();                     // 2510
                                                                                 // 2511
    // If worker support isn't disabled explicit and the browser has worker      // 2512
    // support, create a new web worker and test if it/the browser fullfills     // 2513
    // all requirements to run parts of pdf.js in a web worker.                  // 2514
    // Right now, the requirement is, that an Uint8Array is still an Uint8Array  // 2515
    // as it arrives on the worker. Chrome added this with version 15.           // 2516
    if (!globalScope.PDFJS.disableWorker && typeof Worker !== 'undefined') {     // 2517
      var workerSrc = PDFJS.workerSrc;                                           // 2518
      if (!workerSrc) {                                                          // 2519
        error('No PDFJS.workerSrc specified');                                   // 2520
      }                                                                          // 2521
                                                                                 // 2522
      try {                                                                      // 2523
        // Some versions of FF can't create a worker on localhost, see:          // 2524
        // https://bugzilla.mozilla.org/show_bug.cgi?id=683280                   // 2525
        var worker = new Worker(workerSrc);                                      // 2526
        var messageHandler = new MessageHandler('main', worker);                 // 2527
        this.messageHandler = messageHandler;                                    // 2528
                                                                                 // 2529
        messageHandler.on('test', function transportTest(data) {                 // 2530
          var supportTypedArray = data && data.supportTypedArray;                // 2531
          if (supportTypedArray) {                                               // 2532
            this.worker = worker;                                                // 2533
            if (!data.supportTransfers) {                                        // 2534
              PDFJS.postMessageTransfers = false;                                // 2535
            }                                                                    // 2536
            this.setupMessageHandler(messageHandler);                            // 2537
            workerInitializedCapability.resolve();                               // 2538
          } else {                                                               // 2539
            this.setupFakeWorker();                                              // 2540
          }                                                                      // 2541
        }.bind(this));                                                           // 2542
                                                                                 // 2543
        var testObj = new Uint8Array([PDFJS.postMessageTransfers ? 255 : 0]);    // 2544
        // Some versions of Opera throw a DATA_CLONE_ERR on serializing the      // 2545
        // typed array. Also, checking if we can use transfers.                  // 2546
        try {                                                                    // 2547
          messageHandler.send('test', testObj, [testObj.buffer]);                // 2548
        } catch (ex) {                                                           // 2549
          info('Cannot use postMessage transfers');                              // 2550
          testObj[0] = 0;                                                        // 2551
          messageHandler.send('test', testObj);                                  // 2552
        }                                                                        // 2553
        return;                                                                  // 2554
      } catch (e) {                                                              // 2555
        info('The worker has been disabled.');                                   // 2556
      }                                                                          // 2557
    }                                                                            // 2558
    // Either workers are disabled, not supported or have thrown an exception.   // 2559
    // Thus, we fallback to a faked worker.                                      // 2560
    this.setupFakeWorker();                                                      // 2561
  }                                                                              // 2562
  WorkerTransport.prototype = {                                                  // 2563
    destroy: function WorkerTransport_destroy() {                                // 2564
      this.pageCache = [];                                                       // 2565
      this.pagePromises = [];                                                    // 2566
      var self = this;                                                           // 2567
      this.messageHandler.sendWithPromise('Terminate', null).then(function () {  // 2568
        FontLoader.clear();                                                      // 2569
        if (self.worker) {                                                       // 2570
          self.worker.terminate();                                               // 2571
        }                                                                        // 2572
      });                                                                        // 2573
    },                                                                           // 2574
                                                                                 // 2575
    setupFakeWorker: function WorkerTransport_setupFakeWorker() {                // 2576
      globalScope.PDFJS.disableWorker = true;                                    // 2577
                                                                                 // 2578
      if (!PDFJS.fakeWorkerFilesLoadedCapability) {                              // 2579
        PDFJS.fakeWorkerFilesLoadedCapability = createPromiseCapability();       // 2580
        // In the developer build load worker_loader which in turn loads all the // 2581
        // other files and resolves the promise. In production only the          // 2582
        // pdf.worker.js file is needed.                                         // 2583
        Util.loadScript(PDFJS.workerSrc, function() {                            // 2584
          PDFJS.fakeWorkerFilesLoadedCapability.resolve();                       // 2585
        });                                                                      // 2586
      }                                                                          // 2587
      PDFJS.fakeWorkerFilesLoadedCapability.promise.then(function () {           // 2588
        warn('Setting up fake worker.');                                         // 2589
        // If we don't use a worker, just post/sendMessage to the main thread.   // 2590
        var fakeWorker = {                                                       // 2591
          postMessage: function WorkerTransport_postMessage(obj) {               // 2592
            fakeWorker.onmessage({data: obj});                                   // 2593
          },                                                                     // 2594
          terminate: function WorkerTransport_terminate() {}                     // 2595
        };                                                                       // 2596
                                                                                 // 2597
        var messageHandler = new MessageHandler('main', fakeWorker);             // 2598
        this.setupMessageHandler(messageHandler);                                // 2599
                                                                                 // 2600
        // If the main thread is our worker, setup the handling for the messages // 2601
        // the main thread sends to it self.                                     // 2602
        PDFJS.WorkerMessageHandler.setup(messageHandler);                        // 2603
                                                                                 // 2604
        this.workerInitializedCapability.resolve();                              // 2605
      }.bind(this));                                                             // 2606
    },                                                                           // 2607
                                                                                 // 2608
    setupMessageHandler:                                                         // 2609
      function WorkerTransport_setupMessageHandler(messageHandler) {             // 2610
      this.messageHandler = messageHandler;                                      // 2611
                                                                                 // 2612
      function updatePassword(password) {                                        // 2613
        messageHandler.send('UpdatePassword', password);                         // 2614
      }                                                                          // 2615
                                                                                 // 2616
      var pdfDataRangeTransport = this.pdfDataRangeTransport;                    // 2617
      if (pdfDataRangeTransport) {                                               // 2618
        pdfDataRangeTransport.addRangeListener(function(begin, chunk) {          // 2619
          messageHandler.send('OnDataRange', {                                   // 2620
            begin: begin,                                                        // 2621
            chunk: chunk                                                         // 2622
          });                                                                    // 2623
        });                                                                      // 2624
                                                                                 // 2625
        pdfDataRangeTransport.addProgressListener(function(loaded) {             // 2626
          messageHandler.send('OnDataProgress', {                                // 2627
            loaded: loaded                                                       // 2628
          });                                                                    // 2629
        });                                                                      // 2630
                                                                                 // 2631
        pdfDataRangeTransport.addProgressiveReadListener(function(chunk) {       // 2632
          messageHandler.send('OnDataRange', {                                   // 2633
            chunk: chunk                                                         // 2634
          });                                                                    // 2635
        });                                                                      // 2636
                                                                                 // 2637
        messageHandler.on('RequestDataRange',                                    // 2638
          function transportDataRange(data) {                                    // 2639
            pdfDataRangeTransport.requestDataRange(data.begin, data.end);        // 2640
          }, this);                                                              // 2641
      }                                                                          // 2642
                                                                                 // 2643
      messageHandler.on('GetDoc', function transportDoc(data) {                  // 2644
        var pdfInfo = data.pdfInfo;                                              // 2645
        this.numPages = data.pdfInfo.numPages;                                   // 2646
        var pdfDocument = new PDFDocumentProxy(pdfInfo, this);                   // 2647
        this.pdfDocument = pdfDocument;                                          // 2648
        this.loadingTask._capability.resolve(pdfDocument);                       // 2649
      }, this);                                                                  // 2650
                                                                                 // 2651
      messageHandler.on('NeedPassword',                                          // 2652
                        function transportNeedPassword(exception) {              // 2653
        var loadingTask = this.loadingTask;                                      // 2654
        if (loadingTask.onPassword) {                                            // 2655
          return loadingTask.onPassword(updatePassword,                          // 2656
                                        PasswordResponses.NEED_PASSWORD);        // 2657
        }                                                                        // 2658
        loadingTask._capability.reject(                                          // 2659
          new PasswordException(exception.message, exception.code));             // 2660
      }, this);                                                                  // 2661
                                                                                 // 2662
      messageHandler.on('IncorrectPassword',                                     // 2663
                        function transportIncorrectPassword(exception) {         // 2664
        var loadingTask = this.loadingTask;                                      // 2665
        if (loadingTask.onPassword) {                                            // 2666
          return loadingTask.onPassword(updatePassword,                          // 2667
                                        PasswordResponses.INCORRECT_PASSWORD);   // 2668
        }                                                                        // 2669
        loadingTask._capability.reject(                                          // 2670
          new PasswordException(exception.message, exception.code));             // 2671
      }, this);                                                                  // 2672
                                                                                 // 2673
      messageHandler.on('InvalidPDF', function transportInvalidPDF(exception) {  // 2674
        this.loadingTask._capability.reject(                                     // 2675
          new InvalidPDFException(exception.message));                           // 2676
      }, this);                                                                  // 2677
                                                                                 // 2678
      messageHandler.on('MissingPDF', function transportMissingPDF(exception) {  // 2679
        this.loadingTask._capability.reject(                                     // 2680
          new MissingPDFException(exception.message));                           // 2681
      }, this);                                                                  // 2682
                                                                                 // 2683
      messageHandler.on('UnexpectedResponse',                                    // 2684
                        function transportUnexpectedResponse(exception) {        // 2685
        this.loadingTask._capability.reject(                                     // 2686
          new UnexpectedResponseException(exception.message, exception.status)); // 2687
      }, this);                                                                  // 2688
                                                                                 // 2689
      messageHandler.on('UnknownError',                                          // 2690
                        function transportUnknownError(exception) {              // 2691
        this.loadingTask._capability.reject(                                     // 2692
          new UnknownErrorException(exception.message, exception.details));      // 2693
      }, this);                                                                  // 2694
                                                                                 // 2695
      messageHandler.on('DataLoaded', function transportPage(data) {             // 2696
        this.downloadInfoCapability.resolve(data);                               // 2697
      }, this);                                                                  // 2698
                                                                                 // 2699
      messageHandler.on('PDFManagerReady', function transportPage(data) {        // 2700
        if (this.pdfDataRangeTransport) {                                        // 2701
          this.pdfDataRangeTransport.transportReady();                           // 2702
        }                                                                        // 2703
      }, this);                                                                  // 2704
                                                                                 // 2705
      messageHandler.on('StartRenderPage', function transportRender(data) {      // 2706
        var page = this.pageCache[data.pageIndex];                               // 2707
                                                                                 // 2708
        page.stats.timeEnd('Page Request');                                      // 2709
        page._startRenderPage(data.transparency, data.intent);                   // 2710
      }, this);                                                                  // 2711
                                                                                 // 2712
      messageHandler.on('RenderPageChunk', function transportRender(data) {      // 2713
        var page = this.pageCache[data.pageIndex];                               // 2714
                                                                                 // 2715
        page._renderPageChunk(data.operatorList, data.intent);                   // 2716
      }, this);                                                                  // 2717
                                                                                 // 2718
      messageHandler.on('commonobj', function transportObj(data) {               // 2719
        var id = data[0];                                                        // 2720
        var type = data[1];                                                      // 2721
        if (this.commonObjs.hasData(id)) {                                       // 2722
          return;                                                                // 2723
        }                                                                        // 2724
                                                                                 // 2725
        switch (type) {                                                          // 2726
          case 'Font':                                                           // 2727
            var exportedData = data[2];                                          // 2728
                                                                                 // 2729
            var font;                                                            // 2730
            if ('error' in exportedData) {                                       // 2731
              var error = exportedData.error;                                    // 2732
              warn('Error during font loading: ' + error);                       // 2733
              this.commonObjs.resolve(id, error);                                // 2734
              break;                                                             // 2735
            } else {                                                             // 2736
              font = new FontFaceObject(exportedData);                           // 2737
            }                                                                    // 2738
                                                                                 // 2739
            FontLoader.bind(                                                     // 2740
              [font],                                                            // 2741
              function fontReady(fontObjs) {                                     // 2742
                this.commonObjs.resolve(id, font);                               // 2743
              }.bind(this)                                                       // 2744
            );                                                                   // 2745
            break;                                                               // 2746
          case 'FontPath':                                                       // 2747
            this.commonObjs.resolve(id, data[2]);                                // 2748
            break;                                                               // 2749
          default:                                                               // 2750
            error('Got unknown common object type ' + type);                     // 2751
        }                                                                        // 2752
      }, this);                                                                  // 2753
                                                                                 // 2754
      messageHandler.on('obj', function transportObj(data) {                     // 2755
        var id = data[0];                                                        // 2756
        var pageIndex = data[1];                                                 // 2757
        var type = data[2];                                                      // 2758
        var pageProxy = this.pageCache[pageIndex];                               // 2759
        var imageData;                                                           // 2760
        if (pageProxy.objs.hasData(id)) {                                        // 2761
          return;                                                                // 2762
        }                                                                        // 2763
                                                                                 // 2764
        switch (type) {                                                          // 2765
          case 'JpegStream':                                                     // 2766
            imageData = data[3];                                                 // 2767
            loadJpegStream(id, imageData, pageProxy.objs);                       // 2768
            break;                                                               // 2769
          case 'Image':                                                          // 2770
            imageData = data[3];                                                 // 2771
            pageProxy.objs.resolve(id, imageData);                               // 2772
                                                                                 // 2773
            // heuristics that will allow not to store large data                // 2774
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;                               // 2775
            if (imageData && 'data' in imageData &&                              // 2776
                imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) {               // 2777
              pageProxy.cleanupAfterRender = true;                               // 2778
            }                                                                    // 2779
            break;                                                               // 2780
          default:                                                               // 2781
            error('Got unknown object type ' + type);                            // 2782
        }                                                                        // 2783
      }, this);                                                                  // 2784
                                                                                 // 2785
      messageHandler.on('DocProgress', function transportDocProgress(data) {     // 2786
        var loadingTask = this.loadingTask;                                      // 2787
        if (loadingTask.onProgress) {                                            // 2788
          loadingTask.onProgress({                                               // 2789
            loaded: data.loaded,                                                 // 2790
            total: data.total                                                    // 2791
          });                                                                    // 2792
        }                                                                        // 2793
      }, this);                                                                  // 2794
                                                                                 // 2795
      messageHandler.on('PageError', function transportError(data) {             // 2796
        var page = this.pageCache[data.pageNum - 1];                             // 2797
        var intentState = page.intentStates[data.intent];                        // 2798
        if (intentState.displayReadyCapability) {                                // 2799
          intentState.displayReadyCapability.reject(data.error);                 // 2800
        } else {                                                                 // 2801
          error(data.error);                                                     // 2802
        }                                                                        // 2803
      }, this);                                                                  // 2804
                                                                                 // 2805
      messageHandler.on('JpegDecode', function(data) {                           // 2806
        var imageUrl = data[0];                                                  // 2807
        var components = data[1];                                                // 2808
        if (components !== 3 && components !== 1) {                              // 2809
          return Promise.reject(                                                 // 2810
            new Error('Only 3 components or 1 component can be returned'));      // 2811
        }                                                                        // 2812
                                                                                 // 2813
        return new Promise(function (resolve, reject) {                          // 2814
          var img = new Image();                                                 // 2815
          img.onload = function () {                                             // 2816
            var width = img.width;                                               // 2817
            var height = img.height;                                             // 2818
            var size = width * height;                                           // 2819
            var rgbaLength = size * 4;                                           // 2820
            var buf = new Uint8Array(size * components);                         // 2821
            var tmpCanvas = createScratchCanvas(width, height);                  // 2822
            var tmpCtx = tmpCanvas.getContext('2d');                             // 2823
            tmpCtx.drawImage(img, 0, 0);                                         // 2824
            var data = tmpCtx.getImageData(0, 0, width, height).data;            // 2825
            var i, j;                                                            // 2826
                                                                                 // 2827
            if (components === 3) {                                              // 2828
              for (i = 0, j = 0; i < rgbaLength; i += 4, j += 3) {               // 2829
                buf[j] = data[i];                                                // 2830
                buf[j + 1] = data[i + 1];                                        // 2831
                buf[j + 2] = data[i + 2];                                        // 2832
              }                                                                  // 2833
            } else if (components === 1) {                                       // 2834
              for (i = 0, j = 0; i < rgbaLength; i += 4, j++) {                  // 2835
                buf[j] = data[i];                                                // 2836
              }                                                                  // 2837
            }                                                                    // 2838
            resolve({ data: buf, width: width, height: height});                 // 2839
          };                                                                     // 2840
          img.onerror = function () {                                            // 2841
            reject(new Error('JpegDecode failed to load image'));                // 2842
          };                                                                     // 2843
          img.src = imageUrl;                                                    // 2844
        });                                                                      // 2845
      });                                                                        // 2846
    },                                                                           // 2847
                                                                                 // 2848
    fetchDocument: function WorkerTransport_fetchDocument(loadingTask, source) { // 2849
      this.loadingTask = loadingTask;                                            // 2850
                                                                                 // 2851
      source.disableAutoFetch = PDFJS.disableAutoFetch;                          // 2852
      source.disableStream = PDFJS.disableStream;                                // 2853
      source.chunkedViewerLoading = !!this.pdfDataRangeTransport;                // 2854
      if (this.pdfDataRangeTransport) {                                          // 2855
        source.length = this.pdfDataRangeTransport.length;                       // 2856
        source.initialData = this.pdfDataRangeTransport.initialData;             // 2857
      }                                                                          // 2858
      this.messageHandler.send('GetDocRequest', {                                // 2859
        source: source,                                                          // 2860
        disableRange: PDFJS.disableRange,                                        // 2861
        maxImageSize: PDFJS.maxImageSize,                                        // 2862
        cMapUrl: PDFJS.cMapUrl,                                                  // 2863
        cMapPacked: PDFJS.cMapPacked,                                            // 2864
        disableFontFace: PDFJS.disableFontFace,                                  // 2865
        disableCreateObjectURL: PDFJS.disableCreateObjectURL,                    // 2866
        verbosity: PDFJS.verbosity                                               // 2867
      });                                                                        // 2868
    },                                                                           // 2869
                                                                                 // 2870
    getData: function WorkerTransport_getData() {                                // 2871
      return this.messageHandler.sendWithPromise('GetData', null);               // 2872
    },                                                                           // 2873
                                                                                 // 2874
    getPage: function WorkerTransport_getPage(pageNumber, capability) {          // 2875
      if (pageNumber <= 0 || pageNumber > this.numPages ||                       // 2876
          (pageNumber|0) !== pageNumber) {                                       // 2877
        return Promise.reject(new Error('Invalid page request'));                // 2878
      }                                                                          // 2879
                                                                                 // 2880
      var pageIndex = pageNumber - 1;                                            // 2881
      if (pageIndex in this.pagePromises) {                                      // 2882
        return this.pagePromises[pageIndex];                                     // 2883
      }                                                                          // 2884
      var promise = this.messageHandler.sendWithPromise('GetPage', {             // 2885
        pageIndex: pageIndex                                                     // 2886
      }).then(function (pageInfo) {                                              // 2887
        var page = new PDFPageProxy(pageIndex, pageInfo, this);                  // 2888
        this.pageCache[pageIndex] = page;                                        // 2889
        return page;                                                             // 2890
      }.bind(this));                                                             // 2891
      this.pagePromises[pageIndex] = promise;                                    // 2892
      return promise;                                                            // 2893
    },                                                                           // 2894
                                                                                 // 2895
    getPageIndex: function WorkerTransport_getPageIndexByRef(ref) {              // 2896
      return this.messageHandler.sendWithPromise('GetPageIndex', { ref: ref });  // 2897
    },                                                                           // 2898
                                                                                 // 2899
    getAnnotations: function WorkerTransport_getAnnotations(pageIndex) {         // 2900
      return this.messageHandler.sendWithPromise('GetAnnotations',               // 2901
        { pageIndex: pageIndex });                                               // 2902
    },                                                                           // 2903
                                                                                 // 2904
    getDestinations: function WorkerTransport_getDestinations() {                // 2905
      return this.messageHandler.sendWithPromise('GetDestinations', null);       // 2906
    },                                                                           // 2907
                                                                                 // 2908
    getDestination: function WorkerTransport_getDestination(id) {                // 2909
      return this.messageHandler.sendWithPromise('GetDestination', { id: id } ); // 2910
    },                                                                           // 2911
                                                                                 // 2912
    getAttachments: function WorkerTransport_getAttachments() {                  // 2913
      return this.messageHandler.sendWithPromise('GetAttachments', null);        // 2914
    },                                                                           // 2915
                                                                                 // 2916
    getJavaScript: function WorkerTransport_getJavaScript() {                    // 2917
      return this.messageHandler.sendWithPromise('GetJavaScript', null);         // 2918
    },                                                                           // 2919
                                                                                 // 2920
    getOutline: function WorkerTransport_getOutline() {                          // 2921
      return this.messageHandler.sendWithPromise('GetOutline', null);            // 2922
    },                                                                           // 2923
                                                                                 // 2924
    getMetadata: function WorkerTransport_getMetadata() {                        // 2925
      return this.messageHandler.sendWithPromise('GetMetadata', null).           // 2926
        then(function transportMetadata(results) {                               // 2927
        return {                                                                 // 2928
          info: results[0],                                                      // 2929
          metadata: (results[1] ? new PDFJS.Metadata(results[1]) : null)         // 2930
        };                                                                       // 2931
      });                                                                        // 2932
    },                                                                           // 2933
                                                                                 // 2934
    getStats: function WorkerTransport_getStats() {                              // 2935
      return this.messageHandler.sendWithPromise('GetStats', null);              // 2936
    },                                                                           // 2937
                                                                                 // 2938
    startCleanup: function WorkerTransport_startCleanup() {                      // 2939
      this.messageHandler.sendWithPromise('Cleanup', null).                      // 2940
        then(function endCleanup() {                                             // 2941
        for (var i = 0, ii = this.pageCache.length; i < ii; i++) {               // 2942
          var page = this.pageCache[i];                                          // 2943
          if (page) {                                                            // 2944
            page.destroy();                                                      // 2945
          }                                                                      // 2946
        }                                                                        // 2947
        this.commonObjs.clear();                                                 // 2948
        FontLoader.clear();                                                      // 2949
      }.bind(this));                                                             // 2950
    }                                                                            // 2951
  };                                                                             // 2952
  return WorkerTransport;                                                        // 2953
                                                                                 // 2954
})();                                                                            // 2955
                                                                                 // 2956
/**                                                                              // 2957
 * A PDF document and page is built of many objects. E.g. there are objects      // 2958
 * for fonts, images, rendering code and such. These objects might get processed // 2959
 * inside of a worker. The `PDFObjects` implements some basic functions to       // 2960
 * manage these objects.                                                         // 2961
 * @ignore                                                                       // 2962
 */                                                                              // 2963
var PDFObjects = (function PDFObjectsClosure() {                                 // 2964
  function PDFObjects() {                                                        // 2965
    this.objs = {};                                                              // 2966
  }                                                                              // 2967
                                                                                 // 2968
  PDFObjects.prototype = {                                                       // 2969
    /**                                                                          // 2970
     * Internal function.                                                        // 2971
     * Ensures there is an object defined for `objId`.                           // 2972
     */                                                                          // 2973
    ensureObj: function PDFObjects_ensureObj(objId) {                            // 2974
      if (this.objs[objId]) {                                                    // 2975
        return this.objs[objId];                                                 // 2976
      }                                                                          // 2977
                                                                                 // 2978
      var obj = {                                                                // 2979
        capability: createPromiseCapability(),                                   // 2980
        data: null,                                                              // 2981
        resolved: false                                                          // 2982
      };                                                                         // 2983
      this.objs[objId] = obj;                                                    // 2984
                                                                                 // 2985
      return obj;                                                                // 2986
    },                                                                           // 2987
                                                                                 // 2988
    /**                                                                          // 2989
     * If called *without* callback, this returns the data of `objId` but the    // 2990
     * object needs to be resolved. If it isn't, this function throws.           // 2991
     *                                                                           // 2992
     * If called *with* a callback, the callback is called with the data of the  // 2993
     * object once the object is resolved. That means, if you call this          // 2994
     * function and the object is already resolved, the callback gets called     // 2995
     * right away.                                                               // 2996
     */                                                                          // 2997
    get: function PDFObjects_get(objId, callback) {                              // 2998
      // If there is a callback, then the get can be async and the object is     // 2999
      // not required to be resolved right now                                   // 3000
      if (callback) {                                                            // 3001
        this.ensureObj(objId).capability.promise.then(callback);                 // 3002
        return null;                                                             // 3003
      }                                                                          // 3004
                                                                                 // 3005
      // If there isn't a callback, the user expects to get the resolved data    // 3006
      // directly.                                                               // 3007
      var obj = this.objs[objId];                                                // 3008
                                                                                 // 3009
      // If there isn't an object yet or the object isn't resolved, then the     // 3010
      // data isn't ready yet!                                                   // 3011
      if (!obj || !obj.resolved) {                                               // 3012
        error('Requesting object that isn\'t resolved yet ' + objId);            // 3013
      }                                                                          // 3014
                                                                                 // 3015
      return obj.data;                                                           // 3016
    },                                                                           // 3017
                                                                                 // 3018
    /**                                                                          // 3019
     * Resolves the object `objId` with optional `data`.                         // 3020
     */                                                                          // 3021
    resolve: function PDFObjects_resolve(objId, data) {                          // 3022
      var obj = this.ensureObj(objId);                                           // 3023
                                                                                 // 3024
      obj.resolved = true;                                                       // 3025
      obj.data = data;                                                           // 3026
      obj.capability.resolve(data);                                              // 3027
    },                                                                           // 3028
                                                                                 // 3029
    isResolved: function PDFObjects_isResolved(objId) {                          // 3030
      var objs = this.objs;                                                      // 3031
                                                                                 // 3032
      if (!objs[objId]) {                                                        // 3033
        return false;                                                            // 3034
      } else {                                                                   // 3035
        return objs[objId].resolved;                                             // 3036
      }                                                                          // 3037
    },                                                                           // 3038
                                                                                 // 3039
    hasData: function PDFObjects_hasData(objId) {                                // 3040
      return this.isResolved(objId);                                             // 3041
    },                                                                           // 3042
                                                                                 // 3043
    /**                                                                          // 3044
     * Returns the data of `objId` if object exists, null otherwise.             // 3045
     */                                                                          // 3046
    getData: function PDFObjects_getData(objId) {                                // 3047
      var objs = this.objs;                                                      // 3048
      if (!objs[objId] || !objs[objId].resolved) {                               // 3049
        return null;                                                             // 3050
      } else {                                                                   // 3051
        return objs[objId].data;                                                 // 3052
      }                                                                          // 3053
    },                                                                           // 3054
                                                                                 // 3055
    clear: function PDFObjects_clear() {                                         // 3056
      this.objs = {};                                                            // 3057
    }                                                                            // 3058
  };                                                                             // 3059
  return PDFObjects;                                                             // 3060
})();                                                                            // 3061
                                                                                 // 3062
/**                                                                              // 3063
 * Allows controlling of the rendering tasks.                                    // 3064
 * @class                                                                        // 3065
 */                                                                              // 3066
var RenderTask = (function RenderTaskClosure() {                                 // 3067
  function RenderTask(internalRenderTask) {                                      // 3068
    this._internalRenderTask = internalRenderTask;                               // 3069
                                                                                 // 3070
    /**                                                                          // 3071
     * Callback for incremental rendering -- a function that will be called      // 3072
     * each time the rendering is paused.  To continue rendering call the        // 3073
     * function that is the first argument to the callback.                      // 3074
     * @type {function}                                                          // 3075
     */                                                                          // 3076
    this.onContinue = null;                                                      // 3077
  }                                                                              // 3078
                                                                                 // 3079
  RenderTask.prototype = /** @lends RenderTask.prototype */ {                    // 3080
    /**                                                                          // 3081
     * Promise for rendering task completion.                                    // 3082
     * @return {Promise}                                                         // 3083
     */                                                                          // 3084
    get promise() {                                                              // 3085
      return this._internalRenderTask.capability.promise;                        // 3086
    },                                                                           // 3087
                                                                                 // 3088
    /**                                                                          // 3089
     * Cancels the rendering task. If the task is currently rendering it will    // 3090
     * not be cancelled until graphics pauses with a timeout. The promise that   // 3091
     * this object extends will resolved when cancelled.                         // 3092
     */                                                                          // 3093
    cancel: function RenderTask_cancel() {                                       // 3094
      this._internalRenderTask.cancel();                                         // 3095
    },                                                                           // 3096
                                                                                 // 3097
    /**                                                                          // 3098
     * Registers callbacks to indicate the rendering task completion.            // 3099
     *                                                                           // 3100
     * @param {function} onFulfilled The callback for the rendering completion.  // 3101
     * @param {function} onRejected The callback for the rendering failure.      // 3102
     * @return {Promise} A promise that is resolved after the onFulfilled or     // 3103
     *                   onRejected callback.                                    // 3104
     */                                                                          // 3105
    then: function RenderTask_then(onFulfilled, onRejected) {                    // 3106
      return this.promise.then.apply(this.promise, arguments);                   // 3107
    }                                                                            // 3108
  };                                                                             // 3109
                                                                                 // 3110
  return RenderTask;                                                             // 3111
})();                                                                            // 3112
                                                                                 // 3113
/**                                                                              // 3114
 * For internal use only.                                                        // 3115
 * @ignore                                                                       // 3116
 */                                                                              // 3117
var InternalRenderTask = (function InternalRenderTaskClosure() {                 // 3118
                                                                                 // 3119
  function InternalRenderTask(callback, params, objs, commonObjs, operatorList,  // 3120
                              pageNumber) {                                      // 3121
    this.callback = callback;                                                    // 3122
    this.params = params;                                                        // 3123
    this.objs = objs;                                                            // 3124
    this.commonObjs = commonObjs;                                                // 3125
    this.operatorListIdx = null;                                                 // 3126
    this.operatorList = operatorList;                                            // 3127
    this.pageNumber = pageNumber;                                                // 3128
    this.running = false;                                                        // 3129
    this.graphicsReadyCallback = null;                                           // 3130
    this.graphicsReady = false;                                                  // 3131
    this.cancelled = false;                                                      // 3132
    this.capability = createPromiseCapability();                                 // 3133
    this.task = new RenderTask(this);                                            // 3134
    // caching this-bound methods                                                // 3135
    this._continueBound = this._continue.bind(this);                             // 3136
    this._scheduleNextBound = this._scheduleNext.bind(this);                     // 3137
    this._nextBound = this._next.bind(this);                                     // 3138
  }                                                                              // 3139
                                                                                 // 3140
  InternalRenderTask.prototype = {                                               // 3141
                                                                                 // 3142
    initalizeGraphics:                                                           // 3143
        function InternalRenderTask_initalizeGraphics(transparency) {            // 3144
                                                                                 // 3145
      if (this.cancelled) {                                                      // 3146
        return;                                                                  // 3147
      }                                                                          // 3148
      if (PDFJS.pdfBug && 'StepperManager' in globalScope &&                     // 3149
          globalScope.StepperManager.enabled) {                                  // 3150
        this.stepper = globalScope.StepperManager.create(this.pageNumber - 1);   // 3151
        this.stepper.init(this.operatorList);                                    // 3152
        this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();          // 3153
      }                                                                          // 3154
                                                                                 // 3155
      var params = this.params;                                                  // 3156
      this.gfx = new CanvasGraphics(params.canvasContext, this.commonObjs,       // 3157
                                    this.objs, params.imageLayer);               // 3158
                                                                                 // 3159
      this.gfx.beginDrawing(params.viewport, transparency);                      // 3160
      this.operatorListIdx = 0;                                                  // 3161
      this.graphicsReady = true;                                                 // 3162
      if (this.graphicsReadyCallback) {                                          // 3163
        this.graphicsReadyCallback();                                            // 3164
      }                                                                          // 3165
    },                                                                           // 3166
                                                                                 // 3167
    cancel: function InternalRenderTask_cancel() {                               // 3168
      this.running = false;                                                      // 3169
      this.cancelled = true;                                                     // 3170
      this.callback('cancelled');                                                // 3171
    },                                                                           // 3172
                                                                                 // 3173
    operatorListChanged: function InternalRenderTask_operatorListChanged() {     // 3174
      if (!this.graphicsReady) {                                                 // 3175
        if (!this.graphicsReadyCallback) {                                       // 3176
          this.graphicsReadyCallback = this._continueBound;                      // 3177
        }                                                                        // 3178
        return;                                                                  // 3179
      }                                                                          // 3180
                                                                                 // 3181
      if (this.stepper) {                                                        // 3182
        this.stepper.updateOperatorList(this.operatorList);                      // 3183
      }                                                                          // 3184
                                                                                 // 3185
      if (this.running) {                                                        // 3186
        return;                                                                  // 3187
      }                                                                          // 3188
      this._continue();                                                          // 3189
    },                                                                           // 3190
                                                                                 // 3191
    _continue: function InternalRenderTask__continue() {                         // 3192
      this.running = true;                                                       // 3193
      if (this.cancelled) {                                                      // 3194
        return;                                                                  // 3195
      }                                                                          // 3196
      if (this.task.onContinue) {                                                // 3197
        this.task.onContinue.call(this.task, this._scheduleNextBound);           // 3198
      } else {                                                                   // 3199
        this._scheduleNext();                                                    // 3200
      }                                                                          // 3201
    },                                                                           // 3202
                                                                                 // 3203
    _scheduleNext: function InternalRenderTask__scheduleNext() {                 // 3204
      window.requestAnimationFrame(this._nextBound);                             // 3205
    },                                                                           // 3206
                                                                                 // 3207
    _next: function InternalRenderTask__next() {                                 // 3208
      if (this.cancelled) {                                                      // 3209
        return;                                                                  // 3210
      }                                                                          // 3211
      this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList,     // 3212
                                        this.operatorListIdx,                    // 3213
                                        this._continueBound,                     // 3214
                                        this.stepper);                           // 3215
      if (this.operatorListIdx === this.operatorList.argsArray.length) {         // 3216
        this.running = false;                                                    // 3217
        if (this.operatorList.lastChunk) {                                       // 3218
          this.gfx.endDrawing();                                                 // 3219
          this.callback();                                                       // 3220
        }                                                                        // 3221
      }                                                                          // 3222
    }                                                                            // 3223
                                                                                 // 3224
  };                                                                             // 3225
                                                                                 // 3226
  return InternalRenderTask;                                                     // 3227
})();                                                                            // 3228
                                                                                 // 3229
                                                                                 // 3230
var Metadata = PDFJS.Metadata = (function MetadataClosure() {                    // 3231
  function fixMetadata(meta) {                                                   // 3232
    return meta.replace(/>\\376\\377([^<]+)/g, function(all, codes) {            // 3233
      var bytes = codes.replace(/\\([0-3])([0-7])([0-7])/g,                      // 3234
                                function(code, d1, d2, d3) {                     // 3235
        return String.fromCharCode(d1 * 64 + d2 * 8 + d3 * 1);                   // 3236
      });                                                                        // 3237
      var chars = '';                                                            // 3238
      for (var i = 0; i < bytes.length; i += 2) {                                // 3239
        var code = bytes.charCodeAt(i) * 256 + bytes.charCodeAt(i + 1);          // 3240
        chars += code >= 32 && code < 127 && code !== 60 && code !== 62 &&       // 3241
          code !== 38 && false ? String.fromCharCode(code) :                     // 3242
          '&#x' + (0x10000 + code).toString(16).substring(1) + ';';              // 3243
      }                                                                          // 3244
      return '>' + chars;                                                        // 3245
    });                                                                          // 3246
  }                                                                              // 3247
                                                                                 // 3248
  function Metadata(meta) {                                                      // 3249
    if (typeof meta === 'string') {                                              // 3250
      // Ghostscript produces invalid metadata                                   // 3251
      meta = fixMetadata(meta);                                                  // 3252
                                                                                 // 3253
      var parser = new DOMParser();                                              // 3254
      meta = parser.parseFromString(meta, 'application/xml');                    // 3255
    } else if (!(meta instanceof Document)) {                                    // 3256
      error('Metadata: Invalid metadata object');                                // 3257
    }                                                                            // 3258
                                                                                 // 3259
    this.metaDocument = meta;                                                    // 3260
    this.metadata = {};                                                          // 3261
    this.parse();                                                                // 3262
  }                                                                              // 3263
                                                                                 // 3264
  Metadata.prototype = {                                                         // 3265
    parse: function Metadata_parse() {                                           // 3266
      var doc = this.metaDocument;                                               // 3267
      var rdf = doc.documentElement;                                             // 3268
                                                                                 // 3269
      if (rdf.nodeName.toLowerCase() !== 'rdf:rdf') { // Wrapped in <xmpmeta>    // 3270
        rdf = rdf.firstChild;                                                    // 3271
        while (rdf && rdf.nodeName.toLowerCase() !== 'rdf:rdf') {                // 3272
          rdf = rdf.nextSibling;                                                 // 3273
        }                                                                        // 3274
      }                                                                          // 3275
                                                                                 // 3276
      var nodeName = (rdf) ? rdf.nodeName.toLowerCase() : null;                  // 3277
      if (!rdf || nodeName !== 'rdf:rdf' || !rdf.hasChildNodes()) {              // 3278
        return;                                                                  // 3279
      }                                                                          // 3280
                                                                                 // 3281
      var children = rdf.childNodes, desc, entry, name, i, ii, length, iLength;  // 3282
      for (i = 0, length = children.length; i < length; i++) {                   // 3283
        desc = children[i];                                                      // 3284
        if (desc.nodeName.toLowerCase() !== 'rdf:description') {                 // 3285
          continue;                                                              // 3286
        }                                                                        // 3287
                                                                                 // 3288
        for (ii = 0, iLength = desc.childNodes.length; ii < iLength; ii++) {     // 3289
          if (desc.childNodes[ii].nodeName.toLowerCase() !== '#text') {          // 3290
            entry = desc.childNodes[ii];                                         // 3291
            name = entry.nodeName.toLowerCase();                                 // 3292
            this.metadata[name] = entry.textContent.trim();                      // 3293
          }                                                                      // 3294
        }                                                                        // 3295
      }                                                                          // 3296
    },                                                                           // 3297
                                                                                 // 3298
    get: function Metadata_get(name) {                                           // 3299
      return this.metadata[name] || null;                                        // 3300
    },                                                                           // 3301
                                                                                 // 3302
    has: function Metadata_has(name) {                                           // 3303
      return typeof this.metadata[name] !== 'undefined';                         // 3304
    }                                                                            // 3305
  };                                                                             // 3306
                                                                                 // 3307
  return Metadata;                                                               // 3308
})();                                                                            // 3309
                                                                                 // 3310
                                                                                 // 3311
// <canvas> contexts store most of the state we need natively.                   // 3312
// However, PDF needs a bit more state, which we store here.                     // 3313
                                                                                 // 3314
// Minimal font size that would be used during canvas fillText operations.       // 3315
var MIN_FONT_SIZE = 16;                                                          // 3316
// Maximum font size that would be used during canvas fillText operations.       // 3317
var MAX_FONT_SIZE = 100;                                                         // 3318
var MAX_GROUP_SIZE = 4096;                                                       // 3319
                                                                                 // 3320
// Heuristic value used when enforcing minimum line widths.                      // 3321
var MIN_WIDTH_FACTOR = 0.65;                                                     // 3322
                                                                                 // 3323
var COMPILE_TYPE3_GLYPHS = true;                                                 // 3324
var MAX_SIZE_TO_COMPILE = 1000;                                                  // 3325
                                                                                 // 3326
var FULL_CHUNK_HEIGHT = 16;                                                      // 3327
                                                                                 // 3328
function createScratchCanvas(width, height) {                                    // 3329
  var canvas = document.createElement('canvas');                                 // 3330
  canvas.width = width;                                                          // 3331
  canvas.height = height;                                                        // 3332
  return canvas;                                                                 // 3333
}                                                                                // 3334
                                                                                 // 3335
function addContextCurrentTransform(ctx) {                                       // 3336
  // If the context doesn't expose a `mozCurrentTransform`, add a JS based one.  // 3337
  if (!ctx.mozCurrentTransform) {                                                // 3338
    ctx._originalSave = ctx.save;                                                // 3339
    ctx._originalRestore = ctx.restore;                                          // 3340
    ctx._originalRotate = ctx.rotate;                                            // 3341
    ctx._originalScale = ctx.scale;                                              // 3342
    ctx._originalTranslate = ctx.translate;                                      // 3343
    ctx._originalTransform = ctx.transform;                                      // 3344
    ctx._originalSetTransform = ctx.setTransform;                                // 3345
                                                                                 // 3346
    ctx._transformMatrix = ctx._transformMatrix || [1, 0, 0, 1, 0, 0];           // 3347
    ctx._transformStack = [];                                                    // 3348
                                                                                 // 3349
    Object.defineProperty(ctx, 'mozCurrentTransform', {                          // 3350
      get: function getCurrentTransform() {                                      // 3351
        return this._transformMatrix;                                            // 3352
      }                                                                          // 3353
    });                                                                          // 3354
                                                                                 // 3355
    Object.defineProperty(ctx, 'mozCurrentTransformInverse', {                   // 3356
      get: function getCurrentTransformInverse() {                               // 3357
        // Calculation done using WolframAlpha:                                  // 3358
        // http://www.wolframalpha.com/input/?                                   // 3359
        //   i=Inverse+{{a%2C+c%2C+e}%2C+{b%2C+d%2C+f}%2C+{0%2C+0%2C+1}}         // 3360
                                                                                 // 3361
        var m = this._transformMatrix;                                           // 3362
        var a = m[0], b = m[1], c = m[2], d = m[3], e = m[4], f = m[5];          // 3363
                                                                                 // 3364
        var ad_bc = a * d - b * c;                                               // 3365
        var bc_ad = b * c - a * d;                                               // 3366
                                                                                 // 3367
        return [                                                                 // 3368
          d / ad_bc,                                                             // 3369
          b / bc_ad,                                                             // 3370
          c / bc_ad,                                                             // 3371
          a / ad_bc,                                                             // 3372
          (d * e - c * f) / bc_ad,                                               // 3373
          (b * e - a * f) / ad_bc                                                // 3374
        ];                                                                       // 3375
      }                                                                          // 3376
    });                                                                          // 3377
                                                                                 // 3378
    ctx.save = function ctxSave() {                                              // 3379
      var old = this._transformMatrix;                                           // 3380
      this._transformStack.push(old);                                            // 3381
      this._transformMatrix = old.slice(0, 6);                                   // 3382
                                                                                 // 3383
      this._originalSave();                                                      // 3384
    };                                                                           // 3385
                                                                                 // 3386
    ctx.restore = function ctxRestore() {                                        // 3387
      var prev = this._transformStack.pop();                                     // 3388
      if (prev) {                                                                // 3389
        this._transformMatrix = prev;                                            // 3390
        this._originalRestore();                                                 // 3391
      }                                                                          // 3392
    };                                                                           // 3393
                                                                                 // 3394
    ctx.translate = function ctxTranslate(x, y) {                                // 3395
      var m = this._transformMatrix;                                             // 3396
      m[4] = m[0] * x + m[2] * y + m[4];                                         // 3397
      m[5] = m[1] * x + m[3] * y + m[5];                                         // 3398
                                                                                 // 3399
      this._originalTranslate(x, y);                                             // 3400
    };                                                                           // 3401
                                                                                 // 3402
    ctx.scale = function ctxScale(x, y) {                                        // 3403
      var m = this._transformMatrix;                                             // 3404
      m[0] = m[0] * x;                                                           // 3405
      m[1] = m[1] * x;                                                           // 3406
      m[2] = m[2] * y;                                                           // 3407
      m[3] = m[3] * y;                                                           // 3408
                                                                                 // 3409
      this._originalScale(x, y);                                                 // 3410
    };                                                                           // 3411
                                                                                 // 3412
    ctx.transform = function ctxTransform(a, b, c, d, e, f) {                    // 3413
      var m = this._transformMatrix;                                             // 3414
      this._transformMatrix = [                                                  // 3415
        m[0] * a + m[2] * b,                                                     // 3416
        m[1] * a + m[3] * b,                                                     // 3417
        m[0] * c + m[2] * d,                                                     // 3418
        m[1] * c + m[3] * d,                                                     // 3419
        m[0] * e + m[2] * f + m[4],                                              // 3420
        m[1] * e + m[3] * f + m[5]                                               // 3421
      ];                                                                         // 3422
                                                                                 // 3423
      ctx._originalTransform(a, b, c, d, e, f);                                  // 3424
    };                                                                           // 3425
                                                                                 // 3426
    ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {              // 3427
      this._transformMatrix = [a, b, c, d, e, f];                                // 3428
                                                                                 // 3429
      ctx._originalSetTransform(a, b, c, d, e, f);                               // 3430
    };                                                                           // 3431
                                                                                 // 3432
    ctx.rotate = function ctxRotate(angle) {                                     // 3433
      var cosValue = Math.cos(angle);                                            // 3434
      var sinValue = Math.sin(angle);                                            // 3435
                                                                                 // 3436
      var m = this._transformMatrix;                                             // 3437
      this._transformMatrix = [                                                  // 3438
        m[0] * cosValue + m[2] * sinValue,                                       // 3439
        m[1] * cosValue + m[3] * sinValue,                                       // 3440
        m[0] * (-sinValue) + m[2] * cosValue,                                    // 3441
        m[1] * (-sinValue) + m[3] * cosValue,                                    // 3442
        m[4],                                                                    // 3443
        m[5]                                                                     // 3444
      ];                                                                         // 3445
                                                                                 // 3446
      this._originalRotate(angle);                                               // 3447
    };                                                                           // 3448
  }                                                                              // 3449
}                                                                                // 3450
                                                                                 // 3451
var CachedCanvases = (function CachedCanvasesClosure() {                         // 3452
  var cache = {};                                                                // 3453
  return {                                                                       // 3454
    getCanvas: function CachedCanvases_getCanvas(id, width, height,              // 3455
                                                 trackTransform) {               // 3456
      var canvasEntry;                                                           // 3457
      if (cache[id] !== undefined) {                                             // 3458
        canvasEntry = cache[id];                                                 // 3459
        canvasEntry.canvas.width = width;                                        // 3460
        canvasEntry.canvas.height = height;                                      // 3461
        // reset canvas transform for emulated mozCurrentTransform, if needed    // 3462
        canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);                      // 3463
      } else {                                                                   // 3464
        var canvas = createScratchCanvas(width, height);                         // 3465
        var ctx = canvas.getContext('2d');                                       // 3466
        if (trackTransform) {                                                    // 3467
          addContextCurrentTransform(ctx);                                       // 3468
        }                                                                        // 3469
        cache[id] = canvasEntry = {canvas: canvas, context: ctx};                // 3470
      }                                                                          // 3471
      return canvasEntry;                                                        // 3472
    },                                                                           // 3473
    clear: function () {                                                         // 3474
      for (var id in cache) {                                                    // 3475
        var canvasEntry = cache[id];                                             // 3476
        // Zeroing the width and height causes Firefox to release graphics       // 3477
        // resources immediately, which can greatly reduce memory consumption.   // 3478
        canvasEntry.canvas.width = 0;                                            // 3479
        canvasEntry.canvas.height = 0;                                           // 3480
        delete cache[id];                                                        // 3481
      }                                                                          // 3482
    }                                                                            // 3483
  };                                                                             // 3484
})();                                                                            // 3485
                                                                                 // 3486
function compileType3Glyph(imgData) {                                            // 3487
  var POINT_TO_PROCESS_LIMIT = 1000;                                             // 3488
                                                                                 // 3489
  var width = imgData.width, height = imgData.height;                            // 3490
  var i, j, j0, width1 = width + 1;                                              // 3491
  var points = new Uint8Array(width1 * (height + 1));                            // 3492
  var POINT_TYPES =                                                              // 3493
      new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);         // 3494
                                                                                 // 3495
  // decodes bit-packed mask data                                                // 3496
  var lineSize = (width + 7) & ~7, data0 = imgData.data;                         // 3497
  var data = new Uint8Array(lineSize * height), pos = 0, ii;                     // 3498
  for (i = 0, ii = data0.length; i < ii; i++) {                                  // 3499
    var mask = 128, elem = data0[i];                                             // 3500
    while (mask > 0) {                                                           // 3501
      data[pos++] = (elem & mask) ? 0 : 255;                                     // 3502
      mask >>= 1;                                                                // 3503
    }                                                                            // 3504
  }                                                                              // 3505
                                                                                 // 3506
  // finding iteresting points: every point is located between mask pixels,      // 3507
  // so there will be points of the (width + 1)x(height + 1) grid. Every point   // 3508
  // will have flags assigned based on neighboring mask pixels:                  // 3509
  //   4 | 8                                                                     // 3510
  //   --P--                                                                     // 3511
  //   2 | 1                                                                     // 3512
  // We are interested only in points with the flags:                            // 3513
  //   - outside corners: 1, 2, 4, 8;                                            // 3514
  //   - inside corners: 7, 11, 13, 14;                                          // 3515
  //   - and, intersections: 5, 10.                                              // 3516
  var count = 0;                                                                 // 3517
  pos = 0;                                                                       // 3518
  if (data[pos] !== 0) {                                                         // 3519
    points[0] = 1;                                                               // 3520
    ++count;                                                                     // 3521
  }                                                                              // 3522
  for (j = 1; j < width; j++) {                                                  // 3523
    if (data[pos] !== data[pos + 1]) {                                           // 3524
      points[j] = data[pos] ? 2 : 1;                                             // 3525
      ++count;                                                                   // 3526
    }                                                                            // 3527
    pos++;                                                                       // 3528
  }                                                                              // 3529
  if (data[pos] !== 0) {                                                         // 3530
    points[j] = 2;                                                               // 3531
    ++count;                                                                     // 3532
  }                                                                              // 3533
  for (i = 1; i < height; i++) {                                                 // 3534
    pos = i * lineSize;                                                          // 3535
    j0 = i * width1;                                                             // 3536
    if (data[pos - lineSize] !== data[pos]) {                                    // 3537
      points[j0] = data[pos] ? 1 : 8;                                            // 3538
      ++count;                                                                   // 3539
    }                                                                            // 3540
    // 'sum' is the position of the current pixel configuration in the 'TYPES'   // 3541
    // array (in order 8-1-2-4, so we can use '>>2' to shift the column).        // 3542
    var sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);              // 3543
    for (j = 1; j < width; j++) {                                                // 3544
      sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) +                               // 3545
            (data[pos - lineSize + 1] ? 8 : 0);                                  // 3546
      if (POINT_TYPES[sum]) {                                                    // 3547
        points[j0 + j] = POINT_TYPES[sum];                                       // 3548
        ++count;                                                                 // 3549
      }                                                                          // 3550
      pos++;                                                                     // 3551
    }                                                                            // 3552
    if (data[pos - lineSize] !== data[pos]) {                                    // 3553
      points[j0 + j] = data[pos] ? 2 : 4;                                        // 3554
      ++count;                                                                   // 3555
    }                                                                            // 3556
                                                                                 // 3557
    if (count > POINT_TO_PROCESS_LIMIT) {                                        // 3558
      return null;                                                               // 3559
    }                                                                            // 3560
  }                                                                              // 3561
                                                                                 // 3562
  pos = lineSize * (height - 1);                                                 // 3563
  j0 = i * width1;                                                               // 3564
  if (data[pos] !== 0) {                                                         // 3565
    points[j0] = 8;                                                              // 3566
    ++count;                                                                     // 3567
  }                                                                              // 3568
  for (j = 1; j < width; j++) {                                                  // 3569
    if (data[pos] !== data[pos + 1]) {                                           // 3570
      points[j0 + j] = data[pos] ? 4 : 8;                                        // 3571
      ++count;                                                                   // 3572
    }                                                                            // 3573
    pos++;                                                                       // 3574
  }                                                                              // 3575
  if (data[pos] !== 0) {                                                         // 3576
    points[j0 + j] = 4;                                                          // 3577
    ++count;                                                                     // 3578
  }                                                                              // 3579
  if (count > POINT_TO_PROCESS_LIMIT) {                                          // 3580
    return null;                                                                 // 3581
  }                                                                              // 3582
                                                                                 // 3583
  // building outlines                                                           // 3584
  var steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);           // 3585
  var outlines = [];                                                             // 3586
  for (i = 0; count && i <= height; i++) {                                       // 3587
    var p = i * width1;                                                          // 3588
    var end = p + width;                                                         // 3589
    while (p < end && !points[p]) {                                              // 3590
      p++;                                                                       // 3591
    }                                                                            // 3592
    if (p === end) {                                                             // 3593
      continue;                                                                  // 3594
    }                                                                            // 3595
    var coords = [p % width1, i];                                                // 3596
                                                                                 // 3597
    var type = points[p], p0 = p, pp;                                            // 3598
    do {                                                                         // 3599
      var step = steps[type];                                                    // 3600
      do {                                                                       // 3601
        p += step;                                                               // 3602
      } while (!points[p]);                                                      // 3603
                                                                                 // 3604
      pp = points[p];                                                            // 3605
      if (pp !== 5 && pp !== 10) {                                               // 3606
        // set new direction                                                     // 3607
        type = pp;                                                               // 3608
        // delete mark                                                           // 3609
        points[p] = 0;                                                           // 3610
      } else { // type is 5 or 10, ie, a crossing                                // 3611
        // set new direction                                                     // 3612
        type = pp & ((0x33 * type) >> 4);                                        // 3613
        // set new type for "future hit"                                         // 3614
        points[p] &= (type >> 2 | type << 2);                                    // 3615
      }                                                                          // 3616
                                                                                 // 3617
      coords.push(p % width1);                                                   // 3618
      coords.push((p / width1) | 0);                                             // 3619
      --count;                                                                   // 3620
    } while (p0 !== p);                                                          // 3621
    outlines.push(coords);                                                       // 3622
    --i;                                                                         // 3623
  }                                                                              // 3624
                                                                                 // 3625
  var drawOutline = function(c) {                                                // 3626
    c.save();                                                                    // 3627
    // the path shall be painted in [0..1]x[0..1] space                          // 3628
    c.scale(1 / width, -1 / height);                                             // 3629
    c.translate(0, -height);                                                     // 3630
    c.beginPath();                                                               // 3631
    for (var i = 0, ii = outlines.length; i < ii; i++) {                         // 3632
      var o = outlines[i];                                                       // 3633
      c.moveTo(o[0], o[1]);                                                      // 3634
      for (var j = 2, jj = o.length; j < jj; j += 2) {                           // 3635
        c.lineTo(o[j], o[j+1]);                                                  // 3636
      }                                                                          // 3637
    }                                                                            // 3638
    c.fill();                                                                    // 3639
    c.beginPath();                                                               // 3640
    c.restore();                                                                 // 3641
  };                                                                             // 3642
                                                                                 // 3643
  return drawOutline;                                                            // 3644
}                                                                                // 3645
                                                                                 // 3646
var CanvasExtraState = (function CanvasExtraStateClosure() {                     // 3647
  function CanvasExtraState(old) {                                               // 3648
    // Are soft masks and alpha values shapes or opacities?                      // 3649
    this.alphaIsShape = false;                                                   // 3650
    this.fontSize = 0;                                                           // 3651
    this.fontSizeScale = 1;                                                      // 3652
    this.textMatrix = IDENTITY_MATRIX;                                           // 3653
    this.textMatrixScale = 1;                                                    // 3654
    this.fontMatrix = FONT_IDENTITY_MATRIX;                                      // 3655
    this.leading = 0;                                                            // 3656
    // Current point (in user coordinates)                                       // 3657
    this.x = 0;                                                                  // 3658
    this.y = 0;                                                                  // 3659
    // Start of text line (in text coordinates)                                  // 3660
    this.lineX = 0;                                                              // 3661
    this.lineY = 0;                                                              // 3662
    // Character and word spacing                                                // 3663
    this.charSpacing = 0;                                                        // 3664
    this.wordSpacing = 0;                                                        // 3665
    this.textHScale = 1;                                                         // 3666
    this.textRenderingMode = TextRenderingMode.FILL;                             // 3667
    this.textRise = 0;                                                           // 3668
    // Default fore and background colors                                        // 3669
    this.fillColor = '#000000';                                                  // 3670
    this.strokeColor = '#000000';                                                // 3671
    this.patternFill = false;                                                    // 3672
    // Note: fill alpha applies to all non-stroking operations                   // 3673
    this.fillAlpha = 1;                                                          // 3674
    this.strokeAlpha = 1;                                                        // 3675
    this.lineWidth = 1;                                                          // 3676
    this.activeSMask = null; // nonclonable field (see the save method below)    // 3677
                                                                                 // 3678
    this.old = old;                                                              // 3679
  }                                                                              // 3680
                                                                                 // 3681
  CanvasExtraState.prototype = {                                                 // 3682
    clone: function CanvasExtraState_clone() {                                   // 3683
      return Object.create(this);                                                // 3684
    },                                                                           // 3685
    setCurrentPoint: function CanvasExtraState_setCurrentPoint(x, y) {           // 3686
      this.x = x;                                                                // 3687
      this.y = y;                                                                // 3688
    }                                                                            // 3689
  };                                                                             // 3690
  return CanvasExtraState;                                                       // 3691
})();                                                                            // 3692
                                                                                 // 3693
var CanvasGraphics = (function CanvasGraphicsClosure() {                         // 3694
  // Defines the time the executeOperatorList is going to be executing           // 3695
  // before it stops and shedules a continue of execution.                       // 3696
  var EXECUTION_TIME = 15;                                                       // 3697
  // Defines the number of steps before checking the execution time              // 3698
  var EXECUTION_STEPS = 10;                                                      // 3699
                                                                                 // 3700
  function CanvasGraphics(canvasCtx, commonObjs, objs, imageLayer) {             // 3701
    this.ctx = canvasCtx;                                                        // 3702
    this.current = new CanvasExtraState();                                       // 3703
    this.stateStack = [];                                                        // 3704
    this.pendingClip = null;                                                     // 3705
    this.pendingEOFill = false;                                                  // 3706
    this.res = null;                                                             // 3707
    this.xobjs = null;                                                           // 3708
    this.commonObjs = commonObjs;                                                // 3709
    this.objs = objs;                                                            // 3710
    this.imageLayer = imageLayer;                                                // 3711
    this.groupStack = [];                                                        // 3712
    this.processingType3 = null;                                                 // 3713
    // Patterns are painted relative to the initial page/form transform, see pdf // 3714
    // spec 8.7.2 NOTE 1.                                                        // 3715
    this.baseTransform = null;                                                   // 3716
    this.baseTransformStack = [];                                                // 3717
    this.groupLevel = 0;                                                         // 3718
    this.smaskStack = [];                                                        // 3719
    this.smaskCounter = 0;                                                       // 3720
    this.tempSMask = null;                                                       // 3721
    if (canvasCtx) {                                                             // 3722
      // NOTE: if mozCurrentTransform is polyfilled, then the current state of   // 3723
      // the transformation must already be set in canvasCtx._transformMatrix.   // 3724
      addContextCurrentTransform(canvasCtx);                                     // 3725
    }                                                                            // 3726
    this.cachedGetSinglePixelWidth = null;                                       // 3727
  }                                                                              // 3728
                                                                                 // 3729
  function putBinaryImageData(ctx, imgData) {                                    // 3730
    if (typeof ImageData !== 'undefined' && imgData instanceof ImageData) {      // 3731
      ctx.putImageData(imgData, 0, 0);                                           // 3732
      return;                                                                    // 3733
    }                                                                            // 3734
                                                                                 // 3735
    // Put the image data to the canvas in chunks, rather than putting the       // 3736
    // whole image at once.  This saves JS memory, because the ImageData object  // 3737
    // is smaller. It also possibly saves C++ memory within the implementation   // 3738
    // of putImageData(). (E.g. in Firefox we make two short-lived copies of     // 3739
    // the data passed to putImageData()). |n| shouldn't be too small, however,  // 3740
    // because too many putImageData() calls will slow things down.              // 3741
    //                                                                           // 3742
    // Note: as written, if the last chunk is partial, the putImageData() call   // 3743
    // will (conceptually) put pixels past the bounds of the canvas.  But        // 3744
    // that's ok; any such pixels are ignored.                                   // 3745
                                                                                 // 3746
    var height = imgData.height, width = imgData.width;                          // 3747
    var partialChunkHeight = height % FULL_CHUNK_HEIGHT;                         // 3748
    var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;          // 3749
    var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;    // 3750
                                                                                 // 3751
    var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);            // 3752
    var srcPos = 0, destPos;                                                     // 3753
    var src = imgData.data;                                                      // 3754
    var dest = chunkImgData.data;                                                // 3755
    var i, j, thisChunkHeight, elemsInThisChunk;                                 // 3756
                                                                                 // 3757
    // There are multiple forms in which the pixel data can be passed, and       // 3758
    // imgData.kind tells us which one this is.                                  // 3759
    if (imgData.kind === ImageKind.GRAYSCALE_1BPP) {                             // 3760
      // Grayscale, 1 bit per pixel (i.e. black-and-white).                      // 3761
      var srcLength = src.byteLength;                                            // 3762
      var dest32 = PDFJS.hasCanvasTypedArrays ? new Uint32Array(dest.buffer) :   // 3763
        new Uint32ArrayView(dest);                                               // 3764
      var dest32DataLength = dest32.length;                                      // 3765
      var fullSrcDiff = (width + 7) >> 3;                                        // 3766
      var white = 0xFFFFFFFF;                                                    // 3767
      var black = (PDFJS.isLittleEndian || !PDFJS.hasCanvasTypedArrays) ?        // 3768
        0xFF000000 : 0x000000FF;                                                 // 3769
      for (i = 0; i < totalChunks; i++) {                                        // 3770
        thisChunkHeight =                                                        // 3771
          (i < fullChunks) ? FULL_CHUNK_HEIGHT : partialChunkHeight;             // 3772
        destPos = 0;                                                             // 3773
        for (j = 0; j < thisChunkHeight; j++) {                                  // 3774
          var srcDiff = srcLength - srcPos;                                      // 3775
          var k = 0;                                                             // 3776
          var kEnd = (srcDiff > fullSrcDiff) ? width : srcDiff * 8 - 7;          // 3777
          var kEndUnrolled = kEnd & ~7;                                          // 3778
          var mask = 0;                                                          // 3779
          var srcByte = 0;                                                       // 3780
          for (; k < kEndUnrolled; k += 8) {                                     // 3781
            srcByte = src[srcPos++];                                             // 3782
            dest32[destPos++] = (srcByte & 128) ? white : black;                 // 3783
            dest32[destPos++] = (srcByte & 64) ? white : black;                  // 3784
            dest32[destPos++] = (srcByte & 32) ? white : black;                  // 3785
            dest32[destPos++] = (srcByte & 16) ? white : black;                  // 3786
            dest32[destPos++] = (srcByte & 8) ? white : black;                   // 3787
            dest32[destPos++] = (srcByte & 4) ? white : black;                   // 3788
            dest32[destPos++] = (srcByte & 2) ? white : black;                   // 3789
            dest32[destPos++] = (srcByte & 1) ? white : black;                   // 3790
          }                                                                      // 3791
          for (; k < kEnd; k++) {                                                // 3792
             if (mask === 0) {                                                   // 3793
               srcByte = src[srcPos++];                                          // 3794
               mask = 128;                                                       // 3795
             }                                                                   // 3796
                                                                                 // 3797
            dest32[destPos++] = (srcByte & mask) ? white : black;                // 3798
            mask >>= 1;                                                          // 3799
          }                                                                      // 3800
        }                                                                        // 3801
        // We ran out of input. Make all remaining pixels transparent.           // 3802
        while (destPos < dest32DataLength) {                                     // 3803
          dest32[destPos++] = 0;                                                 // 3804
        }                                                                        // 3805
                                                                                 // 3806
        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);                // 3807
      }                                                                          // 3808
    } else if (imgData.kind === ImageKind.RGBA_32BPP) {                          // 3809
      // RGBA, 32-bits per pixel.                                                // 3810
                                                                                 // 3811
      j = 0;                                                                     // 3812
      elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;                          // 3813
      for (i = 0; i < fullChunks; i++) {                                         // 3814
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));               // 3815
        srcPos += elemsInThisChunk;                                              // 3816
                                                                                 // 3817
        ctx.putImageData(chunkImgData, 0, j);                                    // 3818
        j += FULL_CHUNK_HEIGHT;                                                  // 3819
      }                                                                          // 3820
      if (i < totalChunks) {                                                     // 3821
        elemsInThisChunk = width * partialChunkHeight * 4;                       // 3822
        dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));               // 3823
        ctx.putImageData(chunkImgData, 0, j);                                    // 3824
      }                                                                          // 3825
                                                                                 // 3826
    } else if (imgData.kind === ImageKind.RGB_24BPP) {                           // 3827
      // RGB, 24-bits per pixel.                                                 // 3828
      thisChunkHeight = FULL_CHUNK_HEIGHT;                                       // 3829
      elemsInThisChunk = width * thisChunkHeight;                                // 3830
      for (i = 0; i < totalChunks; i++) {                                        // 3831
        if (i >= fullChunks) {                                                   // 3832
          thisChunkHeight = partialChunkHeight;                                  // 3833
          elemsInThisChunk = width * thisChunkHeight;                            // 3834
        }                                                                        // 3835
                                                                                 // 3836
        destPos = 0;                                                             // 3837
        for (j = elemsInThisChunk; j--;) {                                       // 3838
          dest[destPos++] = src[srcPos++];                                       // 3839
          dest[destPos++] = src[srcPos++];                                       // 3840
          dest[destPos++] = src[srcPos++];                                       // 3841
          dest[destPos++] = 255;                                                 // 3842
        }                                                                        // 3843
        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);                // 3844
      }                                                                          // 3845
    } else {                                                                     // 3846
      error('bad image kind: ' + imgData.kind);                                  // 3847
    }                                                                            // 3848
  }                                                                              // 3849
                                                                                 // 3850
  function putBinaryImageMask(ctx, imgData) {                                    // 3851
    var height = imgData.height, width = imgData.width;                          // 3852
    var partialChunkHeight = height % FULL_CHUNK_HEIGHT;                         // 3853
    var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;          // 3854
    var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;    // 3855
                                                                                 // 3856
    var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);            // 3857
    var srcPos = 0;                                                              // 3858
    var src = imgData.data;                                                      // 3859
    var dest = chunkImgData.data;                                                // 3860
                                                                                 // 3861
    for (var i = 0; i < totalChunks; i++) {                                      // 3862
      var thisChunkHeight =                                                      // 3863
        (i < fullChunks) ? FULL_CHUNK_HEIGHT : partialChunkHeight;               // 3864
                                                                                 // 3865
      // Expand the mask so it can be used by the canvas.  Any required          // 3866
      // inversion has already been handled.                                     // 3867
      var destPos = 3; // alpha component offset                                 // 3868
      for (var j = 0; j < thisChunkHeight; j++) {                                // 3869
        var mask = 0;                                                            // 3870
        for (var k = 0; k < width; k++) {                                        // 3871
          if (!mask) {                                                           // 3872
            var elem = src[srcPos++];                                            // 3873
            mask = 128;                                                          // 3874
          }                                                                      // 3875
          dest[destPos] = (elem & mask) ? 0 : 255;                               // 3876
          destPos += 4;                                                          // 3877
          mask >>= 1;                                                            // 3878
        }                                                                        // 3879
      }                                                                          // 3880
      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);                  // 3881
    }                                                                            // 3882
  }                                                                              // 3883
                                                                                 // 3884
  function copyCtxState(sourceCtx, destCtx) {                                    // 3885
    var properties = ['strokeStyle', 'fillStyle', 'fillRule', 'globalAlpha',     // 3886
                      'lineWidth', 'lineCap', 'lineJoin', 'miterLimit',          // 3887
                      'globalCompositeOperation', 'font'];                       // 3888
    for (var i = 0, ii = properties.length; i < ii; i++) {                       // 3889
      var property = properties[i];                                              // 3890
      if (sourceCtx[property] !== undefined) {                                   // 3891
        destCtx[property] = sourceCtx[property];                                 // 3892
      }                                                                          // 3893
    }                                                                            // 3894
    if (sourceCtx.setLineDash !== undefined) {                                   // 3895
      destCtx.setLineDash(sourceCtx.getLineDash());                              // 3896
      destCtx.lineDashOffset =  sourceCtx.lineDashOffset;                        // 3897
    } else if (sourceCtx.mozDashOffset !== undefined) {                          // 3898
      destCtx.mozDash = sourceCtx.mozDash;                                       // 3899
      destCtx.mozDashOffset = sourceCtx.mozDashOffset;                           // 3900
    }                                                                            // 3901
  }                                                                              // 3902
                                                                                 // 3903
  function composeSMaskBackdrop(bytes, r0, g0, b0) {                             // 3904
    var length = bytes.length;                                                   // 3905
    for (var i = 3; i < length; i += 4) {                                        // 3906
      var alpha = bytes[i];                                                      // 3907
      if (alpha === 0) {                                                         // 3908
        bytes[i - 3] = r0;                                                       // 3909
        bytes[i - 2] = g0;                                                       // 3910
        bytes[i - 1] = b0;                                                       // 3911
      } else if (alpha < 255) {                                                  // 3912
        var alpha_ = 255 - alpha;                                                // 3913
        bytes[i - 3] = (bytes[i - 3] * alpha + r0 * alpha_) >> 8;                // 3914
        bytes[i - 2] = (bytes[i - 2] * alpha + g0 * alpha_) >> 8;                // 3915
        bytes[i - 1] = (bytes[i - 1] * alpha + b0 * alpha_) >> 8;                // 3916
      }                                                                          // 3917
    }                                                                            // 3918
  }                                                                              // 3919
                                                                                 // 3920
  function composeSMaskAlpha(maskData, layerData) {                              // 3921
    var length = maskData.length;                                                // 3922
    var scale = 1 / 255;                                                         // 3923
    for (var i = 3; i < length; i += 4) {                                        // 3924
      var alpha = maskData[i];                                                   // 3925
      layerData[i] = (layerData[i] * alpha * scale) | 0;                         // 3926
    }                                                                            // 3927
  }                                                                              // 3928
                                                                                 // 3929
  function composeSMaskLuminosity(maskData, layerData) {                         // 3930
    var length = maskData.length;                                                // 3931
    for (var i = 3; i < length; i += 4) {                                        // 3932
      var y = (maskData[i - 3] * 77) +  // * 0.3 / 255 * 0x10000                 // 3933
              (maskData[i - 2] * 152) + // * 0.59 ....                           // 3934
              (maskData[i - 1] * 28);   // * 0.11 ....                           // 3935
      layerData[i] = (layerData[i] * y) >> 16;                                   // 3936
    }                                                                            // 3937
  }                                                                              // 3938
                                                                                 // 3939
  function genericComposeSMask(maskCtx, layerCtx, width, height,                 // 3940
                               subtype, backdrop) {                              // 3941
    var hasBackdrop = !!backdrop;                                                // 3942
    var r0 = hasBackdrop ? backdrop[0] : 0;                                      // 3943
    var g0 = hasBackdrop ? backdrop[1] : 0;                                      // 3944
    var b0 = hasBackdrop ? backdrop[2] : 0;                                      // 3945
                                                                                 // 3946
    var composeFn;                                                               // 3947
    if (subtype === 'Luminosity') {                                              // 3948
      composeFn = composeSMaskLuminosity;                                        // 3949
    } else {                                                                     // 3950
      composeFn = composeSMaskAlpha;                                             // 3951
    }                                                                            // 3952
                                                                                 // 3953
    // processing image in chunks to save memory                                 // 3954
    var PIXELS_TO_PROCESS = 1048576;                                             // 3955
    var chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));      // 3956
    for (var row = 0; row < height; row += chunkSize) {                          // 3957
      var chunkHeight = Math.min(chunkSize, height - row);                       // 3958
      var maskData = maskCtx.getImageData(0, row, width, chunkHeight);           // 3959
      var layerData = layerCtx.getImageData(0, row, width, chunkHeight);         // 3960
                                                                                 // 3961
      if (hasBackdrop) {                                                         // 3962
        composeSMaskBackdrop(maskData.data, r0, g0, b0);                         // 3963
      }                                                                          // 3964
      composeFn(maskData.data, layerData.data);                                  // 3965
                                                                                 // 3966
      maskCtx.putImageData(layerData, 0, row);                                   // 3967
    }                                                                            // 3968
  }                                                                              // 3969
                                                                                 // 3970
  function composeSMask(ctx, smask, layerCtx) {                                  // 3971
    var mask = smask.canvas;                                                     // 3972
    var maskCtx = smask.context;                                                 // 3973
                                                                                 // 3974
    ctx.setTransform(smask.scaleX, 0, 0, smask.scaleY,                           // 3975
                     smask.offsetX, smask.offsetY);                              // 3976
                                                                                 // 3977
    var backdrop = smask.backdrop || null;                                       // 3978
    if (WebGLUtils.isEnabled) {                                                  // 3979
      var composed = WebGLUtils.composeSMask(layerCtx.canvas, mask,              // 3980
        {subtype: smask.subtype, backdrop: backdrop});                           // 3981
      ctx.setTransform(1, 0, 0, 1, 0, 0);                                        // 3982
      ctx.drawImage(composed, smask.offsetX, smask.offsetY);                     // 3983
      return;                                                                    // 3984
    }                                                                            // 3985
    genericComposeSMask(maskCtx, layerCtx, mask.width, mask.height,              // 3986
                        smask.subtype, backdrop);                                // 3987
    ctx.drawImage(mask, 0, 0);                                                   // 3988
  }                                                                              // 3989
                                                                                 // 3990
  var LINE_CAP_STYLES = ['butt', 'round', 'square'];                             // 3991
  var LINE_JOIN_STYLES = ['miter', 'round', 'bevel'];                            // 3992
  var NORMAL_CLIP = {};                                                          // 3993
  var EO_CLIP = {};                                                              // 3994
                                                                                 // 3995
  CanvasGraphics.prototype = {                                                   // 3996
                                                                                 // 3997
    beginDrawing: function CanvasGraphics_beginDrawing(viewport, transparency) { // 3998
      // For pdfs that use blend modes we have to clear the canvas else certain  // 3999
      // blend modes can look wrong since we'd be blending with a white          // 4000
      // backdrop. The problem with a transparent backdrop though is we then     // 4001
      // don't get sub pixel anti aliasing on text, so we fill with white if     // 4002
      // we can.                                                                 // 4003
      var width = this.ctx.canvas.width;                                         // 4004
      var height = this.ctx.canvas.height;                                       // 4005
      if (transparency) {                                                        // 4006
        this.ctx.clearRect(0, 0, width, height);                                 // 4007
      } else {                                                                   // 4008
        this.ctx.mozOpaque = true;                                               // 4009
        this.ctx.save();                                                         // 4010
        this.ctx.fillStyle = 'rgb(255, 255, 255)';                               // 4011
        this.ctx.fillRect(0, 0, width, height);                                  // 4012
        this.ctx.restore();                                                      // 4013
      }                                                                          // 4014
                                                                                 // 4015
      var transform = viewport.transform;                                        // 4016
                                                                                 // 4017
      this.ctx.save();                                                           // 4018
      this.ctx.transform.apply(this.ctx, transform);                             // 4019
                                                                                 // 4020
      this.baseTransform = this.ctx.mozCurrentTransform.slice();                 // 4021
                                                                                 // 4022
      if (this.imageLayer) {                                                     // 4023
        this.imageLayer.beginLayout();                                           // 4024
      }                                                                          // 4025
    },                                                                           // 4026
                                                                                 // 4027
    executeOperatorList: function CanvasGraphics_executeOperatorList(            // 4028
                                    operatorList,                                // 4029
                                    executionStartIdx, continueCallback,         // 4030
                                    stepper) {                                   // 4031
      var argsArray = operatorList.argsArray;                                    // 4032
      var fnArray = operatorList.fnArray;                                        // 4033
      var i = executionStartIdx || 0;                                            // 4034
      var argsArrayLen = argsArray.length;                                       // 4035
                                                                                 // 4036
      // Sometimes the OperatorList to execute is empty.                         // 4037
      if (argsArrayLen === i) {                                                  // 4038
        return i;                                                                // 4039
      }                                                                          // 4040
                                                                                 // 4041
      var chunkOperations = (argsArrayLen - i > EXECUTION_STEPS &&               // 4042
                             typeof continueCallback === 'function');            // 4043
      var endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;           // 4044
      var steps = 0;                                                             // 4045
                                                                                 // 4046
      var commonObjs = this.commonObjs;                                          // 4047
      var objs = this.objs;                                                      // 4048
      var fnId;                                                                  // 4049
                                                                                 // 4050
      while (true) {                                                             // 4051
        if (stepper !== undefined && i === stepper.nextBreakPoint) {             // 4052
          stepper.breakIt(i, continueCallback);                                  // 4053
          return i;                                                              // 4054
        }                                                                        // 4055
                                                                                 // 4056
        fnId = fnArray[i];                                                       // 4057
                                                                                 // 4058
        if (fnId !== OPS.dependency) {                                           // 4059
          this[fnId].apply(this, argsArray[i]);                                  // 4060
        } else {                                                                 // 4061
          var deps = argsArray[i];                                               // 4062
          for (var n = 0, nn = deps.length; n < nn; n++) {                       // 4063
            var depObjId = deps[n];                                              // 4064
            var common = depObjId[0] === 'g' && depObjId[1] === '_';             // 4065
            var objsPool = common ? commonObjs : objs;                           // 4066
                                                                                 // 4067
            // If the promise isn't resolved yet, add the continueCallback       // 4068
            // to the promise and bail out.                                      // 4069
            if (!objsPool.isResolved(depObjId)) {                                // 4070
              objsPool.get(depObjId, continueCallback);                          // 4071
              return i;                                                          // 4072
            }                                                                    // 4073
          }                                                                      // 4074
        }                                                                        // 4075
                                                                                 // 4076
        i++;                                                                     // 4077
                                                                                 // 4078
        // If the entire operatorList was executed, stop as were done.           // 4079
        if (i === argsArrayLen) {                                                // 4080
          return i;                                                              // 4081
        }                                                                        // 4082
                                                                                 // 4083
        // If the execution took longer then a certain amount of time and        // 4084
        // `continueCallback` is specified, interrupt the execution.             // 4085
        if (chunkOperations && ++steps > EXECUTION_STEPS) {                      // 4086
          if (Date.now() > endTime) {                                            // 4087
            continueCallback();                                                  // 4088
            return i;                                                            // 4089
          }                                                                      // 4090
          steps = 0;                                                             // 4091
        }                                                                        // 4092
                                                                                 // 4093
        // If the operatorList isn't executed completely yet OR the execution    // 4094
        // time was short enough, do another execution round.                    // 4095
      }                                                                          // 4096
    },                                                                           // 4097
                                                                                 // 4098
    endDrawing: function CanvasGraphics_endDrawing() {                           // 4099
      this.ctx.restore();                                                        // 4100
      CachedCanvases.clear();                                                    // 4101
      WebGLUtils.clear();                                                        // 4102
                                                                                 // 4103
      if (this.imageLayer) {                                                     // 4104
        this.imageLayer.endLayout();                                             // 4105
      }                                                                          // 4106
    },                                                                           // 4107
                                                                                 // 4108
    // Graphics state                                                            // 4109
    setLineWidth: function CanvasGraphics_setLineWidth(width) {                  // 4110
      this.current.lineWidth = width;                                            // 4111
      this.ctx.lineWidth = width;                                                // 4112
    },                                                                           // 4113
    setLineCap: function CanvasGraphics_setLineCap(style) {                      // 4114
      this.ctx.lineCap = LINE_CAP_STYLES[style];                                 // 4115
    },                                                                           // 4116
    setLineJoin: function CanvasGraphics_setLineJoin(style) {                    // 4117
      this.ctx.lineJoin = LINE_JOIN_STYLES[style];                               // 4118
    },                                                                           // 4119
    setMiterLimit: function CanvasGraphics_setMiterLimit(limit) {                // 4120
      this.ctx.miterLimit = limit;                                               // 4121
    },                                                                           // 4122
    setDash: function CanvasGraphics_setDash(dashArray, dashPhase) {             // 4123
      var ctx = this.ctx;                                                        // 4124
      if (ctx.setLineDash !== undefined) {                                       // 4125
        ctx.setLineDash(dashArray);                                              // 4126
        ctx.lineDashOffset = dashPhase;                                          // 4127
      } else {                                                                   // 4128
        ctx.mozDash = dashArray;                                                 // 4129
        ctx.mozDashOffset = dashPhase;                                           // 4130
      }                                                                          // 4131
    },                                                                           // 4132
    setRenderingIntent: function CanvasGraphics_setRenderingIntent(intent) {     // 4133
      // Maybe if we one day fully support color spaces this will be important   // 4134
      // for now we can ignore.                                                  // 4135
      // TODO set rendering intent?                                              // 4136
    },                                                                           // 4137
    setFlatness: function CanvasGraphics_setFlatness(flatness) {                 // 4138
      // There's no way to control this with canvas, but we can safely ignore.   // 4139
      // TODO set flatness?                                                      // 4140
    },                                                                           // 4141
    setGState: function CanvasGraphics_setGState(states) {                       // 4142
      for (var i = 0, ii = states.length; i < ii; i++) {                         // 4143
        var state = states[i];                                                   // 4144
        var key = state[0];                                                      // 4145
        var value = state[1];                                                    // 4146
                                                                                 // 4147
        switch (key) {                                                           // 4148
          case 'LW':                                                             // 4149
            this.setLineWidth(value);                                            // 4150
            break;                                                               // 4151
          case 'LC':                                                             // 4152
            this.setLineCap(value);                                              // 4153
            break;                                                               // 4154
          case 'LJ':                                                             // 4155
            this.setLineJoin(value);                                             // 4156
            break;                                                               // 4157
          case 'ML':                                                             // 4158
            this.setMiterLimit(value);                                           // 4159
            break;                                                               // 4160
          case 'D':                                                              // 4161
            this.setDash(value[0], value[1]);                                    // 4162
            break;                                                               // 4163
          case 'RI':                                                             // 4164
            this.setRenderingIntent(value);                                      // 4165
            break;                                                               // 4166
          case 'FL':                                                             // 4167
            this.setFlatness(value);                                             // 4168
            break;                                                               // 4169
          case 'Font':                                                           // 4170
            this.setFont(value[0], value[1]);                                    // 4171
            break;                                                               // 4172
          case 'CA':                                                             // 4173
            this.current.strokeAlpha = state[1];                                 // 4174
            break;                                                               // 4175
          case 'ca':                                                             // 4176
            this.current.fillAlpha = state[1];                                   // 4177
            this.ctx.globalAlpha = state[1];                                     // 4178
            break;                                                               // 4179
          case 'BM':                                                             // 4180
            if (value && value.name && (value.name !== 'Normal')) {              // 4181
              var mode = value.name.replace(/([A-Z])/g,                          // 4182
                function(c) {                                                    // 4183
                  return '-' + c.toLowerCase();                                  // 4184
                }                                                                // 4185
              ).substring(1);                                                    // 4186
              this.ctx.globalCompositeOperation = mode;                          // 4187
              if (this.ctx.globalCompositeOperation !== mode) {                  // 4188
                warn('globalCompositeOperation "' + mode +                       // 4189
                     '" is not supported');                                      // 4190
              }                                                                  // 4191
            } else {                                                             // 4192
              this.ctx.globalCompositeOperation = 'source-over';                 // 4193
            }                                                                    // 4194
            break;                                                               // 4195
          case 'SMask':                                                          // 4196
            if (this.current.activeSMask) {                                      // 4197
              this.endSMaskGroup();                                              // 4198
            }                                                                    // 4199
            this.current.activeSMask = value ? this.tempSMask : null;            // 4200
            if (this.current.activeSMask) {                                      // 4201
              this.beginSMaskGroup();                                            // 4202
            }                                                                    // 4203
            this.tempSMask = null;                                               // 4204
            break;                                                               // 4205
        }                                                                        // 4206
      }                                                                          // 4207
    },                                                                           // 4208
    beginSMaskGroup: function CanvasGraphics_beginSMaskGroup() {                 // 4209
                                                                                 // 4210
      var activeSMask = this.current.activeSMask;                                // 4211
      var drawnWidth = activeSMask.canvas.width;                                 // 4212
      var drawnHeight = activeSMask.canvas.height;                               // 4213
      var cacheId = 'smaskGroupAt' + this.groupLevel;                            // 4214
      var scratchCanvas = CachedCanvases.getCanvas(                              // 4215
        cacheId, drawnWidth, drawnHeight, true);                                 // 4216
                                                                                 // 4217
      var currentCtx = this.ctx;                                                 // 4218
      var currentTransform = currentCtx.mozCurrentTransform;                     // 4219
      this.ctx.save();                                                           // 4220
                                                                                 // 4221
      var groupCtx = scratchCanvas.context;                                      // 4222
      groupCtx.scale(1 / activeSMask.scaleX, 1 / activeSMask.scaleY);            // 4223
      groupCtx.translate(-activeSMask.offsetX, -activeSMask.offsetY);            // 4224
      groupCtx.transform.apply(groupCtx, currentTransform);                      // 4225
                                                                                 // 4226
      copyCtxState(currentCtx, groupCtx);                                        // 4227
      this.ctx = groupCtx;                                                       // 4228
      this.setGState([                                                           // 4229
        ['BM', 'Normal'],                                                        // 4230
        ['ca', 1],                                                               // 4231
        ['CA', 1]                                                                // 4232
      ]);                                                                        // 4233
      this.groupStack.push(currentCtx);                                          // 4234
      this.groupLevel++;                                                         // 4235
    },                                                                           // 4236
    endSMaskGroup: function CanvasGraphics_endSMaskGroup() {                     // 4237
      var groupCtx = this.ctx;                                                   // 4238
      this.groupLevel--;                                                         // 4239
      this.ctx = this.groupStack.pop();                                          // 4240
                                                                                 // 4241
      composeSMask(this.ctx, this.current.activeSMask, groupCtx);                // 4242
      this.ctx.restore();                                                        // 4243
    },                                                                           // 4244
    save: function CanvasGraphics_save() {                                       // 4245
      this.ctx.save();                                                           // 4246
      var old = this.current;                                                    // 4247
      this.stateStack.push(old);                                                 // 4248
      this.current = old.clone();                                                // 4249
      this.current.activeSMask = null;                                           // 4250
    },                                                                           // 4251
    restore: function CanvasGraphics_restore() {                                 // 4252
      if (this.stateStack.length !== 0) {                                        // 4253
        if (this.current.activeSMask !== null) {                                 // 4254
          this.endSMaskGroup();                                                  // 4255
        }                                                                        // 4256
                                                                                 // 4257
        this.current = this.stateStack.pop();                                    // 4258
        this.ctx.restore();                                                      // 4259
                                                                                 // 4260
        this.cachedGetSinglePixelWidth = null;                                   // 4261
      }                                                                          // 4262
    },                                                                           // 4263
    transform: function CanvasGraphics_transform(a, b, c, d, e, f) {             // 4264
      this.ctx.transform(a, b, c, d, e, f);                                      // 4265
                                                                                 // 4266
      this.cachedGetSinglePixelWidth = null;                                     // 4267
    },                                                                           // 4268
                                                                                 // 4269
    // Path                                                                      // 4270
    constructPath: function CanvasGraphics_constructPath(ops, args) {            // 4271
      var ctx = this.ctx;                                                        // 4272
      var current = this.current;                                                // 4273
      var x = current.x, y = current.y;                                          // 4274
      for (var i = 0, j = 0, ii = ops.length; i < ii; i++) {                     // 4275
        switch (ops[i] | 0) {                                                    // 4276
          case OPS.rectangle:                                                    // 4277
            x = args[j++];                                                       // 4278
            y = args[j++];                                                       // 4279
            var width = args[j++];                                               // 4280
            var height = args[j++];                                              // 4281
            if (width === 0) {                                                   // 4282
              width = this.getSinglePixelWidth();                                // 4283
            }                                                                    // 4284
            if (height === 0) {                                                  // 4285
              height = this.getSinglePixelWidth();                               // 4286
            }                                                                    // 4287
            var xw = x + width;                                                  // 4288
            var yh = y + height;                                                 // 4289
            this.ctx.moveTo(x, y);                                               // 4290
            this.ctx.lineTo(xw, y);                                              // 4291
            this.ctx.lineTo(xw, yh);                                             // 4292
            this.ctx.lineTo(x, yh);                                              // 4293
            this.ctx.lineTo(x, y);                                               // 4294
            this.ctx.closePath();                                                // 4295
            break;                                                               // 4296
          case OPS.moveTo:                                                       // 4297
            x = args[j++];                                                       // 4298
            y = args[j++];                                                       // 4299
            ctx.moveTo(x, y);                                                    // 4300
            break;                                                               // 4301
          case OPS.lineTo:                                                       // 4302
            x = args[j++];                                                       // 4303
            y = args[j++];                                                       // 4304
            ctx.lineTo(x, y);                                                    // 4305
            break;                                                               // 4306
          case OPS.curveTo:                                                      // 4307
            x = args[j + 4];                                                     // 4308
            y = args[j + 5];                                                     // 4309
            ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3],    // 4310
                              x, y);                                             // 4311
            j += 6;                                                              // 4312
            break;                                                               // 4313
          case OPS.curveTo2:                                                     // 4314
            ctx.bezierCurveTo(x, y, args[j], args[j + 1],                        // 4315
                              args[j + 2], args[j + 3]);                         // 4316
            x = args[j + 2];                                                     // 4317
            y = args[j + 3];                                                     // 4318
            j += 4;                                                              // 4319
            break;                                                               // 4320
          case OPS.curveTo3:                                                     // 4321
            x = args[j + 2];                                                     // 4322
            y = args[j + 3];                                                     // 4323
            ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);                 // 4324
            j += 4;                                                              // 4325
            break;                                                               // 4326
          case OPS.closePath:                                                    // 4327
            ctx.closePath();                                                     // 4328
            break;                                                               // 4329
        }                                                                        // 4330
      }                                                                          // 4331
      current.setCurrentPoint(x, y);                                             // 4332
    },                                                                           // 4333
    closePath: function CanvasGraphics_closePath() {                             // 4334
      this.ctx.closePath();                                                      // 4335
    },                                                                           // 4336
    stroke: function CanvasGraphics_stroke(consumePath) {                        // 4337
      consumePath = typeof consumePath !== 'undefined' ? consumePath : true;     // 4338
      var ctx = this.ctx;                                                        // 4339
      var strokeColor = this.current.strokeColor;                                // 4340
      // Prevent drawing too thin lines by enforcing a minimum line width.       // 4341
      ctx.lineWidth = Math.max(this.getSinglePixelWidth() * MIN_WIDTH_FACTOR,    // 4342
                               this.current.lineWidth);                          // 4343
      // For stroke we want to temporarily change the global alpha to the        // 4344
      // stroking alpha.                                                         // 4345
      ctx.globalAlpha = this.current.strokeAlpha;                                // 4346
      if (strokeColor && strokeColor.hasOwnProperty('type') &&                   // 4347
          strokeColor.type === 'Pattern') {                                      // 4348
        // for patterns, we transform to pattern space, calculate                // 4349
        // the pattern, call stroke, and restore to user space                   // 4350
        ctx.save();                                                              // 4351
        ctx.strokeStyle = strokeColor.getPattern(ctx, this);                     // 4352
        ctx.stroke();                                                            // 4353
        ctx.restore();                                                           // 4354
      } else {                                                                   // 4355
        ctx.stroke();                                                            // 4356
      }                                                                          // 4357
      if (consumePath) {                                                         // 4358
        this.consumePath();                                                      // 4359
      }                                                                          // 4360
      // Restore the global alpha to the fill alpha                              // 4361
      ctx.globalAlpha = this.current.fillAlpha;                                  // 4362
    },                                                                           // 4363
    closeStroke: function CanvasGraphics_closeStroke() {                         // 4364
      this.closePath();                                                          // 4365
      this.stroke();                                                             // 4366
    },                                                                           // 4367
    fill: function CanvasGraphics_fill(consumePath) {                            // 4368
      consumePath = typeof consumePath !== 'undefined' ? consumePath : true;     // 4369
      var ctx = this.ctx;                                                        // 4370
      var fillColor = this.current.fillColor;                                    // 4371
      var isPatternFill = this.current.patternFill;                              // 4372
      var needRestore = false;                                                   // 4373
                                                                                 // 4374
      if (isPatternFill) {                                                       // 4375
        ctx.save();                                                              // 4376
        ctx.fillStyle = fillColor.getPattern(ctx, this);                         // 4377
        needRestore = true;                                                      // 4378
      }                                                                          // 4379
                                                                                 // 4380
      if (this.pendingEOFill) {                                                  // 4381
        if (ctx.mozFillRule !== undefined) {                                     // 4382
          ctx.mozFillRule = 'evenodd';                                           // 4383
          ctx.fill();                                                            // 4384
          ctx.mozFillRule = 'nonzero';                                           // 4385
        } else {                                                                 // 4386
          try {                                                                  // 4387
            ctx.fill('evenodd');                                                 // 4388
          } catch (ex) {                                                         // 4389
            // shouldn't really happen, but browsers might think differently     // 4390
            ctx.fill();                                                          // 4391
          }                                                                      // 4392
        }                                                                        // 4393
        this.pendingEOFill = false;                                              // 4394
      } else {                                                                   // 4395
        ctx.fill();                                                              // 4396
      }                                                                          // 4397
                                                                                 // 4398
      if (needRestore) {                                                         // 4399
        ctx.restore();                                                           // 4400
      }                                                                          // 4401
      if (consumePath) {                                                         // 4402
        this.consumePath();                                                      // 4403
      }                                                                          // 4404
    },                                                                           // 4405
    eoFill: function CanvasGraphics_eoFill() {                                   // 4406
      this.pendingEOFill = true;                                                 // 4407
      this.fill();                                                               // 4408
    },                                                                           // 4409
    fillStroke: function CanvasGraphics_fillStroke() {                           // 4410
      this.fill(false);                                                          // 4411
      this.stroke(false);                                                        // 4412
                                                                                 // 4413
      this.consumePath();                                                        // 4414
    },                                                                           // 4415
    eoFillStroke: function CanvasGraphics_eoFillStroke() {                       // 4416
      this.pendingEOFill = true;                                                 // 4417
      this.fillStroke();                                                         // 4418
    },                                                                           // 4419
    closeFillStroke: function CanvasGraphics_closeFillStroke() {                 // 4420
      this.closePath();                                                          // 4421
      this.fillStroke();                                                         // 4422
    },                                                                           // 4423
    closeEOFillStroke: function CanvasGraphics_closeEOFillStroke() {             // 4424
      this.pendingEOFill = true;                                                 // 4425
      this.closePath();                                                          // 4426
      this.fillStroke();                                                         // 4427
    },                                                                           // 4428
    endPath: function CanvasGraphics_endPath() {                                 // 4429
      this.consumePath();                                                        // 4430
    },                                                                           // 4431
                                                                                 // 4432
    // Clipping                                                                  // 4433
    clip: function CanvasGraphics_clip() {                                       // 4434
      this.pendingClip = NORMAL_CLIP;                                            // 4435
    },                                                                           // 4436
    eoClip: function CanvasGraphics_eoClip() {                                   // 4437
      this.pendingClip = EO_CLIP;                                                // 4438
    },                                                                           // 4439
                                                                                 // 4440
    // Text                                                                      // 4441
    beginText: function CanvasGraphics_beginText() {                             // 4442
      this.current.textMatrix = IDENTITY_MATRIX;                                 // 4443
      this.current.textMatrixScale = 1;                                          // 4444
      this.current.x = this.current.lineX = 0;                                   // 4445
      this.current.y = this.current.lineY = 0;                                   // 4446
    },                                                                           // 4447
    endText: function CanvasGraphics_endText() {                                 // 4448
      var paths = this.pendingTextPaths;                                         // 4449
      var ctx = this.ctx;                                                        // 4450
      if (paths === undefined) {                                                 // 4451
        ctx.beginPath();                                                         // 4452
        return;                                                                  // 4453
      }                                                                          // 4454
                                                                                 // 4455
      ctx.save();                                                                // 4456
      ctx.beginPath();                                                           // 4457
      for (var i = 0; i < paths.length; i++) {                                   // 4458
        var path = paths[i];                                                     // 4459
        ctx.setTransform.apply(ctx, path.transform);                             // 4460
        ctx.translate(path.x, path.y);                                           // 4461
        path.addToPath(ctx, path.fontSize);                                      // 4462
      }                                                                          // 4463
      ctx.restore();                                                             // 4464
      ctx.clip();                                                                // 4465
      ctx.beginPath();                                                           // 4466
      delete this.pendingTextPaths;                                              // 4467
    },                                                                           // 4468
    setCharSpacing: function CanvasGraphics_setCharSpacing(spacing) {            // 4469
      this.current.charSpacing = spacing;                                        // 4470
    },                                                                           // 4471
    setWordSpacing: function CanvasGraphics_setWordSpacing(spacing) {            // 4472
      this.current.wordSpacing = spacing;                                        // 4473
    },                                                                           // 4474
    setHScale: function CanvasGraphics_setHScale(scale) {                        // 4475
      this.current.textHScale = scale / 100;                                     // 4476
    },                                                                           // 4477
    setLeading: function CanvasGraphics_setLeading(leading) {                    // 4478
      this.current.leading = -leading;                                           // 4479
    },                                                                           // 4480
    setFont: function CanvasGraphics_setFont(fontRefName, size) {                // 4481
      var fontObj = this.commonObjs.get(fontRefName);                            // 4482
      var current = this.current;                                                // 4483
                                                                                 // 4484
      if (!fontObj) {                                                            // 4485
        error('Can\'t find font for ' + fontRefName);                            // 4486
      }                                                                          // 4487
                                                                                 // 4488
      current.fontMatrix = (fontObj.fontMatrix ?                                 // 4489
                            fontObj.fontMatrix : FONT_IDENTITY_MATRIX);          // 4490
                                                                                 // 4491
      // A valid matrix needs all main diagonal elements to be non-zero          // 4492
      // This also ensures we bypass FF bugzilla bug #719844.                    // 4493
      if (current.fontMatrix[0] === 0 ||                                         // 4494
          current.fontMatrix[3] === 0) {                                         // 4495
        warn('Invalid font matrix for font ' + fontRefName);                     // 4496
      }                                                                          // 4497
                                                                                 // 4498
      // The spec for Tf (setFont) says that 'size' specifies the font 'scale',  // 4499
      // and in some docs this can be negative (inverted x-y axes).              // 4500
      if (size < 0) {                                                            // 4501
        size = -size;                                                            // 4502
        current.fontDirection = -1;                                              // 4503
      } else {                                                                   // 4504
        current.fontDirection = 1;                                               // 4505
      }                                                                          // 4506
                                                                                 // 4507
      this.current.font = fontObj;                                               // 4508
      this.current.fontSize = size;                                              // 4509
                                                                                 // 4510
      if (fontObj.isType3Font) {                                                 // 4511
        return; // we don't need ctx.font for Type3 fonts                        // 4512
      }                                                                          // 4513
                                                                                 // 4514
      var name = fontObj.loadedName || 'sans-serif';                             // 4515
      var bold = fontObj.black ? (fontObj.bold ? 'bolder' : 'bold') :            // 4516
                                 (fontObj.bold ? 'bold' : 'normal');             // 4517
                                                                                 // 4518
      var italic = fontObj.italic ? 'italic' : 'normal';                         // 4519
      var typeface = '"' + name + '", ' + fontObj.fallbackName;                  // 4520
                                                                                 // 4521
      // Some font backends cannot handle fonts below certain size.              // 4522
      // Keeping the font at minimal size and using the fontSizeScale to change  // 4523
      // the current transformation matrix before the fillText/strokeText.       // 4524
      // See https://bugzilla.mozilla.org/show_bug.cgi?id=726227                 // 4525
      var browserFontSize = size < MIN_FONT_SIZE ? MIN_FONT_SIZE :               // 4526
                            size > MAX_FONT_SIZE ? MAX_FONT_SIZE : size;         // 4527
      this.current.fontSizeScale = size / browserFontSize;                       // 4528
                                                                                 // 4529
      var rule = italic + ' ' + bold + ' ' + browserFontSize + 'px ' + typeface; // 4530
      this.ctx.font = rule;                                                      // 4531
    },                                                                           // 4532
    setTextRenderingMode: function CanvasGraphics_setTextRenderingMode(mode) {   // 4533
      this.current.textRenderingMode = mode;                                     // 4534
    },                                                                           // 4535
    setTextRise: function CanvasGraphics_setTextRise(rise) {                     // 4536
      this.current.textRise = rise;                                              // 4537
    },                                                                           // 4538
    moveText: function CanvasGraphics_moveText(x, y) {                           // 4539
      this.current.x = this.current.lineX += x;                                  // 4540
      this.current.y = this.current.lineY += y;                                  // 4541
    },                                                                           // 4542
    setLeadingMoveText: function CanvasGraphics_setLeadingMoveText(x, y) {       // 4543
      this.setLeading(-y);                                                       // 4544
      this.moveText(x, y);                                                       // 4545
    },                                                                           // 4546
    setTextMatrix: function CanvasGraphics_setTextMatrix(a, b, c, d, e, f) {     // 4547
      this.current.textMatrix = [a, b, c, d, e, f];                              // 4548
      this.current.textMatrixScale = Math.sqrt(a * a + b * b);                   // 4549
                                                                                 // 4550
      this.current.x = this.current.lineX = 0;                                   // 4551
      this.current.y = this.current.lineY = 0;                                   // 4552
    },                                                                           // 4553
    nextLine: function CanvasGraphics_nextLine() {                               // 4554
      this.moveText(0, this.current.leading);                                    // 4555
    },                                                                           // 4556
                                                                                 // 4557
    paintChar: function CanvasGraphics_paintChar(character, x, y) {              // 4558
      var ctx = this.ctx;                                                        // 4559
      var current = this.current;                                                // 4560
      var font = current.font;                                                   // 4561
      var textRenderingMode = current.textRenderingMode;                         // 4562
      var fontSize = current.fontSize / current.fontSizeScale;                   // 4563
      var fillStrokeMode = textRenderingMode &                                   // 4564
        TextRenderingMode.FILL_STROKE_MASK;                                      // 4565
      var isAddToPathSet = !!(textRenderingMode &                                // 4566
        TextRenderingMode.ADD_TO_PATH_FLAG);                                     // 4567
                                                                                 // 4568
      var addToPath;                                                             // 4569
      if (font.disableFontFace || isAddToPathSet) {                              // 4570
        addToPath = font.getPathGenerator(this.commonObjs, character);           // 4571
      }                                                                          // 4572
                                                                                 // 4573
      if (font.disableFontFace) {                                                // 4574
        ctx.save();                                                              // 4575
        ctx.translate(x, y);                                                     // 4576
        ctx.beginPath();                                                         // 4577
        addToPath(ctx, fontSize);                                                // 4578
        if (fillStrokeMode === TextRenderingMode.FILL ||                         // 4579
            fillStrokeMode === TextRenderingMode.FILL_STROKE) {                  // 4580
          ctx.fill();                                                            // 4581
        }                                                                        // 4582
        if (fillStrokeMode === TextRenderingMode.STROKE ||                       // 4583
            fillStrokeMode === TextRenderingMode.FILL_STROKE) {                  // 4584
          ctx.stroke();                                                          // 4585
        }                                                                        // 4586
        ctx.restore();                                                           // 4587
      } else {                                                                   // 4588
        if (fillStrokeMode === TextRenderingMode.FILL ||                         // 4589
            fillStrokeMode === TextRenderingMode.FILL_STROKE) {                  // 4590
          ctx.fillText(character, x, y);                                         // 4591
        }                                                                        // 4592
        if (fillStrokeMode === TextRenderingMode.STROKE ||                       // 4593
            fillStrokeMode === TextRenderingMode.FILL_STROKE) {                  // 4594
          ctx.strokeText(character, x, y);                                       // 4595
        }                                                                        // 4596
      }                                                                          // 4597
                                                                                 // 4598
      if (isAddToPathSet) {                                                      // 4599
        var paths = this.pendingTextPaths || (this.pendingTextPaths = []);       // 4600
        paths.push({                                                             // 4601
          transform: ctx.mozCurrentTransform,                                    // 4602
          x: x,                                                                  // 4603
          y: y,                                                                  // 4604
          fontSize: fontSize,                                                    // 4605
          addToPath: addToPath                                                   // 4606
        });                                                                      // 4607
      }                                                                          // 4608
    },                                                                           // 4609
                                                                                 // 4610
    get isFontSubpixelAAEnabled() {                                              // 4611
      // Checks if anti-aliasing is enabled when scaled text is painted.         // 4612
      // On Windows GDI scaled fonts looks bad.                                  // 4613
      var ctx = document.createElement('canvas').getContext('2d');               // 4614
      ctx.scale(1.5, 1);                                                         // 4615
      ctx.fillText('I', 0, 10);                                                  // 4616
      var data = ctx.getImageData(0, 0, 10, 10).data;                            // 4617
      var enabled = false;                                                       // 4618
      for (var i = 3; i < data.length; i += 4) {                                 // 4619
        if (data[i] > 0 && data[i] < 255) {                                      // 4620
          enabled = true;                                                        // 4621
          break;                                                                 // 4622
        }                                                                        // 4623
      }                                                                          // 4624
      return shadow(this, 'isFontSubpixelAAEnabled', enabled);                   // 4625
    },                                                                           // 4626
                                                                                 // 4627
    showText: function CanvasGraphics_showText(glyphs) {                         // 4628
      var current = this.current;                                                // 4629
      var font = current.font;                                                   // 4630
      if (font.isType3Font) {                                                    // 4631
        return this.showType3Text(glyphs);                                       // 4632
      }                                                                          // 4633
                                                                                 // 4634
      var fontSize = current.fontSize;                                           // 4635
      if (fontSize === 0) {                                                      // 4636
        return;                                                                  // 4637
      }                                                                          // 4638
                                                                                 // 4639
      var ctx = this.ctx;                                                        // 4640
      var fontSizeScale = current.fontSizeScale;                                 // 4641
      var charSpacing = current.charSpacing;                                     // 4642
      var wordSpacing = current.wordSpacing;                                     // 4643
      var fontDirection = current.fontDirection;                                 // 4644
      var textHScale = current.textHScale * fontDirection;                       // 4645
      var glyphsLength = glyphs.length;                                          // 4646
      var vertical = font.vertical;                                              // 4647
      var defaultVMetrics = font.defaultVMetrics;                                // 4648
      var widthAdvanceScale = fontSize * current.fontMatrix[0];                  // 4649
                                                                                 // 4650
      var simpleFillText =                                                       // 4651
        current.textRenderingMode === TextRenderingMode.FILL &&                  // 4652
        !font.disableFontFace;                                                   // 4653
                                                                                 // 4654
      ctx.save();                                                                // 4655
      ctx.transform.apply(ctx, current.textMatrix);                              // 4656
      ctx.translate(current.x, current.y + current.textRise);                    // 4657
                                                                                 // 4658
      if (fontDirection > 0) {                                                   // 4659
        ctx.scale(textHScale, -1);                                               // 4660
      } else {                                                                   // 4661
        ctx.scale(textHScale, 1);                                                // 4662
      }                                                                          // 4663
                                                                                 // 4664
      var lineWidth = current.lineWidth;                                         // 4665
      var scale = current.textMatrixScale;                                       // 4666
      if (scale === 0 || lineWidth === 0) {                                      // 4667
        var fillStrokeMode = current.textRenderingMode &                         // 4668
          TextRenderingMode.FILL_STROKE_MASK;                                    // 4669
        if (fillStrokeMode === TextRenderingMode.STROKE ||                       // 4670
            fillStrokeMode === TextRenderingMode.FILL_STROKE) {                  // 4671
          this.cachedGetSinglePixelWidth = null;                                 // 4672
          lineWidth = this.getSinglePixelWidth() * MIN_WIDTH_FACTOR;             // 4673
        }                                                                        // 4674
      } else {                                                                   // 4675
        lineWidth /= scale;                                                      // 4676
      }                                                                          // 4677
                                                                                 // 4678
      if (fontSizeScale !== 1.0) {                                               // 4679
        ctx.scale(fontSizeScale, fontSizeScale);                                 // 4680
        lineWidth /= fontSizeScale;                                              // 4681
      }                                                                          // 4682
                                                                                 // 4683
      ctx.lineWidth = lineWidth;                                                 // 4684
                                                                                 // 4685
      var x = 0, i;                                                              // 4686
      for (i = 0; i < glyphsLength; ++i) {                                       // 4687
        var glyph = glyphs[i];                                                   // 4688
        if (glyph === null) {                                                    // 4689
          // word break                                                          // 4690
          x += fontDirection * wordSpacing;                                      // 4691
          continue;                                                              // 4692
        } else if (isNum(glyph)) {                                               // 4693
          x += -glyph * fontSize * 0.001;                                        // 4694
          continue;                                                              // 4695
        }                                                                        // 4696
                                                                                 // 4697
        var restoreNeeded = false;                                               // 4698
        var character = glyph.fontChar;                                          // 4699
        var accent = glyph.accent;                                               // 4700
        var scaledX, scaledY, scaledAccentX, scaledAccentY;                      // 4701
        var width = glyph.width;                                                 // 4702
        if (vertical) {                                                          // 4703
          var vmetric, vx, vy;                                                   // 4704
          vmetric = glyph.vmetric || defaultVMetrics;                            // 4705
          vx = glyph.vmetric ? vmetric[1] : width * 0.5;                         // 4706
          vx = -vx * widthAdvanceScale;                                          // 4707
          vy = vmetric[2] * widthAdvanceScale;                                   // 4708
                                                                                 // 4709
          width = vmetric ? -vmetric[0] : width;                                 // 4710
          scaledX = vx / fontSizeScale;                                          // 4711
          scaledY = (x + vy) / fontSizeScale;                                    // 4712
        } else {                                                                 // 4713
          scaledX = x / fontSizeScale;                                           // 4714
          scaledY = 0;                                                           // 4715
        }                                                                        // 4716
                                                                                 // 4717
        if (font.remeasure && width > 0 && this.isFontSubpixelAAEnabled) {       // 4718
          // some standard fonts may not have the exact width, trying to         // 4719
          // rescale per character                                               // 4720
          var measuredWidth = ctx.measureText(character).width * 1000 /          // 4721
            fontSize * fontSizeScale;                                            // 4722
          var characterScaleX = width / measuredWidth;                           // 4723
          restoreNeeded = true;                                                  // 4724
          ctx.save();                                                            // 4725
          ctx.scale(characterScaleX, 1);                                         // 4726
          scaledX /= characterScaleX;                                            // 4727
        }                                                                        // 4728
                                                                                 // 4729
        if (simpleFillText && !accent) {                                         // 4730
          // common case                                                         // 4731
          ctx.fillText(character, scaledX, scaledY);                             // 4732
        } else {                                                                 // 4733
          this.paintChar(character, scaledX, scaledY);                           // 4734
          if (accent) {                                                          // 4735
            scaledAccentX = scaledX + accent.offset.x / fontSizeScale;           // 4736
            scaledAccentY = scaledY - accent.offset.y / fontSizeScale;           // 4737
            this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY);       // 4738
          }                                                                      // 4739
        }                                                                        // 4740
                                                                                 // 4741
        var charWidth = width * widthAdvanceScale + charSpacing * fontDirection; // 4742
        x += charWidth;                                                          // 4743
                                                                                 // 4744
        if (restoreNeeded) {                                                     // 4745
          ctx.restore();                                                         // 4746
        }                                                                        // 4747
      }                                                                          // 4748
      if (vertical) {                                                            // 4749
        current.y -= x * textHScale;                                             // 4750
      } else {                                                                   // 4751
        current.x += x * textHScale;                                             // 4752
      }                                                                          // 4753
      ctx.restore();                                                             // 4754
    },                                                                           // 4755
                                                                                 // 4756
    showType3Text: function CanvasGraphics_showType3Text(glyphs) {               // 4757
      // Type3 fonts - each glyph is a "mini-PDF"                                // 4758
      var ctx = this.ctx;                                                        // 4759
      var current = this.current;                                                // 4760
      var font = current.font;                                                   // 4761
      var fontSize = current.fontSize;                                           // 4762
      var fontDirection = current.fontDirection;                                 // 4763
      var charSpacing = current.charSpacing;                                     // 4764
      var wordSpacing = current.wordSpacing;                                     // 4765
      var textHScale = current.textHScale * fontDirection;                       // 4766
      var fontMatrix = current.fontMatrix || FONT_IDENTITY_MATRIX;               // 4767
      var glyphsLength = glyphs.length;                                          // 4768
      var isTextInvisible =                                                      // 4769
        current.textRenderingMode === TextRenderingMode.INVISIBLE;               // 4770
      var i, glyph, width;                                                       // 4771
                                                                                 // 4772
      if (isTextInvisible || fontSize === 0) {                                   // 4773
        return;                                                                  // 4774
      }                                                                          // 4775
                                                                                 // 4776
      ctx.save();                                                                // 4777
      ctx.transform.apply(ctx, current.textMatrix);                              // 4778
      ctx.translate(current.x, current.y);                                       // 4779
                                                                                 // 4780
      ctx.scale(textHScale, fontDirection);                                      // 4781
                                                                                 // 4782
      for (i = 0; i < glyphsLength; ++i) {                                       // 4783
        glyph = glyphs[i];                                                       // 4784
        if (glyph === null) {                                                    // 4785
          // word break                                                          // 4786
          this.ctx.translate(wordSpacing, 0);                                    // 4787
          current.x += wordSpacing * textHScale;                                 // 4788
          continue;                                                              // 4789
        } else if (isNum(glyph)) {                                               // 4790
          var spacingLength = -glyph * 0.001 * fontSize;                         // 4791
          this.ctx.translate(spacingLength, 0);                                  // 4792
          current.x += spacingLength * textHScale;                               // 4793
          continue;                                                              // 4794
        }                                                                        // 4795
                                                                                 // 4796
        var operatorList = font.charProcOperatorList[glyph.operatorListId];      // 4797
        if (!operatorList) {                                                     // 4798
          warn('Type3 character \"' + glyph.operatorListId +                     // 4799
               '\" is not available');                                           // 4800
          continue;                                                              // 4801
        }                                                                        // 4802
        this.processingType3 = glyph;                                            // 4803
        this.save();                                                             // 4804
        ctx.scale(fontSize, fontSize);                                           // 4805
        ctx.transform.apply(ctx, fontMatrix);                                    // 4806
        this.executeOperatorList(operatorList);                                  // 4807
        this.restore();                                                          // 4808
                                                                                 // 4809
        var transformed = Util.applyTransform([glyph.width, 0], fontMatrix);     // 4810
        width = transformed[0] * fontSize + charSpacing;                         // 4811
                                                                                 // 4812
        ctx.translate(width, 0);                                                 // 4813
        current.x += width * textHScale;                                         // 4814
      }                                                                          // 4815
      ctx.restore();                                                             // 4816
      this.processingType3 = null;                                               // 4817
    },                                                                           // 4818
                                                                                 // 4819
    // Type3 fonts                                                               // 4820
    setCharWidth: function CanvasGraphics_setCharWidth(xWidth, yWidth) {         // 4821
      // We can safely ignore this since the width should be the same            // 4822
      // as the width in the Widths array.                                       // 4823
    },                                                                           // 4824
    setCharWidthAndBounds: function CanvasGraphics_setCharWidthAndBounds(xWidth, // 4825
                                                                        yWidth,  // 4826
                                                                        llx,     // 4827
                                                                        lly,     // 4828
                                                                        urx,     // 4829
                                                                        ury) {   // 4830
      // TODO According to the spec we're also suppose to ignore any operators   // 4831
      // that set color or include images while processing this type3 font.      // 4832
      this.ctx.rect(llx, lly, urx - llx, ury - lly);                             // 4833
      this.clip();                                                               // 4834
      this.endPath();                                                            // 4835
    },                                                                           // 4836
                                                                                 // 4837
    // Color                                                                     // 4838
    getColorN_Pattern: function CanvasGraphics_getColorN_Pattern(IR) {           // 4839
      var pattern;                                                               // 4840
      if (IR[0] === 'TilingPattern') {                                           // 4841
        var color = IR[1];                                                       // 4842
        pattern = new TilingPattern(IR, color, this.ctx, this.objs,              // 4843
                                    this.commonObjs, this.baseTransform);        // 4844
      } else {                                                                   // 4845
        pattern = getShadingPatternFromIR(IR);                                   // 4846
      }                                                                          // 4847
      return pattern;                                                            // 4848
    },                                                                           // 4849
    setStrokeColorN: function CanvasGraphics_setStrokeColorN(/*...*/) {          // 4850
      this.current.strokeColor = this.getColorN_Pattern(arguments);              // 4851
    },                                                                           // 4852
    setFillColorN: function CanvasGraphics_setFillColorN(/*...*/) {              // 4853
      this.current.fillColor = this.getColorN_Pattern(arguments);                // 4854
      this.current.patternFill = true;                                           // 4855
    },                                                                           // 4856
    setStrokeRGBColor: function CanvasGraphics_setStrokeRGBColor(r, g, b) {      // 4857
      var color = Util.makeCssRgb(r, g, b);                                      // 4858
      this.ctx.strokeStyle = color;                                              // 4859
      this.current.strokeColor = color;                                          // 4860
    },                                                                           // 4861
    setFillRGBColor: function CanvasGraphics_setFillRGBColor(r, g, b) {          // 4862
      var color = Util.makeCssRgb(r, g, b);                                      // 4863
      this.ctx.fillStyle = color;                                                // 4864
      this.current.fillColor = color;                                            // 4865
      this.current.patternFill = false;                                          // 4866
    },                                                                           // 4867
                                                                                 // 4868
    shadingFill: function CanvasGraphics_shadingFill(patternIR) {                // 4869
      var ctx = this.ctx;                                                        // 4870
                                                                                 // 4871
      this.save();                                                               // 4872
      var pattern = getShadingPatternFromIR(patternIR);                          // 4873
      ctx.fillStyle = pattern.getPattern(ctx, this, true);                       // 4874
                                                                                 // 4875
      var inv = ctx.mozCurrentTransformInverse;                                  // 4876
      if (inv) {                                                                 // 4877
        var canvas = ctx.canvas;                                                 // 4878
        var width = canvas.width;                                                // 4879
        var height = canvas.height;                                              // 4880
                                                                                 // 4881
        var bl = Util.applyTransform([0, 0], inv);                               // 4882
        var br = Util.applyTransform([0, height], inv);                          // 4883
        var ul = Util.applyTransform([width, 0], inv);                           // 4884
        var ur = Util.applyTransform([width, height], inv);                      // 4885
                                                                                 // 4886
        var x0 = Math.min(bl[0], br[0], ul[0], ur[0]);                           // 4887
        var y0 = Math.min(bl[1], br[1], ul[1], ur[1]);                           // 4888
        var x1 = Math.max(bl[0], br[0], ul[0], ur[0]);                           // 4889
        var y1 = Math.max(bl[1], br[1], ul[1], ur[1]);                           // 4890
                                                                                 // 4891
        this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);                             // 4892
      } else {                                                                   // 4893
        // HACK to draw the gradient onto an infinite rectangle.                 // 4894
        // PDF gradients are drawn across the entire image while                 // 4895
        // Canvas only allows gradients to be drawn in a rectangle               // 4896
        // The following bug should allow us to remove this.                     // 4897
        // https://bugzilla.mozilla.org/show_bug.cgi?id=664884                   // 4898
                                                                                 // 4899
        this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);                             // 4900
      }                                                                          // 4901
                                                                                 // 4902
      this.restore();                                                            // 4903
    },                                                                           // 4904
                                                                                 // 4905
    // Images                                                                    // 4906
    beginInlineImage: function CanvasGraphics_beginInlineImage() {               // 4907
      error('Should not call beginInlineImage');                                 // 4908
    },                                                                           // 4909
    beginImageData: function CanvasGraphics_beginImageData() {                   // 4910
      error('Should not call beginImageData');                                   // 4911
    },                                                                           // 4912
                                                                                 // 4913
    paintFormXObjectBegin: function CanvasGraphics_paintFormXObjectBegin(matrix, // 4914
                                                                        bbox) {  // 4915
      this.save();                                                               // 4916
      this.baseTransformStack.push(this.baseTransform);                          // 4917
                                                                                 // 4918
      if (isArray(matrix) && 6 === matrix.length) {                              // 4919
        this.transform.apply(this, matrix);                                      // 4920
      }                                                                          // 4921
                                                                                 // 4922
      this.baseTransform = this.ctx.mozCurrentTransform;                         // 4923
                                                                                 // 4924
      if (isArray(bbox) && 4 === bbox.length) {                                  // 4925
        var width = bbox[2] - bbox[0];                                           // 4926
        var height = bbox[3] - bbox[1];                                          // 4927
        this.ctx.rect(bbox[0], bbox[1], width, height);                          // 4928
        this.clip();                                                             // 4929
        this.endPath();                                                          // 4930
      }                                                                          // 4931
    },                                                                           // 4932
                                                                                 // 4933
    paintFormXObjectEnd: function CanvasGraphics_paintFormXObjectEnd() {         // 4934
      this.restore();                                                            // 4935
      this.baseTransform = this.baseTransformStack.pop();                        // 4936
    },                                                                           // 4937
                                                                                 // 4938
    beginGroup: function CanvasGraphics_beginGroup(group) {                      // 4939
      this.save();                                                               // 4940
      var currentCtx = this.ctx;                                                 // 4941
      // TODO non-isolated groups - according to Rik at adobe non-isolated       // 4942
      // group results aren't usually that different and they even have tools    // 4943
      // that ignore this setting. Notes from Rik on implmenting:                // 4944
      // - When you encounter an transparency group, create a new canvas with    // 4945
      // the dimensions of the bbox                                              // 4946
      // - copy the content from the previous canvas to the new canvas           // 4947
      // - draw as usual                                                         // 4948
      // - remove the backdrop alpha:                                            // 4949
      // alphaNew = 1 - (1 - alpha)/(1 - alphaBackdrop) with 'alpha' the alpha   // 4950
      // value of your transparency group and 'alphaBackdrop' the alpha of the   // 4951
      // backdrop                                                                // 4952
      // - remove background color:                                              // 4953
      // colorNew = color - alphaNew *colorBackdrop /(1 - alphaNew)              // 4954
      if (!group.isolated) {                                                     // 4955
        info('TODO: Support non-isolated groups.');                              // 4956
      }                                                                          // 4957
                                                                                 // 4958
      // TODO knockout - supposedly possible with the clever use of compositing  // 4959
      // modes.                                                                  // 4960
      if (group.knockout) {                                                      // 4961
        warn('Knockout groups not supported.');                                  // 4962
      }                                                                          // 4963
                                                                                 // 4964
      var currentTransform = currentCtx.mozCurrentTransform;                     // 4965
      if (group.matrix) {                                                        // 4966
        currentCtx.transform.apply(currentCtx, group.matrix);                    // 4967
      }                                                                          // 4968
      assert(group.bbox, 'Bounding box is required.');                           // 4969
                                                                                 // 4970
      // Based on the current transform figure out how big the bounding box      // 4971
      // will actually be.                                                       // 4972
      var bounds = Util.getAxialAlignedBoundingBox(                              // 4973
                    group.bbox,                                                  // 4974
                    currentCtx.mozCurrentTransform);                             // 4975
      // Clip the bounding box to the current canvas.                            // 4976
      var canvasBounds = [0,                                                     // 4977
                          0,                                                     // 4978
                          currentCtx.canvas.width,                               // 4979
                          currentCtx.canvas.height];                             // 4980
      bounds = Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];             // 4981
      // Use ceil in case we're between sizes so we don't create canvas that is  // 4982
      // too small and make the canvas at least 1x1 pixels.                      // 4983
      var offsetX = Math.floor(bounds[0]);                                       // 4984
      var offsetY = Math.floor(bounds[1]);                                       // 4985
      var drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);              // 4986
      var drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);             // 4987
      var scaleX = 1, scaleY = 1;                                                // 4988
      if (drawnWidth > MAX_GROUP_SIZE) {                                         // 4989
        scaleX = drawnWidth / MAX_GROUP_SIZE;                                    // 4990
        drawnWidth = MAX_GROUP_SIZE;                                             // 4991
      }                                                                          // 4992
      if (drawnHeight > MAX_GROUP_SIZE) {                                        // 4993
        scaleY = drawnHeight / MAX_GROUP_SIZE;                                   // 4994
        drawnHeight = MAX_GROUP_SIZE;                                            // 4995
      }                                                                          // 4996
                                                                                 // 4997
      var cacheId = 'groupAt' + this.groupLevel;                                 // 4998
      if (group.smask) {                                                         // 4999
        // Using two cache entries is case if masks are used one after another.  // 5000
        cacheId +=  '_smask_' + ((this.smaskCounter++) % 2);                     // 5001
      }                                                                          // 5002
      var scratchCanvas = CachedCanvases.getCanvas(                              // 5003
        cacheId, drawnWidth, drawnHeight, true);                                 // 5004
      var groupCtx = scratchCanvas.context;                                      // 5005
                                                                                 // 5006
      // Since we created a new canvas that is just the size of the bounding box // 5007
      // we have to translate the group ctx.                                     // 5008
      groupCtx.scale(1 / scaleX, 1 / scaleY);                                    // 5009
      groupCtx.translate(-offsetX, -offsetY);                                    // 5010
      groupCtx.transform.apply(groupCtx, currentTransform);                      // 5011
                                                                                 // 5012
      if (group.smask) {                                                         // 5013
        // Saving state and cached mask to be used in setGState.                 // 5014
        this.smaskStack.push({                                                   // 5015
          canvas: scratchCanvas.canvas,                                          // 5016
          context: groupCtx,                                                     // 5017
          offsetX: offsetX,                                                      // 5018
          offsetY: offsetY,                                                      // 5019
          scaleX: scaleX,                                                        // 5020
          scaleY: scaleY,                                                        // 5021
          subtype: group.smask.subtype,                                          // 5022
          backdrop: group.smask.backdrop                                         // 5023
        });                                                                      // 5024
      } else {                                                                   // 5025
        // Setup the current ctx so when the group is popped we draw it at the   // 5026
        // right location.                                                       // 5027
        currentCtx.setTransform(1, 0, 0, 1, 0, 0);                               // 5028
        currentCtx.translate(offsetX, offsetY);                                  // 5029
        currentCtx.scale(scaleX, scaleY);                                        // 5030
      }                                                                          // 5031
      // The transparency group inherits all off the current graphics state      // 5032
      // except the blend mode, soft mask, and alpha constants.                  // 5033
      copyCtxState(currentCtx, groupCtx);                                        // 5034
      this.ctx = groupCtx;                                                       // 5035
      this.setGState([                                                           // 5036
        ['BM', 'Normal'],                                                        // 5037
        ['ca', 1],                                                               // 5038
        ['CA', 1]                                                                // 5039
      ]);                                                                        // 5040
      this.groupStack.push(currentCtx);                                          // 5041
      this.groupLevel++;                                                         // 5042
    },                                                                           // 5043
                                                                                 // 5044
    endGroup: function CanvasGraphics_endGroup(group) {                          // 5045
      this.groupLevel--;                                                         // 5046
      var groupCtx = this.ctx;                                                   // 5047
      this.ctx = this.groupStack.pop();                                          // 5048
      // Turn off image smoothing to avoid sub pixel interpolation which can     // 5049
      // look kind of blurry for some pdfs.                                      // 5050
      if (this.ctx.imageSmoothingEnabled !== undefined) {                        // 5051
        this.ctx.imageSmoothingEnabled = false;                                  // 5052
      } else {                                                                   // 5053
        this.ctx.mozImageSmoothingEnabled = false;                               // 5054
      }                                                                          // 5055
      if (group.smask) {                                                         // 5056
        this.tempSMask = this.smaskStack.pop();                                  // 5057
      } else {                                                                   // 5058
        this.ctx.drawImage(groupCtx.canvas, 0, 0);                               // 5059
      }                                                                          // 5060
      this.restore();                                                            // 5061
    },                                                                           // 5062
                                                                                 // 5063
    beginAnnotations: function CanvasGraphics_beginAnnotations() {               // 5064
      this.save();                                                               // 5065
      this.current = new CanvasExtraState();                                     // 5066
    },                                                                           // 5067
                                                                                 // 5068
    endAnnotations: function CanvasGraphics_endAnnotations() {                   // 5069
      this.restore();                                                            // 5070
    },                                                                           // 5071
                                                                                 // 5072
    beginAnnotation: function CanvasGraphics_beginAnnotation(rect, transform,    // 5073
                                                             matrix) {           // 5074
      this.save();                                                               // 5075
                                                                                 // 5076
      if (isArray(rect) && 4 === rect.length) {                                  // 5077
        var width = rect[2] - rect[0];                                           // 5078
        var height = rect[3] - rect[1];                                          // 5079
        this.ctx.rect(rect[0], rect[1], width, height);                          // 5080
        this.clip();                                                             // 5081
        this.endPath();                                                          // 5082
      }                                                                          // 5083
                                                                                 // 5084
      this.transform.apply(this, transform);                                     // 5085
      this.transform.apply(this, matrix);                                        // 5086
    },                                                                           // 5087
                                                                                 // 5088
    endAnnotation: function CanvasGraphics_endAnnotation() {                     // 5089
      this.restore();                                                            // 5090
    },                                                                           // 5091
                                                                                 // 5092
    paintJpegXObject: function CanvasGraphics_paintJpegXObject(objId, w, h) {    // 5093
      var domImage = this.objs.get(objId);                                       // 5094
      if (!domImage) {                                                           // 5095
        warn('Dependent image isn\'t ready yet');                                // 5096
        return;                                                                  // 5097
      }                                                                          // 5098
                                                                                 // 5099
      this.save();                                                               // 5100
                                                                                 // 5101
      var ctx = this.ctx;                                                        // 5102
      // scale the image to the unit square                                      // 5103
      ctx.scale(1 / w, -1 / h);                                                  // 5104
                                                                                 // 5105
      ctx.drawImage(domImage, 0, 0, domImage.width, domImage.height,             // 5106
                    0, -h, w, h);                                                // 5107
      if (this.imageLayer) {                                                     // 5108
        var currentTransform = ctx.mozCurrentTransformInverse;                   // 5109
        var position = this.getCanvasPosition(0, 0);                             // 5110
        this.imageLayer.appendImage({                                            // 5111
          objId: objId,                                                          // 5112
          left: position[0],                                                     // 5113
          top: position[1],                                                      // 5114
          width: w / currentTransform[0],                                        // 5115
          height: h / currentTransform[3]                                        // 5116
        });                                                                      // 5117
      }                                                                          // 5118
      this.restore();                                                            // 5119
    },                                                                           // 5120
                                                                                 // 5121
    paintImageMaskXObject: function CanvasGraphics_paintImageMaskXObject(img) {  // 5122
      var ctx = this.ctx;                                                        // 5123
      var width = img.width, height = img.height;                                // 5124
      var fillColor = this.current.fillColor;                                    // 5125
      var isPatternFill = this.current.patternFill;                              // 5126
                                                                                 // 5127
      var glyph = this.processingType3;                                          // 5128
                                                                                 // 5129
      if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {       // 5130
        if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {     // 5131
          glyph.compiled =                                                       // 5132
            compileType3Glyph({data: img.data, width: width, height: height});   // 5133
        } else {                                                                 // 5134
          glyph.compiled = null;                                                 // 5135
        }                                                                        // 5136
      }                                                                          // 5137
                                                                                 // 5138
      if (glyph && glyph.compiled) {                                             // 5139
        glyph.compiled(ctx);                                                     // 5140
        return;                                                                  // 5141
      }                                                                          // 5142
                                                                                 // 5143
      var maskCanvas = CachedCanvases.getCanvas('maskCanvas', width, height);    // 5144
      var maskCtx = maskCanvas.context;                                          // 5145
      maskCtx.save();                                                            // 5146
                                                                                 // 5147
      putBinaryImageMask(maskCtx, img);                                          // 5148
                                                                                 // 5149
      maskCtx.globalCompositeOperation = 'source-in';                            // 5150
                                                                                 // 5151
      maskCtx.fillStyle = isPatternFill ?                                        // 5152
                          fillColor.getPattern(maskCtx, this) : fillColor;       // 5153
      maskCtx.fillRect(0, 0, width, height);                                     // 5154
                                                                                 // 5155
      maskCtx.restore();                                                         // 5156
                                                                                 // 5157
      this.paintInlineImageXObject(maskCanvas.canvas);                           // 5158
    },                                                                           // 5159
                                                                                 // 5160
    paintImageMaskXObjectRepeat:                                                 // 5161
      function CanvasGraphics_paintImageMaskXObjectRepeat(imgData, scaleX,       // 5162
                                                          scaleY, positions) {   // 5163
      var width = imgData.width;                                                 // 5164
      var height = imgData.height;                                               // 5165
      var fillColor = this.current.fillColor;                                    // 5166
      var isPatternFill = this.current.patternFill;                              // 5167
                                                                                 // 5168
      var maskCanvas = CachedCanvases.getCanvas('maskCanvas', width, height);    // 5169
      var maskCtx = maskCanvas.context;                                          // 5170
      maskCtx.save();                                                            // 5171
                                                                                 // 5172
      putBinaryImageMask(maskCtx, imgData);                                      // 5173
                                                                                 // 5174
      maskCtx.globalCompositeOperation = 'source-in';                            // 5175
                                                                                 // 5176
      maskCtx.fillStyle = isPatternFill ?                                        // 5177
                          fillColor.getPattern(maskCtx, this) : fillColor;       // 5178
      maskCtx.fillRect(0, 0, width, height);                                     // 5179
                                                                                 // 5180
      maskCtx.restore();                                                         // 5181
                                                                                 // 5182
      var ctx = this.ctx;                                                        // 5183
      for (var i = 0, ii = positions.length; i < ii; i += 2) {                   // 5184
        ctx.save();                                                              // 5185
        ctx.transform(scaleX, 0, 0, scaleY, positions[i], positions[i + 1]);     // 5186
        ctx.scale(1, -1);                                                        // 5187
        ctx.drawImage(maskCanvas.canvas, 0, 0, width, height,                    // 5188
          0, -1, 1, 1);                                                          // 5189
        ctx.restore();                                                           // 5190
      }                                                                          // 5191
    },                                                                           // 5192
                                                                                 // 5193
    paintImageMaskXObjectGroup:                                                  // 5194
      function CanvasGraphics_paintImageMaskXObjectGroup(images) {               // 5195
      var ctx = this.ctx;                                                        // 5196
                                                                                 // 5197
      var fillColor = this.current.fillColor;                                    // 5198
      var isPatternFill = this.current.patternFill;                              // 5199
      for (var i = 0, ii = images.length; i < ii; i++) {                         // 5200
        var image = images[i];                                                   // 5201
        var width = image.width, height = image.height;                          // 5202
                                                                                 // 5203
        var maskCanvas = CachedCanvases.getCanvas('maskCanvas', width, height);  // 5204
        var maskCtx = maskCanvas.context;                                        // 5205
        maskCtx.save();                                                          // 5206
                                                                                 // 5207
        putBinaryImageMask(maskCtx, image);                                      // 5208
                                                                                 // 5209
        maskCtx.globalCompositeOperation = 'source-in';                          // 5210
                                                                                 // 5211
        maskCtx.fillStyle = isPatternFill ?                                      // 5212
                            fillColor.getPattern(maskCtx, this) : fillColor;     // 5213
        maskCtx.fillRect(0, 0, width, height);                                   // 5214
                                                                                 // 5215
        maskCtx.restore();                                                       // 5216
                                                                                 // 5217
        ctx.save();                                                              // 5218
        ctx.transform.apply(ctx, image.transform);                               // 5219
        ctx.scale(1, -1);                                                        // 5220
        ctx.drawImage(maskCanvas.canvas, 0, 0, width, height,                    // 5221
                      0, -1, 1, 1);                                              // 5222
        ctx.restore();                                                           // 5223
      }                                                                          // 5224
    },                                                                           // 5225
                                                                                 // 5226
    paintImageXObject: function CanvasGraphics_paintImageXObject(objId) {        // 5227
      var imgData = this.objs.get(objId);                                        // 5228
      if (!imgData) {                                                            // 5229
        warn('Dependent image isn\'t ready yet');                                // 5230
        return;                                                                  // 5231
      }                                                                          // 5232
                                                                                 // 5233
      this.paintInlineImageXObject(imgData);                                     // 5234
    },                                                                           // 5235
                                                                                 // 5236
    paintImageXObjectRepeat:                                                     // 5237
      function CanvasGraphics_paintImageXObjectRepeat(objId, scaleX, scaleY,     // 5238
                                                          positions) {           // 5239
      var imgData = this.objs.get(objId);                                        // 5240
      if (!imgData) {                                                            // 5241
        warn('Dependent image isn\'t ready yet');                                // 5242
        return;                                                                  // 5243
      }                                                                          // 5244
                                                                                 // 5245
      var width = imgData.width;                                                 // 5246
      var height = imgData.height;                                               // 5247
      var map = [];                                                              // 5248
      for (var i = 0, ii = positions.length; i < ii; i += 2) {                   // 5249
        map.push({transform: [scaleX, 0, 0, scaleY, positions[i],                // 5250
                 positions[i + 1]], x: 0, y: 0, w: width, h: height});           // 5251
      }                                                                          // 5252
      this.paintInlineImageXObjectGroup(imgData, map);                           // 5253
    },                                                                           // 5254
                                                                                 // 5255
    paintInlineImageXObject:                                                     // 5256
      function CanvasGraphics_paintInlineImageXObject(imgData) {                 // 5257
      var width = imgData.width;                                                 // 5258
      var height = imgData.height;                                               // 5259
      var ctx = this.ctx;                                                        // 5260
                                                                                 // 5261
      this.save();                                                               // 5262
      // scale the image to the unit square                                      // 5263
      ctx.scale(1 / width, -1 / height);                                         // 5264
                                                                                 // 5265
      var currentTransform = ctx.mozCurrentTransformInverse;                     // 5266
      var a = currentTransform[0], b = currentTransform[1];                      // 5267
      var widthScale = Math.max(Math.sqrt(a * a + b * b), 1);                    // 5268
      var c = currentTransform[2], d = currentTransform[3];                      // 5269
      var heightScale = Math.max(Math.sqrt(c * c + d * d), 1);                   // 5270
                                                                                 // 5271
      var imgToPaint, tmpCanvas;                                                 // 5272
      // instanceof HTMLElement does not work in jsdom node.js module            // 5273
      if (imgData instanceof HTMLElement || !imgData.data) {                     // 5274
        imgToPaint = imgData;                                                    // 5275
      } else {                                                                   // 5276
        tmpCanvas = CachedCanvases.getCanvas('inlineImage', width, height);      // 5277
        var tmpCtx = tmpCanvas.context;                                          // 5278
        putBinaryImageData(tmpCtx, imgData);                                     // 5279
        imgToPaint = tmpCanvas.canvas;                                           // 5280
      }                                                                          // 5281
                                                                                 // 5282
      var paintWidth = width, paintHeight = height;                              // 5283
      var tmpCanvasId = 'prescale1';                                             // 5284
      // Vertial or horizontal scaling shall not be more than 2 to not loose the // 5285
      // pixels during drawImage operation, painting on the temporary canvas(es) // 5286
      // that are twice smaller in size                                          // 5287
      while ((widthScale > 2 && paintWidth > 1) ||                               // 5288
             (heightScale > 2 && paintHeight > 1)) {                             // 5289
        var newWidth = paintWidth, newHeight = paintHeight;                      // 5290
        if (widthScale > 2 && paintWidth > 1) {                                  // 5291
          newWidth = Math.ceil(paintWidth / 2);                                  // 5292
          widthScale /= paintWidth / newWidth;                                   // 5293
        }                                                                        // 5294
        if (heightScale > 2 && paintHeight > 1) {                                // 5295
          newHeight = Math.ceil(paintHeight / 2);                                // 5296
          heightScale /= paintHeight / newHeight;                                // 5297
        }                                                                        // 5298
        tmpCanvas = CachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);  // 5299
        tmpCtx = tmpCanvas.context;                                              // 5300
        tmpCtx.clearRect(0, 0, newWidth, newHeight);                             // 5301
        tmpCtx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight,              // 5302
                                     0, 0, newWidth, newHeight);                 // 5303
        imgToPaint = tmpCanvas.canvas;                                           // 5304
        paintWidth = newWidth;                                                   // 5305
        paintHeight = newHeight;                                                 // 5306
        tmpCanvasId = tmpCanvasId === 'prescale1' ? 'prescale2' : 'prescale1';   // 5307
      }                                                                          // 5308
      ctx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight,                   // 5309
                                0, -height, width, height);                      // 5310
                                                                                 // 5311
      if (this.imageLayer) {                                                     // 5312
        var position = this.getCanvasPosition(0, -height);                       // 5313
        this.imageLayer.appendImage({                                            // 5314
          imgData: imgData,                                                      // 5315
          left: position[0],                                                     // 5316
          top: position[1],                                                      // 5317
          width: width / currentTransform[0],                                    // 5318
          height: height / currentTransform[3]                                   // 5319
        });                                                                      // 5320
      }                                                                          // 5321
      this.restore();                                                            // 5322
    },                                                                           // 5323
                                                                                 // 5324
    paintInlineImageXObjectGroup:                                                // 5325
      function CanvasGraphics_paintInlineImageXObjectGroup(imgData, map) {       // 5326
      var ctx = this.ctx;                                                        // 5327
      var w = imgData.width;                                                     // 5328
      var h = imgData.height;                                                    // 5329
                                                                                 // 5330
      var tmpCanvas = CachedCanvases.getCanvas('inlineImage', w, h);             // 5331
      var tmpCtx = tmpCanvas.context;                                            // 5332
      putBinaryImageData(tmpCtx, imgData);                                       // 5333
                                                                                 // 5334
      for (var i = 0, ii = map.length; i < ii; i++) {                            // 5335
        var entry = map[i];                                                      // 5336
        ctx.save();                                                              // 5337
        ctx.transform.apply(ctx, entry.transform);                               // 5338
        ctx.scale(1, -1);                                                        // 5339
        ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h,      // 5340
                      0, -1, 1, 1);                                              // 5341
        if (this.imageLayer) {                                                   // 5342
          var position = this.getCanvasPosition(entry.x, entry.y);               // 5343
          this.imageLayer.appendImage({                                          // 5344
            imgData: imgData,                                                    // 5345
            left: position[0],                                                   // 5346
            top: position[1],                                                    // 5347
            width: w,                                                            // 5348
            height: h                                                            // 5349
          });                                                                    // 5350
        }                                                                        // 5351
        ctx.restore();                                                           // 5352
      }                                                                          // 5353
    },                                                                           // 5354
                                                                                 // 5355
    paintSolidColorImageMask:                                                    // 5356
      function CanvasGraphics_paintSolidColorImageMask() {                       // 5357
        this.ctx.fillRect(0, 0, 1, 1);                                           // 5358
    },                                                                           // 5359
                                                                                 // 5360
    // Marked content                                                            // 5361
                                                                                 // 5362
    markPoint: function CanvasGraphics_markPoint(tag) {                          // 5363
      // TODO Marked content.                                                    // 5364
    },                                                                           // 5365
    markPointProps: function CanvasGraphics_markPointProps(tag, properties) {    // 5366
      // TODO Marked content.                                                    // 5367
    },                                                                           // 5368
    beginMarkedContent: function CanvasGraphics_beginMarkedContent(tag) {        // 5369
      // TODO Marked content.                                                    // 5370
    },                                                                           // 5371
    beginMarkedContentProps: function CanvasGraphics_beginMarkedContentProps(    // 5372
                                        tag, properties) {                       // 5373
      // TODO Marked content.                                                    // 5374
    },                                                                           // 5375
    endMarkedContent: function CanvasGraphics_endMarkedContent() {               // 5376
      // TODO Marked content.                                                    // 5377
    },                                                                           // 5378
                                                                                 // 5379
    // Compatibility                                                             // 5380
                                                                                 // 5381
    beginCompat: function CanvasGraphics_beginCompat() {                         // 5382
      // TODO ignore undefined operators (should we do that anyway?)             // 5383
    },                                                                           // 5384
    endCompat: function CanvasGraphics_endCompat() {                             // 5385
      // TODO stop ignoring undefined operators                                  // 5386
    },                                                                           // 5387
                                                                                 // 5388
    // Helper functions                                                          // 5389
                                                                                 // 5390
    consumePath: function CanvasGraphics_consumePath() {                         // 5391
      var ctx = this.ctx;                                                        // 5392
      if (this.pendingClip) {                                                    // 5393
        if (this.pendingClip === EO_CLIP) {                                      // 5394
          if (ctx.mozFillRule !== undefined) {                                   // 5395
            ctx.mozFillRule = 'evenodd';                                         // 5396
            ctx.clip();                                                          // 5397
            ctx.mozFillRule = 'nonzero';                                         // 5398
          } else {                                                               // 5399
            try {                                                                // 5400
              ctx.clip('evenodd');                                               // 5401
            } catch (ex) {                                                       // 5402
              // shouldn't really happen, but browsers might think differently   // 5403
              ctx.clip();                                                        // 5404
            }                                                                    // 5405
          }                                                                      // 5406
        } else {                                                                 // 5407
          ctx.clip();                                                            // 5408
        }                                                                        // 5409
        this.pendingClip = null;                                                 // 5410
      }                                                                          // 5411
      ctx.beginPath();                                                           // 5412
    },                                                                           // 5413
    getSinglePixelWidth: function CanvasGraphics_getSinglePixelWidth(scale) {    // 5414
      if (this.cachedGetSinglePixelWidth === null) {                             // 5415
        var inverse = this.ctx.mozCurrentTransformInverse;                       // 5416
        // max of the current horizontal and vertical scale                      // 5417
        this.cachedGetSinglePixelWidth = Math.sqrt(Math.max(                     // 5418
          (inverse[0] * inverse[0] + inverse[1] * inverse[1]),                   // 5419
          (inverse[2] * inverse[2] + inverse[3] * inverse[3])));                 // 5420
      }                                                                          // 5421
      return this.cachedGetSinglePixelWidth;                                     // 5422
    },                                                                           // 5423
    getCanvasPosition: function CanvasGraphics_getCanvasPosition(x, y) {         // 5424
        var transform = this.ctx.mozCurrentTransform;                            // 5425
        return [                                                                 // 5426
          transform[0] * x + transform[2] * y + transform[4],                    // 5427
          transform[1] * x + transform[3] * y + transform[5]                     // 5428
        ];                                                                       // 5429
    }                                                                            // 5430
  };                                                                             // 5431
                                                                                 // 5432
  for (var op in OPS) {                                                          // 5433
    CanvasGraphics.prototype[OPS[op]] = CanvasGraphics.prototype[op];            // 5434
  }                                                                              // 5435
                                                                                 // 5436
  return CanvasGraphics;                                                         // 5437
})();                                                                            // 5438
                                                                                 // 5439
                                                                                 // 5440
var WebGLUtils = (function WebGLUtilsClosure() {                                 // 5441
  function loadShader(gl, code, shaderType) {                                    // 5442
    var shader = gl.createShader(shaderType);                                    // 5443
    gl.shaderSource(shader, code);                                               // 5444
    gl.compileShader(shader);                                                    // 5445
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);             // 5446
    if (!compiled) {                                                             // 5447
      var errorMsg = gl.getShaderInfoLog(shader);                                // 5448
      throw new Error('Error during shader compilation: ' + errorMsg);           // 5449
    }                                                                            // 5450
    return shader;                                                               // 5451
  }                                                                              // 5452
  function createVertexShader(gl, code) {                                        // 5453
    return loadShader(gl, code, gl.VERTEX_SHADER);                               // 5454
  }                                                                              // 5455
  function createFragmentShader(gl, code) {                                      // 5456
    return loadShader(gl, code, gl.FRAGMENT_SHADER);                             // 5457
  }                                                                              // 5458
  function createProgram(gl, shaders) {                                          // 5459
    var program = gl.createProgram();                                            // 5460
    for (var i = 0, ii = shaders.length; i < ii; ++i) {                          // 5461
      gl.attachShader(program, shaders[i]);                                      // 5462
    }                                                                            // 5463
    gl.linkProgram(program);                                                     // 5464
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);                // 5465
    if (!linked) {                                                               // 5466
      var errorMsg = gl.getProgramInfoLog(program);                              // 5467
      throw new Error('Error during program linking: ' + errorMsg);              // 5468
    }                                                                            // 5469
    return program;                                                              // 5470
  }                                                                              // 5471
  function createTexture(gl, image, textureId) {                                 // 5472
    gl.activeTexture(textureId);                                                 // 5473
    var texture = gl.createTexture();                                            // 5474
    gl.bindTexture(gl.TEXTURE_2D, texture);                                      // 5475
                                                                                 // 5476
    // Set the parameters so we can render any size image.                       // 5477
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        // 5478
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);        // 5479
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);          // 5480
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);          // 5481
                                                                                 // 5482
    // Upload the image into the texture.                                        // 5483
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);  // 5484
    return texture;                                                              // 5485
  }                                                                              // 5486
                                                                                 // 5487
  var currentGL, currentCanvas;                                                  // 5488
  function generateGL() {                                                        // 5489
    if (currentGL) {                                                             // 5490
      return;                                                                    // 5491
    }                                                                            // 5492
    currentCanvas = document.createElement('canvas');                            // 5493
    currentGL = currentCanvas.getContext('webgl',                                // 5494
      { premultipliedalpha: false });                                            // 5495
  }                                                                              // 5496
                                                                                 // 5497
  var smaskVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec2 a_texCoord;                                    \
                                                                \
  uniform vec2 u_resolution;                                    \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;   \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_texCoord = a_texCoord;                                    \
  }                                                             ';               // 5511
                                                                                 // 5512
  var smaskFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  uniform vec4 u_backdrop;                                      \
  uniform int u_subtype;                                        \
  uniform sampler2D u_image;                                    \
  uniform sampler2D u_mask;                                     \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec4 imageColor = texture2D(u_image, v_texCoord);           \
    vec4 maskColor = texture2D(u_mask, v_texCoord);             \
    if (u_backdrop.a > 0.0) {                                   \
      maskColor.rgb = maskColor.rgb * maskColor.a +             \
                      u_backdrop.rgb * (1.0 - maskColor.a);     \
    }                                                           \
    float lum;                                                  \
    if (u_subtype == 0) {                                       \
      lum = maskColor.a;                                        \
    } else {                                                    \
      lum = maskColor.r * 0.3 + maskColor.g * 0.59 +            \
            maskColor.b * 0.11;                                 \
    }                                                           \
    imageColor.a *= lum;                                        \
    imageColor.rgb *= imageColor.a;                             \
    gl_FragColor = imageColor;                                  \
  }                                                             ';               // 5540
                                                                                 // 5541
  var smaskCache = null;                                                         // 5542
                                                                                 // 5543
  function initSmaskGL() {                                                       // 5544
    var canvas, gl;                                                              // 5545
                                                                                 // 5546
    generateGL();                                                                // 5547
    canvas = currentCanvas;                                                      // 5548
    currentCanvas = null;                                                        // 5549
    gl = currentGL;                                                              // 5550
    currentGL = null;                                                            // 5551
                                                                                 // 5552
    // setup a GLSL program                                                      // 5553
    var vertexShader = createVertexShader(gl, smaskVertexShaderCode);            // 5554
    var fragmentShader = createFragmentShader(gl, smaskFragmentShaderCode);      // 5555
    var program = createProgram(gl, [vertexShader, fragmentShader]);             // 5556
    gl.useProgram(program);                                                      // 5557
                                                                                 // 5558
    var cache = {};                                                              // 5559
    cache.gl = gl;                                                               // 5560
    cache.canvas = canvas;                                                       // 5561
    cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');   // 5562
    cache.positionLocation = gl.getAttribLocation(program, 'a_position');        // 5563
    cache.backdropLocation = gl.getUniformLocation(program, 'u_backdrop');       // 5564
    cache.subtypeLocation = gl.getUniformLocation(program, 'u_subtype');         // 5565
                                                                                 // 5566
    var texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');          // 5567
    var texLayerLocation = gl.getUniformLocation(program, 'u_image');            // 5568
    var texMaskLocation = gl.getUniformLocation(program, 'u_mask');              // 5569
                                                                                 // 5570
    // provide texture coordinates for the rectangle.                            // 5571
    var texCoordBuffer = gl.createBuffer();                                      // 5572
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);                              // 5573
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([                            // 5574
      0.0,  0.0,                                                                 // 5575
      1.0,  0.0,                                                                 // 5576
      0.0,  1.0,                                                                 // 5577
      0.0,  1.0,                                                                 // 5578
      1.0,  0.0,                                                                 // 5579
      1.0,  1.0]), gl.STATIC_DRAW);                                              // 5580
    gl.enableVertexAttribArray(texCoordLocation);                                // 5581
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);          // 5582
                                                                                 // 5583
    gl.uniform1i(texLayerLocation, 0);                                           // 5584
    gl.uniform1i(texMaskLocation, 1);                                            // 5585
                                                                                 // 5586
    smaskCache = cache;                                                          // 5587
  }                                                                              // 5588
                                                                                 // 5589
  function composeSMask(layer, mask, properties) {                               // 5590
    var width = layer.width, height = layer.height;                              // 5591
                                                                                 // 5592
    if (!smaskCache) {                                                           // 5593
      initSmaskGL();                                                             // 5594
    }                                                                            // 5595
    var cache = smaskCache,canvas = cache.canvas, gl = cache.gl;                 // 5596
    canvas.width = width;                                                        // 5597
    canvas.height = height;                                                      // 5598
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);            // 5599
    gl.uniform2f(cache.resolutionLocation, width, height);                       // 5600
                                                                                 // 5601
    if (properties.backdrop) {                                                   // 5602
      gl.uniform4f(cache.resolutionLocation, properties.backdrop[0],             // 5603
                   properties.backdrop[1], properties.backdrop[2], 1);           // 5604
    } else {                                                                     // 5605
      gl.uniform4f(cache.resolutionLocation, 0, 0, 0, 0);                        // 5606
    }                                                                            // 5607
    gl.uniform1i(cache.subtypeLocation,                                          // 5608
                 properties.subtype === 'Luminosity' ? 1 : 0);                   // 5609
                                                                                 // 5610
    // Create a textures                                                         // 5611
    var texture = createTexture(gl, layer, gl.TEXTURE0);                         // 5612
    var maskTexture = createTexture(gl, mask, gl.TEXTURE1);                      // 5613
                                                                                 // 5614
                                                                                 // 5615
    // Create a buffer and put a single clipspace rectangle in                   // 5616
    // it (2 triangles)                                                          // 5617
    var buffer = gl.createBuffer();                                              // 5618
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);                                      // 5619
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([                            // 5620
      0, 0,                                                                      // 5621
      width, 0,                                                                  // 5622
      0, height,                                                                 // 5623
      0, height,                                                                 // 5624
      width, 0,                                                                  // 5625
      width, height]), gl.STATIC_DRAW);                                          // 5626
    gl.enableVertexAttribArray(cache.positionLocation);                          // 5627
    gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);    // 5628
                                                                                 // 5629
    // draw                                                                      // 5630
    gl.clearColor(0, 0, 0, 0);                                                   // 5631
    gl.enable(gl.BLEND);                                                         // 5632
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);                                // 5633
    gl.clear(gl.COLOR_BUFFER_BIT);                                               // 5634
                                                                                 // 5635
    gl.drawArrays(gl.TRIANGLES, 0, 6);                                           // 5636
                                                                                 // 5637
    gl.flush();                                                                  // 5638
                                                                                 // 5639
    gl.deleteTexture(texture);                                                   // 5640
    gl.deleteTexture(maskTexture);                                               // 5641
    gl.deleteBuffer(buffer);                                                     // 5642
                                                                                 // 5643
    return canvas;                                                               // 5644
  }                                                                              // 5645
                                                                                 // 5646
  var figuresVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec3 a_color;                                       \
                                                                \
  uniform vec2 u_resolution;                                    \
  uniform vec2 u_scale;                                         \
  uniform vec2 u_offset;                                        \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    vec2 position = (a_position + u_offset) * u_scale;          \
    vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;     \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_color = vec4(a_color / 255.0, 1.0);                       \
  }                                                             ';               // 5663
                                                                                 // 5664
  var figuresFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    gl_FragColor = v_color;                                     \
  }                                                             ';               // 5672
                                                                                 // 5673
  var figuresCache = null;                                                       // 5674
                                                                                 // 5675
  function initFiguresGL() {                                                     // 5676
    var canvas, gl;                                                              // 5677
                                                                                 // 5678
    generateGL();                                                                // 5679
    canvas = currentCanvas;                                                      // 5680
    currentCanvas = null;                                                        // 5681
    gl = currentGL;                                                              // 5682
    currentGL = null;                                                            // 5683
                                                                                 // 5684
    // setup a GLSL program                                                      // 5685
    var vertexShader = createVertexShader(gl, figuresVertexShaderCode);          // 5686
    var fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);    // 5687
    var program = createProgram(gl, [vertexShader, fragmentShader]);             // 5688
    gl.useProgram(program);                                                      // 5689
                                                                                 // 5690
    var cache = {};                                                              // 5691
    cache.gl = gl;                                                               // 5692
    cache.canvas = canvas;                                                       // 5693
    cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');   // 5694
    cache.scaleLocation = gl.getUniformLocation(program, 'u_scale');             // 5695
    cache.offsetLocation = gl.getUniformLocation(program, 'u_offset');           // 5696
    cache.positionLocation = gl.getAttribLocation(program, 'a_position');        // 5697
    cache.colorLocation = gl.getAttribLocation(program, 'a_color');              // 5698
                                                                                 // 5699
    figuresCache = cache;                                                        // 5700
  }                                                                              // 5701
                                                                                 // 5702
  function drawFigures(width, height, backgroundColor, figures, context) {       // 5703
    if (!figuresCache) {                                                         // 5704
      initFiguresGL();                                                           // 5705
    }                                                                            // 5706
    var cache = figuresCache, canvas = cache.canvas, gl = cache.gl;              // 5707
                                                                                 // 5708
    canvas.width = width;                                                        // 5709
    canvas.height = height;                                                      // 5710
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);            // 5711
    gl.uniform2f(cache.resolutionLocation, width, height);                       // 5712
                                                                                 // 5713
    // count triangle points                                                     // 5714
    var count = 0;                                                               // 5715
    var i, ii, rows;                                                             // 5716
    for (i = 0, ii = figures.length; i < ii; i++) {                              // 5717
      switch (figures[i].type) {                                                 // 5718
        case 'lattice':                                                          // 5719
          rows = (figures[i].coords.length / figures[i].verticesPerRow) | 0;     // 5720
          count += (rows - 1) * (figures[i].verticesPerRow - 1) * 6;             // 5721
          break;                                                                 // 5722
        case 'triangles':                                                        // 5723
          count += figures[i].coords.length;                                     // 5724
          break;                                                                 // 5725
      }                                                                          // 5726
    }                                                                            // 5727
    // transfer data                                                             // 5728
    var coords = new Float32Array(count * 2);                                    // 5729
    var colors = new Uint8Array(count * 3);                                      // 5730
    var coordsMap = context.coords, colorsMap = context.colors;                  // 5731
    var pIndex = 0, cIndex = 0;                                                  // 5732
    for (i = 0, ii = figures.length; i < ii; i++) {                              // 5733
      var figure = figures[i], ps = figure.coords, cs = figure.colors;           // 5734
      switch (figure.type) {                                                     // 5735
        case 'lattice':                                                          // 5736
          var cols = figure.verticesPerRow;                                      // 5737
          rows = (ps.length / cols) | 0;                                         // 5738
          for (var row = 1; row < rows; row++) {                                 // 5739
            var offset = row * cols + 1;                                         // 5740
            for (var col = 1; col < cols; col++, offset++) {                     // 5741
              coords[pIndex] = coordsMap[ps[offset - cols - 1]];                 // 5742
              coords[pIndex + 1] = coordsMap[ps[offset - cols - 1] + 1];         // 5743
              coords[pIndex + 2] = coordsMap[ps[offset - cols]];                 // 5744
              coords[pIndex + 3] = coordsMap[ps[offset - cols] + 1];             // 5745
              coords[pIndex + 4] = coordsMap[ps[offset - 1]];                    // 5746
              coords[pIndex + 5] = coordsMap[ps[offset - 1] + 1];                // 5747
              colors[cIndex] = colorsMap[cs[offset - cols - 1]];                 // 5748
              colors[cIndex + 1] = colorsMap[cs[offset - cols - 1] + 1];         // 5749
              colors[cIndex + 2] = colorsMap[cs[offset - cols - 1] + 2];         // 5750
              colors[cIndex + 3] = colorsMap[cs[offset - cols]];                 // 5751
              colors[cIndex + 4] = colorsMap[cs[offset - cols] + 1];             // 5752
              colors[cIndex + 5] = colorsMap[cs[offset - cols] + 2];             // 5753
              colors[cIndex + 6] = colorsMap[cs[offset - 1]];                    // 5754
              colors[cIndex + 7] = colorsMap[cs[offset - 1] + 1];                // 5755
              colors[cIndex + 8] = colorsMap[cs[offset - 1] + 2];                // 5756
                                                                                 // 5757
              coords[pIndex + 6] = coords[pIndex + 2];                           // 5758
              coords[pIndex + 7] = coords[pIndex + 3];                           // 5759
              coords[pIndex + 8] = coords[pIndex + 4];                           // 5760
              coords[pIndex + 9] = coords[pIndex + 5];                           // 5761
              coords[pIndex + 10] = coordsMap[ps[offset]];                       // 5762
              coords[pIndex + 11] = coordsMap[ps[offset] + 1];                   // 5763
              colors[cIndex + 9] = colors[cIndex + 3];                           // 5764
              colors[cIndex + 10] = colors[cIndex + 4];                          // 5765
              colors[cIndex + 11] = colors[cIndex + 5];                          // 5766
              colors[cIndex + 12] = colors[cIndex + 6];                          // 5767
              colors[cIndex + 13] = colors[cIndex + 7];                          // 5768
              colors[cIndex + 14] = colors[cIndex + 8];                          // 5769
              colors[cIndex + 15] = colorsMap[cs[offset]];                       // 5770
              colors[cIndex + 16] = colorsMap[cs[offset] + 1];                   // 5771
              colors[cIndex + 17] = colorsMap[cs[offset] + 2];                   // 5772
              pIndex += 12;                                                      // 5773
              cIndex += 18;                                                      // 5774
            }                                                                    // 5775
          }                                                                      // 5776
          break;                                                                 // 5777
        case 'triangles':                                                        // 5778
          for (var j = 0, jj = ps.length; j < jj; j++) {                         // 5779
            coords[pIndex] = coordsMap[ps[j]];                                   // 5780
            coords[pIndex + 1] = coordsMap[ps[j] + 1];                           // 5781
            colors[cIndex] = colorsMap[cs[i]];                                   // 5782
            colors[cIndex + 1] = colorsMap[cs[j] + 1];                           // 5783
            colors[cIndex + 2] = colorsMap[cs[j] + 2];                           // 5784
            pIndex += 2;                                                         // 5785
            cIndex += 3;                                                         // 5786
          }                                                                      // 5787
          break;                                                                 // 5788
      }                                                                          // 5789
    }                                                                            // 5790
                                                                                 // 5791
    // draw                                                                      // 5792
    if (backgroundColor) {                                                       // 5793
      gl.clearColor(backgroundColor[0] / 255, backgroundColor[1] / 255,          // 5794
                    backgroundColor[2] / 255, 1.0);                              // 5795
    } else {                                                                     // 5796
      gl.clearColor(0, 0, 0, 0);                                                 // 5797
    }                                                                            // 5798
    gl.clear(gl.COLOR_BUFFER_BIT);                                               // 5799
                                                                                 // 5800
    var coordsBuffer = gl.createBuffer();                                        // 5801
    gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);                                // 5802
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);                      // 5803
    gl.enableVertexAttribArray(cache.positionLocation);                          // 5804
    gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);    // 5805
                                                                                 // 5806
    var colorsBuffer = gl.createBuffer();                                        // 5807
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);                                // 5808
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);                      // 5809
    gl.enableVertexAttribArray(cache.colorLocation);                             // 5810
    gl.vertexAttribPointer(cache.colorLocation, 3, gl.UNSIGNED_BYTE, false,      // 5811
                           0, 0);                                                // 5812
                                                                                 // 5813
    gl.uniform2f(cache.scaleLocation, context.scaleX, context.scaleY);           // 5814
    gl.uniform2f(cache.offsetLocation, context.offsetX, context.offsetY);        // 5815
                                                                                 // 5816
    gl.drawArrays(gl.TRIANGLES, 0, count);                                       // 5817
                                                                                 // 5818
    gl.flush();                                                                  // 5819
                                                                                 // 5820
    gl.deleteBuffer(coordsBuffer);                                               // 5821
    gl.deleteBuffer(colorsBuffer);                                               // 5822
                                                                                 // 5823
    return canvas;                                                               // 5824
  }                                                                              // 5825
                                                                                 // 5826
  function cleanup() {                                                           // 5827
    if (smaskCache && smaskCache.canvas) {                                       // 5828
      smaskCache.canvas.width = 0;                                               // 5829
      smaskCache.canvas.height = 0;                                              // 5830
    }                                                                            // 5831
    if (figuresCache && figuresCache.canvas) {                                   // 5832
      figuresCache.canvas.width = 0;                                             // 5833
      figuresCache.canvas.height = 0;                                            // 5834
    }                                                                            // 5835
    smaskCache = null;                                                           // 5836
    figuresCache = null;                                                         // 5837
  }                                                                              // 5838
                                                                                 // 5839
  return {                                                                       // 5840
    get isEnabled() {                                                            // 5841
      if (PDFJS.disableWebGL) {                                                  // 5842
        return false;                                                            // 5843
      }                                                                          // 5844
      var enabled = false;                                                       // 5845
      try {                                                                      // 5846
        generateGL();                                                            // 5847
        enabled = !!currentGL;                                                   // 5848
      } catch (e) { }                                                            // 5849
      return shadow(this, 'isEnabled', enabled);                                 // 5850
    },                                                                           // 5851
    composeSMask: composeSMask,                                                  // 5852
    drawFigures: drawFigures,                                                    // 5853
    clear: cleanup                                                               // 5854
  };                                                                             // 5855
})();                                                                            // 5856
                                                                                 // 5857
                                                                                 // 5858
var ShadingIRs = {};                                                             // 5859
                                                                                 // 5860
ShadingIRs.RadialAxial = {                                                       // 5861
  fromIR: function RadialAxial_fromIR(raw) {                                     // 5862
    var type = raw[1];                                                           // 5863
    var colorStops = raw[2];                                                     // 5864
    var p0 = raw[3];                                                             // 5865
    var p1 = raw[4];                                                             // 5866
    var r0 = raw[5];                                                             // 5867
    var r1 = raw[6];                                                             // 5868
    return {                                                                     // 5869
      type: 'Pattern',                                                           // 5870
      getPattern: function RadialAxial_getPattern(ctx) {                         // 5871
        var grad;                                                                // 5872
        if (type === 'axial') {                                                  // 5873
          grad = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);           // 5874
        } else if (type === 'radial') {                                          // 5875
          grad = ctx.createRadialGradient(p0[0], p0[1], r0, p1[0], p1[1], r1);   // 5876
        }                                                                        // 5877
                                                                                 // 5878
        for (var i = 0, ii = colorStops.length; i < ii; ++i) {                   // 5879
          var c = colorStops[i];                                                 // 5880
          grad.addColorStop(c[0], c[1]);                                         // 5881
        }                                                                        // 5882
        return grad;                                                             // 5883
      }                                                                          // 5884
    };                                                                           // 5885
  }                                                                              // 5886
};                                                                               // 5887
                                                                                 // 5888
var createMeshCanvas = (function createMeshCanvasClosure() {                     // 5889
  function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {                 // 5890
    // Very basic Gouraud-shaded triangle rasterization algorithm.               // 5891
    var coords = context.coords, colors = context.colors;                        // 5892
    var bytes = data.data, rowSize = data.width * 4;                             // 5893
    var tmp;                                                                     // 5894
    if (coords[p1 + 1] > coords[p2 + 1]) {                                       // 5895
      tmp = p1; p1 = p2; p2 = tmp; tmp = c1; c1 = c2; c2 = tmp;                  // 5896
    }                                                                            // 5897
    if (coords[p2 + 1] > coords[p3 + 1]) {                                       // 5898
      tmp = p2; p2 = p3; p3 = tmp; tmp = c2; c2 = c3; c3 = tmp;                  // 5899
    }                                                                            // 5900
    if (coords[p1 + 1] > coords[p2 + 1]) {                                       // 5901
      tmp = p1; p1 = p2; p2 = tmp; tmp = c1; c1 = c2; c2 = tmp;                  // 5902
    }                                                                            // 5903
    var x1 = (coords[p1] + context.offsetX) * context.scaleX;                    // 5904
    var y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;                // 5905
    var x2 = (coords[p2] + context.offsetX) * context.scaleX;                    // 5906
    var y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;                // 5907
    var x3 = (coords[p3] + context.offsetX) * context.scaleX;                    // 5908
    var y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;                // 5909
    if (y1 >= y3) {                                                              // 5910
      return;                                                                    // 5911
    }                                                                            // 5912
    var c1r = colors[c1], c1g = colors[c1 + 1], c1b = colors[c1 + 2];            // 5913
    var c2r = colors[c2], c2g = colors[c2 + 1], c2b = colors[c2 + 2];            // 5914
    var c3r = colors[c3], c3g = colors[c3 + 1], c3b = colors[c3 + 2];            // 5915
                                                                                 // 5916
    var minY = Math.round(y1), maxY = Math.round(y3);                            // 5917
    var xa, car, cag, cab;                                                       // 5918
    var xb, cbr, cbg, cbb;                                                       // 5919
    var k;                                                                       // 5920
    for (var y = minY; y <= maxY; y++) {                                         // 5921
      if (y < y2) {                                                              // 5922
        k = y < y1 ? 0 : y1 === y2 ? 1 : (y1 - y) / (y1 - y2);                   // 5923
        xa = x1 - (x1 - x2) * k;                                                 // 5924
        car = c1r - (c1r - c2r) * k;                                             // 5925
        cag = c1g - (c1g - c2g) * k;                                             // 5926
        cab = c1b - (c1b - c2b) * k;                                             // 5927
      } else {                                                                   // 5928
        k = y > y3 ? 1 : y2 === y3 ? 0 : (y2 - y) / (y2 - y3);                   // 5929
        xa = x2 - (x2 - x3) * k;                                                 // 5930
        car = c2r - (c2r - c3r) * k;                                             // 5931
        cag = c2g - (c2g - c3g) * k;                                             // 5932
        cab = c2b - (c2b - c3b) * k;                                             // 5933
      }                                                                          // 5934
      k = y < y1 ? 0 : y > y3 ? 1 : (y1 - y) / (y1 - y3);                        // 5935
      xb = x1 - (x1 - x3) * k;                                                   // 5936
      cbr = c1r - (c1r - c3r) * k;                                               // 5937
      cbg = c1g - (c1g - c3g) * k;                                               // 5938
      cbb = c1b - (c1b - c3b) * k;                                               // 5939
      var x1_ = Math.round(Math.min(xa, xb));                                    // 5940
      var x2_ = Math.round(Math.max(xa, xb));                                    // 5941
      var j = rowSize * y + x1_ * 4;                                             // 5942
      for (var x = x1_; x <= x2_; x++) {                                         // 5943
        k = (xa - x) / (xa - xb);                                                // 5944
        k = k < 0 ? 0 : k > 1 ? 1 : k;                                           // 5945
        bytes[j++] = (car - (car - cbr) * k) | 0;                                // 5946
        bytes[j++] = (cag - (cag - cbg) * k) | 0;                                // 5947
        bytes[j++] = (cab - (cab - cbb) * k) | 0;                                // 5948
        bytes[j++] = 255;                                                        // 5949
      }                                                                          // 5950
    }                                                                            // 5951
  }                                                                              // 5952
                                                                                 // 5953
  function drawFigure(data, figure, context) {                                   // 5954
    var ps = figure.coords;                                                      // 5955
    var cs = figure.colors;                                                      // 5956
    var i, ii;                                                                   // 5957
    switch (figure.type) {                                                       // 5958
      case 'lattice':                                                            // 5959
        var verticesPerRow = figure.verticesPerRow;                              // 5960
        var rows = Math.floor(ps.length / verticesPerRow) - 1;                   // 5961
        var cols = verticesPerRow - 1;                                           // 5962
        for (i = 0; i < rows; i++) {                                             // 5963
          var q = i * verticesPerRow;                                            // 5964
          for (var j = 0; j < cols; j++, q++) {                                  // 5965
            drawTriangle(data, context,                                          // 5966
              ps[q], ps[q + 1], ps[q + verticesPerRow],                          // 5967
              cs[q], cs[q + 1], cs[q + verticesPerRow]);                         // 5968
            drawTriangle(data, context,                                          // 5969
              ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow],     // 5970
              cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);    // 5971
          }                                                                      // 5972
        }                                                                        // 5973
        break;                                                                   // 5974
      case 'triangles':                                                          // 5975
        for (i = 0, ii = ps.length; i < ii; i += 3) {                            // 5976
          drawTriangle(data, context,                                            // 5977
            ps[i], ps[i + 1], ps[i + 2],                                         // 5978
            cs[i], cs[i + 1], cs[i + 2]);                                        // 5979
        }                                                                        // 5980
        break;                                                                   // 5981
      default:                                                                   // 5982
        error('illigal figure');                                                 // 5983
        break;                                                                   // 5984
    }                                                                            // 5985
  }                                                                              // 5986
                                                                                 // 5987
  function createMeshCanvas(bounds, combinesScale, coords, colors, figures,      // 5988
                            backgroundColor) {                                   // 5989
    // we will increase scale on some weird factor to let antialiasing take      // 5990
    // care of "rough" edges                                                     // 5991
    var EXPECTED_SCALE = 1.1;                                                    // 5992
    // MAX_PATTERN_SIZE is used to avoid OOM situation.                          // 5993
    var MAX_PATTERN_SIZE = 3000; // 10in @ 300dpi shall be enough                // 5994
                                                                                 // 5995
    var offsetX = Math.floor(bounds[0]);                                         // 5996
    var offsetY = Math.floor(bounds[1]);                                         // 5997
    var boundsWidth = Math.ceil(bounds[2]) - offsetX;                            // 5998
    var boundsHeight = Math.ceil(bounds[3]) - offsetY;                           // 5999
                                                                                 // 6000
    var width = Math.min(Math.ceil(Math.abs(boundsWidth * combinesScale[0] *     // 6001
      EXPECTED_SCALE)), MAX_PATTERN_SIZE);                                       // 6002
    var height = Math.min(Math.ceil(Math.abs(boundsHeight * combinesScale[1] *   // 6003
      EXPECTED_SCALE)), MAX_PATTERN_SIZE);                                       // 6004
    var scaleX = boundsWidth / width;                                            // 6005
    var scaleY = boundsHeight / height;                                          // 6006
                                                                                 // 6007
    var context = {                                                              // 6008
      coords: coords,                                                            // 6009
      colors: colors,                                                            // 6010
      offsetX: -offsetX,                                                         // 6011
      offsetY: -offsetY,                                                         // 6012
      scaleX: 1 / scaleX,                                                        // 6013
      scaleY: 1 / scaleY                                                         // 6014
    };                                                                           // 6015
                                                                                 // 6016
    var canvas, tmpCanvas, i, ii;                                                // 6017
    if (WebGLUtils.isEnabled) {                                                  // 6018
      canvas = WebGLUtils.drawFigures(width, height, backgroundColor,            // 6019
                                      figures, context);                         // 6020
                                                                                 // 6021
      // https://bugzilla.mozilla.org/show_bug.cgi?id=972126                     // 6022
      tmpCanvas = CachedCanvases.getCanvas('mesh', width, height, false);        // 6023
      tmpCanvas.context.drawImage(canvas, 0, 0);                                 // 6024
      canvas = tmpCanvas.canvas;                                                 // 6025
    } else {                                                                     // 6026
      tmpCanvas = CachedCanvases.getCanvas('mesh', width, height, false);        // 6027
      var tmpCtx = tmpCanvas.context;                                            // 6028
                                                                                 // 6029
      var data = tmpCtx.createImageData(width, height);                          // 6030
      if (backgroundColor) {                                                     // 6031
        var bytes = data.data;                                                   // 6032
        for (i = 0, ii = bytes.length; i < ii; i += 4) {                         // 6033
          bytes[i] = backgroundColor[0];                                         // 6034
          bytes[i + 1] = backgroundColor[1];                                     // 6035
          bytes[i + 2] = backgroundColor[2];                                     // 6036
          bytes[i + 3] = 255;                                                    // 6037
        }                                                                        // 6038
      }                                                                          // 6039
      for (i = 0; i < figures.length; i++) {                                     // 6040
        drawFigure(data, figures[i], context);                                   // 6041
      }                                                                          // 6042
      tmpCtx.putImageData(data, 0, 0);                                           // 6043
      canvas = tmpCanvas.canvas;                                                 // 6044
    }                                                                            // 6045
                                                                                 // 6046
    return {canvas: canvas, offsetX: offsetX, offsetY: offsetY,                  // 6047
            scaleX: scaleX, scaleY: scaleY};                                     // 6048
  }                                                                              // 6049
  return createMeshCanvas;                                                       // 6050
})();                                                                            // 6051
                                                                                 // 6052
ShadingIRs.Mesh = {                                                              // 6053
  fromIR: function Mesh_fromIR(raw) {                                            // 6054
    //var type = raw[1];                                                         // 6055
    var coords = raw[2];                                                         // 6056
    var colors = raw[3];                                                         // 6057
    var figures = raw[4];                                                        // 6058
    var bounds = raw[5];                                                         // 6059
    var matrix = raw[6];                                                         // 6060
    //var bbox = raw[7];                                                         // 6061
    var background = raw[8];                                                     // 6062
    return {                                                                     // 6063
      type: 'Pattern',                                                           // 6064
      getPattern: function Mesh_getPattern(ctx, owner, shadingFill) {            // 6065
        var scale;                                                               // 6066
        if (shadingFill) {                                                       // 6067
          scale = Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);   // 6068
        } else {                                                                 // 6069
          // Obtain scale from matrix and current transformation matrix.         // 6070
          scale = Util.singularValueDecompose2dScale(owner.baseTransform);       // 6071
          if (matrix) {                                                          // 6072
            var matrixScale = Util.singularValueDecompose2dScale(matrix);        // 6073
            scale = [scale[0] * matrixScale[0],                                  // 6074
                     scale[1] * matrixScale[1]];                                 // 6075
          }                                                                      // 6076
        }                                                                        // 6077
                                                                                 // 6078
                                                                                 // 6079
        // Rasterizing on the main thread since sending/queue large canvases     // 6080
        // might cause OOM.                                                      // 6081
        var temporaryPatternCanvas = createMeshCanvas(bounds, scale, coords,     // 6082
          colors, figures, shadingFill ? null : background);                     // 6083
                                                                                 // 6084
        if (!shadingFill) {                                                      // 6085
          ctx.setTransform.apply(ctx, owner.baseTransform);                      // 6086
          if (matrix) {                                                          // 6087
            ctx.transform.apply(ctx, matrix);                                    // 6088
          }                                                                      // 6089
        }                                                                        // 6090
                                                                                 // 6091
        ctx.translate(temporaryPatternCanvas.offsetX,                            // 6092
                      temporaryPatternCanvas.offsetY);                           // 6093
        ctx.scale(temporaryPatternCanvas.scaleX,                                 // 6094
                  temporaryPatternCanvas.scaleY);                                // 6095
                                                                                 // 6096
        return ctx.createPattern(temporaryPatternCanvas.canvas, 'no-repeat');    // 6097
      }                                                                          // 6098
    };                                                                           // 6099
  }                                                                              // 6100
};                                                                               // 6101
                                                                                 // 6102
ShadingIRs.Dummy = {                                                             // 6103
  fromIR: function Dummy_fromIR() {                                              // 6104
    return {                                                                     // 6105
      type: 'Pattern',                                                           // 6106
      getPattern: function Dummy_fromIR_getPattern() {                           // 6107
        return 'hotpink';                                                        // 6108
      }                                                                          // 6109
    };                                                                           // 6110
  }                                                                              // 6111
};                                                                               // 6112
                                                                                 // 6113
function getShadingPatternFromIR(raw) {                                          // 6114
  var shadingIR = ShadingIRs[raw[0]];                                            // 6115
  if (!shadingIR) {                                                              // 6116
    error('Unknown IR type: ' + raw[0]);                                         // 6117
  }                                                                              // 6118
  return shadingIR.fromIR(raw);                                                  // 6119
}                                                                                // 6120
                                                                                 // 6121
var TilingPattern = (function TilingPatternClosure() {                           // 6122
  var PaintType = {                                                              // 6123
    COLORED: 1,                                                                  // 6124
    UNCOLORED: 2                                                                 // 6125
  };                                                                             // 6126
                                                                                 // 6127
  var MAX_PATTERN_SIZE = 3000; // 10in @ 300dpi shall be enough                  // 6128
                                                                                 // 6129
  function TilingPattern(IR, color, ctx, objs, commonObjs, baseTransform) {      // 6130
    this.operatorList = IR[2];                                                   // 6131
    this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];                                   // 6132
    this.bbox = IR[4];                                                           // 6133
    this.xstep = IR[5];                                                          // 6134
    this.ystep = IR[6];                                                          // 6135
    this.paintType = IR[7];                                                      // 6136
    this.tilingType = IR[8];                                                     // 6137
    this.color = color;                                                          // 6138
    this.objs = objs;                                                            // 6139
    this.commonObjs = commonObjs;                                                // 6140
    this.baseTransform = baseTransform;                                          // 6141
    this.type = 'Pattern';                                                       // 6142
    this.ctx = ctx;                                                              // 6143
  }                                                                              // 6144
                                                                                 // 6145
  TilingPattern.prototype = {                                                    // 6146
    createPatternCanvas: function TilinPattern_createPatternCanvas(owner) {      // 6147
      var operatorList = this.operatorList;                                      // 6148
      var bbox = this.bbox;                                                      // 6149
      var xstep = this.xstep;                                                    // 6150
      var ystep = this.ystep;                                                    // 6151
      var paintType = this.paintType;                                            // 6152
      var tilingType = this.tilingType;                                          // 6153
      var color = this.color;                                                    // 6154
      var objs = this.objs;                                                      // 6155
      var commonObjs = this.commonObjs;                                          // 6156
                                                                                 // 6157
      info('TilingType: ' + tilingType);                                         // 6158
                                                                                 // 6159
      var x0 = bbox[0], y0 = bbox[1], x1 = bbox[2], y1 = bbox[3];                // 6160
                                                                                 // 6161
      var topLeft = [x0, y0];                                                    // 6162
      // we want the canvas to be as large as the step size                      // 6163
      var botRight = [x0 + xstep, y0 + ystep];                                   // 6164
                                                                                 // 6165
      var width = botRight[0] - topLeft[0];                                      // 6166
      var height = botRight[1] - topLeft[1];                                     // 6167
                                                                                 // 6168
      // Obtain scale from matrix and current transformation matrix.             // 6169
      var matrixScale = Util.singularValueDecompose2dScale(this.matrix);         // 6170
      var curMatrixScale = Util.singularValueDecompose2dScale(                   // 6171
        this.baseTransform);                                                     // 6172
      var combinedScale = [matrixScale[0] * curMatrixScale[0],                   // 6173
        matrixScale[1] * curMatrixScale[1]];                                     // 6174
                                                                                 // 6175
      // MAX_PATTERN_SIZE is used to avoid OOM situation.                        // 6176
      // Use width and height values that are as close as possible to the end    // 6177
      // result when the pattern is used. Too low value makes the pattern look   // 6178
      // blurry. Too large value makes it look too crispy.                       // 6179
      width = Math.min(Math.ceil(Math.abs(width * combinedScale[0])),            // 6180
        MAX_PATTERN_SIZE);                                                       // 6181
                                                                                 // 6182
      height = Math.min(Math.ceil(Math.abs(height * combinedScale[1])),          // 6183
        MAX_PATTERN_SIZE);                                                       // 6184
                                                                                 // 6185
      var tmpCanvas = CachedCanvases.getCanvas('pattern', width, height, true);  // 6186
      var tmpCtx = tmpCanvas.context;                                            // 6187
      var graphics = new CanvasGraphics(tmpCtx, commonObjs, objs);               // 6188
      graphics.groupLevel = owner.groupLevel;                                    // 6189
                                                                                 // 6190
      this.setFillAndStrokeStyleToContext(tmpCtx, paintType, color);             // 6191
                                                                                 // 6192
      this.setScale(width, height, xstep, ystep);                                // 6193
      this.transformToScale(graphics);                                           // 6194
                                                                                 // 6195
      // transform coordinates to pattern space                                  // 6196
      var tmpTranslate = [1, 0, 0, 1, -topLeft[0], -topLeft[1]];                 // 6197
      graphics.transform.apply(graphics, tmpTranslate);                          // 6198
                                                                                 // 6199
      this.clipBbox(graphics, bbox, x0, y0, x1, y1);                             // 6200
                                                                                 // 6201
      graphics.executeOperatorList(operatorList);                                // 6202
      return tmpCanvas.canvas;                                                   // 6203
    },                                                                           // 6204
                                                                                 // 6205
    setScale: function TilingPattern_setScale(width, height, xstep, ystep) {     // 6206
      this.scale = [width / xstep, height / ystep];                              // 6207
    },                                                                           // 6208
                                                                                 // 6209
    transformToScale: function TilingPattern_transformToScale(graphics) {        // 6210
      var scale = this.scale;                                                    // 6211
      var tmpScale = [scale[0], 0, 0, scale[1], 0, 0];                           // 6212
      graphics.transform.apply(graphics, tmpScale);                              // 6213
    },                                                                           // 6214
                                                                                 // 6215
    scaleToContext: function TilingPattern_scaleToContext() {                    // 6216
      var scale = this.scale;                                                    // 6217
      this.ctx.scale(1 / scale[0], 1 / scale[1]);                                // 6218
    },                                                                           // 6219
                                                                                 // 6220
    clipBbox: function clipBbox(graphics, bbox, x0, y0, x1, y1) {                // 6221
      if (bbox && isArray(bbox) && bbox.length === 4) {                          // 6222
        var bboxWidth = x1 - x0;                                                 // 6223
        var bboxHeight = y1 - y0;                                                // 6224
        graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);                        // 6225
        graphics.clip();                                                         // 6226
        graphics.endPath();                                                      // 6227
      }                                                                          // 6228
    },                                                                           // 6229
                                                                                 // 6230
    setFillAndStrokeStyleToContext:                                              // 6231
      function setFillAndStrokeStyleToContext(context, paintType, color) {       // 6232
        switch (paintType) {                                                     // 6233
          case PaintType.COLORED:                                                // 6234
            var ctx = this.ctx;                                                  // 6235
            context.fillStyle = ctx.fillStyle;                                   // 6236
            context.strokeStyle = ctx.strokeStyle;                               // 6237
            break;                                                               // 6238
          case PaintType.UNCOLORED:                                              // 6239
            var cssColor = Util.makeCssRgb(color[0], color[1], color[2]);        // 6240
            context.fillStyle = cssColor;                                        // 6241
            context.strokeStyle = cssColor;                                      // 6242
            break;                                                               // 6243
          default:                                                               // 6244
            error('Unsupported paint type: ' + paintType);                       // 6245
        }                                                                        // 6246
      },                                                                         // 6247
                                                                                 // 6248
    getPattern: function TilingPattern_getPattern(ctx, owner) {                  // 6249
      var temporaryPatternCanvas = this.createPatternCanvas(owner);              // 6250
                                                                                 // 6251
      ctx = this.ctx;                                                            // 6252
      ctx.setTransform.apply(ctx, this.baseTransform);                           // 6253
      ctx.transform.apply(ctx, this.matrix);                                     // 6254
      this.scaleToContext();                                                     // 6255
                                                                                 // 6256
      return ctx.createPattern(temporaryPatternCanvas, 'repeat');                // 6257
    }                                                                            // 6258
  };                                                                             // 6259
                                                                                 // 6260
  return TilingPattern;                                                          // 6261
})();                                                                            // 6262
                                                                                 // 6263
                                                                                 // 6264
PDFJS.disableFontFace = false;                                                   // 6265
                                                                                 // 6266
var FontLoader = {                                                               // 6267
  insertRule: function fontLoaderInsertRule(rule) {                              // 6268
    var styleElement = document.getElementById('PDFJS_FONT_STYLE_TAG');          // 6269
    if (!styleElement) {                                                         // 6270
      styleElement = document.createElement('style');                            // 6271
      styleElement.id = 'PDFJS_FONT_STYLE_TAG';                                  // 6272
      document.documentElement.getElementsByTagName('head')[0].appendChild(      // 6273
        styleElement);                                                           // 6274
    }                                                                            // 6275
                                                                                 // 6276
    var styleSheet = styleElement.sheet;                                         // 6277
    styleSheet.insertRule(rule, styleSheet.cssRules.length);                     // 6278
  },                                                                             // 6279
                                                                                 // 6280
  clear: function fontLoaderClear() {                                            // 6281
    var styleElement = document.getElementById('PDFJS_FONT_STYLE_TAG');          // 6282
    if (styleElement) {                                                          // 6283
      styleElement.parentNode.removeChild(styleElement);                         // 6284
    }                                                                            // 6285
    this.nativeFontFaces.forEach(function(nativeFontFace) {                      // 6286
      document.fonts.delete(nativeFontFace);                                     // 6287
    });                                                                          // 6288
    this.nativeFontFaces.length = 0;                                             // 6289
  },                                                                             // 6290
  get loadTestFont() {                                                           // 6291
    // This is a CFF font with 1 glyph for '.' that fills its entire width and   // 6292
    // height.                                                                   // 6293
    return shadow(this, 'loadTestFont', atob(                                    // 6294
      'T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQ' + // 6295
      'AABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwA' + // 6296
      'AAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbm' + // 6297
      'FtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAA' + // 6298
      'AADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6A' + // 6299
      'ABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAA' + // 6300
      'MQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAA' + // 6301
      'AAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAA' + // 6302
      'AAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQ' + // 6303
      'AAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMA' + // 6304
      'AQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAA' + // 6305
      'EAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAA' + // 6306
      'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAA' + // 6307
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + // 6308
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + // 6309
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + // 6310
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAA' + // 6311
      'AAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgc' + // 6312
      'A/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWF' + // 6313
      'hYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQA' + // 6314
      'AAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAg' + // 6315
      'ABAAAAAAAAAAAD6AAAAAAAAA=='                                               // 6316
    ));                                                                          // 6317
  },                                                                             // 6318
                                                                                 // 6319
  loadTestFontId: 0,                                                             // 6320
                                                                                 // 6321
  loadingContext: {                                                              // 6322
    requests: [],                                                                // 6323
    nextRequestId: 0                                                             // 6324
  },                                                                             // 6325
                                                                                 // 6326
  isSyncFontLoadingSupported: (function detectSyncFontLoadingSupport() {         // 6327
    if (isWorker) {                                                              // 6328
      return false;                                                              // 6329
    }                                                                            // 6330
                                                                                 // 6331
    // User agent string sniffing is bad, but there is no reliable way to tell   // 6332
    // if font is fully loaded and ready to be used with canvas.                 // 6333
    var userAgent = window.navigator.userAgent;                                  // 6334
    var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(userAgent);                  // 6335
    if (m && m[1] >= 14) {                                                       // 6336
      return true;                                                               // 6337
    }                                                                            // 6338
    // TODO other browsers                                                       // 6339
    if (userAgent === 'node') {                                                  // 6340
      return true;                                                               // 6341
    }                                                                            // 6342
    return false;                                                                // 6343
  })(),                                                                          // 6344
                                                                                 // 6345
  nativeFontFaces: [],                                                           // 6346
                                                                                 // 6347
  isFontLoadingAPISupported: (!isWorker && typeof document !== 'undefined' &&    // 6348
                              !!document.fonts),                                 // 6349
                                                                                 // 6350
  addNativeFontFace: function fontLoader_addNativeFontFace(nativeFontFace) {     // 6351
    this.nativeFontFaces.push(nativeFontFace);                                   // 6352
    document.fonts.add(nativeFontFace);                                          // 6353
  },                                                                             // 6354
                                                                                 // 6355
  bind: function fontLoaderBind(fonts, callback) {                               // 6356
    assert(!isWorker, 'bind() shall be called from main thread');                // 6357
                                                                                 // 6358
    var rules = [];                                                              // 6359
    var fontsToLoad = [];                                                        // 6360
    var fontLoadPromises = [];                                                   // 6361
    for (var i = 0, ii = fonts.length; i < ii; i++) {                            // 6362
      var font = fonts[i];                                                       // 6363
                                                                                 // 6364
      // Add the font to the DOM only once or skip if the font                   // 6365
      // is already loaded.                                                      // 6366
      if (font.attached || font.loading === false) {                             // 6367
        continue;                                                                // 6368
      }                                                                          // 6369
      font.attached = true;                                                      // 6370
                                                                                 // 6371
      if (this.isFontLoadingAPISupported) {                                      // 6372
        var nativeFontFace = font.createNativeFontFace();                        // 6373
        if (nativeFontFace) {                                                    // 6374
          fontLoadPromises.push(nativeFontFace.loaded);                          // 6375
        }                                                                        // 6376
      } else {                                                                   // 6377
        var rule = font.bindDOM();                                               // 6378
        if (rule) {                                                              // 6379
          rules.push(rule);                                                      // 6380
          fontsToLoad.push(font);                                                // 6381
        }                                                                        // 6382
      }                                                                          // 6383
    }                                                                            // 6384
                                                                                 // 6385
    var request = FontLoader.queueLoadingCallback(callback);                     // 6386
    if (this.isFontLoadingAPISupported) {                                        // 6387
      Promise.all(fontsToLoad).then(function() {                                 // 6388
        request.complete();                                                      // 6389
      });                                                                        // 6390
    } else if (rules.length > 0 && !this.isSyncFontLoadingSupported) {           // 6391
      FontLoader.prepareFontLoadEvent(rules, fontsToLoad, request);              // 6392
    } else {                                                                     // 6393
      request.complete();                                                        // 6394
    }                                                                            // 6395
  },                                                                             // 6396
                                                                                 // 6397
  queueLoadingCallback: function FontLoader_queueLoadingCallback(callback) {     // 6398
    function LoadLoader_completeRequest() {                                      // 6399
      assert(!request.end, 'completeRequest() cannot be called twice');          // 6400
      request.end = Date.now();                                                  // 6401
                                                                                 // 6402
      // sending all completed requests in order how they were queued            // 6403
      while (context.requests.length > 0 && context.requests[0].end) {           // 6404
        var otherRequest = context.requests.shift();                             // 6405
        setTimeout(otherRequest.callback, 0);                                    // 6406
      }                                                                          // 6407
    }                                                                            // 6408
                                                                                 // 6409
    var context = FontLoader.loadingContext;                                     // 6410
    var requestId = 'pdfjs-font-loading-' + (context.nextRequestId++);           // 6411
    var request = {                                                              // 6412
      id: requestId,                                                             // 6413
      complete: LoadLoader_completeRequest,                                      // 6414
      callback: callback,                                                        // 6415
      started: Date.now()                                                        // 6416
    };                                                                           // 6417
    context.requests.push(request);                                              // 6418
    return request;                                                              // 6419
  },                                                                             // 6420
                                                                                 // 6421
  prepareFontLoadEvent: function fontLoaderPrepareFontLoadEvent(rules,           // 6422
                                                                fonts,           // 6423
                                                                request) {       // 6424
      /** Hack begin */                                                          // 6425
      // There's currently no event when a font has finished downloading so the  // 6426
      // following code is a dirty hack to 'guess' when a font is                // 6427
      // ready. It's assumed fonts are loaded in order, so add a known test      // 6428
      // font after the desired fonts and then test for the loading of that      // 6429
      // test font.                                                              // 6430
                                                                                 // 6431
      function int32(data, offset) {                                             // 6432
        return (data.charCodeAt(offset) << 24) |                                 // 6433
               (data.charCodeAt(offset + 1) << 16) |                             // 6434
               (data.charCodeAt(offset + 2) << 8) |                              // 6435
               (data.charCodeAt(offset + 3) & 0xff);                             // 6436
      }                                                                          // 6437
                                                                                 // 6438
      function spliceString(s, offset, remove, insert) {                         // 6439
        var chunk1 = s.substr(0, offset);                                        // 6440
        var chunk2 = s.substr(offset + remove);                                  // 6441
        return chunk1 + insert + chunk2;                                         // 6442
      }                                                                          // 6443
                                                                                 // 6444
      var i, ii;                                                                 // 6445
                                                                                 // 6446
      var canvas = document.createElement('canvas');                             // 6447
      canvas.width = 1;                                                          // 6448
      canvas.height = 1;                                                         // 6449
      var ctx = canvas.getContext('2d');                                         // 6450
                                                                                 // 6451
      var called = 0;                                                            // 6452
      function isFontReady(name, callback) {                                     // 6453
        called++;                                                                // 6454
        // With setTimeout clamping this gives the font ~100ms to load.          // 6455
        if(called > 30) {                                                        // 6456
          warn('Load test font never loaded.');                                  // 6457
          callback();                                                            // 6458
          return;                                                                // 6459
        }                                                                        // 6460
        ctx.font = '30px ' + name;                                               // 6461
        ctx.fillText('.', 0, 20);                                                // 6462
        var imageData = ctx.getImageData(0, 0, 1, 1);                            // 6463
        if (imageData.data[3] > 0) {                                             // 6464
          callback();                                                            // 6465
          return;                                                                // 6466
        }                                                                        // 6467
        setTimeout(isFontReady.bind(null, name, callback));                      // 6468
      }                                                                          // 6469
                                                                                 // 6470
      var loadTestFontId = 'lt' + Date.now() + this.loadTestFontId++;            // 6471
      // Chromium seems to cache fonts based on a hash of the actual font data,  // 6472
      // so the font must be modified for each load test else it will appear to  // 6473
      // be loaded already.                                                      // 6474
      // TODO: This could maybe be made faster by avoiding the btoa of the full  // 6475
      // font by splitting it in chunks before hand and padding the font id.     // 6476
      var data = this.loadTestFont;                                              // 6477
      var COMMENT_OFFSET = 976; // has to be on 4 byte boundary (for checksum)   // 6478
      data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length,           // 6479
                          loadTestFontId);                                       // 6480
      // CFF checksum is important for IE, adjusting it                          // 6481
      var CFF_CHECKSUM_OFFSET = 16;                                              // 6482
      var XXXX_VALUE = 0x58585858; // the "comment" filled with 'X'              // 6483
      var checksum = int32(data, CFF_CHECKSUM_OFFSET);                           // 6484
      for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {              // 6485
        checksum = (checksum - XXXX_VALUE + int32(loadTestFontId, i)) | 0;       // 6486
      }                                                                          // 6487
      if (i < loadTestFontId.length) { // align to 4 bytes boundary              // 6488
        checksum = (checksum - XXXX_VALUE +                                      // 6489
                    int32(loadTestFontId + 'XXX', i)) | 0;                       // 6490
      }                                                                          // 6491
      data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, string32(checksum));     // 6492
                                                                                 // 6493
      var url = 'url(data:font/opentype;base64,' + btoa(data) + ');';            // 6494
      var rule = '@font-face { font-family:"' + loadTestFontId + '";src:' +      // 6495
                 url + '}';                                                      // 6496
      FontLoader.insertRule(rule);                                               // 6497
                                                                                 // 6498
      var names = [];                                                            // 6499
      for (i = 0, ii = fonts.length; i < ii; i++) {                              // 6500
        names.push(fonts[i].loadedName);                                         // 6501
      }                                                                          // 6502
      names.push(loadTestFontId);                                                // 6503
                                                                                 // 6504
      var div = document.createElement('div');                                   // 6505
      div.setAttribute('style',                                                  // 6506
                       'visibility: hidden;' +                                   // 6507
                       'width: 10px; height: 10px;' +                            // 6508
                       'position: absolute; top: 0px; left: 0px;');              // 6509
      for (i = 0, ii = names.length; i < ii; ++i) {                              // 6510
        var span = document.createElement('span');                               // 6511
        span.textContent = 'Hi';                                                 // 6512
        span.style.fontFamily = names[i];                                        // 6513
        div.appendChild(span);                                                   // 6514
      }                                                                          // 6515
      document.body.appendChild(div);                                            // 6516
                                                                                 // 6517
      isFontReady(loadTestFontId, function() {                                   // 6518
        document.body.removeChild(div);                                          // 6519
        request.complete();                                                      // 6520
      });                                                                        // 6521
      /** Hack end */                                                            // 6522
  }                                                                              // 6523
};                                                                               // 6524
                                                                                 // 6525
var FontFaceObject = (function FontFaceObjectClosure() {                         // 6526
  function FontFaceObject(name, file, properties) {                              // 6527
    this.compiledGlyphs = {};                                                    // 6528
    if (arguments.length === 1) {                                                // 6529
      // importing translated data                                               // 6530
      var data = arguments[0];                                                   // 6531
      for (var i in data) {                                                      // 6532
        this[i] = data[i];                                                       // 6533
      }                                                                          // 6534
      return;                                                                    // 6535
    }                                                                            // 6536
  }                                                                              // 6537
  FontFaceObject.prototype = {                                                   // 6538
    createNativeFontFace: function FontFaceObject_createNativeFontFace() {       // 6539
      if (!this.data) {                                                          // 6540
        return null;                                                             // 6541
      }                                                                          // 6542
                                                                                 // 6543
      if (PDFJS.disableFontFace) {                                               // 6544
        this.disableFontFace = true;                                             // 6545
        return null;                                                             // 6546
      }                                                                          // 6547
                                                                                 // 6548
      var nativeFontFace = new FontFace(this.loadedName, this.data, {});         // 6549
                                                                                 // 6550
      FontLoader.addNativeFontFace(nativeFontFace);                              // 6551
                                                                                 // 6552
      if (PDFJS.pdfBug && 'FontInspector' in globalScope &&                      // 6553
          globalScope['FontInspector'].enabled) {                                // 6554
        globalScope['FontInspector'].fontAdded(this);                            // 6555
      }                                                                          // 6556
      return nativeFontFace;                                                     // 6557
    },                                                                           // 6558
                                                                                 // 6559
    bindDOM: function FontFaceObject_bindDOM() {                                 // 6560
      if (!this.data) {                                                          // 6561
        return null;                                                             // 6562
      }                                                                          // 6563
                                                                                 // 6564
      if (PDFJS.disableFontFace) {                                               // 6565
        this.disableFontFace = true;                                             // 6566
        return null;                                                             // 6567
      }                                                                          // 6568
                                                                                 // 6569
      var data = bytesToString(new Uint8Array(this.data));                       // 6570
      var fontName = this.loadedName;                                            // 6571
                                                                                 // 6572
      // Add the font-face rule to the document                                  // 6573
      var url = ('url(data:' + this.mimetype + ';base64,' +                      // 6574
                 window.btoa(data) + ');');                                      // 6575
      var rule = '@font-face { font-family:"' + fontName + '";src:' + url + '}'; // 6576
      FontLoader.insertRule(rule);                                               // 6577
                                                                                 // 6578
      if (PDFJS.pdfBug && 'FontInspector' in globalScope &&                      // 6579
          globalScope['FontInspector'].enabled) {                                // 6580
        globalScope['FontInspector'].fontAdded(this, url);                       // 6581
      }                                                                          // 6582
                                                                                 // 6583
      return rule;                                                               // 6584
    },                                                                           // 6585
                                                                                 // 6586
    getPathGenerator: function FontLoader_getPathGenerator(objs, character) {    // 6587
      if (!(character in this.compiledGlyphs)) {                                 // 6588
        var js = objs.get(this.loadedName + '_path_' + character);               // 6589
        /*jshint -W054 */                                                        // 6590
        this.compiledGlyphs[character] = new Function('c', 'size', js);          // 6591
      }                                                                          // 6592
      return this.compiledGlyphs[character];                                     // 6593
    }                                                                            // 6594
  };                                                                             // 6595
  return FontFaceObject;                                                         // 6596
})();                                                                            // 6597
                                                                                 // 6598
                                                                                 // 6599
var ANNOT_MIN_SIZE = 10; // px                                                   // 6600
                                                                                 // 6601
var AnnotationUtils = (function AnnotationUtilsClosure() {                       // 6602
  // TODO(mack): This dupes some of the logic in CanvasGraphics.setFont()        // 6603
  function setTextStyles(element, item, fontObj) {                               // 6604
                                                                                 // 6605
    var style = element.style;                                                   // 6606
    style.fontSize = item.fontSize + 'px';                                       // 6607
    style.direction = item.fontDirection < 0 ? 'rtl': 'ltr';                     // 6608
                                                                                 // 6609
    if (!fontObj) {                                                              // 6610
      return;                                                                    // 6611
    }                                                                            // 6612
                                                                                 // 6613
    style.fontWeight = fontObj.black ?                                           // 6614
      (fontObj.bold ? 'bolder' : 'bold') :                                       // 6615
      (fontObj.bold ? 'bold' : 'normal');                                        // 6616
    style.fontStyle = fontObj.italic ? 'italic' : 'normal';                      // 6617
                                                                                 // 6618
    var fontName = fontObj.loadedName;                                           // 6619
    var fontFamily = fontName ? '"' + fontName + '", ' : '';                     // 6620
    // Use a reasonable default font if the font doesn't specify a fallback      // 6621
    var fallbackName = fontObj.fallbackName || 'Helvetica, sans-serif';          // 6622
    style.fontFamily = fontFamily + fallbackName;                                // 6623
  }                                                                              // 6624
                                                                                 // 6625
  function initContainer(item, drawBorder) {                                     // 6626
    var container = document.createElement('section');                           // 6627
    var cstyle = container.style;                                                // 6628
    var width = item.rect[2] - item.rect[0];                                     // 6629
    var height = item.rect[3] - item.rect[1];                                    // 6630
                                                                                 // 6631
    var bWidth = item.borderWidth || 0;                                          // 6632
    if (bWidth) {                                                                // 6633
      width = width - 2 * bWidth;                                                // 6634
      height = height - 2 * bWidth;                                              // 6635
      cstyle.borderWidth = bWidth + 'px';                                        // 6636
      var color = item.color;                                                    // 6637
      if (drawBorder && color) {                                                 // 6638
        cstyle.borderStyle = 'solid';                                            // 6639
        cstyle.borderColor = Util.makeCssRgb(Math.round(color[0] * 255),         // 6640
                                             Math.round(color[1] * 255),         // 6641
                                             Math.round(color[2] * 255));        // 6642
      }                                                                          // 6643
    }                                                                            // 6644
    cstyle.width = width + 'px';                                                 // 6645
    cstyle.height = height + 'px';                                               // 6646
    return container;                                                            // 6647
  }                                                                              // 6648
                                                                                 // 6649
  function getHtmlElementForTextWidgetAnnotation(item, commonObjs) {             // 6650
    var element = document.createElement('div');                                 // 6651
    var width = item.rect[2] - item.rect[0];                                     // 6652
    var height = item.rect[3] - item.rect[1];                                    // 6653
    element.style.width = width + 'px';                                          // 6654
    element.style.height = height + 'px';                                        // 6655
    element.style.display = 'table';                                             // 6656
                                                                                 // 6657
    var content = document.createElement('div');                                 // 6658
    content.textContent = item.fieldValue;                                       // 6659
    var textAlignment = item.textAlignment;                                      // 6660
    content.style.textAlign = ['left', 'center', 'right'][textAlignment];        // 6661
    content.style.verticalAlign = 'middle';                                      // 6662
    content.style.display = 'table-cell';                                        // 6663
                                                                                 // 6664
    var fontObj = item.fontRefName ?                                             // 6665
      commonObjs.getData(item.fontRefName) : null;                               // 6666
    setTextStyles(content, item, fontObj);                                       // 6667
                                                                                 // 6668
    element.appendChild(content);                                                // 6669
                                                                                 // 6670
    return element;                                                              // 6671
  }                                                                              // 6672
                                                                                 // 6673
  function getHtmlElementForTextAnnotation(item) {                               // 6674
    var rect = item.rect;                                                        // 6675
                                                                                 // 6676
    // sanity check because of OOo-generated PDFs                                // 6677
    if ((rect[3] - rect[1]) < ANNOT_MIN_SIZE) {                                  // 6678
      rect[3] = rect[1] + ANNOT_MIN_SIZE;                                        // 6679
    }                                                                            // 6680
    if ((rect[2] - rect[0]) < ANNOT_MIN_SIZE) {                                  // 6681
      rect[2] = rect[0] + (rect[3] - rect[1]); // make it square                 // 6682
    }                                                                            // 6683
                                                                                 // 6684
    var container = initContainer(item, false);                                  // 6685
    container.className = 'annotText';                                           // 6686
                                                                                 // 6687
    var image  = document.createElement('img');                                  // 6688
    image.style.height = container.style.height;                                 // 6689
    image.style.width = container.style.width;                                   // 6690
    var iconName = item.name;                                                    // 6691
    image.src = PDFJS.imageResourcesPath + 'annotation-' +                       // 6692
      iconName.toLowerCase() + '.svg';                                           // 6693
    image.alt = '[{{type}} Annotation]';                                         // 6694
    image.dataset.l10nId = 'text_annotation_type';                               // 6695
    image.dataset.l10nArgs = JSON.stringify({type: iconName});                   // 6696
                                                                                 // 6697
    var contentWrapper = document.createElement('div');                          // 6698
    contentWrapper.className = 'annotTextContentWrapper';                        // 6699
    contentWrapper.style.left = Math.floor(rect[2] - rect[0] + 5) + 'px';        // 6700
    contentWrapper.style.top = '-10px';                                          // 6701
                                                                                 // 6702
    var content = document.createElement('div');                                 // 6703
    content.className = 'annotTextContent';                                      // 6704
    content.setAttribute('hidden', true);                                        // 6705
                                                                                 // 6706
    var i, ii;                                                                   // 6707
    if (item.hasBgColor) {                                                       // 6708
      var color = item.color;                                                    // 6709
                                                                                 // 6710
      // Enlighten the color (70%)                                               // 6711
      var BACKGROUND_ENLIGHT = 0.7;                                              // 6712
      var r = BACKGROUND_ENLIGHT * (1.0 - color[0]) + color[0];                  // 6713
      var g = BACKGROUND_ENLIGHT * (1.0 - color[1]) + color[1];                  // 6714
      var b = BACKGROUND_ENLIGHT * (1.0 - color[2]) + color[2];                  // 6715
      content.style.backgroundColor = Util.makeCssRgb((r * 255) | 0,             // 6716
                                                      (g * 255) | 0,             // 6717
                                                      (b * 255) | 0);            // 6718
    }                                                                            // 6719
                                                                                 // 6720
    var title = document.createElement('h1');                                    // 6721
    var text = document.createElement('p');                                      // 6722
    title.textContent = item.title;                                              // 6723
                                                                                 // 6724
    if (!item.content && !item.title) {                                          // 6725
      content.setAttribute('hidden', true);                                      // 6726
    } else {                                                                     // 6727
      var e = document.createElement('span');                                    // 6728
      var lines = item.content.split(/(?:\r\n?|\n)/);                            // 6729
      for (i = 0, ii = lines.length; i < ii; ++i) {                              // 6730
        var line = lines[i];                                                     // 6731
        e.appendChild(document.createTextNode(line));                            // 6732
        if (i < (ii - 1)) {                                                      // 6733
          e.appendChild(document.createElement('br'));                           // 6734
        }                                                                        // 6735
      }                                                                          // 6736
      text.appendChild(e);                                                       // 6737
                                                                                 // 6738
      var pinned = false;                                                        // 6739
                                                                                 // 6740
      var showAnnotation = function showAnnotation(pin) {                        // 6741
        if (pin) {                                                               // 6742
          pinned = true;                                                         // 6743
        }                                                                        // 6744
        if (content.hasAttribute('hidden')) {                                    // 6745
          container.style.zIndex += 1;                                           // 6746
          content.removeAttribute('hidden');                                     // 6747
        }                                                                        // 6748
      };                                                                         // 6749
                                                                                 // 6750
      var hideAnnotation = function hideAnnotation(unpin) {                      // 6751
        if (unpin) {                                                             // 6752
          pinned = false;                                                        // 6753
        }                                                                        // 6754
        if (!content.hasAttribute('hidden') && !pinned) {                        // 6755
          container.style.zIndex -= 1;                                           // 6756
          content.setAttribute('hidden', true);                                  // 6757
        }                                                                        // 6758
      };                                                                         // 6759
                                                                                 // 6760
      var toggleAnnotation = function toggleAnnotation() {                       // 6761
        if (pinned) {                                                            // 6762
          hideAnnotation(true);                                                  // 6763
        } else {                                                                 // 6764
          showAnnotation(true);                                                  // 6765
        }                                                                        // 6766
      };                                                                         // 6767
                                                                                 // 6768
      image.addEventListener('click', function image_clickHandler() {            // 6769
        toggleAnnotation();                                                      // 6770
      }, false);                                                                 // 6771
      image.addEventListener('mouseover', function image_mouseOverHandler() {    // 6772
        showAnnotation();                                                        // 6773
      }, false);                                                                 // 6774
      image.addEventListener('mouseout', function image_mouseOutHandler() {      // 6775
        hideAnnotation();                                                        // 6776
      }, false);                                                                 // 6777
                                                                                 // 6778
      content.addEventListener('click', function content_clickHandler() {        // 6779
        hideAnnotation(true);                                                    // 6780
      }, false);                                                                 // 6781
    }                                                                            // 6782
                                                                                 // 6783
    content.appendChild(title);                                                  // 6784
    content.appendChild(text);                                                   // 6785
    contentWrapper.appendChild(content);                                         // 6786
    container.appendChild(image);                                                // 6787
    container.appendChild(contentWrapper);                                       // 6788
                                                                                 // 6789
    return container;                                                            // 6790
  }                                                                              // 6791
                                                                                 // 6792
  function getHtmlElementForLinkAnnotation(item) {                               // 6793
    var container = initContainer(item, true);                                   // 6794
    container.className = 'annotLink';                                           // 6795
                                                                                 // 6796
    var link = document.createElement('a');                                      // 6797
    link.href = link.title = item.url || '';                                     // 6798
    if (item.url && PDFJS.openExternalLinksInNewWindow) {                        // 6799
      link.target = '_blank';                                                    // 6800
    }                                                                            // 6801
                                                                                 // 6802
    container.appendChild(link);                                                 // 6803
                                                                                 // 6804
    return container;                                                            // 6805
  }                                                                              // 6806
                                                                                 // 6807
  function getHtmlElement(data, objs) {                                          // 6808
    switch (data.annotationType) {                                               // 6809
      case AnnotationType.WIDGET:                                                // 6810
        return getHtmlElementForTextWidgetAnnotation(data, objs);                // 6811
      case AnnotationType.TEXT:                                                  // 6812
        return getHtmlElementForTextAnnotation(data);                            // 6813
      case AnnotationType.LINK:                                                  // 6814
        return getHtmlElementForLinkAnnotation(data);                            // 6815
      default:                                                                   // 6816
        throw new Error('Unsupported annotationType: ' + data.annotationType);   // 6817
    }                                                                            // 6818
  }                                                                              // 6819
                                                                                 // 6820
  return {                                                                       // 6821
    getHtmlElement: getHtmlElement                                               // 6822
  };                                                                             // 6823
})();                                                                            // 6824
PDFJS.AnnotationUtils = AnnotationUtils;                                         // 6825
                                                                                 // 6826
                                                                                 // 6827
var SVG_DEFAULTS = {                                                             // 6828
  fontStyle: 'normal',                                                           // 6829
  fontWeight: 'normal',                                                          // 6830
  fillColor: '#000000'                                                           // 6831
};                                                                               // 6832
                                                                                 // 6833
var convertImgDataToPng = (function convertImgDataToPngClosure() {               // 6834
  var PNG_HEADER =                                                               // 6835
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);            // 6836
                                                                                 // 6837
  var CHUNK_WRAPPER_SIZE = 12;                                                   // 6838
                                                                                 // 6839
  var crcTable = new Int32Array(256);                                            // 6840
  for (var i = 0; i < 256; i++) {                                                // 6841
    var c = i;                                                                   // 6842
    for (var h = 0; h < 8; h++) {                                                // 6843
      if (c & 1) {                                                               // 6844
        c = 0xedB88320 ^ ((c >> 1) & 0x7fffffff);                                // 6845
      } else {                                                                   // 6846
        c = (c >> 1) & 0x7fffffff;                                               // 6847
      }                                                                          // 6848
    }                                                                            // 6849
    crcTable[i] = c;                                                             // 6850
  }                                                                              // 6851
                                                                                 // 6852
  function crc32(data, start, end) {                                             // 6853
    var crc = -1;                                                                // 6854
    for (var i = start; i < end; i++) {                                          // 6855
      var a = (crc ^ data[i]) & 0xff;                                            // 6856
      var b = crcTable[a];                                                       // 6857
      crc = (crc >>> 8) ^ b;                                                     // 6858
    }                                                                            // 6859
    return crc ^ -1;                                                             // 6860
  }                                                                              // 6861
                                                                                 // 6862
  function writePngChunk(type, body, data, offset) {                             // 6863
    var p = offset;                                                              // 6864
    var len = body.length;                                                       // 6865
                                                                                 // 6866
    data[p] = len >> 24 & 0xff;                                                  // 6867
    data[p + 1] = len >> 16 & 0xff;                                              // 6868
    data[p + 2] = len >> 8 & 0xff;                                               // 6869
    data[p + 3] = len & 0xff;                                                    // 6870
    p += 4;                                                                      // 6871
                                                                                 // 6872
    data[p] = type.charCodeAt(0) & 0xff;                                         // 6873
    data[p + 1] = type.charCodeAt(1) & 0xff;                                     // 6874
    data[p + 2] = type.charCodeAt(2) & 0xff;                                     // 6875
    data[p + 3] = type.charCodeAt(3) & 0xff;                                     // 6876
    p += 4;                                                                      // 6877
                                                                                 // 6878
    data.set(body, p);                                                           // 6879
    p += body.length;                                                            // 6880
                                                                                 // 6881
    var crc = crc32(data, offset + 4, p);                                        // 6882
                                                                                 // 6883
    data[p] = crc >> 24 & 0xff;                                                  // 6884
    data[p + 1] = crc >> 16 & 0xff;                                              // 6885
    data[p + 2] = crc >> 8 & 0xff;                                               // 6886
    data[p + 3] = crc & 0xff;                                                    // 6887
  }                                                                              // 6888
                                                                                 // 6889
  function adler32(data, start, end) {                                           // 6890
    var a = 1;                                                                   // 6891
    var b = 0;                                                                   // 6892
    for (var i = start; i < end; ++i) {                                          // 6893
      a = (a + (data[i] & 0xff)) % 65521;                                        // 6894
      b = (b + a) % 65521;                                                       // 6895
    }                                                                            // 6896
    return (b << 16) | a;                                                        // 6897
  }                                                                              // 6898
                                                                                 // 6899
  function encode(imgData, kind) {                                               // 6900
    var width = imgData.width;                                                   // 6901
    var height = imgData.height;                                                 // 6902
    var bitDepth, colorType, lineSize;                                           // 6903
    var bytes = imgData.data;                                                    // 6904
                                                                                 // 6905
    switch (kind) {                                                              // 6906
      case ImageKind.GRAYSCALE_1BPP:                                             // 6907
        colorType = 0;                                                           // 6908
        bitDepth = 1;                                                            // 6909
        lineSize = (width + 7) >> 3;                                             // 6910
        break;                                                                   // 6911
      case ImageKind.RGB_24BPP:                                                  // 6912
        colorType = 2;                                                           // 6913
        bitDepth = 8;                                                            // 6914
        lineSize = width * 3;                                                    // 6915
        break;                                                                   // 6916
      case ImageKind.RGBA_32BPP:                                                 // 6917
        colorType = 6;                                                           // 6918
        bitDepth = 8;                                                            // 6919
        lineSize = width * 4;                                                    // 6920
        break;                                                                   // 6921
      default:                                                                   // 6922
        throw new Error('invalid format');                                       // 6923
    }                                                                            // 6924
                                                                                 // 6925
    // prefix every row with predictor 0                                         // 6926
    var literals = new Uint8Array((1 + lineSize) * height);                      // 6927
    var offsetLiterals = 0, offsetBytes = 0;                                     // 6928
    var y, i;                                                                    // 6929
    for (y = 0; y < height; ++y) {                                               // 6930
      literals[offsetLiterals++] = 0; // no prediction                           // 6931
      literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize),          // 6932
                   offsetLiterals);                                              // 6933
      offsetBytes += lineSize;                                                   // 6934
      offsetLiterals += lineSize;                                                // 6935
    }                                                                            // 6936
                                                                                 // 6937
    if (kind === ImageKind.GRAYSCALE_1BPP) {                                     // 6938
      // inverting for B/W                                                       // 6939
      offsetLiterals = 0;                                                        // 6940
      for (y = 0; y < height; y++) {                                             // 6941
        offsetLiterals++; // skipping predictor                                  // 6942
        for (i = 0; i < lineSize; i++) {                                         // 6943
          literals[offsetLiterals++] ^= 0xFF;                                    // 6944
        }                                                                        // 6945
      }                                                                          // 6946
    }                                                                            // 6947
                                                                                 // 6948
    var ihdr = new Uint8Array([                                                  // 6949
      width >> 24 & 0xff,                                                        // 6950
      width >> 16 & 0xff,                                                        // 6951
      width >> 8 & 0xff,                                                         // 6952
      width & 0xff,                                                              // 6953
      height >> 24 & 0xff,                                                       // 6954
      height >> 16 & 0xff,                                                       // 6955
      height >> 8 & 0xff,                                                        // 6956
      height & 0xff,                                                             // 6957
      bitDepth, // bit depth                                                     // 6958
      colorType, // color type                                                   // 6959
      0x00, // compression method                                                // 6960
      0x00, // filter method                                                     // 6961
      0x00 // interlace method                                                   // 6962
    ]);                                                                          // 6963
                                                                                 // 6964
    var len = literals.length;                                                   // 6965
    var maxBlockLength = 0xFFFF;                                                 // 6966
                                                                                 // 6967
    var deflateBlocks = Math.ceil(len / maxBlockLength);                         // 6968
    var idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);                  // 6969
    var pi = 0;                                                                  // 6970
    idat[pi++] = 0x78; // compression method and flags                           // 6971
    idat[pi++] = 0x9c; // flags                                                  // 6972
                                                                                 // 6973
    var pos = 0;                                                                 // 6974
    while (len > maxBlockLength) {                                               // 6975
      // writing non-final DEFLATE blocks type 0 and length of 65535             // 6976
      idat[pi++] = 0x00;                                                         // 6977
      idat[pi++] = 0xff;                                                         // 6978
      idat[pi++] = 0xff;                                                         // 6979
      idat[pi++] = 0x00;                                                         // 6980
      idat[pi++] = 0x00;                                                         // 6981
      idat.set(literals.subarray(pos, pos + maxBlockLength), pi);                // 6982
      pi += maxBlockLength;                                                      // 6983
      pos += maxBlockLength;                                                     // 6984
      len -= maxBlockLength;                                                     // 6985
    }                                                                            // 6986
                                                                                 // 6987
    // writing non-final DEFLATE blocks type 0                                   // 6988
    idat[pi++] = 0x01;                                                           // 6989
    idat[pi++] = len & 0xff;                                                     // 6990
    idat[pi++] = len >> 8 & 0xff;                                                // 6991
    idat[pi++] = (~len & 0xffff) & 0xff;                                         // 6992
    idat[pi++] = (~len & 0xffff) >> 8 & 0xff;                                    // 6993
    idat.set(literals.subarray(pos), pi);                                        // 6994
    pi += literals.length - pos;                                                 // 6995
                                                                                 // 6996
    var adler = adler32(literals, 0, literals.length); // checksum               // 6997
    idat[pi++] = adler >> 24 & 0xff;                                             // 6998
    idat[pi++] = adler >> 16 & 0xff;                                             // 6999
    idat[pi++] = adler >> 8 & 0xff;                                              // 7000
    idat[pi++] = adler & 0xff;                                                   // 7001
                                                                                 // 7002
    // PNG will consists: header, IHDR+data, IDAT+data, and IEND.                // 7003
    var pngLength = PNG_HEADER.length + (CHUNK_WRAPPER_SIZE * 3) +               // 7004
                    ihdr.length + idat.length;                                   // 7005
    var data = new Uint8Array(pngLength);                                        // 7006
    var offset = 0;                                                              // 7007
    data.set(PNG_HEADER, offset);                                                // 7008
    offset += PNG_HEADER.length;                                                 // 7009
    writePngChunk('IHDR', ihdr, data, offset);                                   // 7010
    offset += CHUNK_WRAPPER_SIZE + ihdr.length;                                  // 7011
    writePngChunk('IDATA', idat, data, offset);                                  // 7012
    offset += CHUNK_WRAPPER_SIZE + idat.length;                                  // 7013
    writePngChunk('IEND', new Uint8Array(0), data, offset);                      // 7014
                                                                                 // 7015
    return PDFJS.createObjectURL(data, 'image/png');                             // 7016
  }                                                                              // 7017
                                                                                 // 7018
  return function convertImgDataToPng(imgData) {                                 // 7019
    var kind = (imgData.kind === undefined ?                                     // 7020
                ImageKind.GRAYSCALE_1BPP : imgData.kind);                        // 7021
    return encode(imgData, kind);                                                // 7022
  };                                                                             // 7023
})();                                                                            // 7024
                                                                                 // 7025
var SVGExtraState = (function SVGExtraStateClosure() {                           // 7026
  function SVGExtraState() {                                                     // 7027
    this.fontSizeScale = 1;                                                      // 7028
    this.fontWeight = SVG_DEFAULTS.fontWeight;                                   // 7029
    this.fontSize = 0;                                                           // 7030
                                                                                 // 7031
    this.textMatrix = IDENTITY_MATRIX;                                           // 7032
    this.fontMatrix = FONT_IDENTITY_MATRIX;                                      // 7033
    this.leading = 0;                                                            // 7034
                                                                                 // 7035
    // Current point (in user coordinates)                                       // 7036
    this.x = 0;                                                                  // 7037
    this.y = 0;                                                                  // 7038
                                                                                 // 7039
    // Start of text line (in text coordinates)                                  // 7040
    this.lineX = 0;                                                              // 7041
    this.lineY = 0;                                                              // 7042
                                                                                 // 7043
    // Character and word spacing                                                // 7044
    this.charSpacing = 0;                                                        // 7045
    this.wordSpacing = 0;                                                        // 7046
    this.textHScale = 1;                                                         // 7047
    this.textRise = 0;                                                           // 7048
                                                                                 // 7049
    // Default foreground and background colors                                  // 7050
    this.fillColor = SVG_DEFAULTS.fillColor;                                     // 7051
    this.strokeColor = '#000000';                                                // 7052
                                                                                 // 7053
    this.fillAlpha = 1;                                                          // 7054
    this.strokeAlpha = 1;                                                        // 7055
    this.lineWidth = 1;                                                          // 7056
    this.lineJoin = '';                                                          // 7057
    this.lineCap = '';                                                           // 7058
    this.miterLimit = 0;                                                         // 7059
                                                                                 // 7060
    this.dashArray = [];                                                         // 7061
    this.dashPhase = 0;                                                          // 7062
                                                                                 // 7063
    this.dependencies = [];                                                      // 7064
                                                                                 // 7065
    // Clipping                                                                  // 7066
    this.clipId = '';                                                            // 7067
    this.pendingClip = false;                                                    // 7068
                                                                                 // 7069
    this.maskId = '';                                                            // 7070
  }                                                                              // 7071
                                                                                 // 7072
  SVGExtraState.prototype = {                                                    // 7073
    clone: function SVGExtraState_clone() {                                      // 7074
      return Object.create(this);                                                // 7075
    },                                                                           // 7076
    setCurrentPoint: function SVGExtraState_setCurrentPoint(x, y) {              // 7077
      this.x = x;                                                                // 7078
      this.y = y;                                                                // 7079
    }                                                                            // 7080
  };                                                                             // 7081
  return SVGExtraState;                                                          // 7082
})();                                                                            // 7083
                                                                                 // 7084
var SVGGraphics = (function SVGGraphicsClosure() {                               // 7085
  function createScratchSVG(width, height) {                                     // 7086
    var NS = 'http://www.w3.org/2000/svg';                                       // 7087
    var svg = document.createElementNS(NS, 'svg:svg');                           // 7088
    svg.setAttributeNS(null, 'version', '1.1');                                  // 7089
    svg.setAttributeNS(null, 'width', width + 'px');                             // 7090
    svg.setAttributeNS(null, 'height', height + 'px');                           // 7091
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);          // 7092
    return svg;                                                                  // 7093
  }                                                                              // 7094
                                                                                 // 7095
  function opListToTree(opList) {                                                // 7096
    var opTree = [];                                                             // 7097
    var tmp = [];                                                                // 7098
    var opListLen = opList.length;                                               // 7099
                                                                                 // 7100
    for (var x = 0; x < opListLen; x++) {                                        // 7101
      if (opList[x].fn === 'save') {                                             // 7102
        opTree.push({'fnId': 92, 'fn': 'group', 'items': []});                   // 7103
        tmp.push(opTree);                                                        // 7104
        opTree = opTree[opTree.length - 1].items;                                // 7105
        continue;                                                                // 7106
      }                                                                          // 7107
                                                                                 // 7108
      if(opList[x].fn === 'restore') {                                           // 7109
        opTree = tmp.pop();                                                      // 7110
      } else {                                                                   // 7111
        opTree.push(opList[x]);                                                  // 7112
      }                                                                          // 7113
    }                                                                            // 7114
    return opTree;                                                               // 7115
  }                                                                              // 7116
                                                                                 // 7117
  /**                                                                            // 7118
   * Formats float number.                                                       // 7119
   * @param value {number} number to format.                                     // 7120
   * @returns {string}                                                           // 7121
   */                                                                            // 7122
  function pf(value) {                                                           // 7123
    if (value === (value | 0)) { // integer number                               // 7124
      return value.toString();                                                   // 7125
    }                                                                            // 7126
    var s = value.toFixed(10);                                                   // 7127
    var i = s.length - 1;                                                        // 7128
    if (s[i] !== '0') {                                                          // 7129
      return s;                                                                  // 7130
    }                                                                            // 7131
    // removing trailing zeros                                                   // 7132
    do {                                                                         // 7133
      i--;                                                                       // 7134
    } while (s[i] === '0');                                                      // 7135
    return s.substr(0, s[i] === '.' ? i : i + 1);                                // 7136
  }                                                                              // 7137
                                                                                 // 7138
  /**                                                                            // 7139
   * Formats transform matrix. The standard rotation, scale and translate        // 7140
   * matrices are replaced by their shorter forms, and for identity matrix       // 7141
   * returns empty string to save the memory.                                    // 7142
   * @param m {Array} matrix to format.                                          // 7143
   * @returns {string}                                                           // 7144
   */                                                                            // 7145
  function pm(m) {                                                               // 7146
    if (m[4] === 0 && m[5] === 0) {                                              // 7147
      if (m[1] === 0 && m[2] === 0) {                                            // 7148
        if (m[0] === 1 && m[3] === 1) {                                          // 7149
          return '';                                                             // 7150
        }                                                                        // 7151
        return 'scale(' + pf(m[0]) + ' ' + pf(m[3]) + ')';                       // 7152
      }                                                                          // 7153
      if (m[0] === m[3] && m[1] === -m[2]) {                                     // 7154
        var a = Math.acos(m[0]) * 180 / Math.PI;                                 // 7155
        return 'rotate(' + pf(a) + ')';                                          // 7156
      }                                                                          // 7157
    } else {                                                                     // 7158
      if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {                // 7159
        return 'translate(' + pf(m[4]) + ' ' + pf(m[5]) + ')';                   // 7160
      }                                                                          // 7161
    }                                                                            // 7162
    return 'matrix(' + pf(m[0]) + ' ' + pf(m[1]) + ' ' + pf(m[2]) + ' ' +        // 7163
      pf(m[3]) + ' ' + pf(m[4]) + ' ' + pf(m[5]) + ')';                          // 7164
  }                                                                              // 7165
                                                                                 // 7166
  function SVGGraphics(commonObjs, objs) {                                       // 7167
    this.current = new SVGExtraState();                                          // 7168
    this.transformMatrix = IDENTITY_MATRIX; // Graphics state matrix             // 7169
    this.transformStack = [];                                                    // 7170
    this.extraStack = [];                                                        // 7171
    this.commonObjs = commonObjs;                                                // 7172
    this.objs = objs;                                                            // 7173
    this.pendingEOFill = false;                                                  // 7174
                                                                                 // 7175
    this.embedFonts = false;                                                     // 7176
    this.embeddedFonts = {};                                                     // 7177
    this.cssStyle = null;                                                        // 7178
  }                                                                              // 7179
                                                                                 // 7180
  var NS = 'http://www.w3.org/2000/svg';                                         // 7181
  var XML_NS = 'http://www.w3.org/XML/1998/namespace';                           // 7182
  var XLINK_NS = 'http://www.w3.org/1999/xlink';                                 // 7183
  var LINE_CAP_STYLES = ['butt', 'round', 'square'];                             // 7184
  var LINE_JOIN_STYLES = ['miter', 'round', 'bevel'];                            // 7185
  var clipCount = 0;                                                             // 7186
  var maskCount = 0;                                                             // 7187
                                                                                 // 7188
  SVGGraphics.prototype = {                                                      // 7189
    save: function SVGGraphics_save() {                                          // 7190
      this.transformStack.push(this.transformMatrix);                            // 7191
      var old = this.current;                                                    // 7192
      this.extraStack.push(old);                                                 // 7193
      this.current = old.clone();                                                // 7194
    },                                                                           // 7195
                                                                                 // 7196
    restore: function SVGGraphics_restore() {                                    // 7197
      this.transformMatrix = this.transformStack.pop();                          // 7198
      this.current = this.extraStack.pop();                                      // 7199
                                                                                 // 7200
      this.tgrp = document.createElementNS(NS, 'svg:g');                         // 7201
      this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));     // 7202
      this.pgrp.appendChild(this.tgrp);                                          // 7203
    },                                                                           // 7204
                                                                                 // 7205
    group: function SVGGraphics_group(items) {                                   // 7206
      this.save();                                                               // 7207
      this.executeOpTree(items);                                                 // 7208
      this.restore();                                                            // 7209
    },                                                                           // 7210
                                                                                 // 7211
    loadDependencies: function SVGGraphics_loadDependencies(operatorList) {      // 7212
      var fnArray = operatorList.fnArray;                                        // 7213
      var fnArrayLen = fnArray.length;                                           // 7214
      var argsArray = operatorList.argsArray;                                    // 7215
                                                                                 // 7216
      var self = this;                                                           // 7217
      for (var i = 0; i < fnArrayLen; i++) {                                     // 7218
        if (OPS.dependency === fnArray[i]) {                                     // 7219
          var deps = argsArray[i];                                               // 7220
          for (var n = 0, nn = deps.length; n < nn; n++) {                       // 7221
            var obj = deps[n];                                                   // 7222
            var common = obj.substring(0, 2) === 'g_';                           // 7223
            var promise;                                                         // 7224
            if (common) {                                                        // 7225
              promise = new Promise(function(resolve) {                          // 7226
                self.commonObjs.get(obj, resolve);                               // 7227
              });                                                                // 7228
            } else {                                                             // 7229
              promise = new Promise(function(resolve) {                          // 7230
                self.objs.get(obj, resolve);                                     // 7231
              });                                                                // 7232
            }                                                                    // 7233
            this.current.dependencies.push(promise);                             // 7234
          }                                                                      // 7235
        }                                                                        // 7236
      }                                                                          // 7237
      return Promise.all(this.current.dependencies);                             // 7238
    },                                                                           // 7239
                                                                                 // 7240
    transform: function SVGGraphics_transform(a, b, c, d, e, f) {                // 7241
      var transformMatrix = [a, b, c, d, e, f];                                  // 7242
      this.transformMatrix = PDFJS.Util.transform(this.transformMatrix,          // 7243
                                                  transformMatrix);              // 7244
                                                                                 // 7245
      this.tgrp = document.createElementNS(NS, 'svg:g');                         // 7246
      this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));     // 7247
    },                                                                           // 7248
                                                                                 // 7249
    getSVG: function SVGGraphics_getSVG(operatorList, viewport) {                // 7250
      this.svg = createScratchSVG(viewport.width, viewport.height);              // 7251
      this.viewport = viewport;                                                  // 7252
                                                                                 // 7253
      return this.loadDependencies(operatorList).then(function () {              // 7254
        this.transformMatrix = IDENTITY_MATRIX;                                  // 7255
        this.pgrp = document.createElementNS(NS, 'svg:g'); // Parent group       // 7256
        this.pgrp.setAttributeNS(null, 'transform', pm(viewport.transform));     // 7257
        this.tgrp = document.createElementNS(NS, 'svg:g'); // Transform group    // 7258
        this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));   // 7259
        this.defs = document.createElementNS(NS, 'svg:defs');                    // 7260
        this.pgrp.appendChild(this.defs);                                        // 7261
        this.pgrp.appendChild(this.tgrp);                                        // 7262
        this.svg.appendChild(this.pgrp);                                         // 7263
        var opTree = this.convertOpList(operatorList);                           // 7264
        this.executeOpTree(opTree);                                              // 7265
        return this.svg;                                                         // 7266
      }.bind(this));                                                             // 7267
    },                                                                           // 7268
                                                                                 // 7269
    convertOpList: function SVGGraphics_convertOpList(operatorList) {            // 7270
      var argsArray = operatorList.argsArray;                                    // 7271
      var fnArray = operatorList.fnArray;                                        // 7272
      var fnArrayLen  = fnArray.length;                                          // 7273
      var REVOPS = [];                                                           // 7274
      var opList = [];                                                           // 7275
                                                                                 // 7276
      for (var op in OPS) {                                                      // 7277
        REVOPS[OPS[op]] = op;                                                    // 7278
      }                                                                          // 7279
                                                                                 // 7280
      for (var x = 0; x < fnArrayLen; x++) {                                     // 7281
        var fnId = fnArray[x];                                                   // 7282
        opList.push({'fnId' : fnId, 'fn': REVOPS[fnId], 'args': argsArray[x]});  // 7283
      }                                                                          // 7284
      return opListToTree(opList);                                               // 7285
    },                                                                           // 7286
                                                                                 // 7287
    executeOpTree: function SVGGraphics_executeOpTree(opTree) {                  // 7288
      var opTreeLen = opTree.length;                                             // 7289
      for(var x = 0; x < opTreeLen; x++) {                                       // 7290
        var fn = opTree[x].fn;                                                   // 7291
        var fnId = opTree[x].fnId;                                               // 7292
        var args = opTree[x].args;                                               // 7293
                                                                                 // 7294
        switch (fnId | 0) {                                                      // 7295
          case OPS.beginText:                                                    // 7296
            this.beginText();                                                    // 7297
            break;                                                               // 7298
          case OPS.setLeading:                                                   // 7299
            this.setLeading(args);                                               // 7300
            break;                                                               // 7301
          case OPS.setLeadingMoveText:                                           // 7302
            this.setLeadingMoveText(args[0], args[1]);                           // 7303
            break;                                                               // 7304
          case OPS.setFont:                                                      // 7305
            this.setFont(args);                                                  // 7306
            break;                                                               // 7307
          case OPS.showText:                                                     // 7308
            this.showText(args[0]);                                              // 7309
            break;                                                               // 7310
          case OPS.showSpacedText:                                               // 7311
            this.showText(args[0]);                                              // 7312
            break;                                                               // 7313
          case OPS.endText:                                                      // 7314
            this.endText();                                                      // 7315
            break;                                                               // 7316
          case OPS.moveText:                                                     // 7317
            this.moveText(args[0], args[1]);                                     // 7318
            break;                                                               // 7319
          case OPS.setCharSpacing:                                               // 7320
            this.setCharSpacing(args[0]);                                        // 7321
            break;                                                               // 7322
          case OPS.setWordSpacing:                                               // 7323
            this.setWordSpacing(args[0]);                                        // 7324
            break;                                                               // 7325
          case OPS.setHScale:                                                    // 7326
            this.setHScale(args[0]);                                             // 7327
            break;                                                               // 7328
          case OPS.setTextMatrix:                                                // 7329
            this.setTextMatrix(args[0], args[1], args[2],                        // 7330
                               args[3], args[4], args[5]);                       // 7331
            break;                                                               // 7332
          case OPS.setLineWidth:                                                 // 7333
            this.setLineWidth(args[0]);                                          // 7334
            break;                                                               // 7335
          case OPS.setLineJoin:                                                  // 7336
            this.setLineJoin(args[0]);                                           // 7337
            break;                                                               // 7338
          case OPS.setLineCap:                                                   // 7339
            this.setLineCap(args[0]);                                            // 7340
            break;                                                               // 7341
          case OPS.setMiterLimit:                                                // 7342
            this.setMiterLimit(args[0]);                                         // 7343
            break;                                                               // 7344
          case OPS.setFillRGBColor:                                              // 7345
            this.setFillRGBColor(args[0], args[1], args[2]);                     // 7346
            break;                                                               // 7347
          case OPS.setStrokeRGBColor:                                            // 7348
            this.setStrokeRGBColor(args[0], args[1], args[2]);                   // 7349
            break;                                                               // 7350
          case OPS.setDash:                                                      // 7351
            this.setDash(args[0], args[1]);                                      // 7352
            break;                                                               // 7353
          case OPS.setGState:                                                    // 7354
            this.setGState(args[0]);                                             // 7355
            break;                                                               // 7356
          case OPS.fill:                                                         // 7357
            this.fill();                                                         // 7358
            break;                                                               // 7359
          case OPS.eoFill:                                                       // 7360
            this.eoFill();                                                       // 7361
            break;                                                               // 7362
          case OPS.stroke:                                                       // 7363
            this.stroke();                                                       // 7364
            break;                                                               // 7365
          case OPS.fillStroke:                                                   // 7366
            this.fillStroke();                                                   // 7367
            break;                                                               // 7368
          case OPS.eoFillStroke:                                                 // 7369
            this.eoFillStroke();                                                 // 7370
            break;                                                               // 7371
          case OPS.clip:                                                         // 7372
            this.clip('nonzero');                                                // 7373
            break;                                                               // 7374
          case OPS.eoClip:                                                       // 7375
            this.clip('evenodd');                                                // 7376
            break;                                                               // 7377
          case OPS.paintSolidColorImageMask:                                     // 7378
            this.paintSolidColorImageMask();                                     // 7379
            break;                                                               // 7380
          case OPS.paintJpegXObject:                                             // 7381
            this.paintJpegXObject(args[0], args[1], args[2]);                    // 7382
            break;                                                               // 7383
          case OPS.paintImageXObject:                                            // 7384
            this.paintImageXObject(args[0]);                                     // 7385
            break;                                                               // 7386
          case OPS.paintInlineImageXObject:                                      // 7387
            this.paintInlineImageXObject(args[0]);                               // 7388
            break;                                                               // 7389
          case OPS.paintImageMaskXObject:                                        // 7390
            this.paintImageMaskXObject(args[0]);                                 // 7391
            break;                                                               // 7392
          case OPS.paintFormXObjectBegin:                                        // 7393
            this.paintFormXObjectBegin(args[0], args[1]);                        // 7394
            break;                                                               // 7395
          case OPS.paintFormXObjectEnd:                                          // 7396
            this.paintFormXObjectEnd();                                          // 7397
            break;                                                               // 7398
          case OPS.closePath:                                                    // 7399
            this.closePath();                                                    // 7400
            break;                                                               // 7401
          case OPS.closeStroke:                                                  // 7402
            this.closeStroke();                                                  // 7403
            break;                                                               // 7404
          case OPS.closeFillStroke:                                              // 7405
            this.closeFillStroke();                                              // 7406
            break;                                                               // 7407
          case OPS.nextLine:                                                     // 7408
            this.nextLine();                                                     // 7409
            break;                                                               // 7410
          case OPS.transform:                                                    // 7411
            this.transform(args[0], args[1], args[2], args[3],                   // 7412
                           args[4], args[5]);                                    // 7413
            break;                                                               // 7414
          case OPS.constructPath:                                                // 7415
            this.constructPath(args[0], args[1]);                                // 7416
            break;                                                               // 7417
          case OPS.endPath:                                                      // 7418
            this.endPath();                                                      // 7419
            break;                                                               // 7420
          case 92:                                                               // 7421
            this.group(opTree[x].items);                                         // 7422
            break;                                                               // 7423
          default:                                                               // 7424
            warn('Unimplemented method '+ fn);                                   // 7425
            break;                                                               // 7426
        }                                                                        // 7427
      }                                                                          // 7428
    },                                                                           // 7429
                                                                                 // 7430
    setWordSpacing: function SVGGraphics_setWordSpacing(wordSpacing) {           // 7431
      this.current.wordSpacing = wordSpacing;                                    // 7432
    },                                                                           // 7433
                                                                                 // 7434
    setCharSpacing: function SVGGraphics_setCharSpacing(charSpacing) {           // 7435
      this.current.charSpacing = charSpacing;                                    // 7436
    },                                                                           // 7437
                                                                                 // 7438
    nextLine: function SVGGraphics_nextLine() {                                  // 7439
      this.moveText(0, this.current.leading);                                    // 7440
    },                                                                           // 7441
                                                                                 // 7442
    setTextMatrix: function SVGGraphics_setTextMatrix(a, b, c, d, e, f) {        // 7443
      var current = this.current;                                                // 7444
      this.current.textMatrix = this.current.lineMatrix = [a, b, c, d, e, f];    // 7445
                                                                                 // 7446
      this.current.x = this.current.lineX = 0;                                   // 7447
      this.current.y = this.current.lineY = 0;                                   // 7448
                                                                                 // 7449
      current.xcoords = [];                                                      // 7450
      current.tspan = document.createElementNS(NS, 'svg:tspan');                 // 7451
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);     // 7452
      current.tspan.setAttributeNS(null, 'font-size',                            // 7453
                                   pf(current.fontSize) + 'px');                 // 7454
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));                   // 7455
                                                                                 // 7456
      current.txtElement = document.createElementNS(NS, 'svg:text');             // 7457
      current.txtElement.appendChild(current.tspan);                             // 7458
    },                                                                           // 7459
                                                                                 // 7460
    beginText: function SVGGraphics_beginText() {                                // 7461
      this.current.x = this.current.lineX = 0;                                   // 7462
      this.current.y = this.current.lineY = 0;                                   // 7463
      this.current.textMatrix = IDENTITY_MATRIX;                                 // 7464
      this.current.lineMatrix = IDENTITY_MATRIX;                                 // 7465
      this.current.tspan = document.createElementNS(NS, 'svg:tspan');            // 7466
      this.current.txtElement = document.createElementNS(NS, 'svg:text');        // 7467
      this.current.txtgrp = document.createElementNS(NS, 'svg:g');               // 7468
      this.current.xcoords = [];                                                 // 7469
    },                                                                           // 7470
                                                                                 // 7471
    moveText: function SVGGraphics_moveText(x, y) {                              // 7472
      var current = this.current;                                                // 7473
      this.current.x = this.current.lineX += x;                                  // 7474
      this.current.y = this.current.lineY += y;                                  // 7475
                                                                                 // 7476
      current.xcoords = [];                                                      // 7477
      current.tspan = document.createElementNS(NS, 'svg:tspan');                 // 7478
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);     // 7479
      current.tspan.setAttributeNS(null, 'font-size',                            // 7480
                                   pf(current.fontSize) + 'px');                 // 7481
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));                   // 7482
    },                                                                           // 7483
                                                                                 // 7484
    showText: function SVGGraphics_showText(glyphs) {                            // 7485
      var current = this.current;                                                // 7486
      var font = current.font;                                                   // 7487
      var fontSize = current.fontSize;                                           // 7488
                                                                                 // 7489
      if (fontSize === 0) {                                                      // 7490
        return;                                                                  // 7491
      }                                                                          // 7492
                                                                                 // 7493
      var charSpacing = current.charSpacing;                                     // 7494
      var wordSpacing = current.wordSpacing;                                     // 7495
      var fontDirection = current.fontDirection;                                 // 7496
      var textHScale = current.textHScale * fontDirection;                       // 7497
      var glyphsLength = glyphs.length;                                          // 7498
      var vertical = font.vertical;                                              // 7499
      var widthAdvanceScale = fontSize * current.fontMatrix[0];                  // 7500
                                                                                 // 7501
      var x = 0, i;                                                              // 7502
      for (i = 0; i < glyphsLength; ++i) {                                       // 7503
        var glyph = glyphs[i];                                                   // 7504
        if (glyph === null) {                                                    // 7505
          // word break                                                          // 7506
          x += fontDirection * wordSpacing;                                      // 7507
          continue;                                                              // 7508
        } else if (isNum(glyph)) {                                               // 7509
          x += -glyph * fontSize * 0.001;                                        // 7510
          continue;                                                              // 7511
        }                                                                        // 7512
        current.xcoords.push(current.x + x * textHScale);                        // 7513
                                                                                 // 7514
        var width = glyph.width;                                                 // 7515
        var character = glyph.fontChar;                                          // 7516
        var charWidth = width * widthAdvanceScale + charSpacing * fontDirection; // 7517
        x += charWidth;                                                          // 7518
                                                                                 // 7519
        current.tspan.textContent += character;                                  // 7520
      }                                                                          // 7521
      if (vertical) {                                                            // 7522
        current.y -= x * textHScale;                                             // 7523
      } else {                                                                   // 7524
        current.x += x * textHScale;                                             // 7525
      }                                                                          // 7526
                                                                                 // 7527
      current.tspan.setAttributeNS(null, 'x',                                    // 7528
                                   current.xcoords.map(pf).join(' '));           // 7529
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));                   // 7530
      current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);     // 7531
      current.tspan.setAttributeNS(null, 'font-size',                            // 7532
                                   pf(current.fontSize) + 'px');                 // 7533
      if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {                        // 7534
        current.tspan.setAttributeNS(null, 'font-style', current.fontStyle);     // 7535
      }                                                                          // 7536
      if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {                      // 7537
        current.tspan.setAttributeNS(null, 'font-weight', current.fontWeight);   // 7538
      }                                                                          // 7539
      if (current.fillColor !== SVG_DEFAULTS.fillColor) {                        // 7540
        current.tspan.setAttributeNS(null, 'fill', current.fillColor);           // 7541
      }                                                                          // 7542
                                                                                 // 7543
      current.txtElement.setAttributeNS(null, 'transform',                       // 7544
                                        pm(current.textMatrix) +                 // 7545
                                        ' scale(1, -1)' );                       // 7546
      current.txtElement.setAttributeNS(XML_NS, 'xml:space', 'preserve');        // 7547
      current.txtElement.appendChild(current.tspan);                             // 7548
      current.txtgrp.appendChild(current.txtElement);                            // 7549
                                                                                 // 7550
      this.tgrp.appendChild(current.txtElement);                                 // 7551
                                                                                 // 7552
    },                                                                           // 7553
                                                                                 // 7554
    setLeadingMoveText: function SVGGraphics_setLeadingMoveText(x, y) {          // 7555
      this.setLeading(-y);                                                       // 7556
      this.moveText(x, y);                                                       // 7557
    },                                                                           // 7558
                                                                                 // 7559
    addFontStyle: function SVGGraphics_addFontStyle(fontObj) {                   // 7560
      if (!this.cssStyle) {                                                      // 7561
        this.cssStyle = document.createElementNS(NS, 'svg:style');               // 7562
        this.cssStyle.setAttributeNS(null, 'type', 'text/css');                  // 7563
        this.defs.appendChild(this.cssStyle);                                    // 7564
      }                                                                          // 7565
                                                                                 // 7566
      var url = PDFJS.createObjectURL(fontObj.data, fontObj.mimetype);           // 7567
      this.cssStyle.textContent +=                                               // 7568
        '@font-face { font-family: "' + fontObj.loadedName + '";' +              // 7569
        ' src: url(' + url + '); }\n';                                           // 7570
    },                                                                           // 7571
                                                                                 // 7572
    setFont: function SVGGraphics_setFont(details) {                             // 7573
      var current = this.current;                                                // 7574
      var fontObj = this.commonObjs.get(details[0]);                             // 7575
      var size = details[1];                                                     // 7576
      this.current.font = fontObj;                                               // 7577
                                                                                 // 7578
      if (this.embedFonts && fontObj.data &&                                     // 7579
          !this.embeddedFonts[fontObj.loadedName]) {                             // 7580
        this.addFontStyle(fontObj);                                              // 7581
        this.embeddedFonts[fontObj.loadedName] = fontObj;                        // 7582
      }                                                                          // 7583
                                                                                 // 7584
      current.fontMatrix = (fontObj.fontMatrix ?                                 // 7585
                            fontObj.fontMatrix : FONT_IDENTITY_MATRIX);          // 7586
                                                                                 // 7587
      var bold = fontObj.black ? (fontObj.bold ? 'bolder' : 'bold') :            // 7588
                                 (fontObj.bold ? 'bold' : 'normal');             // 7589
      var italic = fontObj.italic ? 'italic' : 'normal';                         // 7590
                                                                                 // 7591
      if (size < 0) {                                                            // 7592
        size = -size;                                                            // 7593
        current.fontDirection = -1;                                              // 7594
      } else {                                                                   // 7595
        current.fontDirection = 1;                                               // 7596
      }                                                                          // 7597
      current.fontSize = size;                                                   // 7598
      current.fontFamily = fontObj.loadedName;                                   // 7599
      current.fontWeight = bold;                                                 // 7600
      current.fontStyle = italic;                                                // 7601
                                                                                 // 7602
      current.tspan = document.createElementNS(NS, 'svg:tspan');                 // 7603
      current.tspan.setAttributeNS(null, 'y', pf(-current.y));                   // 7604
      current.xcoords = [];                                                      // 7605
    },                                                                           // 7606
                                                                                 // 7607
    endText: function SVGGraphics_endText() {                                    // 7608
      if (this.current.pendingClip) {                                            // 7609
        this.cgrp.appendChild(this.tgrp);                                        // 7610
        this.pgrp.appendChild(this.cgrp);                                        // 7611
      } else {                                                                   // 7612
        this.pgrp.appendChild(this.tgrp);                                        // 7613
      }                                                                          // 7614
      this.tgrp = document.createElementNS(NS, 'svg:g');                         // 7615
      this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));     // 7616
    },                                                                           // 7617
                                                                                 // 7618
    // Path properties                                                           // 7619
    setLineWidth: function SVGGraphics_setLineWidth(width) {                     // 7620
      this.current.lineWidth = width;                                            // 7621
    },                                                                           // 7622
    setLineCap: function SVGGraphics_setLineCap(style) {                         // 7623
      this.current.lineCap = LINE_CAP_STYLES[style];                             // 7624
    },                                                                           // 7625
    setLineJoin: function SVGGraphics_setLineJoin(style) {                       // 7626
      this.current.lineJoin = LINE_JOIN_STYLES[style];                           // 7627
    },                                                                           // 7628
    setMiterLimit: function SVGGraphics_setMiterLimit(limit) {                   // 7629
      this.current.miterLimit = limit;                                           // 7630
    },                                                                           // 7631
    setStrokeRGBColor: function SVGGraphics_setStrokeRGBColor(r, g, b) {         // 7632
      var color = Util.makeCssRgb(r, g, b);                                      // 7633
      this.current.strokeColor = color;                                          // 7634
    },                                                                           // 7635
    setFillRGBColor: function SVGGraphics_setFillRGBColor(r, g, b) {             // 7636
      var color = Util.makeCssRgb(r, g, b);                                      // 7637
      this.current.fillColor = color;                                            // 7638
      this.current.tspan = document.createElementNS(NS, 'svg:tspan');            // 7639
      this.current.xcoords = [];                                                 // 7640
    },                                                                           // 7641
    setDash: function SVGGraphics_setDash(dashArray, dashPhase) {                // 7642
      this.current.dashArray = dashArray;                                        // 7643
      this.current.dashPhase = dashPhase;                                        // 7644
    },                                                                           // 7645
                                                                                 // 7646
    constructPath: function SVGGraphics_constructPath(ops, args) {               // 7647
      var current = this.current;                                                // 7648
      var x = current.x, y = current.y;                                          // 7649
      current.path = document.createElementNS(NS, 'svg:path');                   // 7650
      var d = [];                                                                // 7651
      var opLength = ops.length;                                                 // 7652
                                                                                 // 7653
      for (var i = 0, j = 0; i < opLength; i++) {                                // 7654
        switch (ops[i] | 0) {                                                    // 7655
          case OPS.rectangle:                                                    // 7656
            x = args[j++];                                                       // 7657
            y = args[j++];                                                       // 7658
            var width = args[j++];                                               // 7659
            var height = args[j++];                                              // 7660
            var xw = x + width;                                                  // 7661
            var yh = y + height;                                                 // 7662
            d.push('M', pf(x), pf(y), 'L', pf(xw) , pf(y), 'L', pf(xw), pf(yh),  // 7663
                   'L', pf(x), pf(yh), 'Z');                                     // 7664
            break;                                                               // 7665
          case OPS.moveTo:                                                       // 7666
            x = args[j++];                                                       // 7667
            y = args[j++];                                                       // 7668
            d.push('M', pf(x), pf(y));                                           // 7669
            break;                                                               // 7670
          case OPS.lineTo:                                                       // 7671
            x = args[j++];                                                       // 7672
            y = args[j++];                                                       // 7673
            d.push('L', pf(x) , pf(y));                                          // 7674
            break;                                                               // 7675
          case OPS.curveTo:                                                      // 7676
            x = args[j + 4];                                                     // 7677
            y = args[j + 5];                                                     // 7678
            d.push('C', pf(args[j]), pf(args[j + 1]), pf(args[j + 2]),           // 7679
                   pf(args[j + 3]), pf(x), pf(y));                               // 7680
            j += 6;                                                              // 7681
            break;                                                               // 7682
          case OPS.curveTo2:                                                     // 7683
            x = args[j + 2];                                                     // 7684
            y = args[j + 3];                                                     // 7685
            d.push('C', pf(x), pf(y), pf(args[j]), pf(args[j + 1]),              // 7686
                   pf(args[j + 2]), pf(args[j + 3]));                            // 7687
            j += 4;                                                              // 7688
            break;                                                               // 7689
          case OPS.curveTo3:                                                     // 7690
            x = args[j + 2];                                                     // 7691
            y = args[j + 3];                                                     // 7692
            d.push('C', pf(args[j]), pf(args[j + 1]), pf(x), pf(y),              // 7693
                   pf(x), pf(y));                                                // 7694
            j += 4;                                                              // 7695
            break;                                                               // 7696
          case OPS.closePath:                                                    // 7697
            d.push('Z');                                                         // 7698
            break;                                                               // 7699
        }                                                                        // 7700
      }                                                                          // 7701
      current.path.setAttributeNS(null, 'd', d.join(' '));                       // 7702
      current.path.setAttributeNS(null, 'stroke-miterlimit',                     // 7703
                                  pf(current.miterLimit));                       // 7704
      current.path.setAttributeNS(null, 'stroke-linecap', current.lineCap);      // 7705
      current.path.setAttributeNS(null, 'stroke-linejoin', current.lineJoin);    // 7706
      current.path.setAttributeNS(null, 'stroke-width',                          // 7707
                                  pf(current.lineWidth) + 'px');                 // 7708
      current.path.setAttributeNS(null, 'stroke-dasharray',                      // 7709
                                  current.dashArray.map(pf).join(' '));          // 7710
      current.path.setAttributeNS(null, 'stroke-dashoffset',                     // 7711
                                  pf(current.dashPhase) + 'px');                 // 7712
      current.path.setAttributeNS(null, 'fill', 'none');                         // 7713
                                                                                 // 7714
      this.tgrp.appendChild(current.path);                                       // 7715
      if (current.pendingClip) {                                                 // 7716
        this.cgrp.appendChild(this.tgrp);                                        // 7717
        this.pgrp.appendChild(this.cgrp);                                        // 7718
      } else {                                                                   // 7719
        this.pgrp.appendChild(this.tgrp);                                        // 7720
      }                                                                          // 7721
      // Saving a reference in current.element so that it can be addressed       // 7722
      // in 'fill' and 'stroke'                                                  // 7723
      current.element = current.path;                                            // 7724
      current.setCurrentPoint(x, y);                                             // 7725
    },                                                                           // 7726
                                                                                 // 7727
    endPath: function SVGGraphics_endPath() {                                    // 7728
      var current = this.current;                                                // 7729
      if (current.pendingClip) {                                                 // 7730
        this.cgrp.appendChild(this.tgrp);                                        // 7731
        this.pgrp.appendChild(this.cgrp);                                        // 7732
      } else {                                                                   // 7733
        this.pgrp.appendChild(this.tgrp);                                        // 7734
      }                                                                          // 7735
      this.tgrp = document.createElementNS(NS, 'svg:g');                         // 7736
      this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));     // 7737
    },                                                                           // 7738
                                                                                 // 7739
    clip: function SVGGraphics_clip(type) {                                      // 7740
      var current = this.current;                                                // 7741
      // Add current path to clipping path                                       // 7742
      current.clipId = 'clippath' + clipCount;                                   // 7743
      clipCount++;                                                               // 7744
      this.clippath = document.createElementNS(NS, 'svg:clipPath');              // 7745
      this.clippath.setAttributeNS(null, 'id', current.clipId);                  // 7746
      var clipElement = current.element.cloneNode();                             // 7747
      if (type === 'evenodd') {                                                  // 7748
        clipElement.setAttributeNS(null, 'clip-rule', 'evenodd');                // 7749
      } else {                                                                   // 7750
        clipElement.setAttributeNS(null, 'clip-rule', 'nonzero');                // 7751
      }                                                                          // 7752
      this.clippath.setAttributeNS(null, 'transform', pm(this.transformMatrix)); // 7753
      this.clippath.appendChild(clipElement);                                    // 7754
      this.defs.appendChild(this.clippath);                                      // 7755
                                                                                 // 7756
      // Create a new group with that attribute                                  // 7757
      current.pendingClip = true;                                                // 7758
      this.cgrp = document.createElementNS(NS, 'svg:g');                         // 7759
      this.cgrp.setAttributeNS(null, 'clip-path',                                // 7760
                               'url(#' + current.clipId + ')');                  // 7761
      this.pgrp.appendChild(this.cgrp);                                          // 7762
    },                                                                           // 7763
                                                                                 // 7764
    closePath: function SVGGraphics_closePath() {                                // 7765
      var current = this.current;                                                // 7766
      var d = current.path.getAttributeNS(null, 'd');                            // 7767
      d += 'Z';                                                                  // 7768
      current.path.setAttributeNS(null, 'd', d);                                 // 7769
    },                                                                           // 7770
                                                                                 // 7771
    setLeading: function SVGGraphics_setLeading(leading) {                       // 7772
      this.current.leading = -leading;                                           // 7773
    },                                                                           // 7774
                                                                                 // 7775
    setTextRise: function SVGGraphics_setTextRise(textRise) {                    // 7776
      this.current.textRise = textRise;                                          // 7777
    },                                                                           // 7778
                                                                                 // 7779
    setHScale: function SVGGraphics_setHScale(scale) {                           // 7780
      this.current.textHScale = scale / 100;                                     // 7781
    },                                                                           // 7782
                                                                                 // 7783
    setGState: function SVGGraphics_setGState(states) {                          // 7784
      for (var i = 0, ii = states.length; i < ii; i++) {                         // 7785
        var state = states[i];                                                   // 7786
        var key = state[0];                                                      // 7787
        var value = state[1];                                                    // 7788
                                                                                 // 7789
        switch (key) {                                                           // 7790
          case 'LW':                                                             // 7791
            this.setLineWidth(value);                                            // 7792
            break;                                                               // 7793
          case 'LC':                                                             // 7794
            this.setLineCap(value);                                              // 7795
            break;                                                               // 7796
          case 'LJ':                                                             // 7797
            this.setLineJoin(value);                                             // 7798
            break;                                                               // 7799
          case 'ML':                                                             // 7800
            this.setMiterLimit(value);                                           // 7801
            break;                                                               // 7802
          case 'D':                                                              // 7803
            this.setDash(value[0], value[1]);                                    // 7804
            break;                                                               // 7805
          case 'RI':                                                             // 7806
            break;                                                               // 7807
          case 'FL':                                                             // 7808
            break;                                                               // 7809
          case 'Font':                                                           // 7810
            this.setFont(value);                                                 // 7811
            break;                                                               // 7812
          case 'CA':                                                             // 7813
            break;                                                               // 7814
          case 'ca':                                                             // 7815
            break;                                                               // 7816
          case 'BM':                                                             // 7817
            break;                                                               // 7818
          case 'SMask':                                                          // 7819
            break;                                                               // 7820
        }                                                                        // 7821
      }                                                                          // 7822
    },                                                                           // 7823
                                                                                 // 7824
    fill: function SVGGraphics_fill() {                                          // 7825
      var current = this.current;                                                // 7826
      current.element.setAttributeNS(null, 'fill', current.fillColor);           // 7827
    },                                                                           // 7828
                                                                                 // 7829
    stroke: function SVGGraphics_stroke() {                                      // 7830
      var current = this.current;                                                // 7831
      current.element.setAttributeNS(null, 'stroke', current.strokeColor);       // 7832
      current.element.setAttributeNS(null, 'fill', 'none');                      // 7833
    },                                                                           // 7834
                                                                                 // 7835
    eoFill: function SVGGraphics_eoFill() {                                      // 7836
      var current = this.current;                                                // 7837
      current.element.setAttributeNS(null, 'fill', current.fillColor);           // 7838
      current.element.setAttributeNS(null, 'fill-rule', 'evenodd');              // 7839
    },                                                                           // 7840
                                                                                 // 7841
    fillStroke: function SVGGraphics_fillStroke() {                              // 7842
      // Order is important since stroke wants fill to be none.                  // 7843
      // First stroke, then if fill needed, it will be overwritten.              // 7844
      this.stroke();                                                             // 7845
      this.fill();                                                               // 7846
    },                                                                           // 7847
                                                                                 // 7848
    eoFillStroke: function SVGGraphics_eoFillStroke() {                          // 7849
      this.current.element.setAttributeNS(null, 'fill-rule', 'evenodd');         // 7850
      this.fillStroke();                                                         // 7851
    },                                                                           // 7852
                                                                                 // 7853
    closeStroke: function SVGGraphics_closeStroke() {                            // 7854
      this.closePath();                                                          // 7855
      this.stroke();                                                             // 7856
    },                                                                           // 7857
                                                                                 // 7858
    closeFillStroke: function SVGGraphics_closeFillStroke() {                    // 7859
      this.closePath();                                                          // 7860
      this.fillStroke();                                                         // 7861
    },                                                                           // 7862
                                                                                 // 7863
    paintSolidColorImageMask:                                                    // 7864
        function SVGGraphics_paintSolidColorImageMask() {                        // 7865
      var current = this.current;                                                // 7866
      var rect = document.createElementNS(NS, 'svg:rect');                       // 7867
      rect.setAttributeNS(null, 'x', '0');                                       // 7868
      rect.setAttributeNS(null, 'y', '0');                                       // 7869
      rect.setAttributeNS(null, 'width', '1px');                                 // 7870
      rect.setAttributeNS(null, 'height', '1px');                                // 7871
      rect.setAttributeNS(null, 'fill', current.fillColor);                      // 7872
      this.tgrp.appendChild(rect);                                               // 7873
    },                                                                           // 7874
                                                                                 // 7875
    paintJpegXObject: function SVGGraphics_paintJpegXObject(objId, w, h) {       // 7876
      var current = this.current;                                                // 7877
      var imgObj = this.objs.get(objId);                                         // 7878
      var imgEl = document.createElementNS(NS, 'svg:image');                     // 7879
      imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgObj.src);                  // 7880
      imgEl.setAttributeNS(null, 'width', imgObj.width + 'px');                  // 7881
      imgEl.setAttributeNS(null, 'height', imgObj.height + 'px');                // 7882
      imgEl.setAttributeNS(null, 'x', '0');                                      // 7883
      imgEl.setAttributeNS(null, 'y', pf(-h));                                   // 7884
      imgEl.setAttributeNS(null, 'transform',                                    // 7885
                           'scale(' + pf(1 / w) + ' ' + pf(-1 / h) + ')');       // 7886
                                                                                 // 7887
      this.tgrp.appendChild(imgEl);                                              // 7888
      if (current.pendingClip) {                                                 // 7889
        this.cgrp.appendChild(this.tgrp);                                        // 7890
        this.pgrp.appendChild(this.cgrp);                                        // 7891
      } else {                                                                   // 7892
        this.pgrp.appendChild(this.tgrp);                                        // 7893
      }                                                                          // 7894
    },                                                                           // 7895
                                                                                 // 7896
    paintImageXObject: function SVGGraphics_paintImageXObject(objId) {           // 7897
      var imgData = this.objs.get(objId);                                        // 7898
      if (!imgData) {                                                            // 7899
        warn('Dependent image isn\'t ready yet');                                // 7900
        return;                                                                  // 7901
      }                                                                          // 7902
      this.paintInlineImageXObject(imgData);                                     // 7903
    },                                                                           // 7904
                                                                                 // 7905
    paintInlineImageXObject:                                                     // 7906
        function SVGGraphics_paintInlineImageXObject(imgData, mask) {            // 7907
      var current = this.current;                                                // 7908
      var width = imgData.width;                                                 // 7909
      var height = imgData.height;                                               // 7910
                                                                                 // 7911
      var imgSrc = convertImgDataToPng(imgData);                                 // 7912
      var cliprect = document.createElementNS(NS, 'svg:rect');                   // 7913
      cliprect.setAttributeNS(null, 'x', '0');                                   // 7914
      cliprect.setAttributeNS(null, 'y', '0');                                   // 7915
      cliprect.setAttributeNS(null, 'width', pf(width));                         // 7916
      cliprect.setAttributeNS(null, 'height', pf(height));                       // 7917
      current.element = cliprect;                                                // 7918
      this.clip('nonzero');                                                      // 7919
      var imgEl = document.createElementNS(NS, 'svg:image');                     // 7920
      imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgSrc);                      // 7921
      imgEl.setAttributeNS(null, 'x', '0');                                      // 7922
      imgEl.setAttributeNS(null, 'y', pf(-height));                              // 7923
      imgEl.setAttributeNS(null, 'width', pf(width) + 'px');                     // 7924
      imgEl.setAttributeNS(null, 'height', pf(height) + 'px');                   // 7925
      imgEl.setAttributeNS(null, 'transform',                                    // 7926
                           'scale(' + pf(1 / width) + ' ' +                      // 7927
                           pf(-1 / height) + ')');                               // 7928
      if (mask) {                                                                // 7929
        mask.appendChild(imgEl);                                                 // 7930
      } else {                                                                   // 7931
        this.tgrp.appendChild(imgEl);                                            // 7932
      }                                                                          // 7933
      if (current.pendingClip) {                                                 // 7934
        this.cgrp.appendChild(this.tgrp);                                        // 7935
        this.pgrp.appendChild(this.cgrp);                                        // 7936
      } else {                                                                   // 7937
        this.pgrp.appendChild(this.tgrp);                                        // 7938
      }                                                                          // 7939
    },                                                                           // 7940
                                                                                 // 7941
    paintImageMaskXObject:                                                       // 7942
        function SVGGraphics_paintImageMaskXObject(imgData) {                    // 7943
      var current = this.current;                                                // 7944
      var width = imgData.width;                                                 // 7945
      var height = imgData.height;                                               // 7946
      var fillColor = current.fillColor;                                         // 7947
                                                                                 // 7948
      current.maskId = 'mask' + maskCount++;                                     // 7949
      var mask = document.createElementNS(NS, 'svg:mask');                       // 7950
      mask.setAttributeNS(null, 'id', current.maskId);                           // 7951
                                                                                 // 7952
      var rect = document.createElementNS(NS, 'svg:rect');                       // 7953
      rect.setAttributeNS(null, 'x', '0');                                       // 7954
      rect.setAttributeNS(null, 'y', '0');                                       // 7955
      rect.setAttributeNS(null, 'width', pf(width));                             // 7956
      rect.setAttributeNS(null, 'height', pf(height));                           // 7957
      rect.setAttributeNS(null, 'fill', fillColor);                              // 7958
      rect.setAttributeNS(null, 'mask', 'url(#' + current.maskId +')');          // 7959
      this.defs.appendChild(mask);                                               // 7960
      this.tgrp.appendChild(rect);                                               // 7961
                                                                                 // 7962
      this.paintInlineImageXObject(imgData, mask);                               // 7963
    },                                                                           // 7964
                                                                                 // 7965
    paintFormXObjectBegin:                                                       // 7966
        function SVGGraphics_paintFormXObjectBegin(matrix, bbox) {               // 7967
      this.save();                                                               // 7968
                                                                                 // 7969
      if (isArray(matrix) && matrix.length === 6) {                              // 7970
        this.transform(matrix[0], matrix[1], matrix[2],                          // 7971
                       matrix[3], matrix[4], matrix[5]);                         // 7972
      }                                                                          // 7973
                                                                                 // 7974
      if (isArray(bbox) && bbox.length === 4) {                                  // 7975
        var width = bbox[2] - bbox[0];                                           // 7976
        var height = bbox[3] - bbox[1];                                          // 7977
                                                                                 // 7978
        var cliprect = document.createElementNS(NS, 'svg:rect');                 // 7979
        cliprect.setAttributeNS(null, 'x', bbox[0]);                             // 7980
        cliprect.setAttributeNS(null, 'y', bbox[1]);                             // 7981
        cliprect.setAttributeNS(null, 'width', pf(width));                       // 7982
        cliprect.setAttributeNS(null, 'height', pf(height));                     // 7983
        this.current.element = cliprect;                                         // 7984
        this.clip('nonzero');                                                    // 7985
        this.endPath();                                                          // 7986
      }                                                                          // 7987
    },                                                                           // 7988
                                                                                 // 7989
    paintFormXObjectEnd:                                                         // 7990
        function SVGGraphics_paintFormXObjectEnd() {                             // 7991
      this.restore();                                                            // 7992
    }                                                                            // 7993
  };                                                                             // 7994
  return SVGGraphics;                                                            // 7995
})();                                                                            // 7996
                                                                                 // 7997
PDFJS.SVGGraphics = SVGGraphics;                                                 // 7998
                                                                                 // 7999
                                                                                 // 8000
}).call((typeof window === 'undefined') ? this : window);                        // 8001
                                                                                 // 8002
if (!PDFJS.workerSrc && typeof document !== 'undefined') {                       // 8003
  // workerSrc is not set -- using last script url to define default location    // 8004
  PDFJS.workerSrc = (function () {                                               // 8005
    'use strict';                                                                // 8006
    var scriptTagContainer = document.body ||                                    // 8007
                             document.getElementsByTagName('head')[0];           // 8008
    var pdfjsSrc = scriptTagContainer.lastChild.src;                             // 8009
    return pdfjsSrc && pdfjsSrc.replace(/\.js$/i, '.worker.js');                 // 8010
  })();                                                                          // 8011
}                                                                                // 8012
                                                                                 // 8013
                                                                                 // 8014
                                                                                 // 8015
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/pascoual:pdfjs/web/compatibility.js                                  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */ // 1
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */              // 2
/* Copyright 2012 Mozilla Foundation                                             // 3
 *                                                                               // 4
 * Licensed under the Apache License, Version 2.0 (the "License");               // 5
 * you may not use this file except in compliance with the License.              // 6
 * You may obtain a copy of the License at                                       // 7
 *                                                                               // 8
 *     http://www.apache.org/licenses/LICENSE-2.0                                // 9
 *                                                                               // 10
 * Unless required by applicable law or agreed to in writing, software           // 11
 * distributed under the License is distributed on an "AS IS" BASIS,             // 12
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.      // 13
 * See the License for the specific language governing permissions and           // 14
 * limitations under the License.                                                // 15
 */                                                                              // 16
/* globals VBArray, PDFJS */                                                     // 17
                                                                                 // 18
'use strict';                                                                    // 19
                                                                                 // 20
// Initializing PDFJS global object here, it case if we need to change/disable   // 21
// some PDF.js features, e.g. range requests                                     // 22
if (typeof PDFJS === 'undefined') {                                              // 23
  (typeof window !== 'undefined' ? window : this).PDFJS = {};                    // 24
}                                                                                // 25
                                                                                 // 26
// Checking if the typed arrays are supported                                    // 27
// Support: iOS<6.0 (subarray), IE<10, Android<4.0                               // 28
(function checkTypedArrayCompatibility() {                                       // 29
  if (typeof Uint8Array !== 'undefined') {                                       // 30
    // Support: iOS<6.0                                                          // 31
    if (typeof Uint8Array.prototype.subarray === 'undefined') {                  // 32
        Uint8Array.prototype.subarray = function subarray(start, end) {          // 33
          return new Uint8Array(this.slice(start, end));                         // 34
        };                                                                       // 35
        Float32Array.prototype.subarray = function subarray(start, end) {        // 36
          return new Float32Array(this.slice(start, end));                       // 37
        };                                                                       // 38
    }                                                                            // 39
                                                                                 // 40
    // Support: Android<4.1                                                      // 41
    if (typeof Float64Array === 'undefined') {                                   // 42
      window.Float64Array = Float32Array;                                        // 43
    }                                                                            // 44
    return;                                                                      // 45
  }                                                                              // 46
                                                                                 // 47
  function subarray(start, end) {                                                // 48
    return new TypedArray(this.slice(start, end));                               // 49
  }                                                                              // 50
                                                                                 // 51
  function setArrayOffset(array, offset) {                                       // 52
    if (arguments.length < 2) {                                                  // 53
      offset = 0;                                                                // 54
    }                                                                            // 55
    for (var i = 0, n = array.length; i < n; ++i, ++offset) {                    // 56
      this[offset] = array[i] & 0xFF;                                            // 57
    }                                                                            // 58
  }                                                                              // 59
                                                                                 // 60
  function TypedArray(arg1) {                                                    // 61
    var result, i, n;                                                            // 62
    if (typeof arg1 === 'number') {                                              // 63
      result = [];                                                               // 64
      for (i = 0; i < arg1; ++i) {                                               // 65
        result[i] = 0;                                                           // 66
      }                                                                          // 67
    } else if ('slice' in arg1) {                                                // 68
      result = arg1.slice(0);                                                    // 69
    } else {                                                                     // 70
      result = [];                                                               // 71
      for (i = 0, n = arg1.length; i < n; ++i) {                                 // 72
        result[i] = arg1[i];                                                     // 73
      }                                                                          // 74
    }                                                                            // 75
                                                                                 // 76
    result.subarray = subarray;                                                  // 77
    result.buffer = result;                                                      // 78
    result.byteLength = result.length;                                           // 79
    result.set = setArrayOffset;                                                 // 80
                                                                                 // 81
    if (typeof arg1 === 'object' && arg1.buffer) {                               // 82
      result.buffer = arg1.buffer;                                               // 83
    }                                                                            // 84
    return result;                                                               // 85
  }                                                                              // 86
                                                                                 // 87
  window.Uint8Array = TypedArray;                                                // 88
  window.Int8Array = TypedArray;                                                 // 89
                                                                                 // 90
  // we don't need support for set, byteLength for 32-bit array                  // 91
  // so we can use the TypedArray as well                                        // 92
  window.Uint32Array = TypedArray;                                               // 93
  window.Int32Array = TypedArray;                                                // 94
  window.Uint16Array = TypedArray;                                               // 95
  window.Float32Array = TypedArray;                                              // 96
  window.Float64Array = TypedArray;                                              // 97
})();                                                                            // 98
                                                                                 // 99
// URL = URL || webkitURL                                                        // 100
// Support: Safari<7, Android 4.2+                                               // 101
(function normalizeURLObject() {                                                 // 102
  if (!window.URL) {                                                             // 103
    window.URL = window.webkitURL;                                               // 104
  }                                                                              // 105
})();                                                                            // 106
                                                                                 // 107
// Object.defineProperty()?                                                      // 108
// Support: Android<4.0, Safari<5.1                                              // 109
(function checkObjectDefinePropertyCompatibility() {                             // 110
  if (typeof Object.defineProperty !== 'undefined') {                            // 111
    var definePropertyPossible = true;                                           // 112
    try {                                                                        // 113
      // some browsers (e.g. safari) cannot use defineProperty() on DOM objects  // 114
      // and thus the native version is not sufficient                           // 115
      Object.defineProperty(new Image(), 'id', { value: 'test' });               // 116
      // ... another test for android gb browser for non-DOM objects             // 117
      var Test = function Test() {};                                             // 118
      Test.prototype = { get id() { } };                                         // 119
      Object.defineProperty(new Test(), 'id',                                    // 120
        { value: '', configurable: true, enumerable: true, writable: false });   // 121
    } catch (e) {                                                                // 122
      definePropertyPossible = false;                                            // 123
    }                                                                            // 124
    if (definePropertyPossible) {                                                // 125
      return;                                                                    // 126
    }                                                                            // 127
  }                                                                              // 128
                                                                                 // 129
  Object.defineProperty = function objectDefineProperty(obj, name, def) {        // 130
    delete obj[name];                                                            // 131
    if ('get' in def) {                                                          // 132
      obj.__defineGetter__(name, def['get']);                                    // 133
    }                                                                            // 134
    if ('set' in def) {                                                          // 135
      obj.__defineSetter__(name, def['set']);                                    // 136
    }                                                                            // 137
    if ('value' in def) {                                                        // 138
      obj.__defineSetter__(name, function objectDefinePropertySetter(value) {    // 139
        this.__defineGetter__(name, function objectDefinePropertyGetter() {      // 140
          return value;                                                          // 141
        });                                                                      // 142
        return value;                                                            // 143
      });                                                                        // 144
      obj[name] = def.value;                                                     // 145
    }                                                                            // 146
  };                                                                             // 147
})();                                                                            // 148
                                                                                 // 149
                                                                                 // 150
// No XMLHttpRequest#response?                                                   // 151
// Support: IE<11, Android <4.0                                                  // 152
(function checkXMLHttpRequestResponseCompatibility() {                           // 153
  var xhrPrototype = XMLHttpRequest.prototype;                                   // 154
  var xhr = new XMLHttpRequest();                                                // 155
  if (!('overrideMimeType' in xhr)) {                                            // 156
    // IE10 might have response, but not overrideMimeType                        // 157
    // Support: IE10                                                             // 158
    Object.defineProperty(xhrPrototype, 'overrideMimeType', {                    // 159
      value: function xmlHttpRequestOverrideMimeType(mimeType) {}                // 160
    });                                                                          // 161
  }                                                                              // 162
  if ('responseType' in xhr) {                                                   // 163
    return;                                                                      // 164
  }                                                                              // 165
                                                                                 // 166
  // The worker will be using XHR, so we can save time and disable worker.       // 167
  PDFJS.disableWorker = true;                                                    // 168
                                                                                 // 169
  Object.defineProperty(xhrPrototype, 'responseType', {                          // 170
    get: function xmlHttpRequestGetResponseType() {                              // 171
      return this._responseType || 'text';                                       // 172
    },                                                                           // 173
    set: function xmlHttpRequestSetResponseType(value) {                         // 174
      if (value === 'text' || value === 'arraybuffer') {                         // 175
        this._responseType = value;                                              // 176
        if (value === 'arraybuffer' &&                                           // 177
            typeof this.overrideMimeType === 'function') {                       // 178
          this.overrideMimeType('text/plain; charset=x-user-defined');           // 179
        }                                                                        // 180
      }                                                                          // 181
    }                                                                            // 182
  });                                                                            // 183
                                                                                 // 184
  // Support: IE9                                                                // 185
  if (typeof VBArray !== 'undefined') {                                          // 186
    Object.defineProperty(xhrPrototype, 'response', {                            // 187
      get: function xmlHttpRequestResponseGet() {                                // 188
        if (this.responseType === 'arraybuffer') {                               // 189
          return new Uint8Array(new VBArray(this.responseBody).toArray());       // 190
        } else {                                                                 // 191
          return this.responseText;                                              // 192
        }                                                                        // 193
      }                                                                          // 194
    });                                                                          // 195
    return;                                                                      // 196
  }                                                                              // 197
                                                                                 // 198
  Object.defineProperty(xhrPrototype, 'response', {                              // 199
    get: function xmlHttpRequestResponseGet() {                                  // 200
      if (this.responseType !== 'arraybuffer') {                                 // 201
        return this.responseText;                                                // 202
      }                                                                          // 203
      var text = this.responseText;                                              // 204
      var i, n = text.length;                                                    // 205
      var result = new Uint8Array(n);                                            // 206
      for (i = 0; i < n; ++i) {                                                  // 207
        result[i] = text.charCodeAt(i) & 0xFF;                                   // 208
      }                                                                          // 209
      return result.buffer;                                                      // 210
    }                                                                            // 211
  });                                                                            // 212
})();                                                                            // 213
                                                                                 // 214
// window.btoa (base64 encode function) ?                                        // 215
// Support: IE<10                                                                // 216
(function checkWindowBtoaCompatibility() {                                       // 217
  if ('btoa' in window) {                                                        // 218
    return;                                                                      // 219
  }                                                                              // 220
                                                                                 // 221
  var digits =                                                                   // 222
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';         // 223
                                                                                 // 224
  window.btoa = function windowBtoa(chars) {                                     // 225
    var buffer = '';                                                             // 226
    var i, n;                                                                    // 227
    for (i = 0, n = chars.length; i < n; i += 3) {                               // 228
      var b1 = chars.charCodeAt(i) & 0xFF;                                       // 229
      var b2 = chars.charCodeAt(i + 1) & 0xFF;                                   // 230
      var b3 = chars.charCodeAt(i + 2) & 0xFF;                                   // 231
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);                        // 232
      var d3 = i + 1 < n ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;                   // 233
      var d4 = i + 2 < n ? (b3 & 0x3F) : 64;                                     // 234
      buffer += (digits.charAt(d1) + digits.charAt(d2) +                         // 235
                 digits.charAt(d3) + digits.charAt(d4));                         // 236
    }                                                                            // 237
    return buffer;                                                               // 238
  };                                                                             // 239
})();                                                                            // 240
                                                                                 // 241
// window.atob (base64 encode function)?                                         // 242
// Support: IE<10                                                                // 243
(function checkWindowAtobCompatibility() {                                       // 244
  if ('atob' in window) {                                                        // 245
    return;                                                                      // 246
  }                                                                              // 247
                                                                                 // 248
  // https://github.com/davidchambers/Base64.js                                  // 249
  var digits =                                                                   // 250
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';         // 251
  window.atob = function (input) {                                               // 252
    input = input.replace(/=+$/, '');                                            // 253
    if (input.length % 4 === 1) {                                                // 254
      throw new Error('bad atob input');                                         // 255
    }                                                                            // 256
    for (                                                                        // 257
      // initialize result and counters                                          // 258
      var bc = 0, bs, buffer, idx = 0, output = '';                              // 259
      // get next character                                                      // 260
      buffer = input.charAt(idx++);                                              // 261
      // character found in table?                                               // 262
      // initialize bit storage and add its ascii value                          // 263
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,                       // 264
        // and if not first of each 4 characters,                                // 265
        // convert the first 8 bits to one ascii character                       // 266
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0 // 267
    ) {                                                                          // 268
      // try to find character in table (0-63, not found => -1)                  // 269
      buffer = digits.indexOf(buffer);                                           // 270
    }                                                                            // 271
    return output;                                                               // 272
  };                                                                             // 273
})();                                                                            // 274
                                                                                 // 275
// Function.prototype.bind?                                                      // 276
// Support: Android<4.0, iOS<6.0                                                 // 277
(function checkFunctionPrototypeBindCompatibility() {                            // 278
  if (typeof Function.prototype.bind !== 'undefined') {                          // 279
    return;                                                                      // 280
  }                                                                              // 281
                                                                                 // 282
  Function.prototype.bind = function functionPrototypeBind(obj) {                // 283
    var fn = this, headArgs = Array.prototype.slice.call(arguments, 1);          // 284
    var bound = function functionPrototypeBindBound() {                          // 285
      var args = headArgs.concat(Array.prototype.slice.call(arguments));         // 286
      return fn.apply(obj, args);                                                // 287
    };                                                                           // 288
    return bound;                                                                // 289
  };                                                                             // 290
})();                                                                            // 291
                                                                                 // 292
// HTMLElement dataset property                                                  // 293
// Support: IE<11, Safari<5.1, Android<4.0                                       // 294
(function checkDatasetProperty() {                                               // 295
  var div = document.createElement('div');                                       // 296
  if ('dataset' in div) {                                                        // 297
    return; // dataset property exists                                           // 298
  }                                                                              // 299
                                                                                 // 300
  Object.defineProperty(HTMLElement.prototype, 'dataset', {                      // 301
    get: function() {                                                            // 302
      if (this._dataset) {                                                       // 303
        return this._dataset;                                                    // 304
      }                                                                          // 305
                                                                                 // 306
      var dataset = {};                                                          // 307
      for (var j = 0, jj = this.attributes.length; j < jj; j++) {                // 308
        var attribute = this.attributes[j];                                      // 309
        if (attribute.name.substring(0, 5) !== 'data-') {                        // 310
          continue;                                                              // 311
        }                                                                        // 312
        var key = attribute.name.substring(5).replace(/\-([a-z])/g,              // 313
          function(all, ch) {                                                    // 314
            return ch.toUpperCase();                                             // 315
          });                                                                    // 316
        dataset[key] = attribute.value;                                          // 317
      }                                                                          // 318
                                                                                 // 319
      Object.defineProperty(this, '_dataset', {                                  // 320
        value: dataset,                                                          // 321
        writable: false,                                                         // 322
        enumerable: false                                                        // 323
      });                                                                        // 324
      return dataset;                                                            // 325
    },                                                                           // 326
    enumerable: true                                                             // 327
  });                                                                            // 328
})();                                                                            // 329
                                                                                 // 330
// HTMLElement classList property                                                // 331
// Support: IE<10, Android<4.0, iOS<5.0                                          // 332
(function checkClassListProperty() {                                             // 333
  var div = document.createElement('div');                                       // 334
  if ('classList' in div) {                                                      // 335
    return; // classList property exists                                         // 336
  }                                                                              // 337
                                                                                 // 338
  function changeList(element, itemName, add, remove) {                          // 339
    var s = element.className || '';                                             // 340
    var list = s.split(/\s+/g);                                                  // 341
    if (list[0] === '') {                                                        // 342
      list.shift();                                                              // 343
    }                                                                            // 344
    var index = list.indexOf(itemName);                                          // 345
    if (index < 0 && add) {                                                      // 346
      list.push(itemName);                                                       // 347
    }                                                                            // 348
    if (index >= 0 && remove) {                                                  // 349
      list.splice(index, 1);                                                     // 350
    }                                                                            // 351
    element.className = list.join(' ');                                          // 352
    return (index >= 0);                                                         // 353
  }                                                                              // 354
                                                                                 // 355
  var classListPrototype = {                                                     // 356
    add: function(name) {                                                        // 357
      changeList(this.element, name, true, false);                               // 358
    },                                                                           // 359
    contains: function(name) {                                                   // 360
      return changeList(this.element, name, false, false);                       // 361
    },                                                                           // 362
    remove: function(name) {                                                     // 363
      changeList(this.element, name, false, true);                               // 364
    },                                                                           // 365
    toggle: function(name) {                                                     // 366
      changeList(this.element, name, true, true);                                // 367
    }                                                                            // 368
  };                                                                             // 369
                                                                                 // 370
  Object.defineProperty(HTMLElement.prototype, 'classList', {                    // 371
    get: function() {                                                            // 372
      if (this._classList) {                                                     // 373
        return this._classList;                                                  // 374
      }                                                                          // 375
                                                                                 // 376
      var classList = Object.create(classListPrototype, {                        // 377
        element: {                                                               // 378
          value: this,                                                           // 379
          writable: false,                                                       // 380
          enumerable: true                                                       // 381
        }                                                                        // 382
      });                                                                        // 383
      Object.defineProperty(this, '_classList', {                                // 384
        value: classList,                                                        // 385
        writable: false,                                                         // 386
        enumerable: false                                                        // 387
      });                                                                        // 388
      return classList;                                                          // 389
    },                                                                           // 390
    enumerable: true                                                             // 391
  });                                                                            // 392
})();                                                                            // 393
                                                                                 // 394
// Check console compatibility                                                   // 395
// In older IE versions the console object is not available                      // 396
// unless console is open.                                                       // 397
// Support: IE<10                                                                // 398
(function checkConsoleCompatibility() {                                          // 399
  if (!('console' in window)) {                                                  // 400
    window.console = {                                                           // 401
      log: function() {},                                                        // 402
      error: function() {},                                                      // 403
      warn: function() {}                                                        // 404
    };                                                                           // 405
  } else if (!('bind' in console.log)) {                                         // 406
    // native functions in IE9 might not have bind                               // 407
    console.log = (function(fn) {                                                // 408
      return function(msg) { return fn(msg); };                                  // 409
    })(console.log);                                                             // 410
    console.error = (function(fn) {                                              // 411
      return function(msg) { return fn(msg); };                                  // 412
    })(console.error);                                                           // 413
    console.warn = (function(fn) {                                               // 414
      return function(msg) { return fn(msg); };                                  // 415
    })(console.warn);                                                            // 416
  }                                                                              // 417
})();                                                                            // 418
                                                                                 // 419
// Check onclick compatibility in Opera                                          // 420
// Support: Opera<15                                                             // 421
(function checkOnClickCompatibility() {                                          // 422
  // workaround for reported Opera bug DSK-354448:                               // 423
  // onclick fires on disabled buttons with opaque content                       // 424
  function ignoreIfTargetDisabled(event) {                                       // 425
    if (isDisabled(event.target)) {                                              // 426
      event.stopPropagation();                                                   // 427
    }                                                                            // 428
  }                                                                              // 429
  function isDisabled(node) {                                                    // 430
    return node.disabled || (node.parentNode && isDisabled(node.parentNode));    // 431
  }                                                                              // 432
  if (navigator.userAgent.indexOf('Opera') !== -1) {                             // 433
    // use browser detection since we cannot feature-check this bug              // 434
    document.addEventListener('click', ignoreIfTargetDisabled, true);            // 435
  }                                                                              // 436
})();                                                                            // 437
                                                                                 // 438
// Checks if possible to use URL.createObjectURL()                               // 439
// Support: IE                                                                   // 440
(function checkOnBlobSupport() {                                                 // 441
  // sometimes IE loosing the data created with createObjectURL(), see #3977     // 442
  if (navigator.userAgent.indexOf('Trident') >= 0) {                             // 443
    PDFJS.disableCreateObjectURL = true;                                         // 444
  }                                                                              // 445
})();                                                                            // 446
                                                                                 // 447
// Checks if navigator.language is supported                                     // 448
(function checkNavigatorLanguage() {                                             // 449
  if ('language' in navigator) {                                                 // 450
    return;                                                                      // 451
  }                                                                              // 452
  PDFJS.locale = navigator.userLanguage || 'en-US';                              // 453
})();                                                                            // 454
                                                                                 // 455
(function checkRangeRequests() {                                                 // 456
  // Safari has issues with cached range requests see:                           // 457
  // https://github.com/mozilla/pdf.js/issues/3260                               // 458
  // Last tested with version 6.0.4.                                             // 459
  // Support: Safari 6.0+                                                        // 460
  var isSafari = Object.prototype.toString.call(                                 // 461
                  window.HTMLElement).indexOf('Constructor') > 0;                // 462
                                                                                 // 463
  // Older versions of Android (pre 3.0) has issues with range requests, see:    // 464
  // https://github.com/mozilla/pdf.js/issues/3381.                              // 465
  // Make sure that we only match webkit-based Android browsers,                 // 466
  // since Firefox/Fennec works as expected.                                     // 467
  // Support: Android<3.0                                                        // 468
  var regex = /Android\s[0-2][^\d]/;                                             // 469
  var isOldAndroid = regex.test(navigator.userAgent);                            // 470
                                                                                 // 471
  // Range requests are broken in Chrome 39 and 40, https://crbug.com/442318     // 472
  var isChromeWithRangeBug = /Chrome\/(39|40)\./.test(navigator.userAgent);      // 473
                                                                                 // 474
  if (isSafari || isOldAndroid || isChromeWithRangeBug) {                        // 475
    PDFJS.disableRange = true;                                                   // 476
    PDFJS.disableStream = true;                                                  // 477
  }                                                                              // 478
})();                                                                            // 479
                                                                                 // 480
// Check if the browser supports manipulation of the history.                    // 481
// Support: IE<10, Android<4.2                                                   // 482
(function checkHistoryManipulation() {                                           // 483
  // Android 2.x has so buggy pushState support that it was removed in           // 484
  // Android 3.0 and restored as late as in Android 4.2.                         // 485
  // Support: Android 2.x                                                        // 486
  if (!history.pushState || navigator.userAgent.indexOf('Android 2.') >= 0) {    // 487
    PDFJS.disableHistory = true;                                                 // 488
  }                                                                              // 489
})();                                                                            // 490
                                                                                 // 491
// Support: IE<11, Chrome<21, Android<4.4, Safari<6                              // 492
(function checkSetPresenceInImageData() {                                        // 493
  // IE < 11 will use window.CanvasPixelArray which lacks set function.          // 494
  if (window.CanvasPixelArray) {                                                 // 495
    if (typeof window.CanvasPixelArray.prototype.set !== 'function') {           // 496
      window.CanvasPixelArray.prototype.set = function(arr) {                    // 497
        for (var i = 0, ii = this.length; i < ii; i++) {                         // 498
          this[i] = arr[i];                                                      // 499
        }                                                                        // 500
      };                                                                         // 501
    }                                                                            // 502
  } else {                                                                       // 503
    // Old Chrome and Android use an inaccessible CanvasPixelArray prototype.    // 504
    // Because we cannot feature detect it, we rely on user agent parsing.       // 505
    var polyfill = false, versionMatch;                                          // 506
    if (navigator.userAgent.indexOf('Chrom') >= 0) {                             // 507
      versionMatch = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);      // 508
      // Chrome < 21 lacks the set function.                                     // 509
      polyfill = versionMatch && parseInt(versionMatch[2]) < 21;                 // 510
    } else if (navigator.userAgent.indexOf('Android') >= 0) {                    // 511
      // Android < 4.4 lacks the set function.                                   // 512
      // Android >= 4.4 will contain Chrome in the user agent,                   // 513
      // thus pass the Chrome check above and not reach this block.              // 514
      polyfill = /Android\s[0-4][^\d]/g.test(navigator.userAgent);               // 515
    } else if (navigator.userAgent.indexOf('Safari') >= 0) {                     // 516
      versionMatch = navigator.userAgent.                                        // 517
        match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//);                 // 518
      // Safari < 6 lacks the set function.                                      // 519
      polyfill = versionMatch && parseInt(versionMatch[1]) < 6;                  // 520
    }                                                                            // 521
                                                                                 // 522
    if (polyfill) {                                                              // 523
      var contextPrototype = window.CanvasRenderingContext2D.prototype;          // 524
      contextPrototype._createImageData = contextPrototype.createImageData;      // 525
      contextPrototype.createImageData = function(w, h) {                        // 526
        var imageData = this._createImageData(w, h);                             // 527
        imageData.data.set = function(arr) {                                     // 528
          for (var i = 0, ii = this.length; i < ii; i++) {                       // 529
            this[i] = arr[i];                                                    // 530
          }                                                                      // 531
        };                                                                       // 532
        return imageData;                                                        // 533
      };                                                                         // 534
    }                                                                            // 535
  }                                                                              // 536
})();                                                                            // 537
                                                                                 // 538
// Support: IE<10, Android<4.0, iOS                                              // 539
(function checkRequestAnimationFrame() {                                         // 540
  function fakeRequestAnimationFrame(callback) {                                 // 541
    window.setTimeout(callback, 20);                                             // 542
  }                                                                              // 543
                                                                                 // 544
  var isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);                   // 545
  if (isIOS) {                                                                   // 546
    // requestAnimationFrame on iOS is broken, replacing with fake one.          // 547
    window.requestAnimationFrame = fakeRequestAnimationFrame;                    // 548
    return;                                                                      // 549
  }                                                                              // 550
  if ('requestAnimationFrame' in window) {                                       // 551
    return;                                                                      // 552
  }                                                                              // 553
  window.requestAnimationFrame =                                                 // 554
    window.mozRequestAnimationFrame ||                                           // 555
    window.webkitRequestAnimationFrame ||                                        // 556
    fakeRequestAnimationFrame;                                                   // 557
})();                                                                            // 558
                                                                                 // 559
(function checkCanvasSizeLimitation() {                                          // 560
  var isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);                   // 561
  var isAndroid = /Android/g.test(navigator.userAgent);                          // 562
  if (isIOS || isAndroid) {                                                      // 563
    // 5MP                                                                       // 564
    PDFJS.maxCanvasPixels = 5242880;                                             // 565
  }                                                                              // 566
})();                                                                            // 567
                                                                                 // 568
// Disable fullscreen support for certain problematic configurations.            // 569
// Support: IE11+ (when embedded).                                               // 570
(function checkFullscreenSupport() {                                             // 571
  var isEmbeddedIE = (navigator.userAgent.indexOf('Trident') >= 0 &&             // 572
                      window.parent !== window);                                 // 573
  if (isEmbeddedIE) {                                                            // 574
    PDFJS.disableFullscreen = true;                                              // 575
  }                                                                              // 576
})();                                                                            // 577
                                                                                 // 578
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['pascoual:pdfjs'] = {
  PDFJS: PDFJS
};

})();
