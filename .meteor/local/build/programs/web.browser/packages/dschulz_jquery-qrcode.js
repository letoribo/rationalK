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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/dschulz:jquery-qrcode/lib/jquery.qrcode-0.11.0.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* jQuery.qrcode 0.11.0 - http://larsjung.de/jquery-qrcode/ - uses //github.com/kazuhikoarase/qrcode-generator (MIT) */
(function () {                                                                                                        // 2
'use strict';                                                                                                         // 3
                                                                                                                      // 4
var $ = jQuery;                                                                                                       // 5
                                                                                                                      // 6
// Wrapper for the original QR code generator.                                                                        // 7
function QRCode(text, level, version, quiet) {                                                                        // 8
                                                                                                                      // 9
    // `qrcode` is the single public function that will be defined by the `QR Code Generator`                         // 10
    // at the end of the file.                                                                                        // 11
    var qr = qrcode(version, level);                                                                                  // 12
    qr.addData(text);                                                                                                 // 13
    qr.make();                                                                                                        // 14
                                                                                                                      // 15
    quiet = quiet || 0;                                                                                               // 16
                                                                                                                      // 17
    var qrModuleCount = qr.getModuleCount();                                                                          // 18
    var quietModuleCount = qr.getModuleCount() + 2*quiet;                                                             // 19
                                                                                                                      // 20
    function isDark(row, col) {                                                                                       // 21
                                                                                                                      // 22
        row -= quiet;                                                                                                 // 23
        col -= quiet;                                                                                                 // 24
                                                                                                                      // 25
        if (row < 0 || row >= qrModuleCount || col < 0 || col >= qrModuleCount) {                                     // 26
            return false;                                                                                             // 27
        }                                                                                                             // 28
                                                                                                                      // 29
        return qr.isDark(row, col);                                                                                   // 30
    }                                                                                                                 // 31
                                                                                                                      // 32
    var addBlank = function (l, t, r, b) {                                                                            // 33
                                                                                                                      // 34
        var prevIsDark = this.isDark;                                                                                 // 35
        var moduleSize = 1 / quietModuleCount;                                                                        // 36
                                                                                                                      // 37
        this.isDark = function (row, col) {                                                                           // 38
                                                                                                                      // 39
            var ml = col * moduleSize;                                                                                // 40
            var mt = row * moduleSize;                                                                                // 41
            var mr = ml + moduleSize;                                                                                 // 42
            var mb = mt + moduleSize;                                                                                 // 43
                                                                                                                      // 44
            return prevIsDark(row, col) && (l > mr || ml > r || t > mb || mt > b);                                    // 45
        };                                                                                                            // 46
    };                                                                                                                // 47
                                                                                                                      // 48
    this.text = text;                                                                                                 // 49
    this.level = level;                                                                                               // 50
    this.version = version;                                                                                           // 51
    this.moduleCount = quietModuleCount;                                                                              // 52
    this.isDark = isDark;                                                                                             // 53
    this.addBlank = addBlank;                                                                                         // 54
}                                                                                                                     // 55
                                                                                                                      // 56
// Check if canvas is available in the browser (as Modernizr does)                                                    // 57
var hasCanvas = (function () {                                                                                        // 58
                                                                                                                      // 59
        var elem = document.createElement('canvas');                                                                  // 60
        return !!(elem.getContext && elem.getContext('2d'));                                                          // 61
    }());                                                                                                             // 62
var hasArcTo = Object.prototype.toString.call(window.opera) !== '[object Opera]';                                     // 63
                                                                                                                      // 64
// Returns a minimal QR code for the given text starting with version `minVersion`.                                   // 65
// Returns `undefined` if `text` is too long to be encoded in `maxVersion`.                                           // 66
function createQRCode(text, level, minVersion, maxVersion, quiet) {                                                   // 67
                                                                                                                      // 68
    minVersion = Math.max(1, minVersion || 1);                                                                        // 69
    maxVersion = Math.min(40, maxVersion || 40);                                                                      // 70
    for (var version = minVersion; version <= maxVersion; version += 1) {                                             // 71
        try {                                                                                                         // 72
            return new QRCode(text, level, version, quiet);                                                           // 73
        } catch (err) {}                                                                                              // 74
    }                                                                                                                 // 75
}                                                                                                                     // 76
                                                                                                                      // 77
function drawBackgroundLabel(qr, context, settings) {                                                                 // 78
                                                                                                                      // 79
    var size = settings.size;                                                                                         // 80
    var font = "bold " + (settings.mSize * size) + "px " + settings.fontname;                                         // 81
    var ctx = $('<canvas/>')[0].getContext("2d");                                                                     // 82
                                                                                                                      // 83
    ctx.font = font;                                                                                                  // 84
                                                                                                                      // 85
    var w = ctx.measureText(settings.label).width;                                                                    // 86
    var sh = settings.mSize;                                                                                          // 87
    var sw = w / size;                                                                                                // 88
    var sl = (1 - sw) * settings.mPosX;                                                                               // 89
    var st = (1 - sh) * settings.mPosY;                                                                               // 90
    var sr = sl + sw;                                                                                                 // 91
    var sb = st + sh;                                                                                                 // 92
    var pad = 0.01;                                                                                                   // 93
                                                                                                                      // 94
    if (settings.mode === 1) {                                                                                        // 95
        // Strip                                                                                                      // 96
        qr.addBlank(0, st - pad, size, sb + pad);                                                                     // 97
    } else {                                                                                                          // 98
        // Box                                                                                                        // 99
        qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);                                                          // 100
    }                                                                                                                 // 101
                                                                                                                      // 102
    context.fillStyle = settings.fontcolor;                                                                           // 103
    context.font = font;                                                                                              // 104
    context.fillText(settings.label, sl*size, st*size + 0.75 * settings.mSize * size);                                // 105
}                                                                                                                     // 106
                                                                                                                      // 107
function drawBackgroundImage(qr, context, settings) {                                                                 // 108
                                                                                                                      // 109
    var size = settings.size;                                                                                         // 110
    var w = settings.image.naturalWidth || 1;                                                                         // 111
    var h = settings.image.naturalHeight || 1;                                                                        // 112
    var sh = settings.mSize;                                                                                          // 113
    var sw = sh * w / h;                                                                                              // 114
    var sl = (1 - sw) * settings.mPosX;                                                                               // 115
    var st = (1 - sh) * settings.mPosY;                                                                               // 116
    var sr = sl + sw;                                                                                                 // 117
    var sb = st + sh;                                                                                                 // 118
    var pad = 0.01;                                                                                                   // 119
                                                                                                                      // 120
    if (settings.mode === 3) {                                                                                        // 121
        // Strip                                                                                                      // 122
        qr.addBlank(0, st - pad, size, sb + pad);                                                                     // 123
    } else {                                                                                                          // 124
        // Box                                                                                                        // 125
        qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);                                                          // 126
    }                                                                                                                 // 127
                                                                                                                      // 128
    context.drawImage(settings.image, sl*size, st*size, sw*size, sh*size);                                            // 129
}                                                                                                                     // 130
                                                                                                                      // 131
function drawBackground(qr, context, settings) {                                                                      // 132
                                                                                                                      // 133
    if ($(settings.background).is('img')) {                                                                           // 134
        context.drawImage(settings.background, 0, 0, settings.size, settings.size);                                   // 135
    } else if (settings.background) {                                                                                 // 136
        context.fillStyle = settings.background;                                                                      // 137
        context.fillRect(settings.left, settings.top, settings.size, settings.size);                                  // 138
    }                                                                                                                 // 139
                                                                                                                      // 140
    var mode = settings.mode;                                                                                         // 141
    if (mode === 1 || mode === 2) {                                                                                   // 142
        drawBackgroundLabel(qr, context, settings);                                                                   // 143
    } else if (mode === 3 || mode === 4) {                                                                            // 144
        drawBackgroundImage(qr, context, settings);                                                                   // 145
    }                                                                                                                 // 146
}                                                                                                                     // 147
                                                                                                                      // 148
function drawModuleDefault(qr, context, settings, left, top, width, row, col) {                                       // 149
                                                                                                                      // 150
    if (qr.isDark(row, col)) {                                                                                        // 151
        context.rect(left, top, width, width);                                                                        // 152
    }                                                                                                                 // 153
}                                                                                                                     // 154
                                                                                                                      // 155
function drawModuleRoundedDark(ctx, l, t, r, b, rad, nw, ne, se, sw) {                                                // 156
                                                                                                                      // 157
    if (nw) {                                                                                                         // 158
        ctx.moveTo(l + rad, t);                                                                                       // 159
    } else {                                                                                                          // 160
        ctx.moveTo(l, t);                                                                                             // 161
    }                                                                                                                 // 162
                                                                                                                      // 163
    if (ne) {                                                                                                         // 164
        ctx.lineTo(r - rad, t);                                                                                       // 165
        ctx.arcTo(r, t, r, b, rad);                                                                                   // 166
    } else {                                                                                                          // 167
        ctx.lineTo(r, t);                                                                                             // 168
    }                                                                                                                 // 169
                                                                                                                      // 170
    if (se) {                                                                                                         // 171
        ctx.lineTo(r, b - rad);                                                                                       // 172
        ctx.arcTo(r, b, l, b, rad);                                                                                   // 173
    } else {                                                                                                          // 174
        ctx.lineTo(r, b);                                                                                             // 175
    }                                                                                                                 // 176
                                                                                                                      // 177
    if (sw) {                                                                                                         // 178
        ctx.lineTo(l + rad, b);                                                                                       // 179
        ctx.arcTo(l, b, l, t, rad);                                                                                   // 180
    } else {                                                                                                          // 181
        ctx.lineTo(l, b);                                                                                             // 182
    }                                                                                                                 // 183
                                                                                                                      // 184
    if (nw) {                                                                                                         // 185
        ctx.lineTo(l, t + rad);                                                                                       // 186
        ctx.arcTo(l, t, r, t, rad);                                                                                   // 187
    } else {                                                                                                          // 188
        ctx.lineTo(l, t);                                                                                             // 189
    }                                                                                                                 // 190
}                                                                                                                     // 191
                                                                                                                      // 192
function drawModuleRoundendLight(ctx, l, t, r, b, rad, nw, ne, se, sw) {                                              // 193
                                                                                                                      // 194
    if (nw) {                                                                                                         // 195
        ctx.moveTo(l + rad, t);                                                                                       // 196
        ctx.lineTo(l, t);                                                                                             // 197
        ctx.lineTo(l, t + rad);                                                                                       // 198
        ctx.arcTo(l, t, l + rad, t, rad);                                                                             // 199
    }                                                                                                                 // 200
                                                                                                                      // 201
    if (ne) {                                                                                                         // 202
        ctx.moveTo(r - rad, t);                                                                                       // 203
        ctx.lineTo(r, t);                                                                                             // 204
        ctx.lineTo(r, t + rad);                                                                                       // 205
        ctx.arcTo(r, t, r - rad, t, rad);                                                                             // 206
    }                                                                                                                 // 207
                                                                                                                      // 208
    if (se) {                                                                                                         // 209
        ctx.moveTo(r - rad, b);                                                                                       // 210
        ctx.lineTo(r, b);                                                                                             // 211
        ctx.lineTo(r, b - rad);                                                                                       // 212
        ctx.arcTo(r, b, r - rad, b, rad);                                                                             // 213
    }                                                                                                                 // 214
                                                                                                                      // 215
    if (sw) {                                                                                                         // 216
        ctx.moveTo(l + rad, b);                                                                                       // 217
        ctx.lineTo(l, b);                                                                                             // 218
        ctx.lineTo(l, b - rad);                                                                                       // 219
        ctx.arcTo(l, b, l + rad, b, rad);                                                                             // 220
    }                                                                                                                 // 221
}                                                                                                                     // 222
                                                                                                                      // 223
function drawModuleRounded(qr, context, settings, left, top, width, row, col) {                                       // 224
                                                                                                                      // 225
    var isDark = qr.isDark;                                                                                           // 226
    var right = left + width;                                                                                         // 227
    var bottom = top + width;                                                                                         // 228
    var radius = settings.radius * width;                                                                             // 229
    var rowT = row - 1;                                                                                               // 230
    var rowB = row + 1;                                                                                               // 231
    var colL = col - 1;                                                                                               // 232
    var colR = col + 1;                                                                                               // 233
    var center = isDark(row, col);                                                                                    // 234
    var northwest = isDark(rowT, colL);                                                                               // 235
    var north = isDark(rowT, col);                                                                                    // 236
    var northeast = isDark(rowT, colR);                                                                               // 237
    var east = isDark(row, colR);                                                                                     // 238
    var southeast = isDark(rowB, colR);                                                                               // 239
    var south = isDark(rowB, col);                                                                                    // 240
    var southwest = isDark(rowB, colL);                                                                               // 241
    var west = isDark(row, colL);                                                                                     // 242
                                                                                                                      // 243
    if (center) {                                                                                                     // 244
        drawModuleRoundedDark(context, left, top, right, bottom, radius, !north && !west, !north && !east, !south && !east, !south && !west);
    } else {                                                                                                          // 246
        drawModuleRoundendLight(context, left, top, right, bottom, radius, north && west && northwest, north && east && northeast, south && east && southeast, south && west && southwest);
    }                                                                                                                 // 248
}                                                                                                                     // 249
                                                                                                                      // 250
