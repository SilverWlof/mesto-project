import {elements, initialCards, cardAddForm, zoomImage, zoomDescript, popupZoom, popupPlace, popudDelCard} from './lib.js';

import {closePopup, openPopup, profileId} from "./modal.js";


import {addCard, delCard, cards, setLike, delLike} from './api.js';


//создание карточек
export function createCard (object){
	const elementTemplate = document.querySelector('#element').content; 
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementText = element.querySelector('.element__text');
	const elementImage = element.querySelector('.element__image');
	const buttonLike = element.querySelector('.element__button-like');
	const buttonDel = element.querySelector('.element__button-delete');
	const counter =  element.querySelector('.element__counter-like');

	element.id = object._id;

	if(object.owner._id === profileId){
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

		for (let i = 0; i < object.likes.length; i++) {
		  if(object.likes[i]._id === profileId){
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
	const element = createCard(item);
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
	const creatingCard = new Promise(function(resolve, reject){
		resolve(addCard(event)) 			
	})		
	creatingCard
		.finally(()=>{
		  event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
		})
		.then((value)=>{
			creatingInitialCards(value)
		})
		.then(()=>{
	  	closePopup(popupPlace)
	  	event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
	  })

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


