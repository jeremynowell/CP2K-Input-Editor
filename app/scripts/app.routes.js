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
     * Application routes.
     * Connect controllers and views and set view title.
     */
    angular.module('cp2kInputEditorApp').config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'Home',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                title : 'About',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            })
            .when('/edit', {
                title : 'Edit Input',
                templateUrl: 'views/edit.html',
                controller: 'EditCtrl',
                controllerAs: 'vm'
            })
            .when('/help', {
                title : 'Help',
                templateUrl: 'views/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
