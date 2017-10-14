'use strict';

app.controller('UserController', function($scope, $http, userService, alertService, $state, viewMapService) {

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

  $scope.deleteTravel = function(travel) {
    //open modal asking if user is sure to delete
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteTravel/' + travel.id
    }).then(function(result) {
      alertService.showSuccessAlert('Viaje borrado!');
      getUserTravels();
    });
  }

  $scope.viewTravel = function(travel) {
    viewMapService.getTravel(travel.id);
    $state.go('viewTravel');
  }

  getUserTravels();

});
