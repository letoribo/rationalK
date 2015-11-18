(function(){
Template.__checkName("history");
Template["history"] = new Template("Template.history", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("history"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": "history"
    }, Blaze.View("lookup:who", function() {
      return Spacebars.mustache(view.lookup("who"));
    }), " ", Blaze.View("lookup:what", function() {
      return Spacebars.mustache(view.lookup("what"));
    })), "\n    " ];
  });
}));

})();
