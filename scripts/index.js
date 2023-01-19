//импорт классов и данных для карточек
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import initialCards from "./cards.js";
import PopupWithForm from "./PopupWithForm.js";
import {
  cardContainerSelector,
  nameProfile,
  jobProfile,
} from "../utils/utils.js";

//переменные
const btnEditSection = document.querySelector(".profile__edit-button");
const btnAddSection = document.querySelector(".profile__add-button");
const validators = {};
export const nameInput = document
  .querySelector(".popup_edit")
  .querySelector(".form__input_type_name");
export const jobInput = document
  .querySelector(".popup_edit")
  .querySelector(".form__input_type_profession");

//создание попапа с добавлением карточки
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    const card = new Card(
      { name: formData["card-name"], link: formData["card-link"] },
      "#card-template"
    );
    const cardElement = card.getView();
    cardList.addItem(cardElement);
  },
});

//создание попапа с изменением профиля
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (formData) => {
    nameProfile.textContent = formData["profile-name"];
    jobProfile.textContent = formData["profile-profession"];
  },
});

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
export const cardList = new Section(
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

cardList.renderItems();
enableValidation(validationConfiguration);
