(function(){
Template.__checkName("gantt");
Template["gantt"] = new Template("Template.gantt", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n				", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n					", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Critical Path");
  }), " ", HTML.Raw('<a href="#" class="showCriticalPath" title="Show Critical Path"><span class="glyphicon glyphicon-refresh"></span></a>')), "\n				"), "\n				", HTML.Raw('<div class="panel-body">\n					<div class="row">\n						<div class="col-md-12">\n\n						</div>\n					</div>\n				</div>'), "\n			"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, "Gantt : ", Blaze.View("lookup:ganttName", function() {
    return Spacebars.mustache(view.lookup("ganttName"));
  }), " ", HTML.Raw('<a href="#" class="saveGantt pull-right" title="Save Gantt"><span class="glyphicon glyphicon-floppy-disk"></span></a>')), "\n        "), "\n				", HTML.Raw('<div class="panel-body">\n					<div class="row">\n						<div class="col-md-12">\n								<div id="gantt_here" style="width: 100%; height: 500px;"></div>\n						</div>\n					</div>\n    		</div>'), "\n			"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Critical Path");
  }), " ", HTML.Raw('<a href="#" class="showCriticalPath" title="Show Critical Path"><span class="glyphicon glyphicon-refresh"></span></a>')), "\n        "), "\n				", HTML.Raw('<div class="panel-body">\n					<div class="row">\n						<div class="col-md-12">\n\n						</div>\n					</div>\n    		</div>'), "\n			"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Warnings");
  }), " ", HTML.Raw('<a href="#" class="checkGanttWarnings pull-right" title="Check Gantt Warnings"><span class="glyphicon glyphicon-refresh"></span></a>')), "\n        "), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-12"
  }, "\n								", Blaze.Each(function() {
    return Spacebars.call(view.lookup("ganttWarnings"));
  }, function() {
    return [ "\n									", HTML.P({
      "class": "warning"
    }, Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    })), "\n								" ];
  }, function() {
    return [ "\n									", HTML.P("You have no gantt warnings."), "\n								" ];
  }), "\n						"), "\n					"), "\n    		"), "\n			"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Options</h3>\n        </div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-12"
  }, "\n							", HTML.FORM("\n									", HTML.DIV({
    "class": "form-group"
  }, "\n										", HTML.DIV({
    "class": "form-group"
  }, "\n									", HTML.LABEL({
    "for": "ganttName"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Gantt name");
  })), "\n									", HTML.INPUT({
    type: "text",
    "class": "form-control",
    name: "ganttName",
    id: "ganttName",
    value: function() {
      return Spacebars.mustache(view.lookup("ganttName"));
    }
  }), "\n									"), "\n								"), "\n								", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-primary"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Rename");
  })), "\n							"), "\n						"), "\n					"), "\n    		"), "\n			"), "\n		"), "\n	") ];
}));

})();
