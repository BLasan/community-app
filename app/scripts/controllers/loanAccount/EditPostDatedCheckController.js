(function (module) {
    mifosX.controllers = _.extend(module, {
        EditPostDatedCheckController: function (scope, routeParams, resourceFactory,paginatorService, location, route, http, $uibModal, dateFilter, API_VERSION, $sce, $rootScope) {
            scope.formData = {};
            scope.date.payDate = new Date();
            scope.loanId = routeParams.loanId;
            scope.id = routeParams.id;
            scope.postDatedCheck = {};

            resourceFactory.postDatedChecks.get({loanId: scope.loanId, id: scope.id}, function(data) {
                scope.postDatedCheck = data;
                scope.formData = {
                    name: data.name,
                    accountNo: data.accountNo,
                    amount: data.amount,
                    installment: data.installment,
                    date: data.date
                }
            });
        }
    });
    mifosX.ng.application.controller('EditPostDatedCheckController', ['$scope', '$routeParams', 'ResourceFactory','PaginatorService', '$location', '$route', '$http', '$uibModal', 'dateFilter', 'API_VERSION', '$sce', '$rootScope', mifosX.controllers.EditPostDatedCheckController]).run(function ($log) {
        $log.info("EditPostDatedCheckController initialized");
    });
}(mifosX.controllers || {}));
