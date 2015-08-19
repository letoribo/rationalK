var columns= [
	{data: 'order'},
	{data: 'processFlowStep'},
	{data: 'operation'},
	{data: 'CDMERCCTRL'},
	{data: 'machine'},
	{data: 'charac'},
	{data: 'characDim'},
	{data: 'characTol'},
	{data: 'measurementTool'}
];

var colHeadersText = []
colHeadersText.order= 'Order';
colHeadersText.operation = 'Operation';
colHeadersText.CDMERCCTRL = 'CDMER/CCTRL';
colHeadersText.machine = 'Machine';
colHeadersText.charac = 'Charact.';
colHeadersText.characDim = 'Charact. Dim.';
colHeadersText.characTol = 'Charact. Tol.';
colHeadersText.measurementTool = 'Measurment Tool';
colHeadersText.processFlowStep = 'Process Flow Step';

var colHeaders=[]
var arrayLength = columns.length;
for (var i = 0; i < arrayLength; i++) {
		colHeaders.push(colHeadersText[columns[i].data])
}

var demoData = [
    {order: 1, operation: "Decolletage", CDMERCCTRL: "CDMER",machine:"CNC",charac:'Largeur',characDim:8,characTol:'+/- 0.04',measurementTool:'Micrometre',processFlowStep:'Decolletage - Mise en Route'},
		{order: 2, operation: "Decolletage", CDMERCCTRL: "CDMER",machine:"CNC",charac:'Diam Ext',characDim:20,characTol:'+/- 0.03',measurementTool:'Micrometre Ext',processFlowStep:''},
		{order: 3, operation: "Decolletage", CDMERCCTRL: "CDMER",machine:"CNC",charac:'Diam Int',characDim:16,characTol:'+/- 0.03',measurementTool:'Micrometre Int',processFlowStep:''},
		{order: 4, operation: "Decolletage", CDMERCCTRL: "CCTRL",machine:"CNC",charac:'Largeur',characDim:8,characTol:'+/- 0.04',measurementTool:'Micrometre',processFlowStep:'Decolletage - Production'},
		{order: 5, operation: "Planage", CDMERCCTRL: "CDMER",machine:"Discus",charac:'Largeur',characDim:7,characTol:'+/- 0.02',measurementTool:'Micrometre',processFlowStep:'Planage - Mise en Route'},
		{order: 6, operation: "Planage", CDMERCCTRL: "CCTRL",machine:"Discus",charac:'Largeur',characDim:7,characTol:'+/- 0.02',measurementTool:'Micrometre',processFlowStep:'Planage - Production'}
];

Template.controlplan.rendered = function () {
	Meteor.call('loadControlPlan',"dummyControlPanId","dummyData", function (error, result) {
	if (error) {
		// handle error
	} else {
		// examine result
		//console.log("It is a success")
		//console.log(result);

		var $container = $("#myHandsonTableDiv");

		$container.handsontable({
			data: result,
			colHeaders : colHeaders,
			columns: columns,
			rowHeaders: false,
			minSpareRows: 1,
			contextMenu: true
		});

	}
	});

};

Template.processFlow.helpers({
	processes : function (){
		processes = controlPlan.find(
			{ $and: [
				{"line.processFlowStep": {$exists: true, $ne: "", $ne: null }}
			] },
			{sort: { "line.order": 1}}
		).fetch()

		return processes
	},
	processStep : function (){
		console.log(this);
		if (this.line.processFlowStep!==""){
			return new Spacebars.SafeString("<center>"+this.line.processFlowStep+"<br/><span class='glyphicon glyphicon-arrow-down' aria-hidden='true'></span></center>");
		}
		else {
			return false;
		}
	}
});

