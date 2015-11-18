(function(){
Template.__checkName("revisionView");
Template["revisionView"] = new Template("Template.revisionView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n       ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n           ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n             ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Document View");
  })), "\n            "), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n          ", HTML.FORM({
    "class": "main",
    role: "form",
    id: "revisionView"
  }, "\n              ", HTML.SPAN({
    "class": "pull-right label label-info"
  }, "Rev. ", Blaze.View("lookup:revisionNumber", function() {
    return Spacebars.mustache(view.lookup("revisionNumber"));
  })), "  ", HTML.A({
    "class": function() {
      return [ "pull-right ", Spacebars.mustache(view.lookup("dontDisplayIfUserIsReadOnly")) ];
    },
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "docEdit", Spacebars.kw({
        _id: view.lookup("docId")
      }));
    },
    title: "Edit this document"
  }, HTML.Raw('<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>')), "  ", HTML.A({
    href: "#",
    "class": "pull-right ) !==",
    title: function() {
      return Spacebars.mustache(view.lookup("userSpaceLinkTitle"));
    }
  }, HTML.SPAN({
    "class": function() {
      return [ "glyphicon ", Spacebars.mustache(view.lookup("userSpaceIcon")) ];
    },
    "aria-hidden": "true"
  })), "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("viewFields"));
  }, function() {
    return [ "\n                  ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("dataForKey"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("field"));
    }), "\n              " ];
  }), "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("attachments"));
  }, function() {
    return [ "\n                  ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "isUploaded"));
    }, function() {
      return [ "\n                      ", HTML.A({
        href: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "url"), Spacebars.kw({
            download: true
          }));
        },
        target: "_blank",
        "class": "btn btn-primary btn-xs"
      }, "Download"), " ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("name"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("greenLabel"));
      }), "  ", Blaze._TemplateWith(function() {
        return {
          "class": Spacebars.call("btn btn-danger btn-xs")
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("FS"), "DeleteButton"));
        });
      }), HTML.BR(), "\n                  " ];
    }, function() {
      return [ "\n                      ", Blaze._TemplateWith(function() {
        return {
          bootstrap: Spacebars.call(true)
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("FS"), "UploadProgressBar"));
        });
      }), "\n                  " ];
    }), "\n              " ];
  }), "\n          "), "\n            ", Spacebars.include(view.lookupTemplate("qrcode")), "\n        "), "\n       "), "\n    "), "\n  ");
}));

})();
