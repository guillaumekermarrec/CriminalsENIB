'use strict';

/**
 * @ngdoc overview
 * @name projetApp
 * @description
 * # projetApp
 *
 * Main module of the application.
 */
angular
  .module('projetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/search/:criminalID', {
        templateUrl: 'views/criminal.html',
        controller: 'CriminalCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

$(".nav.nav-pills li").on("click",function(){
  $(".nav.nav-pills li").removeClass("active");
  $(this).addClass("active");
});