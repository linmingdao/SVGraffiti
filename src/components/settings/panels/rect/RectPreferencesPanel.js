import {
    Rect
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import PreferencePanel from '../PreferencePanel';

export default class RectPreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'fillColor': 'green',
            'fillOpacity': .5,
            'strokeColor': 'pink',
            'strokeDash': [0, 0],
            'strokeWidth': 2,
            'strokeOpacity': 1,
            'strokeRadius': 20,
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.rect_paper'));
        return this.paper;
    }

    createReference() {
        const rect = new Rect({
                x: 30,
                y: 15,
                width: 200,
                height: 130
            })
            .stroke('yellow')
            .strokeWidth(5)
            .strokeOpacity(1)
            .fill('red')
            .radius(20, 20)
            .affix(this.getPaper());
    }

    respond() {
        this.preview && this.preview.remove();
        this.preview = new Rect({
                x: 170,
                y: 30,
                width: 200,
                height: 150
            })
            .stroke(this.strokeColor)
            .strokeWidth(this.strokeWidth)
            .strokeOpacity(this.strokeOpacity)
            .strokeDash(this.strokeDash, this.strokeDash)
            .fill(this.fillColor)
            .fillOpacity(this.fillOpacity)
            .radius(this.strokeRadius, this.strokeRadius)
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'RectPreferencesPanel',
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeDash: this.strokeDash,
            strokeRadius: this.strokeRadius
        });
    }

    createInteraction() {
        const __self = this;

        // fill color picker
        new ColorPicker({
            el: this.$view.querySelector('.rect_fill_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.fillColor = color;
        });
        // range: fill_opacity
        this.fillOpacityRange = this.container.querySelector('.rect_fill_opacity_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.fillOpacity = this.value;
        }
        // stroke color picker
        new ColorPicker({
            el: this.$view.querySelector('.rect_stroke_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_opacity
        this.strokeOpacityRange = this.container.querySelector('.rect_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
        // range: stroke_dash
        this.strokeDashRange = this.container.querySelector('.rect_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }
        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.rect_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
        // range: stroke_radius
        this.strokeRadiusRange = this.container.querySelector('.rect_radius_width_range');
        this.strokeRadiusRange.oninput = function (e) {
            __self.strokeRadius = this.value;
        }
    }
}