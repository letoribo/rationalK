(function(){if (Meteor.isServer){
  if (Members.collection.find({}).count()==0){
    Meteor.users.remove({});
    Members.collection.remove({});
    console.log('There is no user yet. Creating admin account...');
    console.log('You can log using email : admin0@rationalk.ch / password : admin0');
    //This is the default account for a fresh install
    var accountId = Accounts.createUser({
        email: 'admin0@rationalk.ch',
        username: 'admin0',
        profile: {name: 'admin0', orgId: 'admin0'},
        password: 'admin0',
        verified: true
      });


      Meteor.setTimeout(function () {
          Meteor.users.update({_id: accountId}, {
            $set: {
              username: 'admin0',
              profile: {name: 'admin0', orgId: 'admin0'},
              emails : [ { address: 'admin0@rationalk.ch',verified: true } ]
            }
          });
        }
        , 2000);

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
        email: 'admin0@rationalk.ch',
        orgId: 'demo',
        profile: {name: 'admin0', orgId: 'demo', roles: ['admin'], nickname: 'admin0'},
        username: 'admin0',
        accountId: accountId
      });
      Roles.addUsersToRoles(accountId, ['admin'])
  }
}

})();
