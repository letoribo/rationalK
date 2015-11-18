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
var RKFilesContent, __, FilesContent, insertedId, translations;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/package-i18n.js                                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
TAPi18n.packages["rationalk:filecontent"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                          // 2
// define package's translation function (proxy to the i18next)                                           // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                          // 4
                                                                                                          // 5
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/lib/methods.js                                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
RKFilesContent = {};                                                                                      // 1
RKFilesContent.Collections =  {};                                                                         // 2
RKCore.searchResultsPackage.push(                                                                         // 3
  {                                                                                                       // 4
    name: "RKFilesContent", // a publication with the name : RKSheetConnector-searchResults should exists // 5
  }                                                                                                       // 6
);                                                                                                        // 7
                                                                                                          // 8
RKFilesContent.findAllFullTextSearch = function () {                                                      // 9
  return FilesContent.find({}, {sort: {score: -1}}).fetch();                                              // 10
};                                                                                                        // 11
                                                                                                          // 12
RKFilesContent.findFullText = function (searchQuery) {                                                    // 13
  var sr;                                                                                                 // 14
  sr = FilesContent.find(                                                                                 // 15
    {                                                                                                     // 16
      $text: {                                                                                            // 17
        $search: searchQuery,                                                                             // 18
      },                                                                                                  // 19
    },                                                                                                    // 20
    {                                                                                                     // 21
      fields: { score: { $meta: 'textScore' } },                                                          // 22
      sort: { score: { $meta: 'textScore' } },                                                            // 23
      limit: 30,                                                                                          // 24
    });                                                                                                   // 25
    RKCore.log("I am here FilesContent");                                                                 // 26
    RKCore.log(sr.fetch());                                                                               // 27
  return sr;                                                                                              // 28
};                                                                                                        // 29
                                                                                                          // 30
RKFilesContent.findDummy = function () {                                                                  // 31
  return FilesContent.find({$text: { $search: "somethingthatyouwillneverfind" }});                        // 32
};                                                                                                        // 33
                                                                                                          // 34
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/lib/collections.js                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
FilesContent = new Mongo.Collection('FilesContent');                                                      // 1
                                                                                                          // 2
FilesContent.allow( {                                                                                     // 3
		insert: function (userId) {return !! userId; },                                                         // 4
		update: function (userId) {return !!userId; },                                                          // 5
    remove: function (userId) {return !!userId; },                                                        // 6
});                                                                                                       // 7
                                                                                                          // 8
if (Meteor.isServer) {                                                                                    // 9
	if (typeof FilesContent.createIndex === 'function') {                                                    // 10
		FilesContent.createIndex({ text: "text" }, { name: "TextIndex" });                                      // 11
	}                                                                                                        // 12
	else {                                                                                                   // 13
		if (typeof FilesContent._ensureIndex === 'function') {                                                  // 14
			FilesContent._ensureIndex( { text: "text" }, {name: "TextIndex"});                                     // 15
		}                                                                                                       // 16
	}                                                                                                        // 17
}                                                                                                         // 18
                                                                                                          // 19
// Expose collections if needed :                                                                         // 20
//RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                               // 21
                                                                                                          // 22
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/lib/routes.js                                                           //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
if (Meteor.settings.public.show.filecontent) {                                                            // 1
                                                                                                          // 2
}                                                                                                         // 3
                                                                                                          // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/lib/server/publications.js                                              //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
                                                                                                          // 1
                                                                                                          // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/lib/server/textract.js                                                  //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var fs;                                                                                                   // 1
if (Meteor.isServer) {                                                                                    // 2
  fs = Npm.require("fs");                                                                                 // 3
                                                                                                          // 4
  Meteor.methods({                                                                                        // 5
	  removeFilesContent: function () {                                                                      // 6
		  FilesContent.remove({});                                                                              // 7
	  },                                                                                                     // 8
    indexFilesContent: function () {                                                                      // 9
      var stats = {};                                                                                     // 10
      var fileTree = [];                                                                                  // 11
      var fileContents;                                                                                   // 12
      var extension;                                                                                      // 13
      var walkPath;                                                                                       // 14
      var folders;                                                                                        // 15
      var serverFilename;                                                                                 // 16
      var allowedExtensions = ["doc", "docx"];                                                            // 17
      FilesContent.remove({});                                                                            // 18
      folders = FoldersToScan.find().fetch();                                                             // 19
      folders.forEach(function (folder) {                                                                 // 20
        if (folder.path !== "") {                                                                         // 21
          walkPath = folder.path;                                                                         // 22
          walkPath = walkPath.replace(/\/$/, ""); //removing trailing slash                               // 23
          fileTree = getFilesRecursive(walkPath);                                                         // 24
                                                                                                          // 25
					function getFilesRecursive (folder) {                                                                // 26
          	if (fs.existsSync(folder)) {                                                                   // 27
            	fileContents = fs.readdirSync(folder);                                                       // 28
            	fileTree = [];                                                                               // 29
            	fileContents.forEach(function (fileName) {                                                   // 30
              	stats = fs.lstatSync(folder + '/' + fileName);                                             // 31
              	serverFilename = folder + '\\' + fileName;                                                 // 32
              	serverFilename = serverFilename.replace(/\\/g, "/");                                       // 33
                                                                                                          // 34
                if (stats.isDirectory()) {                                                                // 35
									//this is a folder                                                                               // 36
                  fileTree.push({                                                                         // 37
										name: fileName,                                                                                 // 38
                    children: getFilesRecursive(folder + '/' + fileName),                                 // 39
                  });                                                                                     // 40
                }                                                                                         // 41
                else {                                                                                    // 42
                  // this is a file and not a folder                                                      // 43
                  fileTree.push({                                                                         // 44
										name: fileName,                                                                                 // 45
                  });                                                                                     // 46
                  extension = fileName.split('.').pop();                                                  // 47
                  if (allowedExtensions.indexOf(extension) > 0) {                                         // 48
										//do scan the file                                                                              // 49
										RKCore.log('do scan the file : ');                                                              // 50
										RKCore.log(serverFilename);                                                                     // 51
              			Meteor.call("indexSingleFileContent", serverFilename, function (error, results) {        // 52
											if (error) {                                                                                   // 53
												RKCore.log("error from the meteor call indexSingleFileContent : ");                           // 54
							  				RKCore.log(error);                                                                           // 55
                      }                                                                                   // 56
                      if (results){                                                                       // 57
							  				RKCore.log("results from the meteor call indexSingleFileContent : ");                        // 58
							  				RKCore.log(results);                                                                         // 59
											}                                                                                              // 60
                      if (results) {                                                                      // 61
												insertedId = FilesContent.insert({                                                            // 62
													filePath: results.filePath,                                                                  // 63
													text: results.text,                                                                          // 64
                          searchResultFromFileContent: true,                                              // 65
                        });                                                                               // 66
												RKCore.log("insertedId :");                                                                   // 67
												RKCore.log(insertedId);                                                                       // 68
                      }                                                                                   // 69
                    });                                                                                   // 70
                  } //end if allowed extensions                                                           // 71
                } // end of this is a file                                                                // 72
              });                                                                                         // 73
          }                                                                                               // 74
          else {                                                                                          // 75
						RKCore.log(folder + ' does NOT exists. I will skip this folder.');                                  // 76
            fileTree = false;                                                                             // 77
          }                                                                                               // 78
          return fileTree;                                                                                // 79
        }                                                                                                 // 80
      } //end if not empty                                                                                // 81
    }); // end loop over folders                                                                          // 82
    },                                                                                                    // 83
    'indexSingleFileContent': function indexSingleFileContent (filePath) {                                // 84
			var textract;                                                                                          // 85
			var textractAsync;                                                                                     // 86
			var obj = {};                                                                                          // 87
			check(filePath, String);                                                                               // 88
      textract = Meteor.npmRequire('textract');                                                           // 89
      textractAsync = Async.runSync(function (done) {                                                     // 90
        textract.fromFileWithPath(filePath, function (error, text ) {                                     // 91
					if (error) {                                                                                         // 92
						RKCore.log(error);                                                                                  // 93
					}                                                                                                    // 94
          if (text) {                                                                                     // 95
            RKCore.log(text);                                                                             // 96
          }                                                                                               // 97
                                                                                                          // 98
					done(error, text);                                                                                   // 99
        });                                                                                               // 100
      });                                                                                                 // 101
                                                                                                          // 102
  		RKCore.log("textractAsync.error : ");                                                                 // 103
  		RKCore.log(textractAsync.error);                                                                      // 104
  		RKCore.log("textractAsync.result : ");                                                                // 105
  		RKCore.log(textractAsync.result);                                                                     // 106
                                                                                                          // 107
      obj.filePath = filePath;                                                                            // 108
      obj.text = textractAsync.result;                                                                    // 109
      obj.error = textractAsync.error;                                                                    // 110
      obj.searchResultFromFileContent = true;                                                             // 111
                                                                                                          // 112
  		RKCore.log("obj:");                                                                                   // 113
  		RKCore.log(obj);                                                                                      // 114
                                                                                                          // 115
      return obj;                                                                                         // 116
    },                                                                                                    // 117
  });                                                                                                     // 118
                                                                                                          // 119
  if (Meteor.settings.scanFilesContent.do) {                                                              // 120
	  SyncedCron.add({                                                                                       // 121
		  name: 'Index files content',                                                                          // 122
		  schedule: function (parser) {                                                                         // 123
			return parser.text(Meteor.settings.scanFilesContent.interval);                                         // 124
		  },                                                                                                    // 125
			job: function () {                                                                                     // 126
		    Meteor.call("indexFilesContent", function (error, results) {                                        // 127
          if (error) {                                                                                    // 128
			     RKCore.log("error from the meteor call indexFilesContent in the cron : ");                        // 129
           RKCore.log(error);                                                                             // 130
          }                                                                                               // 131
          if (results) {                                                                                  // 132
            RKCore.log("results from the meteor call indexFilesContent in the cron: ");                   // 133
            RKCore.log(results);                                                                          // 134
          }                                                                                               // 135
		    });                                                                                                 // 136
		  },                                                                                                    // 137
		});                                                                                                     // 138
  }                                                                                                       // 139
} //end of if server check                                                                                // 140
                                                                                                          // 141
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/packages/rationalk:filecontenti18n/en.i18n.js                           //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "rationalk:filecontent",                                                               // 2
    namespace = "rationalk:filecontent";                                                                  // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
// integrate the fallback language translations                                                           // 8
translations = {};                                                                                        // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};  // 10
TAPi18n._loadLangFileObject("en", translations);                                                          // 11
TAPi18n._registerServerTranslator("en", namespace);                                                       // 12
                                                                                                          // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rationalk:filecontent/packages/rationalk:filecontenti18n/fr.i18n.js                           //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var _ = Package.underscore._,                                                                             // 1
    package_name = "rationalk:filecontent",                                                               // 2
    namespace = "rationalk:filecontent";                                                                  // 3
                                                                                                          // 4
if (package_name != "project") {                                                                          // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                 // 6
}                                                                                                         // 7
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                           // 8
  TAPi18n.translations["fr"] = {};                                                                        // 9
}                                                                                                         // 10
                                                                                                          // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                // 12
  TAPi18n.translations["fr"][namespace] = {};                                                             // 13
}                                                                                                         // 14
                                                                                                          // 15
_.extend(TAPi18n.translations["fr"][namespace], {"Files content":"Contenu des fichiers","Search score":"Score de recherche","Scan all files for their content":"Scanner le contenu de tous les fichiers","Reset files content database":"Remettre à zéro la base de donnée du contenu des fichiers"});
TAPi18n._registerServerTranslator("fr", namespace);                                                       // 17
                                                                                                          // 18
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:filecontent'] = {
  RKFilesContent: RKFilesContent
};

})();

//# sourceMappingURL=rationalk_filecontent.js.map
