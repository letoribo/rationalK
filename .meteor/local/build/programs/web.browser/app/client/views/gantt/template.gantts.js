(function(){
Template.__checkName("gantts");
Template["gantts"] = new Template("Template.gantts", (function() {
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
  }, "Gantts ", HTML.A({
    href: "#",
    "class": "newGantt pull-right",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "New Gantt");
    }
  }, "+")), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-12"
  }, "\n								", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("Gantts")),
      settings: Spacebars.call(view.lookup("settingsGantts"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n						"), "\n					"), "\n    		"), "\n			"), "\n		"), "\n	");
}));

})();
