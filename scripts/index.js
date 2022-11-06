const btnEditSection = document.querySelector(".profile__edit-button");
const btnAddSection = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const imageOfPopupImage = popupImage.querySelector(".popup__image");
const titleOfImagePopupImage = popupImage.querySelector(".popup__subline");
const buttonCloseList = document.querySelectorAll(".popup__close-button");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__text_input_name");
const jobInput = popupEdit.querySelector(".popup__text_input_profession");
const placeInput = popupAdd.querySelector(".popup__text_input_place");
const linkInput = popupAdd.querySelector(".popup__text_input_link");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__subline");
const cardContainer = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".card__name").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement
    .querySelector(".card__button")
    .addEventListener("click", (like) =>
      like.target.classList.toggle("card__button_active")
    );
  cardElement.querySelector(".card__trash").addEventListener("click", () => {
    cardElement.remove();
  });
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openPopup(popupImage);
    imageOfPopupImage.src = cardData.link;
    titleOfImagePopupImage.textContent = cardData.name;
    imageOfPopupImage.alt = cardData.name;
  });
  cardContainer.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
btnAddSection.addEventListener("click", () => openPopup(popupAdd));
formPopupEdit.addEventListener("submit", (evt) => {
  handleSubmitEditForm(evt);
});
formPopupAdd.addEventListener("submit", (evt) => {
  handleSubmitAddForm(evt);
});
