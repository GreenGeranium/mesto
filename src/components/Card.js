class Card {
  constructor(
    card,
    cardTemplate,
    handleCardClick,
    handleTrashClick,
    profileId,
    handleAddingLike,
    handleRemovingLike
  ) {
    this._cardTemplate = cardTemplate;
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes.length;
    this._cardId = card._id;
    this._profileId = profileId;
    this._ownerId = card.owner._id;
    this._newCard = this._getTemplateCard();
    this._likeButton = this._newCard.querySelector(".card__button");
    this._deleteButton = this._newCard.querySelector(".card__trash");
    this._cardImage = this._newCard.querySelector(".card__image");
    this._numberOfLikes = this._newCard.querySelector(".card__likes-quantity");
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleAddingLike = handleAddingLike;
    this._handleRemovingLike = handleRemovingLike;
  }

  //появление урны только у собственных карточек
  _showTrashIcon() {
    if (this._ownerId === this._profileId) {
      this._deleteButton.style.display = "block";
    }
  }

  //Получение клона карточки
  _getTemplateCard() {
    const card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return card;
  }

  //установка значения лайков карточки
  _setLikes() {
    this._numberOfLikes.textContent = this._likes;
    this._card.likes.forEach((cardLiker) => {
      if (cardLiker._id === this._profileId) {
        this._likeButton.classList.add("card__button_active");
      }
    });
  }

  //Установка значений имени и источника для картчки
  _setData() {
    this._newCard.querySelector(".card__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  //Проставление лайка
  _handleLike() {
    if (this._likeButton.classList.contains("card__button_active")) {
      this._likeButton.classList.remove("card__button_active");
      this._handleRemovingLike(this._card, this._numberOfLikes);
    } else {
      this._likeButton.classList.add("card__button_active");
      this._handleAddingLike(this._card, this._numberOfLikes);
    }
  }

  //Установка слушателей
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleTrashClick(this._cardId, this._newCard);
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
    this._showTrashIcon();
    this._setData();
    this._setLikes();
    this._setEventListeners();
    return this._newCard;
  }
}

export default Card;
