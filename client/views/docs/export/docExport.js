var progress, results;

results = new ReactiveVar();

progress = new ReactiveVar('');

Template.docExport.events({
  "click #export": function (el) {
    el.preventDefault();
    var categoryId, config, count, csv, data, delimiter, hasQuotes, rd, shareDialogInfo;
    $('#import').prop('disabled', true);
    $("#csv").val('');
    categoryId = $("#selectedCategory").val();
    delimiter = $("input[name=delimiter]:checked").val();
    hasQuotes = $('input[name=quotes]').prop('checked');
    if (!categoryId) {
      Errors.throwError("Please select a category");
      return false;
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
    data = Docs.find({
      categoryId: categoryId
    }).fetch().map(function (el) {
      var key, obj;
      obj = {};
      for (key in el.fields) {
        obj[key] = el.fields[key].value;
      }
      return obj;
    });
    config = {
      delimiter: delimiter,
      quotes: hasQuotes
    };
    csv = Papa.unparse(data, config);
    $('#csv').val(csv);
    count = 0;
    rd.hide();
    progress.set('');
    return false;
  }
});

Template.docExport.helpers({
  data: function () {
    return results.get();
  },
  progress: function () {
    return progress.get();
  },
  headers: function () {
    return Object.keys(results.get()[0]);
  },
  categories: function () {
    return Categories.find();
  }
});

Template.docExport.rendered = function () {
  return $("#selectedCategory").val(Session.get("selectedCategory"));
};
