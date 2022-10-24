const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__subline');
const likeBtn = document.querySelectorAll('.elements__button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

for (let i = 0; i < likeBtn.length; i++) {
  likeBtn[i].addEventListener('click', function () {
    likeBtn[i].classList.toggle('elements__button_active');
  });
}

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('click', formSubmitHandler);
formElement.addEventListener('click', closePopup);

//При открытом попапе нажатие на клавишу “Enter” или кнопку «Сохранить» изменяет на странице информацию
//о пользователе.
