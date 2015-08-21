Template.searchTpl.onCreated(function () {
	Session.setDefault("searchType", "regexpSearch");
});

Template.searchTpl.rendered = function () {
	var client;
	Template.searchTpl.myHilitor = new Hilitor.highlight("resultsContent");
	Template.searchTpl.myHilitor.setMatchType("open");

	client = new ZeroClipboard( $('.clip_button') );
	// #todo : marche pas...
	client.on('ready', function (event) {
		client.on( 'aftercopy', function (event) {
			if (typeof(toastr) !== 'undefined') {
				toastr.success("Copied to clipboard : " + event.data['text/plain']);
			}
		});
	});
	client.on('error', function () {
		ZeroClipboard.destroy();
	});

	//Update the current screen status depending on the sessions values :
	document.getElementById("searchType").value = Session.get('searchType');
	document.getElementById("keywords").value = (Session.get('searchQuery') ? Session.get('searchQuery') : "" );
	//document.getElementById("includeSynonymsInResults-checkbox").checked = (Session.get('includeSynonymsInResults')? true : false );
	document.getElementById("includeWalkedFilesInResultsCheckbox").checked = (Session.get('includeWalkedFilesInResults') ? true : false );
	document.getElementById("includeWebInResultsCheckbox").checked = (Session.get('includeWebInResults') ? true : false );

	//Typeahead
	Meteor.typeahead.inject();

  // Focus (after typeahead)
	document.getElementById("keywords").focus();
};

Template.searchTpl.onDestroyed(function () {
	Session.set('searchQuery', undefined);
	delete Session.keys.searchQuery;
});

Template.searchTpl.helpers({
	Categories: function () {
		return Categories.find().fetch();
	},
	tags: function () {
		if (rkSettings.findOne({key: "simple_search_behavior"}).value === "and") {
			return Tags.find().fetch().map(
				function (it) {
					var value = it.value;
					var tags = value;
					return tags;
				}
			);
		}
		if (rkSettings.findOne({key: "simple_search_behavior"}).value === "or") {
			//or so add & to avoid large results set
			return Tags.find().fetch().map(
				function (it) {
					var value = it.value;
					var tags = value.replace(/ /g, " & ");
					return tags;
				}
			);
		}
	},
	webSearchResults: function () {
		return WebSearchResults.find();
	},
	messageOnNoResult: function () {
		var str = '<p>';
		if (typeof Session.get("searchQuery") !== 'undefined') {
			str = str.concat(TAPi18n.__('No results') + ". ");

			if ( !Session.get("includeWalkedFilesInResults") && !Session.get("includeWebInResults") ) {
				str = str.concat(TAPi18n.__('Relaunch your search and include') + " : ");
				str = str.concat('<a href="#" title="" class="relaunchSearchWithDifferentOptions" data-includeInSearch="files">' + TAPi18n.__("your files")+'</a>');
				str = str.concat(', ');
				str = str.concat('<a href="#" title="" class="relaunchSearchWithDifferentOptions" data-includeInSearch="web">' + TAPi18n.__("the web") + '</a>');
				str = str.concat(' '+TAPi18n.__("or")+' ');
				str = str.concat('<a href="#" title="" class="relaunchSearchWithDifferentOptions" data-includeInSearch="webandfiles">' + TAPi18n.__("both") +'</a>.');
			}
			if ( !Session.get("includeWalkedFilesInResults") && Session.get("includeWebInResults") ) {
				str = str.concat('<a href="#" title="" class="relaunchSearchWithDifferentOptions" data-includeInSearch="files">' + TAPi18n.__('Relaunch by including your files in your search')+'</a>.');
			}
			if ( Session.get("includeWalkedFilesInResults") && !Session.get("includeWebInResults") ) {
				str = str.concat('<a href="#" title="" class="relaunchSearchWithDifferentOptions" data-includeInSearch="web">' + TAPi18n.__('Relaunch by including the web in your search') + '</a>.');
			}

			str = str.concat('</p>');
		}
		else {
			str = "";
		}
		return new Spacebars.SafeString(str);
	},
	nResults: function () {
		return (typeof Session.get("searchQuery") !== 'undefined') ? SearchQueries.findOne({}).numberOfSearchResults : false;
	},
	simpleSearchBehaviorIsAnd: function () {
		return (rkSettings.findOne({key: 'simple_search_behavior'}).value === 'and') ? true : false;
	},
	searchResults: function () {
			var searchType = Session.get('searchType');
			var results = [];
			if (Meteor.settings.public.debug) {
				console.log("Session.get(searchQuery) : ");
				console.log(Session.get("searchQuery"));
			}
			if (typeof Session.get("searchQuery") === 'undefined') {
				return false; //prevent form fetching all docs
			}
			// on renvoit tous les docs car ils ont été filtré surt le server (dans publication.js)
			if (searchType === "fullTextSearch") {
				docsResults = Docs.find({}, {sort: {score: -1}}).fetch();
				filesResults = WalkedFiles.find({}).fetch();
				results = results.concat(docsResults).concat(filesResults);
			}
			if (searchType === "regexpSearch") {
				docsResults = Docs.find({}).fetch();
				filesResults = WalkedFiles.find({}).fetch();
				messagesResults = Messages.find({}).fetch();
				discussionsResults = Notes.find({}).fetch();
				notesResults = Discussions.find({}).fetch();
				expertResults = Expert.find({}).fetch();
				externalResults = External.find({}).fetch();
				results = results.concat(docsResults).concat(messagesResults).concat(discussionsResults).concat(filesResults).concat(notesResults).concat(expertResults).concat(externalResults);
			}
			return results;
		},
	highlightResults: function () {
		return Session.get("highlightResults");
	},
});


