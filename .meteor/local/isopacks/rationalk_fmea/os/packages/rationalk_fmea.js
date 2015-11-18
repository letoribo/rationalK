(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/package-i18n.js                                                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
TAPi18n.packages["rationalk:fmea"] = {"translation_function_name":"__","helper_name":"_","namespace":"rationalk:fmea"};
                                                                                                               // 2
// define package's translation function (proxy to the i18next)                                                // 3
__ = TAPi18n._getPackageI18nextProxy("rationalk:fmea");                                                        // 4
                                                                                                               // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/lib/methods.js                                                                      //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
RKFMEA = {};                                                                                                   // 1
RKFMEA.Collections = {};                                                                                       // 2
RKFMEA.Collections.corePFMEA = corePFMEA;                                                                      // 3
RKFMEA.corePFMEA = {};                                                                                         // 4
RKFMEA.coreDFMEA = {}; //no used                                                                               // 5
                                                                                                               // 6
Meteor.methods({                                                                                               // 7
	createCorePFMEALine: function () {                                                                            // 8
		corePFMEA.insert(                                                                                            // 9
			{                                                                                                           // 10
				processStepDesignation: "Turning",                                                                         // 11
				partType: "Inner Ring",                                                                                    // 12
				machineType: "CNC",                                                                                        // 13
			  potentialFailureMode: "The inner diameter is too small",                                                  // 14
				effectOfFailure: "Trash",                                                                                  // 15
				potentialCauseOfFailure: "Tool broken",                                                                    // 16
				currentDesignPrevention: "Maintenance programm",                                                           // 17
				currentDesignDetection: "SPC",                                                                             // 18
				S:6,                                                                                                       // 19
				D:2,                                                                                                       // 20
				O:3,                                                                                                       // 21
				full: "Turning Inner Ring CNC The inner diameter is too small Trash Tool broken Maintenance programm SPC", // 22
				searchResultFromCorePFMEA: true,                                                                           // 23
			}                                                                                                           // 24
		);                                                                                                           // 25
		if (typeof(toastr) !== 'undefined') {                                                                        // 26
			toastr.success('A new line has been added successfully');                                                   // 27
		}                                                                                                            // 28
	},                                                                                                            // 29
	deleteCorePFMEALine: function (lineId) {                                                                      // 30
		check(lineId, String);                                                                                       // 31
		corePFMEA.remove(                                                                                            // 32
			{                                                                                                           // 33
			  _id: lineId,                                                                                              // 34
			}                                                                                                           // 35
		);                                                                                                           // 36
		if (typeof(toastr) !== 'undefined') {                                                                        // 37
			toastr.success('Line deleted succesfully');                                                                 // 38
		}                                                                                                            // 39
	},                                                                                                            // 40
	updateCorePFMEALine: function (data) {                                                                        // 41
		var full = '';                                                                                               // 42
		check(data, Match.Any);                                                                                      // 43
		full = full.concat(data.processStepDesignation).concat(" ");                                                 // 44
		full = full.concat(data.partType).concat(" ");                                                               // 45
		full = full.concat(data.machineType).concat(" ");                                                            // 46
		full = full.concat(data.potentialFailureMode).concat(" ");                                                   // 47
		full = full.concat(data.effectOfFailure).concat(" ");                                                        // 48
		full = full.concat(data.potentialCauseOfFailure).concat(" ");                                                // 49
		full = full.concat(data.currentDesignPrevention).concat(" ");                                                // 50
		full = full.concat(data.currentDesignDetection).concat(" ");                                                 // 51
                                                                                                               // 52
		if (Meteor.settings.public.debug) {                                                                          // 53
			console.log("full : " + full);                                                                              // 54
		}                                                                                                            // 55
		corePFMEA.update(                                                                                            // 56
			{                                                                                                           // 57
			  $and: [                                                                                                   // 58
			  	{                                                                                                        // 59
						_id: data.lineId,                                                                                        // 60
					},                                                                                                        // 61
			  ],                                                                                                        // 62
			},                                                                                                          // 63
			{                                                                                                           // 64
					// stepNumber: data.stepNumber,                                                                           // 65
		      processStepDesignation: data.processStepDesignation,                                                   // 66
		      partType: data.partType,                                                                               // 67
		      machineType: data.machineType,                                                                         // 68
		      potentialFailureMode: data.potentialFailureMode,                                                       // 69
		      effectOfFailure: data.effectOfFailure,                                                                 // 70
		      S: data.S,                                                                                             // 71
		      specialCharacteristic: data.specialCharacteristic,                                                     // 72
		      potentialCauseOfFailure: data.potentialCauseOfFailure,                                                 // 73
		      currentDesignPrevention: data.currentDesignPrevention,                                                 // 74
		      O: data.O,                                                                                             // 75
		      currentDesignDetection: data.currentDesignDetection,                                                   // 76
		      D: data.D,                                                                                             // 77
					full: full,                                                                                               // 78
					searchResultFromCorePFMEA: true,                                                                          // 79
			},                                                                                                          // 80
			{                                                                                                           // 81
			    upsert: true,                                                                                           // 82
			}                                                                                                           // 83
		);                                                                                                           // 84
		if (typeof(toastr) !== 'undefined') {                                                                        // 85
			toastr.success('The line has been updated successfully');                                                   // 86
		}                                                                                                            // 87
	},                                                                                                            // 88
});                                                                                                            // 89
                                                                                                               // 90
RKFMEA.corePFMEA.findAll = function () {                                                                       // 91
  return corePFMEA.find({}, {sort: {score: -1}}).fetch();                                                      // 92
};                                                                                                             // 93
                                                                                                               // 94
RKFMEA.corePFMEA.findFullText = function (searchQuery) {                                                       // 95
  return corePFMEA.find( {                                                                                     // 96
        $text: {                                                                                               // 97
          $search: searchQuery,                                                                                // 98
        },                                                                                                     // 99
    }, {                                                                                                       // 100
        fields: { score: { $meta: 'textScore' } },                                                             // 101
        sort: { score: { $meta: 'textScore' } },                                                               // 102
        limit: 30,                                                                                             // 103
    });                                                                                                        // 104
};                                                                                                             // 105
                                                                                                               // 106
RKFMEA.corePFMEA.findDummy = function () {                                                                     // 107
  return corePFMEA.find({$text: { $search: "somethingthatyouwillneverfind" }});                                // 108
};                                                                                                             // 109
                                                                                                               // 110
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/lib/collections.js                                                                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
PFMEA = new Mongo.Collection('pfmea');                                                                         // 1
corePFMEA = new Mongo.Collection('corepfmea');                                                                 // 2
SettingsFMEA = new Mongo.Collection('settingsfmea');                                                           // 3
                                                                                                               // 4
PFMEA.allow( {                                                                                                 // 5
		insert: function (userId) {return !! userId; },                                                              // 6
		update: function (userId) {return !!userId; },                                                               // 7
    remove: function (userId) {return !!userId; },                                                             // 8
});                                                                                                            // 9
                                                                                                               // 10
corePFMEA.allow( {                                                                                             // 11
		insert: function (userId) {return !! userId; },                                                              // 12
		update: function (userId) {return !!userId; },                                                               // 13
    remove: function (userId) {return !!userId; },                                                             // 14
});                                                                                                            // 15
                                                                                                               // 16
SettingsFMEA.allow( {                                                                                          // 17
		insert: function (userId) {return !! userId; },                                                              // 18
		update: function (userId) {return !!userId; },                                                               // 19
    remove: function (userId) {return !!userId; },                                                             // 20
});                                                                                                            // 21
                                                                                                               // 22
if (Meteor.isServer) {                                                                                         // 23
	if (typeof corePFMEA.createIndex === 'function') {                                                            // 24
		corePFMEA.createIndex({ full: "text" }, { name: "TextIndex" });                                              // 25
	}                                                                                                             // 26
	else {                                                                                                        // 27
		if (typeof corePFMEA._ensureIndex === 'function') {                                                          // 28
			corePFMEA._ensureIndex( { full: "text" }, {name: "TextIndex"});                                             // 29
	}                                                                                                             // 30
}                                                                                                              // 31
} //end if Server                                                                                              // 32
                                                                                                               // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/lib/routes.js                                                                       //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
if (Meteor.settings.public.show.projects) {                                                                    // 1
  Router.route("/fmea/p/core", {                                                                               // 2
    name: "corePFMEA",                                                                                         // 3
    waitOn: function () {                                                                                      // 4
      return [                                                                                                 // 5
        Meteor.subscribe("corePFMEA"),                                                                         // 6
      ];                                                                                                       // 7
    },                                                                                                         // 8
  });                                                                                                          // 9
                                                                                                               // 10
  Router.route("/fmea/p/core/import", {                                                                        // 11
    name: "importCorePFMEA",                                                                                   // 12
  });                                                                                                          // 13
                                                                                                               // 14
  Router.route("/fmea/p/core/editLine/:_id", {                                                                 // 15
    name: "editPFMEALine",                                                                                     // 16
    data: function () {                                                                                        // 17
      return corePFMEA.findOne(this.params._id);                                                               // 18
    },                                                                                                         // 19
    waitOn: function () {                                                                                      // 20
      return [                                                                                                 // 21
        Meteor.subscribe("corePFMEALine", this.params._id),                                                    // 22
       ];                                                                                                      // 23
    },                                                                                                         // 24
  });                                                                                                          // 25
                                                                                                               // 26
                                                                                                               // 27
  Router.route("/fmea/settings", {                                                                             // 28
    name: "settingsFMEA",                                                                                      // 29
    waitOn: function () {                                                                                      // 30
      return [                                                                                                 // 31
        Meteor.subscribe("settingsfmea"),                                                                      // 32
       ];                                                                                                      // 33
    },                                                                                                         // 34
  });                                                                                                          // 35
                                                                                                               // 36
                                                                                                               // 37
  urlCorePFMEA = Router.routes.corePFMEA.path();                                                               // 38
  menuHTML = new Spacebars.SafeString(                                                                         // 39
     '<li role="separator" class="divider"></li>'                                                              // 40
      + '<li class="dropdown-header">FMEA</li>'                                                                // 41
      + '<li><a href="' + urlCorePFMEA + '" title="PFMEA">P-FMEA</a></li>'                                     // 42
      + '<li><a href="#" title="coming soon - DFMEA">D-FMEA</a></li>'                                          // 43
      + '<li role="separator" class="divider"></li>'                                                           // 44
  );                                                                                                           // 45
                                                                                                               // 46
  RKCore.packageMenu.push(                                                                                     // 47
    {                                                                                                          // 48
      "menuHTML": menuHTML,                                                                                    // 49
      "fromPackage": "rationalk:fmea",                                                                         // 50
    }                                                                                                          // 51
  );                                                                                                           // 52
}                                                                                                              // 53
                                                                                                               // 54
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/lib/server/publications.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Meteor.publish("corePFMEA", function () {                                                                      // 1
  return corePFMEA.find();                                                                                     // 2
});                                                                                                            // 3
                                                                                                               // 4
Meteor.publish("corePFMEALine", function (lineId) {                                                            // 5
  check(lineId, String);                                                                                       // 6
  return corePFMEA.find({                                                                                      // 7
    _id: lineId,                                                                                               // 8
  });                                                                                                          // 9
});                                                                                                            // 10
                                                                                                               // 11
Meteor.publish("settingsfmea", function () {                                                                   // 12
  return SettingsFMEA.find();                                                                                  // 13
});                                                                                                            // 14
                                                                                                               // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/lib/server/methods.js                                                               //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Meteor.methods({                                                                                               // 1
  clearCorePFMEA: function () {                                                                                // 2
    if (typeof(toastr) !== 'undefined') {                                                                      // 3
			toastr.success('The core PFMEA has been emptied');                                                          // 4
		}                                                                                                            // 5
    return corePFMEA.remove({});                                                                               // 6
  },                                                                                                           // 7
  importCorePFMEALine: function (row, headersOrder) {                                                          // 8
    var docId;                                                                                                 // 9
    var key;                                                                                                   // 10
    var user;                                                                                                  // 11
    var obj = {};                                                                                              // 12
    var full = "";                                                                                             // 13
    var columnNumberInRow;                                                                                     // 14
    var value;                                                                                                 // 15
    var documentDoesNotExists;                                                                                 // 16
    check(row, Match.Any);                                                                                     // 17
    check(headersOrder, Match.Any);                                                                            // 18
    user = Meteor.user();                                                                                      // 19
    if (!user) {                                                                                               // 20
      throw new Meteor.Error(401, "You need to login to update a row");                                        // 21
    }                                                                                                          // 22
    if (Meteor.settings.public.debug) {                                                                        // 23
      console.log(row);                                                                                        // 24
      console.log(headersOrder);                                                                               // 25
    }                                                                                                          // 26
                                                                                                               // 27
    for (key in headersOrder) {                                                                                // 28
      if (headersOrder.hasOwnProperty(key)) {                                                                  // 29
        if (Meteor.settings.public.debug) {                                                                    // 30
          console.log(key + " -> " + headersOrder[key]);                                                       // 31
        }                                                                                                      // 32
        columnNumberInRow = headersOrder[key];                                                                 // 33
        value = row[columnNumberInRow];                                                                        // 34
        obj[key] = value;                                                                                      // 35
        if (typeof(value) !== 'undefined') {                                                                   // 36
          full = full.concat(value).concat(" ");                                                               // 37
        }                                                                                                      // 38
      }                                                                                                        // 39
    }                                                                                                          // 40
                                                                                                               // 41
    obj.full = full;                                                                                           // 42
    obj.importDate = new Date();                                                                               // 43
    obj.importedBy = user._id;                                                                                 // 44
    obj.searchResultFromCorePFMEA = true;                                                                      // 45
                                                                                                               // 46
    if (Meteor.settings.public.debug) {                                                                        // 47
      console.log(obj);                                                                                        // 48
    }                                                                                                          // 49
                                                                                                               // 50
    if (                                                                                                       // 51
      corePFMEA.find({                                                                                         // 52
        full: full,                                                                                            // 53
      },                                                                                                       // 54
      {                                                                                                        // 55
        limit: 1,                                                                                              // 56
      }).count() === 0                                                                                         // 57
    ) {                                                                                                        // 58
      documentDoesNotExists = true;                                                                            // 59
    }                                                                                                          // 60
    else {                                                                                                     // 61
      documentDoesNotExists = false;                                                                           // 62
    }                                                                                                          // 63
                                                                                                               // 64
    if (Meteor.settings.public.debug) {                                                                        // 65
      console.log(documentDoesNotExists);                                                                      // 66
    }                                                                                                          // 67
                                                                                                               // 68
    if (documentDoesNotExists) {                                                                               // 69
      docId = corePFMEA.insert(obj);                                                                           // 70
      if (Meteor.settings.public.debug) {                                                                      // 71
        console.log("Row " + docId + " inserted in core PFMEA");                                               // 72
      }                                                                                                        // 73
    }                                                                                                          // 74
    else {                                                                                                     // 75
      if (Meteor.settings.public.debug) {                                                                      // 76
        console.log('Document already exists');                                                                // 77
      }                                                                                                        // 78
      docId = false;                                                                                           // 79
    }                                                                                                          // 80
    return docId;                                                                                              // 81
    // reindex the mongo (i dont know if this is useful...):                                                   // 82
    /*                                                                                                         // 83
    if (typeof Docs.reIndex === 'function'){                                                                   // 84
      console.log("Rebuilding the mongo index after batch import.")                                            // 85
      Docs.reIndex();                                                                                          // 86
    }                                                                                                          // 87
    */                                                                                                         // 88
  },                                                                                                           // 89
});                                                                                                            // 90
                                                                                                               // 91
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/packages/rationalk:fmeai18n/en.i18n.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "rationalk:fmea",                                                                           // 2
    namespace = "rationalk:fmea";                                                                              // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
// integrate the fallback language translations                                                                // 8
translations = {};                                                                                             // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};       // 10
TAPi18n._loadLangFileObject("en", translations);                                                               // 11
TAPi18n._registerServerTranslator("en", namespace);                                                            // 12
                                                                                                               // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/rationalk:fmea/packages/rationalk:fmeai18n/fr.i18n.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var _ = Package.underscore._,                                                                                  // 1
    package_name = "rationalk:fmea",                                                                           // 2
    namespace = "rationalk:fmea";                                                                              // 3
                                                                                                               // 4
if (package_name != "project") {                                                                               // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                      // 6
}                                                                                                              // 7
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                // 8
  TAPi18n.translations["fr"] = {};                                                                             // 9
}                                                                                                              // 10
                                                                                                               // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                     // 12
  TAPi18n.translations["fr"][namespace] = {};                                                                  // 13
}                                                                                                              // 14
                                                                                                               // 15
_.extend(TAPi18n.translations["fr"][namespace], {"Project Portfolio Management":"Gestion de portefeuille de projets"});
TAPi18n._registerServerTranslator("fr", namespace);                                                            // 17
                                                                                                               // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
