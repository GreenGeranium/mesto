//импорт классов и данных для карточек
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
import {
  popupImage,
  imageOfPopupImage,
  titleOfImagePopupImage,
  openPopup,
  closeByEsc,
  closePopup
} from "../utils/utils.js";

const btnEditSection = document.querySelector(".profile__edit-button");
const btnAddSection = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const buttonCloseList = document.querySelectorAll(".popup__close-button");
const formPopupEdit = popupEdit.querySelector(".form");
const formPopupAdd = popupAdd.querySelector(".form");
const nameInput = popupEdit.querySelector(".form__input_type_name");
const jobInput = popupEdit.querySelector(".form__input_type_profession");
const placeInput = popupAdd.querySelector(".form__input_type_place");
const linkInput = popupAdd.querySelector(".form__input_type_link");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__subline");
const cardContainer = document.querySelector(".elements__list");
const popups = document.querySelectorAll(".popup");
const validators = {};

// параметры валидации
const validationConfiguration = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

//валидация каждой формы
function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => {
    const validator = new FormValidator(selectors, form);
    const nameOfForm = form.getAttribute("name");
    validators[nameOfForm] = validator;
    validator.enableValidation();
  });
}

//Добавление карточки
function addCard(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate);
  cardContainer.prepend(card.getView());
}

//обработчик отправки формы профиля
function handleSubmitEditForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

//обработчик отправки формы с карточкой
function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const cardFromPopup = {
    name: placeInput.value,
    link: linkInput.value,
  };
  addCard(cardFromPopup, "#card-template");
  closePopup(popupAdd);
  evt.target.reset();
}

//добавление всех карточек из массива с данными
initialCards.reverse().forEach((item) => {
  addCard(item, "#card-template");
});

//закрытие попапов по крестику
buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

enableValidation(validationConfiguration);

//открытие профиля по кнопке
btnEditSection.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
  validators["profile-edit"].disableSaveButton();
});

//открытие формы с добавлением карточки
btnAddSection.addEventListener("click", () => {
  openPopup(popupAdd);
  validators["card-add"].disableSaveButton();
});

formPopupEdit.addEventListener("submit", (evt) => {
  handleSubmitEditForm(evt);
});

formPopupAdd.addEventListener("submit", (evt) => {
  handleSubmitAddForm(evt);
});

//закрытие по оверлею
popups.forEach((popup) => {
  popup.querySelector(".popup__container").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  popup.addEventListener("click", () => {
    closePopup(popup);
  });
});
