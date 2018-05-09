import Layout from './components/layout/layout';
import ToolBar from './components/toolbar/ToolBar';
import Settings from './components/settings/settings';

import * as Stampers from './supports/svg-stamper/stampers-mixin';

export default class SVGraffiti {

    constructor(config) {
        this.layout(config);
    }

    layout(config) {
        this.layout = new Layout(config);
        this.toolbar = new ToolBar(this.layout.sidebar());
        this.settings = new Settings(this.layout.settings());

        // test
        let startPoint = null,
            endPoint = null;
        let line = null;
        let begingDraw = false;
        const sketchpad = this.layout.sketchpad();

        function getPosition(event) {
            const boundingClientRect = sketchpad.getBoundingClientRect();
            return {
                x: event.clientX - boundingClientRect.left,
                y: event.clientY - boundingClientRect.top
            }
        }

        function fireEvent(elem, eventName) {
            if (typeof (elem) == 'object') {
                eventName = eventName.replace(/^on/i, '');
                if (document.all) {
                    eventName = "on" + eventName;
                    elem.fireEvent(eventName);
                } else {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent(eventName, true, true);
                    elem.dispatchEvent(evt);
                }
            }
        }

        sketchpad.onmousedown = function (down_e) {
            startPoint = getPosition(down_e);
            begingDraw = true;
        }

        sketchpad.onmousemove = function (move_e) {
            move_e.preventDefault();
            if (begingDraw) {
                if (line) {
                    line.remove();
                }
                endPoint = getPosition(move_e);
                line = new Stampers.Line({
                    x1: startPoint.x,
                    y1: startPoint.y,
                    x2: endPoint.x,
                    y2: endPoint.y
                }).stroke('#21c863').strokeLinecap(Stampers.Line.LINECAP.ROUND).strokeDash(10, 10).strokeOpacity(.2).affix(sketchpad);
            }
        }

        sketchpad.onmouseup = function (up_e) {
            if (begingDraw && endPoint) {
                line && line.remove();
                line = new Stampers.Line({
                    x1: startPoint.x,
                    y1: startPoint.y,
                    x2: endPoint.x,
                    y2: endPoint.y
                }).stroke('#21c863').affix(sketchpad);
            }
            startPoint = null;
            endPoint = null;
            begingDraw = false;
        }

        sketchpad.onmouseleave = function () {
            fireEvent(sketchpad, 'mouseup');
        }
    }

    initToolBar() {

    }
}