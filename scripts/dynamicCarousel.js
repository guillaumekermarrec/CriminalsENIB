
var idElement=0;
initCarousel();

function initCarousel(){
	idElement=0;
	var _MostSearchedCriminals=getMostSearchedCriminals();
	for (var _criminal in _MostSearchedCriminals) {
		addElementCarousel(_MostSearchedCriminals[_criminal]);
	};
}

function valueClassCarouselActiveOrNot(){
	if (idElement==0){
		return "item active"
	}
	return "item"
}

function addElementCarousel(jsonCriminal){
	var idCarouselElement="itemCriminalCarousel"+idElement;
	var idCarouselCaption="carousel-caption"+idElement;
	console.log(jsonCriminal.photo);

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

function eraseElementsCarousel(){

}