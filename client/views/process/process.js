Template.process.rendered = function () {
	/**
	 * bpmn-js-seed
	 *
	 * This is an example script that loads an embedded diagram file <diagramXML>
	 * and opens it using the bpmn-js viewer.
	 */
	 //console.log(this);
	 var processId = this.data._id;
	 var processTitle = this.data.title;
	 var processFilename = this.data.filename;
	 
	 
	(function (BpmnViewer, $) {
	
	  // create viewer
	  var bpmnViewer = new BpmnViewer({container: '#canvas'});
	
	
	 // import function
	  function importXML(xml) {
	
	    // import diagram
	    bpmnViewer.importXML(xml, function (err) {
	
	      if (err) {
	        return console.error('could not import BPMN 2.0 diagram', err);
	      }
	
	      var canvas = bpmnViewer.get('canvas'),
	          overlays = bpmnViewer.get('overlays');
	
	
	      // zoom to fit full viewport
	      canvas.zoom('fit-viewport');
		  //console.log('Process Id : '+processId);
	
		  console.log(ProcessDocuments.find({processId:processId}).count());
		  var processDocuments = ProcessDocuments.find({processId:processId}).fetch();
		  var arrayLength = processDocuments.length;
			for (var i = 0; i < arrayLength; i++) {
				var taskId = processDocuments[i].taskId;
				var html = processDocuments[i].html;
				
			    console.log(processDocuments[i]);
			    //Do something
			    // attach an overlay to a node
			    //taskId is SCAN_OK for example
			      overlays.add(taskId, 'note', {
			        position: {
			          bottom: 0,
			          right: 0
			        },
			        html: '<div class="diagram-note">'+html+'</div>'
			      });
			}
	      // add marker
	      //canvas.addMarker('SCAN_OK', 'needs-discussion');
	    
	    var console2 = document.querySelector('#js-console2');
	    
	    function log2() {
    console2.value += Array.prototype.slice.call(arguments).map(function (e) {
      return String(e);
    }).join(' ');

    console2.value += '\n';
    console2.scrollTop = console2.scrollHeight;
  }
	    
	    
	    var eventBus = bpmnViewer.get('eventBus');

	    // you may hook into any of the following events
	    /*
	    var events = [
	      'element.hover',
	      'element.out',
	      'element.click',
	      'element.dblclick',
	      'element.mousedown',
	      'element.mouseup'
	    ];
		*/
		
		var events = [
	      'element.click'
	    ];
	
	    events.forEach(function (event) {
	
	      eventBus.on(event, function (e) {
	        // e.element = the model element
	        // e.gfx = the graphical element
	        console.log(event, 'on', e.element.id);
	        Router.go("/updateprocessdocuments/"+processId+"/"+e.element.id);
	      });
	    });  
	      
	      
	    });
	  }
	  
	  // load external diagram file via AJAX and import it
	  $.get('/bpmn2_diagrams/'+processFilename, importXML, 'text');
	  
	
	})(window.BpmnJS, window.jQuery);
	

      
};

Template.process.helpers({
	ProcessDocuments: function () {
		return docsResults = ProcessDocuments.find({}).fetch();
	},
	ProcessTitle: function () {
		return this.title;
	}
});

Template.process.events({
	"submit .searchForm": function (event,template) {
		event.preventDefault();
		Session.set("searchQuery",event.target.searchQuery.value);
		// Pas top pour les performances car on cherche deux fois ...
		var numberOfSearchResults=Docs.find({full: { $regex : event.target.searchQuery.value, $options:"i" } }).count();
		SearchQueries.insert({
		    searchDate: new Date(),
			who: Meteor.userId(),
			searchQuery: event.target.searchQuery.value,
			numberOfSearchResults : numberOfSearchResults
		});
	}
});