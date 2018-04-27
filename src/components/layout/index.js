import './style.scss';
import template from './layout.html';

export default class Layout {

    constructor(config) {
        this.layout(config);
    }

    layout(config) {
        this.$el = document.querySelector(config.el);
        this.$el.innerHTML = template;
        // this.$sideBar = document.createElement("div");
        // this.$sideBar.className = 'svgraffiti_sidebar';
        // this.$svgraffitiPanel = document.createElement("div");
        // this.$svgraffitiPanel.className = 'svgraffiti_panel';
        // this.$el.appendChild(this.$sideBar);
        // this.$el.appendChild(this.$svgraffitiPanel);
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