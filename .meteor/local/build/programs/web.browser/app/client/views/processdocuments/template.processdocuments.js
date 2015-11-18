(function(){
Template.__checkName("processdocuments");
Template["processdocuments"] = new Template("Template.processdocuments", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Process Documents</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n							", HTML.FORM("\n				        ", HTML.DIV({
    "class": "form-group"
  }, "\n					        ", HTML.Raw('<div class="form-group">\n								<label for="processId">processId</label>\n								<input type="text" class="form-control" name="processId" id="processId" placeholder="processId">\n								<p class="help-block">Example : uo3pMbmsocYQGEK62 (Soon you will be able to select among your existing processes)</p>\n  							</div>'), "\n							  ", HTML.Raw('<div class="form-group">\n							    <label for="taskId">taskId</label>\n							    <input type="text" class="form-control" id="taskId" name="taskId" placeholder="taskId">\n							    <p class="help-block">SCAN_OK (Soon you will be able to select among your existing tasks)</p>\n							  </div>'), "\n						    ", HTML.TEXTAREA({
    "class": "form-control",
    rows: "3",
    name: "myhtml",
    placeholder: "myhtml"
  }), "\n						    ", HTML.Raw('<p class="help-block">For example a rationalK document name</p>'), "\n					    "), "\n					    ", HTML.Raw('<button type="submit" class="btn btn-primary">Add this note to the task</button>'), "\n				    "), "\n							\n							\n		        			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("ProcessDocuments"));
  }, function() {
    return [ "\n		        				", HTML.DIV({
      "class": "post"
    }, "\n			        				", Blaze.View("lookup:html", function() {
      return Spacebars.mustache(view.lookup("html"));
    }), "\n		        				"), "\n								" ];
  }, function() {
    return [ "\n								", HTML.P("There is nothing to show for the moment."), "\n		        			" ];
  }), "\n        		"), "\n    		"), "\n		"), "\n	");
}));

})();
