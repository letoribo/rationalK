(function(){Template.accountList.helpers({
    accounts: function () {
        return Meteor.users.find();
    }
});

})();
