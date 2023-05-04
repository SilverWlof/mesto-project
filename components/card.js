import {elements, initialCards, cardAddForm, zoomImage, zoomDescript, popupZoom, popupPlace, popudDelCard} from './lib.js';

import {closePopup, openPopup} from "./modal.js";

import {addCard, delCard, cards, setLike, delLike} from './api.js';


//создание карточек
export function createСard (object){
	const elementTemplate = document.querySelector('#element').content; 
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementText = element.querySelector('.element__text');
	const elementImage = element.querySelector('.element__image');
	const buttonLike = element.querySelector('.element__button-like');
	const buttonDel = element.querySelector('.element__button-delete');
	const counter =  element.querySelector('.element__counter-like');

	element.id = object._id;

	if(object.owner._id === 'ff9b1be57da3d4b8738ed1e8'){
		element.id = object._id;
		buttonDel.addEventListener('click', function(event){
			delCard(element.id);	
			event.target.closest('.element').remove();
		})
	} else{
		buttonDel.setAttribute('disabled', true);
		buttonDel.classList.add('element__button-delete_disable'); 
	}



	elementText.textContent =  object.name;
	elementImage.alt = object.name;
	elementImage.src = object.link;


	if(!object.likes){
		counter.textContent = '0';
		}
		else{
		counter.textContent = object.likes.length;

		for (var i = 0; i < object.likes.length; i++) {
		  if(object.likes[i]._id === "ff9b1be57da3d4b8738ed1e8"){
		 		buttonLike.classList.add('element__button-like_liked');
		  }
		};
	}


	elementImage.addEventListener('click', function(event){
		zoomImage.src = event.target.src
		zoomImage.alt = event.target.alt
		zoomDescript.textContent = event.target.alt
		openPopup(popupZoom);
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
	// const item = {
	// 	name: event.target.placeName.value,
	// 	link: event.target.placeImage.value
	// }

	addCard(event);
	
	event.target.reset();
	disableButton(popupPlace);
}); 

//*****************************************************



//Обработчик лайка

elements.addEventListener('click', (evt)=>{
	if(evt.target.classList.contains('element__button-like')){
		if(!event.target.classList.contains('element__button-like_liked')){
			setLike(evt.target.closest('.element'));
		}
		else{
			delLike(evt.target.closest('.element'));
		}	
		event.target.classList.toggle('element__button-like_liked')
	}
})

//***************************************************



//Удаление карточек

// popudDelCard.addEventListener('submit',(event)=>{
// 	event.preventDefault();
// 	delCard(popudDelCard.name);
// 	closePopup(popudDelCard);
// })




//*****************************************************

//initialCards.forEach(creatingInitialCards);