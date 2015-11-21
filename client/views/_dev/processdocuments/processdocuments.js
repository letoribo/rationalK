Template.processdocuments.rendered = function () {
	var myHilitor;
	Template.searchTpl.myHilitor = new Hilitor.highlight("resultsContent");
	Template.searchTpl.myHilitor.setMatchType("left");
	
	var client = new ZeroClipboard( $('.clip_button') );
	
      client.on( 'ready', function (event) {
        client.on( 'aftercopy', function (event) {
          console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });
      });
      
      client.on( 'error', function (event) {
        // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
        ZeroClipboard.destroy();
      });
      
};

Template.processdocuments.helpers({
	ProcessDocuments: function () {
		return ProcessDocuments.find({}).fetch();
	},
});

Template.processdocuments.events({
	'submit form': function (event){
	    event.preventDefault();
	    var processId = event.target.processId.value;
	    var taskId = event.target.taskId.value;
	    var myhtml = event.target.myhtml.value;
	    
	    Meteor.call('updateProcessDocument', processId, taskId,myhtml, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	}
});