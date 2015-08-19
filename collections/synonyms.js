Meteor.methods({
	updateSynonyms: function (content) {

		Synonyms.remove({})
	  	arrayOfLines = content.split('\n');
	  	var arrayLength = arrayOfLines.length;
	  	for (var i = 0; i < arrayLength; i++) {
		  	//console.log("line #"+i);
	    	//console.log(arrayOfLines[i]);
	    	Synonyms.insert({synonyms:arrayOfLines[i]});
			//Do something
		}

		if (typeof(toastr) !== 'undefined') {
			toastr.success('Synonyms have been updated succesfully');
		}

		return true;
	},
	getSynonyms: function (word) {
		var allSynonyms = Synonyms.find({}).fetch();
		var arrayLength = allSynonyms.length;
		var veryPotentialSynonymsArray=[];
	  	for (var i = 0; i < arrayLength; i++) {
		  	//console.log("line #"+i);
	    	//console.log(allSynonyms[i].synonyms);
	    	//Explode the line based on ,
	    	var synonyms = allSynonyms[i].synonyms;
			var synonymsArray = synonyms.split(",");

			var found=false;
			var potentialSynonymsArray=[];
			var synonymsArrayLength = synonymsArray.length;
			for (var j = 0; j < synonymsArrayLength; j++) {
				if (synonymsArray[j] == word){
					found=true;
				} else {
					potentialSynonymsArray.push(synonymsArray[j]);
				}
			}
			if (found){
				veryPotentialSynonymsArray=veryPotentialSynonymsArray.concat(potentialSynonymsArray);
			}
		}
		console.log("Synonyms of "+word+" : "+veryPotentialSynonymsArray);
		return veryPotentialSynonymsArray;
	}

});
