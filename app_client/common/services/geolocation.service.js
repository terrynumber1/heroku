(function() {
    angular
        .module('loc8rApp')
        .service('geolocation', geolocation);

    function geolocation () {
        var getPostion = function (cbSucces, cbError, cbNoGeo) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(cbSucces, cbError);
            } else {
                cbNoGeo();
            }
        };

        return { getPosition: getPostion };
    }
})();