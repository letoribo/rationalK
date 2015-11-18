(function(){
Template.__checkName("fieldForView");
Template["fieldForView"] = new Template("Template.fieldForView", (function() {
  var view = this;
  return HTML.FORM({
    id: "addField",
    role: "form",
    "class": "form"
  }, "\n    ", HTML.DIV({
    "class": "form-group"
  }, "\n      ", HTML.Raw('<a href="#" class="edit editField"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>'), "\n      ", HTML.Raw('<span class="handle">::</span>'), "\n      ", HTML.DIV({
    "class": "input-group"
  }, "\n        ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Field name");
  })), "\n        ", HTML.INPUT({
    id: "newField",
    name: "field",
    type: "text",
    placeholder: "Field",
    readonly: "readonly",
    "class": "form-control",
    value: function() {
      return Spacebars.mustache(view.lookup("key"));
    }
  }), "\n      "), "\n      ", HTML.DIV({
    "class": "input-group"
  }, "\n        ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Field type");
  })), "\n        ", HTML.SELECT({
    id: function() {
      return [ "newFieldType_", Spacebars.mustache(view.lookup("key")) ];
    },
    readonly: "readonly",
    "class": "form-control newFieldTypeClass",
    "data-key": function() {
      return Spacebars.mustache(view.lookup("key"));
    }
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("fieldTypes"));
  }, function() {
    return [ "\n            ", HTML.OPTION(HTML.Attrs({
      value: function() {
        return Spacebars.mustache(view.lookup("value"));
      },
      "data-key": function() {
        return Spacebars.mustache(view.lookup("key"));
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("isSelected"));
    }), Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    })), "\n          " ];
  }), "\n        "), "\n      "), "\n      ", HTML.Raw("<br>"), "\n      ", HTML.DIV({
    "class": "input-group divMultipleChoice",
    id: function() {
      return [ "divMultipleChoice_", Spacebars.mustache(view.lookup("key")) ];
    },
    "data-key": function() {
      return Spacebars.mustache(view.lookup("key"));
    },
    "data-type": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("value"), "type"));
    }
  }, "\n        ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Multiple choices");
  })), "\n        ", HTML.INPUT({
    id: "fieldForView_multipleChoice",
    name: "fieldForView_multipleChoice",
    type: "text",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Choice A,Choice B");
    },
    readonly: "readonly",
    "class": "form-control inputForMultipleChoices",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("value"), "multipleChoices"));
    }
  }), "\n        ", HTML.Raw('<p class="help-block">Separate the allowed options with a comma (,)</p>'), "\n      "), "\n\n      ", HTML.DIV({
    "class": "input-group"
  }, "\n        ", HTML.LABEL({
    "for": "name"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Field options");
  })), "\n        ", HTML.DIV({
    "class": "checkbox"
  }, "\n          ", HTML.LABEL("\n            ", HTML.INPUT(HTML.Attrs({
    id: "fieldAdd_mandatory",
    type: "checkbox",
    name: "fieldForView_mandatory",
    disabled: "disabled"
  }, function() {
    return Spacebars.attrMustache(view.lookup("checkIfMandatory"));
  })), "Mandatory\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "checkbox"
  }, "\n          ", HTML.LABEL("\n            ", HTML.INPUT(HTML.Attrs({
    id: "fieldAdd_unique",
    type: "checkbox",
    name: "fieldForView_unique",
    disabled: "disabled"
  }, function() {
    return Spacebars.attrMustache(view.lookup("checkIfUnique"));
  })), "Unique\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "checkbox"
  }, "\n          ", HTML.LABEL("\n            ", HTML.INPUT(HTML.Attrs({
    id: "fieldAdd_hideInTable",
    type: "checkbox",
    name: "fieldForView_hideInTable",
    disabled: "disabled"
  }, function() {
    return Spacebars.attrMustache(view.lookup("checkIfHideInTable"));
  })), "Hide in table\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "checkbox"
  }, "\n          ", HTML.LABEL("\n            ", HTML.INPUT(HTML.Attrs({
    id: "fieldAdd_hideInSearchResultsDisplay",
    type: "checkbox",
    name: "fieldForView_hideInSearchResultsDisplay",
    disabled: "disabled"
  }, function() {
    return Spacebars.attrMustache(view.lookup("checkIfHideInSearchResultsDisplay"));
  })), "Hide in search result page\n          "), "\n        "), "\n      "), "\n      ", HTML.Raw('<div class="input-group">\n        <a href="#" class="delete deleteField"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>\n      </div>'), "\n    "), "\n  ");
}));

})();
