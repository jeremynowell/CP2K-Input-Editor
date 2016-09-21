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
     * @name cp2kInputEditorApp.treeAccessor
     * @description
     * Service to interface with tree functions in templateTree directive
     * from controllers.
     */
    angular.module('cp2kInputEditorApp').service('treeAccessorService', treeAccessorService);

    function treeAccessorService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var treeAccessor = {};
        return treeAccessor;
    }
})();
