(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rationalk:cse/lib/methods.js                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
RKCSE = {};                                                                            // 1
                                                                                       // 2
RKCSE.findAll = function () {                                                          // 3
  return WebSearchResults.find();                                                      // 4
};                                                                                     // 5
                                                                                       // 6
RKCSE.findFullText = function (searchQuery) {                                          // 7
  return WebSearchResults.find( {                                                      // 8
        $text: {                                                                       // 9
          $search: searchQuery,                                                        // 10
        },                                                                             // 11
    }, {                                                                               // 12
        fields: { score: { $meta: 'textScore' } },                                     // 13
        sort: { score: { $meta: 'textScore' } },                                       // 14
        limit: 30,                                                                     // 15
    });                                                                                // 16
};                                                                                     // 17
                                                                                       // 18
RKCSE.findDummy = function () {                                                        // 19
  return WebSearchResults.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 20
};                                                                                     // 21
                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rationalk:cse/lib/collections.js                                           //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
WebSearchResults = new Mongo.Collection('websearchresults');                           // 1
                                                                                       // 2
WebSearchResults.allow( {                                                              // 3
		insert: function (userId) {return !! userId; },                                      // 4
		update: function (userId) {return !!userId; },                                       // 5
    remove: function (userId) {return !!userId; },                                     // 6
});                                                                                    // 7
                                                                                       // 8
                                                                                       // 9
//expose it to the other packages :                                                    // 10
RKCSE.WebSearchResults = WebSearchResults;                                             // 11
                                                                                       // 12
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/rationalk:cse/lib/server/publications.js                                   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
Meteor.publish('cse', function (query) {                                               // 1
  var self = this;                                                                     // 2
  var response;                                                                        // 3
  var thumb;                                                                           // 4
  var doc;                                                                             // 5
  check(query, String);                                                                // 6
  if (typeof Meteor.settings.cse !== 'undefined') {                                    // 7
  if (query) {                                                                         // 8
    try {                                                                              // 9
      response = Meteor.http.get('https://www.googleapis.com/customsearch/v1', {       // 10
        params: {                                                                      // 11
          q: query,                                                                    // 12
          cx: Meteor.settings.cse.cx,                                                  // 13
          key: Meteor.settings.cse.key,                                                // 14
        },                                                                             // 15
      });                                                                              // 16
      _.each(response.data.items, function (item) {                                    // 17
        if (typeof item.pagemap.cse_thumbnail !== 'undefined') {                       // 18
          thumb = item.pagemap.cse_thumbnail[0].src;                                   // 19
        }                                                                              // 20
        else {                                                                         // 21
          thumb = "/images/noimgavailable.png";                                        // 22
        }                                                                              // 23
        doc = {                                                                        // 24
          thumb: thumb,                                                                // 25
          title: item.title,                                                           // 26
          link: item.link,                                                             // 27
          snippet: item.snippet,                                                       // 28
        };                                                                             // 29
                                                                                       // 30
        self.added('websearchresults', Random.id(), doc);                              // 31
      });                                                                              // 32
      self.ready();                                                                    // 33
    }                                                                                  // 34
    catch(error) {                                                                     // 35
      console.log(error);                                                              // 36
    }                                                                                  // 37
  }                                                                                    // 38
  else {                                                                               // 39
    self.ready();                                                                      // 40
  }                                                                                    // 41
  }                                                                                    // 42
  else {                                                                               // 43
    console.log("You need to defined cse in your setting file settings.json");         // 44
  }                                                                                    // 45
});                                                                                    // 46
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
