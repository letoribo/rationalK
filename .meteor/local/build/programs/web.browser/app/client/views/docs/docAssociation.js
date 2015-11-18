(function(){var linkedDocs = new ReactiveVar(null);

Template.docAssociation.rendered = function () {
  if (Meteor.settings.public.debug) {
    console.log("this in rendered");
    console.log(this);
    console.log("this.data.association in rendered");
    console.log(this.data.associations);
  }

  Meteor.call('linkedDocs', this.data.associations, function (error, result) {
    if (error) {
      if (Meteor.settings.public.debug) {
        console.log("error : ");
        console.log(error);
      }
    }
    else if (result) {
      if (Meteor.settings.public.debug) {
        console.log("result : ");
        console.log(result);
      }
      linkedDocs.set(result);
    }
  });
  if (Meteor.settings.public.debug) {
    console.log("linkedDocs.get() in rendered : ");
    console.log(linkedDocs.get());
  }
};

Template.docAssociation.events({
  'submit #docAssociationForm': function (e){
    var data = {};
    e.preventDefault();
    if (typeof(toastr) !== 'undefined') {
      toastr.success(TAPi18n.__('This document is stored in your clipboard'));
    }
    data.docId = this._id;
    data.submitterUserId = Meteor.user()._id;
    data.submitterUsername = Meteor.user().username;
    data.submitterEmail = Meteor.user().emails[0].address;
    if (Meteor.settings.public.debug) {
      console.log(data);
    }
    Session.set("dataAssociation", data);
  },
  'submit #docCreateAssociationForm' : function (e, t){
    e.preventDefault();
    data = {};
    // The current document :
    data.docId2 = this._id;
    // The document in memory :
    dataAssociation = Session.get("dataAssociation");
    data.docId1 = dataAssociation.docId;
    data.submitterUserId = dataAssociation.submitterUserId;
    data.submitterUsername = dataAssociation.submitterUsername;
    data.submitterEmail = dataAssociation.submitterEmail;
    if (Meteor.settings.public.debug){
      console.log(data)
    }
    Meteor.call('associateDocs',data, function (err,result){
      if (err){
        if (typeof(toastr) !== 'undefined') {
          toastr.error(err.reason+". Please try again.");
        }
      }
      else
      {
        if (Meteor.settings.public.debug){
          console.log(result);
        }
        if (result===true){
          if (typeof(toastr) !== 'undefined') {
            toastr.success(TAPi18n.__('Link created'));
          }
          Session.set('dataAssociation',undefined);
          delete Session.keys.dataAssociation

          // Update the association reactive var
          if (Meteor.settings.public.debug){
            console.log("t.data.associations after linking a document")
            console.log(t.data.associations)
            console.log("this : ")
            console.log(this)
            console.log("t : ")
            console.log(t)
          }


          Meteor.call('linkedDocs', t.data.associations, function (error, result) {
            if (error){
              if (Meteor.settings.public.debug){
                console.log("error when calling linkedDocs : ")
                console.log(error)
              }
            }
            else if (result){
              if (Meteor.settings.public.debug){
                console.log("result of call linkedDocs : ")
                console.log(result)
              }
              linkedDocs.set(result);
            }
          });
        }
        else {
          //link already exists
          if (typeof(toastr) !== 'undefined') {
            toastr.error(TAPi18n.__('Link already exists'));
          }
        }
      }
    });
  },
  'click a.deleteLink': function (e, t) {
      var data = {};
      e.preventDefault();
      if (Meteor.settings.public.debug) {
  	    console.log("deleteLink clicked");
  	    console.log(e.currentTarget.dataset);
        console.log(t.data._id);
      }
      data.docId1 = e.currentTarget.dataset.docid1;
      data.docId2 = t.data._id;

	    Meteor.call('deleteLink', data, function (error) {
		  if (!error) {
        if (typeof(toastr) !== 'undefined') {
          toastr.success(TAPi18n.__('Link successfully deleted'));
        }
		  }
		  });
      if (Meteor.settings.public.debug) {
        console.log("this.associations after deleting link :");
        console.log(this.associations);
      }

      Meteor.call('linkedDocs', this.associations, function (error, result) {
        if (error) {
          if (Meteor.settings.public.debug) {
            console.log("error : ");
            console.log(error);
          }
        }
        else if (result) {
          if (Meteor.settings.public.debug) {
            console.log("result : ");
            console.log(result);
          }
          linkedDocs.set(result);
        }
      });
		return false;
	},
});

Template.docAssociation.helpers({
  thisDocHasBeenCopiedForAssociation: function () {
    var dataAssociation;
    if (typeof(Session.get("dataAssociation")) !== 'undefined') {
      dataAssociation = Session.get("dataAssociation");
      if (this._id === dataAssociation.docId) {
        return true;
      }
      return false;
    }
    return false;
	},
  anotherDocIsInMemoryForAssociation: function () {
    var dataAssociation;
    if (typeof(Session.get("dataAssociation")) !== 'undefined') {
      dataAssociation = Session.get("dataAssociation");
      if (this._id !== dataAssociation.docId) {
        return true;
      }
      return false;
    }
    return false;
	},
  thisDocHasAssociatedDocs: function () {
    var data = {};
    var docAssociations = [];
    var i;
    var arrayLength;
    if (typeof(this.associations) !== 'undefined') {
      if (this.associations.length > 0) {
        arrayLength = this.associations.length;
        for (i = 0; i < arrayLength; i++) {
            data = {};
            data.docId = this.associations[i].docId;
            docAssociations.push(data);
        }
        if (Meteor.settings.public.debug) {
          console.log(docAssociations);
        }

        if (Meteor.settings.public.debug) {
          console.log("Lets update the reactiveVar linkedDocs");
        }
        Meteor.call('linkedDocs', docAssociations, function (error, result) {
          if (error) {
            if (Meteor.settings.public.debug) {
              console.log("error : ");
              console.log(error);
            }
          }
          else if (result) {
            if (Meteor.settings.public.debug) {
              console.log("result : ");
              console.log(result);
            }
            linkedDocs.set(result);
          }
        });


        return docAssociations;
      }
    }
  },
  linkedDocsHelper: function () {
    if (typeof(linkedDocs) !== 'undefined') {
      if (linkedDocs.get() !== null) {
        return linkedDocs.get();
      }
    }
  },
});

})();
