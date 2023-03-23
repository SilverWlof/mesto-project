const profile = document.querySelector('.profile');

const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const popupZoom = document.querySelector('#popup-zoom');


const startCard = [
	Dombay={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
		text: 'Архыз'
	},
	Elbrus={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
		text: 'Челябинская область'
	},		
	Karachaevsk={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
		text: 'Иваново'
	},
	Dombay={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
		text: 'Камчатка'
	},
	Elbrus={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
		text: 'Холмогорский район'
	},		
	Karachaevsk={
		image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
		text: 'Байкал'
	}	
]; 
//*****************************************************



//создание карточек
function startCardCreate (object){
	const elementTemplate = document.querySelector('#element').content; 
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	element.querySelector('.element__text').textContent =  object.text;
	element.querySelector('.element__image').alt = object.text;
	element.querySelector('.element__image').src = object.image;
	element.querySelector('.element__button-like').addEventListener('click', function(event){
		event.target.classList.toggle('element__button-like_liked');
	})
	element.querySelector('.element__image').addEventListener('click', function(event){
		console.log(event.target.alt);
		popupZoom.querySelector('.popup__zoom-in').src = event.target.src
		popupZoom.querySelector('.popup__zoom-description').textContent = event.target.alt
		openedPopup(popupZoom);
	})
	element.querySelector('.element__button-delete').addEventListener('click', function(event){
		event.target.parentElement.closest('.element');
		event.target.parentElement.remove();
	})
	elements.prepend(element);
}
//***************************************************



// открытие закрытие попапов
function openedPopup(item){
	if(item.classList.contains('popup_opened') != true){
		item.classList.add('popup_opened');
	}
}
function closedPopup(item){
	if(item.classList.contains('popup_opened') === true){
		item.classList.remove('popup_opened');
	}
}
//*****************************************************



//попап профиля
profile.querySelector('.profile__button-edit').addEventListener('click', function () {
	openedPopup(popupProfile);
	popupProfile.querySelector('#name').value = '';
	popupProfile.querySelector('#name').placeholder = profile.querySelector('.profile__name').textContent;
	popupProfile.querySelector('#description').value = '';
	popupProfile.querySelector('#description').placeholder = profile.querySelector('.profile__description').textContent;
});
popupProfile.querySelector('.popup__button-close').addEventListener('click', function (){
	closedPopup(popupProfile);  
}); 
//*****************************************************



//попапа новых карточек
profile.querySelector('.profile__button-add-profile').addEventListener('click', function () {
	openedPopup(popupPlace);
	popupPlace.querySelector('#placeName').value = '';
	popupPlace.querySelector('#placeName').placeholder = 'Название места';
	popupPlace.querySelector('#image').value = '';
	popupPlace.querySelector('#image').placeholder = 'Ссылка на картинку';	
});
popupPlace.querySelector('.popup__button-close').addEventListener('click', function () {
	closedPopup(popupPlace);  
}); 
//*****************************************************



//попап зума
popupZoom.querySelector('.popup__button-close').addEventListener('click', function () {
	closedPopup(popupZoom);  
})

//*****************************************************



//отправка данный в профиль
popupProfile.addEventListener('submit',function(){
	event.preventDefault();
	popupProfile.classList.remove('popup_opened');
	const profileInfo = profile.querySelector('.profile__info');	
	profileInfo.querySelector('.profile__name').textContent = popupProfile.querySelector('#name').value;
	profileInfo.querySelector('.profile__description').textContent = popupProfile.querySelector('#description').value;	
});
//*****************************************************



//отправка карточки элемента
popupPlace.addEventListener('submit', function () {
	event.preventDefault();
	popupPlace.classList.remove('popup_opened');
	const item = {
		text: popupPlace.querySelector('#placeName').value,
		image: popupPlace.querySelector('#image').value
	}
	startCardCreate(item);
}); 

startCard.forEach(startCardCreate);
//*****************************************************