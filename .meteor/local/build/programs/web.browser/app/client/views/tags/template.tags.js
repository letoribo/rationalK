(function(){
Template.__checkName("tags");
Template["tags"] = new Template("Template.tags", (function() {
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
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Tags");
  }), " ", HTML.A({
    href: "#",
    "class": "analyseTags pull-right",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Analyse tags");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-refresh"></span>'))), "\n          		"), "\n  				", HTML.DIV({
    "class": "panel-body"
  }, "\n  					", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("tags")),
      settings: Spacebars.call(view.lookup("settingsTags"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n  				"), "\n  		   "), "\n  	  "), "\n    ");
}));

})();
