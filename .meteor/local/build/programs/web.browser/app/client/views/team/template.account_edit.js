(function(){
Template.__checkName("accountEdit");
Template["accountEdit"] = new Template("Template.accountEdit", (function() {
  var view = this;
  return HTML.FORM({
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
  }, "\n            ", HTML.Raw('<label for="name">Name</label>'), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "name",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
    },
    placeholder: "Name"
  }), "\n        "), "\n\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.Raw('<label for="nickname">Nickname</label>'), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "nickname",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));
    },
    placeholder: "Nickname"
  }), "\n        "), "\n\n        ", Spacebars.include(view.lookupTemplate("roles")), "\n        ", HTML.SCRIPT("\n\n        "), HTML.Raw('\n\n        <div class="form-group">\n            <input type="submit" value="Submit" class="btn btn-primary submit">\n        </div>\n        <hr>\n        <div class="form-group">\n            <a class="btn btn-danger delete" href="#">Delete accountd</a>\n        </div>\n    '));
}));

})();
