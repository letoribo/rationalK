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
var EJSON = Package.ejson.EJSON;
var _ = Package.underscore._;

/* Package-scope variables */
var Injected, Inject;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteorhacks:inject-initial/lib/inject-client.js          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Injected = {                                                         // 1
                                                                     // 2
	obj: function(name) {                                               // 3
		var json = document.getElementById(name);                          // 4
		// Apparently .text doesn't work on some IE's.                     // 5
		return json ? EJSON.parse(json.innerHTML) : undefined;             // 6
	},                                                                  // 7
                                                                     // 8
	meta: function(name) {                                              // 9
		return this.metas[name];                                           // 10
	},                                                                  // 11
                                                                     // 12
	/* internal methods */                                              // 13
                                                                     // 14
	parseMetas: function() {                                            // 15
		var metaEls = document.getElementsByTagName('meta');               // 16
		for (var i=0; i < metaEls.length; i++)                             // 17
			this.metas[ metaEls[i].getAttribute('name') ]                     // 18
				= metaEls[i].getAttribute('content');                            // 19
	},                                                                  // 20
	metas: {}                                                           // 21
}                                                                    // 22
                                                                     // 23
Injected.parseMetas();                                               // 24
                                                                     // 25
// deprecated                                                        // 26
Inject = {                                                           // 27
	getObj: Injected.obj,                                               // 28
	getMeta: Injected.meta                                              // 29
}                                                                    // 30
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:inject-initial'] = {
  Injected: Injected,
  Inject: Inject
};

})();
