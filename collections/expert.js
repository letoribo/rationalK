Meteor.methods({
	updateFieldOfExpertise: function (content,userId) {
		Expert.update(
			{
			  userId: Meteor.userId()
			},
			{
			    fieldOfExpertise: content,
			    updatedAt: new Date(),
				userId: userId
			},
			{
			    upsert: true
			}
		);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('Updated succesfully');
		}
	}
});
