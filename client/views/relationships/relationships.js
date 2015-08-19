Template.relationships.rendered = function () {
	var i ={};
	var s = {};
	var g = {nodes: [],edges:[]};
    
	g.nodes.push({
	    id: 'nodeId0',
	    label: 'docId=257367',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666'
	  });
	
	
	g.nodes.push({
	    id: 'nodeId1',
	    label: 'docId=257',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666'
	  });
	
	g.nodes.push({
	    id: 'nodeId2',
	    label: 'docId=23',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666'
	  });
	
	g.nodes.push({
	    id: 'nodeId3',
	    label: 'docId=35',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666'
	  });
	  
	g.nodes.push({
	    id: 'nodeId4',
	    label: 'docId=325',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666'
	  });
	
	g.nodes.push({
	    id: 'CmZHzNsXLGJAu4LDZ',
	    label: 'docId=25',
	    x: Math.random(),
	    y: Math.random(),
	    size: 1,
	    color: '#666',
	    attribute_category: 'norm',
	    
	  });
	
	
	g.edges.push({
	    id: 'edgeId12',
	    label: 'Share the same tag=Ceramic ',
	    source: 'nodeId1',
	    target: 'nodeId2',
	    size: 1,
	    color: '#ccc',
	    type: 'curve',
	    myEdgeAttr:'sametag'
	  });
	  
	g.edges.push({
	    id: 'edgeId13',
	    label: 'Share the same author=Thomas ',
	    source: 'nodeId1',
	    target: 'nodeId3',
	    size: 1,
	    color: '#ccc',
	    type: 'curve'
	  });
	
	g.edges.push({
	    id: 'edgeId14',
	    label: 'Share the same author=Thomas ',
	    source: 'nodeId2',
	    target: 'nodeId3',
	    size: 1,
	    color: '#ccc',
	    type: 'curve'
	  });
	  
	 g.edges.push({
	    id: 'edgeId15',
	    label: 'Share the same tag=Material ',
	    source: 'nodeId3',
	    target: 'nodeId4',
	    size: 1,
	    color: '#ccc',
	    type: 'curve',
	    myEdgeAttr:'sametag'
	  });
	
	 g.edges.push({
	    id: 'edgeId16',
	    label: 'Child Document',
	    source: 'nodeId3',
	    target: 'CmZHzNsXLGJAu4LDZ',
	    size: 2,
	    color: 'red',
	    type: 'curvedArrow'
	  });


	// Instantiate sigma:
	s = new sigma({
	  graph: g,
	  renderer: {
	    container: document.getElementById('graph-container'),
	    type: 'canvas'
	  },
	  settings: {
	    edgeLabelSize: 'proportional',
	    doubleClickEnabled: false,
	    minEdgeSize: 0.5,
	    maxEdgeSize: 4,
	    enableEdgeHovering: true,
	    edgeHoverColor: 'edge',
	    defaultEdgeHoverColor: '#000',
	    edgeHoverSizeRatio: 1,
	    edgeHoverExtremities: true
	  }
	    
	});

	// Start the ForceAtlas2 algorithm:
	s.startForceAtlas2({worker: true, barnesHutOptimize: false});
	
	// Stop the force algo after 2 seconds
	function callback(s){
	    return function (){
	    	s.stopForceAtlas2();
	    }
	}
	setTimeout(callback(s), 2000);

	
	// Bind the events:
	s.bind('overNode rightClickNode', function (e) {
	  document.getElementById("docName").innerHTML = e.data.node.label
	  document.getElementById("attribute_category").innerHTML = e.data.node.attribute_category
	});
	
	s.bind('clickNode doubleClickNode', function (e) {
	document.location.href="http://rationalk.odeus.net/doc/" + e.data.node.id + "/edit"
	});
	
	s.bind('outNode', function (e) {
	  console.log(e.type, e.data.node.label, e.data.captor);
	  document.getElementById("docName").innerHTML = '';
	  document.getElementById("attribute_category").innerHTML = '';
	});
	
	s.bind('overEdge outEdge clickEdge doubleClickEdge rightClickEdge', function (e) {
	  console.log(e.type, e.data.edge, e.data.captor);
	});
	s.bind('clickStage', function (e) {
	  console.log(e.type, e.data.captor);
	});
	s.bind('doubleClickStage rightClickStage', function (e) {
	  console.log(e.type, e.data.captor);
	});


  
};

Template.relationships.helpers({
	noteContent: function () {
		return Notes.findOne({userId : Meteor.userId()}).content;
	}
});



Template.relationships.events({
	
});