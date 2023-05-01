import {elements, initialCards, cardAddForm, zoomImage, zoomDescript, popupZoom, popupPlace} from './lib.js';

import {closePopup, openPopup} from "./modal.js";

import {addCard} from './api.js';

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

	elementText.textContent =  object.name;
	elementImage.alt = object.name;
	elementImage.src = object.link;

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

export function creatingInitialCards(item){
	const element = createСard(item);
	elements.prepend(element);
}

//***************************************************

function disableButton(popup){
	const button = popup.querySelector('.popup__button-save')
	button.setAttribute('disabled', true);
  button.classList.add('popup__button-save_disable'); 
}

//отправка карточки элемента
popupPlace.addEventListener('submit',(event)=>{
	event.preventDefault();	
	const item = {
		name: cardAddForm.placeName.value,
		link: cardAddForm.placeImage.value
	}

	addCard(item);

	closePopup(popupPlace);
	event.target.reset();
	disableButton(popupPlace);
	creatingInitialCards(item);
}); 

//*****************************************************



//Обработчик лайка

elements.addEventListener('click', (evt)=>{
	if(evt.target.classList.contains('element__button-like')){
	event.target.classList.toggle('element__button-like_liked');}
})

//***************************************************

//initialCards.forEach(creatingInitialCards);