import {
    Polygon
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';

export default class PolygonPreferencesPanel {

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

    getPreviewPaper() {
        !this.previewPaper && (this.previewPaper = this.$view.querySelector('.polygon_preview_paper'));
        return this.previewPaper;
    }

    initRefScreen() {
        const polygon = new Polygon({})
            .stroke('yellow')
            .fill('pink')
            .vertexs([60, 20], [120, 20], [200, 60], [200, 120], [150, 180], [30, 150], [20, 100])
            .strokeWidth(2)
            .affix(this.getPreviewPaper());
    }

    updatePreviewScreen() {
        this.preview && this.preview.remove();
        this.preview = new Polygon({})
            .stroke(this.strokeColor)
            .fill(this.fillColor)
            .fillOpacity(this.strokeOpacity)
            .vertexs([210, 20], [270, 20], [370, 60], [370, 120], [300, 180], [180, 150], [170, 100])
            .strokeWidth(this.strokeWidth)
            .affix(this.getPreviewPaper());
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