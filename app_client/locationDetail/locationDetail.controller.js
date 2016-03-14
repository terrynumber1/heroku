(
    function() {
        angular
            .module('loc8rApp')
            .controller('locationDetailCtrl', locationDetailCtrl);

        locationDetailCtrl.$inject = ['$routeParams', '$modal', 'loc8rData'];
        function locationDetailCtrl($routeParams, $modal, loc8rData) {
            var vm = this;

            vm.pageHeader = {
                title: 'Location detail page'
            };

            vm.locationid = $routeParams.locationid;
            console.log(vm.locationid);


            loc8rData.locationById(vm.locationid)
                .success(function (data) {
                    vm.data = {location: data};
                    vm.pageHeader = {
                        title: vm.data.location.name
                    };

                    //console.log(vm.pageHeader.title);
                    //console.log(data);
                    //console.log(vm.data);
                })
                .error(function (e) {
                    console.log(e);
                });

            vm.popupReviewForm = function () {
                alert('HLKEJFLJKFLJDLJ');
            };

        }
    }
)();