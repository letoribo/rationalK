(function(){
Template.__checkName("fileInSearchResults");
Template["fileInSearchResults"] = new Template("Template.fileInSearchResults", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post"
  }, "\n		", HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-md-10"
  }, "\n				", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Filename");
  }), " :"), " ", Blaze.View("lookup:filename", function() {
    return Spacebars.mustache(view.lookup("filename"));
  })), "\n				", HTML.P(HTML.STRONG(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Path");
  }), " :"), " ", Blaze.View("lookup:pathReplaced", function() {
    return Spacebars.mustache(view.lookup("pathReplaced"));
  })), "\n			"), "\n			", HTML.DIV({
    "class": "col-md-2"
  }, "\n				", HTML.SPAN({
    "class": "label label-success"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "File");
  })), " ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("fileLinkUrl"));
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "open_file");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>')), " ", HTML.A({
    href: "#",
    "data-filelink": function() {
      return Spacebars.mustache(view.lookup("pathReplaced"));
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Convert into database document");
    },
    "class": "convertIntoDBDoc"
  }, HTML.Raw('<span class="glyphicon glyphicon-hdd" aria-hidden="true"></span>')), HTML.Raw("<br>"), "\n				", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Last modified on");
  }), " ", Blaze.View("lookup:mtime", function() {
    return Spacebars.mustache(view.lookup("mtime"));
  }), "\n			"), "\n		"), "\n	");
}));

})();
