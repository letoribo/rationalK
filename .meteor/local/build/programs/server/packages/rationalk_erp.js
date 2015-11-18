(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var RKCore = Package['rationalk:core'].RKCore;
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
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
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
var RKERP, Production, urlPlan, urlStocks, menuHTML, ressourceName;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/methods.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RKERP = {};                                                                                                           // 1
                                                                                                                      // 2
                                                                                                                      // 3
Meteor.methods({                                                                                                      // 4
		addNeedToThisProduct: function (productId,dataset) {                                                                // 5
			check(productId, String);                                                                                          // 6
			check(dataset, Match.Any);                                                                                         // 7
		console.log("Product Id : "+productId);                                                                             // 8
		console.log("dataset : ");                                                                                          // 9
		console.log(dataset);                                                                                               // 10
		var productName = dataset.productname;                                                                              // 11
   	    var productionStep = dataset.productionstep;                                                                  // 12
		var productQty = Number(dataset.productqty);                                                                        // 13
		console.log('the need : ');                                                                                         // 14
		console.log(productName)                                                                                            // 15
		console.log(productionStep)                                                                                         // 16
		console.log(productQty)                                                                                             // 17
		// Create the needed product if it does not exist yet                                                               // 18
		Production.update(                                                                                                  // 19
			{                                                                                                                  // 20
			  $and: [                                                                                                          // 21
			  	{productName: productName}                                                                                      // 22
			  ]                                                                                                                // 23
			},                                                                                                                 // 24
			{ $set: { productName: productName} }                                                                              // 25
			,                                                                                                                  // 26
			{                                                                                                                  // 27
			    upsert: true                                                                                                   // 28
			}                                                                                                                  // 29
		);                                                                                                                  // 30
		// Get the id of the needed product (Balls) :                                                                       // 31
		var neededProductId = Production.findOne({productName: productName})._id;                                           // 32
                                                                                                                      // 33
                                                                                                                      // 34
		var needs = Production.findOne(productId).needs;                                                                    // 35
                                                                                                                      // 36
                                                                                                                      // 37
		if (typeof needs !== "undefined" && needs !== null) {                                                               // 38
			console.log("Needs before removing :");                                                                            // 39
			console.log(needs);                                                                                                // 40
			var needsArrayLength = needs.length;                                                                               // 41
			for (var j = 0; j < needsArrayLength; j++) {                                                                       // 42
				console.log("current existing need :");                                                                           // 43
				console.log(needs[j].productName);                                                                                // 44
				console.log(needs[j].productQty);                                                                                 // 45
				console.log(needs[j].productionStep);                                                                             // 46
				if (                                                                                                              // 47
					(productName == needs[j].productName) &&                                                                         // 48
					(neededProductId == needs[j].productId) &&                                                                       // 49
					(productionStep == needs[j].productionStep)                                                                      // 50
					)                                                                                                                // 51
					{                                                                                                                // 52
						var arrayElementToRemove = j;                                                                                   // 53
						console.log('We need to remove/update the element : '+ j);                                                      // 54
						console.log("Needs after removing :");                                                                          // 55
						needs.splice(arrayElementToRemove, 1);                                                                          // 56
						console.log(needs);                                                                                             // 57
						//exit the loop :                                                                                               // 58
						j=needsArrayLength+1;                                                                                           // 59
				} else {                                                                                                          // 60
					console.log("This need does not match.");                                                                        // 61
				}                                                                                                                 // 62
			}                                                                                                                  // 63
			Production.update(                                                                                                 // 64
				{                                                                                                                 // 65
				  $and: [                                                                                                         // 66
				  	{_id: productId}                                                                                               // 67
				  ]                                                                                                               // 68
				},                                                                                                                // 69
				{                                                                                                                 // 70
				    $set: {needs: needs}                                                                                          // 71
				}                                                                                                                 // 72
			);                                                                                                                 // 73
		} // end if have needs                                                                                              // 74
                                                                                                                      // 75
                                                                                                                      // 76
                                                                                                                      // 77
		Production.update(                                                                                                  // 78
			{                                                                                                                  // 79
			  $and: [                                                                                                          // 80
			  	{_id: productId},                                                                                               // 81
			  ]                                                                                                                // 82
			},                                                                                                                 // 83
			{                                                                                                                  // 84
			    $push: { needs : {parentProductId:productId,productName:productName,productionStep:productionStep,productQty:productQty,productId:neededProductId} }
			},                                                                                                                 // 86
			{                                                                                                                  // 87
			    upsert: true                                                                                                   // 88
			}                                                                                                                  // 89
		);                                                                                                                  // 90
		var needs = Production.findOne(productId).needs;                                                                    // 91
		console.log("Needs after updating :");                                                                              // 92
		console.log(needs);                                                                                                 // 93
		if (typeof toastr !== "undefined"){                                                                                 // 94
			toastr.success('The product need has been updated successfully');                                                  // 95
		}                                                                                                                   // 96
	},                                                                                                                   // 97
	deleteThisNeed: function (dataset) {                                                                                 // 98
		check(dataset, Match.Any);                                                                                          // 99
		//dataset : {parentproductid: "zzLmwhnteDGEmmDxD", productname: "Cage", neededqty: "1", productionstep: "Assembly"} // 100
		var productId = dataset.parentproductid;                                                                            // 101
		var needs = Production.findOne(productId).needs;                                                                    // 102
		console.log(needs);                                                                                                 // 103
		var needsArrayLength = needs.length;                                                                                // 104
		for (var j = 0; j < needsArrayLength; j++) {                                                                        // 105
			var needProductName = dataset.productname;                                                                         // 106
			var needProductionStep = dataset.productionstep;                                                                   // 107
			var neededQty = dataset.neededqty;                                                                                 // 108
			if (                                                                                                               // 109
				(needProductName == needs[j].productName) &&                                                                      // 110
				(neededQty == needs[j].productQty) &&                                                                             // 111
				(needProductionStep == needs[j].productionStep)                                                                   // 112
				){                                                                                                                // 113
				var arrayElementToRemove = j;                                                                                     // 114
			}                                                                                                                  // 115
		}                                                                                                                   // 116
                                                                                                                      // 117
		needs.splice(arrayElementToRemove, 1);                                                                              // 118
		console.log(needs);                                                                                                 // 119
                                                                                                                      // 120
		Production.update(                                                                                                  // 121
			{                                                                                                                  // 122
			  $and: [                                                                                                          // 123
			  	{_id: productId}                                                                                                // 124
			  ]                                                                                                                // 125
			},                                                                                                                 // 126
			{                                                                                                                  // 127
			    $set: {needs: needs}                                                                                           // 128
			}                                                                                                                  // 129
		);                                                                                                                  // 130
		if (typeof toastr !== "undefined"){                                                                                 // 131
			toastr.success('This product need has deleted');                                                                   // 132
		}                                                                                                                   // 133
	},                                                                                                                   // 134
	planProduction: function (dataset) {                                                                                 // 135
		check(dataset, Match.Any); //#todo                                                                                  // 136
		var productName = dataset.productName;                                                                              // 137
		var productQty=dataset.productQty;                                                                                  // 138
		var startDate = dataset.startDate;                                                                                  // 139
		var productionStep = dataset.productionStep;                                                                        // 140
		var ressource = dataset.ressource;                                                                                  // 141
		var duration = dataset.duration;                                                                                    // 142
                                                                                                                      // 143
		Production.update(                                                                                                  // 144
			{                                                                                                                  // 145
			  $and: [                                                                                                          // 146
			  	{productName: productName}                                                                                      // 147
			  ]                                                                                                                // 148
			},                                                                                                                 // 149
			{                                                                                                                  // 150
			    $set: {productName: productName},                                                                              // 151
			    $push: {                                                                                                       // 152
						planning:{                                                                                                      // 153
							productQty: Number(productQty),                                                                                // 154
							startDate:startDate,                                                                                           // 155
							productionStep:productionStep,                                                                                 // 156
							ressource:ressource,                                                                                           // 157
							duration:duration,                                                                                             // 158
						}                                                                                                               // 159
					}                                                                                                                // 160
			},                                                                                                                 // 161
			{                                                                                                                  // 162
			    upsert: true                                                                                                   // 163
			}                                                                                                                  // 164
		);                                                                                                                  // 165
		if (typeof toastr !== "undefined"){                                                                                 // 166
			toastr.success('The planning for this product has been updated successfully');                                     // 167
		}                                                                                                                   // 168
	},                                                                                                                   // 169
	deleteProduction: function (dataset) {                                                                               // 170
		check(dataset, Match.Any); //#todo                                                                                  // 171
		if (Meteor.settings.public.debug){                                                                                  // 172
			console.log("Deleting production matching : ");                                                                    // 173
			console.log(dataset);                                                                                              // 174
		}                                                                                                                   // 175
		var productId = dataset.productid; //que des miniscules dans le dataset                                             // 176
	    var productName = dataset.productname;                                                                           // 177
		var productionStep = dataset.productionstep;                                                                        // 178
	    var startDate = dataset.startdate;                                                                               // 179
	    var plannedQty = dataset.plannedqty;                                                                             // 180
                                                                                                                      // 181
                                                                                                                      // 182
		var productPlanning = Production.findOne(productId).planning;                                                       // 183
		if (Meteor.settings.public.debug){                                                                                  // 184
			console.log(productPlanning);                                                                                      // 185
		}                                                                                                                   // 186
		var productPlanningArrayLength = productPlanning.length;                                                            // 187
		for (var j = 0; j < productPlanningArrayLength; j++) {                                                              // 188
			if (Meteor.settings.public.debug){                                                                                 // 189
				console.log("Current planning entry : ");                                                                         // 190
				console.log(productPlanning[j].productQty);                                                                       // 191
				console.log(productPlanning[j].productionStep);                                                                   // 192
				console.log(productPlanning[j].startDate);                                                                        // 193
			}                                                                                                                  // 194
			if (                                                                                                               // 195
				(plannedQty == productPlanning[j].productQty) &&                                                                  // 196
				(productionStep == productPlanning[j].productionStep) &&                                                          // 197
				(startDate == productPlanning[j].startDate)                                                                       // 198
				)                                                                                                                 // 199
				{                                                                                                                 // 200
					if (Meteor.settings.public.debug){                                                                               // 201
						console.log("Remove : "+j)                                                                                      // 202
					}                                                                                                                // 203
					var arrayElementToRemove = j;                                                                                    // 204
					productPlanning.splice(arrayElementToRemove, 1);                                                                 // 205
					if (Meteor.settings.public.debug){                                                                               // 206
						console.log("After removing, the planning looks like : "+j)                                                     // 207
						console.log(productPlanning);                                                                                   // 208
					}                                                                                                                // 209
			}                                                                                                                  // 210
		}                                                                                                                   // 211
		Production.update(                                                                                                  // 212
					{                                                                                                                // 213
					  $and: [                                                                                                        // 214
					  	{_id: productId}                                                                                              // 215
					  ]                                                                                                              // 216
					},                                                                                                               // 217
					{                                                                                                                // 218
					    $set: {planning: productPlanning}                                                                            // 219
					}                                                                                                                // 220
		);                                                                                                                  // 221
		if (typeof toastr !== "undefined"){                                                                                 // 222
			toastr.success('This event has been deleted');                                                                     // 223
		}                                                                                                                   // 224
                                                                                                                      // 225
                                                                                                                      // 226
                                                                                                                      // 227
	},                                                                                                                   // 228
	addToStock: function (productName,productQty) {                                                                      // 229
		check(productName, String);                                                                                         // 230
		check(productQty, Number);                                                                                          // 231
		if (Meteor.settings.public.debug) {                                                                                 // 232
			console.log(productQty);                                                                                           // 233
		}                                                                                                                   // 234
		Production.update(                                                                                                  // 235
			{                                                                                                                  // 236
			  $and: [                                                                                                          // 237
			  	{productName: productName}                                                                                      // 238
			  ]                                                                                                                // 239
			},                                                                                                                 // 240
			{                                                                                                                  // 241
			    $inc: { productQty: Number(productQty) },                                                                      // 242
			    $set: { productName : productName }                                                                            // 243
			},                                                                                                                 // 244
			{                                                                                                                  // 245
			    upsert: true                                                                                                   // 246
			}                                                                                                                  // 247
		);                                                                                                                  // 248
		if (typeof toastr !== "undefined"){                                                                                 // 249
			toastr.success('The stock has been updated successfully');                                                         // 250
		}                                                                                                                   // 251
	},                                                                                                                   // 252
	deleteProduct: function (productId) {                                                                                // 253
		check(productId, String);                                                                                           // 254
		var productName = Production.findOne(productId).productName;                                                        // 255
                                                                                                                      // 256
		//check if the product is not used in another product :                                                             // 257
		var allProducts = Production.find({}).fetch();                                                                      // 258
		var arrayLength = allProducts.length;                                                                               // 259
		var neededIn= "";                                                                                                   // 260
		var neededSomewhere=false;                                                                                          // 261
		for (var i = 0; i < arrayLength; i++) {                                                                             // 262
			var needs = allProducts[i].needs;                                                                                  // 263
			var parentProductName = allProducts[i].productName                                                                 // 264
			if (typeof needs !== "undefined") {                                                                                // 265
				var needsArrayLength = needs.length;                                                                              // 266
				for (var j = 0; j < needsArrayLength; j++) {                                                                      // 267
					if (productName== needs[j].productName){                                                                         // 268
						neededIn=neededIn + ((neededIn =="") ? "" : ", ") + parentProductName;                                          // 269
						neededSomewhere=true;                                                                                           // 270
					}                                                                                                                // 271
				}                                                                                                                 // 272
			}                                                                                                                  // 273
		}                                                                                                                   // 274
                                                                                                                      // 275
		//check if the product is not planned                                                                               // 276
		var planning = Production.findOne(productId).planning;                                                              // 277
		var plannedSomewhen=false;                                                                                          // 278
		if (typeof planning !== "undefined"){                                                                               // 279
			if (planning.length>0){                                                                                            // 280
				plannedSomewhen=true;                                                                                             // 281
			}                                                                                                                  // 282
		}                                                                                                                   // 283
                                                                                                                      // 284
                                                                                                                      // 285
		if (neededSomewhere==true){                                                                                         // 286
			if (typeof toastr !== "undefined"){                                                                                // 287
				toastr.error(productName +' cannot be deleted since it used in : '+neededIn);                                     // 288
			}                                                                                                                  // 289
		}                                                                                                                   // 290
		else if (plannedSomewhen==true){                                                                                    // 291
			if (typeof toastr !== "undefined"){                                                                                // 292
				toastr.error(productName +' cannot be deleted since it is a production is planned');                              // 293
			}                                                                                                                  // 294
		}                                                                                                                   // 295
		else {                                                                                                              // 296
			if (Meteor.settings.public.debug){                                                                                 // 297
				console.log("remove : "+productId);                                                                               // 298
			}                                                                                                                  // 299
			Production.remove({_id:productId});                                                                                // 300
			if (typeof toastr !== "undefined"){                                                                                // 301
				toastr.success(productName + ' has been deleted');                                                                // 302
			}                                                                                                                  // 303
		}                                                                                                                   // 304
	}                                                                                                                    // 305
});                                                                                                                   // 306
                                                                                                                      // 307
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/collections.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Production = new Mongo.Collection('production');                                                                      // 1
                                                                                                                      // 2
Production.allow( {                                                                                                   // 3
		insert: function (userId) {return !! userId; },                                                                     // 4
		update: function (userId) {return !!userId; },                                                                      // 5
    remove: function (userId) {return !!userId; },                                                                    // 6
});                                                                                                                   // 7
                                                                                                                      // 8
//expose it to the other packages :                                                                                   // 9
RKERP.Production = Production;                                                                                        // 10
                                                                                                                      // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/routes.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
if (Meteor.settings.public.show.erp) {                                                                                // 1
  Router.route("/erp/stocks", {                                                                                       // 2
    name: "stocks",                                                                                                   // 3
    waitOn: function () {                                                                                             // 4
      return [Meteor.subscribe("production")];                                                                        // 5
    },                                                                                                                // 6
  });                                                                                                                 // 7
                                                                                                                      // 8
  Router.route("/erp/plan", {                                                                                         // 9
    name: "plan",                                                                                                     // 10
    waitOn: function () {                                                                                             // 11
      return [                                                                                                        // 12
        Meteor.subscribe("production"),                                                                               // 13
        //Meteor.subscribe("ressourcePlanningPublished"),                                                             // 14
      ];                                                                                                              // 15
    },                                                                                                                // 16
  });                                                                                                                 // 17
                                                                                                                      // 18
  Router.route("/erp/product/:_id", {                                                                                 // 19
    name: "build",                                                                                                    // 20
    data: function () {                                                                                               // 21
      return Production.findOne(this.params._id);                                                                     // 22
    },                                                                                                                // 23
    waitOn: function () {                                                                                             // 24
      return [Meteor.subscribe("production")];                                                                        // 25
    },                                                                                                                // 26
  });                                                                                                                 // 27
                                                                                                                      // 28
                                                                                                                      // 29
  urlPlan = Router.routes.plan.path();                                                                                // 30
  urlStocks = Router.routes.stocks.path();                                                                            // 31
  menuHTML = new Spacebars.SafeString(                                                                                // 32
     '<li role="separator" class="divider"></li>'                                                                     // 33
      + '<li class="dropdown-header">ERP</li>'                                                                        // 34
      + '<li><a href="' + urlPlan + '" title="Plan">Plan</a></li>'                                                    // 35
      + '<li><a href="' + urlStocks + '" title="Stocks">Stocks</a></li>'                                              // 36
      + '<li role="separator" class="divider"></li>'                                                                  // 37
  );                                                                                                                  // 38
                                                                                                                      // 39
  RKCore.packageMenu.push(                                                                                            // 40
    {                                                                                                                 // 41
      "menuHTML": menuHTML,                                                                                           // 42
      "fromPackage": "rationalk:fmea",                                                                                // 43
    }                                                                                                                 // 44
  );                                                                                                                  // 45
                                                                                                                      // 46
}                                                                                                                     // 47
                                                                                                                      // 48
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/server/publications.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('ressourcePlanningPublished', function () {                                                            // 1
  var self = this;                                                                                                    // 2
  var result = Meteor.call('createRessourcePlanning');                                                                // 3
  self.added('ressourceplanning', Random.id(), result);                                                               // 4
  self.ready();                                                                                                       // 5
});                                                                                                                   // 6
                                                                                                                      // 7
Meteor.publish("production", function () {                                                                            // 8
  return Production.find();                                                                                           // 9
});                                                                                                                   // 10
                                                                                                                      // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/server/methods.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 1
                                                                                                                      // 2
	Meteor.methods({                                                                                                     // 3
  	createRessourcePlanning: function () {                                                                             // 4
			var Products;                                                                                                      // 5
			var nProducts;                                                                                                     // 6
			var ressourcesNames = [];                                                                                          // 7
			var Ressources = [];                                                                                               // 8
			var l = 0;                                                                                                         // 9
			var i;                                                                                                             // 10
			var j;                                                                                                             // 11
			var planning;                                                                                                      // 12
			var planningArrayLength;                                                                                           // 13
			var productId;                                                                                                     // 14
			var productName;                                                                                                   // 15
			var startDate;                                                                                                     // 16
			var productionStep;                                                                                                // 17
			var ressource;                                                                                                     // 18
			var duration;                                                                                                      // 19
                                                                                                                      // 20
			if (Meteor.settings.public.debug) {                                                                                // 21
				console.log("Entering the server method createRessourcePlanning...");                                             // 22
			}                                                                                                                  // 23
      Products = Production.find({}).fetch();                                                                         // 24
  		nProducts = Products.length;                                                                                      // 25
			if (Meteor.settings.public.debug) {                                                                                // 26
				console.log("You have : " +  nProducts + " products in your erp.");                                               // 27
			}                                                                                                                  // 28
                                                                                                                      // 29
  		for (i = 0; i < nProducts; i++) {                                                                                 // 30
  			planning = Products[i].planning;                                                                                 // 31
  			if (typeof planning !== "undefined") {                                                                           // 32
  				planningArrayLength = planning.length;                                                                          // 33
  				for (j = 0; j < planningArrayLength; j++) {                                                                     // 34
  					if (typeof planning[j].ressource !== "undefined") {                                                            // 35
  						if (ressourcesNames.indexOf(planning[j].ressource) === -1) {                                                  // 36
  							ressourceName = planning[j].ressource;                                                                       // 37
  							ressourcesNames[l] = ressourceName;                                                                          // 38
  							l = l + 1;                                                                                                   // 39
  							Ressources[ressourceName] = [];                                                                              // 40
  						}                                                                                                             // 41
  					}                                                                                                              // 42
  				}                                                                                                               // 43
  			}                                                                                                                // 44
  		}                                                                                                                 // 45
                                                                                                                      // 46
  		for (i = 0; i < nProducts; i++) {                                                                                 // 47
  			productId = Products[i]._id;                                                                                     // 48
  			productName = Products[i].productName;                                                                           // 49
  			planning = Products[i].planning;                                                                                 // 50
                                                                                                                      // 51
  			if (typeof planning !== "undefined") {                                                                           // 52
  				planningArrayLength = planning.length;                                                                          // 53
  				for (j = 0; j < planningArrayLength; j++) {                                                                     // 54
  					if (typeof planning[j].ressource !== "undefined") {                                                            // 55
  						startDate = planning[j].startDate;                                                                            // 56
  						productionStep = planning[j].productionStep;                                                                  // 57
  						ressource = planning[j].ressource;                                                                            // 58
  						duration = planning[j].duration;                                                                              // 59
                                                                                                                      // 60
  						Ressources[ressource].push(                                                                                   // 61
  						{                                                                                                             // 62
  							productId: productId,                                                                                        // 63
  							productName: productName,                                                                                    // 64
  							startDate: startDate,                                                                                        // 65
  							productionStep: productionStep,                                                                              // 66
  							duration: duration,                                                                                          // 67
  						});                                                                                                           // 68
  					}                                                                                                              // 69
  				}                                                                                                               // 70
  			}                                                                                                                // 71
  		}                                                                                                                 // 72
                                                                                                                      // 73
  		if (Meteor.settings.public.debug) {                                                                               // 74
  			console.log("Ressources : ");                                                                                    // 75
  			console.log(Ressources);                                                                                         // 76
  		}                                                                                                                 // 77
                                                                                                                      // 78
  		return Ressources;                                                                                                // 79
    },                                                                                                                // 80
  });                                                                                                                 // 81
}                                                                                                                     // 82
                                                                                                                      // 83
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rationalk:erp'] = {
  RKERP: RKERP
};

})();

//# sourceMappingURL=rationalk_erp.js.map
