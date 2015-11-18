(function(){
Template.__checkName("filelinks");
Template["filelinks"] = new Template("Template.filelinks", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Filelinks");
  })), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Settings");
  })), "\n					", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "settingsTemplate");
    },
    tite: function() {
      return Spacebars.mustache(view.lookup("_"), "Settings");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Settings");
  })), "\n\n					", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All filelinks");
  })), "\n						", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("Filelinks")),
      settings: Spacebars.call(view.lookup("settingsFilelinks"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        	"), "\n    		"), "\n		"), "\n	");
}));

})();
