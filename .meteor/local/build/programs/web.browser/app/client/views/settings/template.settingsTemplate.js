(function(){
Template.__checkName("settingsTemplate");
Template["settingsTemplate"] = new Template("Template.settingsTemplate", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12"
  }, "\n			 ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			 		", HTML.DIV({
    "class": "panel-heading",
    style: "position:relative"
  }, "\n						", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Settings");
  })), "\n					"), "\n					", HTML.DIV({
    "class": "panel-body"
  }, "\n\n						", HTML.DIV({
    "class": "post"
  }, "\n								", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Files");
  })), "\n								", HTML.DIV({
    "class": "row"
  }, "\n									", HTML.Raw('<div class="col-md-6">\n										<p><a href="#" class="walkThruFilelinks" title="Check filelinks">Check if windows filelinks are broken or not</a></p>\n										<p><a href="#" class="walkThruFolders" title="Scan all folders">Scan all folders</a></p>\n									</div>'), "\n									", HTML.DIV({
    "class": "col-md-6"
  }, "\n										", HTML.Raw("<h5>Quicklinks</h5>"), "\n										", HTML.UL("\n											", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "files");
    },
    title: function() {
      return Spacebars.mustache(view.lookup("_"), "Files");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Files");
  }))), "\n											", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "walk");
    },
    title: "See folders and files"
  }, "Walk")), "\n											", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "filelinks");
    },
    title: "Filelinks"
  }, "Filelinks")), "\n										"), "\n									"), "\n							"), "\n						"), "\n\n						", HTML.DIV({
    "class": "post"
  }, "\n							", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Quality");
  })), "\n							", HTML.DIV({
    "class": "row"
  }, "\n								", HTML.DIV({
    "class": "col-md-12"
  }, "\n									", HTML.FORM({
    id: "validatedFilesPathForm"
  }, "\n										", HTML.DIV({
    "class": "form-group"
  }, "\n											", HTML.Raw('<label for="validatedFilesPath">Folderpath of validated document</label>'), "\n											", HTML.INPUT({
    type: "text",
    "class": "form-control",
    id: "validatedFilesPath",
    value: function() {
      return Spacebars.mustache(view.lookup("validatedFilesPath"));
    }
  }), "\n											", HTML.Raw('<p class="help-block">All files in this folder are validated by Quality department or by the process pilot. Choose a read-only clientpath i.e. J:/quality/readonly/. If you want to add more than one folder, please separate them with a vertical bar : | </p>'), "\n										"), "\n									", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-default"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Save");
  })), "\n									"), "\n								"), "\n							"), "\n						"), "\n\n						", HTML.DIV({
    "class": "post"
  }, "\n							", HTML.H4(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Roles");
  })), "\n							", HTML.DIV({
    "class": "row"
  }, "\n								", HTML.DIV({
    "class": "col-md-12"
  }, "\n									", HTML.FORM({
    id: "rolesForm"
  }, "\n										", HTML.DIV({
    "class": "form-group"
  }, "\n											", HTML.LABEL({
    "for": "Roles"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Custom roles");
  })), "\n											", HTML.INPUT({
    type: "text",
    "class": "form-control",
    id: "Roles",
    value: function() {
      return Spacebars.mustache(view.lookup("Roles"));
    }
  }), "\n											", HTML.P({
    "class": "help-block"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Separate them with a vertical bar");
  }), " : | "), "\n										"), "\n									", HTML.BUTTON({
    type: "submit",
    "class": "btn btn-default"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "Save");
  })), "\n									"), "\n								"), "\n							"), "\n						"), "\n\n						", HTML.Raw('<div class="post">\n							<h4>Backup</h4>\n							<div class="row">\n								<div class="col-md-12">\n										<p>Backups are automatically done every day, week and month</p>\n										<p>You can restore monthly backup, weekly, daily</p>\n										<p>To back call <code>Meteor.call("loadBackup","/Users/thomasdokithonon/Downloads/backups/rationalK")</code> from you meteor shell.</p>\n										<p>In the folder you should have file like <code>categories.bson</code>, ...</p>\n										<p>Your database will be completely emptied ! So don\'t do this if you don\'t know what you are doing.</p>\n					      </div>\n					    </div>\n						</div>'), "\n\n\n        	"), "\n    		"), "\n		"), "\n	"), "\n	", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("hasTemplate"), "trelloSettings");
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("trelloSettings")), "\n  " ];
  }), "\n	", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("hasTemplate"), "settingsLinkPPM");
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("settingsLinkPPM")), "\n	" ];
  }), "\n	", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("hasTemplate"), "settingsFilesContent");
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("settingsFilesContent")), "\n	" ];
  }), "\n	", Blaze.Each(function() {
    return Spacebars.call(view.lookup("packageSettings"));
  }, function() {
    return [ "\n		", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("templateName"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n	" ];
  }) ];
}));

})();
