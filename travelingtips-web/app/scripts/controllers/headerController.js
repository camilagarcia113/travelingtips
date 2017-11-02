'use strict';

app.controller('HeaderController', function($scope) {

    $scope.userIDLoggedIn = sessionStorage.getItem('userID');

});
