angular.module('Controllers')
    .controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    	$scope.loginModel = {};
    	$scope.login = function() {
    		AuthService.LogIn($scope.loginModel.username, $scope.loginModel.password).then(function(r) {
    			$location.path('/home');
    		}, function(e) {
				$scope.message = e;
				$scope.messageType = 'danger';
    		});
    	};
    }]);