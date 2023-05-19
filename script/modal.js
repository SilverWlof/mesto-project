import {popups, ValidationSettings, profileName, profileDescription, profileAvatar} from './lib.js'

import {enableValidation, setSaveButtonStatus} from './validate.js';

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

//*****************************************************
enableValidation(ValidationSettings);