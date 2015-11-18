(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/package-i18n.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
TAPi18n.packages["rationalk:sheetconnector"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};
                                                                                                                       // 2
// define package's translation function (proxy to the i18next)                                                        // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                       // 4
                                                                                                                       // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/lib/methods.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RKSheetConnector = {};                                                                                                 // 1
RKSheetConnector.Collections =  {};                                                                                    // 2
RKCore.searchResultsPackage.push(                                                                                      // 3
  {                                                                                                                    // 4
    name: "RKSheetConnector", // a publication with the name : RKSheetConnector-searchResults should exists            // 5
  }                                                                                                                    // 6
);                                                                                                                     // 7
                                                                                                                       // 8
RKSheetConnector.findAllFullTextSearch = function () {                                                                 // 9
  return External.find({}, {sort: {score: -1}}).fetch();                                                               // 10
};                                                                                                                     // 11
                                                                                                                       // 12
RKSheetConnector.findFullText = function (searchQuery) {                                                               // 13
  var sr;                                                                                                              // 14
  sr = External.find(                                                                                                  // 15
    {                                                                                                                  // 16
      $text: {                                                                                                         // 17
        $search: searchQuery,                                                                                          // 18
      },                                                                                                               // 19
    },                                                                                                                 // 20
    {                                                                                                                  // 21
        fields: { score: { $meta: 'textScore' } },                                                                     // 22
        sort: { score: { $meta: 'textScore' } },                                                                       // 23
        limit: 30,                                                                                                     // 24
    });                                                                                                                // 25
  return sr;                                                                                                           // 26
};                                                                                                                     // 27
                                                                                                                       // 28
RKSheetConnector.findDummy = function () {                                                                             // 29
  return External.find({$text: { $search: "somethingthatyouwillneverfind" }});                                         // 30
};                                                                                                                     // 31
                                                                                                                       // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/lib/collections.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
External = new Mongo.Collection('external');                                                                           // 1
                                                                                                                       // 2
External.allow( {                                                                                                      // 3
		insert: function (userId) {return !! userId; },                                                                      // 4
		update: function (userId) {return !!userId; },                                                                       // 5
    remove: function (userId) {return !!userId; },                                                                     // 6
});                                                                                                                    // 7
                                                                                                                       // 8
if (Meteor.isServer) {                                                                                                 // 9
	if (typeof External.createIndex === 'function') {                                                                     // 10
		External.createIndex({ "$**": "text" }, { name: "TextIndex" });                                                      // 11
	}                                                                                                                     // 12
	else {                                                                                                                // 13
		if (typeof External._ensureIndex === 'function') {                                                                   // 14
			External._ensureIndex({ "$**": "text" }, { name: "TextIndex" });                                                    // 15
		}                                                                                                                    // 16
	}                                                                                                                     // 17
}                                                                                                                      // 18
                                                                                                                       // 19
// Expose collections if needed :                                                                                      // 20
//RKWiki.Collections.WikiSearchResults = WikiSearchResults;                                                            // 21
                                                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/lib/routes.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Meteor.settings.public.show.sheetconnector) {                                                                      // 1
  Router.route("/external/:externalDocId?", {                                                                          // 2
    name: "external",                                                                                                  // 3
    layoutTemplate: 'externalLayout',                                                                                  // 4
    waitOn: function () {                                                                                              // 5
      if (typeof Session.get("externalDocId") === 'undefined') {                                                       // 6
        Session.set("externalDocId", "");                                                                              // 7
      }                                                                                                                // 8
      return [                                                                                                         // 9
        Meteor.subscribe("external", Session.get('externalDocId')),                                                    // 10
      ];                                                                                                               // 11
    },                                                                                                                 // 12
  });                                                                                                                  // 13
}                                                                                                                      // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/lib/server/publications.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.publish("external", function (externalDocId) {                                                                  // 1
  check(externalDocId, String);                                                                                        // 2
  return External.find(                                                                                                // 3
    {                                                                                                                  // 4
      'externalDocId': externalDocId,                                                                                  // 5
    },                                                                                                                 // 6
    {                                                                                                                  // 7
      fields: {                                                                                                        // 8
        'externalDocId': 0,                                                                                            // 9
        'searchResultFromSheet': 0,                                                                                    // 10
        'full': 0,                                                                                                     // 11
        'headers': 0,                                                                                                  // 12
        'content': 0,                                                                                                  // 13
      },                                                                                                               // 14
    });                                                                                                                // 15
});                                                                                                                    // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/lib/server/excel.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Help                                                                                                                // 1
// Define in settings.json :                                                                                           // 2
/*                                                                                                                     // 3
"external":{                                                                                                           // 4
  "22IN06" :                                                                                                           // 5
  {                                                                                                                    // 6
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",                                            // 7
    "sheet_name" : "Liste_graisses",                                                                                   // 8
    "table_begin_address_row" : "3",                                                                                   // 9
    "table_end_address_row" : "431",                                                                                   // 10
    "filter_col" : "AZ",                                                                                               // 11
    "filter_on" : "Yes",                                                                                               // 12
    "cols_to_display" : ["AU","AV","AW","AX","AY"]                                                                     // 13
  }                                                                                                                    // 14
}                                                                                                                      // 15
                                                                                                                       // 16
or if you want to display all lines:                                                                                   // 17
                                                                                                                       // 18
"external":{                                                                                                           // 19
  "22IN06" :                                                                                                           // 20
  {                                                                                                                    // 21
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",                                            // 22
    "sheet_name" : "Liste_graisses",                                                                                   // 23
    "table_begin_address_row" : "3",                                                                                   // 24
    "table_end_address_row" : "431",                                                                                   // 25
    "cols_to_display" : ["AU","AV","AW","AX","AY"]                                                                     // 26
  }                                                                                                                    // 27
}                                                                                                                      // 28
                                                                                                                       // 29
"external":{                                                                                                           // 30
  "22IN06" :                                                                                                           // 31
  {                                                                                                                    // 32
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",                                            // 33
    "sheet_name" : "Liste_graisses",                                                                                   // 34
    "table_begin_address_row" : "3",                                                                                   // 35
    "table_end_address_row" : "431",                                                                                   // 36
    "cols_to_display" : ["AU-AW","AX","AY"]                                                                            // 37
  }                                                                                                                    // 38
}                                                                                                                      // 39
                                                                                                                       // 40
*/                                                                                                                     // 41
function unfixCol (cstr) {                                                                                             // 42
  return cstr.replace(/^\$([A-Z])/, "$1");                                                                             // 43
}                                                                                                                      // 44
function decodeCol (colstr) {                                                                                          // 45
  var c = unfixCol(colstr);                                                                                            // 46
  var d = 0;                                                                                                           // 47
  var i = 0;                                                                                                           // 48
  for (; i !== c.length; ++i) d = 26 * d + c.charCodeAt(i) - 64;                                                       // 49
  return d - 1;                                                                                                        // 50
}                                                                                                                      // 51
                                                                                                                       // 52
                                                                                                                       // 53
