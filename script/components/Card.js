import Api from './Api.js';

import Popup from './Popup.js';

import {fetchUrl} from '../utils/constanta.js';

export default class Card{
  constructor(data){
    this._data = data;
  }
	_getElement(){ //заберает и копирует HTML разметку
		const elementTemplate = document
			.querySelector('#element')
			.content
			.querySelector('.element')
			.cloneNode(true);
		return	elementTemplate; //возарашает копию карточки и Node
	}
	_generate(profileId){ 
    this._element = this._getElement();

    const elementText = this._element.querySelector('.element__text');
    const elementImage = this._element.querySelector('.element__image');
    const buttonLike = this._element.querySelector('.element__button-like');
    const buttonDel = this._element.querySelector('.element__button-delete');
    const counter =  this._element.querySelector('.element__counter-like');

    this._element.id = this._data._id;


    if(this._data.owner._id === profileId){
      const del = new Api('/cards/' + this._element.id,
        'DELETE');
      buttonDel.addEventListener('click', function(event){
        del._serverSending()
        event.target.closest('.element').remove();
      })
    } else{
      buttonDel.setAttribute('disabled', true);
      buttonDel.classList.add('element__button-delete_disable'); 
    }

    elementText.textContent =  this._data.name;
    elementImage.alt = this._data.name;
    elementImage.src = this._data.link;

    if(!this._data.likes){
      counter.textContent = '0';
      }
    else{
      counter.textContent = this._data.likes.length;

      for (let i = 0; i < this._data.likes.length; i++) {
        if(this._data.likes[i]._id === profileId){
          buttonLike.classList.add('element__button-like_liked');
        }
      };
    }

    elementImage.addEventListener('click', this._zoomImage);/*??????*/
    
    //Обработчик лайка
    this._element.addEventListener('click', (evt)=>{
      if(evt.target.classList.contains('element__button-like')){
        if(!evt.target.classList.contains('element__button-like_liked')){
          const setLike =new Api('/cards/likes/' + this._element.id,
            'PUT')._serverSending()
            .then((data)=>{
              evt.target.closest('.element').querySelector('.element__counter-like').textContent = data.likes.length;
            })
            .then(()=>{
              evt.target.classList.toggle('element__button-like_liked')
            })
            .catch((err) => {
              console.log('ошибка - ' + err);
            })
        }
        else{
          const deletingLike = new Api('/cards/likes/' + this._element.id,
            'DELETE')._serverSending()
            .then((data)=>{
              evt.target.closest('.element').querySelector('.element__counter-like').textContent = data.likes.length;
            })
            .then(()=>{
              evt.target.classList.toggle('element__button-like_liked')
            })
            .catch((err) => {
              console.log('ошибка - ' + err);
            })
        } 
      }
    })

    return this._element
	}
  _zoomImage(event){    
    this._popupZoom = new Popup('#popup-zoom');

    const zoomImage = this._popupZoom._getElement().querySelector('.popup__zoom-in');
    const zoomDescript = this._popupZoom._getElement().querySelector('.popup__zoom-description');
    zoomImage.src = event.target.src
    zoomImage.alt = event.target.alt
    zoomDescript.textContent = event.target.alt

    this._popupZoom._handleOpenPopup();
  }
}