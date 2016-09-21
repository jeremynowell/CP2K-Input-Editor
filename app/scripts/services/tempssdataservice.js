/**
 * @license
 * Copyright (c) 2016 The University of Edinburgh.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name cp2kInputEditorApp.tempssDataService
     * @description
     * Service to interact with TemPSS.
     */

    angular.module('cp2kInputEditorApp').service('tempssDataService', tempssDataService);

    tempssDataService.$inject = ['$http', '$log'];

    function tempssDataService($http, $log) {
        return {
            getTemplate: _getTemplate,
            processProfile: _processProfile,
            getTransformedProfile: _getTransformedProfile
        };

        // Private functions

        // Get a template for the selected version of CP2K
        function _getTemplate(templateId) {
            $log.debug('Getting template for ID: ' + templateId);
            return $http.get('/tempss-service/api/template/id/' + templateId)
                .then(getTemplateComplete)
                .catch(getTemplateFailed);

            function getTemplateComplete(response) {
                $log.debug('Got template OK');
                return response.data;
            }

            function getTemplateFailed(error) {
                // TODO: display error
                $log.error('XHR Failed for _getTemplate: ' + error.data);
            }
        }

        // Process an XML file into CP2K text file
        function _processProfile(templateId, profileXml) {
            $log.debug('Processing profile for ID: ' + templateId);
            var fd = new FormData();
            fd.append('xmlupload', profileXml);
            return $http.post('/tempss-service/api/profile/' + templateId + '/convert',
                              fd,
                              {
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                              })
                .then(processProfileComplete)
                .catch(processProfileFailed);

            function processProfileComplete(response) {
                    $log.debug('Processed profile OK');
                    return response.data.TransformedXml;
            }

            function processProfileFailed(error) {
                $log.error('XHR Failed for _processProfile: ' + error.data);
            }
        }

        // Download CP2K input file
        function _getTransformedProfile(fileId) {
            $log.debug('Getting transformed profile for file ID: ' + fileId);
            return $http.get('/tempss-service/api/profile/inputFile/' + fileId)
                .then(getTransformedProfileComplete)
                .catch(getTransformedProfileFailed);

            function getTransformedProfileComplete(response) {
                $log.debug('Got template OK');
                return response.data;
            }

            function getTransformedProfileFailed(error) {
                $log.error('XHR Failed for _getTransformedProfile: ' + error.data);
            }
        }
    }
})();
