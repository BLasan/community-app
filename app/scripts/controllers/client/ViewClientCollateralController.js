(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewClientCollateralController: function (scope, resourceFactory, routeParams, location) {

            scope.collateralTypes = [];
            scope.formData = {};
            scope.clientId = routeParams.id;
            scope.collateralId = routeParams.collateralId;

            resourceFactory.clientcollateralResource.get({clientId: scope.clientId, collateralId: collateralId}, function (data) {
                scope.collaterals = data;
            });

            scope.deleteClientCollateral = function () {
                $uibModal.open({
                    templateUrl: 'deleteclientcollateral.html',
                    controller: CollateralDeleteCtrl
                });
            };

            var CollateralDeleteCtrl = function ($scope, $uibModalInstance) {
                $scope.delete = function () {
                    resourceFactory.collateralResource.delete({cleintId: id, collateralId: scope.collateralId}, function (data) {
                        $uibModalInstance.close('delete');
                        location.path('/clients/' + scope.cleintId + '/viewclientcollateral/' + scope.collateralId);
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            // resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function (data) {
            //     scope.collateralTypes = data.allowedCollateralTypes;
            //     scope.formData.collateralTypeId = data.allowedCollateralTypes[0].id;
            // });

            scope.cancel = function () {
                location.path('/viewclient/' + scope.clientId);
            };



        }
    });
    mifosX.ng.application.controller('ViewClientCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.ViewClientCollateralController]).run(function ($log) {
        $log.info("ViewClientCollateralController initialized");
    });
}(mifosX.controllers || {}));
