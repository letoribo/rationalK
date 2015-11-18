(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var DDP = Package.ddp.DDP;
var DDPServer = Package.ddp.DDPServer;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Inject = Package['meteorhacks:inject-initial'].Inject;

/* Package-scope variables */
var headers, key;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/gadicohen:headers/lib/headers-common.js                                                     //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
headers = {                                                                                             // 1
	list: {},                                                                                              // 2
	proxyCount: 0,                                                                                         // 3
	setProxyCount: function(proxyCount) {                                                                  // 4
	    this.proxyCountDeprecated(true);                                                                   // 5
		this.proxyCount = proxyCount;                                                                         // 6
	},                                                                                                     // 7
	getProxyCount: function() {                                                                            // 8
		return this.proxyCount;                                                                               // 9
	},                                                                                                     // 10
	proxyCountDeprecated: function(proxyCount) {                                                           // 11
		if (proxyCount)                                                                                       // 12
		console.log('Specifying the proxyCount is deprecated.  By default, '                                  // 13
			+ 'we now use the HTTP_FORWARDED_COUNT environment variable which '                                  // 14
			+ 'is used by Meteor 0.7.1+ too (and set by default in development '                                 // 15
			+ 'environment and meteor.com with correct values.');                                                // 16
	}                                                                                                      // 17
}                                                                                                       // 18
                                                                                                        // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/gadicohen:headers/lib/headers-server.js                                                     //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var HEADERS_CLEANUP_TIME = 300000;  // 5 minutes                                                        // 1
var FILTERED_HEADERS = ['user-agent', 'cookie', 'authorization'];                                       // 2
                                                                                                        // 3
// be helpful on meteor.com                                                                             // 4
if (process.env.ROOT_URL.match(/meteor.com$/i) &&                                                       // 5
      typeof(process.env.HTTP_FORWARDED_COUNT) == 'undefined')                                          // 6
    process.env.HTTP_FORWARDED_COUNT = 1;                                                               // 7
                                                                                                        // 8
// Since Meteor 0.7.1, replaces headers.setProxy(count);                                                // 9
// +1 is for our strategy of always adding the host to x-ip-chain                                       // 10
if (process.env.HTTP_FORWARDED_COUNT)                                                                   // 11
  headers.proxyCount = parseInt(process.env.HTTP_FORWARDED_COUNT);                                      // 12
                                                                                                        // 13
/*                                                                                                      // 14
 * Returns an array describing the suspected IP route the connection has taken.                         // 15
 * This is in order of trust, see the README.md for which value to use                                  // 16
 */                                                                                                     // 17
function ipChain(headers, connection) {                                                                 // 18
  var chain = [];                                                                                       // 19
  if (headers['x-forwarded-for'])                                                                       // 20
    _.each(headers['x-forwarded-for'].split(','), function(ip) {                                        // 21
      chain.push(ip.replace('/\s*/g', ''));                                                             // 22
    });                                                                                                 // 23
//  if (chain.length == 0 || chain[chain.length-1] != connection.remoteAddress)                         // 24
    chain.push(connection.remoteAddress);                                                               // 25
  return chain;                                                                                         // 26
}                                                                                                       // 27
                                                                                                        // 28
/*                                                                                                      // 29
 * After user has requested the headers (which were stored in headers.list                              // 30
 * at the same time with the client's token, the below is called, which we                              // 31
 * use to re-associate with the user's livedata session (see above)                                     // 32
 */                                                                                                     // 33
Meteor.methods({                                                                                        // 34
  'headersToken': function(token) {                                                                     // 35
  	check(token, Number);                                                                                // 36
    if (headers.list[token]) {                                                                          // 37
      var data = this.connection || this._sessionData;                                                  // 38
      data.headers = headers.list[token];                                                               // 39
      headerDep(data).changed();                                                                        // 40
                                                                                                        // 41
      // Don't do this until Meteor resumes sessions.  Consider                                         // 42
      // longer cleanup time, and keeping last reassocation time.                                       // 43
      // Or on disconnect, put back in the list with disconnect                                         // 44
      // time and keep that for cleanup_time (can do in 0.7+).                                          // 45
      // delete headers.list[token];                                                                    // 46
    }                                                                                                   // 47
  }                                                                                                     // 48
});                                                                                                     // 49
                                                                                                        // 50
/*                                                                                                      // 51
 * Cleanup unclaimed headers                                                                            // 52
 */                                                                                                     // 53
Meteor.setInterval(function() {                                                                         // 54
  for (key in headers.list)                                                                             // 55
    if (parseInt(key) < new Date().getTime() - HEADERS_CLEANUP_TIME)                                    // 56
      delete(headers.list[key]);                                                                        // 57
}, HEADERS_CLEANUP_TIME);                                                                               // 58
                                                                                                        // 59
/*                                                                                                      // 60
 * Return the headerDep.  Create if necessary.                                                          // 61
 */                                                                                                     // 62
function headerDep(obj) {                                                                               // 63
  if (!obj.headerDep)                                                                                   // 64
    obj.headerDep = new Deps.Dependency();                                                              // 65
  return obj.headerDep;                                                                                 // 66
}                                                                                                       // 67
                                                                                                        // 68
/*                                                                                                      // 69
 * Provide helpful hints for incorrect usage                                                            // 70
 */                                                                                                     // 71
function checkSelf(self, funcName) {                                                                    // 72
  if (!self || (!self.connection && !self._session && !self._sessionData))                              // 73
    throw new Error('Call headers.' + funcName + '(this) only from within a '                           // 74
    	+ 'method or publish function.  With callbacks / anonymous '                                       // 75
    	+ 'functions, use: var self=this; and call headers.'+funcName+'(self);');                          // 76
}                                                                                                       // 77
                                                                                                        // 78
/*                                                                                                      // 79
 * Usage in a Meteor method/publish: headers.get(this, 'host')                                          // 80
 */                                                                                                     // 81
headers.get = function(self, key) {                                                                     // 82
  checkSelf(self, 'get');                                                                               // 83
  var sessionData = self.connection || (self._session ? self._session.sessionData : self._sessionData); // 84
                                                                                                        // 85
  headerDep(sessionData).depend();                                                                      // 86
  if (!(sessionData && sessionData.headers))                                                            // 87
    return key ? undefined : {};                                                                        // 88
                                                                                                        // 89
  return key                                                                                            // 90
    ? sessionData.headers[key.toLocaleLowerCase()]                                                      // 91
    : sessionData.headers;                                                                              // 92
}                                                                                                       // 93
                                                                                                        // 94
headers.ready = function(self) {                                                                        // 95
  checkSelf(self, 'ready');                                                                             // 96
  var sessionData = self.connection || (self._session ? self._session.sessionData : self._sessionData); // 97
  headerDep(sessionData).depend();                                                                      // 98
  return Object.keys(sessionData.headers).length > 0;                                                   // 99
}                                                                                                       // 100
                                                                                                        // 101
headers.getClientIP = function(self, proxyCount) {                                                      // 102
  checkSelf(self, 'getClientIP');                                                                       // 103
  var chain = this.get(self, 'x-ip-chain').split(',');                                                  // 104
  if (typeof(proxyCount) == 'undefined') {                                                              // 105
    this.proxyCountDeprecated(proxyCount);                                                              // 106
    proxyCount = this.proxyCount;                                                                       // 107
  }                                                                                                     // 108
  return chain[chain.length - proxyCount - 1];                                                          // 109
}                                                                                                       // 110
                                                                                                        // 111
/*                                                                                                      // 112
 * Retrieve header(s) for the current method socket (see README.md)                                     // 113
 */                                                                                                     // 114
headers.methodGet = function(self, header) {                                                            // 115
  var session, headers, chain;                                                                          // 116
  checkSelf(self, 'methodGet');                                                                         // 117
                                                                                                        // 118
  if (self.connection) {                                                                                // 119
    // Meteor 0.6.7+                                                                                    // 120
    session = Meteor.server.sessions[self.connection.id];                                               // 121
  } else if (self._session || self._sessionData) {                                                      // 122
    // convoluted way to find our session in Meteor < 0.6.7                                             // 123
    var sessionData = self._session ? self._session.sessionData : self._sessionData;                    // 124
    var token, session;                                                                                 // 125
    token = new Date().getTime() + Math.random();                                                       // 126
    sessionData.tmpToken = token;                                                                       // 127
    session = _.find(Meteor.server.sessions, function(session) {                                        // 128
      return sessionData.tmpToken == token;                                                             // 129
    });                                                                                                 // 130
  }                                                                                                     // 131
                                                                                                        // 132
  headers = session.socket.headers;                                                                     // 133
  if (!headers['x-ip-chain'])                                                                           // 134
	  headers['x-ip-chain'] = ipChain(headers, session.socket);                                            // 135
                                                                                                        // 136
  return header ? headers[header] : headers;                                                            // 137
}                                                                                                       // 138
                                                                                                        // 139
/*                                                                                                      // 140
 * Get the IP for the livedata connection used by a Method (see README.md)                              // 141
 */                                                                                                     // 142
headers.methodClientIP = function(self, proxyCount) {                                                   // 143
  checkSelf(self, 'methodClientIP');                                                                    // 144
  var chain = this.methodGet(self, 'x-ip-chain');                                                       // 145
  if (typeof(proxyCount) == 'undefined') {                                                              // 146
    this.proxyCountDeprecated(proxyCount);                                                              // 147
    proxyCount = this.proxyCount;                                                                       // 148
  }                                                                                                     // 149
  return chain[chain.length - proxyCount - 1];                                                          // 150
}                                                                                                       // 151
                                                                                                        // 152
                                                                                                        // 153
// What's safe + necessary to send back to the client?                                                  // 154
var filtered = function(headers) {                                                                      // 155
  var out = {};                                                                                         // 156
                                                                                                        // 157
  for (var key in headers)                                                                              // 158
    if (FILTERED_HEADERS.indexOf(key) === -1                                                            // 159
        && !headers[key].match(/<\/?\s*script\s*>/i))                                                   // 160
      out[key] = headers[key];                                                                          // 161
                                                                                                        // 162
  return out;                                                                                           // 163
}                                                                                                       // 164
                                                                                                        // 165
/*                                                                                                      // 166
 * The client will request this "script", and send a unique token with it,                              // 167
 * which we later use to re-associate the headers from this request with                                // 168
 * the user's livedata session (since XHR requests only send a subset of                                // 169
 * all the regular headers).                                                                            // 170
 */                                                                                                     // 171
WebApp.connectHandlers.use('/headersHelper.js', function(req, res, next) {                              // 172
  var token = req.query.token;                                                                          // 173
  var mhData = { headers: {} };                                                                         // 174
                                                                                                        // 175
  req.headers['x-ip-chain'] = ipChain(req.headers, req.connection).join(',');                           // 176
  headers.list[token] = req.headers;                                                                    // 177
  mhData.headers = filtered(req.headers);                                                               // 178
                                                                                                        // 179
  if (headers.proxyCount)                                                                               // 180
    mhData.proxyCount = headers.proxyCount;                                                             // 181
                                                                                                        // 182
  res.writeHead(200, { 'Content-type': 'application/javascript' });                                     // 183
  res.end("Package['gadicohen:headers'].headers.store("                                                 // 184
    + JSON.stringify(mhData) + ");", 'utf8');                                                           // 185
});                                                                                                     // 186
                                                                                                        // 187
// Can only inject headers w/o appcache                                                                 // 188
if (!Package.appcache)                                                                                  // 189
WebApp.connectHandlers.use(function(req, res, next) {                                                   // 190
  if(Inject.appUrl(req.url)) {                                                                          // 191
  	var mhData = {                                                                                       // 192
      token: new Date().getTime() + Math.random()                                                       // 193
    }                                                                                                   // 194
    if (headers.proxyCount)                                                                             // 195
      mhData.proxyCount = headers.proxyCount;                                                           // 196
                                                                                                        // 197
    req.headers['x-ip-chain'] = ipChain(req.headers, req.connection).join(',');                         // 198
    headers.list[mhData.token] = req.headers;                                                           // 199
    mhData.headers = filtered(req.headers);                                                             // 200
                                                                                                        // 201
    Inject.obj('meteor-headers', mhData, res);                                                          // 202
  }                                                                                                     // 203
  next();                                                                                               // 204
});                                                                                                     // 205
                                                                                                        // 206
                                                                                                        // 207
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicohen:headers'] = {
  headers: headers
};

})();

//# sourceMappingURL=gadicohen_headers.js.map
