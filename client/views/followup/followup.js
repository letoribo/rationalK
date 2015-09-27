Template.followup.helpers({
	FollowUp: function () {
		return FollowUp.find().fetch();
	},
	settingsFollowUp: function () {
        return {
            rowsPerPage: 100,
            showFilter: true,
            class: 'table table-condensed col-sm-12',
						rowClass: function (item) {
					  var exists = item.exists;
					  switch (exists) {
					    case '':
							case false:
					      return 'danger';
					    default:
					      return '';
					  }
					},
					fields: [
				    {
				        key: 'createdAt',
				        label: 'Date',
								sortDirection: 'descending',
								sortByValue: true,
								fn: function (value) {
										return moment(value).format('DD.MM.YY HH:mm');
								},
				    },
						{
				        key: 'who',
				        label: 'Who',
								label: 'Username',
								fn: function (value, object) {
										return Members.collection.findOne({accountId: object.who}).profile.nickname;
								},
				    },
				    {
			        key: 'tags',
			        label: 'Tags',
							fn: function (value) {
								tags = value.replace(/;/g, ',').split(',');
				        htmlTags = tags.map(function (tag) {
				          return "<span class='label label-info searchThisWord'>" + tag + "</span>";
				        });
				        return new Spacebars.SafeString(htmlTags.join(' '));
							},
				    },
						{
				        key: 'text',
				        label: 'Text',
				    },
					],
		};
    },
	isAdmin: function () {
    var loggedInUser;
    loggedInUser = Meteor.user();
    return Roles.userIsInRole(loggedInUser, ['admin']);
	},
});
