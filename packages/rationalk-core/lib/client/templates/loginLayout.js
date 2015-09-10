Template.loginLayout.events({
    "click .setLanguage": function (e) {
  		e.preventDefault();
      TAPi18n.setLanguage(e.currentTarget.dataset.locale);
  		return true;
    },
    "click a.forgotPassword": function (e,t) {
  		e.preventDefault();
      var email = t.$('#login-email-2').val();
      if (email){
        console.log(email);
        var option ={};
        option.email = email;
        Accounts.forgotPassword(option,function (err){
          if (typeof(err) !== 'undefined') {
            if (Meteor.settings.public.debug){console.log(err);}
            if (err.reason="User not found"){
              if (typeof(toastr) !== 'undefined') {
                toastr.error("Sorry, this email has never been registred to rationalK.");
              }
            }
          }
          else {
            if (typeof(toastr) !== 'undefined') {
              toastr.success("We send you an email to : "+ email);
            }
          }
        });
      }
      else {
        if (typeof(toastr) !== 'undefined') {
          toastr.error("Type your email.");
        }
      }
  		return false;
    },
    'submit #login-form-2' : function (e, t){
		e.preventDefault();
		// retrieve the input field values
		//console.log(t.$('#login-email-2').val());
		var email = t.$('#login-email-2').val().toLowerCase();
		var password = t.$('#login-password-2').val();

	    // Trim and validate your fields here....
		//console.log("email=" + email);
		//console.log(password);
	    // If validation passes, supply the appropriate fields to the
	    // Meteor.loginWithPassword() function.
	    Meteor.loginWithPassword(email, password, function (err){
	    if (err){
	      // The user might not have been found, or their passwword
	      // could be incorrect. Inform the user that their
	      // login attempt has failed.
        if (typeof(toastr) !== 'undefined') {
    			toastr.error(err.reason+". Please try again.");
    		}

	      }
	    else
	    {
	      // The user has been logged in.
	    }


      });
         return false;
      }
});


Template.loginLayout.helpers({
	onDemo: function () {
		if (document.URL.indexOf("demo.rationalk.ch") == -1){
			return false;
		}
		else {
			return true;
		}
	},
	showFooter: function () {
	    return Meteor.settings.public.show.footer;
	},
  isFreshInstall: function () {
    //var nAccounts = Meteor.users.find().count();
    var nAccounts = Members.collection.find().count();
    console.log(nAccounts);
    console.log(this);
    console.log(this.data);
	},
});


Template.loginLayout.rendered = function () {
  return Meteor.setTimeout(function () {
    $("a.dropdown-toggle").trigger("click");
    return $("#iron-router-progress").width(0);
  }, 500);
};
