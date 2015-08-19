Meteor.methods({
	saveControlPlan: function (controlPlanId,data) {
    //console.log("Updating Control Plan...")
		controlPlan.remove({});

    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        //console.log(data[i]);
        //Do something
        controlPlan.insert(
    			{
    			    line: data[i],
    			    autre: "dummy"
    			}
    		);
    }


    if (typeof(toastr) !== 'undefined') {
  		toastr.success('The control plan has been updated successfully');
    }
	},
  loadControlPlan: function (controlPlanId,data) {
    //console.log("Loading Control Plan...")

    var data = controlPlan.find({}).fetch();

    //console.log(data);
    var dataFormatted = []
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(data[i]);
        //Do something
        dataFormatted.push(data[i].line)
    }

		//console.log(dataFormatted)
    return dataFormatted;

    if (typeof(toastr) !== 'undefined') {
      toastr.success('The control plan has been successfully loaded');
    }
  }



});
