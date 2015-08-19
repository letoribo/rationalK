Meteor.methods({
	createProject: function (title,folderpath) {
		Projects.insert(
			{
			    title: title,
			    folderpath: folderpath

			}
		);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('The project has been created successfully');
		}
	},
	updateProject: function (projectId,projectTitle,projectFolderPath) {
		Projects.update(
			{
			  $and: [
			  	{_id: projectId}
			  ]
			},
			{
			    title: projectTitle,
			    folderpath: projectFolderPath

			},
			{
			    upsert: true
			}
		);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('The project has been updated successfully');
		}
	},
	deleteProject: function (projectId) {
		Projects.remove(projectId);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('The project has been deleted');
		}
	},
	updateProjectFileCategory: function (draggedId,droppedCategory) {
		ProjectFiles.update(
			{ _id: draggedId},
			{ $set: { category: droppedCategory} }
		);
		toastr.success('Done.');
	},
	addToProject: function (dataset) {
		console.log(dataset);

		var projectDocs = Projects.findOne(dataset.projectId).docs;
		if (typeof(projectDocs) !== 'undefined') {
			var projectDocsArrayLength = projectDocs.length;
			var docAlreadyExistsInThisProject = false;
			for (var j = 0; j < projectDocsArrayLength; j++) {
				console.log("Current doc entry : ");
				console.log(projectDocs[j].docId);
				console.log(projectDocs[j].dateAdded);
				console.log(projectDocs[j].lastRevision);

				if (dataset.docId == projectDocs[j].docId){
					console.log("The doc already exist")
					var docAlreadyExistsInThisProject = true;
				}
			}
		}
		if (docAlreadyExistsInThisProject===true){
			if (typeof(toastr) !== 'undefined') {
				toastr.error('This document is already attached to this project.');
			}

		}
		else {
			Projects.update(
				{
				  $and: [
				  	{_id: dataset.projectId}
				  ]
				},
				{
				    $push: { docs:{docId:dataset.docId,lastRevision:dataset.lastRevision,dateAdded:new Date()} }

				},
				{
				    upsert: true
				}
			);
			if (typeof(toastr) !== 'undefined') {
				toastr.succes('This document has been added succesfully to this project.');
			}
		}







	},
	removeDocFromProject: function (dataset) {
		console.log(dataset); //lowercase dataset
		var arrayElementToRemove=-1;
		var projectDocs = Projects.findOne(dataset.projectid).docs;
		if (typeof(projectDocs) !== 'undefined') {
			var projectDocsArrayLength = projectDocs.length;
			for (var j = 0; j < projectDocsArrayLength; j++) {
				if (dataset.docid == projectDocs[j].docId){
					console.log("Remove : "+j)
					arrayElementToRemove = j;
				}
			}
		}
		if (arrayElementToRemove>=0){
			projectDocs.splice(arrayElementToRemove, 1);

			Projects.update(
					{
					  $and: [
					  	{_id: dataset.projectid}
					  ]
					},
					{
					    $set: {docs: projectDocs}
					}
			);

			if (typeof(toastr) !== 'undefined') {
				toastr.success('This document has been deleted from this project.');
			}

		}
	}

});
