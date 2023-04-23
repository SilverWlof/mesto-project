import {popupProfile, popupAvatar, profileName, profileDescription, profileEditForm, profileAvatar, popupAvatarImage} from '../lib/lib.js';
import {closePopup} from "../open-close-popup/open-close-popup.js";

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