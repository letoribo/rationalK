var chokidar;
var folders;
var dirs;
var watcher;

if (Meteor.isServer && Meteor.settings.chokidar) {
  chokidar = Meteor.npmRequire('chokidar'); //npm
  folders = FoldersToScan.find().fetch();
  dirs = [];
  folders.forEach(function (folder) {
    if (folder.path !== "") {
      dirs.push(folder.path);
    }
  });
  // One-liner for current directory, ignores .dotfiles
  //var dirs = ["/Users/thomasdokithonon/Downloads/","/Users/thomasdokithonon/Dropbox/"];

  watcher = chokidar.watch(dirs, {
    ignored: /[\/\\]\./,
    persistent: true,
  });

  watcher.on('add', Meteor.bindEnvironment(
      function (path) {
        var data = [];
        var obj = {};
        var text = 'File ' +  path + ' has been added';
        RKCore.log(text);
        data = [];
        data.path = path;
        obj = {
          what: text,
          createdAt: new Date(),
          data: data,
          path: path,
          type: "chokidar",
          event: "add",
        };
        RKCore.log(obj);
        History.insert(obj);
      }
    )
  );
  watcher.on('change', Meteor.bindEnvironment(
      function (path, stats) {
        var data = [];
        var obj = {};
        var text = 'File ' +  path + ' has been changed';
        if (typeof stats !== 'undefined') {
          text = text.concat(". New size : ");
          text = text.concat(stats.size);
          data.stats = stats;
        }
        data.path = path;

        obj = {
          what: text,
          createdAt: new Date(),
          data: data,
          path: path,
          type: "chokidar",
          event: "change",
        };
        History.insert(obj);
      }
    )

  );
  watcher.on('unlink', function (path) { RKCore.log('File ' + path + ' has been removed'); });
  watcher.on('addDir', function (path) { RKCore.log('Directory ' + path + ' has been added'); });
  watcher.on('unlinkDir', function (path) { RKCore.log('Directory ' + path + ' has been removed'); });
  watcher.on('error', function (error) { RKCore.log('Error happened : ' + error); });
  watcher.on('ready', function () { RKCore.log('Initial scan complete. Ready for changes.'); });
}
