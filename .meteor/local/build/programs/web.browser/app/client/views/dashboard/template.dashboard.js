(function(){
Template.__checkName("dashboard");
Template["dashboard"] = new Template("Template.dashboard", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n  	  ", HTML.DIV({
    "class": "col-md-12"
  }, "\n  		   ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n  		   		", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n  		   			", HTML.H3({
    "class": "panel-title"
  }, "\n                ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "My Space");
  }), " - ", HTML.Raw('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'), "\n                ", HTML.A({
    "class": "pull-right",
    href: "http://rationalk.ch/doc#favorites",
    target: "_blank",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Open help in a new window");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "\n              "), "\n          	"), "\n    				", HTML.DIV({
    "class": "panel-body"
  }, "\n              ", Blaze.If(function() {
    return Spacebars.call(view.lookup("myFavorites"));
  }, function() {
    return [ "\n    					     ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("myFavorites")),
        settings: Spacebars.call(view.lookup("settingsMyFavorites"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n              " ];
  }, function() {
    return [ "\n                ", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Your favorite documents will appear here for quick access");
    })), "\n              " ];
  }), "\n    				"), "\n  		   "), "\n  	  "), "\n    "), "\n    ", HTML.DIV({
    "class": "row"
  }, "\n  	  ", HTML.DIV({
    "class": "col-md-12"
  }, "\n  		   ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n  		   		", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n  		   			", HTML.H3({
    "class": "panel-title"
  }, "\n                ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Last Activity");
  }), "\n                ", HTML.A({
    "class": "pull-right",
    href: "http://rationalk.ch/doc#activities",
    target: "_blank",
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Open help in a new window");
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-info-sign"></span>')), "\n              "), "\n          		"), "\n  				", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("lastActivity"));
  }, function() {
    return [ "\n  					     ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call(view.lookup("lastActivity")),
        settings: Spacebars.call(view.lookup("settingsLastActivity"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("reactiveTable"));
    }), "\n            " ];
  }, function() {
    return [ "\n                 ", HTML.P(Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "Start doing things and they will appear here");
    }), "."), "\n            " ];
  }), "\n  				"), "\n  		   "), "\n  	  "), "\n    "), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("packageDashboard"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("templateName"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n    " ];
  }) ];
}));

})();
