'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 3);

app.config(function($routeProvider) {

    var routePermissions = {
        'isLogged': function(authenticationService, notificationService, $location) {
            if (authenticationService.isLogged() == true) {
                return true;
            } else {
                notificationService.showInfo('You should be logged in to view this page.');
                $location.path('/');
            }
        }
    }

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/home', {
        templateUrl: 'templates/main.html',
        controller: 'MainController',
        resolve: routePermissions
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user/ads.html',
        controller: 'UserController',
        resolve: routePermissions
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

});