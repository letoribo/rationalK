(function(){
Template.__checkName("docInSearchResults");
Template["docInSearchResults"] = new Template("Template.docInSearchResults", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post"
  }, "\n		", HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-md-10"
  }, "\n				", HTML.Raw("<!-- <p>{{full}}</p> -->"), "\n				", Blaze.Each(function() {
    return Spacebars.call(view.lookup("prettySearchDisplay"));
  }, function() {
    return [ "\n		        	", HTML.P(HTML.STRONG(Blaze.View("lookup:fieldname", function() {
      return Spacebars.mustache(view.lookup("fieldname"));
    })), " : ", Blaze.View("lookup:fieldvalue", function() {
      return Spacebars.mustache(view.lookup("fieldvalue"));
    })), "\n		        " ];
  }, function() {
    return [ "\n					", HTML.P("Il looks like all your fields for this category are marked as hidden."), "\n		        " ];
  }), "\n\n			"), "\n			", HTML.DIV({
    "class": "col-md-2"
  }, "\n				", HTML.SPAN({
    "class": "label label-default"
  }, Blaze.View("lookup:categoryName", function() {
    return Spacebars.mustache(view.lookup("categoryName"));
  })), "\n				", HTML.Raw("<br>"), "\n				", HTML.A({
    href: "#",
    "class": "updateDocInMySpace",
    title: function() {
      return Spacebars.mustache(view.lookup("userSpaceLinkTitle"));
    }
  }, HTML.SPAN({
    "class": function() {
      return [ "glyphicon ", Spacebars.mustache(view.lookup("userSpaceIcon")) ];
    },
    "aria-hidden": "true"
  })), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("searchScore"));
  }, function() {
    return [ "\n					", HTML.SPAN({
      "class": "label label-info"
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-flag",
      "aria-hidden": "true"
    }), " Special search score : ", Blaze.View("lookup:searchScore", function() {
      return Spacebars.mustache(view.lookup("searchScore"));
    })), "\n				" ];
  }), "\n				", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("dontDisplayIfUserIsReadOnly"));
    },
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "docEdit");
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Edit");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>')), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("lastRevision"));
  }, function() {
    return [ "\n					", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "revisionView", Spacebars.kw({
          _id: view.lookup("lastRevision")
        }));
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "View");
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-eye-open",
      "aria-hidden": "true"
    })), " ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "revisions", Spacebars.kw({
          docId: view.lookup("_id")
        }));
      },
      title: "Revisions"
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-time",
      "aria-hidden": "true"
    })), "\n				" ];
  }), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("fileLinkUrl"));
  }, function() {
    return [ "\n					", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("fileLinkUrl"));
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "open_file");
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-folder-open",
      "aria-hidden": "true"
    })), " ", HTML.A({
      href: "#",
      "class": "clip_button",
      "data-clipboard-text": function() {
        return Spacebars.mustache(view.lookup("fileLinkUrlForClipboard"));
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "Copy link to clipboard");
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-paperclip",
      "aria-hidden": "true"
    })), "\n				" ];
  }), "\n				", HTML.Raw("<br>"), "\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("searchTypeIsFullTextSearch"));
  }, function() {
    return [ "\n					", HTML.P("Search Score : ", Blaze.View("lookup:textScore", function() {
      return Spacebars.mustache(view.lookup("textScore"));
    })), "\n				" ];
  }), "\n			"), "\n		"), "\n	");
}));

})();
