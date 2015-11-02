var dumpCommand;
var exec;
var mongoUrl;
var database;
var backup;
var i;
var j;
var collectionsToBackup = ['docs','views','history','revisions','categories','rkSettings','userspaces','folderstoscan','walkedfiles','searchqueries','tags'];

if (typeof(RKCore.packageBackup) !== 'undefined'){
	RKCore.log("RKCore.packageBackup : ");
	RKCore.log(RKCore.packageBackup);
	var nPackagesThatWantToBackupCollections = RKCore.packageBackup.length;
	for (j = 0; j < nPackagesThatWantToBackupCollections; j++) {
		collectionsToBackup = collectionsToBackup.concat(RKCore.packageBackup[j].collections);
	}
}
RKCore.log("collectionsToBackup : ");
RKCore.log(collectionsToBackup);

if ((Meteor.isServer) && (process.env.NODE_ENV === "production")) {
//if (Meteor.isServer)  { //for test
	exec = Npm.require('child_process').exec;
	sys = Npm.require('sys');
	mongoUrl = MongoDBURI.parse(process.env.MONGO_URL);
	// var port = mongoUrl.hosts[0].port //not needed
	// var host = mongoUrl.hosts[0].host //not needed
	// need to create the folder backups first and then change the owner :
	// sudo chown -R :meteoruser /home/company/backups
	backup = function (backupSubFolderName) {
			dumpCommand = "mongodump"
				+ " --db " + mongoUrl.database
				+ " --excludeCollection ['filelinks']"
				+ " --out " + Meteor.settings.periodicBackup.outFolder + "/" + backupSubFolderName;
			if (typeof Docs.createIndex === 'function') {
				RKCore.log("You are runnning a mongodb version >3.");
				dumpCommand = "mongodump"
					+ " --db " + mongoUrl.database
					+ " --excludeCollection ['filelinks']" //excludeCollection is only available at 3.0
					+ " --out " + Meteor.settings.periodicBackup.outFolder + "/" + backupSubFolderName;
			}
			else {
				RKCore.log("You are runnning a mongodb version <3 (probably 2.6.X).");
				var nCollectionsToBackup = collectionsToBackup.length;
				dumpCommand = ''
				for (i = 0; i < nCollectionsToBackup; i++) {
					dumpCommand = dumpCommand + "mongodump"
						+ " --db " + mongoUrl.database
						+ " --collection " +  collectionsToBackup[i] //excludeCollection is only available at 3.0
						+ " --out " + Meteor.settings.periodicBackup.outFolder + "/" + backupSubFolderName
						+ " && "
				}
				dumpCommand = dumpCommand.slice(0, - 4);
			}

			RKCore.log("command : " + dumpCommand);

			exec(dumpCommand, function (error, stdout, stderr) {
		  	if (stdout) {
		  		RKCore.log('stdout: ' + stdout);
		  	}
		  	if (stderr) {
					RKCore.log('stderr: ' + stderr);
		  	}
		  	if (error !== null) {
		  	  RKCore.log('exec error: ' + error);
		  	}
			});

	};

	if ( (Meteor.settings.periodicBackup.do) && (typeof(Meteor.settings.periodicBackup.outFolder) !== 'undefined') ) {
		SyncedCron.add({
		    name: 'Daily DB backup',
		    schedule: function (parser) {
		      return parser.text('at 9:00 pm'); // fires at 9:00pm every day
		      //return parser.text('every 2 minutes'); // pour les essais
		    },
		    job: function () {
					var backupSubFolderName = "backupDaily";
					backup(backupSubFolderName);
  			},
		});

		SyncedCron.add({
		    name: 'Weekly DB backup',
		    schedule: function (parser) {
		      return parser.text('at 6:00 pm on Sunday');
		    },
				job: function () {
					var backupSubFolderName = "backupWeekly";
					backup(backupSubFolderName);
  			},
		});

		SyncedCron.add({
		    name: 'Monthly DB backup',
		    schedule: function (parser) {
		      return parser.text('at 2:00 am on the last day of the month');
		    },
				job: function () {
					var backupSubFolderName = "backupMonthly";
					backup(backupSubFolderName);
  			},
		});
	}
}

if (Meteor.isServer) {
	//mongorestore
	var exec = Npm.require('child_process').exec
	var mongoUrl = MongoDBURI.parse(process.env.MONGO_URL);
	var database = mongoUrl.database
	var port = mongoUrl.hosts[0].port //not needed
	var host = mongoUrl.hosts[0].host //not needed

	Meteor.methods({
    loadBackup: function (backupFolderPath) {
			var restoreCommand;
			check(backupFolderPath,String)
			restoreCommand = "mongorestore";
			restoreCommand = restoreCommand.concat(" --db ");
			restoreCommand = restoreCommand.concat(database);
			restoreCommand = restoreCommand.concat(" --host ");
			restoreCommand = restoreCommand.concat(host);
			restoreCommand = restoreCommand.concat(" --port ");
			restoreCommand = restoreCommand.concat(port);
			restoreCommand = restoreCommand.concat(" --drop ");
			restoreCommand = restoreCommand.concat(" ");
			restoreCommand = restoreCommand.concat(backupFolderPath);
			if (Meteor.settings.public.debug) {
				console.log(restoreCommand);
			}
			//Meteor.users.remove({});
			// pour info : (ne marche pas car doit creer /home/meteoruser/.ssh
			//dumpCommand = dumpCommand + " && sshpass -p "+Meteor.settings.rationalK_backups_password+" scp -r dump "+Meteor.settings.rationalK_backups_username+"@"+Meteor.settings.rationalK_backups_host+":"+Meteor.settings.rationalK_backups_path;
			exec(restoreCommand, function (error, stdout, stderr) {
		  	if (stdout) {
		  		console.log('stdout: ' + stdout);
		  	}
		  	if (stderr) {
		  		console.log('stderr: ' + stderr);
		  	}
		  	if (error !== null) {
		  	  console.log('exec error: ' + error);
		  	}
			});
		},
	});
}
