import '../pages/index.css';

import createCard from "./listenerScript.js";

import {receivingСards, receivingProfile} from './api.js';

import {profileName, profileDescription, profileAvatar} from './lib.js'

import {creatingInitialCards} from './listenerScript.js';

export let profileId = '123';

receivingProfile()	
	.then((value) => {
   	profileName.textContent = value.name;
   	profileDescription.textContent = value.about;
   	profileAvatar.src = value.avatar;
   	profileId = value._id;
 	})
 	.then(()=>{
 		receivingСards().then((value) => {
   	value.reverse().forEach(creatingInitialCards)
   	})
 	})
 	.catch((err) => {
   	console.log('ошибка - ' + err);
  })