'use strict';

var app = angular.module('travelingtipsWebApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'views/home.html'
  };

  var editTravelState = {
    name: 'travel',
    url: '/travel/:id/:isNew',
    templateUrl: 'views/travel.html'
  };

  var userProfileState = {
    name: 'userProfile',
    url: '/userProfile/:token/:friend',
    templateUrl: 'views/userProfile.html',
  };

  var viewTravelState = {
    name: 'viewTravel',
    url: '/viewTravel/:id/:favourite',
    templateUrl: 'views/viewTravel.html',
  };

  $stateProvider.state(homeState);
  $stateProvider.state(editTravelState);
  $stateProvider.state(userProfileState);
  $stateProvider.state(viewTravelState);
});