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
var Sortable;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rubaxa:sortable/Sortable.js                                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**!                                                                                                                // 1
 * Sortable                                                                                                         // 2
 * @author	RubaXa   <trash@rubaxa.org>                                                                              // 3
 * @license MIT                                                                                                     // 4
 */                                                                                                                 // 5
                                                                                                                    // 6
                                                                                                                    // 7
(function (factory){                                                                                                // 8
	"use strict";                                                                                                      // 9
                                                                                                                    // 10
	if( typeof define === "function" && define.amd ){                                                                  // 11
		define(factory);                                                                                                  // 12
	}                                                                                                                  // 13
	else if( typeof module != "undefined" && typeof module.exports != "undefined" ){                                   // 14
		module.exports = factory();                                                                                       // 15
	}                                                                                                                  // 16
	else if( typeof Package !== "undefined" ){                                                                         // 17
		Sortable = factory();                                                                                             // 18
	}                                                                                                                  // 19
	else {                                                                                                             // 20
		window["Sortable"] = factory();                                                                                   // 21
	}                                                                                                                  // 22
})(function (){                                                                                                     // 23
	"use strict";                                                                                                      // 24
                                                                                                                    // 25
	var                                                                                                                // 26
		  dragEl                                                                                                          // 27
		, ghostEl                                                                                                         // 28
		, rootEl                                                                                                          // 29
		, nextEl                                                                                                          // 30
                                                                                                                    // 31
		, lastEl                                                                                                          // 32
		, lastCSS                                                                                                         // 33
		, lastRect                                                                                                        // 34
                                                                                                                    // 35
		, activeGroup                                                                                                     // 36
                                                                                                                    // 37
		, tapEvt                                                                                                          // 38
		, touchEvt                                                                                                        // 39
                                                                                                                    // 40
		, expando = 'Sortable' + (new Date).getTime()                                                                     // 41
                                                                                                                    // 42
		, win = window                                                                                                    // 43
		, document = win.document                                                                                         // 44
		, parseInt = win.parseInt                                                                                         // 45
		, supportIEdnd = !!document.createElement('div').dragDrop                                                         // 46
                                                                                                                    // 47
		, _silent = false                                                                                                 // 48
                                                                                                                    // 49
		, _createEvent = function (event/**String*/, item/**HTMLElement*/){                                               // 50
			var evt = document.createEvent('Event');                                                                         // 51
			evt.initEvent(event, true, true);                                                                                // 52
			evt.item = item;                                                                                                 // 53
			return evt;                                                                                                      // 54
		}                                                                                                                 // 55
                                                                                                                    // 56
		, _dispatchEvent = function (rootEl, name, targetEl) {                                                            // 57
			rootEl.dispatchEvent(_createEvent(name, targetEl || rootEl));                                                    // 58
		}                                                                                                                 // 59
                                                                                                                    // 60
		, _customEvents = 'onAdd onUpdate onRemove onStart onEnd onFilter'.split(' ')                                     // 61
                                                                                                                    // 62
		, noop = function (){}                                                                                            // 63
		, slice = [].slice                                                                                                // 64
                                                                                                                    // 65
		, touchDragOverListeners = []                                                                                     // 66
	;                                                                                                                  // 67
                                                                                                                    // 68
                                                                                                                    // 69
                                                                                                                    // 70
	/**                                                                                                                // 71
	 * @class  Sortable                                                                                                // 72
	 * @param  {HTMLElement}  el                                                                                       // 73
	 * @param  {Object}       [options]                                                                                // 74
	 */                                                                                                                // 75
	function Sortable(el, options){                                                                                    // 76
		this.el = el; // root element                                                                                     // 77
		this.options = options = (options || {});                                                                         // 78
                                                                                                                    // 79
                                                                                                                    // 80
		// Defaults                                                                                                       // 81
		var defaults = {                                                                                                  // 82
			group: Math.random(),                                                                                            // 83
			store: null,                                                                                                     // 84
			handle: null,                                                                                                    // 85
			draggable: el.children[0] && el.children[0].nodeName || (/[uo]l/i.test(el.nodeName) ? 'li' : '*'),               // 86
			ghostClass: 'sortable-ghost',                                                                                    // 87
			ignore: 'a, img',                                                                                                // 88
			filter: null                                                                                                     // 89
		};                                                                                                                // 90
                                                                                                                    // 91
		// Set default options                                                                                            // 92
		for (var name in defaults) {                                                                                      // 93
			options[name] = options[name] || defaults[name];                                                                 // 94
		}                                                                                                                 // 95
                                                                                                                    // 96
                                                                                                                    // 97
		// Define events                                                                                                  // 98
		_customEvents.forEach(function (name) {                                                                           // 99
			options[name] = _bind(this, options[name] || noop);                                                              // 100
			_on(el, name.substr(2).toLowerCase(), options[name]);                                                            // 101
		}, this);                                                                                                         // 102
                                                                                                                    // 103
                                                                                                                    // 104
		// Export group name                                                                                              // 105
		el[expando] = options.group;                                                                                      // 106
                                                                                                                    // 107
                                                                                                                    // 108
		// Bind all private methods                                                                                       // 109
		for( var fn in this ){                                                                                            // 110
			if( fn.charAt(0) === '_' ){                                                                                      // 111
				this[fn] = _bind(this, this[fn]);                                                                               // 112
			}                                                                                                                // 113
		}                                                                                                                 // 114
                                                                                                                    // 115
                                                                                                                    // 116
		// Bind events                                                                                                    // 117
		_on(el, 'mousedown', this._onTapStart);                                                                           // 118
		_on(el, 'touchstart', this._onTapStart);                                                                          // 119
		supportIEdnd && _on(el, 'selectstart', this._onTapStart);                                                         // 120
                                                                                                                    // 121
		_on(el, 'dragover', this._onDragOver);                                                                            // 122
		_on(el, 'dragenter', this._onDragOver);                                                                           // 123
                                                                                                                    // 124
		touchDragOverListeners.push(this._onDragOver);                                                                    // 125
                                                                                                                    // 126
		// Restore sorting                                                                                                // 127
		options.store && this.sort(options.store.get(this));                                                              // 128
	}                                                                                                                  // 129
                                                                                                                    // 130
                                                                                                                    // 131
	Sortable.prototype = /** @lends Sortable.prototype */ {                                                            // 132
		constructor: Sortable,                                                                                            // 133
                                                                                                                    // 134
                                                                                                                    // 135
		_applyEffects: function (){                                                                                       // 136
			_toggleClass(dragEl, this.options.ghostClass, true);                                                             // 137
		},                                                                                                                // 138
                                                                                                                    // 139
                                                                                                                    // 140
		_onTapStart: function (evt/**Event|TouchEvent*/){                                                                 // 141
			var                                                                                                              // 142
				  touch = evt.touches && evt.touches[0]                                                                         // 143
				, target = (touch || evt).target                                                                                // 144
				, options =  this.options                                                                                       // 145
				, el = this.el                                                                                                  // 146
				, filter = options.filter                                                                                       // 147
			;                                                                                                                // 148
                                                                                                                    // 149
			if( evt.type === 'mousedown' && evt.button !== 0 ) {                                                             // 150
				return; // only left button                                                                                     // 151
			}                                                                                                                // 152
                                                                                                                    // 153
			// Check filter                                                                                                  // 154
			if( typeof filter === 'function' ){                                                                              // 155
				if( filter.call(this, target, this) ){                                                                          // 156
					_dispatchEvent(el, 'filter', target);                                                                          // 157
					return; // cancel dnd                                                                                          // 158
				}                                                                                                               // 159
			}                                                                                                                // 160
			else if( filter ){                                                                                               // 161
				filter = filter.split(',').filter(function (criteria) {                                                         // 162
					return _closest(target, criteria.trim(), el);                                                                  // 163
				});                                                                                                             // 164
                                                                                                                    // 165
				if (filter.length) {                                                                                            // 166
					_dispatchEvent(el, 'filter', target);                                                                          // 167
					return; // cancel dnd                                                                                          // 168
				}                                                                                                               // 169
			}                                                                                                                // 170
                                                                                                                    // 171
			if( options.handle ){                                                                                            // 172
				target = _closest(target, options.handle, el);                                                                  // 173
			}                                                                                                                // 174
                                                                                                                    // 175
			target = _closest(target, options.draggable, el);                                                                // 176
                                                                                                                    // 177
			// IE 9 Support                                                                                                  // 178
			if( target && evt.type == 'selectstart' ){                                                                       // 179
				if( target.tagName != 'A' && target.tagName != 'IMG'){                                                          // 180
					target.dragDrop();                                                                                             // 181
				}                                                                                                               // 182
			}                                                                                                                // 183
                                                                                                                    // 184
			if( target && !dragEl && (target.parentNode === el) ){                                                           // 185
				tapEvt = evt;                                                                                                   // 186
                                                                                                                    // 187
				rootEl = this.el;                                                                                               // 188
				dragEl = target;                                                                                                // 189
				nextEl = dragEl.nextSibling;                                                                                    // 190
				activeGroup = this.options.group;                                                                               // 191
                                                                                                                    // 192
				dragEl.draggable = true;                                                                                        // 193
                                                                                                                    // 194
				// Disable "draggable"                                                                                          // 195
				options.ignore.split(',').forEach(function (criteria) {                                                         // 196
					_find(target, criteria.trim(), _disableDraggable);                                                             // 197
				});                                                                                                             // 198
                                                                                                                    // 199
				if( touch ){                                                                                                    // 200
					// Touch device support                                                                                        // 201
					tapEvt = {                                                                                                     // 202
						  target:  target                                                                                             // 203
						, clientX: touch.clientX                                                                                      // 204
						, clientY: touch.clientY                                                                                      // 205
					};                                                                                                             // 206
                                                                                                                    // 207
					this._onDragStart(tapEvt, true);                                                                               // 208
					evt.preventDefault();                                                                                          // 209
				}                                                                                                               // 210
                                                                                                                    // 211
				_on(document, 'mouseup', this._onDrop);                                                                         // 212
				_on(document, 'touchend', this._onDrop);                                                                        // 213
				_on(document, 'touchcancel', this._onDrop);                                                                     // 214
                                                                                                                    // 215
				_on(this.el, 'dragstart', this._onDragStart);                                                                   // 216
				_on(this.el, 'dragend', this._onDrop);                                                                          // 217
				_on(document, 'dragover', _globalDragOver);                                                                     // 218
                                                                                                                    // 219
                                                                                                                    // 220
				try {                                                                                                           // 221
					if( document.selection ){                                                                                      // 222
						document.selection.empty();                                                                                   // 223
					} else {                                                                                                       // 224
						window.getSelection().removeAllRanges()                                                                       // 225
					}                                                                                                              // 226
				} catch (err){ }                                                                                                // 227
                                                                                                                    // 228
                                                                                                                    // 229
				_dispatchEvent(dragEl, 'start');                                                                                // 230
			}                                                                                                                // 231
		},                                                                                                                // 232
                                                                                                                    // 233
		_emulateDragOver: function (){                                                                                    // 234
			if( touchEvt ){                                                                                                  // 235
				_css(ghostEl, 'display', 'none');                                                                               // 236
                                                                                                                    // 237
				var                                                                                                             // 238
					  target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY)                                       // 239
					, parent = target                                                                                              // 240
					, group = this.options.group                                                                                   // 241
					, i = touchDragOverListeners.length                                                                            // 242
				;                                                                                                               // 243
                                                                                                                    // 244
				if( parent ){                                                                                                   // 245
					do {                                                                                                           // 246
						if( parent[expando] === group ){                                                                              // 247
							while( i-- ){                                                                                                // 248
								touchDragOverListeners[i]({                                                                                 // 249
									clientX: touchEvt.clientX,                                                                                 // 250
									clientY: touchEvt.clientY,                                                                                 // 251
									target: target,                                                                                            // 252
									rootEl: parent                                                                                             // 253
								});                                                                                                         // 254
							}                                                                                                            // 255
							break;                                                                                                       // 256
						}                                                                                                             // 257
                                                                                                                    // 258
						target = parent; // store last element                                                                        // 259
					}                                                                                                              // 260
					while( parent = parent.parentNode );                                                                           // 261
				}                                                                                                               // 262
                                                                                                                    // 263
				_css(ghostEl, 'display', '');                                                                                   // 264
			}                                                                                                                // 265
		},                                                                                                                // 266
                                                                                                                    // 267
                                                                                                                    // 268
		_onTouchMove: function (evt/**TouchEvent*/){                                                                      // 269
			if( tapEvt ){                                                                                                    // 270
				var                                                                                                             // 271
					  touch = evt.touches[0]                                                                                       // 272
					, dx = touch.clientX - tapEvt.clientX                                                                          // 273
					, dy = touch.clientY - tapEvt.clientY                                                                          // 274
					, translate3d = 'translate3d(' + dx + 'px,' + dy + 'px,0)'                                                     // 275
				;                                                                                                               // 276
                                                                                                                    // 277
				touchEvt = touch;                                                                                               // 278
                                                                                                                    // 279
				_css(ghostEl, 'webkitTransform', translate3d);                                                                  // 280
				_css(ghostEl, 'mozTransform', translate3d);                                                                     // 281
				_css(ghostEl, 'msTransform', translate3d);                                                                      // 282
				_css(ghostEl, 'transform', translate3d);                                                                        // 283
                                                                                                                    // 284
				evt.preventDefault();                                                                                           // 285
			}                                                                                                                // 286
		},                                                                                                                // 287
                                                                                                                    // 288
                                                                                                                    // 289
		_onDragStart: function (evt/**Event*/, isTouch/**Boolean*/){                                                      // 290
			var dataTransfer = evt.dataTransfer;                                                                             // 291
                                                                                                                    // 292
			this._offUpEvents();                                                                                             // 293
                                                                                                                    // 294
			if( isTouch ){                                                                                                   // 295
				var                                                                                                             // 296
					  rect = dragEl.getBoundingClientRect()                                                                        // 297
					, css = _css(dragEl)                                                                                           // 298
					, ghostRect                                                                                                    // 299
				;                                                                                                               // 300
                                                                                                                    // 301
				ghostEl = dragEl.cloneNode(true);                                                                               // 302
                                                                                                                    // 303
				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));                                                   // 304
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));                                                // 305
				_css(ghostEl, 'width', rect.width);                                                                             // 306
				_css(ghostEl, 'height', rect.height);                                                                           // 307
				_css(ghostEl, 'opacity', '0.8');                                                                                // 308
				_css(ghostEl, 'position', 'fixed');                                                                             // 309
				_css(ghostEl, 'zIndex', '100000');                                                                              // 310
                                                                                                                    // 311
				rootEl.appendChild(ghostEl);                                                                                    // 312
                                                                                                                    // 313
				// Fixing dimensions.                                                                                           // 314
				ghostRect = ghostEl.getBoundingClientRect();                                                                    // 315
				_css(ghostEl, 'width', rect.width*2 - ghostRect.width);                                                         // 316
				_css(ghostEl, 'height', rect.height*2 - ghostRect.height);                                                      // 317
                                                                                                                    // 318
				// Bind touch events                                                                                            // 319
				_on(document, 'touchmove', this._onTouchMove);                                                                  // 320
				_on(document, 'touchend', this._onDrop);                                                                        // 321
				_on(document, 'touchcancel', this._onDrop);                                                                     // 322
                                                                                                                    // 323
				this._loopId = setInterval(this._emulateDragOver, 150);                                                         // 324
			}                                                                                                                // 325
			else {                                                                                                           // 326
				dataTransfer.effectAllowed = 'move';                                                                            // 327
				dataTransfer.setData('Text', dragEl.textContent);                                                               // 328
                                                                                                                    // 329
				_on(document, 'drop', this._onDrop);                                                                            // 330
			}                                                                                                                // 331
                                                                                                                    // 332
			setTimeout(this._applyEffects);                                                                                  // 333
		},                                                                                                                // 334
                                                                                                                    // 335
                                                                                                                    // 336
		_onDragOver: function (evt/**Event*/){                                                                            // 337
			if( !_silent && (activeGroup === this.options.group) && (evt.rootEl === void 0 || evt.rootEl === this.el) ){     // 338
				var                                                                                                             // 339
					  el = this.el                                                                                                 // 340
					, target = _closest(evt.target, this.options.draggable, el)                                                    // 341
				;                                                                                                               // 342
                                                                                                                    // 343
				if( el.children.length === 0 || el.children[0] === ghostEl || (el === evt.target) && _ghostInBottom(el, evt) ){ // 344
					el.appendChild(dragEl);                                                                                        // 345
				}                                                                                                               // 346
				else if( target && target !== dragEl && (target.parentNode[expando] !== void 0) ){                              // 347
					if( lastEl !== target ){                                                                                       // 348
						lastEl = target;                                                                                              // 349
						lastCSS = _css(target);                                                                                       // 350
						lastRect = target.getBoundingClientRect();                                                                    // 351
					}                                                                                                              // 352
                                                                                                                    // 353
                                                                                                                    // 354
					var                                                                                                            // 355
						  rect = lastRect                                                                                             // 356
						, width = rect.right - rect.left                                                                              // 357
						, height = rect.bottom - rect.top                                                                             // 358
						, floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display)                                     // 359
						, isWide = (target.offsetWidth > dragEl.offsetWidth)                                                          // 360
						, isLong = (target.offsetHeight > dragEl.offsetHeight)                                                        // 361
						, halfway = (floating ? (evt.clientX - rect.left)/width : (evt.clientY - rect.top)/height) > .5               // 362
						, nextSibling = target.nextElementSibling                                                                     // 363
						, after                                                                                                       // 364
					;                                                                                                              // 365
                                                                                                                    // 366
					_silent = true;                                                                                                // 367
					setTimeout(_unsilent, 30);                                                                                     // 368
                                                                                                                    // 369
					if( floating ){                                                                                                // 370
						after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide                            // 371
					} else {                                                                                                       // 372
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;                                             // 373
					}                                                                                                              // 374
                                                                                                                    // 375
					if( after && !nextSibling ){                                                                                   // 376
						el.appendChild(dragEl);                                                                                       // 377
					} else {                                                                                                       // 378
						target.parentNode.insertBefore(dragEl, after ? nextSibling : target);                                         // 379
					}                                                                                                              // 380
				}                                                                                                               // 381
			}                                                                                                                // 382
		},                                                                                                                // 383
                                                                                                                    // 384
		_offUpEvents: function () {                                                                                       // 385
			_off(document, 'mouseup', this._onDrop);                                                                         // 386
			_off(document, 'touchmove', this._onTouchMove);                                                                  // 387
			_off(document, 'touchend', this._onDrop);                                                                        // 388
			_off(document, 'touchcancel', this._onDrop);                                                                     // 389
		},                                                                                                                // 390
                                                                                                                    // 391
		_onDrop: function (evt/**Event*/){                                                                                // 392
			clearInterval(this._loopId);                                                                                     // 393
                                                                                                                    // 394
			// Unbind events                                                                                                 // 395
			_off(document, 'drop', this._onDrop);                                                                            // 396
			_off(document, 'dragover', _globalDragOver);                                                                     // 397
                                                                                                                    // 398
			_off(this.el, 'dragend', this._onDrop);                                                                          // 399
			_off(this.el, 'dragstart', this._onDragStart);                                                                   // 400
			_off(this.el, 'selectstart', this._onTapStart);                                                                  // 401
                                                                                                                    // 402
			this._offUpEvents();                                                                                             // 403
                                                                                                                    // 404
			if( evt ){                                                                                                       // 405
				evt.preventDefault();                                                                                           // 406
				evt.stopPropagation();                                                                                          // 407
                                                                                                                    // 408
				if( ghostEl ){                                                                                                  // 409
					ghostEl.parentNode.removeChild(ghostEl);                                                                       // 410
				}                                                                                                               // 411
                                                                                                                    // 412
				if( dragEl ){                                                                                                   // 413
					_disableDraggable(dragEl);                                                                                     // 414
					_toggleClass(dragEl, this.options.ghostClass, false);                                                          // 415
                                                                                                                    // 416
					if( !rootEl.contains(dragEl) ){                                                                                // 417
						// Remove event                                                                                               // 418
						_dispatchEvent(rootEl, 'remove', dragEl);                                                                     // 419
                                                                                                                    // 420
						// Add event                                                                                                  // 421
						_dispatchEvent(dragEl, 'add');                                                                                // 422
					}                                                                                                              // 423
					else if( dragEl.nextSibling !== nextEl ){                                                                      // 424
						// Update event                                                                                               // 425
						_dispatchEvent(dragEl, 'update');                                                                             // 426
					}                                                                                                              // 427
                                                                                                                    // 428
					_dispatchEvent(dragEl, 'end');                                                                                 // 429
				}                                                                                                               // 430
                                                                                                                    // 431
				// Set NULL                                                                                                     // 432
				rootEl =                                                                                                        // 433
				dragEl =                                                                                                        // 434
				ghostEl =                                                                                                       // 435
				nextEl =                                                                                                        // 436
                                                                                                                    // 437
				tapEvt =                                                                                                        // 438
				touchEvt =                                                                                                      // 439
                                                                                                                    // 440
				lastEl =                                                                                                        // 441
				lastCSS =                                                                                                       // 442
                                                                                                                    // 443
				activeGroup = null;                                                                                             // 444
                                                                                                                    // 445
				// Save sorting                                                                                                 // 446
				this.options.store && this.options.store.set(this);                                                             // 447
			}                                                                                                                // 448
		},                                                                                                                // 449
                                                                                                                    // 450
                                                                                                                    // 451
		/**                                                                                                               // 452
		 * Serializes the item into an array of string.                                                                   // 453
		 * @returns {String[]}                                                                                            // 454
		 */                                                                                                               // 455
		toArray: function () {                                                                                            // 456
			var order = [],                                                                                                  // 457
				el,                                                                                                             // 458
				children = this.el.children,                                                                                    // 459
				i = 0,                                                                                                          // 460
				n = children.length                                                                                             // 461
			;                                                                                                                // 462
                                                                                                                    // 463
			for (; i < n; i++) {                                                                                             // 464
				el = children[i];                                                                                               // 465
				if (_closest(el, this.options.draggable, this.el)) {                                                            // 466
					order.push(el.getAttribute('data-id') || _generateId(el));                                                     // 467
				}                                                                                                               // 468
			}                                                                                                                // 469
                                                                                                                    // 470
			return order;                                                                                                    // 471
		},                                                                                                                // 472
                                                                                                                    // 473
                                                                                                                    // 474
		/**                                                                                                               // 475
		 * Sorts the elements according to the array.                                                                     // 476
		 * @param  {String[]}  order  order of the items                                                                  // 477
		 */                                                                                                               // 478
		sort: function (order) {                                                                                          // 479
			var items = {}, rootEl = this.el;                                                                                // 480
                                                                                                                    // 481
			this.toArray().forEach(function (id, i) {                                                                        // 482
				var el = rootEl.children[i];                                                                                    // 483
                                                                                                                    // 484
				if (_closest(el, this.options.draggable, rootEl)) {                                                             // 485
					items[id] = el;                                                                                                // 486
				}                                                                                                               // 487
			}, this);                                                                                                        // 488
                                                                                                                    // 489
                                                                                                                    // 490
			order.forEach(function (id) {                                                                                    // 491
				if (items[id]) {                                                                                                // 492
					rootEl.removeChild(items[id]);                                                                                 // 493
					rootEl.appendChild(items[id]);                                                                                 // 494
				}                                                                                                               // 495
			});                                                                                                              // 496
		},                                                                                                                // 497
                                                                                                                    // 498
                                                                                                                    // 499
		/**                                                                                                               // 500
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el                                                                                     // 502
		 * @param   {String}       [selector]  default: `options.draggable`                                               // 503
		 * @returns {HTMLElement|null}                                                                                    // 504
		 */                                                                                                               // 505
		closest: function (el, selector) {                                                                                // 506
			return _closest(el, selector || this.options.draggable, this.el);                                                // 507
		},                                                                                                                // 508
                                                                                                                    // 509
                                                                                                                    // 510
		/**                                                                                                               // 511
		 * Destroy                                                                                                        // 512
		 */                                                                                                               // 513
		destroy: function () {                                                                                            // 514
			var el = this.el, options = this.options;                                                                        // 515
                                                                                                                    // 516
			_customEvents.forEach(function (name) {                                                                          // 517
				_off(el, name.substr(2).toLowerCase(), options[name]);                                                          // 518
			});                                                                                                              // 519
                                                                                                                    // 520
			_off(el, 'mousedown', this._onTapStart);                                                                         // 521
			_off(el, 'touchstart', this._onTapStart);                                                                        // 522
			_off(el, 'selectstart', this._onTapStart);                                                                       // 523
                                                                                                                    // 524
			_off(el, 'dragover', this._onDragOver);                                                                          // 525
			_off(el, 'dragenter', this._onDragOver);                                                                         // 526
                                                                                                                    // 527
			//remove draggable attributes                                                                                    // 528
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function(el) {                                  // 529
				el.removeAttribute('draggable');                                                                                // 530
			});                                                                                                              // 531
                                                                                                                    // 532
			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);                              // 533
                                                                                                                    // 534
			this._onDrop();                                                                                                  // 535
                                                                                                                    // 536
			this.el = null;                                                                                                  // 537
		}                                                                                                                 // 538
	};                                                                                                                 // 539
                                                                                                                    // 540
                                                                                                                    // 541
	function _bind(ctx, fn){                                                                                           // 542
		var args = slice.call(arguments, 2);                                                                              // 543
		return	fn.bind ? fn.bind.apply(fn, [ctx].concat(args)) : function (){                                             // 544
			return fn.apply(ctx, args.concat(slice.call(arguments)));                                                        // 545
		};                                                                                                                // 546
	}                                                                                                                  // 547
                                                                                                                    // 548
                                                                                                                    // 549
	function _closest(el, selector, ctx){                                                                              // 550
		if( selector === '*' ){                                                                                           // 551
			return el;                                                                                                       // 552
		}                                                                                                                 // 553
		else if( el ){                                                                                                    // 554
			ctx = ctx || document;                                                                                           // 555
			selector = selector.split('.');                                                                                  // 556
                                                                                                                    // 557
			var                                                                                                              // 558
				  tag = selector.shift().toUpperCase()                                                                          // 559
				, re = new RegExp('\\s('+selector.join('|')+')\\s', 'g')                                                        // 560
			;                                                                                                                // 561
                                                                                                                    // 562
			do {                                                                                                             // 563
				if(                                                                                                             // 564
					   (tag === '' || el.nodeName == tag)                                                                          // 565
					&& (!selector.length || ((' '+el.className+' ').match(re) || []).length == selector.length)                    // 566
				){                                                                                                              // 567
					return	el;                                                                                                     // 568
				}                                                                                                               // 569
			}                                                                                                                // 570
			while( el !== ctx && (el = el.parentNode) );                                                                     // 571
		}                                                                                                                 // 572
                                                                                                                    // 573
		return	null;                                                                                                      // 574
	}                                                                                                                  // 575
                                                                                                                    // 576
                                                                                                                    // 577
	function _globalDragOver(evt){                                                                                     // 578
		evt.dataTransfer.dropEffect = 'move';                                                                             // 579
		evt.preventDefault();                                                                                             // 580
	}                                                                                                                  // 581
                                                                                                                    // 582
                                                                                                                    // 583
	function _on(el, event, fn){                                                                                       // 584
		el.addEventListener(event, fn, false);                                                                            // 585
	}                                                                                                                  // 586
                                                                                                                    // 587
                                                                                                                    // 588
	function _off(el, event, fn){                                                                                      // 589
		el.removeEventListener(event, fn, false);                                                                         // 590
	}                                                                                                                  // 591
                                                                                                                    // 592
                                                                                                                    // 593
	function _toggleClass(el, name, state){                                                                            // 594
		if( el ){                                                                                                         // 595
			if( el.classList ){                                                                                              // 596
				el.classList[state ? 'add' : 'remove'](name);                                                                   // 597
			}                                                                                                                // 598
			else {                                                                                                           // 599
				var className = (' '+el.className+' ').replace(/\s+/g, ' ').replace(' '+name+' ', '');                          // 600
				el.className = className + (state ? ' '+name : '')                                                              // 601
			}                                                                                                                // 602
		}                                                                                                                 // 603
	}                                                                                                                  // 604
                                                                                                                    // 605
                                                                                                                    // 606
	function _css(el, prop, val){                                                                                      // 607
		if( el && el.style ){                                                                                             // 608
			if( val === void 0 ){                                                                                            // 609
				if( document.defaultView && document.defaultView.getComputedStyle ){                                            // 610
					val = document.defaultView.getComputedStyle(el, '');                                                           // 611
				}                                                                                                               // 612
				else if( el.currentStyle ){                                                                                     // 613
					val	= el.currentStyle;                                                                                         // 614
				}                                                                                                               // 615
				return	prop === void 0 ? val : val[prop];                                                                       // 616
			} else {                                                                                                         // 617
				el.style[prop] = val + (typeof val === 'string' ? '' : 'px');                                                   // 618
			}                                                                                                                // 619
		}                                                                                                                 // 620
	}                                                                                                                  // 621
                                                                                                                    // 622
                                                                                                                    // 623
	function _find(ctx, tagName, iterator){                                                                            // 624
		if( ctx ){                                                                                                        // 625
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;                                            // 626
			if( iterator ){                                                                                                  // 627
				for( ; i < n; i++ ){                                                                                            // 628
					iterator(list[i], i);                                                                                          // 629
				}                                                                                                               // 630
			}                                                                                                                // 631
			return	list;                                                                                                     // 632
		}                                                                                                                 // 633
		return	[];                                                                                                        // 634
	}                                                                                                                  // 635
                                                                                                                    // 636
                                                                                                                    // 637
	function _disableDraggable(el){                                                                                    // 638
		return el.draggable = false;                                                                                      // 639
	}                                                                                                                  // 640
                                                                                                                    // 641
                                                                                                                    // 642
	function _unsilent(){                                                                                              // 643
		_silent = false;                                                                                                  // 644
	}                                                                                                                  // 645
                                                                                                                    // 646
                                                                                                                    // 647
	function _ghostInBottom(el, evt){                                                                                  // 648
		var last = el.lastElementChild.getBoundingClientRect();                                                           // 649
		return evt.clientY - (last.top + last.height) > 5; // min delta                                                   // 650
	}                                                                                                                  // 651
                                                                                                                    // 652
                                                                                                                    // 653
	/**                                                                                                                // 654
	 * Generate id                                                                                                     // 655
	 * @param   {HTMLElement} el                                                                                       // 656
	 * @returns {String}                                                                                               // 657
	 * @private                                                                                                        // 658
	 */                                                                                                                // 659
	function _generateId(el) {                                                                                         // 660
		var str = el.tagName + el.className + el.src + el.href + el.textContent,                                          // 661
			i = str.length,                                                                                                  // 662
			sum = 0                                                                                                          // 663
		;                                                                                                                 // 664
                                                                                                                    // 665
		while (i--) {                                                                                                     // 666
			sum += str.charCodeAt(i);                                                                                        // 667
		}                                                                                                                 // 668
                                                                                                                    // 669
		return sum.toString(36);                                                                                          // 670
	}                                                                                                                  // 671
                                                                                                                    // 672
                                                                                                                    // 673
	// Export utils                                                                                                    // 674
	Sortable.utils = {                                                                                                 // 675
		on: _on,                                                                                                          // 676
		off: _off,                                                                                                        // 677
		css: _css,                                                                                                        // 678
		find: _find,                                                                                                      // 679
		bind: _bind,                                                                                                      // 680
		closest: _closest,                                                                                                // 681
		toggleClass: _toggleClass,                                                                                        // 682
		createEvent: _createEvent,                                                                                        // 683
		dispatchEvent: _dispatchEvent                                                                                     // 684
	};                                                                                                                 // 685
                                                                                                                    // 686
                                                                                                                    // 687
	Sortable.version = '0.5.2';                                                                                        // 688
                                                                                                                    // 689
                                                                                                                    // 690
	// Export                                                                                                          // 691
	return Sortable;                                                                                                   // 692
});                                                                                                                 // 693
                                                                                                                    // 694
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rubaxa:sortable'] = {
  Sortable: Sortable
};

})();
