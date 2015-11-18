(function(){
Template.__checkName("axapta");
Template["axapta"] = new Template("Template.axapta", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n  	  ", HTML.DIV({
    "class": "col-md-12"
  }, "\n  		   ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n  		   		", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n  		   			", HTML.H3({
    "class": "panel-title"
  }, "\n                ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "My Space");
  }), " - ", HTML.Raw('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'), "\n              "), "\n          	"), "\n    				", HTML.DIV({
    "class": "panel-body"
  }, "\n    					 ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("Axapta")),
      settings: Spacebars.call(view.lookup("settingsAxapta"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n    				"), "\n  		   "), "\n  	  "), "\n    ");
}));

})();
