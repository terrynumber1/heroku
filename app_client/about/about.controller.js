(
    function() {
        angular
            .module('loc8rApp')
            .controller('aboutCtrl', aboutCtrl);

        function aboutCtrl() {
            var vm = this;

            vm.pageHeader = {
                title: 'About Loc8r'
            };

            vm.main = {
                content: 'Loc8r was created klsjflsdjfsdlfjlsdjfjkjwelrjlkjlksdf \n\nljasfjsdlfjlj'
            };
        }
    }
)();