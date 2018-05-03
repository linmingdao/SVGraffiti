import Slider from '../../../../supports/slider/Slider';
import template from './template.html';
import * as Stampers from '../../../../supports/svg-stamper/stampers-mixin';

export default class Line {

    constructor(container) {
        this.container = container;
        this.init(container);
    }

    init() {
        this.$view = document.createElement('div');
        this.$view.className = `setting_item`;

        this.$view.innerHTML = template;

        this.initPreview();

        this.$options = this.$view.querySelector('.options');

        // this.slider = new Slider(this.$view);

        this.container.appendChild(this.$view);
    }

    initPreview() {
        this.$linePreview = this.$view.querySelector('.line_preview');
        const line = new Stampers.Line({
            x1: 20,
            y1: 100,
            x2: 380,
            y2: 100
        })
            .stroke('red')
            .strokeWidth(10)
            .strokeOpacity(.5)
            .strokeDash(30)
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .affix(this.$linePreview);
    }

    getView() {
        return this.$view;
    }
}