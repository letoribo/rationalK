if (Meteor.settings.sql.do) {
var opts = {
      //query : "select * from projtablecube where PROJID = @projectId",
      query : "select * from projtablecube where STATUS = @status AND TYPE = @type",
      inputs : {
        //projectId : Sql.driver.NVarChar
        status : Sql.driver.NVarChar,
        type : Sql.driver.NVarChar
      }
    }

    // Sync-style
    try {
      var query = Sql.ps(opts);
    } catch (e) {
      RKCore.log("e : ");
      RKCore.log(e);
    }

    //var result  = query({ projectId : "001303" });
    var result  = query({ status : "3" , type : "4" });
    var arrayLength = result.length;
    for (var i = 0; i < arrayLength; i++) {
      //console.log(result[i]);
      entry = result[i];
      Axapta.update(
        {
          projectId : entry.PROJID,
        },
        {
            projectId: entry.PROJID,
            projectName: entry.NAME,
            projectManager: entry.WORKERRESPONSIBLENAME,
            customerAccount: entry.CUSTACCOUNT,
            status: entry.STATUS, //3 en cours 4 : terminé
            type: entry.TYPE,
            salesman: entry.WORKERRESPONSIBLESALESNAME,
        },
        {
            upsert: true,
        }
      );
    }

    query.unprepare();

/*

    var opts = {
          query : "select * from projtablecube where WORKERRESPONSIBLENAME = @projectManager",
          inputs : {
            projectManager : Sql.driver.NVarChar
          }
        }

        // Sync-style
        try {
          var query = Sql.ps(opts);
        } catch (e) {
          RKCore.log("e : ");
          RKCore.log(e);
        }

        var result  = query({ projectManager : "DOKI-THONON Thomas" });


        var arrayLength = result.length;
        for (var i = 0; i < arrayLength; i++) {
          //console.log(result[i]);


          Axapta.update(
      			{
      				projectId : "Roles"
      			},
      			{
      			    key: "Roles",
      			    value: roles
      			},
      			{
      			    upsert: true
      			}
      		);


        }

        query.unprepare();
*/
}