Template.decCDMER.helpers({
	tableDecCDMER: function (){
		Characteristics = controlPlan.find(
			{ $and: [
				{ "line.operation":  "Decolletage" },
				{ "line.CDMERCCTRL":  "CDMER" }
			] },
			{sort: { "line.order": 1}}
		).fetch()
		//console.log(Characteristics)
		return Characteristics
	},
	settingsDecCDMER: function (){
		return {
				showFilter: false,
				showNavigation: 'never',
				class: 'table table-condensed table-bordered col-sm-12',
				fields: [
					{
							key: 'order',
							label: 'Order',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.order);
							},
							hidden: true
					},
					{
							key: 'caracteristic',
							label: 'Caractéristiques',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.charac);
				    	},
							sortable: false
					},
					{
							key: 'prescription',
							label: 'Prescription',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.characDim + " " + object.line.characTol);
				    	},
							sortable: false
					},
					{
							key: 'measured',
							label: 'Mesurée',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
				    	},
							sortable: false
					},
					{
							key: 'measurementTool',
							label: 'Appareil',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.measurementTool);
				    	},
							sortable: false
					},
					{
							key: 'comparateur',
							label: 'N° Comparateur',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'touches',
							label: 'Touches',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'resolution',
							label: 'Résolution',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'spc',
							label: 'SPC',
							fn: function (value, object) {
									return new Spacebars.SafeString("..");
							},
							sortable: false
					}
				]
			}
	}
});

Template.planageCDMER.helpers({
	tablePlanageCDMER: function (){
		Characteristics = controlPlan.find(
			{ $and: [
				{ "line.operation":  "Planage" },
				{ "line.CDMERCCTRL":  "CDMER" }
			] },
			{sort: { "line.order": 1}}
		).fetch()
		//console.log(Characteristics)
		return Characteristics
	},
	settingsPlanageCDMER: function (){
		return {
				showFilter: false,
				showNavigation: 'never',
				class: 'table table-condensed table-bordered col-sm-12',
				fields: [
					{
							key: 'order',
							label: 'Order',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.order);
							},
							hidden: true
					},
					{
							key: 'caracteristic',
							label: 'Caractéristiques',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.charac);
				    	},
							sortable: false
					},
					{
							key: 'prescription',
							label: 'Prescription',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.characDim + " " + object.line.characTol);
				    	},
							sortable: false
					},
					{
							key: 'measured',
							label: 'Mesurée',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
					    },
							sortable: false
					},
					{
							key: 'measurementTool',
							label: 'Appareil',
							fn: function (value, object) {
									return new Spacebars.SafeString(object.line.measurementTool);
				    	},
							sortable: false
					},
					{
							key: 'comparateur',
							label: 'N° Comparateur',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'touches',
							label: 'Touches',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'resolution',
							label: 'Résolution',
							fn: function (value, object) {
									return new Spacebars.SafeString("............");
							},
							sortable: false
					},
					{
							key: 'spc',
							label: 'SPC',
							fn: function (value, object) {
									return new Spacebars.SafeString("..");
							},
							sortable: false
					}
				]
			}
	}
});


Template.controlplan.helpers({
	tableDecCCTRL: function (){
		Characteristics = controlPlan.find(
			{ $and: [
				{ "line.operation":  "Decolletage" },
				{ "line.CDMERCCTRL":  "CCTRL" }
			] },
			{sort: { "line.order": 1}}
		).fetch()
		//console.log(Characteristics)
		return Characteristics
	},
	settingsDecCCTRL: function (){
		return {
				showNavigation: 'never',
				showFilter: false,
				class: 'table table-condensed col-sm-12',
				fields: [
						{
								key: 'caracteristic',
								label: 'Caractéristiques',
								fn: function (value, object) {
										//console.log(value)
										//console.log(object)
					        	//console.log(this)
										return new Spacebars.SafeString(object.line[4]);
					    }
						}
				]
			}
	}
});



Template.controlplan.events({
	'click a.save': function (event){
	    event.preventDefault();
			var hotInstance = $("#myHandsonTableDiv").handsontable('getInstance');
			var data = hotInstance.getData();
			//console.log(data)
	    Meteor.call('saveControlPlan',"dummyControlPanId",data, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	},
	'click a.load': function (event){
	    event.preventDefault();
	    Meteor.call('loadControlPlan',"dummyControlPanId","dummyData", function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
				//console.log("It is a success")
				//console.log(result);

				var $container = $("#myHandsonTableDiv");

		    $container.handsontable({
		      data: result,
					colHeaders : colHeaders,
					columns: columns,
		      rowHeaders: false,
		      minSpareRows: 1,
		      contextMenu: true
		    });

		  }
		});
	},
	'click a.reset': function (event){
	    event.preventDefault();

			//console.log("Resetting...")

			var $container = $("#myHandsonTableDiv");
	    $container.handsontable({
	      data: demoData,
				colHeaders : colHeaders,
				columns: columns,
	      rowHeaders: false,
	      minSpareRows: 1,
	      contextMenu: true
	    });
	}
});
