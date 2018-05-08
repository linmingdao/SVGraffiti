import ColorPicker from '../../../../supports/colorpicker/ColorPicker';
import Slider from '../../../../supports/slider/Slider';
import template from './template.html';
import * as Stampers from '../../../../supports/svg-stamper/stampers-mixin';

export default class Line {

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
        let strokeDashValue = '';
        let strokeWidthValue = 10;
        let strokeOpacityValue = 1;
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

    initRefScreen() {
        this.$linePreview = this.$view.querySelector('.line_preview');
        new Stampers.Line({
                x1: 20,
                y1: 20,
                x2: 380,
                y2: 120
            })
            .stroke('#21c863')
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .strokeWidth(10)
            .affix(this.$linePreview);
        new Stampers.Line({
                x1: 20,
                y1: 80,
                x2: 380,
                y2: 180
            })
            .stroke('#f2eb45')
            .strokeDash(20, 20)
            .strokeOpacity(1)
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
            .strokeWidth(10)
            .affix(this.$linePreview);
    }

    updatePreviewScreen() {
        this.previewLine && this.previewLine.remove();
        this.previewLine = new Stampers.Line({
                x1: 20,
                y1: 100,
                x2: 380,
                y2: 100
            })
            .stroke(this.strokeColor)
            .strokeWidth(this.strokeWidth)
            .strokeOpacity(this.strokeOpacity)
            // .strokeDash(this.strokeDash)
            .strokeLinecap(Stampers.Line.LINECAP.ROUND)
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

        // color picker
        new ColorPicker({
            el: this.$view.querySelector('.color_picker'),
            components: ['gradient']
        }).onColorChange(color => {
            this.strokeColor = color;
        });
        // range: stroke_width
        this.strokeWidthRange = this.container.querySelector('.stroke_width_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.strokeWidth = this.value;
        }
        // range: stroke_opacity
        this.strokeOpacityRange = this.container.querySelector('.stroke_opacity_range');
        this.strokeOpacityRange.oninput = function (e) {
            __self.strokeOpacity = this.value;
        }
    }

    show() {
        this.$view.style.display = 'block';
    }

    hide() {
        this.$view.style.display = 'none';
    }

    getView() {
        return this.$view;
    }
}