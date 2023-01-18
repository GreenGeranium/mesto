//импорт классов и данных для карточек
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import initialCards from "./cards.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import { cardContainerSelector } from "../utils/utils.js";

const btnEditSection = document.querySelector(".profile__edit-button");
const btnAddSection = document.querySelector(".profile__add-button");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__subline");
const validators = {};

const popupAdd = new Popup(".popup_add");
const popupEdit = new Popup(".popup_edit");
const formPopupAdd = document
  .querySelector(".popup_add")
  .querySelector(".form");
const placeInput = document
  .querySelector(".popup_add")
  .querySelector(".form__input_type_place");
const linkInput = document
  .querySelector(".popup_add")
  .querySelector(".form__input_type_link");
const formPopupEdit = document
  .querySelector(".popup_edit")
  .querySelector(".form");
const nameInput = document
  .querySelector(".popup_edit")
  .querySelector(".form__input_type_name");
const jobInput = document
  .querySelector(".popup_edit")
  .querySelector(".form__input_type_profession");

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

//добавление карточек в контейнер
const cardList = new Section(
  {
    //добавление всех карточек из массива с данными
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card(item, "#card-template");
      //Добавление карточки
      const cardElement = card.getView();
      cardList.addItem(cardElement);
    },
  },
  cardContainerSelector
);

cardList.renderItems();

//обработчик отправки формы профиля
function handleSubmitEditForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupEdit.close();
}

//обработчик отправки формы с карточкой
function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const cardFromPopup = {
    name: placeInput.value,
    link: linkInput.value,
  };
  addCard(cardFromPopup, "#card-template");
  popupAdd.close();
  evt.target.reset();
}

enableValidation(validationConfiguration);

//открытие профиля по кнопке
btnEditSection.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEdit.open();
  validators["profile-edit"].disableSaveButton();
});

//открытие формы с добавлением карточки
btnAddSection.addEventListener("click", () => {
  popupAdd.open();
  validators["card-add"].disableSaveButton();
});

formPopupEdit.addEventListener("submit", (evt) => {
  handleSubmitEditForm(evt);
});

formPopupAdd.addEventListener("submit", (evt) => {
  handleSubmitAddForm(evt);
});
