(function(){
Template.__checkName("viewEdit");
Template["viewEdit"] = new Template("Template.viewEdit", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "panel panel-default"
  }, "\n		", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Add a field");
  })), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n              ", Spacebars.include(view.lookupTemplate("fieldAdd")), "\n        "), "\n	"), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("fieldKeys"));
  }, function() {
    return [ "\n		    ", HTML.FORM({
      "class": "main",
      role: "form",
      id: "viewEdit"
    }, "\n		        ", HTML.UL({
      id: "fields",
      style: "padding-left:0; list-style-type:none"
    }, "\n		        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("fieldKeys"));
    }, function() {
      return [ "\n		            ", HTML.DIV({
        "class": "post"
      }, "\n		            ", Spacebars.include(view.lookupTemplate("fieldForView")), "\n		            "), "\n		        " ];
    }), "\n		        "), "\n		     "), "\n     " ];
  }) ];
}));

})();
