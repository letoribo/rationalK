(function(){
Template.__checkName("docHistory");
Template["docHistory"] = new Template("Template.docHistory", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n    ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n        ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Logs");
  })), "\n    "), "\n    ", HTML.DIV({
    "class": "panel-body"
  }, "\n      ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("docHistory")),
      settings: Spacebars.call(view.lookup("settingsDocHistory"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n    "), "\n  ");
}));

})();
