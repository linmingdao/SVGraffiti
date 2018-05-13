import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import {
    Line
} from '../../../../supports/svg-stamper/stampers-mixin';
import PreferencePanel from '../PreferencePanel';

export default class LinePreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'strokeColor': '#f026f3',
            'strokeDash': [0, 0],
            'strokeWidth': 8,
            'strokeOpacity': 1
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.line_paper'));
        return this.paper;
    }

    createReference() {
        new Line({
                x1: 20,
                y1: 20,
                x2: 380,
                y2: 120
            })
            .stroke('#21c863')
            .strokeLinecap(Line.LINECAP.ROUND)
            .strokeWidth(20)
            .strokeOpacity(.8)
            .affix(this.getPaper());
        new Line({
                x1: 40,
                y1: 80,
                x2: 380,
                y2: 250
            })
            .stroke('#f2eb45')
            .strokeOpacity(1)
            .strokeLinecap(Line.LINECAP.ROUND)
            .strokeWidth(40)
            .affix(this.getPaper());
    }

    respond() {
        this.previewLine && this.previewLine.remove();
        this.previewLine = new Line({
                x1: 20,
                y1: 100,
                x2: 380,
                y2: 100
            })
            .stroke(this.strokeColor)
            .strokeWidth(this.strokeWidth)
            .strokeOpacity(this.strokeOpacity)
            .strokeDash(this.strokeDash)
            .strokeLinecap(Line.LINECAP.ROUND)
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'LinePreferencesPanel',
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeDash: this.strokeDash,
            strokeColor: this.strokeColor
        });
    }

    createInteraction(view) {
        const __self = this;

        // stroke_color
        new ColorPicker({
            el: view.querySelector('.line_stroke_color_picker'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // stroke_dash
        this.strokeDashRange = view.querySelector('.line_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }
        // stroke_width
        this.strokeWidthRange = view.querySelector('.line_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
        // stroke_opacity
        this.strokeOpacityRange = view.querySelector('.line_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
    }
}