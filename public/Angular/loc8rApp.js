
var locationListCtrl = function ($scope) {
    $scope.data = {
        locations: [{
            name: 'Burger Queen',
            address: '124 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Wifi'],
            distance: '0.296465',
            _id: '5370a35f2536f6785f8dfb6a'
        }, {
            name: 'Costy',
            address: '432 Apple St, JIM, 58433',
            rating: 5,
            facilities: ['Cool drinks', 'Burgers'],
            distance: '0.7865456',
            _id: '5370a35f2536f6785f8dfb6a'
        }]
    };
};

var app = angular.module('loc8rApp');
app.controller('locationListCtrl', [locationListCtrl]);