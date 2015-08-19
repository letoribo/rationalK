Template.projects.rendered = function () {

};

Template.projects.helpers({
	Projects: function () {
		return Projects.find({}).fetch();
	},
});

Template.projects.events({
	'submit form': function (event){
	    event.preventDefault();
	    var projectTitle = event.target.projectTitle.value;
		var projectFolderPath = event.target.projectFolderPath.value;
	    Meteor.call('createProject', projectTitle,projectFolderPath, function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	},
	"click a.delete": function (event){
	    event.preventDefault();
	    console.log(this);
	    Meteor.call('deleteProject', this._id, function (error, result) {});
			return false;
	}
});
