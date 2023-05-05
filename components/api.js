//****************Загрузка с сервера***********************************

export function cards(){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
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
}


export function profileStart(){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me', {
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
}


//***************************************************



//**********************Отправка данных на сервер*****************************

export function profileServerSave(profileData){
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me', {
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
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('ошибка - ' + err);
  })
}



export function profileAvatarServerSave(avatSrc){
  const buttonSave = avatSrc.target.querySelector('.popup__button-save');
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatSrc.target.avatarImage.value   
    })
  })
  .finally(()=>{
    buttonSave.textContent = 'Сохранение...';
  })
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('ошибка - ' + err);
  })
}


//***************************************************

export function addCard(item){
  const buttonSave = item.target.querySelector('.popup__button-save');
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards', {
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
  .then(res =>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log('ошибка отпраки - ' + err);
  })
}

//***************************************************

export function delCard(cardId){
return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/' + cardId, {
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

  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/likes/' + cardId.id, {
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

  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-23/cards/likes/' + cardId.id, {
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