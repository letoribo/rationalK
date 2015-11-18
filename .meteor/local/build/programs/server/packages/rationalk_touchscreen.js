(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RKCore = Package['rationalk:core'].RKCore;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var rationalK = Package['rationalk:lib'].rationalK;
var Roles = Package['alanning:roles'].Roles;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Email = Package.email.Email;
var Nodemailer = Package['mrt:meteor-nodemailer'].Nodemailer;
var moment = Package['momentjs:moment'].moment;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveTable = Package['aslagle:reactive-table'].ReactiveTable;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var SyncedCron = Package['percolate:synced-cron'].SyncedCron;
var Zones = Package['meteorhacks:zones'].Zones;
var Async = Package['meteorhacks:async'].Async;
var mfPkg = Package['gadicohen:messageformat'].mfPkg;
var mf = Package['gadicohen:messageformat'].mf;
var MongoDBURI = Package['chhib:mongodb-uri'].MongoDBURI;
var i18n = Package['anti:i18n'].i18n;
var AccountsEntry = Package['joshowens:accounts-entry'].AccountsEntry;
var PDFJS = Package['pascoual:pdfjs'].PDFJS;
var Excel = Package['netanelgilad:excel'].Excel;
var xml2js = Package['peerlibrary:xml2js'].xml2js;
var getSlug = Package['ongoworks:speakingurl'].getSlug;
var Mousetrap = Package['mousetrap:mousetrap'].Mousetrap;
var webshot = Package['bryanmorgan:webshot'].webshot;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package.livedata.DDP;
var DDPServer = Package.livedata.DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var Accounts = Package['accounts-base'].Accounts;
var Iron = Package['iron:core'].Iron;
var FS = Package['cfs:base-package'].FS;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var RKTouchScreen, __, ProjectsTouchScreen, SettingsRKTouchScreen, phasesHeader, phaseScheduledFinishedDate, randomDate, translations;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/package-i18n.js                                                        //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
TAPi18n.packages["rationalk:touchscreen"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                         // 2
// define package's translation function (proxy to the i18next)                                          // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                         // 4
                                                                                                         // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/methods.js                                                         //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
RKTouchScreen = {};                                                                                      // 1
RKTouchScreen.Collections = {};                                                                          // 2
                                                                                                         // 3
Meteor.methods({                                                                                         // 4
                                                                                                         // 5
});                                                                                                      // 6
                                                                                                         // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/collections.js                                                     //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
ProjectsTouchScreen = new Mongo.Collection('projectstouchscreen');                                       // 1
SettingsRKTouchScreen = new Mongo.Collection('settingsrktouchscreen');                                   // 2
                                                                                                         // 3
ProjectsTouchScreen.allow( {                                                                             // 4
		insert: function (userId) {return !! userId; },                                                        // 5
		update: function (userId) {return !!userId; },                                                         // 6
    remove: function (userId) {return !!userId; },                                                       // 7
});                                                                                                      // 8
                                                                                                         // 9
SettingsRKTouchScreen.allow( {                                                                           // 10
		insert: function (userId) {return !! userId; },                                                        // 11
		update: function (userId) {return !!userId; },                                                         // 12
    remove: function (userId) {return !!userId; },                                                       // 13
});                                                                                                      // 14
                                                                                                         // 15
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/routes.js                                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
if (Meteor.settings.public.show.touchscreen) {                                                           // 1
  Router.route("/projectsTouchScreen", {                                                                 // 2
    name: "viewProjectsTouchScreen",                                                                     // 3
    waitOn: function () {                                                                                // 4
      Meteor.subscribe("projectstouchscreen");                                                           // 5
      return [Meteor.subscribe("members")];                                                              // 6
    },                                                                                                   // 7
  });                                                                                                    // 8
}                                                                                                        // 9
                                                                                                         // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/server/publications.js                                             //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Meteor.publish("projectstouchscreen", function () {                                                      // 1
  return ProjectsTouchScreen.find();                                                                     // 2
});                                                                                                      // 3
                                                                                                         // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/server/methods.js                                                  //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Meteor.methods({                                                                                         // 1
	resetDemoData: function () {                                                                            // 2
		var project = {};                                                                                      // 3
		var nPhases;                                                                                           // 4
		var phases = [];                                                                                       // 5
		var phase = {};                                                                                        // 6
		var i;                                                                                                 // 7
		ProjectsTouchScreen.remove({});                                                                        // 8
                                                                                                         // 9
		phasesHeader = ["phase 1", "phase 2"];                                                                 // 10
                                                                                                         // 11
		nPhases = phasesHeader.length;                                                                         // 12
                                                                                                         // 13
                                                                                                         // 14
			phase = {                                                                                             // 15
				phaseName: phasesHeader[0],                                                                          // 16
				phaseScheduledFinishedDate: moment().format("DD.MM.YYYY"),                                           // 17
			};                                                                                                    // 18
			phases.push(phase);                                                                                   // 19
			phaseScheduledFinishedDate = moment().businessAdd(2, 'days');                                         // 20
			phase = {                                                                                             // 21
				phaseName: phasesHeader[1],                                                                          // 22
				phaseScheduledFinishedDate: moment(phaseScheduledFinishedDate).format("DD.MM.YYYY"),                 // 23
			};                                                                                                    // 24
			phases.push(phase);                                                                                   // 25
                                                                                                         // 26
		project = {                                                                                            // 27
			projectId: "1459",                                                                                    // 28
			projectName: "projectA",                                                                              // 29
			phases: phases,                                                                                       // 30
		};                                                                                                     // 31
		phases = [];                                                                                           // 32
		ProjectsTouchScreen.insert(project);                                                                   // 33
                                                                                                         // 34
		randomDate = Math.floor((Math.random() * 20) + 1) + ".11.2015";                                        // 35
		RKCore.log(randomDate);                                                                                // 36
		phase = {                                                                                              // 37
			phaseName: phasesHeader[0],                                                                           // 38
			phaseScheduledFinishedDate: moment(randomDate, "DD.MM.YYYY").format("DD.MM.YYYY"),                    // 39
		};                                                                                                     // 40
		phases.push(phase);                                                                                    // 41
		phaseScheduledFinishedDate = moment(randomDate, "DD.MM.YYYY").businessAdd(2, 'days');                  // 42
		phase = {                                                                                              // 43
			phaseName: phasesHeader[1],                                                                           // 44
			phaseScheduledFinishedDate: moment(phaseScheduledFinishedDate).format("DD.MM.YYYY"),                  // 45
		};                                                                                                     // 46
		phases.push(phase);                                                                                    // 47
                                                                                                         // 48
		project = {                                                                                            // 49
			projectId: "1457",                                                                                    // 50
			projectName: "projectB",                                                                              // 51
			phases: phases,                                                                                       // 52
		};                                                                                                     // 53
		phases = [];                                                                                           // 54
		ProjectsTouchScreen.insert(project);                                                                   // 55
		return true;                                                                                           // 56
	},                                                                                                      // 57
	markPhaseAsDone: function (data) {                                                                      // 58
		RKCore.log(data);                                                                                      // 59
		return true;                                                                                           // 60
	},                                                                                                      // 61
});                                                                                                      // 62
                                                                                                         // 63
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/lib/server/backup.js                                                   //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
RKCore.packageBackup.push(                                                                               // 1
  {                                                                                                      // 2
    "collections": ["projectstouchscreen"],                                                              // 3
    "fromPackage": "rationalk:touchscreen",                                                              // 4
  }                                                                                                      // 5
);                                                                                                       // 6
                                                                                                         // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/packages/rationalk:touchscreeni18n/en.i18n.js                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
