angular.module('Factories').factory('TokenInterceptor', ['$q', 'AuthService', function($q, AuthService) { 

    return {
        request: function(config) {
            var cancel = $q.defer();
            config.timeout = cancel.promise;
            AuthService.ValidateToken().then(null, function(error) {
                cancel.resolve(error);
            });
            return config;
        }
    };
}]);