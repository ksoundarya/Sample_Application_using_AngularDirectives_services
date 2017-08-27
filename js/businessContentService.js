/**
 * 
 */
(function () {
    'use strict';

    angular.module('cccCustomerInput')
        .factory('businessContentService', ['$http', 'cccCustomerInputConstant', 'userProfileService',
            function ($http, cccCustomerInputConstant, userProfileService) {
                var services = {};
                // To get the BusinessInfo address
                services.getBusinessInfoDetails = function () {
                    return $http.get(cccCustomerInputConstant.rootCheckoutAPI + userProfileService.getUUID(), {params: {type: 'businessCreditInfo,businessInfo,address'}}).then(function (response) {
                        return response.data;
                    });
                };
                // To hit the data/ save the data
                services.submitBusinessInfoDetails = function (data) {
                    return $http.post(cccCustomerInputConstant.rootCheckoutAPI + userProfileService.getUUID(), data, {params: {type: 'address,businessInfo,businessCreditInfo'}}).then(function (response) {
                        return response.data;
                    });
                };
                return services;
            }]);
})();