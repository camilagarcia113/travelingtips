'use strict';

app.controller('UserController', function($scope, $http, userService) {

  $scope.isOwnerOfProfile = true;
  $scope.userName = userService.getName();
  $scope.userPhoto = userService.getPhotoUrl();
  $scope.userID = userService.getID();
  $scope.travels = [];
  $scope.travelsSize = 0;

  function getUserTravels() {
  	$http({
  		method: 'GET',
  		url: 'http://localhost:8080/travels?user=' + $scope.userID
  	}).then(function(result) {
      $scope.travels = result.data;
      $scope.travelsSize = $scope.travels.length;
    });
  }

  $scope.deleteTravel = function(travelTitle) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteTravel?user=' + $scope.userID + '&title=' + travelTitle
    }).then(function(result) {
      getUserTravels();
    });
  }

  getUserTravels();

});
