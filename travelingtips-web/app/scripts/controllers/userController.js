'use strict';

app.controller('UserController', function($scope, $http, alertService, $state, $stateParams) {

  $scope.isOwnerOfProfile = false;
  $scope.loggedId = sessionStorage.getItem('userID');
  $scope.user = {}
  $scope.travels = [];
  $scope.favouriteTravels = [];
  $scope.travelsSize = 0;
  $scope.favsSize = 0;
  $scope.activeTravels = "active";
  $scope.activeFavs = "";
  $scope.isSelectedTravels = true;
  $scope.isSelectedFavs = false;

  var getUser = function(userId) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/user/' + userId
    }).then(function(result) {
      $scope.user = result.data;
      $scope.shortUserName = $scope.user.name.split(" ")[0];
      $scope.userPhoto = decodeURIComponent($scope.user.photoUrl);

      if(userId == $scope.loggedId) {
        $scope.isOwnerOfProfile = true;
      }

      getUserTravels();
      getFavouriteTravels()
    });
  }

  function getUserTravels() {
  	$http({
  		method: 'GET',
  		url: 'http://localhost:8080/travels?user=' + $scope.user.id
  	}).then(function(result) {
      $scope.travels = result.data;
      $scope.travelsSize = $scope.travels.length;
    });
  }

  function getFavouriteTravels() {
  	$http({
  		method: 'GET',
   		url: 'http://localhost:8080/favouriteTravels?user=' + $scope.user.id
   	}).then(function(result) {
      $scope.favouriteTravels = result.data;
      $scope.favsSize = $scope.favouriteTravels.length;
    });
  }

  $scope.deleteTravel = function(travel) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteTravel/' + travel.id
    }).then(function(result) {
      alertService.showSuccessAlert('Viaje borrado!');
      getUserTravels();
    });
  }

  $scope.removeTravelFromFavs = function(travel) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteFavouriteTravel/' + travel.id + '/' + $scope.user.id
    }).then(function(result) {
      getFavouriteTravels();
    });
  }

  $scope.showTravels = function() {
    $scope.activeTravels = "active";
    $scope.isSelectedTravels = true;
    $scope.activeFavs = "";
    $scope.isSelectedFavs = false;
    getUserTravels();
  }

  $scope.showFavourites = function() {
    $scope.activeTravels = "";
    $scope.isSelectedTravels = false;
    $scope.activeFavs = "active";
    $scope.isSelectedFavs = true;
    getFavouriteTravels();
  }

  getUser($stateParams.id);

});
