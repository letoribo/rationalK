Meteor.methods({
  updateOption: function (optionName,optionValue) {
    check(optionName, Match.Any);
    check(optionValue, Match.Any);
    if (! this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to update options");
    }
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
    check(optionName, String);
	 return Settings.findOne({optionName: "option1"}).optionValue;
  }
});
