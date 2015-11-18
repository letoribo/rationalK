(function(){
Template.__checkName("categoryEdit");
Template["categoryEdit"] = new Template("Template.categoryEdit", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n    	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Edit category");
  })), "\n        "), "\n		", HTML.DIV({
    "class": "panel-body"
  }, "\n			", HTML.DIV({
    "class": "row"
  }, "\n				", HTML.DIV({
    "class": "col-md-8"
  }, "\n					", HTML.FORM({
    "class": "main",
    role: "form"
  }, "\n				        ", HTML.DIV({
    "class": "form-group"
  }, "\n				            ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Category Name");
  })), "\n				            ", HTML.INPUT({
    "class": "form-control",
    name: "name",
    type: "text",
    value: function() {
      return Spacebars.mustache(view.lookup("name"));
    },
    placeholder: "Name"
  }), "\n				            ", HTML.Raw("<!-- Attach some data to the DOM to access them when the template is rendered -->"), "\n				            ", HTML.INPUT({
    "class": "form-control",
    id: "selectedCategory",
    type: "hidden",
    value: function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }), "\n				        "), "\n								", HTML.DIV({
    "class": "form-group"
  }, "\n				            ", HTML.Raw('<label for="name">Information</label>'), "\n										", HTML.TEXTAREA({
    name: "info",
    placeholder: "Some usefull information about this category",
    "class": "form-control",
    rows: "3",
    value: function() {
      return Spacebars.mustache(view.lookup("info"));
    }
  }), "\n				        "), "\n				        ", HTML.DIV({
    "class": "form-group"
  }, "\n				            ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("viewData"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("viewEdit"));
  }), "\n				        "), "\n\n				        ", HTML.Raw('<div class="form-group">\n				            <input type="submit" value="Save" class="btn btn-primary">\n				        </div>'), "\n				    "), "\n				"), "\n				", HTML.DIV({
    "class": "col-md-4"
  }, "\n					", HTML.H2(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Help");
  })), "\n						", HTML.Raw("<p>Fields are also known as attributes. They are the columns names of your database.</p>"), "\n						", HTML.P("Instead of creating fields manually, you can also ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "docImport");
    },
    title: "import files"
  }, "import xlsx or csv files directly"), " !"), "\n						", HTML.Raw("<p>You can re-order them by drag-and-dropping the <strong>::</strong> icon</p>"), "\n						", HTML.Raw("<p>Click the pencil icon to edit a field, do not forget to clic a second time to save your changes</p>"), "\n						", HTML.Raw("<h3>Field types</h3>"), "\n							", HTML.Raw("<p>Textarea can contains more characters that text</p>"), "\n							", HTML.Raw("<p>Tags allows to classify your documents and access them quickly</p>"), "\n							", HTML.Raw("<p>Url allows to add a link to a webpage</p>"), "\n							", HTML.Raw('<p>Filelink allows to add a link to a file on your intranet (ex : //server/folder/doc.ext, on Mac OS X : Users/username/Documents/doc.ext). Note that for File to open directly from your browser you need an extension : <a href="http://rationalk.ch/downloads/rationalK_uri_addon.msi" target="_blank" title="Download">rationalK windows extension</a>.</p>'), "\n	    		"), "\n			"), "\n		"), "\n	");
}));

})();
