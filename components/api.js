import {profileName, profileDescription, profileAvatar} from './lib.js';

import {creatingInitialCards, createСard} from './card.js';

import {closePopup} from './modal.js';

//****************Загрузка с сервера***********************************

export function cards(){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.reverse().forEach(creatingInitialCards)
    })
}
cards();


export function profile(){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me', {
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.src = result.avatar;
    }); 
}
profile();

//***************************************************



//**********************Отправка данных на сервер*****************************

export function profileServerSave(profileData){
  const buttonSave = profileData.target.querySelector('.popup__button-save');
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileData.target.name.value,
      about: profileData.target.description.value
    })
  })
  .finally(()=>{
    debugger;
    buttonSave.textContent = 'Сохранение...';
  })
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(()=>closePopup(profileData)) 
}



export function profileAvatarServerSave(avatSrc){
  const buttonSave = avatSrc.target.querySelector('.popup__button-save');
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatSrc.value    
    })
  })
  .finally(()=>{
    debugger;
    buttonSave.textContent = 'Сохранение...';
  })
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(()=>closePopup(avatSrc)) 
}


//***************************************************

export function addCard(item){
  const buttonSave = item.target.querySelector('.popup__button-save');
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    method: 'POST',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: item.target.querySelector('#placeName').value,
      link: item.target.querySelector('#placeImage').value,    
    })
  })
  .finally(()=>{
    debugger;
    buttonSave.textContent = 'Сохранение...';
  })
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data)=>{
    creatingInitialCards(data);
  })
  .then(()=>closePopup(item))
  .catch((err) => {
    console.log('ошибка отпраки - ' + err);
  })
}

//***************************************************

export function delCard(cardId){
fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/' + cardId, {
    method: 'DELETE',
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
  .catch((err) => {
    console.log('ошибка удаления - ' + err); 
  }); 
}
//***************************************************



//***************************ЛАЙКИ************************

export function setLike(cardId){

  const counterLike = cardId.querySelector('.element__counter-like');

  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/likes/' + cardId.id, {
      method: 'PUT',
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
  .then((data)=>{
    counterLike.textContent = data.likes.length;
  })
}

export function delLike(cardId){

  const counterLike = cardId.querySelector('.element__counter-like');

  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/likes/' + cardId.id, {
      method: 'DELETE',
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
  .then((data)=>{
    counterLike.textContent = data.likes.length;
  })
}

//***************************************************