Template.searchTpl.events({
	"click a.relaunchSearchWithDifferentOptions": function (e) {
		e.preventDefault();
		if (Meteor.settings.public.debug) {
			console.log("Relaunching the search function : " + e.currentTarget.dataset.includeinsearch);
		}
		if (e.currentTarget.dataset.includeinsearch === "files") {
			Session.set("includeWalkedFilesInResults", true);
			document.getElementById("includeWalkedFilesInResultsCheckbox").checked = true;
		}
		if (e.currentTarget.dataset.includeinsearch === "web") {
			Session.set("includeWebInResults", true);
			document.getElementById("includeWebInResultsCheckbox").checked = true;
		}
		if (e.currentTarget.dataset.includeinsearch === "filesandweb") {
			Session.set("includeWalkedFilesInResults", true);
			document.getElementById("includeWalkedFilesInResultsCheckbox").checked = true;
			Session.set("includeWebInResults", true);
			document.getElementById("includeWebInResultsCheckbox").checked = true;
		}
		document.getElementById("searchForm").submit();
		return false;
	},
	/*
	"keyup input.keywords": function (event, template) {
		if (event.target.value.length>=2){
			if (Session.get("highlightResults")) {
				Template.searchTpl.myHilitor.apply(event.target.value);
			}
		}
  	},
		*/
	"change .highlight-checkbox input": function (event) {
		Session.set("highlightResults", event.target.checked);
		if (Session.get("highlightResults")) {
			if (Session.get("searchQuery") === "") {
				Template.searchTpl.myHilitor.apply(Session.get("searchQuery"));
			}
			Template.searchTpl.myHilitor.apply(Session.get("searchQuery"));
		}
		else {
			Template.searchTpl.myHilitor.remove();
		}
	},
	/*
	"change .includeSynonymsInResults-checkbox input": function (e) {
		e.preventDefault();
  	Session.set("includeSynonymsInResults", e.target.checked);
		return false;
	},
	"change .includeWalkedFilesInResultsCheckbox input": function (e) {
			e.preventDefault();
			return false;
	},
	*/
	"change #searchType": function (e) {
		e.preventDefault();
			//do not change the session here, to avoid unnecessary loading
			/*
			if (e.target.value === "regexpSearch"){
				document.getElementById("includeWalkedFilesInResultsCheckbox").disabled = false;
			}
			else {
				document.getElementById("includeWalkedFilesInResultsCheckbox").checked = false;
				document.getElementById("includeWalkedFilesInResultsCheckbox").disabled = true;
			}
			*/
		return false;
	},
	"submit .searchForm": function (e) {
		e.preventDefault();
		if (e.target.searchQuery.value !== '') {
			Session.set("searchQuery", e.target.searchQuery.value);
			Session.set("searchType", e.target.searchType.value);
			Session.set("catFilter", e.target.catFilter.value);
			Session.set("includeWalkedFilesInResults", e.target.includeWalkedFilesInResultsCheckbox.checked);
			Session.set("includeWebInResults", e.target.includeWebInResultsCheckbox.checked);
			//after all : (synonyms max be added here ?)
			Session.set("searchQuerySentToServer", e.target.searchQuery.value);
		}
		else {
			if (typeof(toastr) !== 'undefined') {
				toastr.error(TAPi18n.__('Please type some keywords'));
			}
		}
	},
	"click .updateDocInMySpace": function (e) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace', this._id, function () {});
		return false;
	},
});
