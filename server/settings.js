if (Meteor.isServer) {
  Meteor.startup(function () {
    //todo : pass this as option in the settings page
      var roles = [];
      var role = {};
      role.name = "CdP";
      role.slug = getSlug(role.name);
      roles.push(role);
      var role = {};
      role.name = "Spécialistes";
      role.slug = getSlug(role.name);
      roles.push(role);

      if (Meteor.settings.public.debug){
        console.log("Roles : ")
        console.log(roles)
      }

      rkSettings.update(
        {
          key : "Roles"
        },
        {
          key : "Roles",
          value : roles
        },
        {
          upsert : true
        }
      );
      rkSettings.update(
        {
          key: "discussions"
        },
        {
          key: "discussions",
          value: Meteor.settings.discussions
        },
        {
          upsert : true
        }
      );
      rkSettings.update(
        {
          key: "simple_search_behavior"
        },
        {
          key: "simple_search_behavior",
          value: Meteor.settings.simple_search_behavior
        },
        {
          upsert : true
        }
      );
      rkSettings.update(
        {
          key: "forbiddenPaths"
        },
        {
          key: "forbiddenPaths",
          value: Meteor.settings.forbiddenPaths
        },
        {
          upsert : true
        }
      );


      Meteor.call("listAvailableFunctions", function (error, results) {
        var availableFunction, j, len;
        var availableFunctionsValue = [];

        rkSettings.update(
          {
            key: "customFieldsType"
          },
          {
            key: "customFieldsType",
            value: results
          },
          {
            upsert : true
          }
        );

        if ((results != null)) {
          for (j = 0, len = results.length; j < len; j++) {
            availableFunction = results[j];
            availableFunctionsValue.push(availableFunction.value);
          }
          rkSettings.update(
            {
              key: "availableFunctionsValue"
            },
            {
              key: "availableFunctionsValue",
              value: availableFunctionsValue
            },
            {
              upsert : true
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
          validatedFilesPath: Match.Optional(String)
        }
      ));
      if (typeof data.validatedFilesPath !== 'undefined') {
        rkSettings.update(
          {
            key: "validatedFilesPath"
          },
          {
            key: "validatedFilesPath",
            value: data.validatedFilesPath
          },
          {
            upsert : true
          }
        );
      }
    }
  }); //end of server methods


}//end if server
