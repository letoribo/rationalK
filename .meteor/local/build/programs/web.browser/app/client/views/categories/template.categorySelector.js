(function(){
Template.__checkName("categoriesSelector");
Template["categoriesSelector"] = new Template("Template.categoriesSelector", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n                ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "categoryList");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Categories");
  })), "  ", HTML.A({
    "class": "pull-right",
    "data-toggle": "collapse",
    href: "#detailCat",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Details");
    },
    "aria-expanded": "false",
    "aria-controls": "collapseExample"
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), " ", HTML.A({
    "class": "pull-right",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "docExport", Spacebars.kw({
        _id: view.lookup("selectedCategory")
      }));
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Export");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-export" aria-hidden="true"></span>')), Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ " ", HTML.A({
      "class": "pull-right",
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "categoryEdit", Spacebars.kw({
          _id: view.lookup("selectedCategory")
        }));
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "Edit");
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-pencil",
      "aria-hidden": "true"
    })) ];
  }), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("categories"));
  }, function() {
    return [ "\n              ", HTML.A({
      "class": function() {
        return [ "select category-", Spacebars.mustache(view.lookup("isSelected")) ];
      },
      href: "#"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), " |\n          " ];
  }, function() {
    return [ "\n          	", HTML.P("You don't have any categories, you should start by ", HTML.A({
      title: "Add a category",
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "categoryNew");
      }
    }, "adding one")), "\n          " ];
  }), "\n          ", HTML.DIV({
    "class": "collapse",
    id: "detailCat"
  }, "\n            ", HTML.P(HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>'), " : ", Blaze.View("lookup:info", function() {
    return Spacebars.mustache(view.lookup("info"));
  })), "\n          "), "\n        "), "\n    ");
}));

})();
