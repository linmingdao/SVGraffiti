import './colorpicker.scss';
import template from './template.html';
import configuration from './configuration.json';
import PresetsPicker from './components/PresetsPicker';
import GradientPicker from './components/GradientPicker';
import Operator from './components/Operator';

export default class ColorPicker {

    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = template;
        this.root = this.container.querySelector('.color_picker_box');

        this.createPresetsPicker();
        this.createGradientPicker();
        this.createLightPicker();
        this.createOperator();
    }

    createPresetsPicker() {
        new PresetsPicker(this.root, configuration.preset_colors);
    }

    createGradientPicker() {
        new GradientPicker(this.root, configuration.gradient_colors, 40);
    }

    createLightPicker() {
        new GradientPicker(this.root, ['#000000', '#ffffff'], 100);
    }

    createOperator() {
        new Operator(this.root);
    }
}