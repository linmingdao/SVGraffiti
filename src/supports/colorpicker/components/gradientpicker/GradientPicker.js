import colors from './colors.json';
import template from './template.html';
import {
    gradient
} from '../../utils';

export default class GradientPicker {
    constructor(container) {
        this.$container = container;
        this.init();
    }

    init() {
        this.$container.innerHTML = template;
        this.gradientPicker = this.$container.querySelector('.color_gradient');

        let chunk = '<tr>';
        var startColor, endColor;
        for (let i = 0; i < colors.length; ++i) {
            if ((i + 1) < colors.length) {
                startColor = colors[i];
                endColor = colors[i + 1];
                chunk += gradient(startColor, endColor, 40);
            }
        }
        chunk += '</tr>';

        this.gradientPicker.innerHTML = chunk;
    }
}