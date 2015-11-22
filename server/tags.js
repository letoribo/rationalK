if (Meteor.isServer) {

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
		findAndReplaceTag: function (data) {
			var count = 0;
			check(data, {
	      tagSource: String,
	      tagDestination: String,
	    });
			RKCore.log('Starting find and replace tag...');
			var cat = Categories.find().fetch();
			var arrayLength = cat.length;
			for (var i = 0; i < arrayLength; i++) {
				fieldsInThisView = Views.findOne(
					{
						$and: [
							{"_id":cat[i].viewId}
						 ]
					}
				).fields;
				for (key in fieldsInThisView) {
						if (fieldsInThisView.hasOwnProperty(key)) {
								if (fieldsInThisView[key].type=="tags"){
										var docs = Docs.find({"categoryId":cat[i]._id}).fetch();
										var nDocs = docs.length;
										for (var j = 0; j < nDocs; j++) {
											newTagsString = '';
											RKCore.log(docs[j]);
											fields = docs[j].fields;
											docId = docs[j]._id;
											tagObj = fields[key];
											if (typeof(tagObj) !== 'undefined') {
												if (tagObj.value){
													RKCore.log(tagObj.value);
													tagObj.value = tagObj.value.replace(/;/g, ",");
													tagArray = tagObj.value.split(",");
													var nTags = tagArray.length;
													for (var t = 0; t < nTags; t++) {
														var tag = tagArray[t].trim();
														if (tag === data.tagSource) {
															newTagsString = newTagsString + data.tagDestination + ',';
															count = count + 1;
														}
														else {
															newTagsString = newTagsString + tag + ',';
														}
													} //end loop over tag for this document
													newTagsString = newTagsString.slice(0, -1);
													newTagsStringValue = {
														value: newTagsString
													};
													fields[key] = newTagsStringValue;
													Docs.update(
														{
															_id: docId,
														},
														{
															$set: {
																fields : fields,
															},
													 	}
												 	);
												 newTagsString = '';
												} //end check if the document has some tags
											} // end of check if tagObj is not undefined
										} //end loop over documents in this category
									} //end check if this category has tags
								} //end check if this is a real key and not a prototype function or whatever
							} //end loop over key in this category
						} //end loop over categories
						RKCore.log('Finished find and replace tags...');
						RKCore.log('I have replaced ' + count + ' tags');
						return count;
		},
    analyseTags: function () {
				RKCore.log('Starting analysing tags...');
        Tags.remove({});
        var usedTags = {};
        var cat = Categories.find().fetch();
        var arrayLength = cat.length;
        for (var i = 0; i < arrayLength; i++) {
	          RKCore.log("Cat Id : "+cat[i]._id);
	          RKCore.log("Cat Name : "+cat[i].name);
            fieldsInThisView = Views.findOne(
              {
                $and: [
                  {"_id":cat[i].viewId}
        			   ]
              }
            ).fields;

            for (key in fieldsInThisView) {
                if (fieldsInThisView.hasOwnProperty(key)) {
                    if (fieldsInThisView[key].type=="tags"){
                      var docs = Docs.find({"categoryId":cat[i]._id}).fetch();
                      var nDocs = docs.length;
                      for (var j = 0; j < nDocs; j++) {
                        fields = docs[j].fields;
                        tagObj = fields[key];
												if (typeof(tagObj) !== 'undefined') {
	                        if (tagObj.value){
														tagObj.value = tagObj.value.replace(/;/g, ",");
	                          tagArray = tagObj.value.split(",");
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
            	RKCore.log('Finished analysing tags...');

	          return true;
	        } // end of function
	});
} // end of is Server check
