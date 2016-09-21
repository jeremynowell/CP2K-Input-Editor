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
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name cp2kInputEditorApp.profile
     * @description
     * Service to interact with TemPSS to get saved profiles for the given
     * CP2K version.
     */
    angular.module('cp2kInputEditorApp').factory('profileFactory', profileFactory);
    profileFactory.$inject = ['$resource'];
    function profileFactory($resource) {

        // Perform a GET on TemPSS to get the list of profiles for this templateId
        return $resource('/tempss-service/api/profile/:templateId', {templateId: '@templateId', profileId: '@profileId'}, {
            list: {method: 'GET', url: '/tempss-service/api/profile/:templateId/names', isArray: false},
            get: {method: 'GET', url: '/tempss-service/api/profile/:templateId/:profileId'}
        });
    }
})();
