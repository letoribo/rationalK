(function(){Template.synonyms.rendered = function () {
      
};

Template.synonyms.helpers({
	synonyms: function () {
		synonymsArray = Synonyms.find().fetch();
		var textareaContent="";
		var synonymsArrayLength = synonymsArray.length;
	  	for (var i = 0; i < synonymsArrayLength; i++) {
	    	textareaContent = textareaContent + synonymsArray[i].synonyms + "\n";
	    }
	    textareaContent = textareaContent.slice(0, - 1); //remove last line break \n
		return textareaContent;	    
	}
});

Template.synonyms.events({
	'submit form': function (event){
	    event.preventDefault();
	    var synonyms = event.target.synonyms.value;
	    Meteor.call('updateSynonyms', synonyms, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	}
});

})();
