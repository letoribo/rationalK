(function(){
Template.__checkName("memberNew");
Template["memberNew"] = new Template("Template.memberNew", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n    ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n        ", HTML.H3({
    "class": "panel-title"
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "members");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Create a member");
  })), "\n        "), "\n    "), "\n    ", HTML.DIV({
    "class": "panel-body"
  }, "\n    ", HTML.FORM({
    "class": "main",
    role: "form"
  }, "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Name");
  })), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "name",
    type: "text",
    value: "",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Name");
    }
  }), "\n        "), "\n\n        ", HTML.Raw('<div class="form-group">\n            <label for="email">Email</label>\n            <input class="form-control" name="email" type="email" value="" placeholder="Email">\n        </div>'), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.LABEL({
    "for": "nickname"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Username");
  })), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "nickname",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));
    },
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Username");
    }
  }), "\n        "), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", Spacebars.include(view.lookupTemplate("roles")), "\n        "), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.INPUT({
    type: "submit",
    value: function() {
      return Spacebars.mustache(view.lookup("_"), "Create member and send invitation email");
    },
    "class": "btn btn-primary"
  }), "\n        "), "\n    "), "\n  "), "\n  ");
}));

})();
