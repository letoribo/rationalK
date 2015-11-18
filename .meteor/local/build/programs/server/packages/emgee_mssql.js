(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var Sql;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/emgee:mssql/mssql.js                                                        //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
var sql = Npm.require('mssql');                                                         // 1
                                                                                        // 2
Sql = {};                                                                               // 3
                                                                                        // 4
Sql.driver = sql;                                                                       // 5
                                                                                        // 6
if (! Meteor.settings.database ||                                                       // 7
    ! Meteor.settings.database.user ||                                                  // 8
    ! Meteor.settings.database.password) {                                              // 9
  console.error('mssql: Database unconfigured');                                        // 10
} else {                                                                                // 11
  Sql.connection = new Sql.driver.Connection(Meteor.settings.database, function (err) { // 12
    if (err) console.log("Can't connect to database");                                  // 13
  });                                                                                   // 14
}                                                                                       // 15
                                                                                        // 16
                                                                                        // 17
                                                                                        // 18
Sql.q = Meteor.wrapAsync(sqlQuery);                                                     // 19
                                                                                        // 20
function sqlQuery (query, inputs, cb) {                                                 // 21
  try {                                                                                 // 22
    if (typeof inputs === 'function') {                                                 // 23
      cb = inputs;                                                                      // 24
      inputs = null;                                                                    // 25
    }                                                                                   // 26
                                                                                        // 27
    var request = new sql.Request(Sql.connection);                                      // 28
    if (inputs) {                                                                       // 29
      if (_.isArray(inputs)) {                                                          // 30
        _.each(inputs, function (e) {                                                   // 31
          if (e.type) request.input(e.name, e.type, e.value);                           // 32
          else        request.input(e.name, e.value);                                   // 33
        });                                                                             // 34
      }                                                                                 // 35
      else if (_.isObject(inputs)) {                                                    // 36
        _.each(inputs, function (e, k) {                                                // 37
          request.input(k, e);                                                          // 38
        });                                                                             // 39
      }                                                                                 // 40
    }                                                                                   // 41
                                                                                        // 42
    request.query(query, cb);                                                           // 43
  }                                                                                     // 44
  catch (e) {                                                                           // 45
    return cb(e);                                                                       // 46
  }                                                                                     // 47
}                                                                                       // 48
                                                                                        // 49
                                                                                        // 50
                                                                                        // 51
Sql.ps = Meteor.wrapAsync(prepareStatement);                                            // 52
                                                                                        // 53
function prepareStatement (opts, cb) {                                                  // 54
  opts = opts || {};                                                                    // 55
  opts.inputs = opts.inputs || {};                                                      // 56
                                                                                        // 57
  var request = new sql.PreparedStatement(Sql.connection);                              // 58
                                                                                        // 59
  _.each(opts.inputs, function (v, k) {                                                 // 60
    request.input(k, v);                                                                // 61
  });                                                                                   // 62
                                                                                        // 63
  request.prepare(opts.query, function (err, res) {                                     // 64
    if (err) return cb(err);                                                            // 65
                                                                                        // 66
    var preparedStatement = Meteor.wrapAsync(request.execute, request);                 // 67
    preparedStatement.unprepare = request.unprepare;                                    // 68
                                                                                        // 69
    return cb(null, preparedStatement);                                                 // 70
  });                                                                                   // 71
}                                                                                       // 72
                                                                                        // 73
                                                                                        // 74
                                                                                        // 75
Sql.sp = Meteor.wrapAsync(storedProcedure);                                             // 76
                                                                                        // 77
function storedProcedure (opts, cb) {                                                   // 78
  opts = opts || {};                                                                    // 79
  opts.inputs = opts.inputs || {};                                                      // 80
  opts.outputs = opts.outputs || {};                                                    // 81
                                                                                        // 82
  var request = new sql.Request(Sql.connection);                                        // 83
                                                                                        // 84
  _.each(opts.inputs, function (i) {                                                    // 85
    request.input(i.name, i.type, i.value);                                             // 86
  });                                                                                   // 87
                                                                                        // 88
  _.each(opts.outputs, function (type, name) {                                          // 89
    request.output(name, type);                                                         // 90
  });                                                                                   // 91
                                                                                        // 92
  request.execute(opts.sp, function(err, recordsets, returnValue) {                     // 93
    return cb(err, recordsets)                                                          // 94
  });                                                                                   // 95
}                                                                                       // 96
                                                                                        // 97
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['emgee:mssql'] = {
  Sql: Sql
};

})();

//# sourceMappingURL=emgee_mssql.js.map
