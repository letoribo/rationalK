var selectedCategory = new ReactiveVar('');
var iAmAllowedToBrowseThisDocReactiveVar = new ReactiveVar(false);
var previousFields = {}; //important to define here

var saveFields = function () {
  return $(".dyn-field").each(function (index, element) {
    if (element.classList.contains("dyn-date")) {
      previousFields[element.name] = new Date(element.value);
    }
    else {
      previousFields[element.name] = element.value;
    }
    return false;
  });
};

Template.docEdit.events({
  "submit form#docEdit": function (e) {
    var categoryId;
    var fields = {}; //need to be defined here
    var usefulForRoles = [];
    var doCheckIfFilelinkExists = false;
    var clientPath; //need to be defined here
    var fieldName; //need to be defined here
    var properties;
    e.preventDefault();
    $(".dyn-field").each(function (index, element) {
      if ($(this).data("fieldtype") === "filelink"){
        RKCore.log("I have found a filelink in your fields.");
        RKCore.log("Lets check if the file exist");
        doCheckIfFilelinkExists = true;
        clientPath = element.value;
        fieldName = element.name;
      }

      if (element.classList.contains("dyn-date")) {
        return fields[element.name] = new Date(element.value);
      } else {
        return fields[element.name] = element.value;
      }
    });

    categoryId = $("#selectedCategory").val();

    $('#usefulForRolesCheckboxes input:checked').each(function () {
      usefulForRoles.push($(this).attr('name'));
    });

    RKCore.log("usefulForRoles : ");
    RKCore.log(usefulForRoles);

    properties = {
      name: $(e.target).find("[name=name]").val(),
      docId: this._id,
      categoryId: categoryId,
      searchScore: $("#searchScore").val(),
      fields: fields,
      usefulForRoles: usefulForRoles,
    };
    ismodal = this.ismodal;

    Meteor.call("docUpdate", properties, function (error, id) {
      if (!error) {
        if (doCheckIfFilelinkExists) {
          //if we do so, we don't need to wait for the cron to check all the files
          RKCore.log("I will check if the file link is correct");
          RKCore.log(clientPath);
          RKCore.log(fieldName);
          Meteor.call("walkThruOneFilelink", id, clientPath, fieldName, function () {});
        }
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Document saved"));
        }
      }
    });

    Router.go("browse",{categorySlug : Categories.findOne({_id: categoryId}).slug});
    return false;
  },
  "click .updateDocInMySpace": function (e) {
    e.preventDefault();
    Meteor.call('updateDocInMySpace', this._id);
    return false;
  },
  'dropped #dropzone': function (e) {
    var docId;
    e.preventDefault();
    RKCore.log("this : ");
    RKCore.log(this);
    params = Router.current().params;
    RKCore.log("params : ");
    RKCore.log(params);
    docId = params._id;
    RKCore.log("Fichier deposé pour le docId : " + docId);
    FS.Utility.eachFile(e, function (file) {
      var newFile;
      RKCore.log("file :");
      RKCore.log(file);
      newFile = new FS.File(file);
      newFile.metadata = {
        document: "doc-" + docId,
        attachedToDocId: docId,
      };
      RKCore.log("newFile :");
      RKCore.log(newFile);
      Attachments.insert(newFile, function (err, fileObj) {
        RKCore.log("err :");
        RKCore.log(err);
        RKCore.log("fileObj :");
        RKCore.log(fileObj);
      });
      return true;
    });
    return true;
  },
  "click #deleteDoc": function (e) {
    e.preventDefault();
    bootbox.confirm(TAPi18n.__("Are you sure you want to delete this doc ?"), function (result) {
		 if (result) {
       Meteor.call("docDelete", this._id, function (error) {
         if (!error) {
           Router.go("browse");
           return false;
         }
       });
       return false;
		 }
		});
    return false;
  },
  'change #selectedCategory': function (e) {
    e.preventDefault();
    saveFields();
    return selectedCategory.set($('#selectedCategory').val());
  },
});

Template.docEdit.rendered = function () {
  // delete here so that when I come back to the search page, it loads faster
  Session.set('searchQuery', undefined);
  delete Session.keys.searchQuery;
  Session.set('searchQuerySentToServer', undefined);
  delete Session.keys.searchQuery;

  selectedCategory.set("");
  RKCore.log(Session.get("currentFilelink"));
  previousFields = {};
  return previousFields;
};

