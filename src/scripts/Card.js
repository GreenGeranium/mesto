class Card {
  constructor(card, cardTemplate, handleCardClick) {
    this._cardTemplate = cardTemplate;
    this._newCard = this._getTemplateCard();
    this._name = card.name;
    this._link = card.link;
    this._likeButton = this._newCard.querySelector(".card__button");
    this._deleteButton = this._newCard.querySelector(".card__trash");
    this._cardImage = this._newCard.querySelector(".card__image");
    this._handleCardClick = handleCardClick;
  }

  //Получение клона карточки
  _getTemplateCard() {
    const card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return card;
  }

  //Установка значений имени и источника для картчки
  _setData() {
    this._newCard.querySelector(".card__name").textContent = this._name;
    this._cardImage.src = this._link;
    //console.log(`<%=require('${this._link}')%>`);
    //this._cardImage.src = `<%=require('${this._link}')%>`;
    this._cardImage.alt = this._name;
  }

  //Удаление карточки
  _handleDelete() {
    this._newCard.remove();
    this._newCard = null;
  }

  //Проставление лайка
  _handleLike() {
    this._likeButton.classList.toggle("card__button_active");
  }

  //Установка слушателей
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  //Получение видимой карточки на выходе
  getView() {
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

export default Card;
