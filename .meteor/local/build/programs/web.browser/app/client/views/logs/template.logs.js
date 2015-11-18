(function(){
Template.__checkName("logs");
Template["logs"] = new Template("Template.logs", (function() {
  var view = this;
  return [ HTML.Raw('<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Help</h3>\n        		</div>\n				<div class="panel-body">\n					<p>This is where you can understand what people are looking for and how they use rationalK.</p>\n        		</div>\n    		</div>\n		</div>\n	</div>\n	'), HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Logs</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("logs"));
  }, function() {
    return [ "\n					    	", HTML.DIV({
      "class": "post"
    }, "\n							", HTML.P(HTML.SMALL(Blaze.View("lookup:prettyDate", function() {
      return Spacebars.mustache(view.lookup("prettyDate"));
    })), " ", HTML.SPAN({
      "class": "label label-primary"
    }, "by ", Blaze.View("lookup:who", function() {
      return Spacebars.mustache(view.lookup("who"));
    }), " (userId : ", Blaze.View("lookup:userId", function() {
      return Spacebars.mustache(view.lookup("userId"));
    }), ")"), Blaze.View("lookup:truncatedWhat", function() {
      return Spacebars.mustache(view.lookup("truncatedWhat"));
    })), "\n					    	"), "\n					    " ];
  }, function() {
    return [ "\n					    	", HTML.P("There is nothing to show here for the moment"), "\n					    " ];
  }), "\n        		"), "\n    		"), "    		\n		"), "\n	") ];
}));

})();
