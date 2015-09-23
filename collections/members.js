Members = {
	collection: new Mongo.Collection('members'),
	invitations: new Mongo.Collection('invitations')
};

Members.userToMember = function () {

};

var purgeMember;

purgeMember = function (id, accountId) {
	check(id, String);
	check(accountId, Match.Optional(String));//if the user has not approuved then he has no account id
  Members.collection.remove({
    _id: id
  });
  if (accountId && Meteor.isServer) {
    return Meteor.users.remove({
      _id: accountId
    });
  }
};


Meteor.methods({
  memberUpdate: function (att) {
		check(att, Match.Any);
    var isAdmin, member, updatedInformation, user;
    user = Meteor.user();


    if (!user) {
      throw new Meteor.Error(401, "You need to login to post new member");
    }
    if (!att.memberId) {
      throw new Meteor.Error(422, "Please fill in with the memberId");
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    member = Members.collection.findOne({
      _id: att.memberId
    });
    updatedInformation = {
      email: att.email,
      "profile.name": att.name,
      "profile.nickname": att.nickname,
			"profile.locale": att.locale
    };

		Meteor.users.update(
			{ _id: member.accountId },
			{
	     $set: {
	       "profile.locale": att.locale
	     }
	   }
		);

    isAdmin = Roles.userIsInRole(user, ['admin']);
    if (isAdmin) {
      updatedInformation["profile.roles"] = att.roles;
    }
    if (member.accountId === user._id || isAdmin) {
      Members.collection.update({
        _id: att.memberId
      }, {
        $set: updatedInformation
      });
    }
    if (member.accountId && Meteor.isServer && isAdmin) {
      return Roles.setUserRoles(member.accountId, att.roles || []);
    }
		if (typeof(toastr) !== 'undefined') {
			toastr.success('Member '+att.name+' updated succesfully');
		}


  },
  memberDelete: function (memberId) {
		check(memberId, String);
    var member, user;
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to post new member");
    }
    member = Members.collection.findOne({
      _id: memberId
    });
    if (member) {
      purgeMember(memberId, member.accountId);
      Meteor.history("deleted member " + member.profile.name);
			if (typeof(toastr) !== 'undefined') {
				toastr.success('The member has been deleted.');
			}
    }
  },
  memberNew: function (att) {
		check(att, Match.Any);
    var clientURL, invitationId;
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(401, "You need to login to add new member");
    }
    if (!att.name) {
      throw new Meteor.Error(422, "Please fill in with a name");
    }
    var orgId = user.profile.orgId;
    var memberId = Members.collection.insert({
      email: att.email,
      orgId: orgId,
      profile: {
        name: att.name,
        nickname: att.nickname,
        roles: att.roles
      }
    });
    //Meteor.history("added member " + att.name);
    if (Meteor.isServer) {
      invitationId = Members.invitations.insert({
        memberId: memberId,
        email: att.email,
        profile: {
          name: att.name,
          nickname: att.nickname,
					locale: att.locale,
          roles: att.roles,
          orgId: orgId
        }
      });
      if (process.env.RATIONALK_CLIENT_URL) {
        clientURL = process.env.RATIONALK_CLIENT_URL;
      } else {
        clientURL = process.env.ROOT_URL;
      }
			// remove last trailing slash if any :
			clientURL = clientURL.replace(/\/$/, "");

			var emailText = "You need to setup your password. Please register with this link: " + clientURL + "/invitation/" + invitationId
			var emailSubject = "[rationalK] You have been added as a member";

			// alternative using nodemailer :
			var mailOptions = {
					from : Meteor.settings.rationalK_mail.from, // sender address
					to : att.email, // list of receivers
					//cc : data.submitterEmail,
					subject: emailSubject, // Subject line
					//text: 'Hello world', // plaintext body
					html: emailText, // html body
			};

			var nodemailer = Nodemailer;
			// create reusable transport method (opens pool of SMTP connections)
			var smtpTransport = nodemailer.createTransport("SMTP",{
				host: Meteor.settings.rationalK_mail.host,
				port: Meteor.settings.rationalK_mail.port,
				auth: {
						user: Meteor.settings.rationalK_mail.username,
						pass: Meteor.settings.rationalK_mail.password
				}
			});

			smtpTransport.sendMail(mailOptions, function (error, response){
			if(error){
					console.log(error);
			}
			else{
					console.log("Message sent: " + response.message);
			}
				// if you don't want to use this transport object anymore, uncomment following line
			 smtpTransport.close(); // shut down the connection pool, no more messages
		 });
		 // end of nodemailer alternative

		 /*
      Email.send({
        from: "admin@rationalk.ch",
        to: att.email,
        subject: emailSubject,
        text: emailText,
      });
			*/
    }
    return memberId;
  }
});

UI.registerHelper('isAdmin', function () {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

Members.getHiddenStatusIfNotAdmin = function () {
	if (Roles.userIsInRole(Meteor.user(), ['admin'])){
		return ""
	}
	else {
		return "hidden";
	}
};

// you can use it in template like this : {{displayOnlyForAdmin}}
UI.registerHelper('displayOnlyForAdmin', function () {
	return Members.getHiddenStatusIfNotAdmin();
});

Members.getHiddenStatusIfReadOnly = function () {
	if (Roles.userIsInRole(Meteor.user(), ['readonly'])){
		return "hidden"
	}
	else {
		return "";
	}
};

// you can use it in template like this : {{dontDisplayIfUserIsReadOnly}}
UI.registerHelper('dontDisplayIfUserIsReadOnly', function () {
	return Members.getHiddenStatusIfReadOnly();
});

UI.registerHelper('userName', function (userId) {
		check(userId, String);
    member = Members.collection.findOne({accountId: userId});
    return member.profile.name;
    //member.profile.nickname
});
