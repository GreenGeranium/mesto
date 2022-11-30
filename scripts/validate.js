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
function showInputError(formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

//Исчезает красная линия ошибки
function hideInputError(formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

//проверка на валидность
function checkInputValidity(formSelector, inputSelector) {
  if (inputSelector.validity.valid) {
    hideInputError(formSelector, inputSelector);
  } else {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  }
}

//навешивание слушателей на каждый инпут

function setEventListeners(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll(".form__input"));
  const submitButtonSelector = formSelector.querySelector(".form__save-button");
  toggleSaveButtonState(inputList, submitButtonSelector);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", (e) => {
      checkInputValidity(formSelector, e.target);
      toggleSaveButtonState(inputList, submitButtonSelector);
    });
  });
}

//проверка всех полей инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//изменение состояния кнопки
function toggleSaveButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add("form__save-button_disabled");
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove("form__save-button_disabled");
    submitButtonSelector.disabled = false;
  }
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
  });
}
