import { renderMakeToDo, renderInProgress, renderDone } from "./render.js"
import { removeKeyLocalStorage, setKeyLocalStorage } from "./localestorage.js"
import { GetMakeToDo } from "./constructor.js"
import { arrClear, inputsClear } from "./clearInputsArrs.js"
import { totalsNumCard } from "./totalNumCard.js"
import { popupFormToggle } from "./formToggle.js"
import { setDate } from "./setDate.js"
import { removeError } from "./removeError.js"
import { validateInputTitle, validateInputAuthor, validateDescription } from "./just-validate.js"

let deleteTasksMakeToDo = document.querySelector('.delete-task--make-todo')
let deleteTasksInProgress = document.querySelector('.delete-task--inprogress')
let deleteTasksDone = document.querySelector('.delete-task--done')
let addPopup = document.querySelector('.fa-plus')
let popup = document.querySelector('.popup')
let form = document.querySelector('.form')
let closedForm = form.querySelector('.fa-circle-xmark')
let inputTitle = form.querySelector('.form-input-title')
let textAreaDescription = form.querySelector('.form-description')
let inputAuthor = form.querySelector('.form-author')
let headerDate = document.querySelector('.header-data')
let listMakeToDo = document.querySelector('.column-list--maketodo')
let listInProgress = document.querySelector('.column-list--in-progress')
let listDone = document.querySelector('.column-list--done')
let totalMakeToDo = document.querySelector('.total-make-todo')
let totalInProgress = document.querySelector('.total-progress')
let totalDone = document.querySelector('.total-done')
let cancelForm = document.querySelector('.form-cancel')
let setDatasCard = new Date().toLocaleDateString();
let outs = document.querySelectorAll('.outs')

// Устанавливаем актуальную дату в Header
setDate(headerDate)

// Проверяем есть ли данные в LS если есть то берём оттуда, если нет то создаем пустьй []

//  Запускаем функции, чтобы при перезагрузке страницы приходили актуальные сведения из LS
let arrMakeToDo = JSON.parse(localStorage.getItem('arrMakeToDo')) || [];
showTask()
let arrInProgress = JSON.parse(localStorage.getItem('arrInProgress')) || []
showTaskInProgress()
let arrDone = JSON.parse(localStorage.getItem('arrDone')) || []
showTaskDone()


// Вешаем событие при клике на которую будет показываться наша Форма и при закрытии/ отправки формы → поля будут очищаться 
addPopup.addEventListener('click', () => {
    popupFormToggle() //открываем наш popup, класс Active
    inputsClear([inputTitle, textAreaDescription, inputAuthor])// очищаем наши поля ввода
    removeError(inputTitle)// удаялем ошибки в полях ввода
    removeError(inputAuthor)// удаялем ошибки в полях ввода
    removeError(textAreaDescription)// удаялем ошибки в полях ввода
    inputTitle.addEventListener('keyup', validateInputTitle)
     // валядация полей ввода
    inputAuthor.addEventListener('keyup', validateInputAuthor)
    textAreaDescription.addEventListener('keyup', validateDescription)

})
closedForm.addEventListener('click', popupFormToggle)// закрываем popup, убираем класс active
cancelForm.addEventListener('click', popupFormToggle)

// При клике за пределами формы, форма так же будет закрыта
popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        popupFormToggle()
    }
})

// При отправке Формы будет запускаться функция getDate
form.addEventListener('submit', getData)
function getData(e) {
    e.preventDefault() // убираем стандартное поведение формы


    if (validateInputTitle() && validateInputAuthor() && validateDescription()) {
        let data = new GetMakeToDo(inputTitle.value.trim(), textAreaDescription.value.trim(), inputAuthor.value.trim(), setDatasCard, 1) // Создаем Ф.Конструктор и передаём параметры, записывая их в Объект
        arrMakeToDo.push(data) // Пушим Об в массив
        inputsClear([inputTitle, textAreaDescription, inputAuthor]) // Очищаем Inputs после отправки формы
        showTask() // Запускаем функцию, чтобы обновить порядок idx
        setKeyLocalStorage(arrMakeToDo, 'arrMakeToDo') // Записываем актуальную информацию в LS
    }
}

function showTask() {
    listMakeToDo.innerHTML = '' // Очищаем UL 
    arrMakeToDo.forEach((obj, idx) => {
        listMakeToDo.innerHTML += renderMakeToDo(obj, idx) // перебираем массив с Об и рендерим полученные данные в DOM 
    })

    // Получаем кнопки из Рендера
    let inprogress = document.querySelectorAll('.inprogress')
    let deleteTaskCard = document.querySelectorAll('.delete-task--card__maketodo')

    moveTaskInProgress(inprogress) // Запускаем функцию в которую передаём Псевдо-Массив из btns при клике по которым по idx Таски будут перемещены в массив  arrInProgress
    deleteCardMakeToDo(deleteTaskCard) // Запускаем функцию в которую передаём Псевдо-Массив из btns при клике по которым по idx Таски будут удалены из массива arrMakeToDo
    totalsNumCard(arrMakeToDo, totalMakeToDo) // Обновляем колличество Тасков в Массиве arrMakeToDo
}

