if (Meteor.isServer) {
	Meteor.methods({
  	saveGantt: function (tasks,ganttId) {
			check(ganttId,String);
			check(tasks,Match.Any); //todo
			if (Meteor.settings.public.debug){
	      console.log("Saving Gantt...");
	      console.log(tasks);
			}
      Gantts.update(
  			{
  			  _id: ganttId
  			},
  			{
					$set: {
		        "tasks": tasks
		      }
  			},
  			{
  			  upsert: true
  			}
  		);
    },
		newGantt: function () {
			if (Meteor.settings.public.debug){
      	console.log("Creating Gantt...");
			}
      return Gantts.insert({ganttName: TAPi18n.__("My new gantt")});
    },
		duplicateGantt: function (ganttSourceId) {
			check(ganttSourceId,String);
			if (Meteor.settings.public.debug){
      	console.log("Duplicating Gantt...");
			}
			var sourceGantt = Gantts.findOne({_id : ganttSourceId});
      return Gantts.insert(
				{
					ganttName : sourceGantt.ganttName.concat(' ').concat(TAPi18n.__('Copy')),
					tasks : sourceGantt.tasks
				}
			);
    },
		deleteGantt: function (ganttId) {
			check(ganttId,String);
			if (Meteor.settings.public.debug){
      	console.log("Deleting Gantt...");
			}
      return Gantts.remove({_id: ganttId});
    },
		renameGantt: function (ganttId,ganttNewName) {
			check(ganttId,String);
			check(ganttNewName,String);
			if (Meteor.settings.public.debug){
      	console.log("Renaming Gantt...");
			}
			Gantts.update(
  			{
  			  _id: ganttId
  			},
  			{
					$set: {
		        "ganttName": ganttNewName
		      }
  			}
  		);
      return false;
    }
  });
}
