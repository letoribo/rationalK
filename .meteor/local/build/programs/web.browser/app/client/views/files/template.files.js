(function(){
Template.__checkName("files");
Template["files"] = new Template("Template.files", (function() {
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
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "  ", HTML.SPAN({
    "class": "pull-right"
  }, Blaze.View("lookup:walkThruFoldersStatus", function() {
    return Spacebars.mustache(view.lookup("walkThruFoldersStatus"));
  }), HTML.IMG({
    "class": function() {
      return Spacebars.mustache(view.lookup("walkThruFoldersLoadingAnimation"));
    },
    src: "/images/spinner.gif",
    height: "20"
  }))), "\n						", HTML.Raw('<div class="collapse" id="helpFiles">\n	            <p><span class="glyphicon glyphicon-info-sign"></span> : Please wait after clicking the refresh button.</p>\n	          </div>'), "\n	        "), "\n					", HTML.DIV({
    "class": "panel-body"
  }, "\n						", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("Files")),
      settings: Spacebars.call(view.lookup("settingsFiles"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n	        "), "\n	    	"), "\n		"), "\n	");
}));

})();
