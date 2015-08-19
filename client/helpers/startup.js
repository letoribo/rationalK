Meteor.startup(function () {
//Set the license vaid by startup and then wait for the cron to check it true or not
//If i check on startup then it tooks two long time
Session.set('validLicense',true);
});
