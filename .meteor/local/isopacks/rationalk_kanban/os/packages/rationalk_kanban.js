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
                                                                                                                   // 5
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
TAPi18n._registerServerTranslator("en", namespace);                                                                // 12
                                                                                                                   // 13
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
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                    // 8
  TAPi18n.translations["fr"] = {};                                                                                 // 9
}                                                                                                                  // 10
                                                                                                                   // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                         // 12
  TAPi18n.translations["fr"][namespace] = {};                                                                      // 13
}                                                                                                                  // 14
                                                                                                                   // 15
_.extend(TAPi18n.translations["fr"][namespace], {"Board":"Tableau"});                                              // 16
TAPi18n._registerServerTranslator("fr", namespace);                                                                // 17
                                                                                                                   // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
