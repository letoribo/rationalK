Meteor.methods({
	addRole: function (data) {
		var roles = rkSettings.findOne({key: "Roles"}).value;
		var role = {};
		check(data, {
				role: String,
			}
		);
		role.name = data.role;
		role.slug = getSlug(data.role);
		roles.push(role);

		rkSettings.update(
			{
				key : "Roles",
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
	updateProcess: function (title, filename) {
	Processes.update(
		{
		  $and: [
		  	{title: title},
				{filename: filename},
		  ],
		},
		{
		    title: title,
		    filename: filename,
		},
		{
		    upsert: true,
		}
	);
	toastr.success('The process has been added successfully');
	},
	deleteProcess: function (processId) {
		Processes.remove(processId);
		toastr.success('The process has been deleted');
	},
});
