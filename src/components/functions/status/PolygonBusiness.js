import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Line,
    Polygon
} from '../../../supports/svg-stamper/stampers-mixin';

function calDistance(x1, y1, x2, y2) { // 计算两点之间的距离
    var disX = Math.abs(x1 - x2);
    var disY = Math.abs(y1 - y2);
    return Math.pow((disX * disX + disY * disY), 0.5);
}

export default class PolygonBusiness extends SketchpadBaseClass {

    constructor(sketchpad) {
        super(sketchpad);
        this.reset();
    }

    reset() {
        this.movePoint = null;

        this.isClosed = false;

        this.line = null;

        this.shape = null;

        this.connPoint = null; // 记录当前的连接点
        this.lastConnPoint = null; // 记录当前的连接点

        this.segments = []; // 记录临时线段信息

        this.vertex = []; // 记录顶点信息
    }

    onmousedown(event) {
        // 还未形成闭合的多边形则继续绘制
        if (!this.isClosed && this.connPoint) {
            this.downPoint = this.getPosition(event);
            this.line = new Line({
                    x1: this.connPoint.x,
                    y1: this.connPoint.y,
                    x2: this.downPoint.x,
                    y2: this.downPoint.y
                }).stroke('#21c863').strokeLinecap(Line.LINECAP.ROUND)
                .strokeOpacity(1).affix(this.getSketchpad());
        }

        // 记录连接点
        this.connPoint = this.getPosition(event);
        this.lastConnPoint = this.connPoint;
        this.movePoint = null;

        calDistance(connPoint.x, connPoint.y, this.lastConnPoint.x, this.lastConnPoint.y) > 20
        this.vertex.push(this.connPoint);

        console.log(this.vertex);
    }

    onmousemove(event) {
        if (!this.isClosed && this.connPoint) {
            this.line && this.line.remove();

            // 绘制多边形的临时边
            this.movePoint = this.getPosition(event);
            this.line = new Line({
                    x1: this.connPoint.x,
                    y1: this.connPoint.y,
                    x2: this.movePoint.x,
                    y2: this.movePoint.y
                }).stroke('#21c863').strokeLinecap(Line.LINECAP.ROUND)
                .strokeOpacity(1).affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        this.segments.push(this.line) && (this.line = null);
        if (this.movePoint) {
            console.log('新的连接点');

            // 有移动，更新最新的连接点
            this.connPoint = this.movePoint;
            this.vertex.push(this.connPoint)
        }
        console.log(this.vertex);
    }

    isANewConnPoint(connPoint) {
        if (this.lastConnPoint) {
            return calDistance(connPoint.x, connPoint.y, this.lastConnPoint.x, this.lastConnPoint.y) > 20;
        } else {
            return true;
        }
    }

    // onclick() {
    //     console.log('lll')
    // }
}