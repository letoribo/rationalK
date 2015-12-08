var iAmAllowedToBrowseThisDocReactiveVar = new ReactiveVar(false);

Template.revisions.helpers({
  iAmAllowedToBrowseThisDoc: function () {
    var user = Meteor.user();
    catId = Revisions.findOne({}).categoryId;
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
  },
  revisions: function () {
    return Revisions.find();
  },
  tableSettings: function () {
    var categoryId, columns, keys, view, viewId;
    categoryId = Revisions.findOne().categoryId;
    viewId = Categories.findOne({
      _id: categoryId
    }).viewId;
    keys = Views.getFieldInOrder(viewId);
    view = Views.findOne({
      _id: viewId
    });
    columns = [];
    columns.push({
      key: "revisionNumber",
      label: "Rev.",
      fn: function (value, object) {
        if (value >= 1) {
          return value;
        } else {
          return 0;
        }
      }
    });
    columns.push({
      key: "revisionNumber",
      label: "View",
      fn: function (value, object) {
        var url;
        url = Router.routes.revisionView.path({
          _id: object._id
        });
        return new Spacebars.SafeString("<a href='" + url + "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></a>");
      }
    });
    columns.push({
      key: "who",
      label: "Who",
      fn: function (value, object) {
        return value;
      }
    });
    keys.forEach(function (key) {
      return columns.push({
        key: "fields." + key + ".value",
        label: key,
        fn: function (value, object) {
          return Meteor.FieldType.transformValue(view.fields[key].type, value);
        }
      });
    });
    return {
      fields: columns,
      showColumnToggles: true
    };
  }
});
