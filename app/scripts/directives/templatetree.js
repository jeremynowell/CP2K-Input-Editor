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
     * @ngdoc directive
     * @name cp2kInputEditorApp.directive:templateTree
     * @description
     * Directive for interacting with libhpc parameter tree
     * jQuery plugin.
     */
    angular.module('cp2kInputEditorApp').directive('templateTree', templateTree);
    templateTree.$inject = ['$log'];
    function templateTree($log) {

        var treePluginName = 'plugin_LibhpcParameterTree';

        return {
            restrict: 'E',
            link: link,
            scope: {},
            controller: 'TreeCtrl',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'views/templatetree.tpl.html'
        };

        // I bind the Javascript events to the view-model.
        function link(scope, el) {
            // Track whether the plugin is applied.
            // (It is only applied once the tree is loaded from TemPSS)
            var treePluginElement = null;

            // Instantiate plugin when tree HTML has loaded from TemPSS,
            // notified via event on scope.
            scope.$on('template-loaded', _loadTemplate);

            // When scope is destroyed need to teardown plugin
            // to make sure memory is released.
            scope.$on('$destroy', _handleDestroy);

            // Accessor to allow controller to access methods on
            // jQuery plugin
            //if (scope.vm.treeAccessor) {
            //    $log.debug('Accessor exists');
            //}
            scope.vm.internalAccessor = scope.vm.treeAccessor || {};

            // Interface functions to jQuery plugin
            scope.vm.internalAccessor.expandTree = function() {
                treePluginElement.data(treePluginName).expandTree();
            };

            scope.vm.internalAccessor.collapseTree = function() {
                treePluginElement.data(treePluginName).collapseTree();
            };

            scope.vm.internalAccessor.showDisabledNodes = function() {
                treePluginElement.data(treePluginName).showDisabledBranches();
            };

            scope.vm.internalAccessor.hideDisabledNodes = function() {
                treePluginElement.data(treePluginName).hideDisabledBranches();
            };

            scope.vm.internalAccessor.getXmlString = function() {
                return treePluginElement.data(treePluginName).getXmlProfile();
            };

            scope.vm.internalAccessor.loadXmlProfile = function(profileXml) {
                return _loadXmlProfile(profileXml);
            };

            // PRIVATE METHODS

            // I clean up the directive when the scope is destroyed
            function _handleDestroy() {
                if (!treePluginElement) {
                    return;
                }

                _removeChangeHandlers();

                treePluginElement.data(treePluginName).destroy();
                treePluginElement = null;

                scope.vm.template.valid = false;
                scope.vm.template.edited = false;
            }

            // Add handlers to tree for events fired from jQuery
            function _addChangeHandlers() {
                // Event handlers for tree valid and invalid
                treePluginElement.find('ul[role="tree"]').on('nodeValid', function() {
                    $log.debug('Got nodeValid event');
                    scope.$apply(function() {
                        scope.vm.template.valid = true;
                    });
                });

                treePluginElement.find('ul[role="tree"]').on('nodeInvalid', function() {
                    $log.debug('Got nodeInValid event');
                    scope.$apply(function() {
                        scope.vm.template.valid = false;
                    });
                });

                // Event listener for tree edited
                treePluginElement.on('click', function() {
                    scope.$apply(function() {
                        scope.vm.template.edited = true;
                    });
                });
            }

            // Remove event handlers
            function _removeChangeHandlers() {
                treePluginElement.find('ul[role="tree"]').off('nodeValid');
                treePluginElement.find('ul[role="tree"]').off('nodeInvalid');
                treePluginElement.off('click');
            }

            // Load the specified XML profile into the tree
            function _loadXmlProfile(profileXml) {
                _removeChangeHandlers();
                treePluginElement.data(treePluginName).loadXmlProfile(profileXml);
                _addChangeHandlers();
            }

            // I add the tree HTML to the DOM and instantiate the
            // jQuery plugin when the HTML is loaded from TemPSS
            function _loadTemplate() {
                $log.debug('In loadTemplate');
                // NOTE: During the $destroy event, scope is detached from the
                // scope tree and the parent scope is nullified. This is why we
                // are checking for the absence of a parent scope to indicate
                // destruction of the directive.
                if (!scope.$parent) {
                    return;
                }
                // If plugin active then destroy
                if (treePluginElement) {
                    _handleDestroy();
                }

                // Populate element with HTML
                treePluginElement = angular.element(el.find('#template-container'));

                // HTML is stored in template variable on scope
                treePluginElement.html(scope.vm.template.html);

                // Instantiate plugin
                treePluginElement.LibhpcParameterTree();

                // Add change handlers
                _addChangeHandlers();
            }
        }
    }
})();
