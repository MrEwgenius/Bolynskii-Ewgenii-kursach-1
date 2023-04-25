import { disableScroll } from "./disableScroll.js"
let popup = document.querySelector('.popup')

export function popupFormToggle() {
    popup.classList.toggle('popup-active')//
    disableScroll()// убираем горизонтальный скролл при активном PopUp

}