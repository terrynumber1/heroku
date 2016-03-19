// bootstrap.ui Modal definition

(
    function() {
        angular
            .module('loc8rApp')
            .controller('reviewModalCtrl', reviewModalCtrl);

        reviewModalCtrl.$inject = ['$modalInstance', 'locationData', 'loc8rData'];
        function reviewModalCtrl($modalInstance, locationData, loc8rData){
            var vm = this;
            vm.locationData = locationData;

            // page 335, Listing 10.21
            vm.modal = {
                // vm.modal.cancel
                cancel: function () {
                    $modalInstance.dismiss();
                    //$modalInstance.dismiss('cancel');
                },
            };

            // page 339, ng-submit, we need to validate data listing 10.23
            vm.onSubmit = function() {
                console.log('jklsdjfkjsdkfdjk')

                // module.exports.doAddReview = function (req, res) {}
                // location.js
                //vm.doAddReview()

                loc8rData.addReviewById('1213131', 'datakdfjkfjkfdkdjk');
            };

        }

    }

)();


