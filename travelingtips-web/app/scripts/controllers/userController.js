'use strict';

app.controller('UserController', function($scope, $http, userService) {

  $scope.isOwnerOfProfile = true;
  $scope.userName = userService.getName();

  //107512567689036677984
});