Template.docEdit.helpers({
  iAmAllowedToBrowseThisDoc: function () {
    var user = Meteor.user();
    if (Router.current().route.getName() === "docEdit" ){
      catId = Docs.findOne({_id: this._id}).categoryId;
      RKCore.log("current catId :");
      RKCore.log(catId);
      Meteor.call("categoriesThatUserIsAllowedToBrowseMethod", user._id, function (error, result) {
    		if (!error) {
    			RKCore.log("thomas :");
    			RKCore.log(result);
          if (result.indexOf(catId)>=0) {
            iAmAllowedToBrowseThisDocReactiveVar.set(true);
          }
          else {
            iAmAllowedToBrowseThisDocReactiveVar.set(false);
          }
        }
    	});
      if (iAmAllowedToBrowseThisDocReactiveVar.get()){
        return true;
      }
      return false;
    }
    return true;
  },
  onDocEditPage: function () {
    return ((Router.current().route.getName() === "docEdit" ) ? true : false);
  },
  usefulForRolesCheckbox: function () {
    if (typeof(rkSettings.findOne({key: "Roles"})) !== 'undefined') {
      var Roles = rkSettings.findOne({key: "Roles"}).value;
      var arrayLength = Roles.length;
      var i;
      for (i = 0; i < arrayLength; i++) {
        if (typeof(this.usefulForRoles) === 'undefined') {
          Roles[i].thisDocumentisUsefulForThisRole = false;
        }
        else {
          if (this.usefulForRoles.indexOf(Roles[i].slug) >= 0) {
            Roles[i].thisDocumentisUsefulForThisRole = true;
          }
          else {
            Roles[i].thisDocumentisUsefulForThisRole = false;
          }
        }
      }
      RKCore.log("Roles for this document : ");
      RKCore.log(Roles);
      return Roles;
    }
    return false;
  },
  tags: function () {
    return PredefinedTags.find();
  },
  docNotInMyFavorites: function () {
    if (userSpaceHasDoc(Meteor.userId(), this._id)) {
      return false;
    } else {
      return true;
    }
  },
  userSpaceLinkTitle: function () {
    if (userSpaceHasDoc(Meteor.userId(), this._id)) {
      return 'Remove doc from my space';
    }
    return 'Add doc to my space';
  },
  userSpaceIcon: function () {
    if (userSpaceHasDoc(Meteor.userId(), this._id)) {
      return 'glyphicon-star';
    }
    return 'glyphicon-star-empty';
  },
  fieldIs: function (field) {
    return this.type === field;
  },
  attachments: function () {
    return Attachments.find();
  },
  revisionsUrl: function () {
    var url;
    url = Router.routes.revisions.path({
      docId: this._id,
    });
    return url;
  },
  categories: function () {
    //the categories allowed have been filtered on the router
    return Categories.find();
  },
  isCategorySelected: function (categoryId) {
    return this._id === categoryId;
  },
  someCategorySelected: function () {
    return selectedCategory.get() || this.categoryId;
  },
  displayUpload: function () {
    return Meteor.settings.public.show.upload;
  },
  displaySearchScore: function () {
    return Meteor.settings.public.show.searchScore;
  },
  searchScore: function () {
    return this.searchScore;
  },
  dataForKey: function () {
    var data;
    var ref;
    var ref1;
    var ref2;
    var value = (ref = Template.parentData(1)) != null ? (ref1 = ref.fields) != null ? (ref2 = ref1[this.key]) != null ? ref2.value : void 0 : void 0 : void 0;
    if (!value) {
      value = previousFields[this.key];
    }
    if (!value) {
      value = Meteor.FieldType.getDefaultValue(this.key, this.type);
    }
    data = {
      key: this.key,
      value: {
        value: value,
        type: this.type,
        mandatory: this.mandatory,
        multipleChoices: this.multipleChoices,
      }
    };
    return data;
  },
  viewFields: function () {
    var ref;
    var fields;
    var view;
    var keys;
    var categoryId = selectedCategory.get() || this.categoryId;
    var viewId = (ref = Categories.findOne({
      _id: categoryId,
    })) != null ? ref.viewId : void 0;
    if (viewId) {
      keys = Views.getFieldInOrder(viewId);
      view = Views.findOne({
        _id: viewId,
      });
      fields = view.fields;
      return keys.map(function (key) {
        return {
          key: key,
          _id: key,
          type: fields[key].type,
          mandatory: fields[key].mandatory,
          multipleChoices: fields[key].multipleChoices,
        };
      });
    }
  },
});
