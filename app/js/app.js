'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 3);

app.config(function($routeProvider) {

    var routePermissions = {
        'isLogged': function(authService, notifyService, $location) {
            if (authService.isLoggedIn() == true) {
                return true;
            } else {
                notifyService.showInfo('You should be logged in to view this page.');
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
        controller: 'UserAdsController',
        resolve: routePermissions
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/publish-ad.html',
        controller: 'PublishAdController',
        resolve: routePermissions
    });

    $routeProvider.when('/user/delete/:id', {
        templateUrl: 'templates/user/delete-ad.html',
        controller: 'DeleteAdController'
    });

    $routeProvider.when('/user/edit/:id', {
        templateUrl: 'templates/user/edit-ad.html',
        controller: 'EditAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user-profile.html',
        controller: 'UserProfileController',
        resolve: routePermissions
    });


    $routeProvider.otherwise({
        redirectTo: '/'
    });

});