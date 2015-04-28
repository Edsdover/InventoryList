'use strict';

angular.module('bank')
.controller('AccountsCtrl', function($scope, Account){
  var afUser = $scope.afUser = Account.init();
  afUser.$loaded().then(syncNames);
  $scope.addAccount = function(name){
    Account.add(name).then(syncNames);
    $scope.accountName = '';
  };
  $scope.addTransaction = function(name, item){
    Account.addTransaction(name, item);
  };
  $scope.deleteTransaction = function(item, index){
    Account.removeTransaction(item, index);
  };
  $scope.editTransaction = function(item, $index){
    item.date = new Date(item.date);
    item.ind = $index;
    $scope.item = item;
  };
  $scope.total = function(key){
    var sum = 0;
    for(var i in key){
      sum += key[i].cost * key[i].amount;
    }
    return sum;
  };
  function syncNames(){
    $scope.names = afUser.names ? afUser.names.split(',') : [];
  }
});
