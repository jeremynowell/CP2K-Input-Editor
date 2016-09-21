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
     * @ngdoc function
     * @name cp2kInputEditorApp.controller:EditCtrl
     * @description
     * # EditCtrl
     * Controller of the cp2kInputEditorApp
     */
    angular.module('cp2kInputEditorApp').controller('EditCtrl', EditCtrl);
    EditCtrl.$inject = ['$log', '$modal', '$scope', 'cp2kInputTransformerService',
                        'profileFactory', 'treeAccessorService', 'versionDataService'];
    function EditCtrl($log, $modal, $scope, cp2kInputTransformerService,
                       profileFactory, treeAccessorService, versionDataService) {

        // Using controllerAs syntax
        var vm = this;

        // Get selected version
        vm.version = versionDataService.getSelectedVersion();

        // Tree template variables
        vm.template = {
            valid: false,
            edited: false,
            loaded: false,
            loading: false,
            html: null
        };

        // Control object for calling tree directive functions
        // Required as long as tree is controlled by jQuery plugin
        vm.treeAccessor = treeAccessorService;

        // Load profiles from server using profile service.
        vm.profiles = profileFactory.list({templateId: vm.version.templateId}, function (data) {
            data.loaded = true;
        });

        // Controller functions exposed to view
        vm.openLoadInputFileModal = _openLoadInputFileModal;
        vm.uploadInputFile = _uploadInputFile;
        vm.loadProfile = _loadProfile;
        vm.openLoadProfileModal = _openLoadProfileModal;

        // Modals
        var loadInputFileModal = $modal({scope: $scope, templateUrl: 'views/uploadinputfilemodal.tpl.html', show: false});
        var loadProfileModal = $modal({scope: $scope, templateUrl: 'views/loadprofilemodal.tpl.html', show: false});

        // Internal controller functions

        // Modal to load an input file from local machine
        function _openLoadInputFileModal() {
            loadInputFileModal.$promise.then(loadInputFileModal.show);
        }

        // Modal to load a saved profile
        function _openLoadProfileModal(profile) {
            vm.profile = profile;
            loadProfileModal.$promise.then(loadProfileModal.show);
        }

        // Upload an input file from local machine
        function _uploadInputFile() {
            // Transform file to XML
            return cp2kInputTransformerService.transformInputFile(vm.version.templateId, vm.cp2kInputFile)
                .then(function(data) {
                    $log.debug('Got transformed input file');
                    // Load XML into tree using jQuery tree plugin
                    vm.treeAccessor.loadXmlProfile(data);
                    // Close modal
                    loadInputFileModal.hide();
                });
        }

        // Load a saved profile
        function _loadProfile(profile) {
            // Get the profile from the server
            profileFactory.get({templateId: vm.version.templateId, profileId: profile}, function(data) {
                $log.debug('Got profile from server');
                var profileXml = data.profile;
                //$log.debug(profileXml);
                // Load XML into tree using jQuery tree plugin
                vm.treeAccessor.loadXmlProfile(profileXml);
                // Close modal
                loadProfileModal.hide();
            });
        }

    }
})();
