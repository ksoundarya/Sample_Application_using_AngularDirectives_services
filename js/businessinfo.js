/*
 Business Information Home page Directive 
 */
(function () {
    'use strict';

    angular.module('cccCustomerInput')
        .directive('businessInfo', ['businessContentService', 'addressDetailsCacheService', 'cccCommonConstants', 'cccCustomerInputConstant', 'cccCartMetaDataService', 'cccCheckoutNavigationService', 'customerInputService', 'cccHelperService', '$location', '$anchorScroll', '$timeout', '$modal', '$rootScope', function (businessContentService, addressDetailsCacheService, cccCommonConstants, cccCustomerInputConstant, cccCartMetaDataService, cccCheckoutNavigationService, customerInputService, cccHelperService, $location, $anchorScroll, $timeout, $modal, $rootScope) {
            return {
                restrict: 'E',
                templateUrl: function (ele, attr) {
                    return attr.templateName ? attr.templateName : '/templates/businessinfo.html';
                },
                link: function (scope) {
                    //Initilizing the data variables
                    scope.data = {
                        'businessCreditInfo': {'businessEntity': ''},
                        'address': {'businessAddress': {'state': ''}},
                        'isMultipleMatchModal': true,
                        'verifyCTADisable': false
                    };
                    scope.orgServiceAddress = {};
                    //Getting the business types from constants to display in the dropdown
                    scope.business_types = cccCustomerInputConstant.businessEntityTypes;
                    scope.states = cccCommonConstants.cccCustomstateMap;
                    scope.showDOB = false;
                    scope.showDBA = false;
                    scope.defaultbusinessCreditInfo = {};
                    scope.cart_has_bus_soln_alone_product = false;
                    var reportingAdditionalData = {}, statusCodes = [], statusMessages = [];
                    /* scope.verfifyAddressRequest = {
                     businessAddress : {addressType :''}
                     };*/

                    //Getting the cart data from metadata service
                    cccCartMetaDataService.cccCheckoutMetadata().then(function (response) {
                        if (response && response.payload && response.payload.wireline && response.payload.wireline.subFlowType) {
                            // If Business solution products alone is present in cart then need to hide the SSN fields
                            if(response.payload.wireline.subFlowType.toUpperCase() === 'NEW_APPS') {
                                scope.cart_has_bus_soln_alone_product = true;
                            }
                        }
                    });

                    //Service call to get the business customer details
                    customerInputService.getCustomerDetailsPromise({'type': 'businessCreditInfo,businessInfo,address'}).then(function (response) {
                        if(response && response.payload) {
                            if(cccHelperService.isDefined(response, 'payload.address')) {
                                // Do we have businessAddress then we need to get that
                                if(response.payload.address.businessAddress && response.payload.address.businessAddress.source === '') {
                                    scope.data.address.businessAddress = response.payload.address.businessAddress;
                                    scope.data.address.businessAddress.useSameAddress = false;
                                } else if(response.payload.address.serviceAddress) {
                                // Do we have serviceAddress then we need to get that
                                    scope.data.address.businessAddress = response.payload.address.serviceAddress;
                                    scope.orgServiceAddress = response.payload.address.serviceAddress;
                                    scope.data.address.businessAddress.useSameAddress = true;
                                }
                            }
                            scope.data.businessInfo = response.payload.businessInfo;
                            if(response.payload.businessCreditInfo) {
                                scope.data.businessCreditInfo = response.payload.businessCreditInfo;
                                scope.data.businessCreditInfo.identityNumber = response.payload.businessCreditInfo.maskedIdentityNumber;
                                scope.defaultbusinessCreditInfo = response.payload.businessCreditInfo;
                            }
                        }
                    });
                    // For toggling the service address into the address fields
                    scope.chkUseSameAddress = function () {
                        if(scope.orgServiceAddress.useSameAddress) {
                        //Copy the service address into the address fields
                            scope.data.address.businessAddress = angular.copy(scope.orgServiceAddress);
                        }else {
                            var prevState = scope.data.address.businessAddress.state;
                            scope.data.address.businessAddress = {};
                            scope.data.address.businessAddress.state = prevState;
                        }
                        scope.orgServiceAddress.useSameAddress = !scope.orgServiceAddress.useSameAddress;
                    };

                    //Scroll to function to redirect view
                    scope.scrollTo = function (businessType) {
                        $timeout(function () {
                            $anchorScroll('business_entity_switch');
                        }, 100);
                        scope.data.businessCreditInfo.firstName = null;
                        scope.data.businessCreditInfo.lastName = null;
                        scope.data.businessCreditInfo.phoneNumber = null;
                        scope.data.businessCreditInfo.email = null;
                        scope.data.businessCreditInfo.identityNumber = null;
                        if(businessType === 'Corporation' || businessType === 'LLC') {
                            scope.data.businessCreditInfo.identityType = null;
                        }else{
                            scope.data.identityType.dob = null;
                            scope.data.drivingLicenseExpiry = null;
                        }

                    };
                    //Scroll to function to redirect view
                    scope.scrollToSaveModal = function () {
                        $anchorScroll('save_modal');
                    };
                    // Form submit and save the data
                    scope.submitForm = function () {
                        if(!scope.businessInfo.$valid) {
                            return false;
                        }
                        //Delete the unwanted values
                        if(scope.data.businessCreditInfo.identityType !== 'DL') {
                            //Deleting the drivingLicenseState, drivingLicenseExpiry
                            delete scope.data.businessCreditInfo.drivingLicenseState;
                            delete scope.data.businessCreditInfo.drivingLicenseExpiry;
                        }
                        scope.orgServiceAddress.useSameAddress = scope.data.address.businessAddress.useSameAddress;
                        if(scope.data.address.businessAddress.useSameAddress) {
                            scope.data.address = {'businessAddress': {'source': 'service'}};
                        } else {
                            scope.data.address.businessAddress.addressType = 'businessAddress';
                        }
                    //Return scope.states without 'PR' and 'VI' states for business page
                    scope.filterStates = function (state) {
                        if (state.id !== 'PR' && state.id !== 'VI') {
                            return state;
                        }
                    };


                    scope.states = scope.states.filter(scope.filterStates);
                }
            };
        }]);
})();
