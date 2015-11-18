(function(){
Template.__checkName("greenLabel");
Template["greenLabel"] = new Template("Template.greenLabel", (function() {
  var view = this;
  return HTML.SPAN({
    "class": "label label-success"
  }, Blaze.View("lookup:.", function() {
    return Spacebars.mustache(view.lookup("."));
  }));
}));

Template.__checkName("redLabel");
Template["redLabel"] = new Template("Template.redLabel", (function() {
  var view = this;
  return HTML.SPAN({
    "class": "label label-danger"
  }, Blaze.View("lookup:.", function() {
    return Spacebars.mustache(view.lookup("."));
  }));
}));

})();
