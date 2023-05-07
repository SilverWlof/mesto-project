import {elements} from './lib.js';

import {profileId} from "./index.js";

import {zoomingImage} from './zoom.js';

import {receivingСards, sendingCard, deletingCards, setLike, deletingLike} from './api.js';

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
			deletingCards(element.id);	
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

	elementImage.addEventListener('click', zoomingImage);

//Обработчик лайка
	element.addEventListener('click', (evt)=>{
		if(evt.target.classList.contains('element__button-like')){
			if(!evt.target.classList.contains('element__button-like_liked')){
				setLike(evt.target.closest('.element'))
					.then((data)=>{
		    		evt.target.closest('.element').querySelector('.element__counter-like').textContent = data.likes.length;
		  		})
		  		.then(()=>{
		  			evt.target.classList.toggle('element__button-like_liked')
		  		})
		  		.catch((err) => {
			   		console.log('ошибка - ' + err);
			  	})
			}
			else{
				deletingLike(evt.target.closest('.element'))	
					.then((data)=>{
		    		evt.target.closest('.element').querySelector('.element__counter-like').textContent = data.likes.length;
		  		})
		  		.then(()=>{
		  			evt.target.classList.toggle('element__button-like_liked')
		  		})
		  		.catch((err) => {
			   		console.log('ошибка - ' + err);
			  	})
			}	
		}
	})

	return element;
}

//***************************************************



