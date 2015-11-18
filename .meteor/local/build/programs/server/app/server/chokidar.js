(function(){if (Meteor.isServer){
  if (Meteor.settings.chokidar){
  var chokidar = Meteor.npmRequire('chokidar'); //npm

  var folders = FoldersToScan.find().fetch();

  var dirs = [];
  folders.forEach(function (folder) {
    if (folder.path!=""){
      dirs.push(folder.path)
    }
  });
  if (Meteor.settings.public.debug){
    console.log(dirs);
  }
  // One-liner for current directory, ignores .dotfiles
  //var dirs = ["/Users/thomasdokithonon/Downloads/","/Users/thomasdokithonon/Dropbox/"];

  var watcher = chokidar.watch(dirs, {
    ignored: /[\/\\]\./,
    persistent: true
  });



  watcher.on('add', Meteor.bindEnvironment(
      function (path) {
        var text = 'File ' +  path + ' has been added'
        console.log(text);
        var data = [];
        data.path = path;
        var obj = {
          what: text,
          createdAt : new Date(),
          data : data,
          path : path,
          type : "chokidar",
          event : "add"
        };
        console.log(obj);
        History.insert(obj);
      }
    )
  )
  watcher.on('change', Meteor.bindEnvironment(
      function (path,stats) {
        var data = [];

        var text = 'File ' +  path + ' has been changed';
        if (typeof stats!== 'undefined'){
          text = text.concat(". New size : ")
          text = text.concat(stats.size);
          data.stats = stats;
        }

        console.log(text);

        data.path = path;

        var obj = {
          what: text,
          createdAt : new Date(),
          data : data,
          path : path,
          type : "chokidar",
          event : "change"
        };
        console.log(obj);
        History.insert(obj);
      }
    )

  )
  watcher.on('unlink', function (path) { console.log('File ' + path + ' has been removed'); })
  // More events.
  watcher.on('addDir', function (path,stats) { console.log('Directory ' + path + ' has been added'); })
  watcher.on('unlinkDir', function (path) { console.log('Directory ' + path + ' has been removed'); })
  watcher.on('error', function (error) { console.log('Error happened : ' + error); })
  watcher.on('ready', function () { console.log('Initial scan complete. Ready for changes.'); })
  //watcher.on('raw', function (event, path, details) { console.log('Raw event info:', event, path, details); })



/*
  chokidar.watch(dirs, {ignored: /[\/\\]\./}).on('all', function (event, path) {
    console.log(event, path);

    var obj = {
      what: txt,
      createdAt : new Date(),
      who : who,
      userId : userId,
      orgId : orgId,
      data : data,
      type : type,
      docId : docId
    };
    return historyId = History.insert(obj);


  });

  */
}
}

})();
