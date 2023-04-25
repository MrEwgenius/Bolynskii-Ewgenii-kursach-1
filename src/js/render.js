export function renderMakeToDo(obj, idx) {
    return `<li class="column-list-out" data-taskid='${idx}'>
                <div class="column-list--title">
                    <span>ToDo</span>
                    <div class='maketodo--data'>${obj.data}</div>
                </div>
                <div class="column-description">
                    <output class="column-description--title">${obj.title}</output>
                    <output class="column-description--desc">${obj.desc}</output>
                </div>
                <div class="column-author--main">
                    <output class="column-author">${obj.author}</output>
                    <div>
                        <i class="inprogress fa-solid fa-share"></i>
                        <a class="delete-task--card__maketodo"><i class="fa-sharp fa-solid fa-trash"></i></a>
                    </div>
                </div>
            </li>`

}

export function renderInProgress(obj, idx) {
    return `<li class="column-list-out" data-taskid='${idx}'>
        <div class="column-list--title">
            <span>ToDo</span>
            <div class='maketodo--data'>${obj.data}</div>
        </div>
        <div class="column-description">
            <output class="column-description--title">${obj.title}</output>
            <output class="column-description--desc">${obj.desc}</output>
        </div>
        <div class="column-author--main">
            <output class="column-author">${obj.author}</output>
            <div>

                <i class="inmaketodo fa-solid fa-share fa-flip-horizontal"></i>
                <i class="indone fa-solid fa-share"></i>

                <a class="delete-task--card__inprogress"><i class="fa-sharp fa-solid fa-trash"></i></a>
            </div>
        </div>
    </li>`

}

export function renderDone(obj, idx) {

    return `
        <li class="column-list-out" data-taskid='${idx}'>
            <div class="column-list--title">
                <span>ToDo</span>
                <div class='maketodo--data'>${obj.data}</div>
            </div>
            <div class="column-description">
                <output class="column-description--title">${obj.title}</output>
                <output class="column-description--desc">${obj.desc}</output>
            </div>
            <div class="column-author--main">
                <output class="column-author">${obj.author}</output>
                <div>
                    <a class="delete-task--card__done"><i class="fa-sharp fa-solid fa-trash"></i></a>
                </div>
            </div>
        </li>

    `
}