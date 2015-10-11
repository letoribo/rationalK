Meteor.publish('searchResults', function (searchQuery, catFilter, searchType, includeWalkedFilesInResults) {
  var searchResultsDocs;
  var searchResults = [];
  var nResults = 0;
  var searchResultsWalkedFiles;
  var sr;
  var i;
  check(searchQuery, String);
  check(searchType, String);
  check(catFilter, String);
  check(includeWalkedFilesInResults, Match.OneOf(null, Boolean));

  if ( (typeof searchQuery === 'undefined') || (searchQuery === "") ) {
    return [];
  }

  RKCore.log('Query : ' + searchQuery);
  RKCore.log('Type of search : ' + searchType);
  RKCore.log('Filter on category : ' + catFilter);

  if (searchType === "fullTextSearch") {
      if (catFilter === "all") {
        searchResultsDocs = Docs.find( {
              $text: {
                $search: searchQuery,
              },
          }, {
              fields: { score: { $meta: 'textScore' } },
              sort: { score: { $meta: 'textScore' } },
              limit: 30,
          });

          if (typeof RKTrello !== 'undefined') {
            searchResultsTrello = RKTrello.findFullText(searchQuery);
          }

          if (typeof RKFMEA !== 'undefined') {
            searchResultsPFMEA = RKFMEA.corePFMEA.findFullText(searchQuery);
          }

          if (typeof RKCore.searchResultsPackage !== 'undefined') {
  					searchResultsPackage = RKCore.searchResultsPackage;
  					nPackages = searchResultsPackage.length;
  			    for (i = 0; i < nPackages; i++) {
  						packageName = searchResultsPackage[i].name;
  		        RKCore.log("The package " + packageName + " has a function findFullText. So I will search inside.");
              if (typeof eval(packageName).findFullText === 'function') { //todo
                sr = eval(packageName).findFullText(searchQuery); //todo
                nResults = nResults + sr.count();
                searchResults = searchResults.concat(sr);
              }
  			    }
  				}
        }
        else { //there is a filter on categories
          //marche pas todo
          searchResultsDocs = Docs.find({
                $and: [
                    {
                      $text: {
                        $search: searchQuery,
                      },
                    },
                    {
                      "categoryId": catFilter,
                    },
                ],
            }, {
                fields: { score: { $meta: 'textScore' } },
                sort: { score: { $meta: 'textScore' } },
                limit: 30,
            });

          if (typeof RKTrello !== 'undefined') {
            searchResultsTrello = RKTrello.findDummy();
          }
          if (typeof RKFMEA !== 'undefined') {
            searchResultsPFMEA = RKFMEA.corePFMEA.findDummy();
          }

          if (typeof RKCore.searchResultsPackage !== 'undefined') {
            searchResultsPackage = RKCore.searchResultsPackage;
            nPackages = searchResultsPackage.length;
            for (i = 0; i < nPackages; i++) {
              packageName = searchResultsPackage[i].name;
              if (typeof eval(packageName).findDummy === 'function') { //todo
                sr = eval(packageName).findDummy(searchQuery); //todo
                searchResults = searchResults.concat(sr);
                nResults = nResults + sr.count();
              }
            }
          }

        } // end of filter on category

        // ne marche pas alors que ca marche bien sur le serveur
        if (includeWalkedFilesInResults) {
          RKCore.log("Finding walked files on the server using full text search...");

          searchResultsWalkedFiles = WalkedFiles.find(
            {
              $and: [
                {
                  $text: { $search: searchQuery },
                },
                {
                  $or: [
                    {
                      belongsToADocumentEntry: { $exists: false },
                    },
                    { belongsToADocumentEntry: false },
                  ],
                },
              ],
            }
            ,
            {
                fields: { score: { $meta: 'textScore' } },
                sort: { score: { $meta: 'textScore' } },
                limit: 30,
            });
        }
        else {
          // dummy search that return an empty cursor
          searchResultsWalkedFiles = WalkedFiles.find({'path': 'aDummyPathYouWillNeverFind' });
        }

        searchResults = searchResults.concat(searchResultsDocs);
        searchResults = searchResults.concat(searchResultsWalkedFiles);

        if (typeof RKTrello !== 'undefined') {
          searchResults = searchResults.concat(searchResultsTrello);
        }
        if (typeof RKFMEA !== 'undefined') {
          searchResults = searchResults.concat(searchResultsPFMEA);
        }
        //console.log(searchResults.fetch());
        nResults = nResults
        + searchResultsDocs.count()
        + searchResultsWalkedFiles.count();

        if (typeof RKTrello !== 'undefined') {
          nResults = nResults + searchResultsTrello.count();
        }
        if (typeof RKFMEA !== 'undefined') {
          nResults = nResults + searchResultsPFMEA.count();
        }
    } //end of type fulltext search
    else if (searchType === "regexpSearch") {
      if (Meteor.settings.simple_search_behavior === "or") {
        var parts = searchQuery.trim().split(/[&]+/);
        var len = parts.length;
        var arrayOfAndForDocs = [];
        var arrayOfAndForWalkedFiles = [];
        var arrayOfAndForMessages = [];
        var arrayOfAndForDiscussions = [];
        var arrayOfAndForNotes = [];
        if (typeof RKExperts !== 'undefined') {
          var arrayOfAndForExperts = [];
        }
        var arrayOfAndForExternal = [];

        for (var i = 0; i < len; i++) {
            //each part is a OR :
            var orParts = parts[i].trim().split(/[ \-\:]+/);
            var orPartsRegExp = new RegExp("(" + orParts.join('|') + ")", "ig");

            arrayOfAndForDocs.push({full: orPartsRegExp});
            arrayOfAndForWalkedFiles.push({path: orPartsRegExp});
            arrayOfAndForMessages.push({message: orPartsRegExp});
            arrayOfAndForDiscussions.push({subject: orPartsRegExp});
            arrayOfAndForNotes.push({content: orPartsRegExp});
            if (typeof RKExperts !== 'undefined') {
              arrayOfAndForExperts.push({fieldOfExpertise: orPartsRegExp});
            }
            arrayOfAndForExternal.push({full: orPartsRegExp});
        }


        if (catFilter ==="all"){
          var searchResultsDocs = Docs.find({$and : arrayOfAndForDocs},{limit : 30});
        }
        else {
          console.log("There is a filter on a category");
          searchResultsDocs = Docs.find({
            $and: [
              {$and: arrayOfAndForDocs },
              {
                categoryId: catFilter,
              },
            ],
          },
          {
            limit: 30,
          }
          );
        }


        var searchResultsMessages = Messages.find({$and : arrayOfAndForMessages },{limit : 30});
        var searchResultsDiscussions = Discussions.find({$and : arrayOfAndForDiscussions },{limit : 30});
        var searchResultsNotes = Notes.find({
          $and: [
            {$and : arrayOfAndForNotes },
            {userId : this.userId}
            ]
        },
        {
          limit : 30
        }
        );
        if (typeof RKExperts !== 'undefined') {
          var searchResultsExpert = RKExperts.findAnd(arrayOfAndForExperts);
        }
        var searchResultsExternal = External.find({$and : arrayOfAndForExperts },{limit : 30});

        if (includeWalkedFilesInResults){
          if (Meteor.settings.public.debug){
            console.log("Finding walked files on the server...");
            console.log("arrayOfAndForWalkedFiles : ");
            console.log(arrayOfAndForWalkedFiles);
          }
          var searchResultsWalkedFiles = WalkedFiles.find({$and: [{$and : arrayOfAndForWalkedFiles },{$or: [ { belongsToADocumentEntry: { $exists: false } }, { belongsToADocumentEntry: false } ]}]},{limit : 30});
        } else {
          // dummy search that return an empty cursor
          var searchResultsWalkedFiles = WalkedFiles.find({'path' : 'aDummyPathYouWillNeverFind' });
        }

      }//end of simple_search_behavior = "or"
      if (Meteor.settings.simple_search_behavior==="and"){
        //simple_search_behavior === "and"
        // (?=.*word1)(?=.*word2)(?=.*word3)

        var parts = searchQuery.trim().split(/[|]+/);
        if (Meteor.settings.public.debug){
            console.log("OR parts in your search query :");
            console.log(parts);
        }

        var len = parts.length;
        var arrayOfOrForDocs = [];
        var arrayOfOrForWalkedFiles = [];
        var arrayOfOrForMessages = [];
        var arrayOfOrForDiscussions = [];
        var arrayOfOrForNotes = [];
        if (typeof RKExperts !== 'undefined') {
          var arrayOfOrForExperts = [];
        }
        var arrayOfOrForExternal = [];

        for (var i = 0; i < len; i++) {
            // dans cette part, tous les termes doivent apparaitre dans le contenu, c'est un ET !
            var andParts = parts[i].trim().split(/[ \-\:]+/);
            var lenAndParts = andParts.length;
            var arrayOfAndForDocs = [];
            var arrayOfAndForWalkedFiles = [];
            var arrayOfAndForMessages = [];
            var arrayOfAndForDiscussions = [];
            var arrayOfAndForNotes = [];
            if (typeof RKExperts !== 'undefined') {
              var arrayOfAndForExperts = [];
            }
            var arrayOfAndForExternal = [];

            for (var j = 0; j < lenAndParts; j++) {
              //andParts[j]
              var andPartsRegExp = new RegExp(andParts[j], "ig");
              arrayOfAndForDocs.push({full: andPartsRegExp});
              arrayOfAndForWalkedFiles.push({path: andPartsRegExp});
              arrayOfAndForMessages.push({message: andPartsRegExp});
              arrayOfAndForDiscussions.push({subject: andPartsRegExp});
              arrayOfAndForNotes.push({content: andPartsRegExp});
              if (typeof RKExperts !== 'undefined') {
                arrayOfAndForExperts.push({fieldOfExpertise: andPartsRegExp});
              }
              arrayOfAndForExternal.push({full: andPartsRegExp});
            }

            /*
            if (Meteor.settings.public.debug){
                console.log("arrayOfAndForDocs : ");
                console.log(arrayOfAndForDocs);
                console.log("arrayOfAndForWalkedFiles : ");
                console.log(arrayOfAndForWalkedFiles);
                console.log("arrayOfAndForMessages : ");
                console.log(arrayOfAndForMessages);
                console.log("arrayOfAndForDiscussions : ");
                console.log(arrayOfAndForDiscussions);
                console.log("arrayOfAndForNotes : ");
                console.log(arrayOfAndForNotes);
                console.log("arrayOfAndForExperts : ");
                console.log(arrayOfAndForExperts);
                console.log("arrayOfAndForExternal : ");
                console.log(arrayOfAndForExternal);
            }
            */

            arrayOfOrForDocs.push({$and : arrayOfAndForDocs})
            arrayOfOrForWalkedFiles.push({$and : arrayOfAndForWalkedFiles})
            arrayOfOrForMessages.push({$and : arrayOfAndForMessages})
            arrayOfOrForDiscussions.push({$and : arrayOfAndForDiscussions})
            arrayOfOrForNotes.push({$and : arrayOfAndForNotes})
            if (typeof RKExperts !== 'undefined') {
              arrayOfOrForExperts.push({$and : arrayOfAndForExperts})
            }
            arrayOfOrForExternal.push({$and : arrayOfAndForExternal})
        }


        if (catFilter ==="all"){
          var searchResultsDocs = Docs.find({
              $or : arrayOfOrForDocs
            },
            {
              limit : 30
            }
          );
        }
        else {
          console.log("There is a filter on a category");
          var searchResultsDocs = Docs.find({
            $and: [
              {$or : arrayOfOrForDocs},
              {categoryId: catFilter}
            ]
            },
            {
              limit : 30
            }
          );
        }

        var searchResultsMessages = Messages.find(
          {
            $or : arrayOfOrForMessages
          },
          {
            limit : 30
          }
        );
        var searchResultsDiscussions = Discussions.find(
          {
            $or : arrayOfOrForDiscussions
          },
          {
            limit : 30
          }
        );
        var searchResultsNotes = Notes.find(
          {
            $and: [
              {$or : arrayOfOrForNotes },
              {userId : this.userId}
              ]
          },
          {
            limit : 30
          }
        );

        if (typeof RKExperts !== 'undefined') {
          console.log("rationalk-experts is installed, I will search through it");
          var searchResultsExpert = RKExperts.findOr(arrayOfOrForExperts);
        }


        var searchResultsExternal = External.find(
          {
            $or : arrayOfOrForExternal
          },
          {
            limit : 30
          }
        );

        // var searchResultsExternal = External.find({});

        if (includeWalkedFilesInResults){
          console.log("Finding walked files on the server...");
          var searchResultsWalkedFiles = WalkedFiles.find(
            {
              $and: [
                {
                  $or : arrayOfOrForWalkedFiles
                },
                {
                  $or: [
                  { belongsToADocumentEntry: { $exists: false } },
                  { belongsToADocumentEntry: false }
                  ]
                }
              ]
            }
            ,
            {
              limit : 30
            }
          );
        } else {
          // dummy search that return an empty cursor
          var searchResultsWalkedFiles = WalkedFiles.find({'path' : 'aDummyPathYouWillNeverFind' });
        }
      }
      //var searchResults = [searchResultsDocs];

      var searchResults = [
        searchResultsDocs,
        searchResultsMessages,
        searchResultsDiscussions,
        searchResultsNotes,
        searchResultsExternal,
        searchResultsWalkedFiles
      ]

      var nResults = 0;
      if (typeof RKExperts !== 'undefined') {
        searchResults.push(searchResultsExpert);
        nResults = nResults + searchResultsExpert.count();
      }

      //console.log(searchResults.fetch());

      var nResults = searchResultsDocs.count() + searchResultsMessages.count() + searchResultsDiscussions.count() + searchResultsNotes.count() + searchResultsExternal.count() + searchResultsWalkedFiles.count();

    }
    // for statistiques, store the searches
    SearchQueries.insert({
		    searchDate: new Date(),
				who: this.userId,
				searchQuery: searchQuery,
				numberOfSearchResults: nResults,
				includeSynonymsInResults: false,
        includeWalkedFilesInResults: includeWalkedFilesInResults,
				searchType: searchType,
		});
    return searchResults;
});
