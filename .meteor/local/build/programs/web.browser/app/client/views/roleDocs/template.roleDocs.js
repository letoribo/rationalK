(function(){
Template.__checkName("listDocsForRoles");
Template["listDocsForRoles"] = new Template("Template.listDocsForRoles", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Document for the role");
  }), " : ", Blaze.View("lookup:roleSlug", function() {
    return Spacebars.mustache(view.lookup("roleSlug"));
  })), "\n        "), "\n        ", HTML.DIV({
    "class": "staffs panel-body"
  }, "\n          ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("docsForRole")),
      settings: Spacebars.call(view.lookup("settingsdocsForRole"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        "), "\n    ");
}));

})();
