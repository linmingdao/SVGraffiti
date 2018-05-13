import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import {
    Line,
    Path
} from '../../../../supports/svg-stamper/stampers-mixin';
import PreferencePanel from '../PreferencePanel';

const pathChunk = 'M40 40C43 225 100 190 100 90M143 170C211 160 130 90 190 60M360 30C200 100 400 200 200 170';

export default class CurvePreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'strokeColor': '#ffeb3b',
            'strokeWidth': 8,
            'strokeOpacity': 1
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.curve_paper'));
        return this.paper;
    }

    createReference() {
        new Line({
                x1: 20,
                y1: 100,
                x2: 380,
                y2: 100
            })
            .stroke('#21c863')
            .strokeLinecap(Line.LINECAP.ROUND)
            .strokeWidth(25)
            .affix(this.getPaper());
    }

    respond() {
        this.previewLine && this.previewLine.remove();
        this.previewLine = new Path({
                'd': pathChunk
            })
            .stroke(this.strokeColor)
            .strokeWidth(this.strokeWidth)
            .strokeOpacity(this.strokeOpacity)
            .fill('none')
            .strokeLinecap(Path.LINECAP.ROUND)
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'CurvePreferencesPanel',
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeColor: this.strokeColor
        });
    }

    createInteraction(view) {
        const __self = this;

        // color picker
        new ColorPicker({
            el: this.$view.querySelector('.curve_color_picker'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.curve_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
        // range: stroke_opacity
        this.strokeOpacityRange = this.container.querySelector('.curve_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
    }
}