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
     * @name cp2kInputEditorApp.directive:bsActiveLink
     * @description
     * Sets the active link in the navigation menu.
     */
    angular.module('cp2kInputEditorApp').directive('bsActiveLink', bsActiveLink);
    bsActiveLink.$inject = ['$location'];
    function bsActiveLink($location) {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, elem) {
                scope.$on('$routeChangeSuccess', function() {
                    var hrefs = ['/#' + $location.path(),
                                 '#' + $location.path(), //html5: false
                                 $location.path()]; //html5: true
                    angular.forEach(elem.find('a'), function (a) {
                        a = angular.element(a);
                        if (-1 !== hrefs.indexOf(a.attr('href'))) {
                            a.parent().addClass('active');
                        } else {
                            a.parent().removeClass('active');
                        }
                    });
                });
            }
        };
    }
})();
