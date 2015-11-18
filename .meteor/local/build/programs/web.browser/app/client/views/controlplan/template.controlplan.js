(function(){
Template.__checkName("controlplan");
Template["controlplan"] = new Template("Template.controlplan", (function() {
  var view = this;
  return [ HTML.Raw('<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Control Plan for part xxx</h3>\n        </div>\n				<div class="panel-body">\n					<div id="myHandsonTableDiv"></div>\n					<br>\n					<a href="#" class="reset">Reset</a>, <a href="#" class="load">Load</a>, <a href="#" class="save">Save</a>\n					<br>\n					<p>Print CDMER Decolletage : <a href="/controlplan/gjsdkshd/decCDMER" title="Print CDMER Decolletage"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></a>, Print CDMER Planage : <a href="/controlplan/gjsdkshd/planageCDMER" title="Print CDMER Planage"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></a></p>\n        </div>\n    	</div>\n		</div>\n	</div>\n	'), HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			", HTML.DIV({
    "class": "panel panel-default"
  }, "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", Spacebars.include(view.lookupTemplate("processFlow")), "\n				"), "\n			"), "\n		"), "\n	") ];
}));

Template.__checkName("decCDMER");
Template["decCDMER"] = new Template("Template.decCDMER", (function() {
  var view = this;
  return HTML.DIV({
    "class": "subpage"
  }, HTML.Raw('\n		<div class="row">\n			<div class="col-xs-4">\n				<center><p>Company</p></center>\n			</div>\n			<div class="col-xs-4">\n				<center><p>Mise en Route - Décolletage</p></center>\n			</div>\n			<div class="col-xs-4">\n				<center><p>241FR03</p></center>\n			</div>\n		</div>\n		'), HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-xs-12"
  }, "\n				", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("tableDecCDMER")),
      settings: Spacebars.call(view.lookup("settingsDecCDMER"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n			"), "\n		"), HTML.Raw('\n		<div class="row">\n			<div class="col-xs-6">\n				<p>Acceptée</p>\n			</div>\n			<div class="col-xs-6">\n				<p>Refusée</p>\n			</div>\n		</div>\n	'));
}));

Template.__checkName("planageCDMER");
Template["planageCDMER"] = new Template("Template.planageCDMER", (function() {
  var view = this;
  return HTML.DIV({
    "class": "subpage"
  }, HTML.Raw('\n		<div class="row">\n			<div class="col-xs-4">\n				<center><p>Company</p></center>\n			</div>\n			<div class="col-xs-4">\n				<center><p>Mise en route - Planage</p></center>\n			</div>\n			<div class="col-xs-4">\n				<center><p>242FR02</p></center>\n			</div>\n		</div>\n		'), HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-xs-12"
  }, "\n				", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("tablePlanageCDMER")),
      settings: Spacebars.call(view.lookup("settingsPlanageCDMER"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n			"), "\n		"), HTML.Raw('\n		<div class="row">\n			<div class="col-xs-6">\n				<center><p>Acceptée</p></center>\n			</div>\n			<div class="col-xs-6">\n				<center><p>Refusée</p></center>\n			</div>\n		</div>\n	'));
}));

Template.__checkName("processFlow");
Template["processFlow"] = new Template("Template.processFlow", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			", HTML.Raw('<center>BEGIN<br><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></center>'), "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("processes"));
  }, function() {
    return [ "\n				", Blaze.View("lookup:processStep", function() {
      return Spacebars.mustache(view.lookup("processStep"));
    }), "\n			" ];
  }), "\n			", HTML.Raw("<center>END</center>"), "\n		"), "\n	");
}));

})();
