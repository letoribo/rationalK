enforceLogin = function () {
  var routeName = this.url;
  if (routeName.match(/login/)) {
    return;
  }
  if (routeName.match(/invitation/)) {
    this.next();
    return;
  }
  if (routeName.match(/reset-password/)) {
    this.next();
    return;
  }
  if (routeName.match(/external/)) {
    this.next();
    return;
  }
  if (!Meteor.userId()) {
    this.layout("loginLayout");
    this.render();
    return;
  }
  this.next();
};

Router.onBeforeAction(function () {
  this.next();
});

Router.onBeforeAction(enforceLogin);

Router.route("/", {
  name: "dashboard",
  waitOn: function () {
    return [
      Meteor.subscribe("views"),
      Meteor.subscribe("docs"),
      Meteor.subscribe("members"), //needed to display the last activity owner
      Meteor.subscribe("history"),
      Meteor.subscribe("revisions"),
      Meteor.subscribe("categories"),
      Meteor.subscribe("mySpace"),
      ];
  },
  progress: {
    enabled: false,
  },
});

/*
Router.route('/dashboard', function () {
  this.redirect('/');
});
*/

Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  waitOn: function () {
    return [Meteor.subscribe("members")];
  },
});

Router.route("/login", {
  layoutTemplate: 'loginLayout',
  data: function () {
    templateData = { docs: Docs.find({}) };
    return templateData;
  },
  waitOn: function () {
    return [
      Meteor.subscribe("naccounts"),
      Meteor.subscribe("accounts"),
      Meteor.subscribe("members"),
    ];
  },
});

Router.route("/access-denied", {
  layoutTemplate: 'accessDenied',
});


Router.route("/reset-password/:token", {
  name: "resetPassword",
  waitOn: function () {
    return [

    ];
  },
});

Router.route("/account/new", {
  name: "accountNew",
  waitOn: function () {
    return [Meteor.subscribe("accounts")];
  },
});

Router.route("/tags", {
  waitOn: function () {
    return [
      Meteor.subscribe("docs"),
      Meteor.subscribe("tags"),
    ];
  },
});

Router.route("/followup", {
  waitOn: function () {
    return [
      Meteor.subscribe("followup"),
    ];
  },
});

Router.route("/account/:_id/edit", {
  name: "accountEdit",
  data: function () {
    return Meteor.users.findOne(this.params._id);
  },
  waitOn: function () {
    return [Meteor.subscribe("accounts")];
  },
});

Router.route("/accounts", {
  name: "accountList",
  waitOn: function () {
    return [Meteor.subscribe("accounts")];
  },
});

Router.route("/members", {
  name: "members",
  waitOn: function () {
    return [
      Meteor.subscribe("members"),
      Meteor.subscribe("invitation"),
    ];
  },
});

Router.route("/member/new", {
  name: "memberNew",
  waitOn: function () {
    return [
      Meteor.subscribe("members"),
    ];
  },
});

Router.route("/member/:_id/edit", {
  name: "memberEdit",
  data: function () {
    return Members.collection.findOne({
      _id: this.params._id,
    });
  },
  waitOn: function () {
    return [
      Meteor.subscribe("member", this.params._id),
      Meteor.subscribe("rkSettings"),
    ];
  },
});

Router.route("/views/add", {
  name: "viewNew",
  waitOn: function () {
    return [Meteor.subscribe("views")];
  },
});

Router.route("/view/:_id/edit", {
  name: "viewEdit",
  data: function () {
    return Views.findOne({}, {
      reactive: true,
    });
  },
  waitOn: function () {
    var data = {};
    data.viewId = this.params._id;
    return [Meteor.subscribe("views", data)];
  },
});

Router.route("/views", {
  name: "viewList",
  waitOn: function () {
    return [
      Meteor.subscribe("views"),
    ];
  },
});

Router.route("/filelinks", {
  name: "filelinks",
  waitOn: function () {
    return [Meteor.subscribe("filelinks")];
  },
});

Router.route("/xml", {
  name: "xml",
  waitOn: function () {
    return [
      Meteor.subscribe("XMLFiles"),
    ];
  },
});


if (Meteor.settings.public.show.controlplan) {
  Router.route("/controlplan", {
    name: "controlplan",
    waitOn: function () {
      return [Meteor.subscribe("controlplan")];
    },
  });

  Router.route("/controlplan/:_id/decCDMER", {
    name: "decCDMER",
    layoutTemplate: 'printLayout',
    waitOn: function () {
      return [Meteor.subscribe("controlplan")];
    },
  });

  Router.route("/controlplan/:_id/planageCDMER", {
    name: "planageCDMER",
    layoutTemplate: 'printLayout',
    waitOn: function () {
      return [Meteor.subscribe("controlplan")];
    },
  });
}

