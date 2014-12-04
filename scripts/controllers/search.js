'use strict';

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
    $scope.searchingData = {};
    $scope.savedata=function(criminal){
      console.log(criminal);
    	$scope.criminals.push(angular.copy(criminal));
      $('#criminalModal').modal('hide');
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
      $scope.$watchCollection('search', function() {
        console.log("Data Changed");
      });
      $scope.updateValueForm=function(){
        // Rechercher dans la BDD avec ces informations
        console.log("Récupération des information du formulaire nom: "+$scope.dataSearched_Name+" Taille: "+$scope.dataSearched_Size);
      }
      console.log("data to search -> "+$scope.dataSearched_Name)
    });
    $('#criminalModal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
    });
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
        $(".sidebar-wrapper").toggleClass("toggled");
        $(".page-content-wrapper").toggleClass("toggled");
    });
  }]);