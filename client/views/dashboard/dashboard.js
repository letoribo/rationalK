Template.dashboard.rendered = function () {
	$("a.delete").hide();
	// delete here so that when I come back to the search page, it loads faster
	Session.set('searchQuery', undefined);
	delete Session.keys.searchQuery;
	Session.set('searchQuerySentToServer', undefined);
	delete Session.keys.searchQuery;
};

Template.dashboard.events({
	"click .updateDocInMySpace": function (e) {
		e.preventDefault();
		Meteor.call('updateDocInMySpace', e.currentTarget.dataset.docid);
		return false;
	},
});

Template.dashboard.helpers({
	myFavorites: function () {
		return userSpaces.find({userId: Meteor.userId()}, {}).fetch();
	},
	lastActivity: function () {
		return History.find({}, {sort: { createdAt: -1}, limit: 20}).fetch();
	},
	settingsMyFavorites: function () {
		return {
			rowsPerPage: 10,
			showFilter: false,
			class: 'table table-condensed col-sm-12',
			showNavigation: 'auto',
			fields: [
				{
					key: 'content',
					label: TAPi18n.__("Content"),
					fn: function (value, object) {
						var truncatedText = "";
						var doc = Docs.findOne(object.docId);
						if (typeof(doc) !== 'undefined') {
							truncatedText = getTruncatedText(
								Router.routes.docEdit.path({_id: this.docId}),
								doc.full
							);
						}
						else {
							truncatedText = getTruncatedText(
								Router.routes.docEdit.path({_id: this.docId}),
								""
							);
						}
						return new Spacebars.SafeString(truncatedText);
					},
				},
				{
					key: 'actions',
					label: 'Actions',
					fn: function (value, object) {
						var docCategoryId;
						var category;
						var dontDisplayIfUserIsReadOnly;
						var lastRevision;
						var url;
						var fileLink;
						var fieldname;
						var fileLinkUrl;
						var editLink;
						dontDisplayIfUserIsReadOnly = Members.getHiddenStatusIfReadOnly();
						lastRevision =  Revisions.findOne(
							{docId: object.docId },
							{sort:
								{ revisionNumber: -1},
							}
						)._id;
						url = Router.routes.revisionView.path(
							{
								_id: lastRevision,
							}
						);

						//Check if the doc has fileLink
						fileLink = false;
						currentDoc = Docs.findOne({_id: object.docId});
						if (typeof(currentDoc) !== 'undefined') {
							docCategoryId =  currentDoc.categoryId;
							category = Categories.findOne(docCategoryId);
							if (typeof(category) !== 'undefined') {
								viewId = category.viewId;
								fields = Views.findOne(viewId).fields;
								for (fieldname in fields) {
									if (fields[fieldname].type === 'filelink') {
										fileLink = currentDoc.fields[fieldname].value;
									}
								}
							}
						}

						if (fileLink) {
							fileLink = clientFilename(fileLink);
							fileLinkUrl = '<a href="rk:' +
								fileLink +
								'"' +
								'title="Open file on your computer">' +
								'<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>' +
								'</a>';
						}
						else {
							fileLinkUrl = '';
						}


						editLink = ' <a class="' +
							dontDisplayIfUserIsReadOnly +
							'"href="/doc/' +
							object.docId +
							'/edit" title="Edit">' +
							'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
							'</a> ';

						return new Spacebars.SafeString(
							'<a href="' +
							url +
							'" title="View last revision of this doc">' +
							'<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>' +
							'</a>' +
							editLink +
							'<a href="#" data-docId="' +
							object.docId +
							'" title="Remove from my space" class="updateDocInMySpace">' +
							' <span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
							'</a> ' +
							fileLinkUrl
						);
					}, // end of fn : actions
				}, //end of object : actions
			], // end of array : fields
		};
	},
	settingsLastActivity: function () {
		return {
			rowsPerPage: 10,
			showFilter: false,
			class: 'table table-condensed col-sm-12',
			showNavigation: 'auto',
			fields: [
				{
					key: 'createdAt',
					label: 'Date',
					sortDirection: 'descending',
					sortByValue: true,
					fn: function (value) {
						return moment(value).format('DD.MM.YY HH:mm');
					},
				},
				{
					key: 'what',
					label: 'Description',
				},
				{
					key: 'who',
					label: TAPi18n.__('Who'),
				},
				{
					key: 'type',
					label: 'Type',
					fn: function (value, object) {
						if (value === "docCreation") {
							return TAPi18n.__('Doc Creation');
						}
						else if (value === "docRevision") {
							return TAPi18n.__('Doc Edit');
						}
						else if (value === "approvalSubmitted") {
							return TAPi18n.__('Sent for approval');
						}
						else if (value === "chokidar") {
							if (object.event === "add") {
								return TAPi18n.__('File added');
							}
							else if (object.event === "change") {
								return TAPi18n.__('File changed');
							}
							return TAPi18n.__('Other');
						}
						else if (value === "docLinkCreated") {
							return TAPi18n.__('Link created');
						}
						return TAPi18n.__('Other');
					},
				},
				{
					key: 'actions',
					label: 'Actions',
					fn: function (value, object) {
						var dontDisplayIfUserIsReadOnly =
							Members.getHiddenStatusIfReadOnly();
						var fileLink = false;
						var docCategoryId;
						var currentDoc = undefined;
						var category;
						var fileLinkUrl;
						var userSpaceLinkTitle;
						var userSpaceIcon;
						var lastRevision;
						var url;
						var editLink;
						var urlDoc1;
						var urlDoc2;
						var editLinkDoc1;
						var editLinkDoc2;

						if (typeof object.data.doc !== 'undefined') {
							thisRevision = object.data.doc._id;

							if (object.type === "docCreation") {
								currentDoc = Docs.findOne({_id: object.data.doc._id});
							}
							else if (object.type === "docRevision") {
								currentDoc = Docs.findOne({_id: object.data.doc.docId});
							}
							else if (object.type === "approvalSubmitted") {
								currentDoc = Docs.findOne({_id: object.data.docId});
							}

							if (Meteor.settings.public.debug) {
								console.log("Object in the last Activity table :");
								console.log(object);
								console.log('current Doc');
								console.log(currentDoc);
							}
							//Check if the doc has fileLink
							if (typeof currentDoc !== 'undefined') {
								docCategoryId =  currentDoc.categoryId;
								if (Meteor.settings.public.debug) {
									console.log('Doc category');
									console.log(docCategoryId);
								}
								category = Categories.findOne(docCategoryId);
								if (typeof category !== 'undefined') {
									viewId = category.viewId;
									fields = Views.findOne(viewId).fields;
									for (fieldname in fields) {
										if (fields[fieldname].type === 'filelink') {
											fileLink = currentDoc.fields[fieldname].value;
										}
									}
								}
							}

							fileLinkUrl = '';
							if (fileLink) {
								fileLink = clientFilename(fileLink);
								fileLinkUrl = '<a href="rk:' +
									fileLink +
									'" title="Open file on your computer">' +
									'<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>' +
									'</a>';
							}

							if (object.type === "docCreation") {
								if (userSpaceHasDoc(Meteor.userId(), object.data.doc._id)) {
									userSpaceLinkTitle = TAPi18n.__('Remove from my space');
									userSpaceIcon = 'glyphicon-star';
								}
								else {
									userSpaceLinkTitle = TAPi18n.__('Add to my space');
									userSpaceIcon = 'glyphicon-star-empty';
								}
								lastRevision = Revisions.findOne(
									{docId: object.data.doc._id },
									{sort: { revisionNumber: -1}}
								)._id;
								url = Router.routes.revisionView.path(
									{_id: lastRevision}
								);

								editLink = ' <a class="' +
								dontDisplayIfUserIsReadOnly +
								'" href="/doc/' +
								object.data.doc._id +
								'/edit" title="Edit">' +
								'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
								'</a> ';
								return new Spacebars.SafeString(
									'<a href="' +
									 url +
									 '" title="View this recently created doc">' +
									 '<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>' +
									 '</a>' +
									 editLink +
									 '<a href="#" data-docId="' +
									 object.data.doc._id +
									 '" title="' +
									 userSpaceLinkTitle +
									 '" class="updateDocInMySpace"> ' +
									 '<span class="glyphicon ' +
									 userSpaceIcon +
									 '" aria-hidden="true"></span>' +
									 '</a> ' +
									 fileLinkUrl
								 );
							} //end of else if docCreation
							else if (object.type === "docRevision") {
								if (userSpaceHasDoc(Meteor.userId(), object.data.doc.docId)) {
									userSpaceLinkTitle = TAPi18n.__('Remove from my space');
									userSpaceIcon = 'glyphicon-star';
								}
								else {
									userSpaceLinkTitle = TAPi18n.__('Add to my space');
									userSpaceIcon = 'glyphicon-star-empty';
								}

								lastRevision = Revisions.findOne(
									{docId: object.data.doc.docId },
									{sort: { revisionNumber: -1}}
								)._id;
								url = Router.routes.revisionView.path(
									{_id: lastRevision}
								);

								editLink = ' <a class="' +
								dontDisplayIfUserIsReadOnly +
								'" href="/doc/' +
								object.data.doc.docId +
								'/edit" title="Edit">' +
								'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
								'</a> ';

								return new Spacebars.SafeString(
									'<a href="' +
									url +
									'" title="View last revision of this doc">' +
									'<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>' +
									'</a>' +
									editLink +
									'<a href="#" data-docId="' +
									object.data.doc.docId +
									'" title="' +
									userSpaceLinkTitle +
									'" class="updateDocInMySpace"> ' +
									'<span class="glyphicon ' +
									userSpaceIcon +
									'" aria-hidden="true"></span>' +
									'</a> ' +
									fileLinkUrl
								);
							} // end of else if docRevision
							else if (object.type === "approvalSubmitted") {
								if (userSpaceHasDoc(Meteor.userId(), object.data.doc._id)) {
									userSpaceLinkTitle = TAPi18n.__('Remove from my space');
									userSpaceIcon = 'glyphicon-star';
								}
								else {
									userSpaceLinkTitle = TAPi18n.__('Add to my space');
									userSpaceIcon = 'glyphicon-star-empty';
								}
								lastRevision = Revisions.findOne(
									{docId: object.data.doc._id },
									{sort: { revisionNumber: -1}}
								)._id;
								url = Router.routes.revisionView.path({_id: lastRevision});

								editLink = ' <a class="' +
								dontDisplayIfUserIsReadOnly +
								'" href="/doc/' +
								object.data.doc._id +
								'/edit" title="' +
								TAPi18n.__("Edit") +
								'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
								'</a> ';

								return new Spacebars.SafeString(
									'<a href="' +
									url +
									'" title="View this recently created doc">' +
									'<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>' +
									'</a>' +
									editLink +
									'<a href="#" data-docId="' +
									object.data.doc._id +
									'" title="' +
									userSpaceLinkTitle +
									'" class="updateDocInMySpace"> ' +
									'<span class="glyphicon ' +
									userSpaceIcon +
									'" aria-hidden="true"></span></a> ' +
									fileLinkUrl
								);
							} // end of else if approvalSubmitted
							else if (object.type === "docLinkCreated") {
								urlDoc1 = Router.routes.docEdit.path({_id: object.data.docId1});
								urlDoc2 = Router.routes.docEdit.path({_id: object.data.docId2});
								editLinkDoc1 = '<a class="' +
								dontDisplayIfUserIsReadOnly +
								'" href="' +
								urlDoc1 +
								'" title="' + TAPi18n.__("Edit") +
								'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
								' (1)</a>';
								editLinkDoc2 = '<a class="' +
								dontDisplayIfUserIsReadOnly +
								'" href="' +
								urlDoc2 +
								'" title="' +
								TAPi18n.__("Edit") +
								'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
								' (2)</a>';
								return new Spacebars.SafeString(
									editLinkDoc1 + ' ' + editLinkDoc2
								);
							} // end of else if docLinkCreated
							return "";
						} //end of if data.doc not undefined
						else if (typeof object.path !== 'undefined') {
							//chokidar
							if (Meteor.settings.public.debug) {
								console.log('chokidar activity :');
								console.log(object);
							}
							fileLink = clientFilename(object.path);
							fileLinkUrl = '<a href="rk:' +
							fileLink +
							'" title="Open file on your computer">' +
							'<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>' +
							'</a>';
							return new Spacebars.SafeString(fileLinkUrl);
						}
					},
				},
			],
		};
	},
});
