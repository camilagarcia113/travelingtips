'use strict';

var app = angular.module('travelingtipsWebApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'views/home.html'
  };

  var createMapState = {
    name: 'createMap',
    url: '/createMap',
    templateUrl: 'views/createmap.html'
  };

  var editTravelState = {
    name: 'editTravel',
    url: '/editTravel',
    templateUrl: 'views/editTravel.html'
  };

  var viewTravelState = {
    name: 'viewTravel',
    url: '/viewTravel',
    templateUrl: 'views/viewTravel.html'
  };

  var userProfileState = {
    name: 'userProfile',
    url: '/userProfile',
    templateUrl: 'views/userProfile.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(createMapState);
  $stateProvider.state(editTravelState);
  $stateProvider.state(viewTravelState);
  $stateProvider.state(userProfileState);
});