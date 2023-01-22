import "../pages/index.css";
//импорт классов и данных для карточек
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardContainerSelector,
  initialCards,
  btnAddSection,
  btnEditSection,
  validationConfiguration,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";

const validators = {};

//получение информации о профиле
const profileInfo = new UserInfo({
  nameOfProfileSelector: ".profile__name",
  professionOfProfileSelector: ".profile__subline",
});

//создание карточки
function createCard(item, cardTemplate = "#card-template", handleCardClick) {
  const card = new Card(item, "#card-template", handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

//создание попапа с добавлением карточки
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    const card = createCard(
      { name: formData["card-name"], link: formData["card-link"] },
      "#card-template",
      () => {
        popupImage.open(formData["card-name"], formData["card-link"]);
      }
    );
    cardList.addItem(card);
  },
});

popupAdd.setEventListeners();

//создание попапа с изменением профиля
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (formData) => {
    profileInfo.setUserInfo({
      newName: formData["profile-name"],
      newProfession: formData["profile-profession"],
    });
  },
});

popupEdit.setEventListeners();

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

//создание попапа с картинкой
const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

//добавление карточек в контейнер
export const cardList = new Section(
  {
    //добавление всех карточек из массива с данными
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = createCard(item, "#card-template", () => {
        popupImage.open(item.name, item.link);
      });
      cardList.addItem(card);
    },
  },
  cardContainerSelector
);

//открытие профиля по кнопке
btnEditSection.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputValues(profileInfo.getUserInfo());
  validators["profile-edit"].disableSaveButton();
});

//открытие формы с добавлением карточки
btnAddSection.addEventListener("click", () => {
  popupAdd.open();
  validators["card-add"].disableSaveButton();
});

cardList.renderItems();
enableValidation(validationConfiguration);
