class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //Появляется красная линия ошибки
  _showInputError(inputElement, form, errorMessage) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Исчезает красная линия ошибки
  _hideInputError(inputElement, form) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  //проверка на валидность
  _checkInputValidity(inputElement, form) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, form);
    } else {
      this._showInputError(inputElement, form, inputElement.validationMessage);
    }
  }

  //проверка всех полей инпута
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //изменение состояния кнопки
  _toggleSaveButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  //навешивание слушателей на каждый инпут
  _setEventListeners() {
    this._toggleSaveButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._form);
        this._toggleSaveButtonState();
      });
    });
  }

  //Отключение кнопки сохранения формы
  disableSaveButton(popup) {
    const button = popup.querySelector(this._submitButtonSelector);
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
