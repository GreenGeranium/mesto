const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__subline');
//const likeBtn = document.querySelectorAll('.card__button');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup()
}

/* for (let i = 0; i < likeBtn.length; i++) {
  likeBtn[i].addEventListener('click', function () {
    likeBtn[i].classList.toggle('card__button_active');
  });
} */



editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formProfile.addEventListener('submit', formSubmitHandler);
/* formProfile.addEventListener('click', formSubmitHandler);
 *//* document.addEventListener('keypress', function (evt) {
  if (evt.key === 'Enter') {
    formSubmitHandler(evt);
    closePopup();
  }
}) */
