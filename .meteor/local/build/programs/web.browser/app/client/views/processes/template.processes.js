(function(){
Template.__checkName("processes");
Template["processes"] = new Template("Template.processes", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Processes</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Processes"));
  }, function() {
    return [ "\n		        				", HTML.DIV({
      "class": "post"
    }, "\n			        				", Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    }), " (Filename : ", Blaze.View("lookup:filename", function() {
      return Spacebars.mustache(view.lookup("filename"));
    }), ") ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "process");
      },
      title: "Open this process"
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-eye-open",
      "aria-hidden": "true"
    })), " ", HTML.A({
      "class": "delete",
      href: "#",
      title: "Delete this process"
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-trash",
      "aria-hidden": "true"
    })), "\n		        				"), "\n								" ];
  }, function() {
    return [ "\n								", HTML.P("There is nothing to show for the moment."), "\n		        			" ];
  }), "\n        		"), "\n    		"), "\n		"), "\n	"), HTML.Raw('\n		<div class="row">\n		<div class="col-md-6">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Add a process</h3>\n        		</div>\n				<div class="panel-body">\n							<form class="addProcess">\n				        <div class="form-group">\n					        <div class="form-group">\n								<label for="processTitle">Title</label>\n								<input type="text" class="form-control" name="processTitle" id="processTitle" placeholder="Process Title">\n  							</div>\n							  <div class="form-group">\n							    <label for="processFilename">Filename</label>\n							    <input type="text" class="form-control" id="processFilename" name="processFilename" placeholder="diagram.bpmn">\n							    <p class="help-block">Be sure to place your bpmn file in /public/bpmn2_diagrams/</p>\n							  </div>\n					    </div>\n					    <button type="submit" class="btn btn-primary">Save</button>\n				    </form>\n        		</div>\n    		</div>\n		</div>\n		<div class="col-md-6">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Tips</h3>\n        		</div>\n				<div class="panel-body">\n					<p>To draw a process diagram, you can use your favorite process modeler</p>\n					<p>If you don\'t have one, use <a href="http://demo.bpmn.io/new">bpmn.io</a> and download your file as .bpmn. Another nice software is BonitaBPM.</p>\n        		</div>\n    		</div>\n		</div>\n	</div>\n	'), HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-6"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Roles");
  })), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("Roles")),
      settings: Spacebars.call(view.lookup("settingsRoles"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n        "), "\n    	"), "\n		"), "\n		", HTML.DIV({
    "class": "col-md-6"
  }, "\n			", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 ", HTML.Raw('<div class="panel-heading" style="position:relative">\n				 <h3 class="panel-title">Add a role</h3>\n				</div>'), "\n			 ", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.FORM({
    "class": "addRole"
  }, "\n						", HTML.DIV({
    "class": "form-group"
  }, "\n							", HTML.Raw('<label for="role">Title</label>'), "\n							", HTML.INPUT({
    type: "text",
    "class": "form-control",
    name: "role",
    id: "role",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Role name");
    }
  }), "\n						"), "\n						", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-primary"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Add");
  })), "\n					"), "\n				"), "\n			"), "\n	"), "\n\n	") ];
}));

})();
