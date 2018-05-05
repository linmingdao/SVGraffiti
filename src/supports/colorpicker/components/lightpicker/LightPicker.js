import template from './template.html';
import {
    gradient
} from '../../utils';

export default class LightPicker {
    constructor(container) {
        this.$container = container;
        this.init();
    }

    init() {
        this.$container.innerHTML = template;
        this.lightPicker = this.$container.querySelector('.light_picker');

        let chunk = '<tr>';
        chunk += gradient('#000000', '#ffffff', 100);
        chunk += '</tr>';

        this.lightPicker.innerHTML = chunk;
    }
}