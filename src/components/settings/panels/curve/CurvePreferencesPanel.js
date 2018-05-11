import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import {
    Line,
    Path
} from '../../../../supports/svg-stamper/stampers-mixin';

const pathChunk = 'M40 40C43 225 100 190 100 90M143 170C211 160 130 90 190 60M360 30C200 100 400 200 200 170';

export default class CurvePreferencesPanel {

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

        let strokeColorValue = '#1f47df';
        let strokeDashValue = 25;
        let strokeWidthValue = 10;
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
        !this.previewPaper && (this.previewPaper = this.$view.querySelector('.curve_preview_paper'));
        return this.previewPaper;
    }

    initRefScreen() {
        new Line({
                x1: 20,
                y1: 100,
                x2: 380,
                y2: 100
            })
            .stroke('#21c863')
            .strokeLinecap(Line.LINECAP.ROUND)
            .strokeWidth(10)
            .affix(this.getPreviewPaper());
    }

    updatePreviewScreen() {
        this.previewLine && this.previewLine.remove();
        this.previewLine = new Path({
                'd': pathChunk
            })
            .stroke('yellow')
            .fill('none')
            .strokeWidth(10)
            .strokeLinecap(Path.LINECAP.ROUND)
            .strokeOpacity(1)
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

        // color picker
        new ColorPicker({
            el: this.$view.querySelector('.color_picker'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });

        // range: stroke_dash
        this.strokeDashRange = this.container.querySelector('.line_stroke_dash_range');
        this.strokeDashRange.oninput = function (e) {
            __self.strokeDash = this.value;
        }

        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.line_stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }

        // range: stroke_opacity
        this.strokeOpacityRange = this.container.querySelector('.line_stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
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