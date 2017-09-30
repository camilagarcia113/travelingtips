'use strict';

app.controller('SignInController', function($scope) {

  //$scope.isLogin = false;
  
  var checkIfUserSignedIN = function () {
  	var user = sessionStorage.getItem('user');
  	if(user !== null || user !== undefined) {
  		$scope.isLogin = true;
  	}
  }

  //checkIfUserSignedIN();
});