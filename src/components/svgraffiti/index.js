import './index.scss';
import Snap from 'snapsvg';

export default class SVGraffiti {

    constructor(config) {
        this.render(config);
    }

    render(config) {
        this.$el = document.querySelector(config.el);

        this.$sideBar = document.createElement("div");
        this.$sideBar.className = 'svgraffiti_sidebar';

        this.$svgraffitiPanel = document.createElement("div");
        this.$svgraffitiPanel.className = 'svgraffiti_panel';

        this.$el.appendChild(this.$sideBar);
        this.$el.appendChild(this.$svgraffitiPanel);

        const h = this.$svgraffitiPanel.clientHeight;
        const w = this.$svgraffitiPanel.clientWidth;
        this.$svg = Snap(w, h);
        this.$svgraffitiPanel.appendChild(this.$svg.node);
    }
}