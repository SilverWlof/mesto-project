import {elements, initialCards, cardAddForm, zoomImage, zoomDescript, popupZoom, popupPlace} from '../lib/lib.js';
import {closePopup, openPopup} from "../open-close-popup/open-close-popup.js";
/*
написать через fetch и Promise. данные отправляются на сервер и от туда подгружаются.
так же сделать с профилем

*/
//создание карточек
export function createСard (object){
	const elementTemplate = document.querySelector('#element').content; 
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementText = element.querySelector('.element__text');
	const elementImage = element.querySelector('.element__image');
	const buttonLike = element.querySelector('.element__button-like');
	const buttonDel = element.querySelector('.element__button-delete');

	elementText.textContent =  object.text;
	elementImage.alt = object.text;
	elementImage.src = object.image;

	elementImage.addEventListener('click', function(event){
		zoomImage.src = event.target.src
		zoomImage.alt = event.target.alt
		zoomDescript.textContent = event.target.alt
		openPopup(popupZoom);
	})

	buttonDel.addEventListener('click', function(event){
		event.target.closest('.element').remove();
	})

	return element;
}

function creatingInitialCards(item){
	const element = createСard(item);
	elements.prepend(element);
}

//***************************************************


//отправка карточки элемента
popupPlace.addEventListener('submit',(event)=>{
	event.preventDefault();	
	const item = {
		text: cardAddForm.placeName.value,
		image: cardAddForm.placeImage.value
	}
	closePopup(popupPlace);
	event.target.reset();
	creatingInitialCards(item);
}); 

//*****************************************************

initialCards.forEach(creatingInitialCards);