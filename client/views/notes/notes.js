Template.notes.rendered = function () {
      
};

Template.notes.helpers({
	noteContent: function () {
		return Notes.findOne({userId : Meteor.userId()}).content;
	}
});



Template.notes.events({
	'submit form': function (event){
	    event.preventDefault();
	    var content = event.target.content.value;
	    Meteor.call('updateNote', content, Meteor.userId(), function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	}
});