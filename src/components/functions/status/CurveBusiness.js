import SketchpadBaseClass from '../SketchpadBaseClass';
import {
    Path
} from '../../../supports/svg-stamper/stampers-mixin';

// 计算三次贝塞尔控制点
function calBezierCtrlPoint(ps, i, a, b) {
    if (!a || !b) {
        a = 0.25;
        b = 0.25;
    }
    var pAx;
    var pAy;
    var pBx;
    var pBy;
    //处理两种极端情形
    if (i < 1) {
        pAx = ps[0].x + (ps[1].x - ps[0].x) * a;
        pAy = ps[0].y + (ps[1].y - ps[0].y) * a;
    } else {
        pAx = ps[i].x + (ps[i + 1].x - ps[i - 1].x) * a;
        pAy = ps[i].y + (ps[i + 1].y - ps[i - 1].y) * a;
    }
    if (i > ps.length - 3) {
        var last = ps.length - 1;
        pBx = ps[last].x - (ps[last].x - ps[last - 1].x) * b;
        pBy = ps[last].y - (ps[last].y - ps[last - 1].y) * b;
    } else {
        pBx = ps[i + 1].x - (ps[i + 2].x - ps[i].x) * b;
        pBy = ps[i + 1].y - (ps[i + 2].y - ps[i].y) * b;
    }
    return {
        pA: {
            x: pAx,
            y: pAy
        },
        pB: {
            x: pBx,
            y: pBy
        }
    }
}

export default class CurveBusiness extends SketchpadBaseClass {

    constructor(sketchpad, context) {
        super(sketchpad);
        this.context = context;
        this.reset();
        this.setBusinessMode(CurveBusiness.MODE.CURVE);
    }

    reset() {
        this.lastPoint = null;
        this.startPoint = null;
        this.movePoint = null;

        this.points = [];
        this.pathChunk = '';
        this.shape = null;

        this.begingDraw = false;
    }

    setBusinessMode(mode) {
        this.businessMode = mode;
    }

    getPreferenceValue(name, namespace = 'curve') {
        return this.context.getPreferenceValue(name, namespace);
    }

    onmousedown(event) {
        this.begingDraw = true;

        this.startPoint = this.lastPoint = this.getPosition(event);

        // 记录曲线起点坐标
        this.points.push({
            ...this.startPoint
        });
    }

    onmousemove(event) {
        // 需要阻止默认行为，否则会导致fireEvent('mouseup')的时候导致onmousedown不执行
        event.preventDefault();

        if (this.begingDraw) {
            // 删除上一次移动的旧笔迹数据
            this.shape && this.shape.remove();

            this.movePoint = this.getPosition(event);
            // 计算控制点
            const ctrlPoint = {
                x: (this.lastPoint.x + this.movePoint.x) / 2,
                y: (this.lastPoint.y + this.movePoint.y) / 2
            };
            // 记录控制点
            this.points.push({
                ...ctrlPoint
            });

            // 记录笔迹数据
            this.pathChunk += `M${this.lastPoint.x} ${this.lastPoint.y}Q${ctrlPoint.x} ${ctrlPoint.y} ${this.movePoint.x} ${this.movePoint.y}`;

            if (this.businessMode === CurveBusiness.MODE.ERASER) {
                // 绘制橡皮擦轨迹
                this.shape = new Path({
                        'd': this.pathChunk
                    })
                    .stroke('#fff')
                    .strokeWidth(this.getPreferenceValue('size', 'eraser'))
                    .strokeOpacity(this.getPreferenceValue('depth', 'eraser'))
                    .strokeLinecap(Path.LINECAP.ROUND)
                    .affix(this.getSketchpad());
            } else {
                // 绘制笔迹
                this.shape = new Path({
                        'd': this.pathChunk
                    })
                    .stroke(this.getPreferenceValue('strokeColor'))
                    .strokeWidth(this.getPreferenceValue('strokeWidth'))
                    .strokeLinecap(Path.LINECAP.ROUND)
                    .strokeOpacity(.2)
                    .affix(this.getSketchpad());
            }

            this.lastPoint = this.movePoint;
        }
    }

    onmouseup(event) {
        if (this.begingDraw && this.movePoint) {
            // 删除旧的轨迹数据
            this.shape && this.shape.remove();

            // 记录笔迹的结束位置
            this.points.push({
                x: this.movePoint.x,
                y: this.movePoint.y
            });

            // 收集笔迹数据块
            this.pathChunk = '';
            for (let i = 1; i < this.points.length; i++) {
                const ctrlP = calBezierCtrlPoint(this.points, i - 1);

                // 记录笔迹数据
                this.pathChunk += `M${this.points[i - 1].x} ${this.points[i - 1].y}C${ctrlP.pA.x} ${ctrlP.pA.y} ${ctrlP.pB.x} ${ctrlP.pB.y} ${this.points[i].x} ${this.points[i].y}`;
            }

            if (this.businessMode === CurveBusiness.MODE.ERASER) {
                // 绘制整段橡皮擦轨迹
                this.shape = new Path({
                        'd': this.pathChunk
                    })
                    .stroke('#fff')
                    .strokeWidth(this.getPreferenceValue('size', 'eraser'))
                    .strokeOpacity(this.getPreferenceValue('depth', 'eraser'))
                    .strokeLinecap(Path.LINECAP.ROUND)
                    .affix(this.getSketchpad());
                    console.log(this.getPreferenceValue('size', 'eraser'))
            } else {
                // 绘制整段曲线轨迹
                this.shape = new Path({
                        'd': this.pathChunk
                    })
                    .stroke(this.getPreferenceValue('strokeColor'))
                    .strokeWidth(this.getPreferenceValue('strokeWidth'))
                    .strokeOpacity(this.getPreferenceValue('strokeOpacity'))
                    .strokeLinecap(Path.LINECAP.ROUND)
                    .affix(this.getSketchpad());
            }
        }

        this.reset();
    }
}

CurveBusiness.MODE = {
    CURVE: 'curve',
    ERASER: 'eraser'
};