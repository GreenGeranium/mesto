import "../pages/index.css";
//импорт классов и данных для карточек
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmationOfDelete from "../components/PopupWithConfirmationOfDelete.js";
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
let profileId;
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
    profileId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

//создание попапа подтверждения удаления карточки
const popupDeleteConfirmation = new PopupWithConfirmationOfDelete({
  popupSelector: ".popup_confirmation",
  handleFormSubmit: (cardId, cardTemplate) => {
    api.handleDeleteCard(cardId);
    cardTemplate.remove();
  },
});

//создание карточки
function createCard(item, cardTemplate = "#card-template", handleCardClick) {
  function handleTrashClick(cardId, cardTemplate) {
    popupDeleteConfirmation.open();
    popupDeleteConfirmation.setCardId(cardId);
    popupDeleteConfirmation.setCardTemplate(cardTemplate);
  }
  const card = new Card(
    item,
    "#card-template",
    handleCardClick,
    handleTrashClick,
    profileId
  );
  const cardElement = card.getView();
  return cardElement;
}

//создание секции для карточек
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item, "#card-template", () => {
      popupImage.open(item.name, item.link);
    });
    cardList.addItem(card);
  },
  containerSelector: cardContainerSelector,
});

//получение карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

//получение информации о профиле
const profileInfo = new UserInfo({
  nameOfProfileSelector: ".profile__name",
  professionOfProfileSelector: ".profile__subline",
});

//создание попапа с добавлением карточки
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    api
      .addNewCard(formData["card-name"], formData["card-link"])
      .then((data) => {
        console.log(data);
        const card = createCard(data, "#card-template", () => {
          popupImage.open(data.name, data.link);
        });
        cardList.addItem(card);
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.log(err));
  },
});

//создание попапа с картинкой
const popupImage = new PopupWithImage(".popup_image");

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

popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDeleteConfirmation.setEventListeners();
enableValidation(validationConfiguration);
