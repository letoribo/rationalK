Template.trello.rendered = function () {
	document.getElementById('files').addEventListener('change', handleFileSelect, false);

	function handleFileSelect (evt) {
		var reader;
    var files = evt.target.files;
		f = files[0];

    if (f.type.match('application/json')) {
      reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
					var trelloBoardJSON = JSON.parse(e.target.result);
					if (Meteor.settings.public.debug) {
						console.log("Filename : ");
						console.log(theFile.name);
						console.log("trelloBoardJSON : ");
						console.log(trelloBoardJSON);
					}
					Meteor.call('loadTrelloBoardJSON', trelloBoardJSON, function () {});
        };
      })(f);
      reader.readAsText(f);
		}
  }
};

Template.trello.helpers({
	Trello: function () {
		return Trello.find().fetch();
	},
	settingsTrello: function () {
    return {
        rowsPerPage: 100,
        showFilter: true,
        class: 'table table-condensed col-sm-12',
			}
	},
});

Template.trello.events({
	"click a.loadTrello": function (e) {
		var trelloJSONFilename = "trello/myboard.json";
		e.preventDefault();
		Meteor.call('loadTrelloBoard', trelloJSONFilename, function () {});
		return false;
	},
});
