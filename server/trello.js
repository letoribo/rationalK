Meteor.methods({
	loadTrelloBoard: function (trelloJSONFilename) {
		var trelloBoardJSON = {};
		var boardName;
		var cards = {};
		var nCards;
		var obj;
		check(trelloJSONFilename, String);
		if (Meteor.settings.public.debug) {
			console.log('Starting loading trello json file');
		}
    Trello.remove({});
		trelloBoardJSON = JSON.parse(Assets.getText(trelloJSONFilename));
		boardName = trelloBoardJSON.name;
		cards = trelloBoardJSON.cards;
		if (Meteor.settings.public.debug) {
			console.log("boardName : ");
			console.log(boardName);
		}
		nCards = cards.length;
		for (i = 0; i < nCards; i++) {
			if (Meteor.settings.public.debug) {
				console.log("cardName : ");
				console.log(cards[i].name);
			}
			obj = {};
			obj.boardName = boardName;
			obj.full = cards[i].name;
			obj.url = cards[i].url;
			Trello.insert(obj);
		}
	  return true;
	},
	loadTrelloBoardJSON: function (trelloBoardJSON) {
		var boardName;
		var cards = {};
		var nCards;
		var obj;
		check(trelloBoardJSON, Match.Any);
		if (Meteor.settings.public.debug) {
			console.log('Starting loading trello json file');
		}
		boardName = trelloBoardJSON.name;
		Trello.remove({
			"boardName": boardName,
		});
		cards = trelloBoardJSON.cards;
		if (Meteor.settings.public.debug) {
			console.log("boardName : ");
			console.log(boardName);
		}
		nCards = cards.length;
		for (i = 0; i < nCards; i++) {
			if (Meteor.settings.public.debug) {
				console.log("cardName : ");
				console.log(cards[i].name);
			}
			obj = {};
			obj.boardName = boardName;
			obj.cardName = cards[i].name;
			obj.url = cards[i].url;
			obj.full = cards[i].name + cards[i].url;
			Trello.insert(obj);
		}
	  return true;
	},
});
