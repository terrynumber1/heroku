(function () {

    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$modal', 'loc8rData'];
    function locationDetailCtrl ($routeParams, $modal, loc8rData) {
        var vm = this;
        vm.locationid = $routeParams.locationid;

        loc8rData.locationById(vm.locationid)
            .success(function(data) {
                vm.data = { location: data };
                vm.pageHeader = {
                    title: vm.data.location.name
                };

                //console.log(vm.data.location.name);
            })
            .error(function (e) {
                console.log(e);
            });

        vm.popupReviewForm = function () {
            var modalInstance = $modal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm', // what the fuck is this 'vm' referring too?
                resolve: {

                    // listing 10.22, page 337
                    // locationData needs to be inject into reviewModalCtrl
                    locationData: function() {
                        return {
                            locationid: vm.locationid,
                            locationName: vm.data.location.name
                        };
                    }
                }
            });
        };

    }

})();