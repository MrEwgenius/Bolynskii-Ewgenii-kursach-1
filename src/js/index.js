let deleteTask = document.querySelectorAll('.delete-task')
let addPopup = document.querySelector('.fa-plus')
let popup = document.querySelector('.popup')
let form = document.querySelector('.form')
let closedForm = document.querySelector('.fa-circle-xmark')
let formButtonts = document.querySelectorAll('.form-button')
let inputTitle = document.querySelector('.form-input-title')
let inputDescription = document.querySelector('.form-description')
let inputAuthor = document.querySelector('.form-author')
let ulList = document.querySelector('.column-list--main')
let totalMakeToDo = document.querySelector('.total-make-todo')
let totalInProgress = document.querySelector('.total-progress')
let totalDone = document.querySelector('.total-done')
let deleteTaskCard = document.querySelectorAll('.delete-task--card')


let arr1 = []
let arr2 = []
let arr3 = []


addPopup.addEventListener('click', popupToggle)
closedForm.addEventListener('click', popupToggle)

function popupToggle() {
    popup.classList.toggle('popup-active')
    createInput()

}
function createInput() {
    inputTitle.value = ''
    inputDescription.value = ''
    inputAuthor.value = ''

}

function Sbjects(title, desc, author) {
    this.title = title;
    this.desc = desc;
    this.author = author
}
let task = new Sbjects(inputTitle.value, inputDescription.value, inputAuthor.value);





deleteTask.forEach((el) => {
    el.addEventListener('click', (e) => {
        console.log(e.target);


    })
})

popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        popupToggle()

    }
})
formButtonts.forEach((elem) => {
    elem.addEventListener('click', (e) => {

        e.preventDefault()
        if (e.target.classList.contains('form-create')) {
            let task = new Sbjects(inputTitle.value, inputDescription.value, inputAuthor.value);
            ulList.innerHTML += addTask()
            arr1.push(task)
            totalsNum(arr1, totalMakeToDo)
            popupToggle()
            createInput()

        } else {
            popupToggle()

        }
        deleteCard()

    })
})



function addTask() {

    return `<li class="column-list-out" data-id="">
    <div class="column-list--title">
        <span>ToDo</span>
        <p>Data</p>
    </div>
    <div class="column-description">
        <output class="column-description--title">${inputTitle.value}</output>
        <output class="column-description--desc">${inputDescription.value}</output>
    </div>
    <div class="column-author--main">
        <output class="column-author">${inputAuthor.value}</output>
        <a class="delete-task--card"><i class="fa-sharp fa-solid fa-trash"></i></a>

    </div>
</li>`
}

function totalsNum(arr, total) {
    total.textContent = arr.length
}


function deleteCard() {
    let deleteTaskCard = document.querySelectorAll('.delete-task--card')
    deleteTaskCard.forEach((card,idx) => {
        card.addEventListener('click', (e) => {
            let delArr = e.target.closest(".column-list-out").remove()
            arr1.splice(idx,1)
            totalsNum(arr1, totalMakeToDo)
            console.log(arr1);
        })
    })

}