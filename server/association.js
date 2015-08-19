if (Meteor.isServer){
  Meteor.methods({
    associateDocs : function (data){
      check(data, {
          docId1: String,
          docId2 : String,
          submitterUserId : String,
          submitterUsername : String,
          submitterEmail : String
        }
      );

      var linkAlreadyExists = Docs.find({$and :[{_id : data.docId1},{"associations.docId" : data.docId2 }]}).count();

      if (linkAlreadyExists>0){
        if (Meteor.settings.public.debug){
          console.log("Link already exists")
        }
        return false;
      }
      else {

        historyType = "docLinkCreated";
        data.doc = "not applicable";
        console.log("data variable sent to history : ")
        console.log(data)
        Meteor.history(TAPi18n.__("Link created between two documents by ") + data.submitterUsername,data,historyType,data.docId1);

        Docs.update({
          _id: data.docId1
        }, {
          $push: {
            associations : {"docId" : data.docId2}
          }
        });
        Docs.update({
          _id: data.docId2
        }, {
          $push: {
            associations : {"docId" : data.docId1}
          }
        });

        return true;

      }


    },
    getLinkedDocInformations : function (docId){
      check(docId,String);
      return Docs.findOne({_id: docId});
    },
    deleteLink : function (data){
      check(data, {
          docId1: String,
          docId2 : String
        }
      );

      if (Meteor.settings.public.debug){
        console.log(data)
      }

      Docs.update({
        _id: data.docId1
      }, {
        $pull: {
          associations : {"docId" : data.docId2}
        }
      });
      Docs.update({
        _id: data.docId2
      }, {
        $pull: {
          associations : {"docId" : data.docId1}
        }
      });

      return false;
    },
    linkedDocs : function (associations){
      check(associations,Match.Any);
      if (Meteor.settings.public.debug){
        console.log("associations in method linkedDocs : ");
        console.log(associations);
      }

      var linkedDocsIds = [];
      if (typeof(associations) !== 'undefined') {
        if (associations !== null) {
          if (associations.length > 0){
            var arrayLength = associations.length;
            for (var i = 0; i < arrayLength; i++) {
                linkedDocsIds.push(associations[i].docId)
            }
            if (Meteor.settings.public.debug){
              console.log(linkedDocsIds);
            }
          }
        }
      }

      // example : Docs.find({_id:{$in : ["CpLdjpnR2nSS6YiSC","R6h9SFNzdaC4hWoZD"]}}).fetch()
      return Docs.find({_id:{$in : linkedDocsIds} }).fetch();
    }
  }); //end of server methods
}// end of if Server
