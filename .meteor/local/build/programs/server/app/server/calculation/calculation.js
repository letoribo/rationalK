(function(){if (Meteor.isServer) {

  var eppaisseurCroute=0.4
  var p = JSON.parse(Assets.getText('calculations/parameters.json')); //p for params
  //var i = JSON.parse(Assets.getText('calculations/calc1.json')); // i for inputs
  //var i = JSON.parse(Assets.getText('calculations/calc2.json')); // i for inputs

	Meteor.methods({
  	weight: function () {
      //need the file calc1.json
      console.log("Starting calculation for : " + i.designation);
      //console.log(eppaisseurCroute);
      //console.log(p);
      //console.log(i);

      console.log(i.Quantities);

      var arrayLength = i.Quantities.length;
      for (var n = 0; n < arrayLength; n++) {
          console.log(i.Quantities[n]);
          //Do something
      }
    },
    products: function (i,p) {
      var i = JSON.parse(Assets.getText('calculations/calc2.json')); // i for inputs
      //need the file calc2.json
      var costs = [];
      var arrayLength = i.Bearings.length;
      for (var b = 0; b < arrayLength; b++) {
          console.log(i.Bearings[b]);
          //Do something
      }
      return i.Bearings;
    },
    weigthBeforeTurning: function (products) {
      console.log("server method : weightBeforeTurning...");
      //need the file calc2.json
      var arrayLength = products.length;
      for (var i = 0; i < arrayLength; i++) {
          products[i].IROD = (products[i].OD+products[i].ID)/2;
          products[i].weightBeforeTurning={
            "AE" : Math.PI*Math.pow(products[i].OD/1000/2,2)*(products[i].Width+p.surreppaisseurTronconnage)/1000*p.Density,
            "AI" : Math.PI*Math.pow(products[i].IROD/1000/2,2)*(products[i].Width+p.surreppaisseurTronconnage)/1000*p.Density
          }
      }
      console.log(products);
      return products;
    }
  });
}

})();
