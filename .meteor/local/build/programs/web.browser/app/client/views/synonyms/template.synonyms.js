(function(){
Template.__checkName("synonyms");
Template["synonyms"] = new Template("Template.synonyms", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Search Synonyms</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.FORM("\n				        ", HTML.DIV({
    "class": "form-group"
  }, "\n						    ", HTML.TEXTAREA({
    "class": "form-control",
    rows: "8",
    name: "synonyms",
    placeholder: "bearings,roulement,lager",
    value: function() {
      return Spacebars.mustache(view.lookup("synonyms"));
    }
  }), "\n					    "), "\n					    ", HTML.Raw('<button type="submit" class="btn btn-primary">Save</button>'), "\n					    ", HTML.Raw('<p class="help-block">This will help people to find what they are really looking for.</p>'), "\n					    ", HTML.Raw('<p class="help-block">All synonyms on the same line separated with commas. New group of synonyms on a new line.</p>'), "\n				    "), "        					\n        		"), "\n    		"), "\n		"), "\n	");
}));

})();
