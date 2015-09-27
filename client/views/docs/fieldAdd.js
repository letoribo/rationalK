Template.fieldAdd.events({
  "submit form#addField": function (e) {
    var att = {
      newField: $("input[name=newField]").val(),
      newFieldType: $("select#newFieldType").val(),
      mandatory: $("#fieldAdd_mandatory").prop("checked"),
      unique: $("#fieldAdd_unique").prop("checked"),
      viewId: this._id, //do not add here multiple choices, only on edit
    };
    e.preventDefault();
    Meteor.call("viewAddField", att, function (error) {
      if (error) {
        RKCore.log(error);
        if (error.error === "422") {
          document.getElementById("newField").focus();
        }
      }
      else {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__("The field has been added, you can see it at the bottom of the page"));
        }
        //scroll the page to the fields
      }
    });
    return false;
  },
});

Template.fieldAdd.helpers({
  types: function () {
    var allFieldsType = getAllFieldsType();
    return allFieldsType;
  },
});
