
import Layout from '../layout/index';

export default class SVGraffiti {

    constructor(config) {
        this.$config = config;
        this.$functions = {};
        this.$activatedFunction = {};
        // this.layout();
        new Layout(config);
    }

    layout() {
        this.$el = document.querySelector(this.$config.el);

        this.$sideBar = document.createElement("div");
        this.$sideBar.className = 'svgraffiti_sidebar';

        this.$svgraffitiPanel = document.createElement("div");
        this.$svgraffitiPanel.className = 'svgraffiti_panel';

        this.$el.appendChild(this.$sideBar);
        this.$el.appendChild(this.$svgraffitiPanel);
    }
}