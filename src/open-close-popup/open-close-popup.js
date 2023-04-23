import {profile, profileEditForm, cardAddForm, closeButtons, popupProfile, popupPlace, popupAvatar, profileName, profileDescription, popupAvatarImage} from '../lib/lib.js'
import {setEventListener} from '../validity/validity.js';
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
		console.log(popupActive.name)
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