Meteor.methods({                                                                                                       // 54
  updateExcel: function (externalDocId) {                                                                              // 55
    var sourceFile;                                                                                                    // 56
    var excel = new Excel('xlsx');                                                                                     // 57
    var sourceFileSettings;                                                                                            // 58
    var sheetName;                                                                                                     // 59
    var tableBeginAddressRow;                                                                                          // 60
    var tableEndAddressRow;                                                                                            // 61
    var filterOn;                                                                                                      // 62
    var filterCol;                                                                                                     // 63
    var colsToDisplayLetter;                                                                                           // 64
    var colsToDisplay = [];                                                                                            // 65
    var arrayLength;                                                                                                   // 66
    var l = 0;                                                                                                         // 67
    var i;                                                                                                             // 68
    var j;                                                                                                             // 69
    var colsToDisplayLetterArraySplitted;                                                                              // 70
    var colsToDisplayLetterBegin;                                                                                      // 71
    var colsToDisplayLetterEnd;                                                                                        // 72
    var colsToDisplayBegin;                                                                                            // 73
    var colsToDisplayEnd;                                                                                              // 74
    var tableBeginAddressCol;                                                                                          // 75
    var tableEndAddressCol;                                                                                            // 76
    var range;                                                                                                         // 77
    var R;                                                                                                             // 78
    var obj = {};                                                                                                      // 79
    var filter;                                                                                                        // 80
    var full;                                                                                                          // 81
    var headers;                                                                                                       // 82
    var content;                                                                                                       // 83
    var C;                                                                                                             // 84
    var v;                                                                                                             // 85
    var header;                                                                                                        // 86
    var cellAddress;                                                                                                   // 87
    check(externalDocId, String);                                                                                      // 88
    External.remove({externalDocId: externalDocId});                                                                   // 89
                                                                                                                       // 90
    if (Meteor.settings.external[externalDocId]) {                                                                     // 91
      sourceFileSettings = Meteor.settings.external[externalDocId];                                                    // 92
      RKCore.log(sourceFileSettings);                                                                                  // 93
      sourceFile = sourceFileSettings.sourceFile;                                                                      // 94
      RKCore.log("Source Excel file : " + sourceFile);                                                                 // 95
      workbook = excel.readFile(sourceFile);                                                                           // 96
      sheetName = sourceFileSettings.sheet_name;                                                                       // 97
      tableBeginAddressRow = sourceFileSettings.table_begin_address_row;                                               // 98
      tableEndAddressRow = sourceFileSettings.table_end_address_row;                                                   // 99
                                                                                                                       // 100
      if (typeof(sourceFileSettings.filter_on) !== 'undefined') {                                                      // 101
        filterOn = sourceFileSettings.filter_on;                                                                       // 102
        filterCol = sourceFileSettings.filter_col;                                                                     // 103
        filterCol = decodeCol(filterCol);                                                                              // 104
      }                                                                                                                // 105
      else {                                                                                                           // 106
        filterOn = "display";                                                                                          // 107
      }                                                                                                                // 108
                                                                                                                       // 109
      colsToDisplayLetter = sourceFileSettings.cols_to_display;                                                        // 110
      ws = workbook.Sheets[sheetName];                                                                                 // 111
                                                                                                                       // 112
      arrayLength = colsToDisplayLetter.length;                                                                        // 113
      for (i = 0; i < arrayLength; i++) {                                                                              // 114
        //exemple si col to display letter is "B-D" -> "B" "C" "D"                                                     // 115
        if (colsToDisplayLetter[i].indexOf("-") >= 0) {                                                                // 116
            colsToDisplayLetterArraySplitted = colsToDisplayLetter[i].split("-");                                      // 117
            colsToDisplayLetterBegin = colsToDisplayLetterArraySplitted[0];                                            // 118
            colsToDisplayLetterEnd = colsToDisplayLetterArraySplitted[1];                                              // 119
            colsToDisplayBegin = decodeCol(colsToDisplayLetterBegin);                                                  // 120
            colsToDisplayEnd = decodeCol(colsToDisplayLetterEnd);                                                      // 121
            for (j = colsToDisplayBegin; j <= colsToDisplayEnd; j++) {                                                 // 122
              colsToDisplay[l] = j;                                                                                    // 123
              l = l + 1;                                                                                               // 124
            }                                                                                                          // 125
        }                                                                                                              // 126
        else {                                                                                                         // 127
          colsToDisplay[l] = decodeCol(colsToDisplayLetter[i]);                                                        // 128
          l = l + 1;                                                                                                   // 129
        }                                                                                                              // 130
      }                                                                                                                // 131
                                                                                                                       // 132
      RKCore.log("colsToDisplay : ");                                                                                  // 133
      RKCore.log(colsToDisplay);                                                                                       // 134
                                                                                                                       // 135
      tableBeginAddressCol = Math.min.apply(Math, colsToDisplay);                                                      // 136
      tableEndAddressCol = Math.max.apply(Math, colsToDisplay);                                                        // 137
                                                                                                                       // 138
      range = {                                                                                                        // 139
        s:                                                                                                             // 140
          {                                                                                                            // 141
            c: tableBeginAddressCol,                                                                                   // 142
            r: tableBeginAddressRow - 1,                                                                               // 143
          },                                                                                                           // 144
        e:                                                                                                             // 145
          {                                                                                                            // 146
            c: tableEndAddressCol,                                                                                     // 147
            r: tableEndAddressRow - 1,                                                                                 // 148
          },                                                                                                           // 149
      };                                                                                                               // 150
      //RKCore.log("Your table is in the range (in the 0-index format): ")                                             // 151
      //RKCore.log(range);                                                                                             // 152
                                                                                                                       // 153
      for (R = range.s.r + 1; R <= range.e.r; ++R) {                                                                   // 154
        obj = {};                                                                                                      // 155
                                                                                                                       // 156
        filterCellAddress = {c: filterCol, r: R};                                                                      // 157
        filter = '';                                                                                                   // 158
        if (typeof(ws[excel.utils.encode_cell(filterCellAddress)]) !== 'undefined') {                                  // 159
          filter = ws[excel.utils.encode_cell(filterCellAddress)].v;                                                   // 160
          //RKCore.log("The value in the filter column :")                                                             // 161
          //RKCore.log(filter)                                                                                         // 162
        }                                                                                                              // 163
                                                                                                                       // 164
        if (typeof(sourceFileSettings.filter_on) === 'undefined') {                                                    // 165
            //the user has not set any filter                                                                          // 166
            filter = "display";                                                                                        // 167
            //by doing the next if will be always true because "display" do always contains the text "display"         // 168
        }                                                                                                              // 169
                                                                                                                       // 170
        if (filter.toString().indexOf(filterOn) >= 0) {                                                                // 171
          //add to db                                                                                                  // 172
          //RKCore.log("I will log this line");                                                                        // 173
          full = "";                                                                                                   // 174
          headers = [];                                                                                                // 175
          content = [];                                                                                                // 176
          for (C = range.s.c; C <= range.e.c; ++C) {                                                                   // 177
            //RKCore.log("cols_to_display :");                                                                         // 178
            //RKCore.log(cols_to_display);                                                                             // 179
            if (colsToDisplay.indexOf(C) >= 0) {                                                                       // 180
              headerCellAddress = {c: C, r: tableBeginAddressRow - 1}; // headers are in the first row of the table 0-index
              header = new Spacebars.SafeString(ws[excel.utils.encode_cell(headerCellAddress)].v.split('.').join("")); // 182
                                                                                                                       // 183
              cellAddress = {c: C, r: R};                                                                              // 184
              //RKCore.log(excel.utils.encode_cell(cellAddress));                                                      // 185
              if (typeof(ws[excel.utils.encode_cell(cellAddress)]) !== 'undefined') {                                  // 186
                //RKCore.log(ws[excel.utils.encode_cell(cellAddress)].v);                                              // 187
                v = ws[excel.utils.encode_cell(cellAddress)].v;                                                        // 188
                full = full.concat(v).concat(" ");                                                                     // 189
              }                                                                                                        // 190
              else {                                                                                                   // 191
                v = '';                                                                                                // 192
              }                                                                                                        // 193
              obj[header] = v;                                                                                         // 194
              headers.push({headerName: header.string});                                                               // 195
              content.push({headerName: header.string, value: v});                                                     // 196
            }                                                                                                          // 197
          } //end loop over col                                                                                        // 198
          obj.externalDocId = externalDocId;                                                                           // 199
          obj.full = full;                                                                                             // 200
          obj.headers = headers;                                                                                       // 201
          obj.content = content;                                                                                       // 202
          obj.searchResultFromSheet = true;                                                                            // 203
          // insert the line                                                                                           // 204
          External.insert(obj);                                                                                        // 205
        }                                                                                                              // 206
        else {                                                                                                         // 207
          //skip this row                                                                                              // 208
          RKCore.log('I will skip the row : ' + R + ' because it does not contains :' + filterOn);                     // 209
        }                                                                                                              // 210
      }// end loop over rows                                                                                           // 211
    } //end if settings                                                                                                // 212
    else {                                                                                                             // 213
      RKCore.log("Please define file settings in settings.json");                                                      // 214
    }                                                                                                                  // 215
  },                                                                                                                   // 216
});                                                                                                                    // 217
                                                                                                                       // 218
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/packages/rationalk:sheetconnectori18n/en.i18n.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "rationalk:sheetconnector",                                                                         // 2
    namespace = "rationalk:sheetconnector";                                                                            // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
// integrate the fallback language translations                                                                        // 8
translations = {};                                                                                                     // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};               // 10
TAPi18n._loadLangFileObject("en", translations);                                                                       // 11
TAPi18n._registerServerTranslator("en", namespace);                                                                    // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:sheetconnector/packages/rationalk:sheetconnectori18n/fr.i18n.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "rationalk:sheetconnector",                                                                         // 2
    namespace = "rationalk:sheetconnector";                                                                            // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                        // 8
  TAPi18n.translations["fr"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                             // 12
  TAPi18n.translations["fr"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["fr"][namespace], {"External sheet":"Tableur externe","Search score":"Score de recherche"});
TAPi18n._registerServerTranslator("fr", namespace);                                                                    // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
