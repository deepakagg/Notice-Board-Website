angular.module('ida.controllers')
    .controller('LoginController',['$scope','$http','$state','UserHelper', function($scope, $http, $state, UserHelper){
        $scope.login =  function(){
            // Sending request to the server for login
            $http.post('/api/v1/user/login', {
                'email': $scope.session.email,
                'password': $scope.session.password
            })
                .success(function(data, status, headers, config){
                    $scope.alert.showAlertMessage("Successfully logged in", "success");
                    UserHelper.setCurrentUserAsLoggedIn();
                    $state.go("main");
                })
                .error(function(data, status, headers, config){
                    $scope.alert.showAlertMessage("Wrong email and password combination", "error");
                });
            $scope.alert.showAlertMessage("Logging in", "warning");
        };
    }]);
