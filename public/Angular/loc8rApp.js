angular.module('loc8rApp', []);

var _isNumeric = function (n) {
    return !isNaN( parseFloat(n) & isFinite(n) );
};

var formatDistance = function () {
    return function (distance) {
        var numDistance, unit;

        if (distance && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = 'km';
            } else {
                numDistance = parseInt(distance * 1000, 10);
                unit = 'm';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};

// ratingStars would be referenced in HTML as rating-stars, bottom of page 259
var ratingStars = function () {
    return {
        scope: {
          thisRating: '=rating'
        },
        templateUrl: '/angular/ratingStars.template.html'
    };
};

// homepage
var loc8rData = function ($http) {

    var locationByCoords = function (lat, lng) {
        var url1 = '/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20';
        console.log(url1);
        return $http.get(url1);
    };

    return {
        locationByCoords: locationByCoords
    };

    //return [{
    //    name: 'Burger Queen',
    //    address: '125 High Street, Reading, RG6 1PS',
    //    rating: 3,
    //    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    //    distance: '0.296456',
    //    _id: '5370a35f2536f6785f8dfb6a'
    //}, {
    //    name: 'Costy',
    //    address: '125 High Street, Reading, RG6 1PS',
    //    rating: 5,
    //    facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
    //    distance: '0.7865456',
    //    _id: '5370a35f2536f6785f8dfb6a'
    //}];
};

var locationListCtrl = function ($scope, loc8rData,  geolocation1) {

    $scope.message = "Checking your location";

    // Listing 8.16
    $scope.getData = function (position) {

        console.log(position);

        var lat = position.coords.latitude,
            lng = position.coords.longitude;

        //var lng = -0.79,
        //    lat = 51.3;

        console.log('lat: ' + lat + ' lng: ' + lng);

        $scope.message = "Searching for nearby places";

        // loc8rData = $http.get()
        loc8rData
            .locationByCoords(lat, lng)
            .success(function (data) {
                $scope.message = data.length > 0 ? "" : "No locations found";
                $scope.data = {locations: data};
            })
            .error(function (err) {
                $scope.message = "Sorry, something went wrong";
            });
    };

    $scope.showError = function (err) {
        $scope.$apply(function () {
            $scope.message = error.message;
        });
    };

    $scope.noGeo = function () {
        $scope.$apply(function () {
            $scope.message = "Geolocation not supported by this browser.";
        });
    };

    geolocation1.getPosition($scope.getData, $scope.showError, $scope.noGeo);

    //$scope.data = {
    //    locations: loc8rData
    //};

};

var geolocation1 = function () {

    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError)
        } else {
            cbNoGeo();
        }
    };

    return {getPosition: getPosition};
};


angular
    .module('loc8rApp')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars) // rating-stars in HTML tag
    .service('loc8rData', loc8rData)
    .service('geolocation1', geolocation1);
