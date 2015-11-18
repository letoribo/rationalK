(function(){
Template.__checkName("backup");
Template["backup"] = new Template("Template.backup", (function() {
  var view = this;
  return HTML.Raw('<div class="row">\n		<div class="col-md-12">\n			 <div class="panel panel-default">\n			 	<div class="panel-heading" style="position:relative">\n			 		<h3 class="panel-title">Backup</h3>\n        </div>\n				<div class="panel-body">\n					<p>Backups are automatically done every day, week and month</p>\n					<p>You can restore monthly backup, weekly, daily</p>\n					<p>To back call <code>Meteor.call("loadBackup","/Users/thomasdokithonon/Downloads/backups/rationalK")</code> from you meteor shell.</p>\n					<p>In the folder you should have file like <code>categories.bson</code>, ...</p>\n					<p>Your database will be completely emptied ! So don\'t do this if you don\'t know what you are doing.</p>\n        </div>\n    	</div>\n		</div>\n	</div>');
}));

})();
