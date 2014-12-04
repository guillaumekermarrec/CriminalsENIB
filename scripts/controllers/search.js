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
      $scope.accuracyBarValue='0%';
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
        // Rechercher dans la BDD avec ces informations
        console.log("Récupération des information du formulaire nom: "+$scope.search.name+" Taille: "+$scope.search.size);
        var numberElementSearch=0;
        for (var key in Object.keys($scope.search)) {
          var valTmp=$scope.search[Object.keys($scope.search)[key]];
          if(valTmp!='' && valTmp!=null) numberElementSearch++;
        };
        $scope.accuracyBarValue=numberElementSearch/3*100+"%";
        console.log("$scope.accuracyBarValue-> "+$scope.accuracyBarValue);
      });
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

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}