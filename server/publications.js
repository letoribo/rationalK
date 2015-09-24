filterByOrg = function (meteor, collection, userId, strict) {
  var user;
  if (userId) {
    user = Meteor.users.findOne(userId);
    return collection.find({
      orgId: user.profile.orgId
    });
  }
  else if (!strict) {
    return collection.find();
  }
  else {
    return meteor.ready();
  }
};

Meteor.publish("followup", function () {
  return FollowUp.find();
});

Meteor.publish("accounts", function () {
  return Meteor.users.find({}, {
    fields: {
      username: 1,
      profile: 1,
      emails: 1,
      roles: 1,
    }
  });
});

Meteor.publish("tags", function () {
  return Tags.find();
});

Meteor.publish("XMLFiles", function () {
  return XMLFiles.find();
});

Meteor.publish("external", function (externalDocId) {
  check(externalDocId, String);
  return External.find(
    {
      'externalDocId': externalDocId,
    },
    {
      fields: {
        'externalDocId': 0,
        'full': 0,
      },
    });
});


Meteor.publish("controlplan", function () {
  return controlPlan.find();
});

Meteor.publish("filelinks", function () {
  return Filelinks.find();
});

Meteor.publish("messages", function () {
  return Messages.find();
});

Meteor.publish("processes", function () {
  return Processes.find();
});

Meteor.publish("process", function (processId) {
  check(processId, String);
  return Processes.find({
    _id: processId,
  });
});

Meteor.publish("processdocuments", function () {
  return ProcessDocuments.find();
});

Meteor.publish(null, function () {
  return Meteor.roles.find({});
});

Meteor.publish("orgs", function () {
  return Orgs.find({
    userId: this.userId,
  });
});

Meteor.publish("currentOrg", function () {
  return Orgs.find();
});

Meteor.publish("searchqueries", function () {
  return SearchQueries.find();
});

Meteor.publish("myCurrentSearchQuery", function () {
  return SearchQueries.find(
    {who: this.userId},
    {
      fields: {numberOfSearchResults: 1},
      sort: { searchDate: -1 },
      limit: 1,
    }
  );
});




Meteor.publish('cse', function (query) {
  var self = this;
  var response;
  var thumb;
  var doc;
  check(query, String);
  if (typeof Meteor.settings.cse !== 'undefined') {
  if (query) {
    try {
      response = Meteor.http.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: query,
          cx: Meteor.settings.cse.cx,
          key: Meteor.settings.cse.key,
        },
      });
      _.each(response.data.items, function (item) {
        if (typeof item.pagemap.cse_thumbnail !== 'undefined') {
          thumb = item.pagemap.cse_thumbnail[0].src;
        }
        else {
          thumb = "/images/noimgavailable.png";
        }
        doc = {
          thumb: thumb,
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        };

        self.added('websearchresults', Random.id(), doc);
      });
      self.ready();
    }
    catch(error) {
      console.log(error);
    }
  }
  else {
    self.ready();
  }
  }
  else {
    console.log("You need to defined cse in your setting file settings.json");
  }
});


