(function(){
Template.__checkName("attributes");
Template["attributes"] = new Template("Template.attributes", (function() {
  var view = this;
  return [ HTML.Raw('<link rel="stylesheet" type="text/css" href="/loudev/css/multi-select.css">\n\n    '), HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.Raw('<a href="#" id="select-all">All</a>'), " ↔ ", HTML.Raw('<a href="#" id="select-none">None</a>'), "\n\n            ", HTML.SELECT({
    "class": "form-control",
    id: "attributes",
    name: "attributes",
    multiple: "multiple"
  }, "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("attributes"));
  }, function() {
    return [ "\n                    ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("."));
      }
    }, Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n                " ];
  }), "\n            "), "\n    "), "\n\n    ", HTML.SCRIPT("\n        $('#attributes').multiSelect({\n            selectableHeader: \"", HTML.DIV({
    "class": "custom-header"
  }, "Selectable items"), '",\n            selectionHeader: "', HTML.DIV({
    "class": "custom-header"
  }, "Selection items"), '",\n            selectableFooter: "', HTML.DIV({
    "class": "custom-header"
  }, "Selectable footer"), '",\n            selectionFooter: "', HTML.DIV({
    "class": "custom-header"
  }, "Selection footer"), '"\n        });\n    ') ];
}));

})();
