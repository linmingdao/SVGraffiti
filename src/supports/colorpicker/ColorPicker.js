import './colorpicker.scss';
import {
    isDOM
} from './utils';
import template from './template.html';
import configuration from './configuration.json';
import PresetsPicker from './components/PresetsPicker';
import GradientPicker from './components/GradientPicker';
import Operator from './components/Operator';

export default class ColorPicker {

    constructor({
        el,
        presetColors,
        gradientColors,
        components = ['presets', 'gradient', 'depth', 'operator']
    }) {
        this.el = el;
        this.presetColors = presetColors || configuration.preset_colors;
        this.gradientColors = gradientColors || configuration.gradient_colors;
        this.components = components;
        this.container = this.getContainer(this.el);
        this.picker = this.getPicker(this.components);

        this.picker.renderTo(this.container);
    }

    getContainer(el) {
        if (typeof el === 'string') {
            return document.querySelector(el);
        }
        if (isDOM(el)) {
            return el;
        }
        throw new Error('el配置错误');
    }

    getPicker(components) {
        const pickerRoot = document.createElement('div');
        pickerRoot.className = 'color_picker_box';

        components.indexOf('presets') !== -1 && (this.presetsPicker = new PresetsPicker(pickerRoot, this.presetColors));
        components.indexOf('gradient') !== -1 && (this.gradientPicker = new GradientPicker(pickerRoot, this.gradientColors, 40));
        components.indexOf('depth') !== -1 && (this.depthPicker = new GradientPicker(pickerRoot, ['#000000', '#ffffff'], 100));
        components.indexOf('operator') !== -1 && (this.operator = new Operator(pickerRoot));

        this.presetsPicker && this.presetsPicker.onColorChange(color => {
            this.depthPicker && this.depthPicker.reGradient(['#000000', color, '#ffffff']);
            this.operator && this.operator.setColor(color);
            this.colorChangeCallback && this.colorChangeCallback(color);
        });
        this.gradientPicker && this.gradientPicker.onColorChange(color => {
            this.depthPicker && this.depthPicker.reGradient(['#000000', color, '#ffffff']);
            this.operator && this.operator.setColor(color);
            this.colorChangeCallback && this.colorChangeCallback(color);
        });
        this.depthPicker && this.depthPicker.onColorChange(color => {
            this.operator && this.operator.setColor(color);
            this.colorChangeCallback && this.colorChangeCallback(color);
        });
        this.operator && this.operator.onClickGlobalToggleButton(checked => {
            console.log(`${checked?'应用于全局':'不应用于全局'}`);
        })

        return {
            pickerRoot: pickerRoot,
            renderTo: function (container) {
                container.appendChild(this.pickerRoot);
            }
        }
    }

    onColorChangeFilter() {

    }

    onColorChange(callback) {
        this.colorChangeCallback = callback;
    }

    onClickConfirmButton(callback) {
        this.confirmButtonCallback = callback;
    }

    onClickCancelButton(callback) {
        this.cancelButtonCallback = callback;
    }

    onClickGlobalToggleButton(callback) {
        this.globalToggleButtonCallback = callback;
    }
}