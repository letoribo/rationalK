Template.walk.helpers({
	foldersToScan: function () {
		var folders = FoldersToScan.find().fetch();
		var textareaContent="";
		folders.forEach(function (folder) {
			if (folder.path==""){
				//do nothing
			}
			else {
				textareaContent = textareaContent + folder.path + "\n";
			}
		});
		textareaContent = textareaContent.slice(0, - 1); //remove last line break \n
		return textareaContent;
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



Template.walk.events({
	"submit .foldersToScanForm": function (event,template) {
		event.preventDefault();
		var PythonResults = Meteor.call('updateFoldersToScan',event.target.folders.value, function (error, result) {
		if (error) {
		    // handle error
		  } else {

		  }
		});
		return true;
	},
	"click a.walkThruFolders": function (e) {
		e.preventDefault();
		Meteor.call('walkThruFolders',function (error, result) {
			console.log(error);
			console.log(result)
		});
		return false;
	}
});

Template.walk.rendered = function () {

var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var target = document.getElementById('spin');
var spinner = new Spinner(opts).spin(target);

}