function moveTaskInProgress(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrMakeToDo.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    obj.status = 2 // Меняем статус на 2
                    arrInProgress.push(obj)  // Пушим объект из arrMakeToDo  →  arrInProgress
                    showTaskInProgress()  // Рендерим на стриницу из arrInProgress
                    e.target.closest('.column-list-out').remove() // Удаляем карточку из DOM, которую перенесли в arrInProgress
                    arrMakeToDo.splice(idx, 1) // Удаляем obj из массива arrMakeToDo
                    showTask() // Запускаем функцию, чтобы пересчитать idx в arrMakeToDo
                    setKeyLocalStorage(arrMakeToDo, 'arrMakeToDo') // Сохраняем оставшиеся данные arrMakeToDo в LS
                    setKeyLocalStorage(arrInProgress, 'arrInProgress') // Сохраняем оставшиеся данные arrInProgress в LS
                }
            })
        })
    })

}

function deleteCardMakeToDo(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrMakeToDo.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    e.target.closest('.column-list-out').remove() // Удаляем карточку из DOM по которой был клик
                    arrMakeToDo.splice(idx, 1) // Удаляем obj из массива arrMakeToDo
                    showTask()// Запускаем функцию, чтобы пересчитать idx в arrMakeToDo
                    setKeyLocalStorage(arrMakeToDo, 'arrMakeToDo') // Сохраняем оставшиеся данные arrMakeToDo в LS
                }
            })
        })
    })
}

function showTaskInProgress() {
    listInProgress.innerHTML = ''
    arrInProgress.forEach((obj, idx) => {
        listInProgress.innerHTML += renderInProgress(obj, idx)
    })
    let inMakeTodo = document.querySelectorAll('.inmaketodo')
    let inDone = document.querySelectorAll('.indone')
    let deleteTaskCard = document.querySelectorAll('.delete-task--card__inprogress')
    totalsNumCard(arrInProgress, totalInProgress)
    moveTaskInMakeTodo(inMakeTodo)
    moveTaskInDone(inDone)
    deleteCardInProgress(deleteTaskCard)
}

function moveTaskInMakeTodo(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrInProgress.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    obj.status = 1
                    arrMakeToDo.push(obj)
                    e.target.closest('.column-list-out').remove()
                    arrInProgress.splice(idx, 1)
                    showTask() // Запускаем функцию, чтобы пересчитать idx в arrMakeToDo
                    showTaskInProgress()// Запускаем функцию, чтобы пересчитать idx в arrInProgress
                    setKeyLocalStorage(arrInProgress, 'arrInProgress')
                    setKeyLocalStorage(arrDone, 'arrDone')


                }
            })
        })
    })
}

function moveTaskInDone(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrInProgress.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    obj.status = 3
                    arrDone.push(obj)
                    e.target.closest('.column-list-out').remove()
                    arrInProgress.splice(idx, 1)
                    showTaskInProgress()
                    showTaskDone()// Запускаем функцию, чтобы пересчитать idx в arrDone
                    setKeyLocalStorage(arrInProgress, 'arrInProgress')
                    setKeyLocalStorage(arrDone, 'arrDone')
                }
            })
        })
    })
}

function deleteCardInProgress(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrInProgress.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    e.target.closest('.column-list-out').remove()
                    arrInProgress.splice(idx, 1)
                    showTaskInProgress()
                    setKeyLocalStorage(arrInProgress, 'arrInProgress')

                }
            })
        })
    })
}

function showTaskDone() {
    listDone.innerHTML = ''
    arrDone.forEach((obj, idx) => {
        listDone.innerHTML += renderDone(obj, idx)
    })
    totalsNumCard(arrDone, totalDone)
    let deleteTaskCard = document.querySelectorAll('.delete-task--card__done')
    deletTaskInDone(deleteTaskCard)
}

function deletTaskInDone(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            arrDone.forEach((obj, idx) => {
                if (e.target.closest('.column-list-out').dataset.taskid == idx) {
                    e.target.closest('.column-list-out').remove()
                    arrDone.splice(idx, 1)
                    showTaskDone()
                    setKeyLocalStorage(arrDone, 'arrDone')
                }
            })
        })
    })
}

// вешаем соббытие Click на иконку для очистки всего массива 
deleteTasksMakeToDo.addEventListener('click', () => {
    arrClear(arrMakeToDo) // Очищием массив arrMakeToDo
    showTask()
    removeKeyLocalStorage('arrMakeToDo') // Очищием LS по ключу arrMakeToDo
})

deleteTasksInProgress.addEventListener('click', () => {
    arrClear(arrInProgress)
    showTaskInProgress()
    removeKeyLocalStorage('arrInProgress')
})

deleteTasksDone.addEventListener('click', () => {
    arrClear(arrDone)
    showTaskDone()
    removeKeyLocalStorage('arrDone')
})






