import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Line,
    Polygon
} from '../../../supports/svg-stamper/stampers-mixin';

export default class PolygonBusiness extends SketchpadBaseClass {

    constructor(sketchpad) {
        super(sketchpad);
        this.reset();
    }

    reset() {
        this.downPoint = null;
        this.startPoint = null;
        this.movePoint = null;

        this.line = null;

        this.shape = null;
        this.connPoint = null; // 记录当前的连接点
        this.segments = []; // 记录临时线段信息
        this.vertex = []; // 记录顶点信息
    }

    onmousedown(event) {
        this.downPoint = this.getPosition(event);
        !this.startPoint && (this.startPoint = this.downPoint);
    }

    onmousemove(event) {
        this.movePoint = this.getPosition(event);

        const startX = this.startPoint.x;
        const startY = this.startPoint.y;

        if (this.connPoint) {
            startX = this.connPoint.x;
            startY = this.connPoint.y;
        }

        if (this.line) {
            this.line.attr({
                x2: moveX,
                y2: moveY
            });
        } else {
            this.line = new Line({
                    x1: startX,
                    y1: startY,
                    x2: this.movePoint.x,
                    y2: this.movePoint.y
                })
                .stroke('#21c863')
                .strokeLinecap(Line.LINECAP.ROUND)
                .strokeOpacity(1)
                .affix(this.getSketchpad());

            this.segments.push(this.line);
        }
    }

    onmouseup(event) {
        this.reset();
    }
}