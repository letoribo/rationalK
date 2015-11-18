(function(){Template.tags.rendered = function () {

};

Template.tags.events({
  "click a.analyseTags": function (e) {
		e.preventDefault();
		Meteor.call('analyseTags',function (error, result) {
      if (Meteor.settings.public.debug){
			     if (error){console.log(error);}
			     if (result){console.log(result);}
      }
		});
		return false;
	},
  "click a.searchThisTag": function (e, t) {
			e.preventDefault();
      if (Meteor.settings.public.debug){console.log(e.target.dataset.tag)}
			Session.set("searchQuery",e.target.dataset.tag);
			Session.set("searchType","regexpSearch");
      return Router.go("searchTpl");
  }
});

Template.tags.helpers({
	tags: function () {
    return Tags.find({},{sort: { count: -1}}).fetch();
	},
	settingsTags: function () {
    return {
        rowsPerPage: 100,
        showFilter: true,
        class: 'table table-condensed col-sm-12',
				showNavigation: 'auto',
				fields: [
          {
            key: 'value',
            label: TAPi18n.__("Tag"),
            sortByValue : true,
            fn: function (value){
              return value.toLowerCase();
            }
          },
          {
            key: 'count',
            label: TAPi18n.__("Count"),
            sortDirection: 'descending'
          },
          {
            key: 'actions',
            label: TAPi18n.__("Actions"),
            fn: function (value, object) {
              //console.log(object.value);
              return new Spacebars.SafeString("<a href='#' class='searchThisTag' title='"+TAPi18n.__("Search this tag")+"'><span class='glyphicon glyphicon-search' aria-hidden='true' data-tag='"+object.value+"'></span></a>");
            }

          },
				]
    }
  }
});

})();
