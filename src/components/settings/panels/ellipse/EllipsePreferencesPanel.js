import {
    Circle,
    Ellipse
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import PreferencePanel from '../PreferencePanel';

export default class EllipsePreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'fillColor': '#1f47df',
            'fillOpacity': 0.5,
            'strokeColor': '#1f47df',
            'strokeDash': [0, 0],
            'strokeWidth': 2,
            'strokeOpacity': 1
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.ellipse_preview_paper'));
        return this.paper;
    }

    createReference() {
        const polygon = new Ellipse({
                cx: 125,
                cy: 100,
                rx: 100,
                ry: 80
            })
            .fill('green')
            .fillOpacity(.5)
            .stroke('pink')
            .strokeWidth(5)
            .strokeOpacity(1)
            .affix(this.getPaper());
    }

    respond() {
        this.preview && this.preview.remove();
        this.preview = new Ellipse({
                cx: 260,
                cy: 100,
                rx: 110,
                ry: 75
            })
            .fill(this.fillColor)
            .fillOpacity(this.fillOpacity)
            .stroke(this.strokeColor)
            .strokeWidth(this.strokeWidth)
            .strokeOpacity(this.strokeOpacity)
            .strokeDash(this.strokeDash, this.strokeDash)
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'EllipsePreferencesPanel',
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity,
            strokeWidth: this.strokeWidth,
            strokeOpacity: this.strokeOpacity,
            strokeDash: this.strokeDash,
            strokeColor: this.strokeColor
        });
    }

    createInteraction(view) {
        const __self = this;

        // fill color picker
        new ColorPicker({
            el: view.querySelector('.ellipse_fill_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.fillColor = color;
        });
        // range: fill_opacity
        this.fillOpacityRange = view.querySelector('.ellipse_fill_opacity_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.fillOpacity = this.value;
        }
        // stroke color picker
        new ColorPicker({
            el: view.querySelector('.ellipse_stroke_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_opacity
        this.strokeOpacityRange = view.querySelector('.ellipse_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
        // range: stroke_dash
        this.strokeDashRange = view.querySelector('.ellipse_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }
        // range: stroke_width
        this.strokeWidthRange = view.querySelector('.ellipse_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
    }
}