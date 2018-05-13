import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Rect
} from '../../../supports/svg-stamper/stampers-mixin';

export default class RectangleBusiness extends SketchpadBaseClass {

    constructor(sketchpad, context) {
        super(sketchpad);
        this.context = context;
        this.reset();
    }

    getPreferenceValue(name) {
        return this.context.getPreferenceValue(name, 'rect');
    }

    reset() {
        this.startPoint = null;
        this.movePoint = null;
        this.shape = null;
        this.begingDraw = false;
    }

    getRectStart() {
        let startX, startY;
        if (this.startPoint.x < this.movePoint.x && this.startPoint.y < this.movePoint.y) {
            startX = this.startPoint.x;
            startY = this.startPoint.y;
        } else if (this.startPoint.x > this.movePoint.x && this.startPoint.y > this.movePoint.y) {
            startX = this.movePoint.x;
            startY = this.movePoint.y;
        } else if (this.startPoint.x < this.movePoint.x && this.startPoint.y > this.movePoint.y) {
            startX = this.startPoint.x;
            startY = this.movePoint.y;
        } else if (this.startPoint.x > this.movePoint.x && this.startPoint.y < this.movePoint.y) {
            startX = this.movePoint.x;
            startY = this.startPoint.y;
        }
        return {
            x: startX,
            y: startY
        }
    }

    getRectSize() {
        return {
            width: Math.abs(this.startPoint.x - this.movePoint.x),
            height: Math.abs(this.startPoint.y - this.movePoint.y)
        }
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

            // 计算矩形的宽高 与 起点
            const size = this.getRectSize();
            const rectStart = this.getRectStart();

            // 绘制新的矩形
            this.shape = new Rect({
                    x: rectStart.x,
                    y: rectStart.y,
                    width: size.width,
                    height: size.height
                })
                .stroke(this.getPreferenceValue('strokeColor'))
                .strokeWidth(this.getPreferenceValue('strokeWidth'))
                .radius(this.getPreferenceValue('strokeRadius'), this.getPreferenceValue('strokeRadius'))
                .fill(this.getPreferenceValue('fillColor'))
                .strokeOpacity(this.getPreferenceValue('strokeOpacity'))
                .strokeDash(...this.getPreferenceValue('strokeDash'))
                .fillOpacity(this.getPreferenceValue('fillOpacity'))
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            this.reset();
        }
    }
}