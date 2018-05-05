import template from './template.html';
import presetColors from './colors.json';

export default class PresetsPicker {

    constructor(container) {
        this.$container = container;

        this.init();
    }

    init() {
        this.$container.innerHTML = template;
        this.presetsPicker = this.$container.querySelector('.color_presets');

        let chunk = '';
        presetColors.forEach(colors => {
            chunk += `<tr>`;
            colors.forEach(color => {
                chunk += `<td height="30" width="30" bgcolor="${color}"></td>`;
            })
            chunk += `</tr>`;
        });

        this.presetsPicker.innerHTML = chunk;
    }
}