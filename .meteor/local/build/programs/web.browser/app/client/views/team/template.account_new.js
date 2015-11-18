(function(){
Template.__checkName("accountNew");
Template["accountNew"] = new Template("Template.accountNew", (function() {
  var view = this;
  return HTML.FORM({
    "class": "main",
    role: "form"
  }, HTML.Raw('\n        <div class="form-group">\n            <label for="name">Name</label>\n            <input class="form-control" name="name" type="text" value="" placeholder="Name">\n        </div>\n\n        <div class="form-group">\n            <label for="email">Email</label>\n            <input class="form-control" name="email" type="text" value="" placeholder="Email">\n        </div>\n\n        '), HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.Raw('<label for="nickname">Nickname</label>'), "\n            ", HTML.INPUT({
    "class": "form-control",
    name: "nickname",
    type: "text",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));
    },
    placeholder: "Nickname"
  }), "\n        "), "\n\n        ", Spacebars.include(view.lookupTemplate("roles")), "\n        ", HTML.SCRIPT("\n            $('#roles').multiSelect('select', [\"teacher\"]);\n        "), HTML.Raw('\n\n        <div class="form-group">\n            <input type="submit" value="Submit" class="btn btn-primary">\n        </div>\n    '));
}));

})();
