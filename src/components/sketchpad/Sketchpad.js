import {
    LineBusiness
} from '../functions/functions-mixin';

export default class Sketchpad {

    constructor(sketchpad) {
        this.sketchpad = sketchpad;

        const lineBusiness = new LineBusiness(this.sketchpad);

        this.sketchpad.onmousedown = function (event) {
            lineBusiness.onmousedown(event);
        }

        this.sketchpad.onmousemove = function (event) {
            lineBusiness.onmousemove(event);
        }

        this.sketchpad.onmouseup = function (event) {
            lineBusiness.onmouseup(event);
        }

        this.sketchpad.onmouseleave = function (event) {
            lineBusiness.onmouseleave(event);
        }
    }
}