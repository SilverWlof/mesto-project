import {popups, ValidationSettings, profileName, profileDescription, profileAvatar} from './lib.js'

import {creatingInitialCards} from './mainScript.js';

import {enableValidation, setSaveButtonStatus} from './validate.js';

import {receivingСards, receivingProfile, sendingProfile, sendingAvatar} from './api.js';
// открытие закрытие попапов

export function openPopup(item){
	item.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape);
}

export function closePopup(item){
	item.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape);
}


popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(evt.target)
		}
		if (evt.target.classList.contains('popup__button-close')) {
			closePopup(evt.target.closest('.popup_opened'))
		}
	})
})

function closeByEscape(e){
  if (e.key === 'Escape') {
  	const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup);
  }
}
//*****************************************************

export let profileId = '123';

receivingProfile()	
	.then((value) => {
   	profileName.textContent = value.name;
   	profileDescription.textContent = value.about;
   	profileAvatar.src = value.avatar;
   	profileId = value._id;
 	})
 	.then(()=>{
 		receivingСards().then((value) => {
   	value.reverse().forEach(creatingInitialCards)
   	})
 	})
 	.catch((err) => {
   	console.log('ошибка - ' + err);
  })

//*****************************************************
enableValidation(ValidationSettings);