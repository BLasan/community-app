(function (module) {
    mifosX.controllers = _.extend(module, {
        CollateralController: function (scope, resourceFactory, location) {
            scope.charges = [];

            scope.routeTo = function (id) {
                location.path('/viewcollateral/' + id);
            };

            // if (!scope.searchCriteria.collaterals) {
            //     scope.searchCriteria.collaterals = null;
            //     scope.saveSC();
            // }
            //scope.filterText = scope.searchCriteria.charges || '';

            // scope.onFilter = function () {
            //     scope.searchCriteria.charges = scope.filterText;
            //     scope.saveSC();
            // };

            scope.CollateralPerPage =15;
            scope.$broadcast('ChargeDataLoadingStartEvent');
            resourceFactory.collateralResource.getAllCollaterals(function (data) {
                scope.collaterals = data;
                scope.$broadcast('ChargeDataLoadingCompleteEvent');
            });
        }
    });
    mifosX.ng.application.controller('CollateralController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CollateralController]).run(function ($log) {
        $log.info("CollateralController initialized");
    });
}(mifosX.controllers || {}));