﻿var app = angular.module('sample', ['ui.routing']);
app.config(['$stateProvider', '$routeProvider',
       function ($stateProvider, $routeProvider) {
           $routeProvider
               .otherwise({ redirectTo: '/' });

           $stateProvider
               .state('home', {
                   route: '/',
                   views: {
                       'main': {
                           template: 'tpl/home.html',
                           controller: function($rootScope) { $rootScope.page = "home"; }
                       },
                       'hint': { template: { html: '@home' } }
                   }
               })
               .state('code', {
                   route: '/code',
                   views: {
                       'main': {
                           template: 'tpl/code.html',
                           controller: function($rootScope) { $rootScope.page = "code"; }
                       },
                       'hint': { template: { html: '@one' } }
                   }
               })
               .state('about', {
                   route: '/about',
                   views: {
                       'main': {
                           template: 'tpl/about.html',
                           controller: function($rootScope) { $rootScope.page = "about"; }
                       },
                       'hint': { template: { html: '@two' } }
                   }
               })
               .transition('*', 'home', function ($rootScope) { $rootScope.transition = "root -> home"; })
               .transition('*', 'code', function ($rootScope) { $rootScope.transition = "root -> code"; })
               .transition('*', 'about', function ($rootScope) { $rootScope.transition = "root -> about"; })

               .transition('home', 'code', function ($rootScope) { $rootScope.transition = "home -> code"; })
               .transition('home', 'about', function($rootScope) { $rootScope.transition = "home -> about"; })
               .transition('code', 'home', function($rootScope) { $rootScope.transition = "code -> home"; })
               .transition('code', 'about', function($rootScope) { $rootScope.transition = "code -> about"; })
               .transition('about', 'home', function($rootScope) { $rootScope.transition = "about -> home"; })
               .transition('about', 'code', function($rootScope) { $rootScope.transition = "about -> code"; });
       }]);

function clean(state) {
    var newState = {};

    newState.self = state.self;
    newState.fullname = state.fullname;
    newState.children = {};
    if (state.route)
        newState.route = state.route;

    angular.forEach(state.children, function(child, name) {
        newState.children[name] = clean(child);
    });
    return newState;
}

function PageController($scope, $route, $state, $transition) {
    $scope.routes = JSON.stringify($route.routes, null, 2);
    $scope.states = JSON.stringify(clean($state.root), null, 2);
    $scope.transitions = JSON.stringify($transition.root, null, 2);
}