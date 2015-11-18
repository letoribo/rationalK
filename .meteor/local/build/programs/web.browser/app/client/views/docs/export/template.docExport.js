(function(){
Template.__checkName("docExport");
Template["docExport"] = new Template("Template.docExport", (function() {
  var view = this;
  return HTML.FORM({
    role: "form",
    "class": "main"
  }, "\n    ", HTML.DIV({
    "class": "form-group"
  }, "\n      ", HTML.SELECT({
    id: "selectedCategory",
    "class": "form-control"
  }, "\n        ", HTML.OPTION({
    value: ""
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Choose a category");
  })), "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("categories"));
  }, function() {
    return [ "\n        ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("_id"));
      }
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n        " ];
  }), "\n      "), "\n    "), HTML.Raw('\n    <div class="form-inline">\n      <div class="form-group">\n        <div class="radio">\n          <label>\n            <input type="radio" name="delimiter" value=","> comma\n          </label>\n        </div>\n        <div class="radio">\n          <label>\n            <input type="radio" name="delimiter" value="."> dot\n          </label>\n        </div>\n        <div class="radio">\n          <label>\n            <input type="radio" name="delimiter" value=";"> semicoma\n          </label>\n        </div>\n        <div class="radio">\n          <label>\n            <input type="radio" name="delimiter" value="	" checked="checked"> tab\n          </label>\n        </div>\n      </div>\n      <div class="form-group pull-right">\n        <div class="checkbox">\n          <label>\n            <input type="checkbox" name="quotes"> With quotes\n          </label>\n        </div>\n      </div>\n    </div>\n    '), HTML.DIV({
    "class": "form-group"
  }, "\n      ", HTML.TEXTAREA({
    id: "csv",
    placeholder: "Exported csv",
    "class": "form-control",
    rows: "25"
  }), "\n    "), HTML.Raw("<br>\n    "), HTML.getTag("btn")({
    id: "export",
    "class": "btn-success btn"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Export");
  })), HTML.Raw("<br>\n    "), HTML.H2(Blaze.View("lookup:progress", function() {
    return Spacebars.mustache(view.lookup("progress"));
  })), "\n  ");
}));

})();
