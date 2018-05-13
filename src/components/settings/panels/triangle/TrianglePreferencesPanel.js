import {
    Polygon
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import PreferencePanel from '../PreferencePanel';

export default class TrianglePreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'fillColor': '#1f47df',
            'fillOpacity': .5,
            'strokeColor': 'yellow',
            'strokeDash': [0, 0],
            'strokeWidth': 2,
            'strokeOpacity': 1
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.triangle_paper'));
        return this.paper;
    }

    createReference() {
        const polygon = new Polygon({})
            .stroke('yellow')
            .fill('pink')
            .vertexs([30, 60], [220, 20], [150, 180])
            .strokeWidth(2)
            .affix(this.getPaper());
    }

    respond() {
        this.preview && this.preview.remove();
        this.preview = new Polygon({})
            .fill(this.fillColor)
            .fillOpacity(this.fillOpacity)
            .stroke(this.strokeColor)
            .strokeOpacity(this.strokeOpacity)
            .strokeWidth(this.strokeWidth)
            .strokeDash(this.strokeDash, this.strokeDash)
            .vertexs([130, 80], [370, 30], [280, 180])
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'TrianglePreferencesPanel',
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeDash: this.strokeDash
        });
    }

    createInteraction(view) {
        const __self = this;

        // fill color picker
        new ColorPicker({
            el: view.querySelector('.triangle_fill_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.fillColor = color;
        });
        // range: fill_opacity
        this.fillOpacityRange = view.querySelector('.triangle_fill_opacity_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.fillOpacity = this.value;
        }
        // stroke color picker
        new ColorPicker({
            el: view.querySelector('.triangle_stroke_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_opacity
        this.strokeOpacityRange = view.querySelector('.triangle_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
        // range: stroke_dash
        this.strokeDashRange = view.querySelector('.triangle_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }
        // range: stroke_width
        this.strokeWidthRange = view.querySelector('.triangle_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
    }
}