Template.attachments.helpers({
	myAttachments: function () {
		return Attachments.find().fetch();
	},
	settingsAttachments: function () {
        return {
            rowsPerPage: 100,
            showFilter: true,
						showColumnToggles: true,
            class: 'table table-condensed col-sm-12',
						fields: [
						    {
						        key: '_id',
						        label: 'ID',
						    },
						    {
						        key: 'originalName',
						        label: 'Name',
						        fn: function (value, object) {
											return object.original.name;
							      }
						    },
								{
						        key: 'location',
						        label: 'Location',
						        fn: function (value, object) {
											return object.metadata.rKAttachments;
							      }
						    },
								{
						        key: 'copieFilename',
						        label: 'copieFilename',
						        fn: function (value, object) {
											return object.copies.attachments.key;
							      }
						    },
								{
						        key: 'uploadedAt',
						        label: 'uploadedAt',
						    },
								{
						        key: 'isUploaded',
						        label: 'isUploaded',
						    },
								{
						        key: 'url',
						        label: 'url',
						    },
								{
						        key: 'attachedToDocId',
						        label: 'attachedToDocId',
						        fn: function (value, object) {
											return object.metadata.attachedToDocId;
							      }
						    },

						],
		};
    },
});
