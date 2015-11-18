(function(){
Template.__checkName("searchTpl");
Template["searchTpl"] = new Template("Template.searchTpl", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 	", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n			 		", HTML.H3({
    "class": "panel-title"
  }, "\n						", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Search");
  }), "\n						", HTML.A({
    "class": "pull-right",
    href: "http://rationalk.ch/doc#search",
    target: "_blank",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Open help in a new window");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "\n					"), "\n				"), "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.FORM({
    "class": "form-inline searchForm",
    role: "form"
  }, "\n						", HTML.DIV({
    "class": "form-group"
  }, "\n							", HTML.DIV({
    "class": "input-group"
  }, "\n								", HTML.INPUT({
    autocomplete: "off",
    spellcheck: "off",
    "data-source": "tags",
    id: "keywords",
    name: "searchQuery",
    "class": "form-control keywords typeahead",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("_"), "Search text");
    },
    size: "24"
  }), "\n							"), "\n						"), "\n						", HTML.Raw('<!--\n  					<div class="checkbox includeSynonymsInResults-checkbox">\n							<label>\n								<input type="checkbox" checked="{{includeSynonymsInResults}}" id="includeSynonymsInResults-checkbox"> {{_ "Include Synonyms"}}\n							</label>\n  					</div>\n						-->'), "\n						", HTML.DIV({
    "class": "form-group"
  }, "\n								", HTML.DIV({
    "class": "input-group"
  }, "\n									", HTML.SELECT({
    "class": "form-control",
    id: "catFilter"
  }, "\n										", HTML.OPTION({
    value: "all"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "All categories");
  })), "\n										", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Categories"));
  }, function() {
    return [ "\n											", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("_id"));
      }
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n										" ];
  }), "\n									"), "\n								"), "\n						"), "\n						", HTML.DIV({
    "class": "form-group"
  }, "\n								", HTML.DIV({
    "class": "input-group"
  }, "\n									", HTML.SELECT({
    "class": "form-control",
    id: "searchType"
  }, "\n										", HTML.OPTION({
    value: "fullTextSearch"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Full text search");
  })), "\n										", HTML.OPTION({
    value: "regexpSearch"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Classic search");
  })), "\n									"), "\n								"), "\n						"), "\n						", HTML.DIV({
    id: "includeWalkedFilesInResultsDiv",
    "class": "checkbox includeWalkedFilesInResultsCheckbox"
  }, "\n							", HTML.LABEL("\n								", HTML.INPUT({
    type: "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("includeWalkedFilesInResults"));
    },
    id: "includeWalkedFilesInResultsCheckbox"
  }), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Include Windows files");
  }), "\n							"), "\n  					"), "\n						", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("hasTemplate"), "webInSearchResults");
  }, function() {
    return [ "\n							", Spacebars.include(view.lookupTemplate("webInSearchResultsCheckbox")), "\n						" ];
  }), "\n\n  					", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-primary search"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Search");
  })), "\n\n						", HTML.DIV({
    "class": "checkbox highlight-checkbox"
  }, "\n							", HTML.LABEL("\n								", HTML.INPUT({
    type: "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("highlightResults"));
    }
  }), " ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Highlights results");
  }), "\n							"), "\n  					"), "\n						", Blaze.If(function() {
    return Spacebars.call(view.lookup("nResults"));
  }, function() {
    return [ "\n				     	", HTML.DIV({
      "class": "form-group pull-right"
    }, "\n								", HTML.DIV({
      "class": "input-group"
    }, "\n									", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Number of results");
    }), " : ", Blaze.View("lookup:nResults", function() {
      return Spacebars.mustache(view.lookup("nResults"));
    })), "\n								"), "\n				     	"), "\n				     " ];
  }), "\n					"), "\n						", HTML.Raw("<hr>"), "\n						", HTML.DIV({
    id: "resultsContent",
    "class": "results-wrapper"
  }, "\n		        			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("searchResults"));
  }, function() {
    return [ "\n				        				", Blaze.If(function() {
      return Spacebars.call(view.lookup("fields"));
    }, function() {
      return [ "\n				        					", Spacebars.include(view.lookupTemplate("docInSearchResults")), "\n				        				" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "trelloCardInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("boardName"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("trelloCardInSearchResults")), "\n													" ];
      }), "\n											  " ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "corePFMEAInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromCorePFMEA"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("corePFMEAInSearchResults")), "\n													" ];
      }), "\n											  " ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "messageInSearchResults");
    }, function() {
      return [ "\n					        				", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromMessage"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("messageInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "discussionInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromDiscussion"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("discussionInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "noteInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromNotes"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("noteInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "wikiInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromWiki"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("wikiInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "taskInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromTasks"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("taskInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n												", Blaze.If(function() {
      return Spacebars.call(view.lookup("path"));
    }, function() {
      return [ "\n													", Spacebars.include(view.lookupTemplate("fileInSearchResults")), "\n												" ];
    }), "\n\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "expert");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromExperts"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("expertInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "sheetInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromSheet"));
      }, function() {
        return [ "\n														", Spacebars.include(view.lookupTemplate("sheetInSearchResults")), "\n													" ];
      }), "\n												" ];
    }), "\n\n												", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasTemplate"), "filesContentInSearchResults");
    }, function() {
      return [ "\n													", Blaze.If(function() {
        return Spacebars.call(view.lookup("searchResultFromFileContent"));
      }, function() {
        return [ "\n					        					", Spacebars.include(view.lookupTemplate("filesContentInSearchResults")), "\n					        				" ];
      }), "\n												" ];
    }), "\n\n									" ];
  }, function() {
    return [ "\n										", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("webSearchResults"), "count"));
    }, function() {
      return "\n\n										";
    }, function() {
      return [ "\n											", Blaze.View("lookup:messageOnNoResult", function() {
        return Spacebars.mustache(view.lookup("messageOnNoResult"));
      }), "\n										" ];
    }), "\n									" ];
  }), "\n								", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("hasTemplate"), "webInSearchResults");
  }, function() {
    return [ "\n									", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("webSearchResults"), "count"));
    }, function() {
      return [ "\n											", Blaze.Each(function() {
        return Spacebars.call(view.lookup("webSearchResults"));
      }, function() {
        return [ "\n												", HTML.DIV({
          "class": "post"
        }, "\n													", Spacebars.include(view.lookupTemplate("webInSearchResults")), "\n												"), "\n											" ];
      }), "\n									" ];
    }), "\n								" ];
  }), "\n					"), "\n        		"), "\n    		"), "\n		"), "\n	");
}));

})();
