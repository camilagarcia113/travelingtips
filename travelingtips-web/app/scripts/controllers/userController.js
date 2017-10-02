'use strict';

app.controller('UserController', function($scope, $http, userService, alertService, travelService, $rootScope, $state) {

  $scope.isOwnerOfProfile = true;
  $scope.userName = userService.getName();
  $scope.shortUserName = $scope.userName.split(" ")[0];
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
    //open modal asking if user is sure to delete
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteTravel?user=' + $scope.userID + '&title=' + travelTitle
    }).then(function(result) {
      alertService.showSuccessAlert('Viaje borrado!');
      getUserTravels();
    });
  }

  $scope.getTravel = function(travelTitle) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/travel?user=' + $scope.userID + '&title=' + travelTitle
    }).then(function(result) {
      $rootScope.travel = result.data;
      $rootScope.editMapMode = true;
      //$state.go('editTravel');
      console.log($rootScope.travel);
    });
  }

  getUserTravels();

});
