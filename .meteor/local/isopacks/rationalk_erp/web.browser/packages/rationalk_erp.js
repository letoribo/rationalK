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
// packages/rationalk:erp/lib/client/template.plan.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("plan");                                                                                         // 2
Template["plan"] = new Template("Template.plan", (function() {                                                        // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			 ", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Production Planning</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                             // 12
  }, "\n					", Blaze._TemplateWith(function() {                                                                      // 13
    return {                                                                                                          // 14
      collection: Spacebars.call(view.lookup("productionPlanning")),                                                  // 15
      settings: Spacebars.call(view.lookup("settingsProductionPlanning"))                                             // 16
    };                                                                                                                // 17
  }, function() {                                                                                                     // 18
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                   // 19
  }), "\n        		"), "\n    		"), "\n		"), "\n	"), "\n	", HTML.DIV({                                                // 20
    "class": "row"                                                                                                    // 21
  }, "\n		", HTML.DIV({                                                                                               // 22
    "class": "col-md-12"                                                                                              // 23
  }, "\n			 ", HTML.DIV({                                                                                             // 24
    "class": "panel panel-default"                                                                                    // 25
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Ressource Planning</h3>\n        </div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                             // 27
  }, "\n					", Blaze.View("lookup:ressourcePlanning", function() {                                                   // 28
    return Spacebars.mustache(view.lookup("ressourcePlanning"));                                                      // 29
  }), "\n        "), "\n  		"), "\n		"), "\n	"), HTML.Raw('\n	<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Gantt</h3>\n        </div>\n				<div class="panel-body">\n  				<div id="gantt_here" style="width: 100%; height: 500px;"></div>\n        </div>\n  		</div>\n		</div>\n	</div>\n	'), HTML.DIV({
    "class": "row"                                                                                                    // 31
  }, "\n		", HTML.DIV({                                                                                               // 32
    "class": "col-md-12"                                                                                              // 33
  }, "\n			 ", HTML.DIV({                                                                                             // 34
    "class": "panel panel-default"                                                                                    // 35
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Stock movements Forecast</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                             // 37
  }, "\n					", Blaze._TemplateWith(function() {                                                                      // 38
    return {                                                                                                          // 39
      collection: Spacebars.call(view.lookup("stockMovements")),                                                      // 40
      settings: Spacebars.call(view.lookup("settingsStockMovements"))                                                 // 41
    };                                                                                                                // 42
  }, function() {                                                                                                     // 43
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                   // 44
  }), "\n        		"), "\n    		"), "\n		"), "\n	"), HTML.Raw('\n		<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Plan production</h3>\n        		</div>\n				<div class="panel-body">\n					<form>\n				        <div class="form-group">\n					        <div class="form-group">\n								<label for="productName">Product Name</label>\n								<input type="text" class="form-control" name="productName" id="productName" placeholder="Product Name">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="productQty">Quantity</label>\n								<input type="text" class="form-control" name="productQty" id="productQty" placeholder="100">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="productionStep">Production Step</label>\n								<input type="text" class="form-control" name="productionStep" id="productionStep" placeholder="Turning, Griding or Assembly">\n  							</div>\n					    </div>\n							<div class="form-group">\n					      <div class="form-group">\n									<label for="ressource">Ressource</label>\n									<input type="text" class="form-control" name="ressource" id="ressource" placeholder="Machine 1, Machine 2, John, Paul">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="startDate">Start Date</label>\n								<input type="text" class="form-control" name="startDate" id="startDate" placeholder="2015-02-18">\n  							</div>\n					    </div>\n							<div class="form-group">\n					        <div class="form-group">\n								<label for="duration">Duration [Days]</label>\n								<input type="text" class="form-control" name="duration" id="duration" placeholder="1">\n  							</div>\n					    </div>\n\n					    <button type="submit" class="btn btn-primary">Plan</button>\n				    </form>\n        		</div>\n    		</div>\n		</div>\n	</div>') ];
}));                                                                                                                  // 46
                                                                                                                      // 47
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/client/plan.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var createRessourcePlanning = function () {                                                                           // 1
		var Products = Production.find({}).fetch();                                                                         // 2
		var nProducts = Products.length;                                                                                    // 3
		var ressourcesNames = [];                                                                                           // 4
		var Ressources = new Array();                                                                                       // 5
		var l = 0;                                                                                                          // 6
		for (var i = 0; i < nProducts; i++) {                                                                               // 7
			var planning = Products[i].planning;                                                                               // 8
			if (typeof planning !== "undefined") {                                                                             // 9
				var planningArrayLength = planning.length;                                                                        // 10
				for (var j = 0; j < planningArrayLength; j++) {                                                                   // 11
					if (typeof planning[j].ressource !== "undefined") {                                                              // 12
						if (ressourcesNames.indexOf(planning[j].ressource)==-1){                                                        // 13
							ressourceName = planning[j].ressource;                                                                         // 14
							ressourcesNames[l] = ressourceName;                                                                            // 15
							l = l + 1;                                                                                                     // 16
							Ressources[ressourceName] = new Array();                                                                       // 17
						}                                                                                                               // 18
					}                                                                                                                // 19
				}                                                                                                                 // 20
			}                                                                                                                  // 21
		}                                                                                                                   // 22
                                                                                                                      // 23
		for (var i = 0; i < nProducts; i++) {                                                                               // 24
			var productId = Products[i]._id;                                                                                   // 25
			var productName = Products[i].productName;                                                                         // 26
			var planning = Products[i].planning;                                                                               // 27
                                                                                                                      // 28
			if (typeof planning !== "undefined") {                                                                             // 29
				var planningArrayLength = planning.length;                                                                        // 30
				for (var j = 0; j < planningArrayLength; j++) {                                                                   // 31
					if (typeof planning[j].ressource !== "undefined") {                                                              // 32
                                                                                                                      // 33
						var startDate = planning[j].startDate;                                                                          // 34
						var productionStep = planning[j].productionStep;                                                                // 35
						var ressource = planning[j].ressource;                                                                          // 36
						var duration = planning[j].duration;                                                                            // 37
                                                                                                                      // 38
						Ressources[ressource].push(                                                                                     // 39
						{                                                                                                               // 40
							productId:productId,                                                                                           // 41
							productName:productName,                                                                                       // 42
							startDate:startDate,                                                                                           // 43
							productionStep:productionStep,                                                                                 // 44
							duration:duration                                                                                              // 45
						});                                                                                                             // 46
					}                                                                                                                // 47
				}                                                                                                                 // 48
			}                                                                                                                  // 49
		}                                                                                                                   // 50
                                                                                                                      // 51
		if (Meteor.settings.public.debug){                                                                                  // 52
			console.log("Ressources : ");                                                                                      // 53
			console.log(Ressources);                                                                                           // 54
		}                                                                                                                   // 55
                                                                                                                      // 56
		return Ressources;                                                                                                  // 57
};                                                                                                                    // 58
                                                                                                                      // 59
                                                                                                                      // 60
