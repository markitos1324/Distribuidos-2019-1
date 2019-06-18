var app = angular.module("MyController", []);
app.controller("ctrl", function ($scope, $http) {
  $scope.nombre = "Servidor ";
  $scope.director = "";
  $scope.howiam ="";
  $scope.leave = false;
  $scope.hide = false;
  $scope.servPort = "";
  $scope.ipaddress = "10.4.74.169";
  $scope.news ={};

$scope.submit = function() {
  var formData = new FormData;
    for(i in $scope.news){
      formData.append(i, $scope.news[i]);
    }
    var file = $('#file')[0].files[0];
    formData.append('image', file);

    $http.post("http://"+$scope.ipaddress+":"+$scope.servPort, formData,{
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    }).then(function (res) {
      
        $scope.news = res.data;
    });
 }


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

    $scope.readURL =function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }



});