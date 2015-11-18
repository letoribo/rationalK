(function(){
Template.__checkName("categoryNew");
Template["categoryNew"] = new Template("Template.categoryNew", (function() {
  var view = this;
  return HTML.Raw('<form class="main" role="form">\n        <div class="form-group">\n            <label for="name">Category Name</label>\n            <input class="form-control" name="name" type="text" value="" placeholder="Category Name">\n        </div>\n        <hr>\n        <div class="form-group">\n            <input type="submit" value="Create Category" class="btn btn-primary">\n        </div>\n    </form>');
}));

})();
