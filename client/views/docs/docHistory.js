Template.docHistory.rendered = function () {

};

Template.docHistory.events({
  "click .updateDocInMySpace": function (e, template) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace',e.currentTarget.dataset.docid);
		return false;
  }
});

Template.docHistory.helpers({
	docHistory: function () {
		return History.find({}).fetch();
	},
	settingsDocHistory: function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            class: 'table table-condensed col-sm-12',
						showNavigation: 'auto',
			fields: [
        {
          key: 'createdAt',
          label: 'Date',
          sortDirection: 'descending',
					fn: function (value, object) {
							return moment(value).format('DD.MM.YY HH:mm');
					}
        },
        {key: 'type',label: 'Type'},
        {key: 'who',label: 'Who'},
          {
            key: 'what',
            label: 'Description'
          }
          /*
          ,
			    {
			        key: 'actions',
			        label: 'Actions',
			        fn: function (value, object) {

                if (typeof object.data.doc!== 'undefined'){
                  var thisRevision =  object.data.doc._id;
				        	var url = Router.routes.revisionView.path({_id: thisRevision});
                  //Check if the doc has fileLink
					        var fileLink=false

					        currentDoc = Docs.findOne({_id:object.data.doc.docId});
									var fileLink = false;
									if (typeof currentDoc!== 'undefined'){
					        var docCategoryId =  currentDoc.categoryId

                  var category=Categories.findOne(docCategoryId);
                  if (typeof category!== 'undefined'){
                    viewId = category.viewId;
                    fields = Views.findOne(viewId).fields;
                    for (var fieldname in fields) {
                      if (fields[fieldname].type=='filelink'){
                        var fileLink = currentDoc.fields[fieldname].value;
                      }
								    }
                  }
								}

							if (fileLink){
								fileLink = replaceFilename(fileLink);
								var fileLinkUrl = '<a href="rk:'+fileLink+'" title="Open file on your computer"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></a>';
							}
							else {
								var fileLinkUrl ='';
							}

					    if (userSpaceHasDoc(Meteor.userId(), object.data.doc.docId)) {
					      var userSpaceLinkTitle = TAPi18n.__('Remove from my space');
								var userSpaceIcon = 'glyphicon-star';
					    } else {
								var userSpaceLinkTitle = TAPi18n.__('Add to my space');
								var userSpaceIcon = 'glyphicon-star-empty';
					    }

							return new Spacebars.SafeString('<a href="' + url + '" title="View last revision of this doc"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a> <a href="/doc/'+object.data.doc.docId+'/edit" title="Edit"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a> <a href="#" data-docId="' + object.data.doc.docId +'" title="'+ userSpaceLinkTitle +'" class="updateDocInMySpace"> <span class="glyphicon '+ userSpaceIcon +'" aria-hidden="true"></span></a> '+fileLinkUrl);
                }
				    }
			    }
          */
			]
		}
  }
});
