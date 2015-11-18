(function(){
Template.xml.rendered = function () {
	var filepath = '/Users/thomasdokithonon/rationalK/private/xml/Patent.xml';
	Meteor.call('readXML',filepath, function (error, result) {});

};

Template.xml.helpers({
	XMLFiles: function () {
		return XMLFiles.find().fetch()
	},
	settingsXMLFiles: function () {
        return {
            rowsPerPage: 100,
            showFilter: true,
            class: 'table table-condensed col-sm-12'
					}
  }
});


Template.xml.events({

});

})();
