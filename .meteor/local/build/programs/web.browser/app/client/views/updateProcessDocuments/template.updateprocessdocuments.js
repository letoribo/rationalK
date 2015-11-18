(function(){
Template.__checkName("updateprocessdocuments");
Template["updateprocessdocuments"] = new Template("Template.updateprocessdocuments", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Update information related to a task within a process</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Create a note that will be attached to the task</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n\n							", HTML.FORM("\n					        ", HTML.DIV({
    "class": "form-group"
  }, "\n							    ", HTML.TEXTAREA({
    "class": "form-control",
    rows: "3",
    id: "myhtml",
    name: "myhtml",
    placeholder: "myhtml"
  }), "\n							    ", HTML.Raw('<p class="help-block">You can add document and file link using the panel at your right and by clicking on the <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> icon. You can also use html.</p>'), "\n						    "), "\n						    ", HTML.Raw('<button type="submit" class="btn btn-primary">Add this note to the task</button>'), "  ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "process", Spacebars.kw({
        _id: Spacebars.dot(view.lookup("."), "_id")
      }));
    },
    title: "Back to the diagram"
  }, "Back to the diagram"), "\n					    "), "\n				"), "\n							"), "\n\n						"), "\n						\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							", Spacebars.include(view.lookupTemplate("minisearch")), "\n						"), "\n						\n					"), "\n        		"), "\n    		"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Existing notes and documents in this process</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n        			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("ProcessDocuments"));
  }, function() {
    return [ "\n	        			", HTML.DIV({
      "class": "post"
    }, "\n		        			", Blaze.View("lookup:html", function() {
      return Spacebars.mustache(view.lookup("html"));
    }), " ", HTML.A({
      "class": "delete",
      href: "#",
      title: "Delete this note"
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-trash",
      "aria-hidden": "true"
    })), "\n	        			"), "\n					" ];
  }, function() {
    return [ "\n						", HTML.P("There is nothing to show for the moment."), "\n	        		" ];
  }), "\n        		"), "\n    		"), "\n		"), "\n	") ];
}));

})();
