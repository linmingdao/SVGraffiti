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
        let downPoint = {},
            movePoint = {},
            upPoint = {};
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

        sketchpad.onmousedown = function (down_e) {
            downPoint = getPosition(down_e);
            begingDraw = true;
        }

        sketchpad.onmousemove = function (move_e) {
            if (begingDraw) {
                if (line) {
                    line.remove();
                }

                movePoint = getPosition(move_e);

                line = new Stampers.Line({
                    x1: downPoint.x,
                    y1: downPoint.y,
                    x2: movePoint.x,
                    y2: movePoint.y
                }).stroke('#21c863').strokeDash(10, 10).strokeOpacity(.2).affix(sketchpad);
            }
        }

        sketchpad.onmouseup = function (up_e) {
            if (begingDraw) {
                begingDraw = false;
                line && line.remove();

                upPoint = getPosition(up_e);

                line = new Stampers.Line({
                    x1: downPoint.x,
                    y1: downPoint.y,
                    x2: upPoint.x,
                    y2: upPoint.y
                }).stroke('#21c863').affix(sketchpad);
            }
        }
    }

    initToolBar() {

    }
}