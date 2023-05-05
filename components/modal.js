import {formList, ValidationSettings, popups,
profile, profileEditForm, cardAddForm, popupPlace, 
popupProfile, popupAvatar, popudDelCard,
profileAvatar,profileName, profileDescription} from './lib.js'

import {creatingInitialCards, createCard} from './card.js';

import {enableValidation, setSaveButtonStatus} from './validate.js';

import {profileServerSave, profileAvatarServerSave, profileStart, cards} from './api.js';
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
	const changeAvatar = new Promise(function(resolve, reject){
		resolve(profileAvatarServerSave(event))
	})
	changeAvatar
		.finally(()=>{
	    event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
	  })
		.then((value) => {
  		profileAvatar.src = value.avatar;
		})
		.then(()=>{
  		closePopup(popupAvatar)
  		event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
  	})
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
	const changeProfile = new Promise(function(resolve, reject){
			resolve(profileServerSave(event))		
	})	
	changeProfile
		.finally(()=>{
		  event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
		})
		.then((value) => {
			profileName.textContent = value.name;
  		profileDescription.textContent = value.about;
  	})
  	.then(()=>{
  		closePopup(popupProfile)
  		event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
  	})
});


export let profileId = '123';

const loadedPage = new Promise(function(resolve, reject){
	resolve(profileStart())	
});

loadedPage
	.then((value) => {
   	profileName.textContent = value.name;
   	profileDescription.textContent = value.about;
   	profileAvatar.src = value.avatar;
   	profileId = value._id;
 	})
 	.then(()=>{
 		cards().then((value) => {
   	value.reverse().forEach(creatingInitialCards)
   	})
 	})

enableValidation(ValidationSettings);
