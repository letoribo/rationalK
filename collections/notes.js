Meteor.methods({
	updateNote: function (content,userId) {
		Notes.update(
			{
			  userId: Meteor.userId()
			},
			{
			    content: content,
			    updatedAt: new Date(),
				userId: userId
			},
			{
			    upsert: true
			}
		);
		if (typeof(toastr) !== 'undefined') {
			toastr.success('Note updated succesfully');
		}
	}
});
