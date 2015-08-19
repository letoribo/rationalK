Meteor.methods({
	addRole: function (data) {
		check(data, {
				role: String
			}
		);
		var roles = rkSettings.findOne({key: "Roles"}).value;
		var role = {};
		role.name = data.role;
		role.slug = getSlug(data.role);
		roles.push(role);

		rkSettings.update(
			{
				key : "Roles"
			},
			{
			    key: "Roles",
			    value: roles
			},
			{
			    upsert: true
			}
		);
	},
	updateProcess: function (title,filename) {
	Processes.update(
		{
		  $and: [
		  	{title: title},{filename:filename}
		  ]
		},
		{
		    title: title,
		    filename: filename
		},
		{
		    upsert: true
		}
	);
	toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "progressBar": false,
	  "positionClass": "toast-top-right",
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
	toastr.success('The process has been added successfully');


	},
	deleteProcess: function (processId) {
		Processes.remove(processId);
		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "progressBar": false,
		  "positionClass": "toast-top-right",
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		toastr.success('The process has been deleted');
	}


});
