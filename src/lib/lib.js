export const popupProfile = document.querySelector('#popup-profile');
export const popupPlace = document.querySelector('#popup-place');
export const popupZoom = document.querySelector('#popup-zoom');
export const popupAvatar = document.querySelector('#popup__updata-avatar');

export const profileEditForm = document.forms.ProfileForm;
export const cardAddForm = document.forms.CardForm;
export const avatarImageFrom = document.forms.avatarImage;

export const zoomImage = popupZoom.querySelector('.popup__zoom-in');
export const zoomDescript = popupZoom.querySelector('.popup__zoom-description');

export const profile = document.querySelector('.profile');

export const profileName = profile.querySelector('.profile__name');
export const profileDescription = profile.querySelector('.profile__description');
export const profileAvatar = profile.querySelector('.profile__avatar');

export const popupAvatarImage = popupAvatar.querySelector('#avatarImage');

export const closeButtons = document.querySelectorAll('.popup__button-close');

export const elements = document.querySelector('.elements');

export const initialCards = [
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
		text: 'Архыз'
	},
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
		text: 'Челябинская область'
	},		
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
		text: 'Иваново'
	},
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
		text: 'Камчатка'
	},
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
		text: 'Холмогорский район'
	},		
	{
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
		text: 'Байкал'
	}	
];