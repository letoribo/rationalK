(function(){
Template.__checkName("calculation");
Template["calculation"] = new Template("Template.calculation", (function() {
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
    return Spacebars.mustache(view.lookup("_"), "Calculation");
  })), "\n          	"), "\n  				  ", HTML.DIV({
    "class": "panel-body"
  }, "\n  					       ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Products"));
  }, function() {
    return [ "\n                   ", HTML.P("Designation : ", Blaze.View("lookup:Designation", function() {
      return Spacebars.mustache(view.lookup("Designation"));
    })), "\n                   ", HTML.P("ID : ", Blaze.View("lookup:ID", function() {
      return Spacebars.mustache(view.lookup("ID"));
    })), "\n                   ", HTML.P("weightBeforeTurning AE : ", Blaze.View("lookup:weightBeforeTurning.AE", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("weightBeforeTurning"), "AE"));
    })), "\n                   ", HTML.P("weightBeforeTurning AI : ", Blaze.View("lookup:weightBeforeTurning.AI", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("weightBeforeTurning"), "AI"));
    })), "\n                   " ];
  }), "\n  				  "), "\n  		   "), "\n  	  "), "\n    ");
}));

})();
