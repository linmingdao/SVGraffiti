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
        this.CRITICAL_VALUE = 10;
        this.edge = null;
        this.shape = null;
        this.startPoint = null;
        this.movePoint = null;
        this.currentConnPoint = null;
        this.segments = []; // 记录临时线段信息
        this.vertexs = []; // 记录顶点信息
    }

    onmousedown(event) {
        const downPoint = this.getPosition(event);
        // 初始化第一个连接点
        !this.startPoint && (this.currentConnPoint = downPoint);
        // 初始化 并 记录起点
        !this.startPoint && (this.startPoint = downPoint, this.vertexs.push([this.startPoint.x, this.startPoint.y]));
    }

    onmousemove(event) {
        if (this.currentConnPoint) {
            this.edge && this.edge.remove();
            // 绘制多边形的临时边
            this.movePoint = this.getPosition(event);
            if (calDistance(this.currentConnPoint.x, this.currentConnPoint.y, this.movePoint.x, this.movePoint.y) > this.CRITICAL_VALUE) {
                this.edge = new Line({
                    x1: this.currentConnPoint.x,
                    y1: this.currentConnPoint.y,
                    x2: this.movePoint.x,
                    y2: this.movePoint.y
                }).stroke('#21c863').strokeLinecap(Line.LINECAP.ROUND).strokeOpacity(.5).affix(this.getSketchpad());
            }
        }
    }

    onmouseup(event) {
        // 移除模糊状态的临时边
        this.edge && this.edge.remove() && (this.edge = null);

        // 是否闭合
        if (this.startPoint && this.movePoint && calDistance(this.startPoint.x, this.startPoint.y, this.movePoint.x, this.movePoint.y) < this.CRITICAL_VALUE) {
            this.segments.forEach(edge => {
                edge.remove();
            });
            this.shape = new Polygon({})
                .stroke('black')
                .strokeWidth(2)
                .fill('black')
                .fillOpacity(.5)
                .vertexs(this.vertexs)
                .affix(this.getSketchpad());
            this.reset();
        } else {
            if (this.currentConnPoint && this.movePoint) {
                if (calDistance(this.currentConnPoint.x, this.currentConnPoint.y, this.movePoint.x, this.movePoint.y) > 10) {
                    // 记录顶点
                    this.vertexs.push([this.movePoint.x, this.movePoint.y]);
                    // 绘制没有闭合之前的临时边
                    this.segments.push(
                        new Line({
                            x1: this.currentConnPoint.x,
                            y1: this.currentConnPoint.y,
                            x2: this.movePoint.x,
                            y2: this.movePoint.y
                        }).stroke('#21c863').strokeLinecap(Line.LINECAP.ROUND).strokeOpacity(1).affix(this.getSketchpad())
                    );
                    // 重置当前的连接点
                    this.currentConnPoint = this.movePoint;
                }
            }
        }
    }
}