angular
    .module('loc8rApp')
    .service('loc8rData', loc8rApp);

function loc8rData ($http) {
    var locationByCoords = function (lat, lng) {
        return $http.get('/api/location?lng=' + lng + '$lat=' + lat + '&maxDistance=20');
    };

    return {
        locationByCoords: locationByCoords
    };
}