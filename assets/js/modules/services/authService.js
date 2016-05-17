angular.module('Services').service('AuthService', ['$q', '$cookieStore', function ($q, $cookieStore) {

	const ERROR_MESSAGE = 'Authentication failed, check your credentials...';

	this.LogIn = function(username, password) {
		var deferred = $q.defer();
		AssignmentController.logIn(username, password, function(result) {
			if(result) {
				var session = { token: result, username: username };
				$cookieStore.put('session', JSON.stringify(session));
				deferred.resolve(result);
			} else {
				deferred.reject(ERROR_MESSAGE);
			}
		});
		return deferred.promise;
	};

	this.LogOut = function() {
		var deferred = $q.defer();
		if($cookieStore.get('session')) {
			$cookieStore.remove('session');
		}
		deferred.resolve();
		return deferred.promise;
	};

	this.ValidateRouteChange = function() {
		return $cookieStore.get('session');
	};

	this.ValidateToken = function() {
		var deferred = $q.defer();
            try {
                var session = JSON.parse($cookieStore.get('session'));
                if(!session.token || !session.username) {
                    deferred.reject(ERROR_MESSAGE);
                } else {
                	AssignmentController.validateToken(session.username, session.token, function(result) {
						if(result) {
							deferred.resolve();
						} else {
							deferred.reject(ERROR_MESSAGE);
						}
					});
                }
            } catch (e) {
                deferred.reject(ERROR_MESSAGE);
            }
		
		return deferred.promise;
	};

}]);