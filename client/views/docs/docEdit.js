var selectedCategory = new ReactiveVar('');

var previousFields = {}; //important to define here

var saveFields = function () {
  return $(".dyn-field").each(function (index, element) {
    if (element.classList.contains("dyn-date")) {
      return previousFields[element.name] = new Date(element.value);
    } else {
      return previousFields[element.name] = element.value;
    }
  });
};

Template.docEdit.events({
  "submit form#docEdit": function (e) {
    e.preventDefault();
    var ismodal;
    var fields = {}; //need to be defined here
    var docId = this._id;
    var doCheckIfFilelinkExists = false;
    var clientPath; //need to be defined here
    var fieldName; //need to be defined here
    $(".dyn-field").each(function (index, element) {
      if ($(this).data("fieldtype")==="filelink"){
        //console.log($(this).data("fieldtype"));
        if (Meteor.settings.public.debug){
            console.log("I have found a filelink in your fields.")
            console.log("Lets check if the file exist")
        }
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

    var categoryId = $("#selectedCategory").val();

    var usefulForRoles = [];
    $('#usefulForRolesCheckboxes input:checked').each(function () {
      usefulForRoles.push($(this).attr('name'));
    });

    if (Meteor.settings.public.debug){
        console.log("usefulForRoles : ")
        console.log(usefulForRoles)
    }



    var properties = {
      name : $(e.target).find("[name=name]").val(),
      docId : this._id,
      categoryId : categoryId,
      searchScore : $("#searchScore").val(),
      fields : fields,
      usefulForRoles : usefulForRoles
    };
    ismodal = this.ismodal;


    Meteor.call("docUpdate", properties, function (error, id) {
      if (error) {
        // do nothing (an error message should appears)
      } else {
        //
        if (doCheckIfFilelinkExists){
          //if we do so, we don't need to wait for the cron to check all the files
          if (Meteor.settings.public.debug){
              console.log("I will check if the file link is correct");
              console.log(clientPath);
              console.log(fieldName);
          }
          Meteor.call("walkThruOneFilelink",id,clientPath,fieldName, function (error, id){});
        }
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("Document saved"));
        }

      }
    });

    Router.go("browse",{categorySlug : Categories.findOne({_id : categoryId}).slug});
    return false;
  },
  "click .updateDocInMySpace": function (e) {
    e.preventDefault();
    Meteor.call('updateDocInMySpace', this._id);
    return false;
  },
  'dropped #dropzone': function (event, temp) {
    var docId = this._id;
    return FS.Utility.eachFile(event, function (file) {
      var newFile;
      newFile = new FS.File(file);
      newFile.metadata = {
        document: "doc-" + docId
      };
      return Attachments.insert(newFile, function (err, fileObj) {
        if (err) {
          return console.log(err);
        } else {
          return console.log(file);
        }
      });
    });
  },
  "click #deleteDoc": function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this doc ?")) {
      Meteor.call("docDelete", this._id, function (error, id) {
        if (error) {
          // do nothing (a popup should appear)
        } else {
          return Router.go("browse");
        }
      });
      return;
    }
    return false;
  },
  'change #selectedCategory': function (e, t) {
    saveFields();
    return selectedCategory.set($('#selectedCategory').val());
  }
});

Template.docEdit.rendered = function () {

  // delete here so that when I come back to the search page, it loads faster
  Session.set('searchQuery',undefined);
  delete Session.keys.searchQuery
  Session.set('searchQuerySentToServer',undefined);
  delete Session.keys.searchQuery

  selectedCategory.set("");
  return previousFields = {};
  if (Meteor.settings.public.debug){console.log(Session.get("currentFilelink"));}
};

Template.docEdit.helpers({
  onDocEditPage: function () {
    //console.log(Router.current().route.getName())
    return ((Router.current().route.getName() === "docEdit" ) ? true : false);
  },
  usefulForRolesCheckbox : function (){
    var Roles = rkSettings.findOne({key: "Roles"}).value
    var arrayLength = Roles.length;
    for (var i = 0; i < arrayLength; i++) {
      if (typeof(this.usefulForRoles) === 'undefined') {
        Roles[i].thisDocumentisUsefulForThisRole = false;
      }
      else {
        if (this.usefulForRoles.indexOf(Roles[i].slug)>=0){
          Roles[i].thisDocumentisUsefulForThisRole = true;
        }
        else {
          Roles[i].thisDocumentisUsefulForThisRole = false;
        }
      }
    }
    if (Meteor.settings.public.debug){
      console.log("Roles for this document : ");
      console.log(Roles)
    }
    return Roles;
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
    } else {
      return 'Add doc to my space';
    }
  },
  userSpaceIcon: function () {
    if (userSpaceHasDoc(Meteor.userId(), this._id)) {
      return 'glyphicon-star';
    } else {
      return 'glyphicon-star-empty';
    }
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
      docId: this._id
    });
    return url;
  },
  categories: function () {
    return Categories.find();
  },
  isCategorySelected: function (categoryId) {
    return this._id === categoryId;
  },
  someCategorySelected: function () {
    return selectedCategory.get() || this.categoryId;
  },
  displayUpload: function () {
    return Meteor.settings["public"].display_upload;
  },
  displaySearchScore: function () {
    return Meteor.settings["public"].display_search_score;
  },
  searchScore: function () {
    return this.searchScore;
  },
  dataForKey: function () {
    var data, ref, ref1, ref2;
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
        multipleChoices : this.multipleChoices
      }
    };
    return data;
  },
  viewFields: function () {
    var ref;
    var categoryId = selectedCategory.get() || this.categoryId;
    var viewId = (ref = Categories.findOne({
      _id: categoryId
    })) != null ? ref.viewId : void 0;
    if (viewId) {
      var keys = Views.getFieldInOrder(viewId);
      var view = Views.findOne({
        _id: viewId
      });
      var fields = view.fields;
      return keys.map(function (key) {
        return {
          key: key,
          _id: key,
          type: fields[key].type,
          mandatory: fields[key].mandatory,
          multipleChoices : fields[key].multipleChoices
        };
      });
    }
  }
});
