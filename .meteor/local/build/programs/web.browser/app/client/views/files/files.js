(function(){Template.files.rendered = function () {

};

Template.files.helpers({
	Files: function () {
		return WalkedFiles.find({}).fetch();
	},
	settingsFiles: function () {
        return {
	        rowsPerPage: 100,
	        showFilter: true,
	        class: 'table table-condensed col-sm-12',
					showColumnToggles: true,
					fields: [
			    {
			        key: 'path',
			        label: 'Server Path',
							hidden: true,
			    },
					{
			        key: 'path',
			        label: TAPi18n.__('Path'),
							fn: function (value, object) {
								var f = clientFilename(object.path);
								return new Spacebars.SafeString('<a href="rk:'+f+'" title="Open file on your computer">'+f+'</a>');
							}
			    },
					{
			        key: 'belongsToADocumentEntry',
			        label: TAPi18n.__('Belongs to a DB entry'),
							hidden : true
			    },
			    {
			        key: 'size',
			        label: 'Size',
							hidden : true
			    }
					,
			    {
			        key: 'mtime',
			        label: TAPi18n.__('Last modification date'),
							sortByValue: true,
							fn: function (value,object){
								return moment(value).format('DD.MM.YY HH:mm');
							}
			    }
			]
		}
    },
	isAdmin: function () {
	    var loggedInUser;
	    loggedInUser = Meteor.user();
	    return Roles.userIsInRole(loggedInUser, ['admin']);
  },
	walkThruFoldersStatus :function () {
		var walkThruFoldersStatus = rkStatus.findOne({method : 'walkThruFolders' });
		if (Meteor.settings.public.debug){
			console.log(walkThruFoldersStatus)
		}
		if (typeof(walkThruFoldersStatus) !== 'undefined') {
			var curdate = new Date();
			var seconds = (curdate.getTime() - walkThruFoldersStatus.date.getTime())/1000;
			if (Meteor.settings.public.debug){
				console.log("Last update was : " + seconds + " seconds ago.");
			}
			if ((walkThruFoldersStatus.state=='finished') && (seconds<20) ){
					if (typeof(toastr) !== 'undefined') {
						toastr.success(TAPi18n.__('File scan is finished.'));
					}
			}
			if (walkThruFoldersStatus.state=='running'){
				return  false;
			}
			else {
				return new Spacebars.SafeString('<a href="#" class="walkThruFolders pull-right" title="Scan all folders"><span class="glyphicon glyphicon-refresh"></span></a>');
			}
		}
	},
	walkThruFoldersLoadingAnimation :function () {
		var walkThruFoldersStatus = rkStatus.findOne({method : 'walkThruFolders' });
		if (typeof(walkThruFoldersStatus) !== 'undefined') {
			if (walkThruFoldersStatus.state=='running'){
				return  ""
			}
			else {
				return  "hidden"
			}
		}
	}
});


Template.files.events({
	"click a.walkThruFolders": function (e) {
		e.preventDefault();
		Meteor.call('walkThruFolders',function (error, result) {
			if (Meteor.settings.public.debug){
				console.log(error);
				console.log(result);
			}
		});
		return false;
	}
});

})();
