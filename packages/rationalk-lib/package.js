Package.describe({
  name: 'rationalk:lib',
  summary: 'rationalK third party libraries and global namespace.',
  version: '0.0.1',
  git: 'https://github.com/dokithonon/rationalK',
});

Package.onUse(function (api) {
  var packages;
  api.versionsFrom(['METEOR@1.0']);

  packages = [
    'meteor-platform',
    'accounts-password',
    'alanning:roles@1.2.13',
    'iron:router@1.0.9',
    'mizzao:jquery-ui@1.11.4',
    'mizzao:bootboxjs@4.4.0',
    'twbs:bootstrap@3.3.5',
    'sacha:spin@2.3.1',
    'pahans:reactive-modal@1.0.2',
    'email',
    'mrt:meteor-nodemailer@0.2.0',
    'momentjs:moment@2.10.6',
    'netanelgilad:moment-business@0.0.1',
    'ian:accounts-ui-bootstrap-3@1.2.77',
    'reactive-var',
    'aslagle:reactive-table@0.8.11',
    'cfs:standard-packages@0.5.9',
    'cfs:filesystem@0.1.2',
    'raix:ui-dropped-event@0.0.7',
    'cfs:ui@0.1.3',
    'ajduke:bootstrap-tagsinput@0.7.0',
    'jquery',
    'aldeed:autoform@5.4.1',
    'aldeed:collection2@2.3.3',
    'matb33:collection-hooks@0.7.14',
    'maazalik:highcharts@0.4.0',
    'percolate:synced-cron@1.2.1',
    'chrismbeckett:toastr@2.1.2_1',
    'meteorhacks:zones@1.6.0',
    'meteorhacks:async@1.0.0',
    'gadicohen:messageformat@0.0.52',
    'olragon:handsontable@0.12.3',
    'chhib:mongodb-uri@0.9.1',
    'tap:i18n@1.5.1',
    'anti:i18n@0.4.3',
    'joshowens:accounts-entry@1.0.3',
    'cwaring:modernizr@3.0.0_1',
    'dschulz:jquery-qrcode@1.0.1',
    'sergeyt:typeahead@0.11.1_3',
    'pascoual:pdfjs@1.1.114',
    'netanelgilad:excel@0.2.4',
    'peerlibrary:xml2js@0.4.8_1',
    'audit-argument-checks',
    'dhtmlx:gantt@0.0.1',
    'meteorhacks:npm@1.4.0',
    'npm-container',
    'ongoworks:speakingurl@5.0.1',
    'mousetrap:mousetrap@1.4.6_1',
    'lowi:audit-trail@1.0.1',
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/core.js',
  ], ['client', 'server']);

  api.export([
    'rationalK',
  ]);
});
