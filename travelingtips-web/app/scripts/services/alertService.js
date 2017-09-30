app.service('alertsService', function() {

  var alerts = [];

  this.addAlert = function (type, msg) {
    alerts.push({
      "type": type,
      "msg": msg
    });
  };

  this.closeAlert = function(index) {
    alerts.splice(index, 1);
  };
});