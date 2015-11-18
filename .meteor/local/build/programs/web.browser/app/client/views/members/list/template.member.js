(function(){
Template.__checkName("member");
Template["member"] = new Template("Template.member", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post"
  }, "\n        ", HTML.DIV({
    "class": "post-content"
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "memberEdit");
    },
    title: "Edit this member"
  }, Blaze.View("lookup:profile.nickname", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "nickname"));
  }), " - ", Blaze.View("lookup:profile.name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
  }), " (", Blaze.View("lookup:email", function() {
    return Spacebars.mustache(view.lookup("email"));
  }), ")"), "\n            ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("profile"), "roles"));
  }, function() {
    return [ "\n                ", Spacebars.include(view.lookupTemplate("role")), "\n            " ];
  }), "\n            ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "accountId"));
  }, function() {
    return [ "\n            	", HTML.SPAN({
      "class": "label label-info"
    }, "Invitation accepted"), "\n			      " ];
  }, function() {
    return [ "\n				        ", HTML.SPAN({
      "class": "label label-warning"
    }, "Invitation pending"), "\n            " ];
  }), "\n        "), "\n    ");
}));

})();
