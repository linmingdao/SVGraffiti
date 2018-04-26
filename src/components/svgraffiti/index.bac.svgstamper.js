import './index.scss';
import * as SvgUtils from '../../utils/svg.js';
import Circle from '../../libs/svg-stamper/stampers/Circle';
import Line from '../../libs/svg-stamper/stampers/Line';
import Rect from '../../libs/svg-stamper/stampers/Rect';
import Ellipse from '../../libs/svg-stamper/stampers/Ellipse';
import Polygon from '../../libs/svg-stamper/stampers/Polygon';
import Polyline from '../../libs/svg-stamper/stampers/Polyline';
import Graffiti from '../../libs/svg-stamper/stampers/Graffiti';

export default class SVGraffiti {

    constructor(config) {
        this.$config = config;
        this.$functions = {};
        this.$activatedFunction = {};
        this.stage(config);
        this.bindEvent();
        this.test();
    }

    stage() {
        this.$el = document.querySelector(this.$config.el);

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

        // 插入svg面板
        this.$svgraffitiPanel.appendChild(this.$svg);
    }

    test() {
        // const circle = new Circle({ cx: 100, cy: 100, r: 20 })
        //     .centerY(200)
        //     .centerX(300)
        //     .radius(100)
        //     .fill('red')
        //     .fillOpacity(.5)
        //     .stroke('yellow')
        //     .strokeWidth(10)
        //     .strokeOpacity(1)
        //     .affix(this.$svg);

        // const ellipse = new Ellipse({ cx: 100, cy: 100, rx: 20, ry: 40 })
        //     .centerY(200)
        //     .centerX(300)
        //     .radius(100, 200)
        //     .fill('red')
        //     // .fillOpacity(.5)
        //     .stroke('yellow')
        //     .strokeWidth(5)
        //     // .strokeOpacity(1)
        //     .affix(this.$svg);

        // const line = new Line({ x1: 10, y1: 10, x2: 100, y2: 100})
        //     .stroke('red')
        //     .strokeWidth(10)
        //     .strokeOpacity(1)
        //     // .strokeDash(10,10)
        //     .strokeLinecap(Line.LINECAP.ROUND)
        //     .affix(this.$svg);

        // const rect = new Rect({ x: 10, y: 10, width: 200, height: 100})
        //     .stroke('yellow')
        //     .fill('red')
        //     .strokeWidth(10)
        //     .strokeOpacity(1)
        //     .size(300, 200)
        //     .radius(20, 20)
        //     .affix(this.$svg);

        // const polygon = new Polygon({})
        //     .stroke('yellow')
        //     .fill('pink')
        //     .vertexs([10, 10], [10, 100], [100, 100])
        //     .strokeWidth(2)
        //     .affix(this.$svg);

        // const polyline = new Polyline({})
        //     .stroke('yellow')
        //     .fill('none')
        //     .strokeLinecap(Polyline.LINECAP.ROUND)
        //     .vertexs([10, 10], [10, 100], [100, 100], [150, 200])
        //     .strokeWidth(5)
        //     .affix(this.$svg);

        const graffiti = new Graffiti().fill('none').affix(this.$svg)
    }

    bindEvent() {
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