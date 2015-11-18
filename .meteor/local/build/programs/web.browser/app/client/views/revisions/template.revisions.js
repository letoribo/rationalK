(function(){
Template.__checkName("revisions");
Template["revisions"] = new Template("Template.revisions", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n                ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "revisions");
    }
  }, "Revisions"), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("revisions")),
      settings: Spacebars.call(view.lookup("tableSettings"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        "), "\n    ");
}));

})();
