(function(){
Template.__checkName("xml");
Template["xml"] = new Template("Template.xml", (function() {
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
    return Spacebars.mustache(view.lookup("_"), "XML");
  })), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All XML");
  })), "\n						", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("XMLFiles")),
      settings: Spacebars.call(view.lookup("settingsXMLFiles"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        	"), "\n    		"), "\n		"), "\n	");
}));

})();
