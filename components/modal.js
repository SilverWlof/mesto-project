import {profile, profileEditForm, cardAddForm, closeButtons, popupProfile, popupPlace, popupAvatar, profileName, profileDescription, popupAvatarImage} from './lib.js'
import {setEventListener} from './validate.js';
// открытие закрытие попапов
let popupActive = "";

export function openPopup(item){
	item.classList.add('popup_opened');
	popupActive = item;	
}

export function closePopup(item){
	item.classList.remove('popup_opened');	
}

closeButtons.forEach((button) =>{
	const popupClosest = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popupClosest));
});

document.addEventListener('keydown', (e)=>{
	if(e.key == "Escape"){
		closePopup(popupActive);
	}
})
//*****************************************************

//попап аватарки
 profile.querySelector('.profile__edit-avatar').addEventListener('click',(event)=>{
	openPopup(popupAvatar);
})
//*****************************************************

//попап профиля
profile.querySelector('.profile__button-edit').addEventListener('click',()=> {
	openPopup(popupProfile);
	setEventListener(popupProfile);
	profileEditForm.name.value = profileName.textContent ;
	profileEditForm.description.value = profileDescription.textContent;
});
//*****************************************************

//попапа новых карточек
profile.querySelector('.profile__button-add-profile').addEventListener('click',()=> {
	openPopup(popupPlace);
	setEventListener(popupPlace);
});
//*****************************************************

//отправка данный в профиль

popupProfile.addEventListener('submit',(event)=>{
	event.preventDefault();	
	profileName.textContent = profileEditForm.name.value;
  profileDescription.textContent = profileEditForm.description.value;	
	closePopup(popupProfile);
});

//смена аватарки
popupAvatar.addEventListener('submit',(event)=>{
	event.preventDefault();
	profileAvatar.src = popupAvatarImage.value;
	closePopup(popupAvatar);
	event.target.reset();
})