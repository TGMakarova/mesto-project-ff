// @todo: DOM узлы
//Перечень карточек
export const placesList = document.querySelector(".places__list"); //Перечень карточек

//DOM - элемент темплейт карточки


// DOM элементы карточек
 

//DOM- элементы профиля
export const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирования профиля
export const profileAddButton = document.querySelector(".profile__add-button"); //Кнопка добавления карточки
//export const profileAvatarButton = document.querySelector(".profile__avatar-button"); //Кнопка изменения аватара
export const profileInfo = document.querySelector(".profile__info"); // Находим форму в DOM
export const profileTitle = profileInfo.querySelector(".profile__title"); // Находим поле имени формы в DOM
export const profileDescription = profileInfo.querySelector(".profile__description"); //Находим поле занятия в DOM
export const profileImage = document.querySelector(".profile__image"); //Находим поле изображение в DOM

//DOM -элементы попапа редактирования профиля
export const popup = document.querySelector(".popup");
export const popupTypeEdit = document.querySelector(".popup_type_edit"); //Редактирование попапа
export const popupTypeEditClose = popupTypeEdit.querySelector(".popup__close"); //Закрытие попапа редактирования профиля

//DOM - элементы попапа редактирования карточек
export const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // Редактирование новой карточки попапа
export const popupTypeNewCardClose = popupTypeNewCard.querySelector(".popup__close"); //Закрытие попапа редактирования новой карточки

//DOM - элементы попапа редактирования изображений
export const popupTypeImageClose = document.querySelector(".popup_type_image .popup__close"); //Закрытите попапа по изображению
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupImage = popupTypeImage.querySelector(".popup__image");
export const popupCaption = popupTypeImage.querySelector(".popup__caption");

//DOM  - элементы редактирования аватара
export const popupTypeAvatar = document.querySelector(".popup_type_avatar"); // Редактирование  попапа аватара
export const popupTypeAvatarClose = popupTypeAvatar.querySelector(".popup__close"); //Закрытие  попапа аватара
export const popupTypeAvatarInput = document.querySelector(".popup__input .popup__input_type_url .popup__url");
//export const popupAvatarButton = popupTypeAvatar.querySelector(".popup__close");
//DOM - эементы попапа для инпутов

