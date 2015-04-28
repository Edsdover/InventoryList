'use strict';

angular.module('bank')
.factory('Account', function($rootScope, $firebaseObject, $firebaseArray, $window){
  var fbUser;
  var afUser;

  function Account(){

  }

  Account.init = function(){
    // create child off root based on login id
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid)
    afUser = $firebaseObject(fbUser);
    return afUser;
  };

  Account.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);

    afUser.names = names.join(',');
    return afUser.$save();

  };

  Account.addTransaction = function(name, item){
    var transaction = angular.copy(item);
    transaction.date = transaction.date.getTime();
    transaction.createdAt = $window.Firebase.ServerValue.TIMESTAMP;
    transaction.name = name;

    // create child off of user
    var fbTransactions = fbUser.child('accounts/' + transaction.type);

    var afTransactions = $firebaseArray(fbTransactions);


    if (item.createdAt === undefined){
      afTransactions.$add(transaction);
    }
    else{
      afTransactions.$loaded().then(function() {
        // find object id
        console.log(afTransactions[item.ind].$id);
        console.log(fbTransactions);
        fbTransactions.child(afTransactions[item.ind].$id).update(item);
      })
    }

  }

  Account.removeTransaction = function(item, index){
    console.log('test');
    // point to account type
    var fbTransactions = fbUser.child('accounts/' + item.type);
    var afTransactions = $firebaseArray(fbTransactions);

    afTransactions.$loaded().then(function(){
      var founditem = afTransactions[index];
      afTransactions.$remove(founditem)
    });
  }

  return Account;
});
