(function(){
Template.__checkName("process");
Template["process"] = new Template("Template.process", (function() {
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
  }, "Process : ", Blaze.View("lookup:ProcessTitle", function() {
    return Spacebars.mustache(view.lookup("ProcessTitle"));
  })), "\n        		"), "\n				", HTML.Raw('<div class="panel-body">\n					<p>Clic an element to add some notes to it.</p>\n		        	<!-- element to draw bpmn diagram in -->\n					<div id="canvas"></div>\n        		</div>'), "\n    		"), "\n		"), "\n	");
}));

})();
