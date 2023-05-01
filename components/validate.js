//вешаем слушатель на активную форму
export function enableValidation(settings){
  const formList = Array.from(document.querySelectorAll('.' + settings.formList));
  formList.forEach((formElement)=>{
    const fieldsetList = 
    setEventListener(formElement, settings);
  })
}

function setEventListener (formElement, settings){
  const inputList = Array.from(formElement.querySelectorAll('.' + settings.inputList));
  const buttonSave = formElement.querySelector('.' + settings.ButtonSave);
  setSaveButtonStatus(inputList, buttonSave, settings);
  inputList.forEach((inputElement) =>{
    inputElement.addEventListener('input', ()=>{
      checkInputValidity(formElement, inputElement, settings);
      setSaveButtonStatus(inputList, buttonSave, settings);
    })
  })
}
//*****************************************************


//вывод текстовой ошибки
function checkInputValidity (form, input, settings) {
	const isValid = input.validity.valid
	if (input.validity.patternMismatch) {
		input.setCustomValidity(input.dataset.errorMassage);
  }else if(input.validity.typeMismatch){
  	input.setCustomValidity(input.dataset.errorMassageUrl);
  }else if(input.validity.tooShort){
    input.setCustomValidity(input.dataset.errorMassageShort);
  }else {
  	input.setCustomValidity("");
  };
	  if(!input.validity.valid){
    showError(input, form, input.validationMessage, settings);
  } else{
    hideError(input, form, settings);
  };
};

function showError (input, form, errorMessage, settings) {
	const errorSpan = form.querySelector(`.${input.id}-` + settings.inputError);  
  input.classList.add(settings.errorClass)   
  errorSpan.classList.add(settings.errorClass)
  errorSpan.textContent = errorMessage;
};

function hideError (input, form, settings) {
	const errorSpan = form.querySelector(`.${input.id}-` + settings.inputError);
  input.classList.remove(settings.errorClass)  
  errorSpan.textContent = '';
  errorSpan.classList.remove(settings.errorClass)
};
//*****************************************************


//переключение кнопи сохранения
export function setSaveButtonStatus (inputList, button, settings){
  if(hasInvalidInput(inputList)){
    button.setAttribute('disabled', true);
    button.classList.add(settings.inactiveButton); 
  }else {
    button.removeAttribute('disabled');
    button.classList.remove(settings.inactiveButton);    
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
