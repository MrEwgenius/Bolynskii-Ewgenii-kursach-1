export function removeError(input) {
    // let parent = input.parentNode
    // if (parent.classList.contains('error')) {

    //     parent.querySelector('.error-lable').remove()
    // }
    
    let parent = input.parentNode
    let eror = parent.querySelector('.error-lable')
    
    eror.textContent = 'Error'
    parent.classList.remove('error')
    eror.style.opacity = "0";


}