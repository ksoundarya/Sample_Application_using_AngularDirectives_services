/**
 * 
 */
(function () {
    'use strict';

    requirejs.config({
        paths: {
            'businessContentService': 'modules/cccCustomerInput/services/businessContentService'
        },
        shim: {
            'businessContentService': {
                deps: [
                    'modules/cccCustomerInput/module',
                    'modules/cccCustomerInput/templates'
                ]
            }
        }
    });

    define(['businessContentService'], function () {
        describe('businessContentService service of cccCustomerInput', function () {
            var businessContentService, $httpBackend, userProfileService;

            beforeEach(module('cccCustomerInput'));

            beforeEach(function () {

                module(function ($provide) {
                    userProfileService = jasmine.createSpyObj('userProfileService', ['getUUID']);
                    $provide.value('userProfileService', userProfileService);
                });

                inject(function ($injector) {
                    $httpBackend = $injector.get('$httpBackend');
                    businessContentService = $injector.get('businessContentService');
                });
                userProfileService.getUUID.and.returnValue('59629b3b-6990-0064-6ff7-da42f7a4c67f');
            });

            it('should get service address section details from api', function () {
                $httpBackend.whenGET(Endpoint_businessinformation.get_service_address.url_match).respond(200, Endpoint_businessinformation.get_service_address.data);
                businessContentService.getBusinessInfoDetails().then(function (res) {
                    expect(res).toEqual(Endpoint_businessinformation.get_service_address.data);
                });
                $httpBackend.flush();
            });

            it('Should submit/send business details to save, and return success or errors', function () {
                $httpBackend.whenPOST(Endpoint_businessinformation.store_address_details.url_match).respond(200, Endpoint_businessinformation.store_address_details.data);
                businessContentService.submitBusinessInfoDetails(Endpoint_businessinformation.store_address_details.data_sent).then(function (result) {
                    expect(result).not.toBeNull();
                });
                $httpBackend.flush();
            });
        });
    });
})();