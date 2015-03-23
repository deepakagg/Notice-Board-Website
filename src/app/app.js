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
            },

            setCurrentUserAsLoggedIn: function(){
                $rootScope.currentUserLoggedIn = true;
            }
        };
    }]);

angular.module('ida.controllers', [])
  .controller('idaMainController', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout){

        $scope.alert = {
            _message : "hi",
            _alert_type : "",
            _show_alert: false,
            _old_timeout_instance: undefined,
            _showAlertMessage : function(){
                var that = this;
                // Checking if old timeout exists
                if(this._old_timeout_instance){
                    // Cancelling old timeout
                    $timeout.cancel(this._old_timeout_instance);
                }
                this._show_alert = true;
                this._old_timeout_instance = $timeout(function(){
                    that._show_alert = false;
                }, 1500);
            },
            showAlertMessage : function(message, alert_type){
                this._message = message;
                this._alert_type = alert_type;
                this._showAlertMessage();
            }
        }
  }]);

