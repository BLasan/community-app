(function (module) {
    mifosX.controllers = _.extend(module, {
        EditCollateralController: function (scope, resourceFactory, routeParams, location) {

            scope.collateralId = routeParams.id;
            resourceFactory.collateralResource.get({collateralId: scope.collateralId}, function (data) {
                scope.collateral = data;
                scope.formData = {
                    name: data.name,
                    unitType: data.unitype,
                    basePrice: data.basePrice,
                    type: data.quality,
                    pctToBase: data.pctToBase,
                    currency: data.currency
                };
            });

            scope.cancel = function () {
                location.path('/collateralss/');
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                resourceFactory.collateralResource.put(this.formData, function (data) {
                    location.path('/viewcollateral/' + data.loanId);
                });
            };

        }
    });
    mifosX.ng.application.controller('EditCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.EditCollateralController]).run(function ($log) {
        $log.info("EditCollateralController initialized");
    });
}(mifosX.controllers || {}));
