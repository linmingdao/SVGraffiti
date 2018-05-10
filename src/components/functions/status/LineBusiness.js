import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Line
} from '../../../supports/svg-stamper/stampers-mixin';

export default class LineBusiness extends SketchpadBaseClass {

    constructor(sketchpad) {
        super(sketchpad);
        this.reset();
    }

    reset() {
        this.startPoint = null;
        this.endPoint = null;
        this.shape = null;
        this.begingDraw = false;
    }

    onmousedown(event) {
        this.startPoint = this.getPosition(event);
        this.begingDraw = true;
    }

    onmousemove(event) {
        // 需要阻止默认行为，否则会导致fireEvent('mouseup')的时候导致onmousedown不执行
        event.preventDefault();

        if (this.begingDraw) {
            this.shape && this.shape.remove();

            this.endPoint = this.getPosition(event);
            this.shape = new Line({
                    x1: this.startPoint.x,
                    y1: this.startPoint.y,
                    x2: this.endPoint.x,
                    y2: this.endPoint.y
                })
                .stroke('#21c863')
                .strokeLinecap(Line.LINECAP.ROUND)
                .strokeDash(10, 10)
                .strokeOpacity(.2)
                .affix(this.getSketchpad());
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.endPoint) {
            this.shape && this.shape.remove();
            this.shape = new Line({
                    x1: this.startPoint.x,
                    y1: this.startPoint.y,
                    x2: this.endPoint.x,
                    y2: this.endPoint.y
                })
                .stroke('#21c863')
                .strokeLinecap(Line.LINECAP.ROUND)
                .affix(this.getSketchpad());
        }

        this.reset();
    }
}