var createProductionPlanning = function () {                                                                          // 61
		var Products = Production.find({}).fetch();                                                                         // 62
		if (Meteor.settings.public.debug){                                                                                  // 63
			console.log(Products);                                                                                             // 64
		}                                                                                                                   // 65
		var Events= new Array();                                                                                            // 66
		var stockMovements= new Array();                                                                                    // 67
		var arrayLength = Products.length;                                                                                  // 68
		//A first loop to store all actual product quantities :                                                             // 69
		var Quantities= new Array();                                                                                        // 70
		for (var i = 0; i < arrayLength; i++) {                                                                             // 71
			var productName = Products[i].productName;                                                                         // 72
			var productQty = Products[i].productQty;                                                                           // 73
			if (typeof productQty === "undefined") {                                                                           // 74
				productQty=0;                                                                                                     // 75
			}                                                                                                                  // 76
			Quantities[productName]=productQty;                                                                                // 77
		}                                                                                                                   // 78
		if (Meteor.settings.public.debug){                                                                                  // 79
			console.log(Quantities);                                                                                           // 80
		}                                                                                                                   // 81
                                                                                                                      // 82
		for (var i = 0; i < arrayLength; i++) {                                                                             // 83
			var productId = Products[i]._id;                                                                                   // 84
			var productName = Products[i].productName;                                                                         // 85
			var planning = Products[i].planning;                                                                               // 86
			if (typeof planning !== "undefined") {                                                                             // 87
				var planningArrayLength = planning.length;                                                                        // 88
				for (var j = 0; j < planningArrayLength; j++) {                                                                   // 89
					var plannedQty = planning[j].productQty;                                                                         // 90
					var startDate = planning[j].startDate;                                                                           // 91
					var productionStep = planning[j].productionStep;                                                                 // 92
					var ressource = planning[j].ressource;                                                                           // 93
					var duration = planning[j].duration;                                                                             // 94
                                                                                                                      // 95
					if (Meteor.settings.public.debug){                                                                               // 96
						console.log(productName);                                                                                       // 97
						console.log(plannedQty);                                                                                        // 98
						console.log(startDate);                                                                                         // 99
					}                                                                                                                // 100
					var beforeEventQty = Quantities[productName];                                                                    // 101
					var afterEventQty = beforeEventQty + plannedQty;                                                                 // 102
					Quantities[productName] =  afterEventQty ;                                                                       // 103
					Events.push(                                                                                                     // 104
					{                                                                                                                // 105
						productId:productId,                                                                                            // 106
						productName:productName,                                                                                        // 107
						plannedQty:plannedQty,                                                                                          // 108
						startDate:startDate,                                                                                            // 109
						productionStep:productionStep,                                                                                  // 110
						duration:duration,                                                                                              // 111
						ressource:ressource,                                                                                            // 112
						type:"Production",                                                                                              // 113
						afterEventQty:afterEventQty                                                                                     // 114
					});                                                                                                              // 115
				}                                                                                                                 // 116
				var productionEvents = Events;                                                                                    // 117
                                                                                                                      // 118
				productionEvents = productionEvents.sort(function (a,b){                                                          // 119
					// Turn your strings into dates, and then subtract them                                                          // 120
					// to get a value that is either negative, positive, or zero.                                                    // 121
					return new Date(a.startDate) - new Date(b.startDate);                                                            // 122
				});                                                                                                               // 123
                                                                                                                      // 124
                                                                                                                      // 125
			}                                                                                                                  // 126
		}                                                                                                                   // 127
                                                                                                                      // 128
		return productionEvents;                                                                                            // 129
};                                                                                                                    // 130
                                                                                                                      // 131
                                                                                                                      // 132
