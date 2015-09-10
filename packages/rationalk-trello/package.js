Package.describe({
  name: 'rationalk:trello',
  summary: 'Contains collections for the trello search functionality',
  version: '0.0.1',
  git: 'https://github.com/dokithonon/rationaK',
});

Package.onUse(function (api) {
  var packages;
  api.versionsFrom("METEOR@1.0");

  packages = [
    'rationalk:core@0.0.1',
  ];

  api.use(packages);

  api.addFiles([
    'lib/methods.js', //this load first
    'lib/collections.js', //this load second
    'lib/routes.js', //this load third
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/trello.html',
    'lib/client/trello.js',
    'lib/client/trelloCardInSearchResults.html',
    'lib/client/trelloCardInSearchResults.js',
    'lib/client/trelloSettings.html',
  ], 'client');

  api.addFiles([
    'lib/server/publications.js',
    'lib/server/trello.js',
  ], 'server');

  api.export([
    'RKTrello', //expose the collection
  ]);
});
