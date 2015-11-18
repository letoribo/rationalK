(function(){
Template.__checkName("fileView");
Template["fileView"] = new Template("Template.fileView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n				 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n				 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Files");
  }), " ", HTML.A({
    "class": "pull-right",
    "data-toggle": "collapse",
    href: "#helpFiles",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Help");
    },
    "aria-expanded": "false",
    "aria-controls": "collapseExample"
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "  ", HTML.Raw('<a href="#" class="walkThruFolders pull-right" title="Scan all folders"><span class="glyphicon glyphicon-refresh"></span></a>')), "\n						", HTML.Raw('<div class="collapse" id="helpFiles">\n	            <p><span class="glyphicon glyphicon-info-sign"></span> : Please wait after clicking the refresh button.</p>\n	          </div>'), "\n	        "), "\n					", HTML.Raw('<div class="panel-body">\n						<p>Hello</p>\n						<canvas id="pdfcanvas"></canvas>\n	        </div>'), "\n	    	"), "\n		"), "\n	");
}));

})();
