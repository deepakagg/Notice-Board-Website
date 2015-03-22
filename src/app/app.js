angular.module( 'ida', [
  'ui.router',
  'ida.controllers',
    'templates-app',
    'templates-common'
])

.config( ['$stateProvider', '$urlRouterProvider',function( $stateProvider, $urlRouterProvider ) {
        $stateProvider
            .state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                controller:"LoginController",
                templateUrl: "login/login.tpl.html"
            })
            .state('signup', {
                url: '/signup',
                data: {
                    requireLogin: false
                },
                controller:"SignupController",
                templateUrl: "signup/signup.tpl.html"
            })
            .state('main', {
                url: '/',
                templateUrl: "home/home.tpl.html",
                controller: "HomeController",
                data: {
                    requireLogin: true
                }
            });
}])
    .run(['$rootScope', '$state', 'UserHelper', function($rootScope, $state, UserHelper){
        // Checking if user is logged in or not
        UserHelper.checkIfUserIsLoggedIn();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin &&  !$rootScope.currentUserLoggedIn){
                // Stopping the current state change
                event.preventDefault();
                $state.go('login');
            }
        });

    }])
    .factory('UserHelper', [ '$http', '$rootScope', '$state', function($http, $rootScope, $state){
        return {
            checkIfUserIsLoggedIn : function(){
                $http.get("/api/v1/user")
                    .success(function(data){
                        $rootScope.currentUserLoggedIn = true;
                        //User is logged in go to main
                        $state.go("main");
                    })
                    .error(function(data){
                       // User is not logged in
                        $state.go('login');
                    });
            }
        }
    }]);

angular.module('ida.controllers', [])
  .controller('idaMainController', ['$scope', '$rootScope', function($scope, $rootScope){

  }]);

