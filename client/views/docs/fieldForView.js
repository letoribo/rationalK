Template.fieldForView.events({
  "click .deleteField": function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this field ?")) {
      Meteor.call("viewRemoveField", Template.parentData(1)._id, this.key, function (error, id) {
        if (error) {
          // do nothing (a popup should appear)
        }
      });
      return false;
    }
    return false;
  },
  "change select.newFieldTypeClass": function (e) {
    e.preventDefault();
    if (Meteor.settings.public.debug){
      console.log(e.target.value);
      console.log(e.target.dataset["key"]);
    }
    if (e.target.value==='select'){
      document.getElementById("divMultipleChoice_"+e.target.dataset["key"]).style.display = 'block';
    }else {
      document.getElementById("divMultipleChoice_"+e.target.dataset["key"]).style.display = 'none';
    }
  },
  "click .editField": function (e) {
    e.preventDefault();
    var instance, isChecked, isHideInSearchResultsDisplayChecked, isHideInTableChecked, isUniqueChecked, newKey, newType, multipleChoices;
    instance = Template.instance();
    if (!instance.readonly) {
      newKey = instance.find('input#newField').value;
      newType = instance.find('select.form-control').value;
      multipleChoices = instance.find('input.inputForMultipleChoices').value;
      isChecked = instance.find('input#fieldAdd_mandatory').checked;
      isUniqueChecked = instance.find('input#fieldAdd_unique').checked;
      isHideInSearchResultsDisplayChecked = instance.find('input#fieldAdd_hideInSearchResultsDisplay').checked;
      isHideInTableChecked = instance.find('input#fieldAdd_hideInTable').checked;
      Meteor.call('viewUpdateField', Template.parentData(1)._id, this.key, newKey, newType, isChecked, isUniqueChecked, isHideInTableChecked, isHideInSearchResultsDisplayChecked, multipleChoices, function (error, results) {
        if (error) {
          // do nothing (a popup should appear)
        } else {

          if (typeof(toastr) !== 'undefined') {
      			toastr.success('Field updated');
      		}

          return false;
        }
      });
    }
    instance.readonly = !instance.readonly;
    $(instance.find('input#newField')).attr('readonly', instance.readonly);
    $(instance.find('select.form-control')).attr('readonly', instance.readonly);
    $(instance.find('input.inputForMultipleChoices')).attr('readonly', instance.readonly);
    $(instance.find('input#fieldAdd_mandatory')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_unique')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_hideInSearchResultsDisplay')).attr('disabled', instance.readonly);
    $(instance.find('input#fieldAdd_hideInTable')).attr('disabled', instance.readonly);
    return false;
  }
});

Template.fieldForView.created = function () {
  return this.readonly = true;
};

Template.fieldForView.rendered = function () {
  $( ".divMultipleChoice" ).each(function ( i ) {
    if (Meteor.settings.public.debug){
      console.log(this);
    }
    var divId = $(this).attr('id');
    if (Meteor.settings.public.debug){
      console.log(divId);
    }
    var key = $(this).data('key');
    if (Meteor.settings.public.debug){
      console.log(key);
    }
    var type = $(this).data('type');
    if (Meteor.settings.public.debug){
      console.log(type);
    }

    if (type==='select'){
      document.getElementById(divId).style.display = 'block';
    }else {
      document.getElementById(divId).style.display = 'none';
    }

  });

  /*
  if (document.getElementById("newFieldType").value==='select'){
    document.getElementById("divMultipleChoice").style.display = 'block';
  }else {
    document.getElementById("divMultipleChoice").style.display = 'none';
  }
  return false;
  */
};

Template.fieldForView.helpers({
  fieldTypes: function () {
		var allFieldsType = getAllFieldsType();
    return allFieldsType;
  },
  isSelected: function () {
    //console.log(this.value);
    parentThis = Template.parentData(1);
    //console.log ("The parent is a type :");
    //console.log(parentThis.value.type)
    //console.log ("The current is a type :");
    //console.log(this.value);
    if (parentThis.value.type === this.value){
      //console.log ("I return selected");
      return "selected";
    }
    else {
      return "";
    }
  },
  checkIfMandatory: function () {
    if (this.value.mandatory){
      return "checked";
    }
    else {
      return "";
    }
  },
  checkIfUnique: function () {
    if (this.value.unique){
      return "checked";
    }
    else {
      return "";
    }
  },
  checkIfHideInTable: function () {
    if (this.value.hideInTable){
      return "checked";
    }
    else {
      return "";
    }
  },
  checkIfHideInSearchResultsDisplay: function () {
    if (this.value.hideInSearchResultsDisplay){
      return "checked";
    }
    else {
      return "";
    }
  }
});
