var child;
var exec;
var sys;
var updateFromGit;

if (Meteor.isServer) {
  exec = Npm.require('child_process').exec;
  sys = Npm.require('sys');

  Meteor.methods({
    updateFromGit: function () {
      rkStatus.update(
				{
					method: 'updateFromGit',
				},
				{
					method: 'updateFromGit',
					state: 'running',
					date: new Date(),
				},
				{
					upsert: true,
				}
			);
      //download
      if (typeof(Meteor.settings.rationalK_Git.gitExePath) === 'undefined') {
          gitCommand = 'git';
      }
      else {
        gitCommand = '"' + Meteor.settings.rationalK_Git.gitExePath + '"';
      }

      dumpCommand = '(cd "' + Meteor.settings.rationalK_Git.gitPullDir + '" && ' + gitCommand + ' pull)';
      if (Meteor.settings.public.debug) {
        console.log(dumpCommand);
      }
      child = exec(dumpCommand);

      child.stdout.on('data', function (data) {
        if (Meteor.settings.public.debug) {
          console.log('stdout: ' + data);
        }
      });

      child.stderr.on('data', function (data) {
        if (Meteor.settings.public.debug) {
          console.log('stderr: ' + data);
        }
      });

      child.on('close', function (code) {
        if (Meteor.settings.public.debug) {
          console.log('child process exited with code ' + code);
        }
        if (code === 0) {
          if (Meteor.settings.public.debug) {
            console.log("Files have been pulled.");
          }
            if (process.env.NODE_ENV === "production") {
              if (Meteor.settings.public.debug) {
                console.log("You are on production env, we should now re-deploy");
              }
              //deploy
              //dumpCommand = '(cd "' + Meteor.settings.rationalK_Git.mupDeployFolder + '" && mup deploy)';
			        dumpCommand = '(cd "' + Meteor.settings.rationalK_Git.mupDeployFolder + '" && echo ' + Meteor.settings.rationalK_Git.sudoPassword + ' | sudo -S mup deploy)';
              if (Meteor.settings.public.debug) {
                console.log(dumpCommand);
              }
              childDeploy = exec(dumpCommand, function (error, stdout, stderr) {
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

              rkStatus.update(
        				{
        					method: 'updateFromGit',
        				},
        				{
        					method: 'updateFromGit',
        					state: 'finished',
        					date: new Date(),
        				},
        				{
        					upsert: true,
        				}
        			);
            }
            else {
              if (Meteor.settings.public.debug) {
                console.log("You are on dev platform, it makes no sense to deploy. it will restart on its own...");
              }
            }
        }
        else {
            //exit code diff de 0
            if (Meteor.settings.public.debug) {
              console.log(code);
            }
        }
      });
    },
  });

  if ( Meteor.settings.rationalK_Git.autoUpdate === true) {
    updateFromGit = function () {
          Meteor.call('updateFromGit');
    };
    SyncedCron.add({
      name: 'A cron that update rationalK from git',
      schedule: function (parser) {
        return parser.text('at 12:30 pm');
        //return parser.text('every 2 minutes');
      },
      job: updateFromGit,
    });
  }
}
