export const popupImage = document.querySelector(".popup_image");
export const imageOfPopupImage = popupImage.querySelector(".popup__image");
export const titleOfImagePopupImage =
  popupImage.querySelector(".popup__subline");

//открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

//закрытие попапа
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

//закрытие попапа по esc
export function closeByEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