Template.plan.rendered = function () {                                                                                // 133
                                                                                                                      // 134
	/*                                                                                                                   // 135
	Meteor.call('createRessourcePlanning', function (error, result) {                                                    // 136
		if (error) {                                                                                                        // 137
			// handle error                                                                                                    // 138
			console.log(error)                                                                                                 // 139
		} else {                                                                                                            // 140
			// examine result                                                                                                  // 141
			Session.set('resourcePlanning',result);                                                                            // 142
		}                                                                                                                   // 143
	});                                                                                                                  // 144
                                                                                                                      // 145
	resourcePlanning = Session.get('resourcePlanning');                                                                  // 146
	*/                                                                                                                   // 147
	//return resourcePlanning.find();                                                                                    // 148
	// http://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html                                         // 149
                                                                                                                      // 150
	ressourcePlanning = createRessourcePlanning();                                                                       // 151
	var tasks = [];                                                                                                      // 152
	var data = new Array();                                                                                              // 153
	for(var i in ressourcePlanning) {                                                                                    // 154
		if (Meteor.settings.public.debug){                                                                                  // 155
			console.log("key " + i + " has value " + ressourcePlanning[i]);                                                    // 156
		}                                                                                                                   // 157
		var ProductionPlannedForThisRessource = ressourcePlanning[i];                                                       // 158
		ProductionPlannedForThisRessourceLength = ProductionPlannedForThisRessource.length;                                 // 159
		for (var j = 0; j < ProductionPlannedForThisRessourceLength; j++) {                                                 // 160
			var duration = ProductionPlannedForThisRessource[j].duration;                                                      // 161
			var startDate = ProductionPlannedForThisRessource[j].startDate;                                                    // 162
			var productName = ProductionPlannedForThisRessource[j].productName;                                                // 163
			//var m = moment(startDate,"YYYY-MM-DD").format("DD-MM-YYYY");                                                     // 164
			//console.log(m);                                                                                                  // 165
			var obj = [];                                                                                                      // 166
			obj.id = l;                                                                                                        // 167
			obj.text = productName;                                                                                            // 168
			obj.start_date = moment(startDate,"YYYY-MM-DD").format("DD-MM-YYYY");                                              // 169
			obj.duration = duration;                                                                                           // 170
			data.push(obj);                                                                                                    // 171
			l = l + 1;                                                                                                         // 172
		}                                                                                                                   // 173
	}                                                                                                                    // 174
	tasks.data = data;                                                                                                   // 175
                                                                                                                      // 176
	/*                                                                                                                   // 177
	var tasks =  {                                                                                                       // 178
        data:[                                                                                                        // 179
            {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,order:10,progress:0.4, open: true},        // 180
            {id:2, text:"Task #1", 	  start_date:"02-04-2013", duration:8, order:10,progress:0.6, parent:1},          // 181
            {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, order:20,progress:0.6, parent:1}           // 182
        ],                                                                                                            // 183
        links:[                                                                                                       // 184
            { id:1, source:1, target:2, type:"1"},                                                                    // 185
            { id:2, source:2, target:3, type:"0"},                                                                    // 186
            { id:3, source:3, target:4, type:"0"},                                                                    // 187
            { id:4, source:2, target:5, type:"2"},                                                                    // 188
        ]                                                                                                             // 189
    };                                                                                                                // 190
	*/                                                                                                                   // 191
                                                                                                                      // 192
	gantt.init("gantt_here");                                                                                            // 193
                                                                                                                      // 194
	gantt.parse(tasks);                                                                                                  // 195
                                                                                                                      // 196
                                                                                                                      // 197
};                                                                                                                    // 198
                                                                                                                      // 199
