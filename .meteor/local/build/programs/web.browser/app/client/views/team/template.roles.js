(function(){
Template.__checkName("roles");
Template["roles"] = new Template("Template.roles", (function() {
  var view = this;
  return [ HTML.Raw('<link rel="stylesheet" type="text/css" href="/loudev/css/multi-select.css">\n    '), HTML.DIV({
    "class": "form-group"
  }, "\n        ", HTML.A({
    href: "#",
    id: "select-all"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All");
  })), " ↔ ", HTML.A({
    href: "#",
    id: "select-none"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "None");
  })), "\n        ", HTML.SELECT({
    "class": "form-control",
    id: "roles",
    name: "roles",
    multiple: "multiple"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("roles"));
  }, function() {
    return [ "\n          ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("name"));
      }
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n          " ];
  }), "\n        "), "\n    ") ];
}));

})();
