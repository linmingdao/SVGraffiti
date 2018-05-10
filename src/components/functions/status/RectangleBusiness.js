import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Polygon
} from '../../../supports/svg-stamper/stampers-mixin';

export default class RectangleBusiness extends SketchpadBaseClass {

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

            // 计算矩形折点
            const points = [this.startPoint.x, this.startPoint.y, this.movePoint.x, this.startPoint.y, this.movePoint.x, this.movePoint.y, this.startPoint.x, this.movePoint.y, this.startPoint.x, this.startPoint.y];

            // 绘制新的矩形
            this.shape = new Polygon({})
                .stroke('black')
                .fill('black')
                .strokeOpacity(1)
                .fillOpacity(.3)
                .vertexs(points)
                .strokeWidth(2)
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            this.reset();
        }
    }
}