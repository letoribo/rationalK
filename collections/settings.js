Meteor.methods({
  updateOption: function (optionName,optionValue) {
    // Check argument types
    //check(docId, String);

    if (! this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to update options");
    }

	
	console.log('updating option...');
	console.log(optionName);
	console.log(optionValue);
	Settings.update(
		{
			optionName: optionName
		},
		{$set:
			{
				optionName: optionName,
				optionValue: optionValue
			}
		},
		{ 
			upsert: true 
		}
	);
	
    return true;
  },
    getOption: function (optionName) {
    // Check argument types
    //check(docId, String);
	console.log("getting option Value for :"+optionName);
	return Settings.findOne({optionName: "option1"}).optionValue;
  }
});