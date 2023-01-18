class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //закрытие по оверлею
    this._popup
      .querySelector(".popup__container")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });
    this._popup.addEventListener("click", () => {
      this.close();
    });

    //закрытие попапов по крестику
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
  }
}

export default Popup;
