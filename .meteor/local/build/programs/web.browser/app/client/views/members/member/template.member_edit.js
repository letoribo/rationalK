(function(){
Template.__checkName("memberEdit");
Template["memberEdit"] = new Template("Template.memberEdit", (function() {
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
    return Spacebars.mustache(view.lookup("_"), "Edit member");
  })), "\n        "), "\n    "), "\n    ", HTML.DIV({
    "class": "panel-body"
  }, "\n    ", HTML.FORM({
    "class": "main",
    role: "form"
  }, "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.Raw('<label for="email">Email</label>'), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "email",
    type: "text",
    value: function() {
      return Spacebars.mustache(view.lookup("email"));
    },
    placeholder: "Email"
  }), "\n        "), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Name");
  })), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "name",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
    },
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Name");
    }
  }), "\n        "), "\n\n        ", HTML.DIV({
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
  }), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("isInRole"), "admin");
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": "form-group"
    }, "\n			     ", Spacebars.include(view.lookupTemplate("roles")), "\n        "), "\n		    " ];
  }), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.LABEL({
    "for": "locale"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Language");
  }), " (fr,de,en)"), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "locale",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "locale"));
    },
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "en");
    }
  }), "\n        "), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.INPUT({
    type: "submit",
    value: function() {
      return Spacebars.mustache(view.lookup("_"), "Update member");
    },
    "class": "btn btn-primary submit pull-right"
  }), "\n            ", HTML.A({
    "class": "btn btn-danger delete",
    href: "#",
    "data-memberid": function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Delete member");
  })), "\n        "), "\n\n    "), "\n  "), "\n  ");
}));

})();
