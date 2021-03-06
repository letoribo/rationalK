Template.fileInSearchResults.helpers({
	filename: function () {
			return this.path.replace(/^.*[\\\/]/, '');
	},
	fileLinkUrl: function () {
		var fileLink = this.path.replace(/\"/g, ''); //remove " from filelink ;
		var fileLinkUrl = '';
		fileLink = clientFilename(fileLink);
		if (fileLink) {
			fileLink = clientFilename(fileLink);
			fileLinkUrl = 'rk:' + fileLink;
		}
		return fileLinkUrl;
	},
	fileLinkUrlForClipboard: function () {
		var fileLink = this.path.replace(/\"/g, ''); //remove " from filelink ;
		return fileLink;
	},
	pathReplaced: function () {
		var pathReplaced = this.path.replace(/\"/g, ''); //remove " from filelink ;
		if (pathReplaced) {
			pathReplaced = clientFilename(pathReplaced);
		}
		else {
			pathReplaced = '';
		}
		return pathReplaced;
	},
	mtime: function () {
		return moment(this.mtime).format('DD.MM.YYYY HH:mm');
	},
});

Template.fileInSearchResults.events({
	"click .convertIntoDBDoc": function (e) {
  		e.preventDefault();
			Session.set("currentFilelink", e.currentTarget.dataset.filelink);
			Router.go("docCreate");
      return false;
  	},
});
