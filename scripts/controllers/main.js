'use strict';

/**
 * @ngdoc function
 * @name projetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projetApp
 */
angular.module('projetApp')
  .controller('MainCtrl', function ($scope) {
	$('#mostSearchedCriminals').onload=function(){
		console.log("--TEST--")
	};
  });