(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/jesa:fieldtypes/package-i18n.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
TAPi18n.packages["jesa:fieldtypes"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"}; // 1
                                                                                                                  // 2
// define package's translation function (proxy to the i18next)                                                   // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                  // 4
// define the package's templates registrar                                                                       // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("jesa:fieldtypes");                                       // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                  // 8
// Record the list of templates prior to package load                                                             // 9
var _ = Package.underscore._;                                                                                     // 10
non_package_templates = _.keys(Template);                                                                         // 11
                                                                                                                  // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/jesa:fieldtypes/lib/hooks.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
RKCore.customFieldsType.push(                                                                                     // 1
  {                                                                                                               // 2
    value: "generateId",                                                                                          // 3
    text: "generateId",                                                                                           // 4
    function: "generateId",//not used                                                                             // 5
    packageExportName: "RKJESACustomFields", //not used                                                           // 6
    package: "jesa:fieldtypes",//not used                                                                         // 7
});                                                                                                               // 8
                                                                                                                  // 9
RKCore.customFieldsType.push(                                                                                     // 10
  {                                                                                                               // 11
    value: "ChooseFromList",                                                                                      // 12
    text: "ChooseFromList",                                                                                       // 13
    function: "ChooseFromList",//not used                                                                         // 14
    packageExportName: "RKJESACustomFields",//not used                                                            // 15
    package: "jesa:fieldtypes",//not used                                                                         // 16
});                                                                                                               // 17
                                                                                                                  // 18
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/jesa:fieldtypes/lib/client/customfieldtypes.js                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.methods({                                                                                                  // 1
	listAvailableFunctions: function () {                                                                            // 2
		listAvailableFunctions = [ //the value should match a function name also define in this file                    // 3
			{                                                                                                              // 4
				value: "generateId",                                                                                          // 5
				text: "generateId",                                                                                           // 6
			},                                                                                                             // 7
			{                                                                                                              // 8
				value: "ChooseFromList",                                                                                      // 9
				text: "ChooseFromList",                                                                                       // 10
			},                                                                                                             // 11
		];                                                                                                              // 12
		return listAvailableFunctions;                                                                                  // 13
	},                                                                                                               // 14
	generateId: function () {                                                                                        // 15
		var idFieldName;                                                                                                // 16
		var lastCharactersOfDocId = [];                                                                                 // 17
		var arrayLength;                                                                                                // 18
		var docId;                                                                                                      // 19
		var IdSubstring;                                                                                                // 20
		RKCore.log("Running custom function generateId for a company");                                                 // 21
		if ((document.getElementById("docEdit")) && (typeof(document.getElementById("docEdit")) !== 'undefined')) {     // 22
			idFieldName = "Report ID";                                                                                     // 23
			currentDocId = document.getElementById("docEdit").elements.namedItem(idFieldName).value;                       // 24
			if (!currentDocId) {                                                                                           // 25
				docType = document.getElementById("docEdit").elements.namedItem("Type").value;                                // 26
				if (docType === "") {                                                                                         // 27
					if (typeof(toastr) !== 'undefined') {                                                                        // 28
						toastr.error('I will not generate anything because you have not chosen yet the doc type');                  // 29
					}                                                                                                            // 30
					throw new Meteor.Error( 112, 'I will not generate anything because you have not chosen yet the doc type' );  // 31
				}                                                                                                             // 32
                                                                                                                  // 33
				Year = document.getElementById("docEdit").elements.namedItem("Year").value;                                   // 34
				categoryId = Categories.findOne({name: "ENG"})._id;                                                           // 35
				DocInThisCategory = Docs.find({categoryId: categoryId}).fetch();                                              // 36
                                                                                                                  // 37
                                                                                                                  // 38
				arrayLength = DocInThisCategory.length;                                                                       // 39
				RKCore.log("You have " + arrayLength + " documents in the ENG category");                                     // 40
                                                                                                                  // 41
				if (arrayLength === 0) {                                                                                      // 42
					newNumber = Year + "001";                                                                                    // 43
				}                                                                                                             // 44
				else {                                                                                                        // 45
					for (i = 0; i < arrayLength; i++) {                                                                          // 46
						RKCore.log(DocInThisCategory[i].fields[idFieldName]);                                                       // 47
						if (typeof(DocInThisCategory[i].fields[idFieldName]) !== 'undefined') {                                     // 48
							docId = DocInThisCategory[i].fields[idFieldName].value;                                                    // 49
							//Remove the first 2 caracteres that are doc type :                                                        // 50
							IdSubstring = docId.substring(2);                                                                          // 51
						}                                                                                                           // 52
						else {                                                                                                      // 53
							IdSubstring = Year + "000";                                                                                // 54
						}                                                                                                           // 55
						lastCharactersOfDocId.push(IdSubstring);                                                                    // 56
					}                                                                                                            // 57
					max = Math.max.apply(null, lastCharactersOfDocId);                                                           // 58
					newNumber = max + 1;                                                                                         // 59
				}                                                                                                             // 60
				document.getElementById("docEdit").elements.namedItem([idFieldName]).value = docType + newNumber;             // 61
			}                                                                                                              // 62
			else {                                                                                                         // 63
				if (typeof(toastr) !== 'undefined') {                                                                         // 64
					toastr.error('I will not generate anything because you have something in this field, please erase before.'); // 65
				}                                                                                                             // 66
			}                                                                                                              // 67
		}                                                                                                               // 68
		return true;                                                                                                    // 69
	},                                                                                                               // 70
	ChooseFromList: function () {                                                                                    // 71
		var docTypeFieldName = "Type";                                                                                  // 72
		var divHelperForType;                                                                                           // 73
		var a;                                                                                                          // 74
		var linkText;                                                                                                   // 75
		//remove the class so it is not clickable anymore :                                                             // 76
		document.getElementById("ChooseFromList").className = "";                                                       // 77
		divHelperForType = document.getElementById("helperForType");                                                    // 78
		a = document.createElement('a');                                                                                // 79
		linkText = document.createTextNode(" Instruction (IN) ");                                                       // 80
		a.appendChild(linkText);                                                                                        // 81
		a.title = "Click me";                                                                                           // 82
		a.class = "addAType";                                                                                           // 83
		a.href = "#";                                                                                                   // 84
		//a.dataset.whattoadd = "IN";                                                                                   // 85
		a.onclick = function (e) {                                                                                      // 86
			e.preventDefault();                                                                                            // 87
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "IN";                        // 88
		};                                                                                                              // 89
                                                                                                                  // 90
		divHelperForType.appendChild(a);                                                                                // 91
		a = document.createElement('a');                                                                                // 92
		linkText = document.createTextNode(" Test Report (TR) ");                                                       // 93
		a.appendChild(linkText);                                                                                        // 94
		a.title = "Click me";                                                                                           // 95
		a.class = "addAType";                                                                                           // 96
		a.href = "#";                                                                                                   // 97
		a.onclick = function (e) {                                                                                      // 98
			e.preventDefault();                                                                                            // 99
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "TR";                        // 100
		};                                                                                                              // 101
		divHelperForType.appendChild(a);                                                                                // 102
                                                                                                                  // 103
		divHelperForType.appendChild(a);                                                                                // 104
		a = document.createElement('a');                                                                                // 105
		linkText = document.createTextNode(" Base de donnée (DB) ");                                                    // 106
		a.appendChild(linkText);                                                                                        // 107
		a.title = "Click me";                                                                                           // 108
		a.class = "addAType";                                                                                           // 109
		a.href = "#";                                                                                                   // 110
		a.onclick = function (e) {                                                                                      // 111
			e.preventDefault();                                                                                            // 112
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "DB";                        // 113
		};                                                                                                              // 114
		divHelperForType.appendChild(a);                                                                                // 115
                                                                                                                  // 116
		divHelperForType.appendChild(a);                                                                                // 117
		a = document.createElement('a');                                                                                // 118
		linkText = document.createTextNode(" Calculation Report (CR) ");                                                // 119
		a.appendChild(linkText);                                                                                        // 120
		a.title = "Click me";                                                                                           // 121
		a.class = "addAType";                                                                                           // 122
		a.href = "#";                                                                                                   // 123
		a.onclick = function (e) {                                                                                      // 124
			e.preventDefault();                                                                                            // 125
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "CR";                        // 126
		};                                                                                                              // 127
		divHelperForType.appendChild(a);                                                                                // 128
                                                                                                                  // 129
		divHelperForType.appendChild(a);                                                                                // 130
		a = document.createElement('a');                                                                                // 131
		linkText = document.createTextNode(" Analysis Report (AR) ");                                                   // 132
		a.appendChild(linkText);                                                                                        // 133
		a.title = "Click me";                                                                                           // 134
		a.class = "addAType";                                                                                           // 135
		a.href = "#";                                                                                                   // 136
		a.onclick = function (e) {                                                                                      // 137
			e.preventDefault();                                                                                            // 138
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "AR";                        // 139
		};                                                                                                              // 140
		divHelperForType.appendChild(a);                                                                                // 141
                                                                                                                  // 142
		divHelperForType.appendChild(a);                                                                                // 143
		a = document.createElement('a');                                                                                // 144
		linkText = document.createTextNode(" Qualification Report (QR) ");                                              // 145
		a.appendChild(linkText);                                                                                        // 146
		a.title = "Click me";                                                                                           // 147
		a.class = "addAType";                                                                                           // 148
		a.href = "#";                                                                                                   // 149
		a.onclick = function (e) {                                                                                      // 150
			e.preventDefault();                                                                                            // 151
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "QR";                        // 152
		};                                                                                                              // 153
		divHelperForType.appendChild(a);                                                                                // 154
                                                                                                                  // 155
		divHelperForType.appendChild(a);                                                                                // 156
		a = document.createElement('a');                                                                                // 157
		linkText = document.createTextNode(" Notes Report (NR) ");                                                      // 158
		a.appendChild(linkText);                                                                                        // 159
		a.title = "Click me";                                                                                           // 160
		a.class = "addAType";                                                                                           // 161
		a.href = "#";                                                                                                   // 162
		a.onclick = function(e) {                                                                                       // 163
			e.preventDefault();                                                                                            // 164
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "NR";                        // 165
		};                                                                                                              // 166
		divHelperForType.appendChild(a);                                                                                // 167
                                                                                                                  // 168
		divHelperForType.appendChild(a);                                                                                // 169
		a = document.createElement('a');                                                                                // 170
		linkText = document.createTextNode(" Other Report (OR) ");                                                      // 171
		a.appendChild(linkText);                                                                                        // 172
		a.title = "Click me";                                                                                           // 173
		a.class = "addAType";                                                                                           // 174
		a.href = "#";                                                                                                   // 175
		a.onclick = function (e) {                                                                                      // 176
			e.preventDefault();                                                                                            // 177
			document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "OR";                        // 178
		};                                                                                                              // 179
		divHelperForType.appendChild(a);                                                                                // 180
                                                                                                                  // 181
		return false;                                                                                                   // 182
	},                                                                                                               // 183
});                                                                                                               // 184
                                                                                                                  // 185
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/jesa:fieldtypes/packages/jesa:fieldtypesi18n/en.i18n.js                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _ = Package.underscore._,                                                                                     // 1
    package_name = "jesa:fieldtypes",                                                                             // 2
    namespace = "jesa:fieldtypes";                                                                                // 3
                                                                                                                  // 4
if (package_name != "project") {                                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                         // 6
}                                                                                                                 // 7
// integrate the fallback language translations                                                                   // 8
translations = {};                                                                                                // 9
translations[namespace] = {"invitation_to_join_info_login":"Your username will be your company email."};          // 10
TAPi18n._loadLangFileObject("en", translations);                                                                  // 11
var package_templates = _.difference(_.keys(Template), non_package_templates);                                    // 12
                                                                                                                  // 13
for (var i = 0; i < package_templates.length; i++) {                                                              // 14
  var package_template = package_templates[i];                                                                    // 15
                                                                                                                  // 16
  registerI18nTemplate(package_template);                                                                         // 17
}                                                                                                                 // 18
                                                                                                                  // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/jesa:fieldtypes/packages/jesa:fieldtypesi18n/fr.i18n.js                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _ = Package.underscore._,                                                                                     // 1
    package_name = "jesa:fieldtypes",                                                                             // 2
    namespace = "jesa:fieldtypes";                                                                                // 3
                                                                                                                  // 4
if (package_name != "project") {                                                                                  // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                         // 6
}                                                                                                                 // 7
                                                                                                                  // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
