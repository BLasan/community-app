(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateCollateralController: function (scope, resourceFactory, routeParams, location) {

            scope.collateralTypes = [];
            scope.formData = {};
            scope.collateralId = routeParams.id;

            // TODO: Get template

            // resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function (data) {
            //     scope.collateralTypes = data.allowedCollateralTypes;
            //     scope.formData.collateralTypeId = data.allowedCollateralTypes[0].id;
            // });

            scope.cancel = function () {
                location.path('/collaterals/');
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                resourceFactory.collateralResource.save(this.formData, function (data) {
                    location.path('/viewcollateral/' + data.resourceId);
                });
            };

        }
    });
    mifosX.ng.application.controller('CreateCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.CreateCollateralController]).run(function ($log) {
        $log.info("CreateCollateralController initialized");
    });
}(mifosX.controllers || {}));
