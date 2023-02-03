export const cardContainerSelector = document.querySelector(".elements__list");

export const btnEditSection = document.querySelector(".profile__edit-button");
export const btnAddSection = document.querySelector(".profile__add-button");

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__subline");
export const profileAvatar = document.querySelector(".profile__avatar");

export const btnAvatarChange = document.querySelector(
  ".profile__avatar-container"
);

/*export const initialCards = [
  {
    name: "Москва",
    //link: "../images/moscow.jpg",
    link: "https://i.ibb.co/xSM9pSz/moscow.jpg",
  },
  {
    name: "Иваново",
    //link: "../images/ivanovo.jpg",
    link: "https://i.ibb.co/hMGk7Y6/ivanovo.jpg",
  },
  {
    name: "Суздаль",
    link: "https://i.ibb.co/wgnPcqm/suzdal.jpg",
    //link: "../images/suzdal.jpg",
  },
  {
    name: "Йошкар-Ола",
    link: "https://i.ibb.co/vZtQKks/8.jpg",
    //link: "../images/Город_Йошкар-Ола_Марий_Эл_8.jpg",
  },
  {
    name: "Казань",
    link: "https://i.ibb.co/ZKJrVvh/02-2009.jpg",
    //link: "../images/Мечеть_Кул_Шариф_02,_2009.jpg",
  },
  {
    name: "Кострома",
    link: "https://i.ibb.co/D9yMS3T/kostroma.jpg",
    //link: "../images/kostroma.jpg",
  },
];*/

// параметры валидации
export const validationConfiguration = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
