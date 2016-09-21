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
     * @name cp2kInputEditorApp.controller:TreectrlCtrl
     * @description
     * Controller for interacting with the template tree.
     */
    angular.module('cp2kInputEditorApp').controller('TreeCtrl', TreeCtrl);

    TreeCtrl.$inject = ['$log', '$modal', '$scope',
                        'tempssDataService', 'treeAccessorService', 'versionDataService'];

    function TreeCtrl($log, $modal, $scope,
                       tempssDataService, treeAcessorService, versionDataService) {

        // Using controllerAs syntax
        var vm = this;

        // Control object for calling tree directive functions
        // Required as long as tree is controlled by jQuery plugin
        vm.treeAccessor = treeAcessorService;

        // Get current selected CP2K version
        vm.version = versionDataService.getSelectedVersion();

        // Template parameters
        vm.template = {
            valid: false,
            edited: false,
            loaded: false,
            loading: false,
            html: null
        };

        // Functions exposed to view
        vm.openGenerateInputFileModal = _openGenerateInputFileModal;
        vm.openClearProfileModal = _openClearProfileModal;
        vm.resetTree = _resetTree;
        vm.generateInputFile = _generateInputFile;

        // Track status
        vm.generatingInputFile = false;
        vm.generatedInputFile = false;

        // Modals
        var generateInputFileModal = $modal({scope: $scope, templateUrl: 'views/generateinputfilemodal.tpl.html', show: false});
        var clearProfileModal = $modal({scope: $scope, templateUrl: 'views/clearprofilemodal.tpl.html', show: false});

        // Load tree and initialise plugin
        _activate();


        // Private functions

        // Initialise tree
        function _activate() {
            // Load template tree HTML from server
            if (!vm.template.loading) {
                _loadTreeFromServer();
            }
        }

        // Open modal to generate CP2K input file
        function _openGenerateInputFileModal() {
            vm.generatingInputFile = false;
            vm.generatedInputFile = false;
            generateInputFileModal.$promise.then(generateInputFileModal.show);
        }

        // Open modal to clear tree
        function _openClearProfileModal() {
            clearProfileModal.$promise.then(clearProfileModal.show);
        }

        // Reset tree
        function _resetTree() {
            _loadTreeFromServer();
            clearProfileModal.hide();
        }

        // Load the HTML tree from the server
        function _loadTreeFromServer() {
            vm.template.loaded = false;
            vm.template.loading = true;
            vm.template.html = null;
            // Load template from server using tempss service.
            return tempssDataService.getTemplate(vm.version.templateId)
                .then(function(data) {
                    $log.debug('Got template');
                    vm.template.html = data;
                    vm.template.loaded = true;
                    // Broadcast event
                    $scope.$broadcast('template-loaded');
                });
        }

        // Generate input file from current state of tree
        function _generateInputFile() {
            vm.generatingInputFile = true;
            // Get XML using jQuery plugin
            var profileXml = vm.treeAccessor.getXmlString();
            $log.debug('Profile XML:');
            $log.debug(profileXml);

            // Process XML into CP2K input using TemPSS
            return tempssDataService.processProfile(vm.version.templateId, profileXml)
                .then(function(data) {
                    // TemPSS returns URL of transformed data
                    var inputFileUrl = data;
                    $log.debug('Location of transformed XML: ' + inputFileUrl);
                    var fileId = inputFileUrl.substring(inputFileUrl.lastIndexOf('_') +1, inputFileUrl.length - 4);
                    $log.debug('Using fileId <' + fileId + '>');
                    // Download profile from TemPSS
                    return tempssDataService.getTransformedProfile(fileId)
                        .then(function(data) {
                            vm.transformedProfile = data;
                            $scope.$broadcast('input-file-downloaded', data);
                            vm.generatedInputFile = true;
                            vm.generatingInputFile = false;
                    });
            });
        }
    }
})();
