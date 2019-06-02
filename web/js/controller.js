var app = angular.module("MyController", []);
app.controller("ctrl", function ($scope, $http) {
  $scope.port = "3000";
  $scope.nombre = "Servidor ";
  $scope.director = "";
  $scope.howiam ="";
  $scope.leave = false;
  $scope.servPort = "";


$scope.canILeave = function() {
  $http.get("http://10.4.74.169:"+$scope.port+"/launchLeader")
    .then(function (response) {
      $scope.leave=(angular.equals(response.data, $scope.port));
    }).catch(function(e){
      alert("Error en puerto " + $scope.port);
    });
 };
   $scope.consultLeader = function() {
      $http.get("http://10.4.74.169:"+$scope.port+"/launchLeader", {timeout: 2500})
      .then(function (response) {
        $scope.director = "Servidor " + response.data;
        $scope.canILeave();
        $scope.howiam = ($scope.leave?"Si":"no" );
      }).catch(function(e){
        alert("Error en puerto " + $scope.port);
      });
    };

   $scope.toLeave = function() {
    alert("Estas renunciando!!! :O");
      $http.post("http://10.4.74.169:"+$scope.port+"/test")
      .then(function (response) {

      }).catch(function(e){
        alert("Error al renunciar " + $scope.port);
      });
    };

    $scope.updatePort = function() {
      console.log('Actualizando . . . ');
        //$scope.servPort = (document.getElementById("myPortID").value);
    };

});