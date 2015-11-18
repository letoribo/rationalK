(function(){
Template.__checkName("docAssociation");
Template["docAssociation"] = new Template("Template.docAssociation", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n    ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n        ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Linked Documents");
  })), "\n    "), "\n    ", HTML.DIV({
    "class": "panel-body"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("thisDocHasBeenCopiedForAssociation"));
  }, function() {
    return [ "\n        ", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "This document is stored in your clipboard");
    }), ". ", Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Ready to be linked to another document");
    }), "."), "\n      " ];
  }, function() {
    return [ "\n        ", HTML.FORM({
      id: "docAssociationForm"
    }, "\n          ", HTML.BUTTON({
      type: "submit",
      "class": "btn btn-default"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Link this document with another");
    })), "\n        "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("anotherDocIsInMemoryForAssociation"));
  }, function() {
    return [ "\n        ", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "You currently have a document in your clipboard");
    })), "\n        ", HTML.FORM({
      id: "docCreateAssociationForm"
    }, "\n          ", HTML.BUTTON({
      type: "submit",
      "class": "btn btn-default"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Link the document in your clipboard with this one");
    })), "\n        "), "\n      " ];
  }, function() {
    return "\n\n      ";
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("thisDocHasAssociatedDocs"));
  }, function() {
    return [ "\n        ", HTML.H4("Associations"), "\n        ", HTML.UL("\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("thisDocHasAssociatedDocs"));
    }, function() {
      return [ "\n          ", HTML.Comment(" <li><a href=\"{{pathFor 'docEdit' _id=docId}}\" title=\"{{_ 'Open Document'}}\">{{docId}}</a></li> "), "\n          " ];
    }), "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("linkedDocsHelper"));
    }, function() {
      return [ "\n          ", HTML.LI(HTML.A({
        href: function() {
          return Spacebars.mustache(view.lookup("pathFor"), "docEdit", Spacebars.kw({
            _id: view.lookup("_id")
          }));
        },
        title: function() {
          return Spacebars.mustache(view.lookup("_"), "Open Document");
        }
      }, Blaze.View("lookup:full", function() {
        return Spacebars.mustache(view.lookup("full"));
      })), " ", HTML.A({
        "class": "deleteLink",
        href: "#",
        "data-docid1": function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        title: function() {
          return Spacebars.mustache(view.lookup("_"), "Delete link");
        }
      }, HTML.SPAN({
        "class": "glyphicon glyphicon-trash",
        "aria-hidden": "true"
      }))), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n\n\n    "), "\n  ");
}));

})();
