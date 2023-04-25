export function createError(input, text) {
    let parent = input.parentNode
    let eror = parent.querySelector('.error-lable')
    eror.style.opacity = "1";
    eror.textContent = text

    // let errorLable = document.createElement('label')

    // errorLable.classList.add('error-lable')

    // errorLable.textContent = text
    // parent.append(errorLable)

    parent.classList.add('error')
}