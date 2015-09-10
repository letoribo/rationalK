RKTrello = {};

// RKTrello.Trello = Trello; -> done in collections.js

RKTrello.findAll = function () {
  return Trello.find({}, {sort: {score: -1}}).fetch();
};

RKTrello.findFullText = function (searchQuery) {
  return RKTrello.Trello.find( {
        $text: {
          $search: searchQuery,
        },
    }, {
        fields: { score: { $meta: 'textScore' } },
        sort: { score: { $meta: 'textScore' } },
        limit: 30,
    });
};

RKTrello.findDummy = function () {
  return Trello.find({$text: { $search: "somethingthatyouwillneverfind" }});
};
