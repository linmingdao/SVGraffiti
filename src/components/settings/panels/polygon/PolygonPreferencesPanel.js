import {
    Polygon
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import PreferencePanel from '../PreferencePanel';

export default class PolygonPreferencesPanel extends PreferencePanel {

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
        !this.paper && (this.paper = this.getView().querySelector('.polygon_paper'));
        return this.paper;
    }

    createReference() {
        const polygon = new Polygon({})
            .stroke('yellow')
            .fill('pink')
            .vertexs([60, 20], [120, 20], [200, 60], [200, 120], [150, 180], [30, 150], [20, 100])
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
            .vertexs([210, 20], [270, 20], [370, 60], [370, 120], [300, 180], [180, 150], [170, 100])
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'PolygonPreferencesPanel',
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeDash: this.strokeDash
        });
    }

    createInteraction() {
        const __self = this;

        // fill color picker
        new ColorPicker({
            el: this.$view.querySelector('.polygon_fill_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.fillColor = color;
        });
        // range: fill_opacity
        this.fillOpacityRange = this.container.querySelector('.polygon_fill_opacity_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.fillOpacity = this.value;
        }
        // stroke color picker
        new ColorPicker({
            el: this.$view.querySelector('.polygon_stroke_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_opacity
        this.strokeOpacityRange = this.container.querySelector('.polygon_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
        // range: stroke_dash
        this.strokeDashRange = this.container.querySelector('.polygon_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }
        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.polygon_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
    }
}