'use strict';

app.controller('UserController', function($scope, $http, alertService, $state, $stateParams) {

  $scope.isOwnerOfProfile = false;
  $scope.loggedId = sessionStorage.getItem('userID');
  $scope.user = {}
  $scope.travels = [];
  $scope.favouriteTravels = [];
  $scope.friends = [];
  $scope.travelsSize = 0;
  $scope.favsSize = 0;
  $scope.friendsSize = 0;
  $scope.activeTravels = "active";
  $scope.activeFavs = "";
  $scope.activeFriends = "";
  $scope.isSelectedTravels = true;
  $scope.isSelectedFavs = false;
  $scope.isSelectedFriends = false;

  var decodePhotoUrlsFrom = function(listOfFriends) {
    listOfFriends.map(function(f) {
      f.photoUrl = decodeURIComponent(f.photoUrl);
    });
    return listOfFriends;
  }

  var getUser = function(userToken) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/user/' + userToken
    }).then(function(result) {
      $scope.user = result.data;
      $scope.shortUserName = $scope.user.name.split(" ")[0];
      $scope.userPhoto = decodeURIComponent($scope.user.photoUrl);

      if(userToken == $scope.loggedId) {
        $scope.isOwnerOfProfile = true;
      }

      getUserTravels();
      getFavouriteTravels();
      getUserFriends();
    });
  }

  function getUserTravels() {
  	$http({
  		method: 'GET',
  		url: 'http://localhost:8080/travels?user=' + $scope.user.token
  	}).then(function(result) {
      $scope.travels = result.data;
      $scope.travelsSize = $scope.travels.length;
    });
  }

  function getFavouriteTravels() {
  	$http({
  		method: 'GET',
   		url: 'http://localhost:8080/favouriteTravels?user=' + $scope.user.token
   	}).then(function(result) {
      $scope.favouriteTravels = result.data;
      $scope.favsSize = $scope.favouriteTravels.length;
    });
  }

  function getUserFriends() {
  	$http({
      method: 'GET',
      url: 'http://localhost:8080/friends?user=' + $scope.user.token
    }).then(function(result) {
      $scope.friends = decodePhotoUrlsFrom(result.data);
      $scope.friendsSize = $scope.friends.length;
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
      url: 'http://localhost:8080/deleteFavouriteTravel/' + travel.id + '/' + $scope.user.token
    }).then(function(result) {
      getFavouriteTravels();
    });
  }

  $scope.deleteFriend = function(friend) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/deleteFriend/' + $scope.loggedId + '/' + friend
    }).then(function(result) {
      alertService.showSuccessAlert('Amigo borrado');
      getUserFriends();
    });
  }

  $scope.addFriend = function(friendToken) {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/addFriend/' + $scope.loggedId + '/' + friendToken
    }).then(function(result) {
      alertService.showSuccessAlert('Agregado!');
    });
  }

  $scope.showTravels = function() {
    manageSections("active", true, "", false, "", false);
    getUserTravels();
  }

  $scope.showFavourites = function() {
    manageSections("", false, "active", true, "", false);
    getFavouriteTravels();
  }

  $scope.showFriends = function() {
    manageSections("", false, "", false, "active", true);
    getFavouriteTravels();
  }

  var manageSections = function(activeTravel, selectedTravel, activeFav, selectedFav, activeFriend, selectedFriend) {
      $scope.activeTravels = activeTravel;
      $scope.isSelectedTravels = selectedTravel;
      $scope.activeFavs = activeFav;
      $scope.isSelectedFavs = selectedFav;
      $scope.activeFriends = activeFriend;
      $scope.isSelectedFriends = selectedFriend;
  }

  getUser($stateParams.token);

});
