(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:kanban/package-i18n.js                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
TAPi18n.packages["rationalk:kanban"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"}; // 1
                                                                                                                   // 2
// define package's translation function (proxy to the i18next)                                                    // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                   // 4
// define the package's templates registrar                                                                        // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("rationalk:kanban");                                       // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                   // 8
// Record the list of templates prior to package load                                                              // 9
var _ = Package.underscore._;                                                                                      // 10
non_package_templates = _.keys(Template);                                                                          // 11
                                                                                                                   // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:kanban/lib/routes.js                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
if (Meteor.settings.public.show.kanban) {                                                                          // 1
  Router.route("/board", {                                                                                         // 2
    name: "board",                                                                                                 // 3
    waitOn: function () {                                                                                          // 4
      return [                                                                                                     // 5
        Meteor.subscribe('Types'),                                                                                 // 6
        Meteor.subscribe('Attributes'),                                                                            // 7
      ];                                                                                                           // 8
    },                                                                                                             // 9
  });                                                                                                              // 10
  Router.route("/typeDefinition", {                                                                                // 11
    name: "typeDefinition",                                                                                        // 12
    waitOn: function () {                                                                                          // 13
      return [                                                                                                     // 14
        Meteor.subscribe('Types'),                                                                                 // 15
        Meteor.subscribe('Attributes'),                                                                            // 16
      ];                                                                                                           // 17
    },                                                                                                             // 18
  });                                                                                                              // 19
                                                                                                                   // 20
                                                                                                                   // 21
}                                                                                                                  // 22
                                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:kanban/packages/rationalk:kanbani18n/en.i18n.js                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "rationalk:kanban",                                                                             // 2
    namespace = "rationalk:kanban";                                                                                // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
// integrate the fallback language translations                                                                    // 8
translations = {};                                                                                                 // 9
translations[namespace] = {};                                                                                      // 10
TAPi18n._loadLangFileObject("en", translations);                                                                   // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                                     // 12
                                                                                                                   // 13
for (var i = 0; i < package_templates.length; i++) {                                                               // 14
  var package_template = package_templates[i];                                                                     // 15
                                                                                                                   // 16
  registerI18nTemplate(package_template);                                                                          // 17
}                                                                                                                  // 18
                                                                                                                   // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rationalk:kanban/packages/rationalk:kanbani18n/fr.i18n.js                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _ = Package.underscore._,                                                                                      // 1
    package_name = "rationalk:kanban",                                                                             // 2
    namespace = "rationalk:kanban";                                                                                // 3
                                                                                                                   // 4
if (package_name != "project") {                                                                                   // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                          // 6
}                                                                                                                  // 7
                                                                                                                   // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
