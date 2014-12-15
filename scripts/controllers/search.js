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
  .controller('SearchCtrl',['$scope','$http',function ($scope, $http){
    $scope.searchingData = {};
    $scope.criminals;
    $scope.criminalSelected;
    // Lorsque le chargement de la base de données a été chargée correctement
    //$http.get('criminals/criminals.json').success(function(data) {
    $http.get('/search').success(function(data, status, headers, config) {
      //------------------------------------------------------------
      //------------------------ Variables -------------------------
      //------------------------------------------------------------
      $scope.search = new Object();
      // Parametres utilisés par la pagination
      $scope.itemsPerPage = 8;      
      $scope.currentPage = 0;
      $scope.numberPageNeeded=[];
      $scope.criminalsBackUp = data;
      // Bar de précision
      $scope.accuracyBarValue='0%';
      //Criminels à afficher en fonction de la page
      $scope.criminals = $scope.criminalsBackUp.slice(8*$scope.currentPage,8*($scope.currentPage+1));
      $scope.getPageNeeded();

      //------------------------------------------------------------
      //----------------------- Sauvegarde -------------------------
      //------------------------------------------------------------
      // Cette fonction est appelée lorsque l'utilisateur clique sur sauvegarder lors de la création d'un criminel
      $scope.savedata=function(criminal){
        // criminal est l'élément à sauvegarder dans la base de donénes.

        // Pour le moment -> ajout dans la base de données locale. 
        //------DEBUT A REMPLACER-----
        data.push(angular.copy(criminal));
        //------FIN A REMPLACER-----
        console.log($scope.criminalSelected.id);
        //Permet de masquer le "pop-up" de création de criminel
        $('#criminalModal').modal('hide');
        // Mise à jour les données
        $scope.setThumbnails();
      };

      //------------------------------------------------------------
      //------------------------- POP UP ---------------------------
      //------------------------------------------------------------
      // Fonction appelée lorsque la page web a fini son chargement
      $(document).ready(function(){
        // Lorsque l'utilisateur clique sur une des photos de l'utilisateur
        $(document.body).on('click','.smallPicture',function(){
          $scope.criminalSelected=$scope.criminals[$(".smallPicture").index(this)];
          // affichage d'un "pop-up" affichant des détails sur le criminel selectionné
          $('#criminalLightDetail').modal();
          // Lors de l'affichage du pop-up, on ajoute dynamiquement les informations du criminel
          $('#criminalLightDetail').on('shown.bs.modal', function(){
            var dataToDisplay=
              '<img src=\'./criminals/picture/'+$scope.criminalSelected.picture+'\'>'+
              '<h2>'+$scope.criminalSelected.first_name+' '+$scope.criminalSelected.last_name+'</h2>'+
              '<p>'+$scope.criminalSelected.offense+'</p>';
              // '<a href="#/search/'+$scope.criminalSelected.id+'">Plus d\'information</a>';
            $('#criminalLightDetail .modal-body').html(dataToDisplay);
          });
          // Permet de masque le "pop-up"
          $('#criminalLightDetail').on('hidden.bs.modal', function(){
              $scope.indexValue=-1;
          });
        });
      });

      $('#criminalModal').on('hidden.bs.modal', function(){
          $(this).find('form')[0].reset();
      });

      //------------------------------------------------------------
      //------------------ Champs de recherche ---------------------
      //------------------------------------------------------------
      // Fonction permettant de scruter les modifications apportées au formulaire de recherche
      $scope.$watchCollection('search', function() {
        // Rechercher dans la BDD avec ces informations
        var numberElementSearch=0;
        var isNotNull=false;
        // La variable key indique l'indice de l'élement dans l'objet $scope.search
        for (var key in Object.keys($scope.search)) {
          // valTmp prend la valeur de la l'objet à un indice key donné
          //var valTmp=$scope.search[Object.keys($scope.search)[key]];
          var valTmp=$scope.search[Object.keys($scope.search)[0]];
          if(valTmp!='')isNotNull=true;
          //envoie de la valeur en POST
          $http.post('/search', {'name': valTmp}
          ).success(function(data, status, headers, config) {
              if (data.msg != '')
              {
                  $scope.criminals=data;
              }
              else
              {
                  $scope.errors.push(data.error);
              }

              if(numberElementSearch==0) $scope.getPageNeeded();
              // mise à jour de la valeur de la bar de précision
              $scope.accuracyBarValue=numberElementSearch/3*100+"%";

          }).error(function(data, status) { 
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("error");
          });

          // renvoie le nombre d'élément dans l'objet
          if(valTmp!='' && valTmp!=null) numberElementSearch++;
        };
      });
    });

    //------------------------------------------------------------
    //--------------------- Menu latéral -------------------------
    //------------------------------------------------------------
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
        $(".sidebar-wrapper").toggleClass("toggled");
        $(".page-content-wrapper").toggleClass("toggled");
    });

    //------------------------------------------------------------
    //---------------------- Pagination --------------------------
    //------------------------------------------------------------
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
      console.log($scope.criminalsBackUp);
      $scope.numberPageNeeded=[];
      for (var i = 0; i < Math.ceil($scope.criminalsBackUp.length/$scope.itemsPerPage); i++) {
        $scope.numberPageNeeded.push(i);
      };
      $scope.setThumbnails();
    };

    $scope.setThumbnails=function(){
      $scope.criminals = $scope.criminalsBackUp.slice(8*$scope.currentPage,8*($scope.currentPage+1));
    }

    $scope.fillForm=function(){
      document.getElementById('recipient-name').value = $scope.criminalSelected.last_name;
      document.getElementById('recipient-firstname').value = $scope.criminalSelected.first_name;
      document.getElementById('message-text').value = $scope.criminalSelected.offense;
      if($scope.criminalSelected.gender=="male") document.getElementById('recipient-gender-male').checked = true;
      else document.getElementById('recipient-gender-female').checked = true;
    };

  }]);

// permet d'interdire dans un champs les caractères autre que des chiffres
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}