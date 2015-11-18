(function(){
Template.__checkName("invitation");
Template["invitation"] = new Template("Template.invitation", (function() {
  var view = this;
  return [ HTML.Raw('<div class="row">\n    <div class="col-md-12">\n      <div class="panel panel-default">\n            <div class="panel-body">\n                <span class="pull-right"><a href="#" class="setLanguage" data-locale="en"><img src="/famfamfam/gb.png"></a> <a href="#" class="setLanguage" data-locale="fr"><img src="/famfamfam/fr.png"></a> <a href="#" class="setLanguage" data-locale="de"><img src="/famfamfam/de.png"></a></span>\n             </div>\n      </div>\n    </div>\n  </div>\n  '), HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n       ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n           ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n             ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Welcome");
  }), " !"), "\n            "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", HTML.P(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Hello");
  }), " ", Blaze.View("lookup:profile.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
  }), ", ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "invitation_to_join");
  })), "\n        "), "\n       "), "\n    "), "\n  "), "\n\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n       ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", HTML.FORM({
    "class": "main",
    role: "form"
  }, "\n              ", HTML.DIV({
    "class": "form-group"
  }, "\n                  ", HTML.LABEL({
    "for": "password"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Password");
  })), "\n                  ", HTML.INPUT({
    "class": "form-control",
    name: "password",
    type: "password",
    value: "",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Password");
    }
  }), "\n              "), "\n\n              ", HTML.DIV({
    "class": "form-group"
  }, "\n                  ", HTML.LABEL({
    "for": "password2"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Retype your password");
  })), "\n                  ", HTML.INPUT({
    "class": "form-control",
    name: "password2",
    type: "password",
    value: "",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Retype your password");
    }
  }), "\n              "), "\n\n              ", HTML.Raw('<div class="form-group">\n                  <input type="submit" value="Ok" id="join" class="btn btn-primary submit">\n              </div>'), "\n          "), "\n        "), "\n      "), "\n    "), "\n  "), "\n\n\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n       ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", HTML.P(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "invitation_to_join_info_login");
  })), "\n        "), "\n      "), "\n    "), "\n  ") ];
}));

})();
