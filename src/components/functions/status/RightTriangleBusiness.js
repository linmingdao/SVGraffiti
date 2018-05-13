import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Polygon
} from '../../../supports/svg-stamper/stampers-mixin';

export default class RightTriangleBusiness extends SketchpadBaseClass {

    constructor(sketchpad, context) {
        super(sketchpad);
        this.context = context;
        this.reset();
    }

    reset() {
        this.startPoint = null;
        this.movePoint = null;
        this.shape = null;
        this.begingDraw = false;
    }

    getPreferenceValue(name) {
        if (this.context.getPreferenceValue('applyGloabal')) {
            return this.context.getPreferenceValue(name);
        }
        return this.context.getPreferenceValue(name, 'triangle');
    }

    onmousedown(event) {
        this.startPoint = this.getPosition(event);
        this.begingDraw = true;
    }

    onmousemove(event) {
        // 需要阻止默认行为，否则会导致fireEvent('mouseup')的时候导致onmousedown不执行
        event.preventDefault();

        if (this.begingDraw) {
            // 移除上一次移动绘制的旧直角三角形
            this.shape && this.shape.remove();

            this.movePoint = this.getPosition(event);

            // 计算直角顶点
            const rightAngleVertex = {};
            if (this.startPoint.y > this.movePoint.y) {
                rightAngleVertex.x = this.startPoint.x;
                rightAngleVertex.y = this.movePoint.y;
            } else if (this.startPoint.y < this.movePoint.y) {
                rightAngleVertex.x = this.movePoint.x;
                rightAngleVertex.y = this.startPoint.y;
            } else if (this.startPoint.y == this.movePoint.y || this.startPoint.x > this.movePoint.x) {
                return;
            }

            // 绘制新的直角三角形
            this.shape = new Polygon({})
                .fill(this.getPreferenceValue('fillColor'))
                .fillOpacity(this.getPreferenceValue('fillOpacity'))
                .stroke(this.getPreferenceValue('strokeColor'))
                .strokeWidth(this.getPreferenceValue('strokeWidth'))
                .strokeOpacity(this.getPreferenceValue('strokeOpacity'))
                .strokeDash(...this.getPreferenceValue('strokeDash'))
                .vertexs([this.startPoint.x, this.startPoint.y], [this.movePoint.x, this.movePoint.y], [rightAngleVertex.x, rightAngleVertex.y])
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            this.reset();
        }
    }
}