Template.gantt.rendered = function () {
	var today = new Date();
	if (Meteor.settings.public.debug){
		console.log("test : ");
		console.log(moment(today).businessAdd(2, 'days').format("DD-MM-YYYY"));
		console.log("test end");
	}

	var demo_tasks = {
		data:[
			{
				"id":1, "text":"TG1", "start_date":moment(today).format("DD-MM-YYYY"),"duration":"2","order":"10", progress: 0, open: false
			},
			{
				"id":2, "text":"Process", "start_date":moment(today).businessAdd(3, 'days').format("DD-MM-YYYY"), "duration":"3", "order":"20", progress: 0, open: true,
				"predecessors": [1],
			},
			{
				"id":3, "text":"Production", "start_date":moment(today).businessAdd(6, 'days').format("DD-MM-YYYY"), "duration":"3", "order":"30", progress: 0, open: true,
				"predecessors": [2],
			},
		],
		links:[
			{id:"1",source:"1",target:"2",type:gantt.config.links.finish_to_start},
			{id:"2",source:"2",target:"3",type:gantt.config.links.finish_to_start}
		]
	};
			var ganttObj = Gantts.findOne({_id:this.data._id});
			if (Meteor.settings.public.debug){
				console.log(ganttObj);
			}


			if (typeof(ganttObj.tasks) !== 'undefined') {
				var tasks = ganttObj.tasks
			}
			else {
				var tasks = demo_tasks;
			}


			/*
			var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
			var today = new Date();
			gantt.addMarker({
				start_date: today,
				css: "today",
				text: "Today",
				title:"Today: "+ date_to_str(today)
			});

			var start = new Date(2013, 2, 28);
			gantt.addMarker({
				start_date: start,
				css: "status_line",
				text: "Start project",
				title:"Start project: "+ date_to_str(start)
			});
			*/

			gantt.templates.scale_cell_class = function (date){
			    if(!gantt.isWorkTime(date)){
			        return "weekend";
			    }
			};
			gantt.templates.task_cell_class = function (item,date){
			    if(!gantt.isWorkTime(date)){
			        return "weekend" ;
			    }
			};

			gantt.templates.rightside_text = function (start, end, task){
				if(task.type == gantt.config.types.milestone){
					return task.text;
				}
				return "";
			}

			gantt.config.columns = [
			    {name:"text",       label:"Task name",  width:"*", tree:true },
			    {name:"start_time",   label:"Start time",  template:function (obj){
					return gantt.templates.date_grid(obj.start_date);
			    }, align: "center", width:60 },
			    {name:"duration",   label:"Duration", align:"center", width:60},
			    {name:"add",        label:"",           width:44 }
			];

			gantt.config.grid_width = 390;
			gantt.config.date_grid = "%F %d"

			gantt.config.scale_unit = "day";
			gantt.config.date_scale = "%d.%m";

			gantt.config.scale_height  = 60;
			gantt.config.subscales = [
				{ unit:"week", step:1, date:"Week #%W"}
			];
			gantt.config.order_branch = true;
			//gantt.config.sort = true;
			gantt.config.work_time = true; //removes non-working time from calculations
			gantt.skip_off_time = true;    //hides non-working time in the chart

			gantt.init("gantt_here");

			gantt.parse(tasks);

};

