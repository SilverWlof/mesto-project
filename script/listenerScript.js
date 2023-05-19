import {profile, popupProfile, popupAvatar, popupPlace, buttonsSavePopup,
elements, profileAvatar, profileEditForm, profileName, profileDescription} from './lib.js';

import {closePopup, openPopup, profileId} from "./modal.js";

import {createCard} from "./card.js";

import {sendingProfile, sendingAvatar, sendingCard} from './api.js';

import {disableButton} from './validate.js';

//***************************************************
//расположение начальных карточек
export function creatingInitialCards(item){
	const element = createCard(item);
	elements.prepend(element);
}

//***************************************************

//*****************************************************
//попап аватарки
 profile.querySelector('.profile__edit-avatar').addEventListener('click',(event)=>{
	openPopup(popupAvatar);
})
//*****************************************************
//попапа новых карточек
profile.querySelector('.profile__button-add-profile').addEventListener('click',()=> {
	openPopup(popupPlace);
});
//*****************************************************
//попап профиля
profile.querySelector('.profile__button-edit').addEventListener('click',()=> {
	openPopup(popupProfile);
	profileEditForm.name.value = profileName.textContent ;
	profileEditForm.description.value = profileDescription.textContent;
});
//*****************************************************
//смена аватарки
popupAvatar.addEventListener('submit',(event)=>{
	event.preventDefault();
	buttonsSavePopup.textContent = 'Сохранение...';
	sendingAvatar(event)
		.then((value) => {
  		profileAvatar.src = value.avatar;
		})
  	.then(()=>{
  		closePopup(popupAvatar)
  		event.target.reset();
  	})
  	.catch((err) => {
    	console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
	    buttonsSavePopup.textContent = 'Сохранить';
	  })
})
//*****************************************************
//отправка данный в профиль
popupProfile.addEventListener('submit',(event)=>{
	event.preventDefault();
	buttonsSavePopup.textContent = 'Сохранение...';	
	sendingProfile(event)	
		.then((value) => {
			profileName.textContent = value.name;
  		profileDescription.textContent = value.about;
  		closePopup(popupPlace);
  	})
  	.then(()=>{
	  	closePopup(popupProfile);
	  })
  	.catch((err) => {
    	console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
		  buttonsSavePopup.textContent = 'Сохранить';
		})
});
//*****************************************************
//отправка карточки элемента
popupPlace.addEventListener('submit',(event)=>{
	event.preventDefault();
	buttonsSavePopup.textContent = 'Сохранение...';	
	sendingCard(event) 			
		.then((value)=>{
			creatingInitialCards(value)
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
		  buttonsSavePopup.textContent = 'Сохранить';
		})
}); 
//*****************************************************

