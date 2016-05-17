angular.module('Controllers')
    .controller('MainController', ['$scope', '$location', 'ContactService', 'AuthService', function ($scope, $location, ContactService, AuthService) {
    	
        $scope.message = '';
        $scope.messageType = '';
        
    	$scope.contacts = [];

        ContactService.GetContacts().then(function(result) {
            $scope.contacts = result;
        });

        $scope.logOut = function() {
        	AuthService.LogOut().then(function() {
        		$location.path('/login');
        	})
        }

    }]);