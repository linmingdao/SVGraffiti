import template from './operator.html';

export default class Operator {
    constructor(container) {
        this.$container = container;
        this.init();
    }

    init() {
        const div = document.createElement('div');
        div.innerHTML = template;
        const children = Array.from(div.children);
        for (let child of children) {
            this.$container.appendChild(child);
        }
    }
}