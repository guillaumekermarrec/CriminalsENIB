var idElement=0;
initCarousel();

// Création du carousel
function initCarousel(){
	idElement=0;
	var _MostSearchedCriminals=getMostSearchedCriminals();
	for (var _criminal in _MostSearchedCriminals) {
		addElementCarousel(_MostSearchedCriminals[_criminal]);
	};
}

// Permet d'initialiser le premier element à l'etat actif
function valueClassCarouselActiveOrNot(){
	if (idElement==0){
		return "item active"
	}
	return "item"
}

// Ajout dynamique directement dans le DOM de l'image d'un criminel dans le carousel
function addElementCarousel(jsonCriminal){
	var idCarouselElement="itemCriminalCarousel"+idElement;
	var idCarouselCaption="carousel-caption"+idElement;

	$('#mostSearchedCriminals').append($('<div>', { 
	    id : idCarouselElement,
	    class: valueClassCarouselActiveOrNot()
	}));
	$('#'+idCarouselElement).append($('<img>', { 
	    src : jsonCriminal.photo
	}));
	$('#'+idCarouselElement).append($('<div>', { 
	    id : idCarouselCaption
	}));
	$('#'+idCarouselCaption).append($('<h3>', { 
		text : jsonCriminal.name
	}));

	idElement= document.getElementById('mostSearchedCriminals').childNodes.length;
}