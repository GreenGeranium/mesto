import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setCardId(card) {
    this._cardId = card;
  }

  setCardTemplate(cardTemplate) {
    this._cardTemplate = cardTemplate;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardTemplate);
    });
  }
}

export default PopupWithConfirmation;
