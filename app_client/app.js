// Listing 9.12
// IIFE, immediately invoked function expression
// ( function(){} )();

( function() {

    angular.module('loc8rApp', ['ngRoute']);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }

    angular
        .module('loc8rApp')
        .config(['$routeProvider', config]);
})();