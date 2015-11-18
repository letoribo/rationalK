(function(){
Template.__checkName("walk");
Template["walk"] = new Template("Template.walk", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Walk (i.e. to scan files in your folders)</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.FORM({
    role: "form",
    "class": "foldersToScanForm"
  }, "\n					  ", HTML.DIV({
    "class": "form-group"
  }, "\n					    ", HTML.Raw('<label for="exampleInputEmail1">Folders to scan</label>'), "\n					    ", HTML.TEXTAREA({
    "class": "form-control",
    id: "folders",
    name: "folders",
    rows: "3",
    value: function() {
      return Spacebars.mustache(view.lookup("foldersToScan"));
    }
  }), "\n					    ", HTML.Raw('<p class="help-block">One folder per line. Use server paths (not client path).</p>'), "\n					  "), "\n					  ", HTML.Raw('<button type="submit" class="btn btn-primary">Submit</button>'), "\n					  ", HTML.P({
    "class": "help-block"
  }, "Wait for the automatic job to start. The walk frequency depends on your server settings. After that you can have a look at ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "files");
    },
    title: "See files"
  }, "the files that rationalK has found"), "."), "\n					"), "\n        		"), "\n    		"), "\n		"), "\n	");
}));

})();
