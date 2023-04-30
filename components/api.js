import {profileName, profileDescription, profileAvatar} from './lib.js';

import {creatingInitialCards} from './card.js';

export function cards(){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      result.forEach(creatingInitialCards);
    }); 
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

export function profileServerSave(profileData){
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileData.name.value,
      about: profileData.description.value
    })
  }); 
}
export function profileAvatarServerSave(avatSrc){
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatSrc.value    
    })
  });
}

export function addCard(name, link){
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
    method: 'POST',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      linl:link    
    })
  });
}