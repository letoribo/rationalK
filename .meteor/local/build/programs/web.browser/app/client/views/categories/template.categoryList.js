(function(){
Template.__checkName("categoryList");
Template["categoryList"] = new Template("Template.categoryList", (function() {
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
  })), "\n                ", HTML.A({
    "class": "pull-right",
    href: "http://rationalk.ch/doc#categories",
    target: "_blank",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Open help in a new window");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("categories"));
  }, function() {
    return [ "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n              ", HTML.A({
        "class": "submit",
        title: function() {
          return Spacebars.mustache(view.lookup("_"), "Add a category");
        },
        href: function() {
          return Spacebars.mustache(view.lookup("pathFor"), "categoryNew");
        }
      }, Blaze.View("lookup:_", function() {
        return Spacebars.mustache(view.lookup("_"), "Add a category");
      })), "\n            " ];
    }), "\n            ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("categories")),
        settings: Spacebars.call(view.lookup("settingsCategories"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n          " ];
  }, function() {
    return [ "\n            ", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "You have no category yet");
    }), ". ", Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Start by adding one");
    }), ": ", HTML.A({
      "class": "submit",
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "Add a category");
      },
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "categoryNew");
      }
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Add a category");
    }))), "\n          " ];
  }), "\n        "), "\n    ");
}));

})();
