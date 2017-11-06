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
    url: '/editTravel/:id',
    templateUrl: 'views/editTravel.html'
  };

  var userProfileState = {
    name: 'userProfile',
    url: '/userProfile/:id',
    templateUrl: 'views/userProfile.html',
  };

  var viewTravelState = {
    name: 'viewTravel',
    url: '/viewTravel/:id/:favourite',
    templateUrl: 'views/viewTravel.html',
  };

  $stateProvider.state(homeState);
  $stateProvider.state(createMapState);
  $stateProvider.state(editTravelState);
  $stateProvider.state(userProfileState);
  $stateProvider.state(viewTravelState);
});