//вешаем слушатель на активную форму
export function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement)=>{
    const fieldsetList = 
    setEventListener(formElement);
  })
}

export function setEventListener (popupActive){
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


//вывод текстовой ошибки
function checkInputValidity (form, input) {
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

function showError (input, form, errorMessage) {
	const errorSpan = form.querySelector(`.${input.id}-error`);  
  input.classList.add("popup__warning_show")   
  errorSpan.classList.add('popup__warning_show')
  errorSpan.textContent = errorMessage;
};

function hideError (input, form) {
	const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__warning_show")  
  errorSpan.textContent = '';
  errorSpan.classList.remove('popup__warning_show')
};
//*****************************************************


//переключение кнопи сохранения
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


//проверяем все ли поля валидны
function hasInvalidInput (inputList){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;    
  })
};
//*****************************************************
