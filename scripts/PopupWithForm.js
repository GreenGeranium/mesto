import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    const inputList = Array.from(this._popup.querySelectorAll("input"));
    inputList.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      },
      { once: true }
    );
  }

  close() {
    super.close();
    if (this._popup.classList.contains("popup_add")) {
      this._popup.querySelector(".form").reset();
    }
  }
}

export default PopupWithForm;
