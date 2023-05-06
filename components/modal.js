import {formList, ValidationSettings, popups,
profile, profileEditForm, cardAddForm, popupPlace, 
popupProfile, popupAvatar, popudDelCard,
profileAvatar,profileName, profileDescription} from './lib.js'

import {creatingInitialCards} from './card.js';

import {enableValidation, setSaveButtonStatus, disableButton} from './validate.js';

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
	new Promise(function(resolve, reject){
		resolve(sendingAvatar(event))
	})
	changeAvatar		
		.then((value) => {
  		profileAvatar.src = value.avatar;
		})
		.then(()=>{  		
  		event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
  	})
  	.then(()=>{
  		closePopup(popupAvatar)
  		event.target.reset();
  	})
  	.catch((err) => {
    	console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
	    event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
	  })
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
	new Promise(function(resolve, reject){
			resolve(sendingProfile(event))		
	})	
		.then((value) => {
			profileName.textContent = value.name;
  		profileDescription.textContent = value.about;
  	})
  	.then(()=>{
  		closePopup(popupProfile)
  		event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
  	})
  	.catch((err) => {
    	console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
		  event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
		})
});


export let profileId = '123';

new Promise(function(resolve, reject){
	resolve(receivingProfile())	
})
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

 //отправка карточки элемента
popupPlace.addEventListener('submit',(event)=>{
	event.preventDefault();	
	new Promise(function(resolve, reject){
		resolve(sendingCard(event)) 			
	})		
		.then((value)=>{
			creatingInitialCards(value)
		})
		.then(()=>{
	  	event.target.querySelector('.popup__button-save').textContent = 'Сохранение...';
	  })
	  .then(()=>{
	  	closePopup(popupPlace)
	  	event.target.reset();
			disableButton(popupPlace);
	  })
	  .catch((err) => {
   		console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
		  event.target.querySelector('.popup__button-save').textContent = 'Сохранить';
		})
}); 

//*****************************************************

enableValidation(ValidationSettings);
