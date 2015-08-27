Template.project.rendered = function () {

	$(function () {
    $( ".draggable" ).draggable();
    $( ".droppable" ).droppable({
      drop: function ( event, ui ) {
      console.log($(this).data().category);
      // do something with the draggable item
      console.log(ui.draggable.attr("id"));
      var draggedId = ui.draggable.attr("id");
      var droppedCategory = $(this).data().category;
      Meteor.call('updateProjectFileCategory',draggedId,droppedCategory, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		  });
      }
    });
  });


};

Template.project.helpers({
	UncategorizedProjectFiles: function () {
		console.log(this);
		return ProjectFiles.find({$and:[{projectId:this._id},{category:null}]}).fetch();
	},
	ProjectFilesInCategoryFinance: function () {
		return ProjectFiles.find({category:"Finance"}).fetch();
	},
	ProjectFilesInCategoryTechnical: function () {
		return ProjectFiles.find({category:"Technical"}).fetch();
	},
	ProjectFiles: function () {
		return ProjectFiles.find({}).fetch();
	},
  	categoryOptions: function () {
	  	var categoryOptions='';
	  	for (i = 0; i < Meteor.settings.public.project_files_categories.length; i++) {
		  	categoryOptions +='<option value="'+Meteor.settings.public.project_files_categories[i]+'"';
		  	if (this.category==Meteor.settings.public.project_files_categories[i]){
			  categoryOptions +=" selected";
		  	}
		  	categoryOptions +='>'+Meteor.settings.public.project_files_categories[i]+'</option>';
		}
		return new Spacebars.SafeString(categoryOptions);
	},
	ProjectDocs: function () {
		var ProjectDocs = Projects.findOne(this._id).docs;
		return ProjectDocs;
	},
	settingsProjectDocs: function () {
		var projectId = this._id;
        return {
            rowsPerPage: 10,
            showFilter: true,
            class: 'table table-condensed col-sm-12',
            rowClass: function (item) {
				if (item.afterEventQty<=0){
					return 'danger';
				}
				else {
					return '';
				}
			},
			fields: [
			    {
			        key: 'docId',
			        label: 'Doc Id'
			    },
			    {
			        key: 'dateAdded',
			        label: 'Date Added',
			    },
			    {
			        key: 'actions',
			        label: 'Actions',
			        fn: function (value, object) {

				        	var lastRevision =  Revisions.findOne({docId: object.docId },{sort: { revisionNumber: -1}})._id

				        	var url;
				        	url = Router.routes.revisionView.path({
					        	_id: lastRevision
					        });

					        //Check if the doc has fileLink
					        var fileLink=false
					        currentDoc = Docs.findOne({_id:object.docId});
					        var docCategoryId =  currentDoc.categoryId
					        var fileLink = false;
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


							if (fileLink){
								fileLink = clientFilename(fileLink);
								var fileLinkUrl = '<a href="rk:'+fileLink+'" title="Open file on your computer"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></a>';
							}
							else {
								var fileLinkUrl ='';
							}

							return new Spacebars.SafeString('<a href="' + url + '" title="View last revision of this doc"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a> <a class="removeDocFromProject" href="#" data-docId="' + object.docId +'" data-projectId="' + projectId +'" title="Remove from project"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a> '+fileLinkUrl);
				    }
			    }
			]
		}
    }
});

Template.project.events({
	"click a.updateProjectFiles": function (event){
	    event.preventDefault();
	    Meteor.call('walkThruProjectFolder', this._id, function (error, result) {});
			return false;
	},
	"change select": function (event){
	    event.preventDefault();
	    var draggedId = this._id;
	    var droppedCategory = event.target.value;
	    Meteor.call('updateProjectFileCategory',draggedId,droppedCategory, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	},
	"click a.removeDocFromProject": function (event){
	    event.preventDefault();
	    console.log(event.currentTarget.dataset);
	    Meteor.call('removeDocFromProject', event.currentTarget.dataset, function (error, result) {});
			return false;
	}
});

Template.updateProject.events({
	'submit form': function (event){
	    event.preventDefault();
	    var projectTitle = event.target.projectTitle.value;
   	    var projectFolderPath = event.target.projectFolderPath.value;
	    Meteor.call('updateProject',this._id,projectTitle,projectFolderPath, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	}
});