Template.plan.helpers({                                                                                               // 200
	productionPlanning: function () {                                                                                    // 201
		var productionPlanning = createProductionPlanning();                                                                // 202
		return productionPlanning;                                                                                          // 203
	},                                                                                                                   // 204
	settingsProductionPlanning: function () {                                                                            // 205
        return {                                                                                                      // 206
            rowsPerPage: 10,                                                                                          // 207
            showFilter: true,                                                                                         // 208
            class: 'table table-condensed col-sm-12',                                                                 // 209
            rowClass: function (item) {                                                                               // 210
				if (item.afterEventQty<=0){                                                                                       // 211
					return 'danger';                                                                                                 // 212
				}                                                                                                                 // 213
				else {                                                                                                            // 214
					return '';                                                                                                       // 215
				}                                                                                                                 // 216
			},                                                                                                                 // 217
			fields: [                                                                                                          // 218
			    {                                                                                                              // 219
			        key: 'productName',                                                                                        // 220
			        label: 'Product Name'                                                                                      // 221
			    },                                                                                                             // 222
			    {                                                                                                              // 223
			        key: 'productionStep',                                                                                     // 224
			        label: 'Production Step',                                                                                  // 225
			    },                                                                                                             // 226
					{                                                                                                                // 227
			        key: 'ressource',                                                                                          // 228
			        label: 'Ressource',                                                                                        // 229
			    },                                                                                                             // 230
			    {                                                                                                              // 231
			        key: 'plannedQty',                                                                                         // 232
			        label: 'Planned Qty',                                                                                      // 233
			    },                                                                                                             // 234
			    {                                                                                                              // 235
			        key: 'startDate',                                                                                          // 236
			        label: 'Start Date',                                                                                       // 237
			    },                                                                                                             // 238
					{                                                                                                                // 239
			        key: 'duration',                                                                                           // 240
			        label: 'Duration',                                                                                         // 241
			    },                                                                                                             // 242
			    {                                                                                                              // 243
			        key: 'actions',                                                                                            // 244
			        label: 'Actions',                                                                                          // 245
			        fn: function (value, object) {                                                                             // 246
				        	//<a href="{{pathFor 'build' _id=productId}}" title="Product Builder"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>  this.productName,this.startDate,this.plannedQty
				        	var url;                                                                                                 // 248
				        	url = Router.routes.build.path({                                                                         // 249
					        	_id: object.productId                                                                                   // 250
					        });                                                                                                      // 251
									return new Spacebars.SafeString('<a href="' + url + '" title="Product Builder"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></a> <a class="delete" href="#" data-productId="' + object.productId +'" data-productName="' + object.productName +'" data-productionStep="' + object.productionStep +'" data-startDate="' + object.startDate +'" data-plannedQty="' + object.plannedQty +'" title="Delete this production"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>');
				      }                                                                                                           // 253
			    }                                                                                                              // 254
			]                                                                                                                  // 255
		}                                                                                                                   // 256
  },                                                                                                                  // 257
	ressourcePlanning: function (){                                                                                      // 258
		var ressourcePlanning = createRessourcePlanning();                                                                  // 259
		if (Meteor.settings.public.debug){                                                                                  // 260
			console.log(ressourcePlanning);                                                                                    // 261
		}                                                                                                                   // 262
                                                                                                                      // 263
                                                                                                                      // 264
		var str = '<ul>';                                                                                                   // 265
		for(var i in ressourcePlanning) {                                                                                   // 266
			if (Meteor.settings.public.debug){                                                                                 // 267
				console.log("key " + i + " has value " + ressourcePlanning[i]);                                                   // 268
			}                                                                                                                  // 269
			str = str.concat('<li>');                                                                                          // 270
			str = str.concat('<p>');                                                                                           // 271
			str = str.concat(i);                                                                                               // 272
			str = str.concat('</p>');                                                                                          // 273
			var ProductionPlannedForThisRessource = ressourcePlanning[i];                                                      // 274
			ProductionPlannedForThisRessourceLength = ProductionPlannedForThisRessource.length;                                // 275
			str = str.concat('<ul>');                                                                                          // 276
			for (var j = 0; j < ProductionPlannedForThisRessourceLength; j++) {                                                // 277
				var duration = ProductionPlannedForThisRessource[j].duration;                                                     // 278
				var startDate = ProductionPlannedForThisRessource[j].startDate;                                                   // 279
				var productName = ProductionPlannedForThisRessource[j].productName;                                               // 280
				str = str.concat('<li>');                                                                                         // 281
				str = str.concat(productName + "/" + startDate + "/" + duration);                                                 // 282
				str = str.concat('</li>');                                                                                        // 283
			}                                                                                                                  // 284
			str = str.concat('</ul>');                                                                                         // 285
			str = str.concat('</li>');                                                                                         // 286
		}                                                                                                                   // 287
		str = str.concat('</ul>');                                                                                          // 288
		return new Spacebars.SafeString(str);                                                                               // 289
	},                                                                                                                   // 290
	settingsStockMovements: function () {                                                                                // 291
        return {                                                                                                      // 292
            rowsPerPage: 10,                                                                                          // 293
            showFilter: true,                                                                                         // 294
            class: 'table table-condensed col-sm-12',                                                                 // 295
            rowClass: function (item) {                                                                               // 296
				if (item.afterEventQty<=0){                                                                                       // 297
					return 'danger';                                                                                                 // 298
				}                                                                                                                 // 299
				else {                                                                                                            // 300
					return '';                                                                                                       // 301
				}                                                                                                                 // 302
			},                                                                                                                 // 303
			fields: [                                                                                                          // 304
			    {                                                                                                              // 305
			        key: 'neededProductName',                                                                                  // 306
			        label: 'Product Name'                                                                                      // 307
			    },                                                                                                             // 308
			    {                                                                                                              // 309
			        key: 'startDate',                                                                                          // 310
			        label: 'Date',                                                                                             // 311
			    },                                                                                                             // 312
			    {                                                                                                              // 313
			        key: 'beforeEventQty',                                                                                     // 314
			        label: 'Qty before',                                                                                       // 315
			    },                                                                                                             // 316
			    {                                                                                                              // 317
			        key: 'totalNeededProductQty',                                                                              // 318
			        label: 'Qty needed',                                                                                       // 319
			    },                                                                                                             // 320
			    {                                                                                                              // 321
			        key: 'afterEventQty',                                                                                      // 322
			        label: 'Qty after',                                                                                        // 323
			    },                                                                                                             // 324
			    {                                                                                                              // 325
			        key: 'comment',                                                                                            // 326
			        label: 'Help',                                                                                             // 327
			    }                                                                                                              // 328
			]                                                                                                                  // 329
		}                                                                                                                   // 330
    },                                                                                                                // 331
	stockMovements: function () {                                                                                        // 332
                                                                                                                      // 333
		var productionEvents = createProductionPlanning();                                                                  // 334
		var stockMovements= new Array();                                                                                    // 335
                                                                                                                      // 336
		var Products = Production.find({}).fetch();                                                                         // 337
		var arrayLength = Products.length;                                                                                  // 338
		//A first loop to store all actual product quantities :                                                             // 339
		var Quantities= new Array();                                                                                        // 340
		for (var i = 0; i < arrayLength; i++) {                                                                             // 341
			var productName = Products[i].productName;                                                                         // 342
			var productQty = Products[i].productQty;                                                                           // 343
			if (typeof productQty === "undefined") {                                                                           // 344
				productQty=0;                                                                                                     // 345
			}                                                                                                                  // 346
			Quantities[productName]=productQty;                                                                                // 347
		}                                                                                                                   // 348
		if (Meteor.settings.public.debug){                                                                                  // 349
			console.log(Quantities);                                                                                           // 350
		}                                                                                                                   // 351
		var productionEventsArrayLength = productionEvents.length;                                                          // 352
		for (var i = 0; i < productionEventsArrayLength; i++) {                                                             // 353
			var parentProductName = productionEvents[i].productName;                                                           // 354
			var parentStartDate = productionEvents[i].startDate;                                                               // 355
			var parentPlannedQty = productionEvents[i].plannedQty;                                                             // 356
			var parentProductionStep = productionEvents[i].productionStep;                                                     // 357
                                                                                                                      // 358
			// Pour chaque evenement de prod on va regarder les stocks que cela utilisent                                      // 359
			var neededProducts = Production.find({productName:productionEvents[i].productName}).fetch();                       // 360
			var neededProductsArrayLength = neededProducts.length;                                                             // 361
			for (var k = 0; k < neededProductsArrayLength; k++) {                                                              // 362
				var needs = neededProducts[k].needs;                                                                              // 363
				if (Meteor.settings.public.debug){                                                                                // 364
					console.log(needs);                                                                                              // 365
				}                                                                                                                 // 366
				if (typeof needs !== "undefined") {                                                                               // 367
					var needsArrayLength = needs.length;                                                                             // 368
					for (var l = 0; l < needsArrayLength; l++) {                                                                     // 369
						var neededDuringThisProductionStep = needs[l].productionStep;                                                   // 370
                                                                                                                      // 371
						if (parentProductionStep===neededDuringThisProductionStep){                                                     // 372
							var neededProductName = needs[l].productName;                                                                  // 373
							if (Meteor.settings.public.debug){                                                                             // 374
								console.log(neededProductName);                                                                               // 375
							}                                                                                                              // 376
							var neededProductQty = needs[l].productQty;                                                                    // 377
							if (Meteor.settings.public.debug){                                                                             // 378
								console.log(neededProductQty);                                                                                // 379
							}                                                                                                              // 380
							var beforeEventQty = Quantities[neededProductName];                                                            // 381
							var afterEventQty = beforeEventQty - parentPlannedQty * neededProductQty;                                      // 382
							Quantities[neededProductName] =  afterEventQty ;                                                               // 383
                                                                                                                      // 384
							if (afterEventQty<0){                                                                                          // 385
								label="danger";                                                                                               // 386
							}                                                                                                              // 387
							else {                                                                                                         // 388
								label="default";                                                                                              // 389
							}                                                                                                              // 390
                                                                                                                      // 391
							stockMovements.push(                                                                                           // 392
								{                                                                                                             // 393
									neededProductQty:neededProductQty,                                                                           // 394
									totalNeededProductQty:parentPlannedQty*neededProductQty,                                                     // 395
									neededProductName:neededProductName,                                                                         // 396
									startDate:parentStartDate,                                                                                   // 397
									productionStep:parentProductionStep,                                                                         // 398
									type:"Stock movement",                                                                                       // 399
									comment:"Stock of "+neededProductName +" decreases for the production of "+ parentPlannedQty+" product(s) : "+parentProductName+ " at the step : "+parentProductionStep+" starting on :"+parentStartDate,
									beforeEventQty:beforeEventQty,                                                                               // 401
									afterEventQty:afterEventQty                                                                                  // 402
								}                                                                                                             // 403
							);                                                                                                             // 404
						}                                                                                                               // 405
						else {                                                                                                          // 406
							if (Meteor.settings.public.debug){                                                                             // 407
								console.log("No needs in this production step ");                                                             // 408
							}                                                                                                              // 409
						}                                                                                                               // 410
                                                                                                                      // 411
					} //end loop over needs                                                                                          // 412
				} // end if needs undefined                                                                                       // 413
			} // end loop over needed products                                                                                 // 414
		} //end loop over productionEvent array                                                                             // 415
                                                                                                                      // 416
                                                                                                                      // 417
		stockMovements = stockMovements.sort(function (a,b){                                                                // 418
			return new Date(a.startDate) - new Date(b.startDate);                                                              // 419
		});                                                                                                                 // 420
                                                                                                                      // 421
		return stockMovements;                                                                                              // 422
	}                                                                                                                    // 423
});                                                                                                                   // 424
                                                                                                                      // 425
