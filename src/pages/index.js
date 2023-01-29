import "../pages/index.css";
//импорт классов и данных для карточек
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardContainerSelector,
  btnAddSection,
  btnEditSection,
  validationConfiguration,
  profileName,
  profileDescription,
  profileAvatar,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import userInfo from "../components/UserInfo.js";
const validators = {};

//создание инстанса api для запросов на сервер
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "a1cc8da9-0d2e-4557-86c3-213f2f44f274",
    "Content-Type": "application/json",
  },
});

//установление имени и описания профиля
api
  .getUserInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

//получение карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    const cardList = new Section(
      {
        //добавление всех карточек из массива с данными
        items: data,
        renderer: (item) => {
          const card = createCard(item, "#card-template", () => {
            popupImage.open(item.name, item.link);
          });
          cardList.addItem(card);
        },
      },
      cardContainerSelector
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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

//создание попапа с изменением профиля
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (formData) => {
    api
      .changeUserInfo(formData["profile-name"], formData["profile-profession"])
      .then((data) => {
        profileInfo.setUserInfo({
          newName: formData["profile-name"],
          newProfession: formData["profile-profession"],
        });
        console.log(data);
      });
  },
});

popupEdit.setEventListeners();
popupAdd.setEventListeners();

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

enableValidation(validationConfiguration);
