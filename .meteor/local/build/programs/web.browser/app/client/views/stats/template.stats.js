(function(){
Template.__checkName("stats");
Template["stats"] = new Template("Template.stats", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Statistics</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.Raw('<!-- <p>Some interesting statistics. For custom statistics that match your needs, send us an email : <a href="mailto:info@rationalk.ch">info@rationalk.ch</a></p> -->'), "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							", HTML.DIV({
    "class": "panel panel-default"
  }, "\n							 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n							 		", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Number of docs per category");
  })), "\n				        "), "\n								", HTML.DIV({
    "class": "panel-body"
  }, "\n										", Blaze.View("lookup:docStats", function() {
    return Spacebars.mustache(view.lookup("docStats"));
  }), "\n				        "), "\n				    	"), "\n						"), "\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							", HTML.DIV({
    "class": "panel panel-default"
  }, "\n							 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Stats</h3>\n				        </div>'), "\n								", HTML.DIV({
    "class": "panel-body"
  }, "\n										", Blaze.View("lookup:queriesStats", function() {
    return Spacebars.mustache(view.lookup("queriesStats"));
  }), "\n				        "), "\n				    	"), "\n						"), "\n					"), "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n							 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Default Chart 1</h3>\n				        		</div>'), "\n								", HTML.DIV({
    "class": "panel-body"
  }, "\n									", Blaze._TemplateWith(function() {
    return {
      chartId: Spacebars.call("chart1"),
      chartWidth: Spacebars.call("100%"),
      charHeight: Spacebars.call("100%"),
      chartObject: Spacebars.call(view.lookup("categorydistributionChart"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("highchartsHelper"));
  }), "\n				        		"), "\n				    		"), "\n						"), "\n						", HTML.DIV({
    "class": "col-md-6"
  }, "\n							 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n							 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Default Chart 2</h3>\n				        		</div>'), "\n								", HTML.DIV({
    "class": "panel-body"
  }, "\n									", HTML.Raw('<!-- <form>\n										Show the last <input type="text" class="lastndays" id="lastndays" placeholder="5">days\n									</form>\n									-->'), "\n										", Blaze._TemplateWith(function() {
    return {
      chartId: Spacebars.call("chart2"),
      chartWidth: Spacebars.call("100%"),
      charHeight: Spacebars.call("100%"),
      chartObject: Spacebars.call(view.lookup("logsChart"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("highchartsHelper"));
  }), "\n\n										", HTML.Raw("<!-- Reactive chart should be defined this way :  -->"), "\n										", HTML.Raw('<!-- <div id="container-chart2-reactive" style="width: 100%; height: 100%"></div> -->'), "\n				        		"), "\n				    		"), "\n						"), "\n					"), "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-12"
  }, "\n							 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n							 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Search Queries</h3>\n				        </div>'), "\n								", HTML.DIV({
    "class": "panel-body"
  }, "\n									", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("SearchQueries")),
      settings: Spacebars.call(view.lookup("settingsSearchQueries"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n				    		"), "\n							"), "\n						"), "\n					"), "\n					", HTML.Raw('<div class="row">\n						<div class="col-md-12">\n							 <div class="panel panel-default">\n							 	<div class="panel-heading" style="position:relative">\n							 		<h3 class="panel-title">Duplicate values</h3>\n				        		</div>\n								<div class="panel-body">\n									<p>rationalK helps you find duplicate data in your database. For the moment there is nothing to show here since everything looks fine.</p>\n				        		</div>\n				    		</div>\n						</div>\n					</div>'), "\n\n\n				"), "\n    		"), "\n		"), "\n	"), "\n	", HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			", HTML.DIV({
    "class": "panel panel-default"
  }, "\n					", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n						", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Tags");
  }), " ", HTML.A({
    href: "#",
    "class": "analyseTags pull-right",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Analyse tags");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-refresh"></span>'))), "\n						"), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("tags")),
      settings: Spacebars.call(view.lookup("settingsTags"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n				"), "\n			"), "\n		"), "\n	") ];
}));

})();
