Trello = new Mongo.Collection('Trello');

Trello.allow( {
		insert: function (userId) {return !! userId; },
		update: function (userId) {return !!userId; },
    remove: function (userId) {return !!userId; },
});

if (Meteor.isServer) {
	if (typeof Trello.createIndex === 'function') {
		Trello.createIndex({ full: "text" }, { name: "TextIndex" });
	}
	else {
		if (typeof Trello._ensureIndex === 'function') {
			Trello._ensureIndex( { full: "text" }, {name: "TextIndex"});
	}
}
} //end if Server

//expose it to the other packages :
RKTrello.Trello = Trello;
