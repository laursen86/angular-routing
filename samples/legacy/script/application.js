﻿angular
    .module('sample', ['ui.routing', 'ui.routing.legacy'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: "tpl/home.html",
                    controller: function ($rootScope) {
                        $rootScope.page = "home";
                    }
                })
                .when('/code', {
                    templateUrl: "tpl/code.html",
                    controller: function ($rootScope) {
                        $rootScope.page = "code";
                    }
                })
                .when('/about', {
                    templateUrl: "tpl/about.html",
                    controller: function ($rootScope) {
                        $rootScope.page = "about";
                    }
                })
                .otherwise({redirectTo: '/'});
        }]);

function PageController($scope, $route) {

}