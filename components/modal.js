import {formList, ValidationSettings, popups,
profile, profileEditForm, cardAddForm, popupPlace, 
popupProfile, popupAvatar, popupAvatarImage,
profileAvatar,profileName, profileDescription} from './lib.js'

import {enableValidation, setSaveButtonStatus} from './validate.js';

import {profileServerSave, profileAvatarServerSave} from './api.js';
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
			closePopup(popup)
		}
		if (evt.target.classList.contains('popup__button-close')) {
			closePopup(popup)
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

//попап аватарки
 profile.querySelector('.profile__edit-avatar').addEventListener('click',(event)=>{
	openPopup(popupAvatar);
})

//смена аватарки
popupAvatar.addEventListener('submit',(event)=>{
	event.preventDefault();
	profileAvatarServerSave(popupAvatarImage);
	profileAvatar.src = popupAvatarImage.value;
	closePopup(popupAvatar);
	event.target.reset();
})
//*****************************************************

//попап профиля
profile.querySelector('.profile__button-edit').addEventListener('click',()=> {
	openPopup(popupProfile);
	profileEditForm.name.value = profileName.textContent ;
	profileEditForm.description.value = profileDescription.textContent;
});
//*****************************************************

//попапа новых карточек
profile.querySelector('.profile__button-add-profile').addEventListener('click',()=> {
	openPopup(popupPlace);
});
//*****************************************************

//отправка данный в профиль

popupProfile.addEventListener('submit',(event)=>{
	event.preventDefault();	
	profileServerSave(profileEditForm);
	profileName.textContent = profileEditForm.name.value;
  profileDescription.textContent = profileEditForm.description.value;	
	closePopup(popupProfile);
});

enableValidation(ValidationSettings);