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

    constructor(sketchpad, context) {
        super(sketchpad);
        this.context = context;
        this.reset();
        this.setBusinessMode(EllipseBusiness.MODE.ELLIPSE);
    }

    reset() {
        this.startPoint = null;
        this.movePoint = null;
        this.shape = null;
        this.begingDraw = false;
    }

    getPreferenceValue(name) {
        return this.context.getPreferenceValue(name, 'ellipse');
    }

    setBusinessMode(mode) {
        this.businessMode = mode;
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
            let hr = calDistance(this.startPoint.x, this.startPoint.y, this.movePoint.x, this.startPoint.y) / 2;
            // 计算垂直方向半径
            let vr = calDistance(this.startPoint.x, this.startPoint.y, this.startPoint.x, this.movePoint.y) / 2;

            this.businessMode === EllipseBusiness.MODE.CIRCLE && (hr = vr = Math.max(hr, vr));

            // 绘制新的圆
            this.shape = new Ellipse({})
                .center(center.x, center.y)
                .radius(hr, vr)
                .fill(this.getPreferenceValue('fillColor'))
                .fillOpacity(this.getPreferenceValue('fillOpacity'))
                .stroke(this.getPreferenceValue('strokeColor'))
                .strokeWidth(this.getPreferenceValue('strokeWidth'))
                .strokeOpacity(this.getPreferenceValue('strokeOpacity'))
                .strokeDash(...this.getPreferenceValue('strokeDash'))
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            this.reset();
        }
    }
}

EllipseBusiness.MODE = {
    ELLIPSE: 'ellipse',
    CIRCLE: 'circle'
};