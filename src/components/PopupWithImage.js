import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageDescription = this._popup.querySelector(".popup__subline");
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageDescription.textContent = name;
  }
}

export default PopupWithImage;
