//****************Загрузка с сервера***********************************
import {authorization} from '../utils/constanta.js';

export default class Api{
	constructor(fetchUrl, method){
		this._url = fetchUrl;
		this._method = method;		
	}
	_serverSending(){
		return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23' + this._url, {
			method: this._method,
	    headers: {
	      authorization: authorization
	    }
  	})
  	.then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  	})
	}
}