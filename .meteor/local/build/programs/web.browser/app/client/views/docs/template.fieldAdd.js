(function(){
Template.__checkName("fieldAdd");
Template["fieldAdd"] = new Template("Template.fieldAdd", (function() {
  var view = this;
  return HTML.FORM({
    id: "addField",
    role: "form",
    "class": "form-inline"
  }, "\n  ", HTML.DIV({
    "class": "form-group"
  }, "\n    ", HTML.DIV({
    "class": "input-group"
  }, "\n      ", HTML.INPUT({
    id: "newField",
    name: "newField",
    type: "text",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Title");
    },
    "class": "form-control"
  }), "\n    "), "\n    ", HTML.LABEL("\n      ", HTML.getTag("newfieldtype")(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Type");
  }), " :"), "\n    "), "\n    ", HTML.SELECT({
    id: "newFieldType",
    "class": "form-control"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("types"));
  }, function() {
    return [ "\n      ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("value"));
      }
    }, Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    })), "\n      " ];
  }), "\n    "), "\n\n    ", HTML.DIV({
    "class": "checkbox"
  }, "\n      ", HTML.LABEL("\n        ", HTML.Raw('<input id="fieldAdd_mandatory" type="checkbox" name="fieldAdd_mandatory" title="Add">'), Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Mandatory");
  }), "\n      "), "\n    "), "\n    ", HTML.Raw('<!--\n    <div class="checkbox">\n      <label>\n        <input id="fieldAdd_unique" type="checkbox" name="fieldAdd_unique"/>Unique\n      </label>\n    </div>\n    -->'), "\n    ", HTML.Raw('<input type="submit" value="+" class="btn btn-success btn-sm">'), "\n  "), "\n");
}));

})();
