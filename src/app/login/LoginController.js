angular.module('ida.controllers')
    .controller('LoginController',['$scope','$http','$state', function($scope, $http, $state){

        $scope.login =  function(){
            // Sending request to the server for login
            $http.post('/api/v1/user/login', {
                'email': $scope.session.email,
                'password': $scope.session.password
            })
                .success(function(data, status, headers, config){
                    $state.go("home");
                })
                .error(function(data, status, headers, config){
                });
        };
    }]);
