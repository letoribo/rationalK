var weigthBeforeTurning = function (products) {
	console.log("client method : weightBeforeTurning...");
	//var p = JSON.parse(Assets.getText('calculations/parameters.json')); //p for params
	//need the file calc2.json
	var arrayLength = products.length;
	for (var i = 0; i < arrayLength; i++) {
			products[i].weightBeforeTurning=products[i].ID+products[i].OD;
			//Do something
	}
	console.log(products);
	return products;
}

Template.calculation.rendered = function () {
	$("a.delete").hide();
	// delete here so that when I come back to the search page, it loads faster
  Session.set('searchQuery',undefined);
  delete Session.keys.searchQuery
  Session.set('searchQuerySentToServer',undefined);
  delete Session.keys.searchQuery
};

Template.calculation.events({
  "click .updateDocInMySpace": function (e, template) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace',e.currentTarget.dataset.docid);
		return false;
  }
});

Template.calculation.helpers({
	Products: function () {
		//var Products=[];
		//var Product = {};

		Meteor.call('products',"blabla","blabla2", function (error, result) {
			//console.log(result.content);
			  if (error) {
			    // handle error
			    //console.log('http get FAILED!');
			  	console.log(error);
			  } else {
			    // examine result
			    	Session.set('products',result);
			  }
		});

		var products = Session.get('products');
		if (typeof(products) !== 'undefined') {
			Meteor.call('weigthBeforeTurning',products, function (error, result) {
				//console.log(result.content);
				  if (error) {
				    // handle error
				    //console.log('http get FAILED!');
				  	console.log(error);
				  } else {
				    // examine result
				    	Session.set('products2',result);
				  }
			});
		}

		var products2 = Session.get('products2');
		if (typeof(products2) !== 'undefined') {
			console.log("products2 : ")
			console.log(products2)
		}

		/*
		Product.Name="7000"
		Product.Price="129"
		Products.push(Product);
		var Product = {};
		Product.Name="7003"
		Product.Price="150"
		Products.push(Product);
		*/
		return products2;



	}
});
