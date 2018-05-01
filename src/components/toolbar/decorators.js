function Items(items) {
    return function (target) {
        target.items = [...items];
    }
}

export {
    Items
}