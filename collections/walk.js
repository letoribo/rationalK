Meteor.methods({
  updateFoldersToScan: function (textareaContent) {
    var forbiddenPaths;
    var forbiddenPathsLength;
    var arrayLength;
    var currentForbiddenPath;
    check(textareaContent, String);
    forbiddenPaths = rkSettings.findOne({key: "forbiddenPaths"}).value;
    if (Meteor.settings.public.debug) {
      console.log("forbiddenPath : ");
      console.log(forbiddenPaths);
    }
    // all subdirectories from forbiddend Paths will be omitted
    forbiddenPathsLength = forbiddenPaths.length;

    FoldersToScan.remove({});
  	arrayOfLines = textareaContent.split('\n');
  	arrayLength = arrayOfLines.length;

  	for (var i = 0; i < arrayLength; i++) {
      var pathAllowed = true;
      var currentLine = arrayOfLines[i];
      //Backslash will be replaced by frontslash
      //Don't forget the first frontslah.
      //Omit the trailing frontslash
      if (currentLine.charAt(0) !== '/') {
        currentLine = '/' + currentLine;
      }
      if (currentLine.slice(-1) === '/') {
        currentLine = currentLine.slice(0, - 1);
      }
      if (currentLine.slice(-1) === '\\') {
        currentLine = currentLine.slice(0, - 1);
      }
      currentLine = currentLine.replace(/\\/g, "/"); // put in linux format
      if (Meteor.settings.public.debug) {
        console.log("line #" + i);
    	  console.log(currentLine);
      }
      for ( j = 0; j < forbiddenPathsLength; j++) {
        currentForbiddenPath = forbiddenPaths[j] ;
        currentForbiddenPath = currentForbiddenPath.replace(/\\/g,"/"); // put in linux format
        console.log(currentForbiddenPath);
        if (currentLine.indexOf(currentForbiddenPath)>=0){
          if (Meteor.settings.public.debug){
            console.log("This path is forbidden.");
          }
          pathAllowed = false;
          if (typeof(toastr) !== 'undefined') {
            toastr.error(currentLine + TAPi18n.__(' is forbidden by your admin.'));
          }
        }
      }
      if (pathAllowed) {
    	   FoldersToScan.insert({path: currentLine});
      }
	}
    if (typeof(toastr) !== 'undefined') {
      toastr.success(TAPi18n.__('Saved'));
    }
    return true;
  },
});
