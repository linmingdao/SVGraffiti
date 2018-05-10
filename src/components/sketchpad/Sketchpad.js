import {
    LineBusiness,
    CurveBusiness,
    RightTriangleBusiness,
    RectangleBusiness,
    CircleBusiness,
    EllipseBusiness
} from '../functions/functions-mixin';

export default class Sketchpad {

    constructor(sketchpad) {
        this.sketchpad = sketchpad;

        // const currentBusiness = new LineBusiness(this.sketchpad);
        // const currentBusiness = new CurveBusiness(this.sketchpad);
        // const currentBusiness = new RightTriangleBusiness(this.sketchpad);
        // const currentBusiness = new RectangleBusiness(this.sketchpad);
        // const currentBusiness = new CircleBusiness(this.sketchpad);
        const currentBusiness = new EllipseBusiness(this.sketchpad);

        this.sketchpad.onmousedown = function (event) {
            currentBusiness.onmousedown(event);
        }

        this.sketchpad.onmousemove = function (event) {
            currentBusiness.onmousemove(event);
        }

        this.sketchpad.onmouseup = function (event) {
            currentBusiness.onmouseup(event);
        }

        this.sketchpad.onmouseleave = function (event) {
            currentBusiness.onmouseleave(event);
        }
    }
}