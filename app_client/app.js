// Listing 9.12
// IIFE, immediately invoked function expression
// ( function(){} )();

( function() {

    angular.module('loc8rApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

    // use $routeProvider with ng-view in html file
    //function config($routeProvider, $locationProvider) {
    function config($routeProvider) {
        $routeProvider
                // localhost:3000/#/
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            }) // localhost:3000/#/about
            .when('/about', {
                templateUrl: '/common/views/genericText.view.html',
                controller: 'aboutCtrl',
                controllerAs: 'vm'
            })
            .when('/location/:locationid', {
                templateUrl: '/locationDetail/locationDetail.view.html', // make the HTML file
                controller: 'locationDetailCtrl',                       // make the controller file
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        // this line of code gets rid of the # in the URL
        // I commented it out because it fucking confuses me.
        //$locationProvider.html5Mode(true);
    }

    angular
        .module('loc8rApp')
        .config(['$routeProvider', config]);
})();