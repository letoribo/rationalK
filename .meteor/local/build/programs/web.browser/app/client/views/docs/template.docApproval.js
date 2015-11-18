(function(){
Template.__checkName("docApproval");
Template["docApproval"] = new Template("Template.docApproval", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n    ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n        ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Approval");
  })), "\n    "), "\n    ", HTML.DIV({
    "class": "panel-body"
  }, "\n      ", HTML.FORM({
    id: "docApprovalForm"
  }, "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n          ", HTML.LABEL({
    "for": "docApprovalAdditionalText"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Submit for approval");
  })), "\n          ", HTML.TEXTAREA({
    "class": "form-control",
    id: "docApprovalAdditionalText",
    value: function() {
      return Spacebars.mustache(view.lookup("docApprovalAdditionalText"));
    }
  }), "\n          ", HTML.P({
    "class": "help-block"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Optional message");
  })), "\n        "), "\n        ", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-default"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Submit for approval");
  })), "\n      "), "\n    "), "\n  ");
}));

})();
