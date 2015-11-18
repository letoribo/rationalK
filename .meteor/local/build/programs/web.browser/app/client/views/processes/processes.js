(function(){Template.processes.rendered = function () {

};

Template.processes.helpers({
	Processes: function () {
		return Processes.find({}).fetch();
	},
	Roles : function () {
		return rkSettings.findOne({key: "Roles"}).value
	},
	settingsRoles: function () {
      return {
          rowsPerPage: 50,
          showFilter: true,
          class: 'table table-condensed col-sm-12',
					showNavigation: 'auto',
					fields: [
              {
                key : 'name',
                label: TAPi18n.__('Name')
              },
							{
								key: 'Action',
								label: TAPi18n.__("Action"),
								fn: function (value, object) {
										var doc = Docs.findOne(object.docId);
										url = Router.routes.listDocsForRoles.path({role: object.slug})
										var str = '<a href="'+url+'" title="'+TAPi18n.__("See all documents useful for this role")+'"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>';
										return new Spacebars.SafeString(str);
								}
							}
					]
		}
  }
});

Template.processes.events({
	'submit .addProcess': function (event){
	    event.preventDefault();
	    var processTitle = event.target.processTitle.value;
	    var processFilename = event.target.processFilename.value;
	    Meteor.call('updateProcess', processTitle, processFilename, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	},
	'submit .addRole': function (e){
	    e.preventDefault();
			var data = {}
			data.role = e.target.role.value;
			
			var exists = (rkSettings.find({$and : [{key:"Roles"},{"value.slug" : getSlug(data.role)}]}).count() === 0) ? false : true;
			if (exists) {
				if (typeof(toastr) !== 'undefined') {
	        toastr.error("This role already exists");
	      }
			}
			else {
		    Meteor.call('addRole', data, function (error, result) {
				  if (error) {
				    // handle error
				  }
					else {
						if (typeof(toastr) !== 'undefined') {
			        toastr.success("Role added with success");
			      }
				  }
				});

			}

	},
	"click a.delete": function (event){
	    event.preventDefault();
	    console.log(this);
	    Meteor.call('deleteProcess', this._id, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
		return false;
	}
});

})();