function drawModules(qr, context, settings) {                                                                         // 251
                                                                                                                      // 252
    var moduleCount = qr.moduleCount;                                                                                 // 253
    var moduleSize = settings.size / moduleCount;                                                                     // 254
    var fn = drawModuleDefault;                                                                                       // 255
    var row, col;                                                                                                     // 256
                                                                                                                      // 257
    if (hasArcTo && settings.radius > 0 && settings.radius <= 0.5) {                                                  // 258
        fn = drawModuleRounded;                                                                                       // 259
    }                                                                                                                 // 260
                                                                                                                      // 261
    context.beginPath();                                                                                              // 262
    for (row = 0; row < moduleCount; row += 1) {                                                                      // 263
        for (col = 0; col < moduleCount; col += 1) {                                                                  // 264
                                                                                                                      // 265
            var l = settings.left + col * moduleSize,                                                                 // 266
                t = settings.top + row * moduleSize,                                                                  // 267
                w = moduleSize;                                                                                       // 268
                                                                                                                      // 269
            fn(qr, context, settings, l, t, w, row, col);                                                             // 270
        }                                                                                                             // 271
    }                                                                                                                 // 272
    if ($(settings.fill).is('img')) {                                                                                 // 273
        context.strokeStyle = 'rgba(0,0,0,0.5)';                                                                      // 274
        context.lineWidth = 2;                                                                                        // 275
        context.stroke();                                                                                             // 276
        var prev = context.globalCompositeOperation;                                                                  // 277
        context.globalCompositeOperation = "destination-out";                                                         // 278
        context.fill();                                                                                               // 279
        context.globalCompositeOperation = prev;                                                                      // 280
                                                                                                                      // 281
        context.clip();                                                                                               // 282
        context.drawImage(settings.fill, 0, 0, settings.size, settings.size);                                         // 283
        context.restore();                                                                                            // 284
    } else {                                                                                                          // 285
        context.fillStyle = settings.fill;                                                                            // 286
        context.fill();                                                                                               // 287
    }                                                                                                                 // 288
}                                                                                                                     // 289
                                                                                                                      // 290
// Draws QR code to the given `canvas` and returns it.                                                                // 291
function drawOnCanvas(canvas, settings) {                                                                             // 292
                                                                                                                      // 293
    var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet); // 294
    if (!qr) {                                                                                                        // 295
        return null;                                                                                                  // 296
    }                                                                                                                 // 297
                                                                                                                      // 298
    var $canvas = $(canvas).data('qrcode', qr);                                                                       // 299
    var context = $canvas[0].getContext('2d');                                                                        // 300
                                                                                                                      // 301
    drawBackground(qr, context, settings);                                                                            // 302
    drawModules(qr, context, settings);                                                                               // 303
                                                                                                                      // 304
    return $canvas;                                                                                                   // 305
}                                                                                                                     // 306
                                                                                                                      // 307
// Returns a `canvas` element representing the QR code for the given settings.                                        // 308
function createCanvas(settings) {                                                                                     // 309
                                                                                                                      // 310
    var $canvas = $('<canvas/>').attr('width', settings.size).attr('height', settings.size);                          // 311
    return drawOnCanvas($canvas, settings);                                                                           // 312
}                                                                                                                     // 313
                                                                                                                      // 314
// Returns an `image` element representing the QR code for the given settings.                                        // 315
function createImage(settings) {                                                                                      // 316
                                                                                                                      // 317
    return $('<img/>').attr('src', createCanvas(settings)[0].toDataURL('image/png'));                                 // 318
}                                                                                                                     // 319
                                                                                                                      // 320
// Returns a `div` element representing the QR code for the given settings.                                           // 321
function createDiv(settings) {                                                                                        // 322
                                                                                                                      // 323
    var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet); // 324
    if (!qr) {                                                                                                        // 325
        return null;                                                                                                  // 326
    }                                                                                                                 // 327
                                                                                                                      // 328
    // some shortcuts to improve compression                                                                          // 329
    var settings_size = settings.size;                                                                                // 330
    var settings_bgColor = settings.background;                                                                       // 331
    var math_floor = Math.floor;                                                                                      // 332
                                                                                                                      // 333
    var moduleCount = qr.moduleCount;                                                                                 // 334
    var moduleSize = math_floor(settings_size / moduleCount);                                                         // 335
    var offset = math_floor(0.5 * (settings_size - moduleSize * moduleCount));                                        // 336
                                                                                                                      // 337
    var row, col;                                                                                                     // 338
                                                                                                                      // 339
    var containerCSS = {                                                                                              // 340
            position: 'relative',                                                                                     // 341
            left: 0,                                                                                                  // 342
            top: 0,                                                                                                   // 343
            padding: 0,                                                                                               // 344
            margin: 0,                                                                                                // 345
            width: settings_size,                                                                                     // 346
            height: settings_size                                                                                     // 347
        };                                                                                                            // 348
    var darkCSS = {                                                                                                   // 349
            position: 'absolute',                                                                                     // 350
            padding: 0,                                                                                               // 351
            margin: 0,                                                                                                // 352
            width: moduleSize,                                                                                        // 353
            height: moduleSize,                                                                                       // 354
            'background-color': settings.fill                                                                         // 355
        };                                                                                                            // 356
                                                                                                                      // 357
    var $div = $('<div/>').data('qrcode', qr).css(containerCSS);                                                      // 358
                                                                                                                      // 359
    if (settings_bgColor) {                                                                                           // 360
        $div.css('background-color', settings_bgColor);                                                               // 361
    }                                                                                                                 // 362
                                                                                                                      // 363
    for (row = 0; row < moduleCount; row += 1) {                                                                      // 364
        for (col = 0; col < moduleCount; col += 1) {                                                                  // 365
            if (qr.isDark(row, col)) {                                                                                // 366
                $('<div/>')                                                                                           // 367
                    .css(darkCSS)                                                                                     // 368
                    .css({                                                                                            // 369
                        left: offset + col * moduleSize,                                                              // 370
                        top: offset + row * moduleSize                                                                // 371
                    })                                                                                                // 372
                    .appendTo($div);                                                                                  // 373
            }                                                                                                         // 374
        }                                                                                                             // 375
    }                                                                                                                 // 376
                                                                                                                      // 377
    return $div;                                                                                                      // 378
}                                                                                                                     // 379
                                                                                                                      // 380
function createHTML(settings) {                                                                                       // 381
                                                                                                                      // 382
    if (hasCanvas && settings.render === 'canvas') {                                                                  // 383
        return createCanvas(settings);                                                                                // 384
    } else if (hasCanvas && settings.render === 'image') {                                                            // 385
        return createImage(settings);                                                                                 // 386
    }                                                                                                                 // 387
                                                                                                                      // 388
    return createDiv(settings);                                                                                       // 389
}                                                                                                                     // 390
                                                                                                                      // 391
// Plugin                                                                                                             // 392
// ======                                                                                                             // 393
                                                                                                                      // 394
// Default settings                                                                                                   // 395
// ----------------                                                                                                   // 396
var defaults = {                                                                                                      // 397
                                                                                                                      // 398
        // render method: `'canvas'`, `'image'` or `'div'`                                                            // 399
        render: 'canvas',                                                                                             // 400
                                                                                                                      // 401
        // version range somewhere in 1 .. 40                                                                         // 402
        minVersion: 1,                                                                                                // 403
        maxVersion: 40,                                                                                               // 404
                                                                                                                      // 405
        // error correction level: `'L'`, `'M'`, `'Q'` or `'H'`                                                       // 406
        ecLevel: 'L',                                                                                                 // 407
                                                                                                                      // 408
        // offset in pixel if drawn onto existing canvas                                                              // 409
        left: 0,                                                                                                      // 410
        top: 0,                                                                                                       // 411
                                                                                                                      // 412
        // size in pixel                                                                                              // 413
        size: 200,                                                                                                    // 414
                                                                                                                      // 415
        // code color or image element                                                                                // 416
        fill: '#000',                                                                                                 // 417
                                                                                                                      // 418
        // background color or image element, `null` for transparent background                                       // 419
        background: null,                                                                                             // 420
                                                                                                                      // 421
        // content                                                                                                    // 422
        text: 'no text',                                                                                              // 423
                                                                                                                      // 424
        // corner radius relative to module width: 0.0 .. 0.5                                                         // 425
        radius: 0,                                                                                                    // 426
                                                                                                                      // 427
        // quiet zone in modules                                                                                      // 428
        quiet: 0,                                                                                                     // 429
                                                                                                                      // 430
        // modes                                                                                                      // 431
        // 0: normal                                                                                                  // 432
        // 1: label strip                                                                                             // 433
        // 2: label box                                                                                               // 434
        // 3: image strip                                                                                             // 435
        // 4: image box                                                                                               // 436
        mode: 0,                                                                                                      // 437
                                                                                                                      // 438
        mSize: 0.1,                                                                                                   // 439
        mPosX: 0.5,                                                                                                   // 440
        mPosY: 0.5,                                                                                                   // 441
                                                                                                                      // 442
        label: 'no label',                                                                                            // 443
        fontname: 'sans',                                                                                             // 444
        fontcolor: '#000',                                                                                            // 445
                                                                                                                      // 446
        image: null                                                                                                   // 447
    };                                                                                                                // 448
                                                                                                                      // 449
// Register the plugin                                                                                                // 450
// -------------------                                                                                                // 451
$.fn.qrcode = function(options) {                                                                                     // 452
                                                                                                                      // 453
    var settings = $.extend({}, defaults, options);                                                                   // 454
                                                                                                                      // 455
    return this.each(function () {                                                                                    // 456
                                                                                                                      // 457
        if (this.nodeName.toLowerCase() === 'canvas') {                                                               // 458
            drawOnCanvas(this, settings);                                                                             // 459
        } else {                                                                                                      // 460
            $(this).append(createHTML(settings));                                                                     // 461
        }                                                                                                             // 462
    });                                                                                                               // 463
};                                                                                                                    // 464
                                                                                                                      // 465
// jQuery.qrcode plug in code ends here                                                                               // 466
                                                                                                                      // 467
                                                                                                                      // 468
// QR Code Generator                                                                                                  // 469
// =================                                                                                                  // 470
//---------------------------------------------------------------------                                               // 471
//                                                                                                                    // 472
// QR Code Generator for JavaScript                                                                                   // 473
//                                                                                                                    // 474
// Copyright (c) 2009 Kazuhiko Arase                                                                                  // 475
//                                                                                                                    // 476
// URL: http://www.d-project.com/                                                                                     // 477
//                                                                                                                    // 478
// Licensed under the MIT license:                                                                                    // 479
//  http://www.opensource.org/licenses/mit-license.php                                                                // 480
//                                                                                                                    // 481
// The word 'QR Code' is registered trademark of                                                                      // 482
// DENSO WAVE INCORPORATED                                                                                            // 483
//  http://www.denso-wave.com/qrcode/faqpatent-e.html                                                                 // 484
//                                                                                                                    // 485
//---------------------------------------------------------------------                                               // 486
                                                                                                                      // 487
