(function(){
Template.__checkName("viewNew");
Template["viewNew"] = new Template("Template.viewNew", (function() {
  var view = this;
  return HTML.FORM({
    "class": "main",
    role: "form"
  }, HTML.Raw('\n        <div class="form-group">\n            <label for="name">Name</label>\n            <input class="form-control" name="name" type="text" value="" placeholder="Name">\n        </div>\n\n        <hr>\n\n        '), Spacebars.include(view.lookupTemplate("attributes")), HTML.Raw('\n\n        <!--<script>-->\n            <!--$(\'#attributes\').multiSelect(\'select\', ["teacher"]);-->\n        <!--</script>-->\n\n        <div class="form-group">\n            <input type="submit" value="Submit" class="btn btn-primary">\n        </div>\n    '));
}));

})();
