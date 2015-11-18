(function(){
Template.__checkName("field");
Template["field"] = new Template("Template.field", (function() {
  var view = this;
  return HTML.DIV({
    "class": "form-group"
  }, "\n        ", HTML.LABEL({
    "for": function() {
      return Spacebars.mustache(view.lookup("key"));
    }
  }, Blaze.View("lookup:key", function() {
    return Spacebars.mustache(view.lookup("key"));
  }), Blaze.View("lookup:is_mandatory", function() {
    return Spacebars.mustache(view.lookup("is_mandatory"));
  })), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n        ", HTML.Comment(' <a class="delete pull-right deleteField" href="#"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a> '), "\n        " ];
  }), "\n        ", Blaze.View("lookup:inputForFieldType", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("inputForFieldType")));
  }), "\n        ", HTML.DIV({
    id: function() {
      return [ "helperFor", Spacebars.mustache(view.lookup("key")) ];
    }
  }), "\n    ");
}));

})();
