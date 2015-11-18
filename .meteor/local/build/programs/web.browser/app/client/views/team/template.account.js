(function(){
Template.__checkName("account");
Template["account"] = new Template("Template.account", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post"
  }, "\n        ", HTML.DIV({
    "class": "post-content"
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "accountEdit");
    }
  }, "\n                ", HTML.H3(Blaze.View("lookup:profile.nickname", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));
  }), " - ", Blaze.View("lookup:profile.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
  }), Blaze.If(function() {
    return Spacebars.call(view.lookup("isMe"));
  }, function() {
    return HTML.CharRef({
      html: "&larr;",
      str: "←"
    });
  })), "\n                ", HTML.H3(Blaze.View("lookup:email", function() {
    return Spacebars.mustache(view.lookup("email"));
  }), " ", HTML.SMALL(" ", Blaze.View("lookup:emailStatus", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("emailStatus")));
  }), " ", Blaze.View("lookup:profile.orgId", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "orgId"));
  }))), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("roles"));
  }, function() {
    return [ "\n                    ", Spacebars.include(view.lookupTemplate("role")), "\n                " ];
  }), "\n            "), "\n        "), "\n    ");
}));

})();