Template.plan.events({                                                                                                // 426
	'submit form': function (event){                                                                                     // 427
	    event.preventDefault();                                                                                          // 428
	    var dataset={};                                                                                                  // 429
	    dataset.productName = event.target.productName.value;                                                            // 430
			dataset.productQty = Number(event.target.productQty.value);                                                        // 431
			dataset.startDate = event.target.startDate.value;                                                                  // 432
			dataset.productionStep = event.target.productionStep.value;                                                        // 433
			dataset.ressource = event.target.ressource.value;                                                                  // 434
			dataset.duration = event.target.duration.value;                                                                    // 435
                                                                                                                      // 436
		Meteor.call('planProduction',dataset, function (error, result) {                                                    // 437
		  if (error) {                                                                                                      // 438
		    // handle error                                                                                                 // 439
		  } else {                                                                                                          // 440
		    // examine result                                                                                               // 441
		  }                                                                                                                 // 442
		});                                                                                                                 // 443
	},                                                                                                                   // 444
	"click a.delete": function (event,template){                                                                         // 445
	    event.preventDefault();                                                                                          // 446
			if (Meteor.settings.public.debug){                                                                                 // 447
	    	console.log(this);                                                                                              // 448
	    	console.log(event.currentTarget.dataset);                                                                       // 449
			}                                                                                                                  // 450
	    Meteor.call('deleteProduction',event.currentTarget.dataset,                                                      // 451
	    	function (error, result) {                                                                                      // 452
			  if (error) {                                                                                                     // 453
			    // handle error                                                                                                // 454
			  } else {                                                                                                         // 455
			    // examine result                                                                                              // 456
			  }                                                                                                                // 457
			}                                                                                                                  // 458
			);                                                                                                                 // 459
			return false;                                                                                                      // 460
	}                                                                                                                    // 461
});                                                                                                                   // 462
                                                                                                                      // 463
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/client/template.build.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("build");                                                                                        // 2
Template["build"] = new Template("Template.build", (function() {                                                      // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			 ", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.DIV({                                                                                            // 11
    "class": "panel-heading",                                                                                         // 12
    style: "position:relative"                                                                                        // 13
  }, "\n			 		", HTML.H3({                                                                                            // 14
    "class": "panel-title"                                                                                            // 15
  }, "Product Builder for : ", Blaze.View("lookup:productName", function() {                                          // 16
    return Spacebars.mustache(view.lookup("productName"));                                                            // 17
  })), "\n        		"), "\n				", HTML.DIV({                                                                          // 18
    "class": "panel-body"                                                                                             // 19
  }, "\n					", Blaze._TemplateWith(function() {                                                                      // 20
    return {                                                                                                          // 21
      collection: Spacebars.call(view.lookup("Needs")),                                                               // 22
      settings: Spacebars.call(view.lookup("settingsNeeds"))                                                          // 23
    };                                                                                                                // 24
  }, function() {                                                                                                     // 25
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                   // 26
  }), "			        			\n        		"), "\n    		"), "\n		"), "\n	"), HTML.Raw('\n		<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Add need to this product</h3>\n        		</div>\n				<div class="panel-body">		\n					<form>\n				        <div class="form-group">\n					        <div class="form-group">\n								<label for="productName">Product Name</label>\n								<input type="text" class="form-control" name="productName" id="productName" placeholder="Bearing 6000">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="productionStep">Production Step</label>\n								<input type="text" class="form-control" name="productionStep" id="productionStep" placeholder="Turning, Griding or Assembly">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="productQty">Quantity</label>\n								<input type="text" class="form-control" name="productQty" id="productQty" placeholder="100">\n  							</div>\n					    </div>\n					    <button type="submit" class="btn btn-primary">Save</button>\n				    </form>\n        		</div>\n    		</div>\n		</div>\n	</div>') ];
}));                                                                                                                  // 28
                                                                                                                      // 29
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/client/build.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.build.rendered = function () {                                                                               // 1
	 var productId = this.data._id;                                                                                      // 2
	 var productName = this.data.productName;                                                                            // 3
	 var productQty = this.data.productQty;                                                                              // 4
};                                                                                                                    // 5
                                                                                                                      // 6
