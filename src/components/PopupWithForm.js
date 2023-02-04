import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll("input"));
    this._form = this._popup.querySelector(".form");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popup.querySelector(".form__save-button").textContent =
        "Сохранение...";
    } else {
      this._popup.querySelector(".form__save-button").textContent = "Сохранить";
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
