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
        this.resultColorSpan = this.$container.querySelector('.result_color_span');
        this.globalToggleButton = this.$container.querySelector('.global_toggle_button');
        this.globalToggleButton.onclick = e => {
            this.globalToggleButton && this.globalToggleButton(e.target.checked);
        }
    }

    setColor(color) {
        this.resultColorSpan.style['background-color'] = color;
    }

    onClickGlobalToggleButton(callback) {
        this.globalToggleButton = callback;
    }

    getColor() {

    }
}