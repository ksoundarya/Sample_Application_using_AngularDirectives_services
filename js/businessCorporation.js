//Business Corporation type form directive


(function () {
    'use strict';

    angular.module('cccCustomerInput')

        .directive('businessCorporation', [function () {
            return {
                restrict: 'E',
                templateUrl: function (ele, attr) {
                    return attr.templateName ? attr.templateName : '/templates/businesscorporation.html';
                },
                scope: true,
                link: function (scope) {
                    scope.data.businessCreditInfo.identityType = !scope.data.businessCreditInfo.identityType ? 'fedtaxid' : scope.data.businessCreditInfo.identityType;
                    if(scope.data.businessCreditInfo.identityType === 'SSN') {
                        scope.data.businessCreditInfo.identityType = 'fedtaxid';
                    }
                    // Do we have the preloaded data
                    if(scope.defaultbusinessCreditInfo) {
                        scope.data.businessCreditInfo.identityNumber = scope.defaultbusinessCreditInfo.identityNumber;
                        scope.data.businessCreditInfo.firstName = scope.defaultbusinessCreditInfo.firstName;
                        scope.data.businessCreditInfo.lastName = scope.defaultbusinessCreditInfo.lastName;
                        scope.data.businessCreditInfo.phoneNumber = scope.defaultbusinessCreditInfo.phoneNumber;
                        scope.data.businessCreditInfo.email = scope.defaultbusinessCreditInfo.email;
                        scope.defaultbusinessCreditInfo = {};
                    } else {
                         //default values
                        scope.data.businessCreditInfo.identityNumber = '';
                        scope.data.businessCreditInfo.firstName = '';
                        scope.data.businessCreditInfo.lastName = '';
                        scope.data.businessCreditInfo.phoneNumber = '';
                        scope.data.businessCreditInfo.email = '';
                    }
                }
            };
        }]);
})();