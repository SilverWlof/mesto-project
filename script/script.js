const profile = document.querySelector('.profile');

const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const popupZoom = document.querySelector('#popup-zoom');

const zoomImage = popupZoom.querySelector('.popup__zoom-in');
const zoomDescript = popupZoom.querySelector('.popup__zoom-description');

const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupProfileName = popupProfile.querySelector('#name');
const popupProfileDescription = popupProfile.querySelector('#description');



const closeButtons = document.querySelectorAll('.popup__button-close');

const initialCards = [
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
//*****************************************************



//создание карточек
function createСard (object){
	const elementTemplate = document.querySelector('#element').content; 
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementText = element.querySelector('.element__text');
	const elementImage = element.querySelector('.element__image');
	const buttonLike = element.querySelector('.element__button-like');
	const buttonDel = element.querySelector('.element__button-delete');

	elementText.textContent =  object.text;
	elementImage.alt = object.text;
	elementImage.src = object.image;

	buttonLike.addEventListener('click', function(event){
		event.target.classList.toggle('element__button-like_liked');
	})

	elementImage.addEventListener('click', function(event){
		zoomImage.src = event.target.src
		zoomImage.alt = event.target.alt
		zoomDescript.textContent = event.target.alt
		openPopup(popupZoom);
	})

	buttonDel.addEventListener('click', function(event){
		event.target.closest('.element').remove();
	})

	return element;
}

function creatingInitialCards(item){
	const element = createСard(item);
	elements.prepend(element);
}

//***************************************************



// открытие закрытие попапов
function openPopup(item){
	item.classList.add('popup_opened');
}
function closePopup(item){
	item.classList.remove('popup_opened');
}

closeButtons.forEach((button) =>{
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup));
});
//*****************************************************



//попап профиля
profile.querySelector('.profile__button-edit').addEventListener('click', function () {
	openPopup(popupProfile);
	popupProfileName.value = profileName.textContent ;
	popupProfileDescription.value = profileDescription.textContent;
});
//*****************************************************



//попапа новых карточек
profile.querySelector('.profile__button-add-profile').addEventListener('click', function () {
	openPopup(popupPlace);
});
//*****************************************************



//отправка данный в профиль
popupProfile.addEventListener('submit',function(event){
	event.preventDefault();	
	profileName.textContent = popupProfileName.value;
	profileDescription.textContent = popupProfileDescription.value;	
	closePopup(popupProfile);
});
//*****************************************************



//отправка карточки элемента
popupPlace.addEventListener('submit', function (event) {
	event.preventDefault();	
	const item = {
		text: popupPlace.querySelector('#placeName').value,
		image: popupPlace.querySelector('#image').value
	}
	closePopup(popupPlace);
	event.target.reset();
	creatingInitialCards(item);
}); 


initialCards.forEach(creatingInitialCards);
//*****************************************************