const btnEditSection = document.querySelector(".profile__edit-button");
const btnAddSection = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const imageOfPopupImage = popupImage.querySelector(".popup__image");
const titleOfImagePopupImage = popupImage.querySelector(".popup__subline");
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
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");

function addCard(cardData) {
  cardContainer.prepend(createCard(cardData));
}

function createCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__name").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement
    .querySelector(".card__button")
    .addEventListener("click", (like) =>
      like.target.classList.toggle("card__button_active")
    );
  cardElement.querySelector(".card__trash").addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    imageOfPopupImage.src = cardData.link;
    titleOfImagePopupImage.textContent = cardData.name;
    imageOfPopupImage.alt = cardData.name;
    openPopup(popupImage);
  });
  return cardElement;
}

function closeByEsc(event) {
  const popupOpened = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const cardFromPopup = {
    name: placeInput.value,
    link: linkInput.value,
  };
  addCard(cardFromPopup);
  closePopup(popupAdd);
  placeInput.value = "";
  linkInput.value = "";
}

initialCards.reverse().forEach((item) => {
  addCard(item);
});

buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

btnEditSection.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
});
btnAddSection.addEventListener("click", () => openPopup(popupAdd));
formPopupEdit.addEventListener("submit", (evt) => {
  handleSubmitEditForm(evt);
});
formPopupAdd.addEventListener("submit", (evt) => {
  handleSubmitAddForm(evt);
});

popups.forEach((popup) => {
  popup.querySelector(".popup__container").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  popup.addEventListener("click", (e) => {
    closePopup(popup);
  });
});

enableValidation(validationConfiguration);