Template.build.helpers({                                                                                              // 7
	Needs: function () {                                                                                                 // 8
		//console.log(this);                                                                                                // 9
		return this.needs;                                                                                                  // 10
	},                                                                                                                   // 11
	settingsNeeds: function () {                                                                                         // 12
        return {                                                                                                      // 13
            rowsPerPage: 1000,                                                                                        // 14
            showFilter: false,                                                                                        // 15
            showNavigation: 'never',                                                                                  // 16
            class: 'table table-condensed col-sm-12',                                                                 // 17
			fields: [                                                                                                          // 18
			    //{                                                                                                            // 19
			    //    key: 'productId',                                                                                        // 20
			    //    label: 'Product Id'                                                                                      // 21
			    //},                                                                                                           // 22
			    {                                                                                                              // 23
			        key: 'productName',                                                                                        // 24
			        label: 'Product Name'                                                                                      // 25
			    },                                                                                                             // 26
			    {                                                                                                              // 27
			        key: 'productQty',                                                                                         // 28
			        label: 'Needed Qty',                                                                                       // 29
			    },                                                                                                             // 30
			    {                                                                                                              // 31
			        key: 'productionStep',                                                                                     // 32
			        label: 'Production Step',                                                                                  // 33
			    },                                                                                                             // 34
			    {                                                                                                              // 35
			        key: 'actions',                                                                                            // 36
			        label: 'Actions',                                                                                          // 37
			        fn: function (value, object) {                                                                             // 38
				        	//<a href="{{pathFor 'project' _id=this._id}}" title="Open this project"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a> <a class="delete" href="#" data-parentProductId="{{../_id}}" data-productName="{{productName}}" data-neededQty="{{productQty}}" data-productionStep="{{productionStep}}" title="Delete this need"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
				        	var url;                                                                                                 // 40
				        	url = Router.routes.build.path({                                                                         // 41
					        	_id: object.productId                                                                                   // 42
					        });                                                                                                      // 43
							return new Spacebars.SafeString('<a href="' + url + '" title="Product Builder"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></a> <a class="delete" href="#" data-parentProductId="' + object.parentProductId +'" data-productId="' + object.productId +'" data-productName="' + object.productName +'" data-productionStep="' + object.productionStep +'" data-neededQty="' + object.productQty +'" title="Delete this need"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>');
				       	}                                                                                                         // 45
			    }                                                                                                              // 46
			]                                                                                                                  // 47
		}                                                                                                                   // 48
    }                                                                                                                 // 49
});                                                                                                                   // 50
                                                                                                                      // 51
