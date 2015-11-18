(function(){
Template.__checkName("accountList");
Template["accountList"] = new Template("Template.accountList", (function() {
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
        return Spacebars.mustache(view.lookup("pathFor"), "accountNew");
      }
    }, "+"), "\n                "), "\n            " ];
  }), "\n\n            ", HTML.H3({
    "class": "panel-title"
  }, "\n                ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "accountList");
    }
  }, "Account"), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "staffs panel-body"
  }, "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("accounts"));
  }, function() {
    return [ "\n                ", Spacebars.include(view.lookupTemplate("account")), "\n            " ];
  }), "\n        "), "\n    ");
}));

})();
