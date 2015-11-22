//Functions available for the different js files :
var userSpaceHasDoc = function (userId, docId) {
  check(userId, String);
  check(docId, String);
  return userSpaces.find({docId: docId,userId: userId}).count() > 0;
};

Meteor.methods({
  updateDocInMySpace: function (docId) {
    check(docId, String);
    if (! this.userId) {
      throw new Meteor.Error("not-logged-in","Must be logged in to update a doc in your space.");
    }

    if (userSpaceHasDoc(this.userId,docId)){
    	userSpaces.remove(
    		{
    			$and :[
    				{ userId : this.userId },
    				{ docId : docId}
    			]
    		}
    	);
      if (typeof(toastr) !== 'undefined') {
      	toastr.success(TAPi18n.__('Document succesfully removed from your space'));
      }
    }
    else {
      // I need the category Id to delete them by bacth given a categoryId
    	var categoryId = Docs.findOne({_id:docId}).categoryId

    	userSpaces.update(
    		{
    			$and :[
    				{ userId : this.userId },{ docId : docId}
    			]
    		},
    		{
    			createdBy : this.userId,
    			createdAt : new Date(),
    			userId : this.userId,
    			docId : docId,
    			categoryId : categoryId
    		},
    		{
    			upsert : true
    		}
    	);
      if (typeof(toastr) !== 'undefined') {
      	toastr.success(TAPi18n.__('Document succesfully added to your space'));
      }
    } // end of if add doc to my space
    return docId;
  },
  deleteAllDocFromUserSpaceByCategory: function (categoryId) {
    check(categoryId,String);
    if (! this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to remove a doc from your space.");
    }
	  userSpaces.remove({categoryId : categoryId});
    return true;
  }
});
