(function(){
Template.__checkName("docList");
Template["docList"] = new Template("Template.docList", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n              ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "DB Documents");
  }), " ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasSelectedCategory"));
  }, function() {
    return [ " ", Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "in the category");
    }), " : ", Blaze.View("lookup:categoryName", function() {
      return Spacebars.mustache(view.lookup("categoryName"));
    }), " ", Blaze.View("lookup:categorySlugLink", function() {
      return Spacebars.mustache(view.lookup("categorySlugLink"));
    }) ];
  }), "\n              ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "docCreate");
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Create DB entry");
    },
    "class": "pull-right"
  }, HTML.Raw('<span class="glyphicon glyphicon-plus-sign"></span>')), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n	            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasDocs"));
  }, function() {
    return [ "\n	            	", HTML.DIV({
      "class": "tableScroll"
    }, "\n                    ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("docs")),
        settings: Spacebars.call(view.lookup("tableSettings"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n	            	"), "\n                " ];
  }, function() {
    return [ "\n                	", HTML.P("There is no document in this category. You should start by adding some... ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "docCreate");
      }
    }, "Add a document"), "\n                	", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isInRole"), "admin");
    }, function() {
      return [ "\n                		or ", HTML.A({
        href: function() {
          return Spacebars.mustache(view.lookup("pathFor"), "docImport");
        }
      }, "import many documents"), "\n                	" ];
    }), "\n                	"), "\n                " ];
  }), "\n        "), "\n    ");
}));

})();
