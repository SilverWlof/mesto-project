import Popup from './Popup.js';

class PopupImage extends Popup{
	constructor(data, selector){
		seuer(selector);
		this._link = data.src;
		this._alt = data.alt;
		this._name = data.name;
	}
	_handleOpenPopup() {
		super._handleOpenPopup(); 
	}
	 _handleClosePopup() {
	 	super._handleClosePopup(); 
	 }
}