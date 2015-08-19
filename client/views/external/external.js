Template.external.rendered = function () {
	var externalDocId = Router.current().params.externalDocId;
	if (typeof(externalDocId) !== 'undefined') {
		if (Meteor.settings.public.debug){
			console.log(externalDocId);
		}
		Session.set('externalDocId', externalDocId);
	}

	Meteor.call('updateExcel', externalDocId, function (error, result) {  } );
}

Template.external.events({
	"click a.updateExcel": function (event){
			event.preventDefault();

			var externalDocId = Session.get('externalDocId');

			Meteor.call('updateExcel',externalDocId, function (error, result) {
				if (error) {
          if (Meteor.settings.public.debug){console.log(error);}
				} else {
          if (Meteor.settings.public.debug){console.log(result);}
				}
		});
	}
});

Template.external.helpers({
  external: function () {
		var externalDocId = Session.get('externalDocId');
    return External.find({}, //find all because other are not published
			{ externalDocId: 0 }
		).fetch();
  },
	externalDocId : function () {
    return Session.get('externalDocId');
  }
});
