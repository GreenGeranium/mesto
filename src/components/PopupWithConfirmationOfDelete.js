import PopupWithForm from "./PopupWithForm.js";

class PopupWithConfirmationOfDelete extends PopupWithForm {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
  }

  _handleDeleteCard() {
    this._handleDeleteCard();
  }
}

export default PopupWithConfirmationOfDelete;
