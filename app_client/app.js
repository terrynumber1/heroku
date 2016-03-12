// Listing 9.12
// IIFE, immediately invoked function expression
// ( function(){} )();

( function() {

    angular.module('loc8rApp', ['ngRoute']);

    // use $routeProvider with ng-view in html file
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        // this line of code gets rid of the # in the URL
        $locationProvider.html5Mode(true);
    }

    angular
        .module('loc8rApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();