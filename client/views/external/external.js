Template.external.rendered = function () {
	var externalDocId = Router.current().params.externalDocId;
	if (typeof(externalDocId) !== 'undefined') {
		RKCore.log(externalDocId);
		Session.set('externalDocId', externalDocId);
	}
	Meteor.call('updateExcel', externalDocId, function () {} );
};

Template.external.events({
	"click a.updateExcel": function (e) {
		var externalDocId = Session.get('externalDocId');
		e.preventDefault();
		Meteor.call('updateExcel', externalDocId, function () {});
	},
});

Template.external.helpers({
  external: function () {
    return External.find({}, //find all because other are not published
			{ externalDocId: 0 }
		).fetch();
  },
	externalDocId: function () {
    return Session.get('externalDocId');
  },
});
