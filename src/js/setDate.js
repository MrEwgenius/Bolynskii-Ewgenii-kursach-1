export function setDate(out) {
    let data = new Date().toLocaleDateString();
    // out.innerHTML = `${addDate(data.getDate())}.${addDate(data.getMonth()+1)}.${addDate(data.getFullYear())}`
    out.innerHTML = `${data}`
}