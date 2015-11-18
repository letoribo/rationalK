(function(){if (Meteor.isServer) {

	var analyseTags = function (){
      	Meteor.call('analyseTags');
	}

	SyncedCron.add({
		  name: 'analyseTags',
		  schedule: function (parser) {
				return parser.text("at 6:00 am");
		  },
		  job: analyseTags
	});


	Meteor.methods({
    analyseTags: function () {
				if (Meteor.settings.public.debug){
					console.log('Starting analysing tags...');
				}
        Tags.remove({});
        var usedTags = {};
        var cat = Categories.find().fetch();
        var arrayLength = cat.length;
        for (var i = 0; i < arrayLength; i++) {
						if (Meteor.settings.public.debug){
	            console.log("Cat Id : "+cat[i]._id);
	            console.log("Cat Name : "+cat[i].name);
						}
            //console.log("View Id : "+cat[i].viewId);
            fieldsInThisView = Views.findOne(
              {
                $and: [
                  {"_id":cat[i].viewId}
        			   ]
              }
            ).fields;
            //console.log(fieldsInThisView);

            for (key in fieldsInThisView) {
                if (fieldsInThisView.hasOwnProperty(key)) {
                    if (fieldsInThisView[key].type=="tags"){
											if (Meteor.settings.public.debug){
                      	console.log("This category has some tags defined");
											}
                      //console.log(key);
                      //console.log(fieldsInThisView[key].type);

                      var docs = Docs.find({"categoryId":cat[i]._id}).fetch();
                      var nDocs = docs.length;
                      //console.log(nDocs);
                      for (var j = 0; j < nDocs; j++) {
                        fields = docs[j].fields;
                        tagObj = fields[key];
												if (typeof(tagObj) !== 'undefined') {
	                        if (tagObj.value){
														if (Meteor.settings.public.debug){
		                          console.log(tagObj);
														}
														tagObj.value = tagObj.value.replace(/;/g, ",");
	                          tagArray = tagObj.value.split(",");
														if (Meteor.settings.public.debug){
		                          console.log(tagArray)
														}
	                          var nTags = tagArray.length;
	                          for (var t = 0; t < nTags; t++) {
															var tag = tagArray[t].trim();
															tag = tag.toLowerCase();
	                            Tags.update(
	                        			{
	                        			  'value' : tag
	                        			},
	                        			{
	                                $inc: {count: 1}
	                        			},
	                        			{
	                        			    upsert: true
	                        			}
	                        		);
	                          } //end loop over tag for this document
	                        } //end check if the document has some tags
												} // end of check if tagObj is not undefined
                      } //end loop over documents in this category
                    } //end check if this category has tags
                  } //end check if this is a real key and not a prototype function or whatever
                } //end loop over key in this category
              } //end loop over categories
							if (Meteor.settings.public.debug){
            		console.log('Finished analysing tags...');
							}
	          return true;
	        } // end of function
	});
} // end of is Server check

})();
