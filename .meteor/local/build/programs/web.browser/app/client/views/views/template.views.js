(function(){
Template.__checkName("viewList");
Template["viewList"] = new Template("Template.viewList", (function() {
  var view = this;
  return [ HTML.Raw("<code>#todo : This page should be visible only by admin</code>\n    "), HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n                ", HTML.DIV({
      "class": "control-group",
      style: "position:absolute; top:3px; right:3px;"
    }, "\n                    ", HTML.A({
      "class": "btn btn-success btn-sm submit",
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "viewNew");
      }
    }, "+"), "\n                "), "\n            " ];
  }), "\n\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n                ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "viewList");
    }
  }, "Views"), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("views"));
  }, function() {
    return [ "\n                ", Spacebars.include(view.lookupTemplate("view")), "\n            " ];
  }), "\n        "), "\n    ") ];
}));

Template.__checkName("view");
Template["view"] = new Template("Template.view", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post"
  }, "\n        ", HTML.DIV({
    "class": "post-content"
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "viewEdit");
    }
  }, "\n                ", HTML.DIV(Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n            "), "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("keysInOrder"));
  }, function() {
    return [ "\n                ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return Spacebars.include(view.lookupTemplate("greenLabel"));
    }), "\n            " ];
  }), "\n        "), "\n    ");
}));

})();
