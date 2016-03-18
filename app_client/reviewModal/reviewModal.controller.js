// bootstrap.ui Modal definition

(
    function() {
        angular
            .module('loc8rApp')
            .controller('reviewModalCtrl', reviewModalCtrl);

        reviewModalCtrl.$inject = ['$modalInstance'];
        function reviewModalCtrl($modalInstance){
            var vm = this;

            // page 335, Listing 10.21
            vm.modal = {
                // vm.modal.cancel
                cancel: function () {
                    $modalInstance.dismiss();
                    //$modalInstance.dismiss('cancel');
                },
            };
        }

    }

)();