Template.build.events({                                                                                               // 52
	'submit form': function (event,template){                                                                            // 53
	    event.preventDefault();                                                                                          // 54
	    //console.log(template.data);                                                                                    // 55
                                                                                                                      // 56
		var productId = template.data._id;                                                                                  // 57
		var dataset ={}                                                                                                     // 58
		dataset.productname=event.target.productName.value;                                                                 // 59
		dataset.productionstep=event.target.productionStep.value;                                                           // 60
		dataset.productqty=event.target.productQty.value;                                                                   // 61
		console.log(dataset);                                                                                               // 62
		Meteor.call('addNeedToThisProduct',productId,dataset, function (error, result) {                                    // 63
		  if (error) {                                                                                                      // 64
		    // handle error                                                                                                 // 65
		  } else {                                                                                                          // 66
		    // examine result                                                                                               // 67
		  }                                                                                                                 // 68
		});                                                                                                                 // 69
	},                                                                                                                   // 70
	"click a.delete": function (event){                                                                                  // 71
	    event.preventDefault();                                                                                          // 72
	    //console.log(this);                                                                                             // 73
	    console.log(event.currentTarget.dataset);                                                                        // 74
	    // {parentproductid: "zzLmwhnteDGEmmDxD", productname: "Cage", neededqty: "1", productionstep: "Assembly"}       // 75
                                                                                                                      // 76
	    Meteor.call('deleteThisNeed',event.currentTarget.dataset, function (error, result) {                             // 77
		  if (error) {                                                                                                      // 78
		    // handle error                                                                                                 // 79
		  } else {                                                                                                          // 80
		    // examine result                                                                                               // 81
		  }                                                                                                                 // 82
		});                                                                                                                 // 83
		return false;                                                                                                       // 84
	},                                                                                                                   // 85
                                                                                                                      // 86
});                                                                                                                   // 87
                                                                                                                      // 88
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/client/template.stocks.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("stocks");                                                                                       // 2
Template["stocks"] = new Template("Template.stocks", (function() {                                                    // 3
  var view = this;                                                                                                    // 4
  return [ HTML.DIV({                                                                                                 // 5
    "class": "row"                                                                                                    // 6
  }, "\n		", HTML.DIV({                                                                                               // 7
    "class": "col-md-12"                                                                                              // 8
  }, "\n			 ", HTML.DIV({                                                                                             // 9
    "class": "panel panel-default"                                                                                    // 10
  }, "\n			 	", HTML.Raw('<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Stock</h3>\n        		</div>'), "\n				", HTML.DIV({
    "class": "panel-body"                                                                                             // 12
  }, "\n					", Blaze._TemplateWith(function() {                                                                      // 13
    return {                                                                                                          // 14
      collection: Spacebars.call(view.lookup("Stocks")),                                                              // 15
      settings: Spacebars.call(view.lookup("settingsStocks"))                                                         // 16
    };                                                                                                                // 17
  }, function() {                                                                                                     // 18
    return Spacebars.include(view.lookupTemplate("reactiveTable"));                                                   // 19
  }), "		        		\n					", Blaze.Each(function() {                                                                  // 20
    return Spacebars.call(view.lookup("Products"));                                                                   // 21
  }, function() {                                                                                                     // 22
    return [ "\n		        		", HTML.DIV({                                                                             // 23
      "class": "post"                                                                                                 // 24
    }, "\n			        		", Blaze.View("lookup:productName", function() {                                               // 25
      return Spacebars.mustache(view.lookup("productName"));                                                          // 26
    }), " Qty : ", Blaze.View("lookup:productQty", function() {                                                       // 27
      return Spacebars.mustache(view.lookup("productQty"));                                                           // 28
    }), " ", HTML.A({                                                                                                 // 29
      href: function() {                                                                                              // 30
        return Spacebars.mustache(view.lookup("pathFor"), "build", Spacebars.kw({                                     // 31
          _id: Spacebars.dot(view.lookup("."), "_id")                                                                 // 32
        }));                                                                                                          // 33
      },                                                                                                              // 34
      title: "Open this project"                                                                                      // 35
    }, HTML.SPAN({                                                                                                    // 36
      "class": "glyphicon glyphicon-eye-open",                                                                        // 37
      "aria-hidden": "true"                                                                                           // 38
    })), " ", HTML.A({                                                                                                // 39
      "class": "delete",                                                                                              // 40
      href: "#",                                                                                                      // 41
      title: "Delete this project"                                                                                    // 42
    }, HTML.SPAN({                                                                                                    // 43
      "class": "glyphicon glyphicon-trash",                                                                           // 44
      "aria-hidden": "true"                                                                                           // 45
    })), "\n			        	"), "\n					" ];                                                                              // 46
  }, function() {                                                                                                     // 47
    return [ "\n						", HTML.P("There is nothing to show for the moment."), "\n		        	" ];                       // 48
  }), "			        			\n        		"), "\n    		"), "\n		"), "\n	"), HTML.Raw('\n		<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Add something to the stock</h3>\n        		</div>\n				<div class="panel-body">		\n					<form>\n				        <div class="form-group">\n					        <div class="form-group">\n								<label for="productName">Product Name</label>\n								<input type="text" class="form-control" name="productName" id="productName" placeholder="Product Name">\n  							</div>\n					    </div>\n					    <div class="form-group">\n					        <div class="form-group">\n								<label for="productQty">Quantity</label>\n								<input type="text" class="form-control" name="productQty" id="productQty" placeholder="100">\n  							</div>\n					    </div>\n					    <button type="submit" class="btn btn-primary">Add to stock</button>\n				    </form>\n        		</div>\n    		</div>\n		</div>\n	</div>') ];
}));                                                                                                                  // 50
                                                                                                                      // 51
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:erp/lib/client/stocks.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.stocks.rendered = function () {                                                                              // 1
                                                                                                                      // 2
};                                                                                                                    // 3
                                                                                                                      // 4
