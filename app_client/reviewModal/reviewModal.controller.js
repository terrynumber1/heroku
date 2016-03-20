// bootstrap.ui Modal definition

(
    function() {
        angular
            .module('loc8rApp')
            .controller('reviewModalCtrl', reviewModalCtrl);

        reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
        function reviewModalCtrl($modalInstance, loc8rData, locationData){
            var vm = this;
            vm.locationData = locationData;

            // page 339, ng-submit, we need to validate data listing 10.23
            vm.onSubmit = function() {
                vm.formError = "";

                if ( !vm.formData.name || !vm.formData.rating || !vm.formData.reviewText ) {
                    vm.formError = 'All fields required, please try again';
                    return false;
                } else {
                    vm.doAddReview(vm.locationData.locationid, vm.formData);
                }
                // module.exports.doAddReview = function (req, res) {}
                // location.js
                //vm.doAddReview()
            };

            vm.doAddReview = function (locationid, formData) {
                loc8rData.addReviewById(locationid, {
                    author: formData.name,
                    rating: formData.rating,
                    reviewText: formData.reviewText
                })
                    .success(function (data) {
                        console.log('success!');
                        vm.modal.close(data);
                    })
                    .error(function (data) {
                        vm.formError = 'Your review did not get push to MongoDB';
                    });

                return false;
            };

            // page 335, Listing 10.21
            vm.modal = {
                close: function(result) {
                    $modalInstance.close(result);
                },
                cancel: function () { // vm.modal.cancel
                    $modalInstance.dismiss();
                    //$modalInstance.dismiss('cancel');
                }
            };

        }

    }

)();


