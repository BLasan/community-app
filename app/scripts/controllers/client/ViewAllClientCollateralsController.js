(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewAllClientCollateralController: function (scope, resourceFactory, routeParams, location) {
            scope.clientId = routeParams.id;

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
            //scope.$broadcast('CollateralDataLoadingStartEvent');
            resourceFactory.clientcollateralResource.getAllCCollaterals({clientId: scope.clientId}, function (data) {
                scope.collaterals = data;
                //scope.$broadcast('CollateralDataLoadingCompleteEvent');
            });
        }
    });
    mifosX.ng.application.controller('ViewAllClientCollateralController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.ViewAllClientCollateralController]).run(function ($log) {
        $log.info("ViewAllClientCollateralController initialized");
    });
}(mifosX.controllers || {}));