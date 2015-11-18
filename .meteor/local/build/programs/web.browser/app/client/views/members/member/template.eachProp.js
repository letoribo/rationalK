(function(){
Template.__checkName("eachProp");
Template["eachProp"] = new Template("Template.eachProp", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("keys"));
  }, function() {
    return [ "\n        ", Blaze._InOuterTemplateScope(view, function() {
      return Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n    " ];
  });
}));

})();
