import {elements} from '../lib/lib.js';
//Обработчик лайка

elements.addEventListener('click', (evt)=>{
	if(evt.target.classList.contains('element__button-like')){
	event.target.classList.toggle('element__button-like_liked');}
})

//***************************************************
