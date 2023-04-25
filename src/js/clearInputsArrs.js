
export function inputsClear(inputs) {
    inputs.forEach(input => {
        input.value = ''
    });
}

export function arrClear(arr) {
    arr.splice(0, arr.length)
}