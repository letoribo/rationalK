(function(){
Template.__checkName("browse");
Template["browse"] = new Template("Template.browse", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n    	", HTML.DIV({
    "class": "col-md-12"
  }, "\n        	", Spacebars.include(view.lookupTemplate("categoriesSelector")), "\n    	"), "\n  "), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasSelectedCategory"));
  }, function() {
    return [ "\n  ", HTML.DIV({
      "class": "row"
    }, "\n	   ", HTML.DIV({
      "class": "col-md-12"
    }, "\n        	", Spacebars.include(view.lookupTemplate("docList")), "\n    	"), "\n  "), "\n  " ];
  }) ];
}));

})();
