(function() {

    ////////////////////////////////////////////////////////////
    // App
    ////////////////////////////////////////////////////////////

    var App = angular.module('YourApp', ['ngCookies', 'ngRoute', 'Controllers', 'Directives', 'Factories', 'Filters', 'Services', 'ngSanitize']);


    ////////////////////////////////////////////////////////////
    // CONFIG
    ////////////////////////////////////////////////////////////

    App.config(['$httpProvider', '$routeProvider', '$provide', function ($httpProvider, $routeProvider, $provide) {

        //$httpProvider.interceptors.push('TokenInterceptor');

        $routeProvider
            .when('/login', {
                templateUrl: 'pages/login.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: 'pages/home.html',
                controller: 'ContactController'
            })
            .when('/home/contact/form/:id?', {
                templateUrl: 'pages/contact_form.html',
                controller: 'ContactController'
            })
            .otherwise({
                redirectTo: '/home'
            });

    }]);

    App.run(['$rootScope', '$location', '$cookies', 'AuthService', function($rootScope, $location, $cookies, AuthService) {       
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if(!AuthService.ValidateRouteChange()) {
                $location.path('/login');
            };
        });
    }]);

})();
