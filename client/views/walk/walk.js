Template.walk.helpers({
	foldersToScan: function () {
		var folders = FoldersToScan.find().fetch();
		var textareaContent = "";
		folders.forEach(function (folder) {
			if (folder.path !== "") {
				textareaContent = textareaContent + folder.path + "\n";
			}
		});
		textareaContent = textareaContent.slice(0, - 1); //remove last line break \n
		return textareaContent;
	},
});

Template.walk.events({
	"submit .foldersToScanForm": function (e) {
		e.preventDefault();
		return Meteor.call('updateFoldersToScan', e.target.folders.value, function () {});
	},
	"click a.walkThruFolders": function (e) {
		e.preventDefault();
		return Meteor.call('walkThruFolders', function () {});
	},
});

Template.walk.rendered = function () {

}