Template.stocks.helpers({                                                                                             // 5
	Stocks: function () {                                                                                                // 6
		var Products = Production.find({visible:{$ne: false}}).fetch();                                                     // 7
		return Products;                                                                                                    // 8
	},                                                                                                                   // 9
	settingsStocks: function () {                                                                                        // 10
        return {                                                                                                      // 11
            rowsPerPage: 10,                                                                                          // 12
            showFilter: true,                                                                                         // 13
            class: 'table table-condensed col-sm-12',                                                                 // 14
            rowClass: function (item) {                                                                               // 15
				if (item.afterEventQty<=0){                                                                                       // 16
					return 'danger';                                                                                                 // 17
				}                                                                                                                 // 18
				else {                                                                                                            // 19
					return '';                                                                                                       // 20
				}                                                                                                                 // 21
			},                                                                                                                 // 22
			fields: [                                                                                                          // 23
			    {                                                                                                              // 24
			        key: 'productName',                                                                                        // 25
			        label: 'Product Name'                                                                                      // 26
			    },                                                                                                             // 27
			    {                                                                                                              // 28
			        key: 'productQty',                                                                                         // 29
			        label: 'Qty',                                                                                              // 30
			    },                                                                                                             // 31
			    {                                                                                                              // 32
			        key: 'actions',                                                                                            // 33
			        label: 'Actions',                                                                                          // 34
			        fn: function (value, object) {                                                                             // 35
				        	//<a href="{{pathFor 'build' _id=this._id}}" title="Open this project"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a> <a class="delete" href="#" title="Delete this project"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
				        	var url;                                                                                                 // 37
				        	url = Router.routes.build.path({                                                                         // 38
					        	_id: object._id                                                                                         // 39
					        });                                                                                                      // 40
							return new Spacebars.SafeString('<a href="' + url + '" title="Product Builder"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></a> <a class="delete" href="#" data-productId="' + object._id +'" title="Remove from stock"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>');
				       	}                                                                                                         // 42
			    }                                                                                                              // 43
			]                                                                                                                  // 44
		}                                                                                                                   // 45
    }                                                                                                                 // 46
});                                                                                                                   // 47
                                                                                                                      // 48
Template.stocks.events({                                                                                              // 49
	'submit form': function (event,template){                                                                            // 50
	    event.preventDefault();                                                                                          // 51
	    //console.log(template.data);                                                                                    // 52
	    var productName = event.target.productName.value;                                                                // 53
		var productQty = Number(event.target.productQty.value);                                                             // 54
		Meteor.call('addToStock',productName,productQty, function (error, result) {                                         // 55
		  if (error) {                                                                                                      // 56
		    // handle error                                                                                                 // 57
		  } else {                                                                                                          // 58
		    // examine result                                                                                               // 59
		  }                                                                                                                 // 60
		});                                                                                                                 // 61
	},                                                                                                                   // 62
	"click a.delete": function (event){                                                                                  // 63
	    event.preventDefault();                                                                                          // 64
	    console.log(event.currentTarget.dataset);                                                                        // 65
	    Meteor.call('deleteProduct', event.currentTarget.dataset.productid, function (error, result) {                   // 66
		  if (error) {                                                                                                      // 67
		    // handle error                                                                                                 // 68
		  } else {                                                                                                          // 69
		    // examine result                                                                                               // 70
		  }                                                                                                                 // 71
		});                                                                                                                 // 72
		return false;                                                                                                       // 73
	}                                                                                                                    // 74
});                                                                                                                   // 75
                                                                                                                      // 76
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
