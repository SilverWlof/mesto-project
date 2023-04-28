function(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-23/cards', {
    headers: {
      authorization: '6ad1c47f-6af4-42c4-b56f-bacd15588390'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
}