import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    this._popup.querySelector(".popup__image").src = this._link;
    this._popup.querySelector(".popup__image").alt = this._name;
    this._popup.querySelector(".popup__subline").textContent = this._name;
    super.open();
  }
}

export default PopupWithImage;
