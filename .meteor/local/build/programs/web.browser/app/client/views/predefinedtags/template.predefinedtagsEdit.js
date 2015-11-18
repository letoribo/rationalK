(function(){
Template.__checkName("predefinedtagsEdit");
Template["predefinedtagsEdit"] = new Template("Template.predefinedtagsEdit", (function() {
  var view = this;
  return [ HTML.Raw('<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Help</h3>\n        		</div>\n				<div class="panel-body">\n					<p>Predefined tags are keywords (tags) that the users will be able to select when categorizing a document.</p>\n        		</div>\n    		</div>\n		</div>\n	</div>\n	'), HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Add a new predefined tag</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call("PredefinedTags"),
      id: Spacebars.call("insertTagForm"),
      type: Spacebars.call("insert")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("quickForm"));
  }), "\n        		"), "\n    		"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Edit predefined tag</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.TABLE({
    "class": "table table-bordered table-condensed"
  }, "\n					  ", HTML.THEAD("\n					    ", HTML.TR("\n					      ", HTML.TD("Tags Edit"), "\n					    "), "\n					  "), "\n					  ", HTML.TBODY("\n					    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tags"));
  }, function() {
    return [ "\n					      ", HTML.TR("\n					        ", HTML.TD("\n						        ", Blaze._TemplateWith(function() {
      return {
        id: Spacebars.call(view.lookup("makeUniqueID")),
        type: Spacebars.call("update"),
        collection: Spacebars.call("PredefinedTags"),
        doc: Spacebars.call(view.lookup(".")),
        autosave: Spacebars.call(true)
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("autoForm"), function() {
        return [ "\n									", Blaze._TemplateWith(function() {
          return {
            name: Spacebars.call("label"),
            label: Spacebars.call(false)
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("afFormGroup"));
        }), "\n								" ];
      });
    }), "\n						    "), "\n					      "), "\n					    " ];
  }), "\n					  "), "\n					"), "\n        		"), "\n    		"), "    		\n		"), "\n	") ];
}));

})();
