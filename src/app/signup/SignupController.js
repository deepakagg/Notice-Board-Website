angular.module('ida.controllers')
    .controller('SignupController',['$scope','$http', '$state', function($scope, $http, $state){
        // Signup handler
        $scope.signup =  function(){
            // Sending request to the server for signup
            $http.post('/api/v1/user/signup', {
                'email': $scope.session.email,
                'password': $scope.session.password
            })
                .success(function(data, status, headers, config){
                    $state.go("login");
                })
                .error(function(data, status, headers, config){

                });
        };
    }]);
