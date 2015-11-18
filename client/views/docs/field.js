// Field is expecting the following data:
//   key: name of the field
//   value.value: value of the field
//   value.type: type of the field
//

var memberAutocomplete,
  indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

var htmlEncode = function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

Template.field.helpers({
  onDocCreationPage: function () {
    //console.log(Router.current().route.getName())
    return ((Router.current().route.getName() === "docCreate" ) ? true : false);
  },
  inputForFieldType: function () {
    var dateValue;
    var encodedValue;
    var memberValue;
    var ref1;
    var spans;
    var textValue;
    var optionsArray;
    var arrayLength;
    var optionsText;
    var i;
    var currentOption;
    var selected;
    var currentFilelink;
    var html;
    //RKCore.log(this.value);
    //RKCore.log(RKCore.customFieldsType);
    var elementPos = RKCore.customFieldsType.map(function (x) {return x.value; }).indexOf(this.value.type);
    if (elementPos >= 0) {
      encodedValue = htmlEncode(this.value.value);
      return "<div class='input-group'><input class='form-control dyn-field' name='" + this.key + "' value='" + encodedValue + "' type='text' aria-describedby='basic-addon2'/> <span class='input-group-addon' id='basic-addon2'><a href='#' class='launchCustomFunction' id='" + this.value.type + "' data-customfunction='" + this.value.type + "'>" + this.value.type + "</a></span></div>";
    }
    else if (this.value.type === "textarea") {
      textValue = htmlEncode(this.value.value);
      return "<textarea class='form-control dyn-field' name='" + this.key + "' placeholder='" + this.key + "'>" + textValue + "</textarea>";
    }
    else if (this.value.type === "text") {
      encodedValue = this.value.value.replace(/'/g, '&#39;');
      return "<input class='form-control dyn-field' name='" + this.key + "' value='" + encodedValue + "' type='" + this.value.type + "' placeholder='" + this.key + "'/>";
    }
    else if (this.value.type === "select") {
      RKCore.log("this.value = ");
      RKCore.log(this.value);
      optionsArray = this.value.multipleChoices.split(",");
      arrayLength = optionsArray.length;
      optionsText = '<option value=""></option>';
      for (i = 0; i < arrayLength; i++) {
        currentOption = optionsArray[i].trim();
        RKCore.log("this.value.value (the doc value)= ");
        RKCore.log(this.value.value.trim());
        RKCore.log("currentOption");
        RKCore.log(currentOption);
        if (this.value.value.trim() === currentOption) {
          selected = "selected";
          RKCore.log("I will select it");
        }
        else {
          selected = "";
        }
        optionsText = optionsText + '<option value="' + currentOption + '" ' + selected + '>' + currentOption + '</option>';
      }
      return "<select name='" + this.key + "' class='form-control dyn-field'>" + optionsText + "</select>";
    }
    else if (this.value.type === "url") {
      encodedValue = this.value.value.replace(/'/g, '&#39;');
      return "<input class='form-control dyn-field' name='" + this.key + "' value='" + encodedValue + "' type='" + this.value.type + "' placeholder='http://mysite.com/mypage.html'/>";
    }
    else if (this.value.type === "email") {
      encodedValue = this.value.value.replace(/'/g, '&#39;');
      return "<input class='form-control dyn-field' name='" + this.key + "' value='" + encodedValue + "' type='email' placeholder='email@email.com'/>";
    }
    else if (this.value.type === "filelink") {
      if (Router.current().route.getName() === "docCreate" ) {
        //let's check if we arrive with something in the session
        currentFilelink = Session.get("currentFilelink");
        if (typeof(currentFilelink) !== 'undefined') {
          encodedValue = currentFilelink.replace(/'/g, '&#39;');
          if (typeof(toastr) !== 'undefined') {
            toastr.success(TAPi18n.__('Filelink successfully inserted. Check the document category.'));
          }
        }
        else {
          encodedValue = "";
        }
      }
      else {
        encodedValue = this.value.value.replace(/'/g, '&#39;');
        encodedValue = stripBeginEndQuotes(encodedValue);
        RKCore.log("encodedValue : " + encodedValue);
      }
      html = '';
      if (encodedValue.length > 0) {
        html = html.concat('<div class="input-group">');
      }
      html = html.concat("<input class='form-control dyn-field' name='" + this.key + "' value='" + encodedValue + "' type='text' placeholder='//server/folder/file.ext' data-fieldtype='filelink'/>");
      if (encodedValue.length > 0) {
        html = html.concat('<div class="input-group-addon"><a href="rk:' + encodedValue + '" title="' + TAPi18n.__('open_file') + '" target="_blank"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></a></div>');
      }
      if (encodedValue.length > 0) {
        html = html.concat('</div>');
      }
      return html;
    }
    else if (this.value.type === "tags") {
			if (Router.current().route.getName() !== "revisionView") {
      	spans = PredefinedTags.find().fetch().map(function (tag) {
        	return "<span id='11' class='label label-default proposedTag' data-tag='" + tag.label + "'><a href='#' style='text-decorations:none; color:inherit;text-decoration:none;'>" + tag.label + "</a></span>";
      	});
				return "<input class='form-control dyn-field' id='tagfield' placeholder='Type a word and press enter or comma' name='" + this.key + "' value='" + this.value.value + "' type='text' />\n<br/>\n" + (spans.toString());
			}
			return "<input class='form-control dyn-field' id='tagfield' name='" + this.key + "' value='" + this.value.value + "' type='text' />";
    }
    else if (this.value.type === "date") {
      dateValue = moment(this.value.value).format('YYYY.MM.DD HH:mm');
      return "<input class='form-control dyn-field dyn-date' name='" + this.key + "' value='" + dateValue + "' type='text' placeholder='" + this.key + "'/>";
    }
    else if (this.value.type === "member") {
      memberValue = ((ref1 = Members.collection.findOne({
        _id: this.value.value,
      })) !== null ? ref1.profile.name : void 0) || '';
      return "<input class='form-control dyn-field dyn-member' name='" + this.key + "' value='" + this.value.value + "' type='hidden' placeholder='" + this.key + "'/>\n<input class='form-control dyn-member-visible' name='" + this.key + "' value='" + memberValue + "' type='text' placeholder='" + this.key + "'/>";
    }
    return this.value.value;
  },
  is_mandatory: function () {
    if (this.value.mandatory) {
      return "*";
    }
    return "";
  },
});

Template.field.events({
  "click .deleteField": function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this field ?")) {
      Meteor.call("viewRemoveField", Template.parentData(1)._id, this.key, function () { });
      return false;
    }
    return false;
  },
  "click a.launchCustomFunction": function (e){
	  e.preventDefault();
	  RKCore.log("Launching the custom function : " + e.currentTarget.dataset.customfunction);
	  Meteor.call(e.currentTarget.dataset.customfunction, function () {});
		return false;
	},
});
