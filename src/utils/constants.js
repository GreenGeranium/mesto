export const cardContainerSelector = document.querySelector(".elements__list");

//кнопки
export const btnEditSection = document.querySelector(".profile__edit-button");
export const btnAddSection = document.querySelector(".profile__add-button");
export const btnAvatarChange = document.querySelector(
  ".profile__avatar-container"
);

//профиль
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__subline");
export const profileAvatar = document.querySelector(".profile__avatar");

// параметры валидации
export const validationConfiguration = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
