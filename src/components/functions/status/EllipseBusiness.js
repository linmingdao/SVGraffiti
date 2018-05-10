import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Ellipse
} from '../../../supports/svg-stamper/stampers-mixin';

// 计算两点的中点
function calMidpoint(x1, y1, x2, y2) {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
    };
}

// 计算两点之间的距离
function calDistance(x1, y1, x2, y2) {
    var disX = Math.abs(x1 - x2);
    var disY = Math.abs(y1 - y2);
    return Math.pow((disX * disX + disY * disY), 0.5);
}

export default class EllipseBusiness extends SketchpadBaseClass {

    constructor(sketchpad) {
        super(sketchpad);
        this.reset();
    }

    reset() {
        this.startPoint = null;
        this.movePoint = null;
        this.shape = null;
        this.begingDraw = false;
    }

    onmousedown(event) {
        this.startPoint = this.getPosition(event);
        this.begingDraw = true;
    }

    onmousemove(event) {
        event.preventDefault();

        if (this.begingDraw) {
            // 移除上一次移动绘制的矩形
            this.shape && this.shape.remove();

            this.movePoint = this.getPosition(event);

            // 计算圆心
            const center = calMidpoint(this.startPoint.x, this.startPoint.y, this.movePoint.x, this.movePoint.y);
            // 计算水平方向的半径
            const hr = calDistance(this.startPoint.x, this.startPoint.y, this.movePoint.x, this.startPoint.y) / 2;
            // 计算垂直方向半径
            const vr = calDistance(this.startPoint.x, this.startPoint.y, this.startPoint.x, this.movePoint.y) / 2;

            // 绘制新的圆
            this.shape = new Ellipse({})
                .center(center.x, center.y)
                .radius(hr, vr)
                .fill('red')
                .fillOpacity(.5)
                .stroke('yellow')
                .strokeWidth(2)
                .strokeOpacity(1)
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            this.reset();
        }
    }
}