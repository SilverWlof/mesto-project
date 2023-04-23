const profile = document.querySelector('.profile');

const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const popupZoom = document.querySelector('#popup-zoom');
const popupAvatar = document.querySelector('#popup__updata-avatar');

const profileEditForm = document.forms.ProfileForm;

const cardAddForm = document.forms.CardForm;

const zoomImage = popupZoom.querySelector('.popup__zoom-in');
const zoomDescript = popupZoom.querySelector('.popup__zoom-description');

const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileAvatar = profile.querySelector('.profile__avatar');

const popupAvatarImage = popupAvatar.querySelector('#avatar-image');

const closeButtons = document.querySelectorAll('.popup__button-close');

let popupActive = "";

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



//создание карточек*\*/*
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



//Обработчик лайка*\*/*

elements.addEventListener('click', (evt)=>{
	if(evt.target.classList.contains('element__button-like')){
	event.target.classList.toggle('element__button-like_liked');}
})

//***************************************************



// открытие закрытие попапов*\*/*
function openPopup(item){
	item.classList.add('popup_opened');
	popupActive = item;
	
}

function closePopup(item){
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
profile.querySelector('.profile__edit-avatar').addEventListener('click',()=>{
	openPopup(popupAvatar);
	popupAvatarImage.reset();
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
//*****************************************************


//смена аватарки
popupAvatar.addEventListener('submit',(event)=>{
	event.preventDefault();
	profileAvatar.src = popupAvatarImage.value;
	closePopup(popupAvatar);
	event.target.reset();
	
})
//*****************************************************


//отправка карточки элемента*\*/*
popupPlace.addEventListener('submit',(event)=>{
	event.preventDefault();	
	const item = {
		text: cardAddForm.placeName.value,
		image: cardAddForm.placeImage.value
	}
	closePopup(popupPlace);
	event.target.reset();
	creatingInitialCards(item);
}); 

//*****************************************************



//вешаем слушатель на активную форму*\*/*
function enableValidation(){
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElement)=>{
		const fieldsetList = 
		setEventListener(formElement);
	})
}

function setEventListener (popupActive){
	const inputList = Array.from(popupActive.querySelectorAll('.popup__input'));
	const buttonSave = popupActive.querySelector('.popup__button-save');
	setSaveButtonStatus(inputList, buttonSave);
	inputList.forEach((inputElement) =>{
		inputElement.addEventListener('input', ()=>{
			checkInputValidity(popupActive, inputElement);
			setSaveButtonStatus(inputList, buttonSave);
		})
	})
}
//*****************************************************



//проверяем все ли поля валидны*\*/*
function hasInvalidInput (inputList){
	return inputList.some((inputElement)=>{
		return !inputElement.validity.valid;		
	})
};
//*****************************************************



//переключение кнопи сохранения*\*/*
function setSaveButtonStatus (inputList, button){
	if(hasInvalidInput(inputList)){
		button.setAttribute('disabled', true);
    button.classList.add('popup__button-save_disable'); 
	}else {
		button.removeAttribute('disabled');
    button.classList.remove('popup__button-save_disable');
		
	}
}
//*****************************************************



//вывод текстовой ошибки*\*/*
const checkInputValidity = (form, input) =>{
	const isValid = input.validity.valid
	if (input.validity.patternMismatch) {
		input.setCustomValidity(input.dataset.errorMassage);
  }else if(input.validity.typeMismatch){
  	input.setCustomValidity(input.dataset.errorMassageUrl);
  }else {
  	input.setCustomValidity("");
  };
	  if(!input.validity.valid){
    showError(input, form, input.validationMessage);
  } else{
    hideError(input, form);
  };
};

const showError = (input, form, errorMessage) => {
	const errorSpan = form.querySelector(`.${input.id}-error`);  
  input.classList.add("popup__warning_show")   
  errorSpan.classList.add('popup__warning_show')
  errorSpan.textContent = errorMessage;
};

const hideError = (input, form) => {
	const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__warning_show")  
  errorSpan.textContent = '';
  errorSpan.classList.remove('popup__warning_show')
};
//*****************************************************

initialCards.forEach(creatingInitialCards);

enableValidation();