import {
    Polygon
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';

export default class GlobalPreferencesPanel {

    constructor(container) {
        this.container = container;
        this.init(container);
    }

    addWatch() {
        const __self = this;

        const common_configure = {
            configurable: false,
            enumerable: true,
        };

        let fillColorValue = '#1f47df';
        let strokeColorValue = '#1f47df';
        let strokeDashValue = 6;
        let strokeWidthValue = 3;
        let strokeOpacityValue = .7;
        Object.defineProperties(this, {
            strokeColor: {
                set: function (newVal) {
                    if (strokeColorValue !== newVal) {
                        strokeColorValue = newVal;
                        __self.updatePreviewScreen();
                    }
                },
                get: function () {
                    return strokeColorValue;
                },
                ...common_configure
            },
            fillColor: {
                set: function (newVal) {
                    if (fillColorValue !== newVal) {
                        fillColorValue = newVal;
                        __self.updatePreviewScreen();
                    }
                },
                get: function () {
                    return fillColorValue;
                },
                ...common_configure
            },
            strokeDash: {
                set: function (newVal) {
                    if (strokeDashValue !== newVal) {
                        strokeDashValue = newVal;
                        __self.updatePreviewScreen();
                    }
                },
                get: function () {
                    return strokeDashValue;
                },
                ...common_configure
            },
            strokeWidth: {
                set: function (newVal) {
                    if (strokeWidthValue !== newVal) {
                        strokeWidthValue = newVal;
                        __self.updatePreviewScreen();
                    }
                },
                get: function () {
                    return strokeWidthValue;
                },
                ...common_configure
            },
            strokeOpacity: {
                set: function (newVal) {
                    if (strokeOpacityValue !== newVal) {
                        strokeOpacityValue = newVal;
                        __self.updatePreviewScreen();
                    }
                },
                get: function () {
                    return strokeOpacityValue;
                },
                ...common_configure
            }
        });
    }

    initRefScreen() {
        this.$linePreview = this.$view.querySelector('.triangle_preview');
        const polygon = new Polygon({})
            .stroke('yellow')
            .fill('pink')
            .vertexs([50, 60], [200, 50], [150, 180])
            .strokeWidth(2)
            .affix(this.$linePreview);
    }

    updatePreviewScreen() {
        this.preview && this.preview.remove();
        this.preview = new Polygon({})
            .stroke(this.strokeColor)
            .strokeDash(this.strokeDash, this.strokeDash)
            .fill(this.fillColor)
            .fillOpacity(this.strokeOpacity)
            .vertexs([150, 60], [300, 50], [250, 180])
            .strokeWidth(this.strokeWidth)
            .affix(this.$linePreview);
    }

    init() {
        const __self = this;

        this.$view = document.createElement('div');
        this.$view.className = `setting_item`;
        this.$view.innerHTML = template;

        this.$options = this.$view.querySelector('.options');
        this.container.appendChild(this.$view);

        this.addWatch();
        this.initRefScreen();
        this.updatePreviewScreen();

        // stroke color picker
        new ColorPicker({
            el: this.$view.querySelector('.triangle_stroke_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });

        // fill color picker
        new ColorPicker({
            el: this.$view.querySelector('.triangle_fill_color'),
            components: ['gradient']
        }).onColorChange(color => {
            this.fillColor = color;
        });

        // range: stroke_dash
        this.strokeDashRange = this.container.querySelector('.triangle_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }

        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.triangle_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }

        // range: fill_opacity
        this.fillOpacityRange = this.container.querySelector('.triangle_fill_opacity_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
    }

    show() {
        this.$view.style.display = 'block';
        return this;
    }

    hide() {
        this.$view.style.display = 'none';
        return this;
    }

    getView() {
        return this.$view;
    }
}