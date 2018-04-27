import './layout.scss';
import template from './layout.html';

export default class Layout {

    constructor(config) {
        this.layout(config);
    }

    layout(config) {
        this.$el = document.querySelector(config.el);
        this.$el.innerHTML = template;
    }

    root() {

    }

    content() {

    }

    left() {

    }

    right() {

    }

    top() {

    }

    bottom() {

    }

}