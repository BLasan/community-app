(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateClientCollateralController: function (scope, resourceFactory, routeParams, location) {

            scope.formData = {};
            scope.clientId = routeParams.id;
            scope.collateralData = {};
            scope.disable = true;
            scope.collateralDataRequestBody = {};
            scope.collateralId;

            scope.collateralProductChange = function (collateralId) {
                resourceFactory.loanResource.get({clientId: clientId, collateralId: collateralId}, function (data) {
                    scope.collateralData = data;
                    scope.collateralId = collateralId;
                    scope.formData.name = collateralData.name;
                    scope.formData.type = collateralData.quality;
                    scope.formData.basePrice = collateralData.basePrice;
                    scope.formData.pctToBase = collateralData.pctToBase;
                    scope.formData.unitType = collateralData.unitType;
                    scope.disabled = false;
                });

                // resourceFactory.loanResource.get({resourceType: 'template', templateType: 'collateral', productId: loanProductId, fields: 'id,loanCollateralOptions'}, function (data) {
                //     scope.collateralOptions = data.loanCollateralOptions || [];
                // });

            }

            resourceFactory.clientcollateralResource.getAllCollaterals(function (data) {
                scope.collaterals = data;
            });

            // resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function (data) {
            //     scope.collateralTypes = data.allowedCollateralTypes;
            //     scope.formData.collateralTypeId = data.allowedCollateralTypes[0].id;
            // });

            scope.cancel = function () {
                location.path('/viewclient/' + scope.clientId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                console.log(this.formData);
                scope.collateralDataRequestBody.collateralId = scope.collateralId;
                scope.collateralDataRequestBody.quantity = this.formData.quantity;
                scope.collateralDataRequestBody.locale = this.formData.locale;

                resourceFactory.clientcollateralResource.save({clientId: scope.clientId}, scope.collateralDataRequestBody, function (data) {
                    location.path('/clients/' + scope.clientId + '/viewclientcollateral/' + data.resourceId);
                });
            };

        }
    });
    mifosX.ng.application.controller('CreateClientCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.CreateClientCollateralController]).run(function ($log) {
        $log.info("CreateClientCollateralController initialized");
    });
}(mifosX.controllers || {}));
