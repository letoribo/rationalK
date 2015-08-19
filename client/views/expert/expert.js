Template.expert.rendered = function () {
      
};

Template.expert.helpers({
	myFieldOfExpertise: function () {
		return Expert.findOne({userId : Meteor.userId()}).fieldOfExpertise;
	}
});



Template.expert.events({
	'submit form': function (event){
	    event.preventDefault();
	    var myFieldOfExpertise = event.target.myFieldOfExpertise.value;
	    Meteor.call('updateFieldOfExpertise', myFieldOfExpertise, Meteor.userId(), function (error, result) {
		  if (error) {
		    // handle error
		  } else {
		    // examine result
		  }
		});
	}
});