Meteor.methods({
	checkInternetConnection: function () {
		this.unblock();
		console.log("Checking Internet Connection...");
		result = Meteor.http.get("http://google.ch");
		if (result.statusCode==200){
			console.log('Internet connection alive');
			return true;
		}
		else {
			return false;
		}
	},
	whatIsLastVersion: function () {
		this.unblock();
		console.log("Checking last version...");
		result = Meteor.http.get("http://rationalk.ch/api/?action=whatIsLastVersion&key"+"="+Meteor.settings.rationalK_license_key);
		if (result.statusCode==200){
			content = JSON.parse(result.content);
			return content;
		}
		else {
			return false;
		}
	},
	dowloadFile :function () {
		this.unblock();
		console.log("Dowloading file...");
		result = Meteor.http.get("http://rationalk.ch");
		if (result.statusCode==200){
			console.log('Internet connection alive');
			return true;
		}
		else {
			return false;
		}
	},
	eventGetDate: function (id) {
    return Dates.findOne({
      _id: id
    }).startTime;
  },
  docClearAll: function (categoryId) {
    var user;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to delete this doc");
    }
    if (!categoryId) {
      throw new Meteor.Error(422, "Please select a category");
    }
    return Docs.remove({
      categoryId: categoryId
    });
  },
  docImport: function (categoryId, row) {
		check(categoryId,String)
		check(row, Match.Any )
    var doc, docId, full, key, obj, user, value;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to update a doc");
    }
    obj = {
      categoryId: categoryId,
      fields: {}
    };
    full = "";
    console.log(row);
    for (key in row) {
      value = row[key];
      key = key.replace(/\./g, ' ');
      obj.fields["" + key] = {};
      obj.fields["" + key].value = value;
      full = full.concat(value);
    }
    obj.full = full;
    obj.orgId = user.profile.orgId;
    if (full && Docs.find({
      full: obj.full
    }, {
      limit: 1
    }).count() === 0) {
      docId = Docs.insert(obj);
      console.log("Document " + docId + " inserted");
      return docId;
    } else {
      if (full) {
        doc = Docs.findOne({
          full: obj.full
        });
        console.log('Document already exists');
        console.log(obj);
        return doc._id;
      } else {
        console.log('Object is EMPTY, ignoring it (This is normal for the last element)');
        return false;
      }
    }
		// reindex the mongo (i dont know if this is useful...):

		if (typeof Docs.reIndex === 'function'){
			console.log("Rebuilding the mongo index after batch import.")
			Docs.reIndex();
		}

  },
  "docImport-autoCreateFields": function (categoryId, row) {
		check(categoryId,String)
		check(row, Match.Any )
    var key, value;
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to call this method");
    }
    var category = Categories.findOne({
      _id: categoryId
    });
    var viewId = category.viewId;
    var view = Views.findOne({
      _id: viewId
    });
    for (key in row) {
      value = row[key];
      key = key.replace(/\./g, ' ');
      Meteor.call('viewAddField', {
        viewId: viewId,
        newField: key,
        newFieldType: 'text',
        mandatory: false,
        unique: false
      });
    }
    return true;
  },
	listCategoriesWithSlug: function () {
    if (!Meteor.user()) {throw new Meteor.Error(401, "You need to login to call this method");}
    var cat = Categories.find({ slug: { $exists: true } }).fetch();
    return cat;
  }
});
