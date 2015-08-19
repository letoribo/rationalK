if ( (Meteor.isServer) && (Meteor.settings.rationalK_demo_mode==="demo") ) {


    var removeAllDocuments = function () {
		Docs.remove({});
		Revisions.remove({});
		Categories.remove({});
		Views.remove({});
		History.remove({});
		userSpaces.remove({});
		SearchQueries.remove({});
		Discussions.remove({});
		Messages.remove({});
		Notes.remove({});
		ProcessDocuments.remove({});
		Processes.remove({});
		Expert.remove({});
		Synonyms.remove({});
	};

	var createSynonyms = function () {
		Synonyms.insert({
			synonyms : "bearings,roulement,lager"
		});
		Synonyms.insert({
			synonyms : "ISO,norms,norme,ASTM"
		});
	};

	var createProcess = function () {
		console.log('Your Processes database is empty, I will add a simple diagram...');
			// Populate with dummy data
		processId = Processes.insert({
			title : 'My QR Process',
			filename : 'diagram.bpmn'
		});
		return processId;
	};

	var createProcessDocuments = function (processId,docId) {
		console.log('Your Process Documents database is empty, I will add some data...');
		if (ProcessDocuments.find({}).count() == 0){
			// Populate with dummy data
			ProcessDocuments.insert({
				processId : processId,
				taskId : 'SCAN_OK',
				html : '<a href="/doc/'+docId+'/edit">ISO 1002</a>'
			});
		}
	};



	var createOneView = function () {

		var myviewid = Meteor.call('viewNew', {
			name: 'International Norms',
			attributes: []
		});

		// calling a meteor method from the server without a function parameter are synchronuous
		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Id',
			newFieldType: 'text',
			mandatory: false,
			unique: true
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Title',
			newFieldType: 'text',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Tags',
			newFieldType: 'tags',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Url',
			newFieldType: 'url',
			mandatory: false
		});

		return myviewid;
	};

	var createOneCategory = function (myviewid) {
		var obj = {};
		obj.name= 'International Norms';
		obj.viewId= myviewid;
		mycatid=Categories.insert(obj);
		return mycatid;
	};

	var createOneDoc = function (myviewid, mycatid) {
		var att={}
		att.categoryId=mycatid;
        att.fields= {};
		att.fields["Id"] = "ISO 492:2014";
		att.fields["Title"] = "Rolling bearings -- Radial bearings -- Geometrical product specifications (GPS) and tolerance values";
		att.fields["Tags"] = "bearings,tolerances,gps";
		att.fields["Url"] = "http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=60356";
		var mydocid = Meteor.call('docUpdate', att);
		return mydocid;
	};

	var updateOneDoc = function (myviewid, mycatid,mydocid) {
		var att={}
		att.docId=mydocid;
		att.categoryId=mycatid;
        att.searchScore=10 //changed.
        att.fields= {};
		att.fields["Tags"] = "bearings,tolerances,gps,rolling bearing"; //changed
		var mydocid = Meteor.call('docUpdate', att);
		return mydocid;
	};


	var createAnotherDocInTheSameCategory = function (myviewid, mycatid) {
		var att={}
		att.categoryId=mycatid;
        att.fields= {};
		att.fields["Id"] = "ISO 1002:1983";
		att.fields["Title"] = "Rolling bearings -- Airframe bearings -- Characteristics, boundary dimensions, tolerances, static load ratings";
		att.fields["Tags"] = "bearings,tolerances,airframe,aerospace";
		var mydocid = Meteor.call('docUpdate', att);
		return mydocid;
	};


	var createAnotherView = function () {

		var myviewid = Meteor.call('viewNew', {
			name: 'Internal Standards',
			attributes: []
		});

		// calling a meteor method from the server without a function parameter are synchronuous
		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Id',
			newFieldType: 'text',
			mandatory: true,
			unique: true
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Title',
			newFieldType: 'text',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Owner',
			newFieldType: 'text',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Abstract',
			newFieldType: 'textarea',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Tags',
			newFieldType: 'tags',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Filelink',
			newFieldType: 'filelink',
			mandatory: false
		});

		return myviewid;
	};


	var createAnotherCategory = function (myviewid) {
		var obj = {};
		obj.name= 'Internal Standards';
		obj.viewId= myviewid;
		mycatid=Categories.insert(obj);
		return mycatid;
	};

	var createTwoDocsInThisCategory = function (myviewid, mycatid) {

		var att={}
		att.categoryId=mycatid;
        att.fields= {};
        att.fields["Id"] = "22IN12";
		att.fields["Title"] = "Confidential Grease List";
		att.fields["Tags"] = "bearings,grease,lubrication";
		att.fields["Owner"] = "Quality Dpt.";
		att.fields["Abstract"] = "A lubricant is a substance introduced to reduce friction between surfaces in mutual contact, which ultimately reduces the heat generated when the surfaces move. It may also have the function of transmitting forces, transporting foreign particles, or heating or cooling the surfaces. The property of reducing friction is known as lubricity. In addition to industrial applications, lubricants are used for many other purposes.";
		att.fields["Filelink"] = "//server/folder/file1.ext";
		Meteor.call('docUpdate', att);

		var att={}
		att.categoryId= mycatid;
		att.fields= {};
		att.fields["Id"] = "41FR05";
		att.fields["Title"] = "Grease calculation";
		att.fields["Tags"] = "bearings,grease,lubrication,calculation";
		att.fields["Owner"] = "Eng Dpt.";
		att.fields["Abstract"] = "Typically the lubricant-to-surface friction is much less than surface-to-surface friction in a system without any lubrication. Thus use of a lubricant reduces the overall system friction. Reduced friction has the benefit of reducing heat generation and reduced formation of wear particles as well as improved efficiency. Lubricants may contain additives known as friction modifiers that chemically bind to metal surfaces to reduce surface friction even when there is insufficient bulk lubricant present for hydrodynamic lubrication, e.g. protecting the valve train in a car engine at startup.";
		att.fields["Filelink"] = "//server/folder/file2.ext";
		Meteor.call('docUpdate', att);
		//return mydocid;
	};


	// CRM :
	var createCRMView = function () {

		var myviewid = Meteor.call('viewNew', {
			name: 'Customers',
			attributes: []
		});

		// calling a meteor method from the server without a function parameter are synchronuous
		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Name',
			newFieldType: 'text',
			mandatory: false,
			unique: true
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Tel',
			newFieldType: 'text',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Email',
			newFieldType: 'email',
			mandatory: false
		});

		Meteor.call('viewAddField', {
			viewId: myviewid,
			newField: 'Url',
			newFieldType: 'url',
			mandatory: false
		});

		return myviewid;
	};

	var createCRMCategory = function (myviewid) {
		var obj = {};
		obj.name= 'Customers';
		obj.viewId= myviewid;
		mycatid=Categories.insert(obj);
		return mycatid;
	};

	var createCRMDoc1 = function (myviewid, mycatid) {
		var att={}
		att.categoryId=mycatid;
        att.fields= {};
		att.fields["Name"] = "Customer A";
		att.fields["Tel"] = "+41768111222";
		att.fields["Email"] = "info@customer.com";
		att.fields["Url"] = "http://customera.com";
		var mydocid = Meteor.call('docUpdate', att);
		return mydocid;
	};
	var createCRMDoc2 = function (myviewid, mycatid) {
		var att={}
		att.categoryId=mycatid;
        att.fields= {};
		att.fields["Name"] = "Customer B";
		att.fields["Tel"] = "+41768111233";
		att.fields["Email"] = "info@customer2.com";
		att.fields["Url"] = "http://customerb.com";
		var mydocid = Meteor.call('docUpdate', att);
		return mydocid;
	};






	var cleanAndPrepopulatePredefinedTags = function () {
		PredefinedTags.remove({});
		//Create Predefined Tags :
		PredefinedTags.insert({label: 'bearing'});
		PredefinedTags.insert({label: 'ball bearing'});
		PredefinedTags.insert({label: 'plain bearing'});
	};

	var createAndLoginCronUser = function () {
		if (Meteor.users.find({username: 'cron'}).count() == 0) {
			accountId = Accounts.createUser(
				{
					username: 'cron',
					email: 'cron@rationalk.ch',
					password: "croncron",
					orgId: 'cron'
				}
			)
			Roles.setUserRoles(accountId, ['cron'])
		}

		//Meteor.loginWithPassword('cron', 'croncron')
	};

	var clearUsers = function () {
		var allMembers = Members.collection.find().fetch();
		allMembers.forEach(function (element) {
			var accountId = element.accountId;
			Meteor.users.remove({_id: accountId});
			Members.collection.remove({_id: element._id});
		});
	};

	var createAdminUser = function () {

		var accountId = Accounts.createUser({
			email: 'demo-admin@rationalk.ch',
			profile: {name: 'admin', orgId: 'demo'},
			password: 'demo-admin',
			verified: true
		});

		Meteor.setTimeout(function () {
				Meteor.users.update({_id: accountId}, {
					$set: {
						username: 'admin',
						profile: {name: 'admin', orgId: 'demo'}
					}
				});
			}
			, 2000);

		Members.collection.insert({
			email: 'demo-admin@rationalk.ch',
			orgId: 'demo',
			profile: {name: 'admin', orgId: 'demo', roles: ['admin'], nickname: 'admin'},
			username: 'admin',
			accountId: accountId
		});
		Roles.addUsersToRoles(accountId, ['admin'])

		return accountId;
	};

	var createNormalUser = function () {
		var userAccountId = Accounts.createUser({
			email: 'demo-user@rationalk.ch',
			profile: {name: 'user', orgId: 'demo'},
			password: 'demo-user',
			verified: true
		});

		Meteor.setTimeout(function () {
				Meteor.users.update({_id: userAccountId}, {
					$set: {
						username: 'user',
						profile: {name: 'user', orgId: 'demo'}
					}
				});
			}
			, 2000);

		Members.collection.insert({
			email: 'demo-test@rationalk.ch',
			orgId: 'demo',
			profile: {name: 'user', orgId: 'demo', roles: [], nickname: 'user'},
			username: 'user',
			accountId: userAccountId
		});

		return userAccountId;
	};


	var createDiscussion = function (who) {
		var obj = {};
		obj.subject= 'Which one is the most appropriate document for rolling bearings ?';
		obj.who = who ;
		obj.createdAt = new Date();
		discussionId=Discussions.insert(obj);
		return discussionId;
	};

	var createMessages = function (discussionId) {

		var adminAccountId = Members.collection.findOne({username:"admin"}).accountId;
		var userAccountId = Members.collection.findOne({username:"user"}).accountId;


		var obj={}
		obj.message="Hello, any idea on which standard to use ?";
        obj.discussionId= discussionId;
		obj.who = adminAccountId;
		obj.createdAt = new Date();
		Messages.insert(obj);

		var obj={}
		obj.message="Hey both ISO 492 and 1002 are suitable. You should also look into our internal standard 22IN12 on grease.";
        obj.discussionId= discussionId;
		obj.who = userAccountId;
		obj.createdAt = new Date();
		Messages.insert(obj);

	};

	var createFieldsOfExpertise = function () {

		var adminAccountId = Members.collection.findOne({username:"admin"}).accountId;
		var userAccountId = Members.collection.findOne({username:"user"}).accountId;


		var obj={}
		obj.fieldOfExpertise="I know everything about bearings.";
		obj.userId = adminAccountId;
		obj.updatedAt = new Date();
		Expert.insert(obj);

		var obj={}
		obj.fieldOfExpertise="ISO specialist";
		obj.userId = userAccountId;
		obj.updatedAt = new Date();
		Expert.insert(obj);
	};

	var createNotes = function () {

		var adminAccountId = Members.collection.findOne({username:"admin"}).accountId;
		var userAccountId = Members.collection.findOne({username:"user"}).accountId;


		var obj={}
		obj.content="Todo : read ISO 15";
		obj.userId = adminAccountId;
		obj.updatedAt = new Date();
		Notes.insert(obj);

		var obj={}
		obj.content="Todo : read ISO 02";
		obj.userId = userAccountId;
		obj.updatedAt = new Date();
		Notes.insert(obj);

	};




	var resetDBWithDemoData = function () {
		// do things here :
		removeAllDocuments();
		clearUsers();
		adminAccountId = createAdminUser();
		userAccountId = createNormalUser();
		createAndLoginCronUser();
		myviewid = createOneView();
		mycatid = createOneCategory(myviewid);
		mydocid = createOneDoc(myviewid, mycatid);
		mydocid = updateOneDoc(myviewid, mycatid, mydocid);
		myotherdocid = createAnotherDocInTheSameCategory(myviewid, mycatid);
		myotherviewid = createAnotherView();
		myothercatid = createAnotherCategory(myotherviewid);
		createTwoDocsInThisCategory(myotherviewid, myothercatid);
		// CRM :
		myviewid=createCRMView();
		mycatid = createCRMCategory(myviewid);
		mydocid = createCRMDoc1(myviewid, mycatid);
		mydocid = createCRMDoc2(myviewid, mycatid);
		discussionId = createDiscussion(adminAccountId);
		createMessages(discussionId);
		createFieldsOfExpertise();

		processId = createProcess();
		createProcessDocuments(processId,myotherdocid);
		createNotes();

		createSynonyms();

		cleanAndPrepopulatePredefinedTags();
	};

	SyncedCron.add({
	  name: 'reset demo database',
	  schedule: function (parser) {
	    // parser is a later.parse object
	    return parser.text('every 30 minutes');
	  },
	  job: resetDBWithDemoData
	});

}

Meteor.methods({
	"resetDBWithDemoData" : resetDBWithDemoData
});
