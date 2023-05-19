import '../style/pages/index.css';

import createCard from "./listenerScript.js";

import {receivingСards, receivingProfile} from './api.js';

import {profileName, profileDescription, profileAvatar} from './lib.js'

import {creatingInitialCards} from './listenerScript.js';

export let profileId = '123';

function ConsoleCart(array){
	const cart = {
		name :array.name,
		link: array.link,
		id: array._id,
		ownerId: array.owner._id
	}
	console.log(cart)
	return cart;
}

receivingProfile()	
	.then((value) => {
   	profileName.textContent = value.name;
   	profileDescription.textContent = value.about;
   	profileAvatar.src = value.avatar;
   	profileId = value._id;
 	})
 	.then(()=>{
 		receivingСards().then((value) => {
	   	value.reverse().forEach(creatingInitialCards);
	   	console.log(value[0])
	   	//value.forEach((item)=> console.log(item));
   	})
 	})
 	.catch((err) => {
   	console.log('ошибка - ' + err);
  })

  class Card{
  	constructor(data){
  		this._name = data.name; //приватный элемент который используеться только здесь
  		this._image = data.image;
  		this.id = data.id; //общий элемент т.к. используется не только здесь
  	}
  	_getElement(){ //выдает всю разметку HTLM
  		const elementTemplate = document
  			.querySelector('#element')
  			.content
  			.querySelector('.element')
  			.cloneNode(true);

  			return	elementTemplate;
  	}
  	generate(){
  		this._element = this._getElement();//в _element будет разметка

  		this._element.querySelector('.element__text').textContent = this._name;
  		this._element.querySelector('.element__image').src = this._image;
  		this._element.querySelector('.element__image').alt = this._name;

  		return this._element;
  	}
  }

 const test={
 	name: 'Welcome',
 	image: 'http Image',
 	id: '1123854857'
 }
const text = new Card(test);
console.log(text);//передает сам обьект
console.log(text._getElement());//передаст паустую разметку
console.log(text.generate());//передаст заполненую разметку


function server(){
	  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/', {
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390'
    }
  })
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => console.log(res))
}