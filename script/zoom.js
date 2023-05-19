import {zoomImage, zoomDescript, popupZoom} from './lib.js';

import {openPopup} from "./modal.js";


export function zoomingImage(event){
		zoomImage.src = event.target.src
		zoomImage.alt = event.target.alt
		zoomDescript.textContent = event.target.alt
		openPopup(popupZoom);
	}