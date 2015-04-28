'use strict';

angular.module('bank')
.controller('AccountsCtrl', function($scope, Account, $firebaseObject){
  var afUser = $scope.afUser = Account.init();

  afUser.$loaded().then(syncNames);

  $scope.addAccount = function(name){
    Account.add(name).then(syncNames);
    $scope.accountName = '';
    alert('Room added.');
  };

  $scope.addTransaction = function(name, item){

    Account.addTransaction(name, item);
    alert('Furniture added.');
  }

  $scope.deleteTransaction = function(item, index){
    Account.removeTransaction(item, index);

  }

  $scope.editTransaction = function(item, $index){
    // console.log(afUser.accounts);
    // console.log(key);
    item.date = new Date(item.date);
    item.ind = $index;
    $scope.item = item;
  };

  $scope.total = function(key){
    var sum = 0;

    for(var i in key){

      console.log(key[i].cost);

        sum += key[i].cost;

    }
    return sum;
  }

  function syncNames(){
    $scope.names = afUser.names ? afUser.names.split(',') : [];
  }

});
