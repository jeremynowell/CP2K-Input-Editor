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
     * @ngdoc overview
     * @name cp2kInputEditorApp
     * @description
     * Main module of the application.
     */
    angular
        .module('cp2kInputEditorApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'mgcrea.ngStrap'
        ])
        .run(routeChange);

    routeChange.$inject = ['$log', '$rootScope'];

    // Set the title of the current page.
    function routeChange($log, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function(event, current) {
            $rootScope.title = current.$$route.title;
            $log.debug('Title changed to: ' + $rootScope.title);
        });
    }
})();
