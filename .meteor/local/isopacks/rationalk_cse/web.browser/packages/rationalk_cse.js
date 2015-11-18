(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/methods.js                                                                   //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
RKCSE = {};                                                                                                // 1
                                                                                                           // 2
RKCSE.findAll = function () {                                                                              // 3
  return WebSearchResults.find();                                                                          // 4
};                                                                                                         // 5
                                                                                                           // 6
RKCSE.findFullText = function (searchQuery) {                                                              // 7
  return WebSearchResults.find( {                                                                          // 8
        $text: {                                                                                           // 9
          $search: searchQuery,                                                                            // 10
        },                                                                                                 // 11
    }, {                                                                                                   // 12
        fields: { score: { $meta: 'textScore' } },                                                         // 13
        sort: { score: { $meta: 'textScore' } },                                                           // 14
        limit: 30,                                                                                         // 15
    });                                                                                                    // 16
};                                                                                                         // 17
                                                                                                           // 18
RKCSE.findDummy = function () {                                                                            // 19
  return WebSearchResults.find({$text: { $search: "somethingthatyouwillneverfind" }});                     // 20
};                                                                                                         // 21
                                                                                                           // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/collections.js                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
WebSearchResults = new Mongo.Collection('websearchresults');                                               // 1
                                                                                                           // 2
WebSearchResults.allow( {                                                                                  // 3
		insert: function (userId) {return !! userId; },                                                          // 4
		update: function (userId) {return !!userId; },                                                           // 5
    remove: function (userId) {return !!userId; },                                                         // 6
});                                                                                                        // 7
                                                                                                           // 8
                                                                                                           // 9
//expose it to the other packages :                                                                        // 10
RKCSE.WebSearchResults = WebSearchResults;                                                                 // 11
                                                                                                           // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rationalk:cse/lib/client/template.webInSearchResults.js                                        //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
                                                                                                           // 1
Template.__checkName("webInSearchResults");                                                                // 2
Template["webInSearchResults"] = new Template("Template.webInSearchResults", (function() {                 // 3
  var view = this;                                                                                         // 4
  return HTML.DIV({                                                                                        // 5
    "class": "row"                                                                                         // 6
  }, "\n    ", HTML.DIV({                                                                                  // 7
    "class": "col-md-2"                                                                                    // 8
  }, "\n      ", HTML.IMG({                                                                                // 9
    width: "100",                                                                                          // 10
    src: function() {                                                                                      // 11
      return Spacebars.mustache(view.lookup("thumb"));                                                     // 12
    }                                                                                                      // 13
  }), "\n    "), "\n		", HTML.DIV({                                                                        // 14
    "class": "col-md-8"                                                                                    // 15
  }, "\n      ", HTML.A({                                                                                  // 16
    href: function() {                                                                                     // 17
      return Spacebars.mustache(view.lookup("link"));                                                      // 18
    },                                                                                                     // 19
    target: "_blank"                                                                                       // 20
  }, Blaze.View("lookup:title", function() {                                                               // 21
    return Spacebars.mustache(view.lookup("title"));                                                       // 22
  })), "\n			", HTML.P(Blaze.View("lookup:snippet", function() {                                           // 23
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("snippet")));                                  // 24
  })), "\n		"), HTML.Raw('\n		<div class="col-md-2">\n			<span class="label label-success"> Web</span><br>\n		</div>\n	'));
}));                                                                                                       // 26
                                                                                                           // 27
Template.__checkName("webInSearchResultsCheckbox");                                                        // 28
Template["webInSearchResultsCheckbox"] = new Template("Template.webInSearchResultsCheckbox", (function() { // 29
  var view = this;                                                                                         // 30
  return HTML.DIV({                                                                                        // 31
    id: "includeWebInResultsDiv",                                                                          // 32
    "class": "checkbox includeWebInResultsCheckbox"                                                        // 33
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT({                                                         // 34
    type: "checkbox",                                                                                      // 35
    checked: function() {                                                                                  // 36
      return Spacebars.mustache(view.lookup("includeWebInResults"));                                       // 37
    },                                                                                                     // 38
    id: "includeWebInResultsCheckbox"                                                                      // 39
  }), " ", Blaze.View("lookup:_", function() {                                                             // 40
    return Spacebars.mustache(view.lookup("_"), "Include Web");                                            // 41
  }), "\n    "), "\n  ");                                                                                  // 42
}));                                                                                                       // 43
                                                                                                           // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
