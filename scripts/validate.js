// параметры валидации
const validationConfiguration = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Появляется красная линия ошибки
function showInputError(selectors, form, inputElement, errorMessage) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

//Исчезает красная линия ошибки
function hideInputError(selectors, form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
}

//проверка на валидность
function checkInputValidity(selectors, form, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(selectors, form, inputElement);
  } else {
    showInputError(
      selectors,
      form,
      inputElement,
      inputElement.validationMessage
    );
  }
}

//навешивание слушателей на каждый инпут

function setEventListeners(selectors, form) {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const submitButton = form.querySelector(selectors.submitButtonSelector);
  toggleSaveButtonState(selectors, inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(selectors, form, e.target);
      toggleSaveButtonState(selectors, inputList, submitButton);
    });
  });
}

//проверка всех полей инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//изменение состояния кнопки
function toggleSaveButtonState(selectors, inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(selectors.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(selectors.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => {
    setEventListeners(selectors, form);
  });
}
