if (Meteor.isServer){

  var exec = Npm.require('child_process').exec;
  //var spawn = Npm.require('child_process').spawn;
  var sys = Npm.require('sys');

  Meteor.methods({
    updateFromGit : function (){
      rkStatus.update(
				{
					method: 'updateFromGit'
				},
				{
					method: 'updateFromGit',
					state : 'running',
					date: new Date()
				},
				{
					upsert: true
				}
			);

      //download
      if (typeof(Meteor.settings.rationalK_Git.gitExePath) === 'undefined') {
          gitCommand = 'git';
      }
      else {
        gitCommand = '"' + Meteor.settings.rationalK_Git.gitExePath + '"';
      }

      dumpCommand = '(cd "'+ Meteor.settings.rationalK_Git.gitPullDir +'" && ' + gitCommand + ' pull)';
      console.log(dumpCommand)
      var child = exec(dumpCommand);

      //Meteor.settings.rationalK_Git.autoUpdate;


      child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });

      child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        if (data.indexOf("Server file no newer than local file") === 0){
          //console.log('stderr: ' + data);
          //child.serverFileNotNewerThanLocalFile =true;
    		}

      });


      child.on('close', function (code) {
        console.log('child process exited with code ' + code);
        if (code==0){
            console.log("Files have been pulled, now we should deploy.");
            if (process.env.NODE_ENV === "production"){
              console.log("You are on production env, we should now re-deploy")
              //deploy
              dumpCommand = '(cd "' + Meteor.settings.rationalK_Git.mupDeployFolder + '" && mup deploy)';
              console.log(dumpCommand)
              childDeploy = exec(dumpCommand, function (error, stdout, stderr) {
                if (stdout) {sys.print('stdout: ' + stdout);}
                if (stderr) {sys.print('stderr: ' + stderr);}
                if (error !== null) {console.log('exec error: ' + error);}
              });

              rkStatus.update(
        				{
        					method: 'updateFromGit'
        				},
        				{
        					method: 'updateFromGit',
        					state : 'finished',
        					date: new Date()
        				},
        				{
        					upsert: true
        				}
        			);
            }
            else {
              console.log("You are on dev platform, it makes no sense to deploy. it will restart on its own...")
            }
        }
        else {
            //exit code diff de 0
        }
      });


    }
  });

  if ( Meteor.settings.rationalK_Git.autoUpdate === true) {
    var updateFromGit = function (){
          Meteor.call('updateFromGit');
    }
    SyncedCron.add({
      name: 'A cron that update rationalK from git',
      schedule: function (parser) {
        return parser.text('at 12:30 pm');
        //return parser.text('every 2 minutes');
      },
      job: updateFromGit
    });
  }
}