if (Meteor.settings.public.show.processes) {
  Router.route("/processes", {
    name: "processes",
    waitOn: function () {
      return [
        Meteor.subscribe("processes"),
        Meteor.subscribe("rkSettings"),
      ];
    },
  });

  Router.route("/processes/:role/listDocs", {
    name: "listDocsForRoles",
    waitOn: function () {
      var data = {};
      data.role = this.params.role;
      return [
        Meteor.subscribe("docs", data),
        Meteor.subscribe("rkSettings"),
      ];
    },
  });

  Router.route("/processdocuments", {
    name: "processdocuments",
    waitOn: function () {
      return [Meteor.subscribe("processdocuments")];
    },
  });

  Router.route("/process/:_id", {
    name: "process",
    data: function () {
      return Processes.findOne(this.params._id);
    },
    waitOn: function () {
      return [Meteor.subscribe("process", this.params._id), Meteor.subscribe("processdocuments")];
    },
  });

  Router.route("/updateprocessdocuments/:processId/:elementId", {
    name: "updateprocessdocuments",
    data: function () {
      return Processes.findOne(this.params.processId);
    },
    waitOn: function () {
      return [
        Meteor.subscribe("process", this.params.processId),
        Meteor.subscribe("processdocuments"),
        Meteor.subscribe("docs"),
        Meteor.subscribe("revisions"),
        Meteor.subscribe("categories"),
        Meteor.subscribe("searchqueries"),
        Meteor.subscribe("views"),
        Meteor.subscribe("discussions"),
        Meteor.subscribe("messages"),
        Meteor.subscribe("members"),
        Meteor.subscribe("walkedfiles"),
        Meteor.subscribe("myNotes"),
      ];
    },
  });
}

if (Meteor.settings.public.show.gantts) {
  Router.route("/gantts", {
    name: "gantts",
    waitOn: function () {
      return [
        Meteor.subscribe("gantts"),
      ];
    },
  });

  Router.route("/gantt/:_id", {
    name: "gantt",
    data: function () {
      return Gantts.findOne(this.params._id);
    },
    waitOn: function () {
      return [
        Meteor.subscribe("gantts", this.params._id),
       ];
    },
  });
}

if (Meteor.settings.public.show.projects) {
  Router.route("/projects", {
    name: "projects",
    waitOn: function () {
      return [
        Meteor.subscribe("projects"),
        Meteor.subscribe("rkSettings"),
      ];
    },
  });

  Router.route("/project/:_id", {
    name: "project",
    data: function () {
      return Projects.findOne(this.params._id);
    },
    waitOn: function () {
      return [
        Meteor.subscribe("project", this.params._id),
        Meteor.subscribe("projectfiles", this.params._id),
        Meteor.subscribe("docs"),
        Meteor.subscribe("revisions"),
        Meteor.subscribe("categories"),
        Meteor.subscribe("searchqueries"),
        Meteor.subscribe("views"),
        Meteor.subscribe("discussions"),
        Meteor.subscribe("messages"),
        Meteor.subscribe("members"),
        Meteor.subscribe("walkedfiles"),
        Meteor.subscribe("myNotes"),
        Meteor.subscribe("rkSettings"),
       ];
    },
  });
}

if (Meteor.settings.public.show.discussions) {
  Router.route("/discussions", {
    name: "discussions",
    waitOn: function () {
      return [
        Meteor.subscribe("discussions"),
        Meteor.subscribe("messages"),
        Meteor.subscribe("members"),
      ];
    },
  });

  Router.route("/discussion/:_id", {
    name: "discussion",
    data: function () {
      return Discussions.findOne({}, {
        reactive: true,
      });
    },
    waitOn: function () {
      return [
        Meteor.subscribe("discussion", this.params._id),
        Meteor.subscribe("messagesinthisdiscussion", this.params._id),
        Meteor.subscribe("members"),
      ];
    },
  });
}

Router.route("/docs/docImport", {
  name: "docImport",
  waitOn: function () {
    return [
      Meteor.subscribe("categories"),
    ];
  },
});

Router.route("/docs/docExport", {
  name: "docExport",
  waitOn: function () {
    return [
      Meteor.subscribe("categories"),
      Meteor.subscribe('docs'),
    ];
  },
});

