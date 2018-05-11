import Subscriber from '../../supports/pubsub/base/subscriber';
import Topics from '../../supports/pubsub/base/topics';
import {
    LineBusiness,
    CurveBusiness,
    RightTriangleBusiness,
    RectangleBusiness,
    EllipseBusiness,
    PolygonBusiness
} from '../functions/functions-mixin';

const FUNCTIONS_CREATOR = {
    line: LineBusiness,
    curve: CurveBusiness,
    eraser: CurveBusiness,
    triangle: RightTriangleBusiness,
    rect: RectangleBusiness,
    ellipse: EllipseBusiness,
    polygon: PolygonBusiness,
    polyline: PolygonBusiness
};

@Topics(['function'])
export default class Sketchpad extends Subscriber {

    constructor(sketchpad) {
        super();
        this.sketchpad = sketchpad;
        this.functionsPool = {};
        this.bindEvent();
    }

    notify(topic, entity) {
        if (topic === 'function') {
            if (entity === 'curve' || entity === 'eraser') {
                if (!this.functionsPool['curve'] && !this.functionsPool['eraser']) {
                    this.functionsPool['curve'] = this.functionsPool['eraser'] = new CurveBusiness(this.sketchpad);
                }
                this.functionsPool['curve'].setBusinessMode(entity === 'eraser' ? CurveBusiness.MODE.ERASER : CurveBusiness.MODE.CURVE);
            } else {
                if (!this.functionsPool[entity]) {
                    this.functionsPool[entity] = new FUNCTIONS_CREATOR[entity](this.sketchpad);
                }
            }
            this.currentBusiness = this.functionsPool[entity];
        }
    }

    bindEvent() {
        const __self = this;
        this.sketchpad.onmousedown = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmousedown && __self.currentBusiness.onmousedown(event);
        }
        this.sketchpad.onmousemove = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmousemove && __self.currentBusiness.onmousemove(event);
        }
        this.sketchpad.onmouseup = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmouseup && __self.currentBusiness.onmouseup(event);
        }
        this.sketchpad.onclick = function (event) {
            __self.currentBusiness && __self.currentBusiness.onclick && __self.currentBusiness.onclick(event);
        }
        this.sketchpad.onmouseleave = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmouseleave && __self.currentBusiness.onmouseleave(event);
        }
    }
}