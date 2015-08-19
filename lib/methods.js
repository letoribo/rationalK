Meteor.methods({
  serverFilename: function (clientFilename) {
    check(clientFilename,String);
    var filelink_replacements = Meteor.settings.public.filelink_replace;
    for (i = 0; i < filelink_replacements.length; i++) {
      var serverFilename = clientFilename;
      serverFilename = clientFilename.replace(filelink_replacements[i].client, filelink_replacements[i].server)
        if (serverFilename!==clientFilename){
          break;
        }
    }
    serverFilename = serverFilename.replace(/\\/g,"/");
    return serverFilename;
  },
  stripBeginEndQuotes: function (s){
    check(s,String);
  	var t=s.length;
  	if (s.charAt(0)=='"') s=s.substring(1,t--);
  	if (s.charAt(--t)=='"') s=s.substring(0,t);
  	return s;
  }
});

stripBeginEndQuotes = function (s) {
	var t=s.length;
	if (s.charAt(0)=='"') s=s.substring(1,t--);
	if (s.charAt(--t)=='"') s=s.substring(0,t);
	return s;
};

userSpaceHasDoc = function (userId, docId) {
  check(userId, String);
  check(docId, String);
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);
};

getTruncatedText = function (url, txt) {
  check(url, Match.OneOf(null,String));
  check(txt, String);

  if (url){
    if (url.length>0) {
      if (Meteor.settings.public.debug){
        console.log("url : " + url);
      }
    }
  }

	var nWords = 10;
	if ((txt==="") || (typeof txt=== 'undefined')){
		txt="empty";
	}
	var truncatedArray = txt.split(" ")
	if (truncatedArray.length > nWords){
		var visiblePart = truncatedArray.splice(0, nWords).join(" ");
		var tooltipPart = truncatedArray.join(' ');
		return new Spacebars.SafeString(visiblePart+" <a href='"+ url +"' rel='tooltip' data-html='true' title='"+ tooltipPart +"'>[...]</a>")
	}
	else {
		return txt;
	}
};

replaceFilename = function (filelink) {
  check(filelink,String);
  var filelink_replacements = Meteor.settings.public.filelink_replacements;
      for (i = 0; i < filelink_replacements.length; i++) {
      //console.log(filelink_replacements[i].tobereplaced)
    //console.log(filelink_replacements[i].replacement)
    var res = filelink;
          res = filelink.replace(filelink_replacements[i].tobereplaced, filelink_replacements[i].replacement)
          if (res!==filelink){
            filelink = res ;
            break;

          }
  }
  return filelink;
}

clientFilename = function (serverFilename) {
  check(serverFilename,String);
  var filelink_replacements = Meteor.settings.public.filelink_replace;
  var clientFilename = serverFilename;
  for (i = 0; i < filelink_replacements.length; i++) {
    clientFilename = serverFilename.replace(filelink_replacements[i].server, filelink_replacements[i].client)
    if (serverFilename!==clientFilename){
      break;
    }
  }
  return clientFilename;
}
