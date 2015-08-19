var progress, results;

results = new ReactiveVar();

progress = new ReactiveVar('');

Template.docImport.events({
  "click #preview": function (el) {
    el.preventDefault();
    console.log("clicked");
    var categoryId, delimiter, limitPreview, temp;
    categoryId = $("#selectedCategory").val();
    console.log(categoryId);
    delimiter = $("input[name=delimiter]:checked").val();
    console.log(delimiter);
    if (!categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please select a category");
      }
      throw new Meteor.Error(401, "Please select a category");
    }
    limitPreview = 0;
    if ($('input[name=limitPreview]').prop('checked')) {
      limitPreview = 10;
    }
    temp = Papa.parse($("#csv").val(), {
      header: true,
      preview: limitPreview,
      delimiter: delimiter
    });
    results.set(temp.data);
    progress.set("Showing preview for " + temp.data.length + " rows");
    return false;
  },
  "click #import": function (el) {
    var categoryId, count, delimiter, i, len, rd, row, shareDialogInfo, temp;
    $('#import').prop('disabled', true);
    categoryId = $("#selectedCategory").val();
    delimiter = $("input[name=delimiter]:checked").val();
    if (!categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please select a category");
      }
      throw new Meteor.Error(401, "Please select a category");
    }
    shareDialogInfo = {
      template: Template.spinner,
      title: "Wait",
      modalDialogClass: "wait-dialog",
      modalBodyClass: "share-modal-body",
      modalFooterClass: "share-modal-footer",
      removeOnHide: true,
      buttons: {}
    };
    rd = ReactiveModal.initDialog(shareDialogInfo);
    rd.show();
    progress.set('Please wait...');
    Session.set('selectedCategory', categoryId);
    temp = Papa.parse($("#csv").val(), {
      header: true,
      delimiter: delimiter
    }).data;
    count = 0;
    if ((temp != null ? temp.length : void 0) > 0) {
      for (i = 0, len = temp.length; i < len; i++) {
        row = temp[i];
        if (count === 0) {
          count++;
          if (Meteor.settings.public.debug){
            console.log(row)
          }
          if ($('input[name=autocreatefields]').prop('checked')) {
            Meteor.call('docImport-autoCreateFields', categoryId, row, function (error, id) {
              if (error) {
                if (typeof(toastr) !== 'undefined') {
                  toastr.error(error.reason);
                }
                throw new Meteor.Error(401, error.reason);
              }
              if (count >= temp.length + 1) {
                rd.hide();
                return Router.go("browse");
              }
            });
          }
        }
        Meteor.call("docImport", categoryId, row, function (error, id) {
          count++;
          var currentRowCount = count -1; //because header is inside
          console.log("Importation " + currentRowCount + "/" + temp.length);
          progress.set("Importation " + currentRowCount + "/" + temp.length);
          if (error) {
            if (typeof(toastr) !== 'undefined') {
              toastr.error(error.reason);
            }
            throw new Meteor.Error(401, error.reason);
          }
          if (count >= temp.length + 1) {
            rd.hide();
            return Router.go("browse");
          }
        });
      }
    } else {
      rd.hide();
      progress.set('');
    }
    return false;
  },
  "click #cancel": function (el) {
    el.preventDefault();
    return results.set({});
  }
});

Template.docImport.helpers({
  data: function () {
    return results.get();
  },
  selectedCategory: function () {
    return Session.get("selectedCategory");
  },
  progress: function () {
    return progress.get();
  },
  hasPreview: function () {
    return results.get();
  },
  headers: function () {
    var res;
    res = results.get();
    if (res && res[0]) {
      return Object.keys(res[0]);
    }
  },
  categories: function () {
    return Categories.find();
  },
  keys: function () {
    var key, res, value;
    res = [];
    for (key in this) {
      value = this[key];
      res.push({
        key: key,
        value: value
      });
    }
    return res;
  }
});

Template.docImport.rendered = function () {
  return $("#selectedCategory").val(Session.get("selectedCategory"));
};
