'use strict';

/**
 * @ngdoc function
 * @name projetApp.controller:CriminalCtrl
 * @description
 * # CriminalCtrl
 * Controller of the projetApp
 */
angular
  .module('projetApp')
  .controller('CriminalCtrl',['$scope','$routeParams','$http','$filter',function ($scope,$routeParams,$http,$filter) {
    $http.get('criminals/'+$routeParams.criminalID+'.json').success(function(data) {
      $scope.criminal=data;
    });
  }]);