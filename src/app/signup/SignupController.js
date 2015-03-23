angular.module('ida.controllers')
    .controller('SignupController',['$scope','$http', '$state', '$timeout', function($scope, $http, $state, $timeout){
        // Signup handler
        $scope.signup =  function(){
            // Sending request to the server for signup
            $http.post('/api/v1/user/signup', {
                'email': $scope.session.email,
                'password': $scope.session.password
            })
                .success(function(data, status, headers, config){
                    $scope.alert.showAlertMessage("Account created", "success");
                    $timeout(function(){
                        $scope.alert.showAlertMessage("Redirecting to login", "warning");
                        $timeout(function(){
                            $state.go("login");
                        }, 750)
                    }, 1000);

                })
                .error(function(data, status, headers, config){
                    $scope.alert.showAlertMessage("Email already registered", "error");
                });
            $scope.alert.showAlertMessage("Creating new account", "warning");
        };
    }]);
