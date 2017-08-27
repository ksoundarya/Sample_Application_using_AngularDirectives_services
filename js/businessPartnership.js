//Business Partnership type form directive

(function () {
    'use strict';

    angular.module('cccCustomerInput')

        .directive('businessPartnership', ['$rootScope', '$window', function ($rootScope, $window) {
            return {
                restrict: 'E',
                templateUrl: function (ele, attr) {
                    return attr.templateName ? attr.templateName : '/templates/businesspartnership.html';
                },
                scope: true,
                link: function (scope) {

                    scope.data.businessCreditInfo.identityType = !scope.data.businessCreditInfo.identityType ? 'SSN' : scope.data.businessCreditInfo.identityType;
                    if(scope.data.businessCreditInfo.identityType === 'fedtaxid') {
                        scope.data.businessCreditInfo.identityType = 'SSN';
                    }
                    // Do we have the preloaded data
                    if(scope.defaultbusinessCreditInfo) {
                        scope.data.businessCreditInfo.identityNumber = scope.defaultbusinessCreditInfo.identityNumber;
                        scope.data.businessCreditInfo.firstName = scope.defaultbusinessCreditInfo.firstName;
                        scope.data.businessCreditInfo.lastName = scope.defaultbusinessCreditInfo.lastName;
                        scope.data.businessCreditInfo.phoneNumber = scope.defaultbusinessCreditInfo.phoneNumber;
                        scope.data.businessCreditInfo.dob = scope.defaultbusinessCreditInfo.dob;
                        scope.data.businessCreditInfo.email = scope.defaultbusinessCreditInfo.email;
                        scope.data.businessCreditInfo.drivingLicenseState = scope.defaultbusinessCreditInfo.drivingLicenseState;
                        scope.data.businessCreditInfo.drivingLicenseExpiry = scope.defaultbusinessCreditInfo.drivingLicenseExpiry;
                        scope.defaultbusinessCreditInfo = {};

                    } else {
                         //default values
                        scope.data.businessCreditInfo.identityNumber = '';
                        scope.data.businessCreditInfo.firstName = '';
                        scope.data.businessCreditInfo.lastName = '';
                        scope.data.businessCreditInfo.phoneNumber = '';
                        scope.data.businessCreditInfo.dob = '';
                        scope.data.businessCreditInfo.email = '';
                        scope.data.businessCreditInfo.drivingLicenseState = '';
                        scope.data.businessCreditInfo.drivingLicenseExpiry = '';
                    }
                    scope.addSlashDate = function (elementId) {
                        var elementData = $window.document.getElementById(elementId);
                        elementData.addEventListener('keyup', function (event) {
                            var char = String.fromCharCode(event.which);
                            if (char !== 10 && event.which !== 8) {
                                var numChars = elementData.value.length;
                                if (numChars === 2 || numChars === 5) {
                                    var thisVal = elementData.value;
                                    thisVal += '/';
                                    elementData.value = thisVal;
                                }
                            }
                        });
                    };
                }
            };
        }]);
})();