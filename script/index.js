import '../style/pages/index.css';

import {enableValidation} from './validate.js';

import {ValidationSettings} from './utils/constanta.js';

import {profileName, profileDescription, profileAvatar} from './utils/constanta.js'

import {creatingInitialCards} from './listenerScript.js';

//♫♫♫♫♫♫

import Api from './components/Api.js';
import Card from './components/Card.js';

//♫♫♫♫♫♫

export let profileId = '123';

//♫♫♫♫♫♫
const ProfileData = new Api(
	'/users/me',
	'GET')._serverSending().then((value) => {
   	profileName.textContent = value.name;
   	profileDescription.textContent = value.about;
   	profileAvatar.src = value.avatar;
   	profileId = value._id;
 	})
 	.then(()=>{
	const card = new Api('/cards',
	'GET')._serverSending().then((value) => {
	   	value.reverse().forEach(creatingInitialCards);
   	})
 	})
 	.catch((err) => {
   	console.log('ошибка - ' + err);
  })

  enableValidation(ValidationSettings);