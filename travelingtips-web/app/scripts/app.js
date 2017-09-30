'use strict';

var app = angular.module('travelingtipsWebApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'views/home.html'
  };

  var signInState = {
    name: 'signIn',
    url: '/signIn',
    templateUrl: 'views/signIn.html'
  };

  var createMapState = {
    name: 'createMap',
    url: '/createMap',
    templateUrl: 'views/createmap.html'
  };

  var userProfileState = {
    name: 'userProfile',
    url: '/userProfile',
    templateUrl: 'views/userProfile.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(signInState);
  $stateProvider.state(createMapState);
  $stateProvider.state(userProfileState);

});