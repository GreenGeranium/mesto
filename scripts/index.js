const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const closeBtnEdit = popupEdit.querySelector(".popup__close-button");
const closeBtnAdd = popupAdd.querySelector(".popup__close-button");
const formPopupEdit = popupEdit.querySelector(".popup__form");
const formPopupAdd = popupAdd.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__text_input_name");
const jobInput = popupEdit.querySelector(".popup__text_input_profession");
const placeInput = popupAdd.querySelector(".popup__text_input_place");
const linkInput = popupAdd.querySelector(".popup__text_input_link");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__subline");
const initialCards = [
  {
    name: "Москва",
    link: "./images/moscow.jpg",
  },
  {
    name: "Иваново",
    link: "./images/ivanovo.jpg",
  },
  {
    name: "Суздаль",
    link: "./images/suzdal.jpg",
  },
  {
    name: "Йошкар-Ола",
    link: "./images/Город_Йошкар-Ола_Марий_Эл_8.jpg",
  },
  {
    name: "Казань",
    link: "./images/Мечеть_Кул_Шариф_02,_2009.jpg",
  },
  {
    name: "Кострома",
    link: "./images/kostroma.jpg",
  },
];
const cardContainer = document.querySelector(".elements__list");

function addCard(place, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".card__name").textContent = place;
  cardElement.querySelector(".card__image").src = link;
  cardElement
    .querySelector(".card__button")
    .addEventListener("click", (like) =>
      like.target.classList.toggle("card__button_active")
    );
  cardElement.querySelector(".card__trash").addEventListener("click", () => {
    cardElement.remove();
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (event) => {
      openPopup(popupImage);
    });
  cardContainer.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt, popup) {
  evt.preventDefault();
  if (popup === popupEdit) {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
  } else if (popup === popupAdd) {
    addCard(placeInput.value, linkInput.value);
    placeInput.value = "";
    linkInput.value = "";
  }
  closePopup(popup);
}

initialCards.reverse().forEach((item) => {
  addCard(item.name, item.link);
});
editBtn.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
addBtn.addEventListener("click", () => openPopup(popupAdd));
closeBtnEdit.addEventListener("click", () => closePopup(popupEdit));
closeBtnAdd.addEventListener("click", () => closePopup(popupAdd));
formPopupEdit.addEventListener("submit", (evt) =>
  formSubmitHandler(evt, popupEdit)
);
formPopupAdd.addEventListener("submit", (evt) => {
  formSubmitHandler(evt, popupAdd);
});
