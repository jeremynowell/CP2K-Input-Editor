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
     * @name cp2kInputEditorApp.directive:inputFileDownload
     * @description
     * Makes downloadaed data available for saving to file.
     * Shows download button with link to data file once
     * input-file-downloaded event is received.
     */
    angular.module('cp2kInputEditorApp').directive('inputFileDownload', inputFileDownload);
    inputFileDownload.$inject = ['$log', '$sce', '$window'];
    function inputFileDownload($log, $sce, $window) {
        return {
            restrict: 'E',
            link: link,
            replace: true,
            template: [
                '<a class="btn btn-success" ng-href="{{ fileUrl }}" ng-show="vm.generatedInputFile">',
                '    <i class="fa fa-download fa-lg" aria-hidden="true"></i>',
                '    &nbsp;Download input file',
                '</a>'
            ].join('\n'),
        };

        function link(scope, element, attrs) {
            scope.$on('input-file-downloaded', function(event, data) {
                $log.debug('Got input-file-downloaded event');
                // Make data available using Data URI scheme
                // Not supported in IE and Edge
                // attrs.$set('href', 'data:text/plain;charset=utf-8,' + data);
                $log.debug(data);
                var blob = new Blob([data], {type: 'text/plain'});
                var url = $window.URL || $window.webkitURL;
                scope.fileUrl = url.createObjectURL(blob);
                // Hardcode filename using HTML5 download attribute
                attrs.$set('download', 'cp2k.inp');
            });
        }
    }
})();
