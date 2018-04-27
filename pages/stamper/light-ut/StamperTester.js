import Tester from './Tester';
import {
    Autowired,
    Test
} from './decorators';
import * as stampersApi from '../../../src/libs/svg-stamper/stampers-mixin';
import {
    createSvg
} from '../../../src/libs/svg-stamper/stampers/base/createSvg';

@Autowired({
    svgroot: document.querySelector('#container'),
    Stampers: stampersApi,
    createSvg: createSvg
})
class StamperTester extends Tester {

    paper() {
        const paper = this.createSvg('svg', {
            width: 300,
            height: 300
        });
        paper.style = 'border-radius:5px;border:10px solid #fff;margin:8px;background-color:#555;cursor:pointer;';
        this.svgroot.appendChild(paper);

        return paper;
    }

    @Test
    circle() {
        const circle = new this.Stampers.Circle({
                cx: 150,
                cy: 150,
                r: 100
            })
            .centerY(150)
            .centerX(150)
            .radius(100)
            .fill('red')
            .fillOpacity(.5)
            .stroke('yellow')
            .strokeWidth(10)
            .strokeOpacity(1)
            .affix(this.paper());
    }

    @Test
    ellipse() {
        const ellipse = new this.Stampers.Ellipse({
                cx: 100,
                cy: 100,
                rx: 20,
                ry: 40
            })
            .centerY(150)
            .centerX(150)
            .radius(120, 90)
            .fill('red')
            .fillOpacity(.5)
            .stroke('yellow')
            .strokeWidth(5)
            .strokeOpacity(1)
            .affix(this.paper());
    }

    @Test
    rect() {
        const rect = new this.Stampers.Rect({
                x: 50,
                y: 50,
                width: 200,
                height: 100
            })
            .stroke('yellow')
            .strokeWidth(10)
            .strokeOpacity(1)
            .fill('red')
            .size(200, 200)
            .radius(20, 20)
            .affix(this.paper());
    }

    @Test
    line() {
        const line = new this.Stampers.Line({
                x1: 10,
                y1: 10,
                x2: 290,
                y2: 290
            })
            .stroke('red')
            .strokeWidth(10)
            .strokeOpacity(1)
            .strokeDash(30)
            .strokeLinecap(this.Stampers.Line.LINECAP.ROUND)
            .affix(this.paper());
    }

    @Test
    polygon() {
        const polygon = new this.Stampers.Polygon({})
            .stroke('yellow')
            .fill('pink')
            .vertexs([50, 100], [250, 250], [200, 50])
            .strokeWidth(2)
            .affix(this.paper());
    }

    @Test
    polyline() {
        const polyline = new this.Stampers.Polyline({})
            .stroke('yellow')
            .fill('none')
            .strokeLinecap(this.Stampers.Polyline.LINECAP.ROUND)
            .vertexs([10, 10], [10, 100], [100, 100], [150, 200], [290, 260])
            .strokeWidth(5)
            .affix(this.paper());
    }

    @Test
    graffiti() {
        const graffiti = new this.Stampers.Graffiti().fill('none').affix(this.paper());
    }
}

export default StamperTester;