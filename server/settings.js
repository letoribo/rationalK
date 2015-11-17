if (Meteor.isServer) {
  Meteor.startup(function () {
      rkSettings.update(
        {
          key: "simple_search_behavior",
        },
        {
          key: "simple_search_behavior",
          value: Meteor.settings.simple_search_behavior,
        },
        {
          upsert: true,
        }
      );
      rkSettings.update(
        {
          key: "forbiddenPaths",
        },
        {
          key: "forbiddenPaths",
          value: Meteor.settings.forbiddenPaths,
        },
        {
          upsert: true,
        }
      );
  });

	Meteor.methods({
    updateSettings: function (data) {
      var roles = [];
      var role = {};
      var arrayLength;
      check(data, Match.Optional(
        {
          validatedFilesPath: Match.Optional(String),
          projectFileTypes: Match.Optional(String),
          Roles: Match.Optional(String),
        }
      ));
      if (typeof data.validatedFilesPath !== 'undefined') {
        rkSettings.update(
          {
            key: "validatedFilesPath",
          },
          {
            key: "validatedFilesPath",
            value: data.validatedFilesPath,
          },
          {
            upsert: true,
          }
        );
      }
      else if (typeof data.Roles !== 'undefined') {
        rolesTemp = data.Roles.split('|');
        arrayLength = rolesTemp.length;
        for (i = 0; i < arrayLength; i++) {
          role = {};
          role.name = rolesTemp[i];
          role.slug = getSlug(role.name);
          roles.push(role);
        }

        rkSettings.update(
          {
            key: "Roles",
          },
          {
            key: "Roles",
            value: roles,
          },
          {
            upsert: true,
          }
        );
      }
    },
  }); //end of server methods
}//end if server
