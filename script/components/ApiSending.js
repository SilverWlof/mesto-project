import Api from './Api.js';

import {authorization} from '../utils/constanta.js';

export default class ApiSending extends Api{
	constructor(fetchUrl, method){
		super(fetchUrl, method);
	}
	_sendingAvatar(element){
		this._element = element;
		return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23' + this._url, {
			method: this._method,
	    headers: {
	      authorization: authorization,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
      	avatar: this._element.target.avatarImage.value 
  		})
  	})
  	.then(res =>{
	    if(res.ok){
	      return res.json();
	    }
	    return Promise.reject(`Ошибка: ${res.status}`);
	  })
	}
	_sendingProfile(element){
		this._element = element;
		return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23' + this._url, {
			method: this._method,
	    headers: {
	      authorization: authorization,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
      	name: this._element.target.name.value,
      	about: this._element.target.description.value
  		})
  	})
  	.then(res =>{
	    if(res.ok){
	      return res.json();
	    }
	    return Promise.reject(`Ошибка: ${res.status}`);
	  })
	}
	_sendingCard(element){
		this._element = element;
		return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23' + this._url, {
			method: this._method,
	    headers: {
	      authorization: authorization,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
      	name: this._element.target.placeName.value,
      	link: this._element.target.placeImage.value
  		})
  	})
  	.then(res =>{
	    if(res.ok){
	      return res.json();
	    }
	    return Promise.reject(`Ошибка: ${res.status}`);
	  })
	}
}