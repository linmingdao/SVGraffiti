import './index.scss';
import Snap from 'snapsvg';
import * as SvgUtils from '../../utils/svg.js'

export default class SVGraffiti {

    constructor(config) {
        this.$functions = {};
        this.$activatedFunction = {};
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

        // 创建svg面板
        const h = this.$svgraffitiPanel.clientHeight;
        const w = this.$svgraffitiPanel.clientWidth;
        this.$svg = SvgUtils.createSvg('svg', {
            width: w,
            height: h
        });
        this.$svg.style = 'background-color:#555';

        const circle = SvgUtils.createSvg('circle', {
            'cx': 10,
            'cy': 10,
            'r': 10,
            'fill': '#fff'
        })
        const line = SvgUtils.createSvg('line', {
            'x1': 50,
            'y1': 50,
            'x2': 80,
            'y2': 80,
            'stroke': '#fff'
        })
        const rect = SvgUtils.createSvg('rect', {
            'x': 100,
            'y': 100,
            'rx': 10,
            'ry': 10,
            'width': 100,
            'height': 100,
            'stroke-width': 5,
            'stroke': 'pink',
            'fill': '#fff',
            // 'fill-opacity': 0.5,
            // 'stroke-opacity': 0.5
        })
        const ellipse = SvgUtils.createSvg('ellipse', {
            'cx': 150,
            'cy': 50,
            'rx': 50,
            'ry': 10,
            'fill': 'pink'
        })
        const polygon = SvgUtils.createSvg('polygon', {
            'points': '300,100 300,210 170,250',
            'fill': 'green',
            'stroke-width': 2,
            'stroke': 'black'
        })
        const polyline = SvgUtils.createSvg('polyline', {
            'points': '0,0 0,20 20,20 20,40 40,40 40,60',
            'stroke-width': 10,
            'fill': 'none',
            'stroke': 'red'
        })
        this.$svg.appendChild(circle)
        this.$svg.appendChild(line)
        this.$svg.appendChild(rect)
        this.$svg.appendChild(ellipse)
        this.$svg.appendChild(polygon)
        this.$svg.appendChild(polyline)

        // 插入svg面板
        this.$svgraffitiPanel.appendChild(this.$svg);

        this.init();
    }

    init() {
        this.$svg.onclick = event => {
            // console.log('onclick');
            // this.$activatedFunction.onClick(event);
        };
        this.$svg.onmousedown = event => {
            // console.log('onmousedown');
            // this.$activatedFunction.onMouseDown(event);
        };
        this.$svg.onmousemove = event => {
            // console.log('onmousemove');
            // this.$activatedFunction.onMouseMove(event);
        };
        this.$svg.onmouseup = event => {
            // console.log('onmouseup');
            // this.$activatedFunction.onMouseUp(event);
        };
    }
}