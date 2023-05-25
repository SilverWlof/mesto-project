export default class Popup{
	constructor(selector){
		this._selector = selector;
	}
	_getElement() {
		this._element = document.querySelector(this._selector);
		return this._element;
  }

	_handleOpenPopup() {				
		const esc = new Popup('.popup_opened')._closeByEscape;
	 	this._getElement().classList.add('popup_opened');
	 	document.addEventListener('keydown', esc);
  }

  _handleClosePopup() {		
  	const esc = new Popup('.popup_opened')._closeByEscape;
	 	this._getElement().classList.remove('popup_opened');
	 	document.removeEventListener('keydown', esc);
  }

  _closeByEscape(){
  	const esc = new Popup('.popup_opened');	
	  if (event.key === 'Escape') {	
	   	esc._handleClosePopup();
	  }
	}
}