import {formList, ValidationSettings, popups,
profile, profileEditForm, cardAddForm, popupPlace, 
popupProfile, popupAvatar, popupAvatarImage, popudDelCard,
profileAvatar,profileName, profileDescription} from './lib.js'

import {enableValidation, setSaveButtonStatus} from './validate.js';

import {profileServerSave, profileAvatarServerSave} from './api.js';
// открытие закрытие попапов

export function openPopup(item){
	item.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape);
}

export function closePopup(item){
	item.target.closest('.popup_opened').classList.remove('popup_opened');
}


popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(evt)
		}
		if (evt.target.classList.contains('popup__button-close')) {
			closePopup(evt)
		}
	})
})

function closeByEscape(e){
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    openedPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
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
	closePopup(event);
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
	profileServerSave(event);
	profileName.textContent = profileEditForm.name.value;
  profileDescription.textContent = profileEditForm.description.value;	
});

enableValidation(ValidationSettings);