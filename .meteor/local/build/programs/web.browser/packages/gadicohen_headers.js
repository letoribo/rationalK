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
var WebApp = Package.webapp.WebApp;
var DDP = Package.ddp.DDP;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Injected = Package['meteorhacks:inject-initial'].Injected;
var Inject = Package['meteorhacks:inject-initial'].Inject;

/* Package-scope variables */
var headers;

(function () {

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/gadicohen:headers/lib/headers-common.js                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
headers = {                                                                // 1
	list: {},                                                                 // 2
	proxyCount: 0,                                                            // 3
	setProxyCount: function(proxyCount) {                                     // 4
	    this.proxyCountDeprecated(true);                                      // 5
		this.proxyCount = proxyCount;                                            // 6
	},                                                                        // 7
	getProxyCount: function() {                                               // 8
		return this.proxyCount;                                                  // 9
	},                                                                        // 10
	proxyCountDeprecated: function(proxyCount) {                              // 11
		if (proxyCount)                                                          // 12
		console.log('Specifying the proxyCount is deprecated.  By default, '     // 13
			+ 'we now use the HTTP_FORWARDED_COUNT environment variable which '     // 14
			+ 'is used by Meteor 0.7.1+ too (and set by default in development '    // 15
			+ 'environment and meteor.com with correct values.');                   // 16
	}                                                                         // 17
}                                                                          // 18
                                                                           // 19
/////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/gadicohen:headers/lib/headers-client.js                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
/*                                                                         // 1
 * Generate a unique token                                                 // 2
 */                                                                        // 3
headers.token = new Date().getTime() + Math.random();                      // 4
                                                                           // 5
/*                                                                         // 6
 * Used for reactivity                                                     // 7
 */                                                                        // 8
headers.dep = new Deps.Dependency;                                         // 9
                                                                           // 10
/*                                                                         // 11
 * Called after receiving all the headers, used to re-associate headers    // 12
 * with this clients livedata session (see headers-server.js)              // 13
 */                                                                        // 14
headers.store = function(mhData) {                                         // 15
	this.list = mhData.headers;                                               // 16
	if (mhData.proxyCount)                                                    // 17
		this.proxyCount = mhData.proxyCount;                                     // 18
	Meteor.call('headersToken', mhData.token || this.token);                  // 19
 	for (var i=0; i < this.readies.length; i++)                              // 20
 		this.readies[i]();                                                      // 21
 	this.readiesRun = true;                                                  // 22
 	this.dep.changed();                                                      // 23
};                                                                         // 24
                                                                           // 25
// On each disconnect, queue reassociation for next connection             // 26
Deps.autorun(function() {                                                  // 27
	var status = Meteor.status();                                             // 28
	if (!status.connected && status.retryCount == 0) {                        // 29
		Meteor.call('headersToken', headers.token);                              // 30
	}                                                                         // 31
});                                                                        // 32
                                                                           // 33
/*                                                                         // 34
 * This has two completely different uses, but retains the same name       // 35
 * as this is what people expect.                                          // 36
 *                                                                         // 37
 * With an arg: Store a callback to be run when headersHelper.js completes // 38
 * Without an arg: Return a reactive boolean on whether or not we're ready // 39
 */                                                                        // 40
headers.readies = [];                                                      // 41
headers.readiesRun = false;                                                // 42
headers.ready = function(callback) {                                       // 43
	if (callback) {                                                           // 44
		this.readies.push(callback);                                             // 45
		// Run immediately if headers.store() was already called previously      // 46
		if (this.readiesRun)                                                     // 47
			callback();                                                             // 48
	} else {                                                                  // 49
		this.dep.depend();                                                       // 50
		return Object.keys(this.list).length > 0;                                // 51
	}                                                                         // 52
};                                                                         // 53
                                                                           // 54
var __headers__ = Inject.getObj('meteor-headers');                         // 55
if (__headers__) {                                                         // 56
	// Since 0.0.13, headers are available before this package is loaded :)   // 57
	headers.store(__headers__);                                               // 58
	delete(__headers__);                                                      // 59
} else {                                                                   // 60
	// Except in tests, browserPolicy disallowInlineScripts() and appcache    // 61
	/*                                                                        // 62
 	* Create another connection to retrieve our headers (see README.md for   // 63
 	* why this is necessary).  Called with our unique token, the retrieved   // 64
 	* code runs headers.store() above with the results                       // 65
	*/                                                                        // 66
	(function(d, t) {                                                         // 67
	    var g = d.createElement(t),                                           // 68
	        s = d.getElementsByTagName(t)[0];                                 // 69
	    g.src = '/headersHelper.js?token=' + headers.token;                   // 70
	    s.parentNode.insertBefore(g, s);                                      // 71
	}(document, 'script'));                                                   // 72
}                                                                          // 73
                                                                           // 74
/*                                                                         // 75
 * Get a header or all headers                                             // 76
 */                                                                        // 77
headers.get = function(header) {                                           // 78
 	this.dep.depend();                                                       // 79
	return header ? this.list[header.toLocaleLowerCase()] : this.list;        // 80
}                                                                          // 81
                                                                           // 82
/*                                                                         // 83
 * Get the client's IP address (see README.md)                             // 84
 */                                                                        // 85
headers.getClientIP = function(proxyCount) {                               // 86
	var chain = this.get('x-ip-chain').split(',');                            // 87
	if (typeof(proxyCount) == 'undefined')                                    // 88
		proxyCount = this.proxyCount;                                            // 89
	return chain[chain.length - proxyCount - 1];                              // 90
}                                                                          // 91
                                                                           // 92
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicohen:headers'] = {
  headers: headers
};

})();
