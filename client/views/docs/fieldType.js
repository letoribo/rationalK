var stripBeginEndQuotes = function (s) {
	var t=s.length;
	if (s.charAt(0)=='"') s=s.substring(1,t--);
	if (s.charAt(--t)=='"') s=s.substring(0,t);
	return s;
};


var memberAutocomplete,
  indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getAllFieldsType = function () {

	var standardFieldsType = [
  { value: "text", text: TAPi18n.__("Text") },
	{ value: "textarea", text: TAPi18n.__("Textarea") },
	{ value: "select", text: TAPi18n.__("Multiple choices") },
	{ value: "date", text: "Date" },
	{ value: "member", text: TAPi18n.__("Member") },
	{ value: "tags", text: TAPi18n.__("Tags") },
	{ value: "url", text: TAPi18n.__("Url") },
	{ value: "filelink", text: TAPi18n.__("Filelink") },
	{ value: "email", text: "Email"},
	];

	if (typeof(RKCore.customFieldsType) !== 'undefined') {
		RKCore.log("RKCore.customFieldsType : ");
		RKCore.log(RKCore.customFieldsType);
		customFieldsType = RKCore.customFieldsType;
	}

	allFieldsType = standardFieldsType.concat(customFieldsType);
	return allFieldsType;
};

Meteor.FieldType = {
  transformValue: function (type, value) {
    var filelink;
		var htmlTags;
		var i;
		var ref;
		var res;
		var tags;
		var filelink;
		var urlEncodedFilelink;
    if (value && (value != null)) {
      if (type === "member") {
        return (ref = Members.collection.findOne({
          _id: value
        })) != null ? ref.profile.name : void 0;
      }
			else if (type === "date") {
        return moment(value).format('DD.MM.YYYY HH:mm');
      }
			else if (type === 'tags') {
        value = value.replace(/;/g, ',');
        tags = value.split(',');
        htmlTags = tags.map(function (tag) {
          return "<span class='label label-info searchThisWord'>" + tag + "</span>";
        });
        return new Spacebars.SafeString(htmlTags.join(' '));
      }
			else if (type === 'select') {
        return new Spacebars.SafeString(value);
      }
			else if (type === 'url') {
        return new Spacebars.SafeString("<a href='" + value + "' title='Open in a new tab' target='_blank'>" + value + "</a>");
      }
			else if (type === 'email') {
        return new Spacebars.SafeString("<a href='mailto:" + value + "' title='Send Email' target='_blank'>" + value + "</a>");
      }
			else if (type === 'filelink') {
				filelink = stripBeginEndQuotes(value);
				filelink = clientFilename(filelink);
				urlEncodedFilelink = encodeURIComponent(filelink);
        //return new Spacebars.SafeString('<a href="rk:' + filelink + '" title="Open file" target="_blank">' + filelink + '</a>');
				return new Spacebars.SafeString('<a href="rk:' + filelink + '" title="Open file" target="_blank"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></a>');
      }
			return value;
    }
		return '-';
  },
  getDefaultValue: function (key, type) {
    if (type === "member") {
      return '';
    } else if (type === "date") {
      return new Date();
    } else {
      return '';
    }
  }
};


memberAutocomplete = function (request, response) {
  var term;
	if (Meteor.settings.public.debug){
	  console.log("memberAutocomplete");
	}
  term = request.term;
  return Meteor.call("memberAutocomplete", term, function (error, results) {
    return response(results);
  });
};

Template.field.rendered = function () {
  var el, memberId;
  if (this.data.value.type === "member") {
		if (Meteor.settings.public.debug){
	    console.log(this.data);
		}
    el = $(this.find(".dyn-member-visible"));
    memberId = $(this.find(".dyn-member"));
		if (Meteor.settings.public.debug){
	    console.log(el);
	    console.log(memberId);
		}
    el.autocomplete({
      source: memberAutocomplete,
      focus: function (event, ui) {
				if (Meteor.settings.public.debug){
        	console.log("focus");
				}
        el.val(ui.item.value);
        return false;
      },
      select: function (event, ui) {
				if (Meteor.settings.public.debug){
        	console.log("select");
				}
        el.val(ui.item.value);
        memberId.val(ui.item.memberId);
        return false;
      }
    }).autocomplete("instance")._renderItem = function (ul, item) {
			if (Meteor.settings.public.debug){
      	console.log("instance");
			}
      $(".ui-autocomplete").zIndex(9999);
      return $("<li>").append("<a>" + item.value + "</a>").appendTo(ul);
    };
  }
  if (this.data.value.type === "date") {
    $(".dyn-date").datetimepicker({
      format: 'Y.m.d H:i',
      step: 30
    });
  }
  if (this.data.value.type === "tags") {
		if (Meteor.settings.public.debug){
			console.log("I found a tag field to render.")
		}
		if (typeof($('#tagfield').val()) !== 'undefined') {
    	$('#tagfield').val($('#tagfield').val().replace(/;/g, ','));
		}
		$('#tagfield').tagsinput({
  		confirmKeys: [13, 44, 59] //ENTER, comma and semi-colon
		});
    return $(".proposedTag").click(function () {
      var tag;
      tag = $(this).data("tag");
			if (Meteor.settings.public.debug){
      	console.log(tag);
			}
      return $('#tagfield').tagsinput('add', tag);
    });


  }
};
