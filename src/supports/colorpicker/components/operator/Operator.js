import template from './template.html';

export default class Operator {
    constructor(container) {
        this.$container = container;
        this.init();
    }

    init() {
        this.$container.innerHTML = template;
    }
}