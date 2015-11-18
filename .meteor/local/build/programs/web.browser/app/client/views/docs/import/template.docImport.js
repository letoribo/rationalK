(function(){
Template.__checkName("docImport");
Template["docImport"] = new Template("Template.docImport", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n      ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n          ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Import");
  })), "\n      "), "\n      ", HTML.DIV({
    "class": "panel-body"
  }, "\n        ", HTML.FORM({
    role: "form",
    "class": "main"
  }, "\n          ", HTML.Raw('<div class="form-group">\n            <p>Here you can copy-paste your existing Excel document index to import them directly.</p>\n            <p>Make sure that the first line of your Excel document contains your table headers.</p>\n          </div>'), "\n          ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.SELECT({
    id: "selectedCategory",
    "class": "form-control"
  }, "\n              ", HTML.Raw('<option value="">Choose a category</option>'), "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("categories"));
  }, function() {
    return [ "\n              ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("_id"));
      }
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n              " ];
  }), "\n            "), "\n          "), "\n          ", HTML.Raw('<div class="form-inline">\n            <div class="form-group">\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="" checked="checked"> autodetect\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value=","> comma\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="."> dot\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value=";"> semicoma\n                </label>\n              </div>\n              <div class="radio">\n                <label>\n                  <input type="radio" name="delimiter" value="	"> tab\n                </label>\n              </div>\n            </div>\n            <div class="form-group pull-right">\n              <div class="checkbox">\n                <label>\n                  <input type="checkbox" name="limitPreview" checked="checked"> Limit preview\n                </label>\n              </div>\n              <div class="checkbox">\n                <label>\n                  <input type="checkbox" name="autocreatefields" checked="checked"> Create fields on import\n                </label>\n              </div>\n            </div>\n          </div>'), "\n          ", HTML.DIV({
    "class": "form-group"
  }, "\n            ", HTML.TEXTAREA({
    id: "csv",
    placeholder: "Header and Rows to import. Copy paste Excel",
    "rows:40": "rows:40",
    "class": "form-control"
  }), "\n          "), HTML.Raw("<br>"), "\n          ", HTML.getTag("btn")({
    id: "preview",
    "class": "btn-success btn"
  }, "Preview"), HTML.Raw("<br>"), "\n\n          ", HTML.H2(Blaze.View("lookup:progress", function() {
    return Spacebars.mustache(view.lookup("progress"));
  })), "\n          ", HTML.DIV({
    "class": "tableScroll"
  }, "\n            ", HTML.TABLE({
    "class": "table"
  }, "\n              ", HTML.TR("\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("headers"));
  }, function() {
    return [ "\n                ", HTML.TH(Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n              " ];
  }), "\n              "), "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("data"));
  }, function() {
    return [ "\n              ", HTML.TR("\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("keys"));
    }, function() {
      return [ "\n                    ", Blaze._InOuterTemplateScope(view, function() {
        return Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("."));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      }), "\n                    ", HTML.TD(Blaze.View("lookup:value", function() {
        return Spacebars.mustache(view.lookup("value"));
      })), "\n                " ];
    }), "\n              "), "\n              " ];
  }), "\n            "), "\n          "), "\n\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPreview"));
  }, function() {
    return [ "\n          ", HTML.getTag("btn")({
      id: "cancel",
      "class": "btn-danger btn"
    }, "Cancel"), "\n          ", HTML.getTag("btn")({
      id: "import",
      "class": "btn-success btn"
    }, "Import"), "\n          " ];
  }), "\n\n        "), "\n      "), "\n    ");
}));

})();