Router.route("/calculation", {
  name: "calculation",
  waitOn: function () {
    return [

    ];
  },
});

Router.route("/doc/:_id/edit", {
  name: "docEdit",
  onBeforeAction: function () {
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {
      // render the accessDenied template but keep the url in the browser the same
      this.render('accessDenied');
    }
    else {
      this.next();
    }
  },
  data: function () {
    return Docs.findOne(this.params._id);
  },
  waitOn: function () {
    var data = {};
    data.docId = this.params._id;
    return [
      Meteor.subscribe("docs", data),
      Meteor.subscribe("views"), //need all
      Meteor.subscribe("members"), //need all
      Meteor.subscribe("categories"), //need all
      Meteor.subscribe("attachments", "doc-" + data.docId),
      Meteor.subscribe("predefinedtags"),
      Meteor.subscribe("rkSettings"),
      Meteor.subscribe("mySpace"),
      Meteor.subscribe("docHistory", data.docId),
    ];
  },
});

Router.route("/revision/:_id/view", {
  name: "revisionView",
  data: function () {
    return Revisions.findOne(this.params._id);
  },
  waitOn: function () {
    var data = {};
    data.revisionId = this.params._id;
    return [
      Meteor.subscribe("docs", data),
      Meteor.subscribe("views", data),
      Meteor.subscribe("members"),
      Meteor.subscribe("categories", data),
      Meteor.subscribe("revisions", data),
      Meteor.subscribe("predefinedtags"),
      Meteor.subscribe("mySpace"),
    ];
  },
});

Router.route("/doc/create", {
  name: "docCreate",
  template: "docEdit",
  onBeforeAction: function () {
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {
      // render the accessDenied template but keep the url in the browser the same
      this.render('accessDenied');
    }
    else {
      this.next();
    }
  },
  data: function () {
    return {
      categoryId: Session.get('selectedCategory'),
    };
  },
  waitOn: function () {
    return [
      Meteor.subscribe("docs"),
      Meteor.subscribe("views"),
      Meteor.subscribe("members"),
      Meteor.subscribe("categories"),
      Meteor.subscribe("predefinedtags"),
      Meteor.subscribe("rkSettings"),
    ];
  },
});

Router.route("/categories/add", {
  name: "categoryNew",
  waitOn: function () {
    return [Meteor.subscribe("categories"), Meteor.subscribe("views")];
  },
});

Router.route("/category/:_id/edit", {
  name: "categoryEdit",
  data: function () {
    return Categories.findOne(this.params._id);
  },
  waitOn: function () {
    var data = {};
    data.categoryId = this.params._id;
    return [
      Meteor.subscribe("categories", data),
      Meteor.subscribe("views", data),
      Meteor.subscribe("rkSettings"),
    ];
  },
});

Router.route("/categories", {
  name: "categoryList",
  waitOn: function () {
    return [
      Meteor.subscribe("categories"),
      Meteor.subscribe("views"),
    ];
  },
});

Router.route("/invitation/:invitationId", {
  name: "invitation",
  template: "invitation",
  data: function () {
    return Members.invitations.findOne(this.params.invitationId);
  },
  waitOn: function () {
    return [Meteor.subscribe("members"), Meteor.subscribe("invitation", this.params.invitationId)];
  },
});

Router.route("/revisions/:docId", {
  name: "revisions",
  template: "revisions",
  waitOn: function () {
    return [Meteor.subscribe("doc-revisions", this.params.docId), Meteor.subscribe("categories"), Meteor.subscribe("views")];
  },
});

Router.route("/browse/:categorySlug?", {
  name: "browse",
  data: function () {
    return this.params.categorySlug;
  },
  waitOn: function () {
    return [
      Meteor.subscribe("mySpace"),
      Meteor.subscribe("categories"),
      Meteor.subscribe("views"),
      Meteor.subscribe("docs"),
      Meteor.subscribe("members"),
      Meteor.subscribe("revisions"),
    ];
  },
});

Router.route("/logs", {
  name: "logs",
  waitOn: function () {
    return [
      Meteor.subscribe("history"),
    ];
  },
});


Router.route("/update");

if (Meteor.settings.public.show.about) {
  Router.route("/about");
}

Router.route("/walk", {
  waitOn: function () {
    return [
      Meteor.subscribe("folderstoscan"),
      Meteor.subscribe("rkSettings"),
      Meteor.subscribe("rkStatus"),
    ];
  },
});

Router.route("/files", {
  name: "files",
  waitOn: function () {
    return [
      Meteor.subscribe("walkedfiles"),
      Meteor.subscribe("rkStatus"),
    ];
  },
});

