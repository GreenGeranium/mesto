import "../pages/index.css";
//импорт классов и данных для карточек
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardContainerSelector,
  btnAddSection,
  btnEditSection,
  validationConfiguration,
  profileName,
  profileDescription,
  profileAvatar,
  btnAvatarChange,
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

//создание секции для карточек
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item, "#card-template");
    cardList.addItem(card);
  },
  containerSelector: cardContainerSelector,
});

//получение карточек с сервера и установление имени и описания профиля
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    profileId = userData._id;
    cardList.renderItems(cardsData.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

//получение информации о профиле
const profileInfo = new UserInfo({
  nameOfProfileSelector: ".profile__name",
  professionOfProfileSelector: ".profile__subline",
});

//обработчик клика на корзину
function handleTrashClick(cardId, card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setCardId(cardId);
  popupDeleteConfirmation.setCardTemplate(card);
}

//обработчик клика по карточке
function handleCardClick(item) {
  popupImage.open(item.name, item.link);
}

//Пытался функции обработки лайка и удаление лайка вынести за функцию создания карточки,
//но в таком случае невозможно обратиться к методам card

//создание карточки
function createCard(item, cardTemplate = "#card-template") {
  const card = new Card(
    item,
    "#card-template",
    handleCardClick,
    handleTrashClick,
    profileId,
    handleAddingLike,
    handleRemovingLike
  );

  //обработчик удаления лайка
  function handleRemovingLike(cardData, likes, likeButton) {
    api
      .removeLike(cardData._id)
      .then((data) => {
        console.log(data);
        card.setLikes(data.likes);
        likeButton.classList.remove("card__button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик добавления лайка
  function handleAddingLike(cardData, likes, likeButton) {
    api
      .addLike(cardData._id)
      .then((data) => {
        console.log(data);
        likeButton.classList.add("card__button_active");
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const cardElement = card.getView();
  return cardElement;
}

//создание попапа подтверждения удаления карточки
const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_confirmation",
  handleFormSubmit: (cardId, card) => {
    api
      .handleDeleteCard(cardId)
      .then((data) => {
        console.log(data);
        popupDeleteConfirmation.close();
        card.remove();
      })
      .catch((err) => console.log(err));
  },
});

//создание попапа с добавлением карточки
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    popupAdd.renderLoading(true);
    api
      .addNewCard(formData["card-name"], formData["card-link"])
      .then((data) => {
        console.log(data);
        const card = createCard(data, "#card-template", () => {
          popupImage.open(data.name, data.link);
        });
        cardList.addItem(card);
        popupAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAdd.renderLoading(false);
      });
  },
});

//создание попапа с изменением профиля
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (formData) => {
    popupEdit.renderLoading(true);
    api
      .changeUserInfo(formData["profile-name"], formData["profile-profession"])
      .then((data) => {
        profileInfo.setUserInfo({
          newName: formData["profile-name"],
          newProfession: formData["profile-profession"],
        });
        console.log(data);
        popupEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEdit.renderLoading(false);
      });
  },
});

//создание попапа с картинкой
const popupImage = new PopupWithImage(".popup_image");

//создание попапа с изменением аватарки профиля
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: (formData) => {
    popupAvatar.renderLoading(true);
    api
      .changeProfileAvatar(formData["avatar-link"])
      .then((data) => {
        console.log(data);
        profileAvatar.src = data.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  },
});

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

//открытие попапа с изменением аватара
btnAvatarChange.addEventListener("click", () => {
  popupAvatar.open();
  validators["avatar-change"].disableSaveButton();
});

popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteConfirmation.setEventListeners();
enableValidation(validationConfiguration);

//TODO ДОБАВИТЬ СПИННЕР ДЛЯ АВАТАРКИ
