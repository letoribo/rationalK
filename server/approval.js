if (Meteor.isServer){

  /*
  > Members.collection.findOne()
    { _id: 'D4eRNJWcYYTSzHEDj',
      email: 'demo-admin@rationalk.ch',
      orgId: 'demo',
      profile:
       { name: 'Thomas Doki-Thonon',
         orgId: 'demo',
         roles: [ 'admin' ],
         nickname: 'admin',
         locale: 'fr' },
      username: 'admin',
      accountId: 'hi3JuAK5aKfRWXcch' }

  >Meteor.users.find({_id : "hi3JuAK5aKfRWXcch"}).fetch()
      [ { _id: 'hi3JuAK5aKfRWXcch',
        createdAt: Sat Jan 31 2015 17:30:00 GMT+0100 (CET),
        emails: [ [Object] ],
        profile:
         { name: 'admin',
           orgId: 'demo',
           locale: 'fr' },
        roles: [ 'admin' ],
        services: { password: [Object], resume: [Object] },
        username: 'admin' } ]


    http://localhost:3000/member/6YbGXXFyZ9TmdzCyt/edit

    > Members.collection.findOne({_id:"6YbGXXFyZ9TmdzCyt"})
      { _id: '6YbGXXFyZ9TmdzCyt',
        email: 'dokithonon@gmail.com',
        orgId: 'demo',
        profile:
         { name: 'dot',
           nickname: 'ddljdsljds',
           roles: [ 'approver' ],
           locale: 'fr' },
        accountId: 'CmLmYTC5pSkzEQiG6' }

  */

  Meteor.methods({
    getApprovers : function (){
      var approvers = Members.collection.find({"profile.roles" : "approver"}).fetch();
      var approversEmails = []
      approvers.forEach(function (approver) {
        if (Meteor.settings.public.debug){
          console.log("Approver's email : "+ approver.email);
        }
        approversEmails.push(approver.email)

      });
      return approversEmails;
    },
    submitForApproval: function (data) {
      check(data, {
          docApprovalAdditionalText: Match.Optional(String),
          docId : String,
          submitterUserId : String,
          submitterUsername : String,
          submitterEmail : String
        }
      );
      var approversEmails = Meteor.call('getApprovers');

      var docEditUrl = Router.routes['docEdit'].url({_id: data.docId});

      var html =""
      html = html.concat("Dear approver,<br/> A document has been submitted for approval.<br/>Submitter : "+data.submitterUsername +"<br/>Url : "+docEditUrl);
      if (data.docApprovalAdditionalText.length>0){
        html = html.concat("<br/>Additional message : "+data.docApprovalAdditionalText);
      }
      html = html.concat("<br/>Kind Regards.");

      Email.send({
        from: data.submitterEmail,
        to: approversEmails,
        cc : data.submitterEmail,
        subject: "[" + Meteor.settings.public.header_text + "] Please review this document",
        html: html
      });

      /*
      // alternative using nodemailer :
      var mailOptions = {
          from : data.submitterEmail, // sender address
          to : approversEmails, // list of receivers
          //cc : data.submitterEmail,
          subject: "[" + Meteor.settings.public.header_text + "] Please review this document", // Subject line
          //text: 'Hello world', // plaintext body
          html: html, // html body
          attachments: [
            {   // file on disk as an attachment
                filePath: '/Users/thomasdokithonon/Downloads/reechwifi.png'
                //filename: 'license.txt',
                //filePath: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
            }
          ]
      };

      var nodemailer = Nodemailer;
      // create reusable transport method (opens pool of SMTP connections)
      var smtpTransport = nodemailer.createTransport("SMTP",{
        host: 'mail.infomaniak.ch',
        port: 587,
        auth: {
            user: 'server@rationalK.ch',
            pass: 'server'
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
       //smtpTransport.close(); // shut down the connection pool, no more messages
     });
     // end of nodemailer alternative
     */


      historyType = "approvalSubmitted";
      data.doc = Docs.findOne({_id : data.docId});
      console.log("data variable sent to history : ")
      console.log(data)
      Meteor.history(TAPi18n.__("Doc submitted for approval to")+ " " + approversEmails.join() +".",data,historyType,data.docId);

    }
  }); //end of server methods
}// end of if Server