var _ = Package.underscore._,                                                                            // 1
    package_name = "rationalk:touchscreen",                                                              // 2
    namespace = "rationalk:touchscreen";                                                                 // 3
                                                                                                         // 4
if (package_name != "project") {                                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                // 6
}                                                                                                        // 7
// integrate the fallback language translations                                                          // 8
translations = {};                                                                                       // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."}; // 10
TAPi18n._loadLangFileObject("en", translations);                                                         // 11
TAPi18n._registerServerTranslator("en", namespace);                                                      // 12
                                                                                                         // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/rationalk:touchscreen/packages/rationalk:touchscreeni18n/fr.i18n.js                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
var _ = Package.underscore._,                                                                            // 1
    package_name = "rationalk:touchscreen",                                                              // 2
    namespace = "rationalk:touchscreen";                                                                 // 3
                                                                                                         // 4
if (package_name != "project") {                                                                         // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                // 6
}                                                                                                        // 7
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                          // 8
  TAPi18n.translations["fr"] = {};                                                                       // 9
}                                                                                                        // 10
                                                                                                         // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                               // 12
  TAPi18n.translations["fr"][namespace] = {};                                                            // 13
}                                                                                                        // 14
                                                                                                         // 15
_.extend(TAPi18n.translations["fr"][namespace], {"The task has been updated successfully":"Tâche mise à jour avec succés","Scheduled start date":"Date de début prévisionelle","Effective start date":"Date de départ réelle","Scheduled end date":"Date de fin prévisionelle","Effective end date":"Date de fin réelle","Realized":"Realisé","Percentage Done":"% realisé","Percentage done":"% realisé","The task is still open":"La tâche est encore ouverte","Tasks":"Tâches","See all minutes for this project":"Voir tous les PV pour ce projet","Task reminder":"Rappel d'une tâche","Task content":"Contenu de la tâche","Send a reminder to the author at 8am on the scheduled end date":"Envoyer un rappel à l'auteur à 8 heures à la date de fin prévue","Send a reminder to the actionee at 8am on the scheduled end date":"Envoyer un rappel aux réalisateurs à 8 heures à la date de fin prévue","Show task in gantt":"Montrer cette tâche dans le gantt","Closed by":"Clôturée par","Update gantt":"Mettre à jour le gantt","Create a new task":"Créer une nouvelle tâche","View all tasks":"Voir toutes les tâches","Nothing to show for the moment":"Rien à afficher pour le moment","Filter by":"Filtrer par","Show realized tasks":"Montrer également les tâches déjà réalisées","project":"projet","projects":"projet(s)","Projects":"Projets","All projects":"Tous les projets","All actionees":"Tous les réalisateurs enregistrés","Author":"Auteur","author":"auteur","actionee":"réalisateur enregistré","Actionee":"Réalisateur(s)","Content":"Contenu","Added Date":"Date de création","Tags":"Mots clés","Added date":"Date de création","Yes":"Oui","No":"Non","On condition":"Sous réserve","Edit Task":"Modifier une tâche","Back to tasks list":"Retour à la liste des tâches","Additional text":"Informations complémentaires","Mark as done":"Marquer comme terminée","A new task has been added successfully":"Tâche ajoutée avec succés","Task deleted succesfully":"Tâche supprimée avec succès","Task marked as done":"Tâche terminée","comma":"virgule","dot":"point","semicoma":"point virgule","tab":"tabulation","With quotes":"Avec guillemets","Exported csv":"Données exportées au format csv à copier coller dans excel","Include in minutes":"Inclure dans le procés verbal","Minutes-20151028":"PV-28102015","Minutes":"PV","Back to minutes list":"Retour à la liste des PV","minutes":"PV","All minutes":"Tous les PV","Quick table import":"Import rapide de tâches","The tasks have been imported successfully":"Les tâches ont été importées avec succès","Location":"Lieu","Date":"Date","Recipients":"Distribution","Attendees":"Présent(s)","Objective":"Objectif(s)","Name":"Nom","Text":"Texte","Save and go back to minutes list":"Sauver et retourner à la liste des PV","Task":"Tâche","New tasks":"Nouvelles tâches","Linked tasks":"Tâche(s) liée(s)","Other informations":"Autres informations","The task has been duplicated successfully. Please edit the task and save.":"La tâche a été dupliquée, vous pouvez maintenant l'éditer et la sauver","Tasks details":"Détails des tâches","Create a new project":"Créer un projet","ID":"Nr","Project name":"Nom du projet","Project(s)":"Projet(s)","Project description":"Description du projet","Project deleted succesfully":"Projet supprimé avec succés","Edit project":"Modifier un projet","project manager":"chef de projet","Project manager":"Chef de projet","Back to projects list":"Retour à la liste des projets","Save and go back to projects list":"Sauver et retourner à la liste des projets","Project number":"Numéro de projet","Linked minutes":"PV lié(s) à ce projet","Linked task(s)":"Tâche(s) liée(s) à ce projet","The project has been updated successfully":"Le projet à été mis à jour avec succés","The project has been duplicated successfully. Please edit and save.":"Le projet a été dupliqué avec succés. Vous pouvez maintenant le modifier.","Are you sure you want to delete this project ?":"Etes-vous sûr de vouloir supprimer ce projet ?","Minutes name":"Nom du PV","Minutes title":"Titre du PV","Are you sure you want to delete this task ?":"Etes-vous sûr de vouloir supprimer cette tâche ?","Are you sure you want to delete this minutes ?":"Etes-vous sûr de vouloir supprimer ce PV ?","Add a task to this project":"Ajouter une tâche à ce projet","Add minutes to this project":"Ecrire un PV pour ce projet","Others projects":"Autre(s) projet(s)","Others minutes":"Autre(s) PV","View all minutes":"Tous les PV","View minutes that I wrote":"Les PV que j'ai écris","Create a new minutes":"Ecrire un PV","Print":"Imprimer","View tasks that I wrote":"Les tâches que j'ai écrites","Save and go back to tasks list":"Sauver et retourner à la liste des tâches","If you add actionees, you will be able to filter by actionee":"Ajouter des réalisateurs aux tâches pour pouvoir filtrer par réalisateur","Show follow-up":"Voir le follow-up","My tasks":"Mes tâches","It looks that you have no open tasks !":"Vous n'avez aucune tâche ouverte !","You are receiving this email because you have been listed as an actionee for this task by":"Vous recevez cet email car vous avez été listé comme réalisateur de cette tâche par","You are receiving this email because you are author of this task":"Vous recevez cet email car vous êtes auteur de cette tâche","Prefix for minutes name":"Prefixe pour les noms des PV","Path to save minutes as pdf":"Dossier (server) où enregistrer les minutes en pdf","No trailing slash /":"Pas de slash / de fin","Save as a pdf file to predefined server location":"Enregistrer en pdf sur le server (endroit prédéfini)","The minutes has been saved to":"Le PV a été sauvegardé sous","Other projects":"Autres projets"});
TAPi18n._registerServerTranslator("fr", namespace);                                                      // 17
                                                                                                         // 18
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:touchscreen'] = {
  RKTouchScreen: RKTouchScreen
};

})();

//# sourceMappingURL=rationalk_touchscreen.js.map
