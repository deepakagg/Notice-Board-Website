angular.module('ida.controllers')
    .factory('HomeHelper', ['$http', function($http){
        return {
            postMessage: function(message, callback){
                // Sending request to the server for the new message
                $http.post("/api/v1/comment/", {comment:message})
                    .success(function(data, status, headers, config){
                        // Calling callback with true as parameters
                        callback(true);
                    })
                    .error(function(data, status, headers, config){
                        // Calling callback with false as parameters
                        callback(false);
                    });
            },

            getMessages: function(callback){
                // Sending request to the server for the new message
                $http.get("/api/v1/comment/")
                    .success(function(data, status, headers, config){
                        // Calling callback with data as a result
                        callback(data);
                    })
                    .error(function(data, status, headers, config){
                        // Calling callback with null as result
                        callback(null);
                    });
            }
        };
    }])
    .controller('HomeController',['$scope','$http','HomeHelper', function($scope, $http, HomeHelper){
        // For fetching new messages
        $scope.fetchNewMessages = function(){
            HomeHelper.getMessages(function(data){
               if(data){
                   $scope.messages = data;
               }
            });
        };

        // For posting new messages
        $scope.postMessage =  function(){
            HomeHelper.postMessage($scope.post.message, function (result){
                if(result){
                    //Fetching new messages from the server
                    $scope.fetchNewMessages();
                }
            });
        };

        // Fetching messages form the server initially
        $scope.fetchNewMessages();
    }]);
