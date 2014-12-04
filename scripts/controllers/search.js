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
    $http.get('criminals/criminals.json').success(function(data) {
      $scope.itemsPerPage = 8;      
      $scope.currentPage = 0;
      $scope.numberPageNeeded=[];
      $scope.criminalsBackUp = data;
      $scope.criminals = $scope.criminalsBackUp.slice(8*$scope.currentPage,8*($scope.currentPage+1));
      $scope.getPageNeeded();
      $scope.savedata=function(criminal){
        $scope.criminals.push(angular.copy(criminal));
        $('#criminalModal').modal('hide');
      };
      $scope.accuracyBarValue='0%';
      $(document).ready(function(){
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
        var numberElementSearch=0;
        for (var key in Object.keys($scope.search)) {
          var valTmp=$scope.search[Object.keys($scope.search)[key]];
          if(valTmp!='' && valTmp!=null) numberElementSearch++;
        };
        $scope.accuracyBarValue=numberElementSearch/3*100+"%";
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

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
          $scope.getPageNeeded();
      }
    };
    
    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.numberPageNeeded.length - 1) {
          $scope.currentPage++;
          $scope.getPageNeeded();
      }
    };
    $scope.setPage = function () {
        $scope.currentPage = this.n;
        $scope.getPageNeeded();
    };

    $scope.getPageNeeded = function(){
      $scope.numberPageNeeded=[];
      for (var i = 0; i < Math.ceil($scope.criminalsBackUp.length/$scope.itemsPerPage); i++) {
        $scope.numberPageNeeded.push(i);
      };
      $scope.setThumbnails();
    };

    $scope.setThumbnails=function(){
      $scope.criminals = $scope.criminalsBackUp.slice(8*$scope.currentPage,8*($scope.currentPage+1));
    }

  }]);

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}