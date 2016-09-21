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
    * @name cp2kInputEditorApp.cp2kInputTransformerService
    * @description
    * Angular Service for interacting with CP2KInputTransformer service
    * to transform CP2K text file to libhpc XML representation.
    */
    angular.module('cp2kInputEditorApp').service('cp2kInputTransformerService', cp2kInputTransformerService);

    cp2kInputTransformerService.$inject = ['$http', '$log'];
    function cp2kInputTransformerService($http, $log) {
        return {
            transformInputFile: _transformInputFile
        };

        // Private functions

        // Transform given inputFile, using version of service
        // specified by templateId.
        function _transformInputFile(templateId, inputFile){
            $log.debug('Transforming Input File: ' + inputFile.name);
            // Service takes a multipart/form-data request, which can
            // be created using FormData()
            var fd = new FormData();
            fd.append('inputFile', inputFile);
            return $http.post('/CP2KInputTransformer/api/' + templateId + '/transform/',
                              fd,
                              {
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                              })
                .then(transformInputFileComplete)
                .catch(transformInputFileFailed);

            function transformInputFileComplete(response) {
                    $log.debug('Transformed input file OK');
                    //$log.debug(response.data);
                    return response.data;
            }

            function transformInputFileFailed(error) {
                // TODO: display this error
                $log.error('XHR Failed for _transformInputFile: ' + error.data);
            }
        }
    }
})();
