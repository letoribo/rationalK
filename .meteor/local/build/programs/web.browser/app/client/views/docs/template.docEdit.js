(function(){
Template.__checkName("docEdit");
Template["docEdit"] = new Template("Template.docEdit", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "panel panel-default"
  }, "\n	    ", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n	        ", HTML.H3({
    "class": "panel-title"
  }, Blaze.If(function() {
    return Spacebars.call(view.lookup("onDocEditPage"));
  }, function() {
    return Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Doc Edit");
    });
  }, function() {
    return Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Doc Creation");
    });
  })), "\n	    "), "\n			", HTML.DIV({
    "class": "panel-body"
  }, "\n				", HTML.DIV({
    "class": "row"
  }, "\n			    	", HTML.DIV({
    "class": "col-md-12"
  }, "\n					    ", HTML.FORM({
    role: "form",
    id: "docEdit"
  }, "\n						    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("revisionsUrl"));
  }, function() {
    return [ "\n					       	", HTML.DIV({
      "class": "form-group pull-right"
    }, "\n                    ", HTML.SPAN({
      "class": "label label-info"
    }, "Rev. ", Blaze.If(function() {
      return Spacebars.call(view.lookup("revisionNumber"));
    }, function() {
      return Blaze.View("lookup:revisionNumber", function() {
        return Spacebars.mustache(view.lookup("revisionNumber"));
      });
    }, function() {
      return "0";
    })), "\n										", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("revisionsUrl"));
      },
      title: function() {
        return Spacebars.mustache(view.lookup("_"), "View revision list");
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-eye-open",
      "aria-hidden": "true"
    })), "\n                    ", HTML.A({
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
    })), "\n					       	"), "\n					       	" ];
  }), "\n									", HTML.DIV({
    "class": "well well-sm"
  }, "\n						        ", HTML.DIV({
    "class": "form-group"
  }, "\n							        ", HTML.LABEL({
    "for": "selectedCategory"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Category");
  })), "\n						            ", HTML.SELECT({
    "class": "form-control",
    id: "selectedCategory"
  }, "\n						                ", HTML.OPTION({
    value: ""
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Choose a category");
  })), "\n						                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("categories"));
  }, function() {
    return [ "\n						                    ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("_id"));
      },
      selected: function() {
        return Spacebars.mustache(view.lookup("isCategorySelected"), Spacebars.dot(view.lookup(".."), "categoryId"));
      }
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n						                " ];
  }), "\n						            "), "\n						        "), "\n									"), "\n									", Blaze.Each(function() {
    return Spacebars.call(view.lookup("viewFields"));
  }, function() {
    return [ "\n					            ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("dataForKey"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("field"));
    }), "\n					        " ];
  }), "\n\n							", Blaze.If(function() {
    return Spacebars.call(view.lookup("displaySearchScore"));
  }, function() {
    return [ "\n								", Blaze.If(function() {
      return Spacebars.call(view.lookup("someCategorySelected"));
    }, function() {
      return [ "\n								", HTML.DIV({
        "class": "form-group"
      }, "\n							        ", HTML.LABEL({
        "for": "searchScore"
      }, "Search score"), "\n						            ", HTML.INPUT({
        type: "text",
        "class": "form-control",
        id: "searchScore",
        placeolder: "100",
        value: function() {
          return Spacebars.mustache(view.lookup("searchScore"));
        }
      }), "\n						            ", HTML.P({
        "class": "help-block"
      }, "A document with a high score appears at the top of search results. Give a high score (for example 100) to a document in order to help your colleagues finding the right document."), "\n						        "), "\n								" ];
    }), "\n							" ];
  }), "\n\n							", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayUpload"));
  }, function() {
    return [ "\n						        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("someCategorySelected"));
    }, function() {
      return [ "\n						            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("attachments"));
      }, function() {
        return [ "\n						                ", Blaze.If(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("."), "isUploaded"));
        }, function() {
          return [ "\n						                    ", HTML.A({
            href: function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "url"), Spacebars.kw({
                download: true
              }));
            },
            target: "_blank",
            "class": "btn btn-primary btn-xs"
          }, Blaze.View("lookup:_", function() {
            return Spacebars.mustache(view.lookup("_"), "Download");
          })), " ", Blaze._TemplateWith(function() {
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
          }), HTML.BR(), "\n						                " ];
        }, function() {
          return [ "\n						                    ", Blaze._TemplateWith(function() {
            return {
              bootstrap: Spacebars.call(true)
            };
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("FS"), "UploadProgressBar"));
            });
          }), "\n						                " ];
        }), "\n						            " ];
      }), "\n\n						            ", HTML.LABEL({
        "for": ""
      }, Blaze.View("lookup:_", function() {
        return Spacebars.mustache(view.lookup("_"), "Attachement");
      })), "\n						            ", HTML.DIV({
        id: "dropzone",
        "class": "dropzone"
      }, "\n						                ", HTML.DIV({
        style: "text-align: center; color: gray;"
      }, "Drop file to upload"), "\n						            "), "\n						        " ];
    }, function() {
      return [ "\n						            ", HTML.Comment(' <p class="bg-danger" style="padding:10px;border:1px dotted grey;">Please select a category before editing your fields</p> '), "\n						        " ];
    }), "\n					        " ];
  }), "\n					        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("someCategorySelected"));
  }, function() {
    return [ "\n									", HTML.H4("This document is useful for the following roles"), "\n									", HTML.DIV({
      "class": "form-group",
      id: "usefulForRolesCheckboxes"
    }, "\n										", Blaze.Each(function() {
      return Spacebars.call(view.lookup("usefulForRolesCheckbox"));
    }, function() {
      return [ "\n											", HTML.DIV({
        "class": "checkbox"
      }, "\n									      ", HTML.LABEL("\n									      ", HTML.INPUT({
        type: "checkbox",
        value: "",
        name: function() {
          return Spacebars.mustache(view.lookup("slug"));
        },
        checked: function() {
          return Spacebars.mustache(view.lookup("thisDocumentisUsefulForThisRole"));
        }
      }), " ", Blaze.View("lookup:name", function() {
        return Spacebars.mustache(view.lookup("name"));
      }), "\n									      "), "\n									    "), "\n										" ];
    }), "\n									"), "\n\n					        ", HTML.HR(), "\n					        ", HTML.DIV({
      "class": "form-group"
    }, "\n					            ", HTML.INPUT({
      type: "submit",
      value: function() {
        return Spacebars.mustache(view.lookup("_"), "Save");
      },
      "class": "btn btn-primary submit pull-right",
      id: "docEdit_submit"
    }), "\n					            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("_id"));
    }, function() {
      return [ "\n					                ", HTML.A({
        "class": function() {
          return [ "btn btn-danger delete ", Spacebars.mustache(view.lookup("displayOnlyForAdmin")) ];
        },
        id: "deleteDoc",
        href: "#"
      }, Blaze.View("lookup:_", function() {
        return Spacebars.mustache(view.lookup("_"), "Delete DB entry");
      })), "\n					            " ];
    }), "\n					        "), "\n					        " ];
  }), "\n					    "), "\n					"), "\n				"), "\n			"), "\n		"), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("onDocEditPage"));
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("docApproval")), "\n			", Spacebars.include(view.lookupTemplate("docAssociation")), "\n			", Spacebars.include(view.lookupTemplate("docHistory")), "\n			", Spacebars.include(view.lookupTemplate("qrcode")), "\n		" ];
  }) ];
}));

})();
