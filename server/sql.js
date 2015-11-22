if (Meteor.settings.sql.do) {
	Axapta.remove({});
		var opts = {
	      //query : "select * from projtablecube where PROJID = @projectId",
	      query : "select * from JESActiveDrawingProject",
	      inputs : {
	        //projectId : Sql.driver.NVarChar
	        //status : Sql.driver.NVarChar,
	        //type : Sql.driver.NVarChar
	      }
	    }

	    // Sync-style
	    try {
	      var query = Sql.ps(opts);
				result  = query({});
		    var nResults = result.length;
				RKCore.log("nResults : ");
		    RKCore.log(nResults);
				RKCore.log("First Result : ");
				RKCore.log(result[0]);
		    for (var i = 0; i < nResults; i++) {
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
								sqlQuery: opts.query,
								table: "JESActiveDrawingProject",
		        },
		        {
		            upsert: true,
		        }
		      );
		    }
		    query.unprepare();
	    } catch (e) {
	      RKCore.log("e : ");
	      RKCore.log(e);
	    }


			var opts = {
					query : "select * from JESPurchProtoOnProject",
					inputs : {
					}
				}

				// Sync-style
				try {
					var query = Sql.ps(opts);
					result  = query({});
					var nResults = result.length;
					RKCore.log("nResults : ");
					RKCore.log(nResults);
					RKCore.log("First Result : ");
					RKCore.log(result[0]);


					for (var i = 0; i < nResults; i++) {
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
									sqlQuery: opts.query,
									table: "JESPurchProtoOnProject",
							},
							{
									upsert: true,
							}
						);
					}
					query.unprepare();
				} catch (e) {
					RKCore.log("e : ");
					RKCore.log(e);
				}


}
