Meteor.methods({
  serverFilename: function (clientFilename) {
    var filelinkReplacements = Meteor.settings.public.filelink_replace;
    var serverFilename;
    check(clientFilename, String);
    for (i = 0; i < filelinkReplacements.length; i++) {
      serverFilename = clientFilename;
      serverFilename = clientFilename.replace(filelinkReplacements[i].client, filelinkReplacements[i].server);
        if (serverFilename !== clientFilename) {
          break;
        }
    }
    serverFilename = serverFilename.replace(/\\/g, "/");
    return serverFilename;
  },
  stripBeginEndQuotes: function (s) {
    var t = s.length;
    var sStripped = s;
    check(s, String);
  	if (s.charAt(0) === '"') sStripped = s.substring(1, t--);
  	if (s.charAt(--t) === '"') sStripped = s.substring(0, t);
  	return sStripped;
  },
});

stripBeginEndQuotes = function (s) {
  var t = s.length;
  var sStripped = s;
  check(s, String);
  if (s.charAt(0) === '"') sStripped = s.substring(1, t--);
  if (s.charAt(--t) === '"') sStripped = s.substring(0, t);
  return sStripped;
};

userSpaceHasDoc = function (userId, docId) {
  check(userId, String);
  check(docId, String);
	return (userSpaces.find({docId: docId, userId: userId}).count() > 0);
};

getTruncatedText = function (url, txt) {
  var nWords = 10;
  var truncatedArray = txt.split(" ");
  var visiblePart;
  var tooltipPart;
  check(url, Match.OneOf(null, String));
  check(txt, String);
  if (url) {
    if (url.length > 0) {
      RKCore.log("url : " + url);
    }
  }

	if ((txt === "") || (typeof txt === 'undefined')) {
		return "empty";
	}

	if (truncatedArray.length > nWords) {
		visiblePart = truncatedArray.splice(0, nWords).join(" ");
		tooltipPart = truncatedArray.join(' ');
		return new Spacebars.SafeString(visiblePart + " <a href='" + url + "' rel='tooltip' data-html='true' title='" + tooltipPart + "'>[...]</a>");
	}
};

clientFilename = function (serverFilename) {
  var filelinkReplacements = Meteor.settings.public.filelink_replace;
  var clientFilename = serverFilename;
  check(serverFilename, String);
  for (i = 0; i < filelinkReplacements.length; i++) {
    clientFilename = serverFilename.replace(filelinkReplacements[i].server, filelinkReplacements[i].client);
    if (serverFilename !== clientFilename) {
      break;
    }
  }
  return clientFilename;
};
