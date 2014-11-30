'use strict';

//var fs = require('fs');

/**
 * @ngdoc function
 * @name projetApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the projetApp
 */
angular
  .module('projetApp')
  .controller('SearchCtrl',['$scope','$http',function ($scope, $http) {
    $scope.savedata=function(criminal){
    	$scope.criminals.push(angular.copy(criminal));
      $('#criminalModal').modal('hide');
      //Necessite une sauvegarde du fichier json
    };
    $http.get('criminals/criminals.json').success(function(data) {
      $scope.criminals = data;  

      $(document).ready(function(){
        console.log("Nombre d'élements-> "+$scope.criminals.length+" -- "+$scope.criminals[1].data)
        $(document.body).on('click','.smallPicture',function(){
              $scope.criminalSelected=$scope.criminals[$(".smallPicture").index(this)];
              $('#criminalLightDetail').modal();
              $('#criminalLightDetail').on('shown.bs.modal', function(){
                var dataToDisplay=
                '<h2>'+$scope.criminalSelected.firstname+' '+$scope.criminalSelected.lastname+'</h2>'+
                '<p>'+$scope.criminalSelected.offense+'</p>'+
                '<a href="#/search/'+$scope.criminalSelected.id+'">Plus d\'information</a>';
                $('#criminalLightDetail .modal-body').html(dataToDisplay);
              });
              $('#criminalLightDetail').on('hidden.bs.modal', function(){
                  $scope.indexValue=-1;
              });
         });
      });    
      // fs.appendFile('criminals/test.json', data, function (err) {
      //   if (err) throw err;
      //   console.log('The "data to append" was appended to file!');
      // });
    });
    $('#criminalModal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
    });
    $("#menu-toggle").click(function(e) {
      console.log("element pressed")
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
        $(".sidebar-wrapper").toggleClass("toggled");
        $(".page-content-wrapper").toggleClass("toggled");
    });

  }]);

