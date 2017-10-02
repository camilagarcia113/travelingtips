app.service('alertService', function($rootScope) {

  $rootScope.alerts = [];

  var addAlert = function (type, msg) {
    $rootScope.alerts.push({
      "type": type,
      "msg": msg
    });
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };

  this.showDangerAlert = function(message) {
    addAlert('danger', message);
  }

  this.showWarningAlert = function(message) {
    addAlert('warning', message);
  }

  this.showSuccessAlert = function(message) {
    addAlert('success', message);
  }    
});