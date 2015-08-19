if ((Meteor.isServer) && (process.env.NODE_ENV === "production")){

	var exec = Npm.require('child_process').exec
	var sys = Npm.require('sys');
	var mongoUrl = MongoDBURI.parse(process.env.MONGO_URL);
	var database = mongoUrl.database
	// var port = mongoUrl.hosts[0].port //not needed
	// var host = mongoUrl.hosts[0].host //not needed

	// need to create the folder backups first and then change the owner :
	// sudo chown -R :meteoruser /home/jesa/backups

	var backupDaily = function (){

		dumpCommand = "mongodump --db " + database;
		if (typeof(Meteor.settings.rationalK_backups_out) !== 'undefined') {
			//Meteor.settings.rationalK_backups_out should be : "/home/dokithonon/backups" (no trailing slash) in settings.json file
			out = Meteor.settings.rationalK_backups_out + "/backupDaily";
			dumpCommand = dumpCommand + " --out " + out;
		} //sinon ca dump dans le repertoir /opt/rationalk/... qui est effacé a chaque mise à jour du soft (chaque deploiement)

		// pour info : (ne marche pas car doit creer /home/meteoruser/.ssh
		//dumpCommand = dumpCommand + " && sshpass -p "+Meteor.settings.rationalK_backups_password+" scp -r dump "+Meteor.settings.rationalK_backups_username+"@"+Meteor.settings.rationalK_backups_host+":"+Meteor.settings.rationalK_backups_path;
		exec(dumpCommand, function (error, stdout, stderr) {
	  	if (stdout) {
	  		sys.print('stdout: ' + stdout);
	  	}
	  	if (stderr) {
	  		sys.print('stderr: ' + stderr);
	  	}
	  	if (error !== null) {
	  	  console.log('exec error: ' + error);
	  	}
		});


	}

	var backupWeekly = function (){
	  // idem daily mais dans le dossier /backupWeekly
	  dumpCommand = "mongodump --db " + database;
		if (typeof(Meteor.settings.rationalK_backups_out) !== 'undefined') {
			//Meteor.settings.rationalK_backups_out should be : "/home/dokithonon/backups" (no trailing slash) in settings.json file
			out = Meteor.settings.rationalK_backups_out + "/backupWeekly";
			dumpCommand = dumpCommand + " --out " + out;
		} //sinon ca dump dans le repertoir /opt/rationalk/... qui est effacé a chaque mise à jour du soft (chaque deploiement)

		// pour info : (ne marche pas car doit creer /home/meteoruser/.ssh
		//dumpCommand = dumpCommand + " && sshpass -p "+Meteor.settings.rationalK_backups_password+" scp -r dump "+Meteor.settings.rationalK_backups_username+"@"+Meteor.settings.rationalK_backups_host+":"+Meteor.settings.rationalK_backups_path;
		//console.log(dumpCommand)
		exec(dumpCommand, function (error, stdout, stderr) {
	  	if (stdout) {
	  		sys.print('stdout: ' + stdout);
	  	}
	  	if (stderr) {
	  		sys.print('stderr: ' + stderr);
	  	}
	  	if (error !== null) {
	  	  console.log('exec error: ' + error);
	  	}
		});
	}

	var backupMonthly = function (){
	  // idem daily mais dans le dossier /backupMonthly
	  dumpCommand = "mongodump --db " + database;
		if (typeof(Meteor.settings.rationalK_backups_out) !== 'undefined') {
			//Meteor.settings.rationalK_backups_out should be : "/home/dokithonon/backups" (no trailing slash) in settings.json file
			out = Meteor.settings.rationalK_backups_out + "/backupMonthly";
			dumpCommand = dumpCommand + " --out " + out;
		} //sinon ca dump dans le repertoir /opt/rationalk/... qui est effacé a chaque mise à jour du soft (chaque deploiement)

		// pour info : (ne marche pas car doit creer /home/meteoruser/.ssh
		//dumpCommand = dumpCommand + " && sshpass -p "+Meteor.settings.rationalK_backups_password+" scp -r dump "+Meteor.settings.rationalK_backups_username+"@"+Meteor.settings.rationalK_backups_host+":"+Meteor.settings.rationalK_backups_path;
		//console.log(dumpCommand)
		exec(dumpCommand, function (error, stdout, stderr) {
	  	if (stdout) {
	  		sys.print('stdout: ' + stdout);
	  	}
	  	if (stderr) {
	  		sys.print('stderr: ' + stderr);
	  	}
	  	if (error !== null) {
	  	  console.log('exec error: ' + error);
	  	}
		});
	}


	SyncedCron.add({
	    name: 'Daily database backup',
	    schedule: function (parser) {
	      return parser.text('at 9:00 pm'); // fires at 9:00pm every day
	      //return parser.text('every 2 minutes'); // pour les essais
	    },
	    job: backupDaily
	});

	SyncedCron.add({
	    name: 'Weekly database backup',
	    schedule: function (parser) {
	      return parser.text('at 6:00 pm on Sunday');
	    },
	    job: backupWeekly
	});

	SyncedCron.add({
	    name: 'Monthly database backup',
	    schedule: function (parser) {
	      return parser.text('at 2:00 pm on the last day of the month');
	    },
	    job: backupMonthly
	});

}

if (Meteor.isServer){
	//mongorestore
	var exec = Npm.require('child_process').exec
	var sys = Npm.require('sys');
	var mongoUrl = MongoDBURI.parse(process.env.MONGO_URL);
	var database = mongoUrl.database
	var port = mongoUrl.hosts[0].port //not needed
	var host = mongoUrl.hosts[0].host //not needed

	Meteor.methods({
    loadBackup: function (backupFolderPath) {
			check(backupFolderPath,String)
			var restoreCommand = "mongorestore";
			restoreCommand = restoreCommand.concat(" --db ");
			restoreCommand = restoreCommand.concat(database);
			restoreCommand = restoreCommand.concat(" --host ");
			restoreCommand = restoreCommand.concat(host);
			restoreCommand = restoreCommand.concat(" --port ");
			restoreCommand = restoreCommand.concat(port);
			restoreCommand = restoreCommand.concat(" --drop ");
			restoreCommand = restoreCommand.concat(" ");
			restoreCommand = restoreCommand.concat(backupFolderPath);
			if (Meteor.settings.public.debug){
				console.log(restoreCommand)
			}
			//Meteor.users.remove({});
			// pour info : (ne marche pas car doit creer /home/meteoruser/.ssh
			//dumpCommand = dumpCommand + " && sshpass -p "+Meteor.settings.rationalK_backups_password+" scp -r dump "+Meteor.settings.rationalK_backups_username+"@"+Meteor.settings.rationalK_backups_host+":"+Meteor.settings.rationalK_backups_path;
			exec(restoreCommand, function (error, stdout, stderr) {
		  	if (stdout) {
		  		sys.print('stdout: ' + stdout);
		  	}
		  	if (stderr) {
		  		sys.print('stderr: ' + stderr);
		  	}
		  	if (error !== null) {
		  	  console.log('exec error: ' + error);
		  	}
			});



		}
	});

}
