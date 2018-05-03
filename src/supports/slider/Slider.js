import './slider.scss';

export default class Slider {
    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.$input = document.createElement('INPUT');
        this.$input.setAttribute("type", "range");
        this.container.appendChild(this.$input);
    }
}