Router.route("/fileView", {
  name: "fileView",
  waitOn: function () {
    return [];
  },
});

Router.route("/external/:externalDocId?", {
  name: "external",
  layoutTemplate: 'externalLayout',
  waitOn: function () {
    if (typeof Session.get("externalDocId") === 'undefined') {
      Session.set("externalDocId", "");
    }
    return [
      Meteor.subscribe("external", Session.get('externalDocId')),
    ];
  },
});

Router.route("/backup", {
  name: "backup",
  waitOn: function () {
    return [
      Meteor.subscribe("members"),
    ];
  },
});

if (Meteor.settings.public.show.notes) {
  Router.route("/notes", {
    name: "notes",
    waitOn: function () {
      return [
        Meteor.subscribe("notes"),
        Meteor.subscribe("members"),
      ];
    },
  });
}

Router.route("/synonyms", {
  name: "synonyms",
  waitOn: function () {
    return [Meteor.subscribe("synonyms")];
  },
});

if (Meteor.settings.public.show.relationships) {
  Router.route("/relationships", {
    name: "relationships",
    waitOn: function () {
      return [];
    },
  });
}

if (Meteor.settings.public.show.expert) {
  Router.route("/expert", {
    name: "expert",
    waitOn: function () {
      return [Meteor.subscribe("expert"), Meteor.subscribe("members")];
    },
  });
}

Router.route("/search", {
  name: "searchTpl",
  waitOn: function () {
    var subscribtions =  [
      Meteor.subscribe("revisions"),
      Meteor.subscribe("categories"),
      Meteor.subscribe("myCurrentSearchQuery"),
      Meteor.subscribe("views"),
      Meteor.subscribe("tags"),
      Meteor.subscribe("members"),
      Meteor.subscribe("synonyms"),
      Meteor.subscribe("mySpace"),
      Meteor.subscribe("rkSettings"),
    ];

    searchQuerySentToServer = Session.get("searchQuerySentToServer");

    if ((typeof searchQuerySentToServer !== 'undefined') && (searchQuerySentToServer !== '') ) {
      searchType = Session.get("searchType");
      catFilter = Session.get("catFilter");
      includeWalkedFilesInResults = Session.get('includeWalkedFilesInResults');
      includeWebInResults = Session.get('includeWebInResults');

      if (Meteor.settings.public.debug) {
        console.log("searchQuerySentToServer : " + searchQuerySentToServer);
        console.log("searchType : " + searchType);
        console.log("catFilter : " + catFilter);
        console.log("includeWalkedFilesInResults : " + includeWalkedFilesInResults);
        console.log("includeWebInResults : " + includeWebInResults);
      }
      Meteor.subscribe("searchResults", searchQuerySentToServer, catFilter, searchType, includeWalkedFilesInResults);
      /*
      subscribtions = subscribtions.push();
      */
      if (includeWebInResults) { // https://cse.google.com/cse/all
        Meteor.subscribe("cse", searchQuerySentToServer);
        //subscribtions = subscribtions.push()
      }
    }

    return subscribtions;
  },
});


Router.route("/stats", {
  name: "stats",
  waitOn: function () {
    return [
      Meteor.subscribe("categories"),
      Meteor.subscribe("docs"),
      Meteor.subscribe("history"),
      Meteor.subscribe("revisions"),
      Meteor.subscribe("searchqueries"),
      Meteor.subscribe("members"),
      Meteor.subscribe("tags"),
    ];
  },
});

Router.route("/predefinedtags/edit", {
  name: "predefinedtagsEdit",
  waitOn: function () {
    return [Meteor.subscribe("predefinedtags")];
  },
});

Router.route("/settings", {
  name: "settingsTemplate",
  waitOn: function () {
    return [
      Meteor.subscribe("rkSettings"),
      Meteor.subscribe("categories"), //for the nav, not good...
    ];
  },
});

if (Meteor.settings.public.show.erp) {
  Router.route("/erp/stocks", {
    name: "stocks",
    waitOn: function () {
      return [Meteor.subscribe("production")];
    },
  });

  Router.route("/erp/plan", {
    name: "plan",
    waitOn: function () {
      return [
        Meteor.subscribe("production"),
        Meteor.subscribe("ressourcePlanningPublished"),
      ];
    },
  });

  Router.route("/erp/product/:_id", {
    name: "build",
    data: function () {
      return Production.findOne(this.params._id);
    },
    waitOn: function () {
      return [Meteor.subscribe("production")];
    },
  });
}
