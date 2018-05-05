import './colorpicker.scss';
import template from './template.html';
import PresetsPicker from './components/presetspicker/PresetsPicker';
import GradientPicker from './components/gradientpicker/GradientPicker';
import LightPicker from './components/lightpicker/LightPicker';
import Operator from './components/operator/Operator';

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
        new PresetsPicker(this.root);
    }

    createGradientPicker() {
        new GradientPicker(this.root);
    }

    createLightPicker() {
        new LightPicker(this.root)
    }

    createOperator() {
        new Operator(this.root);
    }
}