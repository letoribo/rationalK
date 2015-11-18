(function(){Template.gantts.rendered = function () {

};

Template.gantts.helpers({
	Gantts: function () {
		return Gantts.find({}).fetch();
	},
	settingsGantts: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            class: 'table table-condensed col-sm-12',
      			fields: [
      			    {
      			        key: 'ganttName',
      			        label: TAPi18n.__('Gantt name')
      			    },
      			    {
      			        key: 'actions',
      			        label: 'Actions',
      			        fn: function (value, object) {
      				        	var ganttId =  object._id
      				        	var url = Router.routes.gantt.path({_id: ganttId});
												var str = '<a href="' + url + '" title="Open"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>';
												str = str.concat(' <a href="#" class="duplicateGantt" data-source="'+ganttId+'" title="'+TAPi18n.__("Duplicate")+'"><span class="glyphicon glyphicon-duplicate"></span></a>');
												str = str.concat(' <a href="#" class="deleteGantt" data-ganttid="'+ganttId+'" title="'+TAPi18n.__("Delete")+'"><span class="glyphicon glyphicon-trash"></span></a>');
      							    return new Spacebars.SafeString(str);
      				    }
      			    }
      			]
		    }
    }
});

Template.gantts.events({
	"click a.newGantt": function (e){
			e.preventDefault();
			Meteor.call('newGantt', function (error, result) {
				if (error){
					if (typeof(toastr) !== 'undefined') {
		        toastr.error(error.reason);
		      }
				}
				else {
					if (typeof(toastr) !== 'undefined') {
		        toastr.success(TAPi18n.__("Gantt successfully created"));
		      }
					var ganttId = result;
					return Router.go("gantt",{_id : ganttId});
				}
			});
			return false;
	},
	"click a.duplicateGantt": function (e){
			e.preventDefault();
			var sourceGanttId = e.currentTarget.dataset.source
			Meteor.call('duplicateGantt',sourceGanttId, function (error, result) {
				if (error){
					if (typeof(toastr) !== 'undefined') {
		        toastr.error(error.reason);
		      }
				}
				else {
					if (typeof(toastr) !== 'undefined') {
		        toastr.success(TAPi18n.__("Gantt successfully duplicated"));
		      }
					var ganttId = result;
					return Router.go("gantt",{_id : ganttId});
				}
			});
			return false;
	},
	"click a.deleteGantt": function (e){
			e.preventDefault();
			var ganttId = e.currentTarget.dataset.ganttid
			Meteor.call('deleteGantt',ganttId, function (error, result) {
				if (error){
					if (typeof(toastr) !== 'undefined') {
		        toastr.error(error.reason);
		      }
				}
				else {
					if (typeof(toastr) !== 'undefined') {
		        toastr.success(TAPi18n.__("Gantt successfully deleted"));
		      }
				}
			});
			return false;
	}
});

})();
