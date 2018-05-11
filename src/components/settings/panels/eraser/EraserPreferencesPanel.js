import {
    Circle
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import ColorPicker from '../../../../supports/colorpicker/ColorPicker';

export default class EraserPreferencesPanel {

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
        !this.previewPaper && (this.previewPaper = this.$view.querySelector('.eraser_preview_paper'));
        return this.previewPaper;
    }

    updatePreviewScreen() {
        this.preview && this.preview.remove();
        this.preview = new Circle({
                cx: 140,
                cy: 100,
                r: 80
            })
            .fill('#fff')
            .fillOpacity(1)
            .strokeWidth(0)
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
        this.updatePreviewScreen();

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