// Появляется красная линия ошибки
function showInputError(form, inputElement, errorMessage) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

//Исчезает красная линия ошибки
function hideInputError(form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

//проверка на валидность
function checkInputValidity(form, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(form, inputElement);
  } else {
    showInputError(form, inputElement, inputElement.validationMessage);
  }
}

//навешивание слушателей на каждый инпут

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(form, e.target);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((form) => {
    setEventListeners(form);
  });
}

enableValidation();
