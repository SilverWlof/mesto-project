
import {disableButton} from './validate.js';

import {elements, profileAvatar,
profileName, profileDescription,
profileEditForm, cardAddForm,
avatarImageFrom, buttonsSavePopup,
popups} from './utils/constanta.js'
//***************************************************

import {profileId} from './index.js';

import Card from './components/Card.js';

import Popup from './components/Popup.js';

import Api from './components/Api.js';

import ApiSending from './components/ApiSending.js';

//***************************************************

const avatarPopup = new Popup('#popup__updata-avatar');
const placePopup = new Popup('#popup-place');
const profilePopup = new Popup('#popup-profile');

//***************************************************
//расположение начальных карточек
export function creatingInitialCards(item){
	const card = new Card(item)._generate(profileId);
	elements.prepend(card);
}

//***************************************************

//*****************************************************
//попап аватарки♫♫♫♫♫♫

const btuAvatarEdit = new Popup('.profile__edit-avatar')
	._getElement().addEventListener('click', ()=>{
		avatarPopup._handleOpenPopup();
})


//попапа новых карточек♫♫♫♫♫♫

const btuCardEdit = new Popup('.profile__button-add-profile')
	._getElement().addEventListener('click', ()=>{			
			placePopup._handleOpenPopup();
})


//попап профиля♫♫♫♫♫♫
const btuProfileEdit = new Popup('.profile__button-edit')
	._getElement().addEventListener('click', ()=>{
		profilePopup._handleOpenPopup();
		profileEditForm.name.value = profileName.textContent ;
		profileEditForm.description.value = profileDescription.textContent;
})

//*****************************************************
//смена аватарки♫♫♫♫♫♫
avatarPopup._getElement().addEventListener('submit',(event)=>{
	event.preventDefault();
	const buttonsSave = new Popup('#button-save-avatar')._getElement();
	buttonsSave.textContent = 'Сохранение...';
	const Avatar = new ApiSending('/users/me/avatar',
		'PATCH')
	._sendingAvatar(event)
		.then((value) => {
			profileAvatar.src = value.avatar;
		})
		.then(()=>{
			avatarPopup._handleClosePopup()
			event.target.reset();
		})
		.catch((err) => {
			console.log('ошибка - ' + err);
			})
		.finally(()=>{
			buttonsSave.textContent = 'Сохранить';
		})
})
//*****************************************************
//отправка данный в профиль♫♫♫♫♫♫
profilePopup._getElement().addEventListener('submit',(event)=>{
	event.preventDefault();
	const buttonsSave = new Popup('#button-save-profile')._getElement();
	buttonsSave.textContent = 'Сохранение...';
	const Profile = new ApiSending('/users/me',
		'PATCH')
	._sendingProfile(event)
		.then((value) => {
			profileName.textContent = value.name;
   		profileDescription.textContent = value.about;
		})
		.then(()=>{
			profilePopup._handleClosePopup();
			event.target.reset();
		})
		.catch((err) => {
			console.log('ошибка - ' + err);
			})
		.finally(()=>{
			buttonsSave.textContent = 'Сохранить';
		})
})
//*****************************************************
//отправка карточки элемента♫♫♫♫♫♫

placePopup._getElement().addEventListener('submit',(event)=>{
	event.preventDefault();
	const buttonsSave = new Popup('#button-save-profile')._getElement();
	buttonsSave.textContent = 'Сохранение...';
	const Card = new ApiSending('/cards/',
		'POST')
	._sendingCard(event)
		.then((value)=>{

			creatingInitialCards(value)/*??????*/

		})
		.then(()=>{
	  	placePopup._handleClosePopup();
	  	event.target.reset();
	  	//placePopup._disableButton();
			//disableButton(placePopup._getElement());/*??????*/
	  })
	  .catch((err) => {
   		console.log('ошибка - ' + err);
  	})
  	.finally(()=>{
		  buttonsSave.textContent = 'Сохранить';
		})
})
//*****************************************************
//*****************************************************
popups.forEach((popup) => {
	const popupCheck = new Popup('#'+popup.id);
	popupCheck._getElement().addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			popupCheck._handleClosePopup();
		}
		if (evt.target.classList.contains('popup__button-close')) {
			popupCheck._handleClosePopup();
		}
	})
})

