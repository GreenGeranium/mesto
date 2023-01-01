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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //изменение состояния кнопки
  _toggleSaveButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  //навешивание слушателей на каждый инпут
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleSaveButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._form);
        this._toggleSaveButtonState(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
