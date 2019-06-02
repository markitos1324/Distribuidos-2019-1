var app = angular.module("MyController", []);
app.controller("ctrl", function ($scope, $http) {
  $scope.nombre = "Servidor ";
  $scope.director = "";
  $scope.howiam ="";
  $scope.leave = false;
  $scope.servPort = "";
  $scope.ipaddress = "10.4.74.169";


$scope.canILeave = function() {
  $http.get("http://"+$scope.ipaddress+":"+$scope.servPort+"/launchLeader")
    .then(function (response) {
      $scope.leave=(angular.equals(response.data, $scope.servPort));
    }).catch(function(e){
      alert("Error en puerto " + $scope.servPort);
    });
 };
   $scope.consultLeader = function() {
      $http.get("http://"+$scope.ipaddress+":"+$scope.servPort+"/launchLeader", {timeout: 2500})
      .then(function (response) {
        $scope.director = "Servidor " + response.data;
        $scope.canILeave();
        $scope.howiam = ($scope.leave?"Si":"no" );
      }).catch(function(e){
        alert("Error en puerto " + $scope.servPort);
      });
    };

   $scope.toLeave = function() {
    alert("Estas renunciando!!! :O");
      $http.post("http://"+$scope.ipaddress+":"+$scope.servPort+"/test")
      .then(function (response) {

      }).catch(function(e){
        alert("Error al renunciar " + $scope.servPort);
      });
    };

    $scope.updatePort = function() {
      console.log('Puerto actualizado ' + $scope.servPort);
    };
    $scope.updateIp = function() {
      console.log('Puerto actualizado ' + $scope.ipaddress);
    };

});