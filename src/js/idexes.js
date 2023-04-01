let deleteTaskMakeToDo = document.querySelector('.delete-task--make-todo')
let deleteTaskInProgress = document.querySelector('.delete-task--inprogress')
let addPopup = document.querySelector('.fa-plus')
let popup = document.querySelector('.popup')
let form = document.querySelector('.form')
let closedForm = document.querySelector('.fa-circle-xmark')
let formButtonts = document.querySelectorAll('.form-button')
let inputTitle = document.querySelector('.form-input-title')
let textAreaDescription = document.querySelector('.form-description')
let inputAuthor = document.querySelector('.form-author')
let listMakeToDo = document.querySelector('.column-list--maketodo')
let listInProgress = document.querySelector('.column-list--in-progress')
let totalMakeToDo = document.querySelector('.total-make-todo')

let totalInProgress = document.querySelector('.total-progress')
let totalDone = document.querySelector('.total-done')

let cancelForm = document.querySelector('.form-cancel')
let formCreate = document.querySelector('.form-create')


let arr1 = []
let arr2 = []
let arr3 = []

function GetMakeToDo(title, desc, author) {
    this.title = title;
    this.desc = desc;
    this.author = author;
    this.status = 1;
}

addPopup.addEventListener('click', popupToggle)
closedForm.addEventListener('click', popupToggle)
cancelForm.addEventListener('click', popupToggle)

function popupToggle() {
    popup.classList.toggle('popup-active')
    clearData([inputTitle, textAreaDescription, inputAuthor])

}
popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        popupToggle()

    }
})

form.addEventListener('submit', getData)

function getData(e) {
    e.preventDefault()

    let data = new GetMakeToDo(inputTitle.value, textAreaDescription.value, inputAuthor.value, 1)
    arr1.push(data)

    clearData([inputTitle, textAreaDescription, inputAuthor])

    showTask()

}


function showTask() {
    listMakeToDo.innerHTML = ''
    arr1.forEach((obj, idx) => {
        listMakeToDo.innerHTML += renderMakeToDo(obj, idx)
    })


    let inprogress = document.querySelectorAll('.inprogress')
    let deleteTaskCard = document.querySelectorAll('.delete-task--card')

    moveTaskInProgress(inprogress)
    deleteCardMakeToDo(deleteTaskCard)

    totalsNum(arr1, totalMakeToDo)
}

function moveTaskInProgress(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arr1.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    obj.status = 2
                    arr2.push(obj)
                    showTaskInProgress()
                    e.target.closest('.column-list-out').remove()
                    arr1.splice(idx, 1)
                    showTask()

                }
            })
        })
    })

}
function deleteCardMakeToDo(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arr1.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    e.target.closest('.column-list-out').remove()
                    arr1.splice(idx, 1)
                    showTask()
                }
            })
        })
    })
}

deleteTaskMakeToDo.addEventListener('click', () => {
    arr1 = []
    showTask()
})
deleteTaskInProgress.addEventListener('click', () => {
    arr2 = []
    showTaskInProgress()
    console.log(arr2);
    console.log(arr1);
})



function totalsNum(arr, total) {
    total.textContent = arr.length
}


function clearData(inputs) {
    inputs.forEach(input => {
        input.value = ''
    });
}

function renderMakeToDo(obj, idx) {
    return `<li class="column-list-out" data-taskid='${idx}'>
                <div class="column-list--title">
                    <span>ToDo</span>
                    <p>Data</p>
                </div>
                <div class="column-description">
                    <output class="column-description--title">${obj.title}</output>
                    <output class="column-description--desc">${obj.desc}</output>
                </div>
                <div class="column-author--main">
                    <output class="column-author">${obj.author}</output>
                    <div>
                        <button class="inprogress">IN PROGRESS</button>
                        <a class="delete-task--card"><i class="fa-sharp fa-solid fa-trash"></i></a>
                    </div>
                </div>
            </li>`
}

function showTaskInProgress() {
    listInProgress.innerHTML = ''
    arr2.forEach((obj, idx) => {
        listInProgress.innerHTML += renderInProgress(obj, idx)
    })
    let inDone = document.querySelectorAll('.indone')
    let deleteTaskCard = document.querySelectorAll('.delete-task--card')
    totalsNum(arr2, totalInProgress)

    moveTaskInDone(inDone)
    deleteCardInProgress(deleteTaskCard)

}
function moveTaskInDone(btns){
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arr2.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    obj.status = 3
                    arr3.push(obj)
                    e.target.closest('.column-list-out').remove()
                    arr2.splice(idx, 1)
                    showTaskInProgress()
                    console.log(arr3);

                }
            })
        })
    })
}

function deleteCardInProgress(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arr2.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    e.target.closest('.column-list-out').remove()
                    arr2.splice(idx, 1)
                    console.log(arr2);
                    showTaskInProgress()
                }
            })
        })
    })
}

function renderInProgress(obj, idx) {
    return `<li class="column-list-out" data-taskid='${idx}'>
        <div class="column-list--title">
            <span>ToDo</span>
            <p>Data</p>
        </div>
        <div class="column-description">
            <output class="column-description--title">${obj.title}</output>
            <output class="column-description--desc">${obj.desc}</output>
        </div>
        <div class="column-author--main">
            <output class="column-author">${obj.author}</output>
            <div>
                <button class="indone">IN DONE</button>
                <a class="delete-task--card"><i class="fa-sharp fa-solid fa-trash"></i></a>
            </div>
        </div>
    </li>`

}


