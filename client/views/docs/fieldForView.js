(function(){Template.fieldForView.events({
  "click .deleteField": function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this field ?")) {
      Meteor.call("viewRemoveField", Template.parentData(1)._id, this.key, function () {});
      return false;
    }
    return false;
  },
  "change select.newFieldTypeClass": function (e) {
    e.preventDefault();
    RKCore.log(e.target.value);
    RKCore.log(e.target.dataset.key);
    if (e.target.value === 'select') {
      document.getElementById("divMultipleChoice_" + e.target.dataset.key).style.display = 'block';
    }
    else {
      document.getElementById("divMultipleChoice_" + e.target.dataset.key).style.display = 'none';
    }
  },
  "click .editField": function (e) {
    var instance;
    var data = {};
    e.preventDefault();
    instance = Template.instance();
    if (!instance.readonly) {
      data.viewId = Template.parentData(1)._id;
      data.field = this.key;
      data.newField = instance.find('input#newField').value;
      data.newFieldType = instance.find('select.form-control').value;
      data.mandatory = instance.find('input#fieldAdd_mandatory').checked;
      data.unique = instance.find('input#fieldAdd_unique').checked;
      data.hideInTable = instance.find('input#fieldAdd_hideInTable').checked;
      data.hideInSearchResultsDisplay = instance.find('input#fieldAdd_hideInSearchResultsDisplay').checked;
      data.multipleChoices = instance.find('input.inputForMultipleChoices').value;
      data.customFilterInTableView = instance.find('input#fieldAdd_customFilterInTableView').checked;
      data.cellClass = instance.find('input#cellClass').value;

      RKCore.log("data :");
      RKCore.log(data);

      Meteor.call('viewUpdateField', data, function (error) {
        if (!error) {
          if (typeof(toastr) !== 'undefined') {
      			toastr.success('Field updated');
      		}
          return false;
        }
      });
    }
    instance.readonly = !instance.readonly;
    RKCore.log("instance.readonly :");
    RKCore.log(instance.readonly);
    $(instance.find('input#newField')).attr('readonly', true); //alwas let this field read only (changing the name does not work : todo)
    $(instance.find('select.form-control')).attr('readonly', instance.readonly);
    $(instance.find('input.inputForMultipleChoices')).attr('readonly', instance.readonly);
    $(instance.find('input#fieldAdd_mandatory')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_unique')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_hideInSearchResultsDisplay')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_customFilterInTableView')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_hideInTable')).attr('disabled', instance.readonly);
    $(instance.find('input#cellClass')).attr('readonly', instance.readonly);
    return false;
  },
});

Template.fieldForView.created = function () {
  this.readonly = true;
  return true;
};

Template.fieldForView.rendered = function () {
  var divId;
  var type;
  $( ".divMultipleChoice" ).each(function () {
    divId = $(this).attr('id');
    key = $(this).data('key');
    type = $(this).data('type');
    if (type === 'select') {
      document.getElementById(divId).style.display = 'block';
    }
    else {
      document.getElementById(divId).style.display = 'none';
    }
  });
};

Template.fieldForView.helpers({
  fieldTypes: function () {
		var allFieldsType = getAllFieldsType();
    return allFieldsType;
  },
  isSelected: function () {
    parentThis = Template.parentData(1);
    if (parentThis.value.type === this.value) {
      return "selected";
    }
    return "";
  },
  checkIfMandatory: function () {
    if (this.value.mandatory) {
      return "checked";
    }
    return "";
  },
  checkIfUnique: function () {
    if (this.value.unique) {
      return "checked";
    }
    return "";
  },
  checkIfHideInTable: function () {
    if (this.value.hideInTable) {
      return "checked";
    }
    return "";
  },
  checkIfHideInSearchResultsDisplay: function () {
    if (this.value.hideInSearchResultsDisplay) {
      return "checked";
    }
    return "";
  },
  checkIfCustomFilterInTableView: function () {
    if (this.value.customFilterInTableView) {
      return "checked";
    }
    return "";
  },
});

})();