Template.gantt.helpers({
	ganttWarnings: function () {
		return Session.get('ganttWarning');
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
});

Template.gantt.events({
	"click a.checkGanttWarnings": function (e){
	    e.preventDefault();
			var links = gantt.getLinks();
			if (Meteor.settings.public.debug){
				console.log("links : ")
				console.log(links)
			}
			var ganttWarnings = [];
			for (i = 0; i < links.length; i++) {
				var obj = {}

				//check if the target start before the source -> Not allowed
				var targetTask = gantt.getTask(links[i].target);
				var sourceTask = gantt.getTask(links[i].source);
				if (links[i].source==0){
					//finish_to_start
					var targetTaskStartTime = targetTask.start_date;
					var sourceTaskEndTime = gantt.calculateEndDate(sourceTask.start_date,sourceTask.duration,"day");
					console.log(moment(targetTaskStartTime).diff(moment(sourceTaskEndTime)))
					if (moment(targetTaskStartTime).diff(moment(sourceTaskEndTime))<0){
						//pas Bon
						obj.text = "The task " + targetTask.text + " should start after the task " + sourceTask.text;
						ganttWarnings.push(obj)
					}
					console.log(sourceTaskEndTime)
					console.log(targetTaskStartTime)
				}
			}
			Session.set('ganttWarning',ganttWarnings);
			return false;

	},
	"click a.showCriticalPath": function (e){
			var today = new Date();

			Tasks = [
			{
				"id":1,
				"text":"TG1",
				"start_date":moment(today).format("DD-MM-YYYY"),
				"duration":"2",
				"order":"10",
				progress: 0,
				open: false,
			},
			{
				"id":2,
				"text": "Process",
				"start_date": moment(today).businessAdd(3, 'days').format("DD-MM-YYYY"),
				"duration":"3",
				"order":"20",
				progress: 0,
				open: true,
				"predecessors": [1],
			},
			{
				"id":3,
				"text":"Production",
				"start_date":moment(today).businessAdd(6, 'days').format("DD-MM-YYYY"),
				"duration":"3",
				"order":"30",
				"progress": 0,
				"open": true,
				"predecessors": [2],
			},
		];
		console.log(Tasks);
		lastTask = getLastTasks(Tasks);

		function getLastTasks(Tasks){
			nTasks = Tasks.length;
			lastDate = moment("01-01-1900","DD-MM-YYYY");
			for (i = 0; i < nTasks; i++) {
				endDate = moment(Tasks[i].start_date,"DD-MM-YYYY").businessAdd(Tasks[i].duration, 'days').format("DD-MM-YYYY");
				//endDate = moment(Tasks[i].start_date,"DD-MM-YYYY").businessAdd(1, 'days').format("DD-MM-YYYY");
				console.log("Task Id : ")
				console.log(Tasks[i].id);
				console.log("Task startDate : ");
				console.log(Tasks[i].start_date);
				console.log("Task duration [days]: ");
				console.log(Tasks[i].duration);
				console.log("Task calculated end Date: ");
				console.log(endDate);
				Tasks[i].end_date = endDate;
			}
			console.log("Tasks : ");
			console.log(Tasks);
			function byDescendingDate (a, b) {
				var aa = moment(a.end_date, "DD-MM-YYYY");
				var bb = moment(b.end_date, "DD-MM-YYYY");
				if (aa.diff(bb) < 0) {
					return 1;
				}
				if (aa.diff(bb) > 0) {
					return -1;
				}
				return 0;
			}
			tasksOrderedByDescendingDates = Tasks.sort(byDescendingDate);
			console.log("Tasks by descending dates : ");
			console.log(tasksOrderedByDescendingDates);
			return Tasks[0];
		}

		function computeCriticalPath(Tasks){
			lastTask = getLastTasks(Tasks);
			console.log("lastTask : ");
			console.log(lastTask);

		}

		computeCriticalPath(Tasks);




	  e.preventDefault();
		return false;
	},
	"click a.saveGantt": function (e){
	    e.preventDefault();
			var tasks = {};
			var data = [];
			gantt.eachTask(function (task){
				delete task['$index'];
				delete task['$level'];
				delete task['$no_end'];
				delete task['$no_start'];
				delete task['$open'];
				delete task['$rendered_parent'];
				delete task['$rendered_type'];
				delete task['$source'];
				delete task['$target'];
				if (Meteor.settings.public.debug){
					console.log(task);
				}
				data.push(task)
			});

			var links = gantt.getLinks();
			if (Meteor.settings.public.debug){
				console.log(links);
			}

			tasks.data = data ;
			tasks.links = links ;
			if (Meteor.settings.public.debug){
				console.log(this);
			}
			ganttId = this._id;
	    Meteor.call('saveGantt',tasks,ganttId, function (error, result) {});
			return false;
	},
	'submit form': function (e){
	    e.preventDefault();
	    var ganttName = event.target.ganttName.value;
	    Meteor.call('renameGantt',this._id,ganttName, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
				if (typeof(toastr) !== 'undefined') {
					toastr.success(TAPi18n.__("Gantt successfully renamed"));
				}
		  }
		});
	}
});