Meteor.publish('searchResults', function (searchQuery,catFilter,searchType,includeWalkedFilesInResults) {
  var searchResultsDocs;
  var searchResults;
  var searchResultsTrello;
  var nResults;
  check(searchQuery, String);
  check(searchType, String);
  check(catFilter, String);
  check(includeWalkedFilesInResults, Match.OneOf(null, Boolean));
  //console.log("You are searching for : _" +searchQuery + "_ on the server (searchType: "+searchType+")");
  if ( (typeof searchQuery === 'undefined') || (searchQuery === "") ) {
    //console.log("I will not publish anything, your search query is empty.");
    return [];
  }

  if (Meteor.settings.public.debug) {
    console.log('Query : ' + searchQuery);
    console.log('Type of search : ' + searchType);
    console.log('Filter on category : ' + catFilter);
  }

  // I have something to search for :
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

          var searchResultsExternal = External.find({
                $text: { $search: searchQuery }
            }, {
                fields: { score: { $meta: 'textScore' } },
                sort: { score: { $meta: 'textScore' } },
                limit: 30,
            });

          var searchResultsFilesContent = FilesContent.find({
                $text: { $search: searchQuery },
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
        }
        else {
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

          var searchResultsExternal = External.find({$text: { $search: "somethingthatyouwillneverfind" }});
          var searchResultsFilesContent = FilesContent.find({$text: { $search: "somethingthatyouwillneverfind" }});
          if (typeof RKTrello !== 'undefined') {
            searchResultsTrello = RKTrello.findDummy();
          }
          if (typeof RKFMEA !== 'undefined') {
            searchResultsPFMEA = RKFMEA.corePFMEA.findDummy();
          }
        } // end of filter on category

        //Docs.find({$text: { $search: "bearing" }}, {fields: { score: { $meta: 'textScore' } },sort: { score: { $meta: 'textScore' } }, limit : 30 });

        // ne marche pas alors que ca marche bien sur le serveur
        if (includeWalkedFilesInResults){
          if (Meteor.settings.public.debug){
            console.log("Finding walked files on the server using full text search...");
          }

          var searchResultsWalkedFiles = WalkedFiles.find(
            {$and:[
              {$text: { $search: searchQuery } },
              {$or: [ { belongsToADocumentEntry: { $exists: false } }, { belongsToADocumentEntry: false } ]}
            ]}
            , {
                fields: { score: { $meta: 'textScore' } },
                sort: { score: { $meta: 'textScore' } },
                limit : 30
            });

          //WalkedFiles.find( {$text: { $search: 'rationalK' } }   , {  fields: { score: { $meta: 'textScore' } },  sort: { score: { $meta: 'textScore' } }, limit : 30   });

        } else {
          // dummy search that return an empty cursor
          var searchResultsWalkedFiles = WalkedFiles.find({'path' : 'aDummyPathYouWillNeverFind' });
        }

        searchResults = [
          searchResultsDocs,
          searchResultsExternal,
          searchResultsFilesContent,
          searchResultsWalkedFiles,
        ];

        if (typeof RKTrello !== 'undefined') {
          searchResults = searchResults.concat(searchResultsTrello);
        }
        if (typeof RKFMEA !== 'undefined') {
          searchResults = searchResults.concat(searchResultsPFMEA);
        }
        //console.log(searchResults.fetch());
        nResults =
        searchResultsDocs.count()
        + searchResultsExternal.count()
        + searchResultsFilesContent.count()
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
        var arrayOfAndForExperts = [];
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
            arrayOfAndForExperts.push({fieldOfExpertise: orPartsRegExp});
            arrayOfAndForExternal.push({full: orPartsRegExp});
        }


        if (catFilter ==="all"){
          var searchResultsDocs = Docs.find({$and : arrayOfAndForDocs},{limit : 30});
        }
        else {
          console.log("There is a filter on a category");
          var searchResultsDocs = Docs.find({
            $and: [
              {$and : arrayOfAndForDocs },
              {categoryId: catFilter}
              ]
            },
            {
              limit : 30
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

        var searchResultsExpert = Expert.find({$and : arrayOfAndForExperts },{limit : 30});
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
        var arrayOfOrForExperts = [];
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
            var arrayOfAndForExperts = [];
            var arrayOfAndForExternal = [];

            for (var j = 0; j < lenAndParts; j++) {
              //andParts[j]
              var andPartsRegExp = new RegExp(andParts[j], "ig");
              arrayOfAndForDocs.push({full: andPartsRegExp});
              arrayOfAndForWalkedFiles.push({path: andPartsRegExp});
              arrayOfAndForMessages.push({message: andPartsRegExp});
              arrayOfAndForDiscussions.push({subject: andPartsRegExp});
              arrayOfAndForNotes.push({content: andPartsRegExp});
              arrayOfAndForExperts.push({fieldOfExpertise: andPartsRegExp});
              arrayOfAndForExternal.push({full: andPartsRegExp});
            }

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

            arrayOfOrForDocs.push({$and : arrayOfAndForDocs})
            arrayOfOrForWalkedFiles.push({$and : arrayOfAndForWalkedFiles})
            arrayOfOrForMessages.push({$and : arrayOfAndForMessages})
            arrayOfOrForDiscussions.push({$and : arrayOfAndForDiscussions})
            arrayOfOrForNotes.push({$and : arrayOfAndForNotes})
            arrayOfOrForExperts.push({$and : arrayOfAndForExperts})
            arrayOfOrForExternal.push({$and : arrayOfAndForExternal})
        }

        if (Meteor.settings.public.debug){
            console.log("arrayOfOrForDocs : ");
            console.log(arrayOfOrForDocs);
            console.log("arrayOfOrForExternal : ");
            console.log(arrayOfOrForExternal);
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
        var searchResultsExpert = Expert.find(
          {
            $or : arrayOfOrForExperts
          },
          {
            limit : 30
          }
        );

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
        searchResultsExpert,
        searchResultsExternal,
        searchResultsWalkedFiles
      ]

      //console.log(searchResults.fetch());

      var nResults = searchResultsDocs.count() + searchResultsMessages.count() + searchResultsDiscussions.count() + searchResultsNotes.count() + searchResultsExpert.count() + searchResultsExternal.count() + searchResultsWalkedFiles.count();
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

Meteor.publish("dates", function () {
  return Dates.find();
});

Meteor.publish("history", function () {
  var user;
  if (this.userId) {
    user = Meteor.users.findOne(this.userId);
    return History.find({
    }, {
      sort: {
        createdAt: -1
      },
      limit: 100
    });
  } else {
    return this.ready();
  }
});

Meteor.publish("views", function (data) {
  check(data, Match.Optional(
    {
      viewId: Match.Optional(String),
      categoryId: Match.Optional(String),
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Views.find();
  }
  else {
    if (typeof data.viewId !== 'undefined') {
      return Views.find({_id: data.viewId});
    }
    else if (typeof data.categoryId !== 'undefined') {
      viewId = Categories.findOne({_id: data.categoryId}).viewId;
      return Views.find({_id: viewId});
    }
    else if (typeof data.revisionId !== 'undefined') {
      categoryId = Revisions.findOne({_id: data.revisionId}).categoryId;
      viewId = Categories.findOne({_id: categoryId}).viewId;
      return Views.find({_id: viewId});
    }
  }
});

Meteor.publish("docs", function (data) {
  check(data, Match.Optional(
    {
      // Optional, but if present must be a string.
      revisionId: Match.Optional(String),
      docId: Match.Optional(String),
      role: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Docs.find();
  }
  else {
    if (typeof data.docId !== 'undefined') {
      return Docs.find({_id: data.docId});
    }
    else if (typeof data.revisionId !== 'undefined') {
      docId = Revisions.findOne({_id: data.revisionId}).docId;
      return Docs.find({_id: docId});
    }
    else if (typeof data.role !== 'undefined') {
      // data.role should contains the slug
      return Docs.find({usefulForRoles: data.role});
    }
  }
});

Meteor.publish("categories", function (data) {
  check(data, Match.Optional(
    {
      // Optional, but if present must be a string.
      categoryId: Match.Optional(String),
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined') {
    return Categories.find();
  }
  else {
    if (typeof data.categoryId !== 'undefined'){
      return Categories.find({_id: data.categoryId});
    }
    else if (typeof data.revisionId !== 'undefined'){
      categoryId = Revisions.findOne({_id:data.revisionId}).categoryId;
      return Categories.find({_id: categoryId});
    }
  }
});

Meteor.publish("gantts", function (id) {
  check(id, Match.Optional(String));
  if (typeof id === 'undefined') {
    return Gantts.find();
  }
  else {
    return Gantts.find({_id: id});
  }
});

Meteor.publish("predefinedtags", function () {
  return PredefinedTags.find();
});

Meteor.publish("rkSettings", function () {
  return rkSettings.find();
});
Meteor.publish("rkStatus", function () {
  return rkStatus.find();
});


Meteor.publish("folderstoscan", function () {
  return FoldersToScan.find();
});

Meteor.publish("tempwalkedfiles", function () {
  return TempWalkedFiles.find();
});

Meteor.publish("walkedfiles", function () {
  return WalkedFiles.find();
});

Meteor.publish("mySpace", function () {
  return userSpaces.find({userId: this.userId});
});

Meteor.publish("myNotes", function () {
  return Notes.find({userId: this.userId});
});


Meteor.publish("synonyms", function () {
  return Synonyms.find();
});

Meteor.publish("expert", function () {
  return Expert.find();
});

Meteor.publish("discussions", function () {
  return Discussions.find();
});

Meteor.publish("discussion", function (discussionId) {
  check(discussionId, String)
  return Discussions.find({
    _id: discussionId
  });
});

Meteor.publish("docHistory", function (docId) {
  check(docId, String);
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    var docHistory =  History.find({
      $and: [
        { orgId : user.profile.orgId},
        { docId : docId }
        ]
      },
      {
      sort: {
          createdAt: -1
      }
    });
    return docHistory;
  } else {
    return this.ready();
  }
});


Meteor.publish("messagesinthisdiscussion", function (discussionId) {
  check(discussionId, String)
  return Messages.find({
    discussionId: discussionId
  });
});

Meteor.publish("revisions", function (data) {
  check(data, Match.Optional(
    {
      revisionId: Match.Optional(String)
    }
  ));

  if (typeof data === 'undefined'){
    return Revisions.find();
  }
  else {
    if (typeof data.revisionId !== 'undefined'){
      return Revisions.find({_id: data.revisionId});
    }
  }
});

Meteor.publish("doc-revisions", function (docId) {
  check(docId,String)
  return Revisions.find({
    docId: docId
  }, {
    sort: {
      revisionNumber: 1
    }
  });
});

Meteor.publish("singleton", function (name) {
  check(name,String)
  return Singletons.find({
    name: name
  });
});

Meteor.publish("attachments", function (docId) {
  check(docId, String);
  return Attachments.find({
    "metadata.document": docId
  });
});
