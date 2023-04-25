import { createError } from "./createError.js"
import { removeError } from "./removeError.js"

let inputTitle = form.querySelector('.form-input-title')
let inputAuthor = form.querySelector('.form-author')
let textAreaDescription = form.querySelector('.form-description')


export function validateInputTitle() {
    removeError(inputTitle)
    if (symbolChek(inputTitle) && maxMinLengthCheck(inputTitle, 25, 2)) {
        symbolChek(inputTitle)
        maxMinLengthCheck(inputTitle, 25, 2)

        return true


    } else {
        return false
    }

}

export function validateDescription(){
    if (maxMinLengthCheck(textAreaDescription, 333, 0)) {
        maxMinLengthCheck(textAreaDescription, 333, 0)

        return true
    } else {
        return false
    }
}
export function validateInputAuthor() {

    if (symbolChek(inputAuthor) && maxMinLengthCheck(inputAuthor, 12, 2)) {
        symbolChek(inputAuthor)
        maxMinLengthCheck(inputAuthor, 12, 2)

        return true
    } else {
        return false
    }

}


export function symbolChek(input) {

    if (!/[!@#$%^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.value)) {
        removeError(input)

        return true

    } else {
        removeError(input)
        createError(input, 'Можно использовать только:  _  . ( )  символы.')

        return false

    }

}






export function maxMinLengthCheck(input, mLen, minLen) {
    removeError(input)

    if (input.value.length > mLen) {
        removeError(input)
        createError(input, `Максимальное колличество знаков: ${mLen}`)
        return false

    }
    else if (minLen > input.value.length) {
        removeError(input)

        createError(input, `Минимальное колличество знаков: ${minLen}`)
        return false



    } else {
        return true

    }
}