var qrcode = function() {                                                                                             // 488
                                                                                                                      // 489
    //---------------------------------------------------------------------                                           // 490
    // qrcode                                                                                                         // 491
    //---------------------------------------------------------------------                                           // 492
                                                                                                                      // 493
    /**                                                                                                               // 494
     * qrcode                                                                                                         // 495
     * @param typeNumber 1 to 10                                                                                      // 496
     * @param errorCorrectLevel 'L','M','Q','H'                                                                       // 497
     */                                                                                                               // 498
    var qrcode = function(typeNumber, errorCorrectLevel) {                                                            // 499
                                                                                                                      // 500
        var PAD0 = 0xEC;                                                                                              // 501
        var PAD1 = 0x11;                                                                                              // 502
                                                                                                                      // 503
        var _typeNumber = typeNumber;                                                                                 // 504
        var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];                                              // 505
        var _modules = null;                                                                                          // 506
        var _moduleCount = 0;                                                                                         // 507
        var _dataCache = null;                                                                                        // 508
        var _dataList = new Array();                                                                                  // 509
                                                                                                                      // 510
        var _this = {};                                                                                               // 511
                                                                                                                      // 512
        var makeImpl = function(test, maskPattern) {                                                                  // 513
                                                                                                                      // 514
            _moduleCount = _typeNumber * 4 + 17;                                                                      // 515
            _modules = function(moduleCount) {                                                                        // 516
                var modules = new Array(moduleCount);                                                                 // 517
                for (var row = 0; row < moduleCount; row += 1) {                                                      // 518
                    modules[row] = new Array(moduleCount);                                                            // 519
                    for (var col = 0; col < moduleCount; col += 1) {                                                  // 520
                        modules[row][col] = null;                                                                     // 521
                    }                                                                                                 // 522
                }                                                                                                     // 523
                return modules;                                                                                       // 524
            }(_moduleCount);                                                                                          // 525
                                                                                                                      // 526
            setupPositionProbePattern(0, 0);                                                                          // 527
            setupPositionProbePattern(_moduleCount - 7, 0);                                                           // 528
            setupPositionProbePattern(0, _moduleCount - 7);                                                           // 529
            setupPositionAdjustPattern();                                                                             // 530
            setupTimingPattern();                                                                                     // 531
            setupTypeInfo(test, maskPattern);                                                                         // 532
                                                                                                                      // 533
            if (_typeNumber >= 7) {                                                                                   // 534
                setupTypeNumber(test);                                                                                // 535
            }                                                                                                         // 536
                                                                                                                      // 537
            if (_dataCache == null) {                                                                                 // 538
                _dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);                                  // 539
            }                                                                                                         // 540
                                                                                                                      // 541
            mapData(_dataCache, maskPattern);                                                                         // 542
        };                                                                                                            // 543
                                                                                                                      // 544
        var setupPositionProbePattern = function(row, col) {                                                          // 545
                                                                                                                      // 546
            for (var r = -1; r <= 7; r += 1) {                                                                        // 547
                                                                                                                      // 548
                if (row + r <= -1 || _moduleCount <= row + r) continue;                                               // 549
                                                                                                                      // 550
                for (var c = -1; c <= 7; c += 1) {                                                                    // 551
                                                                                                                      // 552
                    if (col + c <= -1 || _moduleCount <= col + c) continue;                                           // 553
                                                                                                                      // 554
                    if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )                                                    // 555
                            || (0 <= c && c <= 6 && (r == 0 || r == 6) )                                              // 556
                            || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {                                             // 557
                        _modules[row + r][col + c] = true;                                                            // 558
                    } else {                                                                                          // 559
                        _modules[row + r][col + c] = false;                                                           // 560
                    }                                                                                                 // 561
                }                                                                                                     // 562
            }                                                                                                         // 563
        };                                                                                                            // 564
                                                                                                                      // 565
        var getBestMaskPattern = function() {                                                                         // 566
                                                                                                                      // 567
            var minLostPoint = 0;                                                                                     // 568
            var pattern = 0;                                                                                          // 569
                                                                                                                      // 570
            for (var i = 0; i < 8; i += 1) {                                                                          // 571
                                                                                                                      // 572
                makeImpl(true, i);                                                                                    // 573
                                                                                                                      // 574
                var lostPoint = QRUtil.getLostPoint(_this);                                                           // 575
                                                                                                                      // 576
                if (i == 0 || minLostPoint > lostPoint) {                                                             // 577
                    minLostPoint = lostPoint;                                                                         // 578
                    pattern = i;                                                                                      // 579
                }                                                                                                     // 580
            }                                                                                                         // 581
                                                                                                                      // 582
            return pattern;                                                                                           // 583
        };                                                                                                            // 584
                                                                                                                      // 585
        var setupTimingPattern = function() {                                                                         // 586
                                                                                                                      // 587
            for (var r = 8; r < _moduleCount - 8; r += 1) {                                                           // 588
                if (_modules[r][6] != null) {                                                                         // 589
                    continue;                                                                                         // 590
                }                                                                                                     // 591
                _modules[r][6] = (r % 2 == 0);                                                                        // 592
            }                                                                                                         // 593
                                                                                                                      // 594
            for (var c = 8; c < _moduleCount - 8; c += 1) {                                                           // 595
                if (_modules[6][c] != null) {                                                                         // 596
                    continue;                                                                                         // 597
                }                                                                                                     // 598
                _modules[6][c] = (c % 2 == 0);                                                                        // 599
            }                                                                                                         // 600
        };                                                                                                            // 601
                                                                                                                      // 602
        var setupPositionAdjustPattern = function() {                                                                 // 603
                                                                                                                      // 604
            var pos = QRUtil.getPatternPosition(_typeNumber);                                                         // 605
                                                                                                                      // 606
            for (var i = 0; i < pos.length; i += 1) {                                                                 // 607
                                                                                                                      // 608
                for (var j = 0; j < pos.length; j += 1) {                                                             // 609
                                                                                                                      // 610
                    var row = pos[i];                                                                                 // 611
                    var col = pos[j];                                                                                 // 612
                                                                                                                      // 613
                    if (_modules[row][col] != null) {                                                                 // 614
                        continue;                                                                                     // 615
                    }                                                                                                 // 616
                                                                                                                      // 617
                    for (var r = -2; r <= 2; r += 1) {                                                                // 618
                                                                                                                      // 619
                        for (var c = -2; c <= 2; c += 1) {                                                            // 620
                                                                                                                      // 621
                            if (r == -2 || r == 2 || c == -2 || c == 2                                                // 622
                                    || (r == 0 && c == 0) ) {                                                         // 623
                                _modules[row + r][col + c] = true;                                                    // 624
                            } else {                                                                                  // 625
                                _modules[row + r][col + c] = false;                                                   // 626
                            }                                                                                         // 627
                        }                                                                                             // 628
                    }                                                                                                 // 629
                }                                                                                                     // 630
            }                                                                                                         // 631
        };                                                                                                            // 632
                                                                                                                      // 633
        var setupTypeNumber = function(test) {                                                                        // 634
                                                                                                                      // 635
            var bits = QRUtil.getBCHTypeNumber(_typeNumber);                                                          // 636
                                                                                                                      // 637
            for (var i = 0; i < 18; i += 1) {                                                                         // 638
                var mod = (!test && ( (bits >> i) & 1) == 1);                                                         // 639
                _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;                                      // 640
            }                                                                                                         // 641
                                                                                                                      // 642
            for (var i = 0; i < 18; i += 1) {                                                                         // 643
                var mod = (!test && ( (bits >> i) & 1) == 1);                                                         // 644
                _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;                                      // 645
            }                                                                                                         // 646
        };                                                                                                            // 647
                                                                                                                      // 648
        var setupTypeInfo = function(test, maskPattern) {                                                             // 649
                                                                                                                      // 650
            var data = (_errorCorrectLevel << 3) | maskPattern;                                                       // 651
            var bits = QRUtil.getBCHTypeInfo(data);                                                                   // 652
                                                                                                                      // 653
            // vertical                                                                                               // 654
            for (var i = 0; i < 15; i += 1) {                                                                         // 655
                                                                                                                      // 656
                var mod = (!test && ( (bits >> i) & 1) == 1);                                                         // 657
                                                                                                                      // 658
                if (i < 6) {                                                                                          // 659
                    _modules[i][8] = mod;                                                                             // 660
                } else if (i < 8) {                                                                                   // 661
                    _modules[i + 1][8] = mod;                                                                         // 662
                } else {                                                                                              // 663
                    _modules[_moduleCount - 15 + i][8] = mod;                                                         // 664
                }                                                                                                     // 665
            }                                                                                                         // 666
                                                                                                                      // 667
            // horizontal                                                                                             // 668
            for (var i = 0; i < 15; i += 1) {                                                                         // 669
                                                                                                                      // 670
                var mod = (!test && ( (bits >> i) & 1) == 1);                                                         // 671
                                                                                                                      // 672
                if (i < 8) {                                                                                          // 673
                    _modules[8][_moduleCount - i - 1] = mod;                                                          // 674
                } else if (i < 9) {                                                                                   // 675
                    _modules[8][15 - i - 1 + 1] = mod;                                                                // 676
                } else {                                                                                              // 677
                    _modules[8][15 - i - 1] = mod;                                                                    // 678
                }                                                                                                     // 679
            }                                                                                                         // 680
                                                                                                                      // 681
            // fixed module                                                                                           // 682
            _modules[_moduleCount - 8][8] = (!test);                                                                  // 683
        };                                                                                                            // 684
                                                                                                                      // 685
        var mapData = function(data, maskPattern) {                                                                   // 686
                                                                                                                      // 687
            var inc = -1;                                                                                             // 688
            var row = _moduleCount - 1;                                                                               // 689
            var bitIndex = 7;                                                                                         // 690
            var byteIndex = 0;                                                                                        // 691
            var maskFunc = QRUtil.getMaskFunction(maskPattern);                                                       // 692
                                                                                                                      // 693
            for (var col = _moduleCount - 1; col > 0; col -= 2) {                                                     // 694
                                                                                                                      // 695
                if (col == 6) col -= 1;                                                                               // 696
                                                                                                                      // 697
                while (true) {                                                                                        // 698
                                                                                                                      // 699
                    for (var c = 0; c < 2; c += 1) {                                                                  // 700
                                                                                                                      // 701
                        if (_modules[row][col - c] == null) {                                                         // 702
                                                                                                                      // 703
                            var dark = false;                                                                         // 704
                                                                                                                      // 705
                            if (byteIndex < data.length) {                                                            // 706
                                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);                                 // 707
                            }                                                                                         // 708
                                                                                                                      // 709
                            var mask = maskFunc(row, col - c);                                                        // 710
                                                                                                                      // 711
                            if (mask) {                                                                               // 712
                                dark = !dark;                                                                         // 713
                            }                                                                                         // 714
                                                                                                                      // 715
                            _modules[row][col - c] = dark;                                                            // 716
                            bitIndex -= 1;                                                                            // 717
                                                                                                                      // 718
                            if (bitIndex == -1) {                                                                     // 719
                                byteIndex += 1;                                                                       // 720
                                bitIndex = 7;                                                                         // 721
                            }                                                                                         // 722
                        }                                                                                             // 723
                    }                                                                                                 // 724
                                                                                                                      // 725
                    row += inc;                                                                                       // 726
                                                                                                                      // 727
                    if (row < 0 || _moduleCount <= row) {                                                             // 728
                        row -= inc;                                                                                   // 729
                        inc = -inc;                                                                                   // 730
                        break;                                                                                        // 731
                    }                                                                                                 // 732
                }                                                                                                     // 733
            }                                                                                                         // 734
        };                                                                                                            // 735
                                                                                                                      // 736
        var createBytes = function(buffer, rsBlocks) {                                                                // 737
                                                                                                                      // 738
            var offset = 0;                                                                                           // 739
                                                                                                                      // 740
            var maxDcCount = 0;                                                                                       // 741
            var maxEcCount = 0;                                                                                       // 742
                                                                                                                      // 743
            var dcdata = new Array(rsBlocks.length);                                                                  // 744
            var ecdata = new Array(rsBlocks.length);                                                                  // 745
                                                                                                                      // 746
            for (var r = 0; r < rsBlocks.length; r += 1) {                                                            // 747
                                                                                                                      // 748
                var dcCount = rsBlocks[r].dataCount;                                                                  // 749
                var ecCount = rsBlocks[r].totalCount - dcCount;                                                       // 750
                                                                                                                      // 751
                maxDcCount = Math.max(maxDcCount, dcCount);                                                           // 752
                maxEcCount = Math.max(maxEcCount, ecCount);                                                           // 753
                                                                                                                      // 754
                dcdata[r] = new Array(dcCount);                                                                       // 755
                                                                                                                      // 756
                for (var i = 0; i < dcdata[r].length; i += 1) {                                                       // 757
                    dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];                                             // 758
                }                                                                                                     // 759
                offset += dcCount;                                                                                    // 760
                                                                                                                      // 761
                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);                                               // 762
                var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);                                        // 763
                                                                                                                      // 764
                var modPoly = rawPoly.mod(rsPoly);                                                                    // 765
                ecdata[r] = new Array(rsPoly.getLength() - 1);                                                        // 766
                for (var i = 0; i < ecdata[r].length; i += 1) {                                                       // 767
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;                                        // 768
                    ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;                                        // 769
                }                                                                                                     // 770
            }                                                                                                         // 771
                                                                                                                      // 772
            var totalCodeCount = 0;                                                                                   // 773
            for (var i = 0; i < rsBlocks.length; i += 1) {                                                            // 774
                totalCodeCount += rsBlocks[i].totalCount;                                                             // 775
            }                                                                                                         // 776
                                                                                                                      // 777
            var data = new Array(totalCodeCount);                                                                     // 778
            var index = 0;                                                                                            // 779
                                                                                                                      // 780
            for (var i = 0; i < maxDcCount; i += 1) {                                                                 // 781
                for (var r = 0; r < rsBlocks.length; r += 1) {                                                        // 782
                    if (i < dcdata[r].length) {                                                                       // 783
                        data[index] = dcdata[r][i];                                                                   // 784
                        index += 1;                                                                                   // 785
                    }                                                                                                 // 786
                }                                                                                                     // 787
            }                                                                                                         // 788
                                                                                                                      // 789
            for (var i = 0; i < maxEcCount; i += 1) {                                                                 // 790
                for (var r = 0; r < rsBlocks.length; r += 1) {                                                        // 791
                    if (i < ecdata[r].length) {                                                                       // 792
                        data[index] = ecdata[r][i];                                                                   // 793
                        index += 1;                                                                                   // 794
                    }                                                                                                 // 795
                }                                                                                                     // 796
            }                                                                                                         // 797
                                                                                                                      // 798
            return data;                                                                                              // 799
        };                                                                                                            // 800
                                                                                                                      // 801
        var createData = function(typeNumber, errorCorrectLevel, dataList) {                                          // 802
                                                                                                                      // 803
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);                                      // 804
                                                                                                                      // 805
            var buffer = qrBitBuffer();                                                                               // 806
                                                                                                                      // 807
            for (var i = 0; i < dataList.length; i += 1) {                                                            // 808
                var data = dataList[i];                                                                               // 809
                buffer.put(data.getMode(), 4);                                                                        // 810
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );                    // 811
                data.write(buffer);                                                                                   // 812
            }                                                                                                         // 813
                                                                                                                      // 814
            // calc num max data.                                                                                     // 815
            var totalDataCount = 0;                                                                                   // 816
            for (var i = 0; i < rsBlocks.length; i += 1) {                                                            // 817
                totalDataCount += rsBlocks[i].dataCount;                                                              // 818
            }                                                                                                         // 819
                                                                                                                      // 820
            if (buffer.getLengthInBits() > totalDataCount * 8) {                                                      // 821
                throw new Error('code length overflow. ('                                                             // 822
                    + buffer.getLengthInBits()                                                                        // 823
                    + '>'                                                                                             // 824
                    + totalDataCount * 8                                                                              // 825
                    + ')');                                                                                           // 826
            }                                                                                                         // 827
                                                                                                                      // 828
            // end code                                                                                               // 829
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {                                                 // 830
                buffer.put(0, 4);                                                                                     // 831
            }                                                                                                         // 832
                                                                                                                      // 833
            // padding                                                                                                // 834
            while (buffer.getLengthInBits() % 8 != 0) {                                                               // 835
                buffer.putBit(false);                                                                                 // 836
            }                                                                                                         // 837
                                                                                                                      // 838
            // padding                                                                                                // 839
            while (true) {                                                                                            // 840
                                                                                                                      // 841
                if (buffer.getLengthInBits() >= totalDataCount * 8) {                                                 // 842
                    break;                                                                                            // 843
                }                                                                                                     // 844
                buffer.put(PAD0, 8);                                                                                  // 845
                                                                                                                      // 846
                if (buffer.getLengthInBits() >= totalDataCount * 8) {                                                 // 847
                    break;                                                                                            // 848
                }                                                                                                     // 849
                buffer.put(PAD1, 8);                                                                                  // 850
            }                                                                                                         // 851
                                                                                                                      // 852
            return createBytes(buffer, rsBlocks);                                                                     // 853
        };                                                                                                            // 854
                                                                                                                      // 855
        _this.addData = function(data) {                                                                              // 856
            var newData = qr8BitByte(data);                                                                           // 857
            _dataList.push(newData);                                                                                  // 858
            _dataCache = null;                                                                                        // 859
        };                                                                                                            // 860
                                                                                                                      // 861
        _this.isDark = function(row, col) {                                                                           // 862
            if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {                                   // 863
                throw new Error(row + ',' + col);                                                                     // 864
            }                                                                                                         // 865
            return _modules[row][col];                                                                                // 866
        };                                                                                                            // 867
                                                                                                                      // 868
        _this.getModuleCount = function() {                                                                           // 869
            return _moduleCount;                                                                                      // 870
        };                                                                                                            // 871
                                                                                                                      // 872
        _this.make = function() {                                                                                     // 873
            makeImpl(false, getBestMaskPattern() );                                                                   // 874
        };                                                                                                            // 875
                                                                                                                      // 876
        _this.createTableTag = function(cellSize, margin) {                                                           // 877
                                                                                                                      // 878
            cellSize = cellSize || 2;                                                                                 // 879
            margin = (typeof margin == 'undefined')? cellSize * 4 : margin;                                           // 880
                                                                                                                      // 881
            var qrHtml = '';                                                                                          // 882
                                                                                                                      // 883
            qrHtml += '<table style="';                                                                               // 884
            qrHtml += ' border-width: 0px; border-style: none;';                                                      // 885
            qrHtml += ' border-collapse: collapse;';                                                                  // 886
            qrHtml += ' padding: 0px; margin: ' + margin + 'px;';                                                     // 887
            qrHtml += '">';                                                                                           // 888
            qrHtml += '<tbody>';                                                                                      // 889
                                                                                                                      // 890
            for (var r = 0; r < _this.getModuleCount(); r += 1) {                                                     // 891
                                                                                                                      // 892
                qrHtml += '<tr>';                                                                                     // 893
                                                                                                                      // 894
                for (var c = 0; c < _this.getModuleCount(); c += 1) {                                                 // 895
                    qrHtml += '<td style="';                                                                          // 896
                    qrHtml += ' border-width: 0px; border-style: none;';                                              // 897
                    qrHtml += ' border-collapse: collapse;';                                                          // 898
                    qrHtml += ' padding: 0px; margin: 0px;';                                                          // 899
                    qrHtml += ' width: ' + cellSize + 'px;';                                                          // 900
                    qrHtml += ' height: ' + cellSize + 'px;';                                                         // 901
                    qrHtml += ' background-color: ';                                                                  // 902
                    qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';                                              // 903
                    qrHtml += ';';                                                                                    // 904
                    qrHtml += '"/>';                                                                                  // 905
                }                                                                                                     // 906
                                                                                                                      // 907
                qrHtml += '</tr>';                                                                                    // 908
            }                                                                                                         // 909
                                                                                                                      // 910
            qrHtml += '</tbody>';                                                                                     // 911
            qrHtml += '</table>';                                                                                     // 912
                                                                                                                      // 913
            return qrHtml;                                                                                            // 914
        };                                                                                                            // 915
                                                                                                                      // 916
        _this.createImgTag = function(cellSize, margin) {                                                             // 917
                                                                                                                      // 918
            cellSize = cellSize || 2;                                                                                 // 919
            margin = (typeof margin == 'undefined')? cellSize * 4 : margin;                                           // 920
                                                                                                                      // 921
            var size = _this.getModuleCount() * cellSize + margin * 2;                                                // 922
            var min = margin;                                                                                         // 923
            var max = size - margin;                                                                                  // 924
                                                                                                                      // 925
            return createImgTag(size, size, function(x, y) {                                                          // 926
                if (min <= x && x < max && min <= y && y < max) {                                                     // 927
                    var c = Math.floor( (x - min) / cellSize);                                                        // 928
                    var r = Math.floor( (y - min) / cellSize);                                                        // 929
                    return _this.isDark(r, c)? 0 : 1;                                                                 // 930
                } else {                                                                                              // 931
                    return 1;                                                                                         // 932
                }                                                                                                     // 933
            } );                                                                                                      // 934
        };                                                                                                            // 935
                                                                                                                      // 936
        return _this;                                                                                                 // 937
    };                                                                                                                // 938
                                                                                                                      // 939
    //---------------------------------------------------------------------                                           // 940
    // qrcode.stringToBytes                                                                                           // 941
    //---------------------------------------------------------------------                                           // 942
                                                                                                                      // 943
    qrcode.stringToBytes = function(s) {                                                                              // 944
        var bytes = new Array();                                                                                      // 945
        for (var i = 0; i < s.length; i += 1) {                                                                       // 946
            var c = s.charCodeAt(i);                                                                                  // 947
            bytes.push(c & 0xff);                                                                                     // 948
        }                                                                                                             // 949
        return bytes;                                                                                                 // 950
    };                                                                                                                // 951
                                                                                                                      // 952
    //---------------------------------------------------------------------                                           // 953
    // qrcode.createStringToBytes                                                                                     // 954
    //---------------------------------------------------------------------                                           // 955
                                                                                                                      // 956
    /**                                                                                                               // 957
     * @param unicodeData base64 string of byte array.                                                                // 958
     * [16bit Unicode],[16bit Bytes], ...                                                                             // 959
     * @param numChars                                                                                                // 960
     */                                                                                                               // 961
    qrcode.createStringToBytes = function(unicodeData, numChars) {                                                    // 962
                                                                                                                      // 963
        // create conversion map.                                                                                     // 964
                                                                                                                      // 965
        var unicodeMap = function() {                                                                                 // 966
                                                                                                                      // 967
            var bin = base64DecodeInputStream(unicodeData);                                                           // 968
            var read = function() {                                                                                   // 969
                var b = bin.read();                                                                                   // 970
                if (b == -1) throw new Error();                                                                       // 971
                return b;                                                                                             // 972
            };                                                                                                        // 973
                                                                                                                      // 974
            var count = 0;                                                                                            // 975
            var unicodeMap = {};                                                                                      // 976
            while (true) {                                                                                            // 977
                var b0 = bin.read();                                                                                  // 978
                if (b0 == -1) break;                                                                                  // 979
                var b1 = read();                                                                                      // 980
                var b2 = read();                                                                                      // 981
                var b3 = read();                                                                                      // 982
                var k = String.fromCharCode( (b0 << 8) | b1);                                                         // 983
                var v = (b2 << 8) | b3;                                                                               // 984
                unicodeMap[k] = v;                                                                                    // 985
                count += 1;                                                                                           // 986
            }                                                                                                         // 987
            if (count != numChars) {                                                                                  // 988
                throw new Error(count + ' != ' + numChars);                                                           // 989
            }                                                                                                         // 990
                                                                                                                      // 991
            return unicodeMap;                                                                                        // 992
        }();                                                                                                          // 993
                                                                                                                      // 994
        var unknownChar = '?'.charCodeAt(0);                                                                          // 995
                                                                                                                      // 996
        return function(s) {                                                                                          // 997
            var bytes = new Array();                                                                                  // 998
            for (var i = 0; i < s.length; i += 1) {                                                                   // 999
                var c = s.charCodeAt(i);                                                                              // 1000
                if (c < 128) {                                                                                        // 1001
                    bytes.push(c);                                                                                    // 1002
                } else {                                                                                              // 1003
                    var b = unicodeMap[s.charAt(i)];                                                                  // 1004
                    if (typeof b == 'number') {                                                                       // 1005
                        if ( (b & 0xff) == b) {                                                                       // 1006
                            // 1byte                                                                                  // 1007
                            bytes.push(b);                                                                            // 1008
                        } else {                                                                                      // 1009
                            // 2bytes                                                                                 // 1010
                            bytes.push(b >>> 8);                                                                      // 1011
                            bytes.push(b & 0xff);                                                                     // 1012
                        }                                                                                             // 1013
                    } else {                                                                                          // 1014
                        bytes.push(unknownChar);                                                                      // 1015
                    }                                                                                                 // 1016
                }                                                                                                     // 1017
            }                                                                                                         // 1018
            return bytes;                                                                                             // 1019
        };                                                                                                            // 1020
    };                                                                                                                // 1021
                                                                                                                      // 1022
    //---------------------------------------------------------------------                                           // 1023
    // QRMode                                                                                                         // 1024
    //---------------------------------------------------------------------                                           // 1025
                                                                                                                      // 1026
    var QRMode = {                                                                                                    // 1027
        MODE_NUMBER :       1 << 0,                                                                                   // 1028
        MODE_ALPHA_NUM :    1 << 1,                                                                                   // 1029
        MODE_8BIT_BYTE :    1 << 2,                                                                                   // 1030
        MODE_KANJI :        1 << 3                                                                                    // 1031
    };                                                                                                                // 1032
                                                                                                                      // 1033
    //---------------------------------------------------------------------                                           // 1034
    // QRErrorCorrectLevel                                                                                            // 1035
    //---------------------------------------------------------------------                                           // 1036
                                                                                                                      // 1037
    var QRErrorCorrectLevel = {                                                                                       // 1038
        L : 1,                                                                                                        // 1039
        M : 0,                                                                                                        // 1040
        Q : 3,                                                                                                        // 1041
        H : 2                                                                                                         // 1042
    };                                                                                                                // 1043
                                                                                                                      // 1044
    //---------------------------------------------------------------------                                           // 1045
    // QRMaskPattern                                                                                                  // 1046
    //---------------------------------------------------------------------                                           // 1047
                                                                                                                      // 1048
    var QRMaskPattern = {                                                                                             // 1049
        PATTERN000 : 0,                                                                                               // 1050
        PATTERN001 : 1,                                                                                               // 1051
        PATTERN010 : 2,                                                                                               // 1052
        PATTERN011 : 3,                                                                                               // 1053
        PATTERN100 : 4,                                                                                               // 1054
        PATTERN101 : 5,                                                                                               // 1055
        PATTERN110 : 6,                                                                                               // 1056
        PATTERN111 : 7                                                                                                // 1057
    };                                                                                                                // 1058
                                                                                                                      // 1059
    //---------------------------------------------------------------------                                           // 1060
    // QRUtil                                                                                                         // 1061
    //---------------------------------------------------------------------                                           // 1062
                                                                                                                      // 1063
    var QRUtil = function() {                                                                                         // 1064
                                                                                                                      // 1065
        var PATTERN_POSITION_TABLE = [                                                                                // 1066
            [],                                                                                                       // 1067
            [6, 18],                                                                                                  // 1068
            [6, 22],                                                                                                  // 1069
            [6, 26],                                                                                                  // 1070
            [6, 30],                                                                                                  // 1071
            [6, 34],                                                                                                  // 1072
            [6, 22, 38],                                                                                              // 1073
            [6, 24, 42],                                                                                              // 1074
            [6, 26, 46],                                                                                              // 1075
            [6, 28, 50],                                                                                              // 1076
            [6, 30, 54],                                                                                              // 1077
            [6, 32, 58],                                                                                              // 1078
            [6, 34, 62],                                                                                              // 1079
            [6, 26, 46, 66],                                                                                          // 1080
            [6, 26, 48, 70],                                                                                          // 1081
            [6, 26, 50, 74],                                                                                          // 1082
            [6, 30, 54, 78],                                                                                          // 1083
            [6, 30, 56, 82],                                                                                          // 1084
            [6, 30, 58, 86],                                                                                          // 1085
            [6, 34, 62, 90],                                                                                          // 1086
            [6, 28, 50, 72, 94],                                                                                      // 1087
            [6, 26, 50, 74, 98],                                                                                      // 1088
            [6, 30, 54, 78, 102],                                                                                     // 1089
            [6, 28, 54, 80, 106],                                                                                     // 1090
            [6, 32, 58, 84, 110],                                                                                     // 1091
            [6, 30, 58, 86, 114],                                                                                     // 1092
            [6, 34, 62, 90, 118],                                                                                     // 1093
            [6, 26, 50, 74, 98, 122],                                                                                 // 1094
            [6, 30, 54, 78, 102, 126],                                                                                // 1095
            [6, 26, 52, 78, 104, 130],                                                                                // 1096
            [6, 30, 56, 82, 108, 134],                                                                                // 1097
            [6, 34, 60, 86, 112, 138],                                                                                // 1098
            [6, 30, 58, 86, 114, 142],                                                                                // 1099
            [6, 34, 62, 90, 118, 146],                                                                                // 1100
            [6, 30, 54, 78, 102, 126, 150],                                                                           // 1101
            [6, 24, 50, 76, 102, 128, 154],                                                                           // 1102
            [6, 28, 54, 80, 106, 132, 158],                                                                           // 1103
            [6, 32, 58, 84, 110, 136, 162],                                                                           // 1104
            [6, 26, 54, 82, 110, 138, 166],                                                                           // 1105
            [6, 30, 58, 86, 114, 142, 170]                                                                            // 1106
        ];                                                                                                            // 1107
        var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);                        // 1108
        var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);           // 1109
        var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);                                       // 1110
                                                                                                                      // 1111
        var _this = {};                                                                                               // 1112
                                                                                                                      // 1113
        var getBCHDigit = function(data) {                                                                            // 1114
            var digit = 0;                                                                                            // 1115
            while (data != 0) {                                                                                       // 1116
                digit += 1;                                                                                           // 1117
                data >>>= 1;                                                                                          // 1118
            }                                                                                                         // 1119
            return digit;                                                                                             // 1120
        };                                                                                                            // 1121
                                                                                                                      // 1122
        _this.getBCHTypeInfo = function(data) {                                                                       // 1123
            var d = data << 10;                                                                                       // 1124
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {                                                          // 1125
                d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );                                                  // 1126
            }                                                                                                         // 1127
            return ( (data << 10) | d) ^ G15_MASK;                                                                    // 1128
        };                                                                                                            // 1129
                                                                                                                      // 1130
        _this.getBCHTypeNumber = function(data) {                                                                     // 1131
            var d = data << 12;                                                                                       // 1132
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {                                                          // 1133
                d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );                                                  // 1134
            }                                                                                                         // 1135
            return (data << 12) | d;                                                                                  // 1136
        };                                                                                                            // 1137
                                                                                                                      // 1138
        _this.getPatternPosition = function(typeNumber) {                                                             // 1139
            return PATTERN_POSITION_TABLE[typeNumber - 1];                                                            // 1140
        };                                                                                                            // 1141
                                                                                                                      // 1142
        _this.getMaskFunction = function(maskPattern) {                                                               // 1143
                                                                                                                      // 1144
            switch (maskPattern) {                                                                                    // 1145
                                                                                                                      // 1146
            case QRMaskPattern.PATTERN000 :                                                                           // 1147
                return function(i, j) { return (i + j) % 2 == 0; };                                                   // 1148
            case QRMaskPattern.PATTERN001 :                                                                           // 1149
                return function(i, j) { return i % 2 == 0; };                                                         // 1150
            case QRMaskPattern.PATTERN010 :                                                                           // 1151
                return function(i, j) { return j % 3 == 0; };                                                         // 1152
            case QRMaskPattern.PATTERN011 :                                                                           // 1153
                return function(i, j) { return (i + j) % 3 == 0; };                                                   // 1154
            case QRMaskPattern.PATTERN100 :                                                                           // 1155
                return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };                  // 1156
            case QRMaskPattern.PATTERN101 :                                                                           // 1157
                return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };                                     // 1158
            case QRMaskPattern.PATTERN110 :                                                                           // 1159
                return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };                              // 1160
            case QRMaskPattern.PATTERN111 :                                                                           // 1161
                return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };                              // 1162
                                                                                                                      // 1163
            default :                                                                                                 // 1164
                throw new Error('bad maskPattern:' + maskPattern);                                                    // 1165
            }                                                                                                         // 1166
        };                                                                                                            // 1167
                                                                                                                      // 1168
        _this.getErrorCorrectPolynomial = function(errorCorrectLength) {                                              // 1169
            var a = qrPolynomial([1], 0);                                                                             // 1170
            for (var i = 0; i < errorCorrectLength; i += 1) {                                                         // 1171
                a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );                                                // 1172
            }                                                                                                         // 1173
            return a;                                                                                                 // 1174
        };                                                                                                            // 1175
                                                                                                                      // 1176
        _this.getLengthInBits = function(mode, type) {                                                                // 1177
                                                                                                                      // 1178
            if (1 <= type && type < 10) {                                                                             // 1179
                                                                                                                      // 1180
                // 1 - 9                                                                                              // 1181
                                                                                                                      // 1182
                switch(mode) {                                                                                        // 1183
                case QRMode.MODE_NUMBER     : return 10;                                                              // 1184
                case QRMode.MODE_ALPHA_NUM  : return 9;                                                               // 1185
                case QRMode.MODE_8BIT_BYTE  : return 8;                                                               // 1186
                case QRMode.MODE_KANJI      : return 8;                                                               // 1187
                default :                                                                                             // 1188
                    throw new Error('mode:' + mode);                                                                  // 1189
                }                                                                                                     // 1190
                                                                                                                      // 1191
            } else if (type < 27) {                                                                                   // 1192
                                                                                                                      // 1193
                // 10 - 26                                                                                            // 1194
                                                                                                                      // 1195
                switch(mode) {                                                                                        // 1196
                case QRMode.MODE_NUMBER     : return 12;                                                              // 1197
                case QRMode.MODE_ALPHA_NUM  : return 11;                                                              // 1198
                case QRMode.MODE_8BIT_BYTE  : return 16;                                                              // 1199
                case QRMode.MODE_KANJI      : return 10;                                                              // 1200
                default :                                                                                             // 1201
                    throw new Error('mode:' + mode);                                                                  // 1202
                }                                                                                                     // 1203
                                                                                                                      // 1204
            } else if (type < 41) {                                                                                   // 1205
                                                                                                                      // 1206
                // 27 - 40                                                                                            // 1207
                                                                                                                      // 1208
                switch(mode) {                                                                                        // 1209
                case QRMode.MODE_NUMBER     : return 14;                                                              // 1210
                case QRMode.MODE_ALPHA_NUM  : return 13;                                                              // 1211
                case QRMode.MODE_8BIT_BYTE  : return 16;                                                              // 1212
                case QRMode.MODE_KANJI      : return 12;                                                              // 1213
                default :                                                                                             // 1214
                    throw new Error('mode:' + mode);                                                                  // 1215
                }                                                                                                     // 1216
                                                                                                                      // 1217
            } else {                                                                                                  // 1218
                throw new Error('type:' + type);                                                                      // 1219
            }                                                                                                         // 1220
        };                                                                                                            // 1221
                                                                                                                      // 1222
        _this.getLostPoint = function(qrcode) {                                                                       // 1223
                                                                                                                      // 1224
            var moduleCount = qrcode.getModuleCount();                                                                // 1225
                                                                                                                      // 1226
            var lostPoint = 0;                                                                                        // 1227
                                                                                                                      // 1228
            // LEVEL1                                                                                                 // 1229
                                                                                                                      // 1230
            for (var row = 0; row < moduleCount; row += 1) {                                                          // 1231
                for (var col = 0; col < moduleCount; col += 1) {                                                      // 1232
                                                                                                                      // 1233
                    var sameCount = 0;                                                                                // 1234
                    var dark = qrcode.isDark(row, col);                                                               // 1235
                                                                                                                      // 1236
                    for (var r = -1; r <= 1; r += 1) {                                                                // 1237
                                                                                                                      // 1238
                        if (row + r < 0 || moduleCount <= row + r) {                                                  // 1239
                            continue;                                                                                 // 1240
                        }                                                                                             // 1241
                                                                                                                      // 1242
                        for (var c = -1; c <= 1; c += 1) {                                                            // 1243
                                                                                                                      // 1244
                            if (col + c < 0 || moduleCount <= col + c) {                                              // 1245
                                continue;                                                                             // 1246
                            }                                                                                         // 1247
                                                                                                                      // 1248
                            if (r == 0 && c == 0) {                                                                   // 1249
                                continue;                                                                             // 1250
                            }                                                                                         // 1251
                                                                                                                      // 1252
                            if (dark == qrcode.isDark(row + r, col + c) ) {                                           // 1253
                                sameCount += 1;                                                                       // 1254
                            }                                                                                         // 1255
                        }                                                                                             // 1256
                    }                                                                                                 // 1257
                                                                                                                      // 1258
                    if (sameCount > 5) {                                                                              // 1259
                        lostPoint += (3 + sameCount - 5);                                                             // 1260
                    }                                                                                                 // 1261
                }                                                                                                     // 1262
            };                                                                                                        // 1263
                                                                                                                      // 1264
            // LEVEL2                                                                                                 // 1265
                                                                                                                      // 1266
            for (var row = 0; row < moduleCount - 1; row += 1) {                                                      // 1267
                for (var col = 0; col < moduleCount - 1; col += 1) {                                                  // 1268
                    var count = 0;                                                                                    // 1269
                    if (qrcode.isDark(row, col) ) count += 1;                                                         // 1270
                    if (qrcode.isDark(row + 1, col) ) count += 1;                                                     // 1271
                    if (qrcode.isDark(row, col + 1) ) count += 1;                                                     // 1272
                    if (qrcode.isDark(row + 1, col + 1) ) count += 1;                                                 // 1273
                    if (count == 0 || count == 4) {                                                                   // 1274
                        lostPoint += 3;                                                                               // 1275
                    }                                                                                                 // 1276
                }                                                                                                     // 1277
            }                                                                                                         // 1278
                                                                                                                      // 1279
            // LEVEL3                                                                                                 // 1280
                                                                                                                      // 1281
            for (var row = 0; row < moduleCount; row += 1) {                                                          // 1282
                for (var col = 0; col < moduleCount - 6; col += 1) {                                                  // 1283
                    if (qrcode.isDark(row, col)                                                                       // 1284
                            && !qrcode.isDark(row, col + 1)                                                           // 1285
                            &&  qrcode.isDark(row, col + 2)                                                           // 1286
                            &&  qrcode.isDark(row, col + 3)                                                           // 1287
                            &&  qrcode.isDark(row, col + 4)                                                           // 1288
                            && !qrcode.isDark(row, col + 5)                                                           // 1289
                            &&  qrcode.isDark(row, col + 6) ) {                                                       // 1290
                        lostPoint += 40;                                                                              // 1291
                    }                                                                                                 // 1292
                }                                                                                                     // 1293
            }                                                                                                         // 1294
                                                                                                                      // 1295
            for (var col = 0; col < moduleCount; col += 1) {                                                          // 1296
                for (var row = 0; row < moduleCount - 6; row += 1) {                                                  // 1297
                    if (qrcode.isDark(row, col)                                                                       // 1298
                            && !qrcode.isDark(row + 1, col)                                                           // 1299
                            &&  qrcode.isDark(row + 2, col)                                                           // 1300
                            &&  qrcode.isDark(row + 3, col)                                                           // 1301
                            &&  qrcode.isDark(row + 4, col)                                                           // 1302
                            && !qrcode.isDark(row + 5, col)                                                           // 1303
                            &&  qrcode.isDark(row + 6, col) ) {                                                       // 1304
                        lostPoint += 40;                                                                              // 1305
                    }                                                                                                 // 1306
                }                                                                                                     // 1307
            }                                                                                                         // 1308
                                                                                                                      // 1309
            // LEVEL4                                                                                                 // 1310
                                                                                                                      // 1311
            var darkCount = 0;                                                                                        // 1312
                                                                                                                      // 1313
            for (var col = 0; col < moduleCount; col += 1) {                                                          // 1314
                for (var row = 0; row < moduleCount; row += 1) {                                                      // 1315
                    if (qrcode.isDark(row, col) ) {                                                                   // 1316
                        darkCount += 1;                                                                               // 1317
                    }                                                                                                 // 1318
                }                                                                                                     // 1319
            }                                                                                                         // 1320
                                                                                                                      // 1321
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;                               // 1322
            lostPoint += ratio * 10;                                                                                  // 1323
                                                                                                                      // 1324
            return lostPoint;                                                                                         // 1325
        };                                                                                                            // 1326
                                                                                                                      // 1327
        return _this;                                                                                                 // 1328
    }();                                                                                                              // 1329
                                                                                                                      // 1330
    //---------------------------------------------------------------------                                           // 1331
    // QRMath                                                                                                         // 1332
    //---------------------------------------------------------------------                                           // 1333
                                                                                                                      // 1334
    var QRMath = function() {                                                                                         // 1335
                                                                                                                      // 1336
        var EXP_TABLE = new Array(256);                                                                               // 1337
        var LOG_TABLE = new Array(256);                                                                               // 1338
                                                                                                                      // 1339
        // initialize tables                                                                                          // 1340
        for (var i = 0; i < 8; i += 1) {                                                                              // 1341
            EXP_TABLE[i] = 1 << i;                                                                                    // 1342
        }                                                                                                             // 1343
        for (var i = 8; i < 256; i += 1) {                                                                            // 1344
            EXP_TABLE[i] = EXP_TABLE[i - 4]                                                                           // 1345
                ^ EXP_TABLE[i - 5]                                                                                    // 1346
                ^ EXP_TABLE[i - 6]                                                                                    // 1347
                ^ EXP_TABLE[i - 8];                                                                                   // 1348
        }                                                                                                             // 1349
        for (var i = 0; i < 255; i += 1) {                                                                            // 1350
            LOG_TABLE[EXP_TABLE[i] ] = i;                                                                             // 1351
        }                                                                                                             // 1352
                                                                                                                      // 1353
        var _this = {};                                                                                               // 1354
                                                                                                                      // 1355
        _this.glog = function(n) {                                                                                    // 1356
                                                                                                                      // 1357
            if (n < 1) {                                                                                              // 1358
                throw new Error('glog(' + n + ')');                                                                   // 1359
            }                                                                                                         // 1360
                                                                                                                      // 1361
            return LOG_TABLE[n];                                                                                      // 1362
        };                                                                                                            // 1363
                                                                                                                      // 1364
        _this.gexp = function(n) {                                                                                    // 1365
                                                                                                                      // 1366
            while (n < 0) {                                                                                           // 1367
                n += 255;                                                                                             // 1368
            }                                                                                                         // 1369
                                                                                                                      // 1370
            while (n >= 256) {                                                                                        // 1371
                n -= 255;                                                                                             // 1372
            }                                                                                                         // 1373
                                                                                                                      // 1374
            return EXP_TABLE[n];                                                                                      // 1375
        };                                                                                                            // 1376
                                                                                                                      // 1377
        return _this;                                                                                                 // 1378
    }();                                                                                                              // 1379
                                                                                                                      // 1380
    //---------------------------------------------------------------------                                           // 1381
    // qrPolynomial                                                                                                   // 1382
    //---------------------------------------------------------------------                                           // 1383
                                                                                                                      // 1384
    function qrPolynomial(num, shift) {                                                                               // 1385
                                                                                                                      // 1386
        if (typeof num.length == 'undefined') {                                                                       // 1387
            throw new Error(num.length + '/' + shift);                                                                // 1388
        }                                                                                                             // 1389
                                                                                                                      // 1390
        var _num = function() {                                                                                       // 1391
            var offset = 0;                                                                                           // 1392
            while (offset < num.length && num[offset] == 0) {                                                         // 1393
                offset += 1;                                                                                          // 1394
            }                                                                                                         // 1395
            var _num = new Array(num.length - offset + shift);                                                        // 1396
            for (var i = 0; i < num.length - offset; i += 1) {                                                        // 1397
                _num[i] = num[i + offset];                                                                            // 1398
            }                                                                                                         // 1399
            return _num;                                                                                              // 1400
        }();                                                                                                          // 1401
                                                                                                                      // 1402
        var _this = {};                                                                                               // 1403
                                                                                                                      // 1404
        _this.get = function(index) {                                                                                 // 1405
            return _num[index];                                                                                       // 1406
        };                                                                                                            // 1407
                                                                                                                      // 1408
        _this.getLength = function() {                                                                                // 1409
            return _num.length;                                                                                       // 1410
        };                                                                                                            // 1411
                                                                                                                      // 1412
        _this.multiply = function(e) {                                                                                // 1413
                                                                                                                      // 1414
            var num = new Array(_this.getLength() + e.getLength() - 1);                                               // 1415
                                                                                                                      // 1416
            for (var i = 0; i < _this.getLength(); i += 1) {                                                          // 1417
                for (var j = 0; j < e.getLength(); j += 1) {                                                          // 1418
                    num[i + j] ^= QRMath.gexp(QRMath.glog(_this.get(i) ) + QRMath.glog(e.get(j) ) );                  // 1419
                }                                                                                                     // 1420
            }                                                                                                         // 1421
                                                                                                                      // 1422
            return qrPolynomial(num, 0);                                                                              // 1423
        };                                                                                                            // 1424
                                                                                                                      // 1425
        _this.mod = function(e) {                                                                                     // 1426
                                                                                                                      // 1427
            if (_this.getLength() - e.getLength() < 0) {                                                              // 1428
                return _this;                                                                                         // 1429
            }                                                                                                         // 1430
                                                                                                                      // 1431
            var ratio = QRMath.glog(_this.get(0) ) - QRMath.glog(e.get(0) );                                          // 1432
                                                                                                                      // 1433
            var num = new Array(_this.getLength() );                                                                  // 1434
            for (var i = 0; i < _this.getLength(); i += 1) {                                                          // 1435
                num[i] = _this.get(i);                                                                                // 1436
            }                                                                                                         // 1437
                                                                                                                      // 1438
            for (var i = 0; i < e.getLength(); i += 1) {                                                              // 1439
                num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);                                                // 1440
            }                                                                                                         // 1441
                                                                                                                      // 1442
            // recursive call                                                                                         // 1443
            return qrPolynomial(num, 0).mod(e);                                                                       // 1444
        };                                                                                                            // 1445
                                                                                                                      // 1446
        return _this;                                                                                                 // 1447
    };                                                                                                                // 1448
                                                                                                                      // 1449
    //---------------------------------------------------------------------                                           // 1450
    // QRRSBlock                                                                                                      // 1451
    //---------------------------------------------------------------------                                           // 1452
                                                                                                                      // 1453
    var QRRSBlock = function() {                                                                                      // 1454
                                                                                                                      // 1455
        var RS_BLOCK_TABLE = [                                                                                        // 1456
                                                                                                                      // 1457
            // L                                                                                                      // 1458
            // M                                                                                                      // 1459
            // Q                                                                                                      // 1460
            // H                                                                                                      // 1461
                                                                                                                      // 1462
            // 1                                                                                                      // 1463
            [1, 26, 19],                                                                                              // 1464
            [1, 26, 16],                                                                                              // 1465
            [1, 26, 13],                                                                                              // 1466
            [1, 26, 9],                                                                                               // 1467
                                                                                                                      // 1468
            // 2                                                                                                      // 1469
            [1, 44, 34],                                                                                              // 1470
            [1, 44, 28],                                                                                              // 1471
            [1, 44, 22],                                                                                              // 1472
            [1, 44, 16],                                                                                              // 1473
                                                                                                                      // 1474
            // 3                                                                                                      // 1475
            [1, 70, 55],                                                                                              // 1476
            [1, 70, 44],                                                                                              // 1477
            [2, 35, 17],                                                                                              // 1478
            [2, 35, 13],                                                                                              // 1479
                                                                                                                      // 1480
            // 4                                                                                                      // 1481
            [1, 100, 80],                                                                                             // 1482
            [2, 50, 32],                                                                                              // 1483
            [2, 50, 24],                                                                                              // 1484
            [4, 25, 9],                                                                                               // 1485
                                                                                                                      // 1486
            // 5                                                                                                      // 1487
            [1, 134, 108],                                                                                            // 1488
            [2, 67, 43],                                                                                              // 1489
            [2, 33, 15, 2, 34, 16],                                                                                   // 1490
            [2, 33, 11, 2, 34, 12],                                                                                   // 1491
                                                                                                                      // 1492
            // 6                                                                                                      // 1493
            [2, 86, 68],                                                                                              // 1494
            [4, 43, 27],                                                                                              // 1495
            [4, 43, 19],                                                                                              // 1496
            [4, 43, 15],                                                                                              // 1497
                                                                                                                      // 1498
            // 7                                                                                                      // 1499
            [2, 98, 78],                                                                                              // 1500
            [4, 49, 31],                                                                                              // 1501
            [2, 32, 14, 4, 33, 15],                                                                                   // 1502
            [4, 39, 13, 1, 40, 14],                                                                                   // 1503
                                                                                                                      // 1504
            // 8                                                                                                      // 1505
            [2, 121, 97],                                                                                             // 1506
            [2, 60, 38, 2, 61, 39],                                                                                   // 1507
            [4, 40, 18, 2, 41, 19],                                                                                   // 1508
            [4, 40, 14, 2, 41, 15],                                                                                   // 1509
                                                                                                                      // 1510
            // 9                                                                                                      // 1511
            [2, 146, 116],                                                                                            // 1512
            [3, 58, 36, 2, 59, 37],                                                                                   // 1513
            [4, 36, 16, 4, 37, 17],                                                                                   // 1514
            [4, 36, 12, 4, 37, 13],                                                                                   // 1515
                                                                                                                      // 1516
            // 10                                                                                                     // 1517
            [2, 86, 68, 2, 87, 69],                                                                                   // 1518
            [4, 69, 43, 1, 70, 44],                                                                                   // 1519
            [6, 43, 19, 2, 44, 20],                                                                                   // 1520
            [6, 43, 15, 2, 44, 16],                                                                                   // 1521
                                                                                                                      // 1522
            // 11                                                                                                     // 1523
            [4, 101, 81],                                                                                             // 1524
            [1, 80, 50, 4, 81, 51],                                                                                   // 1525
            [4, 50, 22, 4, 51, 23],                                                                                   // 1526
            [3, 36, 12, 8, 37, 13],                                                                                   // 1527
                                                                                                                      // 1528
            // 12                                                                                                     // 1529
            [2, 116, 92, 2, 117, 93],                                                                                 // 1530
            [6, 58, 36, 2, 59, 37],                                                                                   // 1531
            [4, 46, 20, 6, 47, 21],                                                                                   // 1532
            [7, 42, 14, 4, 43, 15],                                                                                   // 1533
                                                                                                                      // 1534
            // 13                                                                                                     // 1535
            [4, 133, 107],                                                                                            // 1536
            [8, 59, 37, 1, 60, 38],                                                                                   // 1537
            [8, 44, 20, 4, 45, 21],                                                                                   // 1538
            [12, 33, 11, 4, 34, 12],                                                                                  // 1539
                                                                                                                      // 1540
            // 14                                                                                                     // 1541
            [3, 145, 115, 1, 146, 116],                                                                               // 1542
            [4, 64, 40, 5, 65, 41],                                                                                   // 1543
            [11, 36, 16, 5, 37, 17],                                                                                  // 1544
            [11, 36, 12, 5, 37, 13],                                                                                  // 1545
                                                                                                                      // 1546
            // 15                                                                                                     // 1547
            [5, 109, 87, 1, 110, 88],                                                                                 // 1548
            [5, 65, 41, 5, 66, 42],                                                                                   // 1549
            [5, 54, 24, 7, 55, 25],                                                                                   // 1550
            [11, 36, 12],                                                                                             // 1551
                                                                                                                      // 1552
            // 16                                                                                                     // 1553
            [5, 122, 98, 1, 123, 99],                                                                                 // 1554
            [7, 73, 45, 3, 74, 46],                                                                                   // 1555
            [15, 43, 19, 2, 44, 20],                                                                                  // 1556
            [3, 45, 15, 13, 46, 16],                                                                                  // 1557
                                                                                                                      // 1558
            // 17                                                                                                     // 1559
            [1, 135, 107, 5, 136, 108],                                                                               // 1560
            [10, 74, 46, 1, 75, 47],                                                                                  // 1561
            [1, 50, 22, 15, 51, 23],                                                                                  // 1562
            [2, 42, 14, 17, 43, 15],                                                                                  // 1563
                                                                                                                      // 1564
            // 18                                                                                                     // 1565
            [5, 150, 120, 1, 151, 121],                                                                               // 1566
            [9, 69, 43, 4, 70, 44],                                                                                   // 1567
            [17, 50, 22, 1, 51, 23],                                                                                  // 1568
            [2, 42, 14, 19, 43, 15],                                                                                  // 1569
                                                                                                                      // 1570
            // 19                                                                                                     // 1571
            [3, 141, 113, 4, 142, 114],                                                                               // 1572
            [3, 70, 44, 11, 71, 45],                                                                                  // 1573
            [17, 47, 21, 4, 48, 22],                                                                                  // 1574
            [9, 39, 13, 16, 40, 14],                                                                                  // 1575
                                                                                                                      // 1576
            // 20                                                                                                     // 1577
            [3, 135, 107, 5, 136, 108],                                                                               // 1578
            [3, 67, 41, 13, 68, 42],                                                                                  // 1579
            [15, 54, 24, 5, 55, 25],                                                                                  // 1580
            [15, 43, 15, 10, 44, 16],                                                                                 // 1581
                                                                                                                      // 1582
            // 21                                                                                                     // 1583
            [4, 144, 116, 4, 145, 117],                                                                               // 1584
            [17, 68, 42],                                                                                             // 1585
            [17, 50, 22, 6, 51, 23],                                                                                  // 1586
            [19, 46, 16, 6, 47, 17],                                                                                  // 1587
                                                                                                                      // 1588
            // 22                                                                                                     // 1589
            [2, 139, 111, 7, 140, 112],                                                                               // 1590
            [17, 74, 46],                                                                                             // 1591
            [7, 54, 24, 16, 55, 25],                                                                                  // 1592
            [34, 37, 13],                                                                                             // 1593
                                                                                                                      // 1594
            // 23                                                                                                     // 1595
            [4, 151, 121, 5, 152, 122],                                                                               // 1596
            [4, 75, 47, 14, 76, 48],                                                                                  // 1597
            [11, 54, 24, 14, 55, 25],                                                                                 // 1598
            [16, 45, 15, 14, 46, 16],                                                                                 // 1599
                                                                                                                      // 1600
            // 24                                                                                                     // 1601
            [6, 147, 117, 4, 148, 118],                                                                               // 1602
            [6, 73, 45, 14, 74, 46],                                                                                  // 1603
            [11, 54, 24, 16, 55, 25],                                                                                 // 1604
            [30, 46, 16, 2, 47, 17],                                                                                  // 1605
                                                                                                                      // 1606
            // 25                                                                                                     // 1607
            [8, 132, 106, 4, 133, 107],                                                                               // 1608
            [8, 75, 47, 13, 76, 48],                                                                                  // 1609
            [7, 54, 24, 22, 55, 25],                                                                                  // 1610
            [22, 45, 15, 13, 46, 16],                                                                                 // 1611
                                                                                                                      // 1612
            // 26                                                                                                     // 1613
            [10, 142, 114, 2, 143, 115],                                                                              // 1614
            [19, 74, 46, 4, 75, 47],                                                                                  // 1615
            [28, 50, 22, 6, 51, 23],                                                                                  // 1616
            [33, 46, 16, 4, 47, 17],                                                                                  // 1617
                                                                                                                      // 1618
            // 27                                                                                                     // 1619
            [8, 152, 122, 4, 153, 123],                                                                               // 1620
            [22, 73, 45, 3, 74, 46],                                                                                  // 1621
            [8, 53, 23, 26, 54, 24],                                                                                  // 1622
            [12, 45, 15, 28, 46, 16],                                                                                 // 1623
                                                                                                                      // 1624
            // 28                                                                                                     // 1625
            [3, 147, 117, 10, 148, 118],                                                                              // 1626
            [3, 73, 45, 23, 74, 46],                                                                                  // 1627
            [4, 54, 24, 31, 55, 25],                                                                                  // 1628
            [11, 45, 15, 31, 46, 16],                                                                                 // 1629
                                                                                                                      // 1630
            // 29                                                                                                     // 1631
            [7, 146, 116, 7, 147, 117],                                                                               // 1632
            [21, 73, 45, 7, 74, 46],                                                                                  // 1633
            [1, 53, 23, 37, 54, 24],                                                                                  // 1634
            [19, 45, 15, 26, 46, 16],                                                                                 // 1635
                                                                                                                      // 1636
            // 30                                                                                                     // 1637
            [5, 145, 115, 10, 146, 116],                                                                              // 1638
            [19, 75, 47, 10, 76, 48],                                                                                 // 1639
            [15, 54, 24, 25, 55, 25],                                                                                 // 1640
            [23, 45, 15, 25, 46, 16],                                                                                 // 1641
                                                                                                                      // 1642
            // 31                                                                                                     // 1643
            [13, 145, 115, 3, 146, 116],                                                                              // 1644
            [2, 74, 46, 29, 75, 47],                                                                                  // 1645
            [42, 54, 24, 1, 55, 25],                                                                                  // 1646
            [23, 45, 15, 28, 46, 16],                                                                                 // 1647
                                                                                                                      // 1648
            // 32                                                                                                     // 1649
            [17, 145, 115],                                                                                           // 1650
            [10, 74, 46, 23, 75, 47],                                                                                 // 1651
            [10, 54, 24, 35, 55, 25],                                                                                 // 1652
            [19, 45, 15, 35, 46, 16],                                                                                 // 1653
                                                                                                                      // 1654
            // 33                                                                                                     // 1655
            [17, 145, 115, 1, 146, 116],                                                                              // 1656
            [14, 74, 46, 21, 75, 47],                                                                                 // 1657
            [29, 54, 24, 19, 55, 25],                                                                                 // 1658
            [11, 45, 15, 46, 46, 16],                                                                                 // 1659
                                                                                                                      // 1660
            // 34                                                                                                     // 1661
            [13, 145, 115, 6, 146, 116],                                                                              // 1662
            [14, 74, 46, 23, 75, 47],                                                                                 // 1663
            [44, 54, 24, 7, 55, 25],                                                                                  // 1664
            [59, 46, 16, 1, 47, 17],                                                                                  // 1665
                                                                                                                      // 1666
            // 35                                                                                                     // 1667
            [12, 151, 121, 7, 152, 122],                                                                              // 1668
            [12, 75, 47, 26, 76, 48],                                                                                 // 1669
            [39, 54, 24, 14, 55, 25],                                                                                 // 1670
            [22, 45, 15, 41, 46, 16],                                                                                 // 1671
                                                                                                                      // 1672
            // 36                                                                                                     // 1673
            [6, 151, 121, 14, 152, 122],                                                                              // 1674
            [6, 75, 47, 34, 76, 48],                                                                                  // 1675
            [46, 54, 24, 10, 55, 25],                                                                                 // 1676
            [2, 45, 15, 64, 46, 16],                                                                                  // 1677
                                                                                                                      // 1678
            // 37                                                                                                     // 1679
            [17, 152, 122, 4, 153, 123],                                                                              // 1680
            [29, 74, 46, 14, 75, 47],                                                                                 // 1681
            [49, 54, 24, 10, 55, 25],                                                                                 // 1682
            [24, 45, 15, 46, 46, 16],                                                                                 // 1683
                                                                                                                      // 1684
            // 38                                                                                                     // 1685
            [4, 152, 122, 18, 153, 123],                                                                              // 1686
            [13, 74, 46, 32, 75, 47],                                                                                 // 1687
            [48, 54, 24, 14, 55, 25],                                                                                 // 1688
            [42, 45, 15, 32, 46, 16],                                                                                 // 1689
                                                                                                                      // 1690
            // 39                                                                                                     // 1691
            [20, 147, 117, 4, 148, 118],                                                                              // 1692
            [40, 75, 47, 7, 76, 48],                                                                                  // 1693
            [43, 54, 24, 22, 55, 25],                                                                                 // 1694
            [10, 45, 15, 67, 46, 16],                                                                                 // 1695
                                                                                                                      // 1696
            // 40                                                                                                     // 1697
            [19, 148, 118, 6, 149, 119],                                                                              // 1698
            [18, 75, 47, 31, 76, 48],                                                                                 // 1699
            [34, 54, 24, 34, 55, 25],                                                                                 // 1700
            [20, 45, 15, 61, 46, 16]                                                                                  // 1701
        ];                                                                                                            // 1702
                                                                                                                      // 1703
        var qrRSBlock = function(totalCount, dataCount) {                                                             // 1704
            var _this = {};                                                                                           // 1705
            _this.totalCount = totalCount;                                                                            // 1706
            _this.dataCount = dataCount;                                                                              // 1707
            return _this;                                                                                             // 1708
        };                                                                                                            // 1709
                                                                                                                      // 1710
        var _this = {};                                                                                               // 1711
                                                                                                                      // 1712
        var getRsBlockTable = function(typeNumber, errorCorrectLevel) {                                               // 1713
                                                                                                                      // 1714
            switch(errorCorrectLevel) {                                                                               // 1715
            case QRErrorCorrectLevel.L :                                                                              // 1716
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];                                                      // 1717
            case QRErrorCorrectLevel.M :                                                                              // 1718
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];                                                      // 1719
            case QRErrorCorrectLevel.Q :                                                                              // 1720
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];                                                      // 1721
            case QRErrorCorrectLevel.H :                                                                              // 1722
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];                                                      // 1723
            default :                                                                                                 // 1724
                return undefined;                                                                                     // 1725
            }                                                                                                         // 1726
        };                                                                                                            // 1727
                                                                                                                      // 1728
        _this.getRSBlocks = function(typeNumber, errorCorrectLevel) {                                                 // 1729
                                                                                                                      // 1730
            var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);                                             // 1731
                                                                                                                      // 1732
            if (typeof rsBlock == 'undefined') {                                                                      // 1733
                throw new Error('bad rs block @ typeNumber:' + typeNumber +                                           // 1734
                        '/errorCorrectLevel:' + errorCorrectLevel);                                                   // 1735
            }                                                                                                         // 1736
                                                                                                                      // 1737
            var length = rsBlock.length / 3;                                                                          // 1738
                                                                                                                      // 1739
            var list = new Array();                                                                                   // 1740
                                                                                                                      // 1741
            for (var i = 0; i < length; i += 1) {                                                                     // 1742
                                                                                                                      // 1743
                var count = rsBlock[i * 3 + 0];                                                                       // 1744
                var totalCount = rsBlock[i * 3 + 1];                                                                  // 1745
                var dataCount = rsBlock[i * 3 + 2];                                                                   // 1746
                                                                                                                      // 1747
                for (var j = 0; j < count; j += 1) {                                                                  // 1748
                    list.push(qrRSBlock(totalCount, dataCount) );                                                     // 1749
                }                                                                                                     // 1750
            }                                                                                                         // 1751
                                                                                                                      // 1752
            return list;                                                                                              // 1753
        };                                                                                                            // 1754
                                                                                                                      // 1755
        return _this;                                                                                                 // 1756
    }();                                                                                                              // 1757
                                                                                                                      // 1758
    //---------------------------------------------------------------------                                           // 1759
    // qrBitBuffer                                                                                                    // 1760
    //---------------------------------------------------------------------                                           // 1761
                                                                                                                      // 1762
    var qrBitBuffer = function() {                                                                                    // 1763
                                                                                                                      // 1764
        var _buffer = new Array();                                                                                    // 1765
        var _length = 0;                                                                                              // 1766
                                                                                                                      // 1767
        var _this = {};                                                                                               // 1768
                                                                                                                      // 1769
        _this.getBuffer = function() {                                                                                // 1770
            return _buffer;                                                                                           // 1771
        };                                                                                                            // 1772
                                                                                                                      // 1773
        _this.get = function(index) {                                                                                 // 1774
            var bufIndex = Math.floor(index / 8);                                                                     // 1775
            return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;                                              // 1776
        };                                                                                                            // 1777
                                                                                                                      // 1778
        _this.put = function(num, length) {                                                                           // 1779
            for (var i = 0; i < length; i += 1) {                                                                     // 1780
                _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);                                               // 1781
            }                                                                                                         // 1782
        };                                                                                                            // 1783
                                                                                                                      // 1784
        _this.getLengthInBits = function() {                                                                          // 1785
            return _length;                                                                                           // 1786
        };                                                                                                            // 1787
                                                                                                                      // 1788
        _this.putBit = function(bit) {                                                                                // 1789
                                                                                                                      // 1790
            var bufIndex = Math.floor(_length / 8);                                                                   // 1791
            if (_buffer.length <= bufIndex) {                                                                         // 1792
                _buffer.push(0);                                                                                      // 1793
            }                                                                                                         // 1794
                                                                                                                      // 1795
            if (bit) {                                                                                                // 1796
                _buffer[bufIndex] |= (0x80 >>> (_length % 8) );                                                       // 1797
            }                                                                                                         // 1798
                                                                                                                      // 1799
            _length += 1;                                                                                             // 1800
        };                                                                                                            // 1801
                                                                                                                      // 1802
        return _this;                                                                                                 // 1803
    };                                                                                                                // 1804
                                                                                                                      // 1805
    //---------------------------------------------------------------------                                           // 1806
    // qr8BitByte                                                                                                     // 1807
    //---------------------------------------------------------------------                                           // 1808
                                                                                                                      // 1809
    var qr8BitByte = function(data) {                                                                                 // 1810
                                                                                                                      // 1811
        var _mode = QRMode.MODE_8BIT_BYTE;                                                                            // 1812
        var _data = data;                                                                                             // 1813
        var _bytes = qrcode.stringToBytes(data);                                                                      // 1814
                                                                                                                      // 1815
        var _this = {};                                                                                               // 1816
                                                                                                                      // 1817
        _this.getMode = function() {                                                                                  // 1818
            return _mode;                                                                                             // 1819
        };                                                                                                            // 1820
                                                                                                                      // 1821
        _this.getLength = function(buffer) {                                                                          // 1822
            return _bytes.length;                                                                                     // 1823
        };                                                                                                            // 1824
                                                                                                                      // 1825
        _this.write = function(buffer) {                                                                              // 1826
            for (var i = 0; i < _bytes.length; i += 1) {                                                              // 1827
                buffer.put(_bytes[i], 8);                                                                             // 1828
            }                                                                                                         // 1829
        };                                                                                                            // 1830
                                                                                                                      // 1831
        return _this;                                                                                                 // 1832
    };                                                                                                                // 1833
                                                                                                                      // 1834
    //=====================================================================                                           // 1835
    // GIF Support etc.                                                                                               // 1836
    //                                                                                                                // 1837
                                                                                                                      // 1838
    //---------------------------------------------------------------------                                           // 1839
    // byteArrayOutputStream                                                                                          // 1840
    //---------------------------------------------------------------------                                           // 1841
                                                                                                                      // 1842
    var byteArrayOutputStream = function() {                                                                          // 1843
                                                                                                                      // 1844
        var _bytes = new Array();                                                                                     // 1845
                                                                                                                      // 1846
        var _this = {};                                                                                               // 1847
                                                                                                                      // 1848
        _this.writeByte = function(b) {                                                                               // 1849
            _bytes.push(b & 0xff);                                                                                    // 1850
        };                                                                                                            // 1851
                                                                                                                      // 1852
        _this.writeShort = function(i) {                                                                              // 1853
            _this.writeByte(i);                                                                                       // 1854
            _this.writeByte(i >>> 8);                                                                                 // 1855
        };                                                                                                            // 1856
                                                                                                                      // 1857
        _this.writeBytes = function(b, off, len) {                                                                    // 1858
            off = off || 0;                                                                                           // 1859
            len = len || b.length;                                                                                    // 1860
            for (var i = 0; i < len; i += 1) {                                                                        // 1861
                _this.writeByte(b[i + off]);                                                                          // 1862
            }                                                                                                         // 1863
        };                                                                                                            // 1864
                                                                                                                      // 1865
        _this.writeString = function(s) {                                                                             // 1866
            for (var i = 0; i < s.length; i += 1) {                                                                   // 1867
                _this.writeByte(s.charCodeAt(i) );                                                                    // 1868
            }                                                                                                         // 1869
        };                                                                                                            // 1870
                                                                                                                      // 1871
        _this.toByteArray = function() {                                                                              // 1872
            return _bytes;                                                                                            // 1873
        };                                                                                                            // 1874
                                                                                                                      // 1875
        _this.toString = function() {                                                                                 // 1876
            var s = '';                                                                                               // 1877
            s += '[';                                                                                                 // 1878
            for (var i = 0; i < _bytes.length; i += 1) {                                                              // 1879
                if (i > 0) {                                                                                          // 1880
                    s += ',';                                                                                         // 1881
                }                                                                                                     // 1882
                s += _bytes[i];                                                                                       // 1883
            }                                                                                                         // 1884
            s += ']';                                                                                                 // 1885
            return s;                                                                                                 // 1886
        };                                                                                                            // 1887
                                                                                                                      // 1888
        return _this;                                                                                                 // 1889
    };                                                                                                                // 1890
                                                                                                                      // 1891
    //---------------------------------------------------------------------                                           // 1892
    // base64EncodeOutputStream                                                                                       // 1893
    //---------------------------------------------------------------------                                           // 1894
                                                                                                                      // 1895
    var base64EncodeOutputStream = function() {                                                                       // 1896
                                                                                                                      // 1897
        var _buffer = 0;                                                                                              // 1898
        var _buflen = 0;                                                                                              // 1899
        var _length = 0;                                                                                              // 1900
        var _base64 = '';                                                                                             // 1901
                                                                                                                      // 1902
        var _this = {};                                                                                               // 1903
                                                                                                                      // 1904
        var writeEncoded = function(b) {                                                                              // 1905
            _base64 += String.fromCharCode(encode(b & 0x3f) );                                                        // 1906
        };                                                                                                            // 1907
                                                                                                                      // 1908
        var encode = function(n) {                                                                                    // 1909
            if (n < 0) {                                                                                              // 1910
                // error.                                                                                             // 1911
            } else if (n < 26) {                                                                                      // 1912
                return 0x41 + n;                                                                                      // 1913
            } else if (n < 52) {                                                                                      // 1914
                return 0x61 + (n - 26);                                                                               // 1915
            } else if (n < 62) {                                                                                      // 1916
                return 0x30 + (n - 52);                                                                               // 1917
            } else if (n == 62) {                                                                                     // 1918
                return 0x2b;                                                                                          // 1919
            } else if (n == 63) {                                                                                     // 1920
                return 0x2f;                                                                                          // 1921
            }                                                                                                         // 1922
            throw new Error('n:' + n);                                                                                // 1923
        };                                                                                                            // 1924
                                                                                                                      // 1925
        _this.writeByte = function(n) {                                                                               // 1926
                                                                                                                      // 1927
            _buffer = (_buffer << 8) | (n & 0xff);                                                                    // 1928
            _buflen += 8;                                                                                             // 1929
            _length += 1;                                                                                             // 1930
                                                                                                                      // 1931
            while (_buflen >= 6) {                                                                                    // 1932
                writeEncoded(_buffer >>> (_buflen - 6) );                                                             // 1933
                _buflen -= 6;                                                                                         // 1934
            }                                                                                                         // 1935
        };                                                                                                            // 1936
                                                                                                                      // 1937
        _this.flush = function() {                                                                                    // 1938
                                                                                                                      // 1939
            if (_buflen > 0) {                                                                                        // 1940
                writeEncoded(_buffer << (6 - _buflen) );                                                              // 1941
                _buffer = 0;                                                                                          // 1942
                _buflen = 0;                                                                                          // 1943
            }                                                                                                         // 1944
                                                                                                                      // 1945
            if (_length % 3 != 0) {                                                                                   // 1946
                // padding                                                                                            // 1947
                var padlen = 3 - _length % 3;                                                                         // 1948
                for (var i = 0; i < padlen; i += 1) {                                                                 // 1949
                    _base64 += '=';                                                                                   // 1950
                }                                                                                                     // 1951
            }                                                                                                         // 1952
        };                                                                                                            // 1953
                                                                                                                      // 1954
        _this.toString = function() {                                                                                 // 1955
            return _base64;                                                                                           // 1956
        };                                                                                                            // 1957
                                                                                                                      // 1958
        return _this;                                                                                                 // 1959
    };                                                                                                                // 1960
                                                                                                                      // 1961
    //---------------------------------------------------------------------                                           // 1962
    // base64DecodeInputStream                                                                                        // 1963
    //---------------------------------------------------------------------                                           // 1964
                                                                                                                      // 1965
    var base64DecodeInputStream = function(str) {                                                                     // 1966
                                                                                                                      // 1967
        var _str = str;                                                                                               // 1968
        var _pos = 0;                                                                                                 // 1969
        var _buffer = 0;                                                                                              // 1970
        var _buflen = 0;                                                                                              // 1971
                                                                                                                      // 1972
        var _this = {};                                                                                               // 1973
                                                                                                                      // 1974
        _this.read = function() {                                                                                     // 1975
                                                                                                                      // 1976
            while (_buflen < 8) {                                                                                     // 1977
                                                                                                                      // 1978
                if (_pos >= _str.length) {                                                                            // 1979
                    if (_buflen == 0) {                                                                               // 1980
                        return -1;                                                                                    // 1981
                    }                                                                                                 // 1982
                    throw new Error('unexpected end of file./' + _buflen);                                            // 1983
                }                                                                                                     // 1984
                                                                                                                      // 1985
                var c = _str.charAt(_pos);                                                                            // 1986
                _pos += 1;                                                                                            // 1987
                                                                                                                      // 1988
                if (c == '=') {                                                                                       // 1989
                    _buflen = 0;                                                                                      // 1990
                    return -1;                                                                                        // 1991
                } else if (c.match(/^\s$/) ) {                                                                        // 1992
                    // ignore if whitespace.                                                                          // 1993
                    continue;                                                                                         // 1994
                }                                                                                                     // 1995
                                                                                                                      // 1996
                _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );                                                  // 1997
                _buflen += 6;                                                                                         // 1998
            }                                                                                                         // 1999
                                                                                                                      // 2000
            var n = (_buffer >>> (_buflen - 8) ) & 0xff;                                                              // 2001
            _buflen -= 8;                                                                                             // 2002
            return n;                                                                                                 // 2003
        };                                                                                                            // 2004
                                                                                                                      // 2005
        var decode = function(c) {                                                                                    // 2006
            if (0x41 <= c && c <= 0x5a) {                                                                             // 2007
                return c - 0x41;                                                                                      // 2008
            } else if (0x61 <= c && c <= 0x7a) {                                                                      // 2009
                return c - 0x61 + 26;                                                                                 // 2010
            } else if (0x30 <= c && c <= 0x39) {                                                                      // 2011
                return c - 0x30 + 52;                                                                                 // 2012
            } else if (c == 0x2b) {                                                                                   // 2013
                return 62;                                                                                            // 2014
            } else if (c == 0x2f) {                                                                                   // 2015
                return 63;                                                                                            // 2016
            } else {                                                                                                  // 2017
                throw new Error('c:' + c);                                                                            // 2018
            }                                                                                                         // 2019
        };                                                                                                            // 2020
                                                                                                                      // 2021
        return _this;                                                                                                 // 2022
    };                                                                                                                // 2023
                                                                                                                      // 2024
    //---------------------------------------------------------------------                                           // 2025
    // gifImage (B/W)                                                                                                 // 2026
    //---------------------------------------------------------------------                                           // 2027
                                                                                                                      // 2028
    var gifImage = function(width, height) {                                                                          // 2029
                                                                                                                      // 2030
        var _width = width;                                                                                           // 2031
        var _height = height;                                                                                         // 2032
        var _data = new Array(width * height);                                                                        // 2033
                                                                                                                      // 2034
        var _this = {};                                                                                               // 2035
                                                                                                                      // 2036
        _this.setPixel = function(x, y, pixel) {                                                                      // 2037
            _data[y * _width + x] = pixel;                                                                            // 2038
        };                                                                                                            // 2039
                                                                                                                      // 2040
        _this.write = function(out) {                                                                                 // 2041
                                                                                                                      // 2042
            //---------------------------------                                                                       // 2043
            // GIF Signature                                                                                          // 2044
                                                                                                                      // 2045
            out.writeString('GIF87a');                                                                                // 2046
                                                                                                                      // 2047
            //---------------------------------                                                                       // 2048
            // Screen Descriptor                                                                                      // 2049
                                                                                                                      // 2050
            out.writeShort(_width);                                                                                   // 2051
            out.writeShort(_height);                                                                                  // 2052
                                                                                                                      // 2053
            out.writeByte(0x80); // 2bit                                                                              // 2054
            out.writeByte(0);                                                                                         // 2055
            out.writeByte(0);                                                                                         // 2056
                                                                                                                      // 2057
            //---------------------------------                                                                       // 2058
            // Global Color Map                                                                                       // 2059
                                                                                                                      // 2060
            // black                                                                                                  // 2061
            out.writeByte(0x00);                                                                                      // 2062
            out.writeByte(0x00);                                                                                      // 2063
            out.writeByte(0x00);                                                                                      // 2064
                                                                                                                      // 2065
            // white                                                                                                  // 2066
            out.writeByte(0xff);                                                                                      // 2067
            out.writeByte(0xff);                                                                                      // 2068
            out.writeByte(0xff);                                                                                      // 2069
                                                                                                                      // 2070
            //---------------------------------                                                                       // 2071
            // Image Descriptor                                                                                       // 2072
                                                                                                                      // 2073
            out.writeString(',');                                                                                     // 2074
            out.writeShort(0);                                                                                        // 2075
            out.writeShort(0);                                                                                        // 2076
            out.writeShort(_width);                                                                                   // 2077
            out.writeShort(_height);                                                                                  // 2078
            out.writeByte(0);                                                                                         // 2079
                                                                                                                      // 2080
            //---------------------------------                                                                       // 2081
            // Local Color Map                                                                                        // 2082
                                                                                                                      // 2083
            //---------------------------------                                                                       // 2084
            // Raster Data                                                                                            // 2085
                                                                                                                      // 2086
            var lzwMinCodeSize = 2;                                                                                   // 2087
            var raster = getLZWRaster(lzwMinCodeSize);                                                                // 2088
                                                                                                                      // 2089
            out.writeByte(lzwMinCodeSize);                                                                            // 2090
                                                                                                                      // 2091
            var offset = 0;                                                                                           // 2092
                                                                                                                      // 2093
            while (raster.length - offset > 255) {                                                                    // 2094
                out.writeByte(255);                                                                                   // 2095
                out.writeBytes(raster, offset, 255);                                                                  // 2096
                offset += 255;                                                                                        // 2097
            }                                                                                                         // 2098
                                                                                                                      // 2099
            out.writeByte(raster.length - offset);                                                                    // 2100
            out.writeBytes(raster, offset, raster.length - offset);                                                   // 2101
            out.writeByte(0x00);                                                                                      // 2102
                                                                                                                      // 2103
            //---------------------------------                                                                       // 2104
            // GIF Terminator                                                                                         // 2105
            out.writeString(';');                                                                                     // 2106
        };                                                                                                            // 2107
                                                                                                                      // 2108
        var bitOutputStream = function(out) {                                                                         // 2109
                                                                                                                      // 2110
            var _out = out;                                                                                           // 2111
            var _bitLength = 0;                                                                                       // 2112
            var _bitBuffer = 0;                                                                                       // 2113
                                                                                                                      // 2114
            var _this = {};                                                                                           // 2115
                                                                                                                      // 2116
            _this.write = function(data, length) {                                                                    // 2117
                                                                                                                      // 2118
                if ( (data >>> length) != 0) {                                                                        // 2119
                    throw new Error('length over');                                                                   // 2120
                }                                                                                                     // 2121
                                                                                                                      // 2122
                while (_bitLength + length >= 8) {                                                                    // 2123
                    _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );                                     // 2124
                    length -= (8 - _bitLength);                                                                       // 2125
                    data >>>= (8 - _bitLength);                                                                       // 2126
                    _bitBuffer = 0;                                                                                   // 2127
                    _bitLength = 0;                                                                                   // 2128
                }                                                                                                     // 2129
                                                                                                                      // 2130
                _bitBuffer = (data << _bitLength) | _bitBuffer;                                                       // 2131
                _bitLength = _bitLength + length;                                                                     // 2132
            };                                                                                                        // 2133
                                                                                                                      // 2134
            _this.flush = function() {                                                                                // 2135
                if (_bitLength > 0) {                                                                                 // 2136
                    _out.writeByte(_bitBuffer);                                                                       // 2137
                }                                                                                                     // 2138
            };                                                                                                        // 2139
                                                                                                                      // 2140
            return _this;                                                                                             // 2141
        };                                                                                                            // 2142
                                                                                                                      // 2143
        var getLZWRaster = function(lzwMinCodeSize) {                                                                 // 2144
                                                                                                                      // 2145
            var clearCode = 1 << lzwMinCodeSize;                                                                      // 2146
            var endCode = (1 << lzwMinCodeSize) + 1;                                                                  // 2147
            var bitLength = lzwMinCodeSize + 1;                                                                       // 2148
                                                                                                                      // 2149
            // Setup LZWTable                                                                                         // 2150
            var table = lzwTable();                                                                                   // 2151
                                                                                                                      // 2152
            for (var i = 0; i < clearCode; i += 1) {                                                                  // 2153
                table.add(String.fromCharCode(i) );                                                                   // 2154
            }                                                                                                         // 2155
            table.add(String.fromCharCode(clearCode) );                                                               // 2156
            table.add(String.fromCharCode(endCode) );                                                                 // 2157
                                                                                                                      // 2158
            var byteOut = byteArrayOutputStream();                                                                    // 2159
            var bitOut = bitOutputStream(byteOut);                                                                    // 2160
                                                                                                                      // 2161
            // clear code                                                                                             // 2162
            bitOut.write(clearCode, bitLength);                                                                       // 2163
                                                                                                                      // 2164
            var dataIndex = 0;                                                                                        // 2165
                                                                                                                      // 2166
            var s = String.fromCharCode(_data[dataIndex]);                                                            // 2167
            dataIndex += 1;                                                                                           // 2168
                                                                                                                      // 2169
            while (dataIndex < _data.length) {                                                                        // 2170
                                                                                                                      // 2171
                var c = String.fromCharCode(_data[dataIndex]);                                                        // 2172
                dataIndex += 1;                                                                                       // 2173
                                                                                                                      // 2174
                if (table.contains(s + c) ) {                                                                         // 2175
                                                                                                                      // 2176
                    s = s + c;                                                                                        // 2177
                                                                                                                      // 2178
                } else {                                                                                              // 2179
                                                                                                                      // 2180
                    bitOut.write(table.indexOf(s), bitLength);                                                        // 2181
                                                                                                                      // 2182
                    if (table.size() < 0xfff) {                                                                       // 2183
                                                                                                                      // 2184
                        if (table.size() == (1 << bitLength) ) {                                                      // 2185
                            bitLength += 1;                                                                           // 2186
                        }                                                                                             // 2187
                                                                                                                      // 2188
                        table.add(s + c);                                                                             // 2189
                    }                                                                                                 // 2190
                                                                                                                      // 2191
                    s = c;                                                                                            // 2192
                }                                                                                                     // 2193
            }                                                                                                         // 2194
                                                                                                                      // 2195
            bitOut.write(table.indexOf(s), bitLength);                                                                // 2196
                                                                                                                      // 2197
            // end code                                                                                               // 2198
            bitOut.write(endCode, bitLength);                                                                         // 2199
                                                                                                                      // 2200
            bitOut.flush();                                                                                           // 2201
                                                                                                                      // 2202
            return byteOut.toByteArray();                                                                             // 2203
        };                                                                                                            // 2204
                                                                                                                      // 2205
        var lzwTable = function() {                                                                                   // 2206
                                                                                                                      // 2207
            var _map = {};                                                                                            // 2208
            var _size = 0;                                                                                            // 2209
                                                                                                                      // 2210
            var _this = {};                                                                                           // 2211
                                                                                                                      // 2212
            _this.add = function(key) {                                                                               // 2213
                if (_this.contains(key) ) {                                                                           // 2214
                    throw new Error('dup key:' + key);                                                                // 2215
                }                                                                                                     // 2216
                _map[key] = _size;                                                                                    // 2217
                _size += 1;                                                                                           // 2218
            };                                                                                                        // 2219
                                                                                                                      // 2220
            _this.size = function() {                                                                                 // 2221
                return _size;                                                                                         // 2222
            };                                                                                                        // 2223
                                                                                                                      // 2224
            _this.indexOf = function(key) {                                                                           // 2225
                return _map[key];                                                                                     // 2226
            };                                                                                                        // 2227
                                                                                                                      // 2228
            _this.contains = function(key) {                                                                          // 2229
                return typeof _map[key] != 'undefined';                                                               // 2230
            };                                                                                                        // 2231
                                                                                                                      // 2232
            return _this;                                                                                             // 2233
        };                                                                                                            // 2234
                                                                                                                      // 2235
        return _this;                                                                                                 // 2236
    };                                                                                                                // 2237
                                                                                                                      // 2238
    var createImgTag = function(width, height, getPixel, alt) {                                                       // 2239
                                                                                                                      // 2240
        var gif = gifImage(width, height);                                                                            // 2241
        for (var y = 0; y < height; y += 1) {                                                                         // 2242
            for (var x = 0; x < width; x += 1) {                                                                      // 2243
                gif.setPixel(x, y, getPixel(x, y) );                                                                  // 2244
            }                                                                                                         // 2245
        }                                                                                                             // 2246
                                                                                                                      // 2247
        var b = byteArrayOutputStream();                                                                              // 2248
        gif.write(b);                                                                                                 // 2249
                                                                                                                      // 2250
        var base64 = base64EncodeOutputStream();                                                                      // 2251
        var bytes = b.toByteArray();                                                                                  // 2252
        for (var i = 0; i < bytes.length; i += 1) {                                                                   // 2253
            base64.writeByte(bytes[i]);                                                                               // 2254
        }                                                                                                             // 2255
        base64.flush();                                                                                               // 2256
                                                                                                                      // 2257
        var img = '';                                                                                                 // 2258
        img += '<img';                                                                                                // 2259
        img += '\u0020src="';                                                                                         // 2260
        img += 'data:image/gif;base64,';                                                                              // 2261
        img += base64;                                                                                                // 2262
        img += '"';                                                                                                   // 2263
        img += '\u0020width="';                                                                                       // 2264
        img += width;                                                                                                 // 2265
        img += '"';                                                                                                   // 2266
        img += '\u0020height="';                                                                                      // 2267
        img += height;                                                                                                // 2268
        img += '"';                                                                                                   // 2269
        if (alt) {                                                                                                    // 2270
            img += '\u0020alt="';                                                                                     // 2271
            img += alt;                                                                                               // 2272
            img += '"';                                                                                               // 2273
        }                                                                                                             // 2274
        img += '/>';                                                                                                  // 2275
                                                                                                                      // 2276
        return img;                                                                                                   // 2277
    };                                                                                                                // 2278
                                                                                                                      // 2279
    //---------------------------------------------------------------------                                           // 2280
    // returns qrcode function.                                                                                       // 2281
                                                                                                                      // 2282
    return qrcode;                                                                                                    // 2283
}();                                                                                                                  // 2284
                                                                                                                      // 2285
                                                                                                                      // 2286
}());                                                                                                                 // 2287
                                                                                                                      // 2288
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dschulz:jquery-qrcode'] = {};

})();
