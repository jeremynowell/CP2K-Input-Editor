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
     * @name cp2kInputEditorApp.versionDataService
     * @description
     * Service which stores the possible and currently selected CP2K version.
     */
    angular.module('cp2kInputEditorApp').service('versionDataService', versionDataService);
    function versionDataService() {
        // AngularJS will instantiate a singleton by calling "new" on this function

        // List of known CP2K versions
        // TODO: Get this from TempSS?
        var _versions = [
            {label: '2.5', templateId: 'cp2k-2.5'},
            {label: '2.6', templateId: 'cp2k-2.6'},
            {label: '2.7', templateId: 'cp2k-2.7'},
            {label: '3.0', templateId: 'cp2k-3.0'},
            {label: '4.0', templateId: 'cp2k-4.0'}
        ];

        // Set the default selected version - version 3.0
        var _selectedVersion = _versions[3];

        return {
            // Get the list of known versions
            getVersions: function() {
                return _versions;
            },
            // Get the current selected version
            getSelectedVersion: function() {
                return _selectedVersion;
            },
            // Set the selected version
            setSelectedVersion: function(version) {
                _selectedVersion = version;
            }
        };
    }
})();
