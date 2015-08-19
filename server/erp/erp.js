if (Meteor.isServer) {

	Meteor.methods({
  	createRessourcePlanning: function () {

      var Products = Production.find({}).fetch();
  		var nProducts = Products.length;
  		var ressourcesNames = [];
  		var Ressources = new Array();
  		var l = 0;
  		for (var i = 0; i < nProducts; i++) {
  			var planning = Products[i].planning;
  			if (typeof planning !== "undefined") {
  				var planningArrayLength = planning.length;
  				for (var j = 0; j < planningArrayLength; j++) {
  					if (typeof planning[j].ressource !== "undefined") {
  						if (ressourcesNames.indexOf(planning[j].ressource)==-1){
  							ressourceName = planning[j].ressource;
  							ressourcesNames[l] = ressourceName;
  							l = l + 1;
  							Ressources[ressourceName] = new Array();
  						}
  					}
  				}
  			}
  		}

  		for (var i = 0; i < nProducts; i++) {
  			var productId = Products[i]._id;
  			var productName = Products[i].productName;
  			var planning = Products[i].planning;

  			if (typeof planning !== "undefined") {
  				var planningArrayLength = planning.length;
  				for (var j = 0; j < planningArrayLength; j++) {
  					if (typeof planning[j].ressource !== "undefined") {

  						var startDate = planning[j].startDate;
  						var productionStep = planning[j].productionStep;
  						var ressource = planning[j].ressource;
  						var duration = planning[j].duration;

  						Ressources[ressource].push(
  						{
  							productId:productId,
  							productName:productName,
  							startDate:startDate,
  							productionStep:productionStep,
  							duration:duration
  						});
  					}
  				}
  			}
  		}

  		if (Meteor.settings.public.debug){
  			console.log("Ressources : ");
  			console.log(Ressources);
  		}

  		return Ressources;


    }
  });
}
