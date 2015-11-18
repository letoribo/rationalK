(function(){var progress;
var results;

results = new ReactiveVar();

progress = new ReactiveVar('');

Template.docExport.events({
  "click #export": function (el) {
    var categoryId;
    var config;
    var csv;
    var data;
    var delimiter;
    var hasQuotes;
    var rd;
    var shareDialogInfo;
    el.preventDefault();
    $('#import').prop('disabled', true);
    $("#csv").val('');
    categoryId = $("#selectedCategory").val();
    delimiter = $("input[name=delimiter]:checked").val();
    hasQuotes = $('input[name=quotes]').prop('checked');
    if (!categoryId) {
      if (typeof(toastr) !== 'undefined') {
        toastr.error("Please fill in with the category");
      }
      throw new Meteor.Error(422, "Please fill in with the category");
    }
    shareDialogInfo = {
      template: Template.spinner,
      title: "Wait",
      modalDialogClass: "wait-dialog",
      modalBodyClass: "share-modal-body",
      modalFooterClass: "share-modal-footer",
      removeOnHide: true,
      buttons: {},
    };
    rd = ReactiveModal.initDialog(shareDialogInfo);
    rd.show();
    progress.set('Please wait...');
    Session.set('selectedCategory', categoryId);
    data = Docs.find({
      categoryId: categoryId,
    }).fetch().map(function (elem) {
      var key;
      var obj;
      obj = {};
      for (key in elem.fields) {
        if ({}.hasOwnProperty.call(elem.fields, key)) {
          obj[key] = elem.fields[key].value;
        }
      }
      return obj;
    });
    config = {
      delimiter: delimiter,
      quotes: hasQuotes,
    };
    csv = Papa.unparse(data, config);
    $('#csv').val(csv);
    count = 0;
    rd.hide();
    progress.set('');
    return false;
  },
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

})();
