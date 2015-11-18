(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var moment = Package['momentjs:moment'].moment;

(function () {

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/netanelgilad:moment-business/moment-business.js                    //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
/**                                                                            // 1
 * momentjs-business.js                                                        // 2
 * businessDiff (mStartDate)                                                   // 3
 * businessAdd (numberOfDays)                                                  // 4
 */                                                                            // 5
                                                                               // 6
moment.fn.businessDiff = function (start) {                                    // 7
  start = moment(start);                                                       // 8
  var end = this.clone();                                                      // 9
  var start_offset = start.day() - 7;                                          // 10
  var end_offset = end.day();                                                  // 11
                                                                               // 12
  var end_sunday = end.clone().subtract(end_offset, 'd').startOf('day');       // 13
  var start_sunday = start.clone().subtract(start_offset, 'd').startOf('day'); // 14
  var weeks = end_sunday.diff(start_sunday, 'days') / 7;                       // 15
                                                                               // 16
  start_offset = Math.abs(start_offset);                                       // 17
  if(start_offset == 7)                                                        // 18
    start_offset = 5;                                                          // 19
  else if(start_offset == 1)                                                   // 20
    start_offset = 0;                                                          // 21
  else                                                                         // 22
    start_offset -= 2;                                                         // 23
                                                                               // 24
                                                                               // 25
  if(end_offset == 6)                                                          // 26
    end_offset--;                                                              // 27
                                                                               // 28
  return weeks * 5 + start_offset + end_offset;                                // 29
};                                                                             // 30
                                                                               // 31
moment.fn.businessAdd = function (days) {                                      // 32
  var d = this.clone().add('d', Math.floor(days / 5) * 7);                     // 33
  var remaining = days % 5;                                                    // 34
  while(remaining){                                                            // 35
    d.add('d', 1);                                                             // 36
    if(d.day() !== 0 && d.day() !== 6)                                         // 37
      remaining--;                                                             // 38
  }                                                                            // 39
  return d;                                                                    // 40
};                                                                             // 41
                                                                               // 42
/////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['netanelgilad:moment-business'] = {};

})();

//# sourceMappingURL=netanelgilad_moment-business.js.map
