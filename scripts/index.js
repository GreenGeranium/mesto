const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const formProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__text_input_name");
const jobInput = document.querySelector(".popup__text_input_profession");
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
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".elements__list");
const cardElement = cardTemplate
  .querySelector(".elements__item")
  .cloneNode(true);

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
formProfile.addEventListener("submit", formSubmitHandler);

initialCards.forEach((card) => {
  const cardDefault = cardElement.cloneNode(true);
  cardDefault.querySelector(".card__name").textContent = card.name;
  cardDefault.querySelector(".card__image").src = card.link;
  cardContainer.append(cardDefault);
});
