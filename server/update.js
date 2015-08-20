if (Meteor.isServer){

  var exec = Npm.require('child_process').exec;
  //var spawn = Npm.require('child_process').spawn;
  var sys = Npm.require('sys');

  Meteor.methods({
    updateRationalK : function (){
      rkStatus.update(
				{
					method: 'updateRationalK'
				},
				{
					method: 'updateRationalK',
					state : 'running',
					date: new Date()
				},
				{
					upsert: true
				}
			);

      //download and deploy
      // there is a download link on the page about that launch this method
      //the -N fetch only newer file
      dumpCommand = "wget -N --http-user="+Meteor.settings.rationalK_auto_update_user+" --http-password="+Meteor.settings.rationalK_auto_update_password+" http://rationalk.ch/downloads/pro/rationalK.tar.gz -P "+Meteor.settings.rationalK_home_dir;
      console.log(dumpCommand)
      var child = exec(dumpCommand);


      child.stdout.on('data', function (data) {
        //console.log('stdout: ' + data);
      });

      child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        if (data.indexOf("Server file no newer than local file") === 0){
          // var out = "no new"
          // no way to acces meteor variable here...
          console.log('stderr: ' + data);
          child.serverFileNotNewerThanLocalFile =true;
    		}

      });


      child.on('close', function (code) {
        console.log('child process exited with code ' + code);
        if (code==0){
          if (child.serverFileNotNewerThanLocalFile){
            console.log("The Server file no newer than local file. I will not download and not deploy")
          }
          else {
            console.log("The file has been downloaded, now we should deploy.");
            if (process.env.NODE_ENV === "production"){
              //deploy
              dumpCommand = "(cd " + Meteor.settings.rationalK_deployment_dir + " && mup deployFromBundle)";
              console.log(dumpCommand)
              childDeploy = exec(dumpCommand, function (error, stdout, stderr) {
                if (stdout) {sys.print('stdout: ' + stdout);}
                if (stderr) {sys.print('stderr: ' + stderr);}
                if (error !== null) {console.log('exec error: ' + error);}
              });
              rkStatus.update(
        				{
        					method: 'updateRationalK'
        				},
        				{
        					method: 'updateRationalK',
        					state : 'finished',
        					date: new Date()
        				},
        				{
        					upsert: true
        				}
        			);
            }
            else {
              console.log("You are on dev platform, it makes no sense to deploy...")
            }
          }
        }
        else {
            //exit code diff de 0
        }
      });


    }
  });

  if ( (process.env.NODE_ENV === "production") && (Meteor.settings.rationalK_auto_update) ){
    var updateRationalK = function (){
          Meteor.call('updateRationalK');
    }
    SyncedCron.add({
      name: 'A cron that update rationalK if there is a new version',
      schedule: function (parser) {return parser.text('at 12:30 pm');},
      job: updateRationalK
    });
  }
}
