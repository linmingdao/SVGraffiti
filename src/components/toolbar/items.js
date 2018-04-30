export default function (items) {
    return function (target) {
        target.items = [...items];
    }
}