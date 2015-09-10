Package.describe({
  name: 'rationalk:core',
  summary: 'rationalK core libraries.',
  version: '0.0.1',
  git: 'https://github.com/dokithonon/rationalK',
});

Package.onUse(function (api) {
  var packages;
  api.versionsFrom("METEOR@1.0");

  packages = [
    'rationalk:lib@0.0.1',
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/router/config.js',
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/stylesheets/styles.css',
    'lib/client/templates/accessDenied.html',
    'lib/client/templates/externalLayout.html',
    'lib/client/templates/footer.html',
    'lib/client/templates/header.html',
    'lib/client/templates/headerExternal.html',
    'lib/client/templates/layout.html',
    'lib/client/templates/layout.js',
    'lib/client/templates/loginLayout.html',
    'lib/client/templates/loginLayout.js',
    'lib/client/templates/nav.html',
    'lib/client/templates/nav.js',
    'lib/client/templates/navExternal.html',
    'lib/client/templates/navExternal.js',
    'lib/client/templates/printLayout.html',
  ], 'client');

  api.addFiles([
    'lib/server/methods.js',
  ], 'server');
});
