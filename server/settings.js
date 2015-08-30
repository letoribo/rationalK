if (Meteor.isServer) {
  Meteor.startup(function () {
      rkSettings.update(
        {
          key: "discussions",
        },
        {
          key: "discussions",
          value: Meteor.settings.discussions,
        },
        {
          upsert: true,
        }
      );
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

      Meteor.call("listAvailableFunctions", function (error, results) {
        var availableFunction;
        var j;
        var len;
        var availableFunctionsValue = [];

        rkSettings.update(
          {
            key: "customFieldsType",
          },
          {
            key: "customFieldsType",
            value: results,
          },
          {
            upsert: true,
          }
        );

        if ((results != null)) {
          for (j = 0, len = results.length; j < len; j++) {
            availableFunction = results[j];
            availableFunctionsValue.push(availableFunction.value);
          }
          rkSettings.update(
            {
              key: "availableFunctionsValue",
            },
            {
              key: "availableFunctionsValue",
              value: availableFunctionsValue,
            },
            {
              upsert: true,
            }
          );
        }
        return true;
      });
  });

	Meteor.methods({
    updateSettings: function (data) {
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
      else if (typeof data.projectFileTypes !== 'undefined') {
        rkSettings.update(
          {
            key: "projectFileTypes",
          },
          {
            key: "projectFileTypes",
            value: data.projectFileTypes,
          },
          {
            upsert: true,
          }
        );
      }
      else if (typeof data.Roles !== 'undefined') {
        var roles = [];
        var role = {};

        rolesTemp = data.Roles.split('|');

        var arrayLength = rolesTemp.length;
        for (i = 0; i < arrayLength; i++) {
          role = {};
          role.name = rolesTemp[i];
          role.slug = getSlug(role.name);
          roles.push(role);
        }

        if (Meteor.settings.public.debug){
          console.log("Roles 2 : ")
          console.log(roles)
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
