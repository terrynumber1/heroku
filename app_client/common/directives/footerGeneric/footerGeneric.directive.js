( function() {
        angular
            .module('loc8rApp')
            .directive('footerGeneric', footerGeneric);
            // <footer-generic></footer-generic>
        function footerGeneric() {
            return {
                restrict: 'EA',
                templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
            };
        }
    }
)();