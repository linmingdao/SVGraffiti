import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
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

        new ColorPicker({
            el: this.$view.querySelector('.color_picker'),
            components: ['gradient']
        }).onColorChange(color => {
            this.previewLine.remove();
            this.previewLine = new Stampers.Line({
                    x1: 20,
                    y1: 110,
                    x2: 380,
                    y2: 100
                })
                .stroke(color)
                .strokeWidth(10)
                .strokeOpacity(.7)
                .strokeDash(0)
                .strokeLinecap(Stampers.Line.LINECAP.ROUND)
                .affix(this.$linePreview);
        });
    }

    initPreview() {
        this.$linePreview = this.$view.querySelector('.line_preview');
        new Stampers.Line({
                x1: 20,
                y1: 20,
                x2: 380,
                y2: 120
            })
            .stroke('#21c863')
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .strokeWidth(15)
            .affix(this.$linePreview);

        new Stampers.Line({
                x1: 20,
                y1: 80,
                x2: 380,
                y2: 180
            })
            .stroke('#f2eb45')
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .strokeWidth(15)
            .affix(this.$linePreview);

        this.previewLine = new Stampers.Line({
                x1: 20,
                y1: 110,
                x2: 380,
                y2: 100
            })
            .stroke('red')
            .strokeWidth(10)
            .strokeOpacity(.7)
            .strokeDash(0)
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .affix(this.$linePreview);
    }

    getView() {
        return this.$view;
    }
}