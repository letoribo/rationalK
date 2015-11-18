(function(){Meteor.methods({
	updateProcessDocument: function (processId,taskId,html) {
	ProcessDocuments.update(
		{
		  $and: [
		  	{processId: processId},{taskId:taskId}
		  ]
		},
		{
		    processId: processId,
		    taskId: taskId,
			html: html
		},
		{
		    upsert: true
		}
	);
	if (typeof(toastr) !== 'undefined') {
		toastr.options.onHidden = function () { Router.go("/process/"+processId);}
		toastr.success('The note has been added to this process diagram. You are going to be redirected to your diagram.');
	}


	},
	deleteProcessDocument: function (processDocumentId) {
		ProcessDocuments.remove(processDocumentId);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('The note has been removed from this process diagram');
		}
	}
});

})();
