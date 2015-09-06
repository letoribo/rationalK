Package.describe({
  name: 'lowi:audit-trail',
  summary: 'Audit Trail',
  version: '1.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['iron:router', 'matb33:collection-hooks', 'reactive-var', 'underscore']);

  api.use(['tap:i18n', 'aslagle:reactive-table@0.8.9']);
  api.use(['templating'], 'client');

  api.use(['mongo', 'alanning:roles'], ['client', 'server']);
  api.use(['minimongo', 'mongo-livedata', 'templating', 'spacebars', 'ui'], 'client');

  api.addFiles(['audit-methods/audit-methods-log.js'], 'server');
  api.addFiles(['audit-methods/audit-methods.html'], 'client');
  api.addFiles(['audit-methods/audit-methods.js'], 'client');

  api.addFiles(['audit-router.js'], ['client', 'server']);

  if (api.export) {
    api.export('AuditTrail');
  }
});
