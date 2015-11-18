(function(){
Template.__checkName("members");
Template["members"] = new Template("Template.members", (function() {
  var view = this;
  return HTML.DIV({
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
    }, "\n                        ", HTML.A({
      "class": "btn btn-success btn-sm submit",
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "memberNew");
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "Create a member");
      }
    }, "+"), "\n                "), "\n            " ];
  }), "\n\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n                ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "members");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Members");
  })), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "staffs panel-body"
  }, "\n          ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("myMembers")),
      settings: Spacebars.call(view.lookup("settingsMyMembers"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        "), "\n    ");
}));

})();
