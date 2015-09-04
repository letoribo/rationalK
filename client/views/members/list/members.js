Template.members.helpers({
  members: function () {
    return Members.collection.find();
  },
  myMembers: function () {
		return Members.collection.find().fetch();
	},
  settingsMyMembers: function () {
      return {
          rowsPerPage: 50,
          showFilter: true,
          class: 'table table-condensed col-sm-12',
					showNavigation: 'auto',
					fields: [
              {
                key: 'email',
                label: 'Email',
                fn: function (value, object) {
                    return object.email;
                },
              },
              {
                key: 'nickname',
                label: TAPi18n.__("Username"),
                fn: function (value, object) {
                    return object.profile.nickname;
                },
              },
              {
                key: 'name',
                label: TAPi18n.__("Name"),
                fn: function (value, object) {
                    return object.profile.name;
                },
              },
              {
                key: 'accountId',
                label: TAPi18n.__("Account ID"),
                fn: function (value, object) {
                    return object.accountId ? object.accountId : new Spacebars.SafeString('<span class="label label-warning">Invitation pending</span>');
                },
              },
              {
                key: 'roles',
                label: TAPi18n.__("Roles"),
                fn: function (value, object) {
                  var html = '';
                  var rolesArray = object.profile.roles;
                  if ((typeof rolesArray !== 'undefined') && (rolesArray !== null) ) {
                    var arrayLength = rolesArray.length;
                    for (i = 0; i < arrayLength; i++) {
                        html = html .concat(' <span class="label label-success">' + rolesArray[i] + '</span>');
                    }
                  }
                  return  new Spacebars.SafeString(html);
                },
              },
              {
                key: 'Actions',
                label: TAPi18n.__("Actions"),
                fn: function (value, object) {
                    var memberEditUrl = Router.routes.memberEdit.url({_id: object._id});
                    return new Spacebars.SafeString('<a href="' + memberEditUrl + '" title="' + TAPi18n.__("Edit") + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>');
                },
              },
					],
		};
  },
});
