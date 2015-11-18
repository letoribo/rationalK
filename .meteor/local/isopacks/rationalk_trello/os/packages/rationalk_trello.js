(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:trello/lib/methods.js                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
RKTrello = {};                                                               // 1
                                                                             // 2
RKTrello.findAll = function () {                                             // 3
  return Trello.find({}, {sort: {score: -1}}).fetch();                       // 4
};                                                                           // 5
                                                                             // 6
RKTrello.findFullText = function (searchQuery) {                             // 7
  return RKTrello.Trello.find( {                                             // 8
        $text: {                                                             // 9
          $search: searchQuery,                                              // 10
        },                                                                   // 11
    }, {                                                                     // 12
        fields: { score: { $meta: 'textScore' } },                           // 13
        sort: { score: { $meta: 'textScore' } },                             // 14
        limit: 30,                                                           // 15
    });                                                                      // 16
};                                                                           // 17
                                                                             // 18
RKTrello.findDummy = function () {                                           // 19
  return Trello.find({$text: { $search: "somethingthatyouwillneverfind" }}); // 20
};                                                                           // 21
                                                                             // 22
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:trello/lib/collections.js                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Trello = new Mongo.Collection('Trello');                                     // 1
                                                                             // 2
Trello.allow( {                                                              // 3
		insert: function (userId) {return !! userId; },                            // 4
		update: function (userId) {return !!userId; },                             // 5
    remove: function (userId) {return !!userId; },                           // 6
});                                                                          // 7
                                                                             // 8
if (Meteor.isServer) {                                                       // 9
	if (typeof Trello.createIndex === 'function') {                             // 10
		Trello.createIndex({ full: "text" }, { name: "TextIndex" });               // 11
	}                                                                           // 12
	else {                                                                      // 13
		if (typeof Trello._ensureIndex === 'function') {                           // 14
			Trello._ensureIndex( { full: "text" }, {name: "TextIndex"});              // 15
	}                                                                           // 16
}                                                                            // 17
} //end if Server                                                            // 18
                                                                             // 19
//expose it to the other packages :                                          // 20
RKTrello.Trello = Trello;                                                    // 21
                                                                             // 22
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:trello/lib/routes.js                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
if (Meteor.settings.public.show.trello) {                                    // 1
  Router.route("/trello", {                                                  // 2
    name: "trello",                                                          // 3
    waitOn: function () {                                                    // 4
      return [                                                               // 5
        Meteor.subscribe("trello"),                                          // 6
        Meteor.subscribe("members"),                                         // 7
        Meteor.subscribe("rkSettings"),                                      // 8
      ];                                                                     // 9
    },                                                                       // 10
  });                                                                        // 11
}                                                                            // 12
                                                                             // 13
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:trello/lib/server/publications.js                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Meteor.publish("trello", function () {                                       // 1
  return Trello.find();                                                      // 2
});                                                                          // 3
                                                                             // 4
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/rationalk:trello/lib/server/trello.js                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Meteor.methods({                                                             // 1
	loadTrelloBoard: function (trelloJSONFilename) {                            // 2
		var trelloBoardJSON = {};                                                  // 3
		var boardName;                                                             // 4
		var cards = {};                                                            // 5
		var nCards;                                                                // 6
		var obj;                                                                   // 7
		check(trelloJSONFilename, String);                                         // 8
		if (Meteor.settings.public.debug) {                                        // 9
			console.log('Starting loading trello json file');                         // 10
		}                                                                          // 11
    Trello.remove({});                                                       // 12
		trelloBoardJSON = JSON.parse(Assets.getText(trelloJSONFilename));          // 13
		boardName = trelloBoardJSON.name;                                          // 14
		cards = trelloBoardJSON.cards;                                             // 15
		if (Meteor.settings.public.debug) {                                        // 16
			console.log("boardName : ");                                              // 17
			console.log(boardName);                                                   // 18
		}                                                                          // 19
		nCards = cards.length;                                                     // 20
		for (i = 0; i < nCards; i++) {                                             // 21
			if (Meteor.settings.public.debug) {                                       // 22
				console.log("cardName : ");                                              // 23
				console.log(cards[i].name);                                              // 24
			}                                                                         // 25
			obj = {};                                                                 // 26
			obj.boardName = boardName;                                                // 27
			obj.full = cards[i].name;                                                 // 28
			obj.url = cards[i].url;                                                   // 29
			Trello.insert(obj);                                                       // 30
		}                                                                          // 31
	  return true;                                                              // 32
	},                                                                          // 33
	loadTrelloBoardJSON: function (trelloBoardJSON) {                           // 34
		var boardName;                                                             // 35
		var cards = {};                                                            // 36
		var nCards;                                                                // 37
		var obj;                                                                   // 38
		check(trelloBoardJSON, Match.Any);                                         // 39
		if (Meteor.settings.public.debug) {                                        // 40
			console.log('Starting loading trello json file');                         // 41
		}                                                                          // 42
		boardName = trelloBoardJSON.name;                                          // 43
		Trello.remove({                                                            // 44
			"boardName": boardName,                                                   // 45
		});                                                                        // 46
		cards = trelloBoardJSON.cards;                                             // 47
		if (Meteor.settings.public.debug) {                                        // 48
			console.log("boardName : ");                                              // 49
			console.log(boardName);                                                   // 50
		}                                                                          // 51
		nCards = cards.length;                                                     // 52
		for (i = 0; i < nCards; i++) {                                             // 53
			if (Meteor.settings.public.debug) {                                       // 54
				console.log("cardName : ");                                              // 55
				console.log(cards[i].name);                                              // 56
			}                                                                         // 57
			obj = {};                                                                 // 58
			obj.boardName = boardName;                                                // 59
			obj.cardName = cards[i].name;                                             // 60
			obj.url = cards[i].url;                                                   // 61
			obj.full = cards[i].name + cards[i].url;                                  // 62
			Trello.insert(obj);                                                       // 63
		}                                                                          // 64
	  return true;                                                              // 65
	},                                                                          // 66
});                                                                          // 67
                                                                             // 68
///////////////////////////////////////////////////////////////////////////////

}).call(this);
