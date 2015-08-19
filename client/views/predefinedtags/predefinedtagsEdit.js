Template.predefinedtagsEdit.helpers({
	tags: function () {
		return PredefinedTags.find();
	},
	makeUniqueID: function () {
      return "update-each-" + this._id;
    }
});