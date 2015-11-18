(function(){
Template.__checkName("role");
Template["role"] = new Template("Template.role", (function() {
  var view = this;
  return HTML.SPAN({
    "class": "label label-success"
  }, Blaze.View("lookup:.", function() {
    return Spacebars.mustache(view.lookup("."));
  }));
}));

})();
